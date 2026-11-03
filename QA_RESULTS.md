# Production preparation verification — November 3, 2026

The existing design, animations, responsive rules, and four resume-backed case studies are preserved. Source was formatted for maintainability. Changes fix the project-page footer target, make social links and display labels editable from content, add actual favicon/share assets, and prepare Vercel metadata/build configuration and Windows instructions.

## Required commands

- `npm ci`: passed with the committed lockfile on Node 24.19.0.
- `npm run lint`: passed, no findings.
- `npm run typecheck`: passed.
- `npm run build`: passed, Next.js 15.5.29, 11 generated pages.
- `npm run verify`: passed. Four case-study routes, 88 anchor/link targets, public assets, PDF source/export byte equality and signature, canonical origin resolution, sitemap, social URL schemes, and reduced-motion CSS verified.
- `git diff --check`: passed.
- Source credential-pattern scan: no findings. No generated dependency/build directories or environment secrets are tracked. Ignore rules cover environment files, host state, private key formats, credential JSON, logs, and generated assets. This is a pattern scan, not a claim of exhaustive security auditing.

## Browser checks on the production static export

Headless Chromium via Playwright, served locally from `out/`:

- All four project detail pages return 200 and link back home correctly.
- All category filters, text search, empty state, and reset behave as expected.
- Dark/light toggle persists after reload.
- Mobile navigation opens, navigates, and closes.
- No horizontal document overflow at 390, 768, 1024, and 1440px widths.
- Actual browser PDF download succeeds as `resume.pdf`.
- Contact mailto and native form validation work. Sending is handled by the visitor's email application; no delivery-provider claim is made.
- Favicon, SVG icon, Apple icon, Open Graph image, sitemap, robots, and resume return 200.
- Reduced-motion emulation disables animation, keeps the heading visible, and avoids hidden reveal sections.
- No uncaught client JavaScript errors in the tested flow.
- Desktop and mobile screenshots inspected. These are local build checks, not a deployed Vercel/Lighthouse audit.
- GitHub profile URL `https://github.com/rorarun` returns HTTP 200.

## Vercel production verification

- Public URL: https://arun-arun-portfolio.vercel.app. The preferred `arun-portfolio.vercel.app` belongs to another project and was unavailable.
- Project `arun-portfolio` is linked to `rorarun/Portfolio`; production tracks `main`.
- Automatic deployment verified: pushing commit `546a84d97d7d574940b0149169022cba9eeb6e5a` triggered a Git-sourced **production** deployment (`dpl_6QNSX76mLQVWqCW5jxAiWyrwrpdU`) that reached READY.
- The first build found an incorrect `out` Output Directory override. It was removed from both project settings and `vercel.json`; Vercel's Next.js builder now manages the output while the app retains `output:'export'`.
- Node 24, `npm ci`, `npm run build`, repository-root build. Production and preview metadata use `NEXT_PUBLIC_SITE_URL=https://arun-arun-portfolio.vercel.app`.
- Vercel Authentication, password protection, and IP protection are disabled for the public portfolio.
- An isolated, nonpersistent Vercel test runner made ordinary HTTPS requests with **no cookies, Authorization headers, or deployment-protection bypass tokens**. All 12 paths returned HTTP 200 without redirects: home, four project detail pages, resume, favicon, SVG icon, Apple icon, Open Graph image, sitemap, and robots.
- The deployed resume is `application/pdf`, 135,158 bytes, with a valid `%PDF` signature.
- Live canonical metadata and sitemap use the confirmed production domain, with no localhost or former-host origin. `X-Content-Type-Options: nosniff` and `X-Frame-Options: DENY` were verified on the live homepage.
- The temporary test runner was stopped after testing. No persistent sandbox was retained.
- Interactive Chromium checks were performed on the production static export locally; the live deployment received anonymous HTTP smoke tests. A live-browser interaction/Lighthouse audit was not performed.

## Remaining limitations

LinkedIn, project repository/demo links, and actual screenshots have not been supplied; they remain absent. Existing diagrams are labeled conceptual visuals. Supabase admin persistence remains an explicitly deferred enhancement. Windows commands are documented but were not executed on a real Windows PC; validation ran on Linux with Node 24.
