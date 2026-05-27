import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { cn } from '../../lib/utils'

export function Signup() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { isDark } = useTheme()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email.endsWith('@guc.edu.eg')) {
      setError('Please use your GUC email (@guc.edu.eg)')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    await login(email, password)
    setLoading(false)
    navigate('/onboarding')
  }

  return (
    <div className="min-h-[844px] flex flex-col" style={{ background: isDark ? '#1E1B16' : '#F2EDDF' }}>
      {/* Teal accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#6F2F33] to-[#5c2427]" />

      <div className="flex-shrink-0 pt-14 pb-8 px-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#6F2F33] to-[#5c2427] flex items-center justify-center shadow-[0_4px_20px_rgba(111,47,51,0.4)] mb-5">
            <span className="text-white text-3xl font-black font-display tracking-widest">C</span>
          </div>
          <h1 className={cn('text-3xl font-black font-display tracking-widest', isDark ? 'text-white' : 'text-[#1E1B16]')}>Join Clubify</h1>
          <p className={cn('text-sm mt-1 font-body', isDark ? 'text-[#A8A09A]' : 'text-[#76706A]')}>Create your GUC student account</p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 px-6 space-y-4">
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="type-label mb-1.5 block">Full Name</label>
            <div className={cn('flex items-center gap-3 px-4 py-3.5 rounded-2xl border-[1.5px] transition-colors focus-within:border-[#6F2F33] focus-within:shadow-[0_0_0_3px_rgba(186,230,253,0.5)]', isDark ? 'bg-[#23323F] border-[#2d3d4a]' : 'bg-[#FAF6EA] border-[#D8D0BE]')}>
              <User size={18} className="text-[#A8A09A]" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Youssef Mahmoud"
                className={cn('flex-1 bg-transparent text-sm outline-none font-body', isDark ? 'text-white placeholder:text-[#76706A]' : 'text-[#1E1B16] placeholder:text-[#A8A09A]')}
                required
              />
            </div>
          </div>

          <div>
            <label className="type-label mb-1.5 block">GUC Email</label>
            <div className={cn('flex items-center gap-3 px-4 py-3.5 rounded-2xl border-[1.5px] transition-colors focus-within:border-[#6F2F33] focus-within:shadow-[0_0_0_3px_rgba(186,230,253,0.5)]', isDark ? 'bg-[#23323F] border-[#2d3d4a]' : 'bg-[#FAF6EA] border-[#D8D0BE]')}>
              <Mail size={18} className="text-[#A8A09A]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@guc.edu.eg"
                className={cn('flex-1 bg-transparent text-sm outline-none font-body', isDark ? 'text-white placeholder:text-[#76706A]' : 'text-[#1E1B16] placeholder:text-[#A8A09A]')}
                required
              />
            </div>
          </div>

          <div>
            <label className="type-label mb-1.5 block">Password</label>
            <div className={cn('flex items-center gap-3 px-4 py-3.5 rounded-2xl border-[1.5px] transition-colors focus-within:border-[#6F2F33] focus-within:shadow-[0_0_0_3px_rgba(186,230,253,0.5)]', isDark ? 'bg-[#23323F] border-[#2d3d4a]' : 'bg-[#FAF6EA] border-[#D8D0BE]')}>
              <Lock size={18} className="text-[#A8A09A]" />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className={cn('flex-1 bg-transparent text-sm outline-none font-body', isDark ? 'text-white placeholder:text-[#76706A]' : 'text-[#1E1B16] placeholder:text-[#A8A09A]')}
                required
              />
              <button type="button" onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff size={16} className="text-[#A8A09A]" /> : <Eye size={16} className="text-[#A8A09A]" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#C75A6B]/10 border border-[#C75A6B]/20">
              <AlertCircle size={14} className="text-[#C75A6B] flex-shrink-0" />
              <p className="text-xs text-[#C75A6B] font-body">{error}</p>
            </div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 rounded-2xl bg-[#6F2F33] text-white font-bold text-base font-body shadow-[0_4px_20px_rgba(111,47,51,0.30)] disabled:opacity-45 hover:bg-[#5c2427] transition-colors active:scale-[0.98]"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </motion.button>
        </form>

        <p className={cn('text-center text-sm font-body', isDark ? 'text-[#76706A]' : 'text-[#76706A]')}>
          Already have an account?{' '}
          <Link to="/login" className="text-[#6F2F33] font-semibold">Sign In</Link>
        </p>
      </motion.div>
    </div>
  )
}
