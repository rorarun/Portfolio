export const dynamic = 'force-static';
import { projects } from '@/content/projects';
import { site_config } from '@/content/site-config';
export default function sitemap() { return [{ url: site_config.url }, ...projects.filter(p => p.published).map(p => ({ url: `${site_config.url}/projects/${p.slug}/` }))]; }
