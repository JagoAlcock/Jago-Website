// ═══════════════════════════════════════════════════════════════════════
// CONTENT CONFIG — edit this file to update every page on your site.
// ═══════════════════════════════════════════════════════════════════════
//
// HOW TO EDIT
// ───────────
// • Open this file in any text editor.
// • Change the text between the quotes "like this".
// • Save. Refresh the page. Done.
//
// THINGS YOU CAN EDIT
// ───────────────────
//  1. SITE_INFO     — your name, tagline, email, phone, location, LinkedIn.
//  2. INTRO_STATS   — the "22+ months", "6 industries" stats on the home page.
//  3. ABOUT_TEXT    — paragraphs on the About page.
//  4. PROJECTS      — each project card + detail page.
//  5. HOBBIES       — sports & hobbies grid on the About page.
//  6. RESUME        — everything on the Resume page.
//  7. DOCS          — list of supporting documents.
//
// ADDING A PHOTO
// ──────────────
//   1. Put the image file in the `images/` folder
//      (e.g. images/wand-hero.jpg)
//   2. In this file, set the project's image: 'images/wand-hero.jpg'
//
// ADDING A PDF
// ────────────
//   1. Put the PDF in the `documents/` folder (create it if missing).
//   2. Set the url: 'documents/my-resume.pdf'
//
// ═══════════════════════════════════════════════════════════════════════


// ── 1. Site-wide info ───────────────────────────────────────────────────
const SITE_INFO = {
  name:       'Jago Alcock',
  tagline:    'MECHANICAL / AEROSPACE / AUTOMATION / OPTIMISATION',
  role:       'Graduate Mechanical Engineer',
  location:   'Christchurch, NZ',
  timezone:   'GMT+12',
  email:      'jago.alcock@gmail.com',
  phone:      '+64 204 0650413',
  linkedin:   'https://www.linkedin.com/in/jago-alcock-a15406201/',
  siteUrl:    'https://jagoalcock.github.io/Jago-Website/',
  footerHeadline: "Open to\nroles.",
  copyright:  '© 2026 JAGO ALCOCK',
  hostingNote: 'HOSTED ON GITHUB PAGES',
};


// ── 2. Home-page intro stats ────────────────────────────────────────────
const INTRO_STATS = [
  { value: '2+',     label: 'years of R&D experience' },
  // { value: '6',       label: 'companies, 6 industries' },
  { value: 'BE(Hons)', label: 'First-Class Honours<br>Mechanical Engineering Major<br>Aerospace Engineering Minor'}
];

const INTRO_TEXT =
  "Kia ora — I'm a {accent}graduate mechanical engineer{/accent} based in Christchurch, New Zealand, with 2+ years of R&D experience across aerospace, robotics, automation and more. I like to work on the cutting edge, in fast paced, exciting environments.";


// ── 3. About-page text ──────────────────────────────────────────────────
// Each paragraph is one string. Add, remove, or reorder freely.
// Wrap words in {accent}…{/accent} to highlight them in your accent colour.

const ABOUT_HEADING = "Kia ora,";
const ABOUT_SUBHEADING = "my name is Jago.";
const ABOUT_PHOTO = 'images/profile.jpg';
// How the photo is cropped: 'top' keeps head/face visible, 'center' centres the subject.
const ABOUT_PHOTO_POSITION = 'center 20%';

const ABOUT_TEXT = [
  "I was born on a small Royal Air Force base in England before moving to New Zealand, where I have spent most of my schooling. From my earliest days in primary school, I have been fascinated by design and how things work — teaching myself CAD long before high school and always sketching in the margins of my notebooks.",
  "This early passion for design naturally evolved into a keen interest in aerospace, motorsport, and optimisation, driving me to pursue a degree in mechanical engineering with a minor in aerospace. I have recently graduated with {accent}first-class honours{/accent}, and have over 22 months of research and development work experience. I am impassioned by finding creative solutions to complex challenges in design, automation, and optimisation.",
  "I've contributed to a wide range of projects, from multi-axis spray systems for UAVs to sawblades mounted on six-axis robotic arms, developing technical depth in mechanical design and rapid prototyping. I'm a fast and curious learner, quick to adopt new tools, techniques, and workflows, and I take a hands-on, iterative approach that balances elegance of design with real-world performance.",
  "Beyond engineering, I am an avid sportsman. I have had the honour of representing New Zealand as captain of the Junior Paddle Blacks in canoe polo, and I spend my free time mountain biking, surfing, climbing, or chasing snow in the winter.",
  "I pride myself on my enthusiasm, ability to learn quickly, and eagerness to grow both personally and professionally as I prepare to launch my career in engineering.",
];


