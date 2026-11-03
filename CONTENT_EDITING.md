# Editing content

All public sections render from typed exports in `src/content/`:

- `profile.ts`: name, location, email, headline, subtitle, summary, about, interests.
- `projects.ts`: complete Project[] (type in types.ts).
- `experience.ts`: complete Experience[].
- `skills.ts`: category-to-skill arrays.
- `education.ts`: degree, dates, GPA, awards, courses, certifications.
- `socials.ts`: verified GitHub and email links. To add LinkedIn, add a verified personal URL and render it through the generic social-links pattern; the current contact UI specifically presents GitHub and email.
- `site-config.ts`: navigation, title, description, canonical URL, resume path.

## Projects

Copy an existing object; assign unique `id` and URL-safe `slug`. Supply title, shortDescription, fullDescription, technologies, category, date, image, gallery, highlights, metrics, featured, published, and displayOrder. Optional githubUrl/liveUrl appear only when supplied. Problem, solution, architecture, and challenges populate the case study. Do not add unverified numbers. Use categories All (UI only), AI/ML, Full Stack, Backend, Data, Cloud, Security. Assign multiple categories as needed.

Add: append an object. Edit: change its values. Delete: remove the object. Hide: set `published:false` (also removes generated detail route and sitemap entry). Reorder: change `displayOrder` (ascending). Feature: set `featured:true` to show the badge. All published projects appear in the searchable grid. Rebuild after every change; static routes are generated at build time.

Put images in `public/visuals/`, reference `/visuals/name.webp`, and add screenshot paths to gallery. Replace conceptual illustrations with real screenshots when available; use accurate alt text.

## Experience

Append or copy an object with a unique id, company, role, location, startDate, endDate, description, achievements, technologies, published, and displayOrder. Edit any value. Remove the object to delete, set published:false to hide, and adjust displayOrder to reorder. UI sorts ascending automatically.

## Resume and publishing

Replace `public/resume.pdf` with the intended public document. Do not put unrelated private documents in public/. Run lint, typecheck, and build, then deploy. Optional URLs must use trusted https: destinations; content files are trusted source code, not an untrusted submission surface.
