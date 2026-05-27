import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, ChevronRight, Calendar, Users, CheckCircle } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useToast } from '../../components/shared/Toast'
import { getClubById } from '../../data/clubs'
import { cn, formatDate } from '../../lib/utils'
import type { Committee } from '../../data/types'

interface TimeSlot {
  date: string
  time: string
}

const timeSlots: TimeSlot[] = [
  { date: '2026-05-20', time: '10:00 AM' },
  { date: '2026-05-20', time: '12:00 PM' },
  { date: '2026-05-21', time: '9:00 AM' },
  { date: '2026-05-21', time: '2:00 PM' },
  { date: '2026-05-22', time: '11:00 AM' },
  { date: '2026-05-22', time: '3:00 PM' },
]

interface ApplicationRecord {
  clubId: string
  clubName: string
  committee: string
  slot: TimeSlot
  submittedAt: string
}

export function Apply() {
  const { clubId } = useParams<{ clubId: string }>()
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const { toast } = useToast()
  const club = getClubById(clubId || '')

  const [step, setStep] = useState(0)
  const [selectedCommittee, setSelectedCommittee] = useState<Committee | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [success, setSuccess] = useState(false)
  const [applications, setApplications] = useLocalStorage<ApplicationRecord[]>('clubify_applications', [])

  if (!club) {
    return (
      <div className="min-h-[844px] flex items-center justify-center" style={{ background: isDark ? '#1E1B16' : '#F2EDDF' }}>
        <p className={cn('font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>Club not found</p>
      </div>
    )
  }

  const handleSubmit = () => {
    if (!selectedCommittee || !selectedSlot) return
    const record: ApplicationRecord = {
      clubId: club.id,
      clubName: club.name,
      committee: selectedCommittee.name,
      slot: selectedSlot,
      submittedAt: new Date().toISOString(),
    }
    setApplications((prev) => [...prev, record])
    setSuccess(true)
    toast('Application submitted!', 'success')
  }

  const stepTitles = ['Choose Committee', 'Pick Interview Slot', 'Confirm']
  const canNext = (step === 0 && selectedCommittee) || (step === 1 && selectedSlot)

  const Confetti = () => {
    const colors = ['#6F2F33', '#C99B2E', '#F2EDDF', '#1E1B16', '#FFD700']
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

  if (success) {
    return (
      <div className="min-h-[844px] flex flex-col items-center justify-center relative px-6"
        style={{ background: isDark ? '#1E1B16' : '#F2EDDF' }}>
        <Confetti />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="w-24 h-24 rounded-full bg-[#fae8e9] flex items-center justify-center mb-6"
        >
          <CheckCircle size={48} className="text-[#6E8B5A]" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center">
          <h2 className={cn('text-2xl font-black font-display tracking-wide mb-2', isDark ? 'text-white' : 'text-[#1E1B16]')}>You're in the queue!</h2>
          <p className={cn('text-sm mb-1 font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>
            Application submitted to <span className="font-semibold text-[#6F2F33]">{club.name}</span>
          </p>
          <p className={cn('text-sm font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>
            Committee: <span className="font-semibold">{selectedCommittee?.name}</span>
          </p>
          <p className={cn('text-sm font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>
            Interview: <span className="font-semibold">{selectedSlot?.date} at {selectedSlot?.time}</span>
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
    <div className="min-h-[844px] flex flex-col" style={{ background: isDark ? '#1E1B16' : '#F2EDDF' }}>
      {/* Header */}
      <div className={cn('pt-12 pb-4 px-5', isDark ? 'bg-[#1E1B16]' : 'bg-[#F2EDDF]')}>
        <button onClick={() => navigate(-1)} className={cn('w-9 h-9 rounded-full flex items-center justify-center mb-4', isDark ? 'bg-[#23323F]' : 'bg-[#FAF6EA] shadow-sm')}>
          <ArrowLeft size={18} className={isDark ? 'text-white' : 'text-[#1E1B16]'} />
        </button>
        <div className="flex items-center gap-3 mb-4">
          <img src={club.logo} alt={club.name} className="w-12 h-12 rounded-xl object-cover" />
          <div>
            <h1 className={cn('text-lg font-black font-display tracking-wide', isDark ? 'text-white' : 'text-[#1E1B16]')}>Apply to {club.name}</h1>
            <p className={cn('text-xs font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>Step {step + 1} of 3 — {stepTitles[step]}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex gap-1.5">
          {[0, 1, 2].map((s) => (
            <div key={s} className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: isDark ? '#23323F' : '#EAE5D8' }}>
              <motion.div
                animate={{ width: step >= s ? '100%' : '0%' }}
                className="h-full rounded-full bg-[#6F2F33]"
                transition={{ duration: 0.3 }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 px-5 overflow-y-auto">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <h2 className={cn('text-base font-bold font-body mb-4', isDark ? 'text-white' : 'text-[#1E1B16]')}>Which committee interests you?</h2>
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
                        : isDark ? 'border-[#2d3d4a] bg-[#23323F]' : 'border-zinc-200 bg-[#FAF6EA]'
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className={cn('text-sm font-bold font-body', isDark ? 'text-white' : 'text-[#1E1B16]')}>{cm.name}</h3>
                        <p className={cn('text-xs mt-1 leading-relaxed font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>{cm.description}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <Users size={12} className="text-[#6F2F33]" />
                          <span className="text-xs font-semibold font-body text-[#6F2F33]">{cm.spotsAvailable} spots available</span>
                        </div>
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
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <h2 className={cn('text-base font-bold font-body mb-4', isDark ? 'text-white' : 'text-[#1E1B16]')}>Choose an interview slot</h2>
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((slot, i) => {
                  const selected = selectedSlot?.date === slot.date && selectedSlot?.time === slot.time
                  return (
                    <motion.button
                      key={i}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setSelectedSlot(slot)}
                      className={cn(
                        'p-3 rounded-2xl border-2 transition-all text-left',
                        selected ? 'border-[#6F2F33] bg-[#6F2F33]/5' : isDark ? 'border-[#2d3d4a] bg-[#23323F]' : 'border-zinc-200 bg-[#FAF6EA]'
                      )}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <Calendar size={12} className={selected ? 'text-[#6F2F33]' : 'text-zinc-400'} />
                        <span className={cn('text-[10px] font-semibold font-body', selected ? 'text-[#6F2F33]' : isDark ? 'text-zinc-400' : 'text-zinc-500')}>
                          {new Date(slot.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <p className={cn('text-sm font-bold font-body', isDark ? 'text-white' : 'text-[#1E1B16]')}>{slot.time}</p>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <h2 className={cn('text-base font-bold font-body mb-4', isDark ? 'text-white' : 'text-[#1E1B16]')}>Confirm your application</h2>
              <div className={cn('rounded-2xl p-5 space-y-4', isDark ? 'bg-[#23323F]' : 'bg-[#FAF6EA] shadow-sm')}>
                <div className="flex items-center gap-3">
                  <img src={club.logo} alt={club.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h3 className={cn('text-sm font-bold font-body', isDark ? 'text-white' : 'text-[#1E1B16]')}>{club.name}</h3>
                    <p className={cn('text-xs font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>{club.category}</p>
                  </div>
                </div>
                <div className={cn('border-t pt-4 space-y-3', isDark ? 'border-[#2d3d4a]' : 'border-zinc-100')}>
                  <div className="flex justify-between text-sm">
                    <span className={cn('font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>Committee</span>
                    <span className={cn('font-semibold font-body', isDark ? 'text-white' : 'text-[#1E1B16]')}>{selectedCommittee?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className={cn('font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>Interview Date</span>
                    <span className={cn('font-semibold font-body', isDark ? 'text-white' : 'text-[#1E1B16]')}>
                      {selectedSlot && new Date(selectedSlot.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className={cn('font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>Interview Time</span>
                    <span className={cn('font-semibold font-body', isDark ? 'text-white' : 'text-[#1E1B16]')}>{selectedSlot?.time}</span>
                  </div>
                </div>
              </div>
              <p className={cn('text-xs text-center mt-4 font-body', isDark ? 'text-zinc-500' : 'text-zinc-400')}>
                By submitting, you confirm you'll attend the interview slot.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer button */}
      <div className="px-5 pb-10 pt-4">
        {step < 2 ? (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setStep(step + 1)}
            disabled={!canNext}
            className="w-full py-4 rounded-2xl bg-[#6F2F33] text-white font-bold font-body text-base disabled:opacity-40 flex items-center justify-center gap-2"
          >
            Next
            <ChevronRight size={18} />
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            className="w-full py-4 rounded-2xl bg-[#6F2F33] text-white font-bold font-body text-base flex items-center justify-center gap-2"
          >
            <CheckCircle size={18} />
            Submit Application
          </motion.button>
        )}
      </div>
    </div>
  )
}
