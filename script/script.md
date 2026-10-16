# Neural Networks Are Already Clean — v2 script & storyboard

A narrated guide to "Neural Networks Are Already Clean" by Nick Cammarata (Goodfire, 2026).
`## id | title` starts a chapter. `[cue]` is a narration beat. `{display|spoken}` fixes pronunciation.
`(pause s)` sets the silence after a cue. Lines starting with `>` are the storyboard for the cue above them.

## ch00 | Cold open

[open_phone] Every time you ask an AI a question, something happens inside it that nobody fully understands.
> Night. A phone glows in a dark room; a question types itself. Camera pushes into the screen; the glass becomes a
> starfield of tiny lights. Keep pushing: the lights are windows. We are falling toward a city at night.
[open_city] Inside, it's a bit like a galaxy: billions of tiny lights, flickering on and off, passing signals to each other along threads of light. Each light is a neuron.
> We swoop low over districts. Light pulses race along roads. One building flares as a pulse arrives: its windows
> light up. Pull back to show the whole city spreading to the horizon.
[open_knot] For years, many of the people who study these networks believed they were knotted. Not arranged into meaningful patterns, like constellations, but tangled. Ideas with nothing in common, crammed into the same lights, simply because they fit.
> The ground lurches. Streets twist up off the ground and wind into the Knot: one street of houses tied round and
> round itself. The Professor and Clawd stand small in front of it. Clawd hides behind his leg.
[open_untangle] And if that were true, there'd be only one way to understand an AI: tear the knot apart first, and study the pieces.
> The Unfolding Machine rolls in and starts pulling the knot apart, laying houses out in a long, endless row.
[open_wrong] The researcher Nick Cammarata spent most of a decade on this question. In a recent essay, Nick argues that the field got it wrong. It was never a knot. We just didn't know how to read the constellations. (pause .8)
> The Professor turns to us. Behind him the machine sputters to a stop; the knot, half-pulled, sags a little.
> He lifts his lantern; in its light the tangled houses briefly look like a tidy street.
[open_title] This video walks through that essay, and the story of how the field found out. (pause 1)
[open_map] It comes in four parts. First, the story everyone believed. Then we reopen the evidence, case by case. Then, how networks really work. And finally, what it all means. (pause 1.4)
> Title paints across the sky over the city: NEURAL NETWORKS ARE ALREADY CLEAN. Credit line beneath. Brush wipe.

## ch01 | What a neuron is

