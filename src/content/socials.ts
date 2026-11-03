import { profile } from "./profile";
export interface SocialLink {
  label: string;
  url: string;
}
// Add a verified personal LinkedIn URL here to show it automatically.
export const socials: SocialLink[] = [
  { label: "GitHub", url: "https://github.com/rorarun" },
  { label: "Email", url: `mailto:${profile.email}` },
];
