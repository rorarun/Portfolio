import type { Metadata } from "next";
import { site_config } from "@/content/site-config";
import { profile } from "@/content/profile";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(site_config.url),
  title: { default: site_config.title, template: `%s | ${profile.name}` },
  description: site_config.description,
  authors: [{ name: profile.name }],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: site_config.title,
    description: site_config.description,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: site_config.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site_config.title,
    description: site_config.description,
    images: ["/og-image.png"],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
