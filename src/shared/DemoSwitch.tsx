import { Link } from "react-router-dom";

const ITEMS = [
  { to: "/simple", key: "1", name: "Simple" },
  { to: "/modern", key: "2", name: "Modern" },
  { to: "/wild", key: "3", name: "Wild" },
];

/** Floating pill on every demo route: back to the overview + jump between concepts. */
export function DemoSwitch({ current }: { current: string }) {
  return (
    <nav className="demo-switch" aria-label="Concept switcher">
      <Link to="/" title="All concepts — press 0">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="currentColor"
          aria-hidden="true"
        >
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
          key={item.to}
          to={item.to}
          aria-current={current === item.to ? "true" : undefined}
          title={`Concept 0${item.key} · ${item.name} — press ${item.key}`}
        >
          {item.key}
        </Link>
      ))}
    </nav>
  );
}
