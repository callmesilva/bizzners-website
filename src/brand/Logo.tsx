interface LogoProps {
  /** wordmark font size in px — everything else scales in em */
  size?: number;
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
