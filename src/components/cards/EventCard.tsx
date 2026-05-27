import { MapPin, Clock } from 'lucide-react'
import { cn, formatDateShort } from '../../lib/utils'
import type { ClubEvent } from '../../data/types'
import { clubs } from '../../data/clubs'

const typeCardBg: Record<string, string> = {
  Meeting:     'bg-[#7B2D33]',
  Social:      'bg-[#C54030]',
  Workshop:    'bg-[#1E3A54]',
  Competition: 'bg-[#2A6070]',
  Talk:        'bg-[#4A3870]',
}

const typeCardBgLight: Record<string, string> = {
  Meeting:     'bg-[#7B2D33]/15',
  Social:      'bg-[#C54030]/15',
  Workshop:    'bg-[#1E3A54]/15',
  Competition: 'bg-[#2A6070]/15',
  Talk:        'bg-[#4A3870]/15',
}

const typeTextAccent: Record<string, string> = {
  Meeting:     'text-[#e8a0a6]',
  Social:      'text-[#f0a898]',
  Workshop:    'text-[#90b8d8]',
  Competition: 'text-[#88c0cc]',
  Talk:        'text-[#b8a8e0]',
}

interface EventCardProps {
  event: ClubEvent
  compact?: boolean
}

export function EventCard({ event, compact }: EventCardProps) {
  const club = clubs.find((c) => c.id === event.clubId)
  const cardBg = typeCardBg[event.type] ?? 'bg-[#7B2D33]'
  const accentText = typeTextAccent[event.type] ?? 'text-[#e8a0a6]'

  const dateObj = new Date(event.date)
  const day = dateObj.getDate()
  const month = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()

  if (compact) {
    return (
      <div className={cn('flex-shrink-0 w-48 rounded-2xl p-4 overflow-hidden relative', cardBg)}>
        {/* Decorative circle */}
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/5" />

        <span className={cn('text-[9px] font-bold uppercase tracking-widest', accentText)}>
          {event.type}
        </span>

        <h4 className="text-white text-sm font-black font-display leading-snug mt-1.5 mb-3 line-clamp-2">
          {event.title}
        </h4>

        <div className="flex items-center gap-1 text-white/60 text-[10px] mb-1">
          <Clock size={10} className="flex-shrink-0" />
          <span className="font-mono">{event.time}</span>
          <span className="mx-1 text-white/30">·</span>
          <span>{month} {day}</span>
        </div>
        <div className="flex items-center gap-1 text-white/60 text-[10px]">
          <MapPin size={10} className="flex-shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('rounded-2xl overflow-hidden relative', cardBg)}>
      {/* Decorative circle */}
      <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/5 pointer-events-none" />

      <div className="p-4 flex items-start gap-4">
        {/* Date block */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center w-11 h-11 rounded-xl bg-white/15">
          <span className="text-white/70 text-[9px] font-bold uppercase leading-none">{month}</span>
          <span className="text-white text-lg font-black leading-none mt-0.5">{day}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-white font-black font-display text-sm leading-snug flex-1">
              {event.title}
            </h4>
            <span className={cn('flex-shrink-0 text-[10px] font-bold font-mono mt-0.5', accentText)}>
              {event.time}
            </span>
          </div>

          {club && (
            <p className={cn('text-[11px] font-semibold mt-0.5', accentText)}>{club.name}</p>
          )}

          <div className="flex items-center gap-1 text-white/60 text-xs mt-2">
            <MapPin size={11} className="flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {/* Club logo */}
        {club?.logo && (
          <img
            src={club.logo}
            alt={club.name}
            className="flex-shrink-0 w-9 h-9 rounded-lg object-cover opacity-80 border border-white/20"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        )}
      </div>
    </div>
  )
}
