# 02 — Not a Sales Department

| | |
|---|---|
| **Runtime** | 60.0s (57.5s picture + 2.5s endcard) |
| **Aspect** | 16:9 master · 1920×1080 · 24fps · **+ 1:1 crop** with burned-in EN subtitles |
| **Audio** | English VO narrator + music. **No on-screen text** (subtitles on the 1:1 crop only). |
| **Placement** | LinkedIn, sales deck |
| **Model** | Veo 3 or Runway Gen-4 (both handle interior human blocking well) |
| **Shots** | 10 + endcard · longest shot 6.0s |

> **Prompt convention.** Every `GEN` block is self-contained except the **style suffix**
> (`00-style-bible.md` §1) and **negative prompt** (§2), appended mechanically. Character
> and location descriptors are inlined verbatim — paste, never paraphrase.

---

## Intent

The most important film in the slate commercially, because it answers the question every
prospect silently asks: *"so you're a broker?"*

The site's own answer is unusually sharp, and the film is built directly on it:

- `ally.p2` — *"a versatile, multidisciplinary unit of collaborators — **an organizational
  concept very different from a sales department**. We connect you, as a producer, with
  buyers in any location, with a complete view of the available options."*
- `experience.tools[1]` — *"For Bizzners the client is never one party alone: it is every
  participant, and their goals are the achievement."*

Structure is a straight negation-then-assertion: **what it isn't → what it is → proof.**
The proof beat is the whole film — the facilitator stays in the room after both parties
have left, because he was never working for one of them.

---

## Timeline

| Shot | In | Out | Dur | Scene | Beat |
|---|---|---|---|---|---|
| 1-A | 0:00.0 | 0:06.0 | 6.0s | S1 What it isn't | A sales floor. Identical, metronomic. |
| 1-B | 0:06.0 | 0:11.0 | 5.0s | S1 | Top-down: the grid. People as geometry. |
| 1-C | 0:11.0 | 0:16.0 | 5.0s | S1 | The lights cut out, bank by bank. |
| 2-A | 0:16.0 | 0:22.0 | 6.0s | S2 What it is | An analyst at a window, reading the port. |
| 2-B | 0:22.0 | 0:28.0 | 6.0s | S2 | Paperwork squared. A stamp comes down. |
| 2-C | 0:28.0 | 0:34.0 | 6.0s | S2 | The facilitator, walking, carrying the file. |
| 2-D | 0:34.0 | 0:40.0 | 6.0s | S2 | The unit, working. Not performing. |
| 3-A | 0:40.0 | 0:46.0 | 6.0s | S3 Both sides | Two parties seated. He stays standing. |
| 3-B | 0:46.0 | 0:52.0 | 6.0s | S3 | Both reach for the same page. |
| 3-C | 0:52.0 | 0:57.5 | 5.5s | S3 | They leave together. He stays. |
| EC | 0:57.5 | 1:00.0 | 2.5s | Endcard | Lockup. |

---

## Voiceover

Warm mid-range, unhurried, no sell. **145 wpm.** Duck music 5 dB under each line.
Every line traces to `site.ts` — the key is noted so the client can audit it.

| # | In | Out | Line | Source |
|---|---|---|---|---|
| V1 | 0:02.0 | 0:07.5 | "A sales department has one job. Push your product. Represent one side." | *original framing* |
| V2 | 0:09.0 | 0:15.0 | "Bizzners is something else. An organizational concept very different from a sales department." | `ally.p2` (verbatim clause) |
| V3 | 0:17.5 | 0:24.0 | "A versatile, multidisciplinary unit of collaborators. Analysts. Mediators. People who know the paperwork." | `ally.p2` (verbatim + gloss) |
| V4 | 0:25.5 | 0:33.0 | "We connect you with buyers in any location — with a complete view of the options." | `ally.p2` (tightened) |
| V5 | 0:34.0 | 0:39.5 | "Every partner evaluated. Every term measured before commitment." | `cooperation.pillars[5].gloss` |
| V6 | 0:41.0 | 0:47.0 | "Because for Bizzners, the client is never one party alone." | `experience.tools[1]` (verbatim) |
| V7 | 0:48.0 | 0:54.5 | "It is every participant. And their goals are the achievement." | `experience.tools[1]` (verbatim) |
| V8 | 0:55.0 | 0:57.5 | "An ally in negotiations." | `ally.p2` (verbatim) |

**Direction for V1.** Flat, almost bored. It is describing something ordinary. The warmth
enters on V2 and never leaves. That tonal turn is doing as much work as the picture cut.

**Direction for V6–V7.** Slow down. This is the thesis. Leave the full beat between them —
the pause at 0:47 is written into the edit.

---

## SCENE 1 — What it isn't · 0:00–0:16

