export const dynamic = 'force-static';
import { site_config } from '@/content/site-config';
export default function robots() { return { rules: { userAgent: '*', allow: '/', disallow: '/admin/' }, sitemap: `${site_config.url}/sitemap.xml` }; }
