import media from "./media.json";

export type Section = "clientes" | "proyectos" | "estilismo";

export type Piece = {
  kind: "image" | "slide" | "video";
  src: string;
  w: number;
  h: number;
  blur: string;
  /** Fuente de la que viene la pieza: todas las páginas de un PDF comparten grupo. */
  group?: string;
  /** Solo en vídeos */
  poster?: string;
  duration?: number;
};

export type Project = {
  slug: string;
  section: Section;
  /** Nombre de marca: no se traduce. */
  title: string;
  subtitle: { es: string; en: string };
  year: string;
  role: { es: string; en: string };
  /** Solo la llevan los proyectos; las cuentas de cliente se presentan sin texto. */
  description?: { es: string; en: string };
  /**
   * Documento de lectura más que escaparate: en la ficha solo se enseña la
   * portada de cada PDF y las páginas se recorren en el visor.
   */
  dossier?: true;
  tags: string[];
};

type MediaEntry = { cover: Piece; pieces: Piece[] };
const mediaMap = media as unknown as Record<string, MediaEntry>;

export const portraitPiece = mediaMap.__portrait as unknown as Piece | undefined;

/**
 * Metadatos editoriales. Las piezas no viven aquí: se leen de `media.json`
 * por slug, que genera `scripts/build-assets.mjs`.
 */
