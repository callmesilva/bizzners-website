/**
 * Client tweak panel — the model.
 *
 * The owner's review notes arrived as prose ("más imponente", "probar el color
 * morado con otro color", "el recuadro a lo mejor no redondeado"). Rather than
 * guess a number for each, every ambiguous note becomes a live control here:
 * he plays with the real site, and `Copiar datos` hands us back the exact
 * values he settled on.
 *
 * One group per bullet of his email, quoting the bullet verbatim so the panel
 * and the email read as the same document. `defaults` mirrors what ships today
 * — a value equal to its default is "not changed" and stays out of the report.
 */

import { site } from "../content/site";

export interface Tweaks {
  /* 1 · el logo de la izquierda */
  logoSize: number;
  logoWeight: number;
  logoTagline: boolean;

  /* 2 · la palabra "Panamá" */
  heroKicker: string;
  heroChip: string;

  /* 3 · el color "morado" (projected / Start a conversation) */
  accent: string;

  /* 4 · colores por sección */
  methodAccentOn: boolean;
  methodAccent: string;
  cycleAccentOn: boolean;
  cycleAccent: string;

  /* 5 · el recuadro del video */
  videoRadius: number;
  videoRatio: string;
  videoShadow: boolean;

  /* 6 · los textos marcados con puntos suspensivos */
  heroTitle: string;
  heroStand: string;
  allyHeading: string;
  allyP1: string;
  allyP2: string;
  methodHeading: string;
  cycleHeading: string;
}

/** Exactly what the site renders today. */
export const defaults: Tweaks = {
  logoSize: 30,
  logoWeight: 700,
  logoTagline: false,

  heroKicker: site.hero.kicker,
  heroChip: "Panamá → global markets",

  accent: "#2b4bf2",

  methodAccentOn: false,
  methodAccent: "#2b4bf2",
  cycleAccentOn: false,
  cycleAccent: "#2b4bf2",

  videoRadius: 26,
  videoRatio: "4 / 5",
  videoShadow: true,

  heroTitle: "Your business, *projected* — one step away.",
  heroStand: site.hero.standfirst,
  allyHeading: "A negotiation ally with *broad vision*",
  allyP1: site.ally.p1,
  allyP2: site.ally.p2,
  methodHeading: "Structured cooperation at *every level*",
  cycleHeading: "Eight moves. One *disciplined loop.*",
};

/* ---------- the wording he sketched in the email ---------- */

const SUGGESTED = {
  heroStand:
    "At Bizzners we promote and facilitate the expansion of your business or industry — coordinating many of the steps it takes to place your products and services in the international market.",
  allyHeading: "A negotiation ally with *broad vision*, in solid and new markets",
  allyP1:
    "We know how to influence the commercial positioning of your product — and we give you the tools and solutions to negotiate its participation in solid and new markets, near or far from your local base.",
  allyP2:
    "At Bizzners you have an ally in negotiations: a talented and well-rounded unit of collaborators — an organizational concept very different from a sales department. We connect you, as a producer, with buyers in any location, with a complete view of the available options. An advantage of real value for growth.",
};

/* ---------- colour choices ---------- */

export interface Swatch {
  label: string;
  value: string;
}

export const SWATCHES: Swatch[] = [
  { label: "Cobalto (actual)", value: "#2b4bf2" },
  { label: "Azul de marca", value: "#3f6fd8" },
  { label: "Turquesa", value: "#0f8b93" },
  { label: "Esmeralda", value: "#157a53" },
  { label: "Ciruela", value: "#6d3fd1" },
  { label: "Vino", value: "#93203f" },
  { label: "Terracota", value: "#b8542b" },
  { label: "Tinta", value: "#1b2560" },
];

/* ---------- field + group schema (drives the UI *and* the report) ---------- */

export type FieldKind = "range" | "text" | "textarea" | "color" | "toggle" | "select";

export interface TweakField {
  key: keyof Tweaks;
  label: string;
  hint?: string;
  kind: FieldKind;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  options?: { value: string; label: string }[];
  /** one-tap alternative values, shown as chips under the control */
  presets?: { label: string; value: string | number }[];
  /** render only while this boolean field is on */
  showIf?: keyof Tweaks;
}

