# 00 — Style Bible

**The shared layer. Read this before generating a single shot.**

Every prompt in every script assumes the rules on this page. The Character and Location
descriptors here are *verbatim strings* — paste them exactly, character for character.
Paraphrasing them is the single fastest way to break continuity across a film.

---

## 1. Global style suffix

Append this to **every** generation prompt, unchanged. It is the reason six separately
generated shots look like one film — and the reason the footage matches the website.

```
STYLE: Corporate editorial cinematography, cinematic but believable. Shot on a full-frame
sensor, anamorphic-ish rendering, natural film grain, subtle halation on highlights. Cool
color grade leaning deep navy blue (#232d7d) and steel blue (#4a7fe0), with warm neutral
highlights in skin and paper. Real textures, natural light, no CGI look, no plastic skin.
Handheld micro-movement even on locked-off shots. Composition leaves quiet negative space.
No text, no watermarks, no logos, no visible brand names, no signage, no captions.
```

Derived from the still-image art direction already agreed in `PROMPTS.md` — the video
grade and the photography grade are deliberately identical.

## 2. Global negative prompt

Append to every generation. Add shot-specific extras where a script calls for them.

```
NEGATIVE: text, letters, words, numbers, watermark, subtitles, captions, logos, brand
names, signage, readable labels, UI overlays, distorted hands, extra fingers, malformed
faces, warped limbs, CGI render, 3D animation look, cartoon, illustration, plastic skin,
oversaturated, HDR halo, heavy lens flare, stock-photo posed smiling, direct-to-camera
talking, mouth movement, crowds of identical people, drone-hyperlapse cliché, slow-motion
confetti, corporate handshake cliché in front of a window at sunset.
```

Two notes on that last block:

- **`mouth movement` / `direct-to-camera talking`** is in the negative list on purpose.
  No one in this slate speaks. Generated lip movement without lip-sync reads as broken.
- **`readable labels`** matters more than it sounds. Products appear in these films. They
  must be brandless — see §6.

## 3. Character Bible

Five locked figures. Each descriptor is one uninterrupted string, pasted verbatim into the
prompt wherever that person appears. Never re-describe them in your own words.

| ID | Appears in |
|---|---|
| `PRODUCER` | #1, #3, #4 |
| `WORKER` | #1, #4, #5 |
| `BUYER` | #2, #3, #4 |
| `FACILITATOR` | #2, #3 |
| `ANALYST` | #2, #3 |

### PRODUCER
> a Latin American man in his mid-fifties, medium build, close-cropped greying black hair,
> deep-set brown eyes, weathered warm-olive skin, short grey stubble, wearing a plain
> slate-blue work shirt with the sleeves rolled to the forearm and no tie, a scuffed steel
> wristwatch on the left wrist

### WORKER
> a Latin American woman in her early thirties, slight build, black hair pulled into a low
> tight bun, warm brown skin, wearing a charcoal cotton work coat over a navy tee, clear
> safety glasses pushed up on her forehead, blue nitrile gloves

### BUYER
> an East Asian woman in her mid-forties, tall and composed, straight shoulder-length black
> hair tucked behind one ear, light warm skin, wearing a well-cut charcoal blazer over a
> cream shell top, thin silver hoop earrings, no other jewellery

### FACILITATOR
> a Latin American man in his early forties, lean, short dark hair with a clean side part,
> medium-brown skin, close-shaved, wearing a navy merino sweater over a white oxford shirt
> with the collar open, holding a slim dark-grey folder

### ANALYST
> a Black woman in her late twenties, natural short-cropped hair, deep-brown skin, small
> gold stud earrings, wearing a steel-blue button-down shirt with the cuffs turned back,
> reading glasses in her hand rather than on her face

### The consistency rule

Generative models drift. Three defences, applied throughout the scripts:

1. **Verbatim descriptors.** Copy-paste, never retype.
2. **Seed locking.** Fix one seed per character and reuse it across that character's shots.
   Note the working seed in the margin of the script once you find one that renders well.
3. **Shot design that forgives drift.** The scripts deliberately favour hands, forearms,
   backs, over-the-shoulder framing and mid-wides over recurring tight close-ups. A face
   seen at 2/3 body length across two shots survives a drift that a 50mm close-up will not.
   Where a close-up is unavoidable, the script says so and the shot is written to be
   generated in the *same batch* as its neighbour.

## 4. Location Bible

Same rule — paste verbatim.

