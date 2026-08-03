import { Link } from "react-router-dom";
import { Logo } from "../brand/Logo";
import { site } from "../content/site";
import "./selector.css";

interface Concept {
  n: string;
  key: "simple" | "modern" | "wild";
  name: string;
  accent: string;
  pitch: string;
  tags: string[];
  variantA: { to: string; name: string; blurb: string };
  variantB: { to: string; name: string; blurb: string };
}

const CONCEPTS: Concept[] = [
  {
    n: "01",
    key: "simple",
    name: "Simple",
    accent: "#6c9bff",
    pitch:
      "Quiet confidence. Typography, whitespace and the brand navy doing all the talking.",
    tags: ["CSS-only motion", "Lightest load", "Minimal imagery"],
    variantA: {
      to: "/simple",
      name: "Quiet",
      blurb: "Warm paper, airy editorial rhythm",
    },
    variantB: {
      to: "/simple-b",
      name: "Swiss",
      blurb: "Cool white, hairline grid, mono indexes",
    },
  },
  {
    n: "02",
    key: "modern",
    name: "Modern",
    accent: "#7c93f5",
    pitch:
      "2026 trends in two temperatures — serif editorial bento, or dark aurora glass.",
    tags: ["Motion reveals", "Live cycle piece", "Mobile-tamed"],
    variantA: {
      to: "/modern",
      name: "Editorial",
      blurb: "Cream paper, serif moments, animated wheel",
    },
    variantB: {
      to: "/modern-b",
      name: "Aurora",
      blurb: "Night glass, gradient ink, drifting light",
    },
  },
  {
    n: "03",
    key: "wild",
    name: "Wild",
    accent: "#ff5d6c",
    pitch:
      "The showpieces. A WebGL trade globe — or a brutalist cargo manifest in motion.",
    tags: ["GSAP scroll scenes", "Desktop showpiece", "Custom chrome"],
    variantA: {
      to: "/wild",
      name: "Command Center",
      blurb: "three.js globe, pinned cycle, dark HUD",
    },
    variantB: {
      to: "/wild-b",
      name: "Manifest",
      blurb: "Cargo-paper brutalism, container train",
    },
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
          Two takes on each.
        </h1>
        <p className="sel-sub">
          Six full working sites built from the 2024 brochure — same content in every
          one, so the comparison is honest. Explore them all and tell us which feels
          like Bizzners.
        </p>
      </section>

      <section className="sel-grid" aria-label="Design concepts">
        {CONCEPTS.map((c, i) => (
          <article
            key={c.key}
            className={`sel-card sel-card--${c.key}`}
            style={{ "--acc": c.accent, "--i": i } as React.CSSProperties}
          >
            <div className="sel-card__head">
              <span className="sel-card__n">{c.n}</span>
              <span className="sel-card__name">{c.name}</span>
              <kbd className="sel-card__kbd">{i + 1}</kbd>
            </div>
            <Link to={c.variantA.to} className="sel-card__posterlink" aria-label={`Open ${c.name} · variant A`}>
              <Poster concept={c.key} />
            </Link>
            <p className="sel-card__pitch">{c.pitch}</p>
            <ul className="sel-card__tags">
              {c.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="sel-card__variants">
              {[c.variantA, c.variantB].map((v, vi) => (
                <Link key={v.to} to={v.to} className="sel-variant">
                  <span className="sel-variant__badge">{vi === 0 ? "A" : "B"}</span>
                  <span className="sel-variant__meta">
                    <b>{v.name}</b>
                    <i>{v.blurb}</i>
                  </span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>

      <footer className="sel-foot">
        <p className="sel-foot__hint">
          Press <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> to jump between concepts,{" "}
          <kbd>B</kbd> to flip the A/B variant — <kbd>0</kbd> brings you back. A floating
          switcher rides along on every demo.
        </p>
        <p className="sel-foot__note">
          Same copy, same structure in all six — an honest comparison. Photography is
          placeholder; generation prompts ship in <code>PROMPTS.md</code>.
        </p>
        <p className="sel-foot__legal">{site.legal}</p>
      </footer>
    </div>
  );
}
