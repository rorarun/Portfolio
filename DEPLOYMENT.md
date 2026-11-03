# Vercel production deployment

## Current access boundary

The app is deployable without Supabase. A Vercel account/team and GitHub integration authorization are required to create the production project. Configuration files alone do not create a Vercel project, reserve a domain, or enable automatic deployment. Do not treat the preferred hostname below as a verified deployment.

## Connect the existing GitHub repository

1. Sign in at https://vercel.com using the account/team that should own the portfolio.
2. Open https://vercel.com/new and choose **Import Git Repository**. If `rorarun/Portfolio` is missing, choose the option to adjust GitHub permissions and authorize Vercel for **only** this repository. Select `rorarun/Portfolio`.
3. Use project name `arun-portfolio` if available. Framework: **Next.js**. Root directory: repository root (`./`, where package.json is), not a folder named Portfolio inside the repository.
4. Node.js: **24.x**. Install: `npm ci`. Build: `npm run build`. Output: `out` (the existing Next.js static export). `vercel.json` declares these build settings and baseline security headers. Keep the static export and trailing-slash handling; no catch-all SPA rewrite is required.
5. Deploy from `main`. Confirm the production branch under Project Settings → Environments → Production / Branch Tracking (or Git → Production Branch, depending on the current Vercel UI) is `main`. Confirm Settings → Git shows `rorarun/Portfolio` connected and automatic deployments enabled.
6. No environment variables are necessary for the current public portfolio. Supabase is a future enhancement. Leave its example fields unset.
7. Under Deployment Protection, disable Vercel Authentication/password protection **for production** if enabled and supported by your plan. The production portfolio must open in a signed-out/incognito browser. Preview deployments may retain protection.
8. In Settings → Domains, confirm the assigned production domain. Prefer `arun-portfolio.vercel.app`. If unavailable, try `arun-arun-portfolio.vercel.app`, `rorarun-portfolio.vercel.app`, or `arun-engineering.vercel.app`; these alternatives are not availability-verified.

## SEO origin

Vercel's `VERCEL_PROJECT_PRODUCTION_URL` is used at build time when available, so generated metadata and sitemap use the actual assigned production domain. If using a custom primary domain, explicitly set `NEXT_PUBLIC_SITE_URL=https://your-confirmed-domain` for Production and redeploy. Use an origin without a path or trailing slash. The only manually configured variable is public metadata, not a secret.

Local builds without deployment variables use `http://localhost:3000`. Project canonical links, Open Graph URLs, robots.txt, and sitemap share the same origin. Never set an unconfirmed preferred hostname as the canonical URL. Preview builds use the production origin when supplied by Vercel so they do not advertise an alternate canonical portfolio.

## Verify the deployment

Check the Vercel build status and deployed Git commit. In an incognito browser, open the assigned production URL, all four `/projects/<slug>/` routes, `/resume.pdf`, `/favicon.ico`, `/sitemap.xml`, and `/robots.txt`. Check mobile navigation, theme persistence, project search/filter empty state, contact mailto link, and each supplied external link. Verify generated metadata does not reference chatgpt.site or localhost. Confirm the domain is attached to the Production environment, not just a preview.

After import, a merge or push to GitHub `main` should trigger a new Production deployment. Other branches should create previews. Verify one real deployment event in the Vercel dashboard before claiming automatic deployment is configured. GitHub Actions in `.github/workflows/ci.yml` independently runs the code checks; it does not deploy to Vercel.

## CLI alternative

The GitHub import above is preferred because it configures automatic deployments. CLI use requires an authorized Vercel login and is not a substitute for linking Git under project settings:

```powershell
npx.cmd vercel login
npx.cmd vercel link
npx.cmd vercel --prod
```

Select the existing imported project to avoid duplicate projects. Never paste deployment tokens in source files or command examples.

## Static hosting / previous Site

`npm ci` and `npm run build` produce `out/`. The retained `.openai/hosting.json` identifies the previous private Site; it does not affect Vercel, grant access to that Site, or change its audience. No chatgpt.site URL is hardcoded into the current app metadata. No changes are being deployed to that previous Site as part of the Vercel migration.
