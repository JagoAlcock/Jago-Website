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
// PARAGRAPH BREAKS IN body: [...]
// ────────────────────────────────
//  • Each array entry = one paragraph on screen.
//  • To wrap a long paragraph across multiple editor lines without creating
//    a visible paragraph gap, use backticks (template literal) instead of quotes:
//
//      body: [
//        `This is one long paragraph that you can wrap across
//  multiple lines in the editor — it renders as a single
//  unbroken paragraph in the browser.`,
//        'This starts a new visible paragraph.',
//      ]
//
//  The browser collapses line-break whitespace to a single space.
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
//   1. Put the image file in the `images/` folder (e.g. images/wand-hero.jpg).
//   2. Reference it as a string in the gallery array:
//        gallery: ['images/wand-hero.jpg']
//   Portrait vs landscape is detected automatically.
//
// ADDING A SHORT VIDEO CLIP (self-hosted, autoplay loop, no sound)
// ────────────────────────────────────────────────────────────────
//   1. Put the .mp4 file in the `images/` folder (e.g. images/demo.mp4).
//      Keep clips short — aim for under 8 MB.
//   2. Reference it like any image; the .mp4 extension is detected automatically:
//        gallery: ['images/demo.mp4']
//   Optionally add a poster thumbnail (shown before the video loads):
//        gallery: [{ src: 'images/demo.mp4', poster: 'images/demo-poster.jpg' }]
//   Portrait vs landscape is detected automatically from the video dimensions.
//
// ADDING A YOUTUBE / VIMEO EMBED
// ───────────────────────────────
//   Use the embed URL (not the watch URL) as a gallery entry:
//        gallery: [{ src: 'https://www.youtube.com/embed/VIDEO_ID' }]
//        gallery: [{ src: 'https://player.vimeo.com/video/VIDEO_ID' }]
//   Defaults to 16:9 landscape. For vertical/portrait video (e.g. YouTube Shorts):
//        gallery: [{ src: 'https://www.youtube.com/embed/VIDEO_ID', aspect: '9/16' }]
//   The embed tiles in the gallery grid alongside images and clips.
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
  { value: '26+', label: 'months of R&D experience' },
  { value: null, label: 'engineering industries', prefix: 'over' },
  { value: 'BE(Hons)',
    label: 'First-Class Honours\nMechanical Engineering Major\nAerospace Engineering Minor' },
];

const INTRO_TEXT =
  `Kia ora — I'm a {accent}graduate mechanical engineer{/accent} based in Christchurch,
  New Zealand, with 2+ years of R&D experience across aerospace, robotics, automation and
  more. I like to work on the cutting edge, in fast paced, exciting environments.`;


// ── 3. About-page text ──────────────────────────────────────────────────
// Each paragraph is one string. Add, remove, or reorder freely.
// Wrap words in {accent}…{/accent} to highlight them in your accent colour.

const ABOUT_HEADING = "Kia ora,";
const ABOUT_SUBHEADING = "my name is Jago.";
const ABOUT_PHOTO = 'images/profile.jpg';
// How the photo is cropped: 'top' keeps head/face visible, 'center' centres the subject.
const ABOUT_PHOTO_POSITION = 'center 20%';

const ABOUT_TEXT = [
  `I was born on a small Royal Air Force base in England before moving to New Zealand, where
  I have spent most of my schooling. From my earliest days in primary school, I have been
  fascinated by design and how things work — teaching myself CAD long before high school and
  always sketching in the margins of my notebooks.`,
  `This early passion for design naturally evolved into a keen interest in aerospace,
  motorsport, and optimisation, driving me to pursue a degree in mechanical engineering with
  a minor in aerospace. I have recently graduated with {accent}first-class honours{/accent},
  and have 2+ years of research and development work experience. I am impassioned by finding
  creative solutions to complex challenges in design, automation, and optimisation.`,
  `I've contributed to a wide range of projects, from multi-axis spray systems for UAVs to
  sawblades mounted on six-axis robotic arms, developing technical depth in mechanical design
  and rapid prototyping. I'm a fast and curious learner, quick to adopt new tools, techniques,
  and workflows, and I take a hands-on, iterative approach that balances elegance of design
  with real-world performance.`,
  `Beyond engineering, I am an avid sportsman. I have had the honour of representing New
  Zealand as captain of the Junior Paddle Blacks in canoe polo, and I spend my free time
  mountain biking, surfing, climbing, or chasing snow in the winter.`,
  `I pride myself on my enthusiasm, ability to learn quickly, and eagerness to grow both
  personally and professionally as I prepare to launch my career in engineering.`,
];


