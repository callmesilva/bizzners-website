import "@fontsource-variable/unbounded";
import "@fontsource-variable/sora";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Logo } from "../../brand/Logo";
import { site } from "../../content/site";
import { createGlobe } from "./globe";
import "./wild.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Per-char spans grouped into unbreakable words. Word spaces must live
 * OUTSIDE the nowrap inline-block wrappers (trailing spaces inside them
 * get trimmed), and the animated copy is unselectable so copying the
 * line yields only the clean sr-only text.
 */
function Chars({ text }: { text: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      {text.split(" ").map((word, wi) => (
        <span aria-hidden="true" key={wi}>
          <span className="w-word">
            {word.split("").map((ch, i) => (
              <span className="w-ch" key={i}>
                {ch}
              </span>
            ))}
          </span>{" "}
        </span>
      ))}
    </>
  );
}

export default function WildSite() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [loaderGone, setLoaderGone] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);

  /* loader: brief boot sequence, skipped for reduced motion */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLoaderDone(true);
      setLoaderGone(true);
      return;
    }
    const t1 = window.setTimeout(() => setLoaderDone(true), 1050);
    const t2 = window.setTimeout(() => setLoaderGone(true), 1500);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  /* globe */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lite = window.matchMedia("(max-width: 860px)").matches;
    const handle = createGlobe(canvas, {
      quality: lite ? "lite" : "full",
      animate: !reduced,
    });
    return () => handle.destroy();
  }, []);

  /* custom cursor — fine pointers only */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    root.classList.add("w-cursor-on");
    const dot = cursorDotRef.current!;
    const ring = cursorRingRef.current!;
    let x = innerWidth / 2;
    let y = innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate(${x}px, ${y}px)`;
    };
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    const onOver = (e: Event) => {
      if ((e.target as HTMLElement).closest("a, button")) ring.classList.add("is-hover");
    };
    const onOut = (e: Event) => {
      if ((e.target as HTMLElement).closest("a, button")) ring.classList.remove("is-hover");
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("mouseover", onOver);
    root.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      root.removeEventListener("mouseover", onOver);
      root.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
      root.classList.remove("w-cursor-on");
    };
  }, []);

  /* GSAP choreography */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(
          "[data-wr], .w-line > span, [data-gw], .w-ch, .w-card, .w-row, .w-hud__item",
          { opacity: 1, clearProps: "transform,clipPath" },
        );
        return;
      }

      /* --- hero intro (after loader) --- */
      const intro = gsap.timeline({ delay: 1.15, defaults: { ease: "power3.out" } });
      intro
        .fromTo(
          ".w-hero__globe",
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" },
          0,
        )
        .fromTo(".w-hero__kicker", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55 }, 0.1)
        .fromTo(
          ".w-line > span",
          { yPercent: 115, skewY: 5 },
          { yPercent: 0, skewY: 0, duration: 0.95, stagger: 0.11 },
          0.2,
        )
        .fromTo(
          [".w-hero__stand", ".w-hero__cta"],
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
          0.75,
        )
        .fromTo(
          ".w-hud__item",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.09 },
          0.95,
        )
        .fromTo(".w-hero__scroll", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.4);

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const state = { v: 0 };
        gsap.to(state, {
          v: target,
          duration: 1.7,
          delay: 1.5,
          ease: "power2.out",
          onUpdate() {
            el.textContent = String(Math.round(state.v)).padStart(2, "0");
          },
        });
      });

      /* --- scroll progress bar --- */
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });

      /* --- generic reveals --- */
      gsap.utils.toArray<HTMLElement>("[data-wr]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 87%", once: true },
          },
        );
      });

      /* --- growth: scrubbed word wall --- */
      gsap.fromTo(
        "[data-gw]",
        { opacity: 0.1, yPercent: 30 },
        {
          opacity: 1,
          yPercent: 0,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: ".w-growth", start: "top 80%", end: "top 22%", scrub: true },
        },
      );

      /* --- method cards scatter in --- */
      gsap.utils.toArray<HTMLElement>(".w-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 64, rotate: i % 2 ? 3 : -3 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          },
        );
      });

      /* --- chain: char cascade --- */
      gsap.utils.toArray<HTMLElement>(".w-chain__line").forEach((line) => {
        gsap.fromTo(
          line.querySelectorAll(".w-ch"),
          { yPercent: 120 },
          {
            yPercent: 0,
            stagger: 0.02,
            duration: 0.75,
            ease: "power4.out",
            scrollTrigger: { trigger: line, start: "top 84%", once: true },
          },
        );
      });

      /* --- tool rows wipe in --- */
      gsap.utils.toArray<HTMLElement>(".w-row").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0% 100% 0% 0%)", opacity: 0.4 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 0.9,
            ease: "power3.inOut",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });

      /* --- the pinned negotiation cycle --- */
      const steps = site.cycle.steps;
      const big = root.querySelector<HTMLElement>(".w-cycle__big");
      const name = root.querySelector<HTMLElement>(".w-cycle__name");
      const ring = root.querySelector<HTMLElement>(".w-ring");
      const arc = root.querySelector<SVGCircleElement>(".w-cycle__arc");
      const ticks = Array.from(root.querySelectorAll<HTMLElement>(".w-cycle__ticks i"));
      const nodes = Array.from(root.querySelectorAll<HTMLElement>(".w-ring__node"));
      let current = -1;

      const stepTo = (s: number) => {
        if (!big || !name || !ring || !arc) return;
        current = s;
        gsap.killTweensOf([big, name]);
        big.textContent = String(steps[s].n).padStart(2, "0");
        name.textContent = steps[s].name;
        gsap.fromTo(
          [big, name],
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power3.out" },
        );
        gsap.to(ring, { rotation: -45 * s, duration: 0.7, ease: "power3.inOut" });
        gsap.to(arc, {
          strokeDashoffset: 100 - ((s + 1) / steps.length) * 100,
          duration: 0.7,
          ease: "power3.inOut",
        });
        ticks.forEach((t, i) => t.classList.toggle("is-on", i <= s));
        nodes.forEach((n, i) => n.classList.toggle("is-on", i === s));
      };
      stepTo(0);

      const mm = gsap.matchMedia();
      mm.add("(min-width: 861px)", () => {
        ScrollTrigger.create({
          trigger: ".w-cycle",
          start: "top top",
          end: "+=260%",
          pin: true,
          onUpdate(self) {
            const s = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
            if (s !== current) stepTo(s);
          },
        });
      });
      mm.add("(max-width: 860px)", () => {
        const id = window.setInterval(() => {
          stepTo((current + 1) % steps.length);
        }, 2400);
        return () => window.clearInterval(id);
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="d-wild" ref={rootRef}>
      {!loaderGone && (
        <div className={loaderDone ? "w-loader is-done" : "w-loader"} aria-hidden="true">
          <Logo size={30} className="w-loader__logo" />
          <div className="w-loader__bar">
            <span />
          </div>
          <p className="w-mono">ESTABLISHING TRADE LINKS…</p>
        </div>
      )}

      <div className="w-progress" ref={progressRef} aria-hidden="true" />
      <div className="w-cursor-dot" ref={cursorDotRef} aria-hidden="true" />
      <div className="w-cursor-ring" ref={cursorRingRef} aria-hidden="true" />

      <header className="w-top">
        <a href="#top" className="w-top__brand" aria-label="Bizzners — top">
          <Logo size={21} />
        </a>
        <span className="w-mono w-top__status">
          <i className="w-blink" /> PTY 08°58′N 79°32′W — LIVE
        </span>
        <nav className="w-top__nav" aria-label="Sections">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="top">
        {/* ---------- hero ---------- */}
        <section className="w-hero">
          <canvas className="w-hero__globe" ref={canvasRef} aria-hidden="true" />
          <div className="w-hero__veil" aria-hidden="true" />

          <div className="w-hero__copy">
            <p className="w-mono w-hero__kicker">
              {"//"} {site.hero.kicker}
            </p>
            <h1 className="w-hero__title">
              <span className="w-line">
                <span>Your business,</span>
              </span>
              <span className="w-line">
                <span>projected —</span>
              </span>
              <span className="w-line">
                <span className="w-accent">one step away.</span>
              </span>
            </h1>
            <p className="w-hero__stand">{site.hero.standfirst}</p>
            <div className="w-hero__cta">
              <a className="w-btn" href="#contact">
                {site.hero.ctaPrimary}
              </a>
              <a className="w-ghost" href="#method">
                {site.hero.ctaSecondary}
              </a>
            </div>
          </div>

          <div className="w-hero__hud" aria-label="At a glance">
            <div className="w-hud__item">
              <b data-count="7">00</b>
              <span className="w-mono">PILLARS</span>
            </div>
            <div className="w-hud__item">
              <b data-count="8">00</b>
              <span className="w-mono">MOVES</span>
            </div>
            <div className="w-hud__item">
              <b data-count="5">00</b>
              <span className="w-mono">TOOLS</span>
            </div>
          </div>

          <div className="w-hero__scroll w-mono" aria-hidden="true">
            SCROLL
            <i />
          </div>
        </section>

        {/* ---------- giant marquee ---------- */}
        <div className="w-marquee" aria-hidden="true">
          <div className="w-marquee__track">
            {[0, 1].map((k) => (
              <div className="w-marquee__set" key={k}>
                {site.cooperation.pillars.map((p, i) => (
                  <span key={p.name} className={i % 3 === 0 ? "is-fill" : undefined}>
                    {p.name}
                    <i>◆</i>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ---------- about ---------- */}
        <section id="about" className="w-section w-about">
          <p className="w-mono w-tag" data-wr>
            [SYS/01] — {site.ally.kicker}
          </p>
          <h2 className="w-h2" data-wr>
            A negotiation ally
            <br />
            with <span className="w-accent">broad vision</span>
          </h2>
          <div className="w-about__cards">
            <article className="w-term" data-wr>
              <header className="w-mono">POSITIONING // 01</header>
              <p>{site.ally.p1}</p>
            </article>
            <article className="w-term" data-wr>
              <header className="w-mono">THE UNIT // 02</header>
              <p>{site.ally.p2}</p>
            </article>
          </div>
        </section>

        {/* ---------- growth word wall ---------- */}
        <section className="w-growth">
          <p className="w-mono w-tag">[SYS/02] — {site.growth.kicker}</p>
          <h2 className="w-growth__wall" aria-label="Growing is not just a matter of size">
            {"Growing is not just a matter of size.".split(" ").map((word, i) => (
              <span data-gw aria-hidden="true" key={i}>
                {word}
              </span>
            ))}
          </h2>
          <p className="w-growth__p" data-wr>
            {site.growth.p}
          </p>
        </section>

        {/* ---------- method cards ---------- */}
        <section id="method" className="w-section w-method">
          <span className="w-ghost-n" aria-hidden="true">
            07
          </span>
          <p className="w-mono w-tag" data-wr>
            [SYS/03] — {site.cooperation.kicker}
          </p>
          <h2 className="w-h2" data-wr>
            Structured cooperation
            <br />
            at <span className="w-accent">every level</span>
          </h2>
          <div className="w-method__grid">
            {site.cooperation.pillars.map((pillar, i) => (
              <article className="w-card" key={pillar.name}>
                <span className="w-mono w-card__n">P/0{i + 1}</span>
                <h3>{pillar.name}</h3>
                <p>{pillar.gloss}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- pinned negotiation cycle ---------- */}
        <section id="cycle" className="w-cycle">
          <div className="w-cycle__stage">
            <p className="w-mono w-tag">[SYS/04] — {site.cycle.kicker}</p>
            <div className="w-cycle__wheel">
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <circle className="w-cycle__track" cx="50" cy="50" r="46" pathLength="100" />
                <circle
                  className="w-cycle__arc"
                  cx="50"
                  cy="50"
                  r="46"
                  pathLength="100"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="w-ring" aria-hidden="true">
                {site.cycle.steps.map((s, i) => (
                  <span
                    className={i === 0 ? "w-ring__node is-on" : "w-ring__node"}
                    style={{ "--a": `${i * 45}deg` } as React.CSSProperties}
                    key={s.n}
                  />
                ))}
              </div>
              <div className="w-cycle__read">
                <span className="w-cycle__big">01</span>
                <span className="w-cycle__name">{site.cycle.steps[0].name}</span>
                <span className="w-mono w-cycle__of">NEGOTIATION CYCLE — 08 MOVES</span>
              </div>
            </div>
            <div className="w-cycle__ticks" aria-hidden="true">
              {site.cycle.steps.map((s, i) => (
                <i key={s.n} className={i === 0 ? "is-on" : undefined} />
              ))}
            </div>
          </div>
        </section>

        {/* ---------- chain statement ---------- */}
        <section className="w-chain">
          <p className="w-chain__line">
            <Chars text={site.chain.line1} />
          </p>
          <p className="w-chain__line w-chain__line--red">
            <Chars text={site.chain.line2} />
          </p>
        </section>

        {/* ---------- toolkit rows ---------- */}
        <section id="tools" className="w-section w-tools">
          <p className="w-mono w-tag" data-wr>
            [SYS/05] — {site.experience.kicker}
          </p>
          <h2 className="w-h2" data-wr>
            Improving the
            <br />
            <span className="w-accent">negotiation experience</span>
          </h2>
          <p className="w-tools__intro" data-wr>
            {site.experience.intro}
          </p>
          <ol className="w-tools__list">
            {site.experience.tools.map((tool) => (
              <li className="w-row" key={tool.n}>
                <span className="w-row__n">{tool.n}</span>
                <div className="w-row__body">
                  <h3>{tool.title}</h3>
                  <p>{tool.body}</p>
                </div>
                <span className="w-mono w-row__tag">TOOL/0{tool.n}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- closing + contact ---------- */}
        <section id="contact" className="w-section w-contact">
          <h2 className="w-contact__title" data-wr>
            Nobody knows your business
            <br />
            <span className="w-accent">better than you.</span>
          </h2>
          <p className="w-contact__p" data-wr>
            {site.closing.p}
          </p>
          <div className="w-term w-contact__card" data-wr>
            <header className="w-mono">CHANNELS // OPEN</header>
            <div className="w-contact__rows">
              <a href={site.contact.phoneHref}>
                <span className="w-mono">TEL</span>
                {site.contact.phoneDisplay}
              </a>
              <a href={site.contact.emailHref}>
                <span className="w-mono">MAIL</span>
                {site.contact.email}
              </a>
              <span>
                <span className="w-mono">BASE</span>
                {site.contact.location}
              </span>
            </div>
            <a className="w-btn w-btn--wa" href={site.contact.whatsappHref} target="_blank" rel="noreferrer">
              {site.contact.whatsappLabel} →
            </a>
          </div>
        </section>
      </main>

      <footer className="w-foot">
        <Logo size={18} />
        <p className="w-mono">{site.legal.toUpperCase()}</p>
      </footer>
    </div>
  );
}
