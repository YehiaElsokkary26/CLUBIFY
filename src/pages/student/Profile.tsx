import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Edit3, Check, X, AlertTriangle, Calendar, Settings, Camera, Upload, Trash2 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useToast } from '../../components/shared/Toast'
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
  const [showNicknameModal, setShowNicknameModal] = useState(false)
  const [nicknameText, setNicknameText] = useState(user?.nickname || '')
  const [showPhotoMenu, setShowPhotoMenu] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  if (!user) return null

  const myClubs = clubs.filter((c) => user.joinedClubs.includes(c.id))
  const upcomingForMe = getUpcomingEvents(3).filter((e) => user.joinedClubs.includes(e.clubId))

  const saveBio = () => {
    updateUser({ bio: bioText })
    setEditingBio(false)
    toast('Bio updated!', 'success')
  }

  const saveNickname = () => {
    updateUser({ nickname: nicknameText.trim() || undefined })
    setShowNicknameModal(false)
    toast('Nickname updated!', 'success')
  }

  const openNicknameModal = () => {
    setNicknameText(user?.nickname || '')
    setShowNicknameModal(true)
  }

  const handlePhotoFile = (file: File | null | undefined) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      updateUser({ avatar: reader.result as string })
      toast('Photo updated!', 'success')
    }
    reader.readAsDataURL(file)
    setShowPhotoMenu(false)
  }

  const removePhoto = () => {
    updateUser({ avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id || 'user'}` })
    setShowPhotoMenu(false)
    toast('Photo removed', 'info')
  }

  const attendancePercent = user.totalSessions > 0
    ? Math.round((user.attendedSessions / user.totalSessions) * 100)
    : 0

  return (
    <div className="phone-scroll h-[844px] pb-24" style={{ background: isDark ? '#18181B' : '#F4F4F5' }}>
      {/* Header */}
      <div className={cn('pt-12 pb-4 px-5 flex items-center justify-between', isDark ? 'bg-[#18181B]' : 'bg-[#F4F4F5]')}>
        <h1 className={cn('text-2xl font-black font-display tracking-wide', isDark ? 'text-white' : 'text-[#27272A]')}>Profile</h1>
        <button onClick={() => navigate('/student/settings')} className={cn('w-9 h-9 rounded-full flex items-center justify-center', isDark ? 'bg-[#27272A]' : 'bg-white shadow-sm')}>
          <Settings size={18} className={isDark ? 'text-zinc-300' : 'text-zinc-600'} />
        </button>
      </div>

      <div className="px-5 space-y-5">
        {/* Avatar + info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn('rounded-2xl p-5', isDark ? 'bg-[#27272A]' : 'bg-white shadow-sm')}
        >
          <div className="flex items-start gap-4">
            <button onClick={() => setShowPhotoMenu(true)} className="relative group" aria-label="Change photo">
              <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-2xl object-cover" />
              <div className="absolute inset-0 rounded-2xl bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <Camera size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0891B2] flex items-center justify-center">
                <span className="text-white text-[10px] font-bold font-body">{user.year}</span>
              </div>
              <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center border border-zinc-200">
                <Camera size={11} className="text-[#0891B2]" />
              </div>
            </button>
            <div className="flex-1">
              <h2 className={cn('text-lg font-black font-display tracking-wide', isDark ? 'text-white' : 'text-[#27272A]')}>{user.name}</h2>
              <button
                onClick={openNicknameModal}
                className={cn(
                  'mt-0.5 flex items-center gap-1.5 text-xs rounded-md px-1.5 py-0.5 -mx-1.5 transition-colors',
                  isDark ? 'hover:bg-[#3F3F46]' : 'hover:bg-zinc-100'
                )}
              >
                {user.nickname ? (
                  <span className={cn('italic font-body', isDark ? 'text-zinc-300' : 'text-zinc-600')}>"{user.nickname}"</span>
                ) : (
                  <span className={cn('font-semibold font-body', isDark ? 'text-[#0891B2]' : 'text-[#0891B2]')}>+ Add nickname</span>
                )}
                <Edit3 size={10} className={isDark ? 'text-zinc-500' : 'text-zinc-400'} />
              </button>
              <p className={cn('text-xs font-mono mt-0.5 font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>{user.gucId}</p>
              <p className={cn('text-xs mt-1 font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>{user.faculty}</p>
              <p className={cn('text-xs font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>Year {user.year}</p>
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
                  className={cn('w-full text-sm rounded-xl p-3 outline-none resize-none border font-body', isDark ? 'bg-[#3F3F46] text-white border-[#52525B]' : 'bg-zinc-50 text-[#27272A] border-zinc-200')}
                />
                <div className="flex gap-2 mt-2">
                  <button onClick={saveBio} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0891B2] text-white text-xs font-semibold font-body">
                    <Check size={12} /> Save
                  </button>
                  <button onClick={() => { setEditingBio(false); setBioText(user.bio) }} className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold font-body', isDark ? 'bg-[#3F3F46] text-zinc-300' : 'bg-zinc-100 text-zinc-600')}>
                    <X size={12} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2">
                <p className={cn('flex-1 text-sm leading-relaxed font-body', isDark ? 'text-zinc-300' : 'text-zinc-600')}>
                  {user.bio || 'Add a bio to tell others about yourself...'}
                </p>
                <button onClick={() => setEditingBio(true)}>
                  <Edit3 size={15} className={isDark ? 'text-zinc-500' : 'text-zinc-400'} />
                </button>
              </div>
            )}
          </div>

          {/* Profile completion bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span className={cn('font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>Profile completion</span>
              <span className="font-bold font-body text-[#0891B2]">{user.profileCompletion}%</span>
            </div>
            <div className={cn('h-2 rounded-full overflow-hidden', isDark ? 'bg-[#3F3F46]' : 'bg-zinc-100')}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${user.profileCompletion}%` }}
                transition={{ duration: 0.8 }}
                className="h-full rounded-full bg-[#0891B2]"
              />
            </div>
          </div>
        </motion.div>

        {/* Attendance tracker */}
        <div className={cn('rounded-2xl p-4', isDark ? 'bg-[#27272A]' : 'bg-white shadow-sm')}>
          <h3 className={cn('text-sm font-bold font-body mb-3', isDark ? 'text-white' : 'text-[#27272A]')}>Attendance</h3>
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke={isDark ? '#3F3F46' : '#E4E4E7'} strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15.9" fill="none"
                  stroke="#0891B2" strokeWidth="3"
                  strokeDasharray={`${attendancePercent} 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={cn('text-xs font-black font-display', isDark ? 'text-white' : 'text-[#27272A]')}>{attendancePercent}%</span>
              </div>
            </div>
            <div>
              <p className={cn('text-2xl font-black font-display', isDark ? 'text-white' : 'text-[#27272A]')}>
                {user.attendedSessions}
                <span className={cn('text-base font-medium font-body', isDark ? 'text-zinc-400' : 'text-zinc-400')}>/{user.totalSessions}</span>
              </p>
              <p className={cn('text-xs font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>sessions attended</p>
            </div>
          </div>
        </div>

        {/* My Clubs */}
        {myClubs.length > 0 && (
          <div className={cn('rounded-2xl p-4', isDark ? 'bg-[#27272A]' : 'bg-white shadow-sm')}>
            <h3 className={cn('text-sm font-bold font-body mb-3', isDark ? 'text-white' : 'text-[#27272A]')}>My Clubs</h3>
            <div className="flex flex-wrap gap-2">
              {myClubs.map((club) => (
                <div key={club.id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0891B2]/10">
                  <img src={club.logo} alt={club.name} className="w-4 h-4 rounded-full object-cover" />
                  <span className="text-xs font-semibold font-body text-[#0891B2]">{club.name.replace('GUC ', '')}</span>
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
              <h3 className="text-sm font-bold font-body text-amber-800">Warnings ({user.warnings.length})</h3>
            </div>
            {user.warnings.map((w, i) => (
              <p key={i} className="text-xs font-body text-amber-700 leading-relaxed">{w}</p>
            ))}
          </div>
        )}

        {/* Hidden file inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handlePhotoFile(e.target.files?.[0])}
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="user"
          className="hidden"
          onChange={(e) => handlePhotoFile(e.target.files?.[0])}
        />

        {/* Upcoming activities */}
        {upcomingForMe.length > 0 && (
          <div>
            <h3 className={cn('text-sm font-bold font-body mb-3', isDark ? 'text-white' : 'text-[#27272A]')}>Upcoming Activities</h3>
            <div className="space-y-2">
              {upcomingForMe.map((event) => (
                <div key={event.id} className={cn('flex items-center gap-3 p-3 rounded-xl', isDark ? 'bg-[#27272A]' : 'bg-white shadow-sm')}>
                  <div className="w-10 h-10 rounded-xl bg-[#0891B2]/10 flex items-center justify-center">
                    <Calendar size={16} className="text-[#0891B2]" />
                  </div>
                  <div className="flex-1">
                    <p className={cn('text-xs font-semibold font-body', isDark ? 'text-white' : 'text-[#27272A]')}>{event.title}</p>
                    <p className={cn('text-[10px] font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>{event.date} · {event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Nickname popup */}
      <AnimatePresence>
        {showNicknameModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNicknameModal(false)}
              className="fixed inset-0 bg-black z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 30, stiffness: 320 }}
              className={cn(
                'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88%] max-w-sm rounded-3xl p-6 z-50 shadow-2xl',
                isDark ? 'bg-[#27272A]' : 'bg-white'
              )}
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex-1">
                  <h3 className={cn('text-lg font-black font-display tracking-wide', isDark ? 'text-white' : 'text-[#27272A]')}>
                    Choose your nickname
                  </h3>
                  <p className={cn('text-xs mt-1 font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>
                    A catchy short name your friends can recognize — shown on your profile.
                  </p>
                </div>
                <button
                  onClick={() => setShowNicknameModal(false)}
                  className={cn('w-8 h-8 rounded-full flex items-center justify-center -mt-1 -mr-1', isDark ? 'hover:bg-[#3F3F46] text-zinc-400' : 'hover:bg-zinc-100 text-zinc-500')}
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mt-5">
                <input
                  value={nicknameText}
                  onChange={(e) => setNicknameText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') saveNickname() }}
                  placeholder="Add nickname"
                  maxLength={24}
                  autoFocus
                  className={cn(
                    'w-full px-4 py-3.5 rounded-2xl text-sm outline-none border-2 transition-colors font-body',
                    isDark
                      ? 'bg-[#3F3F46] border-[#52525B] text-white placeholder:text-zinc-500 focus:border-[#0891B2]'
                      : 'bg-zinc-50 border-zinc-200 text-[#27272A] placeholder:text-zinc-400 focus:border-[#0891B2]'
                  )}
                />
                <p className={cn('text-[10px] mt-1.5 text-right font-body', isDark ? 'text-zinc-500' : 'text-zinc-400')}>
                  {nicknameText.length}/24
                </p>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setShowNicknameModal(false)}
                  className={cn(
                    'flex-1 py-3 rounded-2xl text-sm font-bold font-body',
                    isDark ? 'bg-[#3F3F46] text-zinc-300' : 'bg-zinc-100 text-zinc-700'
                  )}
                >
                  Cancel
                </button>
                <button
                  onClick={saveNickname}
                  className="flex-1 py-3 rounded-2xl bg-[#0891B2] text-white text-sm font-bold font-body"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Photo menu */}
      <AnimatePresence>
        {showPhotoMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPhotoMenu(false)}
              className="fixed inset-0 bg-black z-40"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={cn(
                'fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] rounded-t-3xl z-50 px-5 pb-10 pt-5',
                isDark ? 'bg-[#27272A]' : 'bg-white'
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={cn('text-base font-bold font-body', isDark ? 'text-white' : 'text-[#27272A]')}>Profile photo</h3>
                <button onClick={() => setShowPhotoMenu(false)} className={cn('w-8 h-8 rounded-full flex items-center justify-center', isDark ? 'bg-[#3F3F46]' : 'bg-zinc-100')}>
                  <X size={16} className={isDark ? 'text-zinc-300' : 'text-zinc-600'} />
                </button>
              </div>

              <button
                onClick={() => cameraInputRef.current?.click()}
                className={cn('w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl mb-2', isDark ? 'bg-[#3F3F46]' : 'bg-zinc-50')}
              >
                <div className="w-9 h-9 rounded-xl bg-[#0891B2]/10 flex items-center justify-center">
                  <Camera size={16} className="text-[#0891B2]" />
                </div>
                <div className="text-left">
                  <p className={cn('text-sm font-semibold font-body', isDark ? 'text-white' : 'text-[#27272A]')}>Take photo</p>
                  <p className={cn('text-[10px] font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>Use your camera</p>
                </div>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className={cn('w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl mb-2', isDark ? 'bg-[#3F3F46]' : 'bg-zinc-50')}
              >
                <div className="w-9 h-9 rounded-xl bg-[#0891B2]/10 flex items-center justify-center">
                  <Upload size={16} className="text-[#0891B2]" />
                </div>
                <div className="text-left">
                  <p className={cn('text-sm font-semibold font-body', isDark ? 'text-white' : 'text-[#27272A]')}>Upload from device</p>
                  <p className={cn('text-[10px] font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>Choose an image from your files</p>
                </div>
              </button>

              <button
                onClick={removePhoto}
                className={cn('w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl', isDark ? 'bg-[#3F3F46]' : 'bg-zinc-50')}
              >
                <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
                  <Trash2 size={16} className="text-red-500" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold font-body text-red-500">Reset to default</p>
                  <p className={cn('text-[10px] font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>Use a generated avatar</p>
                </div>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
