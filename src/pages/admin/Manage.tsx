import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Calendar, Globe, Plus, Edit2, Save, ChevronDown, ChevronUp, X } from 'lucide-react'
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

  const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => {
    const open = expandedSection === id
    return (
      <div className={cn('rounded-2xl overflow-hidden shadow-sm', isDark ? 'bg-[#2C2C2E]' : 'bg-white')}>
        <button
          onClick={() => setExpandedSection(open ? null : id)}
          className={cn('w-full flex items-center justify-between px-5 py-4', isDark ? 'border-b border-[#3A3A3C]' : open ? 'border-b border-gray-100' : '')}
        >
          <span className={cn('text-sm font-bold', isDark ? 'text-white' : 'text-[#1C1C1E]')}>{title}</span>
          {open ? <ChevronUp size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} /> : <ChevronDown size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />}
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
      <label className={cn('text-xs font-semibold mb-1 block', isDark ? 'text-gray-400' : 'text-gray-600')}>{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={cn('w-full px-3 py-2.5 rounded-xl text-sm outline-none border resize-none', isDark ? 'bg-[#3A3A3C] border-[#4A4A4C] text-white' : 'bg-gray-50 border-gray-200 text-[#1C1C1E]')}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn('w-full px-3 py-2.5 rounded-xl text-sm outline-none border', isDark ? 'bg-[#3A3A3C] border-[#4A4A4C] text-white' : 'bg-gray-50 border-gray-200 text-[#1C1C1E]')}
        />
      )}
    </div>
  )

  return (
    <div className="phone-scroll h-[844px] pb-24" style={{ background: isDark ? '#1C1C1E' : '#FAF8F5' }}>
      <div className={cn('pt-12 pb-4 px-5', isDark ? 'bg-[#1C1C1E]' : 'bg-[#FAF8F5]')}>
        <h1 className={cn('text-2xl font-black', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Manage Content</h1>
        <p className={cn('text-xs mt-1', isDark ? 'text-gray-400' : 'text-gray-500')}>Editing: {adminClub.name}</p>
      </div>

      <div className="px-5 space-y-3">
        {/* Club of the Week */}
        <Section id="spotlight" title="⭐ Club of the Week">
          <div className="space-y-3">
            <Field label="Title" value={spotlight.title} onChange={(v) => setSpotlight((s) => ({ ...s, title: v }))} />
            <Field label="Subtitle" value={spotlight.subtitle} onChange={(v) => setSpotlight((s) => ({ ...s, subtitle: v }))} />
            <Field label="Description" value={spotlight.description} onChange={(v) => setSpotlight((s) => ({ ...s, description: v }))} textarea />
            <Field label="Image URL" value={spotlight.image} onChange={(v) => setSpotlight((s) => ({ ...s, image: v }))} />
            {spotlight.image && <img src={spotlight.image} alt="preview" className="w-full h-32 object-cover rounded-xl" loading="lazy" />}
            <motion.button whileTap={{ scale: 0.97 }} onClick={() => toast('Club spotlight saved!', 'success')}
              className="w-full py-3 rounded-xl bg-[#8B1A1A] text-white text-sm font-bold flex items-center justify-center gap-2">
              <Save size={14} /> Save Changes
            </motion.button>
          </div>
        </Section>

        {/* Member of the Month */}
        <Section id="member" title="🏆 Member of the Month">
          <div className="space-y-3">
            <Field label="Name" value={memberEdit.name} onChange={(v) => setMemberEdit((m) => ({ ...m, name: v }))} />
            <Field label="Role" value={memberEdit.role} onChange={(v) => setMemberEdit((m) => ({ ...m, role: v }))} />
            <Field label="Quote" value={memberEdit.quote} onChange={(v) => setMemberEdit((m) => ({ ...m, quote: v }))} textarea />
            <Field label="Photo URL" value={memberEdit.avatar} onChange={(v) => setMemberEdit((m) => ({ ...m, avatar: v }))} />
            {memberEdit.avatar && <img src={memberEdit.avatar} alt="preview" className="w-16 h-16 rounded-xl object-cover" />}
            <motion.button whileTap={{ scale: 0.97 }} onClick={() => toast('Member of the Month saved!', 'success')}
              className="w-full py-3 rounded-xl bg-[#8B1A1A] text-white text-sm font-bold flex items-center justify-center gap-2">
              <Save size={14} /> Save Changes
            </motion.button>
          </div>
        </Section>

        {/* Events */}
        <Section id="events" title="📅 Events">
          <div className="space-y-3">
            {events.map((ev) => (
              <div key={ev.id} className={cn('flex items-center gap-3 p-3 rounded-xl', isDark ? 'bg-[#3A3A3C]' : 'bg-gray-50')}>
                <div className="flex-1">
                  <p className={cn('text-xs font-bold', isDark ? 'text-white' : 'text-[#1C1C1E]')}>{ev.title}</p>
                  <p className={cn('text-[10px]', isDark ? 'text-gray-400' : 'text-gray-500')}>{ev.date} · {ev.location}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#8B1A1A]/10 text-[#8B1A1A] text-[10px] font-bold">{ev.type}</span>
              </div>
            ))}

            {showEventForm && (
              <div className={cn('p-4 rounded-xl space-y-3 border-2 border-[#8B1A1A]/20', isDark ? 'bg-[#3A3A3C]' : 'bg-[#FAF0F0]')}>
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
                      className={cn('px-2 py-1 rounded-lg text-xs font-semibold', newEvent.type === t ? 'bg-[#8B1A1A] text-white' : isDark ? 'bg-[#2C2C2E] text-gray-400' : 'bg-white text-gray-500')}
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
                  className="w-full py-2.5 rounded-xl bg-[#8B1A1A] text-white text-sm font-bold"
                >
                  Add Event
                </button>
              </div>
            )}

            <button
              onClick={() => setShowEventForm(!showEventForm)}
              className={cn('w-full py-3 rounded-xl border-2 border-dashed text-sm font-semibold flex items-center justify-center gap-2', isDark ? 'border-[#3A3A3C] text-gray-400' : 'border-gray-300 text-gray-500')}
            >
              {showEventForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Add Event</>}
            </button>
          </div>
        </Section>

        {/* Social Links */}
        <Section id="socials" title="🔗 Social Links">
          <div className="space-y-3">
            {([
              { key: 'instagram', icon: <InstagramIcon size={16} />, label: 'Instagram URL' },
              { key: 'facebook', icon: <FacebookIcon size={16} />, label: 'Facebook URL' },
              { key: 'linkedin', icon: <LinkedinIcon size={16} />, label: 'LinkedIn URL' },
              { key: 'tiktok', icon: <TikTokIcon size={16} />, label: 'TikTok URL' },
              { key: 'website', icon: <Globe size={16} />, label: 'Website URL' },
            ] as const).map(({ key, icon, label }) => (
              <div key={key} className="flex items-center gap-2">
                <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', isDark ? 'bg-[#3A3A3C] text-gray-300' : 'bg-gray-100 text-gray-500')}>
                  {icon}
                </div>
                <input
                  value={(socialLinks as Record<string, string>)[key] || ''}
                  onChange={(e) => setSocialLinks((s) => ({ ...s, [key]: e.target.value }))}
                  placeholder={label}
                  className={cn('flex-1 px-3 py-2.5 rounded-xl text-xs outline-none border', isDark ? 'bg-[#3A3A3C] border-[#4A4A4C] text-white' : 'bg-gray-50 border-gray-200 text-[#1C1C1E]')}
                />
              </div>
            ))}
            <motion.button whileTap={{ scale: 0.97 }} onClick={() => toast('Social links saved!', 'success')}
              className="w-full py-3 rounded-xl bg-[#8B1A1A] text-white text-sm font-bold flex items-center justify-center gap-2">
              <Save size={14} /> Save Links
            </motion.button>
          </div>
        </Section>
      </div>
    </div>
  )
}
