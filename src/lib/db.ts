/**
 * Clubify local database — wraps localStorage so every change is persisted.
 * Swap the read/write helpers to Supabase calls when the backend is ready.
 */

import type { Club, ClubEvent, Committee } from '../data/types'

// ─── Extra types not in types.ts yet ──────────────────────────────────────────

export interface InterviewSlot {
  id: string
  clubId: string
  committeeId: string
  datetime: string      // ISO 8601
  isBooked: boolean
  bookedByStudentId?: string
}

export type ApplicationStatus = 'pending' | 'interview_scheduled' | 'accepted' | 'rejected'

export interface Application {
  id: string
  studentId: string
  studentName: string
  studentEmail: string
  clubId: string
  committeeId: string
  committeeName: string
  status: ApplicationStatus
  appliedAt: string
  slotId?: string
}

export interface AdminUser {
  email: string
  clubId: string
}

// ─── Keys ─────────────────────────────────────────────────────────────────────

const K = {
  clubs:        'clubify_db_clubs',
  events:       'clubify_db_events',
  slots:        'clubify_db_slots',
  applications: 'clubify_db_applications',
  admins:       'clubify_db_admins',
  seeded:       'clubify_db_seeded_v7',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

// ─── Seed data ────────────────────────────────────────────────────────────────

const SEED_ADMINS: AdminUser[] = [
  { email: 'inspire.admin@guc.edu.eg',  clubId: 'guc-inspire'  },
  { email: 'mun.admin@guc.edu.eg',      clubId: 'guc-mun'      },
  { email: 'revive.admin@guc.edu.eg',   clubId: 'guc-revive'   },
  { email: 'ieee.admin@guc.edu.eg',     clubId: 'guc-ieee'     },
  { email: 'vgs.admin@guc.edu.eg',      clubId: 'guc-vgs'      },
  { email: 'athar.admin@guc.edu.eg',    clubId: 'guc-athar'    },
  { email: 'cura.admin@guc.edu.eg',     clubId: 'guc-cura'     },
  { email: 'ayb.admin@guc.edu.eg',      clubId: 'guc-ayb'      },
  { email: 'tedx.admin@guc.edu.eg',     clubId: 'guc-tedx'     },
  { email: 'insider.admin@guc.edu.eg',  clubId: 'guc-insider'  },
]

const SEED_CLUBS: Club[] = [
  // ── INSPIRE ──────────────────────────────────────────────────────────────────
  {
    id: 'guc-inspire',
    name: 'INSPIRE',
    slug: 'inspire',
    category: 'Sports',
    logo: 'https://placehold.co/80x80/FDA014/272831?text=INS',
    coverImage: 'https://placehold.co/600x200/FDA014/272831?text=INSPIRE',
    description: 'INSPIRE is GUC\'s Active Working Group for physical, mental, and social well-being. Since 2013, we\'ve run the GUC Premier League (football), Trivia Tournaments, marathons, and year-round athletic events that bring the whole university together. Our motto: "Look up, Get up & Never give up."',
    mission: 'To promote physical, mental, and social well-being among GUC students through competitive sports, recreational events, and a culture where every student feels empowered to be active.',
    memberCount: 150,
    founded: 2013,
    contactEmail: 'inspire@guc.edu.eg',
    socialLinks: { instagram: 'https://www.instagram.com/gucinspire/', facebook: 'https://www.facebook.com/gucinspire/' },
    tags: ['Sports', 'Health', 'Wellness', 'Football', 'Athletics', 'Fitness'],
    isRecruiting: false,
    committees: [
      { id: 'inspire-mpd', name: 'Media Production & Design (MPD)', description: 'Produces all visual content, photography, video, and graphic design for INSPIRE\'s events and social media.', spotsAvailable: 6 },
      { id: 'inspire-pr',  name: 'Public Relations (PR)',            description: 'Manages external communications, campus partnerships, sponsor relations, and INSPIRE\'s public image.', spotsAvailable: 5 },
      { id: 'inspire-fr',  name: 'Fund-Raising (FR)',                description: 'Sources and manages sponsorships, fundraising campaigns, and financial resources that power INSPIRE\'s events.', spotsAvailable: 4 },
      { id: 'inspire-op',  name: 'Operations (OP)',                  description: 'Handles all on-ground logistics — venue booking, equipment, scheduling, and event-day execution.', spotsAvailable: 8 },
    ],
    events: [],
    members: [],
    spotlightContent: {},
    whoShouldJoin: 'Any GUC student who loves sports, fitness, or building a healthier campus community. Whether you\'re athletic or just want to get moving — INSPIRE is for everyone.',
  },

  // ── MUN ───────────────────────────────────────────────────────────────────────
  {
    id: 'guc-mun',
    name: 'GUC MUN',
    slug: 'mun',
    category: 'Academic',
    logo: 'https://placehold.co/80x80/1B3A6B/FFFFFF?text=MUN',
    coverImage: 'https://placehold.co/600x200/1B3A6B/FFFFFF?text=GUC+MUN',
    description: 'GUC Model United Nations is one of the most prestigious student organisations at the German University in Cairo, hosting delegates from across Egypt and beyond. With 1,000+ participants annually and a delegation that has visited the UN Headquarters in New York, GUCMUN is a launchpad for future diplomats, lawyers, and global leaders.',
    mission: 'To cultivate research, public speaking, and diplomatic skills by simulating the United Nations and empowering students to engage with real-world global challenges.',
    memberCount: 180,
    founded: 2009,
    contactEmail: 'mun@guc.edu.eg',
    socialLinks: { instagram: 'https://www.instagram.com/gucmun/', facebook: 'https://www.facebook.com/GUCMUN' },
    tags: ['Debate', 'Diplomacy', 'Public Speaking', 'Research', 'Leadership', 'International Relations'],
    isRecruiting: false,
    committees: [
      { id: 'mun-delegates',   name: 'Delegate Affairs', description: 'Trains delegates, prepares position papers, and coordinates conference participation.', spotsAvailable: 20 },
      { id: 'mun-secretariat', name: 'Secretariat',      description: 'The executive backbone — organises GUCMUN conferences and coordinates all committees.', spotsAvailable: 8 },
      { id: 'mun-media',       name: 'Media & Press',    description: 'Covers conferences, produces the press corps bulletin, and manages social media.', spotsAvailable: 6 },
      { id: 'mun-logistics',   name: 'Logistics',        description: 'Handles venue setup, catering, delegate registration, and event day coordination.', spotsAvailable: 5 },
    ],
    events: [],
    members: [],
    spotlightContent: {},
    whoShouldJoin: 'Students passionate about politics, international law, global affairs, debating, and leadership. Open to all faculties — you don\'t need a political science background to join.',
  },

  // ── REVIVE ────────────────────────────────────────────────────────────────────
  {
    id: 'guc-revive',
    name: 'REVIVE',
    slug: 'revive',
    category: 'Community',
    logo: 'https://placehold.co/80x80/2E8B57/FFFFFF?text=REV',
    coverImage: 'https://placehold.co/600x200/2E8B57/FFFFFF?text=REVIVE',
    description: 'REVIVE is GUC\'s environmental and sustainability club, dedicated to reviving our relationship with the planet. Through awareness campaigns, clean-up drives, recycling initiatives, and eco-workshops, we empower students to become active agents of environmental change on campus and in the wider community.',
    mission: 'To inspire and equip GUC students to take meaningful action on environmental issues, fostering a culture of sustainability on campus and beyond.',
    memberCount: 90,
    founded: 2018,
    contactEmail: 'revive@guc.edu.eg',
    socialLinks: { instagram: 'https://www.instagram.com/revive.guc/' },
    tags: ['Environment', 'Sustainability', 'Eco', 'Community', 'Volunteering'],
    isRecruiting: false,
    committees: [
      { id: 'revive-env',    name: 'Environment & Research',  description: 'Investigates environmental issues and designs science-backed sustainability campaigns.', spotsAvailable: 6 },
      { id: 'revive-events', name: 'Events & Campaigns',      description: 'Organises clean-up drives, tree-planting days, and recycling initiatives.', spotsAvailable: 8 },
      { id: 'revive-media',  name: 'Media & Communications',  description: 'Creates content that raises environmental awareness on social media and on campus.', spotsAvailable: 5 },
      { id: 'revive-pr',     name: 'Partnerships & Outreach', description: 'Builds relationships with NGOs, companies, and government bodies around sustainability.', spotsAvailable: 4 },
    ],
    events: [],
    members: [],
    spotlightContent: {},
    whoShouldJoin: 'Students who care about the environment and want to make a tangible difference. Whether you\'re passionate about climate change, recycling, or just love nature — REVIVE is your home.',
  },

  // ── IEEE ──────────────────────────────────────────────────────────────────────
  {
    id: 'guc-ieee',
    name: 'GUC IEEE',
    slug: 'ieee',
    category: 'Technology',
    logo: 'https://placehold.co/80x80/00629B/FFFFFF?text=IEEE',
    coverImage: 'https://placehold.co/600x200/00629B/FFFFFF?text=GUC+IEEE',
    description: 'The GUC IEEE Student Branch is the most active technical club on campus and an official branch of the world\'s largest technical professional organisation. IEEE GUC runs on two major branches — Organizing and Technical — delivering hands-on workshops in PCB design, cybersecurity, GitHub & version control, and electronics while supplying project hardware packages to GUC students.',
    mission: 'To inspire students to innovate for a better future through technical sessions, workshops, and educational activities — bridging classroom theory and real-world engineering while building a professional network from students to industry.',
    memberCount: 200,
    founded: 2006,
    contactEmail: 'ieee@guc.edu.eg',
    socialLinks: { instagram: 'https://www.instagram.com/ieeegucsb/', linkedin: 'https://linkedin.com/company/gucieee' },
    tags: ['Engineering', 'Technology', 'Electronics', 'Cybersecurity', 'PCB', 'STEM', 'Hardware'],
    isRecruiting: false,
    committees: [
      { id: 'ieee-technical',  name: 'Technical Committee',    description: 'The technical brain of IEEE GUC — plans and delivers high-level workshops in PCB design, cybersecurity, GitHub, embedded systems, and more.', spotsAvailable: 12 },
      { id: 'ieee-organizing', name: 'Organizing Committee',   description: 'The operational arm of IEEE GUC — coordinates all events, logistics, venue management, and the hardware packages supplied to GUC students.', spotsAvailable: 10 },
      { id: 'ieee-media',      name: 'Media & Design',         description: 'Handles all photography, graphic design, video content, and social media presence for IEEE GUC.', spotsAvailable: 6 },
      { id: 'ieee-hr',         name: 'Human Resources',        description: 'Manages IEEE GUC\'s recruitment cycles, member onboarding, and internal community engagement throughout the year.', spotsAvailable: 5 },
    ],
    events: [],
    members: [],
    spotlightContent: {},
    whoShouldJoin: 'Engineering, CS, and DMET students who want practical technical skills beyond the classroom. IEEE is also open to anyone passionate about how technology works and wants to build real projects.',
  },

  // ── VGS ───────────────────────────────────────────────────────────────────────
  {
    id: 'guc-vgs',
    name: 'VGS',
    slug: 'vgs',
    category: 'Technology',
    logo: 'https://placehold.co/80x80/6B21A8/FFFFFF?text=VGS',
    coverImage: 'https://placehold.co/600x200/6B21A8/FFFFFF?text=VGS',
    description: 'VGS (Vector Game Studio) is GUC\'s game development community, dedicated to advancing skills in game development, sound and music design, and digital art. We build games from scratch — concept to playable — while also running an active esports scene with university-level tournaments. If you create, code, compose, or compete, VGS is your studio.',
    mission: 'To advance game development, digital art, and sound design skills at GUC while building a competitive esports community and producing original student-made games.',
    memberCount: 110,
    founded: 2020,
    contactEmail: 'vgs@guc.edu.eg',
    socialLinks: { instagram: 'https://www.instagram.com/vgsguc/', facebook: 'https://www.facebook.com/vgsguc/' },
    tags: ['Gaming', 'Game Development', 'Esports', 'Digital Art', 'Sound Design', 'Music', 'Technology'],
    isRecruiting: false,
    committees: [
      { id: 'vgs-dev',     name: 'Game Development',       description: 'Builds games using Unity, Unreal Engine, and other tools — programmers, game designers, and producers collaborate here.', spotsAvailable: 10 },
      { id: 'vgs-art',     name: 'Digital Art & Design',   description: 'Creates 2D/3D game art, character design, UI/UX, and all visual assets for VGS projects.', spotsAvailable: 8 },
      { id: 'vgs-sound',   name: 'Sound & Music Design',   description: 'Composes original soundtracks, designs sound effects, and handles all audio production for VGS games and events.', spotsAvailable: 5 },
      { id: 'vgs-esports', name: 'Esports & Tournaments',  description: 'Organises inter-university gaming tournaments, manages competitive teams, and represents GUC in esports.', spotsAvailable: 8 },
      { id: 'vgs-media',   name: 'Media & Content',        description: 'Documents the VGS journey — social media, event coverage, behind-the-scenes content, and livestreams.', spotsAvailable: 5 },
    ],
    events: [],
    members: [],
    spotlightContent: {},
    whoShouldJoin: 'Gamers, developers, designers, musicians, and storytellers who want to turn their passion into real games. No prior experience needed — VGS has a place for every creative and technical skill.',
  },

  // ── ATHAR ────────────────────────────────────────────────────────────────────
  {
    id: 'guc-athar',
    name: 'ATHAR',
    slug: 'athar',
    category: 'Community',
    logo: 'https://placehold.co/80x80/D97706/FFFFFF?text=ATH',
    coverImage: 'https://placehold.co/600x200/D97706/FFFFFF?text=ATHAR',
    description: 'ATHAR is GUC\'s Active Working Group for community service, operating where help is needed most. We teach in underserved communities like Mansheyet Nasser, partner with organisations like Tooth Guards for dental health outreach (reaching 82+ children), and run campaigns that leave a tangible mark. We also collaborate with AYB GUC on joint community impact initiatives.',
    mission: 'To empower GUC students to create lasting change in Egyptian communities through hands-on service, education, and health outreach — because real impact starts on the ground.',
    memberCount: 130,
    founded: 2015,
    contactEmail: 'athar@guc.edu.eg',
    socialLinks: { instagram: 'https://www.instagram.com/athar_guc/', linkedin: 'https://eg.linkedin.com/company/athar-guc' },
    tags: ['Community Service', 'Charity', 'Volunteering', 'Education', 'Health Outreach', 'Social Impact'],
    isRecruiting: false,
    committees: [
      { id: 'athar-education',    name: 'Education Outreach',    description: 'Runs tutoring sessions, workshops, and educational activities in Mansheyet Nasser and other underserved communities.', spotsAvailable: 10 },
      { id: 'athar-health',       name: 'Health & Community',    description: 'Organises dental health drives, medical awareness campaigns, and health education initiatives in partnership with organisations like Tooth Guards.', spotsAvailable: 8 },
      { id: 'athar-fundraising',  name: 'Fund-Raising',          description: 'Secures sponsorships and runs fundraising campaigns to finance ATHAR\'s community projects and field trips.', spotsAvailable: 6 },
      { id: 'athar-media',        name: 'Media & Marketing',     description: 'Documents ATHAR\'s on-ground impact through photography, videography, graphic design, and social media storytelling.', spotsAvailable: 5 },
      { id: 'athar-events',       name: 'Events & Logistics',    description: 'Plans and coordinates all field trips, community visits, campaigns, and event-day operations.', spotsAvailable: 7 },
    ],
    events: [],
    members: [],
    spotlightContent: {},
    whoShouldJoin: 'Students who believe in giving back and want to make a real, hands-on difference in people\'s lives. All faculties welcome — ATHAR needs educators, healthcare students, designers, and organisers alike.',
  },

  // ── CURA ─────────────────────────────────────────────────────────────────────
  {
    id: 'guc-cura',
    name: 'CURA',
    slug: 'cura',
    category: 'Technology',
    logo: 'https://placehold.co/80x80/7E22CE/FFFFFF?text=CUR',
    coverImage: 'https://placehold.co/600x200/7E22CE/FFFFFF?text=CURA',
    description: 'CURA is GUC\'s student-led assistive technology club, founded in 2022. We are a dynamic community of passionate students committed to leveraging cutting-edge technology to solve real challenges — specifically amputation and paraplegia. We design and build prototypes for artificial limbs and assistive devices, aiming to redefine the market for locally developed assistive tech in Egypt.',
    mission: 'To empower individuals with disabilities through innovative assistive technologies by building a multi-disciplinary student team that prototypes real solutions, raises awareness, and connects GUC with organisations dedicated to helping people with physical challenges.',
    memberCount: 70,
    founded: 2022,
    contactEmail: 'cura@guc.edu.eg',
    socialLinks: { instagram: 'https://www.instagram.com/curaxguc/' },
    tags: ['Assistive Technology', 'Bioengineering', 'Disability', 'Innovation', 'Engineering', 'Technology'],
    isRecruiting: false,
    committees: [
      { id: 'cura-engineering', name: 'Engineering & Prototyping', description: 'The core technical team — designs, builds, and tests prototypes for artificial limbs and assistive devices using engineering principles and rapid prototyping.', spotsAvailable: 10 },
      { id: 'cura-design',      name: 'Design & Research',         description: 'Handles product design, ergonomics, materials research, and user testing to ensure assistive devices are practical and human-centred.', spotsAvailable: 7 },
      { id: 'cura-outreach',    name: 'Community Outreach',        description: 'Connects CURA with local organisations supporting people with disabilities, arranges visits, and ensures our work reaches the people who need it most.', spotsAvailable: 6 },
      { id: 'cura-media',       name: 'Media & Marketing',         description: 'Raises awareness of CURA\'s mission and assistive technology through compelling content, events, and campus campaigns.', spotsAvailable: 5 },
    ],
    events: [],
    members: [],
    spotlightContent: {},
    whoShouldJoin: 'Engineering, DMET, pharmacy, and science students who want to use technology to genuinely change lives. CURA is a multi-disciplinary team — designers, researchers, and communicators are all equally needed.',
  },

  // ── AYB ───────────────────────────────────────────────────────────────────────
  {
    id: 'guc-ayb',
    name: 'AYB',
    slug: 'ayb',
    category: 'Community',
    logo: 'https://placehold.co/80x80/F59E0B/272831?text=AYB',
    coverImage: 'https://placehold.co/600x200/F59E0B/272831?text=AYB',
    description: 'AYB GUC is a student-led community development club fighting poverty through sustainable development — not just instant aid. We work on the ground in El-Matareya, one of Cairo\'s most underserved districts, running education programmes, vocational projects, and long-term community initiatives. "نحلم نشوف المجتمعات الفقيرة في بلدنا أحسن" — we dream of seeing our country\'s poorest communities thrive.',
    mission: 'To combat poverty in underserved Egyptian communities through education, skill-building, and sustainable development projects — empowering both the communities we serve and the students who serve them.',
    memberCount: 180,
    founded: 2016,
    contactEmail: 'ayb@guc.edu.eg',
    socialLinks: { instagram: 'https://www.instagram.com/ayb_guc/', facebook: 'https://www.facebook.com/AYB.GUC' },
    tags: ['Community Development', 'Poverty Alleviation', 'Sustainable Development', 'Education', 'Volunteering', 'Social Impact'],
    isRecruiting: false,
    committees: [
      { id: 'ayb-community',   name: 'Community Development',    description: 'The core of AYB — designs and implements sustainable development projects in El-Matareya, working directly with community members.', spotsAvailable: 12 },
      { id: 'ayb-education',   name: 'Education & Projects',     description: 'Runs tutoring, vocational training, and skill-building programmes for residents of underserved districts.', spotsAvailable: 10 },
      { id: 'ayb-media',       name: 'Media & Communications',   description: 'Documents AYB\'s impact on the ground and tells the stories of the communities and students involved — on social media and beyond.', spotsAvailable: 6 },
      { id: 'ayb-outreach',    name: 'Outreach & Partnerships',  description: 'Builds relationships with NGOs, government bodies, and companies to expand AYB\'s reach and secure resources for projects.', spotsAvailable: 5 },
    ],
    events: [],
    members: [],
    spotlightContent: {},
    whoShouldJoin: 'Students who believe in using their university years to make a real, lasting difference in Egyptian society. AYB is for doers — people ready to show up, get involved, and help build something meaningful.',
  },

  // ── TEDx ─────────────────────────────────────────────────────────────────────
  {
    id: 'guc-tedx',
    name: 'TEDxGUC',
    slug: 'tedx',
    category: 'Academic',
    logo: 'https://placehold.co/80x80/E11D48/FFFFFF?text=TEDx',
    coverImage: 'https://placehold.co/600x200/E11D48/FFFFFF?text=TEDxGUC',
    description: 'TEDxGUC is an independently organised TED event at the German University in Cairo, bringing together archaeologists, artists, neuropsychiatrists, entrepreneurs, and thought leaders to share ideas worth spreading. From full-scale TEDxGUC conferences to intimate TEDxGUCSalon gatherings, we spark the conversations that matter.',
    mission: 'To create a platform where ideas worth spreading can reach and inspire the GUC community and beyond, empowering students to think bigger about the world.',
    memberCount: 100,
    founded: 2013,
    contactEmail: 'tedx@guc.edu.eg',
    socialLinks: { instagram: 'https://www.instagram.com/tedxguc__/' },
    tags: ['Talks', 'Leadership', 'Ideas', 'Academic', 'Innovation', 'Inspiration'],
    isRecruiting: false,
    committees: [
      { id: 'tedx-speakers',  name: 'Speakers & Content',          description: 'Identifies, coaches, and prepares speakers to deliver powerful TEDx-worthy talks.', spotsAvailable: 8 },
      { id: 'tedx-marketing', name: 'Marketing & Outreach',        description: 'Builds TEDxGUC\'s brand, manages social media, and drives event attendance.', spotsAvailable: 7 },
      { id: 'tedx-ops',       name: 'Operations & Logistics',      description: 'Manages venue setup, event production, AV, and the seamless running of conferences.', spotsAvailable: 8 },
      { id: 'tedx-partners',  name: 'Partnerships & Sponsorships', description: 'Secures sponsors and builds relationships with organisations aligned with TED\'s mission.', spotsAvailable: 5 },
    ],
    events: [],
    members: [],
    spotlightContent: {},
    whoShouldJoin: 'Students who love ideas, storytelling, and bringing people together around conversations that matter. Organising a TEDx event is one of the most impactful things you can do in university.',
  },

  // ── INSIDER ───────────────────────────────────────────────────────────────────
  {
    id: 'guc-insider',
    name: 'INSIDER',
    slug: 'insider',
    category: 'Media',
    logo: 'https://placehold.co/80x80/272831/FFFFFF?text=INS',
    coverImage: 'https://placehold.co/600x200/272831/FFFFFF?text=INSIDER',
    description: 'INSIDER is the first independent student newspaper at the German University in Cairo — and at 13 years old, it\'s one of GUC\'s most established clubs. We publish in both English and Arabic, covering campus events, student achievements, culture, science, opinion, and literature. With 11+ printed issues and an active digital presence, INSIDER is the student voice of GUC.',
    mission: 'To provide GUC students with an independent, bilingual, student-run media platform that informs, challenges, and amplifies the diverse voices of our campus community.',
    memberCount: 85,
    founded: 2011,
    contactEmail: 'insider@guc.edu.eg',
    socialLinks: { instagram: 'https://www.instagram.com/insiderguc/', website: 'https://insiderguc.wordpress.com' },
    tags: ['Journalism', 'Media', 'Writing', 'Photography', 'Design', 'Newspaper', 'Arabic', 'English'],
    isRecruiting: false,
    committees: [
      { id: 'insider-editorial',  name: 'Writing & Editorial',    description: 'Pitches, writes, edits, and fact-checks articles across all sections — campus life, culture, science, opinion, and features — in both English and Arabic.', spotsAvailable: 10 },
      { id: 'insider-design',     name: 'Design & Layout',        description: 'Designs INSIDER\'s print and digital layouts — from cover art and typography to page composition and brand consistency across every issue.', spotsAvailable: 5 },
      { id: 'insider-photo',      name: 'Photography & Visuals',  description: 'Photographs campus life, events, and portraits that visually bring INSIDER\'s stories to life in print and online.', spotsAvailable: 4 },
      { id: 'insider-digital',    name: 'Digital Media & Social',  description: 'Manages INSIDER\'s WordPress site, Instagram, and digital strategy — expanding the newspaper\'s reach beyond print.', spotsAvailable: 4 },
    ],
    events: [],
    members: [],
    spotlightContent: {},
    whoShouldJoin: 'Students who love writing, journalism, photography, or design — in English or Arabic or both. If you have a story, an opinion, or a creative eye, INSIDER is your platform.',
  },
]

const SEED_EVENTS: ClubEvent[] = [
  {
    id: 'ev-inspire-1',
    clubId: 'guc-inspire',
    title: 'GUC Premier League — Season Kickoff',
    date: '2026-09-15',
    time: '4:00 PM',
    location: 'GUC Sports Court',
    description: 'The annual INSPIRE Premier League football season begins. Register your team and compete for the campus title.',
    type: 'Social',
  },
  {
    id: 'ev-mun-1',
    clubId: 'guc-mun',
    title: 'GUCMUN 2026 — Annual Conference',
    date: '2026-10-10',
    time: '9:00 AM',
    location: 'Main Auditorium',
    description: 'The flagship GUCMUN conference. Delegates from across Egypt represent world nations in simulated UN committees.',
    type: 'Social',
  },
  {
    id: 'ev-ieee-1',
    clubId: 'guc-ieee',
    title: 'Cybersecurity Workshop',
    date: '2026-09-20',
    time: '2:00 PM',
    location: 'Engineering Lab B1.204',
    description: 'Hands-on session covering ethical hacking basics, network security, and CTF challenges.',
    type: 'Workshop',
  },
  {
    id: 'ev-ieee-2',
    clubId: 'guc-ieee',
    title: 'PCB Design with KiCad',
    date: '2026-10-05',
    time: '2:00 PM',
    location: 'Engineering Lab B1.204',
    description: 'Learn to design printed circuit boards from scratch using KiCad. Components provided.',
    type: 'Workshop',
  },
  {
    id: 'ev-vgs-1',
    clubId: 'guc-vgs',
    title: 'GUC Esports Tournament 2026',
    date: '2026-09-28',
    time: '3:00 PM',
    location: 'Main Hall C5',
    description: 'Inter-faculty esports showdown — FIFA, Valorant, and more. Register solo or as a team.',
    type: 'Social',
  },
  {
    id: 'ev-athar-1',
    clubId: 'guc-athar',
    title: 'Mansheyet Nasser Teaching Day',
    date: '2026-09-12',
    time: '10:00 AM',
    location: 'Mansheyet Nasser Community Centre',
    description: 'Join ATHAR volunteers for a day of tutoring and educational workshops for underprivileged children.',
    type: 'Workshop',
  },
  {
    id: 'ev-cura-1',
    clubId: 'guc-cura',
    title: 'CURA Assistive Tech Showcase',
    date: '2026-09-22',
    time: '4:00 PM',
    location: 'Engineering Atrium, H building',
    description: 'CURA presents its latest prosthetic limb and assistive device prototypes. Come see student-built technology that\'s changing lives, and learn how to get involved.',
    type: 'Talk',
  },
  {
    id: 'ev-ayb-1',
    clubId: 'guc-ayb',
    title: 'El-Matareya Community Day',
    date: '2026-09-26',
    time: '9:00 AM',
    location: 'El-Matareya Community Centre — meet at GUC Main Gate',
    description: 'Join AYB GUC for our monthly community development day in El-Matareya. Activities include tutoring sessions, skills workshops, and project work with local residents.',
    type: 'Social',
  },
  {
    id: 'ev-tedx-1',
    clubId: 'guc-tedx',
    title: 'TEDxGUCSalon — "Second Chances"',
    date: '2026-10-15',
    time: '6:00 PM',
    location: 'C5 Auditorium',
    description: 'An intimate TEDxGUCSalon evening with three speakers exploring reinvention, failure, and new beginnings.',
    type: 'Talk',
  },
  {
    id: 'ev-insider-1',
    clubId: 'guc-insider',
    title: 'INSIDER Issue 12 — Launch & Reading',
    date: '2026-09-30',
    time: '4:00 PM',
    location: 'GUC Library Atrium',
    description: 'Celebrate the launch of INSIDER\'s 12th printed issue. Writers share their favourite pieces. Copies available free.',
    type: 'Social',
  },
  {
    id: 'ev-revive-1',
    clubId: 'guc-revive',
    title: 'Campus Clean-Up Day',
    date: '2026-09-18',
    time: '9:00 AM',
    location: 'GUC Campus — meet at Gate 2',
    description: 'Join REVIVE for a campus-wide clean-up and recycling drive. Gloves and bags provided. Refreshments after.',
    type: 'Social',
  },
]

// ─── Initialization ────────────────────────────────────────────────────────────

export function initDB(): void {
  if (localStorage.getItem(K.seeded)) return

  // Wipe ALL clubify_ keys so stale data from older seed versions never bleeds through.
  const staleKeys = Object.keys(localStorage).filter((k) => k.startsWith('clubify_'))
  staleKeys.forEach((k) => localStorage.removeItem(k))

  write(K.clubs, SEED_CLUBS)
  write(K.events, SEED_EVENTS)
  write(K.slots, [] as InterviewSlot[])
  write(K.applications, [] as Application[])
  write(K.admins, SEED_ADMINS)
  localStorage.setItem(K.seeded, '1')
}

// ─── Clubs ────────────────────────────────────────────────────────────────────

export function getClubs(): Club[] {
  return read<Club[]>(K.clubs, SEED_CLUBS)
}

export function getClub(id: string): Club | undefined {
  return getClubs().find((c) => c.id === id)
}

export function getClubBySlug(slug: string): Club | undefined {
  return getClubs().find((c) => c.slug === slug)
}

export function updateClub(id: string, updates: Partial<Club>): void {
  const clubs = getClubs()
  const idx = clubs.findIndex((c) => c.id === id)
  if (idx === -1) return
  clubs[idx] = { ...clubs[idx], ...updates }
  write(K.clubs, clubs)
}

export function toggleRecruitment(clubId: string, open: boolean): void {
  updateClub(clubId, { isRecruiting: open })
}

// ─── Events ───────────────────────────────────────────────────────────────────

export function getEvents(clubId?: string): ClubEvent[] {
  const all = read<ClubEvent[]>(K.events, SEED_EVENTS)
  return clubId ? all.filter((e) => e.clubId === clubId) : all
}

export function addEvent(event: ClubEvent): void {
  const events = read<ClubEvent[]>(K.events, [])
  write(K.events, [...events, event])
}

export function removeEvent(eventId: string): void {
  const events = read<ClubEvent[]>(K.events, [])
  write(K.events, events.filter((e) => e.id !== eventId))
}

export function updateEvent(eventId: string, updates: Partial<ClubEvent>): void {
  const events = read<ClubEvent[]>(K.events, [])
  const idx = events.findIndex((e) => e.id === eventId)
  if (idx === -1) return
  events[idx] = { ...events[idx], ...updates }
  write(K.events, events)
}

// ─── Interview Slots ──────────────────────────────────────────────────────────

export function getSlots(clubId?: string): InterviewSlot[] {
  const all = read<InterviewSlot[]>(K.slots, [])
  return clubId ? all.filter((s) => s.clubId === clubId) : all
}

export function addSlot(slot: Omit<InterviewSlot, 'id' | 'isBooked'>): InterviewSlot {
  const slots = read<InterviewSlot[]>(K.slots, [])
  const newSlot: InterviewSlot = { ...slot, id: `slot-${Date.now()}`, isBooked: false }
  write(K.slots, [...slots, newSlot])
  return newSlot
}

export function removeSlot(slotId: string): void {
  const slots = read<InterviewSlot[]>(K.slots, [])
  write(K.slots, slots.filter((s) => s.id !== slotId))
}

export function bookSlot(slotId: string, studentId: string): boolean {
  const slots = read<InterviewSlot[]>(K.slots, [])
  const idx = slots.findIndex((s) => s.id === slotId)
  if (idx === -1 || slots[idx].isBooked) return false
  slots[idx] = { ...slots[idx], isBooked: true, bookedByStudentId: studentId }
  write(K.slots, slots)
  return true
}

// ─── Applications ─────────────────────────────────────────────────────────────

export function getApplications(clubId?: string): Application[] {
  const all = read<Application[]>(K.applications, [])
  return clubId ? all.filter((a) => a.clubId === clubId) : all
}

export function getStudentApplications(studentId: string): Application[] {
  return read<Application[]>(K.applications, []).filter((a) => a.studentId === studentId)
}

export function getApplication(studentId: string, clubId: string): Application | undefined {
  return read<Application[]>(K.applications, []).find(
    (a) => a.studentId === studentId && a.clubId === clubId
  )
}

export function submitApplication(app: Omit<Application, 'id' | 'appliedAt' | 'status'>): Application {
  const applications = read<Application[]>(K.applications, [])
  const existing = applications.find((a) => a.studentId === app.studentId && a.clubId === app.clubId)
  if (existing) throw new Error('ALREADY_APPLIED')

  const newApp: Application = {
    ...app,
    id: `app-${Date.now()}`,
    status: 'pending',
    appliedAt: new Date().toISOString(),
  }
  write(K.applications, [...applications, newApp])
  return newApp
}

export function assignSlotToApplication(applicationId: string, slotId: string, studentId: string): void {
  const applications = read<Application[]>(K.applications, [])
  const idx = applications.findIndex((a) => a.id === applicationId)
  if (idx === -1) return

  const booked = bookSlot(slotId, studentId)
  if (!booked) throw new Error('SLOT_TAKEN')

  applications[idx] = { ...applications[idx], slotId, status: 'interview_scheduled' }
  write(K.applications, applications)
}

export function updateApplicationStatus(applicationId: string, status: ApplicationStatus): void {
  const applications = read<Application[]>(K.applications, [])
  const idx = applications.findIndex((a) => a.id === applicationId)
  if (idx === -1) return
  applications[idx] = { ...applications[idx], status }
  write(K.applications, applications)
}

// ─── Admin Users ──────────────────────────────────────────────────────────────

export function getAdminClubId(email: string): string | undefined {
  const admins = read<AdminUser[]>(K.admins, SEED_ADMINS)
  return admins.find((a) => a.email.toLowerCase() === email.toLowerCase())?.clubId
}

export function setAdminClub(email: string, clubId: string): void {
  const admins = read<AdminUser[]>(K.admins, SEED_ADMINS)
  const idx = admins.findIndex((a) => a.email.toLowerCase() === email.toLowerCase())
  if (idx === -1) {
    write(K.admins, [...admins, { email, clubId }])
  } else {
    admins[idx] = { email, clubId }
    write(K.admins, admins)
  }
}
