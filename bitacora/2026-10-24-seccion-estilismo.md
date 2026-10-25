# 2026-10-24 — Sección de estilismo: Bad Bunny × Rick Owens

## Contexto

Anabel ha empezado un curso de estilismo y entrega su primer ejercicio: vestir a Bad
Bunny de Rick Owens para la alfombra roja de los Grammy 2027. Es un PDF de 11 láminas
16:9 (`../Ejercicio 1_Anabel Pérez.pdf`): presentación del artista, la gala y la firma,
el concepto «Anomalía», tres looks con su moodboard y el equipo de maquillaje y
peluquería.

Es la primera pieza de una disciplina que hasta ahora no aparecía en el portfolio
(publicidad, RRPP y community management).

## Cambios realizados

- **Errata corregida en el PDF.** La portada decía «RICK OWNENS». El titular es texto
  vivo dentro de un Form XObject, así que se corrigió en el propio PDF sin rasterizar:
  se quitó la primera «N» del flujo de contenido y se desplazó la línea media letra para
  que siga centrada. La copia corregida vive en
  `../Trabajos/ESTILISMO/Bad Bunny x Rick Owens.pdf`; el original de Anabel no se tocó.
- **Sección nueva «Estilismo»** (`03`), entre Proyectos y Contacto, que pasa a `04`:
  - `Section` admite `"estilismo"` y `Content` lleva su `GridHeading` en ES y EN.
  - `page.tsx` pinta un tercer `WorkGrid`.
- **Proyecto `bad-bunny-rick-owens`** en `sources.mjs` y `projects.ts`. Las 11 láminas
  se ven a ancho completo (no es `dossier`: aquí manda la imagen de los looks).
  1,4 MB en `public/work/bad-bunny-rick-owens/`.
- **`ProjectView`**: si un proyecto es el único de su sección, no se pinta la
  navegación anterior/siguiente, que si no enlazaría consigo mismo.

## Decisiones

| Decisión | Elección | Motivo |
|----------|----------|--------|
| Ubicación | Sección propia «Estilismo» | Lo pidió el usuario: deja sitio a los próximos ejercicios del curso |
| Formato | Láminas a ancho completo | Es un trabajo visual; el visor sigue disponible para ampliar |
| Texto | Sin mencionar el curso ni la UMH | Igual que en Proyectos: no se cuenta el origen académico |
| Errata | Corregida en el PDF, no en la imagen | Así `--force` no la reintroduce y Anabel tiene el PDF bueno |

## Pendiente

- La lámina 8 es una captura del Instagram de la maquilladora. Valorar con Anabel
  cambiarla por una imagen de su trabajo.
- Las imágenes del moodboard son de terceros (desfiles, portada de TIME); valorar un pie
  de créditos si el portfolio se mueve fuera del ámbito académico.
- Con una sola pieza la rejilla de Estilismo queda corta: crecerá con los siguientes
  ejercicios del curso.
