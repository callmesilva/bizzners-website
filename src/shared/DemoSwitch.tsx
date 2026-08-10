import { Link } from "react-router-dom";
import {
  FLAGS,
  VISIBLE_CONCEPTS,
  baseOf,
  canToggleVariant,
  isRouteVisible,
  isVariantB,
  visibleVariants,
} from "../config/flags";
import { TypeCycler } from "./TypeSwitch";

/**
 * Floating pill on every demo route: overview, jump between concepts
 * (variant-preserving), an A/B toggle for the current concept and the
 * font-pairing cycler. Parked concepts, parked variants and a parked
 * typography switcher all drop out of the pill entirely.
 */
export function DemoSwitch({ current }: { current: string }) {
  const isB = isVariantB(current);
  const base = baseOf(current);
  const variant = isB ? "-b" : "";
  const showVariantToggle = canToggleVariant(base);

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
      {VISIBLE_CONCEPTS.map((item) => {
        const keep = `${item.base}${variant}`;
        const to = isRouteVisible(keep) ? keep : visibleVariants(item.base)[0];
        return (
          <Link
            key={item.base}
            to={to}
            aria-current={base === item.base ? "true" : undefined}
            title={`Concept 0${item.n} · ${item.name} — press ${item.n}`}
          >
            {item.n}
          </Link>
        );
      })}
      {showVariantToggle && (
        <>
          <span className="demo-switch__divider" aria-hidden="true" />
          <Link
            to={isB ? base : `${base}-b`}
            className="demo-switch__var"
            title={`Switch to variant ${isB ? "A" : "B"} — press B`}
          >
            {isB ? "B" : "A"}
          </Link>
        </>
      )}
      {FLAGS.showTypeSets && (
        <>
          <span className="demo-switch__divider" aria-hidden="true" />
          <TypeCycler />
        </>
      )}
    </nav>
  );
}
