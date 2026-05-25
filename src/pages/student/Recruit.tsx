import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useRecruitingClubs } from '../../hooks/useClubs'
import { RecruitmentCard } from '../../components/cards/RecruitmentCard'
import { RecruitmentCardSkeleton } from '../../components/shared/LoadingSkeletons'
import { EmptyState } from '../../components/shared/EmptyState'
import { SearchBar } from '../../components/shared/SearchBar'
import { recruitments } from '../../data/recruitments'
import { cn } from '../../lib/utils'
import type { ClubCategory } from '../../data/types'

type SortOption = 'Deadline' | 'Spots' | 'Category'

export function Recruit() {
  const { isDark } = useTheme()
  const { isLoading } = useRecruitingClubs()
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortOption>('Deadline')

  const filtered = recruitments
    .filter((r) => search === '' || r.clubName.toLowerCase().includes(search.toLowerCase()) || r.category.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'Deadline') return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      if (sort === 'Spots') return a.spotsLeft - b.spotsLeft
      return a.category.localeCompare(b.category)
    })

  return (
    <div className="phone-scroll h-[844px] pb-24" style={{ background: isDark ? '#18181B' : '#F4F4F5' }}>
      {/* Header */}
      <div className={cn('sticky top-0 z-20 pt-12 pb-3 px-5', isDark ? 'bg-[#18181B]' : 'bg-[#F4F4F5]')}>
        <div className="flex items-center justify-between mb-1">
          <h1 className={cn('text-2xl font-black font-display tracking-wide', isDark ? 'text-white' : 'text-[#27272A]')}>Open Recruitments</h1>
          <span className={cn('px-3 py-1 rounded-full text-xs font-bold font-body', isDark ? 'bg-[#27272A] text-zinc-300' : 'bg-[#0891B2]/10 text-[#0891B2]')}>
            {filtered.length} open
          </span>
        </div>
        <p className={cn('text-xs mb-4 font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>
          Apply now before spots fill up!
        </p>
        <SearchBar value={search} onChange={setSearch} placeholder="Search clubs..." className="mb-3" />

        {/* Sort pills */}
        <div className="flex gap-2">
          <span className={cn('text-xs font-semibold font-body self-center', isDark ? 'text-zinc-400' : 'text-zinc-500')}>Sort:</span>
          {(['Deadline', 'Spots', 'Category'] as SortOption[]).map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-semibold font-body transition-all',
                sort === s ? 'bg-[#0891B2] text-white' : isDark ? 'bg-[#27272A] text-zinc-400' : 'bg-white text-zinc-500 shadow-sm'
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 space-y-3 pt-2">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <RecruitmentCardSkeleton key={i} />)
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<Users size={28} className="text-zinc-400" />}
            title="No open recruitments"
            description="Check back soon — clubs open recruitment at the start of each semester."
          />
        ) : (
          filtered.map((r, i) => (
            <RecruitmentCard key={r.id} recruitment={r} index={i} />
          ))
        )}
      </div>
    </div>
  )
}