// ── 4. Projects ─────────────────────────────────────────────────────────
// Each project appears on the home page and has its own detail page.
//
// Fields:
//   slug        — URL (projects/<slug>.html). Lowercase, no spaces.
//   n           — display number "01", "02" …
//   title       — big title
//   tagline     — optional — short italic subtitle under the title
//   client      — small text under the title (who it was for / role)
//   tag         — category pill, e.g. "Aerospace"
//   year        — display year
//   featured    — true for the top project on the home page
//   image       — hero photo (or null if no image yet)
//   gallery     — array of image paths for the detail page's gallery (optional)
//   summary     — 1-2 sentences on the card
//   intro       — larger opening paragraph on the detail page
//   body        — array of paragraphs on the detail page
//   specs       — array of [label, value] rows in the sidebar
//   pdf         — optional — url for a project-specific PDF download

const PROJECTS = [
  {
    slug: 'coaxial-rotor',
    n: '01',
    title: 'Coaxial Rotor Optimisation',
    tagline: 'Lifting more with less.',
    client: 'Masters research · University of Canterbury',
    tag: 'Aerospace',
    year: '2026',
    featured: true,
    image: 'images/coax_cover.png',
    gallery: [],
    pdf: null,
    summary: 'A masters research project into the geometry optimisation of highly-skewed, counter-rotating, coaxial rotor systems.',
    intro: [
      'Coaxial rotor configurations offer advantages in compactness and efficiency, and highly skewed blade geometries \
      have demonstrated acoustic benefits. However, the aerodynamic complexity of coaxial systems and the novelty of highly \
      skewed rotors mean their design remains an unsolved engineering problem.'
    ],
    body: [
      'My project develops an optimisation framework to improve the chord and twist distributions of these rotors, with \
      hover figure of merit as the primary performance metric. I am building the analysis around an improved Blade Element \
      Momentum Theory (BEMT) model as the fast, optimisation-ready baseline, then extending it with a surrogate model \
      trained on higher-fidelity CFD data to capture the three-dimensional effects that BEMT cannot resolve. The workflow \
      is designed to support rapid design iteration, with geometry parameterisation, optimisation, manufacturing, and \
      experimental validation all integrated into a single process.'
      ,
      'A key part of the work is making the optimisation practical as well as accurate. I am refining the BEMT \
      implementation for speed and robustness, upgrading the aerofoil data to account for Reynolds number variation, and \
      using smooth geometry representations such as PCHIP to avoid infeasible blade shapes. The proposed designs will then \
      be prototyped using SLA 3D printing, with carbon-fibre manufacture used selectively where appropriate. Preliminary \
      work has already shown that this approach can produce realistic blade geometries, reliable prototypes, and a strong \
      basis for comparing optimised coaxial rotor designs against existing swept and straight-blade alternatives.'
    ],
    specs: [
      ['Duration', 'Masters research · 2025–2026'],
      ['Tools', 'CFD · CAD · Python'],
      ['Output', 'Thesis · Published Papers · Prototypes'],
    ],
  },
  {
    slug: 'syos',
    n: '02',
    title: 'SYOS Aerospace',
    client: 'SYOS Aerospace · Junior Engineer',
    tag: 'Aerospace',
    year: '2025',
    image: 'images/syos_cover.jpg',
    gallery: [],
    pdf: null,
    summary: 'A small, fast-moving team designing and manufacturing components for customer-ready UAS products.',
    intro: 'SYOS Aerospace develops advanced uncrewed air, ground, sea and subsurface systems for defence and \
    commercial applications. Due to the nature of the work, project details are classified.',
    body: [
      'What I can share is that I spent several months embedded in a small, fast-moving team designing and manufacturing \
      components for customer-ready UAS products. Working to tight tolerances and delivery deadlines, which I loved.'
      ,
      'One of the most challenging moments came when I was handed sole responsibility for troubleshooting a fleet of UAS \
      systems on a large customer contract that had run into issues during commissioning. Diagnosing faults across multiple \
      aircraft under time pressure, with a customer waiting, was the kind of problem that doesn\'t come easily. Working \
      through it methodically and getting the systems mission worthy was one of the most satisfying things I\'ve done.'
      ,
      'I redesigned a customer-facing Ground Control Station to improve its structural integrity, transmission reliability, \
      and usability, and designed a ~12×12m collapsible indoor drone test enclosure, built to contain a crashing UAS and \
      keep both the aircraft and any personnel safe during development testing.'
      ,
      'This role pushed me in ways that previous internships hadn\'t. The stakes were high, the team was lean, and the \
      expectation was that you\'d contribute from day one. It confirmed that I want to work in fast-moving, high-stakes \
      environments, designing exciting things that get built, tested, and used in the field.'
    ],
    specs: [
      ['Duration', '3 months'],
      ['Role', 'Junior Engineer'],
      ['Industry', 'Aerospace · Defence'],
    ],
  },
  {
    slug: 'uc-rocket', n: '03', title: 'UC Aerospace Level 1 rocket',
    client: 'Team Leader · UC Aerospace',
    tag: 'Aerospace', year: '2024',
    image: 'images/projects-cover.png', gallery: [], pdf: null,
    summary: 'Led a team to build and launch a 1.4 m rocket kit, gaining practical experience in rocket aerodynamics, fabrication, and launch procedures.',
    intro: 'Team leader for the UC Aerospace Level 1 certification rocket — a 1.4 m composite-bodied high-power rocket kit assembled and flown to altitude.',
    body: [
      'Coordinated assembly, weight-and-balance, recovery-system packing, and launch logistics with a team of undergraduates.',
      'Flew the rocket to successful apogee and recovery on certification day.',
    ],
    specs: [['Role', 'Team Leader'], ['Airframe', '1.4 m kit'], ['Year', '2024']],
  },
  {
    slug: 'wand', n: '04', title: 'W.A.N.D',
    tagline: 'Wireless Aerial Nozzle Device',
    client: 'SPS Automation · Junior Engineer (3 months)',
    tag: 'Robotics', year: '2024',
    image: 'images/projects-cover.png', gallery: [], pdf: null,
    summary: 'Wireless Aerial Nozzle Device — a dual-axis ±90° drone-mounted precision spray system, taken from concept to flight-tested proof of concept in three months.',
    intro: 'Developed W.A.N.D for drone-mounted precision spraying, from initial concept through to a flight-tested proof-of-concept product.',
    body: [
      'Designed a dual-axis nozzle actuator with ±90° simultaneous vertical and horizontal actuation, integrating LiDAR for real-time range and an IP camera for visual feedback.',
      "Engineered to SPS Automation's standard mounting interface so the payload can move between multiple aerial platforms without re-design.",
      'Delivered comprehensive documentation covering design rationale, technical specifications, assembly, SOPs, and recommended improvements.',
    ],
    specs: [
      ['Duration', '3 months'], ['Role', 'Sole designer'],
      ['Actuation', '±90° dual-axis (H × V)'],
      ['Sensing', 'LiDAR + IP camera'],
    ],
  },
  {
    slug: 'robo-saw', n: '05', title: '6-axis robotic sawblade',
    client: 'QBH',
    tag: 'Robotics', year: '2020',
    image: 'images/projects-cover.png', gallery: [], pdf: null,
    summary: 'Design and integration of a sawblade end-effector for a six-axis industrial robotic arm, with path planning and safety interlocks for repeatable cuts.',
    intro: 'End-effector and integration work for a six-axis robotic arm carrying a sawblade — exploring applications in timber cutting.',
    body: ['Focus on blade mounting, chatter control, reachability of target geometries, and safety interlocks.'],
    specs: [['Platform', '6-axis industrial arm'], ['Year', '2024']],
  },
  {
    slug: 'warman', n: '06', title: 'Warman design competition',
    client: 'University of Canterbury', tag: 'Mechatronics', year: '2023',
    image: 'images/projects-cover.png', gallery: [], pdf: null,
    summary: 'Team entry into the Warman international student design competition — a small autonomous machine that completes a materials-handling course against the clock.',
    intro: 'Warman is an annual inter-university mechatronic design competition. Teams design, build, and compete with small machines against a fixed rule set.',
    body: ["Design, prototype, and refinement of a small mechatronic vehicle to complete the competition's transport task."],
    specs: [['Competition', 'Warman'], ['Year', '2023']],
  },
  {
    slug: 'ev-post', n: '07', title: 'EV charger posts',
    client: 'Gyro Plastics', tag: 'Product Design', year: '2024',
    image: 'images/projects-cover.png', gallery: [], pdf: null,
    summary: 'Design of EV charger post enclosures with wind-loading, tamper-resistance, ease of installation, and rotational-moulding fabrication requirements all balanced.',
    intro: 'Part of a broader EV infrastructure product line at Gyro Plastics.',
    body: ['Balanced aerodynamic load on tall enclosures, cable-management access, and constraints specific to rotational moulding.'],
    specs: [['Client', 'Gyro Plastics'], ['Process', 'Rotational moulding']],
  },
  {
    slug: 'airline', n: '08', title: 'Airline design project',
    client: 'University of Canterbury', tag: 'Systems Design', year: '2023',
    image: 'images/projects-cover.png', gallery: [], pdf: null,
    summary: 'A systems-design coursework project: concept-to-proposal for a regional airline, covering fleet selection, route network, and operational model.',
    intro: 'University coursework in systems design: stepping out from pure mechanical engineering into the aerospace business context.',
    body: ['Market analysis, fleet and route optimisation, and operational trade-offs.'],
    specs: [['Discipline', 'Systems Design'], ['Year', '2023']],
  },
  {
    slug: 'pcb-enclosure', n: '09', title: 'PCB enclosure & mounting',
    client: 'Tait Communications', tag: 'Industrial Design', year: '2024',
    image: 'images/projects-cover.png', gallery: [], pdf: null,
    summary: 'Redesigned a PCB enclosure and mounting system for the software development team, replacing a dangerous and space-inefficient existing solution.',
    intro: 'Led the full design process: customer research, concept development, iterative prototyping, manufacturing, and testing.',
    body: ['Produced detailed handoff documentation to ensure continuity of the project after departure. Collaborated with diverse, multi-disciplined teams.'],
    specs: [['Duration', '3 months'], ['Role', 'Junior Engineer']],
  },
  {
    slug: 'ev-kiosk', n: '10', title: 'EV charging kiosks & bollards',
    client: 'Gyro Plastics', tag: 'Product Design', year: '2024',
    image: 'images/projects-cover.png', gallery: [], pdf: null,
    summary: 'Designed EV charging kiosks and impact-protection bollards from R&D through to manufacturing processes and production units.',
    intro: 'Product design work across the Gyro Plastics infrastructure range.',
    body: ['Impact protection bollards developed all the way through to manufacturing and production units. EV charging kiosks balanced wind loading, tamper resistance, ease of installation, and mould fabrication requirements.'],
    specs: [['Client', 'Gyro Plastics'], ['Process', 'Rotational moulding']],
  },
  {
    slug: 'gearbox', n: '11', title: 'Gearbox design',
    client: 'University coursework', tag: 'Mechanical', year: '2023',
    image: 'images/projects-cover.png', gallery: [], pdf: null,
    summary: 'A full gearbox design exercise — gear ratios, shaft sizing, bearing selection, and housing design against a specified input/output specification.',
    intro: 'Standard machine-design coursework — stepping through every calculation and drawing required for a complete gearbox.',
    body: ['From input specification to fully dimensioned assembly drawings and a bill of materials.'],
    specs: [['Discipline', 'Machine Design'], ['Year', '2023']],
  },
  {
    slug: 'al-structure', n: '12', title: 'Aluminium structure',
    client: 'University coursework', tag: 'Structural', year: '2023',
    image: 'images/projects-cover.png', gallery: [], pdf: null,
    summary: 'Structural analysis and design of an aluminium space frame, covering FEA, weld detailing, and connection design.',
    intro: 'Coursework in structural design, applied to a welded aluminium frame.',
    body: ['Finite-element analysis of the frame under applied loads, weld sizing, and detailed connection drawings.'],
    specs: [['Material', 'Aluminium'], ['Year', '2023']],
  },
  {
    slug: 'cnc', n: '13', title: 'CNC machining production',
    client: 'Automatic Lathes (3 months)', tag: 'Manufacturing', year: '2022',
    image: 'images/projects-cover.png', gallery: [], pdf: null,
    summary: 'Set up, operated, and maintained CNC mills and lathes in a production environment. Responsible for cutting, deburring, quality checking, and workshop upkeep.',
    intro: 'Three months on the shop floor of a CNC job shop — hands-on production experience.',
    body: ['Setup and operation of CNC mills and lathes. Quality control, deburring, and workshop maintenance.'],
    specs: [['Duration', '3 months'], ['Role', 'CNC Machinist']],
  },
  {
    slug: 'hinge', n: '14', title: 'Hinge material selection',
    client: 'University coursework', tag: 'Materials', year: '2023',
    image: 'images/projects-cover.png', gallery: [], pdf: null,
    summary: 'Materials-selection study for a hinge application — comparing candidate alloys and polymers against cost, fatigue life, and manufacturability.',
    intro: 'Materials engineering coursework.',
    body: ['Ashby-chart method across stiffness, strength, fatigue, and cost dimensions.'],
    specs: [['Discipline', 'Materials'], ['Year', '2023']],
  },
  {
    slug: 'bearing', n: '15', title: 'Bearing housing',
    client: 'University coursework', tag: 'Mechanical', year: '2022',
    image: 'images/projects-cover.png', gallery: [], pdf: null,
    summary: 'Design and manufacture of a bearing housing — from CAD through to a machined physical part.',
    intro: 'Coursework project taking a bearing housing design all the way to a finished component.',
    body: ['CAD, tolerance stack-up, and machining.'],
    specs: [['Discipline', 'Machine Design'], ['Year', '2022']],
  },
  {
    slug: 'drilling-fixture', n: '16', title: 'Drilling fixture',
    client: 'Workshop project', tag: 'Manufacturing', year: '2022',
    image: 'images/projects-cover.png', gallery: [], pdf: null,
    summary: 'A reusable drilling fixture for repeatable hole patterns on a family of parts — quick-clamping, swap-plate design.',
    intro: 'Workshop project focused on production efficiency.',
    body: ['Quick-clamp layout, swappable drill plates, and a simple datum scheme.'],
    specs: [['Discipline', 'Manufacturing'], ['Year', '2022']],
  },
];


