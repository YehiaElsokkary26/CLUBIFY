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

export function ClubCard({ club, isFavorited, onToggleFavorite, index = 0 }: ClubCardProps) {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const { toast } = useToast()

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
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(`/student/clubs/${club.slug}`)}
      className={cn(
        'rounded-2xl overflow-hidden cursor-pointer shadow-md',
        isDark ? 'bg-[#2C2C2E]' : 'bg-white'
      )}
    >
      {/* Cover image */}
      <div className="relative h-28 overflow-hidden">
        <img
          src={club.coverImage}
          alt={club.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

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
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/90 text-white text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-white pulse-dot" />
              Recruiting
            </span>
          </div>
        )}
      </div>

      {/* Logo + info */}
      <div className="p-3">
        <div className="flex items-start gap-2.5">
          <img
            src={club.logo}
            alt={`${club.name} logo`}
            className="w-9 h-9 rounded-xl object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3
              className={cn(
                'text-sm font-bold leading-tight truncate',
                isDark ? 'text-white' : 'text-[#1C1C1E]'
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
          <Users size={12} className="text-gray-400" />
          <span className={cn('text-xs', isDark ? 'text-gray-400' : 'text-gray-500')}>
            {club.memberCount.toLocaleString()} members
          </span>
        </div>
      </div>
    </motion.div>
  )
}
