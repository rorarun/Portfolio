const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const ts = require("typescript");
require.extensions[".ts"] = (module, file) =>
  module._compile(
    ts.transpileModule(fs.readFileSync(file, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS },
    }).outputText,
    file,
  );
const { projects } = require("../src/content/projects.ts");
const { socials } = require("../src/content/socials.ts");
const { site_config } = require("../src/content/site-config.ts");
const { resolveSiteUrl } = require("../src/lib/site-url.ts");
const root = path.resolve(__dirname, "../out");
const read = (file) => fs.readFileSync(file, "utf8");
const published = projects.filter((p) => p.published);
assert.equal(
  new Set(projects.map((p) => p.slug)).size,
  projects.length,
  "Unique project slugs",
);
assert.equal(resolveSiteUrl({}), "http://localhost:3000");
assert.equal(
  resolveSiteUrl({
    VERCEL_PROJECT_PRODUCTION_URL: "assigned-domain.vercel.app",
  }),
  "https://assigned-domain.vercel.app",
);
assert.equal(
  resolveSiteUrl({
    NEXT_PUBLIC_SITE_URL: "https://confirmed.example",
    VERCEL_PROJECT_PRODUCTION_URL: "assigned-domain.vercel.app",
  }),
  "https://confirmed.example",
);
for (const bad of [
  "javascript:alert(1)",
  "https://example.com/path",
  "https://user:pass@example.com",
])
  assert.throws(() => resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: bad }));
for (const p of published) {
  assert.match(p.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert(
    fs.existsSync(path.join(root, "projects", p.slug, "index.html")),
    `Missing page: ${p.slug}`,
  );
  for (const asset of [p.image, ...p.gallery])
    assert(
      fs.existsSync(path.join(root, asset)),
      `Missing project asset: ${asset}`,
    );
  for (const value of [p.githubUrl, p.liveUrl].filter(Boolean))
    assert.equal(new URL(value).protocol, "https:");
}
for (const social of socials)
  assert(["https:", "mailto:"].includes(new URL(social.url).protocol));
const home = read(path.join(root, "index.html"));
for (const name of site_config.navigation)
  assert(
    home.includes(`id="${name.toLowerCase()}"`),
    `Missing section: ${name}`,
  );
for (const file of [
  "resume.pdf",
  "sitemap.xml",
  "robots.txt",
  "admin/index.html",
  "icon.svg",
  "favicon.ico",
  "apple-touch-icon.png",
  "og-image.png",
])
  assert(fs.existsSync(path.join(root, file)), `Missing public asset: ${file}`);
assert.equal(
  fs.readFileSync(path.join(root, "resume.pdf")).subarray(0, 4).toString(),
  "%PDF",
);
assert(
  fs
    .readFileSync(path.join(root, "resume.pdf"))
    .equals(fs.readFileSync(path.resolve(__dirname, "../public/resume.pdf"))),
  "Exported resume must match the public source",
);
const sitemap = read(path.join(root, "sitemap.xml"));
assert(sitemap.includes(site_config.url));
for (const p of published)
  assert(sitemap.includes(`${site_config.url}/projects/${p.slug}/`));
assert(
  home.includes(`href="${site_config.url}/"`),
  "Home canonical should use the configured origin",
);
assert(!home.includes("chatgpt.site"), "No previous-host metadata");
const cssRoot = path.join(root, "_next/static/css");
assert(
  fs
    .readdirSync(cssRoot)
    .some((f) =>
      read(path.join(cssRoot, f)).includes("prefers-reduced-motion"),
    ),
);
let links = 0;
function walk(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, item.name);
    if (item.isDirectory()) walk(file);
    else if (item.name.endsWith(".html")) {
      const html = read(file);
      for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
        const href = match[1];
        links++;
        if (/^(https?:|mailto:)/.test(href)) {
          assert(
            !["https://linkedin.com", "https://portfolio.com"].includes(href),
          );
          continue;
        }
        const url = new URL(
          href,
          "https://static.test/" +
            path.relative(root, file).replaceAll(path.sep, "/"),
        );
        let target = path.join(root, decodeURIComponent(url.pathname));
        if (fs.existsSync(target) && fs.statSync(target).isDirectory())
          target = path.join(target, "index.html");
        assert(
          fs.existsSync(target),
          `Broken link ${href} in ${path.relative(root, file)}`,
        );
        if (url.hash && target.endsWith(".html"))
          assert(
            read(target).includes(
              `id="${decodeURIComponent(url.hash.slice(1))}"`,
            ),
            `Missing anchor ${href}`,
          );
      }
    }
  }
}
walk(root);
console.log(
  `PASS: ${published.length} case studies, ${links} link targets, public assets/PDF integrity, social URLs, canonical origin, sitemap/robots, and reduced-motion CSS.`,
);
