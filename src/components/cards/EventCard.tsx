import { Calendar, MapPin, Clock } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { cn, formatDateShort } from '../../lib/utils'
import type { ClubEvent } from '../../data/types'
import { clubs } from '../../data/clubs'

const typeColors: Record<string, string> = {
  Workshop: 'bg-blue-100 text-blue-700',
  Social: 'bg-pink-100 text-pink-700',
  Competition: 'bg-orange-100 text-orange-700',
  Meeting: 'bg-gray-100 text-gray-600',
  Talk: 'bg-purple-100 text-purple-700',
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
          'flex-shrink-0 w-52 rounded-2xl p-4 shadow-sm',
          isDark ? 'bg-[#2C2C2E]' : 'bg-white'
        )}
      >
        <div
          className={cn(
            'inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mb-3',
            typeColors[event.type] || 'bg-gray-100 text-gray-600'
          )}
        >
          {event.type}
        </div>
        <h4 className={cn('text-sm font-bold leading-tight mb-2', isDark ? 'text-white' : 'text-[#1C1C1E]')}>
          {event.title}
        </h4>
        <div className={cn('flex items-center gap-1 text-xs mb-1', isDark ? 'text-gray-400' : 'text-gray-500')}>
          <Calendar size={11} />
          <span>{formatDateShort(event.date)}</span>
        </div>
        <div className={cn('flex items-center gap-1 text-xs', isDark ? 'text-gray-400' : 'text-gray-500')}>
          <MapPin size={11} />
          <span className="truncate">{event.location}</span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('rounded-2xl p-4 shadow-sm', isDark ? 'bg-[#2C2C2E]' : 'bg-white')}>
      <div className="flex items-start gap-3">
        {/* Date block */}
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#8B1A1A] flex flex-col items-center justify-center">
          <span className="text-white text-xs font-bold leading-none">
            {new Date(event.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
          </span>
          <span className="text-white text-lg font-black leading-none">
            {new Date(event.date).getDate()}
          </span>
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <h4 className={cn('text-sm font-bold', isDark ? 'text-white' : 'text-[#1C1C1E]')}>{event.title}</h4>
            <span
              className={cn(
                'flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold',
                typeColors[event.type] || 'bg-gray-100 text-gray-600'
              )}
            >
              {event.type}
            </span>
          </div>
          {club && (
            <p className="text-xs text-[#8B1A1A] font-medium mt-0.5">{club.name}</p>
          )}
          <div className={cn('flex items-center gap-3 mt-1.5 text-xs', isDark ? 'text-gray-400' : 'text-gray-500')}>
            <span className="flex items-center gap-1"><Clock size={11} />{event.time}</span>
            <span className="flex items-center gap-1"><MapPin size={11} /><span className="truncate">{event.location}</span></span>
          </div>
        </div>
      </div>
    </div>
  )
}
