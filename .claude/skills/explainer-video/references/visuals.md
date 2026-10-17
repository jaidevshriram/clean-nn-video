# The visual system

The user asked for "exciting and immersive, like Kurzgesagt", and rejected a first cut where a character stood in front
of a board ("why is it so dull… was there no creativity"). What worked: **teleporting through a different art world per
chapter**, each world chosen because its genre *is* the chapter's metaphor, with a small set of symbols that look the
same everywhere.

## Pick the system before animating (show style frames to the user)

- **Worlds:** one per chapter, chosen by meaning: mystery → film noir; a hidden thing → spy titles; growth → a botanical
  plate; competing theories → a game show; testing → pub darts with sports graphics; evolution → a savanna documentary;
  the future → a World's Fair poster. Vary palette and technique (cut paper, pixel art, engraving, night-vision, pop-up
  book, 1930s rubber-hose) so each seam feels like a trip.
- **Recurring symbols** (define 4–6, keep shape/colour/role identical in every world): e.g. "a neuron = anything with
  windows showing its photos, glowing when it fires"; "gold = the thesis, violet = the opposing idea"; "the lens = our
  tools, foggy when tools are bad"; a villain creature for the idea being refuted that shrinks each time it's disproved.
- **Character:** a small silent mascot (Clawd) as the viewer's stand-in: a tourist in a world-specific hat who reacts,
  never explains. The user didn't want the mascot as presenter, and found a human presenter "too much burden". The
  narrator is voice only.
- **Seams:** switch worlds only at chapter boundaries, on the bridge line. Carry one object through each portal. Give the
  portal a device that grows out of the story (the reference film's tear became a V once "the V neuron" was revealed).
- **Progress map:** at part breaks show an itinerary of stops, named after the source's concepts ("the knot", "better
  tools"), never after the art style ("noir"). Pin recap notes to the bridge words.

## Every shot

- **Show, then say:** the beat lands on or just before the spoken word (`wt`). Nothing that needs explaining appears
  before its explanation (the savanna "grazer" did, and confused the user).
- **What's said must be visible.** Each claim/number/callback in the narration gets a picture or a short caption. Static
  stretches longer than ~6 s while the narration moves on are bugs (motionaudit finds them).
- **What's shown must be said.** No captions, labels, years or IDs that the narration doesn't mention; no stale text from
  an earlier script; no Latin or pseudo-academic labels; no jargon plates (show "Unfolding Machine", not "SAE").
- **Text is rare and large:** key terms and numbers, ≥ 44 px at 1080p, never paragraphs; plate or stroke behind it;
  never over a face or the thing being introduced; never cut by the frame edge; check contrast against busy art.
- **Motion everywhere:** gentle camera moves, pops with overshoot (`backOut`), secondary motion (sway, blink, bob,
  particles), a small gag every 20–30 s. Characters stand on a ground line with shadows; nothing floats.
- **Composition:** clear silhouettes, fore/mid/background depth, nothing important at the edge, the background extends
  past every camera framing (no pale strips when zoomed out).
- **The source's images** live inside the world (windows, polaroids, leaves, TV screens, postcards), small and framed.
  Remake the author's diagrams in the film's style, simplified for video; never paste a whole figure flat. Make sure a
  photo shows what the narration says it shows (the user noticed a pickup truck captioned as a non-car).
- **Things should look like what they are:** the user called out a tiger that "doesn't look like a tiger". Draw
  recognisable animals/objects (reference anatomy, silhouettes) and check them at full size.

## Props and characters (the craft pass)

The user called out props that "never stick to Clawd or move properly", a weak projector, and poorly drawn police tape.
- Draw accessories **inside the character's body transform** so they squash, lean, walk and turn with it; give hats a
  slight counter-rock on walk. Far-arm props are drawn after the body (deferred) so layering is right.
- Emotes/speech marks must clear hats (offset by the hat's height and brim width).
- Verify with `tools/clawd_posesheet.mjs` (every pose × every hat), then `tools/clawd_probe.mjs` over the whole film and
  `tools/clawd_crops.mjs` on the hardest moments (tiny scale, extreme squash, walking, emoting, near edges).
- Props that tell the story (a projector, tape, a machine) deserve real construction: perspective, materials, light
  falloff, cast shadows, a believable mechanism (tape strung between stakes and unspooling, a projector beam with dust
  and a lit screen). Render them full-size and critique them like an illustrator would.
