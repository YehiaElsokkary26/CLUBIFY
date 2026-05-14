import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, Edit3, Globe, Users, Calendar, ChevronRight } from 'lucide-react'
import { InstagramIcon, FacebookIcon } from '../../components/shared/SocialIcons'
import { useTheme } from '../../context/ThemeContext'
import { StatusBadge } from '../../components/shared/StatusBadge'
import { cn } from '../../lib/utils'
import { clubs } from '../../data/clubs'

const adminClub = clubs[0]

export function AdminClub() {
  const { isDark } = useTheme()
  const [mode, setMode] = useState<'preview' | 'edit'>('preview')

  return (
    <div className="phone-scroll h-[844px] pb-24" style={{ background: isDark ? '#1C1C1E' : '#FAF8F5' }}>
      {/* Header */}
      <div className={cn('pt-12 pb-4 px-5', isDark ? 'bg-[#1C1C1E]' : 'bg-[#FAF8F5]')}>
        <div className="flex items-center justify-between">
          <h1 className={cn('text-2xl font-black', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Club Profile</h1>
          <button
            onClick={() => setMode(mode === 'preview' ? 'edit' : 'preview')}
            className={cn('flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border-2 transition-all', mode === 'preview' ? 'border-[#8B1A1A] text-[#8B1A1A]' : isDark ? 'bg-[#8B1A1A] text-white border-[#8B1A1A]' : 'bg-[#8B1A1A] text-white border-[#8B1A1A]')}
          >
            {mode === 'preview' ? <><Edit3 size={12} /> Edit Mode</> : <><Eye size={12} /> Preview</>}
          </button>
        </div>
        <p className={cn('text-xs mt-1', isDark ? 'text-gray-400' : 'text-gray-500')}>
          {mode === 'preview' ? 'Student view of your club card' : 'Editing club information'}
        </p>
      </div>

      {mode === 'preview' ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Cover */}
          <div className="relative h-56 overflow-hidden">
            <img src={adminClub.coverImage} alt={adminClub.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-5 flex items-end gap-3">
              <img src={adminClub.logo} alt={adminClub.name} className="w-16 h-16 rounded-2xl border-2 border-white object-cover shadow-lg" />
              <div>
                <h2 className="text-white text-xl font-black">{adminClub.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <StatusBadge label={adminClub.category} variant="category" category={adminClub.category} />
                  <StatusBadge label="Recruiting Now 🟢" variant="recruiting" />
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className={cn('px-5 py-4 flex gap-4 border-b', isDark ? 'bg-[#2C2C2E] border-[#3A3A3C]' : 'bg-white border-gray-100')}>
            {[
              { label: 'Members', value: adminClub.memberCount },
              { label: 'Events', value: adminClub.events.length },
              { label: 'Founded', value: adminClub.founded },
            ].map(({ label, value }) => (
              <div key={label} className="text-center flex-1">
                <p className={cn('text-lg font-black', isDark ? 'text-white' : 'text-[#1C1C1E]')}>{value}</p>
                <p className={cn('text-[10px]', isDark ? 'text-gray-400' : 'text-gray-500')}>{label}</p>
              </div>
            ))}
          </div>

          {/* Social row */}
          <div className={cn('px-5 py-3 flex items-center gap-3 border-b', isDark ? 'bg-[#2C2C2E] border-[#3A3A3C]' : 'bg-white border-gray-100')}>
            {adminClub.socialLinks.instagram && (
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <InstagramIcon size={16} className="text-white" />
              </div>
            )}
            {adminClub.socialLinks.facebook && (
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
                <FacebookIcon size={16} className="text-white" />
              </div>
            )}
            {adminClub.socialLinks.website && (
              <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center', isDark ? 'bg-[#3A3A3C]' : 'bg-gray-100')}>
                <Globe size={16} className={isDark ? 'text-gray-300' : 'text-gray-600'} />
              </div>
            )}
            <div className="flex-1" />
            <span className="px-4 py-2 rounded-xl bg-[#8B1A1A] text-white text-xs font-bold">Apply Now</span>
          </div>

          {/* About preview */}
          <div className="px-5 pt-5">
            <h3 className={cn('text-xs font-bold uppercase tracking-wider mb-2', isDark ? 'text-gray-400' : 'text-gray-500')}>About</h3>
            <p className={cn('text-sm leading-relaxed', isDark ? 'text-gray-300' : 'text-gray-600')}>{adminClub.description}</p>

            <h3 className={cn('text-xs font-bold uppercase tracking-wider mt-5 mb-3', isDark ? 'text-gray-400' : 'text-gray-500')}>Committees</h3>
            {adminClub.committees.map((cm) => (
              <div key={cm.id} className={cn('flex items-center justify-between py-3 border-b', isDark ? 'border-[#2C2C2E]' : 'border-gray-100')}>
                <div>
                  <p className={cn('text-sm font-semibold', isDark ? 'text-white' : 'text-[#1C1C1E]')}>{cm.name}</p>
                  <p className={cn('text-xs', isDark ? 'text-gray-400' : 'text-gray-500')}>{cm.description}</p>
                </div>
                <span className="text-xs font-bold text-[#8B1A1A]">{cm.spotsAvailable} spots</span>
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 pt-2">
          <div className={cn('rounded-2xl p-5 text-center', isDark ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm')}>
            <Edit3 size={32} className="text-[#8B1A1A] mx-auto mb-3" />
            <h3 className={cn('text-base font-bold mb-2', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Edit Club Details</h3>
            <p className={cn('text-xs mb-4', isDark ? 'text-gray-400' : 'text-gray-500')}>
              Go to the Manage tab to edit events, spotlights, and social links. Full club profile editing coming soon.
            </p>
            <button
              onClick={() => setMode('preview')}
              className="px-5 py-2.5 rounded-xl bg-[#8B1A1A] text-white text-sm font-bold"
            >
              Back to Preview
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
