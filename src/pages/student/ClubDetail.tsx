import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, Globe, Users, Calendar, Mail, Star, ChevronRight, UserPlus, UserCheck } from 'lucide-react'
import { InstagramIcon, FacebookIcon, LinkedinIcon } from '../../components/shared/SocialIcons'
import { useClub } from '../../hooks/useClubs'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useToast } from '../../components/shared/Toast'
import { StatusBadge } from '../../components/shared/StatusBadge'
import { EventCard } from '../../components/cards/EventCard'
import { getEvents } from '../../lib/db'
import { cn, formatDate } from '../../lib/utils'

type Tab = 'About' | 'Events' | 'Members'

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

export function ClubDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const { user, joinClub, leaveClub } = useAuth()
  const { toast } = useToast()
  const { data: club, isLoading } = useClub(slug || '')
  const [activeTab, setActiveTab] = useState<Tab>('About')
  const [favs, setFavs] = useLocalStorage<string[]>('clubify_favorites', [])
  const isFav = club ? favs.includes(club.id) : false
  const isFollowing = club ? (user?.joinedClubs ?? []).includes(club.id) : false

  const toggleFav = () => {
    if (!club) return
    setFavs((prev) => prev.includes(club.id) ? prev.filter((f) => f !== club.id) : [...prev, club.id])
    toast(isFav ? 'Removed from favorites' : `${club.name} saved!`)
  }

  const toggleFollow = () => {
    if (!club) return
    if (isFollowing) {
      leaveClub(club.id)
      toast(`Left ${club.name}`, 'info')
    } else {
      joinClub(club.id)
      toast(`Joined ${club.name}! 🎉`, 'success')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-[844px] flex items-center justify-center" style={{ background: isDark ? '#0D1A12' : '#F4FBF6' }}>
        <div className="w-8 h-8 rounded-full border-2 border-[#1A5E3A] border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!club) {
    return (
      <div className="min-h-[844px] flex items-center justify-center" style={{ background: isDark ? '#0D1A12' : '#F4FBF6' }}>
        <p className={cn('font-body', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>Club not found</p>
      </div>
    )
  }

  const memberOfMonth = club.members.find((m) => m.isMonthStar)

  return (
    <div className="phone-scroll h-[844px] pb-24" style={{ background: isDark ? '#0D1A12' : '#F4FBF6' }}>
      {/* Cover */}
      <div className="relative h-64 overflow-hidden">
        <div className={`w-full h-full bg-gradient-to-br ${CATEGORY_GRADIENT[club.category] ?? 'from-[#1A5E3A] to-[#2E7D52]'} flex items-center justify-center`}>
          <span className="text-7xl select-none">{CATEGORY_EMOJI[club.category] ?? '🎓'}</span>
        </div>
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
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${CATEGORY_GRADIENT[club.category] ?? 'from-[#1A5E3A] to-[#2E7D52]'} flex items-center justify-center border-2 border-white shadow-lg`}>
              <span className="text-2xl select-none">{CATEGORY_EMOJI[club.category] ?? '🎓'}</span>
            </div>
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
      <div className={cn('px-5 py-4 flex items-center justify-between border-b', isDark ? 'bg-[#23323F] border-[#2d3d4a]' : 'bg-[#FFFFFF] border-[#DDEEE6]')}>
        <div className="text-center">
          <p className={cn('text-lg font-black font-display', isDark ? 'text-white' : 'text-[#0D1A12]')}>{club.memberCount}</p>
          <p className={cn('text-[10px] font-body', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>Members</p>
        </div>
        <div className={cn('w-px h-8', isDark ? 'bg-[#2d3d4a]' : 'bg-[#C8E0D0]')} />
        <div className="text-center">
          <p className={cn('text-lg font-black font-display', isDark ? 'text-white' : 'text-[#0D1A12]')}>{club.events.length}</p>
          <p className={cn('text-[10px] font-body', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>Events</p>
        </div>
        <div className={cn('w-px h-8', isDark ? 'bg-[#2d3d4a]' : 'bg-[#C8E0D0]')} />
        <div className="text-center">
          <p className={cn('text-lg font-black font-display', isDark ? 'text-white' : 'text-[#0D1A12]')}>{club.founded}</p>
          <p className={cn('text-[10px] font-body', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>Founded</p>
        </div>
        <div className={cn('w-px h-8', isDark ? 'bg-[#2d3d4a]' : 'bg-[#C8E0D0]')} />
        <div className="text-center">
          <p className={cn('text-lg font-black font-display', isDark ? 'text-white' : 'text-[#0D1A12]')}>{club.members.length}</p>
          <p className={cn('text-[10px] font-body', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>Committee</p>
        </div>
      </div>

      {/* Social links */}
      <div className={cn('px-5 py-3 flex items-center gap-3 border-b', isDark ? 'bg-[#23323F] border-[#2d3d4a]' : 'bg-[#FFFFFF] border-[#DDEEE6]')}>
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
          <a href={club.socialLinks.website} className={cn('w-9 h-9 rounded-xl flex items-center justify-center', isDark ? 'bg-[#2d3d4a]' : 'bg-[#EEF7F2]')}>
            <Globe size={16} className={isDark ? 'text-[#C0D4C8]' : 'text-[#5C5650]'} />
          </a>
        )}
        <div className="flex-1" />
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggleFollow}
          className={cn(
            'px-3 py-2 rounded-xl text-xs font-bold font-body flex items-center gap-1.5 border',
            isFollowing
              ? isDark ? 'bg-[#1A5E3A]/20 border-[#1A5E3A] text-[#4CAF72]' : 'bg-[#E6F4EC] border-[#1A5E3A] text-[#1A5E3A]'
              : isDark ? 'bg-[#23323F] border-[#2d3d4a] text-[#C0D4C8]' : 'bg-[#FFFFFF] border-[#C8E0D0] text-[#5C5650]'
          )}
        >
          {isFollowing ? <UserCheck size={13} /> : <UserPlus size={13} />}
          {isFollowing ? 'Following' : 'Follow'}
        </motion.button>
        {club.isRecruiting && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/student/apply/${club.id}`)}
            className="px-4 py-2 rounded-xl bg-[#1A5E3A] text-white text-xs font-bold font-body flex items-center gap-1.5"
          >
            Apply Now
            <ChevronRight size={14} />
          </motion.button>
        )}
      </div>

      {/* Tab bar */}
      <div className={cn('flex px-5 pt-4 pb-0 gap-1', isDark ? 'bg-[#0D1A12]' : 'bg-[#F4FBF6]')}>
        {(['About', 'Events', 'Members'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'flex-1 py-2.5 rounded-xl text-sm font-semibold font-body transition-all',
              activeTab === tab ? 'bg-[#1A5E3A] text-white shadow-sm' : isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]'
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
              <h3 className={cn('text-xs font-bold uppercase tracking-wider mb-2 font-body', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>About</h3>
              <p className={cn('text-sm leading-relaxed font-body', isDark ? 'text-[#C0D4C8]' : 'text-[#5C5650]')}>{club.description}</p>
            </div>
            <div>
              <h3 className={cn('text-xs font-bold uppercase tracking-wider mb-2 font-body', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>Our Mission</h3>
              <p className={cn('text-sm leading-relaxed font-body', isDark ? 'text-[#C0D4C8]' : 'text-[#5C5650]')}>{club.mission}</p>
            </div>
            <div>
              <h3 className={cn('text-xs font-bold uppercase tracking-wider mb-2 font-body', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>Who Should Join?</h3>
              <p className={cn('text-sm leading-relaxed font-body', isDark ? 'text-[#C0D4C8]' : 'text-[#5C5650]')}>{club.whoShouldJoin}</p>
            </div>
            <div>
              <h3 className={cn('text-xs font-bold uppercase tracking-wider mb-2 font-body', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>Contact</h3>
              <div className={cn('flex items-center gap-2 text-sm font-body', isDark ? 'text-[#C0D4C8]' : 'text-[#5C5650]')}>
                <Mail size={14} className="text-[#1A5E3A]" />
                {club.contactEmail}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'Events' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {(() => {
              const events = getEvents(club.id)
              return events.length > 0 ? events.map((event) => (
                <EventCard key={event.id} event={event} />
              )) : (
                <p className={cn('text-center py-8 text-sm font-body', isDark ? 'text-[#6A7870]' : 'text-[#9AB0A0]')}>No events scheduled yet</p>
              )
            })()}
          </motion.div>
        )}

        {activeTab === 'Members' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {/* Member of the month */}
            {memberOfMonth && (
              <div className="rounded-2xl overflow-hidden mb-4" style={{ background: isDark ? '#23323F' : '#1A5E3A' }}>
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
              <div key={member.id} className={cn('flex items-center gap-3 p-3 rounded-2xl', isDark ? 'bg-[#23323F]' : 'bg-[#FFFFFF] shadow-sm')}>
                <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className={cn('text-sm font-semibold font-body', isDark ? 'text-white' : 'text-[#0D1A12]')}>{member.name}</p>
                  <p className={cn('text-xs font-body', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>{member.role}</p>
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