// ── 5. Hobbies ──────────────────────────────────────────────────────────
// Each hobby has its own detail page at hobbies/<slug>.html.
// Fields mirror PROJECTS: slug, n, title, tag, year, image, summary,
// intro, body (array of paragraphs), specs (array of [label, value]).

const HOBBIES = [
  { slug: 'canoe-polo',
    n: '01', title: 'Canoe polo', tag: 'International Sport', year: '2016–2025',
    context: 'NZ U21 Paddle Blacks — captain, gold at 2019 JIC (N. Ireland); 6th at 2022 Worlds (France); gold at 2023 Oceania.',
    image: 'images/hobbies-cover.jpg',
    intro: 'Canoe polo is the sport that shaped me. Five-a-side, played in kayaks on a 35 × 23 m water court, it rewards reading the game, communicating under pressure, and being relentlessly fit.',
    body: [
      'I have represented New Zealand on the U21 Paddle Blacks since 2016 — including a gold medal at the 2019 Junior International Cup (Northern Ireland), 6th at the 2022 World Championships (France), and gold at the 2023 Oceania Championships, where I captained the side.',
      'Off the water I have volunteered for years at club level as a referee and coach — giving back to a community that gave me everything.',
    ],
    specs: [
      ['Position', 'Centre · Captain'],
      ['Highlights', '2019 JIC gold · 2023 Oceania gold (captain)'],
      ['Worlds', '6th · France 2022'],
    ],
  },
  { slug: 'skiing',
    n: '02', title: 'Skiing', tag: 'Southern Alps', year: 'Every winter',
    context: "Deep powder days around Craigieburn, Porters, and the Club Fields — the reward for a good winter.",
    image: 'images/hobbies-cover.jpg',
    intro: "The Southern Alps are an hour and a half from my front door, and every winter weekend the alarm goes off at 5am.",
    body: [
      "I cut my teeth on the Canterbury club fields — Craigieburn, Broken River, Mount Olympus — where the chairlifts are nutcracker rope tows and the terrain rewards anyone willing to skin for it.",
      "Off-piste tree skiing in deep powder is the reward; sharing a thermos of soup at the top of a ridgeline with mates is the reason.",
    ],
    specs: [['Home hill', 'Craigieburn / Porters'], ['Style', 'Off-piste · Backcountry']],
  },
  { slug: 'mountain-biking',
    n: '03', title: 'Mountain biking', tag: 'Trail / Enduro', year: 'Year-round',
    context: "Christchurch's Port Hills and the South Island's trail network.",
    image: 'images/hobbies-cover.jpg',
    intro: "Christchurch sits at the foot of the Port Hills — a 30-minute pedal from the city to a network of trails that goes on for days.",
    body: [
      "I ride enduro — long pedally climbs and fast technical descents. Favourites are the Port Hills' Vic Park network and the South Island bigger-mountain trails around Queenstown and Wanaka.",
    ],
    specs: [['Discipline', 'Enduro / Trail'], ['Home', 'Port Hills, Christchurch']],
  },
  { slug: 'surfing',
    n: '04', title: 'Surfing', tag: 'East Coast', year: 'Year-round',
    context: 'Canterbury and Kaikoura coasts.', image: 'images/hobbies-cover.jpg',
    intro: "The Canterbury and Kaikoura coasts deliver consistent surf year-round — and a wetsuit thick enough makes winter the best season.",
    body: ["Mostly shortboard, mostly cold water, mostly with a thermos in the car park afterwards."],
    specs: [['Break', 'Sumner / Taylors / Mangamaunu'], ['Board', 'Shortboard']],
  },
  { slug: 'climbing',
    n: '05', title: 'Climbing', tag: 'Rock / Alpine', year: 'Year-round',
    context: 'Single-pitch sport and longer alpine objectives.',
    image: 'images/hobbies-cover.jpg',
    intro: "Sport climbing at the local crags, alpine objectives in the Southern Alps when the weather and the time allow.",
    body: ["Climbing scratches the same problem-solving itch as engineering — every route is a puzzle, and every fall is data."],
    specs: [['Style', 'Sport · Alpine'], ['Local crags', 'Castle Hill · Charleston']],
  },
  { slug: 'coaching',
    n: '06', title: 'Coaching & refereeing', tag: 'Community', year: 'Volunteer',
    context: 'Volunteered as referee and coach at club level canoe polo.',
    image: 'images/hobbies-cover.jpg',
    intro: "Volunteer referee and coach for canoe polo at club and regional level.",
    body: ["Coaching juniors and reffing weekend tournaments — passing on what was passed on to me."],
    specs: [['Role', 'Referee · Coach'], ['Level', 'Club · Regional']],
  },
];