### PLANT
> the interior of a small, clean light-industrial canning plant, a single production line
> of unlabelled aluminium cans moving along a stainless conveyor, pale concrete floor,
> exposed steel roof trusses, cool overhead fluorescents mixed with daylight from high
> clerestory windows

### BAY
> a modest loading bay at the back of a small plant, a single roller shutter door, stacked
> wooden pallets shrink-wrapped in blue film, a worn concrete apron outside, scrub grass at
> the edge of the frame, overcast tropical daylight

### TERMINAL
> a working container terminal in Panamá at dusk, stacked multicoloured shipping containers
> in long rows, gantry cranes silhouetted against a deep navy-blue sky, sodium work lamps
> glowing amber, wet asphalt reflections, faint sea haze

### LOCKS
> the lock chamber of the Panama Canal at blue hour, enormous steel lock gates parting on a
> vertical seam, dark green water below, low concrete walls running to the horizon, mooring
> locomotives on the rails, tropical humidity in the air

### ROOM
> a quiet glass-walled meeting room high above Panama City, a long pale-oak table, water
> glasses and loose papers, floor-to-ceiling windows showing the bay and container ships at
> anchor, soft overcast daylight, no screens on

### DESK
> a compliance and documents desk, stacks of unmarked customs paperwork squared into neat
> piles, a rubber stamp and ink pad, a desk lamp with a warm bulb, everything else in cool
> shadow, shallow tabletop depth

### WAREHOUSE
> a very large modern distribution warehouse, racking running to a vanishing point four
> storeys high, forklifts moving in the middle distance, cool blue-white LED high bays,
> polished sealed concrete floor, enormous scale

### AISLE
> a retail aisle in an unfamiliar foreign city at opening time, neatly faced shelves of
> brandless packaged goods and plain aluminium cans, cool overhead light with a warm pool
> from a shopfront window at the end of the aisle, no shoppers yet

## 5. Model settings

Written to render on any of the three. Where they differ, use the strictest.

| | Sora 2 | Veo 3 | Runway Gen-4 |
|---|---|---|---|
| Max reliable shot | ~12s (unreliable past 8s) | 8s | 10s |
| **Use in this slate** | **8s ceiling** | **8s ceiling** | **8s ceiling** |
| Aspect | 16:9, 9:16, 1:1 | 16:9, 9:16 | 16:9, 9:16, 1:1 |
| Native audio | yes — **disable it** | yes — **disable it** | n/a |

Standing settings for the whole slate:

- **Resolution** — generate at the maximum the model offers, downscale in the edit. Never
  upscale a 720p generation to 1080p delivery.
- **Frame rate** — 24fps throughout. It is the only rate that reads as film rather than
  as security footage, and it matches the site's unhurried tone.
- **Model-generated audio: off.** Every film's audio is built in the edit. Ambient sound
  the model invents will not match across shots and cannot be ducked under a VO.
- **Shot ceiling: 8 seconds, no exceptions.** Every prompt in this slate is written to
  render inside 8s on the weakest of the three models. If a beat needs 14 seconds it is
  written as two shots with a designed handoff, never as one long generation.

## 6. Products must be brandless

Bizzners' clients are producers of physical goods — cans, packaged goods, cartons. Those
products are in shot constantly. Every prompt describes them as **unlabelled**,
**brandless**, **plain** or **unmarked**, and `readable labels` sits in the global negative
prompt.

This is not only a legal-hygiene point. A visible third-party brand on a pallet implies
Bizzners has a client relationship it may not have, which collides directly with the
brand's own no-invented-claims rule (§8).

## 7. Endcard

**Built in the editor. Never generated.** Generative models cannot render legible type —
this is the one and only place text appears in any film in the slate.

```
Duration     2.5s (3.0s on the 9:16 cut — feed viewers scroll faster but read slower)
Background   solid #232d7d, no gradient, no motion
Wordmark     "bizzners®"  — the "r" in #6c9bff, everything else #ffffff
             ® at ~0.42em, raised to superscript
Tagline      "Business Builders" beneath, letter-spaced ~0.34em, #ffffff at 70% opacity
Contact      "bizzners.com   ·   +507 6000-4345"  in Archivo, #ffffff at 70%
Animation    wordmark fades up over 0.4s; contact line fades up 0.3s behind it; hold; cut
```

Matches `src/brand/Logo.tsx` and the `--brand-navy` / `--brand-blue-bright` tokens in
`src/styles/global.css`, so the film's last frame and the website's header are the same
object.