export interface GroupAction {
  label: string;
  patch: Partial<Tweaks>;
}

export interface TweakGroup {
  id: string;
  n: string;
  title: string;
  /** his own words, so the panel and the email read as one document */
  quote: string;
  /** where on the page to look while tweaking */
  where: string;
  fields: TweakField[];
  actions?: GroupAction[];
}

export const GROUPS: TweakGroup[] = [
  {
    id: "logo",
    n: "1",
    title: "El logo",
    quote: "El logo inicial de la izquierda me gustaría más grande, más imponente.",
    where: "Barra superior, a la izquierda",
    fields: [
      { key: "logoSize", label: "Tamaño", kind: "range", min: 24, max: 64, step: 1, unit: "px" },
      {
        key: "logoWeight",
        label: "Grosor de la letra",
        kind: "range",
        min: 500,
        max: 800,
        step: 10,
      },
      {
        key: "logoTagline",
        label: "Mostrar «Business Builders» debajo",
        kind: "toggle",
        hint: "Ocupa más alto en la barra, pero pesa más.",
      },
    ],
    actions: [
      { label: "Imponente", patch: { logoSize: 46, logoWeight: 780, logoTagline: true } },
      { label: "Como está hoy", patch: { logoSize: 30, logoWeight: 700, logoTagline: false } },
    ],
  },
  {
    id: "panama",
    n: "2",
    title: "La palabra «Panamá»",
    quote:
      "Pienso que la frase «International trade facilitation · Panamá», o donde dice «Panamá → global markets», podemos eliminar la palabra Panamá.",
    where: "Arriba del titular, y la etiqueta sobre el video",
    fields: [
      {
        key: "heroKicker",
        label: "Línea sobre el titular",
        kind: "text",
        presets: [
          { label: "Sin Panamá", value: "International trade facilitation" },
          { label: "Con Panamá", value: "International trade facilitation · Panamá" },
        ],
      },
      {
        key: "heroChip",
        label: "Etiqueta sobre el video",
        kind: "text",
        presets: [
          { label: "Global markets", value: "Global markets" },
          { label: "To global markets", value: "→ global markets" },
          { label: "Con Panamá", value: "Panamá → global markets" },
        ],
      },
    ],
    actions: [
      {
        label: "Quitar «Panamá» de las dos",
        patch: { heroKicker: "International trade facilitation", heroChip: "Global markets" },
      },
      {
        label: "Dejarla como está",
        patch: { heroKicker: defaults.heroKicker, heroChip: defaults.heroChip },
      },
    ],
  },
  {
    id: "accent",
    n: "3",
    title: "El color de acento",
    quote:
      "Quisiera probar el color morado que dice «projected» o «Start a conversation» con otro color, a ver cómo se ve.",
    where: "«projected» en el titular, el botón, los puntos y los enlaces",
    fields: [
      {
        key: "accent",
        label: "Color principal",
        kind: "color",
        hint: "Cambia todo el sitio a la vez. Las secciones de abajo pueden llevar su propio color.",
      },
    ],
  },
  {
    id: "sections",
    n: "4",
    title: "Colores por sección",
    quote:
      "Structured cooperation: evaluar el color morado del texto «every level» y los números 01 al 07. El «cycle / loop» en otro color.",
    where: "Bloques «Structured cooperation» y «Eight moves»",
    fields: [
      {
        key: "methodAccentOn",
        label: "«every level» y los números 01–07 en su propio color",
        kind: "toggle",
      },
      { key: "methodAccent", label: "Color de esa sección", kind: "color", showIf: "methodAccentOn" },
      { key: "cycleAccentOn", label: "El ciclo («disciplined loop») en su propio color", kind: "toggle" },
      { key: "cycleAccent", label: "Color del ciclo", kind: "color", showIf: "cycleAccentOn" },
    ],
  },
  {
    id: "video",
    n: "5",
    title: "El recuadro del video",
    quote: "El recuadro del video, a lo mejor, no redondeado.",
    where: "La tarjeta con el video, arriba a la derecha",
    fields: [
      {
        key: "videoRadius",
        label: "Redondeo de las esquinas",
        kind: "range",
        min: 0,
        max: 48,
        step: 1,
        unit: "px",
        hint: "0 = esquinas totalmente rectas. Hoy: 26px.",
        presets: [
          { label: "Recto (0)", value: 0 },
          { label: "Apenas (8)", value: 8 },
          { label: "Suave (16)", value: 16 },
          { label: "Actual (26)", value: 26 },
          { label: "Muy redondo (40)", value: 40 },
        ],
      },
      {
        key: "videoRatio",
        label: "Forma del recuadro",
        kind: "select",
        options: [
          { value: "4 / 5", label: "Vertical (4:5) — actual" },
          { value: "1 / 1", label: "Cuadrado (1:1)" },
          { value: "4 / 3", label: "Horizontal (4:3)" },
          { value: "16 / 9", label: "Panorámico (16:9)" },
          { value: "3 / 4", label: "Vertical suave (3:4)" },
        ],
      },
      { key: "videoShadow", label: "Sombra bajo el recuadro", kind: "toggle" },
    ],
    actions: [
      { label: "Recto, sin redondear", patch: { videoRadius: 0 } },
      { label: "Recto y sin sombra", patch: { videoRadius: 0, videoShadow: false } },
      {
        label: "Como está hoy",
        patch: { videoRadius: 26, videoShadow: true, videoRatio: "4 / 5" },
      },
    ],
  },
  {
    id: "copy",
    n: "6",
    title: "Los textos",
    quote:
      "At Bizzners …… coordinating many of the steps it takes to …… place (not everything). A negotiation ally with broad vision …… in solid and new markets …… At Bizzners you have …… talented and well-rounded unit of collaborators — an organizational concept ……",
    where: "Titular, bloque «Who we are» y los dos títulos de abajo",
    fields: [
      {
        key: "heroTitle",
        label: "Titular",
        kind: "text",
        hint: "Lo que va entre *asteriscos* sale en cursiva y con el color de acento.",
      },
      {
        key: "heroStand",
        label: "Párrafo bajo el titular",
        kind: "textarea",
        presets: [
          { label: "«many of the steps» (su sugerencia)", value: SUGGESTED.heroStand },
          { label: "Original", value: defaults.heroStand },
        ],
      },
      {
        key: "allyHeading",
        label: "Título «A negotiation ally…»",
        kind: "text",
        presets: [
          { label: "+ in solid and new markets", value: SUGGESTED.allyHeading },
          { label: "Original", value: defaults.allyHeading },
        ],
      },
      {
        key: "allyP1",
        label: "Párrafo «We know how to influence…»",
        kind: "textarea",
        presets: [
          { label: "«solid and new markets»", value: SUGGESTED.allyP1 },
          { label: "Original", value: defaults.allyP1 },
        ],
      },
      {
        key: "allyP2",
        label: "Cita «At Bizzners you have an ally…»",
        kind: "textarea",
        presets: [
          { label: "«talented and well-rounded»", value: SUGGESTED.allyP2 },
          { label: "Original", value: defaults.allyP2 },
        ],
      },
      { key: "methodHeading", label: "Título «Structured cooperation…»", kind: "text" },
      { key: "cycleHeading", label: "Título «Eight moves…»", kind: "text" },
    ],
    actions: [
      {
        label: "Aplicar las cuatro sugerencias del correo",
        patch: {
          heroStand: SUGGESTED.heroStand,
          allyHeading: SUGGESTED.allyHeading,
          allyP1: SUGGESTED.allyP1,
          allyP2: SUGGESTED.allyP2,
        },
      },
      {
        label: "Volver a los textos originales",
        patch: {
          heroTitle: defaults.heroTitle,
          heroStand: defaults.heroStand,
          allyHeading: defaults.allyHeading,
          allyP1: defaults.allyP1,
          allyP2: defaults.allyP2,
          methodHeading: defaults.methodHeading,
          cycleHeading: defaults.cycleHeading,
        },
      },
    ],
  },
];

