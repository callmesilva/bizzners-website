# 03 — Eight Moves

| | |
|---|---|
| **Runtime** | 60.0s (57.5s picture + 2.5s endcard) |
| **Aspect** | 16:9 master · 1920×1080 · 24fps · **+ 1:1 crop** with burned-in EN subtitles |
| **Audio** | English VO narrator + music. **No on-screen text** (subtitles on the 1:1 crop only). |
| **Placement** | Website `#cycle` section, sales deck |
| **Model** | Any. Every shot here is short and simple by design — see *Assembly*. |
| **Shots** | 12 + endcard · longest shot 7.5s · **8 of the 12 are exactly 4.0s** |

> **Prompt convention.** Every `GEN` block is self-contained except the **style suffix**
> (`00-style-bible.md` §1) and **negative prompt** (§2), appended mechanically. Character
> and location descriptors are inlined verbatim — paste, never paraphrase.

---

## Intent

This is the credibility film. It answers *"what do you actually do?"* by showing the
process the site already publishes as its `cycle` — eight named moves, run the same way
every time.

Source copy:

- `cycle.heading` — *"Eight moves. One disciplined loop."*
- `cycle.sub` — *"Every engagement advances through the same cycle — from first contact to
  closing and projections."*
- `cycle.steps[0..7]` — the eight names, spoken verbatim.
- `cooperation.pillars[1].gloss` — *"Deals that run on process, not improvisation."*

**The edit is the argument.** Eight consecutive shots of exactly 4.0 seconds, every cut
landing dead on a bar line at a tempo that never varies. The viewer feels the discipline
before the narrator names it. Do not "improve" the rhythm with variation — the rigidity is
the entire point, and it is the one place in this slate where mechanical is correct.

It opens on a handshake nobody has earned yet, and returns to that same handshake at 0:44
once the audience knows what stands behind it.

---

## Timeline

Music is **120 BPM, 4/4** — one bar = 2.0s. Every cut below lands on a bar line.

| Shot | In | Out | Dur | Bars | Scene | Beat |
|---|---|---|---|---|---|---|
| 0-A | 0:00.0 | 0:06.0 | 6.0s | 3 | S0 Cold open | A handshake. Meaningless, for now. |
| 1-A | 0:06.0 | 0:10.0 | 4.0s | 2 | S1 Reach & present | **01** Distributor outreach |
| 1-B | 0:10.0 | 0:14.0 | 4.0s | 2 | S1 | **02** Range & capacity assessment |
| 1-C | 0:14.0 | 0:18.0 | 4.0s | 2 | S1 | **03** Offer presentation |
| 2-A | 0:18.0 | 0:22.0 | 4.0s | 2 | S2 Mediate & facilitate | **04** Mediation & option review |
| 2-B | 0:22.0 | 0:26.0 | 4.0s | 2 | S2 | **05** Procedural facilitation |
| 2-C | 0:26.0 | 0:30.0 | 4.0s | 2 | S2 | **06** Collateral advisory |
| 3-A | 0:30.0 | 0:34.0 | 4.0s | 2 | S3 Control & close | **07** Operations & compliance control |
| 3-B | 0:34.0 | 0:38.0 | 4.0s | 2 | S3 | **08** Closing & projections |
| 4-A | 0:38.0 | 0:44.0 | 6.0s | 3 | S4 The loop | The folders come out again. |
| 4-B | 0:44.0 | 0:50.0 | 6.0s | 3 | S4 | The handshake — now you know its cost. |
| 4-C | 0:50.0 | 0:57.5 | 7.5s | — | S4 | The terminal keeps working. |
| EC | 0:57.5 | 1:00.0 | 2.5s | — | Endcard | Lockup. |

---

## Voiceover

Warm mid-range, **145 wpm**, no sell. The eight move lines are read flat and even — same
inflection, same weight, like items in a checklist. The warmth returns only in the coda.

