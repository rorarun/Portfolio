import type { Metadata } from 'next';
import { site_config } from '@/content/site-config';
import './globals.css';
export const metadata: Metadata = { metadataBase: new URL(site_config.url), title: { default: site_config.title, template: '%s | Arun Arun' }, description: site_config.description, openGraph: { title: site_config.title, description: site_config.description, type: 'website', images: ['/visuals/stream.svg'] } };
export default function RootLayout({ children }: {
    children: React.ReactNode;
}) { return <html lang="en"><body><a href="#main-content" className="skip-link">Skip to content</a><div id="main-content">{children}</div></body></html>; }
