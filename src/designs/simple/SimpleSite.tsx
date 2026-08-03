import type { CSSProperties } from "react";
import { Logo } from "../../brand/Logo";
import { site } from "../../content/site";
import { useRevealRoot } from "../../shared/useReveal";
import "./simple.css";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function SimpleSite() {
  const root = useRevealRoot<HTMLDivElement>();

  return (
    <div className="d-simple" ref={root}>
      <header className="s-nav">
        <a className="s-nav__brand" href="#top" aria-label="Bizzners — top">
          <Logo size={22} />
        </a>
        <nav className="s-nav__links" aria-label="Sections">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="s-nav__phone" href={site.contact.phoneHref}>
          {site.contact.phoneDisplay}
        </a>
      </header>

      <main id="top">
        {/* ---------- hero ---------- */}
        <section className="s-hero">
          <p className="s-kicker">{site.hero.kicker}</p>
          <h1 className="s-hero__title">
            {site.hero.titleA}
            <br />
            <span>{site.hero.titleB}</span>
          </h1>
          <p className="s-hero__stand">{site.hero.standfirst}</p>
          <div className="s-hero__cta">
            <a className="s-btn" href="#contact">
              {site.hero.ctaPrimary}
            </a>
            <a className="s-link" href="#method">
              {site.hero.ctaSecondary}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 5v14" />
                <path d="m6 13 6 6 6-6" />
              </svg>
            </a>
          </div>
          <div className="s-hero__facts" aria-label="At a glance">
            <span>
              <b>{site.counts.pillars}</b> pillars of cooperation
            </span>
            <span>
              <b>{site.counts.steps}</b> moves in the cycle
            </span>
            <span>
              <b>{site.counts.tools}</b> negotiation tools
            </span>
          </div>
        </section>

        {/* ---------- about ---------- */}
        <section id="about" className="s-section s-about">
          <div className="s-section__head" data-reveal>
            <p className="s-kicker">{site.ally.kicker}</p>
            <h2>{site.ally.heading}</h2>
          </div>
          <div className="s-about__body">
            <p data-reveal>{site.ally.p1}</p>
            <p className="s-about__quote" data-reveal style={delay(110)}>
              {site.ally.p2}
            </p>
          </div>
        </section>

        {/* ---------- growth band ---------- */}
        <section className="s-band">
          <div className="s-band__inner" data-reveal>
            <p className="s-kicker s-kicker--light">{site.growth.kicker}</p>
            <h2>{site.growth.heading}</h2>
            <p className="s-band__p">{site.growth.p}</p>
          </div>
        </section>

        {/* ---------- method: pillars + cycle ---------- */}
        <section id="method" className="s-section">
          <div className="s-section__head" data-reveal>
            <p className="s-kicker">{site.cooperation.kicker}</p>
            <h2>{site.cooperation.heading}</h2>
          </div>
          <ol className="s-pillars">
            {site.cooperation.pillars.map((pillar, i) => (
              <li key={pillar.name} data-reveal style={delay(i * 55)}>
                <span className="s-pillars__n">0{i + 1}</span>
                <span className="s-pillars__name">{pillar.name}</span>
                <span className="s-pillars__gloss">{pillar.gloss}</span>
              </li>
            ))}
          </ol>

          <div className="s-cycle">
            <div className="s-cycle__head" data-reveal>
              <p className="s-kicker">{site.cycle.kicker}</p>
              <h3>{site.cycle.heading}</h3>
              <p className="s-cycle__sub">{site.cycle.sub}</p>
            </div>
            <ol className="s-cycle__grid">
              {site.cycle.steps.map((step, i) => (
                <li key={step.n} data-reveal style={delay(i * 45)}>
                  <span className="s-cycle__n">{String(step.n).padStart(2, "0")}</span>
                  <span className="s-cycle__name">{step.name}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- chain interstitial ---------- */}
        <section className="s-chain">
          <svg
            className="s-chain__glyph"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
            data-reveal
          >
            <path d="M9.5 14.5 14.5 9.5" />
            <path d="M12.7 6.3l2-2a3.54 3.54 0 0 1 5 5l-2 2" />
            <path d="M11.3 17.7l-2 2a3.54 3.54 0 0 1-5-5l2-2" />
          </svg>
          <p className="s-chain__line" data-reveal style={delay(90)}>
            {site.chain.line1}
            <br />
            <span>{site.chain.line2}</span>
          </p>
        </section>

        {/* ---------- toolkit ---------- */}
        <section id="tools" className="s-section">
          <div className="s-section__head" data-reveal>
            <p className="s-kicker">{site.experience.kicker}</p>
            <h2>{site.experience.heading}</h2>
          </div>
          <p className="s-intro" data-reveal>
            {site.experience.intro}
          </p>
          <ol className="s-tools">
            {site.experience.tools.map((tool, i) => (
              <li key={tool.n} data-reveal style={delay(i * 45)}>
                <span className="s-tools__n" aria-hidden="true">
                  {tool.n}
                </span>
                <div className="s-tools__body">
                  <h3>{tool.title}</h3>
                  <p>{tool.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- closing ---------- */}
        <section className="s-close">
          <div className="s-close__inner">
            <h2 data-reveal>{site.closing.heading}</h2>
            <p data-reveal style={delay(90)}>
              {site.closing.p}
            </p>
            <a className="s-link s-link--lg" href="#contact" data-reveal style={delay(160)}>
              {site.closing.cta}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </a>
          </div>
        </section>

        {/* ---------- contact ---------- */}
        <section id="contact" className="s-section s-contact">
          <div className="s-contact__intro" data-reveal>
            <p className="s-kicker">{site.contact.kicker}</p>
            <h2>{site.contact.heading}</h2>
            <p className="s-contact__note">{site.contact.note}</p>
          </div>
          <div className="s-contact__card" data-reveal style={delay(110)}>
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
            <a
              className="s-btn s-btn--wa"
              href={site.contact.whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3 0-.2 0-.3-.1-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3Z" />
              </svg>
              {site.contact.whatsappLabel}
            </a>
          </div>
        </section>
      </main>

      <footer className="s-foot">
        <Logo size={19} />
        <p>{site.legal}</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}
