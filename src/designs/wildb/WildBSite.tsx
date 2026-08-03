import "@fontsource/anton";
import "@fontsource-variable/martian-mono";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Logo } from "../../brand/Logo";
import { site } from "../../content/site";
import "./wildb.css";

gsap.registerPlugin(ScrollTrigger);

function Barcode({ className = "" }: { className?: string }) {
  return <span className={`wb-barcode ${className}`} aria-hidden="true" />;
}

export default function WildBSite() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set("[data-br], .wb-hero__line, .wb-stamp, .wb-check i", { opacity: 1, clearProps: "transform" });
        root.querySelectorAll(".wb-check").forEach((el) => el.classList.add("is-done"));
        return;
      }

      /* hero slam-in */
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .fromTo(
          ".wb-hero__line",
          { yPercent: 108 },
          { yPercent: 0, duration: 0.85, stagger: 0.12 },
          0.1,
        )
        .fromTo(
          ".wb-stamp--hero",
          { scale: 2.2, opacity: 0, rotation: 8 },
          { scale: 1, opacity: 1, rotation: -7, duration: 0.5, ease: "power4.in" },
          0.85,
        )
        .fromTo(
          [".wb-hero__waybill", ".wb-hero__cta"],
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
          1.0,
        );

      /* generic reveals */
      gsap.utils.toArray<HTMLElement>("[data-br]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });

      /* stamps slam wherever they appear */
      gsap.utils.toArray<HTMLElement>(".wb-stamp:not(.wb-stamp--hero)").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 2, opacity: 0, rotation: 6 },
          {
            scale: 1,
            opacity: 1,
            rotation: Number(el.dataset.rot ?? -6),
            duration: 0.4,
            ease: "power4.in",
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
          },
        );
      });

      /* manifest checklist ticks */
      gsap.utils.toArray<HTMLElement>(".wb-check").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 78%",
          once: true,
          onEnter: () => el.classList.add("is-done"),
        });
      });

      /* container train: pinned horizontal scroll on desktop */
      const mm = gsap.matchMedia();
      mm.add("(min-width: 861px)", () => {
        const train = trainRef.current;
        if (!train) return;
        const distance = () => train.scrollWidth - window.innerWidth;
        gsap.to(train, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ".wb-train",
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="d-wildb" ref={rootRef}>
      <header className="wb-top">
        <a href="#top" className="wb-top__brand" aria-label="Bizzners — top">
          <Logo size={21} />
        </a>
        <span className="wb-mono wb-top__doc">CARGO MANIFEST — BZ/2026 · ORIGIN: PTY</span>
        <nav className="wb-top__nav" aria-label="Sections">
          {site.nav.map((item) => (
            <a className="wb-mono" key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="top">
        {/* ---------- hero ---------- */}
        <section className="wb-hero">
          <p className="wb-mono wb-hero__kicker">
            FORM 001 — {site.hero.kicker.toUpperCase()}
          </p>
          <h1 className="wb-hero__title">
            <span className="wb-hero__mask">
              <span className="wb-hero__line">Your business,</span>
            </span>
            <span className="wb-hero__mask">
              <span className="wb-hero__line wb-hero__line--outline">projected —</span>
            </span>
            <span className="wb-hero__mask">
              <span className="wb-hero__line wb-hero__line--red">one step away.</span>
            </span>
          </h1>
          <span className="wb-stamp wb-stamp--hero" aria-hidden="true">
            Approved
            <br />
            for export
          </span>
          <div className="wb-hero__waybill">
            <Barcode />
            <p>{site.hero.standfirst}</p>
          </div>
          <div className="wb-hero__cta">
            <a className="wb-btn" href="#contact">
              {site.hero.ctaPrimary}
            </a>
            <a className="wb-btn wb-btn--ghost" href="#method">
              {site.hero.ctaSecondary}
            </a>
          </div>
        </section>

        {/* ---------- ticker ---------- */}
        <div className="wb-ticker" aria-hidden="true">
          <div className="wb-ticker__track">
            {[0, 1].map((k) => (
              <span key={k}>
                BIZZNERS BUSINESS BUILDERS — PANAMÁ → THE WORLD — {site.counts.pillars}{" "}
                PILLARS — {site.counts.steps} MOVES — {site.counts.tools} TOOLS —&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* ---------- about ---------- */}
        <section id="about" className="wb-section">
          <p className="wb-mono wb-field" data-br>
            FIELD 02 — {site.ally.kicker.toUpperCase()}
          </p>
          <h2 className="wb-h2" data-br>
            A negotiation ally with broad vision
          </h2>
          <div className="wb-about" data-br>
            <article className="wb-doc">
              <header className="wb-mono">DECLARATION / 01</header>
              <p>{site.ally.p1}</p>
            </article>
            <article className="wb-doc">
              <header className="wb-mono">DECLARATION / 02</header>
              <p>{site.ally.p2}</p>
            </article>
          </div>
        </section>

        {/* ---------- growth block ---------- */}
        <section className="wb-growth">
          <div className="wb-growth__inner">
            <p className="wb-mono" data-br>
              FIELD 03 — {site.growth.kicker.toUpperCase()}
            </p>
            <h2 data-br>Growing is not just a matter of size</h2>
            <p className="wb-growth__p" data-br>
              {site.growth.p}
            </p>
            <span className="wb-stamp wb-stamp--white" data-rot="5" aria-hidden="true">
              No limits
            </span>
          </div>
        </section>

        {/* ---------- container train (pinned horizontal) ---------- */}
        <section id="method" className="wb-train">
          <div className="wb-train__viewport">
            <div className="wb-train__track" ref={trainRef}>
              <div className="wb-train__intro">
                <p className="wb-mono wb-field">FIELD 04 — {site.cooperation.kicker.toUpperCase()}</p>
                <h2 className="wb-h2">
                  Structured cooperation at every level
                </h2>
                <p className="wb-mono wb-train__hint">SCROLL — THE TRAIN MOVES →</p>
              </div>
              {site.cooperation.pillars.map((pillar, i) => (
                <article className="wb-container" key={pillar.name}>
                  <header>
                    <span className="wb-mono">BZ-CONT/0{i + 1}</span>
                    <Barcode className="wb-barcode--sm" />
                  </header>
                  <b>0{i + 1}</b>
                  <h3>{pillar.name}</h3>
                  <p>{pillar.gloss}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- cycle checklist ---------- */}
        <section id="cycle" className="wb-section">
          <p className="wb-mono wb-field" data-br>
            FIELD 05 — {site.cycle.kicker.toUpperCase()}
          </p>
          <h2 className="wb-h2" data-br>
            {site.cycle.heading}
          </h2>
          <p className="wb-sub" data-br>
            {site.cycle.sub}
          </p>
          <ol className="wb-checklist">
            {site.cycle.steps.map((step) => (
              <li className="wb-check" key={step.n}>
                <i aria-hidden="true" />
                <span className="wb-mono">{String(step.n).padStart(2, "0")}</span>
                <h3>{step.name}</h3>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- chain ---------- */}
        <section className="wb-chain">
          <p data-br>{site.chain.line1}</p>
          <p className="wb-chain__red" data-br>
            {site.chain.line2}
          </p>
        </section>

        {/* ---------- toolkit inspection ---------- */}
        <section id="tools" className="wb-section">
          <p className="wb-mono wb-field" data-br>
            FIELD 06 — {site.experience.kicker.toUpperCase()}
          </p>
          <h2 className="wb-h2" data-br>
            {site.experience.heading}
          </h2>
          <p className="wb-sub" data-br>
            {site.experience.intro}
          </p>
          <ol className="wb-report">
            {site.experience.tools.map((tool) => (
              <li key={tool.n} data-br>
                <b>{tool.n}</b>
                <div>
                  <h3>{tool.title}</h3>
                  <p>{tool.body}</p>
                </div>
                <span className="wb-mono">INSP/0{tool.n} ✓</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- contact ---------- */}
        <section id="contact" className="wb-contact">
          <div className="wb-contact__inner">
            <h2 data-br>
              Nobody knows your business
              <br />
              better than you.
            </h2>
            <p className="wb-contact__p" data-br>
              {site.closing.p}
            </p>
            <div className="wb-contact__rows" data-br>
              <a href={site.contact.phoneHref}>
                <span className="wb-mono">TEL</span> {site.contact.phoneDisplay}
              </a>
              <a href={site.contact.emailHref}>
                <span className="wb-mono">MAIL</span> {site.contact.email}
              </a>
              <span>
                <span className="wb-mono">BASE</span> {site.contact.location}
              </span>
            </div>
            <a className="wb-btn wb-btn--red" href={site.contact.whatsappHref} target="_blank" rel="noreferrer" data-br>
              {site.contact.whatsappLabel} →
            </a>
            <span className="wb-stamp wb-stamp--white wb-stamp--contact" data-rot="-5" aria-hidden="true">
              Open your
              <br />
              next market
            </span>
          </div>
        </section>
      </main>

      <footer className="wb-foot">
        <Barcode />
        <p className="wb-mono">{site.legal.toUpperCase()}</p>
        <Logo size={18} />
      </footer>
    </div>
  );
}
