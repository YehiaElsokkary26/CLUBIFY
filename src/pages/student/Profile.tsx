import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Edit3, Check, X, AlertTriangle, Calendar, Settings, Camera, Upload, Trash2, FileText, CheckCircle, UserCog } from 'lucide-react'
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
  const [showInfoEdit, setShowInfoEdit] = useState(false)
  const [editName, setEditName] = useState(user?.nickname || user?.name || '')
  const [editGucId, setEditGucId] = useState(user?.gucId || '')
  const [editEmailPrefix, setEditEmailPrefix] = useState(user?.emailPrefix || '')
  const [gucIdError, setGucIdError] = useState('')
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

  const openInfoEdit = () => {
    setEditName(user?.nickname || user?.name || '')
    setEditGucId(user?.gucId || '')
    setEditEmailPrefix(user?.emailPrefix || '')
    setGucIdError('')
    setShowInfoEdit(true)
  }

  const saveInfo = () => {
    if (editGucId && !/^\d{2}-\d{5}$/.test(editGucId)) {
      setGucIdError('Format must be xx-xxxxx (e.g. 49-12345)')
      return
    }
    updateUser({
      nickname: editName.trim() || undefined,
      gucId: editGucId || user?.gucId,
      emailPrefix: editEmailPrefix.trim() || undefined,
    })
    setShowInfoEdit(false)
    toast('Info updated!', 'success')
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
            <button onClick={() => setShowPhotoMenu(true)} className="relative group" aria-label="Change photo">
              <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-2xl object-cover" />
              <div className="absolute inset-0 rounded-2xl bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <Camera size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#8B1A1A] flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">{user.year}</span>
              </div>
              <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-200">
                <Camera size={11} className="text-[#8B1A1A]" />
              </div>
            </button>
            <div className="flex-1">
              <h2 className={cn('text-lg font-black', isDark ? 'text-white' : 'text-[#1C1C1E]')}>{user.name}</h2>
              <button
                onClick={openNicknameModal}
                className={cn(
                  'mt-0.5 flex items-center gap-1.5 text-xs rounded-md px-1.5 py-0.5 -mx-1.5 transition-colors',
                  isDark ? 'hover:bg-[#3A3A3C]' : 'hover:bg-gray-100'
                )}
              >
                {user.nickname ? (
                  <span className={cn('italic', isDark ? 'text-gray-300' : 'text-gray-600')}>"{user.nickname}"</span>
                ) : (
                  <span className={cn('font-semibold', isDark ? 'text-[#A52020]' : 'text-[#8B1A1A]')}>+ Add nickname</span>
                )}
                <Edit3 size={10} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
              </button>
              <p className={cn('text-xs font-mono mt-0.5', isDark ? 'text-gray-400' : 'text-gray-500')}>{user.gucId}</p>
              {user.emailPrefix && (
                <p className={cn('text-xs mt-0.5', isDark ? 'text-gray-400' : 'text-gray-500')}>{user.emailPrefix}@student.guc.edu.eg</p>
              )}
              <p className={cn('text-xs mt-1', isDark ? 'text-gray-400' : 'text-gray-500')}>{user.faculty}</p>
              <p className={cn('text-xs', isDark ? 'text-gray-400' : 'text-gray-500')}>Year {user.year}</p>
              <button
                onClick={openInfoEdit}
                className={cn('mt-1.5 flex items-center gap-1 text-[10px] font-semibold', isDark ? 'text-[#A52020]' : 'text-[#8B1A1A]')}
              >
                <UserCog size={10} /> Edit info
              </button>
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

        {/* Terms & Conditions */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/terms')}
          className={cn('w-full flex items-center gap-3 rounded-2xl p-4', isDark ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm')}
        >
          <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center', isDark ? 'bg-[#3A3A3C]' : 'bg-gray-100')}>
            <FileText size={16} className={isDark ? 'text-gray-300' : 'text-gray-600'} />
          </div>
          <span className={cn('flex-1 text-sm font-semibold text-left', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Terms & Conditions</span>
          {localStorage.getItem('clubify_terms_accepted') === 'true'
            ? <CheckCircle size={16} className="text-green-500" />
            : <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8B1A1A]/10 text-[#8B1A1A]">Review</span>
          }
        </motion.button>

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
                isDark ? 'bg-[#2C2C2E]' : 'bg-white'
              )}
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex-1">
                  <h3 className={cn('text-lg font-black', isDark ? 'text-white' : 'text-[#1C1C1E]')}>
                    Choose your nickname
                  </h3>
                  <p className={cn('text-xs mt-1', isDark ? 'text-gray-400' : 'text-gray-500')}>
                    A catchy short name your friends can recognize — shown on your profile.
                  </p>
                </div>
                <button
                  onClick={() => setShowNicknameModal(false)}
                  className={cn('w-8 h-8 rounded-full flex items-center justify-center -mt-1 -mr-1', isDark ? 'hover:bg-[#3A3A3C] text-gray-400' : 'hover:bg-gray-100 text-gray-500')}
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
                    'w-full px-4 py-3.5 rounded-2xl text-sm outline-none border-2 transition-colors',
                    isDark
                      ? 'bg-[#3A3A3C] border-[#4A4A4C] text-white placeholder:text-gray-500 focus:border-[#8B1A1A]'
                      : 'bg-gray-50 border-gray-200 text-[#1C1C1E] placeholder:text-gray-400 focus:border-[#8B1A1A]'
                  )}
                />
                <p className={cn('text-[10px] mt-1.5 text-right', isDark ? 'text-gray-500' : 'text-gray-400')}>
                  {nicknameText.length}/24
                </p>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setShowNicknameModal(false)}
                  className={cn(
                    'flex-1 py-3 rounded-2xl text-sm font-bold',
                    isDark ? 'bg-[#3A3A3C] text-gray-300' : 'bg-gray-100 text-gray-700'
                  )}
                >
                  Cancel
                </button>
                <button
                  onClick={saveNickname}
                  className="flex-1 py-3 rounded-2xl bg-[#8B1A1A] text-white text-sm font-bold"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Edit Info modal */}
      <AnimatePresence>
        {showInfoEdit && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }}
              onClick={() => setShowInfoEdit(false)}
              className="fixed inset-0 bg-black z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 30, stiffness: 320 }}
              className={cn('fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88%] max-w-sm rounded-3xl p-6 z-50 shadow-2xl', isDark ? 'bg-[#2C2C2E]' : 'bg-white')}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={cn('text-lg font-black', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Edit Info</h3>
                <button onClick={() => setShowInfoEdit(false)} className={cn('w-8 h-8 rounded-full flex items-center justify-center', isDark ? 'hover:bg-[#3A3A3C] text-gray-400' : 'hover:bg-gray-100 text-gray-500')}>
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-3">
                {/* Preferred name */}
                <div>
                  <label className={cn('text-xs font-semibold mb-1 block', isDark ? 'text-gray-400' : 'text-gray-500')}>Preferred Name</label>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="e.g. Youssef"
                    className={cn('w-full px-4 py-3 rounded-2xl text-sm outline-none border-2 transition-colors', isDark ? 'bg-[#3A3A3C] border-[#4A4A4C] text-white placeholder:text-gray-500 focus:border-[#8B1A1A]' : 'bg-gray-50 border-gray-200 text-[#1C1C1E] placeholder:text-gray-400 focus:border-[#8B1A1A]')}
                  />
                </div>

                {/* GUC ID */}
                <div>
                  <label className={cn('text-xs font-semibold mb-1 block', isDark ? 'text-gray-400' : 'text-gray-500')}>GUC ID</label>
                  <input
                    value={editGucId}
                    onChange={(e) => { setEditGucId(e.target.value); setGucIdError('') }}
                    placeholder="xx-xxxxx (e.g. 49-12345)"
                    className={cn('w-full px-4 py-3 rounded-2xl text-sm outline-none border-2 transition-colors font-mono', isDark ? 'bg-[#3A3A3C] border-[#4A4A4C] text-white placeholder:text-gray-500 focus:border-[#8B1A1A]' : 'bg-gray-50 border-gray-200 text-[#1C1C1E] placeholder:text-gray-400 focus:border-[#8B1A1A]', gucIdError ? 'border-red-500' : '')}
                  />
                  {gucIdError && <p className="text-[10px] text-red-500 mt-1">{gucIdError}</p>}
                </div>

                {/* Email prefix */}
                <div>
                  <label className={cn('text-xs font-semibold mb-1 block', isDark ? 'text-gray-400' : 'text-gray-500')}>GUC Email</label>
                  <div className="flex items-center gap-0">
                    <input
                      value={editEmailPrefix}
                      onChange={(e) => setEditEmailPrefix(e.target.value)}
                      placeholder="ahmed.kabil"
                      className={cn('flex-1 px-4 py-3 rounded-l-2xl text-sm outline-none border-2 border-r-0 transition-colors', isDark ? 'bg-[#3A3A3C] border-[#4A4A4C] text-white placeholder:text-gray-500 focus:border-[#8B1A1A]' : 'bg-gray-50 border-gray-200 text-[#1C1C1E] placeholder:text-gray-400 focus:border-[#8B1A1A]')}
                    />
                    <span className={cn('px-3 py-3 rounded-r-2xl text-xs border-2 border-l-0', isDark ? 'bg-[#3A3A3C] border-[#4A4A4C] text-gray-400' : 'bg-gray-100 border-gray-200 text-gray-400')}>
                      @student.guc.edu.eg
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-5">
                <button onClick={() => setShowInfoEdit(false)} className={cn('flex-1 py-3 rounded-2xl text-sm font-bold', isDark ? 'bg-[#3A3A3C] text-gray-300' : 'bg-gray-100 text-gray-700')}>
                  Cancel
                </button>
                <button onClick={saveInfo} className="flex-1 py-3 rounded-2xl bg-[#8B1A1A] text-white text-sm font-bold">
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
                isDark ? 'bg-[#2C2C2E]' : 'bg-white'
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={cn('text-base font-bold', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Profile photo</h3>
                <button onClick={() => setShowPhotoMenu(false)} className={cn('w-8 h-8 rounded-full flex items-center justify-center', isDark ? 'bg-[#3A3A3C]' : 'bg-gray-100')}>
                  <X size={16} className={isDark ? 'text-gray-300' : 'text-gray-600'} />
                </button>
              </div>

              <button
                onClick={() => cameraInputRef.current?.click()}
                className={cn('w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl mb-2', isDark ? 'bg-[#3A3A3C]' : 'bg-gray-50')}
              >
                <div className="w-9 h-9 rounded-xl bg-[#8B1A1A]/10 flex items-center justify-center">
                  <Camera size={16} className="text-[#8B1A1A]" />
                </div>
                <div className="text-left">
                  <p className={cn('text-sm font-semibold', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Take photo</p>
                  <p className={cn('text-[10px]', isDark ? 'text-gray-400' : 'text-gray-500')}>Use your camera</p>
                </div>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className={cn('w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl mb-2', isDark ? 'bg-[#3A3A3C]' : 'bg-gray-50')}
              >
                <div className="w-9 h-9 rounded-xl bg-[#8B1A1A]/10 flex items-center justify-center">
                  <Upload size={16} className="text-[#8B1A1A]" />
                </div>
                <div className="text-left">
                  <p className={cn('text-sm font-semibold', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Upload from device</p>
                  <p className={cn('text-[10px]', isDark ? 'text-gray-400' : 'text-gray-500')}>Choose an image from your files</p>
                </div>
              </button>

              <button
                onClick={removePhoto}
                className={cn('w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl', isDark ? 'bg-[#3A3A3C]' : 'bg-gray-50')}
              >
                <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
                  <Trash2 size={16} className="text-red-500" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-red-500">Reset to default</p>
                  <p className={cn('text-[10px]', isDark ? 'text-gray-400' : 'text-gray-500')}>Use a generated avatar</p>
                </div>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
