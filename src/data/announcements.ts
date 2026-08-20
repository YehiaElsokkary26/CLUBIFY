import type { Announcement } from './types'

/**
 * Announcement pool — 30 GUC-specific entries, 3 per club.
 * The feed generator draws from this pool weekly using a seeded shuffle.
 * Each club gets 3 angles: [0] Event/CTA, [1] Did you know?, [2] Committee/impact.
 */
export const announcementPool: Announcement[] = [

  // ─── TEDxGUC ──────────────────────────────────────────────────────────────

  {
    id: 'tedx-1',
    title: 'TEDxGUC 2026 — Speaker & Volunteer Applications Open',
    body: 'Applications are open for TEDxGUC 2026 at GUC\'s C5 Auditorium. Past speakers include GUC\'s own Dr. Amir Roushdy (ARAtronics co-founder), Forbes 30U30 alumnus Mohamed Ehab, and Egypt\'s Paris 2024 Olympic mental coach. Apply at tedxguc.com — volunteer spots across all four committees are open now.',

    targetAudience: 'All',
    clubId: 'guc-tedx',
    createdAt: '2026-08-10T10:00:00',
    author: 'Lina Karim',
  },
  {
    id: 'tedx-2',
    title: 'GUC Has Its Own Licensed TED Event — Here\'s What That Means',
    body: 'TEDxGUC has run under TED\'s global framework since 2013, making GUC one of the few Egyptian universities with its own independently licensed event. With 110+ nationalities and 8 faculties on one campus, the speaker committee has a uniquely diverse pool to draw from every year.',
    targetAudience: 'All',
    clubId: 'guc-tedx',
    createdAt: '2026-07-28T11:00:00',
    author: 'Dina Kamal',
  },
  {
    id: 'tedx-3',
    title: 'The Team Behind TEDxGUC — Six Months Before the Stage Fills Up',
    body: 'The C5 Auditorium fills for TEDxGUC. What most people don\'t see is six months of student work before it. Four committees run the event — Speakers & Content, Marketing, Operations, and Partnerships — with no faculty oversight and no admin. Just GUC students building something the whole university shows up for.',
    targetAudience: 'All',
    clubId: 'guc-tedx',
    createdAt: '2026-07-14T09:00:00',
    author: 'Dina Kamal',
  },

  // ─── INSIDER ──────────────────────────────────────────────────────────────

  {
    id: 'insider-1',
    title: 'INSIDER Issue 11 Is Live — Pick Up Your Copy at the Library Atrium',
    body: 'INSIDER\'s 11th issue is out — covering the GUC Grand Festival, campus culture, and a feature on GUC\'s visiting German professor series. Free printed copies at the Library Atrium and SCAD office. Every issue is also at insiderguc.wordpress.com.',
    targetAudience: 'All',
    clubId: 'guc-insider',
    createdAt: '2026-08-05T09:00:00',
    author: 'Mariam Fouad',
  },
  {
    id: 'insider-2',
    title: 'INSIDER Has Published Every Semester Since 2011',
    body: 'INSIDER is one of GUC\'s oldest student organisations — 11+ issues, bilingual (English & Arabic), covering campus life, culture, and opinion across a student body from 110+ countries. Real editorial standards apply: pitching, fact-checking, editing, and design rounds before anything goes to print.',
    targetAudience: 'All',
    clubId: 'guc-insider',
    createdAt: '2026-07-22T10:00:00',
    author: 'Mariam Fouad',
  },
  {
    id: 'insider-3',
    title: 'INSIDER Has Four Committees — Only One of Them Writes',
    body: 'Writing & Editorial produces the articles. Design & Layout handles typography and page composition. Photography & Visuals shoots campus events. Digital Media & Social runs the WordPress site and @insiderguc. All four are what put a printed magazine in your hands each semester. Recruitment opens every semester.',
    targetAudience: 'All',
    clubId: 'guc-insider',
    createdAt: '2026-07-07T12:00:00',
    author: 'Youssef Adel',
  },

  // ─── IEEE GUC ─────────────────────────────────────────────────────────────

  {
    id: 'ieee-1',
    title: 'IEEE GUC Fall Workshop Series — Starts September 8 in the Engineering Labs',
    body: 'IEEE GUC\'s Fall 2026 series kicks off September 8 in Engineering Labs (B1.204): PCB design with KiCad, a cybersecurity track with CTF challenges, and GitHub for collaborative engineering. All sessions are free for GUC students — no prior experience needed for most.',
    targetAudience: 'All',
    clubId: 'guc-ieee',
    createdAt: '2026-08-12T11:00:00',
    author: 'Omar Tarek',
  },
  {
    id: 'ieee-2',
    title: 'GUC\'s IEEE Branch Has Been Running Since 2006',
    body: 'The IEEE GUC Student Branch launched in 2006 — four years after GUC was founded — making it one of Egypt\'s longest-running student branches. Membership connects you to IEEE\'s global 400,000+ network, Xplore research database access, and eligibility for international competitions and scholarships.',
    targetAudience: 'All',
    clubId: 'guc-ieee',
    createdAt: '2026-07-30T09:00:00',
    author: 'Ibrahim Samir',
  },
  {
    id: 'ieee-3',
    title: 'Two IEEE GUC Tracks — Technical and Organizing',
    body: 'The Technical Committee runs the workshops (PCB, embedded systems, AI/ML, cybersecurity) in GUC\'s Engineering labs — built for IET and EMS students who want hands-on skills. The Organizing Committee handles event logistics, sponsorships, and outreach — the entry point for Management, Applied Sciences, and Law students who want to work alongside engineers. Both recruit every semester.',
    targetAudience: 'All',
    clubId: 'guc-ieee',
    createdAt: '2026-07-15T14:00:00',
    author: 'Ibrahim Samir',
  },

  // ─── ATHAR ────────────────────────────────────────────────────────────────

  {
    id: 'athar-1',
    title: 'ATHAR Needs Volunteer Teachers — Mansheyet Nasser Program Is Expanding',
    body: 'ATHAR is recruiting GUC students as weekly tutors in Arabic, English, Math, and Science for its Mansheyet Nasser program. No teaching experience needed — transport is arranged from GUC\'s Main Gate. Sign up via @athar_guc on Instagram by September 1st.',
    targetAudience: 'All',
    clubId: 'guc-athar',
    createdAt: '2026-08-08T14:00:00',
    author: 'Nour Hassan',
  },
  {
    id: 'athar-2',
    title: 'ATHAR\'s Tooth Guards: 82 Children, One Day, GUC Volunteers',
    body: 'ATHAR\'s Tooth Guards campaign — run with GUC Pharmacy & Biotechnology students and a Cairo dental NGO — reached 82 children with free screenings and hygiene kits in a single session. The next campaign is October. Sign up via @athar_guc.',
    targetAudience: 'All',
    clubId: 'guc-athar',
    createdAt: '2026-07-25T10:00:00',
    author: 'Nour Hassan',
  },
  {
    id: 'athar-3',
    title: 'Five Committees, One Mission — How ATHAR Actually Works',
    body: 'Education Outreach runs weekly tutoring in Mansheyet Nasser. Health & Community runs medical campaigns with GUC Pharmacy students. Fund-Raising handles charity sales and sponsorships. Media & Marketing keeps @athar_guc\'s 2,000+ followers updated. Events & Logistics handles transport, permits, and execution. Any GUC faculty, any committee — recruitment is open.',
    targetAudience: 'All',
    clubId: 'guc-athar',
    createdAt: '2026-07-10T13:00:00',
    author: 'Rania Youssef',
  },

  // ─── INSPIRE ──────────────────────────────────────────────────────────────

  {
    id: 'inspire-1',
    title: 'INSPIRE 9th Premier League — Registration Opens September 1st',
    body: 'The 9th Annual GUC Premier League is coming — 24 teams registered last year, record crowd. Played on GUC\'s dedicated sports courts (part of 70,400 m² of facilities), teams of 7, full multi-week bracket. Registration opens September 1st at @gucinspire.',
    targetAudience: 'All',
    clubId: 'guc-inspire',
    createdAt: '2026-08-15T08:00:00',
    author: 'Karim Nabil',
  },
  {
    id: 'inspire-2',
    title: 'INSPIRE Is More Than the Premier League',
    body: 'Run as One is a charity marathon on GUC\'s campus. Fitness bootcamps run each semester on the outdoor sports grounds. The Leadership Summit brings external speakers and workshops that count toward co-curricular records. The football is the headline — the culture it builds is the point.',
    targetAudience: 'All',
    clubId: 'guc-inspire',
    createdAt: '2026-07-29T11:00:00',
    author: 'Hana Mostafa',
  },
  {
    id: 'inspire-3',
    title: 'Four Committees Make Every INSPIRE Event Happen',
    body: 'Operations (venue, courts, logistics across GUC\'s 577,000 m² campus), Fund-Raising (sponsorships), Public Relations (partnerships with student bodies and alumni), and Media Production & Design (photos, reels, graphics). If you love sport but don\'t play — there\'s a committee for you. Recruitment every semester.',
    targetAudience: 'All',
    clubId: 'guc-inspire',
    createdAt: '2026-07-12T15:00:00',
    author: 'Karim Nabil',
  },

  // ─── MUN ──────────────────────────────────────────────────────────────────

  {
    id: 'mun-1',
    title: 'GUCMUN 2026 — Delegate Applications Open, Conference in November',
    body: 'Applications are open for delegates, chairs, and rapporteurs across five committees — Security Council, DISEC, ECOSOC, and more. GUCMUN draws 1,000+ participants annually and has sent delegations to the UN in New York. Applications close September 20th.',
    targetAudience: 'All',
    clubId: 'guc-mun',
    createdAt: '2026-08-14T10:00:00',
    author: 'Sara Mahmoud',
  },
  {
    id: 'mun-2',
    title: 'What Actually Happens at GUCMUN — A First-Timer\'s Guide',
    body: 'You represent a real country, defend its actual foreign policy, negotiate bloc alliances, write resolutions, and vote. GUCMUN has been doing this since 2009 — one of GUC\'s oldest clubs. First-timers are placed in accessible committees with experienced chairs.',
    targetAudience: 'All',
    clubId: 'guc-mun',
    createdAt: '2026-07-27T09:00:00',
    author: 'Ahmed Khaled',
  },
  {
    id: 'mun-3',
    title: 'GUCMUN\'s Security Council — 15 Seats, No Safety Net',
    body: 'The SC is the most competitive committee at GUCMUN — reserved for returning delegates who want a real challenge. In 2024, the SC dealt with a live crisis scenario with no position paper to fall back on. That\'s what GUC\'s top debaters compete for every year.',
    targetAudience: 'All',
    clubId: 'guc-mun',
    createdAt: '2026-07-11T16:00:00',
    author: 'Sara Mahmoud',
  },

  // ─── CURA ─────────────────────────────────────────────────────────────────

  {
    id: 'cura-1',
    title: 'CURA Prototype Showcase — September 22, Engineering Atrium (H Building)',
    body: 'CURA is showing its first public prototypes on September 22nd — working assistive devices built by GUC students targeting limb amputation and paraplegia. Not renders. Physical prototypes, built and tested in GUC\'s Engineering labs. Free and open to all.',
    targetAudience: 'All',
    clubId: 'guc-cura',
    createdAt: '2026-08-11T12:00:00',
    author: 'Ahmed Samy',
  },
  {
    id: 'cura-2',
    title: 'Why CURA Only Exists at a University Like GUC',
    body: 'CURA builds prosthetic limb attachments and mobility aids — and it exists at GUC because Mechatronics, Digital Engineering, and Pharmacy students are all within 500 metres of each other on a 577,000 m² campus. Founded in 2022. September 22nd: come see what they\'ve built.',
    targetAudience: 'All',
    clubId: 'guc-cura',
    createdAt: '2026-07-26T14:00:00',
    author: 'Yasmine Adel',
  },
  {
    id: 'cura-3',
    title: 'CURA Has Four Committees — Only One Needs Engineers',
    body: 'Engineering & Prototyping builds the devices. Community Outreach connects them to people who need them. Design & Research runs user research and ergonomics. Media & Marketing tells the story — because a device no one knows about helps no one. All faculties welcome; all committees recruit every semester.',
    targetAudience: 'All',
    clubId: 'guc-cura',
    createdAt: '2026-07-09T10:00:00',
    author: 'Ahmed Samy',
  },

  // ─── AYB ──────────────────────────────────────────────────────────────────

  {
    id: 'ayb-1',
    title: 'AYB × ATHAR Community Day — El-Matareya, September 26',
    body: 'AYB and ATHAR are co-organising a Community Day on September 26th in El-Matareya: tutoring sessions, health screenings with GUC Pharmacy students, and a neighbourhood clean-up. Transport from GUC\'s Main Gate at 8:30 AM. Sign up via @ayb_guc before September 20th.',
    targetAudience: 'All',
    clubId: 'guc-ayb',
    createdAt: '2026-08-09T16:00:00',
    author: 'Farah Ibrahim',
  },
  {
    id: 'ayb-2',
    title: 'GUC Is in New Cairo. El-Matareya Is 25 Minutes North. AYB Bridges the Gap.',
    body: 'AYB was founded in 2016 to connect GUC\'s campus in Al-Tagamoa to El-Matareya — one of Cairo\'s most densely populated and economically marginalised districts. Ten years of sustained education and vocational programs, not one-off charity. Same streets, same families, every semester.',
    targetAudience: 'All',
    clubId: 'guc-ayb',
    createdAt: '2026-07-24T11:00:00',
    author: 'Farah Ibrahim',
  },
  {
    id: 'ayb-3',
    title: 'AYB Isn\'t Looking for One-Off Volunteers — Here\'s What They\'re Actually Asking',
    body: 'AYB\'s model is sustained capability-building: ongoing education projects, vocational training, and health programs that compound year over year in El-Matareya. The ask at recruitment is honest — are you here for the post, or for year two? Info session: September 8th at 5 PM in H7.101.',
    targetAudience: 'All',
    clubId: 'guc-ayb',
    createdAt: '2026-07-06T09:00:00',
    author: 'Omar Salah',
  },

  // ─── REVIVE ───────────────────────────────────────────────────────────────

  {
    id: 'revive-1',
    title: 'REVIVE Sustainability Week — "Circular Campus," September 14–18',
    body: 'Five days of workshops, panels, and a live upcycling event across GUC\'s Main Courtyard. Theme: "Circular Campus." Highlights include a documentary screening with Q&A and a keynote from an environmental researcher. All events are free and open to every faculty.',
    targetAudience: 'All',
    clubId: 'guc-revive',
    createdAt: '2026-08-07T13:00:00',
    author: 'Menna Ali',
  },
  {
    id: 'revive-2',
    title: 'GUC Already Has a Solar Park. REVIVE Wants to Know What Comes Next.',
    body: 'GUC\'s campus runs a Solar City project that feeds renewable energy back into the university grid — one of the most visible sustainability commitments in Egypt\'s university sector. REVIVE runs year-round waste campaigns, campus green audits, and NGO partnerships to push that commitment further at the student level.',
    targetAudience: 'All',
    clubId: 'guc-revive',
    createdAt: '2026-07-23T10:00:00',
    author: 'Menna Ali',
  },
  {
    id: 'revive-3',
    title: 'Can GUC Cut Single-Use Plastic by 50% in Five Days?',
    body: 'That\'s REVIVE\'s Circular Campus Challenge for Sustainability Week — participants track daily waste and log it live on @revive.guc. Last year\'s pilot with 120 students hit 38% reduction. This year\'s target: 500 participants. Sign up at the REVIVE booth in the Main Courtyard from September 14th.',
    targetAudience: 'All',
    clubId: 'guc-revive',
    createdAt: '2026-07-08T12:00:00',
    author: 'Laila Saad',
  },

  // ─── VGS ──────────────────────────────────────────────────────────────────

  {
    id: 'vgs-1',
    title: 'VGS Fall 2026 — Esports Tournament + 48-Hour Game Jam',
    body: 'Fall Esports Tournament (FIFA, Valorant, Tekken) — register by September 10th at @vgsguc. 48-Hour Game Jam runs September 19–21 in C5\'s open labs: one surprise theme at kickoff, a playable game submitted 48 hours later. Open to all GUC students, no coding required.',
    targetAudience: 'All',
    clubId: 'guc-vgs',
    createdAt: '2026-08-13T15:00:00',
    author: 'Ziad Mostafa',
  },
  {
    id: 'vgs-2',
    title: 'What Is a Game Jam — and Why GUC Students Should Try It',
    body: 'One surprise theme. 48 hours. A playable game. The constraint forces you to scope fast, prototype under pressure, and ship something real. Past VGS Game Jam entries have been uploaded to itch.io and referenced in job interviews at Cairo-based studios. Solo or teams of up to 3.',
    targetAudience: 'All',
    clubId: 'guc-vgs',
    createdAt: '2026-07-31T09:00:00',
    author: 'Nada Kamel',
  },
  {
    id: 'vgs-3',
    title: 'VGS Has Five Committees — Four Don\'t Require Code',
    body: 'Game Development (Unity, Unreal, Godot) is one of five committees. Digital Art & Design, Sound & Music Design, Esports & Tournaments, and Media & Content are the other four — for designers, musicians, organisers, and storytellers. Founded 2020. GUC\'s only club dedicated entirely to games as a craft.',
    targetAudience: 'All',
    clubId: 'guc-vgs',
    createdAt: '2026-07-16T14:00:00',
    author: 'Ziad Mostafa',
  },
]
