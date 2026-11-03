"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Download,
  Github,
  MapPin,
  GraduationCap,
  Menu,
  X,
  Sun,
  Moon,
  Code2,
  Database,
  Layers,
  Braces,
  Copy,
  Check,
  Search,
  ChevronDown,
  Linkedin,
  ExternalLink,
} from "lucide-react";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { skills } from "@/content/skills";
import { education } from "@/content/education";
import { socials } from "@/content/socials";
import { site_config } from "@/content/site-config";
function SocialLinks({ iconsOnly = false }: { iconsOnly?: boolean }) {
  return (
    <>
      {socials
        .filter((s) => s.label !== "Email")
        .map((s) => {
          const Icon =
            s.label === "GitHub"
              ? Github
              : s.label === "LinkedIn"
                ? Linkedin
                : ExternalLink;
          return (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${s.label} profile`}
            >
              <Icon size={iconsOnly ? 18 : 16} />
              {!iconsOnly && ` ${s.label} ↗`}
            </a>
          );
        })}
    </>
  );
}
const ordered = projects
  .filter((p) => p.published)
  .sort((a, b) => a.displayOrder - b.displayOrder);
export function Header() {
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -60% 0px" },
    );
    document
      .querySelectorAll("main>section[id]")
      .forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    let v = false;
    try {
      v = localStorage.getItem("theme") === "light";
    } catch {
      /* Theme works without persistent storage. */
    }
    setLight(v);
    document.documentElement.dataset.theme = v ? "light" : "dark";
  }, []);
  return (
    <header>
      <Link className="brand" href="/#home" aria-label="Arun home">
        <span className="logo">
          a<span>.</span>
        </span>
        arun<span className="muted"> / portfolio</span>
      </Link>
      <nav className={open ? "open" : ""} aria-label="Main navigation">
        {site_config.navigation.map((n) => (
          <a
            className={active === n.toLowerCase() ? "active" : ""}
            aria-current={active === n.toLowerCase() ? "location" : undefined}
            onClick={() => setOpen(false)}
            key={n}
            href={`/#${n.toLowerCase()}`}
          >
            {n}
          </a>
        ))}
      </nav>
      <div className="nav-actions">
        <button
          className="icon-button"
          aria-label="Toggle color theme"
          aria-pressed={light}
          onClick={() => {
            const v = !light;
            setLight(v);
            document.documentElement.dataset.theme = v ? "light" : "dark";
            try {
              localStorage.setItem("theme", v ? "light" : "dark");
            } catch {
              /* Keep the current in-memory theme. */
            }
          }}
        >
          {light ? <Moon size={17} /> : <Sun size={17} />}
        </button>
        <a className="button small" href={site_config.resume} download>
          <Download size={14} /> Resume
        </a>
        <button
          className="mobile icon-button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer>
      <Link className="brand" href="/#home">
        <span className="logo">
          a<span>.</span>
        </span>
        {profile.name}
      </Link>
      <span>Thoughtfully engineered. Always evolving.</span>
      <Link href="/#home">Back to top ↑</Link>
    </footer>
  );
}
function SystemVisual() {
  return (
    <div
      className="system-visual"
      aria-label="Abstract connected systems illustration"
      role="img"
    >
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="orbit orbit-three" />
      <div className="system-core">
        <Layers size={56} strokeWidth={1} />
        <span>BUILD. CONNECT. SCALE.</span>
      </div>
      <div className="node node-one">
        <Code2 size={20} />
        <span>backend.ts</span>
        <i />
      </div>
      <div className="node node-two">
        <Database size={20} />
        <span>data.pipeline</span>
        <i />
      </div>
      <div className="node node-three">
        <Braces size={20} />
        <span>intelligence.py</span>
        <i />
      </div>
      <span className="coordinate c-one">01 / SYSTEM ARCHITECTURE</span>
      <span className="coordinate c-two">∞ POSSIBILITIES</span>
      <div className="visual-caption">
        <span className="dot" /> Ideas into reliable systems <span>↗</span>
      </div>
    </div>
  );
}
function Label({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="eyebrow">
      <span>{n}</span> / {children}
    </div>
  );
}
export default function Portfolio() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-pending");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document.querySelectorAll("main>section:not(.hero)").forEach((section) => {
      section.classList.add("reveal-pending");
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);
  const [formStatus, setFormStatus] = useState("");
  const filtered = ordered.filter(
    (p) =>
      (category === "All" || p.category.includes(category)) &&
      `${p.title} ${p.technologies.join(" ")} ${p.shortDescription}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <Header />
      <main>
        <section id="home" className="hero">
          <div className="hero-content">
            <div className="availability">
              <span className="dot" /> OPEN TO CO-OP & INTERNSHIP OPPORTUNITIES
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Hi, I’m <span>{profile.firstName}.</span>
              <br />I build what’s
              <br />
              <span className="outlined">next.</span>
            </motion.h1>
            <h2>
              {profile.headline}
              <span> / </span>
              {profile.subtitle}
            </h2>
            <p>{profile.summary}</p>
            <div className="hero-buttons">
              <a className="button primary" href="#projects">
                Explore my work <ArrowUpRight size={17} />
              </a>
              <a className="button" download href={site_config.resume}>
                <Download size={16} /> Download resume
              </a>
            </div>
            <div className="hero-meta">
              <span>
                <MapPin size={14} /> {profile.shortLocation}
              </span>
              <span>
                <GraduationCap size={16} /> {education.shortLabel}
              </span>
              <SocialLinks iconsOnly />
            </div>
          </div>
          <SystemVisual />
          <a className="scroll-cue" href="#about">
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown size={15} />
          </a>
          <span className="hero-side-note">
            CODE WITH PURPOSE. BUILD WITH CURIOSITY.
          </span>
        </section>
        <div className="ticker">
          <span>ENGINEERING AT THE INTERSECTION OF</span>
          <b>Software systems</b>
          <i>✳</i>
          <b>Artificial intelligence</b>
          <i>✳</i>
          <b>Data engineering</b>
          <i>✳</i>
          <b>Cloud infrastructure</b>
        </div>
        <section id="about">
          <Label n="01">A LITTLE ABOUT ME</Label>
          <div className="about-layout">
            <h2>
              Curiosity drives me.
              <br />
              <span className="muted">Engineering grounds me.</span>
            </h2>
            <div>
              <p className="large-copy">{profile.about}</p>
              <p className="muted">
                Based in {profile.location}. Studying {education.degree} at{" "}
                {education.university}, with an expected graduation in{" "}
                {education.expectedGraduation}.
              </p>
            </div>
          </div>
          <div className="about-stats">
            <div>
              <span className="tiny">ACADEMIC FOUNDATION</span>
              <strong>{education.gpa}</strong>
              <span>CGPA · Acadia University</span>
            </div>
            <div>
              <span className="tiny">RECOGNITION</span>
              <strong>Dean’s List</strong>
              <span>2024–25 & 2025–26</span>
            </div>
            <div>
              <span className="tiny">MY APPROACH</span>
              <strong>Build. Measure. Refine.</strong>
              <span>Practical systems. Meaningful outcomes.</span>
            </div>
          </div>
        </section>
        <section id="projects">
          <div className="section-heading">
            <div>
              <Label n="02">SELECTED WORK</Label>
              <h2>Ideas, engineered.</h2>
            </div>
            <a
              className="text-link"
              href="#project-grid"
              onClick={() => {
                setCategory("All");
                setQuery("");
              }}
            >
              View all projects <ArrowUpRight size={16} />
            </a>
          </div>
          <p className="section-intro">
            A selection of systems I’ve built, optimized, and learned from.
          </p>
          <div className="project-controls">
            <div className="filters" aria-label="Filter projects">
              {[
                "All",
                "AI/ML",
                "Full Stack",
                "Backend",
                "Data",
                "Cloud",
                "Security",
              ].map((c) => (
                <button
                  key={c}
                  aria-pressed={category === c}
                  className={category === c ? "selected" : ""}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="search">
              <Search size={15} />
              <input
                aria-label="Search projects"
                placeholder="Search projects"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </div>
          <div id="project-grid" className="project-grid">
            {filtered.map((p) => (
              <Link
                className="project-card"
                href={`/projects/${p.slug}/`}
                key={p.id}
              >
                <div className={`project-art art-${p.id}`}>
                  {p.imageKind === "screenshot" && (
                    <Image
                      fill
                      sizes="(max-width: 520px) 90vw, 45vw"
                      className="project-screenshot"
                      src={p.image}
                      alt={`${p.title} screenshot`}
                    />
                  )}
                  <span className="art-label">
                    {p.category[0]} / {p.date}
                  </span>
                  {p.featured && <span className="featured">✦ FEATURED</span>}
                  <div
                    className="art-diagram"
                    hidden={p.imageKind === "screenshot"}
                  >
                    {p.id === "storage" ? (
                      <Database size={76} strokeWidth={0.8} />
                    ) : p.id === "stream" ? (
                      <Layers size={76} strokeWidth={0.8} />
                    ) : p.id === "cloud" ? (
                      <Code2 size={76} strokeWidth={0.8} />
                    ) : (
                      <Braces size={76} strokeWidth={0.8} />
                    )}
                    <span>{p.metrics[0]?.value ?? "↗"}</span>
                    <small>
                      {p.metrics[0]?.label ?? "Explore the architecture"}
                    </small>
                  </div>
                  <div className="art-lines" />
                  <span className="concept-label">
                    {p.imageKind === "screenshot"
                      ? "PROJECT SCREENSHOT"
                      : "CONCEPTUAL SYSTEM VISUAL"}
                  </span>
                </div>
                <div className="project-body">
                  <div className="project-title">
                    <h3>{p.title}</h3>
                    <ArrowUpRight size={20} />
                  </div>
                  <p>{p.shortDescription}</p>
                  <div className="tags">
                    {p.technologies.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <div className="project-bottom">
                    <span>0{ordered.indexOf(p) + 1} / CASE STUDY</span>
                    <span>
                      Explore project <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {!filtered.length && (
            <p className="empty">
              No projects match this filter.{" "}
              <button
                onClick={() => {
                  setCategory("All");
                  setQuery("");
                }}
              >
                Show all projects
              </button>
            </p>
          )}
        </section>
        <section id="experience">
          <Label n="03">EXPERIENCE</Label>
          <h2>Learning through doing.</h2>
          <div className="timeline">
            {experience
              .filter((e) => e.published)
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .map((e) => (
                <article key={e.id}>
                  <div className="timeline-date">
                    {e.startDate} — {e.endDate}
                    <span>{e.location}</span>
                  </div>
                  <div className="timeline-content">
                    <h3>{e.role}</h3>
                    <h4>{e.company}</h4>
                    <p>{e.description}</p>
                    <ul>
                      {e.achievements.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                    <div className="tags">
                      {e.technologies.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </section>
        <section id="skills">
          <Label n="04">MY TOOLKIT</Label>
          <h2>The tools behind the work.</h2>
          <p className="section-intro">
            A growing toolkit for building dependable software, from the data
            layer to deployment.
          </p>
          <div className="skills-grid">
            {Object.entries(skills).map(([name, values], i) => (
              <article key={name}>
                <span className="skill-number">0{i + 1}</span>
                <h3>{name}</h3>
                <div className="tags">
                  {values.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="education">
          <Label n="05">FOUNDATION & RECOGNITION</Label>
          <h2>Always a student.</h2>
          <div className="education-panel">
            <div className="university">
              <GraduationCap size={32} />
              <h3>{education.university}</h3>
              <p>{education.degree}</p>
              <span className="muted">{education.dates}</span>
              <div className="tags">
                {education.awards.map((a) => (
                  <span key={a}>{a}</span>
                ))}
              </div>
              <strong className="gpa">
                {education.gpa}
                <small> CUMULATIVE GPA</small>
              </strong>
            </div>
            <div>
              <span className="tiny">RELEVANT COURSEWORK</span>
              <div className="coursework">
                {education.coursework.map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>
              <span className="tiny">CERTIFICATIONS</span>
              {education.certifications.map((c) => (
                <p className="cert" key={c}>
                  <Check size={14} />
                  {c}
                </p>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="contact-section">
          <div>
            <Label n="06">LET’S CONNECT</Label>
            <h2>
              Good things start
              <br />
              with a <span>conversation.</span>
            </h2>
            <p>
              Have an interesting problem, a co-op opportunity,
              <br />
              or an idea worth building? I’d love to hear from you.
            </p>
            <a className="email-link" href={`mailto:${profile.email}`}>
              {profile.email}
              <ArrowUpRight size={22} />
            </a>
            <div className="contact-links">
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(profile.email);
                    setCopied(true);
                  } catch {
                    setFormStatus("Email: " + profile.email);
                  }
                }}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}{" "}
                {copied ? "Copied" : "Copy email"}
              </button>
              <SocialLinks />
              <a href={site_config.resume} download>
                <Download size={16} /> Resume
              </a>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const d = new FormData(e.currentTarget);
              if (d.get("website")) return;
              const name = String(d.get("name")).trim(),
                email = String(d.get("email")).trim(),
                message = String(d.get("message")).trim();
              if (!name || !email || message.length < 10) {
                setFormStatus(
                  "Please enter your name, email, and a message of at least 10 characters.",
                );
                return;
              }
              window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Portfolio inquiry from " + name)}&body=${encodeURIComponent(message + "\n\nFrom: " + name + " <" + email + ">")}`;
              setFormStatus(
                "Your email app will open with this message. Send it there to get in touch.",
              );
            }}
          >
            <label>
              Your name
              <input
                name="name"
                autoComplete="name"
                required
                maxLength={100}
                placeholder="Alex Morgan"
              />
            </label>
            <label>
              Email address
              <input
                name="email"
                autoComplete="email"
                type="email"
                required
                maxLength={254}
                placeholder="alex@company.com"
              />
            </label>
            <label>
              What’s on your mind?
              <textarea
                name="message"
                required
                minLength={10}
                maxLength={5000}
                placeholder="Let’s build something great…"
                rows={4}
              />
            </label>
            <label className="honeypot" aria-hidden="true">
              Website
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
            <button className="button primary" type="submit">
              Compose email <ArrowUpRight size={16} />
            </button>
            <p className="form-note">
              Opens your email app. No message is sent from this website.
            </p>
            <p role="status">{formStatus}</p>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
