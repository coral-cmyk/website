// Photos stored with the site are full paths. Older ones keep their original Wix
// file ids (e.g. "b294f9_…~mv2.jpg"); those files now live in public/assets/wix/
// without the "~mv2" suffix. Width is kept for callers but no longer used.
export const img = (id: string, _w = 1800) =>
  id.startsWith("/") || id.startsWith("http") ? id : `/assets/wix/${id.replace("~mv2", "")}`;

const xlApt = Object.entries(
  import.meta.glob<{ url: string }>("../assets/xl-apt/*.asset.json", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, v]) => v.url);

const crSuites = Object.entries(
  import.meta.glob<{ url: string }>("../assets/cr-suites/*.asset.json", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, v]) => v.url);

// CR Suites layout drawing, kept apart from the interior photos.
const crSuitesPlan = Object.entries(
  import.meta.glob<{ url: string }>("../assets/cr-suites-plan/*.asset.json", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, v]) => v.url);

const appcharge = Object.entries(
  import.meta.glob<{ url: string }>("../assets/appcharge/*.asset.json", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, v]) => v.url);

// APPCHARGE office layout, kept apart from the interior photos.
const appchargePlan = Object.entries(
  import.meta.glob<{ url: string }>("../assets/appcharge-plan/*.asset.json", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, v]) => v.url);

// STUDENT APTS 01 photos, in display order; student-apts-01-1 is the cover.
const studentApts01 = Object.entries(
  import.meta.glob<{ url: string }>("../assets/student-apts-01/*.asset.json", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, v]) => v.url);

// STUDENT APTS 02 photos, in display order; student-apts-02-1 (the living room) is the cover.
const studentApts02 = Object.entries(
  import.meta.glob<{ url: string }>("../assets/student-apts-02/*.asset.json", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, v]) => v.url);

// STUDENT APTS 03 photos, in display order; student-apts-03-1 (the living room) is the cover.
const studentApts03 = Object.entries(
  import.meta.glob<{ url: string }>("../assets/student-apts-03/*.asset.json", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, v]) => v.url);

// Coral's copy for all three student flats — identical wording on each page.
const studentAptsText = [
  "Located near the university district of Thessaloniki, this project was designed with the needs and lifestyle of young adults in mind, creating thoughtfully planned studio and one-bedroom apartments that balance comfort, functionality, and contemporary living.",
  "The main design challenge was to maximize each apartment's potential without compromising on the essentials. Carefully considered layouts incorporate cozy sleeping areas, generous kitchens, spacious bathrooms, and integrated laundry facilities, ensuring that every square meter serves a purpose.",
  "Through a refined selection of materials and an emphasis on spatial flow, each apartment offers a welcoming and elevated living experience — a place to study, unwind, and host friends throughout the university years.",
];

// EI Library photos, in display order; ei-library-1 (uploaded as 33.jpg) is the cover.
const eiLibrary = Object.entries(
  import.meta.glob<{ url: string }>("../assets/ei-library/*.asset.json", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, v]) => v.url);

// GY Apt interior photos, in display order; gy-apt-1 is the cover.
const gyApt = Object.entries(
  import.meta.glob<{ url: string }>("../assets/gy-apt/*.asset.json", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, v]) => v.url);

// GY Apt floor plan, kept apart from the interior photos.
const gyAptPlan = Object.entries(
  import.meta.glob<{ url: string }>("../assets/gy-apt-plan/*.asset.json", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, v]) => v.url);

// DR Clinic photos, in display order; dr-clinic-1 is the cover.
const drClinic = Object.entries(
  import.meta.glob<{ url: string }>("../assets/dr-clinic/*.asset.json", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, v]) => v.url);

// Brodt Lobby photos, in display order; brodt-lobby-1 is the cover.
const brodtLobby = Object.entries(
  import.meta.glob<{ url: string }>("../assets/brodt-lobby/*.asset.json", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, v]) => v.url);

