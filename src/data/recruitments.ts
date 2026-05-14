import type { Recruitment } from './types'
import { clubs } from './clubs'

export const recruitments: Recruitment[] = clubs
  .filter((c) => c.isRecruiting)
  .map((c) => ({
    id: `r-${c.id}`,
    clubId: c.id,
    clubName: c.name,
    clubLogo: c.logo,
    category: c.category,
    deadline: c.recruitmentDeadline!,
    spotsLeft: c.spotsLeft!,
    totalSpots: c.committees.reduce((acc, cm) => acc + (cm.spotsAvailable || 0), 0),
    committees: c.committees,
    urgencyLabel:
      c.spotsLeft! <= 3
        ? `Only ${c.spotsLeft} spots left!`
        : c.spotsLeft! <= 8
        ? `${c.spotsLeft} spots remaining`
        : undefined,
  }))