// ── 4. Projects ─────────────────────────────────────────────────────────
// Each project appears on the home page and has its own detail page.
//
// Fields:
//   slug        — URL (projects/<slug>.html). Lowercase, no spaces.
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
    title: 'Coaxial Rotor Optimisation',
    tagline: 'Lifting more with less.',
    client: 'University of Canterbury · Masters Researcher',
    tag: 'Aerospace',
    year: '2026',
    featured: true,
    image: 'images/coax_cover.png',
    gallery: [
      'images/coax_cover.png',
      'images/coax_poster.png',
      'images/coax_experiment.jpg',
      'images/coax_blades.png',
      'images/coax_bayesopt.png',
      'images/coax_TP.png',
    ],
    pdf: null,
    summary: `A masters research project into the geometry optimisation of highly-skewed,
      counter-rotating, coaxial rotor systems.`,
    intro: `Coaxial rotor configurations offer advantages in compactness and efficiency, and
      highly skewed blade geometries have demonstrated acoustic benefits. However, the
      aerodynamic complexity of coaxial systems and the novelty of highly skewed rotors mean
      their design remains an unsolved engineering problem.`,
    body: [
      `My project develops an optimisation framework to improve the chord and twist
      distributions of these rotors, with hover figure of merit as the primary performance
      metric. I am building the analysis around an improved Blade Element Momentum Theory
      (BEMT) model as the fast, optimisation-ready baseline, then extending it with a surrogate
      model trained on higher-fidelity CFD data to capture the three-dimensional effects that
      BEMT cannot resolve. The workflow is designed to support rapid design iteration, with
      geometry parameterisation, optimisation, manufacturing, and experimental validation all
      integrated into a single process.`,
      `A key part of the work is making the optimisation practical as well as accurate. I am
      refining the BEMT implementation for speed and robustness, upgrading the aerofoil data
      to account for Reynolds number variation, and using smooth geometry representations such
      as PCHIP to avoid infeasible blade shapes. The proposed designs will then be prototyped
      using SLA 3D printing, with carbon-fibre manufacture used selectively where appropriate.
      Preliminary work has already shown that this approach can produce realistic blade
      geometries, reliable prototypes, and a strong basis for comparing optimised coaxial rotor
      designs against existing swept and straight-blade alternatives.`,
    ],
    specs: [
      ['Duration', '1 Year · 2025-2026'],
      ['Role', 'Researcher'],
      ['Skills', 'Researching · Time Management · Problem Solving · Communication'],
      ['Tools', 'CFD · CAD · Python · Composite Manufacturing · Testing · Documentation'],
      ['Output', 'Thesis · Published Papers · Prototypes'],
      ['Industry', 'Aerospace'],
    ],
  },
  {
    slug: 'syos',
    title: 'SYOS Aerospace',
    tagline: 'Defining "agnostic".',
    client: 'SYOS Aerospace · Junior Engineer',
    tag: 'Aerospace',
    year: '2025',
    image: 'images/syos_sa200.jpg',
    gallery: [
      'images/syos_sa200.jpg',
      'images/syos_interns.jpg',
      'images/syos_sm300.jpg',
      'images/syos_sa7.png',
      'images/syos_sg400.png',
      'images/syos_sa1.jpg',
    ],
    pdf: null,
    summary: `A small, fast-moving team designing and manufacturing components for
      customer-ready UAS products.`,
    intro: `SYOS Aerospace develops advanced uncrewed air, ground, sea and subsurface systems
      for defence and commercial applications. Due to the nature of the work, many project
      details are classified.`,
    body: [
      `What I can share is that I spent several months embedded in a small, fast-moving team
      designing and manufacturing components for customer-ready UAS products, working to tight
      tolerances and delivery deadlines — which I loved.`,
      `One of the most challenging moments came when I was handed sole responsibility for
      troubleshooting a fleet of UAS systems on a customer contract that had run into issues
      during commissioning. Diagnosing faults across multiple aircraft under time pressure,
      with a customer waiting, was not easy. Working through it methodically and getting the
      systems mission worthy was one of the most satisfying things I've done.`,
      `I also redesigned a customer-facing Ground Control Station (GCS) to improve its
      structural integrity, transmission reliability, and usability, and designed a large
      collapsible indoor drone test enclosure to contain a crashing UAS and keep both the
      aircraft and personnel safe during development testing.`,
      `This role pushed me in ways that previous internships hadn't. The stakes were high,
      the team was lean, and the expectation was that you'd contribute from day one. It
      confirmed that I want to work in fast-moving, high-stakes environments, designing
      exciting things that get built, tested, and used in the field.`,
    ],
    specs: [
      ['Duration', '3 Months'],
      ['Role', 'Junior Engineer'],
      ['Skills', 'Fast Learning · Time Management · Team Work · Problem Solving'],
      ['Tools', 'CAD · Manufacturing · 3D Printing · Soldering/Wiring · '
               + 'Testing · Troubleshooting · Documentation'],
      ['Industry', 'Aerospace · Defence'],
    ],
  },
  {
    slug: 'uc-rocket',
    title: 'UC Aerospace Level 1 Rocket',
    tagline: 'What goes up, must come down.',
    client: 'UC Aerospace · Student',
    tag: 'Aerospace',
    year: '2024',
    image: 'images/rocket_landscape.png',
    gallery: ['images/rocket_landscape.png', 'images/rocket_portrait.png', 'images/rocket_jago.jpg'],
    pdf: null,
    summary: `Led a team to build and launch a 1.4 m rocket kit, gaining practical experience
      in rocket aerodynamics, fabrication, and launch procedures.`,
    intro: `The University of Canterbury's Level 1 Rocket programme is an initiative of the
      UC Aerospace Club, providing students with a hands-on introduction to high-powered
      rocketry through constructing and launching a 1.4-metre-tall rocket kit.`,
    body: [
      `As team leader, I coordinated a group of students with often-conflicting ideas and
      workload expectations, ensuring clear communication of priorities and deadlines.
      Witnessing the rocket lifting off, following its flight profile, and being recovered
      successfully on launch day was an immensely rewarding culmination of our efforts.`,
      `The project also provided an opportunity to demonstrate leadership and conflict
      management, apply hands-on composite-manufacturing skills, and manage a schedule under
      time constraints.`,
    ],
    specs: [
      ['Role', 'Team Leader'],
      ['Skills', 'Leadership · Time Management · Team Work'],
      ['Tools', 'Composite Manufacturing · Painting/Finishing · Testing'],
      ['Output', '1.4 m Rocket'],
    ],
  },
  {
    slug: 'wand',
    title: 'W.A.N.D',
    tagline: 'Wireless Aerial Nozzle Device',
    client: 'SPS Automation · Junior Engineer',
    tag: 'Robotics',
    year: '2024',
    image: 'images/wand_cover.jpg',
    gallery: [
      'images/wand_cover.jpg',
      'images/wand_full.jpg',
      'images/wand_end.jpg',
      'images/wand_drone.jpg',
      'images/wand_cables.jpg',
      'images/wand_internals.jpg',
    ],
    pdf: null,
    summary: `Wireless Aerial Nozzle Device — a dual-axis ±90° drone-mounted precision spray
      system, taken from concept to flight-tested proof of concept product in three months.`,
    intro: `I co-led the design of a drone-mounted spraying system featuring a multi-axis
      nozzle actuator with 90° simultaneous vertical and horizontal movement, integrated
      LiDAR, and an IP camera to provide the operator with real-time range and visual data.`,
    body: [
      `From initial concept, defining requirements, selecting actuators, and specifying
      sensors, through to a flight-ready prototype and final proof-of-concept, I balanced
      the needs for functionality, compactness and weight savings.`,
      `A major challenge was achieving a lightweight link between the actuators and the
      nozzle mounted metres away on the end of the boom. Our initial carbon-fibre
      push/pull-rod approach introduced linkage complexity, restricted motion, and backlash.`,
      `We resolved this by switching to a cable-actuated mechanism, which eliminated those
      issues while maintaining full articulation. Throughout the project, I applied mechanical
      design, electronics integration, rapid prototyping (SLA and FDM 3D printing, laser
      cutting), and field testing to deliver a robust, user-friendly prototype ready for
      demonstrations.`,
    ],
    specs: [
      ['Duration', '3 months'],
      ['Role', 'Junior Engineer'],
      ['Skills', 'Time Management · Team Work · Problem Solving'],
      ['Tools', 'CAD · 3D Printing · Laser Cutting · Soldering/Wiring · '
               + 'Assembly · Testing · Documentation'],
      ['Industry', 'Robotics · Aerospace'],
      ['Output', 'Proof of Concept Product'],
    ],
  },
  {
    slug: 'robo-saw',
    title: '6-Axis Robotic Sawblade',
    tagline: 'Gantries are overrated.',
    client: 'QBH · Junior Engineer',
    tag: 'Robotics',
    year: '2020',
    image: 'images/robot_still.png',
    gallery: ['images/robot_still.png', 'images/robot_video1.mp4', 'images/robot_video2.mp4'],
    pdf: null,
    summary: `Design and integration of a six-axis industrial robotic arm, for cutting
      composite panels.`,
    intro: `I led the research, concept development, and troubleshooting for an automated
      composite-panel cutting cell built around a six-axis robot, embracing the unconventional
      restriction of using a robot arm over a gantry system to maximise the "cool" factor.
      I crafted modular cell layouts that support future expansion, selected a robot with the
      required reach and payload capacity, and evaluated end-effector options (again being
      overruled and adapting to a very cool, large saw blade).`,
    body: [
      `With the hardware in place, I programmed robot toolpaths, including tool changes,
      cutting sequences, and vacuum-table toggling. The greatest technical hurdle was saw
      blade deflection and drift during long cuts.`,
      `To tackle this, I designed and ran systematic tests, varying cut depths, feed rates,
      and cut direction, to characterise the inconsistencies. Analysing the results, I homed
      in on more precise offsets and optimised cutting parameters, reducing the deviation to
      within satisfactory tolerances.`,
      `Despite starting with no prior robotics or industrial-automation experience, I rapidly
      acquired programming and system-integration skills, highlighting my ability and eagerness
      to learn. This project showcases my aptitude for fast learning, concept generation,
      automation, optimisation, and adaptation when project constraints or senior directors
      enforce adjustments.`,
    ],
    specs: [
      ['Duration', '6 months'],
      ['Role', 'Junior Engineer'],
      ['Skills', 'Researching · Problem Solving · Troubleshooting · Communication'],
      ['Tools', 'CAD · Programing · Testing'],
      ['Industry', 'Robotics'],
      ['Output', 'Automated Cutting Cell'],
    ],
  },
  {
    slug: 'warman',
    title: 'Warman Design Competition',
    tagline: 'The only team to shoot.',
    client: 'University of Canterbury · Student',
    tag: 'Robotics',
    year: '2023',
    image: 'images/warman_jack.jpg',
    gallery: [
      'images/warman_team.jpg',
      // {src: 'https://www.youtube.com/embed/qjdliHz-yIQ?si=Iafmf4PO7P3imbRt'},
      'images/warman_video1.mp4',
      'images/warman_video2.mp4',
      'images/warman_will.jpg',
      'images/warman_jago.jpg',
      'images/warman_jack.jpg',
      'images/warman_drawing.png'
    ],
    pdf: null,
    summary: `Entry into the Warman international student design competition — an autonomous
      machine that completes a materials-handling course against the clock.`,
    intro: `The Warman Design and Build Competition is a student competition where teams
      design, build, and compete with devices that solve a specific engineering problem.
      Our challenge was collecting squash and tennis balls and distributing them into
      tubes to score points.`,
    body: [
      `We stood out as the only team to "shoot" our squash balls rather than manually
      place them, which although not winning us the competition, drew enthusiastic applause
      for our novel approach.`,
      `Early prototypes suffered from inconsistent launch velocities and erratic trajectories,
      so we developed a flywheel shooter using a brushless drone motor to spin a 3D-printed
      wheel, imparting precise, repeatable energy to each ball. Through iterative CAD
      refinements, motor-controller tuning, and countless test shots, we managed to reduce
      the shot-to-shot variance to under 5% and successfully scored all three balls in
      competition.`,
      `This project sharpened my mechanical design and system-integration skills, reinforced
      rapid-prototyping techniques (laser cutting, 3D printing, manual tools), and honed my
      leadership skills during stressful days, long nights and tight deadlines.`,
    ],
    specs: [
      ['Role', 'Team Leader'],
      ['Skills', 'Time Management · Team Work · Problem Solving'],
      ['Tools', 'CAD · 3D Printing · Laser Cutting · Soldering/Wiring · Assembly · Testing'],
      ['Industry', 'Robotics'],
    ],
  },
  {
    slug: 'ev-post',
    title: 'EV Charger Posts',
    tagline: 'From impossible to batch runs.',
    client: 'Gyro Plastics · Junior Engineer',
    tag: 'Process Design',
    year: '2023',
    image: 'images/post_cover.jpg',
    gallery: [
      'images/post_cover.jpg',
      'images/post_making.jpg',
      'images/post_production.jpg',
      'images/post_product.png',
      'images/post_options.png',
      'images/post_clamped.jpg',
      'images/post_hole.jpg',
    ],
    pdf: null,
    summary: 'Leading the in-house manufacturing process design for EV charger posts.',
    intro: `I led the development of an in-house machining process for aluminium and
      stainless-steel EV charger posts using a CNC router only designed for wood and aluminium.`,
    body: [
      `After researching high-speed machining practices, assessing tool geometries, coatings,
      feeds-and-speeds, and conducting cost-benefit analyses on tool life, I identified the
      most economical cutting tools and strategies for each material.`,
      `I then designed and fabricated a versatile fixture that rigidly clamps round, square,
      aluminium, or steel posts close to the cutting bit, maximising batch throughput and
      minimising chatter.`,
      `The greatest technical challenge was cutting stainless steel without coolant on a
      machine not optimised for metal. Through iterative fixture refinements, countless tests
      and careful tuning of spindle speeds and feed rates, I achieved smooth, accurate cuts
      while preserving machine health.`,
      `I also addressed stakeholder scepticism by guiding a senior engineer, initially
      convinced the task was impossible, through comprehensive research and data-driven test
      results, ultimately winning his support and, in the end, enthusiasm.`,
      `Today, hundreds of EV posts are machined in-house using my process, tooling, and
      fixture, saving thousands of dollars per batch in outsourced machining costs.`,
      `This project demonstrates my ability to conduct in-depth research and data-driven
      decision-making, as well as to design and fabricate practical designs that integrate
      with existing machinery. It also highlights my machining knowledge, and my skills in
      iterative refinement, problem-solving unconventional problems, and stakeholder
      management through clear, evidence-based communication.`,
    ],
    specs: [
      ['Role', 'Junior Engineer'],
      ['Skills', 'Leadership · Researching · Communication · Conflict Management · Team Work'],
      ['Tools', 'CAD · CNC Machining · Testing'],
      ['Industry', 'Manufacturing'],
      ['Output', 'Production Infrastructure and Process'],
    ],
  },
  {
    slug: 'airline',
    title: 'Airliner Design Project',
    tagline: '88,100 kg MTOW. 6,003 nmi range... on paper.',
    client: 'University of Canterbury · Student',
    tag: 'Aerospace',
    year: '2023',
    image: 'images/airline_drawing.png',
    gallery: [
      'images/airline_drawing.png',
      'images/airline_plot1.png',
      'images/airline_plot2.png',
      'images/airline_plot3.png',
    ],
    pdf: 'documents/airline_report.pdf',
    summary: 'A concept airliner design.',

    intro: `I co-led the conceptual design of a theoretical long-range business jet, setting
      out to address the increasing congestion at major international airports, many of which
      run beyond capacity during peak periods, and the looming phase out of high-capacity
      aircraft like the A380 and 747 due to high operational costs and infrastructure
      constraints.`,

    body: [
      `With global air travel demand projected to rise over the next 15–20 years, and most
      smaller business jets financially inaccessible to typical corporate travellers, there
      exists a clear need for a new class of international business exclusive aircraft capable
      of operating from satellite airports to ease hub congestion.`,

      `Using statistical comparisons with existing wide-body and business jet designs, we
      established initial MTOW estimates before conducting iterative wing loading,
      thrust-to-weight, and fuel fraction analyses via component build-up drag calculations,
      Breguet range modelling, and constraint diagram optimisation.`,

      `Balancing short field performance against cruise efficiency led to the selection of
      LEAP 1A engines and a 307 m² wing at a 9:1 aspect ratio, delivering a final MTOW of
      88,100 kg and a 6,003 nmi range.`,

      `Overcoming challenges in mass fraction convergence by continuously resizing structural,
      propulsion, and fuel systems until empty mass and fuel mass requirements aligned,
      validated our aerodynamic assumptions and confirmed the concept's viability.`,

      `Through this project, I honed skills in multidisciplinary trade studies, conceptual
      aircraft design, and collaborative problem solving under strict performance and market
      constraints.`,
    ],
    specs: [
      ['Role', 'Student'],
      ['Skills', 'Researching · Teamwork'],
      ['Tools', 'Hand Calculations · CAD · Documentation'],
      ['Industry', 'Aerospace'],
      ['Output', 'Conceptual Airliner Design and Report'],
    ],
  },
  {
    slug: 'pcb-enclosure',
    title: 'PCB Enclosure',
    tagline: 'Replaced a hazard and built a process.',
    client: 'Tait Communications · Junior Engineer',
    tag: 'Industrial Design',
    year: '2024',
    image: 'images/tait_cover.jpg',
    gallery: [
      'images/tait_cover.jpg',
      'images/tait_video.mp4',
      'images/tait_desktop.jpg',
      'images/tait_closed.jpg',
      'images/tait_desktop2.jpg',
      'images/tait_cnc.jpg',
      'images/tait_zoomed.jpg',
      'images/tait_plate.jpg',
      'images/tait_box.jpg',
      'images/tait_lid.jpg',
    ],
    pdf: null,
    summary: `Designed a PCB enclosure and mounting system for the software development team,
      replacing a dangerous and space-inefficient existing solution.`,

    intro: `I led the end-to-end development of custom enclosures for printed-circuit boards,
      replacing a hazardous, space-inefficient mounting solution with both rack and desktop
      mounted designs that are safe, compact, and easily expandable.`,

    body: [
      `Given broad creative freedom, I started by conducting customer research and stakeholder
      workshops to clarify requirements, then iterated through sketches, CAD concepts and
      fabricated prototypes for user feedback.`,

      `Once the design was finalised, I collaborated with the fabrication team to establish
      standardised production processes, an interactive, customisable BOM, and an internal
      ordering system enabling colleagues company-wide to request enclosure kits effortlessly.`,

      `A key challenge was bridging the communication gap with software engineers. Differing
      vocabularies and knowledge initially obscured the true requirements, but maintaining an
      open-door policy, asking targeted questions, and adopting a "fail fast" iterative
      approach aligned our understanding before putting too much time into detailed design.`,

      `I documented every decision and delivered comprehensive handover materials to ensure
      seamless maintenance after my departure. This project showcased and strengthened my
      skills in user-centred research, rapid prototyping, cross-disciplinary collaboration,
      clear technical communication, process standardisation, and thorough documentation.`,
    ],
    specs: [
      ['Duration', '3 months'],
      ['Role', 'Junior Engineer'],
      ['Skills', 'Researching · Time Management · Team Work · Problem Solving · Communication'],
      ['Tools', 'CAD · CNC Machining · Soldering/Wiring · Assembly · Testing · Documentation'],
      ['Industry', 'Critical Communications'],
      ['Output', 'Completed Internal Product, Manufacturing Process and Documentation'],
    ],
  },
  {
    slug: 'ev-kiosk',
    title: 'EV Charging Kiosks & Bollards',
    tagline: 'Electrification and protection.',
    client: 'Gyro Plastics · Junior Engineer',
    tag: 'Industrial Design',
    year: '2023',
    image: 'images/kiosk_cover.jpg',
    gallery: [
      'images/kiosk_cover.jpg',
      'images/kiosk_prints.jpg',
      'images/kiosk_kiosks.jpg',
      'images/kiosk_bollard1.jpg',
      'images/kiosk_bollard2.jpg',
      'images/kiosk_bollards.png',
      'images/kiosk_proto.jpg',
      'images/kiosk_test.jpg',
      'images/kiosk_chain.jpg',
      'images/kiosk_load.jpg',
      'images/kiosk_roto.jpg',
    ],
    pdf: null,
    summary: 'Designed EV charging kiosks and impact-protection bollards.',
    intro: `I led the full-cycle design and prototyping of rotationally moulded bases for EV
      charging kiosks and welded-steel protective bollards, considering ease of installation,
      wind-load resilience, and compatibility with multiple kiosk models. From initial market
      and material research through sketches and CAD concept iterations, rapid prototyping and
      testing, I ensured each solution met serviceability, aesthetic, and regulatory
      requirements.`,
    body: [
      `To address the challenges of rotational moulding such as material flow, thread inserts,
      and demoulding, I performed regular draft-angle analyses and made frequent visits to the
      mould maker, ensuring my designs remained viable.`,

      `Another challenge was locating and interpreting the relevant safety and
      impact-protection standards. Sifting through extensive, technical documents required
      persistence and attention to detail, but ultimately allowed me to specify the correct
      dimensions, wall thicknesses, and anchoring requirements for regulatory compliance of
      the bollards.`,

      `This project strengthened my skills in polymer design for manufacture, standards
      research and interpretation, rapid prototyping, cross-disciplinary collaboration, and
      problem-solving under real-world production constraints.`,
    ],
    specs: [
      ['Role', 'Junior Engineer'],
      ['Skills', 'Researching · Time Management · Team Work · Problem Solving · Communication'],
      ['Tools', 'Sketching · CAD · Rotational Moulding Prototyping · Testing'],
      ['Industry', 'Manufacturing'],
      ['Output', 'Completed Product Designs and Prototypes'],
    ],
  },
  {
    slug: 'gearbox',
    title: 'Gearbox Design',
    tagline: 'Hauling trees.',
    client: 'University of Canterbury · Student',
    tag: 'Mechanical',
    year: '2023',
    image: 'images/gearbox_exploded.png',
    gallery: [
      'images/gearbox_cover.png',
      'images/gearbox_exploded.png',
      'images/gearbox_shaft.png',
      'images/gearbox_housing.png',
    ],
    pdf: 'documents/gearbox_calcs.pdf',
    summary: `A full gearbox design exercise — gear ratios, shaft sizing, bearing selection,
      and housing design for a specific scenario.`,
    intro: `As Powertrain Lead on a theoretical logging skyline carriage project, I engineered
      a robust winch gearbox subsystem capable of hauling trees in demanding forestry
      conditions.`,
    body: [
      `I began by translating performance requirements into power and torque targets,
      specifying a Kubota V2003 M DI T E2B turbocharged diesel engine, a PTO clutch, and a
      1:24 gearbox ratio.`,

      `Applying AGMA stress and fatigue analyses, I sized gears and shafts for 99% reliability
      over 100 million cycles, selected materials and heat treatments for optimal strength and
      wear resistance, and produced technical drawings with GD&T callouts and preliminary
      supplier quotes.`,

      `The design features a split housing for swift assembly and maintenance, chamfer-guided
      pre-assembled shaft modules, bearing-retention caps that double as lubricant ports, a
      minimal fastener set to reduce assembly errors, and a quick-install housing that slots
      onto frame rails without disturbing adjacent components.`,

      `A big challenge was managing the interdependent nature of each design decision, where
      adjusting one parameter triggered repeated recalculations and redesigns, but by
      embracing the iterative workflow and knuckling down, I managed to converge on a
      solution that I was happy with.`,
    ],
    specs: [
      ['Role', 'Student'],
      ['Skills', 'Researching · Time Management · Team Work · Problem Solving'],
      ['Tools', 'Hand Calculations · CAD · Documentation · GD&T'],
      ['Industry', 'Mechanical Design'],
      ['Output', 'Gearbox Design, Calculations and Report'],
    ],
  },
  {
    slug: 'al-structure',
    title: 'Aluminium Structure',
    tagline: 'Designed to fail.',
    client: 'University of Canterbury · Student',
    tag: 'Structural',
    year: '2023',
    image: 'images/al_drawing1.png',
    gallery: [
      'images/al_cad.jpg',
      'images/al_drawing1.png',
      'images/al_beam.jpg',
      'images/al_clamp1.jpg',
      'images/al_drawing2.png',
      'images/al_drawing3.png',
      'images/al_clamp2.jpg',
      'images/al_dogbones.jpg'
    ],
    pdf: 'documents/al_report.pdf',
    summary: `Structural design and analysis of an aluminium structure.`,

    intro: `We were charged with designing a lightweight frame capable of supporting a 20–39 kg
      load and failing predictably within ±25 % of a target mass.`,

    body: [
      `To begin, we characterised the unknown aluminium alloy via tensile testing of dog bone
      specimens, determining the ultimate tensile strength and Young’s Modulus, and using these
      material properties to drive strength calculations. We evaluated three triangular
      configurations for strength-to-weight efficiency and chose an upside-down right-angled
      design so that only one compressive member required reinforcement, minimising buckling
      risk and fabrication complexity. The loads in each member were calculated and informed
      the introduction of a 2.52 mm central notch in the horizontal strip to achieve controlled
      tensile failure. To shave off mass without sacrificing strength, we specified an I-beam
      profile for the compressive member and strategically drilled weight reduction holes, then
      validated the design through SolidWorks modelling and hand calculations.`,

      `A key challenge was accurate manufacturing with only hand tools. Our initial hole-based
      failure point proved difficult to align correctly with such little material on each side,
      so we switched to a notch approach which allowed us to sneak up on the correct dimension
      far more accurately using files and sanding.`,

      `This project honed my skills in material testing, hand calculation structural analysis,
      CAD, and the trade-offs between manufacturability and performance.`
    ],
    specs: [
      ['Role', 'Student'],
      ['Skills', 'Time Management · Team Work'],
      ['Tools', 'Hand Calculations · CAD · Manufacturing · Documentation · Testing'],
      ['Industry', 'Structural Engineering'],
      ['Output', 'Structure and Report'],
    ],
  },
  {
    slug: 'cnc',
    title: 'CNC Machining',
    tagline: 'On the shop floor.',
    client: 'Automatic Lathes',
    tag: 'Manufacturing',
    year: '2022',
    image: 'images/cnc_cover.jpg',
    gallery: [
      'images/cnc_cover.jpg',
      'images/cnc_setup.jpg',
      'images/cnc_machine1.jpg',
      'images/cnc_handle.jpg',
      'images/cnc_machine2.jpg',
      'images/cnc_jig.jpg'
    ],
    pdf: null,
    summary: `Set up, operated, and maintained CNC mills and lathes in a production environment.`,
    intro: `I've curated a selection of components that I’ve CNC-machined on mills, lathes, and routers,
    showcasing my end-to-end shopfloor capabilities.`,
    body: [
      `From initial job setup, selecting tooling, fixturing parts, cutting stock and generating
      CAM toolpaths, to hands-on machine operation and preventative maintenance. I’ve produced
      a wide range of parts from aluminium, stainless steel, cast material and polymers, then
      performed deburring, dimension inspection, part cleaning and counting. Beyond individual
      parts, I have maintained workshop standards through regular machine cleaning, coolant
      management, and organised stock control.`,

      `This work highlights my proficiency in CNC programming and operation, quality assurance,
      and workshop upkeep, foundational skills that underpin all my design work.`
    ],
    specs: [
      ['Duration', '3 months'],
      ['Role', 'CNC Machine Operator'],
      ['Skills', 'Time Management'],
      ['Tools', 'CNC Machining · Manual Machining · Inspection'],
      ['Industry', 'Manufacturing'],
    ],
  },
  {
    slug: 'bearing',
    title: 'Bearing Housing',
    tagline: 'CAD to finished component.',
    client: 'University of Canterbury · Student',
    tag: 'Mechanical',
    year: '2022',
    image: 'images/bearing_drawing1.png',
    gallery: [
      'images/bearing_drawing1.png',
      'images/bearing_drawing2.png'
    ],
    pdf: 'documents/bearing_report.pdf',
    summary: `I designed a bearing housing for a theoretical indoor skydiving fan.`,
    intro: 'I designed a bearing housing for a theoretical indoor skydiving fan.',
    body: [],
    specs: [
      ['Role', 'Student'],
      ['Skills', 'Time Management · Team Work'],
      ['Tools', 'Hand Calculations · CAD · Documentation'],
      ['Industry', 'Mechanical Engineering'],
      ['Output', 'Detailed Design and Report'],
    ],
  },
  {
    slug: 'drilling-fixture',
    title: 'Drilling fixture',
    tagline: 'Repeatable holes, every time.',
    client: 'Gyro Plastics · Junior Engineer',
    tag: 'Manufacturing',
    year: '2022',
    image: 'images/drill_assy.jpg',
    gallery: [
      'images/drill_assy.jpg',
      'images/drill_old.jpg',
      'images/drill_new.jpg',
      'images/drill_used.jpg',
      'images/drill_close.jpg'
    ],
    pdf: null,
    summary: `A drilling fixture for repeatable hole patterns on a family of parts.`,
    intro: 'I designed and manufactured a rotating drilling fixture to replace several old fixtures.',
    body: [],
    specs: [
      ['Role', 'Junior Engineer'],
      ['Skills', 'Time Management · Team Work · Problem Solving · Communication'],
      ['Tools', 'CAD · CNC Machining'],
      ['Industry', 'Manufacturing'],
    ],  },
];


