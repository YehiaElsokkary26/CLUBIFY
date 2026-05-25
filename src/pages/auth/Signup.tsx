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
    <div className="min-h-[844px] flex flex-col" style={{ background: isDark ? '#18181B' : '#F4F4F5' }}>
      {/* Teal accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#0891B2] to-[#0C4A6E]" />

      <div className="flex-shrink-0 pt-14 pb-8 px-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#0891B2] to-[#0C4A6E] flex items-center justify-center shadow-[0_4px_20px_rgba(8,145,178,0.4)] mb-5">
            <span className="text-white text-3xl font-black font-display tracking-widest">C</span>
          </div>
          <h1 className={cn('text-3xl font-black font-display tracking-widest', isDark ? 'text-white' : 'text-[#27272A]')}>Join Clubify</h1>
          <p className={cn('text-sm mt-1 font-body', isDark ? 'text-zinc-400' : 'text-zinc-500')}>Create your GUC student account</p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 px-6 space-y-4">
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="type-label mb-1.5 block">Full Name</label>
            <div className={cn('flex items-center gap-3 px-4 py-3.5 rounded-2xl border-[1.5px] transition-colors focus-within:border-[#0891B2] focus-within:shadow-[0_0_0_3px_rgba(186,230,253,0.5)]', isDark ? 'bg-[#27272A] border-[#3F3F46]' : 'bg-white border-[#D4D4D8]')}>
              <User size={18} className="text-zinc-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Youssef Mahmoud"
                className={cn('flex-1 bg-transparent text-sm outline-none font-body', isDark ? 'text-white placeholder:text-zinc-500' : 'text-[#27272A] placeholder:text-zinc-400')}
                required
              />
            </div>
          </div>

          <div>
            <label className="type-label mb-1.5 block">GUC Email</label>
            <div className={cn('flex items-center gap-3 px-4 py-3.5 rounded-2xl border-[1.5px] transition-colors focus-within:border-[#0891B2] focus-within:shadow-[0_0_0_3px_rgba(186,230,253,0.5)]', isDark ? 'bg-[#27272A] border-[#3F3F46]' : 'bg-white border-[#D4D4D8]')}>
              <Mail size={18} className="text-zinc-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@guc.edu.eg"
                className={cn('flex-1 bg-transparent text-sm outline-none font-body', isDark ? 'text-white placeholder:text-zinc-500' : 'text-[#27272A] placeholder:text-zinc-400')}
                required
              />
            </div>
          </div>

          <div>
            <label className="type-label mb-1.5 block">Password</label>
            <div className={cn('flex items-center gap-3 px-4 py-3.5 rounded-2xl border-[1.5px] transition-colors focus-within:border-[#0891B2] focus-within:shadow-[0_0_0_3px_rgba(186,230,253,0.5)]', isDark ? 'bg-[#27272A] border-[#3F3F46]' : 'bg-white border-[#D4D4D8]')}>
              <Lock size={18} className="text-zinc-400" />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className={cn('flex-1 bg-transparent text-sm outline-none font-body', isDark ? 'text-white placeholder:text-zinc-500' : 'text-[#27272A] placeholder:text-zinc-400')}
                required
              />
              <button type="button" onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff size={16} className="text-zinc-400" /> : <Eye size={16} className="text-zinc-400" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#DC2626]/10 border border-[#DC2626]/20">
              <AlertCircle size={14} className="text-[#DC2626] flex-shrink-0" />
              <p className="text-xs text-[#DC2626] font-body">{error}</p>
            </div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 rounded-2xl bg-[#0891B2] text-white font-bold text-base font-body shadow-[0_4px_20px_rgba(8,145,178,0.30)] disabled:opacity-45 hover:bg-[#0C4A6E] transition-colors active:scale-[0.98]"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </motion.button>
        </form>

        <p className={cn('text-center text-sm font-body', isDark ? 'text-zinc-500' : 'text-zinc-500')}>
          Already have an account?{' '}
          <Link to="/login" className="text-[#0891B2] font-semibold">Sign In</Link>
        </p>
      </motion.div>
    </div>
  )
}