// MES Apt photos, in display order; mes-apt-1 is the cover.
const mesApt = Object.entries(
  import.meta.glob<{ url: string }>("../assets/mes-apt/*.asset.json", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, v]) => v.url);

// HY Apt photos, in display order; hy-apt-1 is the cover.
const hyApt = Object.entries(
  import.meta.glob<{ url: string }>("../assets/hy-apt/*.asset.json", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, v]) => v.url);

// NET Project photos, in display order; net-project-0 is the cover.
const netProject = Object.entries(
  import.meta.glob<{ url: string }>("../assets/net-project/*.asset.json", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, v]) => v.url);

// Monday photos, in display order; monday-1 is the cover.
const monday = Object.entries(
  import.meta.glob<{ url: string }>("../assets/monday/*.asset.json", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, v]) => v.url);

export type Project = {
  slug: string;
  name: string;
  category: string;
  underConstruction?: boolean;
  subtitle?: string;
  /** extra line shown under the name on the Projects page, e.g. "3 Houses" */
  detail?: string;
  year: string;
  size: string;
  location: string;
  cover: string;
  /** true when the top of the cover photo is bright enough to carry the dark logo */
  lightTop: boolean;
  text: string[];
  images: string[];
  /** drawings (floor plans) shown apart from the interior photos, at a readable size */
  plans?: string[];
};

