import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Sparkles } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { clubs } from '../../data/clubs'
import { cn } from '../../lib/utils'

type Interest = string

const interests: Interest[] = ['Technology', 'Business', 'Media', 'Arts', 'Sports', 'Community', 'Academic', 'Volunteering']
const activityLevels = ['Very active (4+ events/month)', 'Moderately active (2-3/month)', 'Casual (once a month)', 'Just browsing']
const goals = ['Build my career network', 'Explore new hobbies', 'Meet new people', 'Give back to community', 'Compete & win', 'Learn new skills']

const categoryMap: Record<string, string[]> = {
  Technology: ['Technology', 'Academic'],
  Business: ['Business'],
  Media: ['Media'],
  Arts: ['Arts'],
  Sports: ['Sports'],
  Community: ['Community'],
  Academic: ['Academic'],
  Volunteering: ['Community'],
}

export function Onboarding() {
  const navigate = useNavigate()
  const { isDark } = useTheme()

  const [step, setStep] = useState(0)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [selectedActivity, setSelectedActivity] = useState('')
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)

  const toggleInterest = (i: string) => {
    setSelectedInterests((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i])
  }

  const toggleGoal = (g: string) => {
    setSelectedGoals((prev) => prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g])
  }

  const getRecommendedClubs = () => {
    const cats = new Set(selectedInterests.flatMap((i) => categoryMap[i] || []))
    return clubs
      .filter((c) => cats.has(c.category))
      .slice(0, 3)
  }

  const handleNext = () => {
    if (step < 2) setStep(step + 1)
    else setShowResults(true)
  }

  const handleFinish = async () => {
    localStorage.setItem('clubify_onboarded', 'true')
    // Persist preferences to Supabase (best-effort, no block on navigation)
    try {
      const { supabase } = await import('../../lib/supabase')
      const { data: { user } } = await supabase.auth.getUser()
      if (user && !user.is_anonymous) {
        await supabase.from('user_preferences').upsert({
          user_id: user.id,
          interests: selectedInterests,
          activity_level: selectedActivity,
          goals: selectedGoals,
          completed_at: new Date().toISOString(),
        }, { onConflict: 'user_id' })
      }
    } catch (_) { /* non-critical */ }
    navigate('/student/home')
  }

  const steps = [
    { title: 'What are your interests?', subtitle: 'Select all that apply', progress: 33 },
    { title: 'How active are you?', subtitle: 'Choose your typical engagement level', progress: 66 },
    { title: 'What\'s your goal?', subtitle: 'Select all that apply', progress: 100 },
  ]

  const canNext = (
    (step === 0 && selectedInterests.length > 0) ||
    (step === 1 && selectedActivity !== '') ||
    (step === 2 && selectedGoals.length > 0)
  )

  const recommended = getRecommendedClubs()

  return (
    <div className="min-h-[844px] flex flex-col" style={{ background: isDark ? '#1C1C1E' : '#FAF8F5' }}>
      {!showResults ? (
        <>
          {/* Header */}
          <div className="pt-14 pb-6 px-6">
            <div className="flex items-center justify-between mb-4">
              <span className={cn('text-xs font-semibold', isDark ? 'text-gray-400' : 'text-gray-500')}>
                Step {step + 1} of 3
              </span>
              <button onClick={handleFinish} className={cn('text-xs font-semibold', isDark ? 'text-gray-500' : 'text-gray-400')}>
                Skip
              </button>
            </div>
            <div className={cn('h-1.5 rounded-full overflow-hidden', isDark ? 'bg-[#2C2C2E]' : 'bg-gray-200')}>
              <motion.div
                animate={{ width: `${steps[step].progress}%` }}
                className="h-full rounded-full bg-[#8B1A1A]"
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="flex-1 px-6"
            >
              <h2 className={cn('text-2xl font-black mb-1', isDark ? 'text-white' : 'text-[#1C1C1E]')}>
                {steps[step].title}
              </h2>
              <p className={cn('text-sm mb-6', isDark ? 'text-gray-400' : 'text-gray-500')}>
                {steps[step].subtitle}
              </p>

              {step === 0 && (
                <div className="flex flex-wrap gap-3">
                  {interests.map((i) => (
                    <motion.button
                      key={i}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleInterest(i)}
                      className={cn(
                        'px-5 py-2.5 rounded-2xl text-sm font-semibold border-2 transition-all',
                        selectedInterests.includes(i)
                          ? 'bg-[#8B1A1A] border-[#8B1A1A] text-white'
                          : isDark ? 'border-[#3A3A3C] text-gray-300 bg-[#2C2C2E]' : 'border-gray-200 text-gray-600 bg-white'
                      )}
                    >
                      {i}
                    </motion.button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="space-y-3">
                  {activityLevels.map((level) => (
                    <motion.button
                      key={level}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedActivity(level)}
                      className={cn(
                        'w-full px-4 py-4 rounded-2xl text-left text-sm font-semibold border-2 transition-all',
                        selectedActivity === level
                          ? 'bg-[#8B1A1A] border-[#8B1A1A] text-white'
                          : isDark ? 'border-[#3A3A3C] text-gray-300 bg-[#2C2C2E]' : 'border-gray-200 text-gray-600 bg-white'
                      )}
                    >
                      {level}
                    </motion.button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="flex flex-wrap gap-3">
                  {goals.map((g) => (
                    <motion.button
                      key={g}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleGoal(g)}
                      className={cn(
                        'px-4 py-2.5 rounded-2xl text-sm font-semibold border-2 transition-all',
                        selectedGoals.includes(g)
                          ? 'bg-[#8B1A1A] border-[#8B1A1A] text-white'
                          : isDark ? 'border-[#3A3A3C] text-gray-300 bg-[#2C2C2E]' : 'border-gray-200 text-gray-600 bg-white'
                      )}
                    >
                      {g}
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="px-6 pb-10 pt-6">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleNext}
              disabled={!canNext}
              className="w-full py-4 rounded-2xl bg-[#8B1A1A] text-white font-bold text-base shadow-lg disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {step < 2 ? 'Next' : 'See My Clubs'}
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </>
      ) : (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col px-6 pt-14">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-3xl bg-[#8B1A1A]/10 flex items-center justify-center mx-auto mb-4">
              <Sparkles size={28} className="text-[#8B1A1A]" />
            </div>
            <h2 className={cn('text-2xl font-black', isDark ? 'text-white' : 'text-[#1C1C1E]')}>
              Your Top Picks!
            </h2>
            <p className={cn('text-sm mt-1', isDark ? 'text-gray-400' : 'text-gray-500')}>
              Based on your interests, we think you'll love these clubs
            </p>
          </div>

          <div className="space-y-3 flex-1">
            {recommended.length > 0 ? recommended.map((club, i) => (
              <motion.div
                key={club.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className={cn('flex items-center gap-4 p-4 rounded-2xl', isDark ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm')}
              >
                <img src={club.logo} alt={club.name} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1">
                  <h4 className={cn('text-sm font-bold', isDark ? 'text-white' : 'text-[#1C1C1E]')}>{club.name}</h4>
                  <p className={cn('text-xs mt-0.5', isDark ? 'text-gray-400' : 'text-gray-500')}>{club.memberCount} members · {club.category}</p>
                </div>
                {club.isRecruiting && (
                  <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 pulse-dot" />
                    Recruiting
                  </span>
                )}
              </motion.div>
            )) : (
              <p className={cn('text-center text-sm', isDark ? 'text-gray-500' : 'text-gray-400')}>
                Explore all clubs to find your match!
              </p>
            )}
          </div>

          <div className="pb-10 pt-6">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleFinish}
              className="w-full py-4 rounded-2xl bg-[#8B1A1A] text-white font-bold text-base shadow-lg"
            >
              Get Started 🎉
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
