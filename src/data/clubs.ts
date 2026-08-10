import type { Club, ClubEvent } from './types'

export const clubs: Club[] = [
  {
    id: 'c1',
    name: 'GUC Media Club',
    slug: 'media-club',
    category: 'Media',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=media&backgroundColor=8B1A1A',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80',
    description: 'The GUC Media Club is the creative voice of the university — producing podcasts, short films, social media content, and campus news.',
    mission: 'To nurture the next generation of storytellers, content creators, and media professionals within the GUC community.',
    memberCount: 142,
    founded: 2015,
    contactEmail: 'media@guc.edu.eg',
    socialLinks: {
      instagram: 'https://instagram.com/gucmedia',
      facebook: 'https://facebook.com/gucmedia',
      linkedin: 'https://linkedin.com/company/gucmedia',
      website: 'https://media.guc.edu.eg',
    },
    tags: ['Media', 'Film', 'Podcast', 'Content Creation', 'Photography'],
    isRecruiting: true,
    recruitmentDeadline: '2026-06-01',
    spotsLeft: 12,
    committees: [
      { id: 'cm1', name: 'Video Production', description: 'Shoot and edit video content for events and social media.', spotsAvailable: 4 },
      { id: 'cm2', name: 'Podcast Team', description: 'Host and produce the weekly GUC Pulse podcast.', spotsAvailable: 3 },
      { id: 'cm3', name: 'Social Media', description: 'Manage Instagram, TikTok, and Facebook presence.', spotsAvailable: 5 },
    ],
    events: [
      { id: 'e1', clubId: 'c1', title: 'Campus Documentary Shoot', date: '2026-05-20', time: '10:00 AM', location: 'GUC Campus Grounds', description: 'Annual documentary covering campus life.', type: 'Workshop' },
      { id: 'e2', clubId: 'c1', title: 'Podcast Recording Session', date: '2026-05-28', time: '2:00 PM', location: 'Media Studio, C5', description: 'Live recording of Episode 34 of GUC Pulse.', type: 'Social' },
    ],
    members: [
      { id: 'm1', name: 'Sara Ahmed', role: 'President', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sara' },
      { id: 'm2', name: 'Omar Khalil', role: 'Head of Video', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=omar', isMonthStar: true, quote: 'Every frame tells a story.' },
      { id: 'm3', name: 'Layla Hassan', role: 'Podcast Host', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=layla' },
    ],
    spotlightContent: {
      clubOfWeek: { title: 'Club of the Week', subtitle: 'GUC Media Club', description: 'Creating the visual identity of GUC, one story at a time.', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80' },
      memberOfMonth: { name: 'Omar Khalil', role: 'Head of Video Production', quote: 'Every frame tells a story.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=omar' },
    },
    whoShouldJoin: 'Students passionate about storytelling, film, photography, or digital content who want to build a real media portfolio.',
  },
  {
    id: 'c2',
    name: 'GUC Business Club',
    slug: 'business-club',
    category: 'Business',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=business&backgroundColor=1A3A8B',
    coverImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80',
    description: 'Bridging the gap between academia and industry, the GUC Business Club connects students with real-world business experience through workshops, competitions, and corporate visits.',
    mission: 'To develop business acumen, leadership, and entrepreneurial thinking in GUC students.',
    memberCount: 198,
    founded: 2012,
    contactEmail: 'business@guc.edu.eg',
    socialLinks: {
      instagram: 'https://instagram.com/gucbusiness',
      facebook: 'https://facebook.com/gucbusiness',
      linkedin: 'https://linkedin.com/company/gucbusiness',
    },
    tags: ['Business', 'Leadership', 'Finance', 'Marketing', 'Entrepreneurship'],
    isRecruiting: true,
    recruitmentDeadline: '2026-05-25',
    spotsLeft: 8,
    committees: [
      { id: 'cm4', name: 'Corporate Relations', description: 'Manage relationships with partner companies.', spotsAvailable: 3 },
      { id: 'cm5', name: 'Events & Logistics', description: 'Organize workshops, panels, and corporate visits.', spotsAvailable: 5 },
    ],
    events: [
      { id: 'e3', clubId: 'c2', title: 'Case Competition Finals', date: '2026-05-22', time: '9:00 AM', location: 'Main Hall, H11', description: 'Annual business case competition.', type: 'Competition' },
      { id: 'e4', clubId: 'c2', title: 'Corporate Panel: Future of Finance', date: '2026-06-05', time: '3:00 PM', location: 'Auditorium A', description: 'Panel with CFOs from top Egyptian companies.', type: 'Talk' },
    ],
    members: [
      { id: 'm4', name: 'Nour Sayed', role: 'President', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nour' },
      { id: 'm5', name: 'Ahmed Mostafa', role: 'VP Finance', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed', isMonthStar: true, quote: 'Business is relationships.' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Ahmed Mostafa', role: 'VP Finance', quote: 'Business is relationships.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed' },
    },
    whoShouldJoin: 'Students interested in finance, management, consulting, or entrepreneurship who want hands-on business exposure.',
  },
  {
    id: 'c3',
    name: 'GUC Robotics Club',
    slug: 'robotics-club',
    category: 'Technology',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=robotics&backgroundColor=1A6B2A',
    coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    description: 'Building the engineers of tomorrow — the GUC Robotics Club designs, programs, and competes with robots at national and international competitions.',
    mission: 'To foster innovation and hands-on engineering skills through robotics challenges and collaborative projects.',
    memberCount: 87,
    founded: 2018,
    contactEmail: 'robotics@guc.edu.eg',
    socialLinks: {
      instagram: 'https://instagram.com/gucrobotics',
      facebook: 'https://facebook.com/gucrobotics',
      website: 'https://robotics.guc.edu.eg',
    },
    tags: ['Robotics', 'Engineering', 'AI', 'Programming', 'Competition'],
    isRecruiting: false,
    committees: [
      { id: 'cm6', name: 'Mechanical Design', description: 'Design and build robot chassis and mechanisms.', spotsAvailable: 0 },
      { id: 'cm7', name: 'Software & AI', description: 'Program robot logic and implement AI algorithms.', spotsAvailable: 0 },
    ],
    events: [
      { id: 'e5', clubId: 'c3', title: 'Robot Wars Demo Day', date: '2026-06-10', time: '11:00 AM', location: 'Engineering Labs', description: 'Showcase of this semester\'s robot builds.', type: 'Competition' },
    ],
    members: [
      { id: 'm6', name: 'Karim Adel', role: 'President', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karim' },
      { id: 'm7', name: 'Dina Fawzy', role: 'Lead Engineer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dina', isMonthStar: true, quote: 'Make it work, then make it great.' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Dina Fawzy', role: 'Lead Engineer', quote: 'Make it work, then make it great.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dina' },
    },
    whoShouldJoin: 'Engineering and CS students who love building things and want to compete at regional and international robotics events.',
  },
  {
    id: 'c4',
    name: 'GUC Drama Club',
    slug: 'drama-club',
    category: 'Arts',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=drama&backgroundColor=6B1A8B',
    coverImage: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&q=80',
    description: 'Where emotion meets expression. The GUC Drama Club produces theatrical performances, improv shows, and acting workshops throughout the year.',
    mission: 'To provide a creative stage for students to explore performance arts and storytelling through theater.',
    memberCount: 64,
    founded: 2016,
    contactEmail: 'drama@guc.edu.eg',
    socialLinks: {
      instagram: 'https://instagram.com/gucdrama',
      facebook: 'https://facebook.com/gucdrama',
    },
    tags: ['Drama', 'Theater', 'Acting', 'Performance', 'Improv'],
    isRecruiting: true,
    recruitmentDeadline: '2026-05-30',
    spotsLeft: 6,
    committees: [
      { id: 'cm8', name: 'Acting', description: 'Perform in stage productions and workshops.', spotsAvailable: 4 },
      { id: 'cm9', name: 'Backstage & Tech', description: 'Handle lighting, sound, and set design.', spotsAvailable: 2 },
    ],
    events: [
      { id: 'e6', clubId: 'c4', title: 'Spring Play: "Cairo Stories"', date: '2026-05-25', time: '7:00 PM', location: 'GUC Theater', description: 'Our annual spring production.', type: 'Social' },
    ],
    members: [
      { id: 'm8', name: 'Maya Samir', role: 'Director', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maya' },
      { id: 'm9', name: 'Tamer Fouad', role: 'Lead Actor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tamer', isMonthStar: true, quote: 'The stage is my second home.' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Tamer Fouad', role: 'Lead Actor', quote: 'The stage is my second home.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tamer' },
    },
    whoShouldJoin: 'Students who want to act, direct, or work backstage — all skill levels welcome, from beginners to experienced performers.',
  },
  {
    id: 'c5',
    name: 'GUC Basketball Team',
    slug: 'basketball-team',
    category: 'Sports',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=basketball&backgroundColor=E07B39',
    coverImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
    description: 'Competing at university level, the GUC Basketball Team trains rigorously and participates in inter-university leagues across Egypt.',
    mission: 'To promote athletic excellence, teamwork, and a healthy lifestyle within the GUC community.',
    memberCount: 32,
    founded: 2013,
    contactEmail: 'basketball@guc.edu.eg',
    socialLinks: {
      instagram: 'https://instagram.com/gucbasketball',
      facebook: 'https://facebook.com/gucbasketball',
    },
    tags: ['Basketball', 'Sports', 'Competition', 'Fitness', 'Team'],
    isRecruiting: false,
    committees: [
      { id: 'cm10', name: "Men's Team", description: 'Varsity men\'s basketball team.', spotsAvailable: 0 },
      { id: 'cm11', name: "Women's Team", description: 'Varsity women\'s basketball team.', spotsAvailable: 0 },
    ],
    events: [
      { id: 'e7', clubId: 'c5', title: 'Inter-University Championship', date: '2026-06-15', time: '4:00 PM', location: 'GUC Sports Complex', description: 'Regional championship round.', type: 'Competition' },
    ],
    members: [
      { id: 'm10', name: 'Hassan Ramzy', role: 'Team Captain', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hassan' },
      { id: 'm11', name: 'Rana Ibrahim', role: 'Women\'s Captain', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rana', isMonthStar: true, quote: 'Hard work beats talent when talent doesn\'t work hard.' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Rana Ibrahim', role: 'Women\'s Captain', quote: 'Hard work beats talent.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rana' },
    },
    whoShouldJoin: 'Students with basketball experience who want to compete at a high level and represent GUC.',
  },
  {
    id: 'c6',
    name: 'GUC Community Service Club',
    slug: 'community-service-club',
    category: 'Community',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=community&backgroundColor=2A8B6B',
    coverImage: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
    description: 'Making a real difference — the GUC Community Service Club organizes volunteering initiatives, charity drives, and social impact projects.',
    mission: 'To cultivate a culture of giving and social responsibility among GUC students.',
    memberCount: 156,
    founded: 2011,
    contactEmail: 'community@guc.edu.eg',
    socialLinks: {
      instagram: 'https://instagram.com/guccommunity',
      facebook: 'https://facebook.com/guccommunity',
    },
    tags: ['Volunteering', 'Community', 'Social Impact', 'Charity', 'Environment'],
    isRecruiting: true,
    recruitmentDeadline: '2026-06-10',
    spotsLeft: 20,
    committees: [
      { id: 'cm12', name: 'Education Initiative', description: 'Tutor underprivileged school students.', spotsAvailable: 8 },
      { id: 'cm13', name: 'Fundraising', description: 'Organize charity events and drives.', spotsAvailable: 7 },
      { id: 'cm14', name: 'Environment Team', description: 'Lead campus and city clean-up campaigns.', spotsAvailable: 5 },
    ],
    events: [
      { id: 'e8', clubId: 'c6', title: 'Blood Donation Drive', date: '2026-05-18', time: '9:00 AM', location: 'Student Services Building', description: 'Annual blood donation campaign.', type: 'Social' },
    ],
    members: [
      { id: 'm12', name: 'Yasmin Ali', role: 'President', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yasmin' },
      { id: 'm13', name: 'Sherif Mansour', role: 'Education Lead', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sherif', isMonthStar: true, quote: 'Small acts, when multiplied, change the world.' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Sherif Mansour', role: 'Education Lead', quote: 'Small acts, when multiplied, change the world.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sherif' },
    },
    whoShouldJoin: 'Any student who wants to give back to society and make a meaningful difference in the community.',
  },
  {
    id: 'c7',
    name: 'GUC Photography Club',
    slug: 'photography-club',
    category: 'Arts',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=photo&backgroundColor=4A4A8B',
    coverImage: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80',
    description: 'Capturing life through a lens — the GUC Photography Club hosts photo walks, workshops, and annual exhibitions showcasing student talent.',
    mission: 'To develop visual storytelling skills and celebrate photography as an art form.',
    memberCount: 73,
    founded: 2017,
    contactEmail: 'photography@guc.edu.eg',
    socialLinks: {
      instagram: 'https://instagram.com/gucphoto',
      facebook: 'https://facebook.com/gucphoto',
    },
    tags: ['Photography', 'Arts', 'Visual', 'Exhibition', 'Workshop'],
    isRecruiting: true,
    recruitmentDeadline: '2026-05-28',
    spotsLeft: 5,
    committees: [
      { id: 'cm15', name: 'Street Photography', description: 'Explore urban photography around Cairo.', spotsAvailable: 3 },
      { id: 'cm16', name: 'Studio & Portraits', description: 'Professional studio photography sessions.', spotsAvailable: 2 },
    ],
    events: [
      { id: 'e9', clubId: 'c7', title: 'Annual Photo Exhibition', date: '2026-06-08', time: '5:00 PM', location: 'GUC Gallery, C4', description: 'Showcase of the year\'s best student photographs.', type: 'Social' },
    ],
    members: [
      { id: 'm14', name: 'Mona Farouk', role: 'President', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mona' },
      { id: 'm15', name: 'Youssef Salem', role: 'Lead Photographer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=youssef2', isMonthStar: true, quote: 'Every photo is a certificate of presence.' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Youssef Salem', role: 'Lead Photographer', quote: 'Every photo is a certificate of presence.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=youssef2' },
    },
    whoShouldJoin: 'Anyone with a camera (DSLR, mirrorless, or even a phone) who wants to learn and grow as a photographer.',
  },
  {
    id: 'c8',
    name: 'GUC Debate Club',
    slug: 'debate-club',
    category: 'Academic',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=debate&backgroundColor=8B5A1A',
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    description: 'Sharpen your mind and voice — the GUC Debate Club trains students in critical thinking, public speaking, and formal debate formats.',
    mission: 'To build confident, articulate speakers who can analyze complex issues and argue persuasively.',
    memberCount: 45,
    founded: 2016,
    contactEmail: 'debate@guc.edu.eg',
    socialLinks: {
      instagram: 'https://instagram.com/gucdebate',
      facebook: 'https://facebook.com/gucdebate',
    },
    tags: ['Debate', 'Public Speaking', 'Critical Thinking', 'Academic', 'MUN'],
    isRecruiting: true,
    recruitmentDeadline: '2026-06-05',
    spotsLeft: 10,
    committees: [
      { id: 'cm17', name: 'Training Team', description: 'Coach new members in debate techniques.', spotsAvailable: 4 },
      { id: 'cm18', name: 'Competition Team', description: 'Represent GUC at inter-university debates.', spotsAvailable: 6 },
    ],
    events: [
      { id: 'e10', clubId: 'c8', title: 'Intra-GUC Debate Tournament', date: '2026-05-26', time: '1:00 PM', location: 'Seminar Room, H7', description: 'Internal tournament open to all members.', type: 'Competition' },
    ],
    members: [
      { id: 'm16', name: 'Amira Nasser', role: 'President', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amira' },
      { id: 'm17', name: 'Tarek Youssef', role: 'Chief Trainer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tarek', isMonthStar: true, quote: 'Words are the most powerful weapon.' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Tarek Youssef', role: 'Chief Trainer', quote: 'Words are the most powerful weapon.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tarek' },
    },
    whoShouldJoin: 'Students who enjoy arguing, persuading, and thinking critically about current events and social issues.',
  },
  {
    id: 'c9',
    name: 'GUC Music Club',
    slug: 'music-club',
    category: 'Arts',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=music&backgroundColor=8B1A6B',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
    description: 'From classical to contemporary — the GUC Music Club brings musicians, singers, and music lovers together for performances and jam sessions.',
    mission: 'To make music accessible to everyone and celebrate musical diversity on campus.',
    memberCount: 88,
    founded: 2014,
    contactEmail: 'music@guc.edu.eg',
    socialLinks: {
      instagram: 'https://instagram.com/gucmusic',
      facebook: 'https://facebook.com/gucmusic',
    },
    tags: ['Music', 'Arts', 'Performance', 'Band', 'Singing'],
    isRecruiting: false,
    committees: [
      { id: 'cm19', name: 'Band', description: 'Full band performing at campus events.', spotsAvailable: 0 },
      { id: 'cm20', name: 'Choir', description: 'Vocal ensemble for campus performances.', spotsAvailable: 0 },
    ],
    events: [
      { id: 'e11', clubId: 'c9', title: 'End of Year Concert', date: '2026-06-20', time: '7:00 PM', location: 'GUC Main Auditorium', description: 'Annual showcase of student musical talent.', type: 'Social' },
    ],
    members: [
      { id: 'm18', name: 'Hana Tawfik', role: 'President', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hana' },
      { id: 'm19', name: 'Ziad El-Masry', role: 'Lead Guitarist', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ziad', isMonthStar: true, quote: 'Music speaks what cannot be expressed.' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Ziad El-Masry', role: 'Lead Guitarist', quote: 'Music speaks what cannot be expressed.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ziad' },
    },
    whoShouldJoin: 'Anyone who plays an instrument, sings, or simply loves music — all genres and skill levels welcome.',
  },
  {
    id: 'c10',
    name: 'GUC Entrepreneurship Club',
    slug: 'entrepreneurship-club',
    category: 'Business',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=entre&backgroundColor=1A5A8B',
    coverImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',
    description: 'Turning ideas into startups — the GUC Entrepreneurship Club mentors student founders, hosts pitch competitions, and connects them with investors.',
    mission: 'To ignite the entrepreneurial spirit and equip GUC students with the tools to build their own ventures.',
    memberCount: 124,
    founded: 2019,
    contactEmail: 'entre@guc.edu.eg',
    socialLinks: {
      instagram: 'https://instagram.com/gucentre',
      linkedin: 'https://linkedin.com/company/gucentre',
      website: 'https://entre.guc.edu.eg',
    },
    tags: ['Entrepreneurship', 'Startups', 'Innovation', 'Business', 'Pitch'],
    isRecruiting: true,
    recruitmentDeadline: '2026-06-01',
    spotsLeft: 15,
    committees: [
      { id: 'cm21', name: 'Mentorship Program', description: 'Connect student founders with industry mentors.', spotsAvailable: 6 },
      { id: 'cm22', name: 'Events Team', description: 'Organize pitch nights and startup workshops.', spotsAvailable: 9 },
    ],
    events: [
      { id: 'e12', clubId: 'c10', title: 'GUC Pitch Night', date: '2026-05-29', time: '6:00 PM', location: 'Innovation Hub', description: 'Students pitch their startup ideas to investors.', type: 'Competition' },
    ],
    members: [
      { id: 'm20', name: 'Rami Ashraf', role: 'President', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rami' },
      { id: 'm21', name: 'Noha Bassem', role: 'Mentor Coordinator', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=noha', isMonthStar: true, quote: 'Every great company started as an idea.' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Noha Bassem', role: 'Mentor Coordinator', quote: 'Every great company started as an idea.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=noha' },
    },
    whoShouldJoin: 'Aspiring founders, innovators, or anyone who wants to learn how to build and grow a business from scratch.',
  },
  {
    id: 'c11',
    name: 'GUC Chess Club',
    slug: 'chess-club',
    category: 'Academic',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=chess&backgroundColor=3A3A3A',
    coverImage: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&q=80',
    description: 'Think deeper, play smarter — the GUC Chess Club hosts weekly tournaments and trains students from beginner to competitive level.',
    mission: 'To develop strategic thinking and mental discipline through the game of chess.',
    memberCount: 38,
    founded: 2020,
    contactEmail: 'chess@guc.edu.eg',
    socialLinks: {
      instagram: 'https://instagram.com/gucchess',
      facebook: 'https://facebook.com/gucchess',
    },
    tags: ['Chess', 'Strategy', 'Academic', 'Competition', 'Mindset'],
    isRecruiting: true,
    recruitmentDeadline: '2026-06-15',
    spotsLeft: 12,
    committees: [
      { id: 'cm23', name: 'Training', description: 'Weekly chess sessions and puzzle solving.', spotsAvailable: 8 },
      { id: 'cm24', name: 'Tournaments', description: 'Organize and compete in chess tournaments.', spotsAvailable: 4 },
    ],
    events: [
      { id: 'e13', clubId: 'c11', title: 'Blitz Chess Tournament', date: '2026-05-24', time: '2:00 PM', location: 'Student Lounge, H5', description: '5-minute blitz format tournament.', type: 'Competition' },
    ],
    members: [
      { id: 'm22', name: 'Adel Hamdy', role: 'Club President', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=adel' },
      { id: 'm23', name: 'Salma Waheed', role: 'Top Player', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=salma', isMonthStar: true, quote: 'Chess is life in miniature.' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Salma Waheed', role: 'Top Player', quote: 'Chess is life in miniature.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=salma' },
    },
    whoShouldJoin: 'Anyone who enjoys chess — from absolute beginners learning the rules to advanced players seeking competition.',
  },
  {
    id: 'c12',
    name: 'GUC Football Team',
    slug: 'football-team',
    category: 'Sports',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=football&backgroundColor=1A8B3A',
    coverImage: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80',
    description: 'The pride of GUC on the field — the football team competes in the Egyptian University Football League and trains five days a week.',
    mission: 'To represent GUC with excellence in football and build champions on and off the pitch.',
    memberCount: 40,
    founded: 2010,
    contactEmail: 'football@guc.edu.eg',
    socialLinks: {
      instagram: 'https://instagram.com/gucfootball',
      facebook: 'https://facebook.com/gucfootball',
    },
    tags: ['Football', 'Soccer', 'Sports', 'Competition', 'Team'],
    isRecruiting: false,
    committees: [
      { id: 'cm25', name: 'First Team', description: 'Varsity team competing in EUFL.', spotsAvailable: 0 },
      { id: 'cm26', name: 'Reserve Team', description: 'Development squad for upcoming talent.', spotsAvailable: 0 },
    ],
    events: [
      { id: 'e14', clubId: 'c12', title: 'EUFL Quarter Finals', date: '2026-06-12', time: '5:00 PM', location: 'GUC Football Pitch', description: 'Egyptian University Football League quarter finals.', type: 'Competition' },
    ],
    members: [
      { id: 'm24', name: 'Mohamed Saad', role: 'Team Captain', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mohamedS' },
      { id: 'm25', name: 'Khaled Nabil', role: 'Top Scorer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=khaled', isMonthStar: true, quote: 'The pitch is my canvas.' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Khaled Nabil', role: 'Top Scorer', quote: 'The pitch is my canvas.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=khaled' },
    },
    whoShouldJoin: 'Skilled football players who want to compete at university level and be part of a dedicated squad.',
  },
  {
    id: 'c13',
    name: 'GUC Dance Club',
    slug: 'dance-club',
    category: 'Arts',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=dance&backgroundColor=8B1A5A',
    coverImage: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&q=80',
    description: 'Move, express, perform — the GUC Dance Club covers contemporary, hip-hop, salsa, and traditional Egyptian dance styles.',
    mission: 'To celebrate dance as an art form and provide students with a creative physical outlet.',
    memberCount: 56,
    founded: 2017,
    contactEmail: 'dance@guc.edu.eg',
    socialLinks: {
      instagram: 'https://instagram.com/gucdance',
      facebook: 'https://facebook.com/gucdance',
    },
    tags: ['Dance', 'Arts', 'Performance', 'Hip-Hop', 'Contemporary'],
    isRecruiting: true,
    recruitmentDeadline: '2026-05-31',
    spotsLeft: 8,
    committees: [
      { id: 'cm27', name: 'Contemporary', description: 'Modern dance styles and choreography.', spotsAvailable: 4 },
      { id: 'cm28', name: 'Hip-Hop', description: 'Street dance and urban styles.', spotsAvailable: 4 },
    ],
    events: [
      { id: 'e15', clubId: 'c13', title: 'Spring Dance Showcase', date: '2026-06-03', time: '7:30 PM', location: 'GUC Auditorium', description: 'End of semester performance.', type: 'Social' },
    ],
    members: [
      { id: 'm26', name: 'Farida Shawky', role: 'Choreographer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=farida' },
      { id: 'm27', name: 'Adam Wagih', role: 'Hip-Hop Lead', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=adam', isMonthStar: true, quote: 'Dance is the hidden language of the soul.' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Adam Wagih', role: 'Hip-Hop Lead', quote: 'Dance is the hidden language of the soul.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=adam' },
    },
    whoShouldJoin: 'Students who love to move — complete beginners and experienced dancers alike.',
  },
  {
    id: 'c14',
    name: 'GUC Environmental Club',
    slug: 'environmental-club',
    category: 'Community',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=env&backgroundColor=1A8B2A',
    coverImage: 'https://images.unsplash.com/photo-1569163139394-de4e5f43e5d0?w=800&q=80',
    description: 'Fighting for a greener future — the GUC Environmental Club organizes sustainability campaigns, tree planting, and eco-awareness events.',
    mission: 'To make GUC a leader in sustainability and environmental consciousness.',
    memberCount: 69,
    founded: 2019,
    contactEmail: 'env@guc.edu.eg',
    socialLinks: {
      instagram: 'https://instagram.com/gucenv',
      facebook: 'https://facebook.com/gucenv',
    },
    tags: ['Environment', 'Sustainability', 'Climate', 'Green', 'Community'],
    isRecruiting: true,
    recruitmentDeadline: '2026-06-08',
    spotsLeft: 14,
    committees: [
      { id: 'cm29', name: 'Campus Green', description: 'Lead campus sustainability initiatives.', spotsAvailable: 7 },
      { id: 'cm30', name: 'Awareness', description: 'Create content and campaigns about climate change.', spotsAvailable: 7 },
    ],
    events: [
      { id: 'e16', clubId: 'c14', title: 'GUC Clean-Up Day', date: '2026-05-21', time: '8:00 AM', location: 'GUC Campus', description: 'Campus-wide clean-up initiative.', type: 'Social' },
    ],
    members: [
      { id: 'm28', name: 'Lina Hossam', role: 'President', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lina' },
      { id: 'm29', name: 'Basel Amin', role: 'Campaign Lead', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=basel', isMonthStar: true, quote: 'We do not inherit the earth; we borrow it.' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Basel Amin', role: 'Campaign Lead', quote: 'We do not inherit the earth; we borrow it.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=basel' },
    },
    whoShouldJoin: 'Environmentally conscious students who want to take real action on climate and sustainability issues.',
  },
  {
    id: 'c15',
    name: 'GUC Film Club',
    slug: 'film-club',
    category: 'Media',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=film&backgroundColor=3A1A8B',
    coverImage: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80',
    description: 'Celebrating cinema in all its forms — the GUC Film Club hosts screenings, film analysis sessions, and short film production projects.',
    mission: 'To foster cinematic appreciation and give aspiring filmmakers a platform to create.',
    memberCount: 52,
    founded: 2018,
    contactEmail: 'film@guc.edu.eg',
    socialLinks: {
      instagram: 'https://instagram.com/gucfilm',
      facebook: 'https://facebook.com/gucfilm',
    },
    tags: ['Film', 'Cinema', 'Directing', 'Screenplay', 'Media'],
    isRecruiting: false,
    committees: [
      { id: 'cm31', name: 'Production', description: 'Write and direct short films.', spotsAvailable: 0 },
      { id: 'cm32', name: 'Screenings', description: 'Curate and host film screening events.', spotsAvailable: 0 },
    ],
    events: [
      { id: 'e17', clubId: 'c15', title: 'Short Film Festival', date: '2026-06-18', time: '6:00 PM', location: 'GUC Theater', description: 'Premiere of student-produced short films.', type: 'Social' },
    ],
    members: [
      { id: 'm30', name: 'Yara Galal', role: 'President', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yara' },
      { id: 'm31', name: 'Ramzy Lotfy', role: 'Film Director', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ramzy', isMonthStar: true, quote: 'Cinema is a mirror by which we often see ourselves.' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Ramzy Lotfy', role: 'Film Director', quote: 'Cinema is a mirror by which we often see ourselves.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ramzy' },
    },
    whoShouldJoin: 'Film lovers, aspiring directors, scriptwriters, or anyone who wants to create or discuss cinema.',
  },
  {
    id: 'c16',
    name: 'GUC MUN Club',
    slug: 'mun-club',
    category: 'Academic',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=mun&backgroundColor=1A4A8B',
    coverImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&q=80',
    description: 'Simulating global diplomacy — the GUC Model United Nations Club prepares students for MUN conferences across Egypt and the world.',
    mission: 'To develop diplomatic skills, global awareness, and leadership through Model UN simulations.',
    memberCount: 91,
    founded: 2015,
    contactEmail: 'mun@guc.edu.eg',
    socialLinks: {
      instagram: 'https://instagram.com/gucmun',
      facebook: 'https://facebook.com/gucmun',
      linkedin: 'https://linkedin.com/company/gucmun',
    },
    tags: ['MUN', 'Diplomacy', 'Global Affairs', 'Public Speaking', 'Academic'],
    isRecruiting: true,
    recruitmentDeadline: '2026-05-27',
    spotsLeft: 7,
    committees: [
      { id: 'cm33', name: 'Training Committee', description: 'Train new delegates for MUN conferences.', spotsAvailable: 4 },
      { id: 'cm34', name: 'Conference Team', description: 'Represent GUC at national and international MUNs.', spotsAvailable: 3 },
    ],
    events: [
      { id: 'e18', clubId: 'c16', title: 'GUCMUN Conference 2026', date: '2026-06-25', time: '9:00 AM', location: 'GUC Main Hall', description: 'Annual MUN conference hosted by GUC.', type: 'Competition' },
    ],
    members: [
      { id: 'm32', name: 'Dana Ibrahim', role: 'Secretary General', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dana' },
      { id: 'm33', name: 'Mustafa Helmy', role: 'Best Delegate', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mustafa', isMonthStar: true, quote: 'Diplomacy is the art of letting someone else have your way.' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Mustafa Helmy', role: 'Best Delegate', quote: 'Diplomacy is the art of letting someone else have your way.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mustafa' },
    },
    whoShouldJoin: 'Students interested in global politics, international relations, or anyone who wants to sharpen their diplomatic and debate skills.',
  },
  {
    id: 'c17',
    name: 'GUC Marketing Club',
    slug: 'marketing-club',
    category: 'Business',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=marketing&backgroundColor=8B3A1A',
    coverImage: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&q=80',
    description: 'Where brands are born — the GUC Marketing Club teaches students real-world marketing through campaigns, case studies, and industry mentors.',
    mission: 'To build the next generation of creative marketers, brand strategists, and digital growth experts.',
    memberCount: 107,
    founded: 2017,
    contactEmail: 'marketing@guc.edu.eg',
    socialLinks: {
      instagram: 'https://instagram.com/gucmarketing',
      facebook: 'https://facebook.com/gucmarketing',
      linkedin: 'https://linkedin.com/company/gucmarketing',
    },
    tags: ['Marketing', 'Branding', 'Digital', 'Social Media', 'Business'],
    isRecruiting: true,
    recruitmentDeadline: '2026-06-03',
    spotsLeft: 11,
    committees: [
      { id: 'cm35', name: 'Digital Marketing', description: 'Run real digital campaigns and ad experiments.', spotsAvailable: 6 },
      { id: 'cm36', name: 'Brand Strategy', description: 'Work on brand positioning and identity projects.', spotsAvailable: 5 },
    ],
    events: [
      { id: 'e19', clubId: 'c17', title: 'Brand Battle Competition', date: '2026-05-23', time: '10:00 AM', location: 'Business School, H9', description: 'Teams compete to rebrand a real company.', type: 'Competition' },
    ],
    members: [
      { id: 'm34', name: 'Alia Magdy', role: 'President', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alia' },
      { id: 'm35', name: 'Sameh Rifaat', role: 'Digital Lead', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sameh', isMonthStar: true, quote: 'Good marketing makes the company look smart.' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Sameh Rifaat', role: 'Digital Lead', quote: 'Good marketing makes the company look smart.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sameh' },
    },
    whoShouldJoin: 'Students interested in branding, digital marketing, social media strategy, or consumer psychology.',
  },
  {
    id: 'c18',
    name: 'GUC Volleyball Team',
    slug: 'volleyball-team',
    category: 'Sports',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=volleyball&backgroundColor=E07B39',
    coverImage: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80',
    description: 'Spiking to victory — the GUC Volleyball Team competes in the Egyptian University Volleyball League and welcomes passionate players.',
    mission: 'To build a competitive volleyball program while fostering sportsmanship and teamwork.',
    memberCount: 28,
    founded: 2016,
    contactEmail: 'volleyball@guc.edu.eg',
    socialLinks: {
      instagram: 'https://instagram.com/gucvolleyball',
      facebook: 'https://facebook.com/gucvolleyball',
    },
    tags: ['Volleyball', 'Sports', 'Competition', 'Team', 'Fitness'],
    isRecruiting: false,
    committees: [
      { id: 'cm37', name: "Men's Team", description: 'Varsity men\'s volleyball team.', spotsAvailable: 0 },
      { id: 'cm38', name: "Women's Team", description: 'Varsity women\'s volleyball team.', spotsAvailable: 0 },
    ],
    events: [
      { id: 'e20', clubId: 'c18', title: 'Volleyball League Finals', date: '2026-06-22', time: '3:00 PM', location: 'Sports Complex', description: 'University volleyball league championship.', type: 'Competition' },
    ],
    members: [
      { id: 'm36', name: 'Nadia Farhat', role: 'Team Captain', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nadia' },
      { id: 'm37', name: 'Samy Ezz', role: 'Setter', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=samy', isMonthStar: true, quote: 'A great team makes the impossible possible.' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Samy Ezz', role: 'Setter', quote: 'A great team makes the impossible possible.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=samy' },
    },
    whoShouldJoin: 'Experienced volleyball players ready to compete at a high level and commit to regular training.',
  },
  {
    id: 'c19',
    name: 'Athar GUC',
    slug: 'athar-guc',
    category: 'Arts',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=athar&backgroundColor=E07B39',
    coverImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    description: 'Where Arabic heritage meets modern expression — Athar celebrates our cultural roots through calligraphy, traditional arts, storytelling, and cultural exhibitions.',
    mission: 'To preserve and promote Arab and Egyptian heritage among GUC students through creative events and artistic expression.',
    memberCount: 78,
    founded: 2018,
    contactEmail: 'athar@guc.edu.eg',
    socialLinks: { instagram: 'https://instagram.com/atharguc', facebook: 'https://facebook.com/atharguc' },
    tags: ['Culture', 'Arabic', 'Heritage', 'Arts', 'Calligraphy'],
    isRecruiting: true,
    recruitmentDeadline: '2026-06-10',
    spotsLeft: 15,
    committees: [
      { id: 'cm39', name: 'Calligraphy & Visual Arts', description: 'Arabic calligraphy workshops and exhibitions.', spotsAvailable: 8 },
      { id: 'cm40', name: 'Cultural Events', description: 'Organize heritage days and storytelling nights.', spotsAvailable: 7 },
    ],
    events: [
      { id: 'e21', clubId: 'c19', title: 'Arabic Heritage Night', date: '2026-06-07', time: '6:00 PM', location: 'GUC Gallery', description: 'An evening celebrating Arab culture through art, music, and storytelling.', type: 'Social' },
    ],
    members: [
      { id: 'm38', name: 'Fatma El-Zahraa', role: 'President', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fatma' },
      { id: 'm39', name: 'Amr Khalaf', role: 'Head of Calligraphy', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amrk', isMonthStar: true, quote: 'Art is the language of the soul.' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Amr Khalaf', role: 'Head of Calligraphy', quote: 'Art is the language of the soul.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amrk' },
    },
    whoShouldJoin: 'Students who cherish Arab culture and want to keep its spirit alive on campus through art and events.',
  },
  {
    id: 'c20',
    name: 'عشانك يا بلدي GUC',
    slug: 'palestine-guc',
    category: 'Community',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=palestine&backgroundColor=006633',
    coverImage: 'https://images.unsplash.com/photo-1635274605638-d44babc08a4f?w=800&q=80',
    description: 'A voice for solidarity — عشانك يا بلدي unites the GUC community in support of Palestine through cultural awareness, educational panels, and solidarity campaigns.',
    mission: 'To raise awareness and foster solidarity with Palestine through education, culture, and community action.',
    memberCount: 112,
    founded: 2021,
    contactEmail: 'palestineguc@guc.edu.eg',
    socialLinks: { instagram: 'https://instagram.com/3ashankguc', facebook: 'https://facebook.com/3ashankguc' },
    tags: ['Solidarity', 'Palestine', 'Community', 'Awareness', 'Culture'],
    isRecruiting: true,
    recruitmentDeadline: '2026-06-15',
    spotsLeft: 20,
    committees: [
      { id: 'cm41', name: 'Awareness & Media', description: 'Create content and campaigns about Palestinian culture.', spotsAvailable: 10 },
      { id: 'cm42', name: 'Events', description: 'Organize solidarity events and cultural exhibitions.', spotsAvailable: 10 },
    ],
    events: [
      { id: 'e22', clubId: 'c20', title: 'Palestine Cultural Day', date: '2026-06-11', time: '10:00 AM', location: 'GUC Main Hall', description: 'A day of Palestinian cultural heritage, food, and solidarity.', type: 'Social' },
    ],
    members: [
      { id: 'm40', name: 'Laila Barakat', role: 'President', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=laila2' },
      { id: 'm41', name: 'Younes Nassar', role: 'Campaigns Lead', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=younes', isMonthStar: true, quote: 'From the river to the sea.' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Younes Nassar', role: 'Campaigns Lead', quote: 'Awareness is the first act of change.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=younes' },
    },
    whoShouldJoin: 'Any student who believes in solidarity and wants to contribute to Palestinian cultural awareness and community support.',
  },
  {
    id: 'c21',
    name: 'CURA GUC',
    slug: 'cura-guc',
    category: 'Academic',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=cura&backgroundColor=3B5FA0',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    description: 'Bridging science and humanity — CURA is GUC\'s clinical and research club, hosting anatomy workshops, hospital visits, and healthcare seminars for aspiring medical professionals.',
    mission: 'To prepare GUC students for careers in healthcare through hands-on learning, clinical exposure, and medical research.',
    memberCount: 95,
    founded: 2019,
    contactEmail: 'cura@guc.edu.eg',
    socialLinks: { instagram: 'https://instagram.com/curaguc', facebook: 'https://facebook.com/curaguc' },
    tags: ['Medical', 'Healthcare', 'Research', 'Clinical', 'Science'],
    isRecruiting: true,
    recruitmentDeadline: '2026-06-05',
    spotsLeft: 12,
    committees: [
      { id: 'cm43', name: 'Clinical Training', description: 'Organize hospital visits and hands-on clinical sessions.', spotsAvailable: 6 },
      { id: 'cm44', name: 'Research Team', description: 'Lead medical research projects and academic publications.', spotsAvailable: 6 },
    ],
    events: [
      { id: 'e23', clubId: 'c21', title: 'Anatomy & Clinical Skills Workshop', date: '2026-05-30', time: '11:00 AM', location: 'Science Labs, B3', description: 'Hands-on anatomy and first aid skills training.', type: 'Workshop' },
    ],
    members: [
      { id: 'm42', name: 'Nada Farid', role: 'President', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nada2' },
      { id: 'm43', name: 'Kareem Sharaf', role: 'Research Lead', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kareem', isMonthStar: true, quote: 'Heal with knowledge, serve with compassion.' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Kareem Sharaf', role: 'Research Lead', quote: 'Heal with knowledge, serve with compassion.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kareem' },
    },
    whoShouldJoin: 'Students in medicine, pharmacy, or health sciences who want clinical experience and research opportunities beyond the classroom.',
  },
  {
    id: 'c22',
    name: 'IEEE GUC Student Branch',
    slug: 'ieee-guc',
    category: 'Technology',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=ieee&backgroundColor=00629B',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    description: 'The world\'s largest engineering society, right at GUC — IEEE connects engineers, runs technical workshops, and opens doors to global opportunities in technology.',
    mission: 'To advance technology for the benefit of humanity by connecting GUC engineers with industry, research, and the global IEEE network.',
    memberCount: 163,
    founded: 2013,
    contactEmail: 'ieee@guc.edu.eg',
    socialLinks: {
      instagram: 'https://instagram.com/ieeeguc',
      facebook: 'https://facebook.com/ieeeguc',
      linkedin: 'https://linkedin.com/company/ieee-guc',
      website: 'https://ieeeguc.com',
    },
    tags: ['Engineering', 'Technology', 'IEEE', 'Electronics', 'AI'],
    isRecruiting: true,
    recruitmentDeadline: '2026-06-01',
    spotsLeft: 18,
    committees: [
      { id: 'cm45', name: 'Technical Committee', description: 'Workshops on AI, embedded systems, and software engineering.', spotsAvailable: 8 },
      { id: 'cm46', name: 'Professional Development', description: 'Connect members with internships and IEEE global events.', spotsAvailable: 10 },
    ],
    events: [
      { id: 'e24', clubId: 'c22', title: 'IEEE Tech Summit 2026', date: '2026-06-14', time: '9:00 AM', location: 'Engineering Building', description: 'Annual tech summit featuring industry talks, hackathon, and workshops.', type: 'Workshop' },
    ],
    members: [
      { id: 'm44', name: 'Ibrahim Samir', role: 'Chair', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ibrahim' },
      { id: 'm45', name: 'Sara Zaki', role: 'Technical Lead', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=saraz', isMonthStar: true, quote: 'Engineer the future you want to live in.' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Sara Zaki', role: 'Technical Lead', quote: 'Engineer the future you want to live in.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=saraz' },
    },
    whoShouldJoin: 'Engineering and CS students who want to build real projects, grow professionally, and tap into the global IEEE network.',
  },
  {
    id: 'c23',
    name: 'The Insider GUC',
    slug: 'insider-guc',
    category: 'Media',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=insider&backgroundColor=FF6B00',
    coverImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
    description: 'Your campus voice — The Insider is GUC\'s student-run magazine covering campus news, student stories, opinion pieces, and the real pulse of university life.',
    mission: 'To give every GUC student a platform to be heard through honest, engaging, and student-driven journalism.',
    memberCount: 82,
    founded: 2016,
    contactEmail: 'insider@guc.edu.eg',
    socialLinks: {
      instagram: 'https://instagram.com/theinsiderguc',
      facebook: 'https://facebook.com/theinsiderguc',
    },
    tags: ['Journalism', 'Magazine', 'Writing', 'Media', 'Campus News'],
    isRecruiting: true,
    recruitmentDeadline: '2026-06-08',
    spotsLeft: 10,
    committees: [
      { id: 'cm47', name: 'Editorial Team', description: 'Write, edit, and publish The Insider magazine.', spotsAvailable: 6 },
      { id: 'cm48', name: 'Design & Photography', description: 'Visual design and photography for magazine spreads.', spotsAvailable: 4 },
    ],
    events: [
      { id: 'e25', clubId: 'c23', title: 'The Insider Issue Launch Party', date: '2026-06-04', time: '5:00 PM', location: 'Student Lounge', description: 'Launch of the semester\'s flagship magazine issue.', type: 'Social' },
    ],
    members: [
      { id: 'm46', name: 'Mariam Fouad', role: 'Editor-in-Chief', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mariam' },
      { id: 'm47', name: 'Ali Hassan', role: 'Lead Writer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aliH', isMonthStar: true, quote: 'The pen is mightier than the algorithm.' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Ali Hassan', role: 'Lead Writer', quote: 'The pen is mightier than the algorithm.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aliH' },
    },
    whoShouldJoin: 'Students who love writing, photography, graphic design, or storytelling and want their work seen by the whole campus.',
  },
  {
    id: 'c24',
    name: 'INSPIRE GUC',
    slug: 'inspire-guc',
    category: 'Academic',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=inspire&backgroundColor=2C2C2C',
    coverImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
    description: 'Reach higher — INSPIRE helps GUC students unlock their full potential through motivational talks, mentorship programs, and leadership development workshops.',
    mission: 'To inspire a generation of confident, purpose-driven GUC students through personal development and leadership excellence.',
    memberCount: 99,
    founded: 2017,
    contactEmail: 'inspire@guc.edu.eg',
    socialLinks: { instagram: 'https://instagram.com/inspireguc', facebook: 'https://facebook.com/inspireguc' },
    tags: ['Leadership', 'Personal Development', 'Motivation', 'Mentorship', 'Growth'],
    isRecruiting: true,
    recruitmentDeadline: '2026-06-12',
    spotsLeft: 14,
    committees: [
      { id: 'cm49', name: 'Speakers & Events', description: 'Curate and organize inspirational talks and panels.', spotsAvailable: 7 },
      { id: 'cm50', name: 'Mentorship Program', description: 'Pair students with senior mentors for personal growth.', spotsAvailable: 7 },
    ],
    events: [
      { id: 'e26', clubId: 'c24', title: 'INSPIRE Leadership Summit', date: '2026-06-09', time: '10:00 AM', location: 'Main Auditorium', description: 'A full-day summit featuring talks, workshops, and networking.', type: 'Talk' },
    ],
    members: [
      { id: 'm48', name: 'Hana Mostafa', role: 'President', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hana2' },
      { id: 'm49', name: 'Tarek Medhat', role: 'Head of Mentorship', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tarekM', isMonthStar: true, quote: 'Every great leader was first a great student.' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Tarek Medhat', role: 'Head of Mentorship', quote: 'Every great leader was first a great student.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tarekM' },
    },
    whoShouldJoin: 'Any student who wants to grow as a leader, build confidence, and be part of a community that pushes each other forward.',
  },
  {
    id: 'c25',
    name: 'TEDxGUC',
    slug: 'tedx-guc',
    category: 'Academic',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=tedx&backgroundColor=E62B1E',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    description: 'Ideas worth spreading, right here at GUC — TEDxGUC hosts independently organized TED-style talks that challenge minds, ignite curiosity, and change perspectives.',
    mission: 'To create a platform where the big ideas shaping our world are shared by and for the GUC community.',
    memberCount: 74,
    founded: 2015,
    contactEmail: 'tedx@guc.edu.eg',
    socialLinks: {
      instagram: 'https://instagram.com/tedxguc',
      facebook: 'https://facebook.com/tedxguc',
      website: 'https://tedxguc.com',
    },
    tags: ['TED', 'Ideas', 'Innovation', 'Public Speaking', 'Inspiration'],
    isRecruiting: false,
    committees: [
      { id: 'cm51', name: 'Curation Team', description: 'Select and coach TEDx speakers.', spotsAvailable: 0 },
      { id: 'cm52', name: 'Production Team', description: 'Manage event production, AV, and stage design.', spotsAvailable: 0 },
    ],
    events: [
      { id: 'e27', clubId: 'c25', title: 'TEDxGUC 2026 Main Event', date: '2026-06-20', time: '3:00 PM', location: 'GUC Main Auditorium', description: 'Annual flagship TEDx event with 8 speaker talks across diverse themes.', type: 'Talk' },
    ],
    members: [
      { id: 'm50', name: 'Dina Kamal', role: 'Licensee & Organizer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dinak' },
      { id: 'm51', name: 'Youssef Gouda', role: 'Speaker Coach', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=youssefG', isMonthStar: true, quote: 'One idea, delivered well, can change a room.' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Youssef Gouda', role: 'Speaker Coach', quote: 'One idea, delivered well, can change a room.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=youssefG' },
    },
    whoShouldJoin: 'Students with a big idea to share, or those passionate about curating, producing, and bringing world-class talks to campus.',
  },
  {
    id: 'c26',
    name: 'REVIVE GUC',
    slug: 'revive-guc',
    category: 'Community',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=revive&backgroundColor=2E7D32',
    coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    description: 'Reviving the planet, one action at a time — REVIVE leads GUC\'s wellness and sustainability movement through community projects, mental health initiatives, and green living.',
    mission: 'To build a healthier, more conscious GUC community by merging personal wellness with environmental responsibility.',
    memberCount: 88,
    founded: 2020,
    contactEmail: 'revive@guc.edu.eg',
    socialLinks: { instagram: 'https://instagram.com/reviveguc', facebook: 'https://facebook.com/reviveguc' },
    tags: ['Wellness', 'Sustainability', 'Mental Health', 'Community', 'Green'],
    isRecruiting: true,
    recruitmentDeadline: '2026-06-14',
    spotsLeft: 16,
    committees: [
      { id: 'cm53', name: 'Wellness & Mental Health', description: 'Workshops and campaigns around student wellbeing.', spotsAvailable: 8 },
      { id: 'cm54', name: 'Green Initiatives', description: 'Lead campus sustainability and zero-waste projects.', spotsAvailable: 8 },
    ],
    events: [
      { id: 'e28', clubId: 'c26', title: 'REVIVE Wellness Fair', date: '2026-06-06', time: '10:00 AM', location: 'GUC Courtyard', description: 'A fair featuring wellness activities, mental health resources, and eco-living tips.', type: 'Social' },
    ],
    members: [
      { id: 'm52', name: 'Rana Hazem', role: 'President', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rana2' },
      { id: 'm53', name: 'Sana Khalil', role: 'Wellness Lead', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sana', isMonthStar: true, quote: 'A healthy mind lives in a healthy world.' },
    ],
    spotlightContent: {
      memberOfMonth: { name: 'Sana Khalil', role: 'Wellness Lead', quote: 'A healthy mind lives in a healthy world.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sana' },
    },
    whoShouldJoin: 'Students who care about their mental health, physical wellbeing, and the environment — and want to inspire others to do the same.',
  },
]

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
