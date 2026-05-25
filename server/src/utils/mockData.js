const mockUser = {
  id: 'u-123e4567-e89b-12d3-a456-426614174000',
  name: 'Yehia Elsokkary',
  email: 'yehia.elsokkary@student.guc.edu.eg',
  studentId: '49-12345',
  faculty: 'Media Engineering and Technology',
  year: 3,
  role: 'student',
  avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yehia',
  bio: 'Passionate about tech and community building.',
  createdAt: '2024-09-01T08:00:00.000Z',
}

const mockClub = {
  id: 'c-1a2b3c4d-5e6f-7890-abcd-ef1234567890',
  slug: 'guc-tech-club',
  name: 'GUC Tech Club',
  description: 'The hub for all tech enthusiasts at GUC.',
  category: 'Technology',
  coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
  logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=techclub',
  memberCount: 142,
  isRecruiting: true,
  socialLinks: {
    instagram: 'https://instagram.com/guctechclub',
    facebook: 'https://facebook.com/guctechclub',
    linkedin: 'https://linkedin.com/company/guctechclub',
  },
  committees: [
    { id: 'com-1', name: 'Web Development', head: 'Sara Ahmed' },
    { id: 'com-2', name: 'AI & Data', head: 'Omar Hassan' },
  ],
  events: [
    {
      id: 'ev-1',
      title: 'Hackathon 2026',
      date: '2026-03-15',
      time: '10:00 AM',
      location: 'H5 Hall',
      type: 'Competition',
    },
  ],
  spotlightContent: {
    clubOfWeek: {
      title: 'Club of the Week',
      subtitle: 'GUC Tech Club',
      description: 'Building the future, one line at a time.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    },
    memberOfMonth: {
      name: 'Sara Ahmed',
      role: 'Web Dev Lead',
      quote: 'Code is poetry.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sara',
    },
  },
  createdAt: '2023-09-01T00:00:00.000Z',
}

const mockVolunteerActivity = {
  id: 'va-9f8e7d6c-5b4a-3210-fedc-ba9876543210',
  title: 'Graduation Ceremony Ushering',
  description: 'Help guide graduating students and families during the 2026 graduation ceremony.',
  date: '2026-06-20',
  location: 'Main Campus Hall',
  spotsTotal: 30,
  spotsFilled: 18,
  isOpen: true,
  createdAt: '2026-04-01T00:00:00.000Z',
}

const mockApplication = {
  id: 'app-aabbccdd-eeff-0011-2233-445566778899',
  userId: 'u-123e4567-e89b-12d3-a456-426614174000',
  clubId: 'c-1a2b3c4d-5e6f-7890-abcd-ef1234567890',
  committeeId: 'com-1',
  interviewSlotId: 'slot-1',
  motivationNote: 'I want to contribute to the web development committee.',
  status: 'pending',
  type: 'club',
  createdAt: '2026-01-15T10:30:00.000Z',
}

const mockNotification = {
  id: 'notif-11223344-5566-7788-99aa-bbccddeeff00',
  userId: 'u-123e4567-e89b-12d3-a456-426614174000',
  type: 'application_update',
  title: 'Application Update',
  message: 'Your application to GUC Tech Club has moved to the interview stage.',
  isRead: false,
  createdAt: '2026-01-20T09:00:00.000Z',
}

const mockSlot = {
  id: 'slot-deadbeef-cafe-babe-f00d-123456789abc',
  clubId: 'c-1a2b3c4d-5e6f-7890-abcd-ef1234567890',
  date: '2026-02-05',
  time: '11:00 AM',
  location: 'Room C6.101',
  capacity: 4,
  booked: 1,
  isAvailable: true,
}

const mockMember = {
  id: 'mem-aaaabbbb-cccc-dddd-eeee-ffffaaaabbbb',
  userId: 'u-123e4567-e89b-12d3-a456-426614174000',
  clubId: 'c-1a2b3c4d-5e6f-7890-abcd-ef1234567890',
  role: 'Web Dev Lead',
  committee: 'Web Development',
  joinedAt: '2024-10-01T00:00:00.000Z',
}

const mockAnnouncement = {
  id: 'ann-12345678-abcd-efab-cdef-123456789abc',
  clubId: 'c-1a2b3c4d-5e6f-7890-abcd-ef1234567890',
  title: 'Spring Recruitment Open!',
  body: 'We are now accepting applications for our Spring 2026 recruitment cycle.',
  pinned: true,
  createdAt: '2026-01-10T08:00:00.000Z',
}

const mockWarning = {
  id: 'warn-deadcafe-1234-5678-abcd-efabcdef1234',
  userId: 'u-123e4567-e89b-12d3-a456-426614174000',
  issuedBy: 'club_admin',
  reason: 'No-show at scheduled interview without prior notice.',
  severity: 'medium',
  createdAt: '2026-02-01T12:00:00.000Z',
}

const mockPreferences = {
  userId: 'u-123e4567-e89b-12d3-a456-426614174000',
  notifications_enabled: true,
  language: 'en',
  emailDigest: true,
  pushEnabled: false,
}

const mockStats = {
  totalUsers: 1240,
  totalClubs: 18,
  activeRecruitments: 5,
  pendingApplications: 48,
  monthlyActivity: [
    { month: 'Jan', value: 22 },
    { month: 'Feb', value: 38 },
    { month: 'Mar', value: 55 },
    { month: 'Apr', value: 44 },
    { month: 'May', value: 72 },
    { month: 'Jun', value: 60 },
  ],
  funnel: {
    applied: 48,
    interviewed: 32,
    accepted: 18,
  },
}

module.exports = {
  mockUser,
  mockClub,
  mockVolunteerActivity,
  mockApplication,
  mockNotification,
  mockSlot,
  mockMember,
  mockAnnouncement,
  mockWarning,
  mockPreferences,
  mockStats,
}
