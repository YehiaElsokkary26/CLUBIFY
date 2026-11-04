import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Eye, Edit3, Globe, Camera, Save, X, Plus } from 'lucide-react'
import { InstagramIcon, FacebookIcon, LinkedinIcon, TikTokIcon } from '../../components/shared/SocialIcons'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../components/shared/Toast'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { StatusBadge } from '../../components/shared/StatusBadge'
import { getClub, updateClub } from '../../lib/db'
import { cn } from '../../lib/utils'
import type { SocialLinks, ClubCategory } from '../../data/types'

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
  const { user } = useAuth()
  const adminClub = getClub(user?.managedClubId ?? '') ?? undefined
  const [mode, setMode] = useState<'preview' | 'edit'>('preview')
  const logoRef = useRef<HTMLInputElement>(null)
  const coverRef = useRef<HTMLInputElement>(null)

  const [profile, setProfile] = useLocalStorage<ClubProfileEdit>('admin_club_profile', {
    name: adminClub?.name ?? '',
    category: adminClub?.category ?? 'Technology',
    description: adminClub?.description ?? '',
    mission: adminClub?.mission ?? '',
    contactEmail: adminClub?.contactEmail ?? '',
    logo: adminClub?.logo ?? '',
    coverImage: adminClub?.coverImage ?? '',
    isRecruiting: adminClub?.isRecruiting ?? false,
    tags: adminClub?.tags ?? [],
  })

  const [socialLinks, setSocialLinks] = useLocalStorage<SocialLinks>('admin_socials', adminClub?.socialLinks ?? {})
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
    if (adminClub) {
      updateClub(adminClub.id, {
        name: profile.name,
        category: profile.category,
        description: profile.description,
        mission: profile.mission,
        contactEmail: profile.contactEmail,
        logo: profile.logo,
        coverImage: profile.coverImage,
        isRecruiting: profile.isRecruiting,
        tags: profile.tags,
        socialLinks,
      })
    }
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
      <label className={cn('type-label mb-1.5 block', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>
        {label}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows || 3}
          className={cn('w-full px-4 py-3 rounded-xl text-sm font-body outline-none border-2 resize-none transition-colors',
            isDark ? 'bg-[#2d3d4a] border-[#3a4d5a] text-white placeholder:text-[#6A7870] focus:border-[#1A5E3A]'
                   : 'bg-[#FFFFFF] border-[#C8E0D0] text-[#0D1A12] placeholder:text-[#9AB0A0] focus:border-[#1A5E3A]')}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn('w-full px-4 py-3 rounded-xl text-sm font-body outline-none border-2 transition-colors',
            isDark ? 'bg-[#2d3d4a] border-[#3a4d5a] text-white placeholder:text-[#6A7870] focus:border-[#1A5E3A]'
                   : 'bg-[#FFFFFF] border-[#C8E0D0] text-[#0D1A12] placeholder:text-[#9AB0A0] focus:border-[#1A5E3A]')}
        />
      )}
    </div>
  )

  return (
    <div className="phone-scroll h-[844px] pb-24" style={{ background: isDark ? '#0D1A12' : '#F4FBF6' }}>
      <div className={cn('pt-12 pb-4 px-5', isDark ? 'bg-[#0D1A12]' : 'bg-[#F4FBF6]')}>
        <div className="flex items-center justify-between">
          <h1 className={cn('text-2xl font-black font-display tracking-wide', isDark ? 'text-white' : 'text-[#0D1A12]')}>Club Profile</h1>
          <button
            onClick={() => setMode(mode === 'preview' ? 'edit' : 'preview')}
            className={cn('flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold font-body border-2 transition-all',
              mode === 'preview' ? 'border-[#1A5E3A] text-[#1A5E3A]' : 'bg-[#1A5E3A] text-white border-[#1A5E3A]')}
          >
            {mode === 'preview' ? <><Edit3 size={12} /> Edit</> : <><Eye size={12} /> Preview</>}
          </button>
        </div>
        <p className={cn('text-xs mt-1 font-body', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>
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
                <h2 className="text-white text-xl font-black font-display tracking-wide">{profile.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <StatusBadge label={profile.category} variant="category" category={profile.category} />
                  {profile.isRecruiting && <StatusBadge label="Recruiting Now 🟢" variant="recruiting" />}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className={cn('px-5 py-4 flex gap-4 border-b', isDark ? 'bg-[#23323F] border-[#2d3d4a]' : 'bg-[#FFFFFF] border-[#DDEEE6]')}>
            {[
              { label: 'Members', value: adminClub?.memberCount ?? 0 },
              { label: 'Events', value: adminClub?.events.length ?? 0 },
              { label: 'Founded', value: adminClub?.founded ?? '—' },
            ].map(({ label, value }) => (
              <div key={label} className="text-center flex-1">
                <p className={cn('text-lg font-black font-display', isDark ? 'text-white' : 'text-[#0D1A12]')}>{value}</p>
                <p className={cn('text-[10px] font-body', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>{label}</p>
              </div>
            ))}
          </div>

          {/* Social row */}
          <div className={cn('px-5 py-3 flex items-center gap-3 border-b', isDark ? 'bg-[#23323F] border-[#2d3d4a]' : 'bg-[#FFFFFF] border-[#DDEEE6]')}>
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
                className={cn('w-9 h-9 rounded-xl flex items-center justify-center hover:scale-110 transition-transform', isDark ? 'bg-[#2d3d4a]' : 'bg-[#EEF7F2]')}
              >
                <Globe size={16} className={isDark ? 'text-[#C0D4C8]' : 'text-[#5C5650]'} />
              </a>
            )}
            <div className="flex-1" />
            {profile.isRecruiting && <span className="px-4 py-2 rounded-xl bg-[#1A5E3A] text-white text-xs font-bold font-body">Apply Now</span>}
          </div>

          {/* About preview */}
          <div className="px-5 pt-5">
            <h3 className={cn('text-xs font-bold uppercase tracking-wider mb-2 font-body', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>About</h3>
            <p className={cn('text-sm leading-relaxed font-body', isDark ? 'text-[#C0D4C8]' : 'text-[#5C5650]')}>{profile.description}</p>

            <h3 className={cn('text-xs font-bold uppercase tracking-wider mt-5 mb-2 font-body', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>Mission</h3>
            <p className={cn('text-sm leading-relaxed font-body', isDark ? 'text-[#C0D4C8]' : 'text-[#5C5650]')}>{profile.mission}</p>

            <h3 className={cn('text-xs font-bold uppercase tracking-wider mt-5 mb-2 font-body', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>Tags</h3>
            <div className="flex flex-wrap gap-2">
              {profile.tags.map((t) => (
                <span key={t} className="px-3 py-1 rounded-full bg-[#1A5E3A]/10 text-[#1A5E3A] text-xs font-semibold font-body">
                  {t}
                </span>
              ))}
            </div>

            <h3 className={cn('text-xs font-bold uppercase tracking-wider mt-5 mb-3 font-body', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>Committees</h3>
            {(adminClub?.committees ?? []).map((cm) => (
              <div key={cm.id} className={cn('flex items-center justify-between py-3 border-b', isDark ? 'border-[#C8E0D0]' : 'border-[#DDEEE6]')}>
                <div>
                  <p className={cn('text-sm font-semibold font-body', isDark ? 'text-white' : 'text-[#0D1A12]')}>{cm.name}</p>
                  <p className={cn('text-xs font-body', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>{cm.description}</p>
                </div>
                <span className="text-xs font-bold font-body text-[#1A5E3A]">{cm.spotsAvailable} spots</span>
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 pt-2 space-y-5">
          {/* Images */}
          <div className={cn('rounded-2xl p-4', isDark ? 'bg-[#23323F]' : 'bg-[#FFFFFF] shadow-sm')}>
            <h3 className={cn('text-sm font-black font-display tracking-wide mb-3', isDark ? 'text-white' : 'text-[#0D1A12]')}>Images</h3>

            <div className="flex items-center gap-3 mb-3">
              <button onClick={() => logoRef.current?.click()} className="relative group flex-shrink-0">
                <img src={profile.logo} alt="logo" className="w-16 h-16 rounded-2xl object-cover" />
                <div className="absolute inset-0 rounded-2xl bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera size={18} className="text-white" />
                </div>
              </button>
              <div>
                <p className={cn('text-xs font-bold font-body', isDark ? 'text-white' : 'text-[#0D1A12]')}>Logo</p>
                <p className={cn('text-[10px] font-body', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>Tap to change</p>
              </div>
              <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageFile(e.target.files?.[0], 'logo')} />
            </div>

            <div>
              <button onClick={() => coverRef.current?.click()} className="relative w-full h-32 rounded-2xl overflow-hidden group">
                <img src={profile.coverImage} alt="cover" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-2 text-white text-sm font-bold font-body">
                    <Camera size={16} /> Change cover
                  </div>
                </div>
              </button>
              <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageFile(e.target.files?.[0], 'coverImage')} />
            </div>
          </div>

          {/* Basic info */}
          <div className={cn('rounded-2xl p-4 space-y-3', isDark ? 'bg-[#23323F]' : 'bg-[#FFFFFF] shadow-sm')}>
            <h3 className={cn('text-sm font-black font-display tracking-wide mb-1', isDark ? 'text-white' : 'text-[#0D1A12]')}>Basics</h3>
            <Field label="Club name" value={profile.name} onChange={(v) => update('name', v)} placeholder="GUC Media Club" />

            <div>
              <label className={cn('type-label mb-1.5 block', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>
                Category
              </label>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => update('category', c)}
                    className={cn('px-3 py-1.5 rounded-full text-xs font-semibold font-body',
                      profile.category === c ? 'bg-[#1A5E3A] text-white' : isDark ? 'bg-[#2d3d4a] text-[#C0D4C8]' : 'bg-[#EEF7F2] text-[#5C5650]')}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <Field label="Contact email" value={profile.contactEmail} onChange={(v) => update('contactEmail', v)} placeholder="club@guc.edu.eg" />

            <div className="flex items-center justify-between pt-1">
              <div>
                <p className={cn('text-xs font-bold font-body', isDark ? 'text-white' : 'text-[#0D1A12]')}>Recruiting now</p>
                <p className={cn('text-[10px] font-body', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>Shows the "Recruiting" badge</p>
              </div>
              <button
                onClick={() => update('isRecruiting', !profile.isRecruiting)}
                className={cn('w-12 h-6 rounded-full transition-all relative', profile.isRecruiting ? 'bg-[#1A5E3A]' : isDark ? 'bg-[#2d3d4a]' : 'bg-[#C8E0D0]')}
              >
                <div className={cn('absolute top-1 w-4 h-4 rounded-full bg-[#FFFFFF] shadow-sm transition-all', profile.isRecruiting ? 'left-7' : 'left-1')} />
              </button>
            </div>
          </div>

          {/* About */}
          <div className={cn('rounded-2xl p-4 space-y-3', isDark ? 'bg-[#23323F]' : 'bg-[#FFFFFF] shadow-sm')}>
            <h3 className={cn('text-sm font-black font-display tracking-wide', isDark ? 'text-white' : 'text-[#0D1A12]')}>About the club</h3>
            <Field label="Description" value={profile.description} onChange={(v) => update('description', v)} textarea rows={3} placeholder="Short blurb students see first" />
            <Field label="Mission" value={profile.mission} onChange={(v) => update('mission', v)} textarea rows={3} placeholder="What does the club exist to do?" />
          </div>

          {/* Tags */}
          <div className={cn('rounded-2xl p-4', isDark ? 'bg-[#23323F]' : 'bg-[#FFFFFF] shadow-sm')}>
            <h3 className={cn('text-sm font-black font-display tracking-wide mb-3', isDark ? 'text-white' : 'text-[#0D1A12]')}>Tags</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {profile.tags.map((t) => (
                <span key={t} className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#1A5E3A]/10 text-[#1A5E3A] text-xs font-semibold font-body">
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
                className={cn('flex-1 px-3 py-2 rounded-xl text-sm font-body outline-none border', isDark ? 'bg-[#2d3d4a] border-[#3a4d5a] text-white' : 'bg-[#FFFFFF] border-[#C8E0D0] text-[#0D1A12]')}
              />
              <button onClick={addTag} className="px-4 rounded-xl bg-[#1A5E3A] text-white text-xs font-bold font-body flex items-center gap-1">
                <Plus size={12} /> Add
              </button>
            </div>
          </div>

          {/* Social links */}
          <div className={cn('rounded-2xl p-4 space-y-3', isDark ? 'bg-[#23323F]' : 'bg-[#FFFFFF] shadow-sm')}>
            <h3 className={cn('text-sm font-black font-display tracking-wide', isDark ? 'text-white' : 'text-[#0D1A12]')}>Social links</h3>

            {socialConfig.map(({ key, label, icon: Icon }) => (
              <div key={key} className="flex items-center gap-2">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', isDark ? 'bg-[#2d3d4a] text-[#C0D4C8]' : 'bg-[#EEF7F2] text-[#5C5650]')}>
                  <Icon size={16} />
                </div>
                <input
                  value={socialLinks[key] || ''}
                  onChange={(e) => setSocialLinks((s) => ({ ...s, [key]: e.target.value }))}
                  placeholder={`${label} URL`}
                  className={cn('flex-1 px-3 py-2.5 rounded-xl text-xs font-body outline-none border', isDark ? 'bg-[#2d3d4a] border-[#3a4d5a] text-white' : 'bg-[#FFFFFF] border-[#C8E0D0] text-[#0D1A12]')}
                />
              </div>
            ))}

            <div className="flex items-center gap-2">
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', isDark ? 'bg-[#2d3d4a] text-[#C0D4C8]' : 'bg-[#EEF7F2] text-[#5C5650]')}>
                <Globe size={16} />
              </div>
              <input
                value={socialLinks.website || ''}
                onChange={(e) => setSocialLinks((s) => ({ ...s, website: e.target.value }))}
                placeholder="Website URL"
                className={cn('flex-1 px-3 py-2.5 rounded-xl text-xs font-body outline-none border', isDark ? 'bg-[#2d3d4a] border-[#3a4d5a] text-white' : 'bg-[#FFFFFF] border-[#C8E0D0] text-[#0D1A12]')}
              />
            </div>
          </div>

          {/* Save */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={saveAll}
            className="w-full py-4 rounded-2xl bg-[#1A5E3A] text-white font-bold font-body text-sm flex items-center justify-center gap-2 shadow-lg"
          >
            <Save size={16} /> Save Club Profile
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