// ── 6. Resume ───────────────────────────────────────────────────────────
const RESUME = {
  pdf: 'https://c314a8d1-8174-43e4-879a-fd7bfad2e99b.filesusr.com/ugd/f45621_d99ade0ceb1f41a5b1f0043b400b41c2.pdf',
  heading: 'Graduate mechanical engineer.',
  summary: '2+ years of research and development work experience across design, prototyping, testing, and manufacturing. Impassioned by finding creative solutions to design, automation, and optimisation problems. An avid sportsperson — captain of the Junior Paddle Blacks, plus mountain biking, surfing, hiking, and snow year-round.',
  competences: ['Creative Problem Solving', 'Fast Learning', 'Clear Communication'],
  jobs: [
    { role: 'Junior Engineer', where: 'SYOS Aerospace', tag: 'AEROSPACE', dur: '3 months', bullets: [
      'Designed and manufactured components for customer-ready UAS products, working to tight tolerances and delivery standards.',
      'Sole troubleshooter on a customer contract following commissioning issues — diagnosed and resolved faults across systems under time pressure.',
      'Designed a ~12×12 m drone test enclosure to allow safe indoor UAS flight testing.',
      'Redesigned a customer-facing Ground Control Station for improved structural integrity, transmission reliability, and operator usability.',
      'Produced technical documentation in line with customer and project requirements.',
    ]},
    { role: 'Junior Engineer', where: 'SPS Automation', tag: 'AEROSPACE', dur: '3 months', bullets: [
      'Developed the Wireless Aerial Nozzle Device (W.A.N.D) for drone-mounted precision spraying, from initial concept through to a flight-tested proof-of-concept.',
      'Designed a dual-axis nozzle actuator with ±90° simultaneous vertical and horizontal actuation, integrating LiDAR and an IP camera for real-time range and visual feedback.',
      "Engineered to SPS Automation's standard mounting interface, enabling compatibility across multiple aerial platforms.",
      'Delivered comprehensive documentation covering design rationale, technical specifications, assembly, SOPs, and recommended improvements.',
    ]},
    { role: 'Junior Engineer', where: 'Tait Communications', tag: 'CRITICAL COMMS', dur: '3 months', bullets: [
      'Redesigned a PCB enclosure and mounting system for the software development team, replacing a dangerous and space-inefficient existing solution.',
      'Led the full design process: customer research, concept development, iterative prototyping, manufacturing, and testing.',
      'Produced detailed handoff documentation to ensure continuity of the project after departure.',
      'Collaborated and learnt from diverse, multi-disciplined teams.',
    ]},
    { role: 'Junior Engineer', where: 'Gyro Plastics', tag: 'ELECTRICAL INFRA', dur: '6 months', bullets: [
      'Conducted R&D on 10+ new and existing products guiding ideas through every development stage.',
      'Facilitated the design and implementation of workshop process and equipment improvements.',
      'Developed impact protection bollards all the way through to manufacturing processes and production units.',
      'Designed EV charging kiosks, balancing wind loading, tamper resistance, ease of installation, and mould fabrication requirements.',
      'Managed a hybrid remote/in-person work model across two locations.',
    ]},
    { role: 'CNC Machining', where: 'Automatic Lathes', tag: 'MANUFACTURING', dur: '3 months', bullets: [
      'Set up, operated, and maintained CNC mills and lathes in a production environment.',
      'Responsible for cutting, deburring, quality checking, and workshop upkeep.',
    ]},
    { role: 'Research and Development', where: 'QuickBuild Homes', tag: 'HOUSING', dur: '12 months', bullets: [
      'Contributed across machine programming, 3D modelling, product design, 3D printing, factory work, graphic design, conceptual site plans, 3D rendering and visualisation for prefab housing manufacture.',
    ]},
  ],
  skills: {
    tech: [
      ['Engineering software', 'SolidWorks · ANSYS · Onshape · Fusion 360 · Creo · Mastercam · VISI · Archicad · Python'],
      ['CNC tools', '3D printers · mills · lathes · saws'],
      ['Manual tools', 'lathes · bandsaws · drill presses · soldering irons · hand tools'],
      ['Visualisation', 'Photoshop · Lumion'],
      ['Licences', 'NZ Class 1 · CAD / CAM / CNC certificates (cncexpert.com/jago-alcock)'],
    ],
    soft: [
      ['Fast Learning', 'Picked up and trusted with new responsibilities quickly across every role, despite limited prior experience. One of the qualities I am most proud of.'],
      ['Problem Solving', 'Successfully tackled a wide range of design challenges using diverse techniques.'],
      ['Communication & Teamwork', 'Lifelong involvement in international team sport has sharpened my ability to communicate and collaborate effectively, including under pressure.'],
      ['Leadership', 'Held various leadership roles (House Captain, Sports Captain, Captain of the NZ U21 Canoe Polo team).'],
    ],
  },
  achievements: [
    ["Vice Chancellor's Excellence Scholarship", 'For academic excellence, leadership, and community engagement on entry to Massey University.'],
    ['Academy of Sport Scholarship',             'For student-athletes with high achievement and future potential in their sport.'],
    ['Ken Whybrew Memorial Prize',               'For excellence in Manufacturing Technology.'],
    ['Contel Charitable Trust Masters Scholarship', 'General character, leadership, communication, and academic achievement.'],
    ['Courtney Shearer Memorial Scholarship',    'For Mechanical Engineering students, preference for those who worked before university.'],
    ['Blues Award (×2)',                         'Students who excel in sport, arts, and community engagement.'],
    ['CWF Hamilton Masters Scholarship',         'For academic achievement and research potential in Mechanical Engineering.'],
    ['Caliber Design Prize',                     'For excellence by BE(Hons) students of Mechanical Engineering at UC.'],
    ["Principal's Excellence Award",             'Commitment to academic success.'],
  ],
  community: [
    ['2025 — Tutor, Controls & Vibrations',   'Taught undergraduates at the University of Canterbury.'],
    ['2024 — Team Leader, UC Aerospace Level 1', 'Led a team in building and launching a 1.4 m rocket kit.'],
    ['2016–2025 — Canoe Polo',                "Represented NZ U21 Men's team: gold 2019 JIC (Northern Ireland); bronze 2022; 6th at 2022 Worlds (France). Captained NZ U21 to 1st at 2023 Oceania. Volunteer referee and coach at club level."],
  ],
  referees: [
    ['Jake Tisdale', 'SYOS Aerospace · Mechanical Department Lead',     'jake.tisdale@syos-aerospace.com', '+64 22 165 3681'],
    ['Trudi Duncan', 'Gyro Plastics · Managing Director',               'trudi.duncan@gyroplastics.com',   '+64 27 258 0026'],
    ['Jordie Peters','MotorSport NZ / Liam Lawson Motorsport · Digital/Media Manager', 'jordie.p1@icloud.com', '+64 27 479 1510'],
  ],
};