export const projects: Project[] = [
  // ─── Clientes ────────────────────────────────────────────────────────────
  {
    slug: "barbara",
    section: "clientes",
    title: "Bárbara Carretero",
    subtitle: { es: "Dirección y producción fotográfica", en: "Photo direction and production" },
    year: "2025",
    role: { es: "Dirección de contenido", en: "Content direction" },
    tags: ["Fotografía", "Dirección de arte", "Marca personal"],
  },
  {
    slug: "farmacia",
    section: "clientes",
    title: "Farmacia Universidad Elche",
    subtitle: { es: "Contenido para redes", en: "Social media content" },
    year: "2024 — 2025",
    role: { es: "Community management", en: "Community management" },
    tags: ["Instagram", "Salud", "Diseño de plantillas"],
  },
  {
    slug: "penyafresh",
    section: "clientes",
    title: "Penyafresh",
    subtitle: { es: "Contenido para redes", en: "Social media content" },
    year: "2024 — 2025",
    role: { es: "Community management", en: "Community management" },
    tags: ["Instagram", "Alimentación", "Promociones"],
  },
  {
    slug: "crisalida",
    section: "clientes",
    title: "Floristería Crisálida",
    subtitle: { es: "Producción fotográfica de producto", en: "Product photography" },
    year: "2025",
    role: { es: "Contenido y fotografía", en: "Content and photography" },
    tags: ["Fotografía", "Producto", "Campañas de temporada"],
  },
  {
    slug: "comunicamos-experience",
    section: "clientes",
    title: "Comunicamos Experience",
    subtitle: { es: "Contenido de marca", en: "Brand content" },
    year: "2023 — 2025",
    role: { es: "Community management", en: "Community management" },
    tags: ["Instagram", "Divulgación", "Identidad"],
  },
  {
    slug: "mercat-elx",
    section: "clientes",
    title: "Mercat Central Elche",
    subtitle: { es: "Contenido para redes", en: "Social media content" },
    year: "2024 — 2025",
    role: { es: "Community management", en: "Community management" },
    tags: ["Instagram", "Comercio local", "Comunidad"],
  },

  // ─── Proyectos ───────────────────────────────────────────────────────────
  {
    slug: "milfshakes",
    section: "proyectos",
    title: "Milfshakes",
    subtitle: { es: "Propuesta de campaña", en: "Campaign proposal" },
    year: "2025",
    role: { es: "Concepto creativo y plan de comunicación", en: "Creative concept and communication plan" },
    description: {
      es: "Lanzamiento de una colección limitada de cuatro sabores en formato XXL alrededor de un reto viral con hashtag propio y cuatro influencers de países distintos. Concepto, plan de comunicación, cronograma y videocase.",
      en: "Launch of a four-flavour limited collection in XXL format built around a viral challenge with its own hashtag and four influencers from different countries. Concept, communication plan, timeline and video case.",
    },
    tags: ["Concepto creativo", "Influencers", "Vídeo"],
  },
  {
    slug: "espirituosos",
    section: "proyectos",
    title: "Queremos emborracharte hoy",
    subtitle: { es: "Propuesta de campaña", en: "Campaign proposal" },
    year: "2025",
    role: { es: "Creatividad y videocase", en: "Creative and video case" },
    description: {
      es: "Campaña para el sector de las bebidas espirituosas construida sobre un claim deliberadamente incómodo, resuelta en dossier y videocase.",
      en: "A campaign for the spirits sector built on a deliberately uncomfortable claim, delivered as a dossier and a video case.",
    },
    tags: ["Claim", "Campaña", "Vídeo"],
  },
  {
    slug: "colmado-singular",
    section: "proyectos",
    title: "Colmado Singular",
    subtitle: { es: "Programa de relaciones públicas", en: "Public relations programme" },
    year: "2025",
    role: { es: "Programa de RRPP", en: "PR programme" },
    description: {
      es: "Programa de relaciones públicas para una tienda gourmet: mapa de públicos, mensajes, acciones con prensa y prescriptores, y calendario de ejecución.",
      en: "Public relations programme for a gourmet store: audience map, messaging, press and advocate actions, and an execution calendar.",
    },
    tags: ["Relaciones públicas", "Estrategia", "Gastronomía"],
  },
  {
    slug: "pasteleria-rc",
    section: "proyectos",
    title: "Sabe a lo que recuerdas",
    subtitle: { es: "Campaña de marca", en: "Brand campaign" },
    year: "2024",
    role: { es: "Concepto y desarrollo de campaña", en: "Concept and campaign development" },
    description: {
      es: "Campaña para una pastelería sin gluten y sin lactosa apoyada en la memoria del sabor: el dulce como forma de volver a un sitio y a una edad concretos, sin renunciar a nada.",
      en: "A campaign for a gluten- and lactose-free bakery resting on the memory of taste: pastry as a way back to a particular place and age, with nothing given up.",
    },
    tags: ["Concepto creativo", "Campaña", "Gastronomía"],
  },
  {
    slug: "mahou",
    section: "proyectos",
    title: "Mahou",
    subtitle: { es: "Briefing y contrabriefing", en: "Brief and counter-brief" },
    year: "2024",
    role: { es: "Análisis y planificación", en: "Analysis and planning" },
    description: {
      es: "Lectura crítica del encargo de una gran marca cervecera: análisis de la categoría, del público y de la competencia, y devolución de un contrabriefing que redefine el problema.",
      en: "A critical reading of a major beer brand's assignment: category, audience and competitor analysis, answered with a counter-brief that reframes the problem.",
    },
    dossier: true,
    tags: ["Estrategia", "Briefing", "Análisis"],
  },
  {
    slug: "rebranding-mercadona",
    section: "proyectos",
    title: "Rebranding Mercadona",
    subtitle: { es: "Rediseño de identidad", en: "Identity redesign" },
    year: "2024",
    role: { es: "Rebranding", en: "Rebranding" },
    description: {
      es: "Ejercicio de rebranding sobre una marca que todo el mundo tiene en la cabeza: qué se puede tocar sin romper el reconocimiento y qué gana la marca al hacerlo.",
      en: "A rebranding exercise on a brand everyone already pictures: what can be touched without breaking recognition, and what the brand gains by doing it.",
    },
    tags: ["Rebranding", "Identidad", "Retail"],
  },
  {
    slug: "cervezas-mercadona",
    section: "proyectos",
    title: "Cervezas Mercadona",
    subtitle: { es: "Rediseño de packaging", en: "Packaging redesign" },
    year: "2024",
    role: { es: "Diseño de packaging", en: "Packaging design" },
    description: {
      es: "Rediseño de la gama de cervezas de marca blanca: jerarquía de la lata, diferenciación entre variedades y un aire menos genérico en el lineal.",
      en: "Redesign of the private-label beer range: can hierarchy, differentiation between varieties and a less generic presence on the shelf.",
    },
    dossier: true,
    tags: ["Packaging", "Diseño", "Gran consumo"],
  },
  {
    slug: "soft-tampons",
    section: "proyectos",
    title: "Soft Tampons",
    subtitle: { es: "Campaña de producto", en: "Product campaign" },
    year: "2025",
    role: { es: "Concepto y campaña", en: "Concept and campaign" },
    description: {
      es: "Campaña para un producto de higiene íntima: hablar de algo cotidiano sin eufemismos ni azules de anuncio, con un tono directo y sin pedir perdón.",
      en: "A campaign for an intimate hygiene product: talking about something everyday without euphemisms or advertising blue, in a direct tone that doesn't apologise.",
    },
    tags: ["Concepto creativo", "Campaña", "Producto"],
  },
  {
    slug: "influenciadores",
    section: "proyectos",
    title: "Gestión con influenciadores",
    subtitle: { es: "Programa de prescriptores", en: "Advocacy programme" },
    year: "2025",
    role: { es: "Planificación y gestión", en: "Planning and management" },
    description: {
      es: "Programa completo de trabajo con prescriptores: criterios de selección, escalado por niveles, condiciones de colaboración y medición de resultados.",
      en: "A complete advocacy programme: selection criteria, tiering, collaboration terms and results measurement.",
    },
    dossier: true,
    tags: ["Influencers", "Estrategia", "Medición"],
  },
  {
    slug: "mano-de-santo",
    section: "proyectos",
    title: "Mano de Santo",
    subtitle: { es: "Estrategia de influencers", en: "Influencer strategy" },
    year: "2025",
    role: { es: "Estrategia y opinión pública", en: "Strategy and public opinion" },
    description: {
      es: "Estrategia de comunicación para una bebida de recuperación: tipología de prescriptores, análisis de redes y de públicos, y acciones construidas sobre la credibilidad de la fuente.",
      en: "A communication strategy for a recovery drink: advocate typology, social and audience analysis, and actions built on the credibility of the source.",
    },
    tags: ["Influencers", "Opinión pública", "Estrategia"],
  },
  {
    slug: "inside-out",
    section: "proyectos",
    title: "Inside Out 2",
    subtitle: { es: "Plan de comunicación", en: "Communication plan" },
    year: "2024",
    role: { es: "Estrategia y planificación", en: "Strategy and planning" },
    description: {
      es: "Plan de comunicación para el estreno de la película: análisis de situación, objetivos, mapa de públicos, estrategias, tácticas y calendario de lanzamiento.",
      en: "A communication plan for the film's release: situation analysis, objectives, audience map, strategies, tactics and a launch calendar.",
    },
    tags: ["Plan de comunicación", "Estrategia", "Entretenimiento"],
  },
  {
    slug: "biografia",
    section: "proyectos",
    title: "Biografía",
    subtitle: { es: "Pieza audiovisual", en: "Film piece" },
    year: "2024",
    role: { es: "Guion y realización", en: "Script and direction" },
    description: {
      es: "Retrato audiovisual de un minuto: una voz en off recorre la vida entera de una persona con el material justo.",
      en: "A one-minute filmed portrait: a voice-over walks through someone's entire life with just enough material.",
    },
    tags: ["Audiovisual", "Guion", "Montaje"],
  },
  {
    slug: "cortometraje",
    section: "proyectos",
    title: "Cortometraje",
    subtitle: { es: "Pieza audiovisual", en: "Film piece" },
    year: "2024",
    role: { es: "Guion y realización", en: "Script and direction" },
    description: {
      es: "Ficción breve escrita, rodada y montada en equipo, con la narrativa visual como el verdadero encargo.",
      en: "A short fiction written, shot and edited as a team, with visual storytelling as the real assignment.",
    },
    tags: ["Audiovisual", "Ficción", "Dirección"],
  },
  {
    slug: "color-en-el-arte",
    section: "proyectos",
    title: "El color en el arte",
    subtitle: { es: "Pieza divulgativa", en: "Explainer piece" },
    year: "2024",
    role: { es: "Guion y realización", en: "Script and direction" },
    description: {
      es: "Vídeo divulgativo sobre el uso del color en la historia del arte y lo que la publicidad le sigue debiendo.",
      en: "An explainer video on the use of colour through art history and what advertising still owes it.",
    },
    tags: ["Audiovisual", "Divulgación", "Color"],
  },

  // ─── Estilismo ───────────────────────────────────────────────────────────
  {
    slug: "bad-bunny-rick-owens",
    section: "estilismo",
    title: "Bad Bunny × Rick Owens",
    subtitle: { es: "Propuesta de estilismo", en: "Styling proposal" },
    year: "2026",
    role: { es: "Estilismo y dirección de imagen", en: "Styling and image direction" },
    description: {
      es: "Tres looks de Rick Owens para vestir a Bad Bunny en la alfombra roja de los Grammy 2027, bajo el concepto «Anomalía»: sastrería oscura, volúmenes que rompen la proporción y un único acento de color por look, con peluquería y maquillaje pensados para cada uno.",
      en: "Three Rick Owens looks dressing Bad Bunny for the 2027 Grammys red carpet under the concept «Anomaly»: dark tailoring, volumes that break proportion and a single accent of colour per look, with hair and make-up designed for each.",
    },
    tags: ["Estilismo", "Moda", "Alfombra roja"],
  },
];

export const bySection = (section: Section) =>
  projects.filter((p) => p.section === section);

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const getMedia = (slug: string): MediaEntry | undefined => mediaMap[slug];

/** Proyecto anterior y siguiente dentro de la misma sección, en bucle. */
export function neighbours(project: Project) {
  const list = bySection(project.section);
  const i = list.findIndex((p) => p.slug === project.slug);
  return {
    prev: list[(i - 1 + list.length) % list.length],
    next: list[(i + 1) % list.length],
  };
}