// ── 5. Hobbies ──────────────────────────────────────────────────────────
// Each hobby has its own detail page at hobbies/<slug>.html.
//
// Fields:
//   slug     — URL (hobbies/<slug>.html). Lowercase, no spaces.
//   title    — display name
//   tag      — category label
//   year     — display year / range
//   context  — one-line summary shown on the card (like project.summary)
//   image    — cover photo path (add real photos to images/ and update this)
//   intro    — opening paragraph on the detail page
//   body     — array of paragraphs
//   specs    — array of [label, value] rows in the sidebar
//
// Note: wrap words in {accent}…{/accent} to highlight in accent colour.

const HOBBIES = [
  {
    slug: 'canoe-polo',
    title: 'Canoe Polo',
    tag: 'Canoe Polo',
    year: '2016–2026',
    context: `NZ U21 Paddle Blacks Captain, gold at 2019 Junior International Championship; 6th at 2022 World Championship;
    gold at 2023 Oceania Championship.`,
    image: 'images/polo_cover.JPG',
    gallery: [
      'images/polo_cover.JPG',
      'images/polo_charge2.JPG',
      'images/polo_podium.JPG',
      'images/polo_team.JPG',
      'images/polo_block.JPG',
      'images/polo_shoot.JPG',
      'images/polo_medal.JPG',
      'images/polo_film.JPG',
      'images/polo_charge.JPG',
      'images/polo_matt.JPG',
      'images/polo_brace.JPG',
      'images/polo_airport.JPG',
      'images/polo_throw.JPG'
    ],
    intro: `Canoe polo is the sport that shaped me. I have represented New Zealand as an U21 Paddle
    Black since 2016 — including a gold medal at the 2019 Junior International Championship (Northern Ireland),
    6th at the 2022 World Championships (France), and gold at the 2023 Oceania Championships, where
    I captained the side.`,
    body: [
      `It has given me some of my best friendships, my best travel memories, and a serious appreciation
      for teamwork, resilience, and reading the game a few moves ahead.`,
      `Off the water I have volunteered for years at club level as a referee and coach to give back
      to a community that gave me everything.`,
    ],
    specs: [
      ['Position', 'Slippery'],
      ['Highlights', '2019 JIC Gold · 2022 Worlds · 2023 Oceania Gold (Captain)'],
      ['Role', 'Player · Coach · Referee'],
    ],
  },
  {
    slug: 'skiing',
    title: 'Snow Sports',
    tag: 'Snow Sports',
    year: 'Every Winter',
    context: `Every winter weekend the alarm goes off at 5am.`,
    image: 'images/ski_cover.JPEG',
    gallery: [
      'images/ski_cover.JPEG',
      'images/ski_chair.JPEG',
      'images/ski_board.JPEG',
      'images/ski_vid.mp4',
      'images/ski_tom.JPEG',
      'images/ski_temple.JPEG',
      'images/ski_toastie.JPEG',
      'images/ski_mount.JPEG',
      'images/ski_lawson.JPEG',
      'images/ski_sunset.JPEG',
      'images/ski_sparkle.JPEG',
      'images/ski_sun.JPEG'
    ],
    intro: `I spend most winters chasing snow. On a snowboard when the conditions are good,
    or on skis when they are not quite as good (most of the time).`,
    body: [
      `Early starts are worth it when the mountain is on and the queues are still short.`,
      `I was lucky enough to go to Japan, and I have been counting down the days until I go back ever since.`,
    ],
    specs: [
      ['Home Hill', 'Mt Hutt'],
      ['Style', 'Off-piste · Freestyle · Backcountry'],
      ['Favourite Conditions', 'POW!'],
    ],
  },
  {
    slug: 'hiking',
    title: 'Hiking',
    tag: 'Hiking',
    year: 'Year-Round',
    context: `Any excuse to get outside and into the hills.`,
    image: 'images/hike_cover.JPG',
    gallery: [
      'images/hike_cover.JPG',
      'images/hike_climb.JPG',
      'images/hike_tree.PNG',
      'images/hike_lake.JPG',
      'images/hike_film.JPG',
      'images/hike_crossing.JPG',
      'images/hike_grass.PNG',
      'images/hike_cheese.JPG',
      'images/hike_cloudy.JPG',
      'images/hike_wet.JPG',
      'images/hike_sunset.JPG',
      'images/hike_sabine.JPG',
      'images/hike_bbq.JPG',
      'images/hike_scree.JPG',
      'images/hike_annika.JPG',
      'images/hike_rock.JPG',
      'images/hike_peak.JPG'
    ],
    intro: `I like getting outdoors and exploring Aotearoa. Some of my favourite tramps have been the
    Sabine/D'Urville in Nelson Lakes National Park, the Heaphy Track in Kahurangi National Park, and
    the Tongariro Alpine Crossing.`,
    body: [
      `I like hikes that feel like a proper trip out, especially if they involve good views, a bit of
      variable weather, a good amount of walking, and a decent hut.`,
      `It is a good way to clear my head and get away from screens for a while.`,
    ],
    specs: [
      ['Favourite Type', 'Overnighters'],
      ['Best Parts', 'Remote views · Alpine terrain · Good Yarns'],
    ],
  },
  {
    slug: 'white-water',
    title: 'White Water',
    tag: 'White Water',
    year: 'Year-Round',
    context: `Equal parts fun and punishment.`,
    image: 'images/white_water(14).JPG',
    gallery: [
      'images/white_water(1).JPG',
      'images/white_water(7).JPG',
      'images/white_water(2).JPG',
      'images/white_water(8).JPG',
      'images/white_water(3).JPG',
      'images/white_water(9).JPG',
      'images/white_water(4).JPG',
      'images/white_water(10).JPG',
      'images/white_water(5).JPG',
      'images/white_water(11).JPG',
      'images/white_water(6).JPG',
      'images/white_water(12).JPG',
      'images/white_water(7).JPG',
      'images/white_water(13).JPG'
    ],
    intro: `I get absolutely pummeled most of the time.`,
    body: [
      `I like the pace of white water. It is fast, noisy, and tends to demand your full attention.
      It is often more fun in hindsight.`,
    ],
    specs: [
      ['Grade', '4'],
      ['Reward', 'A rare clean run'],
    ],
  },
  {
    slug: 'climbing',
    title: 'Climbing',
    tag: 'Climbing',
    year: 'Year-Round',
    context: `Indoor or outdoor, bouldering or top rope.`,
    image: 'images/climbing.JPEG',
    gallery: [
      'images/climbing.JPEG',
    ],
    intro: `I've always enjoyed climbing, whether that's indoors, outdoors, bouldering, or top roping.`,
    body: [
      `It scratches the same problem-solving itch as engineering. Every route is a bit of a puzzle, and
      falling off is just part of the process.`,
      `It is also a good way to switch off and keep active without it feeling too much like a workout.`,
    ],
    specs: [
      ['Styles', 'Bouldering · Top rope'],
      ['Favourite Parts', 'Movement · Problem-solving'],
    ],
  },
  {
    slug: 'f1',
    title: 'Formula 1',
    tag: 'F1',
    year: 'Race Weekends',
    context: `McLaren fan since before they were good.`,
    image: 'images/f1_car.JPEG',
    gallery: [
      'images/f1_car.JPEG',
      'images/f1_crowd.JPEG',
      'images/f1_porsche.JPEG'
    ],
    intro: `I have been into Formula 1 for a while now. I have backed McLaren since before they were good,
    and am also a Liam Lawson fan of course. I super lucky to have attended the Melbourne Grand Prix,
    which was a very good week.`,
    body: [
      `I love the mix of engineering, strategy, and competitiveness.`,
    ],
    specs: [
      ['Teams I Back', 'McLaren'],
      ['Drivers I Rate', 'Liam · Oscar · Alex'],
      ['Favourite Event', 'Melbourne Grand Prix'],
    ],
  }
];


