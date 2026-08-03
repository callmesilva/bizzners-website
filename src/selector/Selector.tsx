import { Link } from "react-router-dom";
import { Logo } from "../brand/Logo";
import { site } from "../content/site";
import "./selector.css";

interface Concept {
  n: string;
  key: "simple" | "modern" | "wild";
  name: string;
  to: string;
  accent: string;
  pitch: string;
  tags: string[];
  look: string[];
}

const CONCEPTS: Concept[] = [
  {
    n: "01",
    key: "simple",
    name: "Simple",
    to: "/simple",
    accent: "#6c9bff",
    pitch:
      "Quiet confidence. Typography, whitespace and the brand navy doing all the talking.",
    tags: ["CSS-only motion", "Lightest load", "Minimal imagery"],
    look: ["Soft scroll reveals", "Editorial numbered toolkit", "Calm, airy pacing"],
  },
  {
    n: "02",
    key: "modern",
    name: "Modern",
    to: "/modern",
    accent: "#7c93f5",
    pitch:
      "2026 editorial-tech. Cream paper, oversized serif moments, bento layouts in motion.",
    tags: ["Motion reveals", "Animated cycle wheel", "Mobile-tamed"],
    look: ["Bento method grid", "Serif italic accents", "Sticky glass nav"],
  },
  {
    n: "03",
    key: "wild",
    name: "Wild",
    to: "/wild",
    accent: "#ff5d6c",
    pitch:
      "A global trade command center. WebGL globe, pinned scroll scenes, kinetic type.",
    tags: ["three.js globe", "GSAP scroll scenes", "Desktop showpiece"],
    look: ["Trade arcs out of Panamá", "Pinned negotiation cycle", "Custom cursor & marquees"],
  },
];

function Poster({ concept }: { concept: Concept["key"] }) {
  if (concept === "simple") {
    return (
      <div className="poster poster--simple" aria-hidden="true">
        <span className="poster__dot" />
        <span className="poster__bar poster__bar--title" />
        <span className="poster__bar" />
        <span className="poster__bar poster__bar--short" />
        <span className="poster__band" />
        <span className="poster__chip" />
      </div>
    );
  }
  if (concept === "modern") {
    return (
      <div className="poster poster--modern" aria-hidden="true">
        <span className="poster__cell poster__cell--serif">B.</span>
        <span className="poster__cell poster__cell--cobalt" />
        <span className="poster__cell poster__cell--lines">
          <i />
          <i />
          <i />
        </span>
        <span className="poster__cell poster__cell--num">08</span>
      </div>
    );
  }
  return (
    <div className="poster poster--wild" aria-hidden="true">
      <span className="poster__stars" />
      <span className="poster__ring">
        <i className="poster__arc poster__arc--a" />
        <i className="poster__arc poster__arc--b" />
      </span>
      <span className="poster__node poster__node--a" />
      <span className="poster__node poster__node--b" />
      <span className="poster__tick" />
    </div>
  );
}

export default function Selector() {
  return (
    <div className="selector">
      <header className="sel-top">
        <Logo size={26} className="sel-logo" />
        <span className="sel-top__chip">Concept review · 2026</span>
      </header>

      <section className="sel-hero">
        <p className="sel-kicker">{site.brand.domain} — redesign proposal</p>
        <h1 className="sel-title">
          Three directions.
          <br />
          One brand.
        </h1>
        <p className="sel-sub">
          Every concept is a full, working site built from the 2024 brochure — same
          content, three temperatures. Explore each one and tell us which feels like
          Bizzners.
        </p>
      </section>

      <section className="sel-grid" aria-label="Design concepts">
        {CONCEPTS.map((c, i) => (
          <Link
            key={c.key}
            to={c.to}
            className={`sel-card sel-card--${c.key}`}
            style={{ "--acc": c.accent, "--i": i } as React.CSSProperties}
          >
            <div className="sel-card__head">
              <span className="sel-card__n">{c.n}</span>
              <span className="sel-card__name">{c.name}</span>
              <kbd className="sel-card__kbd">{i + 1}</kbd>
            </div>
            <Poster concept={c.key} />
            <p className="sel-card__pitch">{c.pitch}</p>
            <ul className="sel-card__tags">
              {c.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="sel-card__look">
              <span className="sel-card__look-label">What to look for</span>
              <ul>
                {c.look.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
            <span className="sel-card__cta">
              Open concept
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </span>
          </Link>
        ))}
      </section>

      <footer className="sel-foot">
        <p className="sel-foot__hint">
          Press <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> to jump between concepts —{" "}
          <kbd>0</kbd> brings you back. A floating switcher rides along on every demo.
        </p>
        <p className="sel-foot__note">
          Same copy, same structure in all three — an honest comparison. Photography is
          placeholder; generation prompts ship in <code>PROMPTS.md</code>.
        </p>
        <p className="sel-foot__legal">{site.legal}</p>
      </footer>
    </div>
  );
}
