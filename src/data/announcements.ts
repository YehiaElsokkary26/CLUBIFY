import type { Announcement } from './types'

/**
 * Announcement pool — 30 GUC-specific entries, 3 per club.
 * Every post is grounded in real GUC facts:
 *   - Real campus locations (C5 Auditorium, Library Atrium, Engineering Labs, Solar Park, Main Courtyard)
 *   - Real GUC faculties (IET, MET, EMS, MT, Pharmacy, ASA, Law)
 *   - Real GUC traditions, culture, and German-Egyptian identity
 *   - Real alumni and institutional context
 *
 * The feed generator draws from this pool weekly using a seeded shuffle.
 * Each club gets 3 angles: [0] Event/CTA, [1] History/"Did you know?", [2] Committee/impact story.
 */
export const announcementPool: Announcement[] = [

  // ─── TEDxGUC ──────────────────────────────────────────────────────────────

  {
    id: 'tedx-1',
    title: 'TEDxGUC 2026 — Speaker & Volunteer Applications Open',
    body: 'TEDxGUC is now accepting applications for its 2026 edition, to be held in the C5 Auditorium — the same stage where the 2024 event brought 8 extraordinary speakers to GUC, including Dr. Amir Roushdy (GUC\'s own Mechatronics & Robotics professor and ARAtronics co-founder), Haitham Gheita (mental coach for Egypt\'s Paris 2024 Olympic squad), Manal Olama (founder of the Egyptian Food Bank), and Forbes 30U30 entrepreneur Mohamed Ehab — a Mechatronics Engineering alumnus of this exact university. Whether you have an idea from your lab, your community, or your life — apply at tedxguc.com. Volunteer applications are open simultaneously across all four committees.',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    targetAudience: 'All',
    clubId: 'guc-tedx',
    createdAt: '2026-08-10T10:00:00',
    author: 'Lina Karim',
  },
  {
    id: 'tedx-2',
    title: 'Did You Know? TEDxGUC Speakers Come From GUC Itself',
    body: 'GUC is one of the few Egyptian universities with its own independently licensed TEDx event — operating under TED\'s strict global framework since 2013. But what makes TEDxGUC different is that its best speakers often come from within the university itself. The 2024 edition featured Dr. Amir Roushdy, a faculty member in GUC\'s Engineering & Material Sciences department and co-founder of the ARAtronics Research Center, delivering a talk from inside the same campus where he teaches. The university\'s 110+ nationalities and eight faculties — from IET and Pharmacy to Law and Applied Sciences — give TEDxGUC\'s speaker committee a uniquely diverse pool to draw from every year.',
    targetAudience: 'All',
    clubId: 'guc-tedx',
    createdAt: '2026-07-28T11:00:00',
    author: 'Dina Kamal',
  },
  {
    id: 'tedx-3',
    title: 'What It Takes to Run TEDxGUC — The Team Behind the Stage',
    body: 'The C5 Auditorium fills up for TEDxGUC. What most people don\'t see is the six months of work before it. TEDxGUC runs four committees: Speakers & Content (sourcing, coaching, and curating 8+ speakers across GUC\'s faculty body, alumni network, and wider Egypt), Marketing & Outreach (ticket sales, press, and brand across GUC\'s 12,947-student campus), Operations & Logistics (venue, AV, livestream, volunteer coordination), and Partnerships & Sponsorships (building relationships with Egyptian and German corporate partners aligned with TED\'s mission). The event is student-organised start to finish. No faculty oversight. No administration. Just GUC students building something the whole university shows up for.',
    targetAudience: 'All',
    clubId: 'guc-tedx',
    createdAt: '2026-07-14T09:00:00',
    author: 'Dina Kamal',
  },

  // ─── INSIDER ──────────────────────────────────────────────────────────────

  {
    id: 'insider-1',
    title: 'INSIDER Issue 11 Is Live — 15 Years of Student Journalism at GUC',
    body: 'INSIDER has released its 11th issue, marking 15 years since the magazine was founded at GUC in 2011 — three years before many of today\'s students even started high school. This edition covers the GUC Grand Festival (basketball, cage-ball, and campus games in the Main Courtyard), Egypt\'s Ramadan traditions, the evolution of pop music, and a feature on visiting professor Dr. Jörg Rademann\'s lecture series at GUC. INSIDER also spotlighted GUC\'s blood donation drive, co-organised with student volunteers from across the campus. Printed copies are free at the Library Atrium and the SCAD office. Read every issue at insiderguc.wordpress.com.',
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80',
    targetAudience: 'All',
    clubId: 'guc-insider',
    createdAt: '2026-08-05T09:00:00',
    author: 'Mariam Fouad',
  },
  {
    id: 'insider-2',
    title: 'Did You Know? INSIDER Has Covered GUC Since Before Most of Us Arrived',
    body: 'INSIDER was founded in 2011 — one of GUC\'s earliest student-run organisations — and has published continuously through every semester since. That\'s 11+ printed issues, covering everything from faculty spotlights and campus events to opinion pieces on GUC\'s German-Egyptian dual identity and what it means to study under a Bologna Process curriculum in Cairo. INSIDER is bilingual: articles run in both English and Arabic, reflecting GUC\'s student body drawn from Egypt and over 110 countries. It\'s the only student publication on campus that applies real editorial standards — pitching, fact-checking, editing, and design rounds before anything goes to print.',
    targetAudience: 'All',
    clubId: 'guc-insider',
    createdAt: '2026-07-22T10:00:00',
    author: 'Mariam Fouad',
  },
  {
    id: 'insider-3',
    title: 'INSIDER Has Four Committees — Only One of Them Writes',
    body: 'INSIDER\'s Writing & Editorial committee produces bilingual articles across campus life, culture, science, and opinion. But the magazine only reaches you because of three other committees running in parallel. Design & Layout handles the typography, page composition, and the visual identity that makes INSIDER recognisable across GUC\'s campus. Photography & Visuals shoots campus events — everything from the Grand Festival in the Main Courtyard to the quiet moments in GUC\'s library and engineering corridors. Digital Media & Social runs the WordPress site and Instagram, expanding INSIDER\'s reach beyond the printed copies distributed at the Library Atrium each issue. Recruitment opens every semester — follow @insiderguc.',
    targetAudience: 'All',
    clubId: 'guc-insider',
    createdAt: '2026-07-07T12:00:00',
    author: 'Youssef Adel',
  },

  // ─── IEEE GUC ─────────────────────────────────────────────────────────────

  {
    id: 'ieee-1',
    title: 'IEEE GUC Fall 2026 Workshop Series — Starting September 8 in the Engineering Labs',
    body: 'IEEE GUC Student Branch is launching its Fall 2026 technical series in the Engineering & Material Sciences labs (B1.204). September 8: PCB Design with KiCad — build a printed circuit board from scratch, components provided. October: Cybersecurity Essentials track — penetration testing fundamentals, CTF challenges, and secure coding practices. Later: GitHub & version control for collaborative engineering projects. GUC is one of Egypt\'s strongest engineering universities, with accreditation from both Egyptian authorities and German institutions including the University of Stuttgart and ACQUIN. IEEE GUC helps bridge what the curriculum teaches and what industry actually uses. All sessions are free for GUC students.',
    targetAudience: 'All',
    clubId: 'guc-ieee',
    createdAt: '2026-08-12T11:00:00',
    author: 'Omar Tarek',
  },
  {
    id: 'ieee-2',
    title: 'Did You Know? GUC\'s IEEE Branch Has Been Active Since 2006',
    body: 'The IEEE GUC Student Branch was established in 2006 — four years after GUC itself was founded — making it one of the oldest continuously operating student branches in Egypt. IEEE (Institute of Electrical and Electronics Engineers) is the world\'s largest technical professional organisation, with 400,000+ members globally. Membership through GUC\'s student branch connects you to that network, grants access to IEEE\'s research database (Xplore), and makes you eligible for international competitions and scholarships. For engineering and CS students at GUC\'s IET and EMS faculties, IEEE membership is one of the highest-value co-curricular activities on campus. Alumni from GUC\'s IEEE branch are now at companies across the Gulf, Europe, and MENA.',
    targetAudience: 'All',
    clubId: 'guc-ieee',
    createdAt: '2026-07-30T09:00:00',
    author: 'Ibrahim Samir',
  },
  {
    id: 'ieee-3',
    title: 'Technical vs Organizing: Which IEEE GUC Track Fits You?',
    body: 'IEEE GUC runs on two parallel tracks — and both are equally important. The Technical Committee runs the workshops: PCB design, embedded systems, AI/ML, and cybersecurity sessions held in GUC\'s Engineering labs. This is the track for IET and EMS students who want hands-on skills beyond the lecture hall. The Organizing Committee runs everything around the sessions — event production, venue coordination, sponsorships, hardware package logistics, and the outreach that brings 200+ members into the room. Think of it as the management side of engineering. If you\'re from Management Technology, Applied Sciences, or even Law — and you want to be close to the technical world without writing the code — the Organizing track is your entry point. Both committees recruit every semester.',
    targetAudience: 'All',
    clubId: 'guc-ieee',
    createdAt: '2026-07-15T14:00:00',
    author: 'Ibrahim Samir',
  },

  // ─── ATHAR ────────────────────────────────────────────────────────────────

  {
    id: 'athar-1',
    title: 'ATHAR Needs Volunteer Teachers — Mansheyet Nasser Program Is Expanding',
    body: 'ATHAR GUC is expanding its education outreach in Mansheyet Nasser — one of Cairo\'s most underserved communities, a 25-minute drive from GUC\'s campus in Al-Tagamoa. We\'re looking for GUC students to volunteer as weekly tutors in Arabic, English, Mathematics, and Science. No teaching experience needed. Transport is arranged from GUC\'s Main Gate every session. Fill out the interest form via @athar_guc on Instagram by September 1st. This semester, ATHAR is partnering with AYB GUC for a joint initiative in El-Matareya. GUC\'s position in New Cairo — close to underserved districts that rarely see university engagement — makes this kind of outreach both possible and essential.',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80',
    targetAudience: 'All',
    clubId: 'guc-athar',
    createdAt: '2026-08-08T14:00:00',
    author: 'Nour Hassan',
  },
  {
    id: 'athar-2',
    title: 'ATHAR\'s Tooth Guards Campaign: 82 Children, One Day, GUC Volunteers',
    body: 'In a single community session, ATHAR\'s Tooth Guards initiative — run in partnership with a Cairo dental health NGO and GUC Pharmacy & Biotechnology students — reached 82 children with free dental screenings, oral hygiene education, and hygiene kit distribution. It took one day and a group of GUC students who showed up. ATHAR regularly runs targeted campaigns like this alongside its ongoing tutoring and fundraising work. The Pharmacy faculty partnership is a recurring one: GUC\'s healthcare students bring professional knowledge into communities that rarely access it. The next campaign is being planned for October — sign up via @athar_guc if you want to be part of the team.',
    targetAudience: 'All',
    clubId: 'guc-athar',
    createdAt: '2026-07-25T10:00:00',
    author: 'Nour Hassan',
  },
  {
    id: 'athar-3',
    title: 'What ATHAR\'s Five Committees Actually Do — A Ground-Level View',
    body: 'ATHAR\'s work only happens when five committees run in parallel. Education Outreach coordinates the weekly tutoring sessions in Mansheyet Nasser — recruiting GUC student tutors, matching them to subject needs, and managing the scheduling each semester. Health & Community runs the medical and dental campaigns, most recently the Tooth Guards initiative that reached 82 children. Fund-Raising handles the charity sales, sponsorship pitches, and corporate partnerships that fund everything. Media & Marketing tells the story — photographing the sessions, writing the posts, and keeping @athar_guc\'s 2,000+ followers updated on what\'s happening on the ground. Events & Logistics coordinates transport, permits, equipment, and day-of execution. You can join any committee regardless of your GUC faculty.',
    targetAudience: 'All',
    clubId: 'guc-athar',
    createdAt: '2026-07-10T13:00:00',
    author: 'Rania Youssef',
  },

  // ─── INSPIRE ──────────────────────────────────────────────────────────────

  {
    id: 'inspire-1',
    title: 'INSPIRE 9th Premier League — Registration Opens September 1st on GUC Courts',
    body: 'INSPIRE is announcing the 9th Annual GUC Premier League — the biggest student football tournament on campus, played on GUC\'s sports courts (part of the university\'s 70,400 m² of dedicated sports facilities). Open to all current GUC students and recent graduates. Teams of 7, full multi-week season bracket. The 8th edition last year saw 24 registered teams and a record turnout in the stands. INSPIRE has been running the Premier League since 2013 — the same year GUC\'s sports culture started becoming a defining part of campus identity alongside the AWG system. Registration opens September 1st on Instagram (@gucinspire). Individual players looking to be added to a team can also reach out directly.',
    targetAudience: 'All',
    clubId: 'guc-inspire',
    createdAt: '2026-08-15T08:00:00',
    author: 'Karim Nabil',
  },
  {
    id: 'inspire-2',
    title: 'INSPIRE Is More Than Football — Here\'s the Full Picture',
    body: 'Most GUC students know INSPIRE for the Premier League. Fewer know about the Run as One marathon — a 2km charity run held annually on GUC\'s campus, drawing hundreds of participants from across the student body. Or the semester-round fitness bootcamps, open to students of all fitness levels, held on GUC\'s outdoor sports grounds. Or the Leadership Summit, a structured half-day event bringing in external speakers and running workshops on personal development and teamwork — with attendance counting toward co-curricular records. INSPIRE was built on the belief that a healthy GUC is a better GUC. The football is the headline. The culture it builds is the point.',
    targetAudience: 'All',
    clubId: 'guc-inspire',
    createdAt: '2026-07-29T11:00:00',
    author: 'Hana Mostafa',
  },
  {
    id: 'inspire-3',
    title: 'Four Committees Run Every INSPIRE Event — Here\'s Who Does What',
    body: 'Every INSPIRE event — Premier League, marathon, bootcamp, trivia — runs because four committees work in parallel. Operations (OP) handles all logistics: GUC venue permits, equipment booking, court scheduling, and day-of coordination across the university\'s 577,000 m² campus. Fund-Raising (FR) brings in the budget through sponsorships and campaigns that make events free or affordable for all students. Public Relations (PR) manages partnerships with GUC student bodies, alumni, and external sponsors. Media Production & Design (MPD) creates every photo, reel, and graphic — the visual record of GUC\'s sports culture. If you love sport but don\'t play, or play but also love media or logistics — there\'s a committee for you. Recruitment opens every semester.',
    targetAudience: 'All',
    clubId: 'guc-inspire',
    createdAt: '2026-07-12T15:00:00',
    author: 'Karim Nabil',
  },

  // ─── MUN ──────────────────────────────────────────────────────────────────

  {
    id: 'mun-1',
    title: 'GUCMUN 2026 Conference — Delegate Applications Open, November at GUC',
    body: 'GUC Model United Nations is preparing for its annual conference this November in GUC\'s Main Auditorium. Applications are open for delegates, chairs, and rapporteurs across five committees including the Security Council, DISEC, and ECOSOC. GUCMUN draws 1,000+ participants annually and has sent delegations to the United Nations Headquarters in New York — a real credential for any GUC student interested in law, international relations, or public policy. Whether you\'re from the Faculty of Law, Management Technology, or Engineering — MUN builds skills that no classroom at GUC alone can teach: structured argumentation, rapid research under time pressure, and high-stakes negotiation. Applications close September 20th.',
    targetAudience: 'All',
    clubId: 'guc-mun',
    createdAt: '2026-08-14T10:00:00',
    author: 'Sara Mahmoud',
  },
  {
    id: 'mun-2',
    title: 'What Actually Happens at GUCMUN — A First-Timer\'s Guide',
    body: 'MUN simulates UN committee sessions. Each delegate represents a real country — researching that country\'s actual foreign policy positions, then defending them in formal debate with other delegates. You write resolutions, negotiate bloc alliances, make speeches, and vote. It\'s competitive, fast, and nothing like a GUC lecture. GUCMUN is one of the oldest student organisations at the university — founded in 2009, seven years after GUC itself — and has grown into a 1,000+ participant annual event. First-time delegates are placed in accessible committees with guidance from experienced chairs. The skills you build — coalition-building, formal speaking, real-time research — are some of the most directly employable soft skills GUC students can develop outside the classroom.',
    targetAudience: 'All',
    clubId: 'guc-mun',
    createdAt: '2026-07-27T09:00:00',
    author: 'Ahmed Khaled',
  },
  {
    id: 'mun-3',
    title: 'GUCMUN\'s Security Council — GUC\'s Most Selective Committee',
    body: 'The UN Security Council at GUCMUN is the most competitive committee on campus — 15 seats, representing the P5 permanent members and 10 rotating nations. SC debates move faster, crisis injections hit harder, and bloc dynamics are far more complex than standard committees. It\'s reserved for returning delegates who have already navigated a GUCMUN conference and want a genuine challenge. In 2024, GUCMUN\'s SC dealt with a live crisis scenario that required delegates to respond to events in real time — no preparation possible, no position paper to fall back on. That\'s what GUC\'s top debaters compete for every year. If you\'re applying for the Security Council at GUCMUN 2026, your position paper needs to be airtight.',
    targetAudience: 'All',
    clubId: 'guc-mun',
    createdAt: '2026-07-11T16:00:00',
    author: 'Sara Mahmoud',
  },

  // ─── CURA ─────────────────────────────────────────────────────────────────

  {
    id: 'cura-1',
    title: 'CURA Assistive Tech Showcase — September 22, Engineering Atrium, H Building',
    body: 'CURA — GUC\'s assistive technology club, founded in 2022 — is hosting its first public prototype showcase on September 22nd in the Engineering Atrium, H Building. The event features working prototypes built by our Engineering & Prototyping committee targeting two real challenges: limb amputation and paraplegia. These are not concept renders. They are physical devices built by GUC students in GUC\'s Engineering & Material Sciences labs, going through real prototyping, testing, and iteration cycles. Come interact with the devices, hear from the students who built them, and understand why CURA exists at a university where Mechatronics, Bioengineering, and Industrial Design students are all within 500 metres of each other. Free and open to all GUC students and faculty.',
    targetAudience: 'All',
    clubId: 'guc-cura',
    createdAt: '2026-08-11T12:00:00',
    author: 'Ahmed Samy',
  },
  {
    id: 'cura-2',
    title: 'What CURA Actually Builds — And Why It Only Exists at a University Like GUC',
    body: 'CURA builds assistive technology — specifically prosthetic limb attachments and mobility aids for people living with upper-limb amputation and paraplegia. The devices go through real design, prototyping, and user-testing cycles. What makes CURA possible at GUC specifically: the university sits at the intersection of Mechatronics Engineering (EMS faculty), Digital Media & Engineering Technology (MET), and Pharmacy & Biotechnology — three disciplines CURA\'s work genuinely requires. A university with engineering labs, design studios, and healthcare students on the same 577,000 m² campus is rare. CURA was founded in 2022 to take advantage of exactly that. The Engineering Atrium in H Building is where they build. September 22nd is when you can see what they\'ve made.',
    targetAudience: 'All',
    clubId: 'guc-cura',
    createdAt: '2026-07-26T14:00:00',
    author: 'Yasmine Adel',
  },
  {
    id: 'cura-3',
    title: 'CURA Has Four Committees — and the Most Impactful Isn\'t the Engineering Team',
    body: 'CURA\'s Engineering & Prototyping committee builds the devices. But the Community Outreach committee is the reason the devices reach people. Outreach connects CURA to disability organisations across Cairo, finds individuals whose needs inform what gets built, and ensures the prototypes leave the GUC labs and reach the people they were designed for. The Design & Research committee runs user research, ergonomics work, and renders concepts before engineering ever picks up a tool. The Media & Marketing committee documents the work and tells the stories — because a device no one knows about helps no one. All four committees recruit every semester from across GUC\'s eight faculties. You don\'t have to be an engineer to build something that changes a life.',
    targetAudience: 'All',
    clubId: 'guc-cura',
    createdAt: '2026-07-09T10:00:00',
    author: 'Ahmed Samy',
  },

  // ─── AYB ──────────────────────────────────────────────────────────────────

  {
    id: 'ayb-1',
    title: 'AYB × ATHAR Joint Community Day — El-Matareya, September 26',
    body: 'AYB GUC and ATHAR GUC are co-organising a Community Day on September 26th in El-Matareya — one of Cairo\'s most densely populated and underserved districts, and AYB\'s primary area of operations since 2016. The joint initiative includes tutoring sessions for local children, a community health screening run with GUC Pharmacy students, and a neighbourhood clean-up. Transport departs from GUC\'s Main Gate at 8:30 AM. AYB was built around the belief that poverty alleviation requires sustained, community-driven work — not one-off charity. GUC students willing to make a recurring monthly commitment are especially encouraged to sign up. All other volunteers are welcome for the day. Form on AYB\'s Instagram before September 20th.',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80',
    targetAudience: 'All',
    clubId: 'guc-ayb',
    createdAt: '2026-08-09T16:00:00',
    author: 'Farah Ibrahim',
  },
  {
    id: 'ayb-2',
    title: 'Why AYB Works in El-Matareya — and What GUC\'s Location Has to Do With It',
    body: 'GUC sits in New Cairo\'s Al-Tagamoa district — one of Egypt\'s most affluent planned communities. A 25-minute drive north is El-Matareya — one of Cairo\'s most densely populated and economically marginalised areas. AYB GUC was founded in 2016 specifically to bridge that distance. Not with charity drives. With sustained, community-driven development: ongoing education projects, vocational training, and skills workshops that compound year over year. Ten years of showing up in the same streets, building trust with the same families. GUC students have the skills, the proximity, and the time. El-Matareya has the need. AYB is the structure that connects the two — and they\'ve been doing it every semester since the club was founded.',
    targetAudience: 'All',
    clubId: 'guc-ayb',
    createdAt: '2026-07-24T11:00:00',
    author: 'Farah Ibrahim',
  },
  {
    id: 'ayb-3',
    title: 'The AYB Model: Why Sustainable Development Isn\'t the Same as Charity',
    body: 'AYB\'s founding philosophy: poverty isn\'t solved by donations. It\'s solved by capability. A one-off charity event removes a symptom. AYB\'s model removes a condition. In El-Matareya, AYB runs ongoing education projects — not annual tutoring days. Vocational training that builds income pathways. Community health programs that reduce dependency on emergency care. The progress is measured across semesters, not events. This model requires GUC students who can commit, not just show up once. That\'s the honest ask AYB makes at recruitment: Are you here for the Instagram post, or are you here for year two? If you\'re from GUC and ready to make that commitment, AYB\'s next info session is September 8th at 5 PM in H7.101.',
    targetAudience: 'All',
    clubId: 'guc-ayb',
    createdAt: '2026-07-06T09:00:00',
    author: 'Omar Salah',
  },

  // ─── REVIVE ───────────────────────────────────────────────────────────────

  {
    id: 'revive-1',
    title: 'REVIVE Sustainability Week — "Circular Campus," September 14–18 at GUC',
    body: 'REVIVE GUC is launching Sustainability Week 2026 across the Main Courtyard and event spaces, September 14–18. Theme: "Circular Campus." Five days of workshops, panels, and activities — plastic waste reduction, sustainable fashion, urban composting, and environmental advocacy. What makes this relevant to GUC specifically: the university already runs a Solar City project that feeds renewable energy back into the campus grid. REVIVE wants students to know that, and to ask what the next step looks like. Highlights: a live upcycling workshop, a screening of climate documentary "2040" with live Q&A, and a keynote from an invited environmental researcher. All activities are free. All are open to every student regardless of faculty.',
    targetAudience: 'All',
    clubId: 'guc-revive',
    createdAt: '2026-08-07T13:00:00',
    author: 'Menna Ali',
  },
  {
    id: 'revive-2',
    title: 'Did You Know? GUC Already Has a Solar Park — REVIVE Wants You to Know What Comes Next',
    body: 'GUC\'s campus includes a Solar City project — a solar park on-site that feeds renewable energy back into the university\'s grid. It\'s one of the most visible signs that GUC takes sustainability seriously as an institution. REVIVE exists to make that commitment visible at the student level, and to push it further. Year-round, REVIVE runs campus waste-sorting campaigns, partners with Cairo-based environmental NGOs on tree-planting and green-space initiatives, documents GUC\'s campus waste and energy footprint in a semester "Green Audit," and runs workshops on sustainable living for students — from capsule wardrobes to reducing food waste in the canteen. Sustainability Week in September is the flagship. The rest of the year is where the real work happens.',
    targetAudience: 'All',
    clubId: 'guc-revive',
    createdAt: '2026-07-23T10:00:00',
    author: 'Menna Ali',
  },
  {
    id: 'revive-3',
    title: 'The Circular Campus Challenge — Can GUC Go Low-Waste for One Week?',
    body: 'REVIVE\'s centrepiece challenge for Sustainability Week 2026: can GUC students collectively reduce campus single-use plastic by 50% across five days? Participants pledge to bring reusable bottles and bags, track their daily waste, and log it through REVIVE\'s challenge form. The data is aggregated and published in real time on @revive.guc across the week. Last year\'s pilot with 120 students showed a 38% reduction in tracked single-use items. This year\'s target is 500 participants — roughly 4% of GUC\'s 12,947-strong student body. Sign up at the REVIVE booth in the Main Courtyard from September 14th. Participating students also get early access to REVIVE\'s end-of-week open recruitment.',
    targetAudience: 'All',
    clubId: 'guc-revive',
    createdAt: '2026-07-08T12:00:00',
    author: 'Laila Saad',
  },

  // ─── VGS ──────────────────────────────────────────────────────────────────

  {
    id: 'vgs-1',
    title: 'VGS Fall 2026 — Esports Tournament + 48-Hour Game Jam',
    body: 'VGS is opening the semester with two simultaneous events. The Fall Esports Tournament runs FIFA, Valorant, and Tekken brackets — register your team by September 10th at @vgsguc. The 48-Hour Game Jam runs September 19–21 in C5\'s open labs: build a complete game from scratch around a surprise theme revealed at kickoff. Past themes: "Memory," "Infinite Loop," "Gravity Shift." Both events are open to all GUC students — you don\'t need to be from MET or IET. VGS was founded in 2020, and in five years has become the only GUC club dedicated specifically to game development, digital art, sound design, and competitive gaming as a serious craft. Follow @vgsguc for team sizes, prize details, and lab access info.',
    targetAudience: 'All',
    clubId: 'guc-vgs',
    createdAt: '2026-08-13T15:00:00',
    author: 'Ziad Mostafa',
  },
  {
    id: 'vgs-2',
    title: 'What Is a Game Jam — and Why GUC Students Should Try It Once',
    body: 'A 48-hour game jam: you get a theme at kickoff and submit a playable game 48 hours later. No prep, no prior project, no assets already made. The constraint forces you to scope ruthlessly, prototype fast, and ship something imperfect but real. For GUC students in MET and IET, it\'s one of the best portfolio-building experiences available on campus — past VGS Game Jam entries have been uploaded to itch.io and referenced in job interviews at Cairo-based game studios. For students from other faculties, it\'s a window into how digital products are actually built under pressure. Solo or teams of up to 3. No coding required — designers, artists, and sound students contribute just as much as developers. The theme is secret until the starting bell.',
    targetAudience: 'All',
    clubId: 'guc-vgs',
    createdAt: '2026-07-31T09:00:00',
    author: 'Nada Kamel',
  },
  {
    id: 'vgs-3',
    title: 'VGS Has Five Committees — Four of Them Don\'t Require You to Write Code',
    body: 'VGS (Vector Game Studio, founded 2020) is GUC\'s game development community — and the most common misconception is that it\'s only for programmers. Game Development builds the games: Unity, Unreal, Godot, everything. Digital Art & Design creates all the visual assets — character art, environment design, UI — and is one of the strongest committees for GUC\'s MET and ASA students. Sound & Music Design is GUC\'s only student committee dedicated entirely to game audio: original soundtracks, SFX, and audio engineering. Esports & Tournaments organises the competitive side — brackets, streaming, commentary, and representation at inter-university events. Media & Content documents it all. Of those five, exactly one requires programming. The other four need designers, musicians, organisers, and storytellers.',
    targetAudience: 'All',
    clubId: 'guc-vgs',
    createdAt: '2026-07-16T14:00:00',
    author: 'Ziad Mostafa',
  },
]
