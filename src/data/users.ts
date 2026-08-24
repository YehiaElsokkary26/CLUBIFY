import type { User } from './types'

export const studentUser: User = {
  id: 'u1',
  name: 'Youssef Mahmoud',
  email: 'youssef.mahmoud@guc.edu.eg',
  gucId: '49-12345',
  faculty: 'Media Engineering & Technology',
  year: 3,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=youssef&backgroundColor=b6e3f4',
  bio: 'CS student passionate about tech, media, and making a difference.',
  role: 'student',
  joinedClubs: ['guc-ieee', 'guc-mun'],
  attendedSessions: 14,
  totalSessions: 18,
  warnings: [],
  profileCompletion: 75,
}

export const adminUser: User = {
  id: 'u2',
  name: 'Sara Ahmed',
  email: 'sara.ahmed@guc.edu.eg',
  gucId: '49-67890',
  faculty: 'Management Technology',
  year: 4,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sara&backgroundColor=ffdfbf',
  bio: 'Club officer at GUC INSIDER. Passionate about student journalism and campus storytelling.',
  role: 'admin',
  joinedClubs: ['guc-insider'],
  attendedSessions: 28,
  totalSessions: 30,
  warnings: [],
  profileCompletion: 95,
}

export const guestUser: User = {
  id: 'u0',
  name: 'Guest',
  email: '',
  gucId: '',
  faculty: '',
  year: 1,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest',
  bio: '',
  role: 'student',
  joinedClubs: [],
  attendedSessions: 0,
  totalSessions: 0,
  warnings: [],
  profileCompletion: 10,
}
