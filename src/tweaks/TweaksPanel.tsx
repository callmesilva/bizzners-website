import { useEffect, useRef, useState } from "react";
import {
  ALL_FIELDS,
  GROUPS,
  SWATCHES,
  buildReport,
  changedFields,
  changedKeys,
  defaults,
  type TweakField,
  type TweakGroup,
  type Tweaks,
} from "./tweaks";
import { useTweaks } from "./TweaksProvider";
import "./tweaks.css";

/* ---------- one control ---------- */

function Field({ field }: { field: TweakField }) {
  const { draft, set } = useTweaks();
  const value = draft[field.key];
  const id = `tw-${field.key}`;
  const dirty = value !== defaults[field.key];

  if (field.showIf && !draft[field.showIf]) return null;

  if (field.kind === "toggle") {
    return (
      <div className="tw-field tw-field--row">
        <label className="tw-switch" htmlFor={id}>
          <input
            id={id}
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => set(field.key, e.target.checked)}
          />
          <span className="tw-switch__track" aria-hidden="true" />
          <span className="tw-switch__label">{field.label}</span>
        </label>
        {field.hint && <p className="tw-hint">{field.hint}</p>}
      </div>
    );
  }

  return (
    <div className="tw-field">
      <div className="tw-field__head">
        <label htmlFor={id}>{field.label}</label>
        {field.kind === "range" && (
          <output htmlFor={id} className="tw-out">
            {String(value)}
            {field.unit}
          </output>
        )}
        {dirty && (
          <button
            type="button"
            className="tw-undo"
            title="Volver al valor original"
            onClick={() => set(field.key, defaults[field.key])}
          >
            ↺
          </button>
        )}
      </div>

      {field.kind === "range" && (
        <input
          id={id}
          type="range"
          min={field.min}
          max={field.max}
          step={field.step}
          value={Number(value)}
          onChange={(e) => set(field.key, Number(e.target.value))}
        />
      )}

      {field.kind === "text" && (
        <input
          id={id}
          type="text"
          value={String(value)}
          onChange={(e) => set(field.key, e.target.value)}
        />
      )}

      {field.kind === "textarea" && (
        <textarea
          id={id}
          rows={5}
          value={String(value)}
          onChange={(e) => set(field.key, e.target.value)}
        />
      )}

      {field.kind === "select" && (
        <select
          id={id}
          value={String(value)}
          onChange={(e) => set(field.key, e.target.value)}
        >
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )}

      {field.kind === "color" && (
        <>
          <div className="tw-color">
            <input
              id={id}
              type="color"
              value={String(value)}
              onChange={(e) => set(field.key, e.target.value)}
            />
            <input
              className="tw-hex"
              type="text"
              value={String(value).toUpperCase()}
              spellCheck={false}
              aria-label={`${field.label} en hexadecimal`}
              onChange={(e) => {
                const next = e.target.value.trim();
                // let him type freely; only a complete hex reaches the site
                if (/^#[0-9a-f]{6}$/i.test(next)) set(field.key, next.toLowerCase());
              }}
            />
          </div>
          <div className="tw-swatches">
            {SWATCHES.map((s) => (
              <button
                key={s.value}
                type="button"
                className={`tw-swatch${String(value) === s.value ? " is-on" : ""}`}
                style={{ background: s.value }}
                title={s.label}
                onClick={() => set(field.key, s.value)}
              >
                <span className="tw-sr">{s.label}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {field.presets && (
        <div className="tw-presets">
          {field.presets.map((p) => (
            <button
              key={p.label}
              type="button"
              className={`tw-chip${value === p.value ? " is-on" : ""}`}
              onClick={() => set(field.key, p.value)}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      {field.hint && <p className="tw-hint">{field.hint}</p>}
    </div>
  );
}

/* ---------- one bullet of the email ---------- */

function Group({ group }: { group: TweakGroup }) {
  const { draft, patch } = useTweaks();
  const count = changedFields(group, draft).length;

  return (
    <details className="tw-group">
      <summary>
        <span className="tw-group__n">{group.n}</span>
        <span className="tw-group__title">{group.title}</span>
        {count > 0 && <span className="tw-group__count">{count}</span>}
      </summary>
      <div className="tw-group__body">
        <p className="tw-quote">{group.quote}</p>
        <p className="tw-where">↳ {group.where}</p>
        {group.actions && (
          <div className="tw-presets tw-presets--group">
            {group.actions.map((a) => (
              <button
                key={a.label}
                type="button"
                className="tw-chip tw-chip--action"
                onClick={() => patch(a.patch)}
              >
                {a.label}
              </button>
            ))}
          </div>
        )}
        {group.fields.map((f) => (
          <Field key={f.key} field={f} />
        ))}
      </div>
    </details>
  );
}

/* ---------- clipboard ---------- */

type CopyState = "idle" | "done" | "manual";

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the textarea trick */
  }
  try {
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.cssText = "position:fixed;top:-9999px;opacity:0";
    document.body.appendChild(helper);
    helper.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(helper);
    return ok;
  } catch {
    return false;
  }
}

/* ---------- the panel ---------- */

export function TweaksPanel() {
  const { draft, reset, preview, setPreview } = useTweaks();
  const [open, setOpen] = useState(false);
  const [copy, setCopy] = useState<CopyState>("idle");
  const [confirmReset, setConfirmReset] = useState(false);
  const manualRef = useRef<HTMLTextAreaElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const launchRef = useRef<HTMLButtonElement>(null);
  const changes = changedKeys(draft).length;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // The launcher fades out under the open panel, so keyboard focus has to
  // follow the panel in and come back out with it. Never on first paint,
  // though: landing on the site must not pull focus onto a review widget.
  const opened = useRef(false);
  useEffect(() => {
    if (!open && !opened.current) return;
    opened.current = true;
    (open ? closeRef : launchRef).current?.focus({ preventScroll: true });
  }, [open]);

  // a stale "¡Copiado!" after further edits would be a lie
  useEffect(() => {
    setCopy("idle");
    setConfirmReset(false);
  }, [draft]);

  const onCopy = async () => {
    const report = buildReport(draft);
    if (await copyText(report)) {
      setCopy("done");
      window.setTimeout(() => setCopy("idle"), 2600);
    } else {
      setCopy("manual");
      window.setTimeout(() => manualRef.current?.select(), 0);
    }
  };

  return (
    <>
      <button
        ref={launchRef}
        type="button"
        className="tw-launch"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0" />
          <circle cx="16" cy="6" r="2" />
          <circle cx="10" cy="12" r="2" />
          <circle cx="18" cy="18" r="2" />
        </svg>
        <span>Ajustes</span>
        {changes > 0 && <span className="tw-launch__badge">{changes}</span>}
      </button>

      <aside className={`tw-panel${open ? " is-open" : ""}`} aria-label="Panel de ajustes" aria-hidden={!open}>
        <header className="tw-head">
          <div>
            <p className="tw-head__eyebrow">Solo para revisión</p>
            <h2>Ajustes del sitio</h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="tw-close"
            onClick={() => setOpen(false)}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </header>

        <p className="tw-intro">
          Cada punto de abajo es una de las observaciones del correo. Muévalo hasta que le
          guste — el sitio cambia en vivo y queda guardado en este navegador. Cuando esté
          conforme, pulse <b>Copiar datos</b> y péguelo en un correo para nosotros.
        </p>

        <div className="tw-tools">
          <button
            type="button"
            className={`tw-ghost${preview ? " is-on" : ""}`}
            onMouseDown={() => setPreview(true)}
            onMouseUp={() => setPreview(false)}
            onMouseLeave={() => setPreview(false)}
            onTouchStart={() => setPreview(true)}
            onTouchEnd={() => setPreview(false)}
          >
            👁 Mantener pulsado: ver el original
          </button>
        </div>

        <div className="tw-groups">
          {GROUPS.map((g) => (
            <Group key={g.id} group={g} />
          ))}
        </div>

        {copy === "manual" && (
          <div className="tw-manual">
            <p>El navegador no dejó copiar solo. Seleccione todo el texto y cópielo a mano:</p>
            <textarea ref={manualRef} readOnly rows={7} value={buildReport(draft)} />
          </div>
        )}

        <footer className="tw-foot">
          <button type="button" className="tw-copy" onClick={onCopy}>
            {copy === "done" ? "✓ ¡Copiado!" : "Copiar datos"}
          </button>
          <button
            type="button"
            className={`tw-reset${confirmReset ? " is-armed" : ""}`}
            onClick={() => {
              if (confirmReset) {
                reset();
                setConfirmReset(false);
              } else {
                setConfirmReset(true);
              }
            }}
          >
            {confirmReset ? "¿Seguro? Pulse otra vez" : "Restablecer todo"}
          </button>
          <p className="tw-foot__note">
            {changes === 0
              ? "Sin cambios todavía."
              : `${changes} ${changes === 1 ? "cambio" : "cambios"} de ${ALL_FIELDS.length} ajustes.`}
          </p>
        </footer>
      </aside>
    </>
  );
}

export type { Tweaks };
