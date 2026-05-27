import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, Globe, Users, Calendar, Mail, Star, ChevronRight } from 'lucide-react'
import { InstagramIcon, FacebookIcon, LinkedinIcon } from '../../components/shared/SocialIcons'
import { useClub } from '../../hooks/useClubs'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useTheme } from '../../context/ThemeContext'
import { useToast } from '../../components/shared/Toast'
import { StatusBadge } from '../../components/shared/StatusBadge'
import { EventCard } from '../../components/cards/EventCard'
import { cn, formatDate } from '../../lib/utils'

type Tab = 'About' | 'Events' | 'Members'

export function ClubDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const { toast } = useToast()
  const { data: club, isLoading } = useClub(slug || '')
  const [activeTab, setActiveTab] = useState<Tab>('About')
  const [favs, setFavs] = useLocalStorage<string[]>('clubify_favorites', [])
  const isFav = club ? favs.includes(club.id) : false

  const toggleFav = () => {
    if (!club) return
    setFavs((prev) => prev.includes(club.id) ? prev.filter((f) => f !== club.id) : [...prev, club.id])
    toast(isFav ? 'Removed from favorites' : `${club.name} saved!`)
  }

  if (isLoading) {
    return (
      <div className="min-h-[844px] flex items-center justify-center" style={{ background: isDark ? '#1E1B16' : '#F2EDDF' }}>
        <div className="w-8 h-8 rounded-full border-2 border-[#6F2F33] border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!club) {
    return (
      <div className="min-h-[844px] flex items-center justify-center" style={{ background: isDark ? '#1E1B16' : '#F2EDDF' }}>
        <p className={cn('font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>Club not found</p>
      </div>
    )
  }

  const memberOfMonth = club.members.find((m) => m.isMonthStar)

  return (
    <div className="phone-scroll h-[844px] pb-24" style={{ background: isDark ? '#1E1B16' : '#F2EDDF' }}>
      {/* Cover */}
      <div className="relative h-64 overflow-hidden">
        <img src={club.coverImage} alt={club.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-12 left-5 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
        >
          <ArrowLeft size={18} className="text-white" />
        </button>

        {/* Fav button */}
        <button
          onClick={toggleFav}
          className="absolute top-12 right-5 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
        >
          <Heart size={18} className={isFav ? 'fill-red-500 text-red-500' : 'text-white'} />
        </button>

        {/* Logo + name */}
        <div className="absolute bottom-4 left-5 flex items-end gap-3">
          <img src={club.logo} alt={club.name} className="w-16 h-16 rounded-2xl border-2 border-white object-cover shadow-lg" />
          <div>
            <h1 className="text-white text-xl font-black font-display tracking-wide leading-tight">{club.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <StatusBadge label={club.category} variant="category" category={club.category} />
              {club.isRecruiting
                ? <StatusBadge label="Recruiting Now 🟢" variant="recruiting" />
                : <StatusBadge label="Closed 🔴" variant="closed" />
              }
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className={cn('px-5 py-4 flex items-center justify-between border-b', isDark ? 'bg-[#23323F] border-[#2d3d4a]' : 'bg-[#FAF6EA] border-zinc-100')}>
        <div className="text-center">
          <p className={cn('text-lg font-black font-display', isDark ? 'text-white' : 'text-[#1E1B16]')}>{club.memberCount}</p>
          <p className={cn('text-[10px] font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>Members</p>
        </div>
        <div className={cn('w-px h-8', isDark ? 'bg-[#2d3d4a]' : 'bg-zinc-200')} />
        <div className="text-center">
          <p className={cn('text-lg font-black font-display', isDark ? 'text-white' : 'text-[#1E1B16]')}>{club.events.length}</p>
          <p className={cn('text-[10px] font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>Events</p>
        </div>
        <div className={cn('w-px h-8', isDark ? 'bg-[#2d3d4a]' : 'bg-zinc-200')} />
        <div className="text-center">
          <p className={cn('text-lg font-black font-display', isDark ? 'text-white' : 'text-[#1E1B16]')}>{club.founded}</p>
          <p className={cn('text-[10px] font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>Founded</p>
        </div>
        <div className={cn('w-px h-8', isDark ? 'bg-[#2d3d4a]' : 'bg-zinc-200')} />
        <div className="text-center">
          <p className={cn('text-lg font-black font-display', isDark ? 'text-white' : 'text-[#1E1B16]')}>{club.members.length}</p>
          <p className={cn('text-[10px] font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>Committee</p>
        </div>
      </div>

      {/* Social links */}
      <div className={cn('px-5 py-3 flex items-center gap-3 border-b', isDark ? 'bg-[#23323F] border-[#2d3d4a]' : 'bg-[#FAF6EA] border-zinc-100')}>
        {club.socialLinks.instagram && (
          <a href={club.socialLinks.instagram} className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <InstagramIcon size={16} className="text-white" />
          </a>
        )}
        {club.socialLinks.facebook && (
          <a href={club.socialLinks.facebook} className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
            <FacebookIcon size={16} className="text-white" />
          </a>
        )}
        {club.socialLinks.linkedin && (
          <a href={club.socialLinks.linkedin} className="w-9 h-9 rounded-xl bg-blue-700 flex items-center justify-center">
            <LinkedinIcon size={16} className="text-white" />
          </a>
        )}
        {club.socialLinks.website && (
          <a href={club.socialLinks.website} className={cn('w-9 h-9 rounded-xl flex items-center justify-center', isDark ? 'bg-[#2d3d4a]' : 'bg-zinc-100')}>
            <Globe size={16} className={isDark ? 'text-zinc-300' : 'text-zinc-600'} />
          </a>
        )}
        <div className="flex-1" />
        {club.isRecruiting && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/student/apply/${club.id}`)}
            className="px-4 py-2 rounded-xl bg-[#6F2F33] text-white text-xs font-bold font-body flex items-center gap-1.5"
          >
            Apply Now
            <ChevronRight size={14} />
          </motion.button>
        )}
      </div>

      {/* Tab bar */}
      <div className={cn('flex px-5 pt-4 pb-0 gap-1', isDark ? 'bg-[#1E1B16]' : 'bg-[#F2EDDF]')}>
        {(['About', 'Events', 'Members'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'flex-1 py-2.5 rounded-xl text-sm font-semibold font-body transition-all',
              activeTab === tab ? 'bg-[#6F2F33] text-white shadow-sm' : isDark ? 'text-zinc-400' : 'text-zinc-500'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="px-5 pt-4">
        {activeTab === 'About' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
            <div>
              <h3 className={cn('text-xs font-bold uppercase tracking-wider mb-2 font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>About</h3>
              <p className={cn('text-sm leading-relaxed font-body', isDark ? 'text-zinc-300' : 'text-zinc-600')}>{club.description}</p>
            </div>
            <div>
              <h3 className={cn('text-xs font-bold uppercase tracking-wider mb-2 font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>Our Mission</h3>
              <p className={cn('text-sm leading-relaxed font-body', isDark ? 'text-zinc-300' : 'text-zinc-600')}>{club.mission}</p>
            </div>
            <div>
              <h3 className={cn('text-xs font-bold uppercase tracking-wider mb-2 font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>Who Should Join?</h3>
              <p className={cn('text-sm leading-relaxed font-body', isDark ? 'text-zinc-300' : 'text-zinc-600')}>{club.whoShouldJoin}</p>
            </div>
            <div>
              <h3 className={cn('text-xs font-bold uppercase tracking-wider mb-2 font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>Contact</h3>
              <div className={cn('flex items-center gap-2 text-sm font-body', isDark ? 'text-zinc-300' : 'text-zinc-600')}>
                <Mail size={14} className="text-[#6F2F33]" />
                {club.contactEmail}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'Events' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {club.events.length > 0 ? club.events.map((event) => (
              <EventCard key={event.id} event={event} />
            )) : (
              <p className={cn('text-center py-8 text-sm font-body', isDark ? 'text-zinc-500' : 'text-zinc-400')}>No events scheduled yet</p>
            )}
          </motion.div>
        )}

        {activeTab === 'Members' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {/* Member of the month */}
            {memberOfMonth && (
              <div className="rounded-2xl overflow-hidden mb-4" style={{ background: isDark ? '#23323F' : '#6F2F33' }}>
                <div className="p-4 flex items-center gap-3">
                  <div className="relative">
                    <img src={memberOfMonth.avatar} alt={memberOfMonth.name} className="w-14 h-14 rounded-xl border-2 border-white/30" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C99B2E] flex items-center justify-center">
                      <Star size={10} fill="white" className="text-white" />
                    </div>
                  </div>
                  <div>
                    <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider font-body">Member of the Month</span>
                    <h4 className="text-white text-sm font-bold font-display tracking-wide">{memberOfMonth.name}</h4>
                    <p className="text-white/70 text-xs font-body">{memberOfMonth.role}</p>
                    {memberOfMonth.quote && <p className="text-white/60 text-xs italic font-body mt-1">"{memberOfMonth.quote}"</p>}
                  </div>
                </div>
              </div>
            )}

            {/* All members */}
            {club.members.map((member) => (
              <div key={member.id} className={cn('flex items-center gap-3 p-3 rounded-2xl', isDark ? 'bg-[#23323F]' : 'bg-[#FAF6EA] shadow-sm')}>
                <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className={cn('text-sm font-semibold font-body', isDark ? 'text-white' : 'text-[#1E1B16]')}>{member.name}</p>
                  <p className={cn('text-xs font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>{member.role}</p>
                </div>
                {member.isMonthStar && (
                  <div className="ml-auto">
                    <Star size={14} fill="#C99B2E" className="text-[#C99B2E]" />
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
