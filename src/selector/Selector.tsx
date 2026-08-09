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

/**
 * The selector is the client-facing page, so every string on it is Spanish —
 * the demos themselves stay in English (see src/content/site.ts).
 */
const CONCEPTS: Concept[] = [
  {
    n: "01",
    key: "simple",
    name: "Simple",
    accent: "#6c9bff",
    pitch:
      "Confianza serena. Tipografía, aire y el azul marino de la marca haciendo todo el trabajo.",
    tags: ["Movimiento solo con CSS", "La carga más ligera", "Imágenes mínimas"],
    variantA: {
      to: "/simple",
      name: "Sereno",
      blurb: "Papel cálido, ritmo editorial y aireado",
    },
    variantB: {
      to: "/simple-b",
      name: "Suizo",
      blurb: "Blanco frío, retícula fina, índices mono",
    },
  },
  {
    n: "02",
    key: "modern",
    name: "Moderno",
    accent: "#7c93f5",
    pitch:
      "Tendencias 2026 en dos temperaturas — bento editorial con serifas, o cristal aurora en oscuro.",
    tags: ["Revelados con movimiento", "Ciclo animado en vivo", "Domado para móvil"],
    variantA: {
      to: "/modern",
      name: "Editorial",
      blurb: "Papel crema, serifas, rueda animada",
    },
    variantB: {
      to: "/modern-b",
      name: "Aurora",
      blurb: "Cristal nocturno, tinta degradada",
    },
  },
  {
    n: "03",
    key: "wild",
    name: "Audaz",
    accent: "#ff5d6c",
    pitch:
      "Las piezas de exhibición. Un globo del comercio en WebGL — o un manifiesto de carga brutalista en movimiento.",
    tags: ["Escenas de scroll con GSAP", "Vitrina de escritorio", "Interfaz a medida"],
    variantA: {
      to: "/wild",
      name: "Centro de mando",
      blurb: "Globo three.js, ciclo fijado, HUD oscuro",
    },
    variantB: {
      to: "/wild-b",
      name: "Manifiesto",
      blurb: "Papel de carga brutalista, contenedores",
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

/** masculine ("sitios") and feminine ("direcciones", "versiones") number words */
const COUNT_M = ["Ningún", "Un", "Dos", "Tres", "Cuatro", "Cinco", "Seis"];
const COUNT_F = ["Ninguna", "Una", "Dos", "Tres", "Cuatro", "Cinco", "Seis"];

/** Headline second line: honest about how many takes are on the table. */
function takesLine(counts: number[]) {
  const min = Math.min(...counts);
  const max = Math.max(...counts);
  if (min !== max) return "Versiones A y B para comparar.";
  return max === 1
    ? "Una versión de cada una."
    : `${COUNT_F[max] ?? max} versiones de cada una.`;
}

/** Spanish rendering of site.legal — the demos keep the English original. */
const LEGAL_ES =
  "Bizzners y bizzners.com son marcas registradas de Bizzners Business Builders. Bizzners opera bajo las leyes de la República de Panamá.";

export default function Selector() {
  const total = SHOWN.reduce((n, c) => n + c.variants.length, 0);
  const canFlipVariant = SHOWN.some((c) => c.variants.length > 1);

  return (
    <div className="selector">
      <header className="sel-top">
        <Logo size={26} className="sel-logo" />
        <span className="sel-top__chip">Revisión de conceptos · 2026</span>
      </header>

      <section className="sel-hero">
        <p className="sel-kicker">{site.brand.domain} — propuesta de rediseño</p>
        <h1 className="sel-title">
          {COUNT_F[SHOWN.length] ?? SHOWN.length}{" "}
          {SHOWN.length === 1 ? "dirección." : "direcciones."}
          <br />
          {takesLine(SHOWN.map((c) => c.variants.length))}
        </h1>
        <p className="sel-sub">
          {total === 1
            ? "Un sitio completo construido"
            : `${COUNT_M[total] ?? total} sitios completos construidos`}{" "}
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
        aria-label="Conceptos de diseño"
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
              aria-label={`Abrir ${c.name} · ${c.variants[0].name}`}
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
        <p className="sel-foot__legal">{LEGAL_ES}</p>
      </footer>
    </div>
  );
}
