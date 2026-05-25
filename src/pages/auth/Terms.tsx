import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, Shield } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { cn } from '../../lib/utils'

interface TermsProps {
  onAccept?: () => void
  showAcceptButton?: boolean
}

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    body: 'By accessing or using Clubify, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, you may not use the app.',
  },
  {
    title: '2. Eligibility',
    body: 'Clubify is exclusively available to currently enrolled students and faculty of the German University in Cairo (GUC). You must use your official GUC email address to register.',
  },
  {
    title: '3. User Conduct',
    body: 'You agree to use Clubify respectfully and responsibly. You must not post offensive, misleading, or harmful content. Misuse of the platform may result in account suspension.',
  },
  {
    title: '4. Club Membership',
    body: 'Joining a club through Clubify does not constitute official membership until confirmed by the club\'s administration. Clubify facilitates discovery and application but does not guarantee acceptance.',
  },
  {
    title: '5. Privacy & Data',
    body: 'We collect minimal data necessary to provide our services — including your name, GUC email, and activity within the app. Your data is never sold to third parties. You may request deletion of your account at any time.',
  },
  {
    title: '6. Club of the Week',
    body: 'The "Club of the Week" feature is determined algorithmically based on objective performance metrics including member count, event activity, and recruitment engagement. It cannot be manually overridden by any user or admin.',
  },
  {
    title: '7. Content & Announcements',
    body: 'Club administrators are responsible for the accuracy of announcements and event information posted on Clubify. GUC and Clubify are not liable for errors in club-posted content.',
  },
  {
    title: '8. Notifications',
    body: 'You may opt out of notifications at any time via Settings. Disabling notifications will not affect your club memberships or application statuses.',
  },
  {
    title: '9. Changes to Terms',
    body: 'We reserve the right to update these Terms at any time. Continued use of Clubify after changes constitutes acceptance of the updated terms. We will notify users of significant changes.',
  },
  {
    title: '10. Contact',
    body: 'For questions or concerns regarding these Terms, please contact us at clubify@guc.edu.eg.',
  },
]

export function Terms({ onAccept, showAcceptButton = false }: TermsProps) {
  const navigate = useNavigate()
  const { isDark } = useTheme()

  const alreadyAccepted = localStorage.getItem('clubify_terms_accepted') === 'true'

  const handleAccept = () => {
    localStorage.setItem('clubify_terms_accepted', 'true')
    if (onAccept) {
      onAccept()
    } else {
      navigate(-1)
    }
  }

  return (
    <div className="phone-scroll h-[844px] pb-24" style={{ background: isDark ? '#1C1C1E' : '#FAF8F5' }}>
      {/* Header */}
      <div className={cn('sticky top-0 z-20 pt-12 pb-3 px-5', isDark ? 'bg-[#1C1C1E]' : 'bg-[#FAF8F5]')}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className={cn('w-9 h-9 rounded-full flex items-center justify-center', isDark ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm')}
          >
            <ArrowLeft size={18} className={isDark ? 'text-white' : 'text-[#1C1C1E]'} />
          </button>
          <h1 className={cn('text-xl font-black', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Terms & Conditions</h1>
        </div>
      </div>

      <div className="px-5 space-y-4">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-4 bg-[#8B1A1A] flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <Shield size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-white font-black text-base">Clubify User Agreement</h2>
            <p className="text-white/70 text-xs mt-0.5">Last updated: May 2026 · GUC Community Platform</p>
          </div>
        </motion.div>

        {/* Sections */}
        <div className={cn('rounded-2xl overflow-hidden', isDark ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm')}>
          {SECTIONS.map((section, i) => (
            <div key={i} className={cn('px-4 py-4', i < SECTIONS.length - 1 && (isDark ? 'border-b border-[#3A3A3C]' : 'border-b border-gray-100'))}>
              <p className={cn('text-xs font-bold mb-1.5', isDark ? 'text-white' : 'text-[#1C1C1E]')}>{section.title}</p>
              <p className={cn('text-xs leading-relaxed', isDark ? 'text-gray-400' : 'text-gray-500')}>{section.body}</p>
            </div>
          ))}
        </div>

        {/* Accept / Already accepted */}
        {alreadyAccepted && !showAcceptButton ? (
          <div className={cn('flex items-center gap-3 rounded-2xl p-4', isDark ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm')}>
            <CheckCircle size={20} className="text-green-500" />
            <p className={cn('text-sm font-semibold', isDark ? 'text-white' : 'text-[#1C1C1E]')}>
              You have accepted these terms
            </p>
          </div>
        ) : (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleAccept}
            className="w-full py-4 rounded-2xl bg-[#8B1A1A] text-white font-bold text-base shadow-lg"
          >
            I Accept the Terms & Conditions
          </motion.button>
        )}
      </div>
    </div>
  )
}
