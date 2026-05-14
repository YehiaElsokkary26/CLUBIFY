import { useQuery } from '@tanstack/react-query'
import { clubs, getRecruitingClubs } from '../data/clubs'
import type { Club } from '../data/types'

const fakeDelay = (ms = 600) => new Promise((r) => setTimeout(r, ms))

export function useClubs() {
  return useQuery({
    queryKey: ['clubs'],
    queryFn: async (): Promise<Club[]> => {
      await fakeDelay()
      return clubs
    },
  })
}

export function useClub(slug: string) {
  return useQuery({
    queryKey: ['club', slug],
    queryFn: async (): Promise<Club | undefined> => {
      await fakeDelay(400)
      return clubs.find((c) => c.slug === slug)
    },
    enabled: !!slug,
  })
}

export function useRecruitingClubs() {
  return useQuery({
    queryKey: ['clubs', 'recruiting'],
    queryFn: async (): Promise<Club[]> => {
      await fakeDelay(500)
      return getRecruitingClubs()
    },
  })
}