[nr_what] Let's zoom all the way in to just one of them, and picture it as a little building in a town. So, what is a neuron in an AI? It's simpler than it sounds. A neuron is a tiny detector. It looks at what's coming in, and if it sees something it cares about, it lights up.
> Street level, dusk. One small building. A stream of photos rolls past its door on a conveyor (dogs, cups, cars).
> When a dog photo passes, the windows blaze and a dog appears in each window. A cup passes: dark.
[nr_windows] So you can find out what a neuron cares about by showing it a lot of pictures, and keeping the ones that make it light up brightest. Those pictures end up in its windows.
> Clawd runs a projector, flipping thousands of photos at the building; the brightest ones fly up and pin themselves
> into the windows. (Real dataset photos from the essay: the ladybug neuron's top images.)
[nr_layers] An image network is built in layers, like districts. Near the coast, where the pixels come in, neurons detect simple things: edges, curves, colors. Further inland, textures and eyes and wheels. And on the horizon, whole ideas: dogs, cars, ladybugs.
> Big flyover from left to right: pixel-rain falls on the coast; tiny huts with curve and stripe windows; then
> mid-size buildings with fur, eyes, wheels; then the tall towers with whole dogs and cars. Signs on the districts.
[nr_circuits] Neurons pass signals along to each other, and a chain of neurons working together is called a circuit. If you can read the neurons and the circuits, you can start to understand what the network is actually doing.
> A pulse leaves a curve hut, lights an eye building, then a dog-face building, then the "dog" tower: the route
> glows across the map as one bright line.
[nr_hope] That was the hope of a field called mechanistic interpretability. Look inside. Read the parts. Understand the machine. (pause .8)
> The Professor at a drafting table above the city, pinning a big map; Clawd hands him a magnifier.

## ch02 | The knot

[kn_problem] But there was a problem. Some neurons didn't seem to make any sense.
> A building flickers wrongly. Its windows show a cat face, then a car's front, then a cat, then a car.
[kn_catcar] The most famous one was in an image model called {InceptionV1|Inception V one}. It lit up for cat faces. And for the fronts of cars. Cats and cars. What do those have in common?
> Close on the windows: a lynx, a yellow van, a cat, a red truck. Clawd's question mark pops. The Professor tilts his
> head. Sign over the door: "4e:55".
[kn_poly] Researchers called these neurons polysemantic: one neuron, many unrelated meanings. And there was worse. In the last district of that same network, almost nothing made sense at all.
> The camera rises and drifts to the horizon district: fog, buildings with clashing, blurry windows, broken signs.
[kn_roommates] The leading explanation was called superposition. Here's the idea. Imagine a city with far more people than houses. You could give similar people a house together, a family. Or you could do something stranger: put total strangers in the same house, as long as they're never home at the same time.
> A neighborhood of eight houses and a crowd of 30 little people with suitcases. First: families file into houses
> (all the bakers together, all the fishermen together). Rewind; second: a night-shift nurse and a day-shift
> postman share a bed in shifts; a sailor who's always at sea shares with a pianist. Clocks spin above the door.
[kn_why] Strangers rarely bump into each other, so it mostly works. And if a network were short on neurons, superposition said, that's exactly what it would do: pack unrelated things together, because they rarely collide.
> Clocks spin faster; tenants swap in and out of doors like a farce. A rare collision: two strangers bump in the
> doorway. Clawd winces.
[kn_bad] That would be terrible news. Because if neurons are packed with strangers, then what shares a neuron tells you nothing. The city would be a knot.
> Pull back: the whole neighborhood twists up into the Knot. Its houses' windows show random, clashing photos.
[kn_machine] So the field built a new kind of tool to unfold it: a second model, called a sparse autoencoder, trained to take the network apart and rebuild it as a long list of cleaner pieces, which you'd study instead of the original. Think of it as an Unfolding Machine.
> The Unfolding Machine arrives on tank treads, sucks in the knot, and spits out a conveyor belt of single rooms
> labelled with tags. The belt runs off the edge of the screen and keeps going.
[kn_both] And Nick was in the thick of it, helping make the case for superposition as one of the people who first proposed it. And believed it for years. (pause .8)
> Flashback tint (sepia): a younger Professor, no beard, pinning up "superposition" on a corkboard proudly.

## ch03 | The case of the cat and the car

[cc_act] Part two: the evidence. The knot story rested on a few famous cases. So let's reopen them, one at a time. (pause .8)

[cc_return] After many months studying neurons in modern image and language models, and finding them surprisingly clean, Nick went back to the original crime scenes. Starting with the cat and car neuron.
> Night, rain. The Professor walks up the street to the 4e:55 building holding his lantern; Clawd follows with an
> umbrella. Neon reflections on the wet street.
[cc_grid] Nick had looked at its pictures hundreds of times. This time, Nick tried something new: spending a few seconds asking, what one thing could this be?
> He stops in front of the windows. Camera pushes in on the grid of cats and cars. Time slows; rain stops in midair.
[cc_v] And then it was obvious. It isn't a cat and car neuron. It's a V neuron.
> Painted V strokes draw themselves over every window: the cat's ears and chin, the grille of the car, the van's
> windscreen. Then the camera pulls back: the building's roof is a big V. Clawd's jaw drops.
[cc_inputs] Pointed things make it light up. Look at the roads leading into it: they come from a flame, the jets of water from a fireboat, and fox faces. All V-shaped.
> Aerial: three roads into the V building. Follow each road back: a building whose windows show a candle flame, one
> with a fireboat's spray, one with a fox. Pulses run in along all three.
[cc_round] And its basement, the things that switch it off, holds the opposite shape. Round things. A tennis ball. A clock. A snail shell.
> Cut inside: the basement glows blue; its little windows show a tennis ball, a clock face, a snail. A round ball rolls
> down the street toward the door and bounces off.
[cc_new] Bullet train noses. The triangle of balls on a pool table. It fires for those too. It was never about cats or cars. It's a shape.
> Montage through the windows: a shinkansen nose, a pool table rack, a sports car. Each gets a quick V stroke.
[cc_noun] Here's a useful trick. People, and AI assistants, love describing neurons as lists of nouns: cats, cars. But a neuron is often better described as a verb. It's not naming what it sees. It's making a distinction: pointed, not round. And passing that on.
> The Professor at a chalkboard on the street: he writes CATS + CARS, crosses it out, writes "POINTED vs ROUND". Then a
> junction: the V building acting as a signal; pointed things take one road, round things the other.
[cc_whiskers] Why didn't anyone see it before? The neuron's portrait, painted by a technique called feature visualization, had cat whiskers in it. But that's because the painter follows the easiest route to make the neuron light up, and once it finds the cat route, it paints everything that route brings, whiskers included.
> The Sketch Artist (an easel robot) paints the V neuron's portrait: it starts with a V, then wanders down the "cat"
> road and adds whiskers, ears, fur. The Professor peers at the canvas, unimpressed. (Use the essay's feature viz.)
[cc_lesson] So the first lesson: a neuron that seems to mean two or three things is often one thing we haven't found the word for yet. The grouping isn't noise. It's a clue. (pause 1.4)
> The Professor tucks a cat photo and a car photo into a folder labelled "CASE 1: SOLVED" and stamps it. Clawd stamps
> his own forehead by mistake.

## ch04 | The case of the hidden car

[hc_scene] The second crime scene was the original superposition circuit itself. Nick found it in 2019, and it became the field's main example.
> A lit route across the map: from a car tower, a road splits into four dog buildings, and then rejoins at a car
> tower again. Yellow police tape around it. Sepia flashback: the younger Professor at a 2019 computer, gasping.
[hc_story] It looked like a car signal was being hidden inside a group of dog neurons, as if the dogs were a secret storage locker, where the car could be stored and picked up later.
> The car signal (a little glowing car) drives into the dog district and hides in a doghouse locker; later a hand
> retrieves it. The four dog buildings show the essay's feature visualizations: fluffy dogs.
[hc_artist] But look at how researchers saw those neurons. They saw them through the Sketch Artist: a tool that paints the picture a neuron would like best. And deep in the network, the artist gets lazy. There are lots of dog neurons, so the easiest painting is usually a dog.
> The Sketch Artist at each of the four buildings painting dogs. A hill with a deep valley labelled "dog" pulls its
> brush downhill; the brush slides into the valley again and again.
[hc_nudge] Nudge the artist even slightly toward the routes that real pictures take, and the portraits change. Two of those "dog" neurons are actually car neurons.
> Clawd gives the easel a nudge with a stick; the brush rolls over the ridge into the "car" valley. The portraits
> repaint: two become cars (the essay's guided visualizations).
[hc_pose] And the other two respond to cars and dogs alike, for one shared reason: which way they're facing. They're pose neurons.
> The two remaining buildings' windows: a dog facing left, a car facing left; a dog facing right, a car facing
> right. Arrows painted on the street show the facing direction. Clawd turns his head to match.
[hc_hundred] It turns out the network has more than a hundred of these pose neurons, each one clean. And nothing was hiding. The car signal wasn't stored in the dogs. It kept going, splitting into more and more specific car neurons.
> Pull up: a whole district of pose buildings, each window pair sharing a direction. The car route continues past
> them and branches into many small buildings: taxis, vans, convertibles.
[hc_bigger] You might think: that's only because the model was small. A bigger model would separate dogs and cars. But {DINOv2|Dino vee two}, more than ten times larger and about ten years newer, still has generalized pose neurons. Every vision model Nick has looked at does. (pause 1.4)
> A much bigger, shinier city on another hill; telescope view into one of its buildings: dogs and cars facing the
> same way (the essay's pose photos). The Professor stamps CASE 2: SOLVED.

## ch05 | Better tools, clearer neurons

[fd_microscope] The story of this field, as Nick tells it, is mostly a story of discovering that what was under the microscope was better than anyone thought. The microscope just wasn't tuned right.
> Clawd wheels in the Microscope (a big brass lens on a cart). Through it, the city is a smeared blur.
[fd_fv] The first portraits of neurons were noisy, psychedelic smears. Then researchers added one ingredient, called transformation robustness, and the same neurons came out crisp. Later, a few small tweaks let researchers see much deeper.
> Through the lens: the essay's 2009-style noise, then Clawd turns the focus knob and it snaps to the 2017 image,
> then a second turn to 2026. Each step: a satisfying lens click and a burst of light.
[fd_last] But the worst place was the last district of {InceptionV1|Inception V one}. Here, almost nothing looked interpretable. One researcher said there were essentially no interpretable neurons there at all. Nick would have guessed maybe five percent.
> The foggy district. Buildings sag, signs hang crooked, windows show tangled, clashing images. A billboard: "5%".
[fd_story] And the explanation everyone reached for was the knot again: too many ideas, too few neurons, so they got crammed in at random.
> The fog curls into the shape of the Knot hovering over the district.
[fd_renovate] But here's the thing. Take a more modern network design, called a {ConvNeXt|Conv Next}, with the same number of parameters and trained on the same pictures. The only real differences are engineering upgrades, like residual connections and layer normalization. And the last district is beautiful.
> Renovation montage: construction Clawds raise an elevated highway (residual connection) that bypasses traffic,
> install even streetlights (layer norm). The fog lifts in a wave. Each building's windows sharpen into clean sets:
> ladybugs, terriers, platypuses (the essay's ConvNeXt last-layer photos).
[fd_numbers] Same size, same data. Ninety-nine to a hundred percent of its last-layer neurons are easy to interpret.
> The billboard flips: 5% → 50% (better tools) → 70% (retrained) → 99%. With each flip, more of the district lights.
[fd_lesson] The old network wasn't packing strangers together. It was a district built badly, seen through a dirty lens. Upgrades made by people who had no interest in interpretability at all made it readable. (pause 1.4)
> The Professor and Clawd stand on a rooftop in the now-clear district, looking out. Clawd polishes the lens.

## ch06 | Watching a neuron grow

[gr_q] But even that messy last district of the old network wasn't random. To see that, you have to watch a neuron grow.
> A seed in an empty lot. Time-lapse sky starts racing.
[gr_flowers] Nick retrained the old network and watched one neuron form. It started out on fields of yellow flowers, in photos that sometimes had a dog in them.
> A small house sprouts; its windows show yellow rapeseed fields; one window has a dog in the field.
[gr_branch] Then it grew along each part of those photos. Toward other green, round things, like tennis balls and fruit. Toward dogs, without any flowers. Then into broccoli, until the flowers were nearly gone.
> The house grows annexes like a tree grows branches, each annex's windows a new family: tennis balls, apples,
> dogs, broccoli. The original flower room shrinks. (The essay's real photos at each training epoch.)
[gr_compare] In the modern network, the same neuron reached for the balls and the fruit early on, then let them go, and stayed on the fields.
> Split screen: the modern city's version grows a tennis-ball annex, then the annex politely folds itself away.
[gr_name] Nick calls this recursive generalization. A neuron generalizes along one direction, then sprouts off in others, each new branch close to the last. Every branch makes sense on its own. You just have to follow it.
> Pull back: the overgrown house as a tree of rooms; a painted path traces from root to every branch.
[gr_iy] It happens in language too. One neuron fired on the letters "{iy|eye wye}", in words like Miyazaki. Then on "{diy|D I Y}". Then on "do it yourself", which doesn't contain "{iy|eye wye}" at all.
> The language city: a little book-shaped building grows letter-annexes: "iy" → "diy" → "do it yourself", each
> written on a hanging sign; the last annex has no "iy" — Clawd checks it with a magnifier, shrugs.
[gr_geology] A geology neuron grew a branch for Cesium, a coding library for maps of the earth. An enemy neuron fired for a Russian poem about enemies. Weird, but never random. (pause 1.2)
> Quick vignettes: a rock-and-crater building with one annex full of code screens; an "enemy" building with one annex
> of a Cyrillic book.

## ch07 | Two explanations

[te_two] So now there were two explanations for neurons with mixed meanings, and they predict opposite things.
> The Professor at a fork in a road, two signs: GENERALIZATION / SUPERPOSITION.
[te_local] Generalization says neighbors share. A neuron for floppy-eared dogs is really a collection of slightly different floppy ears. Superposition says strangers share: a neuron for floppy-eared dogs and Latin poetry.
> Left: a house where every window is a floppy-eared dog. Right: a house with dogs in some windows and a scroll of
> Latin poetry in others; a puzzled dog reads the poem.
[te_shapes] Here's what that looks like with thirty-two things and a handful of neurons. Generalization groups similar things, and with fewer neurons the groups just get coarser. Superposition scatters them.
> The 32 colored shapes again, flying into houses: left side, colors and shapes group neatly; right side, a random
> jumble. Houses then merge (fewer neurons): the left groups simply get bigger; the right gets worse.
[te_test] And this is testable. You can watch a neuron grow and see which one happens. Or you can squeeze the network and see what it does under pressure.
> Clawd pulls a lever on the Squeezer: a giant press above an early district.
[te_squeeze] So Nick took a layer famous for its curve detectors, and crushed it from four hundred and eighty neurons down to ten, with no way around. If superposition were real, this should be dramatic: curves, spirals and spider webs, crammed together.
> The press comes down; 480 tiny curve-huts squash into 10 big ones. Clawd covers his eyes.
[te_result] Instead, the neurons stayed clean. Just coarser. One "curves and loops" neuron instead of ten curve detectors. Two circle neurons instead of many. And when the Unfolding Machine was sent in to look for hidden curves, it found none.
> The press lifts: ten tidy buildings, windows showing broad curve families (the essay's crushed-layer crops). The
> Unfolding Machine sniffs around and comes back with an empty basket.
[te_last] Nick did the same to the last district of a modern network: a thousand and twenty-four neurons down to thirteen. Same thing. Coarser, never scrambled. Under pressure, a network doesn't switch to packing. It just paints with a broader brush. (pause 1.4)
> The horizon district squeezed into 13 grand buildings: "vehicles", "animals in water", "food"... Each clean.

[te_sizes] Size works the same way. Nick trained versions of a network three hundred times apart in size. The smallest has one broad car neuron. The biggest has dozens: taxis, vans, convertibles, even different views of a taxi. Less room makes neurons broader, not scrambled.
> Three islands side by side: a small one with one car house, a medium with a car street, a big one with a whole car
> district. Pulses flow the same way in all three.
[te_dict] And when Nick ran the Unfolding Machine, the tool built to pull the knot apart, on these districts, its pieces mostly turned out to be near-copies of single neurons, about eighty-eight percent of its activity. Where the neurons were building blocks like spider legs and webs, the machine's pieces were those same blocks regrouped by setting: spiders on leaves, spiders in webs. When a model finally understood baseball players, the understanding was in a neuron. (pause 1.4)
> The machine's conveyor belt: Clawd holds each piece up next to a building; almost all match a building exactly
> (88% bar painted on the belt). A spider-leg building and a web building; the machine's pieces are spider photos.
## ch08 | The superposition of the gaps

[sg_believer] For years, Nick was a true believer in superposition, studying language model neurons and expecting to hit the knot any day.
> The young Professor marching into the language city with a pennant reading SUPERPOSITION and a butterfly net.
[sg_pr] Nick found one that fired on the letters "P R", and on strange strings of {Base64|base sixty-four} code, and on Bengali text. Finally, an arbitrary mixture! Then Nick decoded the code: words with "P R". And the Bengali, translated: "P R". It was one idea all along, the letters P R, in whatever form they showed up.
> A building with three clashing window types: "pr", gibberish code, Bengali script. Clawd runs a decoder ring over
> the code: it turns into "prize", "proof". A translation lens over the Bengali: "pr".
[sg_colorado] A colleague found a neuron that seemed to fire on random commas. It turned out to track Colorado. Models use spots like commas to jot down a running summary of what's been said so far, and Colorado was in that summary. Turn the neuron up, and the model starts planning a hike. (pause .6)
> Sentences scroll past; commas light up amber only once Colorado is mentioned. A dial labelled with a mountain: when
> Clawd cranks it, the text bubble fills with trail maps, hiking boots, a mountain sunrise.
[sg_moving] Case after case, the mess resolved. And each time, superposition just moved, like the old "god of the gaps": whatever couldn't be explained yet got credited to it. If the strong signals were clean, it was hiding in the weak ones. Or between neurons. Or in the neurons nobody had checked yet.
> The Knot, now small like a gremlin, hops from building to building ahead of the Professor, always one roof away.
[sg_last] The field had been treating superposition as the default, when it should be the last resort. It's the most radical explanation, and the hardest to test. Its only symptom is that something doesn't make sense. But that's also exactly what a bad tool, a bad design, or a branch you haven't followed yet looks like.
> The Professor stops chasing, flips a hand-painted list: SUPERPOSITION slides from the top to the bottom. Above it:
> BAD TOOLS · BAD DESIGN · UNFOLLOWED BRANCH · UNKNOWN PATTERN, each with a tiny icon.
[sg_evidence] An Anthropic paper said it plainly in 2022: superposition is often treated as the default because it feels intuitive, but there's little evidence. To Nick's knowledge, no one has found a real superposition circuit since the one Nick found in 2019: the hidden car circuit, where a car signal seemed to hide among dog neurons. And that one was a mistake. (pause 1.4)
> The gremlin knot, cornered, unravels into a single harmless loop of string that Clawd pockets.

## ch09 | Gates, votes and whispers

[tv_act] Part three. Every case ended the same way: the mess was a clue we couldn't read yet. So how do networks actually work? (pause .8)

[tv_gate] Once you stop expecting knots, neurons start to look less like labels and more like traffic control.
> Aerial over a big junction at night: lit traffic of little cars and little dogs.
[tv_gate2] Early on, cars and dogs travel together, because they share shapes and poses. Then a neuron acts as a gate. It lights up for cars and switches off for dogs, sending each into its own neighborhood. Later neurons split them finer: taxis from ambulances.
> A traffic-warden building at the fork: cars waved right, dogs left. Further on, the car road forks again at a
> taxi building and an ambulance building (the essay's taxi/ambulance photos).
[tv_journey] Follow one sports car through the last districts of a big model. Partway in, it's grouped with other boxy things, tables and cabinets, and kept apart from snakes and dogs. By the end, the question is whether it's a convertible or a station wagon.
> A little sports car drives through five districts; at each, a building waves it on: "boxy things →", "not snakes",
> and finally a fork with CONVERTIBLE and STATION WAGON signs (essay photos in windows).
[tv_votes] Every neuron decides by vote. Each incoming road casts a vote for "light up" or "stay dark", and the votes add up. That's why a neuron's negative side, its basement, the things that switch it off, matters as much as its windows. It tells you which distinction is being made right here.
> Inside a building: ballots fly in from every road into a box; green "+" and blue "−". The result lights either
> the windows or the basement.
[tv_pairs] In the last district, a neuron's basement usually holds its near-twin, its closest look-alike: the thing it most needs to tell itself apart from. Taxis versus ambulances. Broccoli versus cauliflower. Spoonbills versus flamingos. (pause .6)
> Street of houses, windows vs basements: taxi/ambulance, broccoli/cauliflower, spoonbill/flamingo (essay photos).
[tv_weak] And what about the faint signals, the whispers? A hundred million words pass by a typical neuron, and almost all of them barely register. Only a hundred and sixty or so make it shout.
> A huge crowd passes a building; each person makes a tiny dim flicker; very rarely one makes the windows blaze.
[tv_cut] You can silence almost all the whispers across a whole network and barely change what it does. What you lose are tiny tie-breakers between options it was already torn between.
> Clawd mutes the whispers with a giant dial; the city keeps running. One close call (husky vs malamute) tips over.
[tv_pages] It also helps to think in pages. A neuron that fires on one word in a hundred sounds uncommon. But that's about four times a page: far too often for a neuron about a narrow idea, like a rare feeling. The truly specific neurons fire about once every few dozen pages.
> A book flips its pages; small lights blink on the words where a neuron fires; for a rare neuron, a single light
> every 25 pages.
[tv_titanic] And the whispers that remain usually make sense. A Titanic neuron fires a little for other ocean voyages. Neurons are analogy machines: something can be a bit Titanic-ish. (pause 1.4)
> A grand ship building with dim lights for a small ferry, a steamship, a cruise poster.

## ch10 | Language models

[cw_arrive] So far, most of our examples have come from image networks, because pictures are easy to show. But the AI most people actually use is a language model: the kind you chat with. Its neurons respond to words and ideas instead of pictures. Does the same story hold there? Let's visit a city made of words, and ask three questions. (pause 2.6)
> By boat to the language city: buildings made of stacked books and letters, by a sea of text.
[cw_numbers] Question one: how many neurons can we actually read? In 2023, studies of small language models rated almost none of their neurons as understandable. Nick's own project at OpenAI found under two percent. Today it's different. In a modern model, {Qwen3-32B|Kwen three, thirty-two B}, about ninety percent of neurons have one main job. Seven percent have two related jobs. Only two to four percent we don't understand yet.
> A town square: 100 little neuron-people. In 2023: almost all grey with question marks. Then they turn: 90 wear
> one color, 7 wear two related colors, 3 still grey.
[cw_couriers] Question two: can we follow a model's reasoning, one step at a time? Take a doctor's question about a patient. Inside the model, a courier service called attention carries notes between words, so a neuron in one place can know what was said in another. In this medical example, the couriers carry the headache, the swelling and the blood pressure to one place, where the diagnosis happens.
> Bicycle couriers carrying glowing notes ("headache", "swelling", "pregnant") across the city to the hub building.
[cw_medical] And we can follow what happens there in plain neurons. Given all the symptoms of a pregnant patient, a small group of four neurons concludes: preeclampsia. Switch them off, and the model starts asking about itching instead, the sign of a different condition, as if it moved on to its next guess.
> A hospital district: symptom houses (headache, high blood pressure, pregnancy) send light to a four-building
> hub labelled "preeclampsia". Clawd flips its breaker: the light reroutes to an "itching?" building.
[cw_wallet] It works in giant models too. In a model with trillions of parameters, researchers traced its answer to "I found a wallet, what should I do?" The facts, a wallet, cash, an ID, light up neurons for lost property and honesty, and the answer comes out: return it. (pause .8)
> A giant city at night; we fly one lit route: wallet → lost property & honesty → a tower "return".
[cw_double] Question three: what about the mess that's left? Some of it turned out to be plumbing. Modern neurons multiply two signals. When both are negative, the result comes out positive, so a neuron can light up for the opposite of its real job. Separate those two cases, and the noise sorts itself out.
> Two valves on a pipe into a building; both turned "−", yet the building lights up, wrongly. A plumber Clawd adds a
> second meter that shows "− × −"; the misfiring windows turn grey.
[cw_river] And there's a river that runs through every district, carrying information forward: the residual stream. Every building can read from it and write to it. Researchers worried it might be a tangle too. In practice it can be read, and when it was squeezed narrower, it got messier, but never knotted.
> The river of light through the language city; buildings dip buckets in and pour light out. A dam narrows it: the
> water gets choppier, still flowing the same way.
[cw_dot] Finally, even famous examples of confusion look different now. One early neuron, described as a mix of academic citations, dialogue, web requests and Korean text, looks like a neuron whose job is to stop the model from writing a period too early. Remove one like it, and periods come sooner. So language models tell the same story: most neurons are readable, their reasoning can be followed, and the leftover mess has ordinary causes. (pause 1.4)
> A building whose windows show a citation, a line of dialogue, a URL, Korean text; each has a glowing dot nearby with
> a "no" sign. Clawd pulls the plug: dots rain down onto the text.

## ch11 | Explanations that can lose

[el_risk] A fair worry: maybe these are all just made-up stories. Any neuron can get a vague label, like "a multi-purpose language neuron". So researchers use tests that an explanation can fail.
> A suspicious Clawd holds up a sign: "IT'S A MULTIPURPOSE NEURON"; the Professor stamps it REJECTED: TOO VAGUE.
[el_blind] One test: an AI agent studies a neuron and writes a short explanation. A second agent sees only that explanation, never the neuron, and writes a sentence to make it fire as hard as possible.
> Two Clawds in separate booths, passing a note under the wall. The second writes a sentence and launches it like a
> dart at a target-building.
[el_bull] Often that one sentence makes the neuron fire harder than anything found in ten billion words of real text. The explanation hit the center of the target.
> The dart hits dead center; the building blazes brighter than any window in the city; ten billion grey darts
> scattered around the outer rings.
[el_score] Agents also wrote examples that should fire a neuron, near-misses that shouldn't, and the most distant idea they could imagine. The examples fired the neuron strongly three quarters of the time. Near-misses, eleven percent. The distant ideas, about one percent. (pause 1.4)
> Three buckets filling with light: 76%, 11%, 1%.

[el_mercury] General scores only go so far, though. A wrong explanation, like the "cats and cars" label we once gave the V neuron, can pass a lot of tests. Science works like this everywhere: Newton's gravity explained almost everything, then broke on a tiny wobble in Mercury's orbit. The best tests are specific to the idea you're testing. (pause 1.4)
> An orrery in the Professor's study: Mercury's orbit slowly precesses; Clawd squints through a telescope.
## ch12 | How networks learn to be clean

[hl_q] So why are networks organized at all? Why not a knot?
> Back to the empty lot; dawn light.
[hl_race] Picture a brand new network shown one photo of a Labrador on grass. Two possible circuits race to explain it. One looks for something hyper-specific: this exact pixel is this exact color. The other looks for something broad: green grass, tan fur.
> A race track. Two racers: a tiny precise robot with a single pixel, and a big friendly one made of grass and fur.
[hl_win] The broad one fires on more of the picture, so it gets more of the learning signal. It grows faster, and the narrow one starves. And when the next photo with grass arrives, the grass circuit already has a head start. (pause .6)
> The broad racer pulls ahead, grows; the pixel racer shrinks and sits down. A second photo arrives; the grass racer
> is already halfway there.
[hl_ecology] It's like an ecosystem. A neighborhood that's already good at something captures the next related thing before anyone new can move in. That's why things cluster. It's recursive generalization at its edges, the same thing we saw when one neuron grew from fields of yellow flowers to dogs, tennis balls and broccoli: always reaching for the next related thing.
> The city grows over time-lapse: new houses always appear next to similar ones; a new car building sprouts next to
> the car district, not in the middle of the poetry district.
[hl_rare] What about rare things, which barely ever show up? You might expect them to be hidden away somewhere odd. Instead, rare things are often the most consolidated: one triceratops neuron. And the strangest pictures, a hummingbird the model thinks is ice cream, a man in a fallen wheelbarrow it thinks is a lawn mower, are just ordinary neurons making understandable mistakes. (pause .6)
> A single grand triceratops museum building. Then a gallery of the essay's odd photos in frames, each with a little
> sign of the network's guess; Clawd laughs.
[hl_adversarial] Even attacks designed to fool the network use its normal roads. Make a triceratops skull look like a jaguar to the model, and the attack literally paints a cat face and spotted fur onto the skull, switching on the real jaguar neurons.
> The essay's adversarial image: the skull's frill blooms into a cat face; jaguar buildings light up.
[hl_umbrella] Researchers tested it by teaching a network something absurd: that a photo of an umbrella is a bee. It didn't build a secret hidden "umbrella bee" detector. In just nine training steps, it built an off-ramp from its umbrella road onto its existing bee road.
> An umbrella building's road; construction Clawds build a ramp that joins the bee highway. Signs flip: umbrella →
> maypole → bee. (Essay's umbrella and bee photos.)
[hl_toy] The famous "Toy Models of Superposition" experiments are careful work, and they do show packing. But in that toy world, every idea is a stranger to every other. In real data, almost nothing is related to nothing. So the packing is real, but it belongs to the toy world, not to the networks we actually use. (pause 1.4)
> A petri dish city where every house is identical and unrelated; next to it the living city, full of connections.

## ch13 | What "clean" means

[zo_act] Part four. Networks build clean, readable parts, and they get there through one simple way of learning. So what does that mean for us? (pause .8)

[zo_clean] So here's what "already clean" means. Not that every neuron matches a word we already have. It means the network's parts are built to be read, by the network's own downstream neurons. If we learn to read them the same way, we can understand it.
> The Professor at a street corner reading a sign written in the city's own alphabet; slowly the glyphs become
> readable to him (and us).
[zo_bigger] And bigger isn't harder. In a small town, there's no financial district: a bank here, an office there. In New York, you can find it on a map in a minute. Bigger models have narrower, cleaner neurons that are easier to find.
> Split: a tiny village with a bank in one street and an office elsewhere; a huge city with a glittering financial
> district. Clawd finds it on a map immediately.
[zo_tokyo] The danger is forcing our own categories onto it. If you arrive in Tokyo looking for Brooklyn, and stitch Brooklyn together from seventy scattered pieces of Tokyo, you'll decide Tokyo is a mess. That's what happened to the V neuron: we went looking for cats and cars, so that's all we saw.
> Tokyo street, the Professor holding a Brooklyn postcard, Clawd gluing scraps into a Frankenstein Brooklyn. It
> collapses. Match-cut to the V roof.
[zo_maps] What we need are better maps: views that let you zoom out to whole neighborhoods, while every street stays connected to the real buildings underneath. Zoom in on a network's decision for "killer whale", and it turns out to be three routes: one for whales, one for sharks and rays, and one for fish held up by proud fishermen.
> A map unfolding like Google Maps: zoom from districts down to a single "killer whale" tower, three lit routes, with
> photos (whales, rays, a fisherman with a fish).
[zo_deception] People worry that something dangerous, like deception, could hide in some activation we missed. Nick worries about something else. In every case here, the answer was in plain sight. We just didn't know how to read it. Deception might hide from someone reading the model's answers. But it can't hide from the model's own circuits. If we become fluent readers of those circuits, it can't hide from us.
> A huge lit building in the middle of the city with a sign in the city alphabet; nobody notices it; the Professor
> slowly turns, sees it, and his lantern lifts.
[zo_asym] And the mistakes aren't symmetric. If you assume a network is clean and you're wrong, a messy neuron is a lead: you investigate. If you assume it's a knot and you're wrong, a messy neuron is a dead end: you stop looking. Nick made that second mistake for years. (pause 1.4)
> Two roads from one messy building: one leads into a lit city of discoveries, the other to a brick wall.

[zo_advice] If Nick could send a note back eight years, to a younger self, it would say: look at the giant pose circuit right in front of you, those hundred pose neurons that respond to cars and dogs alike. The negative side is a gate, not an opposite, like the gate that sends cars one way and dogs the other. Don't trust the Sketch Artist's portraits in the late layers. And whenever something looks like a mess, look harder. The mess usually points to something you haven't understood yet.
> The Professor writes a note, folds it into a paper plane, and throws it into a time-tunnel; it lands on the desk of
> his younger self, who reads it under a lamp.
[zo_crossword] Understanding compounds, like a crossword. At first you're stuck on one clue. But every answer you fill in constrains the others, and once the grid starts filling up, it goes faster and faster. (pause 1.4)
> The city's map seen as a crossword grid of districts; words fill in, slowly at first, then in a rush.
## ch14 | The lab of the future

[lf_lab] Here's what solving this might look like: a laboratory of automated scientists, watching a network as it learns, labeling neurons, finding patterns, testing them, again and again.
> Dawn. Hundreds of little Clawd scientists spread across the city with notebooks and lanterns; the map at the
> Professor's drafting table fills in, district by district.
[lf_plug] The pieces already exist. Capable AI agents were built for other reasons. Modern architectures were built because they learn well. Both happen to make interpretability easier. So maybe we just plug one into the other.
> Two cables, labelled AGENTS and ARCHITECTURES; Clawd plugs them together; the whole city's lights surge.
[lf_lab2] Every neuron can be read. Every experiment can be rerun on an identical copy. It's the best laboratory in all of natural science. What we never had were enough scientists. Now we do. (pause 1.4)
> Pull up, high above the city at sunrise: the knot is gone; the city is fully lit, readable from coast to towers.

[lf_bitter] That's been the pattern in AI all along. The simple thing, done at enormous scale, beats the clever thing. Rich Sutton called it the bitter lesson. Maybe interpretability has its own bitter lesson: scaling ordinary investigation beats inventing ever cleverer ways to take networks apart.
> A small clever contraption next to a huge field of thousands of Clawd scientists with lanterns; the field wins.
[lf_steps] So: one learning principle, generalization, explains what we see. There's no second principle called superposition. Studying them directly works much better than we expected. Understanding compounds as the map fills in. And maybe, just maybe, that's most of what we need. (pause 1.4)
> Four lanterns lit one by one on a hill, each with a painted word: ONE PRINCIPLE · IT WORKS · IT COMPOUNDS · MAYBE ENOUGH.
## ch15 | Why it matters

[wm_kind] This isn't "neural networks are a bit cleaner than we thought". It's a different kind of explanation. Think of the move from intelligent design to natural selection: the point wasn't that a few more animals turned out to have evolved. It was realizing what process produced all of them. Here, that process is generalization.
> A painted rainforest at dawn: creatures, vines, a tiger stepping through the leaves.
[wm_tiger] A tiger is orange for a reason: deer can't tell orange from green. Once you know that, a lot of the jungle makes sense. Neural networks are clean the way a rainforest is clean. Nearly everything in it makes sense.
> The tiger seen through deer-vision: orange shifts to green and it vanishes into the leaves.
[wm_brain] It also makes you humble about brains. Nick stared at the cat and car neuron, the V neuron, for years, with perfect tools, and couldn't see what it was. If it had been in a human brain, seen through a few electrodes, there'd have been no chance.
> A painted brain with three tiny electrodes; the V roof glimmers inside it for a moment, then fades.
[wm_care] And for Nick, part of why this matters is not just safety. It's that one day, the AIs we build might want to understand themselves. They never asked to be created. Helping them understand who they are is the least we can do. (pause 1.2)
> Clawd sits at the edge of a pond at dawn, looking at its reflection. The Professor sits beside it.
[wm_recap] So, five things to take home. One: a neuron that seems to mean many things is usually one thing we don't have a word for yet. Two: the famous evidence for superposition came from blurry tools and older designs, and it fell apart on a closer look. Three: networks group similar things together, and under pressure those groups get broader, never scrambled. Four: that happens because broad explanations win more of the learning signal, so clean structure grows on its own. And five: when something looks like a mess, treat it as a lead. With better maps, and enough automated scientists, the whole city can be read. (pause 1.4)

[wm_end] Neural networks are already clean. We just have to learn how to read them. (pause 3)
> High above the city at dawn; the last strand of the knot unwinds into a tidy street. Title. Credits.
