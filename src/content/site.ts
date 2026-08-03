/**
 * Single source of content for every design concept.
 * English translation of BizznersBasics.2024.pdf (originally Spanish).
 * Anything NOT in the brochure is added microcopy — flagged in COPY-NOTES.md.
 */

export interface Pillar {
  name: string;
  /** one-line gloss — added microcopy */
  gloss: string;
}

export interface CycleStep {
  n: number;
  name: string;
}

export interface NegotiationTool {
  n: number;
  /** short title — added microcopy */
  title: string;
  body: string;
}

export const site = {
  brand: {
    name: "bizzners",
    tagline: "Business Builders",
    domain: "bizzners.com",
  },

  nav: [
    { label: "About", href: "#about" },
    { label: "Method", href: "#method" },
    { label: "Tools", href: "#tools" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    kicker: "International trade facilitation · Panamá",
    titleA: "Your business, projected —",
    titleB: "one step away.",
    standfirst:
      "At Bizzners we promote and facilitate the expansion of your business or industry — coordinating everything it takes to place your products and services in the international market.",
    ctaPrimary: "Start a conversation",
    ctaSecondary: "See how we work",
  },

  ally: {
    kicker: "Who we are",
    heading: "A negotiation ally with broad vision",
    p1: "We know how to influence the commercial positioning of your product — and we give you the tools and solutions to negotiate its participation in solid markets, near or far from your local base.",
    p2: "At Bizzners you have an ally in negotiations: a versatile, multidisciplinary unit of collaborators — an organizational concept very different from a sales department. We connect you, as a producer, with buyers in any location, with a complete view of the available options. An advantage of real value for growth.",
  },

  growth: {
    kicker: "Selection matters",
    heading: "Growing is not just a matter of size",
    p: "Stepping into the international market takes the right buyer or redistributor. We connect you with companies that are not merely interested in your product — they have the solidity, capacity, structure and market position to give you the commercial push you need.",
  },

  cooperation: {
    kicker: "Method",
    heading: "Structured cooperation at every level",
    pillars: [
      { name: "Promotion", gloss: "Your offer, presented where it matters." },
      { name: "Operation", gloss: "Deals that run on process, not improvisation." },
      { name: "Relation", gloss: "Durable links between producers and buyers." },
      { name: "Empowerment", gloss: "Leverage that extends your commercial reach." },
      { name: "Cooperation", gloss: "Balanced interests across every participant." },
      { name: "Evaluation", gloss: "Partners and terms measured before commitment." },
      { name: "Closing", gloss: "Agreements carried to a firm, working finish." },
    ] as Pillar[],
  },

  cycle: {
    kicker: "The negotiation cycle",
    heading: "Eight moves. One disciplined loop.",
    sub: "Every engagement advances through the same cycle — from first contact to closing and projections.",
    steps: [
      { n: 1, name: "Distributor outreach" },
      { n: 2, name: "Range & capacity assessment" },
      { n: 3, name: "Offer presentation" },
      { n: 4, name: "Mediation & option review" },
      { n: 5, name: "Procedural facilitation" },
      { n: 6, name: "Collateral advisory" },
      { n: 7, name: "Operations & compliance control" },
      { n: 8, name: "Closing & projections" },
    ] as CycleStep[],
  },

  chain: {
    line1: "The link in the chain",
    line2: "that decides your success.",
  },

  experience: {
    kicker: "Toolkit",
    heading: "Improving the negotiation experience",
    intro:
      "The size of your company doesn't matter. If you have expandable productive capacity — or want to widen your commercial reach into other markets — we can power your growth and land agreements with partners who need your product. It's about clearing the “out of reach” barrier when opening new commercial space. These are the tools we bring:",
    tools: [
      {
        n: 1,
        title: "The right contacts",
        body: "Capable, well-matched commercial contacts multiply the odds of success. We evaluate and select participating partners with adequate market presence and a proven record of compliance.",
      },
      {
        n: 2,
        title: "Balanced operations",
        body: "Impartial operations with balanced interests — alliances coordinated for multilateral benefit. For Bizzners the client is never one party alone: it is every participant, and their goals are the achievement.",
      },
      {
        n: 3,
        title: "Transparency & trust",
        body: "Reliability for all parties, built on permanent feedback and manageable negotiations — never resting on unrealistic compliance timelines.",
      },
      {
        n: 4,
        title: "Scale, for real",
        body: "A genuine opportunity to operate at large scale, with clear and realistic prospects — growth in a short time and high potential rates of success.",
      },
      {
        n: 5,
        title: "Unseen alternatives",
        body: "Discovery of alternatives you hadn't identified or planned for — options whose reach might have seemed overestimated, laborious or too costly.",
      },
    ] as NegotiationTool[],
  },

  closing: {
    heading: "Nobody knows your business better than you",
    p: "At Bizzners we complement your options and give recognition to your brand — creating secure alliances that strengthen it.",
    cta: "Let's talk about your next market.",
  },

  contact: {
    kicker: "Contact",
    heading: "Open your next market",
    location: "Panama City, Panamá",
    phoneDisplay: "+507 6000-4345",
    phoneHref: "tel:+50760004345",
    email: "javier.lopez@bizzners.com",
    emailHref: "mailto:javier.lopez@bizzners.com",
    whatsappLabel: "Chat on WhatsApp",
    whatsappHref:
      "https://wa.me/50760004345?text=Hello%20Bizzners%20%E2%80%94%20I%27d%20like%20to%20talk%20about%20taking%20my%20product%20to%20new%20markets.",
    note: "A negotiation ally — one step away.",
  },

  /** honest figures pulled from the brochure structure itself */
  counts: {
    pillars: "07",
    steps: "08",
    tools: "05",
  },

  legal:
    "Bizzners and bizzners.com are registered trademarks of Bizzners Business Builders. Bizzners operates under the laws of the Republic of Panamá.",
} as const;

export type Site = typeof site;
