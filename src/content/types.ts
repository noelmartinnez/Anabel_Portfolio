/** Cabecera de una de las dos rejillas de la portada. */
export type GridHeading = {
  index: string;
  eyebrow: string;
  title: string;
  intro: string;
};

export type Content = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    work: string;
    contact: string;
  };
  hero: {
    name: string[];
  };
  /** Presentación breve, bajo el nombre de la portada. */
  about: {
    intro: string[];
  };
  /** Las dos familias de trabajo de la portada. */
  clientes: GridHeading;
  proyectos: GridHeading;
  /** Etiquetas de la página de proyecto. */
  project: {
    back: string;
    prev: string;
    next: string;
    close: string;
    /** Pie de la portada de un dossier: "Ver el documento completo · 31 páginas". */
    openDossier: string;
    pages: string;
  };
  contact: {
    index: string;
    eyebrow: string;
    title: string;
    cta: string;
    email: string;
    phoneLabel: string;
    phone: string;
    locationLabel: string;
    location: string;
    linkedin: string;
    linkedinUrl: string;
    instagram: string;
    instagramUrl: string;
  };
  footer: {
    rights: string;
  };
};
