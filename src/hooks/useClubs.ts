import { useQuery } from '@tanstack/react-query'
import { getClubs, getClubBySlug } from '../lib/db'
import type { Club } from '../data/types'

export function useClubs() {
  return useQuery({
    queryKey: ['clubs'],
    queryFn: (): Club[] => getClubs(),
    staleTime: 0, // always fresh so admin changes reflect immediately
  })
}

export function useClub(slug: string) {
  return useQuery({
    queryKey: ['club', slug],
    queryFn: (): Club | undefined => getClubBySlug(slug) ?? getClubs().find((c) => c.id === slug),
    enabled: !!slug,
    staleTime: 0,
  })
}

export function useRecruitingClubs() {
  return useQuery({
    queryKey: ['clubs', 'recruiting'],
    queryFn: (): Club[] => getClubs().filter((c) => c.isRecruiting),
    staleTime: 0,
  })
}
