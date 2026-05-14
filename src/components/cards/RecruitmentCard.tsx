import { motion } from 'framer-motion'
import { Calendar, Users, AlertTriangle, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { StatusBadge } from '../shared/StatusBadge'
import { cn, formatDateShort, daysUntil } from '../../lib/utils'
import type { Recruitment } from '../../data/types'

interface RecruitmentCardProps {
  recruitment: Recruitment
  index?: number
}

export function RecruitmentCard({ recruitment, index = 0 }: RecruitmentCardProps) {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const days = daysUntil(recruitment.deadline)
  const fillPercent = Math.round(
    ((recruitment.totalSpots - recruitment.spotsLeft) / Math.max(recruitment.totalSpots, 1)) * 100
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/student/apply/${recruitment.clubId}`)}
      className={cn(
        'rounded-2xl p-4 cursor-pointer shadow-md',
        isDark ? 'bg-[#2C2C2E]' : 'bg-white'
      )}
    >
      <div className="flex items-start gap-3">
        <img src={recruitment.clubLogo} alt={recruitment.clubName} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className={cn('text-sm font-bold', isDark ? 'text-white' : 'text-[#1C1C1E]')}>{recruitment.clubName}</h3>
              <StatusBadge label={recruitment.category} variant="category" category={recruitment.category} className="mt-1" />
            </div>
            <ChevronRight size={16} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
          </div>

          {/* Urgency label */}
          {recruitment.urgencyLabel && (
            <div className="flex items-center gap-1 mt-2">
              <AlertTriangle size={12} className="text-orange-500" />
              <span className="text-xs font-semibold text-orange-500">{recruitment.urgencyLabel}</span>
            </div>
          )}

          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                <span className="font-semibold text-[#8B1A1A]">{recruitment.spotsLeft}</span> spots left
              </span>
              <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>{fillPercent}% filled</span>
            </div>
            <div className={cn('h-1.5 rounded-full overflow-hidden', isDark ? 'bg-[#3A3A3C]' : 'bg-gray-100')}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${fillPercent}%` }}
                transition={{ delay: index * 0.08 + 0.3, duration: 0.6 }}
                className="h-full rounded-full"
                style={{ background: fillPercent > 80 ? '#E07B39' : '#8B1A1A' }}
              />
            </div>
          </div>

          <div className={cn('flex items-center gap-3 mt-2 text-xs', isDark ? 'text-gray-400' : 'text-gray-500')}>
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              Deadline: {formatDateShort(recruitment.deadline)}
            </span>
            <span className={cn('font-semibold', days <= 7 ? 'text-red-500' : days <= 14 ? 'text-orange-500' : 'text-green-600')}>
              {days <= 0 ? 'Closed' : `${days}d left`}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