**Location** A generic open-plan sales floor. Deliberately *not* from the Location Bible —
it is the one space in the slate that isn't Bizzners, and it should feel like nowhere.
**Actors** Anonymous only. No Character Bible figures appear here. Nobody in this scene gets
a face, because the point is that the model treats people as interchangeable.
**Focus** Deep, flat, unflattering. Everything sharp, nothing chosen. The absence of a
focal point is the statement.
**Camera** Rigid. Locked-off or perfectly linear tracking. No handheld drift at all — it
should feel mechanical against the rest of the film.
**Palette** Greenish-cyan fluorescent, low contrast, slightly sickly. The only ugly frames
in the slate, and they are ugly on purpose.
**Transition IN** Hard cut from black on the first metronome tick.
**Transition OUT** The lights cut out in 1-C, killing the frame to near-black; 2-A opens on
a single soft daylight source. Darkness is the wipe.

### Shot 1-A · 0:00–0:06 · 6.0s

```
GEN: A large open-plan sales floor, long rows of identical desks with identical monitors
and identical headsets, seen from the end of one row at desk height, perspective running
hard to a vanishing point. Anonymous workers in identical postures at every desk, seen from
behind, none identifiable. Flat greenish-cyan overhead fluorescent lighting, low ceiling,
grey carpet tiles, no windows. 28mm, deep focus, everything sharp from foreground to
vanishing point. Camera tracks laterally right at a perfectly constant mechanical speed,
the rows sliding past like a comb.
```
`+ STYLE (§1)` `+ NEGATIVE (§2)`
`+ SHOT NEGATIVE: readable monitor screens, visible charts, whiteboard writing, faces to camera, warm light`

**Sound** A flat room tone with a faint high electrical whine. Music enters: a cold
metronomic tick, one per second, no melody.

### Shot 1-B · 0:06–0:11 · 5.0s

```
GEN: Top-down overhead view looking straight down at a grid of identical office desks,
perfectly regular rows and columns, anonymous seated workers reduced to shoulders and the
tops of heads, identical monitors and identical headsets on every desk. Flat greenish-cyan
fluorescent light, grey carpet, no shadows of consequence. Fully symmetrical geometric
composition. 35mm equivalent, straight down, deep focus, locked off. Almost no movement in
frame — only the smallest shifts of posture.
```
`+ STYLE (§1)` `+ NEGATIVE (§2)`
`+ SHOT NEGATIVE: readable screens, text on paper, plants, personal objects, individuality`

**Sound** The tick continues. Add a layer of overlapping indistinct call-centre murmur,
mixed low and deliberately unintelligible.

### Shot 1-C · 0:11–0:16 · 5.0s

```
GEN: A large empty open-plan office at night with the overhead fluorescent lighting
switching off one bank at a time, from the far end of the room toward the camera, each bank
plunging another section of identical desks into darkness. Grey carpet, identical monitors
dark and reflective. No people. 24mm wide, locked off, deep focus, the room progressively
consumed by darkness until only a faint spill remains at the near edge of frame.
```
`+ STYLE (§1)` `+ NEGATIVE (§2)`

**Sound** Three heavy contactor clunks as the banks kill. On the last one, **the metronome
stops dead.** Two full beats of near-silence before Scene 2.
**Handoff** End on near-black with a residual cool spill. 2-A must open dark and resolve
into daylight, so the cut reads as a room being replaced rather than a scene changing.

---

## SCENE 2 — What it is · 0:16–0:40

**Location** `TERMINAL` seen through glass → `DESK` → a corridor → `ROOM`.
**Actors** `ANALYST` (2-A), hands only (2-B), `FACILITATOR` (2-C), all four of `ANALYST`,
`FACILITATOR`, plus two unnamed collaborators (2-D).
**Focus** Selective and shallow throughout — the exact inverse of Scene 1. Every frame
chooses something. Rack focus is used twice.
**Camera** Handheld micro-movement returns. Slow, human, curious.
**Palette** Daylight and warm practicals against the brand navy. Contrast comes back up.
**Transition IN** Out of darkness.
**Transition OUT** 2-D ends on a wide of the room from outside the glass; 3-A picks up the
same room from inside. A cut through the glass.

### Shot 2-A · 0:16–0:22 · 6.0s

```
GEN: A Black woman in her late twenties, natural short-cropped hair, deep-brown skin, small
gold stud earrings, wearing a steel-blue button-down shirt with the cuffs turned back,
reading glasses in her hand rather than on her face, stands in profile at a floor-to-ceiling
window high above Panama City, looking down at a working container terminal in the distance
— stacked multicoloured shipping containers in long rows, gantry cranes, faint sea haze.
Soft overcast daylight from the window rims her face and shoulder. She is still, thinking,
not working a device. 85mm, shallow depth of field. The shot begins focused on the
containers far below through the glass, then racks focus back to her face in profile.
```
`+ STYLE (§1)` `+ NEGATIVE (§2)`
`+ SHOT NEGATIVE: phone, laptop, tablet, pointing at the view, speaking, mouth movement`

