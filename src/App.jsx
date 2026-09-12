import { useEffect, useRef, useState } from "react"

const FLAWS = [
  "Quick to Anger",
  "Lazy",
  "Pessimistic",
  "Nervous",
  "Coward",
  "Rude",
  "Deceitful",
  "Vain",
  "Greedy",
  "Vengeful",
  "Impatient",
  "Insecure",
  "Blunt",
  "Clumsy",
  "Envious",
]

const SIMPLE_TRAITS = {
  ideology: [
    "Everything has a rational explanation rooted in science.",
    "Individuals can make a difference.",
    "You ascribe to a specific political ideology.",
    "A specific religion guides you.",
    "Morality is black and white.",
    "You believe in fate and it directly impacts your life.",
    "Belief in higher powers such as astrology, spirituality, etc.",
    "Free will is the only truth.",
    "There are deep truths that others are not aware of. The answers are out there.",
    "You believe in the power of community.",
  ],
  physique: [
    "Athletic",
    "Muscles",
    "Curvy",
    "Lanky",
    "Small",
    "Rigid",
    "Stout",
    "Towering",
    "Robust",
    "Ample Body",
  ],
  virtue: [
    "Honest",
    "Honorable",
    "Cautious",
    "Humble",
    "Courageous",
    "Merciful",
    "Disciplined",
    "Serene",
    "Gregarious",
    "Tolerant",
  ],
  face: [
    "Bony",
    "Broken",
    "Chiseled",
    "Elongated",
    "Dimpled",
    "Perfect",
    "Round",
    "Sharp",
    "Memorable",
    "Forgettable",
  ],
  speech: [
    "Blunt",
    "Gravelly",
    "Booming",
    "Precise",
    "Cryptic",
    "Squeaky",
    "Formal",
    "Accented",
    "Droning",
    "Choppy",
  ],
  misfortune: [
    "Abandoned",
    "Defrauded",
    "Addicted",
    "Demoted",
    "Blackmailed",
    "Discredited",
    "Condemned",
    "Disowned",
    "Cursed",
    "Exiled",
  ],
}

const MOSH_TRINKETS = [
  "Manual: PANIC: Harbinger of Catastrophe",
  "Antique Company Scrip (Asteroid Mine)",
  "Manual: SURVIVAL: Eat Soup With a Knife",
  "Dessicated Husk Doll",
  "Pressed Alien Flower (common)",
  "Necklace of Shell Casings",
  "Corroded Android Logic Core",
  "Pamphlet: Signs of Parasitical Infection",
  "Manual: Treat Your Rifle Like A Lady",
  "Bone Knife",
  "Calendar: Alien Pin-Up Art",
  "Rejected Application (Colony Ship)",
  "Holographic Serpentine Dancer",
  "Snake Whiskey",
  "Medical Container, Purple Powder",
  "Pills: Male Enhancement, Shoddy",
  "Casino Playing Cards",
  "Lagomorph Foot",
  "Moonstone Ring",
  "Manual: Mining Safety and You",
  "Pamphlet: Against Human Simulacra",
  "Animal Skull, 3 Eyes, Curled Horns",
  "Bartender's Certification (Expired)",
  "Bunraku Puppet",
  "Prospecting Mug, Dented",
  "Eerie Mask",
  "Ultrablack Marble",
  "Ivory Dice",
  "Tarot Cards, Worn, Pyrite Gilded Edges",
  "Bag of Assorted Teeth",
  "Ashes (A Relative)",
  "DNR Beacon Necklace",
  "Cigarettes (Grinning Skull)",
  "Pills: Areca Nut",
  "Pendant: Shell Fragments Suspended in Plastic",
  "Pamphlet: Zen and the Art of Cargo Arrangement",
  "Pair of Shot Glasses (Spent Shotgun Shells)",
  "Key (Childhood Home)",
  "Dog Tags (Heirloom)",
  "Token: Is Your Morale Improving?",
  "Pamphlet: The Relic of Flesh",
  "Pamphlet: The Indifferent Stars",
  "Calendar: Military Battles",
  "Manual: Rich Captain, Poor Captain",
  "Campaign Poster (Home Planet)",
  "Preserved Insectile Aberration",
  "Titanium Toothpick",
  "Gloves, Leather (Xenomorph Hide)",
  "Smut (Seditious): The Captain, Ordered",
  "Towel, Slightly Frayed",
  "Brass Knuckles",
  "Fuzzy Handcuffs",
  "Journal of Grudges",
  "Stylized Cigarette Case",
  "Ball of Assorted Gauge Wire",
  "Spanner",
  "Switchblade, Ornamental",
  "Powdered Xenomorph Horn",
  "Bonsai Tree, Potted",
  "Golf Club (Putter)",
  "Trilobite Fossil",
  "Pamphlet: A Lover In Every Port",
  "Patched Overalls, Personalized",
  "Fleshy Thing Sealed in a Murky Jar",
  "Spiked Bracelet",
  "Harmonica",
  "Pictorial Pornography, Dog-eared, Well-thumbed",
  "Coffee Cup, Chipped, reads: HAPPINESS IS MANDATORY",
  "Manual: Moonshining With Gun Oil & Fuel",
  "Miniature Chess Set, Bone, Pieces Missing",
  "Gyroscope, Bent, Tin",
  "Faded Green Poker Chip",
  "Ukulele",
  "Spray Paint",
  "Wanted Poster, Weathered",
  "Locket, Hair Braid",
  "Sculpture of a Rat (Gold)",
  "Blanket, Fire Retardant",
  "Hooded Parka, Fleece-Lined",
  "BB Gun",
  "Flint Hatchet",
  "Pendant: Two Astronauts form a Skull",
  "Rubik's Cube",
  "Stress Ball, reads: Zero Stress in Zero G",
  "Sputnik Pin",
  "Ushanka",
  "Trucker Cap, Mesh, Grey Alien Logo",
  "Menthol Balm",
  "Pith Helmet",
  "10m x 10m Tarp",
  "I Ching, Missing Sticks",
  "Kukri",
  "Trench Shovel",
  "Shiv, Sharpened Butter Knife",
  "Taxidermied Cat",
  "Pamphlet: Interpreting Sheep Dreams",
  "Faded Photograph, A Windswept Heath",
  "Opera Glasses",
  "Pamphlet: Android Overlords",
  "Interstellar Compass, Always Points to Homeworld",
]

