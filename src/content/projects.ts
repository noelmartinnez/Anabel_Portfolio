export type Project = {
  id: string;
  title: { es: string; en: string };
  category: { es: string; en: string };
  /** Ruta de imagen en /public/images. Si es null se muestra un placeholder editorial. */
  image: string | null;
  /** Formato de la celda en la rejilla masonry */
  span: "tall" | "wide" | "regular";
  accent?: boolean;
};

/**
 * Trabajos de Anabel. Sustituye `image: null` por rutas reales
 * (p. ej. "/images/campana-x.jpg") a medida que se añadan materiales.
 */
export const projects: Project[] = [
  {
    id: "cm-comunicamos",
    title: { es: "Contenido para redes", en: "Social media content" },
    category: { es: "Community Management", en: "Community Management" },
    image: null,
    span: "tall",
    accent: true,
  },
  {
    id: "campana-moda",
    title: { es: "Campaña de moda", en: "Fashion campaign" },
    category: { es: "Publicidad", en: "Advertising" },
    image: null,
    span: "regular",
  },
  {
    id: "eventos",
    title: { es: "Cobertura de eventos", en: "Event coverage" },
    category: { es: "Eventos", en: "Events" },
    image: null,
    span: "wide",
  },
  {
    id: "branding",
    title: { es: "Identidad de marca", en: "Brand identity" },
    category: { es: "Branding", en: "Branding" },
    image: null,
    span: "regular",
  },
  {
    id: "instagram-clapping",
    title: { es: "Estrategia Instagram", en: "Instagram strategy" },
    category: { es: "Redes sociales", en: "Social media" },
    image: null,
    span: "regular",
  },
  {
    id: "storytelling",
    title: { es: "Storytelling visual", en: "Visual storytelling" },
    category: { es: "Creatividad", en: "Creative" },
    image: null,
    span: "tall",
  },
];
