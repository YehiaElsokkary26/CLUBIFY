import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, RefreshCw, ChevronRight, Star, Zap, Calendar, Plus } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useNotifications } from '../../hooks/useNotifications'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { EventCard } from '../../components/cards/EventCard'
import { cn, getTimeOfDay, formatDateShort } from '../../lib/utils'
import { getUpcomingEvents } from '../../data/events'
import { clubs, getRecruitingClubs, computeClubOfWeek, getClubHighlights, getAllMembersOfMonth } from '../../data/clubs'
import { announcementPool as announcements } from '../../data/announcements'
import type { Announcement } from '../../data/types'

function categoryEmoji(category: string): string {
  const map: Record<string, string> = {
    Technology: '💻', Sports: '🏀', Academic: '📚', Community: '🤝',
    Media: '📸', Arts: '🎨', Music: '🎸', Engineering: '⚙️', Business: '💼',
    Science: '🔬', Health: '🏃', Environment: '🌱', Gaming: '🎮',
  }
  return map[category] ?? '🎓'
}

export function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { isDark } = useTheme()
  const { unreadCount } = useNotifications()
  const [feedFilter, setFeedFilter] = useState<'All' | 'My Clubs' | 'Announcements'>('All')
  const [refreshing, setRefreshing] = useState(false)
  const [favs] = useLocalStorage<string[]>('clubify_favorites', [])

  const upcomingEvents = getUpcomingEvents(6)
  const recruitingClubs = getRecruitingClubs()
  const cotw = computeClubOfWeek()
  const highlights = getClubHighlights(4)
  const membersOfMonth = getAllMembersOfMonth().slice(0, 6)

  const handleRefresh = async () => {
    setRefreshing(true)
    await new Promise((r) => setTimeout(r, 1200))
    setRefreshing(false)
  }

  const feedItems = feedFilter === 'My Clubs'
    ? announcements.filter((a: Announcement) => user?.joinedClubs.includes(a.clubId))
    : announcements

  return (
    <div className="phone-scroll h-[844px] pb-24" style={{ background: isDark ? '#0D1A12' : '#F4FBF6' }}>
      {/* Top bar */}
      <div className={cn('sticky top-0 z-20 px-5 pt-12 pb-3', isDark ? 'bg-[#0D1A12]' : 'bg-[#F4FBF6]')}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest'}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className={cn('text-xs font-body', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>Good {getTimeOfDay()},</p>
              <p className={cn('text-base font-bold font-body', isDark ? 'text-white' : 'text-[#0D1A12]')}>
                {user?.nickname || user?.name?.split(' ')[0] || 'Guest'} 👋
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/student/notifications')}
            className={cn('relative w-10 h-10 rounded-full flex items-center justify-center', isDark ? 'bg-[#23323F]' : 'bg-[#FFFFFF] shadow-sm')}
          >
            <Bell size={20} className={isDark ? 'text-white' : 'text-[#0D1A12]'} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#1A5E3A] text-white text-[10px] font-bold font-body flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="px-5 space-y-5">
        {/* Profile completion */}
        {user && user.profileCompletion < 100 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn('rounded-2xl p-4', isDark ? 'bg-[#23323F]' : 'bg-[#FFFFFF] shadow-sm')}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={cn('text-xs font-semibold font-body', isDark ? 'text-[#C0D4C8]' : 'text-[#5C5650]')}>Complete your profile</span>
              <span className="text-xs font-bold font-body text-[#1A5E3A]">{user.profileCompletion}%</span>
            </div>
            <div className={cn('h-2 rounded-full overflow-hidden', isDark ? 'bg-[#2d3d4a]' : 'bg-[#EEF7F2]')}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${user.profileCompletion}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-full rounded-full bg-[#1A5E3A]"
              />
            </div>
          </motion.div>
        )}

        {/* Recruitment Alert — coral */}
        {recruitingClubs.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/student/recruit')}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl shadow-lg"
            style={{ background: '#FF5230' }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-white/80 pulse-dot flex-shrink-0" />
            <div className="flex-1 text-left">
              <p className="text-white text-sm font-bold font-body leading-tight">
                {recruitingClubs.length} clubs are recruiting
              </p>
              <p className="text-white/75 text-[11px] font-body">Deadlines closing soon</p>
            </div>
            <ChevronRight size={16} className="text-white/70" />
          </motion.button>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className={cn('rounded-2xl p-4', isDark ? 'bg-[#122018]' : 'bg-[#FFFFFF]')} style={{ boxShadow: isDark ? 'none' : '0 1px 4px rgba(13,26,18,0.08)' }}>
            <p className="text-3xl font-black font-display text-[#1A5E3A] leading-none">{user?.joinedClubs?.length ?? 0}</p>
            <p className={cn('text-[10px] font-semibold uppercase tracking-widest mt-1 font-body', isDark ? 'text-[#7A9080]' : 'text-[#6A7870]')}>Clubs Joined</p>
          </div>
          <div className={cn('rounded-2xl p-4', isDark ? 'bg-[#122018]' : 'bg-[#FFFFFF]')} style={{ boxShadow: isDark ? 'none' : '0 1px 4px rgba(13,26,18,0.08)' }}>
            <p className="text-3xl font-black font-display leading-none" style={{ color: '#FF5230' }}>{user?.attendedSessions ?? 0}</p>
            <p className={cn('text-[10px] font-semibold uppercase tracking-widest mt-1 font-body', isDark ? 'text-[#7A9080]' : 'text-[#6A7870]')}>Events Attended</p>
          </div>
        </div>

        {/* Club Spotlight — compact card */}
        <div>
          <p className={cn('text-[10px] font-semibold uppercase tracking-widest mb-2 font-body', isDark ? 'text-[#7A9080]' : 'text-[#6A7870]')}>Club Spotlight</p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/student/clubs/${cotw.slug}`)}
            className={cn('rounded-2xl p-4 flex items-center gap-3 cursor-pointer border', isDark ? 'bg-[#122018] border-[#2A4035]' : 'bg-[#FFFFFF] border-[#C8E0D0]')}
            style={{ boxShadow: isDark ? 'none' : '0 1px 4px rgba(13,26,18,0.08)' }}
          >
            <div className="w-12 h-12 rounded-xl bg-[#E6F4EC] flex items-center justify-center flex-shrink-0 text-2xl">
              {categoryEmoji(cotw.category)}
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn('text-sm font-bold font-body leading-tight', isDark ? 'text-white' : 'text-[#0D1A12]')}>{cotw.name}</p>
              <p className={cn('text-[11px] font-body mt-0.5', isDark ? 'text-[#7A9080]' : 'text-[#6A7870]')}>
                {cotw.memberCount} members{cotw.committees.length > 0 ? ` · ${cotw.committees.length} committees` : ''}
              </p>
              {cotw.isRecruiting && (
                <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold font-body" style={{ background: 'rgba(255,82,48,0.1)', color: '#FF5230' }}>
                  Apply Now
                </span>
              )}
            </div>
            <ChevronRight size={16} className={isDark ? 'text-[#7A9080]' : 'text-[#9AB0A0]'} />
          </motion.div>
        </div>

        {/* Upcoming Events */}
        <div>
          {/* Date header — styled like the image */}
          <div className={cn('rounded-2xl p-4 mb-3', isDark ? 'bg-[#23323F]' : 'bg-[#FFFFFF] shadow-sm')}>
            <div className="flex items-start justify-between">
              <div>
                <p className={cn('text-[11px] font-semibold uppercase tracking-widest font-mono mb-0.5', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>
                  {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
                </p>
                <div className="flex items-baseline gap-3">
                  <span className={cn('text-5xl font-black font-display leading-none', isDark ? 'text-white' : 'text-[#0D1A12]')}>
                    {new Date().getDate()}
                  </span>
                  <span className={cn('text-base font-bold font-display uppercase tracking-wide', isDark ? 'text-white/60' : 'text-[#6A7870]')}>
                    {new Date().toLocaleDateString('en-US', { month: 'long' })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRefresh}
                  className={cn('w-8 h-8 rounded-full flex items-center justify-center', isDark ? 'bg-[#2d3d4a]' : 'bg-[#EEF7F2]')}
                >
                  <RefreshCw size={13} className={cn(isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]', refreshing && 'animate-spin')} />
                </motion.button>
                <div className={cn('w-8 h-8 rounded-full flex items-center justify-center bg-[#7B2D33]')}>
                  <Plus size={14} className="text-white" />
                </div>
              </div>
            </div>

            {/* Filter chips */}
            <div className="flex gap-2 mt-3">
              {(['Today', 'Tomorrow', 'All'] as const).map((f, i) => (
                <span
                  key={f}
                  className={cn(
                    'px-3 py-1 rounded-full text-[11px] font-bold font-body',
                    i === 0
                      ? isDark ? 'bg-white text-[#0D1A12]' : 'bg-[#0D1A12] text-white'
                      : isDark ? 'bg-[#2d3d4a] text-[#9AB0A0]' : 'bg-[#EEF7F2] text-[#5C5650]'
                  )}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {upcomingEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Highlights — clubs with upcoming events */}
        <div>
          <h2 className={cn('text-base font-black font-display tracking-wide mb-3', isDark ? 'text-white' : 'text-[#0D1A12]')}>Highlights</h2>
          <div className="grid grid-cols-2 gap-2">
            {highlights.map(({ club, event }) => (
              <motion.div
                key={club.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/student/clubs/${club.slug}`)}
                className={cn('rounded-2xl p-3 cursor-pointer', isDark ? 'bg-[#23323F]' : 'bg-[#FFFFFF] shadow-sm')}
              >
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={club.logo}
                    alt={club.name}
                    className="w-8 h-8 rounded-lg object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/shapes/svg?seed=${club.slug}` }}
                  />
                  <p className={cn('text-xs font-bold leading-tight line-clamp-2 flex-1 font-body', isDark ? 'text-white' : 'text-[#0D1A12]')}>
                    {club.name.replace('GUC ', '')}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={10} className="text-[#1A5E3A] flex-shrink-0" />
                  <p className={cn('text-[10px] line-clamp-1 font-body', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>
                    {event.title}
                  </p>
                </div>
                <p className="text-[10px] text-[#1A5E3A] font-semibold font-body mt-1">{formatDateShort(event.date)}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Members of the Month — carousel */}
        <div>
          <h2 className={cn('text-base font-black font-display tracking-wide mb-3', isDark ? 'text-white' : 'text-[#0D1A12]')}>Members of the Month</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 events-hscroll">
            {membersOfMonth.map(({ club, member }) => (
              <motion.div
                key={club.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/student/clubs/${club.slug}`)}
                className={cn('flex-shrink-0 w-44 rounded-2xl p-3 cursor-pointer', isDark ? 'bg-[#23323F]' : 'bg-[#FFFFFF] shadow-sm')}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="relative">
                    <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C99B2E] flex items-center justify-center">
                      <Star size={9} fill="white" className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn('text-xs font-bold leading-tight font-body', isDark ? 'text-white' : 'text-[#0D1A12]')}>{member.name}</p>
                    <p className={cn('text-[10px] leading-tight mt-0.5 font-body', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>{member.role}</p>
                  </div>
                </div>
                <p className={cn('text-[10px] italic line-clamp-2 mb-1.5 font-body', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>"{member.quote}"</p>
                <div className="flex items-center gap-1.5">
                  <img
                    src={club.logo}
                    alt={club.name}
                    className="w-4 h-4 rounded-md object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/shapes/svg?seed=${club.slug}` }}
                  />
                  <p className="text-[10px] font-semibold text-[#1A5E3A] font-body line-clamp-1">{club.name.replace('GUC ', '')}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Campus Feed */}
        <div>
          <h2 className={cn('text-base font-black font-display tracking-wide mb-3', isDark ? 'text-white' : 'text-[#0D1A12]')}>Campus Feed</h2>

          <div className="flex gap-2 mb-3">
            {(['All', 'My Clubs', 'Announcements'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFeedFilter(f)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-semibold font-body transition-all',
                  feedFilter === f ? 'bg-[#1A5E3A] text-white' : isDark ? 'bg-[#23323F] text-[#9AB0A0]' : 'bg-[#FFFFFF] text-[#6A7870] shadow-sm'
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {feedItems.length > 0 ? feedItems.map((item: Announcement, i: number) => {
                const club = clubs.find((c) => c.id === item.clubId)
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => club && navigate(`/student/clubs/${club.slug}`)}
                    className={cn('rounded-2xl p-4 shadow-sm cursor-pointer transition-shadow hover:shadow-md', isDark ? 'bg-[#23323F]' : 'bg-[#FFFFFF]')}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={club?.logo}
                        alt={club?.name}
                        className="w-9 h-9 rounded-xl object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/shapes/svg?seed=${club?.slug}` }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className={cn('text-xs font-bold font-body truncate', isDark ? 'text-white' : 'text-[#0D1A12]')}>{club?.name}</p>
                        <p className={cn('text-[10px] font-mono', isDark ? 'text-[#6A7870]' : 'text-[#9AB0A0]')}>
                          {club?.category} · {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1A5E3A]/10 text-[#1A5E3A] text-[10px] font-bold font-body flex-shrink-0">
                        <Zap size={10} />
                        {item.targetAudience}
                      </span>
                    </div>
                    <h4 className={cn('text-sm font-bold font-body mb-1', isDark ? 'text-white' : 'text-[#0D1A12]')}>{item.title}</h4>
                    <p className={cn('text-xs leading-relaxed font-body', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>{item.body}</p>
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt="post" className="w-full h-36 object-cover rounded-xl mt-3" loading="lazy" />
                    )}
                  </motion.div>
                )
              }) : (
                <div className={cn('text-center py-8 text-sm font-body', isDark ? 'text-[#6A7870]' : 'text-[#9AB0A0]')}>
                  {feedFilter === 'My Clubs' ? 'Join clubs to see their posts here' : 'No posts yet'}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
