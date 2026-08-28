import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { defaults, load, save, clear, type Tweaks } from "./tweaks";

interface TweaksApi {
  /** what the site should render right now — `defaults` while previewing the original */
  tweaks: Tweaks;
  /** what the owner has actually set, even while previewing the original */
  draft: Tweaks;
  set: <K extends keyof Tweaks>(key: K, value: Tweaks[K]) => void;
  patch: (values: Partial<Tweaks>) => void;
  reset: () => void;
  /** hold-to-compare: renders the untouched site without losing the draft */
  preview: boolean;
  setPreview: (on: boolean) => void;
}

const TweaksContext = createContext<TweaksApi | null>(null);

export function TweaksProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<Tweaks>(() => load());
  const [preview, setPreview] = useState(false);
  const touched = useRef(false);

  // only a real edit writes storage — so "Restablecer todo" genuinely leaves
  // this browser with nothing stored rather than a blob of defaults
  useEffect(() => {
    if (!touched.current) {
      touched.current = true;
      return;
    }
    save(draft);
  }, [draft]);

  const set = useCallback<TweaksApi["set"]>((key, value) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }, []);

  const patch = useCallback((values: Partial<Tweaks>) => {
    setDraft((prev) => ({ ...prev, ...values }));
  }, []);

  const reset = useCallback(() => {
    clear();
    touched.current = false;
    setDraft({ ...defaults });
  }, []);

  const value = useMemo<TweaksApi>(
    () => ({
      tweaks: preview ? defaults : draft,
      draft,
      set,
      patch,
      reset,
      preview,
      setPreview,
    }),
    [draft, patch, preview, reset, set],
  );

  return <TweaksContext.Provider value={value}>{children}</TweaksContext.Provider>;
}

export function useTweaks(): TweaksApi {
  const ctx = useContext(TweaksContext);
  if (!ctx) throw new Error("useTweaks must be used inside <TweaksProvider>");
  return ctx;
}

/* ---------- design ← tweaks ---------- */

/** Lighten for the on-navy variant; the shipped tone is hand-picked, so keep it. */
const softOf = (accent: string) =>
  accent === defaults.accent
    ? "#8fa3f8"
    : `color-mix(in oklab, ${accent} 45%, white)`;

/**
 * The custom properties `modern.css` reads. Set inline on `.d-modern`, so they
 * beat the stylesheet's own values without any of it being rewritten.
 */
export function cssVarsFor(t: Tweaks): CSSProperties {
  const custom = t.videoRatio !== defaults.videoRatio;
  return {
    "--m-cobalt": t.accent,
    "--m-cobalt-soft": softOf(t.accent),
    "--m-accent-method": t.methodAccentOn ? t.methodAccent : t.accent,
    "--m-accent-cycle": t.cycleAccentOn ? t.cycleAccent : t.accent,
    "--m-video-radius": `${t.videoRadius}px`,
    "--m-video-ratio": t.videoRatio,
    // the stacked layout has its own crop; a deliberate choice overrides both
    "--m-video-ratio-sm": custom ? t.videoRatio : "4 / 3",
    "--m-video-shadow": t.videoShadow
      ? "0 30px 70px rgba(21, 28, 73, 0.18)"
      : "none",
  } as CSSProperties;
}
