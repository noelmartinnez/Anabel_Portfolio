export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  mode: string;
  description: string;
  tags: string[];
};

export type EducationItem = {
  school: string;
  degree: string;
  period: string;
  note?: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type LanguageSkill = {
  name: string;
  level: string;
  /** 0–100 para la barra */
  value: number;
};

export type Content = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    about: string;
    work: string;
    experience: string;
    education: string;
    contact: string;
  };
  hero: {
    edition: string;
    issue: string;
    name: string[];
    role: string;
    tagline: string;
    scroll: string;
    marquee: string[];
  };
  about: {
    index: string;
    eyebrow: string;
    title: string;
    body: string[];
    facts: { label: string; value: string }[];
  };
  work: {
    index: string;
    eyebrow: string;
    title: string;
    intro: string;
    note: string;
  };
  experience: {
    index: string;
    eyebrow: string;
    title: string;
    items: ExperienceItem[];
  };
  education: {
    index: string;
    eyebrow: string;
    title: string;
    items: EducationItem[];
  };
  skills: {
    index: string;
    eyebrow: string;
    title: string;
    groups: SkillGroup[];
    languagesTitle: string;
    languages: LanguageSkill[];
    extrasTitle: string;
    extras: string[];
  };
  contact: {
    index: string;
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    linkedinUrl: string;
  };
  footer: {
    rights: string;
    made: string;
  };
};