| # | In | Out | Line | Source |
|---|---|---|---|---|
| V0 | 0:00.5 | 0:03.5 | "Every agreement ends the same way." | *original framing* |
| V1 | 0:03.8 | 0:06.4 | "Eight moves. One disciplined loop." | `cycle.heading` (verbatim) |
| M1 | 0:07.0 | 0:09.6 | "One. Distributor outreach." | `cycle.steps[0]` (verbatim) |
| M2 | 0:10.3 | 0:13.5 | "Two. Range and capacity assessment." | `cycle.steps[1]` (verbatim) |
| M3 | 0:14.3 | 0:17.5 | "Three. Offer presentation." | `cycle.steps[2]` (verbatim) |
| M4 | 0:18.3 | 0:21.5 | "Four. Mediation and option review." | `cycle.steps[3]` (verbatim) |
| M5 | 0:22.3 | 0:25.5 | "Five. Procedural facilitation." | `cycle.steps[4]` (verbatim) |
| M6 | 0:26.3 | 0:29.5 | "Six. Collateral advisory." | `cycle.steps[5]` (verbatim) |
| M7 | 0:30.3 | 0:33.5 | "Seven. Operations and compliance control." | `cycle.steps[6]` (verbatim) |
| M8 | 0:34.3 | 0:37.5 | "Eight. Closing — and projections." | `cycle.steps[7]` (verbatim) |
| V9 | 0:38.5 | 0:42.5 | "Then it begins again." | `cycle.heading` ("loop") |
| V10 | 0:44.5 | 0:48.5 | "Every engagement advances through the same cycle." | `cycle.sub` (verbatim) |
| V11 | 0:50.5 | 0:55.0 | "From first contact to closing. Nothing improvised." | `cycle.sub` + `cooperation.pillars[1].gloss` |

**Timing discipline.** Every move line from M2 onward starts 0.3s after its cut and finishes
at least 0.5s before the next. That gap is not dead air — it is where the sound design lands
(see each shot). Do not close the gaps to fit more words.

**Two deliberate exceptions at the top.** V1 runs 0.4s past the cut at 0:06.0, carrying
across into move 01 — it is the only VO line in the film that crosses a cut, and it exists
to bind the cold open to the sequence that explains it. M1 then starts late, at 0:07.0,
rather than 0.3s after its cut. Both are intentional: the checklist cadence should feel like
it *starts* on move one, not like it was already running.

---

## SCENE 0 — Cold open · 0:00–0:06

**Location** `ROOM`.
**Actors** `PRODUCER` and `BUYER`. Hands and forearms only.
**Focus** Very shallow, 100mm. One event, nothing else.
**Camera** Locked off.
**Palette** Flat overcast daylight. Neutral.
**Transition IN** From black.
**Transition OUT** Hard cut on bar 4 — the first drum hit of the film.

### Shot 0-A · 0:00–0:06 · 6.0s

```
GEN: Close on a handshake over a long pale-oak table in a quiet glass-walled meeting room
high above Panama City, floor-to-ceiling windows showing the bay and container ships at
anchor, soft overcast daylight. On the left, the hand and forearm of a man in his fifties
with weathered warm-olive skin, a plain slate-blue work shirt sleeve rolled to the forearm,
a scuffed steel wristwatch. On the right, the hand and forearm of a woman in her forties
with light warm skin and a charcoal blazer cuff. They clasp once, firmly, hold, and release.
100mm long lens, extremely shallow depth of field, the window and the bay a soft navy-blue
wash behind. Locked off, no camera movement.
```
`+ STYLE (§1)` `+ NEGATIVE (§2)`
`+ SHOT NEGATIVE: faces, sunset light, applause, second handshake, contract, pen`

**Sound** Almost nothing. Room tone and one clean contact. Music has not started.
**Note** Generate this once. It is used again verbatim as **4-B**. Same file, same grade.
The film's structure depends on them being identical.

---

## SCENE 1 — Reach and present · 0:06–0:18 · moves 01–03

**Location** `ROOM` (1-A), `PLANT` (1-B), `ROOM` (1-C).
**Actors** `ANALYST` (1-A, hands), `PRODUCER` + `WORKER` (1-B), `FACILITATOR` + `BUYER`
(1-C, hands and torsos).
**Focus** Tight and specific. Each move is one physical action, isolated. No move gets a
wide — wides are for the coda.
**Camera** Locked off or a single short push. Nothing wanders. Four seconds is not enough
time for a camera to have an opinion.
**Palette** Consistent cool daylight across all three so the cuts feel like one continuous
procedure rather than three locations.
**Transition IN** Hard cut on the downbeat.
**Transition OUT** Hard cut on the downbeat. Every cut in Scenes 1–3 is a hard cut on bar.

### Shot 1-A · 0:06–0:10 · 4.0s · **Move 01 — Distributor outreach**

```
GEN: Close on a long pale-oak table in a bright glass-walled room above Panama City, soft
overcast daylight. A pair of hands with steel-blue shirt cuffs turned back lays out five
identical slim plain grey folders side by side in a neat row on the table, placing them one
after another at an even pace. Deep-brown skin, no rings. Only hands and forearms in frame.
60mm, shallow focus along the row of folders, the far end of the table soft. Locked off.
```
`+ STYLE (§1)` `+ NEGATIVE (§2)`
`+ SHOT NEGATIVE: readable folder labels, tabs with writing, playing cards, tarot, fanning gesture`

