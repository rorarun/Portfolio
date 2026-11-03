import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/content/projects';
import { Header, Footer } from '@/components/portfolio';
export function generateStaticParams() { return projects.filter(p => p.published).map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: {
    params: Promise<{
        slug: string;
    }>;
}) { const { slug } = await params; const p = projects.find(p => p.slug === slug && p.published); return { title: p?.title, description: p?.shortDescription }; }
export default async function Project({ params }: {
    params: Promise<{
        slug: string;
    }>;
}) { const { slug } = await params; const p = projects.find(p => p.slug === slug && p.published); if (!p)
    notFound(); return <><Header /><main className="detail"><Link className="text-link" href="/#projects">← All projects</Link><div className="eyebrow">{p.category.join(' / ')} · {p.date}</div><h1>{p.title}</h1><p className="large-copy">{p.fullDescription}</p><div className="tags">{p.technologies.map(t => <span key={t}>{t}</span>)}</div><Image width={1120} height={620} className="detail-image" src={p.image} alt={`Conceptual architecture illustration for ${p.title}; not a project screenshot`}/><div className="detail-metrics">{p.metrics.map(m => <div key={m.label}><strong>{m.value}</strong><span>{m.label}</span></div>)}</div>{[['The problem', p.problem], ['The solution', p.solution], ['System architecture', p.architecture], ['Engineering challenges', p.challenges]].map(([t, v]) => <section className="detail-section" key={t}><h2>{t}</h2><p>{v || 'Details to be added by Arun.'}</p></section>)}<section className="detail-section"><h2>Results & impact</h2><ul>{p.highlights.map(h => <li key={h}>{h}</li>)}</ul><p className="muted">Results reported in the supplied resume; independent benchmarks are not provided.</p></section>{p.gallery.length > 0 && <section><h2>Screenshots</h2>{p.gallery.map(src => <Image width={1120} height={620} src={src} alt={`${p.title} screenshot`} key={src}/>)}</section>}<div className="hero-buttons">{p.githubUrl && <a className="button" href={p.githubUrl}>GitHub repository ↗</a>}{p.liveUrl && <a className="button primary" href={p.liveUrl}>Live demo ↗</a>}</div><p className="muted">{!p.githubUrl && !p.liveUrl ? 'Repository links, live demos, and project screenshots have not been provided.' : ''}</p><Link className="button" href="/#contact">Ask about this project ↗</Link></main><Footer /></>; }
