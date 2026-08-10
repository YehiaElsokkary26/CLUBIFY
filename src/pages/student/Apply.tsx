import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, ChevronRight, Calendar, Users, CheckCircle, Lock, AlertCircle } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../components/shared/Toast'
import { apiRequest, ApiError } from '../../lib/api'
import { cn } from '../../lib/utils'

interface ApiCommittee {
  id: string
  name: string
  description?: string | null
}

interface ApiClub {
  id: string
  name: string
  slug: string
  category: string
  logo: string
  description: string
  is_recruiting: boolean
  committees: ApiCommittee[]
}

interface ApiSlot {
  id: string
  club_id: string
  datetime: string
  is_booked: boolean
}

interface ApiApplication {
  id: string
  entity_id: string
  entity_name: string | null
  committee: string
  status: string
  interview_slot: string | null
}

function errorMessage(err: unknown, fallback: string): string {
  if (err instanceof ApiError) {
    if (err.message === 'ALREADY_APPLIED') return "You've already applied to this club."
    if (err.message === 'RECRUITMENT_CLOSED') return 'Recruitment for this club just closed.'
    if (err.message === 'SLOT_TAKEN') return 'Someone just booked that slot — pick another.'
    return err.message
  }
  return fallback
}

function formatSlot(datetime: string) {
  const d = new Date(datetime)
  return {
    day: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    time: d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
  }
}

