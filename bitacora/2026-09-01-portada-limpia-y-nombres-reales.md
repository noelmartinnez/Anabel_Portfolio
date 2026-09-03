# 2026-09-01 — Portada limpia y nombres reales de cliente

## Contexto

Con la galería ya montada, Anabel revisa la portada y pide dos cosas: que la
cabecera deje de parecer una revista con paratextos (edición, número, rol,
lema) y que los clientes aparezcan con su nombre real, no con la abreviatura
que se usó al mapear las carpetas de material.

Además, la portada de cada cuenta la elegía el orden alfabético del archivo de
origen, no un criterio editorial: la primera foto de la carpeta no tiene por
qué ser la mejor.

## Cambios realizados

- **Hero reducido al nombre**: se quitan la línea de edición
  («Edición · Elche · Nº 01 · Portfolio»), el rol («Publicidad · Relaciones
  Públicas») y el lema. Queda el titular y el retrato. El nombre pasa a
  **«Anabel Pérez»** y pierde el punto terracota final. En `types.ts` el bloque
  `hero` se queda solo con `name`, y `es.ts`/`en.ts` pierden las cuatro claves.
- **Nombres de cliente** (`projects.ts`): Greene → **Greene Enterprise**,
  Bárbara → **Bárbara Carretero**, Farmacia → **Farmacia Universidad Elche**,
  Crisálida → **Floristería Crisálida**, Mercat d'Elx → **Mercat Central Elche**.
  Esto cierra el punto pendiente de la entrada anterior sobre el nombre real de
  la farmacia.
- **Portada elegible** (`scripts/`): `sources.mjs` acepta un campo `cover` con el
  **nombre del archivo de origen**, y `build-assets.mjs` busca esa pieza en vez
  de coger la primera. Para resolverlo, cada pieza que sale de una carpeta lleva
  durante el build un `name` con su archivo original, que se limpia antes de
  escribir `media.json` (el manifiesto no cambia de forma). Si el `cover` no
  existe, el build falla en vez de caer en silencio a la primera pieza.
  Portadas fijadas: `greene` → `278.png`, `farmacia` → `332.png`,
  `crisalida` → `IMG_7097.JPG`, `mercat-elx` → `62.png`.
- **Sección 02**: «Campañas, identidad y concepto» → **«Propuestas creativas»**
  (en inglés, «Creative proposals»).

## Decisiones

- El `cover` se declara por **nombre de archivo de origen** y no por índice de
  pieza: el índice se mueve solo con que se añada una foto a la carpeta, el
  nombre no.
- El campo `name` no llega al manifiesto. Es un dato del pipeline, no del sitio,
  y dejarlo dentro engordaría un JSON que se sirve entero al cliente.

## Pendiente

- La barra de navegación y los textos de SEO/pie siguen diciendo «Anabel Pérez
  Lara.» con punto. Decidir si se unifican con el titular o si el nombre completo
  se mantiene a propósito en esos sitios.
- Sigue en pie lo de la entrada anterior: curar la selección de Bárbara y de los
  dossiers largos, el peso de los vídeos, revisar en móvil y desplegar.
