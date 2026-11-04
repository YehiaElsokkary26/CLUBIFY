import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, Search, ArrowUpDown } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useClubs } from '../../hooks/useClubs'
import { SearchBar } from '../../components/shared/SearchBar'
import { ClubCardSkeleton } from '../../components/shared/LoadingSkeletons'
import { EmptyState } from '../../components/shared/EmptyState'
import { ClubCard } from '../../components/cards/ClubCard'
import { cn } from '../../lib/utils'
import type { ClubCategory } from '../../data/types'

type SortOption = 'A–Z' | 'Members' | 'Recruiting'

const CATEGORIES: (ClubCategory | 'All')[] = [
  'All', 'Technology', 'Academic', 'Media', 'Arts', 'Sports', 'Community',
]

export function Clubs() {
  const { isDark } = useTheme()
  const { data: clubs, isLoading } = useClubs()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<ClubCategory | 'All'>('All')
  const [sort, setSort] = useState<SortOption>('A–Z')
  const [favs, setFavs] = useLocalStorage<string[]>('clubify_favorites', [])

  const filtered = useMemo(() => {
    if (!clubs) return []
    return clubs
      .filter((c) => {
        const matchSearch = search === '' ||
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
        const matchCat = category === 'All' || c.category === category
        return matchSearch && matchCat
      })
      .sort((a, b) => {
        if (sort === 'A–Z') return a.name.localeCompare(b.name)
        if (sort === 'Members') return b.memberCount - a.memberCount
        if (a.isRecruiting !== b.isRecruiting) return a.isRecruiting ? -1 : 1
        return a.name.localeCompare(b.name)
      })
  }, [clubs, search, category, sort])

  const toggleFav = (id: string) => {
    setFavs((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id])
  }

  return (
    <div className="phone-scroll h-[844px] pb-24" style={{ background: isDark ? '#0D1A12' : '#F4FBF6' }}>
      {/* Header */}
      <div className={cn('sticky top-0 z-20 pt-12 pb-2 px-5', isDark ? 'bg-[#0D1A12]' : 'bg-[#F4FBF6]')}>
        <div className="flex items-center justify-between mb-3">
          <h1 className={cn('text-2xl font-black', isDark ? 'text-white' : 'text-[#0D1A12]')}>Discover Clubs</h1>
          <div className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold', isDark ? 'bg-[#23323F] text-[#9AB0A0]' : 'bg-[#FFFFFF] text-[#6A7870] shadow-sm')}>
            <SlidersHorizontal size={12} />
            {filtered.length} clubs
          </div>
        </div>

        <SearchBar value={search} onChange={setSearch} placeholder="Search clubs or tags..." className="mb-3" />

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none mb-2" style={{ scrollbarWidth: 'none' }}>
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat} whileTap={{ scale: 0.95 }} onClick={() => setCategory(cat)}
              className={cn(
                'flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all',
                category === cat ? 'bg-[#1A5E3A] text-white shadow-sm' : isDark ? 'bg-[#23323F] text-[#9AB0A0]' : 'bg-[#FFFFFF] text-[#6A7870] shadow-sm'
              )}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Sort pills */}
        <div className="flex items-center gap-2">
          <ArrowUpDown size={12} className={isDark ? 'text-[#6A7870]' : 'text-[#9AB0A0]'} />
          <span className={cn('text-xs font-semibold', isDark ? 'text-[#6A7870]' : 'text-[#9AB0A0]')}>Sort:</span>
          {(['A–Z', 'Members', 'Recruiting'] as SortOption[]).map((s) => (
            <button
              key={s} onClick={() => setSort(s)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-semibold transition-all',
                sort === s ? 'bg-[#1A5E3A] text-white' : isDark ? 'bg-[#23323F] text-[#9AB0A0]' : 'bg-[#FFFFFF] text-[#6A7870] shadow-sm'
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pt-3">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => <ClubCardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<Search size={28} className="text-[#9AB0A0]" />}
            title="No clubs found"
            description={`No clubs match "${search}". Try a different search or category.`}
            action={
              <button onClick={() => { setSearch(''); setCategory('All') }} className="px-5 py-2.5 rounded-2xl bg-[#1A5E3A] text-white text-sm font-semibold">
                Clear filters
              </button>
            }
          />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <AnimatePresence>
              {filtered.map((club, i) => {
                const isFav = favs.includes(club.id)
                return (
                  <ClubCard
                    key={club.id}
                    club={club}
                    isFavorited={isFav}
                    onToggleFavorite={toggleFav}
                    index={i}
                  />
                )
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
