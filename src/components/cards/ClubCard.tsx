import { motion } from 'framer-motion'
import { Heart, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { StatusBadge } from '../shared/StatusBadge'
import { useTheme } from '../../context/ThemeContext'
import { useToast } from '../shared/Toast'
import { cn } from '../../lib/utils'
import type { Club } from '../../data/types'

interface ClubCardProps {
  club: Club
  isFavorited: boolean
  onToggleFavorite: (id: string) => void
  index?: number
}

const CATEGORY_EMOJI: Record<string, string> = {
  Technology: '💻', Sports: '🏀', Academic: '📚', Community: '🤝',
  Media: '📸', Arts: '🎨', Music: '🎸', Engineering: '⚙️', Business: '💼',
  Science: '🔬', Health: '🏃', Environment: '🌱', Gaming: '🎮',
}

const CATEGORY_GRADIENT: Record<string, string> = {
  Technology: 'from-[#1A3A5C] to-[#2A5E70]',
  Sports: 'from-[#1A5E3A] to-[#2E7D52]',
  Academic: 'from-[#4A3870] to-[#7B6EBC]',
  Community: 'from-[#2A5E70] to-[#3A7CB8]',
  Media: 'from-[#5C2A3A] to-[#D63B52]',
  Arts: 'from-[#7B6EBC] to-[#4A3870]',
  Music: 'from-[#E05030] to-[#C09A28]',
  Engineering: 'from-[#263028] to-[#1A5E3A]',
  Business: 'from-[#1A3A5C] to-[#263028]',
}

export function ClubCard({ club, isFavorited, onToggleFavorite, index = 0 }: ClubCardProps) {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const { toast } = useToast()

  const emoji = CATEGORY_EMOJI[club.category] ?? '🎓'
  const gradient = CATEGORY_GRADIENT[club.category] ?? 'from-[#1A5E3A] to-[#2E7D52]'

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleFavorite(club.id)
    toast(isFavorited ? `Removed from favorites` : `${club.name} saved!`, 'success')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(`/student/clubs/${club.slug}`)}
      className={cn(
        'rounded-2xl overflow-hidden cursor-pointer border',
        isDark
          ? 'bg-[#23323F] border-[#2d3d4a]'
          : 'bg-[#FFFFFF] border-[#C8E0D0]',
        'shadow-[0_1px_3px_rgba(30,27,22,0.08)] hover:shadow-[0_4px_12px_rgba(30,27,22,0.10)] transition-shadow duration-200'
      )}
    >
      {/* Cover — gradient + emoji */}
      <div className={cn('relative h-28 overflow-hidden bg-gradient-to-br', gradient)}>
        <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-30">
          {emoji}
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-5xl">
          {emoji}
        </div>

        {/* Favorite button */}
        <button
          onClick={handleFavorite}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
        >
          <Heart
            size={15}
            className={isFavorited ? 'fill-red-500 text-red-500' : 'text-white'}
          />
        </button>

        {/* Recruiting badge */}
        {club.isRecruiting && (
          <div className="absolute bottom-2 left-2">
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/30 backdrop-blur-sm text-white text-[10px] font-bold font-body">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFFFFF] pulse-dot" />
              Recruiting
            </span>
          </div>
        )}
      </div>

      {/* Emoji icon + info */}
      <div className="p-3">
        <div className="flex items-start gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#E6F4EC] flex items-center justify-center flex-shrink-0 text-lg">
            {emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className={cn(
                'text-sm font-bold leading-tight truncate font-display tracking-wide',
                isDark ? 'text-white' : 'text-[#0D1A12]'
              )}
            >
              {club.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <StatusBadge label={club.category} variant="category" category={club.category} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 mt-2.5">
          <Users size={12} className="text-[#9AB0A0]" />
          <span className={cn('text-xs font-body', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>
            {club.memberCount.toLocaleString()} members
          </span>
        </div>
      </div>
    </motion.div>
  )
}