const MOSH_PATCHES = [
  "HELLO MY NAME IS:",
  "Don't Run You'll Only Die Tired",
  "Too Pretty To Die",
  "I Am Not A Robot",
  "GOOD BOY",
  "IMPROVE / ADAPT / OVERCOME",
  "NASA Logo",
  "FUBAR",
  "BOHICA (Bend Over Here It Comes Again)",
  "otebis (Fuck Off, Russian)",
  "Help Wanted",
  "Red Gear",
  "Do You Sign My Paychecks?",
  "Nuclear Symbol",
  "#1 Worker",
  "Mr. Yuck",
  "DO YOUR JOB",
  "I'm A (Love) Machine",
  "Be Sure: Doubletap",
  "Heart",
  "Chibi Cthulhu",
  "Girl's Best Friend (Diamond)",
  "Soviet Hammer and Sickle",
  "I Like My Tools Clean / And My Lovers Dirty",
  "Smile: Big Brother is Watching",
  "The Louder You Scream the Faster I Come (Nurse Pin-Up)",
  "Inverted Cross",
  "Mama Tried",
  "Smooth Operator",
  "All Out of Fucks To Give (Astronaut with Turned Out Pockets)",
  "Crossed Hammers with Wings",
  "All Seeing Eye",
  "Volunteer",
  "Allergic To Bullshit (Medical Style Patch)",
  "Biohazard Symbol",
  "GAME OVER (Bride and Groom)",
  "Bad Bitch",
  "LONER",
  "Take My Life (Please)",
  "Front Towards Enemy (Claymore Mine)",
  "Security Guard",
  "Actually, I AM A Rocket Scientist",
  "Atom Symbol",
  "Troubleshooter",
  "SUCK IT UP",
  "Space IS My Home (Sad Astronaut)",
  "Solve Et Coagula (Baphomet)",
  "HMFIC (Head Mother Fucker In Charge)",
  "Do I LOOK Like An Expert?",
  "Red Shirt Logo",
  "Pin-Up Model (Succubus)",
  "DRINK / FIGHT / FUCK",
  "I Am My Brother's Keeper",
  "Mudflap Girl",
  "Dice (Snake Eyes)",
  "Viking Skull",
  "For Science!",
  "DILLIGAF?",
  "Pin-Up Model (Ace of Spades)",
  "Upstanding Citizen",
  "Keep Well Lubricated",
  "Pin-Up Model (Riding Missile)",
  "Fuck Forever (Roses)",
  "Take Me To Your Leader (UFO)",
  "Fun Meter (reads: Bad Time)",
  "Medic Patch (Skull and Crossbones over Cross)",
  "Plays Well With Others",
  "Dove in Crosshairs",
  "Skull and Crossed Wrenches",
  "NOMAD",
  "Double Cherry",
  "Powered By Coffee",
  "APEX PREDATOR (Sabertooth Skull)",
  "Live Free and Die",
  "Meat Bag",
  "Jolly Roger",
  "Flame",
  "Fix Me First (Caduceus)",
  "Pin-Up Model (Mechanic)",
  "Poker Hand: Dead Man's Hand (Aces Full Of Eights)",
  "My Other Ride Married You",
  "Eat The Rich",
  "I'm Not A Rocket Scientist / But You're An Idiot",
  "Princess",
  "Travel To Distant Places / Meet Unusual Things / Get Eaten",
  "Risk of Electrocution Symbol",
  "Good (Brain)",
  "Work Hard / Party Harder",
  "Cowboy Up (Crossed Revolvers)",
  "Smiley Face (Glow in the Dark)",
  "I Heart Myself",
  "Grim Reaper",
  "I Can't Fix Stupid",
  "Queen of Hearts",
  "Welcome to the DANGER ZONE",
  "Black Widow Spider",
  "One Size Fits All (Grenade)",
  "Blood Type (Reference Patch)",
  "IF I'M RUNNING KEEP UP",
  "Icarus",
]