export function Apply() {
  const { clubId } = useParams<{ clubId: string }>()
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const { toast } = useToast()
  const { accessToken } = useAuth()

  const [club, setClub] = useState<ApiClub | null>(null)
  const [clubLoading, setClubLoading] = useState(true)
  const [clubError, setClubError] = useState<string | null>(null)

  const [selectedCommittee, setSelectedCommittee] = useState<ApiCommittee | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const [application, setApplication] = useState<ApiApplication | null>(null)
  const [slots, setSlots] = useState<ApiSlot[]>([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [slotsError, setSlotsError] = useState<string | null>(null)

  const [selectingSlotId, setSelectingSlotId] = useState<string | null>(null)
  const [selectError, setSelectError] = useState<string | null>(null)
  const [confirmedSlot, setConfirmedSlot] = useState<ApiSlot | null>(null)

  useEffect(() => {
    if (!clubId) return
    let cancelled = false
    setClubLoading(true)
    setClubError(null)
    apiRequest<ApiClub>(`/clubs/${clubId}`, { token: accessToken })
      .then((data) => { if (!cancelled) setClub(data) })
      .catch((err) => { if (!cancelled) setClubError(errorMessage(err, 'Could not load this club.')) })
      .finally(() => { if (!cancelled) setClubLoading(false) })
    return () => { cancelled = true }
  }, [clubId, accessToken])

  const fetchSlots = async (targetClubId: string) => {
    setSlotsLoading(true)
    setSlotsError(null)
    try {
      const { slots: available } = await apiRequest<{ slots: ApiSlot[] }>(`/clubs/${targetClubId}/slots`, { token: accessToken })
      setSlots(available)
    } catch (err) {
      setSlotsError(errorMessage(err, 'Could not load interview slots.'))
    } finally {
      setSlotsLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (!club || !selectedCommittee) return
    setSubmitting(true)
    setSubmitError(null)
    try {
      const app = await apiRequest<ApiApplication>(`/applications/club/${club.id}`, {
        method: 'POST',
        token: accessToken,
        body: { committeeId: selectedCommittee.id },
      })
      setApplication(app)
      toast('Application submitted!', 'success')
      await fetchSlots(club.id)
    } catch (err) {
      setSubmitError(errorMessage(err, 'Failed to submit application.'))
    } finally {
      setSubmitting(false)
    }
  }

  const handleSelectSlot = async (slot: ApiSlot) => {
    if (!application) return
    setSelectingSlotId(slot.id)
    setSelectError(null)
    try {
      await apiRequest(`/applications/${application.id}/select-slot`, {
        method: 'POST',
        token: accessToken,
        body: { slotId: slot.id },
      })
      setConfirmedSlot(slot)
      toast('Interview slot booked!', 'success')
    } catch (err) {
      setSelectError(errorMessage(err, 'Failed to book that slot.'))
      if (err instanceof ApiError && err.message === 'SLOT_TAKEN' && club) {
        fetchSlots(club.id)
      }
    } finally {
      setSelectingSlotId(null)
    }
  }

  const Confetti = () => {
    const colors = ['#FDA014', '#6F2F33', '#F5F5F6', '#272831', '#FFD700']
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="confetti-piece absolute w-2 h-3 rounded-sm"
            style={{
              left: `${Math.random() * 100}%`,
              background: colors[Math.floor(Math.random() * colors.length)],
              animationDelay: `${Math.random() * 1.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    )
  }

  if (clubLoading) {
    return (
      <div className="min-h-[844px] flex items-center justify-center" style={{ background: isDark ? '#272831' : '#F5F5F6' }}>
        <div className="w-8 h-8 rounded-full border-2 border-[#FDA014] border-t-transparent animate-spin" />
      </div>
    )
  }

  if (clubError || !club) {
    return (
      <div className="min-h-[844px] flex flex-col items-center justify-center gap-4 px-6" style={{ background: isDark ? '#272831' : '#F5F5F6' }}>
        <p className={cn('font-body text-center', isDark ? 'text-[#929397]' : 'text-[#929397]')}>{clubError || 'Club not found'}</p>
        <button onClick={() => navigate(-1)} className="px-6 py-3 rounded-2xl bg-[#6F2F33] text-white font-bold font-body">
          Go Back
        </button>
      </div>
    )
  }

  // Confirmation screen — slot picked and booked
  if (confirmedSlot) {
    const { day, time } = formatSlot(confirmedSlot.datetime)
    return (
      <div className="min-h-[844px] flex flex-col items-center justify-center relative px-6"
        style={{ background: isDark ? '#272831' : '#F5F5F6' }}>
        <Confetti />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="w-24 h-24 rounded-full bg-[#E4F7E2] flex items-center justify-center mb-6"
        >
          <CheckCircle size={48} className="text-[#5FC756]" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center">
          <h2 className={cn('text-h1 mb-2', isDark ? 'text-white' : 'text-[#272831]')}>You're in the queue!</h2>
          <p className={cn('text-sm mb-1 font-body', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
            Application submitted to <span className="font-semibold text-[#FDA014]">{club.name}</span>
          </p>
          <p className={cn('text-sm font-body', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
            Committee: <span className="font-semibold">{application?.committee}</span>
          </p>
          <p className={cn('text-sm font-body', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
            Interview: <span className="font-semibold">{day} at {time}</span>
          </p>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/student/home')}
          className="mt-8 px-8 py-4 rounded-2xl bg-[#6F2F33] text-white font-bold font-body"
        >
          Back to Home
        </motion.button>
      </div>
    )
  }

  return (
    <div className="min-h-[844px] flex flex-col" style={{ background: isDark ? '#272831' : '#F5F5F6' }}>
      {/* Header */}
      <div className={cn('pt-12 pb-4 px-5', isDark ? 'bg-[#272831]' : 'bg-[#F5F5F6]')}>
        <button onClick={() => navigate(-1)} className={cn('w-9 h-9 rounded-full flex items-center justify-center mb-4', isDark ? 'bg-[#272831]' : 'bg-[#FFFFFF] shadow-sm')}>
          <ArrowLeft size={18} className={isDark ? 'text-white' : 'text-[#272831]'} />
        </button>
        <div className="flex items-center gap-3 mb-4">
          <img src={club.logo} alt={club.name} className="w-12 h-12 rounded-xl object-cover" />
          <div>
            <h1 className={cn('text-lg font-black font-display tracking-wide', isDark ? 'text-white' : 'text-[#272831]')}>Apply to {club.name}</h1>
            <p className={cn('text-xs font-body', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
              {!club.is_recruiting ? 'Recruitment closed' : application ? 'Step 2 of 2 — Pick Interview Slot' : 'Step 1 of 2 — Choose Committee'}
            </p>
          </div>
        </div>

        {club.is_recruiting && (
          <div className="flex gap-1.5">
            {[0, 1].map((s) => (
              <div key={s} className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: isDark ? '#272831' : '#ECECEF' }}>
                <motion.div
                  animate={{ width: (application ? 1 : 0) >= s ? '100%' : '0%' }}
                  className="h-full rounded-full bg-[#FDA014]"
                  transition={{ duration: 0.3 }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recruitment closed */}
      {!club.is_recruiting ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="w-16 h-16 rounded-3xl bg-[#FDA014]/10 flex items-center justify-center">
            <Lock size={26} className="text-[#FDA014]" />
          </div>
          <h2 className={cn('text-lg font-black font-display', isDark ? 'text-white' : 'text-[#272831]')}>Recruitment is currently closed</h2>
          <p className={cn('text-sm font-body max-w-xs', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
            {club.name} isn't accepting new applications right now. Check back later or explore other recruiting clubs.
          </p>
          <button onClick={() => navigate(-1)} className="mt-2 px-6 py-3 rounded-2xl bg-[#6F2F33] text-white font-bold font-body">
            Go Back
          </button>
        </div>
      ) : (
        <>
          <div className="flex-1 px-5 overflow-y-auto">
            <AnimatePresence mode="wait">
              {!application ? (
                <motion.div key="committee" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                  <h2 className={cn('text-base font-bold font-body mb-4', isDark ? 'text-white' : 'text-[#272831]')}>Which committee interests you?</h2>
                  <div className="space-y-3">
                    {club.committees.map((cm) => (
                      <motion.button
                        key={cm.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedCommittee(cm)}
                        className={cn(
                          'w-full p-4 rounded-2xl text-left border-2 transition-all',
                          selectedCommittee?.id === cm.id
                            ? 'border-[#6F2F33] bg-[#6F2F33]/5'
                            : isDark ? 'border-[#35363F] bg-[#272831]' : 'border-[#E5E5E8] bg-[#FFFFFF]'
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className={cn('text-sm font-bold font-body', isDark ? 'text-white' : 'text-[#272831]')}>{cm.name}</h3>
                            {cm.description && (
                              <p className={cn('text-xs mt-1 leading-relaxed font-body', isDark ? 'text-[#929397]' : 'text-[#929397]')}>{cm.description}</p>
                            )}
                          </div>
                          {selectedCommittee?.id === cm.id && (
                            <div className="w-5 h-5 rounded-full bg-[#6F2F33] flex items-center justify-center flex-shrink-0 ml-3 mt-0.5">
                              <Check size={12} className="text-white" />
                            </div>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {submitError && (
                    <div className="flex items-center gap-2 mt-4 px-3 py-2.5 rounded-xl bg-[#E14535]/10 border border-[#E14535]/20">
                      <AlertCircle size={14} className="text-[#E14535] flex-shrink-0" />
                      <p className="text-xs text-[#E14535] font-body">{submitError}</p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div key="slots" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                  <h2 className={cn('text-base font-bold font-body mb-4', isDark ? 'text-white' : 'text-[#272831]')}>Choose an interview slot</h2>

                  {slotsLoading && (
                    <div className="flex justify-center py-10">
                      <div className="w-7 h-7 rounded-full border-2 border-[#FDA014] border-t-transparent animate-spin" />
                    </div>
                  )}

                  {!slotsLoading && slotsError && (
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#E14535]/10 border border-[#E14535]/20">
                      <AlertCircle size={14} className="text-[#E14535] flex-shrink-0" />
                      <p className="text-xs text-[#E14535] font-body">{slotsError}</p>
                    </div>
                  )}

                  {!slotsLoading && !slotsError && slots.length === 0 && (
                    <p className={cn('text-sm font-body text-center py-8', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
                      No interview slots are available right now. The club will reach out once new slots open up.
                    </p>
                  )}

                  {!slotsLoading && slots.length > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                      {slots.map((slot) => {
                        const { day, time } = formatSlot(slot.datetime)
                        const isSelecting = selectingSlotId === slot.id
                        return (
                          <motion.button
                            key={slot.id}
                            whileTap={{ scale: 0.96 }}
                            disabled={selectingSlotId !== null}
                            onClick={() => handleSelectSlot(slot)}
                            className={cn(
                              'p-3 rounded-2xl border-2 transition-all text-left disabled:opacity-60',
                              isDark ? 'border-[#35363F] bg-[#272831]' : 'border-[#E5E5E8] bg-[#FFFFFF]'
                            )}
                          >
                            <div className="flex items-center gap-1.5 mb-1">
                              <Calendar size={12} className="text-[#929397]" />
                              <span className={cn('text-[10px] font-mono', isDark ? 'text-[#929397]' : 'text-[#929397]')}>{day}</span>
                            </div>
                            <p className={cn('text-sm font-bold font-mono', isDark ? 'text-white' : 'text-[#272831]')}>
                              {isSelecting ? 'Booking…' : time}
                            </p>
                          </motion.button>
                        )
                      })}
                    </div>
                  )}

                  {selectError && (
                    <div className="flex items-center gap-2 mt-4 px-3 py-2.5 rounded-xl bg-[#E14535]/10 border border-[#E14535]/20">
                      <AlertCircle size={14} className="text-[#E14535] flex-shrink-0" />
                      <p className="text-xs text-[#E14535] font-body">{selectError}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer button — only shown for the committee step; slot step books on tap */}
          {!application && (
            <div className="px-5 pb-10 pt-4">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                disabled={!selectedCommittee || submitting}
                className="w-full py-4 rounded-2xl bg-[#6F2F33] text-white font-bold font-body text-base disabled:opacity-40 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  'Submitting…'
                ) : (
                  <>
                    <Users size={18} />
                    Submit Application
                    <ChevronRight size={18} />
                  </>
                )}
              </motion.button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
