# Deployment

## Vercel

Import this repository into Vercel, choose Next.js, use `npm ci` and `npm run build`. Keep the root directory at the folder containing package.json. The project uses `output:'export'` and requires no server credentials for the public portfolio. Verify the generated `out` output is deployed. Set your final URL in `src/content/site-config.ts` before building so canonical metadata and sitemap are correct. Add optional Supabase variables only after implementing the remaining CMS integration described in ADMIN_SETUP.md.

CLI alternative: install Vercel CLI, run `vercel` from this directory, inspect the preview, then `vercel --prod` when ready. A Vercel account and deployment authorization are required; no Vercel deployment was performed here.

## Sites

`.openai/hosting.json` retains the registered Site identity and declares `out` as the static directory. Publish the exact source commit and its matching static output. New Site access is private unless explicitly changed. A Site preview does not imply public access.

## Other static hosting

Run `npm ci && npm run build`, then upload `out/` including nested project directories. Configure directory-index handling and a 404 page. No SPA rewrite is required. Do not upload source credentials or `.env.local`.
