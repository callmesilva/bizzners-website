import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource-variable/instrument-sans";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Logo } from "../../brand/Logo";
import { site } from "../../content/site";
import { useMedia } from "../../shared/useMedia";
import { useStill } from "../../shared/useStill";
import { CycleWheel } from "./CycleWheel";
import backdropMp4 from "../../assets/backdrop.mp4";
import negotiationImg from "../../assets/negotiation-table.jpg";
import backdropPoster from "../../assets/backdrop-poster.jpg";
import "./modern.css";

/**
 * Word-by-word masked reveal. The spans live inside overflow-clipped
 * wrappers, so they can never trigger their own IntersectionObserver —
 * the *parent* line must carry initial="hidden" whileInView="visible"
 * and the words inherit the variant state.
 */
const wordVariants = {
  hidden: { y: "112%" },
  visible: (i: number) => ({
    y: 0,
    transition: { delay: i * 0.055, duration: 0.65, ease: [0.2, 0.7, 0.2, 1] as const },
  }),
};

function Words({ text, accent, base = 0 }: { text: string; accent?: string; base?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="m-word">
            <motion.span variants={wordVariants} custom={base + i}>
              {word === accent ? <em>{word}</em> : word}
            </motion.span>
          </span>{" "}
        </span>
      ))}
    </>
  );
}

