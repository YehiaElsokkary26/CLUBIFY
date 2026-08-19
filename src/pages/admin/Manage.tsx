import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe, Plus, Save, ChevronDown, ChevronUp, X, Star, Trophy,
  Calendar, Link2, Users, UserCheck, Clock, Trash2, ToggleLeft,
  ToggleRight, AlertCircle, CheckCircle, XCircle, RefreshCw,
} from 'lucide-react'
import { InstagramIcon, FacebookIcon, LinkedinIcon, TikTokIcon } from '../../components/shared/SocialIcons'
import { useTheme } from '../../context/ThemeContext'
import { useToast } from '../../components/shared/Toast'
import { useAuth } from '../../context/AuthContext'
import { cn } from '../../lib/utils'
import {
  getClub, updateClub, toggleRecruitment,
  getEvents, addEvent, removeEvent,
  getSlots, addSlot, removeSlot,
  getApplications, updateApplicationStatus, getSlots as getDbSlots,
} from '../../lib/db'
import type { Club, ClubEvent } from '../../data/types'
import type { InterviewSlot, Application } from '../../lib/db'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatSlotDT(iso: string) {
  const d = new Date(iso)
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}

function statusColor(status: Application['status']) {
  if (status === 'accepted') return 'text-green-600 bg-green-50 border-green-200'
  if (status === 'rejected') return 'text-red-600 bg-red-50 border-red-200'
  if (status === 'interview_scheduled') return 'text-blue-600 bg-blue-50 border-blue-200'
  return 'text-[#FDA014] bg-[#FDA014]/10 border-[#FDA014]/30'
}

