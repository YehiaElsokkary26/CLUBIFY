import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Eye, Edit3, Globe, Camera, Save, X, Plus } from 'lucide-react'
import { InstagramIcon, FacebookIcon, LinkedinIcon, TikTokIcon } from '../../components/shared/SocialIcons'
import { useTheme } from '../../context/ThemeContext'
import { useToast } from '../../components/shared/Toast'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { StatusBadge } from '../../components/shared/StatusBadge'
import { cn } from '../../lib/utils'
import { clubs } from '../../data/clubs'
import type { SocialLinks, ClubCategory } from '../../data/types'

const adminClub = clubs[0]

interface ClubProfileEdit {
  name: string
  category: ClubCategory
  description: string
  mission: string
  contactEmail: string
  logo: string
  coverImage: string
  isRecruiting: boolean
  tags: string[]
}

const categories: ClubCategory[] = ['Media', 'Business', 'Academic', 'Arts', 'Sports', 'Community', 'Technology']

export function AdminClub() {
  const { isDark } = useTheme()
  const { toast } = useToast()
  const [mode, setMode] = useState<'preview' | 'edit'>('preview')
  const logoRef = useRef<HTMLInputElement>(null)
  const coverRef = useRef<HTMLInputElement>(null)

  const [profile, setProfile] = useLocalStorage<ClubProfileEdit>('admin_club_profile', {
    name: adminClub.name,
    category: adminClub.category,
    description: adminClub.description,
    mission: adminClub.mission,
    contactEmail: adminClub.contactEmail,
    logo: adminClub.logo,
    coverImage: adminClub.coverImage,
    isRecruiting: adminClub.isRecruiting,
    tags: adminClub.tags,
  })

  const [socialLinks, setSocialLinks] = useLocalStorage<SocialLinks>('admin_socials', adminClub.socialLinks)
  const [newTag, setNewTag] = useState('')

  const handleImageFile = (file: File | null | undefined, target: 'logo' | 'coverImage') => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setProfile((p) => ({ ...p, [target]: reader.result as string }))
    reader.readAsDataURL(file)
  }

  const update = <K extends keyof ClubProfileEdit>(key: K, value: ClubProfileEdit[K]) => {
    setProfile((p) => ({ ...p, [key]: value }))
  }

  const addTag = () => {
    const t = newTag.trim()
    if (!t) return
    if (profile.tags.includes(t)) { toast('Tag already added', 'error'); return }
    setProfile((p) => ({ ...p, tags: [...p.tags, t] }))
    setNewTag('')
  }

  const removeTag = (t: string) => {
    setProfile((p) => ({ ...p, tags: p.tags.filter((x) => x !== t) }))
  }

  const saveAll = () => {
    toast('Club profile saved!', 'success')
    setMode('preview')
  }

  const socialConfig = [
    { key: 'instagram' as const, label: 'Instagram', icon: InstagramIcon, bg: 'bg-gradient-to-br from-purple-500 to-pink-500' },
    { key: 'facebook' as const, label: 'Facebook', icon: FacebookIcon, bg: 'bg-blue-600' },
    { key: 'linkedin' as const, label: 'LinkedIn', icon: LinkedinIcon, bg: 'bg-blue-700' },
    { key: 'tiktok' as const, label: 'TikTok', icon: TikTokIcon, bg: 'bg-black' },
  ]

  const Field = ({ label, value, onChange, placeholder, textarea, rows }: {
    label: string; value: string; onChange: (v: string) => void; placeholder?: string; textarea?: boolean; rows?: number
  }) => (
    <div>
      <label className={cn('text-xs font-bold uppercase tracking-wider mb-1.5 block', isDark ? 'text-gray-400' : 'text-gray-500')}>
        {label}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows || 3}
          className={cn('w-full px-4 py-3 rounded-xl text-sm outline-none border-2 resize-none transition-colors',
            isDark ? 'bg-[#3A3A3C] border-[#4A4A4C] text-white placeholder:text-gray-500 focus:border-[#8B1A1A]'
                   : 'bg-gray-50 border-gray-200 text-[#1C1C1E] placeholder:text-gray-400 focus:border-[#8B1A1A]')}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn('w-full px-4 py-3 rounded-xl text-sm outline-none border-2 transition-colors',
            isDark ? 'bg-[#3A3A3C] border-[#4A4A4C] text-white placeholder:text-gray-500 focus:border-[#8B1A1A]'
                   : 'bg-gray-50 border-gray-200 text-[#1C1C1E] placeholder:text-gray-400 focus:border-[#8B1A1A]')}
        />
      )}
    </div>
  )

  return (
    <div className="phone-scroll h-[844px] pb-24" style={{ background: isDark ? '#1C1C1E' : '#FAF8F5' }}>
      <div className={cn('pt-12 pb-4 px-5', isDark ? 'bg-[#1C1C1E]' : 'bg-[#FAF8F5]')}>
        <div className="flex items-center justify-between">
          <h1 className={cn('text-2xl font-black', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Club Profile</h1>
          <button
            onClick={() => setMode(mode === 'preview' ? 'edit' : 'preview')}
            className={cn('flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border-2 transition-all',
              mode === 'preview' ? 'border-[#8B1A1A] text-[#8B1A1A]' : 'bg-[#8B1A1A] text-white border-[#8B1A1A]')}
          >
            {mode === 'preview' ? <><Edit3 size={12} /> Edit</> : <><Eye size={12} /> Preview</>}
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
            <img src={profile.coverImage} alt={profile.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-5 flex items-end gap-3">
              <img src={profile.logo} alt={profile.name} className="w-16 h-16 rounded-2xl border-2 border-white object-cover shadow-lg" />
              <div>
                <h2 className="text-white text-xl font-black">{profile.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <StatusBadge label={profile.category} variant="category" category={profile.category} />
                  {profile.isRecruiting && <StatusBadge label="Recruiting Now 🟢" variant="recruiting" />}
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

          {/* Social row — CLICKABLE */}
          <div className={cn('px-5 py-3 flex items-center gap-3 border-b', isDark ? 'bg-[#2C2C2E] border-[#3A3A3C]' : 'bg-white border-gray-100')}>
            {socialConfig.map(({ key, label, icon: Icon, bg }) => {
              const url = socialLinks[key]
              if (!url) return null
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn('w-9 h-9 rounded-xl flex items-center justify-center hover:scale-110 transition-transform', bg)}
                >
                  <Icon size={16} className="text-white" />
                </a>
              )
            })}
            {socialLinks.website && (
              <a
                href={socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
                className={cn('w-9 h-9 rounded-xl flex items-center justify-center hover:scale-110 transition-transform', isDark ? 'bg-[#3A3A3C]' : 'bg-gray-100')}
              >
                <Globe size={16} className={isDark ? 'text-gray-300' : 'text-gray-600'} />
              </a>
            )}
            <div className="flex-1" />
            {profile.isRecruiting && <span className="px-4 py-2 rounded-xl bg-[#8B1A1A] text-white text-xs font-bold">Apply Now</span>}
          </div>

          {/* About preview */}
          <div className="px-5 pt-5">
            <h3 className={cn('text-xs font-bold uppercase tracking-wider mb-2', isDark ? 'text-gray-400' : 'text-gray-500')}>About</h3>
            <p className={cn('text-sm leading-relaxed', isDark ? 'text-gray-300' : 'text-gray-600')}>{profile.description}</p>

            <h3 className={cn('text-xs font-bold uppercase tracking-wider mt-5 mb-2', isDark ? 'text-gray-400' : 'text-gray-500')}>Mission</h3>
            <p className={cn('text-sm leading-relaxed', isDark ? 'text-gray-300' : 'text-gray-600')}>{profile.mission}</p>

            <h3 className={cn('text-xs font-bold uppercase tracking-wider mt-5 mb-2', isDark ? 'text-gray-400' : 'text-gray-500')}>Tags</h3>
            <div className="flex flex-wrap gap-2">
              {profile.tags.map((t) => (
                <span key={t} className="px-3 py-1 rounded-full bg-[#8B1A1A]/10 text-[#8B1A1A] text-xs font-semibold">
                  {t}
                </span>
              ))}
            </div>

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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 pt-2 space-y-5">
          {/* Images */}
          <div className={cn('rounded-2xl p-4', isDark ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm')}>
            <h3 className={cn('text-sm font-black mb-3', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Images</h3>

            <div className="flex items-center gap-3 mb-3">
              <button onClick={() => logoRef.current?.click()} className="relative group flex-shrink-0">
                <img src={profile.logo} alt="logo" className="w-16 h-16 rounded-2xl object-cover" />
                <div className="absolute inset-0 rounded-2xl bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera size={18} className="text-white" />
                </div>
              </button>
              <div>
                <p className={cn('text-xs font-bold', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Logo</p>
                <p className={cn('text-[10px]', isDark ? 'text-gray-400' : 'text-gray-500')}>Tap to change</p>
              </div>
              <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageFile(e.target.files?.[0], 'logo')} />
            </div>

            <div>
              <button onClick={() => coverRef.current?.click()} className="relative w-full h-32 rounded-2xl overflow-hidden group">
                <img src={profile.coverImage} alt="cover" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-2 text-white text-sm font-bold">
                    <Camera size={16} /> Change cover
                  </div>
                </div>
              </button>
              <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageFile(e.target.files?.[0], 'coverImage')} />
            </div>
          </div>

          {/* Basic info */}
          <div className={cn('rounded-2xl p-4 space-y-3', isDark ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm')}>
            <h3 className={cn('text-sm font-black mb-1', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Basics</h3>
            <Field label="Club name" value={profile.name} onChange={(v) => update('name', v)} placeholder="GUC Media Club" />

            <div>
              <label className={cn('text-xs font-bold uppercase tracking-wider mb-1.5 block', isDark ? 'text-gray-400' : 'text-gray-500')}>
                Category
              </label>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => update('category', c)}
                    className={cn('px-3 py-1.5 rounded-full text-xs font-semibold',
                      profile.category === c ? 'bg-[#8B1A1A] text-white' : isDark ? 'bg-[#3A3A3C] text-gray-300' : 'bg-gray-100 text-gray-600')}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <Field label="Contact email" value={profile.contactEmail} onChange={(v) => update('contactEmail', v)} placeholder="club@guc.edu.eg" />

            <div className="flex items-center justify-between pt-1">
              <div>
                <p className={cn('text-xs font-bold', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Recruiting now</p>
                <p className={cn('text-[10px]', isDark ? 'text-gray-400' : 'text-gray-500')}>Shows the "Recruiting" badge</p>
              </div>
              <button
                onClick={() => update('isRecruiting', !profile.isRecruiting)}
                className={cn('w-12 h-6 rounded-full transition-all relative', profile.isRecruiting ? 'bg-[#8B1A1A]' : isDark ? 'bg-[#3A3A3C]' : 'bg-gray-200')}
              >
                <div className={cn('absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all', profile.isRecruiting ? 'left-7' : 'left-1')} />
              </button>
            </div>
          </div>

          {/* About */}
          <div className={cn('rounded-2xl p-4 space-y-3', isDark ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm')}>
            <h3 className={cn('text-sm font-black', isDark ? 'text-white' : 'text-[#1C1C1E]')}>About the club</h3>
            <Field label="Description" value={profile.description} onChange={(v) => update('description', v)} textarea rows={3} placeholder="Short blurb students see first" />
            <Field label="Mission" value={profile.mission} onChange={(v) => update('mission', v)} textarea rows={3} placeholder="What does the club exist to do?" />
          </div>

          {/* Tags */}
          <div className={cn('rounded-2xl p-4', isDark ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm')}>
            <h3 className={cn('text-sm font-black mb-3', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Tags</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {profile.tags.map((t) => (
                <span key={t} className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#8B1A1A]/10 text-[#8B1A1A] text-xs font-semibold">
                  {t}
                  <button onClick={() => removeTag(t)} aria-label={`Remove ${t}`}>
                    <X size={11} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') addTag() }}
                placeholder="New tag"
                className={cn('flex-1 px-3 py-2 rounded-xl text-sm outline-none border', isDark ? 'bg-[#3A3A3C] border-[#4A4A4C] text-white' : 'bg-gray-50 border-gray-200 text-[#1C1C1E]')}
              />
              <button onClick={addTag} className="px-4 rounded-xl bg-[#8B1A1A] text-white text-xs font-bold flex items-center gap-1">
                <Plus size={12} /> Add
              </button>
            </div>
          </div>

          {/* Social links — EDITABLE */}
          <div className={cn('rounded-2xl p-4 space-y-3', isDark ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm')}>
            <h3 className={cn('text-sm font-black', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Social links</h3>

            {socialConfig.map(({ key, label, icon: Icon }) => (
              <div key={key} className="flex items-center gap-2">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', isDark ? 'bg-[#3A3A3C] text-gray-300' : 'bg-gray-100 text-gray-600')}>
                  <Icon size={16} />
                </div>
                <input
                  value={socialLinks[key] || ''}
                  onChange={(e) => setSocialLinks((s) => ({ ...s, [key]: e.target.value }))}
                  placeholder={`${label} URL`}
                  className={cn('flex-1 px-3 py-2.5 rounded-xl text-xs outline-none border', isDark ? 'bg-[#3A3A3C] border-[#4A4A4C] text-white' : 'bg-gray-50 border-gray-200 text-[#1C1C1E]')}
                />
              </div>
            ))}

            <div className="flex items-center gap-2">
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', isDark ? 'bg-[#3A3A3C] text-gray-300' : 'bg-gray-100 text-gray-600')}>
                <Globe size={16} />
              </div>
              <input
                value={socialLinks.website || ''}
                onChange={(e) => setSocialLinks((s) => ({ ...s, website: e.target.value }))}
                placeholder="Website URL"
                className={cn('flex-1 px-3 py-2.5 rounded-xl text-xs outline-none border', isDark ? 'bg-[#3A3A3C] border-[#4A4A4C] text-white' : 'bg-gray-50 border-gray-200 text-[#1C1C1E]')}
              />
            </div>
          </div>

          {/* Save */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={saveAll}
            className="w-full py-4 rounded-2xl bg-[#8B1A1A] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
          >
            <Save size={16} /> Save Club Profile
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