**Sound** Five folders landing on wood, evenly spaced, the last one on the beat.

### Shot 1-B · 0:10–0:14 · 4.0s · **Move 02 — Range & capacity assessment**

```
GEN: Inside a small, clean light-industrial canning plant, a single production line of
unlabelled aluminium cans moving along a stainless conveyor, pale concrete floor, exposed
steel roof trusses, cool overhead fluorescents mixed with daylight from high clerestory
windows. A Latin American man in his mid-fifties, close-cropped greying black hair,
weathered warm-olive skin, short grey stubble, plain slate-blue work shirt with sleeves
rolled to the forearm, walks the length of the line beside a Latin American woman in her
early thirties with black hair in a low tight bun, warm brown skin, charcoal cotton work
coat over a navy tee, clear safety glasses pushed up on her forehead. Both are looking at
the line, not at each other. 40mm, medium-wide from the side, tracking laterally with them
at walking pace, moderate depth of field.
```
`+ STYLE (§1)` `+ NEGATIVE (§2)`
`+ SHOT NEGATIVE: clipboard, tablet, pointing, mouth movement, conversation, hard hats`

**Sound** The line running. Two sets of footsteps on concrete.

### Shot 1-C · 0:14–0:18 · 4.0s · **Move 03 — Offer presentation**

```
GEN: Close on a long pale-oak table in a bright glass-walled room above Panama City. A hand
in a navy merino sweater cuff over a white oxford shirt cuff slides a single slim grey
folder across the table and rotates it 180 degrees so that it faces the other side, then
withdraws. Opposite, the hands of a woman in her forties with light warm skin and charcoal
blazer cuffs rest still on the table, waiting, and do not reach for it. 60mm, shallow focus
on the folder as it turns, both pairs of hands in frame, faces out of frame above. Locked
off.
```
`+ STYLE (§1)` `+ NEGATIVE (§2)`
`+ SHOT NEGATIVE: readable document text, opening the folder, faces, mouth movement`

**Sound** Card stock turning against wood. One quiet, precise sound.
**Note** The rotation is the move. An offer is presented when it is turned to face the
other party. Nothing is opened yet — that's move 04.

---

## SCENE 2 — Mediate and facilitate · 0:18–0:30 · moves 04–06

**Location** `ROOM` (2-A), `DESK` (2-B), `TERMINAL` (2-C).
**Actors** Hands only in 2-A and 2-B. `FACILITATOR` implied in 2-C.
**Focus** Tighter still. Scene 2 is the most macro-heavy stretch of the slate — this is
the unglamorous middle of the process, and shooting it close makes it feel exact rather
than dull.
**Camera** Locked off throughout. Three static shots in a row, on the beat, is the most
"procedural" the film gets.
**Palette** 2-B introduces the only warm practical in the film — the desk lamp. It reads as
diligence, late, alone.
**Transition IN/OUT** Hard cuts on bar.

### Shot 2-A · 0:18–0:22 · 4.0s · **Move 04 — Mediation & option review**

```
GEN: Overhead close-up looking straight down at five identical slim plain grey folders laid
in a row on a long pale-oak table, soft overcast daylight from a window out of frame. Two
hands enter from opposite sides of frame: one with a slate-blue work shirt cuff and a
scuffed steel wristwatch, one with a charcoal blazer cuff. Together they slide three of the
folders away to the edges of frame and draw the two remaining folders into the centre,
side by side. 50mm equivalent, straight down, shallow focus on the tabletop plane, locked
off, fully symmetrical.
```
`+ STYLE (§1)` `+ NEGATIVE (§2)`
`+ SHOT NEGATIVE: readable labels, one hand doing all the work, sweeping folders to the floor`

**Sound** Card stock sliding on wood, three away and two in. The two arriving land on beat.
**Note** Both hands do it. Mediation is not one party choosing — `experience.tools[1]`.

### Shot 2-B · 0:22–0:26 · 4.0s · **Move 05 — Procedural facilitation**

```
GEN: A compliance and documents desk, stacks of unmarked customs paperwork squared into
neat piles, a rubber stamp and ink pad, a desk lamp with a warm bulb, everything else in
cool shadow. A pair of hands lifts a single sheet from one pile, passes it sideways to a
second pair of hands, which places it onto a second pile and squares the edge with one tap.
Four hands total, only hands and forearms in frame, cuffs turned back. 60mm macro, very
shallow tabletop depth of field, warm pool of lamplight falling off fast into blue shadow.
Locked off.
```
`+ STYLE (§1)` `+ NEGATIVE (§2)`
`+ SHOT NEGATIVE: readable document text, letterhead, printed forms, signatures, logos, handing over a pen`