**9:16 variant (film #5):** identical lockup, plus a WhatsApp affordance beneath the
contact line — a simple white glyph and the words `Chat on WhatsApp`, matching the site's
`contact.whatsappLabel`. Keep the whole lockup inside the middle 60% of frame height so
platform chrome never covers it.

## 8. Copy discipline

`COPY-NOTES.md` sets a rule for this brand and the videos inherit it:

> No invented numbers (clients served, countries, success rates). The only numerals shown
> are structural.

So: **07** pillars, **08** moves, **05** tools. Nothing else. No "trusted by 200+
producers", no "operating in 40 countries", no "94% close rate". None of it is true and
none of it is on the website.

All narration in this slate is drawn from `src/content/site.ts` — either quoted verbatim or
tightened for the ear without adding a claim. Each script names the `site.ts` key its VO
comes from so the client can audit any line against the brochure it was translated from.

## 9. Music and sound

| Film | Music | Sound design |
|---|---|---|
| #1 One Step Away | Sparse piano over a low sustained synth pad; a single cello enters at the turn. No percussion until the final third, then a slow pulse. | Heavy, deliberate. Room tone, machinery, water, the shutter door. The SFX *are* the narration. |
| #2 Not a Sales Department | Cold, thin, metronomic in Scene 1 — then it drops out entirely and returns warm and unmetered. The music carries the argument. | Restrained. Enough to sell the rooms. |
| #3 Eight Moves | A steady, mechanical pulse at a fixed tempo. Every cut lands on the beat. Do not vary the tempo — the discipline is the point. | Percussive punctuation at each move: a stamp, a latch, a page. |
| #4 Matter of Size | Small and intimate, opening out into something orchestral and wide as the warehouse arrives. | Scale contrast — a single conveyor vs. a whole distribution floor. |
| #5 Panamá → The World | 20 seconds, one build, no vocal. | Minimal. Water, a horn, a shelf. |

**Loudness:** −14 LUFS integrated for social delivery (LinkedIn, Reels, WhatsApp), −16 LUFS
for the website hero. True peak −1 dBTP everywhere.

**VO** (films #2, #3, #4): one warm mid-range voice, unhurried, measured, no upward
inflection at line ends, no sell. Read at roughly **145 wpm** — the timecodes in the
scripts are calculated at that rate. Duck the music 4–6 dB under every VO line.

**Silent films** (#1, #5) autoplay muted in-feed and on the site hero. They must land with
the sound off. Every one of their beats is carried by image alone; the music is a bonus for
the minority who unmute, never a load-bearing element.

## 10. Delivery matrix

| Film | Master | Also deliver | Where it goes |
|---|---|---|---|
| #1 | 16:9 · 1920×1080 · 75s | Loop-safe cut, no endcard, muted | Website hero, LinkedIn |
| #2 | 16:9 · 1920×1080 · 60s | 1:1 1080×1080 · burned-in EN subtitles | LinkedIn, sales deck |
| #3 | 16:9 · 1920×1080 · 60s | 1:1 1080×1080 · burned-in EN subtitles | Site `#cycle`, deck |
| #4 | 16:9 · 1920×1080 · 45s | 9:16 1080×1920 · burned-in EN subtitles | Paid social, outreach |
| #5 | 9:16 · 1080×1920 · 20s | 1:1 1080×1080 | WhatsApp, Reels, paid |

Two clarifications, since they look like contradictions:

- **Subtitles are not "on-screen text."** The no-text rule governs what is *composed into
  the film*. Accessibility subtitles on a narrated cut are a platform requirement and are
  burned into the social crops only — the 16:9 masters ship clean.
- **The website hero cut has no endcard.** It sits directly beneath the real logo and the
  real phone number in the page header; a lockup there would be redundant and would break
  the loop. Every other cut keeps it.

## 11. Spanish is one step away

The source brochure is Spanish (`BizznersBasics.2024.pdf`) and the ICP is Latin American
producers. Every script in this slate is built so a Spanish version needs **no
re-generation**:

- No text is composed into any shot, so nothing in-frame is in English.
- No one's lips move, so there is no lip-sync to break.
- VO is a separate layer over finished picture.

A Spanish cut is therefore a VO session, a subtitle pass and an endcard swap. The original
Spanish headlines are still in the brochure and mapped in `COPY-NOTES.md` — *"CRECER NO ES
SOLO UN ASUNTO DE TAMAÑO"*, *"NADIE CONOCE TU NEGOCIO MEJOR QUE TU"* — and they are
stronger in the original than in translation. Worth budgeting for.