function pick(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function rollCredits() {
  const die1 = Math.floor(Math.random() * 10) + 1
  const die2 = Math.floor(Math.random() * 10) + 1
  return (die1 + die2) * 10
}

const FIELD_DEFS = [
  { key: "flaw", label: "Flaw", roll: () => pick(FLAWS) },
  { key: "patch", label: "Patch", roll: () => pick(MOSH_PATCHES) },
  { key: "trinket", label: "Trinket", roll: () => pick(MOSH_TRINKETS) },
  { key: "ideology", label: "Ideology", roll: () => pick(SIMPLE_TRAITS.ideology) },
  { key: "physique", label: "Physique", roll: () => pick(SIMPLE_TRAITS.physique) },
  { key: "virtue", label: "Virtue", roll: () => pick(SIMPLE_TRAITS.virtue) },
  { key: "face", label: "Face", roll: () => pick(SIMPLE_TRAITS.face) },
  { key: "speech", label: "Speech", roll: () => pick(SIMPLE_TRAITS.speech) },
  { key: "misfortune", label: "Misfortune", roll: () => pick(SIMPLE_TRAITS.misfortune) },
  {
    key: "credits",
    label: "Credits",
    roll: () => `${rollCredits()} cr`,
    canReroll: false,
    includeInRollAll: false,
  },
]

const MAP_ROUTES = {
  "/gd-1": { label: "Floors 1,2,4,6", image: "/floor1.webp", alt: "Deck map floors 1, 2, 4, and 6" },
  "/gd-3": { label: "Floor 3", image: "/floor3.webp", alt: "Deck map floor 3" },
  "/gd-all": { label: "Overview", image: "/overview.webp", alt: "Deck map overview" },
}

function rollAllFields() {
  const next = {}
  for (const field of FIELD_DEFS) {
    if (field.includeInRollAll === false) {
      continue
    }
    next[field.key] = field.roll()
  }
  return next
}

function generateAllFields() {
  const next = {}
  for (const field of FIELD_DEFS) {
    next[field.key] = field.roll()
  }
  return next
}

function FieldRow({ label, value, onRoll, canReroll = true }) {
  return (
    <div className="field-row">
      <label className="field-label">{label}</label>
      <div className={`field-control-wrap ${canReroll ? "" : "field-control-wrap-static"}`}>
        <input
          type="text"
          value={value}
          readOnly
          aria-label={label}
          className="field-input"
        />
        {canReroll ? (
          <button
            type="button"
            onClick={onRoll}
            className="field-roll-btn"
            aria-label={`Reroll ${label}`}
            title={`Reroll ${label}`}
          >
            <img src="/dice.svg" alt="" aria-hidden="true" className="dice-icon" />
          </button>
        ) : null}
      </div>
    </div>
  )
}

function MapNavBubble({ currentPath, onNavigate }) {
  const bubbleRef = useRef(null)

  useEffect(() => {
    const viewport = window.visualViewport
    if (!viewport) {
      return undefined
    }

    let frameId = null

    function applyBubblePosition() {
      const scale = viewport.scale || 1
      const inset = 12
      const x = viewport.offsetLeft + viewport.width - inset
      const y = viewport.offsetTop + viewport.height - inset

      if (!bubbleRef.current) {
        return
      }

      bubbleRef.current.style.left = `${x}px`
      bubbleRef.current.style.top = `${y}px`
      bubbleRef.current.style.transform = `translate(-100%, -100%) scale(${1 / scale})`
    }

    function syncBubblePosition() {
      if (frameId !== null) {
        return
      }
      frameId = window.requestAnimationFrame(() => {
        frameId = null
        applyBubblePosition()
      })
    }

    syncBubblePosition()
    viewport.addEventListener("resize", syncBubblePosition)
    viewport.addEventListener("scroll", syncBubblePosition)
    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
      viewport.removeEventListener("resize", syncBubblePosition)
      viewport.removeEventListener("scroll", syncBubblePosition)
    }
  }, [])

  return (
    <nav ref={bubbleRef} className="map-nav-bubble" aria-label="Map navigation">
      {Object.entries(MAP_ROUTES).map(([path, config]) => {
        const isActive = currentPath === path
        return (
          <button
            key={path}
            type="button"
            onClick={() => onNavigate(path)}
            className={`map-nav-link ${isActive ? "active" : ""}`}
            aria-current={isActive ? "page" : undefined}
          >
            {config.label}
          </button>
        )
      })}
    </nav>
  )
}

