import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Edit3, Check, X, AlertTriangle, Calendar, BookOpen, Settings } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useToast } from '../../components/shared/Toast'
import { StatusBadge } from '../../components/shared/StatusBadge'
import { cn } from '../../lib/utils'
import { clubs } from '../../data/clubs'
import { getUpcomingEvents } from '../../data/events'

export function Profile() {
  const { user, updateUser } = useAuth()
  const { isDark } = useTheme()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [editingBio, setEditingBio] = useState(false)
  const [bioText, setBioText] = useState(user?.bio || '')

  if (!user) return null

  const myClubs = clubs.filter((c) => user.joinedClubs.includes(c.id))
  const upcomingForMe = getUpcomingEvents(3).filter((e) => user.joinedClubs.includes(e.clubId))

  const saveBio = () => {
    updateUser({ bio: bioText })
    setEditingBio(false)
    toast('Bio updated!', 'success')
  }

  const attendancePercent = user.totalSessions > 0
    ? Math.round((user.attendedSessions / user.totalSessions) * 100)
    : 0

  return (
    <div className="phone-scroll h-[844px] pb-24" style={{ background: isDark ? '#1C1C1E' : '#FAF8F5' }}>
      {/* Header */}
      <div className={cn('pt-12 pb-4 px-5 flex items-center justify-between', isDark ? 'bg-[#1C1C1E]' : 'bg-[#FAF8F5]')}>
        <h1 className={cn('text-2xl font-black', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Profile</h1>
        <button onClick={() => navigate('/student/settings')} className={cn('w-9 h-9 rounded-full flex items-center justify-center', isDark ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm')}>
          <Settings size={18} className={isDark ? 'text-gray-300' : 'text-gray-600'} />
        </button>
      </div>

      <div className="px-5 space-y-5">
        {/* Avatar + info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn('rounded-2xl p-5', isDark ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm')}
        >
          <div className="flex items-start gap-4">
            <div className="relative">
              <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-2xl object-cover" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#8B1A1A] flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">{user.year}</span>
              </div>
            </div>
            <div className="flex-1">
              <h2 className={cn('text-lg font-black', isDark ? 'text-white' : 'text-[#1C1C1E]')}>{user.name}</h2>
              <p className={cn('text-xs font-mono mt-0.5', isDark ? 'text-gray-400' : 'text-gray-500')}>{user.gucId}</p>
              <p className={cn('text-xs mt-1', isDark ? 'text-gray-400' : 'text-gray-500')}>{user.faculty}</p>
              <p className={cn('text-xs', isDark ? 'text-gray-400' : 'text-gray-500')}>Year {user.year}</p>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-4">
            {editingBio ? (
              <div>
                <textarea
                  value={bioText}
                  onChange={(e) => setBioText(e.target.value)}
                  rows={3}
                  className={cn('w-full text-sm rounded-xl p-3 outline-none resize-none border', isDark ? 'bg-[#3A3A3C] text-white border-[#4A4A4C]' : 'bg-gray-50 text-[#1C1C1E] border-gray-200')}
                />
                <div className="flex gap-2 mt-2">
                  <button onClick={saveBio} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#8B1A1A] text-white text-xs font-semibold">
                    <Check size={12} /> Save
                  </button>
                  <button onClick={() => { setEditingBio(false); setBioText(user.bio) }} className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold', isDark ? 'bg-[#3A3A3C] text-gray-300' : 'bg-gray-100 text-gray-600')}>
                    <X size={12} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2">
                <p className={cn('flex-1 text-sm leading-relaxed', isDark ? 'text-gray-300' : 'text-gray-600')}>
                  {user.bio || 'Add a bio to tell others about yourself...'}
                </p>
                <button onClick={() => setEditingBio(true)}>
                  <Edit3 size={15} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                </button>
              </div>
            )}
          </div>

          {/* Profile completion bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Profile completion</span>
              <span className="font-bold text-[#8B1A1A]">{user.profileCompletion}%</span>
            </div>
            <div className={cn('h-2 rounded-full overflow-hidden', isDark ? 'bg-[#3A3A3C]' : 'bg-gray-100')}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${user.profileCompletion}%` }}
                transition={{ duration: 0.8 }}
                className="h-full rounded-full bg-[#8B1A1A]"
              />
            </div>
          </div>
        </motion.div>

        {/* Attendance tracker */}
        <div className={cn('rounded-2xl p-4', isDark ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm')}>
          <h3 className={cn('text-sm font-bold mb-3', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Attendance</h3>
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke={isDark ? '#3A3A3C' : '#F0EDE8'} strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15.9" fill="none"
                  stroke="#8B1A1A" strokeWidth="3"
                  strokeDasharray={`${attendancePercent} 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={cn('text-xs font-black', isDark ? 'text-white' : 'text-[#1C1C1E]')}>{attendancePercent}%</span>
              </div>
            </div>
            <div>
              <p className={cn('text-2xl font-black', isDark ? 'text-white' : 'text-[#1C1C1E]')}>
                {user.attendedSessions}
                <span className={cn('text-base font-medium', isDark ? 'text-gray-400' : 'text-gray-400')}>/{user.totalSessions}</span>
              </p>
              <p className={cn('text-xs', isDark ? 'text-gray-400' : 'text-gray-500')}>sessions attended</p>
            </div>
          </div>
        </div>

        {/* My Clubs */}
        {myClubs.length > 0 && (
          <div className={cn('rounded-2xl p-4', isDark ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm')}>
            <h3 className={cn('text-sm font-bold mb-3', isDark ? 'text-white' : 'text-[#1C1C1E]')}>My Clubs</h3>
            <div className="flex flex-wrap gap-2">
              {myClubs.map((club) => (
                <div key={club.id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#8B1A1A]/10">
                  <img src={club.logo} alt={club.name} className="w-4 h-4 rounded-full object-cover" />
                  <span className="text-xs font-semibold text-[#8B1A1A]">{club.name.replace('GUC ', '')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Warnings */}
        {user.warnings.length > 0 && (
          <div className="rounded-2xl p-4 bg-amber-50 border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={16} className="text-amber-600" />
              <h3 className="text-sm font-bold text-amber-800">Warnings ({user.warnings.length})</h3>
            </div>
            {user.warnings.map((w, i) => (
              <p key={i} className="text-xs text-amber-700 leading-relaxed">{w}</p>
            ))}
          </div>
        )}

        {/* Upcoming activities */}
        {upcomingForMe.length > 0 && (
          <div>
            <h3 className={cn('text-sm font-bold mb-3', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Upcoming Activities</h3>
            <div className="space-y-2">
              {upcomingForMe.map((event) => (
                <div key={event.id} className={cn('flex items-center gap-3 p-3 rounded-xl', isDark ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm')}>
                  <div className="w-10 h-10 rounded-xl bg-[#8B1A1A]/10 flex items-center justify-center">
                    <Calendar size={16} className="text-[#8B1A1A]" />
                  </div>
                  <div className="flex-1">
                    <p className={cn('text-xs font-semibold', isDark ? 'text-white' : 'text-[#1C1C1E]')}>{event.title}</p>
                    <p className={cn('text-[10px]', isDark ? 'text-gray-400' : 'text-gray-500')}>{event.date} · {event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
