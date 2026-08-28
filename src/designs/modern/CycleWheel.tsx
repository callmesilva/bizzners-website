import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { site } from "../../content/site";
import { useStill } from "../../shared/useStill";

const SIZE = 420;
const C = SIZE / 2;
const R_NODE = 158;
const R_NUM = 189;

const point = (i: number, radius: number) => {
  const angle = ((-90 + i * 45) * Math.PI) / 180;
  return { x: C + radius * Math.cos(angle), y: C + radius * Math.sin(angle) };
};

/**
 * The 8-step negotiation cycle as a live wheel: a progress arc sweeps
 * from step to step while the active node and center readout advance.
 * Auto-advances in view; the step list doubles as manual control.
 */
export function CycleWheel() {
  const [step, setStep] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { amount: 0.35 });
  const reduced = Boolean(useReducedMotion()) || useStill();
  const steps = site.cycle.steps;

  // still mode keeps the wheel parked on step 01 — the list stays clickable,
  // so the piece can still be walked through by hand in a review
  useEffect(() => {
    if (!inView || reduced) return;
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % steps.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [inView, reduced, steps.length]);

  const active = steps[step];

  return (
    <div className="m-cycle__layout" ref={wrapRef}>
      <ol className="m-cycle__list">
        {steps.map((s, i) => (
          <li key={s.n}>
            <button
              type="button"
              className={i === step ? "is-active" : undefined}
              onClick={() => setStep(i)}
              aria-current={i === step ? "step" : undefined}
            >
              <span className="m-cycle__num">{String(s.n).padStart(2, "0")}</span>
              <span className="m-cycle__name">{s.name}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="m-wheel" aria-hidden="true">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`}>
          {/* rotating dashed halo */}
          <circle
            className="m-wheel__dash"
            cx={C}
            cy={C}
            r={R_NODE + 16}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 8"
            opacity="0.45"
          />
          {/* track */}
          <circle
            cx={C}
            cy={C}
            r={R_NODE}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            opacity="0.18"
          />
          {/* progress arc — sweeps to the active step */}
          <motion.circle
            cx={C}
            cy={C}
            r={R_NODE}
            fill="none"
            stroke="var(--m-accent-cycle, var(--m-cobalt))"
            strokeWidth="2.6"
            strokeLinecap="round"
            transform={`rotate(-90 ${C} ${C})`}
            initial={false}
            animate={{ pathLength: (step + 1) / steps.length }}
            transition={
              reduced
                ? { duration: 0 }
                : { type: "spring", stiffness: 60, damping: 16 }
            }
          />
          {/* nodes + numerals */}
          {steps.map((s, i) => {
            const n = point(i, R_NODE);
            const t = point(i, R_NUM);
            const isActive = i === step;
            const isDone = i < step;
            return (
              <g key={s.n} className={isActive ? "m-wheel__node is-active" : "m-wheel__node"}>
                {isActive && <circle cx={n.x} cy={n.y} r="14" className="m-wheel__halo" />}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="6.5"
                  className={
                    isActive
                      ? "m-wheel__dot is-active"
                      : isDone
                        ? "m-wheel__dot is-done"
                        : "m-wheel__dot"
                  }
                />
                <text x={t.x} y={t.y} textAnchor="middle" dominantBaseline="central" className="m-wheel__index">
                  {String(s.n).padStart(2, "0")}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="m-wheel__center">
          <motion.span
            key={active.n}
            className="m-wheel__big"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
          >
            {String(active.n).padStart(2, "0")}
          </motion.span>
          <span className="m-wheel__of">of {String(steps.length).padStart(2, "0")}</span>
          <motion.span
            key={`n-${active.n}`}
            className="m-wheel__label"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            {active.name}
          </motion.span>
        </div>
      </div>
    </div>
  );
}
