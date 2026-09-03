/**
 * Convierte el material bruto de `../Trabajo` y `../Trabajos` en piezas ligeras
 * dentro de `public/work/<slug>/`, y escribe el manifiesto `src/content/media.json`.
 *
 *   node scripts/build-assets.mjs            todo
 *   node scripts/build-assets.mjs greene     solo algunos proyectos
 *   node scripts/build-assets.mjs --force    reconstruye aunque ya exista la salida
 *
 * Es idempotente: salta las piezas ya generadas salvo con --force.
 */

import fs from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { createRequire } from "node:module";
import sharp from "sharp";
import { sources, portrait, logo, RAW_ROOT } from "./sources.mjs";

// pdfjs (dentro de pdf-to-img) usa process.getBuiltinModule, que solo existe
// desde Node 20.16. Aqui corre Node 20.12, asi que lo rellenamos antes de importarlo.
const require_ = createRequire(import.meta.url);
if (typeof process.getBuiltinModule !== "function") {
  process.getBuiltinModule = (id) =>
    require_(id.startsWith("node:") ? id : `node:${id}`);
}
const { pdf } = await import("pdf-to-img");

const execFileAsync = promisify(execFile);

const ROOT = path.resolve(import.meta.dirname, "..");
const RAW = path.resolve(ROOT, RAW_ROOT);
const OUT = path.join(ROOT, "public", "work");
const MANIFEST = path.join(ROOT, "src", "content", "media.json");

// Calidad alta: el techo es lo que una pantalla puede llegar a mostrar, no lo
// que trae el original. Una foto a 3000 px ya cubre un 4K a pantalla completa;
// mas pixeles solo engordan la descarga sin verse.
const IMAGE_MAX = 3000; // lado largo de las fotografias
const IMAGE_Q = 92;
const SLIDE_MAX = 2400; // ancho de las paginas de dossier
const SLIDE_Q = 88;
const VIDEO_CRF = 21; // h264: por debajo de 23 la diferencia ya no se aprecia
const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;

const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.filter((a) => !a.startsWith("--"));

// Los archivos que vienen de macOS traen los acentos descompuestos (NFD) y
// Windows no los da por equivalentes: si la ruta compuesta no existe, se prueba
// la descompuesta antes de rendirse.
const raw = (p) => {
  const composed = path.join(RAW, p.normalize("NFC"));
  if (fs.existsSync(composed)) return composed;
  const decomposed = path.join(RAW, p.normalize("NFD"));
  return fs.existsSync(decomposed) ? decomposed : composed;
};
const collator = new Intl.Collator("es", { numeric: true, sensitivity: "base" });
const relOut = (file) =>
  "/work/" + path.relative(OUT, file).split(path.sep).join("/");

/** Miniatura de 20px en base64 para el `placeholder="blur"` de next/image. */
async function blurOf(input) {
  const buf = await sharp(input)
    .rotate()
    .resize(20, 20, { fit: "inside" })
    .webp({ quality: 40 })
    .toBuffer();
  return "data:image/webp;base64," + buf.toString("base64");
}

/** Escribe una imagen si no existe y devuelve su entrada de manifiesto. */
async function emitImage(input, outFile, { width, quality }) {
  if (!force && fs.existsSync(outFile)) {
    const meta = await sharp(outFile).metadata();
    return { src: relOut(outFile), w: meta.width, h: meta.height, blur: await blurOf(outFile) };
  }
  const info = await sharp(input)
    .rotate() // respeta la orientacion EXIF: sin esto Barbara y Crisalida salen tumbadas
    .resize({ width, height: width, fit: "inside", withoutEnlargement: true })
    .webp({ quality })
    .toFile(outFile);
  return { src: relOut(outFile), w: info.width, h: info.height, blur: await blurOf(outFile) };
}

