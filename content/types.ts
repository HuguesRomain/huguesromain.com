export type Locale = "fr" | "en";

export interface Project {
  slug: string;
  title: string;
  role: string;
  period: string;
  context: string;
  bullets: readonly [string, string, string];
  image: string;
  imageAlt: string;
}

export interface StackGroup {
  label: string;
  items: readonly string[];
}

export interface Profile {
  locale: Locale;
  name: string;
  tagline: string;
  heroFirstName: string;
  heroLastName: string;
  sections: {
    work: { label: string; title: string };
    stack: { label: string; title: string };
    about: { label: string; title: string };
    contact: { label: string; title: string };
  };
  projects: readonly Project[];
  stack: readonly StackGroup[];
  about: {
    paragraphs: readonly [string, string];
    portrait: string;
    portraitAlt: string;
    portraitHint: string;
  };
  contact: {
    intro: string;
    email: string;
    github: string;
    linkedin: string;
    booking: string;
    bookingLabel: string;
  };
  footer: string;
}
