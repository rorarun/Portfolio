# Edit portfolio content

Make edits in VS Code, run `npm run lint`, `npm run typecheck`, `npm run build`, `npm run verify`, and commit the source files. Merging to GitHub `main` triggers deployment only after Vercel is linked. Changes in the cloud workspace do not automatically appear on your Windows PC; clone/pull the repository.

## Exact files and properties

| File | Properties |
| --- | --- |
| `src/content/profile.ts` | `name`, `firstName`, `location`, `shortLocation`, `email`, `headline`, `subtitle`, `summary`, `about`, `interests` (reserved, not currently rendered) |
| `src/content/projects.ts` | See Project entries below |
| `src/content/experience.ts` | See Experience entries below |
| `src/content/skills.ts` | Category keys and arrays of skill names; each category renders automatically |
| `src/content/education.ts` | `university`, `degree`, `location` (reserved), `dates`, `shortLabel` (hero), `expectedGraduation` (about), `gpa`, `awards`, `coursework`, `certifications` |
| `src/content/socials.ts` | Array of `{label,url}`; non-Email entries automatically render in the hero and contact area. Email derives from `profile.email`; contact email always uses that profile value. |
| `src/content/site-config.ts` | `title`, `description`, `navigation`, `resume`, and `url` resolver; use `NEXT_PUBLIC_SITE_URL` only for a confirmed canonical domain |
| `public/resume.pdf` | Replace with a valid public PDF, keeping the filename. No other file changes needed. |
| `public/visuals/` | Public screenshot/illustration assets referenced by projects |
| `public/icon.svg`, `public/favicon.ico`, `public/apple-touch-icon.png`, `public/og-image.png` | Branding assets for browser tabs, devices, and link sharing |

The brief's editorial headings and decorative systems illustration remain in components; these are not work-history data. Navigation names must match existing section IDs (`home`, `about`, `experience`, `projects`, `skills`, `education`, `contact`).

## Projects: add, edit, delete, hide, reorder

`src/content/projects.ts` exports a typed `Project[]`; types live in `src/content/types.ts`.

Copy an existing object and set a unique `id` and URL-safe `slug`. Required fields:

- `title`, `shortDescription`, `fullDescription`, `date`
- `technologies`: string array
- `category`: array using `AI/ML`, `Full Stack`, `Backend`, `Data`, `Cloud`, `Security` (All is only the UI reset)
- `image`: path under `public/`, such as `/visuals/my-project.webp`
- `gallery`: screenshot path array (use `[]` if absent)
- `highlights`: verified results as strings
- `metrics`: `{value,label}[]`; use `[]` when no measurable result is available
- `featured`, `published`: booleans
- `displayOrder`: ascending number, lower first

Optional: `githubUrl`, `liveUrl`, `problem`, `solution`, `architecture`, `challenges`, and `imageKind` (`concept` or `screenshot`, default concept). Never invent URLs or results.

Add: append an object. Edit: change values. Delete: remove the object. Hide: set `published:false`; this removes its card, generated detail page, and sitemap entry after the next build. Reorder: change `displayOrder`. Feature: set `featured:true` to display a badge. Every published project remains searchable and filterable.

For a real screenshot, put the image in `public/visuals/`, set `image` to its public path and `imageKind:'screenshot'`. The card and detail image then use the actual screenshot. Add extra images to `gallery`. Current visuals are labeled conceptual diagrams and must not be described as screenshots. Keep filenames URL-safe and optimize image size before committing.

`githubUrl` and `liveUrl` appear only when provided. Use trusted `https://` URLs to actual projects. Detail pages generate at `/projects/<slug>/`; rebuild after changing slugs.

## Work experience

Each `Experience` in `src/content/experience.ts` supports:

`id`, `company`, `role`, `location`, `startDate`, `endDate`, `description`, `achievements` (string array), `technologies` (string array), `published`, `displayOrder`.

Append a unique entry to add; change properties to edit; remove the object to delete; set `published:false` to hide; adjust `displayOrder` to reorder. No component changes are required.

## Social links

Edit the GitHub URL in `src/content/socials.ts`. To add LinkedIn, append an entry using your verified personal profile:

```typescript
{ label: 'LinkedIn', url: 'https://www.linkedin.com/in/YOUR_REAL_PROFILE/' }
```

Replace the example before saving; never deploy that example URL. The matching icon and link render automatically. Remove an entry to hide it. Do not use generic linkedin.com or made-up project repositories.

## Resume and email

Replace `public/resume.pdf`, then verify `/resume.pdf` in the build. Change `profile.email` to update contact mailto, composer destination, copy button, and the derived Email social entry. Only place intended public files under `public/`.

## Dashboard

The admin dashboard remains a future enhancement. Typed file editing is fully usable without Supabase. See ADMIN_SETUP.md for the explicitly incomplete scaffold.
