import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Edit3, Check, X, AlertTriangle, Calendar, Settings, Camera, Upload, Trash2, FileText, CheckCircle, UserCog, Users, UserMinus, Star, History, Clock } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useToast } from '../../components/shared/Toast'
import { cn } from '../../lib/utils'
import { clubs } from '../../data/clubs'
import { getUpcomingEvents, allEvents } from '../../data/events'
import { getStudentApplications, getClub as getDbClub } from '../../lib/db'
import type { Application } from '../../lib/db'

interface Membership {
  clubId: string
  committee: string
  joinDate: string
}

interface Rsvp {
  eventId: string
  clubId: string
  status: 'going' | 'interested' | 'not_going'
}

interface Review {
  eventId: string
  rating: number
  comment?: string
}

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

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
  const [myApplications, setMyApplications] = useState<Application[]>([])
  const [memberships, setMemberships] = useState<Membership[]>(() => readJSON('clubify_memberships', []))
  const [rsvps, setRsvps] = useState<Rsvp[]>(() => readJSON('clubify_rsvps', []))
  const [reviews, setReviews] = useState<Review[]>(() => readJSON('clubify_reviews', []))
  const [following, setFollowing] = useState<string[]>(() => readJSON('clubify_following', []))

  // Seed demo activity data on first visit so the sections aren't empty, without ever
  // overwriting data the user (or another feature) already wrote to these keys.
  useEffect(() => {
    if (!user || user.joinedClubs.length === 0) return

    if (localStorage.getItem('clubify_memberships') === null) {
      const seeded: Membership[] = user.joinedClubs.map((clubId, i) => {
        const club = clubs.find((c) => c.id === clubId)
        const joinDate = new Date(Date.now() - (180 + i * 40) * 86400000).toISOString().slice(0, 10)
        return { clubId, committee: club?.committees[0]?.name || 'General Member', joinDate }
      })
      localStorage.setItem('clubify_memberships', JSON.stringify(seeded))
      setMemberships(seeded)
    }

    const pastEventsForMyClubs = allEvents.filter(
      (e) => user.joinedClubs.includes(e.clubId) && new Date(e.date) < new Date()
    )

    if (localStorage.getItem('clubify_rsvps') === null) {
      const seededRsvps: Rsvp[] = pastEventsForMyClubs.map((e) => ({ eventId: e.id, clubId: e.clubId, status: 'going' }))
      localStorage.setItem('clubify_rsvps', JSON.stringify(seededRsvps))
      setRsvps(seededRsvps)
    }

    if (localStorage.getItem('clubify_reviews') === null) {
      const seededReviews: Review[] = pastEventsForMyClubs.slice(0, 1).map((e) => ({ eventId: e.id, rating: 5 }))
      localStorage.setItem('clubify_reviews', JSON.stringify(seededReviews))
      setReviews(seededReviews)
    }

    if (localStorage.getItem('clubify_following') === null) {
      const candidate = clubs.find((c) => !user.joinedClubs.includes(c.id))
      const seededFollowing = candidate ? [candidate.id] : []
      localStorage.setItem('clubify_following', JSON.stringify(seededFollowing))
      setFollowing(seededFollowing)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id])

  useEffect(() => {
    if (!user) return
    setMyApplications(getStudentApplications(user.id))
  }, [user?.id])

  if (!user) return null

  const upcomingForMe = getUpcomingEvents(3).filter((e) => user.joinedClubs.includes(e.clubId))

  const myMemberships = memberships
    .map((m) => ({ ...m, club: clubs.find((c) => c.id === m.clubId) }))
    .filter((m): m is Membership & { club: NonNullable<typeof m.club> } => !!m.club)

  const followedClubs = following
    .map((clubId) => clubs.find((c) => c.id === clubId))
    .filter((c): c is NonNullable<typeof c> => !!c)

  const eventHistory = rsvps
    .filter((r) => r.status === 'going')
    .map((r) => {
      const event = allEvents.find((e) => e.id === r.eventId)
      if (!event || new Date(event.date) >= new Date()) return null
      const club = clubs.find((c) => c.id === event.clubId)
      const review = reviews.find((rv) => rv.eventId === event.id)
      return { event, club, review }
    })
    .filter((e): e is { event: (typeof allEvents)[number]; club: (typeof clubs)[number] | undefined; review: Review | undefined } => !!e)
    .sort((a, b) => new Date(b.event.date).getTime() - new Date(a.event.date).getTime())

  const handleUnfollow = (clubId: string) => {
    const updated = following.filter((id) => id !== clubId)
    setFollowing(updated)
    localStorage.setItem('clubify_following', JSON.stringify(updated))
    toast('Unfollowed club', 'info')
  }

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
    <div className="phone-scroll h-[844px] pb-24" style={{ background: isDark ? '#272831' : '#F5F5F6' }}>
      {/* Header */}
      <div className={cn('pt-12 pb-4 px-5 flex items-center justify-between', isDark ? 'bg-[#272831]' : 'bg-[#F5F5F6]')}>
        <h1 className={cn('text-xl font-semibold', isDark ? 'text-white' : 'text-[#272831]')}>Profile</h1>
        <button onClick={() => navigate('/student/settings')} className={cn('w-9 h-9 rounded-full flex items-center justify-center', isDark ? 'bg-[#272831]' : 'bg-[#FFFFFF] shadow-sm')}>
          <Settings size={18} className={isDark ? 'text-[#B8B9C1]' : 'text-[#6B6C72]'} />
        </button>
      </div>

      <div className="px-5 space-y-5">
        {/* Avatar + info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn('rounded-2xl p-5', isDark ? 'bg-[#272831]' : 'bg-[#FFFFFF] shadow-sm')}
        >
          <div className="flex items-start gap-4">
            <button onClick={() => setShowPhotoMenu(true)} className="relative group" aria-label="Change photo">
              <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-2xl object-cover" />
              <div className="absolute inset-0 rounded-2xl bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <Camera size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#FDA014] flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">{user.year}</span>
              </div>
              <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-[#FFFFFF] shadow-md flex items-center justify-center border border-[#E5E5E8]">
                <Camera size={11} className="text-[#FDA014]" />
              </div>
            </button>
            <div className="flex-1">
              <h2 className={cn('text-lg font-black', isDark ? 'text-white' : 'text-[#272831]')}>{user.name}</h2>
              <button
                onClick={openNicknameModal}
                className={cn(
                  'mt-0.5 flex items-center gap-1.5 text-xs rounded-md px-1.5 py-0.5 -mx-1.5 transition-colors',
                  isDark ? 'hover:bg-[#F0F0F2]' : 'hover:bg-[#F0F0F2]'
                )}
              >
                {user.nickname ? (
                  <span className={cn('italic', isDark ? 'text-[#B8B9C1]' : 'text-[#6B6C72]')}>"{user.nickname}"</span>
                ) : (
                  <span className={cn('font-semibold', isDark ? 'text-[#6F2F33]' : 'text-[#6F2F33]')}>+ Add nickname</span>
                )}
                <Edit3 size={10} className={isDark ? 'text-[#929397]' : 'text-[#929397]'} />
              </button>
              <p className={cn('text-xs font-mono mt-0.5', isDark ? 'text-[#929397]' : 'text-[#929397]')}>{user.gucId}</p>
              {user.emailPrefix && (
                <p className={cn('text-xs mt-0.5', isDark ? 'text-[#929397]' : 'text-[#929397]')}>{user.emailPrefix}@student.guc.edu.eg</p>
              )}
              <p className={cn('text-xs mt-1', isDark ? 'text-[#929397]' : 'text-[#929397]')}>{user.faculty}</p>
              <p className={cn('text-xs', isDark ? 'text-[#929397]' : 'text-[#929397]')}>Year {user.year}</p>
              <button
                onClick={openInfoEdit}
                className={cn('mt-1.5 flex items-center gap-1 text-[10px] font-semibold', isDark ? 'text-[#6F2F33]' : 'text-[#6F2F33]')}
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
                  className={cn('w-full text-sm rounded-xl p-3 outline-none resize-none border', isDark ? 'bg-[#272831] text-white border-[#3D3E48]' : 'bg-[#FFFFFF] text-[#272831] border-[#E5E5E8]')}
                />
                <div className="flex gap-2 mt-2">
                  <button onClick={saveBio} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#6F2F33] text-white text-xs font-semibold">
                    <Check size={12} /> Save
                  </button>
                  <button onClick={() => { setEditingBio(false); setBioText(user.bio) }} className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold', isDark ? 'bg-[#272831] text-[#B8B9C1]' : 'bg-[#F0F0F2] text-[#6B6C72]')}>
                    <X size={12} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2">
                <p className={cn('flex-1 text-sm leading-relaxed', isDark ? 'text-[#B8B9C1]' : 'text-[#6B6C72]')}>
                  {user.bio || 'Add a bio to tell others about yourself...'}
                </p>
                <button onClick={() => setEditingBio(true)}>
                  <Edit3 size={15} className={isDark ? 'text-[#929397]' : 'text-[#929397]'} />
                </button>
              </div>
            )}
          </div>

          {/* Profile completion bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span className={isDark ? 'text-[#929397]' : 'text-[#929397]'}>Profile completion</span>
              <span className="font-bold text-[#FDA014]">{user.profileCompletion}%</span>
            </div>
            <div className={cn('h-2 rounded-full overflow-hidden', isDark ? 'bg-[#272831]' : 'bg-[#F0F0F2]')}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${user.profileCompletion}%` }}
                transition={{ duration: 0.8 }}
                className="h-full rounded-full bg-[#FDA014]"
              />
            </div>
          </div>
        </motion.div>

        {/* Attendance tracker */}
        <div className={cn('rounded-2xl p-4', isDark ? 'bg-[#272831]' : 'bg-[#FFFFFF] shadow-sm')}>
          <h3 className={cn('text-sm font-bold mb-3', isDark ? 'text-white' : 'text-[#272831]')}>Attendance</h3>
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke={isDark ? '#272831' : '#F0F0F2'} strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15.9" fill="none"
                  stroke="#FDA014" strokeWidth="3"
                  strokeDasharray={`${attendancePercent} 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={cn('text-xs font-black', isDark ? 'text-white' : 'text-[#272831]')}>{attendancePercent}%</span>
              </div>
            </div>
            <div>
              <p className={cn('text-2xl font-black', isDark ? 'text-white' : 'text-[#272831]')}>
                {user.attendedSessions}
                <span className={cn('text-base font-medium', isDark ? 'text-[#929397]' : 'text-[#929397]')}>/{user.totalSessions}</span>
              </p>
              <p className={cn('text-xs', isDark ? 'text-[#929397]' : 'text-[#929397]')}>sessions attended</p>
            </div>
          </div>
        </div>

        {/* My Clubs & Applications */}
        {(myMemberships.length > 0 || myApplications.length > 0) && (
          <div className={cn('rounded-2xl p-4', isDark ? 'bg-[#272831]' : 'bg-[#FFFFFF] shadow-sm')}>
            <div className="flex items-center gap-2 mb-3">
              <Users size={15} className="text-[#FDA014]" />
              <h3 className={cn('text-sm font-bold', isDark ? 'text-white' : 'text-[#272831]')}>My Clubs</h3>
            </div>

            {/* Applications with status */}
            {myApplications.length > 0 && (
              <div className="space-y-2 mb-3">
                {myApplications.map((app) => {
                  const club = getDbClub(app.clubId)
                  const statusColors: Record<Application['status'], string> = {
                    pending: 'text-[#FDA014] bg-[#FDA014]/10',
                    interview_scheduled: 'text-blue-600 bg-blue-50',
                    accepted: 'text-green-600 bg-green-100',
                    rejected: 'text-red-500 bg-red-100',
                  }
                  const statusLabels: Record<Application['status'], string> = {
                    pending: 'Pending',
                    interview_scheduled: 'Interview Set',
                    accepted: '✓ Accepted',
                    rejected: 'Rejected',
                  }
                  return (
                    <div key={app.id} className={cn('flex items-center gap-3 p-2.5 rounded-xl', isDark ? 'bg-[#35363F]' : 'bg-[#F5F5F6]')}>
                      <img
                        src={club?.logo || `https://placehold.co/36x36/FDA014/FFF?text=${app.clubId.slice(0,2).toUpperCase()}`}
                        alt={app.clubId}
                        className="w-9 h-9 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className={cn('text-xs font-semibold truncate', isDark ? 'text-white' : 'text-[#272831]')}>
                          {club?.name || app.clubId}
                        </p>
                        <p className={cn('text-[10px]', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
                          {app.committeeName}
                        </p>
                      </div>
                      <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full', statusColors[app.status])}>
                        {statusLabels[app.status]}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Legacy memberships */}
            {myMemberships.map((m) => (
              <div key={m.clubId} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#FDA014]/5 mb-2">
                <img src={m.club.logo} alt={m.club.name} className="w-9 h-9 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className={cn('text-xs font-semibold truncate', isDark ? 'text-white' : 'text-[#272831]')}>{m.club.name}</p>
                  <p className={cn('text-[10px]', isDark ? 'text-[#929397]' : 'text-[#929397]')}>{m.committee}</p>
                </div>
                <span className="text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">✓ Member</span>
              </div>
            ))}

            {myApplications.length === 0 && myMemberships.length === 0 && (
              <p className={cn('text-xs font-body text-center py-2', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
                You haven't applied to any clubs yet.
              </p>
            )}
          </div>
        )}

        {/* Following */}
        {followedClubs.length > 0 && (
          <div className={cn('rounded-2xl p-4', isDark ? 'bg-[#272831]' : 'bg-[#FFFFFF] shadow-sm')}>
            <h3 className={cn('text-sm font-bold mb-3', isDark ? 'text-white' : 'text-[#272831]')}>Following</h3>
            <div className="space-y-2">
              {followedClubs.map((club) => (
                <div key={club.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#FDA014]/5">
                  <img src={club.logo} alt={club.name} className="w-9 h-9 rounded-xl object-cover" />
                  <p className={cn('flex-1 min-w-0 text-xs font-semibold truncate', isDark ? 'text-white' : 'text-[#272831]')}>{club.name}</p>
                  <button
                    onClick={() => handleUnfollow(club.id)}
                    className={cn('flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold', isDark ? 'bg-[#272831] text-[#B8B9C1]' : 'bg-[#F0F0F2] text-[#6B6C72]')}
                  >
                    <UserMinus size={11} /> Unfollow
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Event History */}
        {eventHistory.length > 0 && (
          <div className={cn('rounded-2xl p-4', isDark ? 'bg-[#272831]' : 'bg-[#FFFFFF] shadow-sm')}>
            <div className="flex items-center gap-2 mb-3">
              <History size={15} className="text-[#FDA014]" />
              <h3 className={cn('text-sm font-bold', isDark ? 'text-white' : 'text-[#272831]')}>Event History</h3>
            </div>
            <div className="space-y-2">
              {eventHistory.map(({ event, club, review }) => (
                <div key={event.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#FDA014]/5">
                  <div className="w-9 h-9 rounded-xl bg-[#FDA014]/10 flex items-center justify-center shrink-0">
                    <Calendar size={15} className="text-[#FDA014]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn('text-xs font-semibold truncate', isDark ? 'text-white' : 'text-[#272831]')}>{event.title}</p>
                    <p className={cn('text-[10px]', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
                      {club?.name || 'Unknown club'} · {event.date}
                    </p>
                  </div>
                  {review ? (
                    <div className="flex items-center gap-0.5 shrink-0">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={11}
                          className={i < review.rating ? 'text-[#FDA014] fill-[#FDA014]' : (isDark ? 'text-[#272831]' : 'text-[#E5E5E8]')}
                        />
                      ))}
                    </div>
                  ) : (
                    <span className={cn('text-[10px] shrink-0', isDark ? 'text-[#929397]' : 'text-[#929397]')}>Not rated</span>
                  )}
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
          className={cn('w-full flex items-center gap-3 rounded-2xl p-4', isDark ? 'bg-[#272831]' : 'bg-[#FFFFFF] shadow-sm')}
        >
          <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center', isDark ? 'bg-[#272831]' : 'bg-[#F0F0F2]')}>
            <FileText size={16} className={isDark ? 'text-[#B8B9C1]' : 'text-[#6B6C72]'} />
          </div>
          <span className={cn('flex-1 text-sm font-semibold text-left', isDark ? 'text-white' : 'text-[#272831]')}>Terms & Conditions</span>
          {localStorage.getItem('clubify_terms_accepted') === 'true'
            ? <CheckCircle size={16} className="text-green-500" />
            : <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FDA014]/10 text-[#FDA014]">Review</span>
          }
        </motion.button>

        {/* Upcoming activities */}
        {upcomingForMe.length > 0 && (
          <div>
            <h3 className={cn('text-sm font-bold mb-3', isDark ? 'text-white' : 'text-[#272831]')}>Upcoming Activities</h3>
            <div className="space-y-2">
              {upcomingForMe.map((event) => (
                <div key={event.id} className={cn('flex items-center gap-3 p-3 rounded-xl', isDark ? 'bg-[#272831]' : 'bg-[#FFFFFF] shadow-sm')}>
                  <div className="w-10 h-10 rounded-xl bg-[#FDA014]/10 flex items-center justify-center">
                    <Calendar size={16} className="text-[#FDA014]" />
                  </div>
                  <div className="flex-1">
                    <p className={cn('text-xs font-semibold', isDark ? 'text-white' : 'text-[#272831]')}>{event.title}</p>
                    <p className={cn('text-[10px] font-mono', isDark ? 'text-[#929397]' : 'text-[#929397]')}>{event.date} · {event.time}</p>
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
                isDark ? 'bg-[#272831]' : 'bg-[#FFFFFF]'
              )}
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex-1">
                  <h3 className={cn('text-lg font-black', isDark ? 'text-white' : 'text-[#272831]')}>
                    Choose your nickname
                  </h3>
                  <p className={cn('text-xs mt-1', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
                    A catchy short name your friends can recognize — shown on your profile.
                  </p>
                </div>
                <button
                  onClick={() => setShowNicknameModal(false)}
                  className={cn('w-8 h-8 rounded-full flex items-center justify-center -mt-1 -mr-1', isDark ? 'hover:bg-[#F0F0F2] text-[#929397]' : 'hover:bg-[#F0F0F2] text-[#929397]')}
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
                      ? 'bg-[#272831] border-[#3D3E48] text-white placeholder:text-[#929397] focus:border-[#6F2F33]'
                      : 'bg-[#FFFFFF] border-[#E5E5E8] text-[#272831] placeholder:text-[#929397] focus:border-[#6F2F33]'
                  )}
                />
                <p className={cn('text-[10px] mt-1.5 text-right', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
                  {nicknameText.length}/24
                </p>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setShowNicknameModal(false)}
                  className={cn(
                    'flex-1 py-3 rounded-2xl text-sm font-bold',
                    isDark ? 'bg-[#272831] text-[#B8B9C1]' : 'bg-[#F0F0F2] text-[#4A4B52]'
                  )}
                >
                  Cancel
                </button>
                <button
                  onClick={saveNickname}
                  className="flex-1 py-3 rounded-2xl bg-[#6F2F33] text-white text-sm font-bold"
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
              className={cn('fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88%] max-w-sm rounded-3xl p-6 z-50 shadow-2xl', isDark ? 'bg-[#272831]' : 'bg-[#FFFFFF]')}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={cn('text-lg font-black', isDark ? 'text-white' : 'text-[#272831]')}>Edit Info</h3>
                <button onClick={() => setShowInfoEdit(false)} className={cn('w-8 h-8 rounded-full flex items-center justify-center', isDark ? 'hover:bg-[#F0F0F2] text-[#929397]' : 'hover:bg-[#F0F0F2] text-[#929397]')}>
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-3">
                {/* Preferred name */}
                <div>
                  <label className={cn('text-xs font-semibold mb-1 block', isDark ? 'text-[#929397]' : 'text-[#929397]')}>Preferred Name</label>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="e.g. Youssef"
                    className={cn('w-full px-4 py-3 rounded-2xl text-sm outline-none border-2 transition-colors', isDark ? 'bg-[#272831] border-[#3D3E48] text-white placeholder:text-[#929397] focus:border-[#6F2F33]' : 'bg-[#FFFFFF] border-[#E5E5E8] text-[#272831] placeholder:text-[#929397] focus:border-[#6F2F33]')}
                  />
                </div>

                {/* GUC ID */}
                <div>
                  <label className={cn('text-xs font-semibold mb-1 block', isDark ? 'text-[#929397]' : 'text-[#929397]')}>GUC ID</label>
                  <input
                    value={editGucId}
                    onChange={(e) => { setEditGucId(e.target.value); setGucIdError('') }}
                    placeholder="xx-xxxxx (e.g. 49-12345)"
                    className={cn('w-full px-4 py-3 rounded-2xl text-sm outline-none border-2 transition-colors font-mono', isDark ? 'bg-[#272831] border-[#3D3E48] text-white placeholder:text-[#929397] focus:border-[#6F2F33]' : 'bg-[#FFFFFF] border-[#E5E5E8] text-[#272831] placeholder:text-[#929397] focus:border-[#6F2F33]', gucIdError ? 'border-red-500' : '')}
                  />
                  {gucIdError && <p className="text-[10px] text-red-500 mt-1">{gucIdError}</p>}
                </div>

                {/* Email prefix */}
                <div>
                  <label className={cn('text-xs font-semibold mb-1 block', isDark ? 'text-[#929397]' : 'text-[#929397]')}>GUC Email</label>
                  <div className="flex items-center gap-0">
                    <input
                      value={editEmailPrefix}
                      onChange={(e) => setEditEmailPrefix(e.target.value)}
                      placeholder="ahmed.kabil"
                      className={cn('flex-1 px-4 py-3 rounded-l-2xl text-sm outline-none border-2 border-r-0 transition-colors', isDark ? 'bg-[#272831] border-[#3D3E48] text-white placeholder:text-[#929397] focus:border-[#6F2F33]' : 'bg-[#FFFFFF] border-[#E5E5E8] text-[#272831] placeholder:text-[#929397] focus:border-[#6F2F33]')}
                    />
                    <span className={cn('px-3 py-3 rounded-r-2xl text-xs border-2 border-l-0', isDark ? 'bg-[#272831] border-[#3D3E48] text-[#929397]' : 'bg-[#F0F0F2] border-[#E5E5E8] text-[#929397]')}>
                      @student.guc.edu.eg
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-5">
                <button onClick={() => setShowInfoEdit(false)} className={cn('flex-1 py-3 rounded-2xl text-sm font-bold', isDark ? 'bg-[#272831] text-[#B8B9C1]' : 'bg-[#F0F0F2] text-[#4A4B52]')}>
                  Cancel
                </button>
                <button onClick={saveInfo} className="flex-1 py-3 rounded-2xl bg-[#6F2F33] text-white text-sm font-bold">
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
                isDark ? 'bg-[#272831]' : 'bg-[#FFFFFF]'
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={cn('text-base font-bold', isDark ? 'text-white' : 'text-[#272831]')}>Profile photo</h3>
                <button onClick={() => setShowPhotoMenu(false)} className={cn('w-8 h-8 rounded-full flex items-center justify-center', isDark ? 'bg-[#272831]' : 'bg-[#F0F0F2]')}>
                  <X size={16} className={isDark ? 'text-[#B8B9C1]' : 'text-[#6B6C72]'} />
                </button>
              </div>

              <button
                onClick={() => cameraInputRef.current?.click()}
                className={cn('w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl mb-2', isDark ? 'bg-[#272831]' : 'bg-[#FFFFFF]')}
              >
                <div className="w-9 h-9 rounded-xl bg-[#FDA014]/10 flex items-center justify-center">
                  <Camera size={16} className="text-[#FDA014]" />
                </div>
                <div className="text-left">
                  <p className={cn('text-sm font-semibold', isDark ? 'text-white' : 'text-[#272831]')}>Take photo</p>
                  <p className={cn('text-[10px]', isDark ? 'text-[#929397]' : 'text-[#929397]')}>Use your camera</p>
                </div>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className={cn('w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl mb-2', isDark ? 'bg-[#272831]' : 'bg-[#FFFFFF]')}
              >
                <div className="w-9 h-9 rounded-xl bg-[#FDA014]/10 flex items-center justify-center">
                  <Upload size={16} className="text-[#FDA014]" />
                </div>
                <div className="text-left">
                  <p className={cn('text-sm font-semibold', isDark ? 'text-white' : 'text-[#272831]')}>Upload from device</p>
                  <p className={cn('text-[10px]', isDark ? 'text-[#929397]' : 'text-[#929397]')}>Choose an image from your files</p>
                </div>
              </button>

              <button
                onClick={removePhoto}
                className={cn('w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl', isDark ? 'bg-[#272831]' : 'bg-[#FFFFFF]')}
              >
                <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
                  <Trash2 size={16} className="text-red-500" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-red-500">Reset to default</p>
                  <p className={cn('text-[10px]', isDark ? 'text-[#929397]' : 'text-[#929397]')}>Use a generated avatar</p>
                </div>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
