# Bizzners — video slate

Five production-ready scripts for AI-generated video, built from the same content source as
the website (`src/content/site.ts`) and graded to match it.

Written to be executed directly by a video-generation agent or an editor: every shot has a
copy-pasteable prompt, a duration that fits inside the models' reliable limits, and a named
transition into the shot beside it.

---

## The slate

| # | Film | Run | Aspect | Audio | Job it does |
|---|---|---|---|---|---|
| [01](01-one-step-away.md) | **One Step Away** | 75.0s | 16:9 | **Silent** | The manifesto. Website hero loop. |
| [02](02-not-a-sales-department.md) | **Not a Sales Department** | 60.0s | 16:9 + 1:1 | VO | The differentiator. Answers *"so you're a broker?"* |
| [03](03-eight-moves.md) | **Eight Moves** | 60.0s | 16:9 + 1:1 | VO | The process. Answers *"what do you actually do?"* |
| [04](04-matter-of-size.md) | **Growing Is Not a Matter of Size** | 45.0s | 16:9 + 9:16 | VO | The objection-killer. For the producer who thinks they're too small. |
| [05](05-panama-to-the-world.md) | **Panamá → The World** | 20.0s | 9:16 | **Silent** | The one you send. Hard CTA to WhatsApp. |

**[00 — Style Bible](00-style-bible.md)** holds everything shared: the style suffix, the
negative prompt, the Character and Location Bibles, model settings, the endcard spec, music
direction and the delivery matrix. **Read it before generating a single shot.**

---

## How a shot gets made

Every `GEN` block in every script is self-contained except two constant strings, appended
mechanically at generation time:

```
<the GEN block, verbatim>
+ STYLE  → 00-style-bible.md §1
+ NEGATIVE → 00-style-bible.md §2
+ any SHOT NEGATIVE listed under that shot
```

Character and location descriptors are **inlined verbatim in every prompt where they
appear**. That is why the prompts are long. Paste them; do not paraphrase, do not
abbreviate, do not retype. Consistency across separately generated shots is entirely a
function of those strings being identical.

---

## Constraints these scripts are built around

1. **8-second ceiling on every shot.** Veo 3 caps at 8s, Runway Gen-4 at 10s, Sora 2 is
   unreliable past ~12s. Every shot in the slate renders on the weakest of the three.
   Longer beats are built from consecutive shots with a designed handoff.
2. **No text is ever generated.** Models cannot render legible type. The endcard is built
   in the editor and is the only text in any film.
3. **No dialogue, no lip-sync.** Nobody speaks on camera anywhere in the slate. VO is
   recorded separately and laid over finished picture.
4. **Faces are used sparingly.** Character drift across generations is real, so the shot
   design leans on hands, forearms, backs and mid-wides. Where a close-up is unavoidable
   the script says so and pairs it with a batch-generation note.
5. **Products are always brandless.** Producers' goods are in shot constantly; every prompt
   specifies unlabelled/unmarked, and `readable labels` sits in the global negative.
6. **No invented statistics.** `COPY-NOTES.md` sets this rule for the brand and the videos
   inherit it — the only numerals anywhere are the structural ones (07 pillars, 08 moves,
   05 tools). No client counts, no countries, no success rates.

---

## Where the words come from

All narration traces to `src/content/site.ts`, and each VO table names the key it came from
so the client can audit any line against the brochure it was translated from
(`BizznersBasics.2024.pdf`, mapped in `COPY-NOTES.md`).

| Idea | Key | Film |
|---|---|---|
| *"Your business, projected — one step away."* | `hero.titleA/titleB` | 01 |
| *"The link in the chain that decides your success."* | `chain` | 01, 05 |
| *"An organizational concept very different from a sales department."* | `ally.p2` | 02 |
| *"The client is never one party alone."* | `experience.tools[1]` | 02 |
| *"Eight moves. One disciplined loop."* | `cycle.heading` | 03 |
| The eight step names, spoken verbatim | `cycle.steps` | 03 |
| *"Growing is not just a matter of size"* | `growth.heading` | 04 |
| *"The size of your company doesn't matter."* | `experience.intro` | 04 |
| *"Let's talk about your next market."* | `closing.cta` | 04 |
| *"Chat on WhatsApp"* + prefilled message | `contact.whatsappHref` | 05 |

---

## Suggested production order

Not the order they're numbered. This sequence front-loads the cheap risk.

1. **Pilot: film 01, shots 2-A and 2-B.** Two adjacent shots with a designed match cut.
   Generate them, cut them together, and confirm the handoff and the grade actually work
   before committing to 50 shots. If the transition holds, the whole slate's approach holds.
2. **Film 03.** Twelve shots, eight of them 4.0s — the lowest generation risk in the slate,
   and it produces the reusable `ROOM`, `DESK` and `TERMINAL` looks that three other films
   draw on. Its edit is the hardest, though; see its assembly notes on the 120 BPM grid.
3. **Film 05.** Six vertical shots, fast, and it delivers the asset with the most immediate
   commercial use.
4. **Film 04**, then **Film 02** — the two most human-blocking-dependent.
5. **Film 01 last.** Thirteen shots, the highest craft bar, and it benefits from every
   lesson learned about seeds and character descriptors on the other four.

---

## Delivery

Full matrix in `00-style-bible.md` §10. In short: 16:9 masters ship clean, social crops
carry burned-in English subtitles on the narrated films, and the website hero cut of film
01 ships with no endcard so it loops.

**A Spanish version needs no re-generation.** No text is composed into any shot and no
lips move, so a Spanish cut is a VO session, a subtitle pass and an endcard swap. Given the
source brochure is Spanish and the ICP is Latin American producers, that's worth budgeting
for — see `00-style-bible.md` §11.
