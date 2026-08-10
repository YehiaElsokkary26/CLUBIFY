import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, RefreshCw, ChevronRight, Star, Zap, Calendar } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useNotifications } from '../../hooks/useNotifications'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { EventCard } from '../../components/cards/EventCard'
import { cn, getTimeOfDay, formatDateShort } from '../../lib/utils'
import { getUpcomingEvents } from '../../data/events'
import { clubs, getRecruitingClubs, computeClubOfWeek, getClubHighlights, getAllMembersOfMonth } from '../../data/clubs'
import { announcements } from '../../data/announcements'

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
    ? announcements.filter((a) => user?.joinedClubs.includes(a.clubId))
    : announcements

  return (
    <div className="phone-scroll h-[844px] pb-24" style={{ background: isDark ? '#272831' : '#F5F5F6' }}>
      {/* Top bar */}
      <div className={cn('sticky top-0 z-20 px-5 pt-12 pb-3', isDark ? 'bg-[#272831]' : 'bg-[#F5F5F6]')}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest'}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className={cn('text-xs font-body', isDark ? 'text-[#929397]' : 'text-[#929397]')}>Good {getTimeOfDay()},</p>
              <p className={cn('text-base font-bold font-body', isDark ? 'text-white' : 'text-[#272831]')}>
                {user?.nickname || user?.name?.split(' ')[0] || 'Guest'}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/student/notifications')}
            className={cn('relative w-10 h-10 rounded-full flex items-center justify-center', isDark ? 'bg-[#272831]' : 'bg-[#FFFFFF] shadow-sm')}
          >
            <Bell size={20} className={isDark ? 'text-white' : 'text-[#272831]'} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FDA014] text-white text-[10px] font-bold font-body flex items-center justify-center">
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
            className={cn('rounded-2xl p-4', isDark ? 'bg-[#272831]' : 'bg-[#FFFFFF] shadow-sm')}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={cn('text-xs font-semibold font-body', isDark ? 'text-[#B8B9C1]' : 'text-[#6B6C72]')}>Complete your profile</span>
              <span className="text-xs font-bold font-body text-[#FDA014]">{user.profileCompletion}%</span>
            </div>
            <div className={cn('h-2 rounded-full overflow-hidden', isDark ? 'bg-[#35363F]' : 'bg-[#F0F0F2]')}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${user.profileCompletion}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-full rounded-full bg-[#FDA014]"
              />
            </div>
          </motion.div>
        )}

        {/* Recruitment Alert */}
        {recruitingClubs.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/student/recruit')}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-[#6F2F33] shadow-lg"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFFFFF] pulse-dot flex-shrink-0" />
            <span className="text-white text-sm font-bold font-body flex-1 text-left">
              {recruitingClubs.length} clubs are recruiting now!
            </span>
            <ChevronRight size={16} className="text-white/70" />
          </motion.button>
        )}

        {/* Club of the Week — fully automated */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative rounded-2xl overflow-hidden h-48 cursor-pointer"
          onClick={() => navigate(`/student/clubs/${cotw.slug}`)}
        >
          <img src={cotw.coverImage} alt={cotw.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FDA014] text-white text-xs font-bold font-body">
              <Star size={10} fill="white" />
              Club of the Week
            </span>
            <span className="px-2 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold font-body">
              Auto-selected
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end gap-3">
            <img
              src={cotw.logo}
              alt={cotw.name}
              className="w-12 h-12 rounded-xl object-cover border-2 border-white/30 flex-shrink-0"
              onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/shapes/svg?seed=${cotw.slug}` }}
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-white text-base font-black font-display tracking-wide leading-tight">{cotw.name}</h3>
              <p className="text-white/75 text-xs mt-0.5 line-clamp-2 font-body">{cotw.description.split(' — ')[1] || cotw.description}</p>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-white/60 text-[10px] font-body">{cotw.memberCount} members</span>
                <span className="text-white/60 text-[10px] font-body">{cotw.events.length} events</span>
                {cotw.isRecruiting && <span className="text-green-400 text-[10px] font-bold font-body">● Recruiting</span>}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className={cn('text-base font-black font-display tracking-wide', isDark ? 'text-white' : 'text-[#272831]')}>Upcoming Events</h2>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className={cn('w-8 h-8 rounded-full flex items-center justify-center', isDark ? 'bg-[#272831]' : 'bg-[#FFFFFF] shadow-sm')}
            >
              <RefreshCw size={14} className={cn(isDark ? 'text-[#929397]' : 'text-[#929397]', refreshing && 'animate-spin')} />
            </motion.button>
          </div>
          <div className="events-hscroll flex gap-3 overflow-x-auto pb-3">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} compact />
            ))}
          </div>
        </div>

        {/* Highlights — clubs with upcoming events */}
        <div>
          <h2 className={cn('text-base font-black font-display tracking-wide mb-3', isDark ? 'text-white' : 'text-[#272831]')}>Highlights</h2>
          <div className="grid grid-cols-2 gap-2">
            {highlights.map(({ club, event }) => (
              <motion.div
                key={club.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/student/clubs/${club.slug}`)}
                className={cn('rounded-2xl p-3 cursor-pointer', isDark ? 'bg-[#272831]' : 'bg-[#FFFFFF] shadow-sm')}
              >
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={club.logo}
                    alt={club.name}
                    className="w-8 h-8 rounded-lg object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/shapes/svg?seed=${club.slug}` }}
                  />
                  <p className={cn('text-xs font-bold leading-tight line-clamp-2 flex-1 font-body', isDark ? 'text-white' : 'text-[#272831]')}>
                    {club.name.replace('GUC ', '')}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={10} className="text-[#FDA014] flex-shrink-0" />
                  <p className={cn('text-[10px] line-clamp-1 font-body', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
                    {event.title}
                  </p>
                </div>
                <p className="text-[10px] text-[#FDA014] font-semibold font-body mt-1">{formatDateShort(event.date)}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Members of the Month — carousel */}
        <div>
          <h2 className={cn('text-base font-black font-display tracking-wide mb-3', isDark ? 'text-white' : 'text-[#272831]')}>Members of the Month</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 events-hscroll">
            {membersOfMonth.map(({ club, member }) => (
              <motion.div
                key={club.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/student/clubs/${club.slug}`)}
                className={cn('flex-shrink-0 w-44 rounded-2xl p-3 cursor-pointer', isDark ? 'bg-[#272831]' : 'bg-[#FFFFFF] shadow-sm')}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="relative">
                    <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FDA014] flex items-center justify-center">
                      <Star size={9} fill="white" className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn('text-xs font-bold leading-tight font-body', isDark ? 'text-white' : 'text-[#272831]')}>{member.name}</p>
                    <p className={cn('text-[10px] leading-tight mt-0.5 font-body', isDark ? 'text-[#929397]' : 'text-[#929397]')}>{member.role}</p>
                  </div>
                </div>
                <p className={cn('text-[10px] italic line-clamp-2 mb-1.5 font-body', isDark ? 'text-[#929397]' : 'text-[#929397]')}>"{member.quote}"</p>
                <div className="flex items-center gap-1.5">
                  <img
                    src={club.logo}
                    alt={club.name}
                    className="w-4 h-4 rounded-md object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/shapes/svg?seed=${club.slug}` }}
                  />
                  <p className="text-[10px] font-semibold text-[#FDA014] font-body line-clamp-1">{club.name.replace('GUC ', '')}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Campus Feed */}
        <div>
          <h2 className={cn('text-base font-black font-display tracking-wide mb-3', isDark ? 'text-white' : 'text-[#272831]')}>Campus Feed</h2>

          <div className="flex gap-2 mb-3">
            {(['All', 'My Clubs', 'Announcements'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFeedFilter(f)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-semibold font-body transition-all',
                  feedFilter === f ? 'bg-[#6F2F33] text-white' : isDark ? 'bg-[#272831] text-[#929397]' : 'bg-[#FFFFFF] text-[#929397] shadow-sm'
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {feedItems.length > 0 ? feedItems.map((item, i) => {
                const club = clubs.find((c) => c.id === item.clubId)
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => club && navigate(`/student/clubs/${club.slug}`)}
                    className={cn('rounded-2xl p-4 shadow-sm cursor-pointer transition-shadow hover:shadow-md', isDark ? 'bg-[#272831]' : 'bg-[#FFFFFF]')}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={club?.logo}
                        alt={club?.name}
                        className="w-9 h-9 rounded-xl object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/shapes/svg?seed=${club?.slug}` }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className={cn('text-xs font-bold font-body truncate', isDark ? 'text-white' : 'text-[#272831]')}>{club?.name}</p>
                        <p className={cn('text-[10px] font-mono', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
                          {club?.category} · {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FDA014]/10 text-[#FDA014] text-[10px] font-bold font-body flex-shrink-0">
                        <Zap size={10} />
                        {item.targetAudience}
                      </span>
                    </div>
                    <h4 className={cn('text-sm font-bold font-body mb-1', isDark ? 'text-white' : 'text-[#272831]')}>{item.title}</h4>
                    <p className={cn('text-xs leading-relaxed font-body', isDark ? 'text-[#929397]' : 'text-[#929397]')}>{item.body}</p>
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt="post" className="w-full h-36 object-cover rounded-xl mt-3" loading="lazy" />
                    )}
                  </motion.div>
                )
              }) : (
                <div className={cn('text-center py-8 text-sm font-body', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
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
