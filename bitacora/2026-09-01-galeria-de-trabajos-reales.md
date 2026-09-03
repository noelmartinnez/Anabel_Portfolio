# 2026-09-01 — Galería de trabajos reales

## Contexto

El portfolio estaba montado y con buen sistema de diseño, pero **no tenía ni un solo
trabajo real**: `projects.ts` contenía seis placeholders con `image: null` y la galería
pintaba degradados con una inicial. La propia sección avisaba «Galería en preparación».

Mientras tanto, el material real vivía sin usar en dos carpetas hermanas fuera del repo:
`../Trabajo` (342 MB, 104 imágenes de 7 cuentas de cliente) y `../Trabajos` (1,3 GB,
24 dossiers en PDF con 433 páginas y 6 vídeos de 73 a 237 MB).

El objetivo era que el portfolio dejara de leerse como un CV virtual y pasara a ser un
**espacio**: que mande la imagen y el texto acompañe. Como referencia se analizó
`ejemplo-comunity.html`, un portfolio hecho en Cargo.site: cabecera fija con solo el
nombre, rejilla de 50 miniaturas sin títulos, cada una enlazando a su página de proyecto,
y poco más.

## Decisiones tomadas (con el usuario)

| Decisión | Elección | Motivo |
|----------|----------|--------|
| **Estructura** | Rejilla + una página por proyecto (`/trabajo/[slug]`) | Con ~25 proyectos, el one-page dejaba a cada trabajo sin espacio propio |
| **Secciones** | «Clientes» y «Proyectos» | Neutro y profesional; en ningún sitio se menciona el origen académico de los segundos |
| **Dossiers PDF** | Renderizados a slides WebP navegables | Se ve el trabajo entero sin obligar a descargar nada |
| **Vídeos** | Recomprimidos con ffmpeg y servidos desde el propio repo | Sin depender de una cuenta externa de Vimeo o YouTube |
| **Calidad** | Al techo de lo que una pantalla puede mostrar, no al del original | Subir los originales tal cual (1,6 GB) no se vería mejor y GitHub rechaza archivos de más de 100 MB |
| **Idioma** | Se mantiene el bilingüe ES/EN | Ya existía la infraestructura i18n |

## Cambios realizados

- **Pipeline de assets** (`scripts/`): `sources.mjs` mapea el material bruto a proyectos y
  `build-assets.mjs` lo convierte con `sharp` y `ffmpeg` en `public/work/<slug>/`, dejando
  el manifiesto `src/content/media.json` (387 piezas, 25 proyectos, 223 MB).
  Es idempotente: solo regenera lo que falta, salvo con `--force`.
  - Imágenes: lado largo a 3000 px, WebP q92, con `.rotate()` para respetar la
    orientación EXIF (sin ella, las fotos de Bárbara y Crisálida salían tumbadas).
  - PDFs: rasterizados con `pdf-to-img` a escala 2 y bajados a 2400 px de ancho, q88.
  - Vídeos: H.264 1080p, CRF 21 (23 el de 3:23 min), `+faststart`, audio 192 kbps
    y fotograma póster.
  - De cada pieza se guarda una miniatura de 20 px en base64 para el `placeholder="blur"`.
- **Arquitectura**: la home pasa a ser galería (`Hero` corto + dos `WorkGrid` + `Contact`);
  bio, experiencia, formación y aptitudes se mudan a `/sobre`; cada proyecto tiene su
  `/trabajo/[slug]` prerenderizado con `generateStaticParams()`. 30 rutas estáticas.
- **Contenido**: `projects.ts` reescrito con los 25 proyectos y su copy bilingüe; las
  piezas no viven ahí, se leen de `media.json` por slug para que copy y assets evolucionen
  por separado. En `types.ts`/`es.ts`/`en.ts` la clave `work` se parte en `clientes` y
  `proyectos`, y se añaden las etiquetas de la página de proyecto.
- **Componentes**: nuevos `WorkGrid` (rejilla de columnas, portadas sin texto encima y pie
  al hover), `ProjectView` (cabecera + piezas agrupadas por tipo + anterior/siguiente) y
  `VideoPiece`. `Nav` se reduce a tres enlaces y pasa de anclas a rutas; `Hero` se acorta y
  estrena el retrato real; `Gallery` se elimina.
- **Visor a pantalla completa** (`Lightbox.tsx`): las piezas se guardan a 2400–3000 px
  pero en la página de proyecto no se ven por encima de ~600 px de ancho, así que esa
  resolución no la aprovechaba nadie. Al hacer clic en una pieza se abre a pantalla
  completa, con flechas del teclado y en pantalla, contador, Escape y clic en el fondo
  para salir, y bloqueo del scroll de fondo. Recorre solo las imágenes: los vídeos se
  reproducen en línea. Medido sobre `barbara/p-01`: 68 KB en la rejilla, 362 KB en el visor.
- **Calidad de entrega** (`next.config.ts`): generar las piezas a q88–q92 no servía de
  nada mientras `next/image` las volvía a comprimir a 75 al entregarlas, que es el valor
  por defecto de `images.qualities` en Next 16 (y desde esa versión es una lista blanca,
  no un simple default). Se añade `qualities: [75, 90]` y `quality={90}` en los tres
  componentes que pintan imágenes. Medido sobre `barbara/p-01`: 399 KB en disco, se
  servían 178 KB, ahora se sirven 362 KB.
- **Portada de los proyectos que solo son vídeo**: `pieces.find(p => p.kind !== "video")`
  no encontraba nada en `biografia`, `cortometraje` y `color-en-el-arte`, y el `??` caía
  en el propio `.mp4`. `next/image` intentaba descargarse los 69 MB del vídeo largo para
  sacar la miniatura y reventaba con `ERR_MAX_BODY_SIZE_EXCEEDED`. Ahora la portada de un
  vídeo es su fotograma póster.
- **Lint**: se corrigen tres errores de `react-hooks/set-state-in-effect` que ya venían de
  antes. `i18n` pasa a `useSyncExternalStore` (el idioma es estado externo, no de React),
  `Cursor` deja de gatear su render con estado y lo decide el CSS (`.cursor-layer`), y
  `Contact` calcula el año directamente en el render.

## Pendiente

- **Confirmar con Anabel**: el nombre real del cliente que ahora figura como «Farmacia»,
  la marca del «Plan de marketing», los años de cada proyecto y su papel exacto en los
  trabajos hechos en equipo. Todo vive en `src/content/projects.ts`.
- **Curar**: Bárbara son 30 fotos publicadas y probablemente sobren; los dossiers largos
  se acotaron con `max` en `sources.mjs` tomando las primeras páginas, conviene repasar
  que la selección sea la mejor y no solo la primera.
- **Peso del vídeo**: 154 de los 223 MB son los 6 vídeos, y `color-en-el-arte` solo
  ya pesa 69 MB (3:23 min). GitHub lo acepta pero avisa a partir de 50 MB, y un visitante
  en datos móviles se lo descarga entero. Si molesta, subirlo a CRF 25 apenas se nota y
  deja el total cerca de 150 MB; las imágenes (67 MB entre fotos, publicaciones y slides)
  no son el problema.
- Quedan fuera dos PDFs de texto (`El mundo y la moda en 2050`, `Las ficciones de masas`)
  por no encajar en una rejilla visual.
- Revisar en móvil y desplegar.