async function fromDir(src, dir, prefix) {
  const files = fs
    .readdirSync(raw(src.path))
    .filter((f) => IMAGE_EXT.test(f))
    .sort(collator.compare)
    .slice(0, src.take ?? Infinity);

  const pieces = [];
  for (const [i, file] of files.entries()) {
    const out = path.join(dir, prefix + "-" + String(i + 1).padStart(2, "0") + ".webp");
    const made = await emitImage(path.join(raw(src.path), file), out, {
      width: IMAGE_MAX,
      quality: IMAGE_Q,
    });
    // `name` es el nombre del archivo de origen: solo sirve para resolver el
    // `cover` de sources.mjs y no llega al manifiesto.
    pieces.push({ kind: "image", name: file, ...made });
  }
  return pieces;
}

async function fromPdf(src, dir, prefix) {
  const first = src.from ?? 1;
  const limit = src.max ?? Infinity;
  const pieces = [];

  // Si ya estan generadas nos ahorramos abrir el PDF: rasterizar es lo caro.
  if (!force) {
    const existing = fs
      .readdirSync(dir)
      .filter((f) => f.startsWith(prefix + "-") && f.endsWith(".webp"))
      .sort(collator.compare);
    if (existing.length) {
      for (const file of existing) {
        const out = path.join(dir, file);
        const meta = await sharp(out).metadata();
        pieces.push({
          kind: "slide",
          src: relOut(out),
          w: meta.width,
          h: meta.height,
          blur: await blurOf(out),
        });
      }
      return pieces;
    }
  }

  const doc = await pdf(raw(src.path), { scale: 2 });
  let page = 0;
  let kept = 0;
  for await (const png of doc) {
    page++;
    if (page < first) continue;
    if (kept >= limit) break;
    kept++;
    const out = path.join(dir, prefix + "-" + String(kept).padStart(2, "0") + ".webp");
    const info = await sharp(png)
      .resize({ width: SLIDE_MAX, withoutEnlargement: true })
      .webp({ quality: SLIDE_Q })
      .toFile(out);
    pieces.push({
      kind: "slide",
      src: relOut(out),
      w: info.width,
      h: info.height,
      blur: await blurOf(out),
    });
  }
  return pieces;
}

async function fromVideo(src, dir, prefix) {
  const target = src.height ?? 1080;
  const crf = src.crf ?? VIDEO_CRF;
  const mp4 = path.join(dir, prefix + ".mp4");
  const poster = path.join(dir, prefix + "-poster.webp");

  if (force || !fs.existsSync(mp4)) {
    // Se mide la altura de origen para no tener que escribir un `min(...)` en el
    // filtro: las comas dentro de una expresion de ffmpeg exigen escapado y aqui
    // los argumentos van sin shell.
    const probe = await execFileAsync("ffprobe", [
      "-v", "error", "-select_streams", "v:0",
      "-show_entries", "stream=height", "-of", "csv=p=0", raw(src.path),
    ]);
    const srcHeight = parseInt(probe.stdout.trim(), 10);
    const height = Math.min(target, srcHeight);

    await execFileAsync(
      "ffmpeg",
      [
        "-y", "-i", raw(src.path),
        "-vf", "scale=-2:" + height,
        "-c:v", "libx264", "-crf", String(crf), "-preset", "slow",
        "-profile:v", "high", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
        "-c:a", "aac", "-b:a", "192k",
        mp4,
      ],
      { maxBuffer: 1 << 26 },
    );
  }

  if (force || !fs.existsSync(poster)) {
    const frame = path.join(dir, prefix + "-frame.png");
    await execFileAsync("ffmpeg", ["-y", "-ss", "1", "-i", mp4, "-frames:v", "1", frame], {
      maxBuffer: 1 << 26,
    });
    await sharp(frame)
      .resize({ width: SLIDE_MAX, withoutEnlargement: true })
      .webp({ quality: SLIDE_Q })
      .toFile(poster);
    fs.unlinkSync(frame);
  }

  const meta = await sharp(poster).metadata();
  const { stdout } = await execFileAsync("ffprobe", [
    "-v", "error", "-select_streams", "v:0",
    "-show_entries", "format=duration", "-of", "csv=p=0", mp4,
  ]);

  return [{
    kind: "video",
    src: relOut(mp4),
    poster: relOut(poster),
    w: meta.width,
    h: meta.height,
    blur: await blurOf(poster),
    duration: Math.round(parseFloat(stdout.trim())),
  }];
}

