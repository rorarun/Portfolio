# Admin integration scaffold — not a working CMS

The deployed `/admin` page is a public setup overview of already-public project content. It exposes no credentials, private drafts, or write operations. It is NOT the requested finished private dashboard. No backend credentials are available in this environment. Adding environment variables alone does not enable editing.

Working today: typed content-file editing and rebuilds. Not implemented: login UI, authenticated editor, add/edit/delete forms, asset upload, reorder controls, draft preview, publish flow, published-content retrieval, or resume upload. These require implementation and security testing after backend setup.

## Supabase setup

1. Create a dedicated Supabase project. Disable public user registration. Enable an appropriate auth provider and allow only your deployment URL as redirect URL. Require MFA for the admin account where supported.
2. Run `supabase/schema.sql` in its SQL editor. It creates membership and draft/published content tables with RLS enabled, plus a private assets bucket restricted to admin members. Provision the owner via Auth, then insert their UUID into portfolio_admins through SQL. Never allow clients to insert their own membership.
3. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in `.env.local` and deployment configuration. The anonymous key is designed for clients; RLS is mandatory. Never expose a service-role key. `src/lib/cms.ts` is the lazy client factory.
4. Implement login and session validation, check membership, then build form editors for each content document. Validate every field with explicit schemas on the server before writes; enforce https URLs, unique IDs/slugs, numeric ordering, bounded strings, arrays, allowed categories, and valid dates. Use optimistic concurrency checks to avoid lost edits. Do not treat hiding the UI as authorization: RLS enforces access.
5. Implement a server API or restricted SQL RPC that validates drafts and atomically copies them to the published column. Expose only published content using a separate read-only view/endpoint; never grant anonymous reads on the base table (which contains drafts). Add audit records. Restrict CORS and validate Origin/CSRF on cookie-authenticated mutations.
6. Keep uploads private until validated: 5MB maximum, JPG/PNG/WebP/PDF only; inspect file signatures, decode images, scan uploads, use random object keys, disallow executable content/SVG uploads, and generate short-lived signed preview URLs. Publish only sanitized assets through a separate read path. Add authenticated draft preview and confirmation for deletion.
7. Connect the public frontend to validated published content, with typed file fallbacks. For the current static export, trigger an authenticated rebuild after publishing; runtime live editing requires changing to a server deployment and removing `output:'export'`.
8. Test as anonymous, non-admin, admin, and expired sessions. Verify drafts and storage cannot be read by non-admins, non-admin writes fail, edits persist after reload and on another device, unauthorized asset reads fail, and preview/publish remains distinct. These checks have not been run because no backend is configured.

## Contact provider

The current form uses browser validation plus a honeypot and opens a mailto composer; it is not an endpoint and cannot send automatically. A future provider endpoint must validate server-side, enforce length limits, validate email format, reject unexpected fields, check Origin, rate-limit, add a honeypot/challenge, and keep provider keys server-only. Static Sites need a Worker/server migration for such an endpoint.
