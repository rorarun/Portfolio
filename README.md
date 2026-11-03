# Arun Arun — engineering portfolio

The existing portfolio, preserved: Next.js App Router, React, TypeScript, Tailwind CSS, Motion, Lucide, four resume-backed project case studies, searchable filters, responsive layouts, light/dark themes, reduced motion, and a real PDF resume. Repository: https://github.com/rorarun/Portfolio. Production branch: `main`.

## Windows 11 + Visual Studio Code

`/workspace/Portfolio` is a cloud workspace, not a folder on your PC. Clone the GitHub repository to obtain your own copy.

Install Git, Node.js **24 LTS**, and Visual Studio Code. With Windows Package Manager, install Git and VS Code in PowerShell:

```powershell
winget install --id Git.Git -e
winget install --id Microsoft.VisualStudioCode -e
```

Install the Node.js 24 LTS Windows installer from https://nodejs.org/en/download (choose major 24). Restart PowerShell after installing tools so PATH updates take effect. Verify:

```powershell
git --version
node --version
npm.cmd --version
code --version
```

Node should report `v24.x`. The project pins Node 24 in `package.json`, `.nvmrc`, and `.node-version`.

### Clone and start

```powershell
New-Item -ItemType Directory -Force "$HOME\source" | Out-Null
Set-Location "$HOME\source"
git clone https://github.com/rorarun/Portfolio.git
Set-Location Portfolio
git switch main
code .
npm.cmd ci
npm.cmd run dev
```

Open http://localhost:3000. Stop the server with Ctrl+C. `npm.cmd` is used so Windows PowerShell does not need to run `npm.ps1` or change your execution policy. In Command Prompt, `npm` works normally too.

No environment variables, Supabase account, or API credentials are required. For optional deployment metadata configuration, copy `.env.example` to `.env.local`; never commit `.env.local`:

```powershell
Copy-Item .env.example .env.local
```

If port 3000 is busy: `npm.cmd run dev -- --port 3001`.

### Validate and build production

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
npm.cmd run verify
```

The build produces static pages in `out/`. `next start` is not used with `output: 'export'`. To preview the actual production output locally:

```powershell
npx.cmd --yes serve@14 out --listen 3000
```

Open http://localhost:3000 and try a project page, resume download, filters, theme, and mobile navigation. This preview command downloads the `serve` package when needed. Do not use SPA catch-all mode; project pages are real directories.

### Commit and push future edits

Configure your real commit identity once (replace these example values):

```powershell
git config --global user.name "Arun Arun"
git config --global user.email "YOUR_VERIFIED_GITHUB_EMAIL"
```

Use a branch so other work is preserved:

```powershell
git switch main
git pull --ff-only origin main
git switch -c update-portfolio-content
# Edit the content files in VS Code, then run the validation commands above.
git status
git add src/content public README.md CONTENT_EDITING.md
git diff --cached
git commit -m "Update portfolio projects and experience"
git push -u origin update-portfolio-content
```

Git Credential Manager may open your browser for GitHub sign-in. Never use a GitHub password as a Git password, put a token in a remote URL, or commit credentials. Open https://github.com/rorarun/Portfolio/pulls, choose **New pull request**, compare your branch to `main`, review and merge after checks pass. Then:

```powershell
git switch main
git pull --ff-only origin main
```

Choose a fresh branch name for each update. If `git pull --ff-only` refuses because histories diverged, stop and review the changes; do not force-push. If a push is denied, sign in to the account with repository write access and retry. Any branch-protection rules must be respected.

## Content editing

All content lives under `src/content/`; no dashboard is needed:

| File | Editable content |
| --- | --- |
| `profile.ts` | Name, short/full location, email, headline, summary, biography |
| `projects.ts` | Project entries, metrics, technology, categories, links, screenshots, published/featured flags, order |
| `experience.ts` | Company, role, dates, location, achievements, technology, visibility, order |
| `skills.ts` | Category names and arrays of skills |
| `education.ts` | University, degree, dates, GPA, awards, coursework, certifications |
| `socials.ts` | GitHub, optional verified LinkedIn, other public social links |
| `site-config.ts` | Metadata title/description, navigation, resume path, canonical URL resolver |
| `public/resume.pdf` | Replace this actual PDF to update downloads |

See [CONTENT_EDITING.md](CONTENT_EDITING.md) for exact properties and examples.

## Vercel deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for GitHub import, Node/build settings, `main` production branch, public access, domains, and automatic deployment. `vercel.json` declares the existing static-export build. The requested `arun-portfolio.vercel.app` is a preference, not a claim that it is available or deployed.

Vercel account authorization is required before the project can be created and linked. No Vercel token or private credentials belong in this repository. The site needs no secrets to deploy. Once linked, Vercel deploys pushes/merges to `main` automatically.

## Current limitations and assets

- `/admin` is a public setup overview with no write API. The optional future Supabase scaffold is documented in [ADMIN_SETUP.md](ADMIN_SETUP.md); it does not block deployment.
- Contact composes an email in the visitor's email app. It does not send from a server.
- LinkedIn, project repository/demo URLs, and actual screenshots were not supplied. They stay omitted. Current visuals are labeled conceptual illustrations.
- Resume metrics are self-reported. Job titles follow the explicit brief. No additional performance claims have been invented.
- See [QA_RESULTS.md](QA_RESULTS.md) for checks performed and remaining limits.
