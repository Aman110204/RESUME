export interface Metric {
  value: string;
  label: string;
}

export interface QuickFact {
  icon: string;
  text: string;
}

export interface Skill {
  icon: string;
  label: string;
}

export interface Project {
  [key: string]: unknown;
  title: string;
  image: string;
  summary: string;
  details: string;
  tags: string[];
  role: string;
  results: string;
  github: string;
  method?: string;
  path?: string;
  status?: string;
}

export interface Experience {
  [key: string]: unknown;
  role: string;
  company: string;
  period: string;
  summary: string;
  bullets?: string[];
}

export interface Contact {
  icon: string;
  label: string;
  value: string;
  href: string;
  targetBlank: boolean;
}

export interface CustomSection {
  [key: string]: unknown;
  title: string;
  body: string;
}

export interface Certification {
  [key: string]: unknown;
  name: string;
  issuer: string;
  period: string;
  link?: string;
}

export interface Badge {
  [key: string]: unknown;
  name: string;
  issuer: string;
  link: string;
}

export interface Achievement {
  text: string;
}

export interface SiteContent {
  profile: {
    name: string;
    degree: string;
    role: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subtitle: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
  metrics: Metric[];
  aboutText: string;
  quickFacts: QuickFact[];
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  certifications?: Certification[];
  badges?: Badge[];
  achievements?: Achievement[];
  contacts: Contact[];
  customSections: CustomSection[];
}
