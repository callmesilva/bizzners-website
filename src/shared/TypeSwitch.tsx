import { FLAGS } from "../config/flags";
import { TYPE_SETS, cycleTypeSet, setTypeSet, useTypeSet } from "../config/typography";

/**
 * Font-pairing switcher, in two shapes:
 *   · TypeCycler — one button in the floating demo pill, cycles the sets
 *   · TypePicker — the labelled chip row on the selector
 * Both drive the same store, so a set chosen on one demo follows the client
 * to the next one. Parked entirely by FLAGS.showTypeSets.
 */

/** Cycles to the next pairing. Mirrors the `T` shortcut in App. */
export function TypeCycler() {
  const set = useTypeSet();
  if (!FLAGS.showTypeSets) return null;

  return (
    <button
      type="button"
      className="demo-switch__type"
      onClick={() => cycleTypeSet()}
      title={`Tipografía: ${set.name} · ${set.fonts} — presiona T para cambiar`}
      aria-label={`Tipografía ${set.name}. Cambiar a la siguiente.`}
    >
      <span className="demo-switch__type-aa" aria-hidden="true">
        Aa
      </span>
      <span className="demo-switch__type-name">{set.name}</span>
    </button>
  );
}

/** The full set of options, each chip previewing its own faces. */
export function TypePicker() {
  const active = useTypeSet();
  if (!FLAGS.showTypeSets) return null;

  return (
    <section className="sel-type" aria-labelledby="sel-type-label">
      <p className="sel-type__label" id="sel-type-label">
        Tipografía
      </p>
      <div className="sel-type__chips">
        {TYPE_SETS.map((set) => (
          <button
            key={set.key}
            type="button"
            className="sel-type__chip"
            data-set={set.key}
            aria-pressed={set.key === active.key}
            onClick={() => setTypeSet(set.key)}
          >
            <b>{set.name}</b>
            <i>{set.fonts}</i>
          </button>
        ))}
      </div>
      <p className="sel-type__blurb">
        {active.blurb} Se aplica a todos los conceptos y te acompaña al abrirlos —
        también puedes cambiarla desde el selector flotante o con la tecla <kbd>T</kbd>.
      </p>
    </section>
  );
}
