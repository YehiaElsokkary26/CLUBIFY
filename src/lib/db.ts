/**
 * Clubify local database — wraps localStorage so every change is persisted.
 * Swap the read/write helpers to Supabase calls when the backend is ready.
 */

import type { Club, ClubEvent, Committee } from '../data/types'
import { clubs as SEED_CLUBS } from '../data/clubs'

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
  seeded:       'clubify_db_seeded_v8',
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
  { email: 'sara.ahmed@guc.edu.eg',       clubId: 'guc-insider'  },
]

const SEED_EVENTS: ClubEvent[] = SEED_CLUBS.flatMap((c) => c.events)

// ─── Initialization ────────────────────────────────────────────────────────────

export function initDB(): void {
  if (localStorage.getItem(K.seeded)) return

  // Wipe data keys only — preserve session, onboarded, terms, and user-written keys
  // so a seed-version bump never silently logs the user out.
  const DATA_KEYS = [K.clubs, K.events, K.slots, K.applications, K.admins]
  DATA_KEYS.forEach((k) => localStorage.removeItem(k))

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