const allProjects: Project[] = [
  // Under construction: the card dims the cover and labels it until the work is finished.
  {
    slug: "net-project",
    name: "NET PROJECT",
    category: "Residential",
    detail: "3 Houses",
    year: "",
    size: "",
    location: "Netayim, Israel",
    cover: netProject[0] ?? "",
    // The cover's top is a mid-tone blue sky, so the header shows the light logo over a shaded strip.
    lightTop: false,
    text: [],
    images: netProject,
    underConstruction: true,
  },
  {
    slug: "mes-apt",
    name: "MES APT",
    category: "Residential",
    year: "",
    size: "",
    location: "Tel Aviv, Israel",
    cover: mesApt[0] ?? "",
    // The cover's top is a plain bright ceiling, so the dark logo reads there.
    lightTop: true,
    text: [],
    images: mesApt,
    underConstruction: true,
  },
  {
    slug: "hy-apt",
    name: "HY APT",
    category: "Residential",
    year: "",
    size: "",
    location: "Tel Aviv, Israel",
    cover: hyApt[0] ?? "",
    // The cover's top is a plain bright ceiling, so the dark logo reads there.
    lightTop: true,
    text: [],
    images: hyApt,
    underConstruction: true,
  },
  {
    slug: "brodt-lobby",
    name: "BRODT LOBBY",
    category: "Lobby",
    year: "",
    size: "150 m²",
    location: "Tel Aviv, Israel",
    cover: brodtLobby[0]!,
    lightTop: false,
    text: [
      "Located in the heart of Tel Aviv, the Brodt Jewish Center is a vibrant hub for cultural events, community gatherings, and Jewish education. Coco Atelier was commissioned to reimagine the center's lobby and auditorium, creating a more refined and versatile environment that enhances the visitor experience.",
      "The renovation focused on transforming the lobby into a welcoming, multifunctional space capable of accommodating a variety of events and gatherings. A custom-designed bar, bespoke wall cladding, a redesigned ceiling, carefully selected furnishings, custom light fixtures, and integrated branding establish a cohesive architectural language throughout.",
      "The adjoining auditorium was also renovated, extending the refreshed identity of the center and creating a unified experience across its public spaces.",
      "The result is a contemporary yet inviting cultural destination that honors the center's community spirit while introducing a new level of sophistication and functionality.",
    ],
    images: brodtLobby,
  },
  {
    slug: "monday",
    name: "MONDAY.COM",
    category: "Biophilia Center",
    detail: "Offices",
    year: "",
    size: "150 m²",
    location: "Tel Aviv, Israel",
    cover: monday[0] ?? "",
    // The cover's top is a busy ceiling of beams, vines and ductwork, so the header shows the light logo.
    lightTop: false,
    text: [
      "Coco Atelier was commissioned to design a unique biophilic space within the Monday.com headquarters in Israel — a 150 m² indoor garden offering employees an immersive escape from the everyday office environment.",
      "Envisioned as one of the company's concept spaces, the center provides a flexible setting for individual meetings, group gatherings, yoga sessions, and moments of quiet reflection.",
      "The spatial experience was designed to evoke the feeling of wandering through a lush garden. At its heart, a central installation of voluminous greenery is surrounded by circular bench seating, creating a natural gathering point. As visitors move through the space, intimate pockets gradually reveal themselves between layers of foliage, inviting curiosity and exploration. A hanging swing nestled among the trees, secluded seating areas, and a cascading waterfall create moments of discovery, each offering a different way to experience the space. The sound of flowing water gently masks the surrounding office noise, enhancing the sense of retreat and tranquility.",
      "Hydroponic growing systems were integrated throughout the design, allowing dense layers of greenery to flourish in a relatively short time. The varying heights, textures, and abundance of plants create a rich, immersive landscape that blurs the boundaries between architecture and nature.",
      "The result is a living, evolving indoor garden — a space that encourages employees to slow down, reconnect, and experience a moment of nature within the workplace.",
    ],
    images: monday,
  },
  {
    slug: "xl-apt",
    lightTop: false,
    name: "XL APT",
    category: "Residential",
    year: "2021",
    size: "60 m²",
    location: "Tel Aviv, Israel",
    cover: xlApt[0]!,
    text: [
      "The XL Apt is an interior renovation project by Coco Atelier. The design concept was based on the client's desire for a vacation home that would feel like a high end hotel suite, suited for a bachelor. The layout is an open floor plan, divided only by the sophisticated transition of materials that echo from floor to ceiling. Custom millwork covers all walls of the space, giving layers of texture on all surfaces while allowing for hidden storage.",
      "The play on materials and their details gives the space depth, numerous focal points, and the WOW factor that comes from such a unique floor plan.",
    ],
    images: xlApt,
  },
  {
    slug: "hb-house",
    lightTop: false,
    name: "HB HOUSE",
    category: "Residential",
    year: "",
    size: "500 m²",
    location: "Huntington Beach, California",
    cover: "0fbf64_358e6efb054e4ebc894dc805ca601c4d~mv2.jpeg",
    text: [
      "HB is a 2-story full house renovation located on the waters of Huntington Beach, California. The impressive architecture dates back to the 70's, a time where homes were designed as split levels, tall ceilings and very little flow.",
      "Our main goal when starting the design process was to level out the whole first floor and create a natural flow that would accentuate the impressive views while catering to the clients' own needs and desires.",
      "The design concept aims to highlight the existing geometrical lines of the house — high vaulted ceilings, angled windows, large floor plan — using dark natural materials while balancing them with organic tones and textures. The result is an updated modern island home. One that takes pride in its elegant details, geometry, and gives a stage to the waters surrounding it.",
    ],
    images: [
      "0fbf64_db72df7c207749029f3f46faf0c7d7c8~mv2.jpg",
      "0fbf64_358e6efb054e4ebc894dc805ca601c4d~mv2.jpeg",
      "0fbf64_7b39dcda23834c12937e9bf9d17bd3ef~mv2.jpeg",
      "0fbf64_c54f8c6356db4c129f6ae5485508aeac~mv2.jpg",
      "0fbf64_640d6b0e808e4f7fbba910c5e65a7fe0~mv2.jpg",
      "0fbf64_05e0e6d9cd2844a38d82b8aa228858fe~mv2.jpg",
      "0fbf64_21cffb0df7cc4eff9258686d9d3bc69a~mv2.jpg",
      "0fbf64_72daea3dd18f471ab9094eba6340a98c~mv2.jpeg",
    ],
  },
  {
    slug: "hoa",
    lightTop: true,
    name: "HOA",
    category: "Hospitality",
    subtitle: "Hotel concept",
    year: "2020",
    size: "Multiple buildings & spaces",
    location: "Turin, Italy",
    cover: "0fbf64_580524a25756400296f9272804025a70~mv2.jpg",
    text: [
      "HOA is a luxurious retreat that gives the space and time needed for our minds to disconnect from the external, connect to our world inside, and tap into our creative potential.",
      "The Villa was built in the 18th century, a time where Baroque Architecture was flourishing through experimental forms, dramatic curves, and innovative art for the time. The design concept seeks to elevate the existing historical architecture — complementing its foundational design — while not competing with it.",
      "The refurbishment displays gentle curves in the interior and exterior that mimic human behavior. Striking this balance makes the historical site more accessible and relatable to the modern person.",
      "HOA is the celebration of the modern artist connecting to their internal landscape and cultural roots through design, architecture, and art.",
    ],
    images: [
      "0fbf64_580524a25756400296f9272804025a70~mv2.jpg",
      "0fbf64_5217326b5ae74f9dbc5b68654fb0ba49~mv2.jpg",
      "0fbf64_8db851130ad1481e801d197619f479fc~mv2.png",
      "0fbf64_d07a2714dc114a4b89a98d9fee94ebdc~mv2.jpg",
      "0fbf64_f78b7aa35ba0430abde693a401e6a8ca~mv2.jpg",
    ],
  },
  {
    slug: "ter",
    lightTop: true,
    name: "TER",
    category: "Commercial",
    subtitle: "Restaurant expansion concept",
    year: "2019",
    size: "200 m²",
    location: "Malga Costa, Italy",
    cover: "0fbf64_902a7862376a4b459dcf26e685bf2ad0~mv2.jpg",
    text: [
      "TER won an honorary mention as a part of the YAC's Calamity Atelier Competition, in addition to the prestigious A' Design Award for Interior Space & Exhibition Design 2019–2020.",
      "The competition was based in the art forest of Arte Sella in northern Italy, in recent years destroyed by a storm. Stability is a universal value one seeks to reach in their lifetime — the basis of the forest's recovery should be in the form of a stable foundation.",
      "The idea of stability is translated through mass, shape, and materials. TER looks like a massive boulder rearing in the forest. The stone exterior makes up the majority of the interior as well, acting as its base material — the old as foundation, the new alluding to a burgeoning future.",
      "At the center of the plan, an open outdoor space is used for campfire cooking. The plan circles around it, so everyone can watch the chefs at work. The restaurant blends in as another rock in the landscape — differentiated only by the smoke rising from its center.",
    ],
    images: [
      "0fbf64_902a7862376a4b459dcf26e685bf2ad0~mv2.jpg",
      "0fbf64_9381e87b8da7436d810eb04d947ca97f~mv2.jpg",
      "0fbf64_f929767fa4284fbc952ea1d8b0f1dd1a~mv2.jpg",
      "0fbf64_4612ee23c5f44dbcb1528dbe25f08d7d~mv2.jpg",
      "0fbf64_0c93b9e60e514561890b6b9824c3ebf6~mv2.jpg",
      "0fbf64_d10993b850ce4bc4905e7bddad8f6843~mv2.jpg",
    ],
  },
  {
    slug: "dup20",
    lightTop: true,
    name: "DUP20",
    category: "Residential",
    year: "2020",
    size: "85 m²",
    location: "Holon, Israel",
    cover: "0fbf64_cb4b813a314e4e1bb024bfcabf5157f0~mv2.jpg",
    text: [
      "DUP20 is a 2-story apartment in a newly completed residential building that was partly restored. The objective was to design a space for 2 adults and 3 young kids with functionality as its guiding principle — clean lines within a very compact space, going against the cookie-cutter layout that came packaged in the building.",
      "The main challenge was the common area, which needed to accommodate a very active kitchen, dining area, staircase, and living space all within 45 m² — with one long wall of only glass doors and windows, leaving no solid surface for use.",
      "The answer was custom designed carpentry that would accompany all the spaces of the project and provide innovative solutions to maximize the space.",
    ],
    images: [
      "0fbf64_cb4b813a314e4e1bb024bfcabf5157f0~mv2.jpg",
      "0fbf64_37bfd77a4d21485698ecd7741e2e414b~mv2.jpg",
      "0fbf64_cc50262e0e6b4dbe8fc6c83108a1f6fa~mv2.jpg",
      "0fbf64_31c5d69b80a2444d9b3563c13d132800~mv2.jpg",
      "0fbf64_fe2d95cbbe5e412ebec061b169f6b5e1~mv2.jpg",
      "0fbf64_93d9b623df9a4456b91c302cf59566f9~mv2.jpg",
      "0fbf64_5478bd912e464067bf7b29af143928eb~mv2.jpg",
      "0fbf64_f585317b30d54b5c85e2adb233a6e9a1~mv2.jpg",
    ],
  },
  {
    slug: "mel-apt",
    lightTop: false,
    name: "MEL APT",
    category: "Residential",
    year: "2020",
    size: "50 m²",
    location: "Tel Aviv, Israel",
    cover: "b294f9_2b65da2062804168b9db9fd811bc68a7~mv2.jpg",
    text: [
      "Designed for a woman in her early 30s living in the heart of TLV, this Bauhaus apartment fully maximizes its 50 m² while not having to compromise any functions of the home.",
      "She talked about her love for the city, memories of growing up in the area, and how she wants to entertain and host dinners for her friends. The objective was to open up the space as much as possible while preserving her private areas of the home.",
    ],
    images: [
      "b294f9_99d29c62d20e47d989032da3ad4b4b95~mv2.jpg",
      "b294f9_0a8917813b2b4ace9d475973050bda5b~mv2.jpg",
      "b294f9_a120bb1827414b4ba7b40d2b7ec430f2~mv2.jpg",
      "b294f9_0a1f0e93b1a9440ea36b560716dfe432~mv2.jpg",
    ],
  },
  {
    slug: "coi",
    lightTop: false,
    name: "COI",
    category: "Experimental",
    subtitle: "Nomadic living",
    year: "2018",
    size: "20 m²",
    location: "Forest",
    cover: "0fbf64_00f34b5567b249d282623a64ddd52da2~mv2.jpg",
    text: [
      "COI is a 20 m² living unit located on the upper layer of the forest, designed for nomads looking to live in the simplest way, while connecting and disconnecting as they please.",
      "Its name derives from the three parts that create it: the core, outer layer, and inner layer. Each layer is in charge of one function, freeing the wanderers' minds of any unnecessary materialistic clutter.",
      "How is the term “living” changing in present times? How can we embrace the change instead of fearing it? It all comes down to planning, designing, and adapting.",
    ],
    images: [
      "0fbf64_00f34b5567b249d282623a64ddd52da2~mv2.jpg",
      "0fbf64_e8958eb4668d484d987b4b7c9bc6c395~mv2.jpg",
      "0fbf64_216d2dafb86c40599be33ce0aecf1e33~mv2.jpg",
      "0fbf64_36477e16f0a5476194a697c7450dd153~mv2.jpg",
      "0fbf64_0dbfa60904514f95a6c4703334041669~mv2.jpg",
    ],
  },
  {
    slug: "mh21",
    lightTop: true,
    name: "MH21",
    category: "Experimental",
    subtitle: "Moving home",
    year: "2021",
    size: "25 m²",
    location: "International",
    cover: "b294f9_ce0b197e457d4cfbab0349e50128b590~mv2.jpg",
    text: [
      "The context is a global pandemic, one that has us questioning everything we thought we knew about the spaces we live in. How should humans live in 2021?",
      "Basic human needs remain basic human needs. What changed is that two of them — others and novelty — were most affected, and can be prioritized and translated into design.",
      "MH21 is a 25 m² unit designed from an upcycled train cabin. Using the existing worldwide railway infrastructure, it becomes a moving home — one that supports meeting, interacting, and experiencing new people and places, safely. Deserted train stations become global communities wherever homeowners decide to park.",
    ],
    images: ["b294f9_ce0b197e457d4cfbab0349e50128b590~mv2.jpg"],
  },
  {
    slug: "cr-suites",
    lightTop: true,
    name: "CR SUITES",
    category: "Hospitality",
    year: "2026",
    size: "",
    location: "Crete, Greece",
    cover: crSuites[1]!,
    text: [
      "Eight high-end suites, each with a private pool overlooking the ocean.",
      "CR Suites is a hospitality project on the coast of Crete, Greece, built around a single idea: the sea should never leave the room. The suite is divided only by a low console that swivels with its guests, turning the sleeping side toward the water and closing it back toward the lounge.",
      "Dry-stacked limestone, white painted timber rafters and warm walnut carry the palette, with brass and pebble-shaped mirrors softening the light. Materials run unbroken from floor to ceiling, so the interior reads as one continuous surface, quietly lit from below.",
      "Beyond the full height glass, the suite gives itself to the terrace and the infinity pool, where the water of the pool and the sea meet at the same horizon.",
    ],
    images: crSuites,
    plans: crSuitesPlan,
  },

  {
    slug: "appcharge",
    lightTop: false,
    name: "APPCHARGE",
    category: "Offices",
    year: "2025",
    size: "1000 m²",
    location: "Tel Aviv, Israel",
    cover: appcharge[0]!,
    text: [
      "Coco Atelier was commissioned to reimagine the existing Appcharge offices, transforming an established workspace into a contemporary environment that reflects the company's brand identity and evolving needs.",
      "Spanning an entire floor, the project includes a central lounge, co-working areas, private offices, and shared team offices, each designed to accommodate different ways of working, collaborating, and connecting.",
      "The main design challenge was to work within the existing architectural framework, identifying opportunities to transform the space without undergoing a complete renovation. Through a thoughtful combination of custom carpentry, updated finishes, lighting, furnishings, and a color palette inspired by the company's visual identity, a new and cohesive design language was introduced throughout the floor.",
      "Special attention was given to creating a seamless connection between the different work environments, balancing the energy of collaborative spaces with the comfort and privacy of individual offices.",
      "The result is a refreshed and dynamic workplace that builds upon its existing foundations while establishing a stronger sense of identity — a space that feels distinctly Appcharge.",
    ],
    images: appcharge,
    plans: appchargePlan,
  },

  // All three flats have Coral's photos; the living room is each flat's cover.
  // Coral's copy for all three lives in studentAptsText.
  {
    slug: "student-apts-01",
    lightTop: true,
    name: "STUDENT APTS 01",
    category: "Residential",
    year: "",
    size: "",
    location: "Thessaloniki, Greece",
    cover: studentApts01[0] ?? "",
    text: studentAptsText,
    images: studentApts01,
  },
  {
    slug: "student-apts-02",
    lightTop: false,
    name: "STUDENT APTS 02",
    category: "Residential",
    year: "",
    size: "",
    location: "Thessaloniki, Greece",
    cover: studentApts02[0] ?? "",
    text: studentAptsText,
    images: studentApts02,
  },
  {
    slug: "student-apts-03",
    lightTop: false,
    name: "STUDENT APTS 03",
    category: "Residential",
    year: "",
    size: "",
    location: "Thessaloniki, Greece",
    cover: studentApts03[0] ?? "",
    text: studentAptsText,
    images: studentApts03,
  },

  // Photos are in; the description is still to come from Coral.
  {
    slug: "ei-library",
    lightTop: false,
    name: "EI LIBRARY",
    category: "Library",
    year: "",
    size: "200 m²",
    location: "Tel Aviv, Israel",
    cover: eiLibrary[0] ?? "",
    text: [
      "A new addition to a central museum, the EI Library transforms the building's lower-ground level into a contemporary space dedicated to its curated book collection, learning, and collaboration.",
      "Designed for students and museum team members alike, the library offers a welcoming environment for reading, studying, informal meetings, and exploration. The spatial planning balances quiet, intimate areas with shared spaces, while integrating new technologies that enhance the experience of learning and research.",
      "The result is a thoughtful extension of the museum — a space that brings together literature, technology, and community in an inviting and inspiring setting.",
    ],
    images: eiLibrary,
  },

  // Coral's own copy; she confirmed the place as Glil Yam.
  {
    slug: "gy-apt",
    name: "GY APT",
    category: "Residential",
    year: "",
    size: "130 m²",
    location: "Glil Yam, Israel",
    cover: gyApt[0] ?? "",
    lightTop: true,
    text: [
      "Designed for a growing family, this 130 m² apartment in a new residential development in Glil Yam was thoughtfully planned to balance functionality, comfort, and a sense of openness.",
      "Our studio accompanied the family throughout the entire journey, from the initial real estate purchase and planning stages to the final details and move-in.",
      "The main design challenge was to create a flexible, functional layout that would evolve with the family's changing needs. Through careful spatial planning and creative solutions, we maximized storage throughout the apartment while preserving a generous, open living area. Special attention was given to expanding the kitchen's potential, creating a spacious and practical heart of the home.",
      "The result is a thoughtfully considered family home where every square meter serves a purpose, without compromising the feeling of space, flow, or everyday comfort.",
    ],
    images: gyApt,
    plans: gyAptPlan,
  },

  // The cover photo is in; the description is still to come from Coral.
  {
    slug: "dr-clinic",
    name: "DR CLINIC",
    category: "Medical",
    year: "",
    size: "40 m²",
    location: "Petah Tikva, Israel",
    cover: drClinic[0] ?? "",
    lightTop: false,
    text: [
      "Designed to redefine the traditional clinical experience, this intimate gynecology clinic combines the functionality of a medical environment with the warmth and comfort of a welcoming, residential space.",
      "The design focuses on creating a calming and luxurious atmosphere, where patients feel at ease from the moment they enter. Warm wooden cladding, custom-designed light fixtures, and carefully curated furnishings introduce softness, texture, and a sense of understated elegance.",
      "The result is a thoughtfully designed medical space that balances professionalism with intimacy, offering patients a more personal and comforting experience.",
    ],
    images: drClinic,
  },
];

