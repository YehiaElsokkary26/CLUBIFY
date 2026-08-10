import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { cn } from '../../lib/utils'
import type { ClubCategory } from '../../data/types'

const categories: (ClubCategory | 'All')[] = [
  'All', 'Media', 'Academic', 'Business', 'Community', 'Arts', 'Sports', 'Technology',
]

interface CategoryFilterProps {
  selected: ClubCategory | 'All'
  onChange: (c: ClubCategory | 'All') => void
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  const { isDark } = useTheme()

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
      {categories.map((cat) => {
        const active = selected === cat
        return (
          <motion.button
            key={cat}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(cat)}
            className={cn(
              'flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold font-body transition-all duration-200',
              active
                ? 'bg-[#6F2F33] text-white shadow-sm'
                : isDark
                ? 'bg-[#272831] text-[#929397] border border-[#35363F]'
                : 'bg-[#FFFFFF] text-[#6B6C72] border border-[#E5E5E8] shadow-sm'
            )}
          >
            {cat}
          </motion.button>
        )
      })}
    </div>
  )
}