/** Every field, flattened — used by the report and by sanitising. */
export const ALL_FIELDS: TweakField[] = GROUPS.flatMap((g) => g.fields);

/* ---------- storage ---------- */

const STORAGE_KEY = "bz-tweaks-v1";

/** Drop anything that isn't a known key of the right type — old or hand-edited
 *  payloads must never be able to hand a string to a `px` slider. */
export function sanitize(raw: unknown): Partial<Tweaks> {
  if (!raw || typeof raw !== "object") return {};
  const input = raw as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const [key, fallback] of Object.entries(defaults)) {
    const value = input[key];
    if (typeof value === typeof fallback) out[key] = value;
  }
  return out as Partial<Tweaks>;
}

export function load(): Tweaks {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaults };
    return { ...defaults, ...sanitize(JSON.parse(raw)) };
  } catch {
    return { ...defaults };
  }
}

export function save(tweaks: Tweaks): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tweaks));
  } catch {
    /* private mode / storage full — the panel still works for this session */
  }
}

export function clear(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/* ---------- derived values ---------- */

export const isDefault = (key: keyof Tweaks, value: Tweaks[keyof Tweaks]) =>
  defaults[key] === value;

export const changedKeys = (t: Tweaks): (keyof Tweaks)[] =>
  (Object.keys(defaults) as (keyof Tweaks)[]).filter((k) => t[k] !== defaults[k]);

/** Fields of a group the owner actually moved. */
export const changedFields = (group: TweakGroup, t: Tweaks): TweakField[] =>
  group.fields.filter((f) => t[f.key] !== defaults[f.key]);

/* ---------- the report ---------- */

function formatValue(field: TweakField, value: Tweaks[keyof Tweaks]): string {
  switch (field.kind) {
    case "toggle":
      return value ? "sí" : "no";
    case "range":
      return `${value}${field.unit ?? ""}`;
    case "select": {
      const hit = field.options?.find((o) => o.value === value);
      return hit ? `${hit.label} (${value})` : String(value);
    }
    case "color":
      return String(value).toUpperCase();
    default:
      return `“${value}”`;
  }
}

/** Multi-line values keep their shape but stay inside the bullet's gutter. */
const indent = (text: string, pad = "     ") => text.split("\n").join(`\n${pad}`);

/**
 * The thing `Copiar datos` puts on the clipboard: a Spanish summary a human
 * can read in the email thread, followed by the exact machine payload we
 * replay on our side. Only what he changed is listed — an untouched group is
 * reported as untouched rather than padded out with default values.
 */
export function buildReport(t: Tweaks): string {
  const now = new Date();
  const stamp = now.toLocaleString("es-PA", {
    dateStyle: "long",
    timeStyle: "short",
  });
  const screen =
    typeof window === "undefined"
      ? "—"
      : `${window.innerWidth}×${window.innerHeight} px`;

  const touched = GROUPS.filter((g) => changedFields(g, t).length > 0);
  const untouched = GROUPS.filter((g) => changedFields(g, t).length === 0);

  const lines: string[] = [];
  lines.push("═══════════════════════════════════════════");
  lines.push("BIZZNERS · AJUSTES DEL SITIO");
  lines.push(`Fecha: ${stamp}`);
  lines.push(`Pantalla: ${screen}`);
  lines.push("═══════════════════════════════════════════");
  lines.push("");

  if (touched.length === 0) {
    lines.push("No se cambió nada todavía: el sitio quedó tal cual está hoy.");
  } else {
    lines.push(`CAMBIOS (${changedKeys(t).length})`);
    lines.push("");
    for (const group of touched) {
      lines.push(`${group.n}) ${group.title.toUpperCase()}`);
      lines.push(`   Nota original: «${indent(group.quote, "   ")}»`);
      for (const field of changedFields(group, t)) {
        lines.push(
          `   • ${field.label}: ${indent(formatValue(field, t[field.key]))}`,
        );
        lines.push(
          `     (antes: ${indent(formatValue(field, defaults[field.key]), "      ")})`,
        );
      }
      lines.push("");
    }
  }

  if (untouched.length > 0) {
    lines.push("SIN CAMBIOS:");
    for (const group of untouched) lines.push(`   – ${group.n}) ${group.title}`);
    lines.push("");
  }

  lines.push("───────────────────────────────────────────");
  lines.push("DATOS TÉCNICOS — no borrar, es lo que aplicamos nosotros:");
  lines.push(JSON.stringify({ v: 1, at: now.toISOString(), tweaks: t }));
  lines.push("═══════════════════════════════════════════");

  return lines.join("\n");
}