/**
 * Tarjeta social de 1200x630 (`app/opengraph-image.jpg` y `twitter-image.jpg`):
 * nombre a la izquierda y el retrato a sangre a la derecha, sobre el blanco
 * hueso del sitio. El JPG se genera aqui y se sube al repositorio, asi que en
 * Vercel no se rasteriza nada: basta con las fuentes de esta maquina.
 */
async function buildSocialCard() {
  const W = 1200;
  const H = 630;
  const PHOTO_W = 500;
  const PAD = 78;

  const photo = await sharp(raw(portrait))
    .rotate()
    .resize({ width: PHOTO_W, height: H, fit: "cover", position: "top" })
    .toBuffer();

  const text = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W - PHOTO_W}" height="${H}">
       <text x="${PAD}" y="222" font-family="Georgia, 'Times New Roman', serif"
             font-size="24" letter-spacing="4" fill="#948c81">ANABEL PÉREZ LARA</text>
       <text x="${PAD}" y="326" font-family="Georgia, 'Times New Roman', serif"
             font-size="64" fill="#262220">Publicidad &amp;</text>
       <text x="${PAD}" y="400" font-family="Georgia, 'Times New Roman', serif"
             font-size="64" fill="#262220">Relaciones Públicas</text>
       <rect x="${PAD}" y="446" width="86" height="3" fill="#b5674a"/>
     </svg>`,
  );

  const card = await sharp({
    create: { width: W, height: H, channels: 3, background: "#fbfaf6" },
  })
    .composite([
      { input: text, left: 0, top: 0 },
      { input: photo, left: W - PHOTO_W, top: 0 },
      // Filo en la union, para que la foto no flote sobre el hueso.
      {
        input: {
          create: { width: 2, height: H, channels: 4, background: "#0000001a" },
        },
        left: W - PHOTO_W - 2,
        top: 0,
      },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer();

  for (const name of ["opengraph-image.jpg", "twitter-image.jpg"]) {
    fs.writeFileSync(path.join(ROOT, "src", "app", name), card);
  }
  console.log("  tarjeta social … " + W + "x" + H);
}

/**
 * Iconos de pestaña a partir del monograma: `app/icon.png` (512, del que Chrome
 * saca los 16 y 32 px) y `app/apple-icon.png` (180, para la pantalla de inicio
 * de iOS). El original trae muchisimo margen — a 16 px la «A» se quedaria en
 * cuatro pixeles—, asi que primero se recorta al trazo y luego se le devuelve
 * un aire medido.
 *
 * El JPEG no se compone tal cual: su fondo es un gris que no es el del sitio y
 * se notaria como un recuadro. Se convierte en mascara (luminancia invertida
 * como canal alfa) para que viaje solo el trazo, y el hueso lo pone el lienzo.
 * Opaco y no transparente: el trazo es negro y en una pestaña oscura
 * desapareceria.
 */
async function buildAppIcons() {
  const trimmed = await sharp(raw(logo)).trim({ threshold: 12 }).toBuffer();

  for (const [name, size] of [
    ["icon.png", 512],
    ["apple-icon.png", 180],
  ]) {
    const inner = Math.round(size * 0.78);
    const inverted = await sharp(trimmed)
      .resize({ width: inner, height: inner, fit: "inside" })
      .greyscale()
      .negate()
      .png()
      .toBuffer();

    // El fondo del JPEG (247) no llega a negro puro al invertirlo, y sin
    // reajuste quedaria un velo sobre todo el cuadro. Va en una segunda pasada
    // porque sharp aplica `linear` antes que `negate`, no en el orden escrito.
    const mask = await sharp(inverted)
      .linear(255 / 247, -8)
      // `raw` sobre el PNG intermedio saldria a tres canales y `joinChannel`
      // espera uno: sin esto el alfa se desalinea y el icono sale a rayas.
      .toColourspace("b-w")
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { width, height } = mask.info;
    const mark = await sharp({
      create: { width, height, channels: 3, background: "#000000" },
    })
      .joinChannel(mask.data, { raw: { width, height, channels: 1 } })
      .png()
      .toBuffer();

    await sharp({
      create: { width: size, height: size, channels: 3, background: "#fbfaf6" },
    })
      .composite([
        {
          input: mark,
          left: Math.round((size - width) / 2),
          top: Math.round((size - height) / 2),
        },
      ])
      .png()
      .toFile(path.join(ROOT, "src", "app", name));
  }
  console.log("  iconos de pestaña … icon.png + apple-icon.png");
}

// ── Ejecucion ──────────────────────────────────────────────────────────────

fs.mkdirSync(OUT, { recursive: true });
const manifest =
  fs.existsSync(MANIFEST) && !force
    ? JSON.parse(fs.readFileSync(MANIFEST, "utf8"))
    : {};

for (const project of sources) {
  if (only.length && !only.includes(project.slug)) continue;
  const dir = path.join(OUT, project.slug);
  fs.mkdirSync(dir, { recursive: true });

  const pieces = [];
  for (const [i, src] of project.sources.entries()) {
    const prefix = project.sources.length > 1 ? "s" + (i + 1) : "p";
    process.stdout.write("  " + project.slug + " · " + path.basename(src.path) + " … ");
    let made = [];
    if (src.type === "dir") {
      made = await fromDir(src, dir, prefix);
    } else if (src.type === "image") {
      const one = await emitImage(raw(src.path), path.join(dir, prefix + ".webp"), {
        width: IMAGE_MAX,
        quality: IMAGE_Q,
      });
      made = [{ kind: "image", ...one }];
    } else if (src.type === "pdf") {
      made = await fromPdf(src, dir, prefix);
    } else if (src.type === "video") {
      made = await fromVideo(src, dir, prefix);
    }
    console.log(made.length + " pieza(s)");
    // `group` marca de que fuente viene cada pieza: los dossieres solo enseñan
    // la portada de cada grupo y el resto se ve en el visor.
    pieces.push(...made.map((piece) => ({ ...piece, group: prefix })));
  }

  // La portada siempre tiene que ser una imagen: los proyectos que solo son
  // video (biografia, cortometraje...) usan su fotograma poster, o next/image
  // intentaria descargarse el mp4 entero para generar la miniatura.
  const chosen = project.cover && pieces.find((p) => p.name === project.cover);
  if (project.cover && !chosen) {
    throw new Error(project.slug + ": no existe la portada '" + project.cover + "'");
  }
  const first = chosen ?? pieces.find((p) => p.kind !== "video") ?? pieces[0];
  const cover =
    first.kind === "video"
      ? { kind: "image", src: first.poster, w: first.w, h: first.h, blur: first.blur }
      : first;
  const clean = (p) => {
    const out = { ...p };
    delete out.name;
    return out;
  };
  manifest[project.slug] = { cover: clean(cover), pieces: pieces.map(clean) };
}

// Retrato para el hero y la pagina Sobre
if (!only.length) {
  const p = await emitImage(raw(portrait), path.join(OUT, "retrato.webp"), {
    width: 1600,
    quality: IMAGE_Q,
  });
  manifest.__portrait = p;
  console.log("  retrato … " + p.w + "x" + p.h);
  await buildSocialCard();
  await buildAppIcons();
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log("\nManifiesto escrito en " + path.relative(ROOT, MANIFEST));
