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
  seeded:       'clubify_db_seeded_v4',
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
  { email: 'sara.ahmed@guc.edu.eg', clubId: 'guc-enactus' },
]

const SEED_CLUBS: Club[] = [
  {
    id: 'guc-enactus',
    name: 'GUC Enactus',
    slug: 'enactus',
    category: 'Business',
    logo: 'https://placehold.co/80x80/FDA014/FFFFFF?text=EN',
    coverImage: 'https://placehold.co/600x200/FDA014/FFFFFF?text=GUC+Enactus',
    description: 'Enactus GUC is a community of student, academic and business leaders committed to using the power of entrepreneurial action to create a better world.',
    mission: 'To use entrepreneurship to improve the quality of life for communities in need while developing students as leaders.',
    memberCount: 120,
    founded: 2010,
    contactEmail: 'enactus@guc.edu.eg',
    socialLinks: { instagram: 'https://instagram.com/gucenactus', facebook: 'https://facebook.com/GUCEnactus' },
    tags: ['Entrepreneurship', 'Social Impact', 'Leadership', 'Business'],
    isRecruiting: false,
    committees: [
      { id: 'enactus-marketing', name: 'Marketing & PR', description: 'Handles social media, branding, and public relations.', spotsAvailable: 5 },
      { id: 'enactus-projects', name: 'Projects', description: 'Designs and executes community-impact projects.', spotsAvailable: 8 },
      { id: 'enactus-media', name: 'Media & Design', description: 'Creates visual content and manages documentation.', spotsAvailable: 4 },
      { id: 'enactus-hr', name: 'Human Resources', description: 'Manages recruitment, onboarding, and member relations.', spotsAvailable: 3 },
    ],
    events: [],
    members: [],
    spotlightContent: {},
    whoShouldJoin: 'Students passionate about social entrepreneurship and community impact.',
  },
  {
    id: 'guc-rotaract',
    name: 'GUC Rotaract Club',
    slug: 'rotaract',
    category: 'Community',
    logo: 'https://placehold.co/80x80/6F2F33/FFFFFF?text=RC',
    coverImage: 'https://placehold.co/600x200/6F2F33/FFFFFF?text=GUC+Rotaract',
    description: 'Rotaract GUC connects young leaders dedicated to community service, professional development, and international understanding.',
    mission: 'To provide an opportunity for young men and women to enhance the knowledge and skills that will assist them in personal development.',
    memberCount: 85,
    founded: 2008,
    contactEmail: 'rotaract@guc.edu.eg',
    socialLinks: { instagram: 'https://instagram.com/gucrotaract' },
    tags: ['Community Service', 'Leadership', 'Volunteering', 'Networking'],
    isRecruiting: false,
    committees: [
      { id: 'rotaract-service', name: 'Service Projects', description: 'Plans and executes community service initiatives.', spotsAvailable: 10 },
      { id: 'rotaract-events', name: 'Events & PR', description: 'Organizes events and manages media coverage.', spotsAvailable: 6 },
      { id: 'rotaract-fundraising', name: 'Fundraising', description: 'Oversees fundraising campaigns and sponsorships.', spotsAvailable: 5 },
    ],
    events: [],
    members: [],
    spotlightContent: {},
    whoShouldJoin: 'Students who want to make a difference in their community.',
  },
  {
    id: 'guc-ieee',
    name: 'GUC IEEE Student Branch',
    slug: 'ieee',
    category: 'Technology',
    logo: 'https://placehold.co/80x80/00629B/FFFFFF?text=IEEE',
    coverImage: 'https://placehold.co/600x200/00629B/FFFFFF?text=GUC+IEEE',
    description: 'The GUC IEEE Student Branch is dedicated to advancing technology for the benefit of humanity through workshops, competitions, and networking events.',
    mission: 'Foster technical excellence and professional growth among engineering and technology students.',
    memberCount: 200,
    founded: 2006,
    contactEmail: 'ieee@guc.edu.eg',
    socialLinks: { instagram: 'https://instagram.com/gucieee', linkedin: 'https://linkedin.com/company/gucieee' },
    tags: ['Engineering', 'Technology', 'Research', 'STEM'],
    isRecruiting: false,
    committees: [
      { id: 'ieee-technical', name: 'Technical', description: 'Workshops, seminars, and technical content.', spotsAvailable: 12 },
      { id: 'ieee-media', name: 'Media', description: 'Photography, design, and social media.', spotsAvailable: 6 },
      { id: 'ieee-events', name: 'Events & Logistics', description: 'Coordinates events and manages logistics.', spotsAvailable: 8 },
      { id: 'ieee-hr', name: 'Human Resources', description: 'Recruitment and member engagement.', spotsAvailable: 5 },
    ],
    events: [],
    members: [],
    spotlightContent: {},
    whoShouldJoin: 'Engineering and CS students interested in technology and professional development.',
  },
  {
    id: 'guc-mun',
    name: 'GUC MUN',
    slug: 'mun',
    category: 'Academic',
    logo: 'https://placehold.co/80x80/272831/FFFFFF?text=MUN',
    coverImage: 'https://placehold.co/600x200/272831/FFFFFF?text=GUC+MUN',
    description: 'GUC Model United Nations simulates UN committees, developing students\' research, public speaking, and negotiation skills.',
    mission: 'Cultivate global citizenship and diplomatic skills through Model United Nations simulations.',
    memberCount: 180,
    founded: 2007,
    contactEmail: 'mun@guc.edu.eg',
    socialLinks: { instagram: 'https://instagram.com/gucmun', facebook: 'https://facebook.com/GUCMUN' },
    tags: ['Debate', 'Diplomacy', 'Public Speaking', 'Research', 'Leadership'],
    isRecruiting: false,
    committees: [
      { id: 'mun-delegates', name: 'Delegate Affairs', description: 'Trains and manages conference delegates.', spotsAvailable: 20 },
      { id: 'mun-secretariat', name: 'Secretariat', description: 'Organizes conferences and coordinates committees.', spotsAvailable: 8 },
      { id: 'mun-media', name: 'Media & Press', description: 'Covers conferences and manages publications.', spotsAvailable: 6 },
      { id: 'mun-logistics', name: 'Logistics', description: 'Venue, catering, and event coordination.', spotsAvailable: 5 },
    ],
    events: [],
    members: [],
    spotlightContent: {},
    whoShouldJoin: 'Students interested in politics, debate, and international relations.',
  },
]

const SEED_EVENTS: ClubEvent[] = [
  {
    id: 'ev-enactus-1',
    clubId: 'guc-enactus',
    title: 'Enactus Info Session',
    date: '2026-09-05',
    time: '3:00 PM',
    location: 'Main Hall C5.101',
    description: 'Learn about Enactus GUC and what we do. Open to all students.',
    type: 'Talk',
  },
  {
    id: 'ev-ieee-1',
    clubId: 'guc-ieee',
    title: 'PCB Design Workshop',
    date: '2026-09-10',
    time: '2:00 PM',
    location: 'Engineering Lab B1.204',
    description: 'Hands-on workshop covering PCB design using KiCad.',
    type: 'Workshop',
  },
  {
    id: 'ev-mun-1',
    clubId: 'guc-mun',
    title: 'GUCMUN 2026 — Opening Ceremony',
    date: '2026-10-01',
    time: '10:00 AM',
    location: 'Main Auditorium',
    description: 'Annual GUC Model United Nations conference opening ceremony.',
    type: 'Social',
  },
]

// ─── Initialization ────────────────────────────────────────────────────────────

export function initDB(): void {
  if (localStorage.getItem(K.seeded)) return

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