**Sound** Paper passing hands, then one tap. Nothing else.

### Shot 2-C · 0:26–0:30 · 4.0s · **Move 06 — Collateral advisory**

```
GEN: Extreme close-up of a plain metal security seal being threaded through the locking bar
of a shipping container door and pulled tight, at a working container terminal in Panamá at
dusk, stacked multicoloured shipping containers in long rows behind, gantry cranes
silhouetted against a deep navy-blue sky, sodium work lamps glowing amber, faint sea haze.
A single gloved hand does the work. Weathered painted steel, rust texture, condensation.
100mm macro, extremely shallow focus on the seal and the locking bar, the container rows
far behind reduced to soft amber and navy shapes. Locked off.
```
`+ STYLE (§1)` `+ NEGATIVE (§2)`
`+ SHOT NEGATIVE: readable seal numbers, serial digits, container markings, stencilled text, padlock`

**Sound** Metal through metal, then the click of the seal taking. Lands on beat.
**Note** "Collateral" here means securing the deal, not artwork. The seal is the metaphor
and it does the job without a word.

---

## SCENE 3 — Control and close · 0:30–0:38 · moves 07–08

**Location** `TERMINAL` (3-A), `ROOM` (3-B).
**Actors** `FACILITATOR` (3-A).
**Focus** Opens up for the first time since the cold open. Move 07 is the first shot since
1-B with a whole human body in it — after four macro shots, that reads as the process
lifting its head.
**Camera** 3-A moves; 3-B is locked. The last static frame before the coda.
**Palette** 3-A is the deepest navy in the film. 3-B is the first dawn light.
**Transition IN/OUT** Hard cuts on bar. The cut out of 3-B into 4-A is the film's hinge.

### Shot 3-A · 0:30–0:34 · 4.0s · **Move 07 — Operations & compliance control**

```
GEN: A Latin American man in his early forties, lean, short dark hair with a clean side
part, medium-brown skin, close-shaved, wearing a navy merino sweater over a white oxford
shirt with the collar open, holding a slim dark-grey folder, walks slowly along a row of
stacked shipping containers at a working container terminal in Panamá at night, sodium work
lamps glowing amber overhead, wet asphalt reflections, gantry cranes silhouetted against a
deep navy-blue sky. He stops, places one open palm flat against a container door, holds it
for a moment, and walks on. 35mm, medium-wide, tracking laterally with him, shallow-ish
focus holding him against the soft container rows.
```
`+ STYLE (§1)` `+ NEGATIVE (§2)`
`+ SHOT NEGATIVE: hi-vis vest, hard hat, clipboard, torch beam, security guard, stencilled container text`

**Sound** Footsteps on wet asphalt. Terminal machinery, distant. One palm on steel.

### Shot 3-B · 0:34–0:38 · 4.0s · **Move 08 — Closing & projections**

```
GEN: A quiet glass-walled meeting room high above Panama City at dawn, a long pale-oak
table, empty water glasses, floor-to-ceiling windows showing the bay with container ships
under way and low warm sun breaking through navy-blue cloud on the horizon. A single slim
grey folder sits closed on the table in the foreground. No people. 40mm, the shot begins
focused on the closed folder in the near foreground, then racks focus past it to the ships
moving out on the bay beyond the glass. Locked off.
```
`+ STYLE (§1)` `+ NEGATIVE (§2)`
`+ SHOT NEGATIVE: people, chairs pushed in neatly, sunset, celebration`

**Sound** The room, empty. Music opens up for the first time — the only harmonic change in
the whole track lands here.
**Note** The rack focus from the closed folder to the departing ships *is* "closing and
projections", the two halves of `cycle.steps[7]`, in one camera move. This is the single
most efficient shot in the slate; if the rack doesn't land cleanly, regenerate rather than
cutting around it.

---

## SCENE 4 — The loop · 0:38–0:57.5

