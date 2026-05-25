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
    <div className="phone-scroll h-[844px] pb-24" style={{ background: isDark ? '#1C1C1E' : '#FAF8F5' }}>
      {/* Top bar */}
      <div className={cn('sticky top-0 z-20 px-5 pt-12 pb-3', isDark ? 'bg-[#1C1C1E]' : 'bg-[#FAF8F5]')}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest'}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className={cn('text-xs', isDark ? 'text-gray-400' : 'text-gray-500')}>Good {getTimeOfDay()},</p>
              <p className={cn('text-base font-bold', isDark ? 'text-white' : 'text-[#1C1C1E]')}>
                {user?.nickname || user?.name.split(' ')[0] || 'Guest'} 👋
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/student/notifications')}
            className={cn('relative w-10 h-10 rounded-full flex items-center justify-center', isDark ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm')}
          >
            <Bell size={20} className={isDark ? 'text-white' : 'text-[#1C1C1E]'} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#8B1A1A] text-white text-[10px] font-bold flex items-center justify-center">
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
            className={cn('rounded-2xl p-4', isDark ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm')}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={cn('text-xs font-semibold', isDark ? 'text-gray-300' : 'text-gray-600')}>Complete your profile</span>
              <span className="text-xs font-bold text-[#8B1A1A]">{user.profileCompletion}%</span>
            </div>
            <div className={cn('h-2 rounded-full overflow-hidden', isDark ? 'bg-[#3A3A3C]' : 'bg-gray-100')}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${user.profileCompletion}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-full rounded-full bg-[#8B1A1A]"
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
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-[#8B1A1A] shadow-lg"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-white pulse-dot flex-shrink-0" />
            <span className="text-white text-sm font-bold flex-1 text-left">
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
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E07B39] text-white text-xs font-bold">
              <Star size={10} fill="white" />
              Club of the Week
            </span>
            <span className={cn('px-2 py-1 rounded-full text-[10px] font-bold', 'bg-white/20 text-white')}>
              Auto-selected
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end gap-3">
            <img src={cotw.logo} alt={cotw.name} className="w-12 h-12 rounded-xl object-cover border-2 border-white/30 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="text-white text-base font-black leading-tight">{cotw.name}</h3>
              <p className="text-white/75 text-xs mt-0.5 line-clamp-2">{cotw.description.split(' — ')[1] || cotw.description}</p>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-white/60 text-[10px]">{cotw.memberCount} members</span>
                <span className="text-white/60 text-[10px]">{cotw.events.length} events</span>
                {cotw.isRecruiting && <span className="text-green-400 text-[10px] font-bold">● Recruiting</span>}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className={cn('text-base font-black', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Upcoming Events</h2>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className={cn('w-8 h-8 rounded-full flex items-center justify-center', isDark ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm')}
            >
              <RefreshCw size={14} className={cn(isDark ? 'text-gray-400' : 'text-gray-500', refreshing && 'animate-spin')} />
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
          <h2 className={cn('text-base font-black mb-3', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Highlights</h2>
          <div className="grid grid-cols-2 gap-2">
            {highlights.map(({ club, event }) => (
              <motion.div
                key={club.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/student/clubs/${club.slug}`)}
                className={cn('rounded-2xl p-3 cursor-pointer', isDark ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm')}
              >
                <div className="flex items-center gap-2 mb-2">
                  <img src={club.logo} alt={club.name} className="w-8 h-8 rounded-lg object-cover" />
                  <p className={cn('text-xs font-bold leading-tight line-clamp-2 flex-1', isDark ? 'text-white' : 'text-[#1C1C1E]')}>
                    {club.name.replace('GUC ', '')}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={10} className="text-[#8B1A1A] flex-shrink-0" />
                  <p className={cn('text-[10px] line-clamp-1', isDark ? 'text-gray-400' : 'text-gray-500')}>
                    {event.title}
                  </p>
                </div>
                <p className="text-[10px] text-[#8B1A1A] font-semibold mt-1">{formatDateShort(event.date)}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Member of the Month — carousel across all clubs */}
        <div>
          <h2 className={cn('text-base font-black mb-3', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Members of the Month</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 events-hscroll">
            {membersOfMonth.map(({ club, member }) => (
              <motion.div
                key={club.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/student/clubs/${club.slug}`)}
                className={cn('flex-shrink-0 w-44 rounded-2xl p-3 cursor-pointer', isDark ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm')}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="relative">
                    <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#E07B39] flex items-center justify-center">
                      <Star size={9} fill="white" className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn('text-xs font-bold leading-tight', isDark ? 'text-white' : 'text-[#1C1C1E]')}>{member.name}</p>
                    <p className={cn('text-[10px] leading-tight mt-0.5', isDark ? 'text-gray-400' : 'text-gray-500')}>{member.role}</p>
                  </div>
                </div>
                <p className={cn('text-[10px] italic line-clamp-2 mb-1.5', isDark ? 'text-gray-400' : 'text-gray-500')}>"{member.quote}"</p>
                <div className="flex items-center gap-1.5">
                  <img src={club.logo} alt={club.name} className="w-4 h-4 rounded-md object-cover" />
                  <p className="text-[10px] font-semibold text-[#8B1A1A] line-clamp-1">{club.name.replace('GUC ', '')}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Campus Feed */}
        <div>
          <h2 className={cn('text-base font-black mb-3', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Campus Feed</h2>

          <div className="flex gap-2 mb-3">
            {(['All', 'My Clubs', 'Announcements'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFeedFilter(f)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-semibold transition-all',
                  feedFilter === f ? 'bg-[#8B1A1A] text-white' : isDark ? 'bg-[#2C2C2E] text-gray-400' : 'bg-white text-gray-500 shadow-sm'
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
                    className={cn('rounded-2xl shadow-sm cursor-pointer transition-shadow hover:shadow-md overflow-hidden', isDark ? 'bg-[#2C2C2E]' : 'bg-white')}
                  >
                    {/* Club header banner */}
                    <div className={cn('flex items-center gap-3 px-4 py-3 border-b', isDark ? 'border-[#3A3A3C] bg-[#252527]' : 'border-gray-100 bg-gray-50')}>
                      <img src={club?.logo} alt={club?.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className={cn('text-sm font-bold truncate', isDark ? 'text-white' : 'text-[#1C1C1E]')}>{club?.name}</p>
                        <p className={cn('text-[10px]', isDark ? 'text-gray-500' : 'text-gray-400')}>
                          {club?.category} · {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#8B1A1A]/10 text-[#8B1A1A] text-[10px] font-bold flex-shrink-0">
                        <Zap size={10} />
                        {item.targetAudience}
                      </span>
                    </div>
                    <div className="px-4 py-3">
                      <h4 className={cn('text-sm font-bold mb-1', isDark ? 'text-white' : 'text-[#1C1C1E]')}>{item.title}</h4>
                      <p className={cn('text-xs leading-relaxed', isDark ? 'text-gray-400' : 'text-gray-500')}>{item.body}</p>
                      {item.imageUrl && (
                        <img src={item.imageUrl} alt="post" className="w-full h-36 object-cover rounded-xl mt-3" loading="lazy" />
                      )}
                    </div>
                  </motion.div>
                )
              }) : (
                <div className={cn('text-center py-8 text-sm', isDark ? 'text-gray-500' : 'text-gray-400')}>
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
