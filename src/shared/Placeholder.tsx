interface PlaceholderProps {
  /** slot id matching an entry in PROMPTS.md, e.g. "IMG-01" */
  id: string;
  label: string;
  /** CSS aspect-ratio value, e.g. "16 / 9" */
  ratio?: string;
  className?: string;
}

/**
 * Brand-tinted stand-in for photography that hasn't been generated yet.
 * Each slot's generation prompt lives in PROMPTS.md under the same id.
 */
export function Placeholder({ id, label, ratio = "4 / 3", className = "" }: PlaceholderProps) {
  return (
    <figure
      className={`bz-ph ${className}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`${label} (placeholder image)`}
    >
      <div className="bz-ph__inner">
        <svg
          className="bz-ph__icon"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.5-3.5a2 2 0 0 0-2.8 0L6 20" />
        </svg>
        <span className="bz-ph__label">{label}</span>
        <span className="bz-ph__chip">{id} · prompts.md</span>
      </div>
    </figure>
  );
}
