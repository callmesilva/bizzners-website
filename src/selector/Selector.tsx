import { Link } from "react-router-dom";
import { Logo } from "../brand/Logo";
import { FLAGS, isRouteVisible } from "../config/flags";
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

/** Feature flags decide which concepts and variants the client can reach. */
const SHOWN = CONCEPTS.map((c) => ({
  ...c,
  variants: [
    { ...c.variantA, badge: "A" },
    { ...c.variantB, badge: "B" },
  ].filter((v) => isRouteVisible(v.to)),
})).filter((c) => c.variants.length > 0);

const COUNT_WORD = ["No", "One", "Two", "Three"];
const COUNT_WORD_ES = ["Ningún", "Un", "Dos", "Tres", "Cuatro", "Cinco", "Seis"];

/** Headline second line: honest about how many takes are on the table. */
function takesLine(counts: number[]) {
  const min = Math.min(...counts);
  const max = Math.max(...counts);
  if (min !== max) return "A and B takes to compare.";
  return max === 1 ? "One take on each." : `${COUNT_WORD[max]} takes on each.`;
}

export default function Selector() {
  const total = SHOWN.reduce((n, c) => n + c.variants.length, 0);
  const canFlipVariant = SHOWN.some((c) => c.variants.length > 1);

  return (
    <div className="selector">
      <header className="sel-top">
        <Logo size={26} className="sel-logo" />
        <span className="sel-top__chip">Concept review · 2026</span>
      </header>

      <section className="sel-hero">
        <p className="sel-kicker">{site.brand.domain} — redesign proposal</p>
        <h1 className="sel-title">
          {COUNT_WORD[SHOWN.length] ?? SHOWN.length} direction
          {SHOWN.length === 1 ? "" : "s"}.
          <br />
          {takesLine(SHOWN.map((c) => c.variants.length))}
        </h1>
        {/* instructions for the client are in Spanish; the concepts stay in English */}
        <p className="sel-sub">
          {total === 1
            ? "Un sitio completo construido"
            : `${COUNT_WORD_ES[total] ?? total} sitios completos construidos`}{" "}
          a partir del folleto 2024 — el mismo contenido en{" "}
          {total === 1 ? "él" : "todos"}, para que la comparación sea honesta.{" "}
          {total === 1 ? "Ábrelo, recórrelo" : "Ábrelos, recórrelos"} y dinos cuál se
          siente como Bizzners.
        </p>
        {!FLAGS.animationsA && (
          <p className="sel-note">
            <b>Nota de revisión:</b> las animaciones están desactivadas en esta versión
            para que la conversación se centre primero en el layout. Las encendemos
            después de la reunión.
          </p>
        )}
      </section>

      <section
        className="sel-grid"
        aria-label="Design concepts"
        style={{ "--cols": SHOWN.length } as React.CSSProperties}
      >
        {SHOWN.map((c, i) => (
          <article
            key={c.key}
            className={`sel-card sel-card--${c.key}`}
            style={{ "--acc": c.accent, "--i": i } as React.CSSProperties}
          >
            <div className="sel-card__head">
              <span className="sel-card__n">{c.n}</span>
              <span className="sel-card__name">{c.name}</span>
              <kbd className="sel-card__kbd">{c.n.replace(/^0/, "")}</kbd>
            </div>
            <Link
              to={c.variants[0].to}
              className="sel-card__posterlink"
              aria-label={`Open ${c.name} · ${c.variants[0].name}`}
            >
              <Poster concept={c.key} />
            </Link>
            <p className="sel-card__pitch">{c.pitch}</p>
            <ul className="sel-card__tags">
              {c.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="sel-card__variants">
              {c.variants.map((v) => (
                <Link key={v.to} to={v.to} className="sel-variant">
                  <span className="sel-variant__badge">{v.badge}</span>
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
          Presiona{" "}
          {SHOWN.map((c, i) => (
            <span key={c.key}>
              {i > 0 && " "}
              <kbd>{c.n.replace(/^0/, "")}</kbd>
            </span>
          ))}{" "}
          para saltar entre conceptos
          {canFlipVariant && (
            <>
              , <kbd>B</kbd> para alternar la variante A/B
            </>
          )}{" "}
          — <kbd>0</kbd> te trae de vuelta aquí. Un selector flotante te acompaña en cada
          demo.
        </p>
        <p className="sel-foot__note">
          Mismo texto y misma estructura en {total === 1 ? "la maqueta" : "todas"} — una
          comparación honesta. Las fotos son de relleno; los prompts para generarlas
          están en <code>PROMPTS.md</code>.
        </p>
        <p className="sel-foot__legal">{site.legal}</p>
      </footer>
    </div>
  );
}