// ── 7. Supporting documents ─────────────────────────────────────────────
// Two parts:
//
// RECOMMENDATIONS — letters of recommendation. Each shows as a card with
// a heading, a PDF download button, and a body excerpt or summary.
//   Fields:
//     name    — referee's name
//     role    — referee's role / company
//     pdf     — link to the PDF
//     date    — optional, shown small
//     excerpt — body of the card. Use \n\n between paragraphs.
//
// OTHER_DOCS — academic transcripts, certificates, additional PDFs.
//   Fields:
//     title — document name
//     url   — link to the file
//     note  — one-line description (optional)

const RECOMMENDATIONS = [
  {
    name: 'Jake Tisdale',
    role: 'Mechanical Department Lead · SYOS Aerospace',
    pdf: '#',
    date: 'October 2025',
    excerpt:
      "Jago joined SYOS Aerospace as a Junior Engineer for a three-month placement and quickly proved himself a capable, self-directed contributor across our UAS programmes. He was trusted as the sole troubleshooter on a customer contract following commissioning issues, diagnosing and resolving faults under significant time pressure.\n\nHe designed a 12 × 12 m drone test enclosure for safe indoor flight testing and led a redesign of a customer-facing Ground Control Station, improving structural integrity, transmission reliability, and operator usability. I would not hesitate to recommend Jago for any junior engineering role.",
  },
  {
    name: 'Trudi Duncan',
    role: 'Managing Director · Gyro Plastics',
    pdf: '#',
    date: 'August 2024',
    excerpt:
      "Over six months Jago contributed to R&D on more than ten products spanning electrical infrastructure and EV charging hardware. He took ideas from concept through to manufacturing-ready production units, including impact-protection bollards and a range of EV charging kiosks.\n\nWhat sets Jago apart is the speed at which he absorbs new information and turns it into useful output, and the calm, considered way he handles a hybrid remote/in-person workload across two sites. He's a genuine pleasure to work with.",
  },
  {
    name: 'Jordie Peters',
    role: 'Digital / Media Manager · MotorSport NZ · Liam Lawson Motorsport',
    pdf: '#',
    date: 'July 2024',
    excerpt:
      "I've known Jago for many years through both sport and motorsport circles. He combines a sharp technical mind with the kind of communication skills you only build by captaining international teams — clear under pressure, always positive, and unfailingly considerate of those around him.\n\nAny employer would be lucky to have him. He's the rare person who is equally at home in a workshop, in front of a CAD station, or in front of a room.",
  },
];

