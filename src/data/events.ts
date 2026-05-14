import type { ClubEvent } from './types'
import { clubs } from './clubs'

export const allEvents: ClubEvent[] = clubs.flatMap((c) => c.events)

export const getUpcomingEvents = (limit?: number): ClubEvent[] => {
  const now = new Date()
  const upcoming = allEvents
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  return limit ? upcoming.slice(0, limit) : upcoming
}

export const getEventsByClub = (clubId: string): ClubEvent[] =>
  allEvents.filter((e) => e.clubId === clubId)