// ── 6. Resume ───────────────────────────────────────────────────────────
const RESUME = {
  contact: {
    name: 'Jago Alcock',
    email: 'jago.alcock@gmail.com',
    phone: '+64 20 4065 0413',
    location: 'New Zealand',
    website: 'https://jagoalcock.wixsite.com/jago-alcock-portfoli',
  },
  pdf: 'documents/jago_alcock_resume.pdf',
  heading: 'Graduate Mechanical Engineer',
  summary: `2+ years of research and development work experience across design, prototyping, testing,
and manufacturing. Impassioned by finding creative solutions to design, automation, and optimisation problems. An avid
sportsperson, having represented New Zealand as a Junior Paddle Black and spending my free time mountain biking, surfing,
hiking and in the snow.`,
  competences: ['Creative Problem Solving', 'Fast Learning', 'Clear Communication'],
  jobs: [
    {
      role: 'Junior Engineer',
      where: 'SYOS Aerospace',
      tag: 'AEROSPACE',
      dur: '3 months',
      bullets: [
        `SYOS Aerospace develops advanced uncrewed air, ground, sea and subsurface systems for defence and
        commercial applications. Unfortunately, due to the nature of this work, some project details are
        classified.`,
        `Designed and manufactured components for customer-ready UAS products, working to tight tolerances
        and delivery standards.`,
        `Sole troubleshooter on a customer contract following commissioning issues. I diagnosed and resolved
        faults across systems under time pressure.`,
        `Designed a ~12×12m drone test enclosure to allow safe indoor UAS flight testing, protecting both
        aircraft and personnel in the event of a crash.`,
        `Redesigned a customer-facing Ground Control Station (GCS) to improve structural integrity,
        transmission reliability, and operator usability.`,
        `Supported testing, manufacturing, and general operations, contributing wherever needed in a
        fast-moving environment.`,
        `Produced technical documentation in line with customer and project requirements.`,
      ],
    },
    {
      role: 'Junior Engineer',
      where: 'SPS Automation',
      tag: 'AEROSPACE',
      dur: '3 months',
      bullets: [
        `Developed a Wireless Aerial Nozzle Device (W.A.N.D) for drone-mounted precision spraying, from
        initial concept through to a flight-tested proof-of-concept product.`,
        `Designed a dual-axis nozzle actuator with ±90° simultaneous vertical and horizontal actuation,
        integrating LiDAR and an IP camera for real-time range and visual feedback.`,
        `Provided a flexible, robust and easy to use stand-alone spray system, engineered to SPS
        Automation's standard mounting interface, enabling compatibility across multiple aerial platforms.`,
        `Delivered comprehensive documentation covering design rationale, technical specifications,
        assembly, SOPs, and recommended improvements.`,
      ],
    },
    {
      role: 'Junior Engineer',
      where: 'Tait Communications',
      tag: 'CRITICAL COMMUNICATION INFRASTRUCTURE',
      dur: '3 months',
      bullets: [
        `Redesigned a PCB enclosure and mounting system for the software development team, replacing a
        dangerous and space-inefficient existing solution.`,
        `Led full design process: customer research, concept development, iterative prototyping,
        manufacturing, and testing.`,
        `Produced detailed handoff documentation to ensure continuity of the project after departure.`,
        `Collaborated and learnt from diverse, multi disciplined teams.`,
      ],
    },
    {
      role: 'Junior Engineer',
      where: 'Gyro Plastics',
      tag: 'ELECTRICAL INFRASTRUCTURE',
      dur: '6 months',
      bullets: [
        `Conducted R&D on 10+ new and existing products guiding ideas through every development stage.`,
        `Facilitated the design and implementation of workshop process and equipment improvements.`,
        `Developed impact protection bollards all the way through to manufacturing processes and
        production units.`,
        `Designed EV charging kiosks, balancing wind loading, tamper resistance, ease of installation,
        and mould fabrication requirements.`,
        `Managed a hybrid remote/in-person work model, maintaining full team integration across two
        locations with Gyro Plastics arranged fortnightly return flights from Canterbury to Manawatu.`,
      ],
    },
    {
      role: 'CNC Machining',
      where: 'Automatic Lathes',
      tag: 'MANUFACTURING',
      dur: '3 months',
      bullets: [
        `Set up, operated, and maintained CNC mills and lathes in a production environment.
        Additionally responsible for cutting, deburring, quality checking, and workshop upkeep.`,
      ],
    },
    {
      role: 'Research and Development',
      where: 'QuickBuild Homes',
      tag: 'HOUSING',
      dur: '12 months',
      bullets: [
        `Contributed across machine programming, 3D modelling, product design, 3D printing, factory work,
        graphic design, conceptual site plans, 3D rendering and visualisation for prefab housing manufacture.`,
      ],
    },
  ],
  responsibilities: [
    'Product research and feasibility (costing, competitor, and standards research).',
    'Concept development and design (sketching, 3D modelling, and 3D rendering).',
    'Rapid prototyping (3D printing, CNC machining, laser cutting, folding).',
    'Testing (load testing and system functionality testing of physical prototypes).',
    'Implementation into production (rotational moulding, CNC machining, 3D printing and outsourced manufacture).',
    'Project management (managing lead times, setting deadlines, keeping time sheets)',
    'Collaboration (with manufacturing, software, electrical, mechanical teams).',
    'Documentation (to facilitate seamless handoffs of my projects).',
  ],
  skills: {
    tech: [
      ['Engineering software', 'SolidWorks, ANSYS, onshape, Fusion360, Creo, Mastercam, VISI, Archicad, Python.'],
      ['CNC tools', '3D printers, mills, lathes, saws.'],
      ['Manual tools', 'Lathes, bandsaws, drill presses, soldering irons, hand tools.'],
      ['Visualisation software', 'Photoshop, Lumion.'],
      ['Driver’s license', 'Class 1'],
      ['CAD, CAM, CNC Certificates', 'https://cncexpert.com/jago-alcock'],
    ],
    soft: [
      [
        'Fast Learning',
        `Picked up and trusted with new responsibilities quickly across every role, despite limited prior experience.
        One of the qualities I am most proud of.`,
      ],
      [
        'Problem Solving',
        'I have successfully tackled a wide range of design challenges using diverse techniques.',
      ],
      [
        'Communication and Teamwork',
        'Lifelong involvement in international team sport has sharpened my ability to communicate and collaborate effectively, including under pressure.',
      ],
      [
        'Leadership',
        'I have held various leadership roles (House Captain, Sports Captain, Captain of the NZ U21 Canoe Polo team).',
      ],
    ],
  },
  achievements: [
    [
      'Vice Chancellor’s Excellence Scholarship',
      'For high-achieving candidates who have a record of academic excellence, leadership, and community engagement.',
    ],
    [
      'Contel Charitable Trust Masters Scholarship',
      'For general character, leadership potential and communication skills, academic achievement.',
    ],
    [
      'Caliber Design Prize in Mechanical Engineering',
      'For excellence by BE(Hons) students of Mechanical Engineering at University of Canterbury.',
    ],
    [
      'CWF Hamilton Masters Scholarship',
      'For academic achievement and potential to contribute to research in Mechanical Engineering.',
    ],
    [
      'Ken Whybrew Memorial Prize',
      'For excellence in Manufacturing Technology.',
    ],
    [
      'Courtney Shearer Memorial Scholarship in Engineering',
      'For engineering students, with a preference for those who did not come to university directly from school and who worked in the intervening period.',
    ],
    [
      'Academy of Sport Scholarship',
      'For new student-athletes with a previous record of high achievement in sport and who show future potential.',
    ],
    [
      'Blues Award (x2)',
      'Celebrates students who have excelled in sport, arts, and community engagement.',
    ],
    [
      'Principal’s Excellence Award',
      'Awarded for commitment to academic success.',
    ],
  ],
  community: [
    [
      '2025/2026: Tutor - Controls and Vibrations - Mechanical Systems Design',
      'Taught undergraduate students in the Controls and Vibrations course at the University of Canterbury.',
    ],
    [
      '2024: Team Leader - UC Aerospace Level 1',
      'Led a team in building and launching a 1.4m rocket kit. I gained practical experience in rocket aerodynamics, fabrication, and launch procedures.',
    ],
    [
      '2016 – 2026: Canoe Polo',
      `Represented New Zealand as part of the NZ U21 Men's team: Gold at 2019 Junior International Championship (Northern Ireland); Bronze 2022; 6th at 2022 World Championship (France).
      Captained the NZ U21 Men's team to 1st place at the 2023 Oceania Championship.
      Volunteered as referee and coach at club level.`,
    ],
  ],
  referees: [
    [
      'Jake Tisdale',
      'SYOS Aerospace',
      'Mechanical Department Lead',
      'jake.tisdale@syos-aerospace.com',
      '+64 22 165 3681',
    ],
    [
      'Trudi Duncan',
      'Gyro Plastics',
      'Managing Director',
      'trudi.duncan@gyroplastics.com',
      '+64 27 258 0026',
    ],
    [
      'Jordie Peters',
      'MotorSport NZ / Liam Lawson Motorsport',
      'Digital/ Media Manager',
      'jordie.p1@icloud.com',
      '+64 27 479 1510',
    ],
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
    pdf: 'documents/recommendation_syos.pdf',
    date: 'March 2026',
    excerpt:
      `To Whom It May Concern:`
      `Jago was a summer intern at Syos from 17/11/2025 to 27/02/2026, and I was his manager in my role
      as Mechanical Lead. Jago was an absolute pleasure to work with. Not only was he always willing to
      take on any task, but he consistently saw them through to completion without requiring follow-up.
      I was able to assign him multiple tasks with differing priorities, and he managed them all
      effectively and independently.`
      `Whenever an issue arose, Jago would not simply identify the problem and stop there. Instead, he
      would say, “We ran into issue X, but I think we could approach it through A or B.” He consistently
      came prepared with thoughtful solutions and maintained a positive attitude, which made working
      through challenges significantly easier for the entire team.`
      `I have told Jago that he has a standing job offer at Syos — I would hire him again at any time
      without hesitation. He is the kind of engineer who can contribute across design, manufacturing,
      and testing. Whatever the task, he gives it his full effort — and that dedication is often the
      most important quality of all. It is clear that he genuinely enjoys solving problems, collaborating
      with others, and pushing the boundaries of what is possible.`
      `I look forward to seeing the engineer Jago becomes with 5, 10, or 15 years of experience under his
      belt. He is already outperforming some engineers with five or more years of experience, and he has
      only recently graduated.`
      `All the best, Jake Tisdale, Mechanical Department Lead`
  },
  {
    name: 'Trudi Duncan',
    role: 'Managing Director · Gyro Plastics',
    pdf: 'documents/recommendation_gyro.pdf',
    date: 'July 2023',
    excerpt:
      `To whom it may concern,`
      `I am writing to highly recommend Jago Alcock for any future endeavors he may pursue.
      Jago recently completed a Product Design Internship within our business, GYRO, and I am
      thrilled to provide my utmost endorsement for his exceptional skills, work ethic, and
      character.`
      `Jago displayed an excellent work ethic from the beginning of his time with us. Taking the
      time to work in the operational department for the first few weeks allowed him to gain an
      understanding of how our manufacturing process works and the design implications for
      anything he might be working on going forward. I was extremely impressed with how Jago
      integrated himself into any team he was working alongside. He was candid, positive,
      communicative and had a healthy understanding and appreciation for workplace culture and
      his place within it.`
      `Throughout his internship, Jago consistently demonstrated a remarkable level of both
      emotional and intellectual intelligence. His ability to think outside the box and resolve
      mechanical and design challenges with commercial solutions contributed to the launch of a
      new product range for our business which we will be taking to both domestic and
      international markets. In addition, Jago also displays sound commercial judgement and an
      inquiring attitude which he displayed on querying a project he was tasked to work on when
      he thought it might not be a sound fit for the company and the product range.`
      `His enthusiasm for supporting other team members in their projects was sincerely
      appreciated and allowed another of our colleagues to explore a lifelong passion and
      subsequently launch another brand for our business in the education sector.`
      `Throughout his time at GYRO, Jago consistently displayed maturity, professionalism, and a
      strong work ethic. His commitment to completing assigned projects, ability to prioritize tasks
      and complete work with accuracy and urgency quickly made Jago a “go-to” team member.`
      `Beyond his technical skills, Jago is an exceptional team player and a pleasure to work
      alongside. Jago is an excellent communicator who actively listens to others' ideas and
      collaborates effectively to achieve shared goals.`
      `We would warmly extend a personal invitation to Jago at any point in the future, and wholeheartedly
      recommend Jago without reservation.`
      `Should you require any further information or have any questions, please do not hesitate to reach out to me.`
      `Warm regards, Trudi Duncan Managing Director`
  },
  {
    name: 'Lachlan Brewster',
    role: 'Senior Software Engineer · SPS Automation',
    pdf: 'documents/recommendation_sps.pdf',
    date: 'February 2025',
    excerpt:
      `To Whom It May Concern,`
      `Jago was a mechanical engineering intern over the summer, working under my management on a wand sprayer for one of our large agricultural UAVs.`
      `Given a verbal concept and an existing product as a reference, he and another intern followed the full engineering process from design to prototype.
      They developed and tested multiple design concepts, refining them through iteration. Their work included mechanical design, component research and
      validation, fabrication, electrical schematic design, and wiring, resulting in a complete and functional prototype with all required documentation.`
      `Jago was eager to contribute and made himself useful even outside his primary responsibilities, assisting with various engineering tasks while waiting
      for parts. His willingness to learn and proactive attitude made him a helpful addition to the team.`
      `I am happy to recommend Jago for future roles in mechanical engineering. Please feel free to email me for more information. After June 2025, I will no
      longer be available, in which case you can reach out via the SPS Automation general contact.`
      `Best regards, Lachlan Brewster`
  },
];

const OTHER_DOCS = [
  {
    title: 'BE(Hons) Academic Transcript',
    url: '#',
    note: 'University of Canterbury — first-class honours.',
  },
  {
    title: 'Te Tāmure Award Certificate',
    url: '#',
    note: 'Service & leadership recognition.',
  },
];


// Export everything to window so the page scripts can use it.
Object.assign(window, {
  SITE_INFO, INTRO_STATS, INTRO_TEXT,
  ABOUT_HEADING, ABOUT_SUBHEADING, ABOUT_PHOTO, ABOUT_PHOTO_POSITION, ABOUT_TEXT,
  PROJECTS, HOBBIES, RESUME,
  RECOMMENDATIONS, OTHER_DOCS,
});
