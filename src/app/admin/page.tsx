import Link from "next/link";
import { projects } from "@/content/projects";
export const metadata = {
  title: "Content administration",
  robots: { index: false, follow: false },
};
export default function Admin() {
  return (
    <main className="admin-panel">
      <Link className="text-link" href="/">
        ← Portfolio
      </Link>
      <h1>Content studio</h1>
      <div className="admin-status">
        <strong>Admin integration is not configured</strong>
        <p>
          This is a setup overview, not a working CMS. Sign-in, uploads,
          persistent edits, draft previews, publishing, deletion, and reordering
          are unavailable until a secure backend and authenticated editor are
          implemented and deployed.
        </p>
      </div>
      <h2 style={{ marginTop: 35 }}>Your content, in one place.</h2>
      <p>
        The portfolio currently reads typed content files. Edit these files and
        rebuild to publish changes. No private content or write endpoint is
        exposed here.
      </p>
      {projects.map((p) => (
        <article key={p.id}>
          <strong>{p.title}</strong>
          <p>
            {p.published ? "Published" : "Hidden"} ·{" "}
            {p.featured ? "Featured" : "Standard"} · Order {p.displayOrder}
          </p>
          <Link className="text-link" href={`/projects/${p.slug}/`}>
            View published page ↗
          </Link>
        </article>
      ))}
      <p>
        See <code>CONTENT_EDITING.md</code> for working file edits and{" "}
        <code>ADMIN_SETUP.md</code> for the Supabase integration scaffold and
        remaining implementation.
      </p>
    </main>
  );
}
