import type { Announcement } from './types'

/**
 * Full announcement pool — 30 entries, 3 per club.
 * Each club gets three content angles:
 *   [0] Event / call-to-action
 *   [1] History / "Did you know?" fact
 *   [2] Committee spotlight / impact story
 *
 * The feed generator draws from this pool each week using a seeded shuffle,
 * so students see a rotating 8-post feed that changes every Monday.
 */
export const announcementPool: Announcement[] = [

  // ─── TEDxGUC ──────────────────────────────────────────────────────────────

  {
    id: 'tedx-1',
    title: 'TEDxGUC 2026 — Speaker & Volunteer Applications Open',
    body: 'After a landmark 2024 event that brought 8 extraordinary speakers to GUC — including Dr. Amir Roushdy (GUC Robotics Professor & ARAtronics co-founder), Haitham Gheita (mental performance coach for Egypt\'s Paris 2024 Olympic squad), Manal Olama (CEO of the Egyptian Clothing Bank), Forbes 30U30 entrepreneur Mohamed Ehab (GUC Mechatronics alumnus), archaeologist Sohaila Omar, architect Yara Hesham, graphic designer Sherif El Sayed, and Dr. Yassin Mahgoub — TEDxGUC is now accepting applications for 2026. If you have an idea worth spreading, apply now.',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    targetAudience: 'All',
    clubId: 'guc-tedx',
    createdAt: '2026-08-10T10:00:00',
    author: 'Lina Karim',
  },
  {
    id: 'tedx-2',
    title: 'Did You Know? TEDxGUC Has Been Running Since 2018',
    body: 'TEDxGUC holds an independently organised TEDx licence — one of the first Egyptian universities to do so. The licence grants the right to organise TEDx events under TED\'s official framework, including the strict no-product-pitch, no-PowerPoint-logo, and ideas-only rules. Every speaker is curated through a multi-stage process: open applications → speaker committee shortlist → coaching rounds → final rehearsal. The 2024 edition featured 8 speakers across fields from robotics and sports psychology to archaeology, architecture, and social entrepreneurship — proof that "ideas worth spreading" really do come from GUC.',
    targetAudience: 'All',
    clubId: 'guc-tedx',
    createdAt: '2026-07-28T11:00:00',
    author: 'Dina Kamal',
  },
  {
    id: 'tedx-3',
    title: 'Inside TEDxGUC: What the Organising Team Actually Does',
    body: 'Most people see the stage. Very few see the 6 months behind it. The TEDxGUC team operates across four functions: the Speaker Committee (sourcing, vetting, and coaching every speaker), the Production Committee (stage design, AV, livestream), the PR & Marketing Committee (social media, press, ticket sales), and the Logistics Committee (venue, catering, volunteer coordination). Last year\'s event required over 50 volunteers and 200+ working hours per committee lead. Applications for all committees open alongside speaker applications — no prior experience needed, just commitment.',
    targetAudience: 'All',
    clubId: 'guc-tedx',
    createdAt: '2026-07-14T09:00:00',
    author: 'Dina Kamal',
  },

  // ─── INSIDER ──────────────────────────────────────────────────────────────

  {
    id: 'insider-1',
    title: 'INSIDER Issue 11 Is Live — 15 Years of Campus Journalism',
    body: 'GUC\'s student-run magazine INSIDER has released its 11th issue, marking 15 years since founding in 2011. This edition covers the GUC Grand Festival (basketball, cage-ball, campus games), Ramadan traditions across Egypt from the Fanous to the Rahman Tables, the evolution of pop music from vinyl to viral, a feature on visiting professor Dr. Jörg Rademann\'s lecture series, and a spotlight on a campus blood donation drive for children with cancer. Read online at insiderguc.wordpress.com or grab a printed copy from the student lounge.',
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80',
    targetAudience: 'All',
    clubId: 'guc-insider',
    createdAt: '2026-08-05T09:00:00',
    author: 'Mariam Fouad',
  },
  {
    id: 'insider-2',
    title: 'Did You Know? INSIDER Is GUC\'s Oldest Student Publication',
    body: 'Founded in 2011 — before most current GUC students were in secondary school — INSIDER has published continuously through every semester, covering campus events, faculty spotlights, cultural deep-dives, and student opinion. That\'s 15 years of print and digital journalism, 11 full issues, and counting. Unlike club newsletters or Instagram posts, INSIDER follows editorial standards: pieces go through writing, editing, fact-checking, and design rounds before publication. If you\'ve ever wanted to write, photograph, design, or edit — INSIDER recruits every semester.',
    targetAudience: 'All',
    clubId: 'guc-insider',
    createdAt: '2026-07-22T10:00:00',
    author: 'Mariam Fouad',
  },
  {
    id: 'insider-3',
    title: 'Four Ways to Join INSIDER (You Don\'t Have to Be a Writer)',
    body: 'INSIDER has four committees and only one of them requires writing. The Writing & Editorial committee produces the articles. The Design & Layout committee handles typography, page composition, and visual identity. The Photography & Visuals committee shoots campus events and produces cover imagery. The Digital Media & Social committee runs the Instagram, WordPress site, and distribution strategy. Each issue is the result of all four working in parallel across a 6-week production cycle. Recruitment opens every semester — follow @insiderguc to know when.',
    targetAudience: 'All',
    clubId: 'guc-insider',
    createdAt: '2026-07-07T12:00:00',
    author: 'Youssef Adel',
  },

  // ─── IEEE GUC ─────────────────────────────────────────────────────────────

  {
    id: 'ieee-1',
    title: 'IEEE GUC Fall 2026 Workshop Series — PCB Design, Cybersecurity & Git',
    body: 'IEEE GUC Student Branch is launching its Fall 2026 technical track. Kicking off September 8th with a hands-on PCB design workshop, followed by a cybersecurity essentials track in October (penetration testing fundamentals, secure coding practices), and a GitHub & version control workshop for collaborative engineering projects. The IEEE GUC branch — founded in 2006 and one of Egypt\'s most active student branches — splits into a Technical Committee (workshops, technical content) and an Organizing Committee (events, logistics, outreach). Registration links drop on our Instagram soon.',
    targetAudience: 'All',
    clubId: 'guc-ieee',
    createdAt: '2026-08-12T11:00:00',
    author: 'Omar Tarek',
  },
  {
    id: 'ieee-2',
    title: 'Did You Know? IEEE GUC Has Been Active Since 2006',
    body: 'The IEEE GUC Student Branch was established in 2006, making it one of the oldest continuously operating student branches in Egypt. IEEE (Institute of Electrical and Electronics Engineers) is the world\'s largest technical professional organisation — membership connects GUC students to a global network of 400,000+ engineers, access to research databases, and eligibility for international competitions. The GUC chapter has represented Egypt in regional IEEE events and has produced alumni now working at top engineering companies across the Gulf, Europe, and Egypt.',
    targetAudience: 'All',
    clubId: 'guc-ieee',
    createdAt: '2026-07-30T09:00:00',
    author: 'Ibrahim Samir',
  },
  {
    id: 'ieee-3',
    title: 'Technical vs Organizing: Which IEEE GUC Track Is Right for You?',
    body: 'IEEE GUC runs two parallel tracks. The Technical Committee runs workshops, hackathons, and deep-dive sessions — PCB design, embedded systems, AI/ML, cybersecurity. If you want to learn and teach engineering skills hands-on, this is your path. The Organizing Committee handles event production, logistics, sponsorship, and human resources — if you\'re stronger in project management, communication, or business development, there\'s a real role here. Both tracks also have a Media & Design branch for visual content. You don\'t have to be in Engineering to join — but you do have to be genuinely curious.',
    targetAudience: 'All',
    clubId: 'guc-ieee',
    createdAt: '2026-07-15T14:00:00',
    author: 'Ibrahim Samir',
  },

  // ─── ATHAR ────────────────────────────────────────────────────────────────

  {
    id: 'athar-1',
    title: 'ATHAR Needs Volunteer Teachers — Mansheyet Nasser Expanding',
    body: 'ATHAR GUC is expanding its education outreach program in Mansheyet Nasser, one of Cairo\'s most underserved neighbourhoods. We\'re looking for GUC students to volunteer as weekly tutors in Arabic, English, Maths, and Science. No teaching experience needed — just consistency and genuine care. Fill out the interest form via @athar_guc on Instagram by September 1st. This semester, ATHAR is also partnering with AYB GUC for a joint community initiative in El-Matareya. Founded in 2015, ATHAR has run education outreach, health campaigns, and fund-raising across Cairo.',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80',
    targetAudience: 'All',
    clubId: 'guc-athar',
    createdAt: '2026-08-08T14:00:00',
    author: 'Nour Hassan',
  },
  {
    id: 'athar-2',
    title: 'ATHAR\'s Tooth Guards Campaign: 82 Children Reached in One Day',
    body: 'In one of ATHAR\'s most impactful single-day campaigns, the Tooth Guards initiative brought free dental screenings and oral hygiene education to 82 children in a single community session. Working with volunteer dental professionals and GUC students, the campaign distributed hygiene kits, taught brushing technique, and flagged children needing follow-up care. ATHAR regularly runs targeted health campaigns like this alongside its ongoing education and fund-raising work — small in footprint, high in direct impact. If you want to be part of the next one, follow @athar_guc for sign-up announcements.',
    targetAudience: 'All',
    clubId: 'guc-athar',
    createdAt: '2026-07-25T10:00:00',
    author: 'Nour Hassan',
  },
  {
    id: 'athar-3',
    title: 'What ATHAR Actually Does — A Committee-by-Committee Breakdown',
    body: 'ATHAR GUC (founded 2015) operates across five committees: Education Outreach (weekly tutoring in underserved Cairo neighbourhoods), Health & Community (campaigns like Tooth Guards, blood drives, health screenings), Fund-Raising (charity sales, corporate sponsorships, campaigns that finance the field work), Media & Marketing (social content, storytelling, impact reporting), and Events & Logistics (planning the campaigns, transport, volunteer coordination). Every field campaign is the result of all five working together. Recruitment is open every semester — you don\'t need to be an engineering or science student to contribute.',
    targetAudience: 'All',
    clubId: 'guc-athar',
    createdAt: '2026-07-10T13:00:00',
    author: 'Rania Youssef',
  },

  // ─── INSPIRE ──────────────────────────────────────────────────────────────

  {
    id: 'inspire-1',
    title: 'INSPIRE 9th Premier League — Team Registration Opens September 1st',
    body: 'INSPIRE is announcing its 9th Annual Premier League — GUC\'s biggest student football tournament since 2013. Open to GUC students and recent graduates. Teams of 7 compete across a full multi-week season. Last year\'s 8th edition saw a record 24 registered teams. Registration opens September 1st — spots filled in 72 hours last year, so follow @gucinspire the moment the form drops. Individual players looking to be added to a team can also reach out directly.',
    targetAudience: 'All',
    clubId: 'guc-inspire',
    createdAt: '2026-08-15T08:00:00',
    author: 'Karim Nabil',
  },
  {
    id: 'inspire-2',
    title: 'INSPIRE Is More Than Football — Here\'s What Else They Run',
    body: 'Most people know INSPIRE for the Premier League. But the club — founded in 2013 and one of GUC\'s oldest sports clubs — runs a full calendar of activities year-round. The Run as One GUC Marathon gathers hundreds of participants each year for a 2km charity run across campus. Fitness bootcamps run every semester, open to all students regardless of fitness level. A Leadership Summit brings in speakers and runs structured workshops on personal development. And the Operations committee coordinates venues, equipment, permits, and logistics for all of it.',
    targetAudience: 'All',
    clubId: 'guc-inspire',
    createdAt: '2026-07-29T11:00:00',
    author: 'Hana Mostafa',
  },
  {
    id: 'inspire-3',
    title: 'Four Committees. One Club. How INSPIRE Actually Works.',
    body: 'INSPIRE has four committees — and only one of them is about sports. The Operations (OP) committee runs logistics for every event: permits, scheduling, equipment, day-of coordination. The Fund-Raising (FR) committee brings in the budget through sponsorships and charity campaigns. The Public Relations (PR) committee handles partnerships, sponsor relationships, and communications. The Media Production & Design (MPD) committee creates all the visual content — photos, videos, graphics. If sport isn\'t your thing but you love events, media, or fundraising, INSPIRE still has a role for you.',
    targetAudience: 'All',
    clubId: 'guc-inspire',
    createdAt: '2026-07-12T15:00:00',
    author: 'Karim Nabil',
  },

  // ─── MUN ──────────────────────────────────────────────────────────────────

  {
    id: 'mun-1',
    title: 'MUN GUC 2026 Conference — Delegate Applications Now Open',
    body: 'GUC Model United Nations is gearing up for its annual conference this November. Applications are open for delegates, chairs, and rapporteurs across five committees including the Security Council, DISEC, and ECOSOC. MUN GUC builds public speaking, research, negotiation, and diplomacy skills in a simulated UN environment — skills that directly translate to law, international relations, and business careers. Whether you\'re a first-time delegate or a returning veteran, there\'s a committee for your level. Applications close September 20th.',
    targetAudience: 'All',
    clubId: 'guc-mun',
    createdAt: '2026-08-14T10:00:00',
    author: 'Sara Mahmoud',
  },
  {
    id: 'mun-2',
    title: 'What Actually Happens at MUN? (A Guide for First-Timers)',
    body: 'Model United Nations simulates real UN committee sessions. Each delegate represents a country and must research that country\'s actual foreign policy positions on the committee\'s topic — then defend them in formal debate, negotiate with other delegates, write resolutions, and vote. It sounds intimidating. It\'s not — first-time delegates are placed in committees specifically designed for newer participants, with chairs who guide the room. The skills you build — structured argumentation, rapid research, public speaking under pressure, coalition building — are among the most employer-cited soft skills in competitive hiring. First session is always the hardest. The second is addictive.',
    targetAudience: 'All',
    clubId: 'guc-mun',
    createdAt: '2026-07-27T09:00:00',
    author: 'Ahmed Khaled',
  },
  {
    id: 'mun-3',
    title: 'The Security Council at MUN GUC — GUC\'s Most Competitive Committee',
    body: 'The UN Security Council is the most selective committee at MUN GUC — only 15 delegates representing the P5 permanent members and 10 non-permanent seats. SC debates move faster, the stakes in scenario are higher, and the bloc dynamics are far more complex than standard committees. Returning delegates who want to challenge themselves apply for SC. The committee typically handles crisis scenarios — real-world parallel events injected by the crisis staff mid-session that force delegates to adapt their positions in real time. If you\'re applying for SC at MUN GUC 2026, your position paper will matter.',
    targetAudience: 'All',
    clubId: 'guc-mun',
    createdAt: '2026-07-11T16:00:00',
    author: 'Sara Mahmoud',
  },

  // ─── CURA ─────────────────────────────────────────────────────────────────

  {
    id: 'cura-1',
    title: 'CURA Assistive Tech Showcase — September 22 at GUC',
    body: 'CURA — GUC\'s student-led assistive technology club, founded in 2022 — is hosting its first public prototype showcase on September 22nd. The event features working prototypes built by our Engineering & Prototyping committee targeting two real challenges: limb amputation and paraplegia. Visitors can interact with the devices and hear from the student engineers behind them. CURA brings together Mechatronics, Bioengineering, Computer Science, and Industrial Design students to build technology that genuinely changes lives. Free and open to all students and faculty.',
    targetAudience: 'All',
    clubId: 'guc-cura',
    createdAt: '2026-08-11T12:00:00',
    author: 'Ahmed Samy',
  },
  {
    id: 'cura-2',
    title: 'What Does CURA Actually Build? (It\'s Not What Most People Expect)',
    body: 'CURA is GUC\'s assistive technology club — not a wellness or mental health club, as many students assume from the name. Founded in 2022, CURA\'s Engineering & Prototyping committee builds physical devices: prosthetic limb attachments, mobility aids, and assistive hardware specifically designed for people living with upper-limb amputation and paraplegia. The design process involves user research with real individuals with disabilities, iterative hardware prototyping, and usability testing. It\'s one of the few GUC student clubs whose output is a physical product designed to solve a medical-grade problem.',
    targetAudience: 'All',
    clubId: 'guc-cura',
    createdAt: '2026-07-26T14:00:00',
    author: 'Yasmine Adel',
  },
  {
    id: 'cura-3',
    title: 'CURA Isn\'t Just for Engineers — Here\'s Why',
    body: 'CURA has four committees and the most impactful one isn\'t the engineering team. The Community Outreach committee connects CURA to the individuals the devices are actually built for — finding users, gathering feedback, building relationships with disability organisations, and ensuring what\'s designed actually gets used. The Design & Research committee runs the user research, ergonomics work, and renders the concepts before engineering builds them. The Media & Marketing committee documents the prototypes and tells the stories of the people behind them. All four committees recruit every semester — regardless of your major.',
    targetAudience: 'All',
    clubId: 'guc-cura',
    createdAt: '2026-07-09T10:00:00',
    author: 'Ahmed Samy',
  },

  // ─── AYB ──────────────────────────────────────────────────────────────────

  {
    id: 'ayb-1',
    title: 'AYB × ATHAR Joint Community Day — El-Matareya, September 26',
    body: 'AYB GUC and ATHAR GUC are co-organising a Community Day on September 26th in El-Matareya. The joint initiative includes tutoring sessions for local children, a community health screening run with GUC Medical students, and a neighbourhood clean-up campaign. AYB was founded in 2016 to fight poverty through sustained, community-driven development — not one-off charity. This initiative co-led with ATHAR\'s Education and Health committees is a direct extension of that mission. Volunteers from any GUC club are welcome. Sign up via AYB\'s Instagram before September 20th.',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80',
    targetAudience: 'All',
    clubId: 'guc-ayb',
    createdAt: '2026-08-09T16:00:00',
    author: 'Farah Ibrahim',
  },
  {
    id: 'ayb-2',
    title: 'What Is El-Matareya — and Why Does AYB Work There?',
    body: 'El-Matareya is one of Cairo\'s most densely populated and economically marginalised districts. It sits northeast of central Cairo, with limited access to quality education, healthcare, and economic opportunity. AYB GUC chose El-Matareya as its primary area of operations because sustainable development requires geographic focus — a club that works everywhere works nowhere. By consistently showing up in one community since 2016, AYB has built trust, mapped needs, and delivered education, skills training, and economic development programs that compound year over year. This is what separates AYB\'s model from charity events.',
    targetAudience: 'All',
    clubId: 'guc-ayb',
    createdAt: '2026-07-24T11:00:00',
    author: 'Farah Ibrahim',
  },
  {
    id: 'ayb-3',
    title: 'AYB\'s Model: Why Sustainable Development Beats Charity',
    body: 'AYB GUC was founded on a specific philosophy: poverty isn\'t solved by donations — it\'s solved by building capability. One-off charity events feel good but don\'t change systemic conditions. AYB\'s model involves ongoing education projects that build skills, economic development initiatives that create income pathways, and community health programs that reduce dependency on emergency care. Since 2016, AYB has worked continuously in El-Matareya — the same streets, the same families — measuring progress across years, not days. If you want to do impactful community work, not just feel-good volunteering, AYB is a different kind of club.',
    targetAudience: 'All',
    clubId: 'guc-ayb',
    createdAt: '2026-07-06T09:00:00',
    author: 'Omar Salah',
  },

  // ─── REVIVE ───────────────────────────────────────────────────────────────

  {
    id: 'revive-1',
    title: 'REVIVE Sustainability Week — "Circular Campus," September 14–18',
    body: 'REVIVE GUC is launching its annual Sustainability Week, September 14–18. This year\'s theme is "Circular Campus" — five days of workshops, panels, and activities on plastic waste reduction, sustainable fashion, urban composting, and environmental advocacy. Highlights: a live upcycling design workshop, a screening of climate documentary "2040" with Q&A, and a keynote from an invited environmental researcher. Every day ends with an actionable take-home challenge — not just awareness, but behaviour change. All activities are free and open to every GUC student.',
    targetAudience: 'All',
    clubId: 'guc-revive',
    createdAt: '2026-08-07T13:00:00',
    author: 'Menna Ali',
  },
  {
    id: 'revive-2',
    title: 'What Does REVIVE Do the Other 50 Weeks of the Year?',
    body: 'REVIVE is GUC\'s environmental and sustainability club — and Sustainability Week is just the flagship. Year-round, the club runs campus waste-sorting awareness campaigns, partners with Cairo-based NGOs on tree-planting and green-space initiatives, hosts documentary screenings on environmental topics, and runs a "Green Audit" project that tracks and publishes GUC\'s campus waste and energy footprint each semester. REVIVE also runs workshops on sustainable living for students — from capsule wardrobes to reducing food waste in university canteens. If you care about the planet more than just posting about it, REVIVE has a committee for that.',
    targetAudience: 'All',
    clubId: 'guc-revive',
    createdAt: '2026-07-23T10:00:00',
    author: 'Menna Ali',
  },
  {
    id: 'revive-3',
    title: 'The Circular Campus Challenge — Can GUC Go Zero-Waste for a Week?',
    body: 'REVIVE\'s centrepiece challenge for Sustainability Week 2026 is simple in theory: can GUC students collectively reduce campus single-use plastic by 50% for five days? Participants pledge to bring reusable bottles and bags, track their daily waste, and log it through REVIVE\'s challenge form. The data is aggregated and published in real time on REVIVE\'s Instagram across the week. Last year\'s pilot with 120 students showed a 38% reduction in tracked single-use items. This year\'s goal is 500 participants. Sign up at the REVIVE booth from September 14th.',
    targetAudience: 'All',
    clubId: 'guc-revive',
    createdAt: '2026-07-08T12:00:00',
    author: 'Laila Saad',
  },

  // ─── VGS ──────────────────────────────────────────────────────────────────

  {
    id: 'vgs-1',
    title: 'VGS Fall 2026 — Esports Tournament + 48-Hour Game Jam',
    body: 'Video Game Society GUC is opening the semester with two events: the Fall Esports Tournament (FIFA, Valorant, and Tekken brackets — register your team by September 10th) and a 48-Hour Game Jam running September 19–21. The Game Jam challenges solo participants to build a complete game from scratch around a surprise theme revealed at kickoff. Past themes: "Memory," "Infinite Loop," and "Gravity Shift." VGS was founded in 2020 and covers game development, digital art, sound design, and competitive gaming. Follow @vgsguc for team size limits, prize details, and brackets.',
    targetAudience: 'All',
    clubId: 'guc-vgs',
    createdAt: '2026-08-13T15:00:00',
    author: 'Ziad Mostafa',
  },
  {
    id: 'vgs-2',
    title: 'What Is a Game Jam — and Why You Should Try It Even If You\'ve Never Made a Game',
    body: 'A game jam is a timed game-development challenge. You start from zero, and 48 hours later you submit a playable game. Sounds impossible — it\'s actually one of the most exhilarating creative experiences in tech. The constraint forces you to scope ruthlessly, prototype fast, and ship something imperfect but real. VGS Game Jam past participants have gone on to publish their jam games on itch.io, include them in portfolios, and use them in job interviews at game studios. Solo participation is encouraged — but teams of up to 3 are also allowed. The theme is a secret until the starting bell.',
    targetAudience: 'All',
    clubId: 'guc-vgs',
    createdAt: '2026-07-31T09:00:00',
    author: 'Nada Kamel',
  },
  {
    id: 'vgs-3',
    title: 'You Don\'t Have to Code to Join VGS — Here\'s Every Committee',
    body: 'VGS (Video Game Society, founded 2020) has five committees. Game Development builds the games. Digital Art & Design creates character art, environment design, and UI for games and club projects. Sound & Music Design produces original soundtracks, SFX, and audio engineering — GUC\'s only committee dedicated entirely to game audio. Esports & Tournaments runs the competitive side: brackets, referees, streaming, commentary. Media & Content handles social media, trailers, and documenting events. Four of the five committees don\'t require you to write a single line of code. They do require you to care deeply about games as a medium.',
    targetAudience: 'All',
    clubId: 'guc-vgs',
    createdAt: '2026-07-16T14:00:00',
    author: 'Ziad Mostafa',
  },
]
