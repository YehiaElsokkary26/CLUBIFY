import { useState, useMemo } from 'react'
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

const CATEGORIES: (ClubCategory | 'All')[] = [
  'All', 'Technology', 'Academic', 'Media', 'Arts', 'Sports', 'Community',
]

export function Recruit() {
  const { isDark } = useTheme()
  const { isLoading } = useRecruitingClubs()
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortOption>('Deadline')
  const [categoryFilter, setCategoryFilter] = useState<ClubCategory | 'All'>('All')

  const today = useMemo(() => new Date(), [])

  const filtered = useMemo(() => {
    let list = recruitments.filter((r) =>
      search === '' ||
      r.clubName.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase())
    )

    if (sort === 'Deadline') {
      list = list.filter((r) => new Date(r.deadline) >= today)
      list = [...list].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    } else if (sort === 'Spots') {
      list = [...list].sort((a, b) => a.spotsLeft - b.spotsLeft)
    } else {
      if (categoryFilter !== 'All') {
        list = list.filter((r) => r.category === categoryFilter)
      }
      list = [...list].sort((a, b) => a.clubName.localeCompare(b.clubName))
    }

    return list
  }, [search, sort, categoryFilter, today])

  return (
    <div className="phone-scroll h-[844px] pb-24" style={{ background: isDark ? '#1C1C1E' : '#FAF8F5' }}>
      {/* Header */}
      <div className={cn('sticky top-0 z-20 pt-12 pb-3 px-5', isDark ? 'bg-[#1C1C1E]' : 'bg-[#FAF8F5]')}>
        <div className="flex items-center justify-between mb-1">
          <h1 className={cn('text-2xl font-black', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Open Recruitments</h1>
          <span className={cn('px-3 py-1 rounded-full text-xs font-bold', isDark ? 'bg-[#2C2C2E] text-gray-300' : 'bg-[#8B1A1A]/10 text-[#8B1A1A]')}>
            {filtered.length} open
          </span>
        </div>
        <p className={cn('text-xs mb-4', isDark ? 'text-gray-400' : 'text-gray-500')}>
          Apply now before spots fill up!
        </p>
        <SearchBar value={search} onChange={setSearch} placeholder="Search clubs..." className="mb-3" />

        {/* Sort pills */}
        <div className="flex gap-2 mb-2">
          <span className={cn('text-xs font-semibold self-center', isDark ? 'text-gray-400' : 'text-gray-500')}>Sort:</span>
          {(['Deadline', 'Spots', 'Category'] as SortOption[]).map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-semibold transition-all',
                sort === s ? 'bg-[#8B1A1A] text-white' : isDark ? 'bg-[#2C2C2E] text-gray-400' : 'bg-white text-gray-500 shadow-sm'
              )}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Category picker — only shown when sort = 'Category' */}
        {sort === 'Category' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
            style={{ scrollbarWidth: 'none' }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={cn(
                  'flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all',
                  categoryFilter === cat
                    ? 'bg-[#8B1A1A] text-white'
                    : isDark ? 'bg-[#2C2C2E] text-gray-400' : 'bg-white text-gray-500 shadow-sm'
                )}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      <div className="px-5 space-y-3 pt-2">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <RecruitmentCardSkeleton key={i} />)
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<Users size={28} className="text-gray-400" />}
            title={sort === 'Deadline' ? 'No active recruitments' : 'No clubs found'}
            description={
              sort === 'Deadline'
                ? 'All recruitment deadlines have passed. Check back next semester!'
                : sort === 'Category' && categoryFilter !== 'All'
                ? `No clubs in "${categoryFilter}" are currently recruiting.`
                : 'Check back soon — clubs open recruitment at the start of each semester.'
            }
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