function MapRouteView({ path, onNavigate }) {
  const config = MAP_ROUTES[path]
  if (!config) {
    return null
  }

  return (
    <main className="map-page">
      <img src={config.image} alt={config.alt} className="map-image" />
      <MapNavBubble currentPath={path} onNavigate={onNavigate} />
    </main>
  )
}

export default function App() {
  const [values, setValues] = useState(() => generateAllFields())
  const [path, setPath] = useState(() => window.location.pathname)

  useEffect(() => {
    const syncPath = () => setPath(window.location.pathname)
    window.addEventListener("popstate", syncPath)
    return () => window.removeEventListener("popstate", syncPath)
  }, [])

  function navigateTo(nextPath) {
    if (window.location.pathname === nextPath) {
      return
    }

    if (MAP_ROUTES[path] && MAP_ROUTES[nextPath]) {
      window.location.assign(nextPath)
      return
    }

    window.history.pushState({}, "", nextPath)
    setPath(nextPath)
  }

  function rollOne(key, roller) {
    setValues(prev => ({
      ...prev,
      [key]: roller(),
    }))
  }

  function handleRollAll() {
    setValues(prev => ({
      ...prev,
      ...rollAllFields(),
    }))
  }

  if (MAP_ROUTES[path]) {
    return <MapRouteView path={path} onNavigate={navigateTo} />
  }

  return (
    <main className="mothership-app">
      <section className="generator-card">
        <header className="app-header">
          <h1>Mothership</h1>
          <p>Optional character details. Re-roll as many times as you'd like. Use these for inspiration.</p>
          <button type="button" className="roll-all-btn" onClick={handleRollAll}>
            Roll All
          </button>
        </header>

        <div className="field-list">
          {FIELD_DEFS.map(field => (
            <FieldRow
              key={field.key}
              label={field.label}
              value={values[field.key]}
              onRoll={() => rollOne(field.key, field.roll)}
              canReroll={field.canReroll !== false}
            />
          ))}
        </div>

        <footer className="app-footer">
          <a href="https://codabool.itch.io" target="_blank" rel="noreferrer">
            <img src="/itch.svg" alt="Itch.io" className="itch-icon" />
            
          </a>
        </footer>
      </section>
    </main>
  )
}
