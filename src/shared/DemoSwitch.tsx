import { Link } from "react-router-dom";

const ITEMS = [
  { base: "/simple", key: "1", name: "Simple" },
  { base: "/modern", key: "2", name: "Modern" },
  { base: "/wild", key: "3", name: "Wild" },
];

/**
 * Floating pill on every demo route: overview, jump between concepts
 * (variant-preserving), and an A/B toggle for the current concept.
 */
export function DemoSwitch({ current }: { current: string }) {
  const isB = current.endsWith("-b");
  const base = current.replace(/-b$/, "");
  const variant = isB ? "-b" : "";

  return (
    <nav className="demo-switch" aria-label="Concept switcher">
      <Link to="/" title="All concepts — press 0">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" aria-hidden="true">
          <rect x="0" y="0" width="6" height="6" rx="1.5" />
          <rect x="9" y="0" width="6" height="6" rx="1.5" />
          <rect x="0" y="9" width="6" height="6" rx="1.5" />
          <rect x="9" y="9" width="6" height="6" rx="1.5" />
        </svg>
        <span className="sr-only">All concepts</span>
      </Link>
      <span className="demo-switch__divider" aria-hidden="true" />
      {ITEMS.map((item) => (
        <Link
          key={item.base}
          to={`${item.base}${variant}`}
          aria-current={base === item.base ? "true" : undefined}
          title={`Concept 0${item.key} · ${item.name} — press ${item.key}`}
        >
          {item.key}
        </Link>
      ))}
      <span className="demo-switch__divider" aria-hidden="true" />
      <Link
        to={isB ? base : `${base}-b`}
        className="demo-switch__var"
        title={`Switch to variant ${isB ? "A" : "B"} — press B`}
      >
        {isB ? "B" : "A"}
      </Link>
    </nav>
  );
}
