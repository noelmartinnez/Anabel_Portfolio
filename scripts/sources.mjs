/**
 * Mapa de origen -> proyecto.
 *
 * Es el unico archivo que conoce las rutas del material bruto, que vive FUERA
 * del repo (`../Trabajo` y `../Trabajos`). `build-assets.mjs` lo lee y escribe
 * las piezas ya optimizadas en `public/work/<slug>/`.
 *
 * Tipos de fuente:
 *   { type: "dir",   path, take? }        todas las imagenes de una carpeta
 *   { type: "image", path }               una imagen suelta
 *   { type: "pdf",   path, max?, from? }  paginas de un PDF renderizadas a WebP
 *   { type: "video", path, height?, crf? } video recomprimido + fotograma poster
 *
 * `max` acota los dossiers largos que son documento de texto mas que escaparate.
 */

export const RAW_ROOT = "../";

/**
 * `cover` fija que imagen manda en la rejilla, por el nombre del archivo de
 * origen. Sin el, la portada es la primera pieza del proyecto.
 */
export const sources = [
  // ─── Clientes ────────────────────────────────────────────────────────────
  {
    slug: "greene",
    cover: "278.png",
    sources: [{ type: "dir", path: "Trabajo/GREENE" }],
  },
  {
    slug: "barbara",
    sources: [{ type: "dir", path: "Trabajo/BÁRBARA" }],
  },
  {
    slug: "farmacia",
    cover: "332.png",
    sources: [{ type: "dir", path: "Trabajo/FARMACIA" }],
  },
  {
    slug: "penyafresh",
    sources: [{ type: "dir", path: "Trabajo/PENYAFRESH" }],
  },
  {
    slug: "crisalida",
    cover: "IMG_7097.JPG",
    sources: [{ type: "dir", path: "Trabajo/CRISÁLIDA" }],
  },
  {
    slug: "comunicamos-experience",
    sources: [{ type: "dir", path: "Trabajo/COMUNICAMOS EXPERIENCE" }],
  },
  {
    slug: "mercat-elx",
    cover: "62.png",
    sources: [{ type: "dir", path: "Trabajo/MERCAT ELX" }],
  },

  // ─── Proyectos ───────────────────────────────────────────────────────────
  {
    slug: "milfshakes",
    sources: [
      { type: "pdf", path: "Trabajos/MILFSHAKES/Cronograma - Milfshakes.pdf" },
      { type: "pdf", path: "Trabajos/MILFSHAKES/Concepto creativo - Milfshakes.pdf" },
      { type: "pdf", path: "Trabajos/MILFSHAKES/Plan de comunicacion - Milfshakes.pdf" },
      { type: "video", path: "Trabajos/MILFSHAKES/Videocase - Milfshakes.mp4" },
      { type: "video", path: "Trabajos/MILFSHAKES/Video presentacion.mp4" },
    ],
  },
  {
    slug: "espirituosos",
    sources: [
      { type: "pdf", path: "Trabajos/ESPIRITUOSOS/Queremos emborracharte hoy.pdf" },
      { type: "video", path: "Trabajos/ESPIRITUOSOS/VIDEOCASE - QUEREMOS EMBORRACHARTE HOY.mp4" },
    ],
  },
  {
    slug: "colmado-singular",
    sources: [{ type: "pdf", path: "Trabajos/COLMADO SINGULAR/Colmado singular_presentación.pdf" }],
  },
  {
    slug: "pasteleria-rc",
    sources: [{ type: "pdf", path: "Trabajos/PASTELERÍA RC/Campaña RC.pdf" }],
  },
  {
    slug: "mahou",
    sources: [
      { type: "pdf", path: "Trabajos/MAHOU/Briefing Mahou.pdf" },
      { type: "pdf", path: "Trabajos/MAHOU/Contrabriefing Mahou.pdf" },
    ],
  },
  {
    slug: "rebranding-mercadona",
    sources: [{ type: "pdf", path: "Trabajos/REBRANDING MERCADONA.pdf" }],
  },
  {
    slug: "cervezas-mercadona",
    sources: [{ type: "pdf", path: "Trabajos/REDISEÑO CERVEZAS MERCADONA.pdf" }],
  },
  {
    slug: "soft-tampons",
    sources: [{ type: "pdf", path: "Trabajos/SOFT TAMPONS.pdf" }],
  },
  {
    slug: "influenciadores",
    sources: [{ type: "pdf", path: "Trabajos/PROGRAMA DE GESTIÓN CON INFLUENCIADORES.pdf" }],
  },
  {
    slug: "mano-de-santo",
    sources: [{ type: "pdf", path: "Trabajos/Opinión pública_peldanyos.pdf" }],
  },
  {
    slug: "inside-out",
    sources: [{ type: "pdf", path: "Trabajos/Inside out 2.pdf" }],
  },
  {
    slug: "biografia",
    sources: [{ type: "video", path: "Trabajos/BIOGRAFÍA.mov" }],
  },
  {
    slug: "cortometraje",
    sources: [{ type: "video", path: "Trabajos/CORTOMETRAJE.mov" }],
  },
  {
    slug: "color-en-el-arte",
    // 3:23 min: el mas largo con diferencia. Se queda en su 1080p nativo pero con
    // un CRF algo mas alto para que un solo archivo no se coma el repo.
    sources: [{ type: "video", path: "Trabajos/Vídeo el color en el arte.mp4", crf: 23 }],
  },

  // ─── Estilismo ───────────────────────────────────────────────────────────
  {
    slug: "bad-bunny-rick-owens",
    // Copia corregida del original ("RICK OWNENS" en la portada); el PDF tal
    // cual lo entrego Anabel sigue en la raiz de la carpeta.
    sources: [{ type: "pdf", path: "Trabajos/ESTILISMO/Bad Bunny x Rick Owens.pdf" }],
  },
];

/** Retrato para el hero y la pagina /sobre. */
export const portrait = "Trabajo/foto de perfil.png";

/** Monograma «A.» del que salen el favicon y el icono de iOS. */
export const logo = "Trabajo/logo monograma.jpeg";
