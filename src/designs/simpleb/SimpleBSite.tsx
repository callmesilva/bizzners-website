import "@fontsource-variable/schibsted-grotesk";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import { Logo } from "../../brand/Logo";
import { site } from "../../content/site";
import { useRevealRoot } from "../../shared/useReveal";
import "./simpleb.css";

function SectionHead({ index, label }: { index: string; label: string }) {
  return (
    <div className="sb-head" data-reveal>
      <span className="sb-mono">{index}</span>
      <span className="sb-head__rule" />
      <span className="sb-mono">{label}</span>
    </div>
  );
}

export default function SimpleBSite() {
  const root = useRevealRoot<HTMLDivElement>();

  return (
    <div className="d-simpleb" ref={root}>
      <header className="sb-nav">
        <a className="sb-nav__brand" href="#top" aria-label="Bizzners — top">
          <Logo size={21} />
        </a>
        <nav className="sb-nav__links" aria-label="Sections">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href} className="sb-mono">
              {item.label}
            </a>
          ))}
        </nav>
        <a className="sb-nav__phone sb-mono" href={site.contact.phoneHref}>
          {site.contact.phoneDisplay}
        </a>
      </header>

      <main id="top">
        {/* ---------- hero ---------- */}
        <section className="sb-hero">
          <p className="sb-mono sb-hero__kicker">001 / {site.hero.kicker}</p>
          <h1 className="sb-hero__title">
            {site.hero.titleA} <span>{site.hero.titleB}</span>
          </h1>
          <div className="sb-hero__row">
            <div>
              <p className="sb-hero__stand">{site.hero.standfirst}</p>
              <div className="sb-hero__cta">
                <a className="sb-btn" href="#contact">
                  {site.hero.ctaPrimary}
                </a>
                <a className="sb-link" href="#method">
                  {site.hero.ctaSecondary} ↓
                </a>
              </div>
            </div>
            <table className="sb-meta">
              <tbody>
                <tr>
                  <th className="sb-mono">BASE</th>
                  <td>{site.contact.location}</td>
                </tr>
                <tr>
                  <th className="sb-mono">TEL</th>
                  <td>{site.contact.phoneDisplay}</td>
                </tr>
                <tr>
                  <th className="sb-mono">MAIL</th>
                  <td>{site.contact.email}</td>
                </tr>
                <tr>
                  <th className="sb-mono">INDEX</th>
                  <td>
                    {site.counts.pillars} pillars · {site.counts.steps} moves ·{" "}
                    {site.counts.tools} tools
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ---------- about ---------- */}
        <section id="about" className="sb-section">
          <SectionHead index="002" label={site.ally.kicker} />
          <h2 className="sb-h2" data-reveal>
            {site.ally.heading}
          </h2>
          <div className="sb-cols">
            <p data-reveal>{site.ally.p1}</p>
            <p data-reveal style={{ "--d": "90ms" } as React.CSSProperties}>
              {site.ally.p2}
            </p>
          </div>
        </section>

        {/* ---------- growth ---------- */}
        <section className="sb-section sb-growth">
          <SectionHead index="003" label={site.growth.kicker} />
          <div className="sb-growth__panel" data-reveal>
            <h2 className="sb-h2">{site.growth.heading}</h2>
            <p>{site.growth.p}</p>
          </div>
        </section>

        {/* ---------- method table ---------- */}
        <section id="method" className="sb-section">
          <SectionHead index="004" label={site.cooperation.kicker} />
          <h2 className="sb-h2" data-reveal>
            {site.cooperation.heading}
          </h2>
          <table className="sb-table" data-reveal>
            <tbody>
              {site.cooperation.pillars.map((pillar, i) => (
                <tr key={pillar.name}>
                  <th className="sb-mono">P—0{i + 1}</th>
                  <td className="sb-table__name">{pillar.name}</td>
                  <td className="sb-table__gloss">{pillar.gloss}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="sb-cycle">
            <p className="sb-mono sb-cycle__label" data-reveal>
              {site.cycle.kicker} — {site.cycle.sub}
            </p>
            <ol className="sb-cycle__strip" data-reveal>
              {site.cycle.steps.map((step) => (
                <li key={step.n}>
                  <span className="sb-mono">{String(step.n).padStart(2, "0")}</span>
                  <span>{step.name}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- chain panel ---------- */}
        <section className="sb-chain">
          <p data-reveal>
            {site.chain.line1} <em>{site.chain.line2}</em>
          </p>
        </section>

        {/* ---------- toolkit ---------- */}
        <section id="tools" className="sb-section">
          <SectionHead index="005" label={site.experience.kicker} />
          <h2 className="sb-h2" data-reveal>
            {site.experience.heading}
          </h2>
          <p className="sb-intro" data-reveal>
            {site.experience.intro}
          </p>
          <ol className="sb-tools">
            {site.experience.tools.map((tool, i) => (
              <li key={tool.n} data-reveal style={{ "--d": `${i * 50}ms` } as React.CSSProperties}>
                <span className="sb-mono sb-tools__n">0{tool.n}.</span>
                <div>
                  <h3>{tool.title}</h3>
                  <p>{tool.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- closing + contact ---------- */}
        <section id="contact" className="sb-section">
          <SectionHead index="006" label={site.contact.kicker} />
          <div className="sb-end">
            <div data-reveal>
              <h2 className="sb-h2">{site.closing.heading}</h2>
              <p className="sb-end__p">{site.closing.p}</p>
              <p className="sb-end__cta">{site.closing.cta}</p>
            </div>
            <div className="sb-end__card" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
              <table className="sb-meta sb-meta--contact">
                <tbody>
                  <tr>
                    <th className="sb-mono">BASE</th>
                    <td>{site.contact.location}</td>
                  </tr>
                  <tr>
                    <th className="sb-mono">TEL</th>
                    <td>
                      <a href={site.contact.phoneHref}>{site.contact.phoneDisplay}</a>
                    </td>
                  </tr>
                  <tr>
                    <th className="sb-mono">MAIL</th>
                    <td>
                      <a href={site.contact.emailHref}>{site.contact.email}</a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <a className="sb-btn sb-btn--wide" href={site.contact.whatsappHref} target="_blank" rel="noreferrer">
                {site.contact.whatsappLabel} →
              </a>
              <p className="sb-mono sb-end__note">{site.contact.note.toUpperCase()}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="sb-foot">
        <Logo size={18} />
        <p className="sb-mono">{site.legal.toUpperCase()}</p>
        <a className="sb-link" href="#top">
          TOP ↑
        </a>
      </footer>
    </div>
  );
}
