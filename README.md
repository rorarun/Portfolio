# Arun Arun — engineering portfolio

Next.js App Router, React, TypeScript, Tailwind CSS, Motion, and Lucide. Static export compatible with Vercel and Sites. Four resume-backed case studies, searchable category filters, responsive navigation, light/dark themes, reduced motion, PDF resume, education, experience, skills, SEO metadata, sitemap, and an email composer.

## Local development

```sh
cd /workspace/Portfolio
npm ci
npm run dev
```

Open http://localhost:3000. Verify with `npm run lint`, `npm run typecheck`, and `npm run build`. Production static files are in `out/`; serve them with `python3 -m http.server 3000 --directory out` (not `next start`, because this is a static export).

See CONTENT_EDITING.md, ADMIN_SETUP.md, and DEPLOYMENT.md.

## Deliberate limitations

/admin is a setup overview; it does not authenticate users or persist changes. The Supabase client/schema are scaffolding, not a finished CMS. The contact form composes an email using the visitor’s email app and does not send through a server. Repository/demo links and screenshots were absent from the resume and are omitted. Conceptual system graphics are labeled. LinkedIn was a generic linkedin.com link and is omitted. Resume performance metrics are self-reported, not independently benchmarked.

The explicit brief supplies the displayed Nova and Labatt job titles; other work descriptions and four project entries are grounded in the resume. No unsupported crop-detection, chatbot, inventory app, or task-platform claims were added.
