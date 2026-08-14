import { useSyncExternalStore } from "react";
import { FLAGS } from "./flags";

/**
 * Typography sets — the pairings we put in front of the client.
 *
 * **Settled: "Cercana" (Baloo 2 + Figtree) won.** It is `DEFAULT_TYPE_SET`, and
 * with `FLAGS.showTypeSets` off it is the only set that can ever be applied —
 * the switcher is gone, and neither `?fonts=` nor a stale localStorage entry
 * can move it. The other pairings stay here as the record of what was compared.
 *
 * A set is a triple of roles (display / body / mono). `styles/typography.css`
 * remaps each concept's own font tokens onto those roles, so a set re-types the
 * design without touching its layout or copy. "original" remaps nothing — that
 * is each concept wearing the type it was first drawn with.
 *
 * The active set lives on `html[data-fonts]`, written before the first paint.
 */

export type TypeSetKey =
  | "original"
  | "editorial"
  | "technical"
  | "friendly"
  | "bold";

export interface TypeSet {
  key: TypeSetKey;
  /** chip label — Spanish, this is client-facing */
  name: string;
  /** the pairing itself, shown under the label and in the pill tooltip */
  fonts: string;
  /** one-line Spanish pitch for the selector */
  blurb: string;
}

export const TYPE_SETS: TypeSet[] = [
  {
    key: "original",
    name: "Original",
    fonts: "Cada concepto con la suya",
    blurb:
      "Como fueron diseñados: cada concepto trae su propia tipografía, elegida para su carácter.",
  },
  {
    key: "editorial",
    name: "Editorial",
    fonts: "Fraunces + Manrope",
    blurb:
      "Serifa cálida de alto contraste sobre una sans neutra. Institucional, con autoridad de publicación.",
  },
  {
    key: "technical",
    name: "Técnica",
    fonts: "Space Grotesk + Plus Jakarta Sans",
    blurb:
      "Grotesca geométrica y detalles monoespaciados. Producto, precisión, plataforma tecnológica.",
  },
  {
    key: "friendly",
    name: "Cercana",
    fonts: "Baloo 2 + Figtree",
    blurb:
      "Redondeada, tomada del propio logo de Bizzners. Cálida y accesible, habla de comunidad.",
  },
  {
    key: "bold",
    name: "Rotunda",
    fonts: "Fredoka + Nunito",
    blurb:
      "La lectura más gruesa del logo: redonda, ancha y con mucho peso. Titulares que llenan la pantalla y una marca que se reconoce de lejos.",
  },
];

/** The client's pick. Also the locked value while `FLAGS.showTypeSets` is off. */
export const DEFAULT_TYPE_SET: TypeSetKey = "friendly";

const STORAGE_KEY = "bizzners:fonts";
const URL_PARAM = "fonts";

function isTypeSetKey(value: string | null): value is TypeSetKey {
  return value !== null && TYPE_SETS.some((set) => set.key === value);
}

function remember(key: TypeSetKey): void {
  try {
    localStorage.setItem(STORAGE_KEY, key);
  } catch {
    // private mode / storage blocked — not worth breaking the demo over
  }
}

/** Link param wins over the remembered choice, so a pinned link always lands right. */
function initialTypeSet(): { key: TypeSetKey; pinned: boolean } {
  if (!FLAGS.showTypeSets) return { key: DEFAULT_TYPE_SET, pinned: false };
  const fromLink = new URLSearchParams(window.location.search).get(URL_PARAM);
  if (isTypeSetKey(fromLink)) return { key: fromLink, pinned: true };
  try {
    const remembered = localStorage.getItem(STORAGE_KEY);
    if (isTypeSetKey(remembered)) return { key: remembered, pinned: false };
  } catch {
    // private mode / storage blocked — the default is a fine answer
  }
  return { key: DEFAULT_TYPE_SET, pinned: false };
}

let current: TypeSetKey = DEFAULT_TYPE_SET;
const listeners = new Set<() => void>();

/** Call once before the first render, so no frame paints the wrong face. */
export function initTypeSet(): void {
  const { key, pinned } = initialTypeSet();
  current = key;
  document.documentElement.dataset.fonts = key;
  // a `?fonts=` link is a deliberate "look at this one" — make it stick past
  // the first page load, since every demo is a fresh document
  if (pinned) remember(key);
}

export function getTypeSetKey(): TypeSetKey {
  return current;
}

export function setTypeSet(key: TypeSetKey): void {
  if (key === current) return;
  current = key;
  document.documentElement.dataset.fonts = key;
  remember(key);
  for (const listener of listeners) listener();
}

/** Next set in the list — what the pill button and the `T` key do. */
export function cycleTypeSet(step = 1): void {
  const i = TYPE_SETS.findIndex((set) => set.key === current);
  const next = TYPE_SETS[(i + step + TYPE_SETS.length) % TYPE_SETS.length];
  setTypeSet(next.key);
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** The active set, re-rendering every component that shows it. */
export function useTypeSet(): TypeSet {
  const key = useSyncExternalStore(subscribe, getTypeSetKey, getTypeSetKey);
  return TYPE_SETS.find((set) => set.key === key) ?? TYPE_SETS[0];
}
