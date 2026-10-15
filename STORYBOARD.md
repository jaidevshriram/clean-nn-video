# Storyboard — "Neural Networks Are Already Clean"

An explainer, ~60 minutes, narrated in the author's first person (adapted from Nick Cammarata's essay, Goodfire 2026),
painted in the ClaudeAnimationBase style: flat washes, layered watercolour, boiling ink, paper grain, Clawd.

## The idea in one line
Clawd is an interpretability researcher with a microscope. Over the film, it learns that the "knot" it was afraid of was
a city it didn't know how to read. The opening and the ending are the same image, the city beside the knot, read two ways.

## Visual system
- **World:** one painted world with four sets, revisited:
  - **The study** (warm cream walls, a corkboard, a desk lamp): where blog figures are pinned and taught. Most "figure" shots.
  - **The lab bench** (a painted microscope whose eyepiece is an iris onto images): tools and errors (ch02–03, 06).
  - **The network country** (hills at dusk, neurons as painted lanterns on posts, ink roads as circuits): circuits,
    gates, growth, ecology (ch04, 07, 09, 12).
  - **The city/knot sky** (paper sky, the blog's hero illustration floating like islands): ch00, ch10, ending.
- **Clawd** is the stand-in for the researcher: points at the board, peers through the microscope, gets things wrong and
  then sees them. Emotions follow the narration (surprised at reveals, thinking during puzzles, proud at results,
  sheepish at past mistakes). Medium shots u≈18–26; close-ups for reactions.
- **Blog images** appear three ways: (1) whole figures printed on cards pinned to the board, the camera travelling over
  them with painted rings and arrows on the exact region being discussed; (2) individual photos/feature visualisations
  (from the blog's raw assets) as painted prints that Clawd handles, sorts and connects; (3) the hero city/knot art.
- **Text:** an explainer needs some, so: chapter cards, key terms and key numbers in painted marker lettering, the blog
  figures' own labels. No captions burned in (subtitles ship as a separate track).
- **Colour arc:** the knot's dusty violets and greys at the start (confusion) → the study's warm cream and clay
  (investigation) → country greens and golds (growth/ecology) → dawn rose and gold over the city at the end.
- **Motifs:** the V (pointed) vs the O (round) — painted marks that recur whenever a neuron's two sides are discussed;
  the microscope lens that comes into focus; the knot that unties into the city; the crossword filling in.
- **Transitions:** brush wipe between chapters (in the chapter's colour); within chapters: iris into the microscope, camera
  pushes from the board into a figure, match cuts (a V shape → flames), whip pans across the network country.

## Chapter plan (cue groups → shots)

### ch00 Cold open — city/knot sky
- A `open_city`: fade from paper. The hero illustration's city rises on the left like an island; camera drifts over it.
- B `open_knot`: pan right, the knot on the right; tighten on the tangled houses.
- C `open_question`: pull back, both islands; small Clawd on a hill in the foreground looking up, the knot looming.
- D `open_title`: title lettering paints on: "Neural Networks Are Already Clean"; credit line "adapted from the essay by
  Nick Cammarata · Goodfire". Brush wipe out.

### ch01 The short version — study + network country
- Chapter card. Clawd at the board, happy (`sv_good_news`), board shows the essay's thesis words painting in.
- Two ways (`sv_two_ways`/`sv_second_way`): split board: left, Clawd peering at a lantern-neuron on a hill; right, a
  machine that "unfolds" the network into a pile of new pieces (SAE).
- Polysemantic (`sv_polysemantic`…`sv_last_layer`): cat photo + car front photo pinned under one neuron lantern with a "?";
  InceptionV1 last-layer figure card (fig005), Clawd confused.
- Superposition (`sv_superposition`…`sv_sae`): animation of shapes folding into a knot: related things grouped vs
  unrelated things packed (painted shapes); then a second "unfolding" model.
- Results (`sv_result1`…`sv_300x`): ConvNeXt ladybug card (fig006) — "99–100%"; three model sizes as three trees of
  car neurons (one coarse branch → many specific branches).
- Canon wrong (`sv_canon_wrong`): V vs O motif flashes; car→dogs card (fig002) stamped "not hiding".
- LMs (`sv_lm_then`…`sv_lm_scale`): painted bar chart grows: 0/14 → 1.7% → ~90% one job, ~7% two related, 2–4% unknown.
- Recursive generalization teaser (`sv_rg`…`sv_iy`): a branch growing: "iy" → "diy" → "do it yourself" (fig008 card).
- Two explanations (`sv_two_expl`, `sv_fractal`): scales: GENERALIZATION (similar together) vs SUPERPOSITION (unrelated
  together); a fractal tree zooming in.
- Why the gap (`sv_why_gap`, `sv_small_models`): four painted causes pinned up as cards.
- Crossword (`sv_crossword`…`sv_commas2`): a crossword grid filling in; the bargain neuron as a row of commas lighting
  up; checks (steer, upstream, downstream, negative side) tick in.
- Tools too, enormity, four steps, bitter lesson: list builds on the board; Clawd proud.

### ch02 Cars and animals — study, then lab bench
- Neuron 4e:55: a grid of cat faces and car fronts (photos), Clawd puzzled, "cats + cars?".
- `ca_opened`/`ca_v`: Clawd stares; ink V lines draw over every photo — cat's face, car's grille. Big painted "V".
- `ca_connections`: flames, fireboat jets, fox faces fan in; `ca_negative`: round things (tennis ball, clock, snail)
  on the negative side with an O. Then the blog's V figure (fig001) on a card, camera tours inputs/readers/pointed/round.
- `ca_whiskers`: feature visualisation (fv-pointed) with whiskers circled.
- Superposition circuit (`ca_circuit`, `ca_found`): fig002 left half — car → four dog visualisations → car; Clawd and a
  silhouette mentor at the board in 2019 (flashback tint).
- `ca_pose`: pose-everywhere card (fig003): dogs and vehicles facing the same way; arrows showing pose.
- Reward hacking (`ca_rewardhack`…`ca_guided`): a ball rolling down a painted loss landscape falls into a "dog basin";
  nudge it and it rolls to "car"; fig002 right half.
- `ca_bigger`: DINOv2 row of fig003. `ca_nouns`/`ca_verb`: neuron lantern acting as a switch: V → right road, O → left
  road. `ca_trick`: bullet train + pool table photos. `ca_clues`: card "a few grouped meanings = a clue".

### ch03 Microscope errors — lab bench
- Clawd at a big painted microscope; the eyepiece iris shows microscope-timeline images going from blurry (2009 FV) to
  crisp (2017, 2026), synced to `mi_fv`, `mi_robust`, `mi_late`.
- `mi_model_too`: InceptionV1 last layer card (fig005) under the lens — murky. `mi_convnext`: swap to ladybug grid
  (fig006) — "beautiful". `mi_numbers`: dial needle 5% → 50% → 70% → 99%.

### ch04 Recursive generalization — network country
- A lantern-neuron on a hill; the rapeseed field photos around it; over "training" the lantern's roots/branches grow to
  tennis balls, fruit, dogs, broccoli (neuron-overflow photos). fig007 card for the comparison with ConvNeXt.
- `rg_iy`: the "iy" tree (fig008). `rg_examples`/`rg_geology`: geology→Cesium; fig009 card.
- `rg_credit`: an old paper "Multimodal Neurons" on the desk, Clawd blushing.

### ch05 Two learning principles — study
- Two scales/columns: GENERALIZATION vs SUPERPOSITION; neighbors vs far apart on a painted map.
- Floppy ears: a row of painted floppy ears vs floppy ear + scroll of Latin poetry (pun visual).
- `lp_panels`: re-painted version of fig010 animating: 32 shapes sorting into neuron boxes, by similarity vs arbitrary.
- `lp_itself`: the word SUPERPOSITION splitting into overlapping ghost copies (it's "in superposition").

### ch06 Superposition of the gaps — lab bench / study
- Five causes pinned as cards, each with an icon (microscope, quill, broken brick, branch, knot).
- Believer: Clawd with a "superposition" pennant. Agents (little Clawds) testing neurons.
- pr neuron (fig011): base64 string decodes into "pr…"; Bengali → "pr". Colorado (fig012): commas brightening, a
  mountain and hiking boot appear. Context (fig013).
- "It kept moving": a little knot-gremlin hops from strong activations to weak ones to other neurons, Clawd chasing it.
- Null vs last hypothesis: a list with superposition sliding from top to bottom.

### ch07 Image models — network country + study
- Blur analogy: two spectacles/glasses. Three model sizes as three islands (92k, 7.06M, 28.6M).
- Gate: painted road junction: cars and dogs arrive together; a gate lantern sends cars right, dogs left (fig014 card).
- Sports car (fig015) tour. Votes: ballot slips into a box, + and −. Pairs (fig016). Small model (fig017).
- Crush 3b: a big layer of 480 lanterns crushed to 10 by a press; fig018 card; SAE fig019; last-layer crush fig020.
- Monastery circuits fig021. Dictionaries: spiders (SAE card fig022), 88% bar. Rare things fig023. Umbrella→bee
  (fig024, fig025): umbrella photo, maypole, bee, off-ramp road.

### ch08 Weak activations — study
- Crowd strip fig026; a dial vs a detector; close calls fig027; Trump-radiating rings; five circles fig028.
- Percentiles as pages of a book flipping. Titanic-ish ship. Zen koan ensō circle.

### ch09 Language models — study + network country (night)
- Preeclampsia graph fig029; hub of four lanterns; remove → "itching". Santa on the negative side (Santa hat in shadow).
- Wallet fig030; Miyazaki fig031; neuron papers stack; offshoots; SwiGLU (fig032, fig044) as two dials multiplying,
  − × − = +. Experts fig033: an RPG-boss expert; router as a small switchboard.
- Blind maximum fig034: two Clawds, one whispering an explanation; target/bullseye. Mercury orbit wobble.
- GPT-2 numbers; don't-say-dot fig035; slouching (Clawd slouching towards a sign). Residual stream fig036/046; attention
  fig037/038/039.

### ch10 Zooming out — city sky
- Fractal of explanations (fig040); enumerative (a long ledger) vs exploratory (a map with a magnifier).
- The button; future researcher (Clawd with a time-travel scarf); advice list; 42.
- City vs knot again; the small town vs New York; ears (fig041); tethered map (fig042); Tokyo/Brooklyn.
- Goalposts sliding; deception in plain sight; fog-of-war map filling in; faith; asymmetric mistakes (two roads).
- Frontier, agents (many Clawds), textbooks.

### ch11 What a solution might look like — dawn
- Laboratory of automated scientists (fig043); plug: two painted plugs meeting; alignment; the history.

### ch12 Further down the rabbit hole — network country
- The race: two circuits racing for the Labrador photo (fig058, fig059); ten photos (fig060); circuit ecology; packing by
  hand; petri dishes; toy model; playground diagonals (fig083); semantic gravity; explanations that could lose (fig055);
  adversarial jaguar (fig051); dreary (fig052); edge motifs (fig056).

### ch13 On the title — city at dawn
- Intelligent design vs natural selection; the rainforest and the tiger (painted); brain; why I care (Clawd looking at
  its reflection); final line over the city at dawn; the knot gently unties into the city. Credits. Fade.