**Sound** Room tone returns, warm and roomy. The high-ceiling reverb of a real building.
Music re-enters — same instrument family as the metronome, now unmetered and warm.
**Note** The rack focus *is* the line. She reads the market before she talks to anyone.

### Shot 2-B · 0:22–0:28 · 6.0s

```
GEN: Close on a compliance and documents desk, stacks of unmarked customs paperwork squared
into neat piles, a rubber stamp and ink pad, a desk lamp with a warm bulb, everything else
in cool shadow. A pair of hands squares one stack against the desk edge with two sharp taps,
sets it down, lifts the rubber stamp, inks it, and brings it down once firmly on the top
sheet. Only hands and forearms in frame, shirt cuffs turned back. 60mm macro, very shallow
tabletop depth of field, focus on the stamp and the paper. Locked off with slight drift.
```
`+ STYLE (§1)` `+ NEGATIVE (§2)`
`+ SHOT NEGATIVE: readable document text, letterhead, printed forms, signatures, logos`

**Sound** Paper squared — two taps. The ink pad. The stamp coming down: the single most
satisfying sound in the film. Let it sit proud in the mix.

### Shot 2-C · 0:28–0:34 · 6.0s

```
GEN: A Latin American man in his early forties, lean, short dark hair with a clean side
part, medium-brown skin, close-shaved, wearing a navy merino sweater over a white oxford
shirt with the collar open, holding a slim dark-grey folder, walks steadily toward camera
along a bright corridor with a glass wall on one side showing the bay and container ships
at anchor. Overcast daylight from the left. He is unhurried and purposeful, looking ahead,
not at the folder. 50mm, medium shot from the waist up, shallow focus holding him sharp as
the corridor slides soft behind. Camera dollies backward ahead of him at his walking pace.
```
`+ STYLE (§1)` `+ NEGATIVE (§2)`
`+ SHOT NEGATIVE: rushing, checking a watch, talking on a phone, mouth movement, suit and tie`

**Sound** Measured footsteps on hard floor. Deliberately the opposite tempo to Scene 1's
metronome — slower, and irregular in a human way.

### Shot 2-D · 0:34–0:40 · 6.0s

```
GEN: Four colleagues working together around one end of a long pale-oak table in a quiet
glass-walled meeting room high above Panama City, floor-to-ceiling windows showing the bay
and container ships at anchor, soft overcast daylight, no screens on. Among them, a Black
woman in her late twenties with natural short-cropped hair, deep-brown skin and a steel-blue
button-down shirt with the cuffs turned back, and a Latin American man in his early forties
with short dark hair in a clean side part, medium-brown skin, and a navy merino sweater over
a white oxford shirt. Loose papers spread between all four; one reaches across to move a
sheet, another leans in. They are absorbed in the work, none of them facing camera. 35mm,
medium-wide, moderate depth of field. Slow arc left around the table.
```
`+ STYLE (§1)` `+ NEGATIVE (§2)`
`+ SHOT NEGATIVE: presentation to a room, someone standing and pitching, applause, faces to camera, mouth movement`

**Sound** Papers, a chair shifting, the room. Under it, the music opens out.
**Note** Nobody is presenting. Nobody is selling. If the model puts someone on their feet
addressing the others, regenerate — that is a sales meeting, and this film exists to say
this is not that.

---

## SCENE 3 — Both sides of the table · 0:40–0:57.5

**Location** `ROOM`.
**Actors** `PRODUCER`, `BUYER`, `FACILITATOR`.
**Focus** Widens as the scene runs. It starts on a triangle of people and ends on one man
alone in a wide — the loneliness of the frame is the proof of the claim.
**Camera** Almost still. Let the blocking carry it. One slow pull back at the end.
**Palette** Even overcast daylight. Neither side of the table is lit more warmly than the
other. Grade them identically — an impartiality that the audience feels without naming.
**Transition IN** Cut through the glass from 2-D's exterior wide to an interior of the same
room.
**Transition OUT** Hard cut to the endcard on the folder closing.

### Shot 3-A · 0:40–0:46 · 6.0s

