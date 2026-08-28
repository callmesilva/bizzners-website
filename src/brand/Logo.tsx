interface LogoProps {
  /** wordmark font size — a number is px; a string passes through, so a
   *  caller can hand it a clamp() and let the mark scale with the viewport */
  size?: number | string;
  tagline?: boolean;
  className?: string;
}

/**
 * Recreated "bizzners® / Business Builders" wordmark (navy + blue "r").
 * Colors override via --logo-ink / --logo-accent / --logo-tag on any ancestor.
 */
export function Logo({ size = 30, tagline = true, className = "" }: LogoProps) {
  return (
    <span className={`bz-logo ${className}`} style={{ fontSize: size }}>
      <span className="bz-logo__word">
        bizzne<span className="bz-logo__r">r</span>s<span className="bz-logo__reg">®</span>
      </span>
      {tagline && <span className="bz-logo__tag">Business Builders</span>}
    </span>
  );
}