// The Projects page shows these, in this order. Drop a slug to hide a project,
// move it up or down to reorder.
const PROJECT_ORDER = [
  "net-project",
  "mes-apt",
  "hy-apt",
  "xl-apt",
  "cr-suites",
  "hb-house",
  "ter",
  "hoa",
  "appcharge",
  "student-apts-01",
  "student-apts-02",
  "student-apts-03",
  "gy-apt",
  "monday",
  "ei-library",
  "brodt-lobby",
  "coi",
  "dup20",
  "dr-clinic",
];

export const projects: Project[] = PROJECT_ORDER.map((slug) =>
  allProjects.find((p) => p.slug === slug),
).filter((p): p is Project => p !== undefined);

/**
 * Photos in the scroll-through gallery on a project page: the cover leads, then the rest.
 * The cover also opens the page full-bleed, so it is shown twice on purpose.
 */
// The cover already fills the opening screen, so the scroll-through gallery under
// it carries the rest of the photos only — never the cover a second time.
// The cover leads the scroll-through gallery too, so every photo — the opening
// one included — appears once, in order, under the project's opening screen.
export const galleryImages = (p: Project) =>
  p.cover ? [p.cover, ...p.images.filter((x) => x !== p.cover)] : p.images;

// Column spans for the scroll-through gallery: the opening photo runs the full
// width, the rest sit two to a row, and a photo left on its own fills the row
// instead of leaving an empty half.
export const gallerySpans = (n: number) => {
  const spans = Array.from({ length: n }, (_, i) => (i === 0 ? 2 : 1));
  if (n > 1 && (n - 1) % 2 === 1) spans[n - 1] = 2;
  return spans;
};

export const SOCIAL = {
  instagram: "https://www.instagram.com/coco.atelier/",
  whatsapp: "https://wa.me/972542645228",
};
