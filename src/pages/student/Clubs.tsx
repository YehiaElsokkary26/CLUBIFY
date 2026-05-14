import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useClubs } from '../../hooks/useClubs'
import { ClubCard } from '../../components/cards/ClubCard'
import { SearchBar } from '../../components/shared/SearchBar'
import { CategoryFilter } from '../../components/shared/CategoryFilter'
import { ClubCardSkeleton } from '../../components/shared/LoadingSkeletons'
import { EmptyState } from '../../components/shared/EmptyState'
import { cn } from '../../lib/utils'
import type { ClubCategory } from '../../data/types'
import { Search } from 'lucide-react'

export function Clubs() {
  const { isDark } = useTheme()
  const { data: clubs, isLoading } = useClubs()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<ClubCategory | 'All'>('All')
  const [favs, setFavs] = useLocalStorage<string[]>('clubify_favorites', [])

  const filtered = useMemo(() => {
    if (!clubs) return []
    return clubs.filter((c) => {
      const matchSearch = search === '' || c.name.toLowerCase().includes(search.toLowerCase()) || c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      const matchCat = category === 'All' || c.category === category
      return matchSearch && matchCat
    })
  }, [clubs, search, category])

  const toggleFav = (id: string) => {
    setFavs((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id])
  }

  return (
    <div className="phone-scroll h-[844px] pb-24" style={{ background: isDark ? '#1C1C1E' : '#FAF8F5' }}>
      {/* Header */}
      <div className={cn('sticky top-0 z-20 pt-12 pb-3 px-5', isDark ? 'bg-[#1C1C1E]' : 'bg-[#FAF8F5]')}>
        <div className="flex items-center justify-between mb-4">
          <h1 className={cn('text-2xl font-black', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Discover Clubs</h1>
          <div className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold', isDark ? 'bg-[#2C2C2E] text-gray-400' : 'bg-white text-gray-500 shadow-sm')}>
            <SlidersHorizontal size={12} />
            {filtered.length} clubs
          </div>
        </div>
        <SearchBar value={search} onChange={setSearch} placeholder="Search clubs or tags..." className="mb-3" />
        <CategoryFilter selected={category} onChange={setCategory} />
      </div>

      <div className="px-5 pt-3">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => <ClubCardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<Search size={28} className="text-gray-400" />}
            title="No clubs found"
            description={`No clubs match "${search}". Try a different search or category.`}
            action={
              <button onClick={() => { setSearch(''); setCategory('All') }} className="px-5 py-2.5 rounded-2xl bg-[#8B1A1A] text-white text-sm font-semibold">
                Clear filters
              </button>
            }
          />
        ) : (
          <motion.div className="grid grid-cols-2 gap-3">
            {filtered.map((club, i) => (
              <ClubCard
                key={club.id}
                club={club}
                isFavorited={favs.includes(club.id)}
                onToggleFavorite={toggleFav}
                index={i}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
