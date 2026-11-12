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

export interface Offer {
  tag: string;
  highlight?: boolean;
  title: string;
  audience: string;
  bullets: readonly string[];
  format: string;
}

export interface Offers {
  title: string;
  intro: string;
  items: readonly Offer[];
  cta: { label: string };
}

export interface ChatStrings {
  promptHeading: string;
  placeholders: readonly string[];
  chips: readonly [string, string, string];
  panelTitle: string;
  youLabel: string;
  meLabel: string;
  stop: string;
  clear: string;
  retry: string;
  errorNetwork: string;
  errorRateLimit: string;
  errorEmpty: string;
  closeHint: string;
  close: string;
  inputAriaLabel: string;
  sendAriaLabel: string;
  panelAriaLabel: string;
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
  offers: Offers;
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
  chat: ChatStrings;
  footer: string;
}
