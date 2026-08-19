import type { Club, ClubEvent } from './types'

export const clubs: Club[] = [

  // ── INSPIRE ──────────────────────────────────────────────────────────────
  {
    id: 'guc-inspire',
    name: 'INSPIRE',
    slug: 'inspire',
    category: 'Sports',
    logo: 'https://placehold.co/80x80/FDA014/272831?text=INS',
    coverImage: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80',
    description: 'INSPIRE is GUC\'s Active Working Group for physical, mental, and social well-being. Since 2013, we\'ve run the GUC Premier League (football), Trivia Tournaments, marathons, and year-round athletic events that bring the whole university together. Our motto: "Look up, Get up & Never give up."',
    mission: 'To promote physical, mental, and social well-being among GUC students through competitive sports, recreational events, and a culture where every student feels empowered to be active.',
    memberCount: 150,
    founded: 2013,
    contactEmail: 'inspire@guc.edu.eg',
    socialLinks: { instagram: 'https://www.instagram.com/gucinspire/', facebook: 'https://www.facebook.com/gucinspire/' },
    tags: ['Sports', 'Health', 'Wellness', 'Football', 'Athletics', 'Fitness'],
    isRecruiting: true,
    recruitmentDeadline: '2026-09-01',
    spotsLeft: 23,
    committees: [
      { id: 'inspire-mpd', name: 'Media Production & Design (MPD)', description: 'Produces all visual content, photography, video, and graphic design for INSPIRE\'s events and social media.', spotsAvailable: 6 },
      { id: 'inspire-pr',  name: 'Public Relations (PR)',            description: 'Manages external communications, campus partnerships, sponsor relations, and INSPIRE\'s public image.', spotsAvailable: 5 },
      { id: 'inspire-fr',  name: 'Fund-Raising (FR)',                description: 'Sources and manages sponsorships, fundraising campaigns, and financial resources that power INSPIRE\'s events.', spotsAvailable: 4 },
      { id: 'inspire-op',  name: 'Operations (OP)',                  description: 'Handles all on-ground logistics — venue booking, equipment, scheduling, and event-day execution.', spotsAvailable: 8 },
    ],
    events: [
      {
        id: 'ev-inspire-1',
        clubId: 'guc-inspire',
        title: 'GUC Premier League — Season Kickoff',
        date: '2026-09-15',
        time: '4:00 PM',
        location: 'GUC Sports Court',
        description: 'The 9th annual INSPIRE Premier League football season begins. Register your team and compete for the campus title. 24 teams, full season bracket.',
        type: 'Competition',
      },
      {
        id: 'ev-inspire-2',
        clubId: 'guc-inspire',
        title: 'Run as One — GUC Campus Marathon',
        date: '2026-10-03',
        time: '7:00 AM',
        location: 'GUC Campus — Main Gate Assembly',
        description: 'INSPIRE\'s annual charity marathon. 2km route around campus. Open to all students. Raising funds for community initiatives.',
        type: 'Social',
      },
    ],
    members: [
      { id: 'insp-m1', name: 'Karim Nabil', role: 'Head of Operations', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KarimNabil', isMonthStar: true, quote: 'Every event we run is a chance to show GUC what we\'re capable of building together.' },
      { id: 'insp-m2', name: 'Salma Tarek', role: 'Media Production Lead', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SalmaTarek' },
      { id: 'insp-m3', name: 'Omar Hesham', role: 'Fund-Raising Director', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=OmarHesham' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Karim Nabil', role: 'Head of Operations', quote: 'Every event we run is a chance to show GUC what we\'re capable of building together.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KarimNabil' },
    },
    whoShouldJoin: 'Any GUC student who loves sports, fitness, or building a healthier campus community. Whether you\'re athletic or just want to get moving — INSPIRE is for everyone.',
  },

  // ── MUN ──────────────────────────────────────────────────────────────────
  {
    id: 'guc-mun',
    name: 'GUC MUN',
    slug: 'mun',
    category: 'Academic',
    logo: 'https://placehold.co/80x80/1B3A6B/FFFFFF?text=MUN',
    coverImage: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80',
    description: 'GUC Model United Nations is one of the most prestigious student organisations at the German University in Cairo, hosting delegates from across Egypt and beyond. With 1,000+ participants annually and a delegation that has visited the UN Headquarters in New York, GUCMUN is a launchpad for future diplomats, lawyers, and global leaders.',
    mission: 'To cultivate research, public speaking, and diplomatic skills by simulating the United Nations and empowering students to engage with real-world global challenges.',
    memberCount: 180,
    founded: 2009,
    contactEmail: 'mun@guc.edu.eg',
    socialLinks: { instagram: 'https://www.instagram.com/gucmun/', facebook: 'https://www.facebook.com/GUCMUN' },
    tags: ['Debate', 'Diplomacy', 'Public Speaking', 'Research', 'Leadership', 'International Relations'],
    isRecruiting: true,
    recruitmentDeadline: '2026-09-20',
    spotsLeft: 39,
    committees: [
      { id: 'mun-delegates',   name: 'Delegate Affairs', description: 'Trains delegates, prepares position papers, and coordinates conference participation.', spotsAvailable: 20 },
      { id: 'mun-secretariat', name: 'Secretariat',      description: 'The executive backbone — organises GUCMUN conferences and coordinates all committees.', spotsAvailable: 8 },
      { id: 'mun-media',       name: 'Media & Press',    description: 'Covers conferences, produces the press corps bulletin, and manages social media.', spotsAvailable: 6 },
      { id: 'mun-logistics',   name: 'Logistics',        description: 'Handles venue setup, catering, delegate registration, and event day coordination.', spotsAvailable: 5 },
    ],
    events: [
      {
        id: 'ev-mun-1',
        clubId: 'guc-mun',
        title: 'GUCMUN 2026 — Annual Conference',
        date: '2026-10-10',
        time: '9:00 AM',
        location: 'Main Auditorium',
        description: 'The flagship GUCMUN conference. Delegates from across Egypt represent world nations in simulated UN committees including the Security Council, DISEC, and ECOSOC.',
        type: 'Social',
      },
      {
        id: 'ev-mun-2',
        clubId: 'guc-mun',
        title: 'MUN First-Timer Workshop',
        date: '2026-09-17',
        time: '3:00 PM',
        location: 'C5.101',
        description: 'New to MUN? This session covers everything — rules of procedure, how to write a position paper, how to make a speech, and what to expect at conference.',
        type: 'Workshop',
      },
    ],
    members: [
      { id: 'mun-m1', name: 'Sara Mahmoud', role: 'Secretary-General', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SaraMahmoud', isMonthStar: true, quote: 'MUN taught me that the best negotiations happen when you truly understand the other side.' },
      { id: 'mun-m2', name: 'Ahmed Khaled', role: 'Head of Delegate Affairs', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AhmedKhaled' },
      { id: 'mun-m3', name: 'Nour El-Din', role: 'Press Corps Editor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NourElDin' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Sara Mahmoud', role: 'Secretary-General', quote: 'MUN taught me that the best negotiations happen when you truly understand the other side.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SaraMahmoud' },
    },
    whoShouldJoin: 'Students passionate about politics, international law, global affairs, debating, and leadership. Open to all faculties — you don\'t need a political science background to join.',
  },

  // ── REVIVE ───────────────────────────────────────────────────────────────
  {
    id: 'guc-revive',
    name: 'REVIVE',
    slug: 'revive',
    category: 'Community',
    logo: 'https://placehold.co/80x80/2E8B57/FFFFFF?text=REV',
    coverImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    description: 'REVIVE is GUC\'s environmental and sustainability club, dedicated to reviving our relationship with the planet. Through awareness campaigns, clean-up drives, recycling initiatives, and eco-workshops, we empower students to become active agents of environmental change on campus and in the wider community.',
    mission: 'To inspire and equip GUC students to take meaningful action on environmental issues, fostering a culture of sustainability on campus and beyond.',
    memberCount: 90,
    founded: 2018,
    contactEmail: 'revive@guc.edu.eg',
    socialLinks: { instagram: 'https://www.instagram.com/revive.guc/' },
    tags: ['Environment', 'Sustainability', 'Eco', 'Community', 'Volunteering'],
    isRecruiting: true,
    recruitmentDeadline: '2026-09-10',
    spotsLeft: 23,
    committees: [
      { id: 'revive-env',    name: 'Environment & Research',  description: 'Investigates environmental issues and designs science-backed sustainability campaigns.', spotsAvailable: 6 },
      { id: 'revive-events', name: 'Events & Campaigns',      description: 'Organises clean-up drives, tree-planting days, and recycling initiatives.', spotsAvailable: 8 },
      { id: 'revive-media',  name: 'Media & Communications',  description: 'Creates content that raises environmental awareness on social media and on campus.', spotsAvailable: 5 },
      { id: 'revive-pr',     name: 'Partnerships & Outreach', description: 'Builds relationships with NGOs, companies, and government bodies around sustainability.', spotsAvailable: 4 },
    ],
    events: [
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
      {
        id: 'ev-revive-2',
        clubId: 'guc-revive',
        title: 'Sustainability Week — Circular Campus',
        date: '2026-09-14',
        time: '10:00 AM',
        location: 'GUC Main Courtyard',
        description: '5 days of workshops, panels, and activities on plastic waste reduction, sustainable fashion, and urban composting. Free entry.',
        type: 'Workshop',
      },
    ],
    members: [
      { id: 'rev-m1', name: 'Menna Ali', role: 'Club President', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MennaAli', isMonthStar: true, quote: 'Sustainability isn\'t a hobby — it\'s a responsibility. And GUC students are ready for it.' },
      { id: 'rev-m2', name: 'Laila Saad', role: 'Head of Events', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LailaSaad' },
      { id: 'rev-m3', name: 'Youssef Ashraf', role: 'Environment Research Lead', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=YoussefAshraf' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Menna Ali', role: 'Club President', quote: 'Sustainability isn\'t a hobby — it\'s a responsibility. And GUC students are ready for it.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MennaAli' },
    },
    whoShouldJoin: 'Students who care about the environment and want to make a tangible difference. Whether you\'re passionate about climate change, recycling, or just love nature — REVIVE is your home.',
  },

  // ── IEEE ─────────────────────────────────────────────────────────────────
  {
    id: 'guc-ieee',
    name: 'GUC IEEE',
    slug: 'ieee',
    category: 'Technology',
    logo: 'https://placehold.co/80x80/00629B/FFFFFF?text=IEEE',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    description: 'The GUC IEEE Student Branch is the most active technical club on campus and an official branch of the world\'s largest technical professional organisation. IEEE GUC runs on two major branches — Organizing and Technical — delivering hands-on workshops in PCB design, cybersecurity, GitHub & version control, and electronics while supplying project hardware packages to GUC students.',
    mission: 'To inspire students to innovate for a better future through technical sessions, workshops, and educational activities — bridging classroom theory and real-world engineering while building a professional network from students to industry.',
    memberCount: 200,
    founded: 2006,
    contactEmail: 'ieee@guc.edu.eg',
    socialLinks: { instagram: 'https://www.instagram.com/ieeegucsb/', linkedin: 'https://linkedin.com/company/gucieee' },
    tags: ['Engineering', 'Technology', 'Electronics', 'Cybersecurity', 'PCB', 'STEM', 'Hardware'],
    isRecruiting: true,
    recruitmentDeadline: '2026-09-08',
    spotsLeft: 33,
    committees: [
      { id: 'ieee-technical',  name: 'Technical Committee',    description: 'Plans and delivers high-level workshops in PCB design, cybersecurity, GitHub, embedded systems, and more.', spotsAvailable: 12 },
      { id: 'ieee-organizing', name: 'Organizing Committee',   description: 'Coordinates all events, logistics, venue management, and the hardware packages supplied to GUC students.', spotsAvailable: 10 },
      { id: 'ieee-media',      name: 'Media & Design',         description: 'Handles all photography, graphic design, video content, and social media presence for IEEE GUC.', spotsAvailable: 6 },
      { id: 'ieee-hr',         name: 'Human Resources',        description: 'Manages IEEE GUC\'s recruitment cycles, member onboarding, and internal community engagement.', spotsAvailable: 5 },
    ],
    events: [
      {
        id: 'ev-ieee-1',
        clubId: 'guc-ieee',
        title: 'Cybersecurity Workshop',
        date: '2026-09-20',
        time: '2:00 PM',
        location: 'Engineering Lab B1.204',
        description: 'Hands-on session covering ethical hacking basics, network security, and CTF challenges. Bring your laptop.',
        type: 'Workshop',
      },
      {
        id: 'ev-ieee-2',
        clubId: 'guc-ieee',
        title: 'PCB Design with KiCad',
        date: '2026-10-05',
        time: '2:00 PM',
        location: 'Engineering Lab B1.204',
        description: 'Learn to design printed circuit boards from scratch using KiCad. All components provided. Open to all engineering students.',
        type: 'Workshop',
      },
    ],
    members: [
      { id: 'ieee-m1', name: 'Omar Tarek', role: 'Technical Committee Lead', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=OmarTarek', isMonthStar: true, quote: 'The gap between what you learn in class and what industry needs is exactly where IEEE lives.' },
      { id: 'ieee-m2', name: 'Ibrahim Samir', role: 'Organizing Director', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=IbrahimSamir' },
      { id: 'ieee-m3', name: 'Rana Fouad', role: 'HR Lead', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RanaFouad' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Omar Tarek', role: 'Technical Committee Lead', quote: 'The gap between what you learn in class and what industry needs is exactly where IEEE lives.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=OmarTarek' },
    },
    whoShouldJoin: 'Engineering, CS, and DMET students who want practical technical skills beyond the classroom. IEEE is also open to anyone passionate about how technology works and wants to build real projects.',
  },

  // ── VGS ──────────────────────────────────────────────────────────────────
  {
    id: 'guc-vgs',
    name: 'VGS',
    slug: 'vgs',
    category: 'Technology',
    logo: 'https://placehold.co/80x80/6B21A8/FFFFFF?text=VGS',
    coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
    description: 'VGS (Vector Game Studio) is GUC\'s game development community, dedicated to advancing skills in game development, sound and music design, and digital art. We build games from scratch — concept to playable — while also running an active esports scene with university-level tournaments. If you create, code, compose, or compete, VGS is your studio.',
    mission: 'To advance game development, digital art, and sound design skills at GUC while building a competitive esports community and producing original student-made games.',
    memberCount: 110,
    founded: 2020,
    contactEmail: 'vgs@guc.edu.eg',
    socialLinks: { instagram: 'https://www.instagram.com/vgsguc/', facebook: 'https://www.facebook.com/vgsguc/' },
    tags: ['Gaming', 'Game Development', 'Esports', 'Digital Art', 'Sound Design', 'Music', 'Technology'],
    isRecruiting: true,
    recruitmentDeadline: '2026-09-10',
    spotsLeft: 36,
    committees: [
      { id: 'vgs-dev',     name: 'Game Development',       description: 'Builds games using Unity, Unreal Engine, and other tools — programmers, game designers, and producers collaborate here.', spotsAvailable: 10 },
      { id: 'vgs-art',     name: 'Digital Art & Design',   description: 'Creates 2D/3D game art, character design, UI/UX, and all visual assets for VGS projects.', spotsAvailable: 8 },
      { id: 'vgs-sound',   name: 'Sound & Music Design',   description: 'Composes original soundtracks, designs sound effects, and handles all audio production for VGS games and events.', spotsAvailable: 5 },
      { id: 'vgs-esports', name: 'Esports & Tournaments',  description: 'Organises inter-university gaming tournaments, manages competitive teams, and represents GUC in esports.', spotsAvailable: 8 },
      { id: 'vgs-media',   name: 'Media & Content',        description: 'Documents the VGS journey — social media, event coverage, behind-the-scenes content, and livestreams.', spotsAvailable: 5 },
    ],
    events: [
      {
        id: 'ev-vgs-1',
        clubId: 'guc-vgs',
        title: 'GUC Esports Tournament 2026',
        date: '2026-09-28',
        time: '3:00 PM',
        location: 'Main Hall C5',
        description: 'Inter-faculty esports showdown — FIFA, Valorant, and Tekken brackets. Register solo or as a team. Prizes for top 3 in each game.',
        type: 'Competition',
      },
      {
        id: 'ev-vgs-2',
        clubId: 'guc-vgs',
        title: '48-Hour Game Jam',
        date: '2026-09-19',
        time: '6:00 PM',
        location: 'C5 Labs — Open Space',
        description: 'Build a complete game in 48 hours around a surprise theme. Solo or teams of up to 3. Winners featured on VGS\'s itch.io page.',
        type: 'Competition',
      },
    ],
    members: [
      { id: 'vgs-m1', name: 'Ziad Mostafa', role: 'Game Dev Lead', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZiadMostafa', isMonthStar: true, quote: 'A game jam teaches you more about shipping software in 48 hours than a whole semester can.' },
      { id: 'vgs-m2', name: 'Nada Kamel', role: 'Digital Art Director', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NadaKamel' },
      { id: 'vgs-m3', name: 'Ali Hassan', role: 'Esports Manager', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AliHassan' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Ziad Mostafa', role: 'Game Dev Lead', quote: 'A game jam teaches you more about shipping software in 48 hours than a whole semester can.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZiadMostafa' },
    },
    whoShouldJoin: 'Gamers, developers, designers, musicians, and storytellers who want to turn their passion into real games. No prior experience needed — VGS has a place for every creative and technical skill.',
  },

  // ── ATHAR ────────────────────────────────────────────────────────────────
  {
    id: 'guc-athar',
    name: 'ATHAR',
    slug: 'athar',
    category: 'Community',
    logo: 'https://placehold.co/80x80/D97706/FFFFFF?text=ATH',
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    description: 'ATHAR is GUC\'s Active Working Group for community service, operating where help is needed most. We teach in underserved communities like Mansheyet Nasser, partner with organisations like Tooth Guards for dental health outreach (reaching 82+ children in one campaign), and run impactful campaigns year-round. We also collaborate with AYB GUC on joint community impact initiatives in El-Matareya.',
    mission: 'To empower GUC students to create lasting change in Egyptian communities through hands-on service, education, and health outreach — because real impact starts on the ground.',
    memberCount: 130,
    founded: 2015,
    contactEmail: 'athar@guc.edu.eg',
    socialLinks: { instagram: 'https://www.instagram.com/athar_guc/', linkedin: 'https://eg.linkedin.com/company/athar-guc' },
    tags: ['Community Service', 'Charity', 'Volunteering', 'Education', 'Health Outreach', 'Social Impact'],
    isRecruiting: true,
    recruitmentDeadline: '2026-09-01',
    spotsLeft: 36,
    committees: [
      { id: 'athar-education',   name: 'Education Outreach',  description: 'Runs tutoring sessions, workshops, and educational activities in Mansheyet Nasser and other underserved communities.', spotsAvailable: 10 },
      { id: 'athar-health',      name: 'Health & Community',  description: 'Organises dental health drives, medical awareness campaigns, and health education initiatives.', spotsAvailable: 8 },
      { id: 'athar-fundraising', name: 'Fund-Raising',        description: 'Secures sponsorships and runs fundraising campaigns to finance ATHAR\'s community projects and field trips.', spotsAvailable: 6 },
      { id: 'athar-media',       name: 'Media & Marketing',   description: 'Documents ATHAR\'s on-ground impact through photography, videography, and social media storytelling.', spotsAvailable: 5 },
      { id: 'athar-events',      name: 'Events & Logistics',  description: 'Plans and coordinates all field trips, community visits, campaigns, and event-day operations.', spotsAvailable: 7 },
    ],
    events: [
      {
        id: 'ev-athar-1',
        clubId: 'guc-athar',
        title: 'Mansheyet Nasser Teaching Day',
        date: '2026-09-12',
        time: '10:00 AM',
        location: 'Mansheyet Nasser Community Centre',
        description: 'Join ATHAR volunteers for a day of tutoring and educational workshops for underprivileged children. Transport arranged from GUC main gate.',
        type: 'Workshop',
      },
      {
        id: 'ev-athar-2',
        clubId: 'guc-athar',
        title: 'AYB × ATHAR — El-Matareya Community Day',
        date: '2026-09-26',
        time: '9:00 AM',
        location: 'El-Matareya Community Centre',
        description: 'Joint initiative with AYB GUC — tutoring sessions, health screening, and neighbourhood clean-up. Open to volunteers from all clubs.',
        type: 'Social',
      },
    ],
    members: [
      { id: 'ath-m1', name: 'Nour Hassan', role: 'Education Outreach Lead', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NourHassan', isMonthStar: true, quote: 'Every child we teach is a reminder of why we chose to spend our university years this way.' },
      { id: 'ath-m2', name: 'Rania Youssef', role: 'Health & Community Lead', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RaniaYoussef' },
      { id: 'ath-m3', name: 'Mostafa Gamal', role: 'Events Coordinator', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MostafaGamal' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Nour Hassan', role: 'Education Outreach Lead', quote: 'Every child we teach is a reminder of why we chose to spend our university years this way.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NourHassan' },
    },
    whoShouldJoin: 'Students who believe in giving back and want to make a real, hands-on difference. All faculties welcome — ATHAR needs educators, healthcare students, designers, and organisers alike.',
  },

  // ── CURA ─────────────────────────────────────────────────────────────────
  {
    id: 'guc-cura',
    name: 'CURA',
    slug: 'cura',
    category: 'Technology',
    logo: 'https://placehold.co/80x80/7E22CE/FFFFFF?text=CUR',
    coverImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    description: 'CURA is GUC\'s student-led assistive technology club, founded in 2022. We are a dynamic community of passionate students committed to leveraging cutting-edge technology to solve real challenges — specifically amputation and paraplegia. We design and build prototypes for artificial limbs and assistive devices, aiming to redefine the market for locally developed assistive tech in Egypt.',
    mission: 'To empower individuals with disabilities through innovative assistive technologies by building a multi-disciplinary student team that prototypes real solutions and connects GUC with organisations dedicated to helping people with physical challenges.',
    memberCount: 70,
    founded: 2022,
    contactEmail: 'cura@guc.edu.eg',
    socialLinks: { instagram: 'https://www.instagram.com/curaxguc/' },
    tags: ['Assistive Technology', 'Bioengineering', 'Disability', 'Innovation', 'Engineering', 'Technology'],
    isRecruiting: true,
    recruitmentDeadline: '2026-09-15',
    spotsLeft: 28,
    committees: [
      { id: 'cura-engineering', name: 'Engineering & Prototyping', description: 'Designs, builds, and tests prototypes for artificial limbs and assistive devices using engineering principles and rapid prototyping.', spotsAvailable: 10 },
      { id: 'cura-design',      name: 'Design & Research',         description: 'Handles product design, ergonomics, materials research, and user testing to ensure assistive devices are practical and human-centred.', spotsAvailable: 7 },
      { id: 'cura-outreach',    name: 'Community Outreach',        description: 'Connects CURA with local organisations supporting people with disabilities, arranges visits, and ensures our work reaches those who need it most.', spotsAvailable: 6 },
      { id: 'cura-media',       name: 'Media & Marketing',         description: 'Raises awareness of CURA\'s mission and assistive technology through compelling content, events, and campus campaigns.', spotsAvailable: 5 },
    ],
    events: [
      {
        id: 'ev-cura-1',
        clubId: 'guc-cura',
        title: 'CURA Assistive Tech Showcase',
        date: '2026-09-22',
        time: '4:00 PM',
        location: 'Engineering Atrium, H Building',
        description: 'CURA presents its latest prosthetic limb and assistive device prototypes. Interact with student-built technology and meet the engineers behind it. Free entry.',
        type: 'Talk',
      },
    ],
    members: [
      { id: 'cur-m1', name: 'Ahmed Samy', role: 'Engineering Lead', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AhmedSamy', isMonthStar: true, quote: 'We\'re not building prototypes. We\'re building someone\'s ability to reach their child.' },
      { id: 'cur-m2', name: 'Yasmine Adel', role: 'Design & Research Lead', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=YasmineAdel' },
      { id: 'cur-m3', name: 'Tarek Mansour', role: 'Community Outreach', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TarekMansour' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Ahmed Samy', role: 'Engineering Lead', quote: 'We\'re not building prototypes. We\'re building someone\'s ability to reach their child.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AhmedSamy' },
    },
    whoShouldJoin: 'Engineering, DMET, pharmacy, and science students who want to use technology to genuinely change lives. CURA is multi-disciplinary — designers, researchers, and communicators are equally needed.',
  },

  // ── AYB ──────────────────────────────────────────────────────────────────
  {
    id: 'guc-ayb',
    name: 'AYB',
    slug: 'ayb',
    category: 'Community',
    logo: 'https://placehold.co/80x80/F59E0B/272831?text=AYB',
    coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
    description: 'AYB GUC is a student-led community development club fighting poverty through sustainable development — not just instant aid. We work on the ground in El-Matareya, one of Cairo\'s most underserved districts, running education programmes, vocational projects, and long-term community initiatives. "نحلم نشوف المجتمعات الفقيرة في بلدنا أحسن" — we dream of seeing our country\'s poorest communities thrive.',
    mission: 'To combat poverty in underserved Egyptian communities through education, skill-building, and sustainable development projects — empowering both the communities we serve and the students who serve them.',
    memberCount: 180,
    founded: 2016,
    contactEmail: 'ayb@guc.edu.eg',
    socialLinks: { instagram: 'https://www.instagram.com/ayb_guc/', facebook: 'https://www.facebook.com/AYB.GUC' },
    tags: ['Community Development', 'Poverty Alleviation', 'Sustainable Development', 'Education', 'Volunteering', 'Social Impact'],
    isRecruiting: true,
    recruitmentDeadline: '2026-09-20',
    spotsLeft: 33,
    committees: [
      { id: 'ayb-community', name: 'Community Development',   description: 'Designs and implements sustainable development projects in El-Matareya, working directly with community members on the ground.', spotsAvailable: 12 },
      { id: 'ayb-education', name: 'Education & Projects',    description: 'Runs tutoring, vocational training, and skill-building programmes for residents of underserved districts.', spotsAvailable: 10 },
      { id: 'ayb-media',     name: 'Media & Communications',  description: 'Documents AYB\'s impact and tells the stories of the communities and students involved — on social media and beyond.', spotsAvailable: 6 },
      { id: 'ayb-outreach',  name: 'Outreach & Partnerships', description: 'Builds relationships with NGOs, government bodies, and companies to expand AYB\'s reach and secure project resources.', spotsAvailable: 5 },
    ],
    events: [
      {
        id: 'ev-ayb-1',
        clubId: 'guc-ayb',
        title: 'El-Matareya Community Day',
        date: '2026-09-26',
        time: '9:00 AM',
        location: 'El-Matareya Community Centre — meet at GUC Main Gate',
        description: 'Monthly community development day in El-Matareya. Tutoring sessions, skills workshops, and project work with local residents. Joint event with ATHAR GUC.',
        type: 'Social',
      },
      {
        id: 'ev-ayb-2',
        clubId: 'guc-ayb',
        title: 'AYB Info Session — What We Do & How to Join',
        date: '2026-09-08',
        time: '5:00 PM',
        location: 'H7.101',
        description: 'New to AYB? Come hear from current members about our work in El-Matareya, how the committees operate, and what commitment looks like week-to-week.',
        type: 'Talk',
      },
    ],
    members: [
      { id: 'ayb-m1', name: 'Farah Ibrahim', role: 'Community Development Lead', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FarahIbrahim', isMonthStar: true, quote: 'Development that doesn\'t involve the community isn\'t development — it\'s just charity.' },
      { id: 'ayb-m2', name: 'Omar Salah', role: 'Education Projects Lead', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=OmarSalah' },
      { id: 'ayb-m3', name: 'Hana Rizk', role: 'Outreach & Partnerships', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HanaRizk' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Farah Ibrahim', role: 'Community Development Lead', quote: 'Development that doesn\'t involve the community isn\'t development — it\'s just charity.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FarahIbrahim' },
    },
    whoShouldJoin: 'Students who believe in using their university years to make a real, lasting difference in Egyptian society. AYB is for doers — people ready to show up, get involved, and help build something meaningful.',
  },

  // ── TEDxGUC ──────────────────────────────────────────────────────────────
  {
    id: 'guc-tedx',
    name: 'TEDxGUC',
    slug: 'tedx',
    category: 'Academic',
    logo: 'https://placehold.co/80x80/E11D48/FFFFFF?text=TEDx',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    description: 'TEDxGUC is an independently organised TED event at the German University in Cairo, bringing together scientists, artists, entrepreneurs, and thought leaders to share ideas worth spreading. The 2024 edition featured 8 real speakers including robotics professor Dr. Amir Roushdy, Paris 2024 Olympic mental coach Haitham Gheita, Forbes 30U30 entrepreneur Mohamed Ehab, and Egyptian Food Bank founder Manal Olama.',
    mission: 'To create a platform where ideas worth spreading can reach and inspire the GUC community and beyond, empowering students to think bigger about the world.',
    memberCount: 100,
    founded: 2013,
    contactEmail: 'tedx@guc.edu.eg',
    socialLinks: { instagram: 'https://www.instagram.com/tedxguc__/' },
    tags: ['Talks', 'Leadership', 'Ideas', 'Academic', 'Innovation', 'Inspiration'],
    isRecruiting: true,
    recruitmentDeadline: '2026-09-30',
    spotsLeft: 28,
    committees: [
      { id: 'tedx-speakers',  name: 'Speakers & Content',          description: 'Identifies, coaches, and prepares speakers to deliver powerful TEDx-worthy talks on stage.', spotsAvailable: 8 },
      { id: 'tedx-marketing', name: 'Marketing & Outreach',        description: 'Builds TEDxGUC\'s brand, manages social media, and drives event attendance and speaker applications.', spotsAvailable: 7 },
      { id: 'tedx-ops',       name: 'Operations & Logistics',      description: 'Manages venue setup, event production, AV, and the seamless running of conferences and Salon events.', spotsAvailable: 8 },
      { id: 'tedx-partners',  name: 'Partnerships & Sponsorships', description: 'Secures sponsors and builds relationships with organisations aligned with TED\'s global mission.', spotsAvailable: 5 },
    ],
    events: [
      {
        id: 'ev-tedx-1',
        clubId: 'guc-tedx',
        title: 'TEDxGUCSalon — "Second Chances"',
        date: '2026-10-15',
        time: '6:00 PM',
        location: 'C5 Auditorium',
        description: 'An intimate TEDxGUCSalon evening with three speakers exploring reinvention, failure, and new beginnings. Tickets free for GUC students.',
        type: 'Talk',
      },
      {
        id: 'ev-tedx-2',
        clubId: 'guc-tedx',
        title: 'TEDxGUC 2026 — Speaker Application Deadline',
        date: '2026-09-30',
        time: '11:59 PM',
        location: 'Online (tedxguc.com)',
        description: 'Last day to submit your speaker application for TEDxGUC 2026. Apply if you have an idea worth spreading — in any field.',
        type: 'Meeting',
      },
    ],
    members: [
      { id: 'tedx-m1', name: 'Lina Karim', role: 'Executive Director', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LinaKarim', isMonthStar: true, quote: 'The best TEDx talks don\'t change what you think. They change how you think.' },
      { id: 'tedx-m2', name: 'Dina Kamal', role: 'Speakers Committee Lead', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DinaKamal' },
      { id: 'tedx-m3', name: 'Sherif Ramadan', role: 'Operations Director', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SherifRamadan' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Lina Karim', role: 'Executive Director', quote: 'The best TEDx talks don\'t change what you think. They change how you think.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LinaKarim' },
    },
    whoShouldJoin: 'Students who love ideas, storytelling, and bringing people together around conversations that matter. Organising a TEDx event is one of the most impactful things you can do in university.',
  },

  // ── INSIDER ──────────────────────────────────────────────────────────────
  {
    id: 'guc-insider',
    name: 'INSIDER',
    slug: 'insider',
    category: 'Media',
    logo: 'https://placehold.co/80x80/272831/FFFFFF?text=INS',
    coverImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
    description: 'INSIDER is the first independent student newspaper at the German University in Cairo — and at 15 years old, one of GUC\'s most established clubs. We publish in both English and Arabic, covering campus events, student achievements, culture, science, opinion, and literature. With 11+ printed issues and an active digital presence at insiderguc.wordpress.com, INSIDER is the student voice of GUC.',
    mission: 'To provide GUC students with an independent, bilingual, student-run media platform that informs, challenges, and amplifies the diverse voices of our campus community.',
    memberCount: 85,
    founded: 2011,
    contactEmail: 'insider@guc.edu.eg',
    socialLinks: { instagram: 'https://www.instagram.com/insiderguc/', website: 'https://insiderguc.wordpress.com' },
    tags: ['Journalism', 'Media', 'Writing', 'Photography', 'Design', 'Newspaper', 'Arabic', 'English'],
    isRecruiting: true,
    recruitmentDeadline: '2026-09-15',
    spotsLeft: 23,
    committees: [
      { id: 'insider-editorial', name: 'Writing & Editorial',    description: 'Pitches, writes, edits, and fact-checks articles across all sections — campus life, culture, science, opinion, and features — in both English and Arabic.', spotsAvailable: 10 },
      { id: 'insider-design',    name: 'Design & Layout',        description: 'Designs INSIDER\'s print and digital layouts — from cover art and typography to page composition and brand consistency.', spotsAvailable: 5 },
      { id: 'insider-photo',     name: 'Photography & Visuals',  description: 'Photographs campus life, events, and portraits that visually bring INSIDER\'s stories to life in print and online.', spotsAvailable: 4 },
      { id: 'insider-digital',   name: 'Digital Media & Social', description: 'Manages INSIDER\'s WordPress site, Instagram, and digital strategy — expanding the newspaper\'s reach beyond print.', spotsAvailable: 4 },
    ],
    events: [
      {
        id: 'ev-insider-1',
        clubId: 'guc-insider',
        title: 'INSIDER Issue 12 — Launch & Reading',
        date: '2026-09-30',
        time: '4:00 PM',
        location: 'GUC Library Atrium',
        description: 'Celebrate the launch of INSIDER\'s 12th printed issue. Writers share their favourite pieces. Free copies available on the day.',
        type: 'Social',
      },
      {
        id: 'ev-insider-2',
        clubId: 'guc-insider',
        title: 'INSIDER Open Pitching Session',
        date: '2026-09-10',
        time: '5:00 PM',
        location: 'H7.104',
        description: 'Bring your story ideas. Any GUC student can pitch — INSIDER editors will give live feedback and the best pitches get commissioned for Issue 12.',
        type: 'Meeting',
      },
    ],
    members: [
      { id: 'ins-m1', name: 'Mariam Fouad', role: 'Editor-in-Chief', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MariamFouad', isMonthStar: true, quote: 'A student newspaper only matters if it\'s willing to ask the questions no one else will.' },
      { id: 'ins-m2', name: 'Youssef Adel', role: 'Digital Media Lead', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=YoussefAdel' },
      { id: 'ins-m3', name: 'Hana Mostafa', role: 'Photography Lead', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HanaMostafa' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Mariam Fouad', role: 'Editor-in-Chief', quote: 'A student newspaper only matters if it\'s willing to ask the questions no one else will.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MariamFouad' },
    },
    whoShouldJoin: 'Students who love writing, journalism, photography, or design — in English or Arabic or both. If you have a story, an opinion, or a creative eye, INSIDER is your platform.',
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const getClubBySlug = (slug: string): Club | undefined =>
  clubs.find((c) => c.slug === slug)

export const getClubById = (id: string): Club | undefined =>
  clubs.find((c) => c.id === id)

export const getRecruitingClubs = (): Club[] =>
  clubs.filter((c) => c.isRecruiting)

export function computeClubOfWeek(): Club {
  const today = new Date()
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
  const maxMembers = Math.max(...clubs.map((c) => c.memberCount))

  const scored = clubs.map((club) => {
    const memberScore = (club.memberCount / maxMembers) * 40
    const eventScore = Math.min(club.events.length * 10, 30)
    const recruitScore = club.isRecruiting ? (club.spotsLeft && club.spotsLeft > 10 ? 20 : 10) : 0
    const recentEvent = club.events.some((e) => {
      const d = new Date(e.date)
      return d >= thirtyDaysAgo && d <= today
    })
    return { club, score: memberScore + eventScore + recruitScore + (recentEvent ? 10 : 0) }
  })

  return scored.sort((a, b) => b.score - a.score)[0].club
}

export function getClubHighlights(count = 4): Array<{ club: Club; event: ClubEvent }> {
  const today = new Date()
  const results: Array<{ club: Club; event: ClubEvent }> = []
  for (const club of clubs) {
    const upcoming = club.events
      .filter((e) => new Date(e.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    if (upcoming.length > 0) results.push({ club, event: upcoming[0] })
  }
  return results
    .sort((a, b) => new Date(a.event.date).getTime() - new Date(b.event.date).getTime())
    .slice(0, count)
}

export function getAllMembersOfMonth() {
  return clubs
    .filter((c) => c.spotlightContent.memberOfMonth)
    .map((c) => ({ club: c, member: c.spotlightContent.memberOfMonth! }))
}