const OTHER_DOCS = [
  { title: 'Full PDF Resume',
    url: 'https://c314a8d1-8174-43e4-879a-fd7bfad2e99b.filesusr.com/ugd/f45621_d99ade0ceb1f41a5b1f0043b400b41c2.pdf',
    note: 'Up-to-date resume.' },
  { title: 'BE(Hons) Academic Transcript', url: '#',
    note: 'University of Canterbury — first-class honours.' },
  { title: 'CAD / CAM / CNC Certificates',
    url: 'https://cncexpert.com/jago-alcock',
    note: 'Technical training record.' },
  { title: 'Te Tāmure Award Certificate', url: '#',
    note: 'Service & leadership recognition.' },
  { title: 'W.A.N.D Technical Documentation', url: '#',
    note: 'Design rationale, specifications, assembly, and SOPs.' },
  { title: 'Selected CAD Drawings', url: '#',
    note: 'A sampling of production-ready drawings.' },
];


// Export everything to window so the page scripts can use it.
Object.assign(window, {
  SITE_INFO, INTRO_STATS, INTRO_TEXT,
  ABOUT_HEADING, ABOUT_SUBHEADING, ABOUT_PHOTO, ABOUT_PHOTO_POSITION, ABOUT_TEXT,
  PROJECTS, HOBBIES, RESUME,
  RECOMMENDATIONS, OTHER_DOCS,
});