**Location** `ROOM` (4-A, 4-B), `TERMINAL` (4-C).
**Actors** `ANALYST` hands (4-A), `PRODUCER` + `BUYER` hands (4-B).
**Focus** Returns exactly to Scene 1's grammar, then releases into the widest shot of the
film.
**Camera** 4-A and 4-B locked, matching their originals. 4-C is the only slow crane-like
move in the film, and it earns it by being last.
**Palette** Resolves warm.
**Transition IN** Hard cut on bar 20.
**Transition OUT** 4-C's music resolves at 0:56.0 (bar 29); the cut to the endcard falls
1.5s later, over the tail. The only deliberately off-bar cut in the film — it lets the
picture breathe out after 38 seconds of strict rhythm.

### Shot 4-A · 0:38–0:44 · 6.0s

```
GEN: Close on a long pale-oak table in a bright glass-walled room above Panama City, soft
overcast daylight. A pair of hands with steel-blue shirt cuffs turned back, deep-brown skin,
lays out five identical slim plain grey folders side by side in a neat row on the table,
placing them one after another at an even pace. Only hands and forearms in frame. 60mm,
shallow focus along the row of folders. Locked off. Identical framing and lighting to a
previous shot of the same action.
```
`+ STYLE (§1)` `+ NEGATIVE (§2)`
`+ SHOT NEGATIVE: readable folder labels, different table, different lighting`

**Sound** The same five folders landing on wood. The audio rhyme with 1-A is what tells the
viewer this is a loop, not a new scene. Reuse the actual recording.
**Note** Generate this to match **1-A** as closely as possible, or simply reuse 1-A with a
different in-point. Matching beats novelty here.

### Shot 4-B · 0:44–0:50 · 6.0s

**Reuse shot 0-A verbatim.** Same file, same grade, same sound.

The cold open played over an audience who had no idea what it cost. It plays again over an
audience who has just watched eight moves. Nothing about the picture changes; everything
about the reading does. Do not re-generate it, do not re-grade it, do not trim it
differently — identity is the effect.

### Shot 4-C · 0:50–0:57.5 · 7.5s

```
GEN: Very wide shot of a working container terminal in Panamá at dusk, stacked multicoloured
shipping containers in long rows running to the horizon, several gantry cranes moving
simultaneously against a deep navy-blue sky, sodium work lamps glowing amber, wet asphalt
reflections, faint sea haze, a container ship under way on the water beyond. No people. 24mm
wide, deep focus, camera on a slow steady rise, lifting gradually to reveal more of the
terminal and the open water past it.
```
`+ STYLE (§1)` `+ NEGATIVE (§2)`
`+ SHOT NEGATIVE: drone hyperlapse, timelapse, aerial orbit, sunset cliché, birds, fireworks`

**Sound** The terminal, wide and continuous. It does not stop, and it is not going to.
Music resolves at 0:56.0 and holds.

---

## ENDCARD · 0:57.5–1:00.0 · 2.5s

Per `00-style-bible.md` §7. Cut over the music tail.

---

## Assembly notes

**Lock the grid before you cut a frame.** Lay a 120 BPM click across the timeline first and
snap every cut from 0:06 to 0:38 to a bar line. If a shot's action peaks 6 frames off the
beat, retime the shot — do not move the cut. Eight cuts landing dead on the beat is the
whole reason this film is persuasive; eight cuts landing *nearly* on the beat is worse than
no rhythm at all, because the viewer feels the sloppiness without being able to name it.

**Why the moves are 4.0s.** Short enough that eight of them don't outstay their welcome,
long enough for one physical action to read, and — the practical reason — 4-second
generations are where every model in §5 is at its most reliable. This is the lowest-risk
film in the slate to produce, and the highest-risk to edit. Budget accordingly.

**Sound design carries the discipline.** Every move ends with one clean percussive contact:
folder on wood, footsteps, folder turning, folders sliding, paper tapped, seal clicking,
palm on steel, and then — deliberately — nothing on move 08. The absent eighth sound is
what makes the coda land.

**Music map.**
- 0:00 — silence over the handshake
- 0:06 — pulse enters at 120 BPM, mechanical, no melody
- 0:18 — a second percussive layer, still no harmony
- 0:34 — **first harmonic change of the film**, on the cut to move 08
- 0:44 — warm, full, over the reprised handshake
- 0:56 — resolve and hold
- 0:57.5 — endcard over the tail

**1:1 crop.** The macro shots (1-A, 1-C, 2-A, 2-B, 2-C) are all centre-weighted and crop
without loss. Two need care: **1-A / 4-A**'s row of five folders runs wide — recompose the
square crop so at least four folders stay in frame, or push in slightly and let the fifth
leave; and **4-C**'s wide rise loses the horizon at square — hold the crop low so the water
stays visible, since the open sea is the payoff.

**Subtitles** burned into the 1:1 crop only. The 16:9 master ships clean.
