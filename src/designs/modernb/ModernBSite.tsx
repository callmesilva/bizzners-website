import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/figtree";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Logo } from "../../brand/Logo";
import { site } from "../../content/site";
import { useMedia } from "../../shared/useMedia";
import "./modernb.css";

export default function ModernBSite() {
  const reduced = useReducedMotion();
  const compact = useMedia("(max-width: 820px)");

  const rise = (delay = 0) =>
    reduced
      ? {}
      : ({
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-10% 0px" },
          transition: {
            duration: 0.75,
            delay: compact ? delay * 0.5 : delay,
            ease: [0.2, 0.7, 0.2, 1] as const,
          },
        } as const);

  /* cycle timeline: dot rides the rail while the section scrolls */
  const cycleRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: cycleRef,
    offset: ["start 0.72", "end 0.5"],
  });
  const dotY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="d-modernb">
      <div className="mb-aurora" aria-hidden="true">
        <span className="mb-aurora__a" />
        <span className="mb-aurora__b" />
        <span className="mb-aurora__c" />
      </div>

      <header className="mb-nav">
        <a className="mb-nav__brand" href="#top" aria-label="Bizzners — top">
          <Logo size={21} />
        </a>
        <nav className="mb-nav__links" aria-label="Sections">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="mb-cta" href="#contact">
          Let's talk
        </a>
      </header>

      <main id="top">
        {/* ---------- hero ---------- */}
        <section className="mb-hero">
          <motion.p className="mb-chip" {...rise(0)}>
            <span />
            {site.hero.kicker}
          </motion.p>
          <motion.h1 className="mb-hero__title" {...rise(0.08)}>
            Your business, projected —<br />
            <em>one step away.</em>
          </motion.h1>
          <motion.p className="mb-hero__stand" {...rise(0.16)}>
            {site.hero.standfirst}
          </motion.p>
          <motion.div className="mb-hero__cta" {...rise(0.24)}>
            <a className="mb-btn" href="#contact">
              {site.hero.ctaPrimary}
            </a>
            <a className="mb-ghost" href="#method">
              {site.hero.ctaSecondary}
            </a>
          </motion.div>

          <motion.div className="mb-stats" {...rise(0.34)}>
            <div>
              <b>{site.counts.pillars}</b>
              <span>pillars of cooperation</span>
            </div>
            <div>
              <b>{site.counts.steps}</b>
              <span>moves in the cycle</span>
            </div>
            <div>
              <b>{site.counts.tools}</b>
              <span>negotiation tools</span>
            </div>
          </motion.div>
        </section>

        {/* ---------- about ---------- */}
        <section id="about" className="mb-section">
          <motion.p className="mb-kicker" {...rise(0)}>
            {site.ally.kicker}
          </motion.p>
          <motion.h2 className="mb-h2" {...rise(0.06)}>
            A negotiation ally with <em>broad vision</em>
          </motion.h2>
          <div className="mb-about">
            <motion.article className="mb-glass" {...rise(0.12)}>
              <p>{site.ally.p1}</p>
            </motion.article>
            <motion.article className="mb-glass mb-glass--quote" {...rise(0.2)}>
              <p>{site.ally.p2}</p>
            </motion.article>
          </div>
        </section>

        {/* ---------- growth ---------- */}
        <section className="mb-section mb-growth">
          <motion.h2 className="mb-display" {...rise(0)}>
            Growing is not just
            <br />a matter of <em>size.</em>
          </motion.h2>
          <motion.p className="mb-growth__p" {...rise(0.12)}>
            {site.growth.p}
          </motion.p>
        </section>

        {/* ---------- method rail ---------- */}
        <section id="method" className="mb-section">
          <motion.p className="mb-kicker" {...rise(0)}>
            {site.cooperation.kicker}
          </motion.p>
          <motion.h2 className="mb-h2" {...rise(0.06)}>
            Structured cooperation at <em>every level</em>
          </motion.h2>
          <motion.p className="mb-hint" {...rise(0.1)} aria-hidden="true">
            drag / scroll →
          </motion.p>
          <div className="mb-rail" role="list">
            {site.cooperation.pillars.map((pillar, i) => (
              <motion.article className="mb-glass mb-rail__card" role="listitem" key={pillar.name} {...rise(0.08 + i * 0.05)}>
                <span className="mb-rail__n">0{i + 1}</span>
                <h3>{pillar.name}</h3>
                <p>{pillar.gloss}</p>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ---------- cycle timeline ---------- */}
        <section id="cycle" className="mb-section">
          <motion.p className="mb-kicker" {...rise(0)}>
            {site.cycle.kicker}
          </motion.p>
          <motion.h2 className="mb-h2" {...rise(0.06)}>
            Eight moves. One <em>disciplined loop.</em>
          </motion.h2>
          <motion.p className="mb-sub" {...rise(0.1)}>
            {site.cycle.sub}
          </motion.p>
          <ol className="mb-cycle" ref={cycleRef}>
            <div className="mb-cycle__rail" aria-hidden="true">
              <motion.span className="mb-cycle__dot" style={reduced ? undefined : { top: dotY }} />
            </div>
            {site.cycle.steps.map((step, i) => (
              <motion.li key={step.n} {...rise(i * 0.04)}>
                <span className="mb-cycle__n">{String(step.n).padStart(2, "0")}</span>
                <div>
                  <h3>{step.name}</h3>
                </div>
              </motion.li>
            ))}
          </ol>
        </section>

        {/* ---------- chain ---------- */}
        <section className="mb-chain">
          <motion.p {...rise(0)}>
            {site.chain.line1}
            <br />
            <em>{site.chain.line2}</em>
          </motion.p>
        </section>

        {/* ---------- toolkit bento ---------- */}
        <section id="tools" className="mb-section">
          <motion.p className="mb-kicker" {...rise(0)}>
            {site.experience.kicker}
          </motion.p>
          <motion.h2 className="mb-h2" {...rise(0.06)}>
            Improving the <em>negotiation experience</em>
          </motion.h2>
          <motion.p className="mb-sub" {...rise(0.1)}>
            {site.experience.intro}
          </motion.p>
          <div className="mb-bento">
            {site.experience.tools.map((tool, i) => (
              <motion.article
                className={`mb-glass mb-bento__cell mb-bento__cell--${tool.n}`}
                key={tool.n}
                {...rise(0.08 + i * 0.05)}
              >
                <span className="mb-bento__n">{tool.n}</span>
                <h3>{tool.title}</h3>
                <p>{tool.body}</p>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ---------- contact ---------- */}
        <section id="contact" className="mb-section">
          <motion.div className="mb-end mb-glass" {...rise(0)}>
            <p className="mb-kicker">{site.contact.kicker}</p>
            <h2 className="mb-display mb-display--sm">
              Nobody knows your business
              <br />
              <em>better than you.</em>
            </h2>
            <p className="mb-end__p">{site.closing.p}</p>
            <div className="mb-end__rows">
              <a href={site.contact.phoneHref}>{site.contact.phoneDisplay}</a>
              <a href={site.contact.emailHref}>{site.contact.email}</a>
              <span>{site.contact.location}</span>
            </div>
            <a className="mb-btn mb-btn--wa" href={site.contact.whatsappHref} target="_blank" rel="noreferrer">
              {site.contact.whatsappLabel}
            </a>
            <p className="mb-end__note">{site.contact.note}</p>
          </motion.div>
        </section>
      </main>

      <footer className="mb-foot">
        <Logo size={18} />
        <p>{site.legal}</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}
