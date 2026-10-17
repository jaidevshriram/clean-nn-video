# Writing the narration

## Format (`script/script.md`)

```
## ch03 | The case of the cat and the car          ← chapter: id | on-screen title (a concept, not an art style)

[cc_v] Every photo that lights it up has a V in it. (pause .6)
> Storyboard note for the cue above: what we see. Never spoken.
```

- `[cue_id]` starts a narration beat; ids are short, prefixed per chapter (`cc_`, `hl_`), and become the animation
  anchors, so keep them stable once scenes exist.
- `{display|spoken}` fixes pronunciation without changing subtitles: `{DINOv2|dino vee two}`.
- `(pause s)` at the end of a cue sets the silence after it; inline `(pause s)` splits the cue into separately voiced
  segments (with context, so intonation stays natural) joined by silence. Use inline pauses to let a key line land.
- Storyboard notes (`>`) describe the picture; keep them in sync with the scenes and free of stale characters.

## Voice of the narration

- **Third person, teacher's voice.** "The researcher Nick Cammarata spent most of a decade on this question. In a recent
  essay, Nick argues…". Never speak as the author. Quote the author only as clearly marked quotes.
- **Keep the author's hedges.** "maybe", "Nick's guess is", "about eighty-five percent", "so far". A summary that
  turns a hedge into a fact is a factual error.
- **Credit** the people, labs and papers the source credits, by name, where their work appears.
- **Plain words first, term second:** "a tiny detector that lights up… researchers call it a neuron". Introduce each
  term once, then use it consistently. Never coin a term the source doesn't use; never keep an odd word the user
  questions (the reference film's "basement" for a neuron's negative side confused everyone: "what switches it off").
- Numbers: say them the way the screen will show them; drop numbers and IDs the viewer doesn't need.

## Structure

- **Open with the pictures you'll show.** The first lines must describe the first images literally (the reference
  film opened on a galaxy while talking about cities; the user caught it). Then bridge explicitly into the next
  metaphor: "Let's zoom all the way in to a single light from that galaxy, and picture it as a little building."
- **Announce the map.** Say the parts up front ("It comes in four parts…") and open each part with a one-line bridge
  ("Part two: we reopen the evidence, case by case.").
- **One idea per chapter, one concept per beat.** A chapter that introduces three concepts and five examples will be
  called "hard to follow". Cut examples before cutting explanation.
- **Set up before payoff.** Name what a metaphor stands for before it appears: "Picture the narrow circuit as a little
  meerkat… and the broad one as a big grazer. So, which one wins?" Only then show the animals.
- **Explicit callbacks to concepts, never to chapters/worlds:** "Remember the V neuron, pointed versus round?" not "back
  in the noir world". Say it is a callback ("We've already met a few language neurons along the way: …").
- **Chapter transitions need a reason:** the last line of a chapter or the first of the next says why we're moving on
  ("So far every example came from image networks. What about language?"). A chapter must never start abruptly.
- **Structure complex chapters as questions.** The reference film's hardest chapter became readable once framed as
  three questions the viewer could track ("How many neurons can we read? Can we follow the reasoning? What about the
  mess that's left?"), each answered in turn, then summarised.
- **Recap at the end:** one line per key takeaway, with pauses, then a last line that restates the thesis.
- Pace: ~150 words/min is comfortable for dense material; give a 0.6–1.5 s pause after each key claim, longer at part
  breaks.

## Adversarial script review (always, before voicing; again after big rewrites)

Run three subagents in parallel on the full script plus the source text (prompts in `review.md`):
1. **Clarity / first-time viewer:** where would someone with no background get lost? Undefined terms, jumps, metaphors
   shown before explained, rushed beats, callbacks that assume memory.
2. **Fact-check vs. the source:** every claim, number, attribution and hedge against the source; overclaims; missing
   credits; paraphrases that change meaning.
3. **Structure / pacing:** does each chapter have one job, a reason to exist, an entry bridge and an exit; is anything
   repeated or missing; is the arc (problem → evidence → mechanism → meaning) clear.

Merge the findings into one rewrite yourself (don't let three agents edit the file), then re-check anchors.
