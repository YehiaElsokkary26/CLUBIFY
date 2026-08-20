import type { Announcement } from '../data/types'
import { announcementPool } from '../data/announcements'
import { clubs } from '../data/clubs'

// ─── Club image lookup ───────────────────────────────────────────────────────

/**
 * Maps each clubId to its permanent coverImage from clubs.ts.
 * The algorithm uses this to assign images to feed posts automatically,
 * so individual announcements never need hardcoded imageUrl fields.
 */
const clubCoverMap: Record<string, string> = Object.fromEntries(
  clubs.map((c) => [c.id, c.coverImage])
)

/**
 * Enriches an announcement with its club's coverImage.
 * The announcement's own imageUrl (if any) takes precedence,
 * otherwise the club cover is used — so images are always present.
 */
function withImage(a: Announcement): Announcement {
  return {
    ...a,
    imageUrl: a.imageUrl ?? clubCoverMap[a.clubId],
  }
}

// ─── Seed helpers ────────────────────────────────────────────────────────────

/** Returns the ISO 8601 week number for a given date (Monday = week start). */
function getISOWeek(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const day = d.getUTCDay() || 7           // Sun=7 in ISO
  d.setUTCDate(d.getUTCDate() + 4 - day)  // Shift to Thursday of same week
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7)
}

/**
 * Linear congruential generator (Knuth params).
 * Deterministic and fast — same seed always produces the same sequence.
 */
function seededRNG(seed: number): () => number {
  let s = seed | 0
  return () => {
    s = (Math.imul(1_664_525, s) + 1_013_904_223) | 0
    return (s >>> 0) / 4_294_967_296
  }
}

/** Fisher-Yates shuffle using a seeded RNG — non-mutating. */
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const rng = seededRNG(seed)
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Generates the weekly feed — deterministic per ISO week.
 *
 * Algorithm:
 *   1. Derive a seed from year × 100 + week number.
 *      → Same seed for every student in the same week.
 *      → Seed changes every Monday morning automatically.
 *   2. Fisher-Yates shuffle the full pool with that seed.
 *   3. Walk the shuffled list, enforce max 2 posts per club
 *      (so no single club dominates the 8-post window).
 *   4. Return the first `count` posts that pass the guard.
 *
 * With a 30-entry pool and max-2 guard, the set of 10 clubs cycles through
 * ~3–4 different posts per club before repeating the same post — roughly
 * 10–15 weeks of non-identical feeds without ever reusing the same post
 * in the same week.
 */
export function generateWeeklyFeed(count = 8): Announcement[] {
  const now = new Date()
  const seed = now.getFullYear() * 100 + getISOWeek(now)

  const shuffled = seededShuffle(announcementPool, seed)

  const clubCount: Record<string, number> = {}
  const result: Announcement[] = []

  for (const item of shuffled) {
    const seen = clubCount[item.clubId] ?? 0
    if (seen < 2) {
      result.push(withImage(item))
      clubCount[item.clubId] = seen + 1
    }
    if (result.length >= count) break
  }

  return result
}

/**
 * Returns all pool items matching the given club IDs.
 * Used for the "My Clubs" tab — shows every post from joined clubs,
 * not just this week's 8, so members never miss content.
 */
export function getClubFeed(clubIds: string[]): Announcement[] {
  if (!clubIds.length) return []
  const set = new Set(clubIds)
  return announcementPool.filter((a) => set.has(a.clubId)).map(withImage)
}