function statusLabel(status: Application['status']) {
  if (status === 'accepted') return 'Accepted'
  if (status === 'rejected') return 'Rejected'
  if (status === 'interview_scheduled') return 'Interview Set'
  return 'Pending'
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Field({
  label, value, onChange, textarea,
}: {
  label: string; value: string; onChange: (v: string) => void; textarea?: boolean
}) {
  const { isDark } = useTheme()
  return (
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
}

function Section({
  id, title, icon: Icon, children, expandedSection, setExpandedSection, badge,
}: {
  id: string
  title: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  children: React.ReactNode
  expandedSection: string | null
  setExpandedSection: (v: string | null) => void
  badge?: number
}) {
  const { isDark } = useTheme()
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
          {badge !== undefined && badge > 0 && (
            <span className="ml-1 w-5 h-5 rounded-full bg-[#6F2F33] text-white text-[10px] font-bold flex items-center justify-center">
              {badge}
            </span>
          )}
        </span>
        {open ? <ChevronUp size={16} className="text-[#929397]" /> : <ChevronDown size={16} className="text-[#929397]" />}
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

// ─── Main Component ───────────────────────────────────────────────────────────

export function AdminManage() {
  const { isDark } = useTheme()
  const { toast } = useToast()
  const { user } = useAuth()

  const clubId = user?.managedClubId ?? 'guc-enactus'

  const [club, setClub] = useState<Club | null>(null)
  const [events, setEvents] = useState<ClubEvent[]>([])
  const [slots, setSlots] = useState<InterviewSlot[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [expandedSection, setExpandedSection] = useState<string | null>('recruitment')

  // About fields
  const [description, setDescription] = useState('')
  const [mission, setMission] = useState('')
  const [whoShouldJoin, setWhoShouldJoin] = useState('')
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({})

  // New event form
  const [showEventForm, setShowEventForm] = useState(false)
  const [newEvent, setNewEvent] = useState<Partial<ClubEvent>>({ type: 'Workshop' })

  // New slot form
  const [showSlotForm, setShowSlotForm] = useState(false)
  const [slotDate, setSlotDate] = useState('')
  const [slotTime, setSlotTime] = useState('')
  const [slotCommittee, setSlotCommittee] = useState('')

  function reload() {
    const c = getClub(clubId)
    if (!c) return
    setClub(c)
    setDescription(c.description)
    setMission(c.mission)
    setWhoShouldJoin(c.whoShouldJoin)
    setSocialLinks(c.socialLinks as Record<string, string>)
    setEvents(getEvents(clubId))
    setSlots(getDbSlots(clubId))
    setApplications(getApplications(clubId))
  }

  useEffect(() => { reload() }, [clubId])

  if (!club) {
    return (
      <div className="h-full flex items-center justify-center" style={{ background: isDark ? '#272831' : '#F5F5F6' }}>
        <p className="text-sm text-[#929397]">No club assigned to your admin account.</p>
      </div>
    )
  }

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleToggleRecruitment = () => {
    const newVal = !club.isRecruiting
    toggleRecruitment(clubId, newVal)
    setClub((prev) => prev ? { ...prev, isRecruiting: newVal } : prev)
    toast(newVal ? 'Recruitment is now OPEN 🎉' : 'Recruitment closed.', newVal ? 'success' : 'info')
  }

  const handleSaveAbout = () => {
    updateClub(clubId, { description, mission, whoShouldJoin })
    toast('Club info saved!', 'success')
  }

  const handleSaveSocials = () => {
    updateClub(clubId, { socialLinks })
    toast('Social links saved!', 'success')
  }

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) { toast('Title and date are required', 'error'); return }
    const ev: ClubEvent = {
      id: `ev-${Date.now()}`,
      clubId,
      title: newEvent.title!,
      date: newEvent.date!,
      time: newEvent.time || '',
      location: newEvent.location || 'TBC',
      description: newEvent.description || '',
      type: newEvent.type || 'Workshop',
    }
    addEvent(ev)
    setEvents((prev) => [...prev, ev])
    setNewEvent({ type: 'Workshop' })
    setShowEventForm(false)
    toast('Event added!', 'success')
  }

  const handleRemoveEvent = (id: string) => {
    removeEvent(id)
    setEvents((prev) => prev.filter((e) => e.id !== id))
    toast('Event removed', 'info')
  }

  const handleAddSlot = () => {
    if (!slotDate || !slotTime) { toast('Date and time are required', 'error'); return }
    if (!slotCommittee) { toast('Select a committee for this slot', 'error'); return }
    const datetime = new Date(`${slotDate}T${slotTime}`).toISOString()
    const slot = addSlot({ clubId, committeeId: slotCommittee, datetime })
    setSlots((prev) => [...prev, slot])
    setSlotDate('')
    setSlotTime('')
    setSlotCommittee('')
    setShowSlotForm(false)
    toast('Interview slot added!', 'success')
  }

  const handleRemoveSlot = (id: string) => {
    removeSlot(id)
    setSlots((prev) => prev.filter((s) => s.id !== id))
    toast('Slot removed', 'info')
  }

  const handleAppStatus = (appId: string, status: Application['status']) => {
    updateApplicationStatus(appId, status)
    setApplications((prev) => prev.map((a) => a.id === appId ? { ...a, status } : a))
    toast(`Application marked as ${statusLabel(status)}`, 'success')
  }

  const pendingCount = applications.filter((a) => a.status === 'pending' || a.status === 'interview_scheduled').length

  return (
    <div className="phone-scroll h-[844px] pb-24" style={{ background: isDark ? '#1E1F26' : '#F5F5F6' }}>
      {/* Header */}
      <div className={cn('pt-12 pb-4 px-5', isDark ? 'bg-[#1E1F26]' : 'bg-[#F5F5F6]')}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={cn('text-xl font-black font-display tracking-wide', isDark ? 'text-white' : 'text-[#272831]')}>
              Manage
            </h1>
            <p className={cn('text-xs mt-0.5 font-body', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
              {club.name}
            </p>
          </div>
          <button onClick={reload} className={cn('w-9 h-9 rounded-full flex items-center justify-center', isDark ? 'bg-[#272831]' : 'bg-white shadow-sm')}>
            <RefreshCw size={16} className="text-[#929397]" />
          </button>
        </div>
      </div>

      <div className="px-5 space-y-3">

        {/* ── RECRUITMENT TOGGLE ─────────────────────────────────────────── */}
        <Section id="recruitment" title="Recruitment" icon={Users} expandedSection={expandedSection} setExpandedSection={setExpandedSection}>
          <div className="space-y-4">
            {/* Status card */}
            <div className={cn('rounded-2xl p-4 flex items-center justify-between border-2', club.isRecruiting
              ? isDark ? 'bg-green-900/20 border-green-700/40' : 'bg-green-50 border-green-200'
              : isDark ? 'bg-[#35363F] border-[#3D3E48]' : 'bg-[#F0F0F2] border-[#E0E0E5]'
            )}>
              <div>
                <p className={cn('text-sm font-bold font-body', club.isRecruiting ? 'text-green-600' : isDark ? 'text-white' : 'text-[#272831]')}>
                  Recruitment is {club.isRecruiting ? 'OPEN' : 'CLOSED'}
                </p>
                <p className={cn('text-xs mt-0.5 font-body', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
                  {club.isRecruiting
                    ? 'Students can currently apply to your club.'
                    : 'Students cannot apply until you open recruitment.'}
                </p>
              </div>
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={handleToggleRecruitment}
                className="flex-shrink-0"
              >
                {club.isRecruiting
                  ? <ToggleRight size={40} className="text-green-500" />
                  : <ToggleLeft size={40} className={isDark ? 'text-[#929397]' : 'text-[#B8B9C1]'} />
                }
              </motion.button>
            </div>

            {/* Committees list */}
            <div>
              <p className={cn('text-xs font-bold uppercase tracking-wider mb-2', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
                Your Committees
              </p>
              <div className="space-y-2">
                {club.committees.map((cm) => (
                  <div key={cm.id} className={cn('flex items-center justify-between p-3 rounded-xl', isDark ? 'bg-[#35363F]' : 'bg-[#F5F5F6]')}>
                    <div>
                      <p className={cn('text-xs font-bold font-body', isDark ? 'text-white' : 'text-[#272831]')}>{cm.name}</p>
                      <p className={cn('text-[10px] font-body', isDark ? 'text-[#929397]' : 'text-[#929397]')}>{cm.spotsAvailable} spots</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#FDA014]/10 text-[#FDA014] text-[10px] font-bold">
                      {applications.filter((a) => a.committeeId === cm.id).length} applied
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ── APPLICATIONS ──────────────────────────────────────────────── */}
        <Section
          id="applications"
          title="Applications"
          icon={UserCheck}
          expandedSection={expandedSection}
          setExpandedSection={setExpandedSection}
          badge={pendingCount}
        >
          {applications.length === 0 ? (
            <div className="text-center py-6">
              <p className={cn('text-sm font-body', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
                No applications yet.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {applications.map((app) => {
                const bookedSlot = app.slotId ? slots.find((s) => s.id === app.slotId) : null
                return (
                  <div key={app.id} className={cn('rounded-2xl p-4 border', isDark ? 'bg-[#35363F] border-[#3D3E48]' : 'bg-[#FFFFFF] border-[#ECECEF]')}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className={cn('text-sm font-bold font-body', isDark ? 'text-white' : 'text-[#272831]')}>
                          {app.studentName}
                        </p>
                        <p className={cn('text-[10px] font-body', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
                          {app.committeeName}
                        </p>
                        {bookedSlot && (
                          <p className="text-[10px] text-blue-500 mt-0.5">
                            📅 {formatSlotDT(bookedSlot.datetime)}
                          </p>
                        )}
                      </div>
                      <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full border', statusColor(app.status))}>
                        {statusLabel(app.status)}
                      </span>
                    </div>
                    {/* Action buttons */}
                    {app.status !== 'accepted' && app.status !== 'rejected' && (
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleAppStatus(app.id, 'accepted')}
                          className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-green-500 text-white text-xs font-bold"
                        >
                          <CheckCircle size={12} /> Accept
                        </button>
                        <button
                          onClick={() => handleAppStatus(app.id, 'rejected')}
                          className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-red-500 text-white text-xs font-bold"
                        >
                          <XCircle size={12} /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </Section>

        {/* ── INTERVIEW SLOTS ──────────────────────────────────────────── */}
        <Section id="slots" title="Interview Slots" icon={Clock} expandedSection={expandedSection} setExpandedSection={setExpandedSection}>
          <div className="space-y-3">
            {slots.length === 0 && !showSlotForm && (
              <p className={cn('text-sm font-body text-center py-4', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
                No slots added yet. Add slots for students to book.
              </p>
            )}

            {slots.map((slot) => (
              <div key={slot.id} className={cn('flex items-center gap-3 p-3 rounded-xl', isDark ? 'bg-[#35363F]' : 'bg-[#F5F5F6]')}>
                <Clock size={14} className={isDark ? 'text-[#929397]' : 'text-[#929397]'} />
                <div className="flex-1">
                  <p className={cn('text-xs font-bold font-body', isDark ? 'text-white' : 'text-[#272831]')}>
                    {formatSlotDT(slot.datetime)}
                  </p>
                  <p className={cn('text-[10px]', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
                    {club.committees.find((c) => c.id === slot.committeeId)?.name || slot.committeeId}
                    {' · '}
                    {slot.isBooked ? (
                      <span className="text-green-500">Booked</span>
                    ) : (
                      <span className="text-[#FDA014]">Available</span>
                    )}
                  </p>
                </div>
                {!slot.isBooked && (
                  <button onClick={() => handleRemoveSlot(slot.id)} className="p-1.5 rounded-lg bg-red-100">
                    <Trash2 size={12} className="text-red-500" />
                  </button>
                )}
              </div>
            ))}

            {showSlotForm && (
              <div className={cn('p-4 rounded-2xl space-y-3 border-2 border-[#FDA014]/20', isDark ? 'bg-[#35363F]' : 'bg-[#FFF8EC]')}>
                <div>
                  <label className={cn('text-xs font-semibold font-body mb-1 block', isDark ? 'text-[#929397]' : 'text-[#6B6C72]')}>Committee</label>
                  <select
                    value={slotCommittee}
                    onChange={(e) => setSlotCommittee(e.target.value)}
                    className={cn('w-full px-3 py-2.5 rounded-xl text-sm font-body outline-none border', isDark ? 'bg-[#272831] border-[#3D3E48] text-white' : 'bg-[#FFFFFF] border-[#E5E5E8] text-[#272831]')}
                  >
                    <option value="">Select committee…</option>
                    {club.committees.map((cm) => (
                      <option key={cm.id} value={cm.id}>{cm.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={cn('text-xs font-semibold font-body mb-1 block', isDark ? 'text-[#929397]' : 'text-[#6B6C72]')}>Date</label>
                    <input type="date" value={slotDate} onChange={(e) => setSlotDate(e.target.value)}
                      className={cn('w-full px-3 py-2.5 rounded-xl text-sm font-body outline-none border', isDark ? 'bg-[#272831] border-[#3D3E48] text-white' : 'bg-[#FFFFFF] border-[#E5E5E8] text-[#272831]')}
                    />
                  </div>
                  <div>
                    <label className={cn('text-xs font-semibold font-body mb-1 block', isDark ? 'text-[#929397]' : 'text-[#6B6C72]')}>Time</label>
                    <input type="time" value={slotTime} onChange={(e) => setSlotTime(e.target.value)}
                      className={cn('w-full px-3 py-2.5 rounded-xl text-sm font-body outline-none border', isDark ? 'bg-[#272831] border-[#3D3E48] text-white' : 'bg-[#FFFFFF] border-[#E5E5E8] text-[#272831]')}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleAddSlot}
                    className="flex-1 py-2.5 rounded-xl bg-[#6F2F33] text-white text-sm font-bold font-body">
                    Add Slot
                  </button>
                  <button onClick={() => setShowSlotForm(false)}
                    className={cn('px-4 py-2.5 rounded-xl text-sm font-bold font-body', isDark ? 'bg-[#272831] text-[#929397]' : 'bg-white text-[#929397]')}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {!showSlotForm && (
              <button
                onClick={() => setShowSlotForm(true)}
                className={cn('w-full py-3 rounded-xl border-2 border-dashed text-sm font-semibold font-body flex items-center justify-center gap-2', isDark ? 'border-[#35363F] text-[#929397]' : 'border-[#B8B9C1] text-[#929397]')}
              >
                <Plus size={16} /> Add Interview Slot
              </button>
            )}
          </div>
        </Section>

        {/* ── EVENTS ──────────────────────────────────────────────────── */}
        <Section id="events" title="Events" icon={Calendar} expandedSection={expandedSection} setExpandedSection={setExpandedSection}>
          <div className="space-y-3">
            {events.map((ev) => (
              <div key={ev.id} className={cn('flex items-center gap-3 p-3 rounded-xl', isDark ? 'bg-[#35363F]' : 'bg-[#F5F5F6]')}>
                <div className="flex-1">
                  <p className={cn('text-xs font-bold font-body', isDark ? 'text-white' : 'text-[#272831]')}>{ev.title}</p>
                  <p className={cn('text-[10px] font-body', isDark ? 'text-[#929397]' : 'text-[#929397]')}>{ev.date} · {ev.location}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#FDA014]/10 text-[#FDA014] text-[10px] font-bold">{ev.type}</span>
                <button onClick={() => handleRemoveEvent(ev.id)} className="p-1.5 rounded-lg bg-red-100">
                  <Trash2 size={12} className="text-red-500" />
                </button>
              </div>
            ))}

            {showEventForm && (
              <div className={cn('p-4 rounded-2xl space-y-3 border-2 border-[#FDA014]/20', isDark ? 'bg-[#35363F]' : 'bg-[#FFF8EC]')}>
                {(['title', 'date', 'time', 'location', 'description'] as const).map((f) => (
                  <Field
                    key={f}
                    label={f.charAt(0).toUpperCase() + f.slice(1)}
                    value={(newEvent as Record<string, string>)[f] || ''}
                    onChange={(v) => setNewEvent((e) => ({ ...e, [f]: v }))}
                    textarea={f === 'description'}
                  />
                ))}
                <div>
                  <label className={cn('text-xs font-semibold font-body mb-1 block', isDark ? 'text-[#929397]' : 'text-[#6B6C72]')}>Type</label>
                  <div className="flex gap-2 flex-wrap">
                    {(['Workshop', 'Social', 'Competition', 'Talk', 'Meeting'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setNewEvent((e) => ({ ...e, type: t }))}
                        className={cn('px-3 py-1.5 rounded-lg text-xs font-semibold font-body transition-colors', newEvent.type === t ? 'bg-[#6F2F33] text-white' : isDark ? 'bg-[#272831] text-[#929397]' : 'bg-[#FFFFFF] text-[#929397] border border-[#E5E5E8]')}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleAddEvent}
                    className="flex-1 py-2.5 rounded-xl bg-[#6F2F33] text-white text-sm font-bold font-body">
                    Add Event
                  </button>
                  <button onClick={() => setShowEventForm(false)}
                    className={cn('px-4 py-2.5 rounded-xl text-sm font-bold font-body', isDark ? 'bg-[#272831] text-[#929397]' : 'bg-white text-[#929397]')}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {!showEventForm && (
              <button
                onClick={() => setShowEventForm(true)}
                className={cn('w-full py-3 rounded-xl border-2 border-dashed text-sm font-semibold font-body flex items-center justify-center gap-2', isDark ? 'border-[#35363F] text-[#929397]' : 'border-[#B8B9C1] text-[#929397]')}
              >
                <Plus size={16} /> Add Event
              </button>
            )}
          </div>
        </Section>

        {/* ── ABOUT & DESCRIPTION ─────────────────────────────────────── */}
        <Section id="about" title="About the Club" icon={Star} expandedSection={expandedSection} setExpandedSection={setExpandedSection}>
          <div className="space-y-3">
            <Field label="Description" value={description} onChange={setDescription} textarea />
            <Field label="Mission" value={mission} onChange={setMission} textarea />
            <Field label="Who Should Join" value={whoShouldJoin} onChange={setWhoShouldJoin} textarea />
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSaveAbout}
              className="w-full py-3 rounded-xl bg-[#6F2F33] text-white text-sm font-bold font-body flex items-center justify-center gap-2"
            >
              <Save size={14} /> Save Changes
            </motion.button>
          </div>
        </Section>

        {/* ── SOCIAL LINKS ────────────────────────────────────────────── */}
        <Section id="socials" title="Social Links" icon={Link2} expandedSection={expandedSection} setExpandedSection={setExpandedSection}>
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
                  value={socialLinks[key] || ''}
                  onChange={(e) => setSocialLinks((s) => ({ ...s, [key]: e.target.value }))}
                  placeholder={label}
                  className={cn('flex-1 px-3 py-2.5 rounded-xl text-xs font-body outline-none border', isDark ? 'bg-[#35363F] border-[#3D3E48] text-white' : 'bg-[#FFFFFF] border-[#E5E5E8] text-[#272831]')}
                />
              </div>
            ))}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSaveSocials}
              className="w-full py-3 rounded-xl bg-[#6F2F33] text-white text-sm font-bold font-body flex items-center justify-center gap-2"
            >
              <Save size={14} /> Save Links
            </motion.button>
          </div>
        </Section>

        {/* Spacer */}
        <div className="h-4" />
      </div>
    </div>
  )
}
