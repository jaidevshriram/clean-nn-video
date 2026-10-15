# Treatment — "Neural Networks Are Already Clean" (v2)

## The pitch
Inside every AI is a city of lights. Each light is a neuron. For years, the people who study these cities believed they
were *knots*: neighborhoods jammed together at random, impossible to read without first tearing them apart. This film
follows one scientist who spent a decade believing that, went back to the original crime scenes, and found that every
"knot" was a well-organized city we hadn't learned to read. It plays as a detective story told by the detective:
the cases, the false leads, the moment it clicks, and what it means for the future of understanding AI.

Tone: wonder first, then clarity. Funny when it can be. Every hard idea gets one concrete picture before it gets a word.

## The world: the City
- **The City is the network.** Seen from above it is a landscape of districts at dusk. Information arrives at the
  **coast** on the left as rain of colored light (pixels, or words), flows inland along **roads** (connections), and
  ends at the **towers** on the far horizon (the answers: "dog", "car", "return").
- **Districts are layers.** Near the coast: tiny huts that light up for edges, curves, colors (early layers). Deeper
  inland: bigger buildings for textures, eyes, wheels. On the horizon: towers for whole objects and ideas.
- **A building is a neuron.** It lights up when something it cares about passes by. **Its windows show what it
  responds to**: real photos (the essay's dataset examples) glowing in the windows. Brighter = stronger response.
- **Its basement is its negative side.** When something it rejects passes by, the basement lights up cold blue.
- **Roads are connections.** Thick road = strong connection. Light pulses travelling along roads = activations flowing.
- **The river** running through every district is the **residual stream**; **couriers on bicycles** are **attention**,
  carrying notes between buildings.
- **The language city** is a second city built of letters and books, by the sea of text.
- **Weather is our tools:** fog = bad tools; a dirty lens = a badly tuned microscope; clear dawn = understanding.

## The cast
- **The Professor** (narrator, "I"): a scientist in a lab coat and round glasses, warm and confident. Walks the
  streets, points, crouches to peer into windows, pulls out tools, occasionally breaks the fourth wall.
- **Clawd**: his small robot assistant. Carries the lantern, operates gadgets (the Microscope, the Squeezer), jumps to
  wrong conclusions, gets scared of the knot, celebrates. Never the presenter.
- **The Knot**: the villain-idea. A tangled street of houses wound into a trefoil; it appears whenever superposition
  is the explanation, and loosens a little each time the evidence falls.
- **The Unfolding Machine** (sparse autoencoder): a big clanking contraption that takes the city apart and lays the
  pieces out in a long row. Not evil, just the wrong first tool.
- **The Sketch Artist** (feature visualization): a little easel-robot that paints "what a building wants to see".
  Sometimes it gets lazy and paints dogs.

## Visual vocabulary (concept → picture), used consistently
| idea | picture |
|---|---|
| neuron | a building that lights up; photos in its windows |
| activation strength | brightness of the windows; size of the light pulse |
| negative side | the basement glowing blue; things bounced back at the door |
| polysemantic | a building with clashing photos in the windows (cats AND cars) |
| superposition | roommates on different shifts: unrelated tenants crammed in one house because they're never home together; at city scale, the Knot |
| generalization | a family sharing a house: tenants who look alike; at scale, tidy districts |
| recursive generalization | a house growing annexes like a tree: each new room next to the last |
| sparse autoencoder | the Unfolding Machine |
| feature visualization | the Sketch Artist |
| the microscope (our tools) | Clawd's big brass lens on wheels; foggy or clear |
| gate | a traffic warden at a junction sending cars one way, dogs the other |
| crushing a layer | the Squeezer: a giant press that squashes a district to 10 houses |
| weak activations | whispers vs shouts; dim windows |
| residual stream | the river |
| attention | couriers carrying notes |
| experts (MoE) | specialist neighborhoods with a gatekeeper at the city gate (the router) |
| circuit | a lit route across the city from coast to tower |
| "becoming a reader" | the Professor learns to read the street signs, which were in the city's own alphabet |

## Rules
- **Show first, then say.** The picture arrives a beat before the narration names it.
- **Something moves in every frame:** light pulses, couriers, fog drifting, Clawd fidgeting, windows flickering.
- **The camera travels.** Long flights over districts, pushes into windows, pulls back to the horizon. Cuts happen on
  motion or through windows (fly into a window → arrive inside a new scene).
- **Numbers become places.** 99% = a whole district lighting up; 90 / 7 / 3% = a crowd of 100 tenants in colors.
- **Figures are rebuilt, never pasted.** The essay's photos live in windows, frames held by the Professor, posters on
  walls, polaroids Clawd collects. Essay diagrams become city scenes or simple painted diagrams with few elements.
- **Color arc:** cold violet dusk (the mystery) → warm lamp-lit streets (investigation) → green park (growth) → night
  sea (language city) → gold dawn (understanding).
- **Text is rare:** key terms painted on signs, banners or chalk; numbers on billboards; never paragraphs.
