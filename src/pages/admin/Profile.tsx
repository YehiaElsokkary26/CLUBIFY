import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Camera, Save, Edit3, LogOut, Briefcase, Phone, Mail,
  GraduationCap, Hash, Upload, Trash2, X,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useToast } from '../../components/shared/Toast'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { cn } from '../../lib/utils'
import { clubs } from '../../data/clubs'

interface AdminExtra {
  position: string
  phone: string
  instagramHandle: string
  linkedinUrl: string
  funFact: string
}

export function AdminProfile() {
  const navigate = useNavigate()
  const { user, updateUser, logout } = useAuth()
  const { isDark } = useTheme()
  const { toast } = useToast()
  const fileRef = useRef<HTMLInputElement>(null)
  const cameraRef = useRef<HTMLInputElement>(null)
  const [showPhotoMenu, setShowPhotoMenu] = useState(false)
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false)

  const [extra, setExtra] = useLocalStorage<AdminExtra>('admin_profile_extra', {
    position: 'President',
    phone: '',
    instagramHandle: '',
    linkedinUrl: '',
    funFact: '',
  })

  const [draft, setDraft] = useState({
    name: user?.name || '',
    faculty: user?.faculty || '',
    year: user?.year || 1,
    bio: user?.bio || '',
  })

  if (!user) return null

  const adminClub = clubs.find((c) => user.joinedClubs.includes(c.id)) || clubs[0]

  const saveProfile = () => {
    updateUser({ name: draft.name, faculty: draft.faculty, year: draft.year, bio: draft.bio })
    toast('Profile saved!', 'success')
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
    updateUser({ avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}` })
    setShowPhotoMenu(false)
    toast('Photo removed', 'info')
  }

  const handleSignOut = () => {
    logout()
    navigate('/login')
    toast('Signed out', 'info')
  }

  const Field = ({ icon, label, value, onChange, placeholder, type = 'text' }: {
    icon: React.ReactNode; label: string; value: string | number; onChange: (v: string) => void; placeholder?: string; type?: string
  }) => (
    <div>
      <label className={cn('type-label mb-1.5 flex items-center gap-1.5', isDark ? 'text-zinc-400' : 'text-zinc-500')}>
        {icon} {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn('w-full px-4 py-3 rounded-xl text-sm font-body outline-none border-2 transition-colors',
          isDark ? 'bg-[#2d3d4a] border-[#3a4d5a] text-white placeholder:text-zinc-500 focus:border-[#6F2F33]'
                 : 'bg-zinc-50 border-zinc-200 text-[#1E1B16] placeholder:text-zinc-400 focus:border-[#6F2F33]')}
      />
    </div>
  )

  return (
    <div className="phone-scroll h-[844px] pb-24" style={{ background: isDark ? '#1E1B16' : '#F2EDDF' }}>
      {/* Header */}
      <div className={cn('pt-12 pb-4 px-5 flex items-center justify-between', isDark ? 'bg-[#1E1B16]' : 'bg-[#F2EDDF]')}>
        <button onClick={() => navigate(-1)} className={cn('w-9 h-9 rounded-full flex items-center justify-center', isDark ? 'bg-[#23323F]' : 'bg-[#FAF6EA] shadow-sm')}>
          <ArrowLeft size={18} className={isDark ? 'text-white' : 'text-[#1E1B16]'} />
        </button>
        <h1 className={cn('text-xl font-black font-display tracking-wide', isDark ? 'text-white' : 'text-[#1E1B16]')}>My Profile</h1>
        <div className="w-9" />
      </div>

      <div className="px-5 space-y-4">
        {/* Avatar & header card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className={cn('rounded-2xl p-5 flex flex-col items-center', isDark ? 'bg-[#23323F]' : 'bg-[#FAF6EA] shadow-sm')}>
          <button onClick={() => setShowPhotoMenu(true)} className="relative group">
            <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-2xl object-cover" />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#6F2F33] flex items-center justify-center shadow-md border-2 border-white">
              <Camera size={14} className="text-white" />
            </div>
          </button>
          <h2 className={cn('text-lg font-black font-display tracking-wide mt-3', isDark ? 'text-white' : 'text-[#1E1B16]')}>{user.name}</h2>
          <p className="text-xs font-semibold font-body text-[#6F2F33]">{extra.position} · {adminClub.name}</p>
          <p className={cn('text-[10px] mt-0.5 font-mono font-body', isDark ? 'text-zinc-500' : 'text-zinc-400')}>{user.gucId}</p>
        </motion.div>

        {/* Role at club */}
        <div className={cn('rounded-2xl p-4 space-y-3', isDark ? 'bg-[#23323F]' : 'bg-[#FAF6EA] shadow-sm')}>
          <h3 className={cn('text-sm font-black font-display tracking-wide', isDark ? 'text-white' : 'text-[#1E1B16]')}>Role at club</h3>
          <Field
            icon={<Briefcase size={11} />}
            label="Position"
            value={extra.position}
            onChange={(v) => setExtra((e) => ({ ...e, position: v }))}
            placeholder="e.g. President, VP, Head of Media"
          />
        </div>

        {/* Personal info */}
        <div className={cn('rounded-2xl p-4 space-y-3', isDark ? 'bg-[#23323F]' : 'bg-[#FAF6EA] shadow-sm')}>
          <h3 className={cn('text-sm font-black font-display tracking-wide', isDark ? 'text-white' : 'text-[#1E1B16]')}>Personal info</h3>
          <Field icon={<Edit3 size={11} />} label="Full name" value={draft.name} onChange={(v) => setDraft((d) => ({ ...d, name: v }))} placeholder="Your name" />
          <Field icon={<GraduationCap size={11} />} label="Faculty" value={draft.faculty} onChange={(v) => setDraft((d) => ({ ...d, faculty: v }))} placeholder="Faculty / program" />
          <Field icon={<Hash size={11} />} label="Year" type="number" value={draft.year} onChange={(v) => setDraft((d) => ({ ...d, year: Math.max(1, Math.min(6, Number(v) || 1)) }))} />

          <div>
            <label className={cn('type-label mb-1.5 flex items-center gap-1.5', isDark ? 'text-zinc-400' : 'text-zinc-500')}>
              <Edit3 size={11} /> Bio
            </label>
            <textarea
              value={draft.bio}
              onChange={(e) => setDraft((d) => ({ ...d, bio: e.target.value }))}
              rows={3}
              placeholder="Tell students about yourself..."
              className={cn('w-full px-4 py-3 rounded-xl text-sm font-body outline-none border-2 resize-none transition-colors',
                isDark ? 'bg-[#2d3d4a] border-[#3a4d5a] text-white placeholder:text-zinc-500 focus:border-[#6F2F33]'
                       : 'bg-zinc-50 border-zinc-200 text-[#1E1B16] placeholder:text-zinc-400 focus:border-[#6F2F33]')}
            />
          </div>
        </div>

        {/* Contact */}
        <div className={cn('rounded-2xl p-4 space-y-3', isDark ? 'bg-[#23323F]' : 'bg-[#FAF6EA] shadow-sm')}>
          <h3 className={cn('text-sm font-black font-display tracking-wide', isDark ? 'text-white' : 'text-[#1E1B16]')}>Contact</h3>
          <div>
            <label className={cn('type-label mb-1.5 flex items-center gap-1.5', isDark ? 'text-zinc-400' : 'text-zinc-500')}>
              <Mail size={11} /> Email
            </label>
            <div className={cn('w-full px-4 py-3 rounded-xl text-sm font-body border-2', isDark ? 'bg-[#2d3d4a] border-[#3a4d5a] text-zinc-400' : 'bg-zinc-100 border-zinc-200 text-zinc-500')}>
              {user.email}
            </div>
          </div>
          <Field icon={<Phone size={11} />} label="Phone" value={extra.phone} onChange={(v) => setExtra((e) => ({ ...e, phone: v }))} placeholder="+20 …" />
          <Field icon={<span className="text-[10px] font-black font-body">IG</span>} label="Instagram" value={extra.instagramHandle} onChange={(v) => setExtra((e) => ({ ...e, instagramHandle: v }))} placeholder="@yourhandle" />
          <Field icon={<span className="text-[10px] font-black font-body">in</span>} label="LinkedIn URL" value={extra.linkedinUrl} onChange={(v) => setExtra((e) => ({ ...e, linkedinUrl: v }))} placeholder="https://linkedin.com/in/…" />
        </div>

        {/* Fun */}
        <div className={cn('rounded-2xl p-4', isDark ? 'bg-[#23323F]' : 'bg-[#FAF6EA] shadow-sm')}>
          <h3 className={cn('text-sm font-black font-display tracking-wide mb-3', isDark ? 'text-white' : 'text-[#1E1B16]')}>Fun fact</h3>
          <textarea
            value={extra.funFact}
            onChange={(e) => setExtra((x) => ({ ...x, funFact: e.target.value }))}
            rows={2}
            placeholder="Something students should know about you 🎬"
            className={cn('w-full px-4 py-3 rounded-xl text-sm font-body outline-none border-2 resize-none',
              isDark ? 'bg-[#2d3d4a] border-[#3a4d5a] text-white placeholder:text-zinc-500 focus:border-[#6F2F33]'
                     : 'bg-zinc-50 border-zinc-200 text-[#1E1B16] placeholder:text-zinc-400 focus:border-[#6F2F33]')}
          />
        </div>

        {/* Save */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={saveProfile}
          className="w-full py-4 rounded-2xl bg-[#6F2F33] text-white font-bold font-body text-sm flex items-center justify-center gap-2 shadow-lg"
        >
          <Save size={16} /> Save Profile
        </motion.button>

        {/* Sign out */}
        <button
          onClick={() => setShowSignOutConfirm(true)}
          className={cn('w-full py-4 rounded-2xl border-2 font-bold font-body text-sm flex items-center justify-center gap-2',
            isDark ? 'border-red-900 text-red-400 hover:bg-red-900/20' : 'border-red-200 text-red-600 hover:bg-red-50')}
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>

      {/* Hidden file inputs */}
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoFile(e.target.files?.[0])} />
      <input ref={cameraRef} type="file" accept="image/*" capture="user" className="hidden" onChange={(e) => handlePhotoFile(e.target.files?.[0])} />

      {/* Photo menu */}
      <AnimatePresence>
        {showPhotoMenu && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }}
              onClick={() => setShowPhotoMenu(false)} className="fixed inset-0 bg-black z-40" />
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={cn('fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] rounded-t-3xl z-50 px-5 pb-10 pt-5', isDark ? 'bg-[#23323F]' : 'bg-[#FAF6EA]')}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={cn('text-base font-bold font-body', isDark ? 'text-white' : 'text-[#1E1B16]')}>Profile photo</h3>
                <button onClick={() => setShowPhotoMenu(false)} className={cn('w-8 h-8 rounded-full flex items-center justify-center', isDark ? 'bg-[#2d3d4a]' : 'bg-zinc-100')}>
                  <X size={16} className={isDark ? 'text-zinc-300' : 'text-zinc-600'} />
                </button>
              </div>
              <button onClick={() => cameraRef.current?.click()} className={cn('w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl mb-2', isDark ? 'bg-[#2d3d4a]' : 'bg-zinc-50')}>
                <div className="w-9 h-9 rounded-xl bg-[#6F2F33]/10 flex items-center justify-center">
                  <Camera size={16} className="text-[#6F2F33]" />
                </div>
                <div className="text-left">
                  <p className={cn('text-sm font-semibold font-body', isDark ? 'text-white' : 'text-[#1E1B16]')}>Take photo</p>
                  <p className={cn('text-[10px] font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>Use your camera</p>
                </div>
              </button>
              <button onClick={() => fileRef.current?.click()} className={cn('w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl mb-2', isDark ? 'bg-[#2d3d4a]' : 'bg-zinc-50')}>
                <div className="w-9 h-9 rounded-xl bg-[#6F2F33]/10 flex items-center justify-center">
                  <Upload size={16} className="text-[#6F2F33]" />
                </div>
                <div className="text-left">
                  <p className={cn('text-sm font-semibold font-body', isDark ? 'text-white' : 'text-[#1E1B16]')}>Upload from device</p>
                  <p className={cn('text-[10px] font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>Choose an image from your files</p>
                </div>
              </button>
              <button onClick={removePhoto} className={cn('w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl', isDark ? 'bg-[#2d3d4a]' : 'bg-zinc-50')}>
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

      {/* Sign out confirmation */}
      <AnimatePresence>
        {showSignOutConfirm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }}
              onClick={() => setShowSignOutConfirm(false)} className="fixed inset-0 bg-black z-40" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className={cn('fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88%] max-w-sm rounded-3xl p-6 z-50 shadow-2xl', isDark ? 'bg-[#23323F]' : 'bg-[#FAF6EA]')}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
                <LogOut size={20} className="text-red-500" />
              </div>
              <h3 className={cn('text-base font-black font-display tracking-wide text-center', isDark ? 'text-white' : 'text-[#1E1B16]')}>Sign out?</h3>
              <p className={cn('text-xs text-center mt-1 font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>You'll be returned to the login screen.</p>
              <div className="flex gap-2 mt-5">
                <button onClick={() => setShowSignOutConfirm(false)}
                  className={cn('flex-1 py-3 rounded-2xl text-sm font-bold font-body', isDark ? 'bg-[#2d3d4a] text-zinc-300' : 'bg-zinc-100 text-zinc-700')}>
                  Cancel
                </button>
                <button onClick={handleSignOut} className="flex-1 py-3 rounded-2xl bg-red-500 text-white text-sm font-bold font-body">
                  Sign out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
