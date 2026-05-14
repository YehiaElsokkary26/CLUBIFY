import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, RefreshCw, ChevronRight, Star, Zap } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useNotifications } from '../../hooks/useNotifications'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { EventCard } from '../../components/cards/EventCard'
import { cn, getTimeOfDay } from '../../lib/utils'
import { getUpcomingEvents } from '../../data/events'
import { clubs, getRecruitingClubs } from '../../data/clubs'
import { announcements } from '../../data/announcements'

const spotlight = clubs.find((c) => c.spotlightContent.clubOfWeek)

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
  const memberOfMonth = clubs[0].spotlightContent.memberOfMonth!

  const handleRefresh = async () => {
    setRefreshing(true)
    await new Promise((r) => setTimeout(r, 1200))
    setRefreshing(false)
  }

  const myClubs = user ? clubs.filter((c) => user.joinedClubs.includes(c.id)) : []

  const feedItems = feedFilter === 'All'
    ? announcements
    : feedFilter === 'Announcements'
    ? announcements
    : announcements.filter((a) => user?.joinedClubs.includes(a.clubId))

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
                {user?.name.split(' ')[0] || 'Guest'} 👋
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
              <span className={cn('text-xs font-semibold', isDark ? 'text-gray-300' : 'text-gray-600')}>
                Complete your profile
              </span>
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

        {/* Club Spotlight */}
        {spotlight && spotlight.spotlightContent.clubOfWeek && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative rounded-2xl overflow-hidden h-44 cursor-pointer"
            onClick={() => navigate(`/student/clubs/${spotlight.slug}`)}
          >
            <img src={spotlight.spotlightContent.clubOfWeek.image} alt="spotlight" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute top-3 left-3">
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E07B39] text-white text-xs font-bold">
                <Star size={10} fill="white" />
                Club of the Week
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white text-xl font-black">{spotlight.spotlightContent.clubOfWeek.subtitle}</h3>
              <p className="text-white/80 text-xs mt-0.5">{spotlight.spotlightContent.clubOfWeek.description}</p>
            </div>
          </motion.div>
        )}

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
          <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} compact />
            ))}
          </div>
        </div>

        {/* Member of the Month */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl overflow-hidden"
          style={{ background: isDark ? '#2C2C2E' : '#8B1A1A' }}
        >
          <div className="p-4 flex items-center gap-4">
            <div className="relative">
              <img src={memberOfMonth.avatar} alt={memberOfMonth.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-white/30" />
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#E07B39] flex items-center justify-center">
                <Star size={12} fill="white" className="text-white" />
              </div>
            </div>
            <div className="flex-1">
              <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Member of the Month</span>
              <h3 className="text-white text-base font-black mt-0.5">{memberOfMonth.name}</h3>
              <p className="text-white/70 text-xs">{memberOfMonth.role}</p>
              <p className="text-white/80 text-xs mt-1.5 italic">"{memberOfMonth.quote}"</p>
            </div>
          </div>
        </motion.div>

        {/* News Feed */}
        <div>
          <h2 className={cn('text-base font-black mb-3', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Campus Feed</h2>

          {/* Filter */}
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
                    className={cn('rounded-2xl p-4 shadow-sm', isDark ? 'bg-[#2C2C2E]' : 'bg-white')}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img src={club?.logo} alt={club?.name} className="w-9 h-9 rounded-xl object-cover" />
                      <div>
                        <p className={cn('text-xs font-bold', isDark ? 'text-white' : 'text-[#1C1C1E]')}>{club?.name}</p>
                        <p className={cn('text-[10px]', isDark ? 'text-gray-500' : 'text-gray-400')}>
                          {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <span className="ml-auto flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#8B1A1A]/10 text-[#8B1A1A] text-[10px] font-bold">
                        <Zap size={10} />
                        {item.targetAudience}
                      </span>
                    </div>
                    <h4 className={cn('text-sm font-bold mb-1', isDark ? 'text-white' : 'text-[#1C1C1E]')}>{item.title}</h4>
                    <p className={cn('text-xs leading-relaxed', isDark ? 'text-gray-400' : 'text-gray-500')}>{item.body}</p>
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt="post" className="w-full h-36 object-cover rounded-xl mt-3" loading="lazy" />
                    )}
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
