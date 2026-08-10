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
        'rounded-2xl p-4 cursor-pointer border',
        isDark
          ? 'bg-[#272831] border-[#35363F]'
          : 'bg-[#FFFFFF] border-[#E5E5E8]',
        'shadow-[0_1px_3px_rgba(39,40,49,0.08)] hover:shadow-[0_4px_12px_rgba(39,40,49,0.10)] transition-shadow'
      )}
    >
      <div className="flex items-start gap-3">
        <img src={recruitment.clubLogo} alt={recruitment.clubName} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className={cn('text-sm font-bold font-display tracking-wide', isDark ? 'text-white' : 'text-[#272831]')}>{recruitment.clubName}</h3>
              <StatusBadge label={recruitment.category} variant="category" category={recruitment.category} className="mt-1" />
            </div>
            <ChevronRight size={16} className={isDark ? 'text-[#929397]' : 'text-[#929397]'} />
          </div>

          {/* Urgency label */}
          {recruitment.urgencyLabel && (
            <div className="flex items-center gap-1 mt-2 px-2 py-1 rounded-md bg-[#FDA014]/10 w-fit">
              <AlertTriangle size={12} className="text-[#FDA014]" />
              <span className="text-xs font-bold font-body text-[#FDA014]">{recruitment.urgencyLabel}</span>
            </div>
          )}

          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span className={isDark ? 'text-[#929397]' : 'text-[#929397]'}>
                <span className="font-semibold text-[#FDA014]">{recruitment.spotsLeft}</span> spots left
              </span>
              <span className={isDark ? 'text-[#929397]' : 'text-[#929397]'}>{fillPercent}% filled</span>
            </div>
            <div className={cn('h-1 rounded-full overflow-hidden', isDark ? 'bg-[#35363F]' : 'bg-[#E5E5E8]')}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${fillPercent}%` }}
                transition={{ delay: index * 0.08 + 0.3, duration: 0.6 }}
                className="h-full rounded-full"
                style={{ background: fillPercent > 80 ? '#E14535' : '#FDA014' }}
              />
            </div>
          </div>

          <div className={cn('flex items-center gap-3 mt-2 text-xs font-mono', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              Deadline: {formatDateShort(recruitment.deadline)}
            </span>
            <span className={cn('font-semibold', days <= 7 ? 'text-[#E14535]' : days <= 14 ? 'text-[#FDA014]' : 'text-[#5FC756]')}>
              {days <= 0 ? 'Closed' : `${days}d left`}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
