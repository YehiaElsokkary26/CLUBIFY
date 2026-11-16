import type { ClubEvent } from './types'
import { getEvents } from '../lib/db'

export const getUpcomingEvents = (limit?: number): ClubEvent[] => {
  const now = new Date()
  const upcoming = getEvents()
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  return limit ? upcoming.slice(0, limit) : upcoming
}

export const getEventsByClub = (clubId: string): ClubEvent[] =>
  getEvents(clubId)
