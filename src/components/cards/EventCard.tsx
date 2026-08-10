import { Calendar, MapPin, Clock } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { cn, formatDateShort } from '../../lib/utils'
import type { ClubEvent } from '../../data/types'
import { clubs } from '../../data/clubs'

const typeColors: Record<string, string> = {
  Workshop:    'bg-blue-100 text-blue-700',
  Social:      'bg-pink-100 text-pink-700',
  Competition: 'bg-[#FDA014]/10 text-[#FDA014]',
  Meeting:     'bg-[#F0F0F2] text-[#6B6C72]',
  Talk:        'bg-purple-100 text-purple-700',
}

interface EventCardProps {
  event: ClubEvent
  compact?: boolean
}

export function EventCard({ event, compact }: EventCardProps) {
  const { isDark } = useTheme()
  const club = clubs.find((c) => c.id === event.clubId)

  if (compact) {
    return (
      <div
        className={cn(
          'flex-shrink-0 w-52 rounded-2xl p-4 border',
          isDark ? 'bg-[#272831] border-[#35363F]' : 'bg-[#FFFFFF] border-[#E5E5E8]',
          'shadow-[0_1px_3px_rgba(39,40,49,0.08)]'
        )}
      >
        <div
          className={cn(
            'inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mb-3 font-body',
            typeColors[event.type] || 'bg-[#F0F0F2] text-[#6B6C72]'
          )}
        >
          {event.type}
        </div>
        <h4 className={cn('text-sm font-bold leading-tight mb-2 font-display tracking-wide', isDark ? 'text-white' : 'text-[#272831]')}>
          {event.title}
        </h4>
        <div className={cn('flex items-center gap-1 text-xs mb-1 font-mono', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
          <Calendar size={11} />
          <span>{formatDateShort(event.date)}</span>
        </div>
        <div className={cn('flex items-center gap-1 text-xs font-body', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
          <MapPin size={11} />
          <span className="truncate">{event.location}</span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn(
      'rounded-2xl p-4 border',
      isDark ? 'bg-[#272831] border-[#35363F]' : 'bg-[#FFFFFF] border-[#E5E5E8]',
      'shadow-[0_1px_3px_rgba(39,40,49,0.08)]'
    )}>
      <div className="flex items-start gap-3">
        {/* Date block */}
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#FDA014] flex flex-col items-center justify-center">
          <span className="text-white text-xs font-bold leading-none font-display tracking-wide">
            {new Date(event.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
          </span>
          <span className="text-white text-lg font-black leading-none font-display">
            {new Date(event.date).getDate()}
          </span>
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <h4 className={cn('text-sm font-bold font-display tracking-wide', isDark ? 'text-white' : 'text-[#272831]')}>{event.title}</h4>
            <span
              className={cn(
                'flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold font-body',
                typeColors[event.type] || 'bg-[#F0F0F2] text-[#6B6C72]'
              )}
            >
              {event.type}
            </span>
          </div>
          {club && (
            <p className="text-xs text-[#FDA014] font-medium mt-0.5 font-body">{club.name}</p>
          )}
          <div className={cn('flex items-center gap-3 mt-1.5 text-xs font-mono', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
            <span className="flex items-center gap-1"><Clock size={11} />{event.time}</span>
            <span className="flex items-center gap-1"><MapPin size={11} /><span className="truncate">{event.location}</span></span>
          </div>
        </div>
      </div>
    </div>
  )
}