export default function ModernSite() {
  // "reduced" now also covers motion parked by feature flag — every timeline
  // below stays in place, it just renders its end state immediately
  const reduced = Boolean(useReducedMotion()) || useStill();
  const compact = useMedia("(max-width: 820px)");
  const still = reduced || compact;

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const backdropY = useTransform(scrollYProgress, [0, 1], [0, still ? 0 : 90]);
  const chipAY = useTransform(scrollYProgress, [0, 1], [0, still ? 0 : -80]);
  const chipBY = useTransform(scrollYProgress, [0, 1], [0, still ? 0 : -40]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, still ? 0 : 34]);

  const rise = (delay = 0) =>
    reduced
      ? {}
      : ({
          // keep the animated property set identical across breakpoints so a
          // mid-session resize can never strand an element half-animated
          initial: { opacity: 0, y: 26, filter: compact ? "blur(0px)" : "blur(7px)" },
          whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
          viewport: { once: true, margin: "-10% 0px" },
          transition: { duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] as const },
        } as const);

  return (
    <div className="d-modern">
      {/* floating glass nav */}
      <header className="m-nav">
        <a className="m-nav__brand" href="#top" aria-label="Bizzners — top">
          <Logo size={20} tagline={false} />
        </a>
        <nav className="m-nav__links" aria-label="Sections">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="m-nav__cta" href="#contact">
          Let's talk
        </a>
      </header>

      <main id="top">
        {/* ---------- hero ---------- */}
        <section className="m-hero" ref={heroRef}>
          {/*
           * The footage runs full-bleed behind the whole first screen — it is
           * wider than the 1180px hero column, so it breaks out in CSS rather
           * than here. Veiled back to cream by .m-hero__bg::after: near-opaque
           * under the copy, thin over the right-hand third where the chips
           * float, solid at the bottom edge so it hands off to the marquee.
           */}
          <div className="m-hero__bg" aria-hidden="true">
            {reduced ? (
              // a still frame, and no 646KB download, when motion is unwelcome
              <img src={backdropPoster} alt="" />
            ) : (
              <motion.video
                style={{ y: backdropY }}
                src={backdropMp4}
                poster={backdropPoster}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
            )}
          </div>

          <div className="m-hero__copy">
            <motion.p className="m-chip m-chip--kicker" {...rise(0)}>
              <span className="m-chip__dot" />
              {site.hero.kicker}
            </motion.p>
            <motion.h1 className="m-hero__title" style={{ y: titleY }} {...rise(0.06)}>
              Your business, <em>projected</em> — one step away.
            </motion.h1>
            <motion.p className="m-hero__stand" {...rise(0.14)}>
              {site.hero.standfirst}
            </motion.p>
            <motion.div className="m-hero__cta" {...rise(0.2)}>
              <a className="m-btn" href="#contact">
                {site.hero.ctaPrimary}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </a>
              <a className="m-textlink" href="#method">
                {site.hero.ctaSecondary}
              </a>
            </motion.div>
          </div>

          {/* no card any more: an empty ratio box that the chips hang off */}
          <div className="m-hero__media">
            <motion.div className="m-chip m-chip--float m-chip--route" style={{ y: chipAY }} {...rise(0.3)}>
              <span className="m-chip__dot" />
              Panamá → global markets
            </motion.div>
            <motion.div className="m-chip m-chip--float m-chip--facts" style={{ y: chipBY }} {...rise(0.38)}>
              <b>{site.counts.pillars}</b> pillars · <b>{site.counts.steps}</b> moves ·{" "}
              <b>{site.counts.tools}</b> tools
            </motion.div>
          </div>
        </section>

        {/* ---------- marquee ---------- */}
        <div className="m-marquee" aria-hidden="true">
          <div className="m-marquee__track">
            {[0, 1].map((copy) => (
              <div className="m-marquee__set" key={copy}>
                {site.cooperation.pillars.map((p, i) =>
                  i % 2 ? (
                    <em key={p.name}>{p.name}</em>
                  ) : (
                    <span key={p.name}>{p.name}</span>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ---------- about bento ---------- */}
        <section id="about" className="m-section">
          <div className="m-about__grid">
            <motion.article className="m-card m-about__lead" {...rise(0)}>
              <p className="m-kicker">{site.ally.kicker}</p>
              <h2 className="m-h2">A negotiation ally with <em>broad vision</em></h2>
              <p className="m-body">{site.ally.p1}</p>
            </motion.article>
            <motion.div className="m-card m-about__photo" {...rise(0.1)}>
              <img
                className="m-about__img"
                src={negotiationImg}
                alt="Two professionals shaking hands across a meeting table"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
            <motion.blockquote className="m-card m-about__quote" {...rise(0.18)}>
              <span className="m-about__mark" aria-hidden="true">
                “
              </span>
              <p>{site.ally.p2}</p>
            </motion.blockquote>
          </div>
        </section>

        {/* ---------- growth panel ---------- */}
        <section className="m-section">
          <div className="m-panel">
            <p className="m-kicker m-kicker--light">{site.growth.kicker}</p>
            <motion.h2
              className="m-display"
              initial={reduced ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-12% 0px" }}
            >
              <Words text="Growing is not just a matter of size." accent="size." />
            </motion.h2>
            <motion.p className="m-panel__p" {...rise(0.15)}>
              {site.growth.p}
            </motion.p>
          </div>
        </section>

        {/* ---------- method bento ---------- */}
        <section id="method" className="m-section">
          <div className="m-method__grid">
            <motion.div className="m-cell m-cell--intro" {...rise(0)}>
              <p className="m-kicker">{site.cooperation.kicker}</p>
              <h2 className="m-h2">
                Structured cooperation at <em>every level</em>
              </h2>
              <p className="m-body">
                Seven pillars hold up every engagement — from first promotion to a firm
                closing.
              </p>
            </motion.div>
            {site.cooperation.pillars.map((pillar, i) => (
              <motion.article
                key={pillar.name}
                className="m-cell m-cell--pillar"
                style={{ gridArea: `p${i + 1}` }}
                {...rise(0.05 + i * 0.05)}
              >
                <span className="m-cell__n">0{i + 1}</span>
                <h3>{pillar.name}</h3>
                <p>{pillar.gloss}</p>
              </motion.article>
            ))}
            <motion.a className="m-cell m-cell--next" href="#cycle" {...rise(0.45)}>
              <span>
                See the <em>cycle</em>
              </span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 5v14" />
                <path d="m6 13 6 6 6-6" />
              </svg>
            </motion.a>
          </div>
        </section>

        {/* ---------- cycle ---------- */}
        <section id="cycle" className="m-section m-cycle">
          <motion.div className="m-cycle__head" {...rise(0)}>
            <p className="m-kicker">{site.cycle.kicker}</p>
            <h2 className="m-h2">
              Eight moves. One <em>disciplined loop.</em>
            </h2>
            <p className="m-body">{site.cycle.sub}</p>
          </motion.div>
          <motion.div {...rise(0.12)}>
            <CycleWheel />
          </motion.div>
        </section>

        {/* ---------- chain banner ---------- */}
        <section className="m-chain">
          <motion.p
            className="m-chain__l1"
            initial={reduced ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-12% 0px" }}
          >
            <Words text={site.chain.line1} />
          </motion.p>
          <motion.p
            className="m-chain__l2"
            initial={reduced ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-12% 0px" }}
          >
            <Words text={site.chain.line2} base={4} />
          </motion.p>
        </section>

        {/* ---------- toolkit: sticky stack ---------- */}
        <section id="tools" className="m-section">
          <motion.div className="m-tools__head" {...rise(0)}>
            <p className="m-kicker">{site.experience.kicker}</p>
            <h2 className="m-h2">
              Improving the <em>negotiation experience</em>
            </h2>
            <p className="m-body">{site.experience.intro}</p>
          </motion.div>
          <ol className="m-tools__stack">
            {site.experience.tools.map((tool, i) => (
              <motion.li
                key={tool.n}
                style={{ "--i": i } as React.CSSProperties}
                {...rise(compact ? 0 : 0.04)}
              >
                <span className="m-tools__n" aria-hidden="true">
                  {tool.n}
                </span>
                <div>
                  <h3>{tool.title}</h3>
                  <p>{tool.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </section>

        {/* ---------- closing + contact panel ---------- */}
        <section id="contact" className="m-section">
          <div className="m-panel m-end">
            <div className="m-end__copy">
              <p className="m-kicker m-kicker--light">{site.contact.kicker}</p>
              <h2 className="m-display m-display--sm">
                Nobody knows your business <em>better than you.</em>
              </h2>
              <p className="m-panel__p">{site.closing.p}</p>
              <p className="m-end__cta">{site.closing.cta}</p>
            </div>
            <motion.div className="m-end__card" {...rise(0.12)}>
              <dl>
                <div>
                  <dt>Location</dt>
                  <dd>{site.contact.location}</dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <a href={site.contact.phoneHref}>{site.contact.phoneDisplay}</a>
                  </dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={site.contact.emailHref}>{site.contact.email}</a>
                  </dd>
                </div>
              </dl>
              <a className="m-btn m-btn--wa" href={site.contact.whatsappHref} target="_blank" rel="noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3 0-.2 0-.3-.1-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3Z" />
                </svg>
                {site.contact.whatsappLabel}
              </a>
              <p className="m-end__note">{site.contact.note}</p>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="m-foot">
        <Logo size={19} />
        <p>{site.legal}</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}
