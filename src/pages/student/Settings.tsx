import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Bell, Globe, Info, LogOut, ChevronRight, X, FileText } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useToast } from '../../components/shared/Toast'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { cn } from '../../lib/utils'

export function Settings() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { isDark, toggleDark } = useTheme()
  const { toast } = useToast()
  const [notifs, setNotifs] = useLocalStorage('clubify_notifs_enabled', true)
  const [showLanguage, setShowLanguage] = useState(false)
  const [language, setLanguage] = useState<'English' | 'Arabic'>('English')

  const handleLogout = () => {
    logout()
    navigate('/login')
    toast('Signed out successfully', 'info')
  }

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div>
      <p className={cn('text-xs font-bold uppercase tracking-wider px-5 mb-2 font-body', isDark ? 'text-[#76706A]' : 'text-[#A8A09A]')}>
        {title}
      </p>
      <div className={cn('mx-5 rounded-2xl overflow-hidden', isDark ? 'bg-[#23323F]' : 'bg-[#FAF6EA] shadow-sm')}>
        {children}
      </div>
    </div>
  )

  const Row = ({ icon, label, right, onClick, danger }: {
    icon: React.ReactNode
    label: string
    right?: React.ReactNode
    onClick?: () => void
    danger?: boolean
  }) => (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 px-4 py-4 border-b last:border-0 transition-all text-left',
        isDark ? 'border-[#2d3d4a]' : 'border-[#EAE5D8]',
        onClick && !danger && (isDark ? 'active:bg-[#2d3d4a]' : 'active:bg-[#FAF6EA]')
      )}
    >
      <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center', danger ? 'bg-red-100' : isDark ? 'bg-[#2d3d4a]' : 'bg-[#EDE8D8]')}>
        <div className={danger ? 'text-red-500' : isDark ? 'text-[#C8BFAF]' : 'text-[#5C5650]'}>{icon}</div>
      </div>
      <span className={cn('flex-1 text-sm font-semibold font-body', danger ? 'text-red-500' : isDark ? 'text-white' : 'text-[#1E1B16]')}>
        {label}
      </span>
      {right}
    </button>
  )

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button
      onClick={(e) => { e.stopPropagation(); onChange() }}
      className={cn('w-12 h-6 rounded-full transition-all duration-300 relative', value ? 'bg-[#6F2F33]' : isDark ? 'bg-[#2d3d4a]' : 'bg-[#D8D0BE]')}
    >
      <motion.div
        animate={{ x: value ? 24 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-1 w-4 h-4 rounded-full bg-[#FAF6EA] shadow-sm"
      />
    </button>
  )

  return (
    <div className="phone-scroll h-[844px] pb-10" style={{ background: isDark ? '#1E1B16' : '#F2EDDF' }}>
      {/* Header */}
      <div className={cn('pt-12 pb-4 px-5', isDark ? 'bg-[#1E1B16]' : 'bg-[#F2EDDF]')}>
        <h1 className={cn('text-2xl font-black font-display tracking-wide', isDark ? 'text-white' : 'text-[#1E1B16]')}>Settings</h1>
      </div>

      <div className="space-y-6">
        <Section title="Appearance">
          <Row
            icon={isDark ? <Moon size={16} /> : <Sun size={16} />}
            label="Dark Mode"
            onClick={toggleDark}
            right={<Toggle value={isDark} onChange={toggleDark} />}
          />
        </Section>

        <Section title="Preferences">
          <Row
            icon={<Bell size={16} />}
            label="Notifications"
            onClick={() => { setNotifs((v) => !v); toast(!notifs ? 'Notifications on' : 'Notifications off', 'info') }}
            right={<Toggle value={notifs} onChange={() => { setNotifs((v) => !v); toast(!notifs ? 'Notifications on' : 'Notifications off', 'info') }} />}
          />
          <Row
            icon={<Globe size={16} />}
            label="Language"
            onClick={() => setShowLanguage(true)}
            right={
              <div className="flex items-center gap-2">
                <span className={cn('text-sm font-body', isDark ? 'text-[#A8A09A]' : 'text-[#76706A]')}>{language}</span>
                <ChevronRight size={16} className={isDark ? 'text-[#76706A]' : 'text-[#A8A09A]'} />
              </div>
            }
          />
        </Section>

        <Section title="About">
          <Row
            icon={<FileText size={16} />}
            label="Terms & Conditions"
            onClick={() => navigate('/terms')}
            right={<ChevronRight size={16} className={isDark ? 'text-[#76706A]' : 'text-[#A8A09A]'} />}
          />
          <Row
            icon={<Info size={16} />}
            label="About Clubify"
            right={<ChevronRight size={16} className={isDark ? 'text-[#76706A]' : 'text-[#A8A09A]'} />}
          />
          <div className="px-4 py-3">
            <p className={cn('text-xs font-body', isDark ? 'text-[#76706A]' : 'text-[#A8A09A]')}>
              Version 1.0.0 · Built for GUC students
            </p>
            <p className={cn('text-xs mt-0.5 font-body', isDark ? 'text-[#5C5650]' : 'text-[#C8BFAF]')}>
              © 2026 Clubify. All rights reserved.
            </p>
          </div>
        </Section>

        <Section title="Account">
          <Row
            icon={<LogOut size={16} />}
            label="Sign Out"
            onClick={handleLogout}
            danger
          />
        </Section>
      </div>

      {/* Language bottom sheet */}
      <AnimatePresence>
        {showLanguage && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setShowLanguage(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={cn('fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] rounded-t-3xl z-50 px-5 pb-10 pt-5', isDark ? 'bg-[#23323F]' : 'bg-[#FAF6EA]')}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={cn('text-lg font-bold font-display tracking-wide', isDark ? 'text-white' : 'text-[#1E1B16]')}>Select Language</h3>
                <button onClick={() => setShowLanguage(false)} className={cn('w-8 h-8 rounded-full flex items-center justify-center', isDark ? 'bg-[#2d3d4a]' : 'bg-[#EDE8D8]')}>
                  <X size={16} className={isDark ? 'text-[#C8BFAF]' : 'text-[#5C5650]'} />
                </button>
              </div>
              {(['English', 'Arabic'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => { setLanguage(lang); setShowLanguage(false); toast(`Language set to ${lang}`, 'success') }}
                  className={cn(
                    'w-full flex items-center justify-between px-4 py-4 rounded-2xl mb-2 border-2 transition-all',
                    language === lang ? 'border-[#6F2F33] bg-[#6F2F33]/5' : isDark ? 'border-[#2d3d4a] bg-[#2d3d4a]' : 'border-[#D8D0BE]'
                  )}
                >
                  <span className={cn('text-sm font-semibold font-body', isDark ? 'text-white' : 'text-[#1E1B16]')}>{lang}</span>
                  {language === lang && <div className="w-4 h-4 rounded-full bg-[#6F2F33]" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
