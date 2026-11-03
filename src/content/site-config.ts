import { resolveSiteUrl } from "../lib/site-url";

export const site_config = {
  title: "Arun Arun | Software Engineer",
  description:
    "Computer Science student at Acadia University. Explore Arun\u2019s work in backend systems, data engineering, cloud infrastructure, and AI.",
  url: resolveSiteUrl({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
  }),
  resume: "/resume.pdf",
  navigation: [
    "Home",
    "About",
    "Experience",
    "Projects",
    "Skills",
    "Education",
    "Contact",
  ],
};