```
GEN: A quiet glass-walled meeting room high above Panama City, a long pale-oak table, water
glasses and loose papers, floor-to-ceiling windows showing the bay and container ships at
anchor, soft overcast daylight. Seated on the near side of the table, a Latin American man
in his mid-fifties, medium build, close-cropped greying black hair, weathered warm-olive
skin, short grey stubble, plain slate-blue work shirt with sleeves rolled to the forearm.
Seated directly opposite him, an East Asian woman in her mid-forties, tall and composed,
straight shoulder-length black hair tucked behind one ear, light warm skin, well-cut
charcoal blazer over a cream shell top. Standing at the head of the table between them, not
sitting down, a Latin American man in his early forties in a navy merino sweater over a
white oxford shirt, who places a slim dark-grey folder down in the exact centre of the table
and takes one step back from it. 35mm, wide, symmetrical composition with the two seated
figures balanced left and right. Locked off, even light on both sides of the table.
```
`+ STYLE (§1)` `+ NEGATIVE (§2)`
`+ SHOT NEGATIVE: mouth movement, talking, gesturing while speaking, one figure lit more brightly than the other`

**Sound** Chairs, the folder set down on wood, the room. Music holds steady.
**Blocking is the message.** He stands, he places it in the middle, he steps back. Three
actions. If the generation has him sit on either side, it has broken the film's thesis —
regenerate until he stays standing and neutral.

### Shot 3-B · 0:46–0:52 · 6.0s

```
GEN: Close on the centre of a long pale-oak table in a bright glass-walled room, a slim
dark-grey folder open with a single sheet of unmarked paper on top. Two hands enter frame
from opposite sides simultaneously — from the left, the hand of a man in his fifties with
weathered warm-olive skin, slate-blue work shirt cuff rolled to the forearm, a scuffed steel
wristwatch; from the right, the hand of a woman in her forties with light warm skin and a
charcoal blazer cuff. Both reach for the same sheet and their fingertips arrive at its two
opposite corners at the same moment. Neither withdraws. 60mm, shallow focus on the paper and
the two hands, faces out of frame above. Locked off.
```
`+ STYLE (§1)` `+ NEGATIVE (§2)`
`+ SHOT NEGATIVE: handshake, one hand taking the paper away, readable document text, pen, signature`

**Sound** Two hands on paper, a half-beat apart. Then stillness.
**Note** This replaces the handshake. Both parties hold the same page at the same time.
The literal handshake belongs to film #3, where the process has earned it.

### Shot 3-C · 0:52–0:57.5 · 5.5s

```
GEN: Wide shot of a quiet glass-walled meeting room high above Panama City, a long
pale-oak table, floor-to-ceiling windows showing the bay and container ships at anchor,
soft overcast daylight. A man in his fifties in a slate-blue work shirt and a woman in her
forties in a charcoal blazer walk out of the room together through the same door at the far
end, side by side, already past the threshold. Remaining alone in the empty room, a Latin
American man in his early forties, lean, short dark hair with a clean side part,
medium-brown skin, close-shaved, wearing a navy merino sweater over a white oxford shirt
with the collar open, stands at the table and closes a slim dark-grey folder with one hand.
24mm wide, deep focus, the room large and quiet around him. Camera pulls slowly back and
away, letting the room grow around the single remaining figure.
```
`+ STYLE (§1)` `+ NEGATIVE (§2)`
`+ SHOT NEGATIVE: waving goodbye, looking at camera, smiling to himself, mouth movement, following them out`

**Sound** Two sets of footsteps receding together. A door. Then one room, one man, and the
folder closing — the last sound before the cut.
**This is the whole film.** He does not leave with either of them. He was not working for
one of them. Everything else in these 60 seconds is setup for this shot.

---

## ENDCARD · 0:57.5–1:00.0 · 2.5s

Per `00-style-bible.md` §7. Hard cut on the folder closing.

---

## Assembly notes

**The tonal hinge is at 0:16** and it is carried by four things at once — the light (cyan →
daylight), the lens (deep → shallow), the camera (mechanical → handheld), and the music
(metronomic → unmetered). Land all four on the same frame. If the hinge is soft, the film
reads as a montage instead of an argument.

**Cut rhythm.** Scene 1 accelerates slightly (6/5/5) — impatient. Scenes 2 and 3 settle
into a flat, even 6.0s and stay there. The evenness *is* the "structured cooperation" idea
in `cooperation.heading`, expressed as edit rhythm rather than as a claim.

**Music map.**
- 0:00 — cold metronomic tick, no melody
- 0:15 — dead stop on the last contactor clunk
- 0:17 — warm unmetered re-entry, same instrument family
- 0:34 — opens out, strings enter
- 0:47 — thins to almost nothing under V6/V7
- 0:57.5 — clean through the endcard, tails out

**1:1 crop.** All Scene 3 blocking is symmetrical and centre-weighted, so it survives the
square crop intact. The two shots that need attention: **1-A**'s lateral track loses its
vanishing point at the edges — recentre the crop on the row's perspective line; and **3-C**'s
pull-back needs the departing pair kept inside frame, so hold the crop wide and let the
subtitle band sit over the lower window glass, which is empty in every take.

**Subtitles** are burned into the 1:1 crop only. The 16:9 master ships clean — see
`00-style-bible.md` §10 for why that isn't a contradiction of the no-text rule.
