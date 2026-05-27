import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, Search, ArrowUpDown, Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useClubs } from '../../hooks/useClubs'
import { SearchBar } from '../../components/shared/SearchBar'
import { ClubCardSkeleton } from '../../components/shared/LoadingSkeletons'
import { EmptyState } from '../../components/shared/EmptyState'
import { StatusBadge } from '../../components/shared/StatusBadge'
import { useToast } from '../../components/shared/Toast'
import { cn } from '../../lib/utils'
import type { ClubCategory } from '../../data/types'

type SortOption = 'A–Z' | 'Members' | 'Recruiting'

const CATEGORIES: (ClubCategory | 'All')[] = [
  'All', 'Technology', 'Academic', 'Media', 'Arts', 'Sports', 'Community',
]

const INTEREST_CATEGORY_MAP: Record<string, ClubCategory[]> = {
  Technology: ['Technology'],
  Business: [],
  Media: ['Media'],
  Arts: ['Arts'],
  Sports: ['Sports'],
  Community: ['Community'],
  Academic: ['Academic'],
  Volunteering: ['Community'],
}

export function Clubs() {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const { toast } = useToast()
  const { data: clubs, isLoading } = useClubs()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<ClubCategory | 'All'>('All')
  const [sort, setSort] = useState<SortOption>('A–Z')
  const [favs, setFavs] = useLocalStorage<string[]>('clubify_favorites', [])

  const savedInterests: string[] = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('clubify_interests') || '[]') } catch { return [] }
  }, [])

  const interestedCategories = useMemo(() =>
    Array.from(new Set(savedInterests.flatMap((i) => INTEREST_CATEGORY_MAP[i] || []))),
    [savedInterests]
  )

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

  const toggleFav = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavs((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id])
    toast(favs.includes(id) ? 'Removed from favorites' : `${name} saved!`, 'success')
  }

  return (
    <div className="phone-scroll h-[844px] pb-24" style={{ background: isDark ? '#1E1B16' : '#F2EDDF' }}>
      {/* Header */}
      <div className={cn('sticky top-0 z-20 pt-12 pb-2 px-5', isDark ? 'bg-[#1E1B16]' : 'bg-[#F2EDDF]')}>
        <div className="flex items-center justify-between mb-3">
          <h1 className={cn('text-2xl font-black', isDark ? 'text-white' : 'text-[#1E1B16]')}>Discover Clubs</h1>
          <div className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold', isDark ? 'bg-[#23323F] text-gray-400' : 'bg-[#FAF6EA] text-gray-500 shadow-sm')}>
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
                category === cat ? 'bg-[#6F2F33] text-white shadow-sm' : isDark ? 'bg-[#23323F] text-gray-400' : 'bg-[#FAF6EA] text-gray-500 shadow-sm'
              )}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Sort pills */}
        <div className="flex items-center gap-2">
          <ArrowUpDown size={12} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
          <span className={cn('text-xs font-semibold', isDark ? 'text-gray-500' : 'text-gray-400')}>Sort:</span>
          {(['A–Z', 'Members', 'Recruiting'] as SortOption[]).map((s) => (
            <button
              key={s} onClick={() => setSort(s)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-semibold transition-all',
                sort === s ? 'bg-[#6F2F33] text-white' : isDark ? 'bg-[#23323F] text-gray-400' : 'bg-[#FAF6EA] text-gray-500 shadow-sm'
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
            icon={<Search size={28} className="text-gray-400" />}
            title="No clubs found"
            description={`No clubs match "${search}". Try a different search or category.`}
            action={
              <button onClick={() => { setSearch(''); setCategory('All') }} className="px-5 py-2.5 rounded-2xl bg-[#6F2F33] text-white text-sm font-semibold">
                Clear filters
              </button>
            }
          />
        ) : (
          <motion.div className="grid grid-cols-2 gap-3">
            <AnimatePresence>
              {filtered.map((club, i) => {
                const isInterest = interestedCategories.includes(club.category as ClubCategory)
                const isFav = favs.includes(club.id)
                return (
                  <motion.div
                    key={club.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate(`/student/clubs/${club.slug}`)}
                    className={cn('rounded-2xl overflow-hidden cursor-pointer shadow-md', isDark ? 'bg-[#23323F]' : 'bg-[#FAF6EA]')}
                  >
                    {/* Cover */}
                    <div className="relative h-28 overflow-hidden">
                      <img src={club.coverImage} alt={club.name} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <button
                        onClick={(e) => toggleFav(club.id, club.name, e)}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                      >
                        <Heart size={15} className={isFav ? 'fill-red-500 text-red-500' : 'text-white'} />
                      </button>
                      {club.isRecruiting && (
                        <div className="absolute bottom-2 left-2">
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/90 text-white text-[10px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FAF6EA] pulse-dot" /> Recruiting
                          </span>
                        </div>
                      )}
                      {isInterest && (
                        <div className="absolute top-2 left-2">
                          <span className="px-2 py-0.5 rounded-full bg-[#6F2F33]/90 text-white text-[10px] font-bold">
                            ★ For you
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-3">
                      <div className="flex items-start gap-2">
                        <img
                          src={club.logo}
                          alt={club.name}
                          className="w-9 h-9 rounded-xl object-cover flex-shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/shapes/svg?seed=${club.slug}`
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className={cn('text-sm font-bold leading-tight truncate', isDark ? 'text-white' : 'text-[#1E1B16]')}>
                            {club.name}
                          </h3>
                          <StatusBadge label={club.category} variant="category" category={club.category} />
                        </div>
                      </div>
                      <p className={cn('text-xs mt-2', isDark ? 'text-gray-400' : 'text-gray-500')}>
                        {club.memberCount.toLocaleString()} members
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  )
}
