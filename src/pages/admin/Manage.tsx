import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Plus, Save, ChevronDown, ChevronUp, X, Star, Trophy, Calendar, Link2 } from 'lucide-react'
import { InstagramIcon, FacebookIcon, LinkedinIcon, TikTokIcon } from '../../components/shared/SocialIcons'
import { useTheme } from '../../context/ThemeContext'
import { useToast } from '../../components/shared/Toast'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { clubs } from '../../data/clubs'
import { cn } from '../../lib/utils'
import type { ClubEvent } from '../../data/types'

const adminClub = clubs[0]

interface SpotlightEdit {
  title: string
  subtitle: string
  description: string
  image: string
}

interface MemberEdit {
  name: string
  role: string
  quote: string
  avatar: string
}

export function AdminManage() {
  const { isDark } = useTheme()
  const { toast } = useToast()

  const [spotlight, setSpotlight] = useLocalStorage<SpotlightEdit>('admin_spotlight', {
    title: adminClub.spotlightContent.clubOfWeek?.title || 'Club of the Week',
    subtitle: adminClub.spotlightContent.clubOfWeek?.subtitle || adminClub.name,
    description: adminClub.spotlightContent.clubOfWeek?.description || adminClub.description,
    image: adminClub.spotlightContent.clubOfWeek?.image || adminClub.coverImage,
  })

  const [memberEdit, setMemberEdit] = useLocalStorage<MemberEdit>('admin_member_month', {
    name: adminClub.spotlightContent.memberOfMonth?.name || '',
    role: adminClub.spotlightContent.memberOfMonth?.role || '',
    quote: adminClub.spotlightContent.memberOfMonth?.quote || '',
    avatar: adminClub.spotlightContent.memberOfMonth?.avatar || '',
  })

  const [events, setEvents] = useLocalStorage<ClubEvent[]>('admin_events', adminClub.events)
  const [socialLinks, setSocialLinks] = useLocalStorage('admin_socials', adminClub.socialLinks)
  const [expandedSection, setExpandedSection] = useState<string | null>('spotlight')

  const [newEvent, setNewEvent] = useState<Partial<ClubEvent>>({ type: 'Workshop', clubId: 'c1' })
  const [showEventForm, setShowEventForm] = useState(false)

  const Section = ({ id, title, icon: Icon, children }: { id: string; title: string; icon: React.ComponentType<{ size?: number; className?: string }>; children: React.ReactNode }) => {
    const open = expandedSection === id
    return (
      <div className={cn('rounded-2xl overflow-hidden shadow-sm', isDark ? 'bg-[#272831]' : 'bg-[#FFFFFF]')}>
        <button
          onClick={() => setExpandedSection(open ? null : id)}
          className={cn('w-full flex items-center justify-between px-5 py-4', isDark ? 'border-b border-[#35363F]' : open ? 'border-b border-[#ECECEF]' : '')}
        >
          <span className={cn('flex items-center gap-2 text-sm font-bold font-body', isDark ? 'text-white' : 'text-[#272831]')}>
            <Icon size={16} className="text-[#FDA014]" />
            {title}
          </span>
          {open ? <ChevronUp size={16} className={isDark ? 'text-[#929397]' : 'text-[#929397]'} /> : <ChevronDown size={16} className={isDark ? 'text-[#929397]' : 'text-[#929397]'} />}
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-5">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  const Field = ({ label, value, onChange, textarea }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) => (
    <div>
      <label className={cn('text-xs font-semibold font-body mb-1 block', isDark ? 'text-[#929397]' : 'text-[#6B6C72]')}>{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={cn('w-full px-3 py-2.5 rounded-xl text-sm font-body outline-none border resize-none', isDark ? 'bg-[#35363F] border-[#3D3E48] text-white' : 'bg-[#FFFFFF] border-[#E5E5E8] text-[#272831]')}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn('w-full px-3 py-2.5 rounded-xl text-sm font-body outline-none border', isDark ? 'bg-[#35363F] border-[#3D3E48] text-white' : 'bg-[#FFFFFF] border-[#E5E5E8] text-[#272831]')}
        />
      )}
    </div>
  )

  return (
    <div className="phone-scroll h-[844px] pb-24" style={{ background: isDark ? '#272831' : '#F5F5F6' }}>
      <div className={cn('pt-12 pb-4 px-5', isDark ? 'bg-[#272831]' : 'bg-[#F5F5F6]')}>
        <h1 className={cn('text-xl font-semibold font-display tracking-wide', isDark ? 'text-white' : 'text-[#272831]')}>Manage Content</h1>
        <p className={cn('text-xs mt-1 font-body', isDark ? 'text-[#929397]' : 'text-[#929397]')}>Editing: {adminClub.name}</p>
      </div>

      <div className="px-5 space-y-3">
        {/* Club of the Week */}
        <Section id="spotlight" title="Club of the Week" icon={Star}>
          <div className="space-y-3">
            <Field label="Title" value={spotlight.title} onChange={(v) => setSpotlight((s) => ({ ...s, title: v }))} />
            <Field label="Subtitle" value={spotlight.subtitle} onChange={(v) => setSpotlight((s) => ({ ...s, subtitle: v }))} />
            <Field label="Description" value={spotlight.description} onChange={(v) => setSpotlight((s) => ({ ...s, description: v }))} textarea />
            <Field label="Image URL" value={spotlight.image} onChange={(v) => setSpotlight((s) => ({ ...s, image: v }))} />
            {spotlight.image && <img src={spotlight.image} alt="preview" className="w-full h-32 object-cover rounded-xl" loading="lazy" />}
            <motion.button whileTap={{ scale: 0.97 }} onClick={() => toast('Club spotlight saved!', 'success')}
              className="w-full py-3 rounded-xl bg-[#6F2F33] text-white text-sm font-bold font-body flex items-center justify-center gap-2">
              <Save size={14} /> Save Changes
            </motion.button>
          </div>
        </Section>

        {/* Member of the Month */}
        <Section id="member" title="Member of the Month" icon={Trophy}>
          <div className="space-y-3">
            <Field label="Name" value={memberEdit.name} onChange={(v) => setMemberEdit((m) => ({ ...m, name: v }))} />
            <Field label="Role" value={memberEdit.role} onChange={(v) => setMemberEdit((m) => ({ ...m, role: v }))} />
            <Field label="Quote" value={memberEdit.quote} onChange={(v) => setMemberEdit((m) => ({ ...m, quote: v }))} textarea />
            <Field label="Photo URL" value={memberEdit.avatar} onChange={(v) => setMemberEdit((m) => ({ ...m, avatar: v }))} />
            {memberEdit.avatar && <img src={memberEdit.avatar} alt="preview" className="w-16 h-16 rounded-xl object-cover" />}
            <motion.button whileTap={{ scale: 0.97 }} onClick={() => toast('Member of the Month saved!', 'success')}
              className="w-full py-3 rounded-xl bg-[#6F2F33] text-white text-sm font-bold font-body flex items-center justify-center gap-2">
              <Save size={14} /> Save Changes
            </motion.button>
          </div>
        </Section>

        {/* Events */}
        <Section id="events" title="Events" icon={Calendar}>
          <div className="space-y-3">
            {events.map((ev) => (
              <div key={ev.id} className={cn('flex items-center gap-3 p-3 rounded-xl', isDark ? 'bg-[#35363F]' : 'bg-[#FFFFFF]')}>
                <div className="flex-1">
                  <p className={cn('text-xs font-bold font-body', isDark ? 'text-white' : 'text-[#272831]')}>{ev.title}</p>
                  <p className={cn('text-[10px] font-mono', isDark ? 'text-[#929397]' : 'text-[#929397]')}>{ev.date} · {ev.location}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#FDA014]/10 text-[#FDA014] text-[10px] font-bold font-body">{ev.type}</span>
              </div>
            ))}

            {showEventForm && (
              <div className={cn('p-4 rounded-xl space-y-3 border-2 border-[#FDA014]/20', isDark ? 'bg-[#35363F]' : 'bg-[#FFEDCF]/30')}>
                {['title', 'date', 'time', 'location'].map((f) => (
                  <Field
                    key={f}
                    label={f.charAt(0).toUpperCase() + f.slice(1)}
                    value={(newEvent as Record<string, string>)[f] || ''}
                    onChange={(v) => setNewEvent((e) => ({ ...e, [f]: v }))}
                  />
                ))}
                <div className="flex gap-2">
                  {(['Workshop', 'Social', 'Competition', 'Talk'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setNewEvent((e) => ({ ...e, type: t }))}
                      className={cn('px-2 py-1 rounded-lg text-xs font-semibold font-body', newEvent.type === t ? 'bg-[#6F2F33] text-white' : isDark ? 'bg-[#272831] text-[#929397]' : 'bg-[#FFFFFF] text-[#929397]')}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    if (!newEvent.title || !newEvent.date) { toast('Title and date required', 'error'); return }
                    const ev: ClubEvent = { id: `e${Date.now()}`, clubId: 'c1', title: newEvent.title!, date: newEvent.date!, time: newEvent.time || '', location: newEvent.location || '', description: '', type: newEvent.type || 'Workshop' }
                    setEvents((prev) => [...prev, ev])
                    setNewEvent({ type: 'Workshop', clubId: 'c1' })
                    setShowEventForm(false)
                    toast('Event added!', 'success')
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#6F2F33] text-white text-sm font-bold font-body"
                >
                  Add Event
                </button>
              </div>
            )}

            <button
              onClick={() => setShowEventForm(!showEventForm)}
              className={cn('w-full py-3 rounded-xl border-2 border-dashed text-sm font-semibold font-body flex items-center justify-center gap-2', isDark ? 'border-[#35363F] text-[#929397]' : 'border-[#B8B9C1] text-[#929397]')}
            >
              {showEventForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Add Event</>}
            </button>
          </div>
        </Section>

        {/* Social Links */}
        <Section id="socials" title="Social Links" icon={Link2}>
          <div className="space-y-3">
            {([
              { key: 'instagram', icon: <InstagramIcon size={16} />, label: 'Instagram URL' },
              { key: 'facebook', icon: <FacebookIcon size={16} />, label: 'Facebook URL' },
              { key: 'linkedin', icon: <LinkedinIcon size={16} />, label: 'LinkedIn URL' },
              { key: 'tiktok', icon: <TikTokIcon size={16} />, label: 'TikTok URL' },
              { key: 'website', icon: <Globe size={16} />, label: 'Website URL' },
            ] as const).map(({ key, icon, label }) => (
              <div key={key} className="flex items-center gap-2">
                <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', isDark ? 'bg-[#35363F] text-[#B8B9C1]' : 'bg-[#F0F0F2] text-[#929397]')}>
                  {icon}
                </div>
                <input
                  value={(socialLinks as Record<string, string>)[key] || ''}
                  onChange={(e) => setSocialLinks((s) => ({ ...s, [key]: e.target.value }))}
                  placeholder={label}
                  className={cn('flex-1 px-3 py-2.5 rounded-xl text-xs font-body outline-none border', isDark ? 'bg-[#35363F] border-[#3D3E48] text-white' : 'bg-[#FFFFFF] border-[#E5E5E8] text-[#272831]')}
                />
              </div>
            ))}
            <motion.button whileTap={{ scale: 0.97 }} onClick={() => toast('Social links saved!', 'success')}
              className="w-full py-3 rounded-xl bg-[#6F2F33] text-white text-sm font-bold font-body flex items-center justify-center gap-2">
              <Save size={14} /> Save Links
            </motion.button>
          </div>
        </Section>
      </div>
    </div>
  )
}
