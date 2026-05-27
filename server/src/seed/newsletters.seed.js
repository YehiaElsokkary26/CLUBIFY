const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function seedNewsletters() {
  await supabase
    .from('newsletters')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000')

  const now = new Date().toISOString()

  const newsletters = [
    // ── MUN ──────────────────────────────────────────────────────────────────
    {
      club_id: 'c-mun-001',
      title: 'Welcome to MUN 2026',
      content:
        'Welcome to the GUC Model United Nations 2026 season! This semester we are running three fully active committees: the General Assembly, the Security Council, and ECOSOC. New delegates will receive a full orientation covering rules of procedure, how to write working papers, and what to expect on the floor during sessions. Whether you are a first-time delegate or a returning chair, this is going to be our most ambitious season yet — mark your calendars and stay tuned for committee assignments.',
      published_at: now,
    },
    {
      club_id: 'c-mun-001',
      title: 'Position Papers Due Soon',
      content:
        'A reminder to all delegates that position papers for the upcoming session are due in two weeks. A strong position paper clearly states your country\'s stance on the topic, references relevant UN resolutions, and proposes actionable policy solutions — aim for one to two pages per topic block. Our research team has compiled a resource pack on the MUN portal with past papers, bloc-building guides, and tips from former Best Delegate award winners. Do not leave your paper to the last day; chairs will be reviewing submissions and sending feedback before the session begins.',
      published_at: now,
    },

    // ── INNOVATORS ────────────────────────────────────────────────────────────
    {
      club_id: 'c-inv-002',
      title: 'Meet the Team 2026',
      content:
        'Innovators GUC is proud to introduce our 2026 engineering team — 24 students from Mechatronics, Electronics, and Mechanical Engineering who are ready to push the car further than ever this year. Our goals for the season include reducing total vehicle weight by 12%, integrating a new telemetry system, and completing the full chassis weld by March. We held our first team assembly session last week and the energy in the workshop was unlike anything we have had before. Follow our journey as we document every build milestone leading up to competition.',
      published_at: now,
    },
    {
      club_id: 'c-inv-002',
      title: 'Competition Season Approaching',
      content:
        'With the national motorsport competition now less than ten weeks away, the Innovators team has shifted into full build mode. The powertrain sub-team completed the drivetrain assembly ahead of schedule, and the electronics sub-team has finished wiring the revised brake-bias system. This past weekend we ran our first dynamic test on the skidpad and the handling numbers look promising. Every department is focused on reliability over raw performance — we want to finish every single dynamic event, and we believe this car is built to do exactly that.',
      published_at: now,
    },

    // ── REVIVE ────────────────────────────────────────────────────────────────
    {
      club_id: 'c-rev-003',
      title: 'Fashion Week 2026 Is Coming',
      content:
        'REVIVE is thrilled to officially announce Fashion Week 2026, our biggest showcase to date. The event will feature student-designed collections across three themes: Heritage, Futurism, and Street. We are now opening applications for models, stylists, stage crew, and the marketing committee — if you have ever wanted to be part of the production side of a major fashion event, this is your moment. Applications close at the end of this month, so visit our page, fill out the form, and tell us where your passion lies.',
      published_at: now,
    },
    {
      club_id: 'c-rev-003',
      title: 'Last Event Recap',
      content:
        'Thank you to everyone who came out to our last REVIVE outing — the turnout exceeded every expectation and the energy in the room was incredible from start to finish. Our photographers and videographers were on the ground capturing every look and every moment, and the full gallery will be posted to our social media pages within the week. A massive thank you to our 30-person volunteer team who handled logistics, guest coordination, and stage management without a single hitch. We are already planning the next one and it is going to be even bigger.',
      published_at: now,
    },

    // ── INSPIRE ───────────────────────────────────────────────────────────────
    {
      club_id: 'c-ins-004',
      title: 'New Semester, New Goals',
      content:
        'INSPIRE is back for 2026 and we are launching the semester with a campus-wide 30-day fitness challenge open to all GUC students regardless of fitness level. Alongside the challenge we are kicking off tryouts for our football, basketball, and volleyball teams this week — all you need is a valid student ID and a willingness to compete. Our weekly wellness sessions with certified trainers continue every Tuesday and Thursday at the sports hall. Come in, set a goal, and let us help you hit it.',
      published_at: now,
    },
    {
      club_id: 'c-ins-004',
      title: 'Tournament Results',
      content:
        'Congratulations to all participants in last weekend\'s inter-university 5-a-side football tournament — GUC finished in second place out of twelve universities, our best result in three years. The men\'s basketball team also had a strong showing in the regional league opener, winning by 14 points in a commanding performance from our starting five. We want to shout out every single player, coach, and supporter who made the trip. Our next tournament is the mixed volleyball competition in four weeks — registrations for team slots are open now.',
      published_at: now,
    },

    // ── TEDx GUC ──────────────────────────────────────────────────────────────
    {
      club_id: 'c-ted-005',
      title: 'TEDx GUC 2026 Applications Open',
      content:
        'TEDx GUC 2026 is officially in motion and we are now accepting speaker applications for this year\'s event. Our theme is "Uncharted" — ideas that challenge the expected, explore unfamiliar territory, and expand what we believe is possible. We are looking for speakers from any background: science, art, business, social impact, or lived experience. Volunteer applications for our curation, media, logistics, and design committees are also open on the same form. This event is built entirely by students for students, and we want you to be part of making it happen.',
      published_at: now,
    },
    {
      club_id: 'c-ted-005',
      title: 'Behind the Scenes',
      content:
        'Most people see the TEDx stage — the polished talk, the lighting, the crowd. What they do not see is the six months of work that our curation and media committees put in together to get there. The curation team reviews every speaker application, runs coaching sessions, and works one-on-one with speakers to refine their ideas into 12-minute talks that resonate. The media team handles everything from the event identity and stage design to filming, editing, and the live stream. This newsletter is a small window into that process — and a thank you to every person who does the invisible work.',
      published_at: now,
    },

    // ── ATHAR ─────────────────────────────────────────────────────────────────
    {
      club_id: 'c-ath-006',
      title: 'New Teaching Sessions in Mansheya',
      content:
        'ATHAR\'s weekly teaching visits to Mansheya are now running every Saturday morning with sessions covering Arabic literacy, basic mathematics, and English conversation for children aged 6 to 14. This semester we have 18 active student volunteers rotating across three classrooms, each supported by a team leader who coordinates the lesson plan for the week. If you would like to join as a volunteer teacher — no prior experience required, just patience and a genuine desire to help — fill out the volunteer form on our page and we will get you onboarded within a week.',
      published_at: now,
    },
    {
      club_id: 'c-ath-006',
      title: 'Impact Report',
      content:
        'This semester ATHAR reached 214 children across four community visits, delivered 38 teaching sessions, and distributed school supply kits to 60 families in need. Beyond the numbers, we want to share a moment that stayed with our volunteers: a seven-year-old named Kareem read his first full sentence aloud during our third session and the entire room cheered. That is why we do this. Our upcoming charity drive will collect stationery, books, and winter clothing — drop-off points will be set up across campus starting next week, and every contribution goes directly to the communities we serve.',
      published_at: now,
    },

    // ── AYB ───────────────────────────────────────────────────────────────────
    {
      club_id: 'c-ayb-007',
      title: 'Ramadan Campaign 2026',
      content:
        'AYB\'s annual Ramadan food drive is launching this week and we need your help to make it our biggest yet. Donation drop points for non-perishable food items are set up at the main gate, Building C, and the library entrance — look for the AYB collection boxes. We are also running online donations for families who prefer to contribute financially, with every pound going towards prepared Iftar meals. Volunteers for packing and distribution days are still needed; shifts are a few hours each and you will leave knowing you made a direct difference.',
      published_at: now,
    },
    {
      club_id: 'c-ayb-007',
      title: 'Year in Review',
      content:
        'What a year it has been for AYB. Across 2025 and into 2026 we ran 11 initiatives including our Ramadan food drive, a school bag campaign for underprivileged children, a hospital visit program, and a fundraising bazaar that raised over 45,000 EGP for local charities. None of this would have been possible without the 160 student volunteers who gave their time, energy, and compassion throughout the year. As we close this chapter, we want to say a genuine thank you — to every volunteer, donor, and partner who believed in what we are building together.',
      published_at: now,
    },

    // ── IEEE ──────────────────────────────────────────────────────────────────
    {
      club_id: 'c-iee-008',
      title: 'Welcome to IEEE GUC 2026',
      content:
        'The IEEE GUC Student Branch is back with a full technical workshop programme for 2026 and we are excited to welcome both returning members and first-timers. This semester\'s topics include an Introduction to Artificial Intelligence and Machine Learning, Embedded Systems and Microcontroller Programming, PCB Design with KiCad, and a hands-on IoT prototyping series. Workshops run every other Saturday in the Engineering labs and are free for all GUC students. Follow our page to get notified when registration opens for each session — seats fill up fast.',
      published_at: now,
    },
    {
      club_id: 'c-iee-008',
      title: 'Workshop Recap: Introduction to Embedded Systems',
      content:
        'Last Saturday\'s embedded systems workshop brought together 40 students for a full-day session covering the fundamentals of microcontroller architecture, GPIO programming with Arduino, and a live project where teams built a basic line-following robot from scratch. Our workshop leads shared all code samples, circuit diagrams, and reference materials in the IEEE GUC shared drive — check the link in our bio. The next workshop in the series will cover interrupt handling and UART communication and is scheduled for three weeks from now. If you missed this one, registration for the next session opens on Monday.',
      published_at: now,
    },

    // ── INSIDER ───────────────────────────────────────────────────────────────
    {
      club_id: 'c-isd-009',
      title: 'Call for Writers and Photographers',
      content:
        'INSIDER is officially opening applications for new contributors to our campus magazine and we are looking for writers, photographers, and social media creatives who want to tell real stories about life at GUC. You do not need prior journalism experience — just a curious mind, a willingness to learn, and something you want to say. We publish in both Arabic and English and cover everything from student opinion pieces and club spotlights to investigative campus stories. Apply through the form on our page and include two writing samples or a portfolio link if you are applying as a photographer.',
      published_at: now,
    },
    {
      club_id: 'c-isd-009',
      title: 'Campus Stories This Month',
      content:
        'This month the INSIDER team covered three major campus stories: an in-depth look at the new academic advising system and how students are adapting, a photo essay from the Innovators workshop documenting the car build process, and an interview series with four GUC graduates now working at leading tech and media companies in Egypt. Our most-read piece this month was a student opinion column on the pressure of grade curves — it sparked a genuine conversation across campus and in the comments section. If a story is happening at GUC, INSIDER will be there.',
      published_at: now,
    },

    // ── CURA ──────────────────────────────────────────────────────────────────
    {
      club_id: 'c-cur-010',
      title: 'Robotic Arm Project Update',
      content:
        'The CURA team is making strong progress on our six-degrees-of-freedom robotic arm project. This past month we resolved a critical torque calculation issue in the shoulder joint that had been limiting our payload capacity, and the new servo mounting brackets have been 3D-printed and tested. The control software team has completed inverse kinematics integration using Python and ROS2, and we are now running pick-and-place tests with an accuracy of ±2mm. Our target is to have a fully operational demo ready for the end-of-semester showcase, and we are on track to deliver.',
      published_at: now,
    },
    {
      club_id: 'c-cur-010',
      title: 'CURA at the National Competition',
      content:
        'CURA competed in the National Engineering and Robotics Competition last month and we are proud to report that our team placed third in the autonomous navigation category out of 22 competing university teams. It was a hard-fought result — our robot completed the obstacle course cleanly in the first two rounds but a sensor calibration issue in the final round cost us valuable time. The lessons learned from competition conditions are already being applied to our next build cycle. We want to thank every member who put in late nights in the lab to get us to that stage — this result belongs to all of you.',
      published_at: now,
    },

    // ── VGS ───────────────────────────────────────────────────────────────────
    {
      club_id: 'c-vgs-011',
      title: 'Game Jam 2026 Announcement',
      content:
        'VGS is hosting our first internal Game Jam of 2026 and every GUC student is invited to participate. Teams of two to four people will have 48 hours to design, build, and submit a playable game built around this year\'s secret theme — revealed at the opening ceremony. You can use any engine: Unity, Godot, GameMaker, or even pure code. First place wins a full game development equipment bundle, and all submissions will be showcased at a public demo event at the end of semester. Register your team through the VGS page before spots fill up.',
      published_at: now,
    },
    {
      club_id: 'c-vgs-011',
      title: 'Music Production Workshop Recap',
      content:
        'Last week\'s music production workshop with VGS was a sold-out session covering the fundamentals of digital audio workstations, sound design for games, and how to create adaptive music that responds to in-game events. Our session lead walked participants through building a complete ambient track from scratch using FL Studio, covering layering, mixing, and export settings for game engines. All project files and a curated resource list have been shared with attendees. Our next session will focus on procedural audio and FMOD integration with Unity — date and registration will be announced by end of week.',
      published_at: now,
    },
  ]

  const { error } = await supabase.from('newsletters').insert(newsletters)
  if (error) {
    console.error('Seed error:', error.message)
    process.exit(1)
  }
  console.log(`Seeded ${newsletters.length} newsletters successfully`)
}

seedNewsletters()
