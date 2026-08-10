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
    <div className="min-h-[844px] flex flex-col" style={{ background: isDark ? '#272831' : '#F5F5F6' }}>
      {/* Teal accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#FDA014] to-[#E08E0F]" />

      <div className="flex-shrink-0 pt-14 pb-8 px-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#FDA014] to-[#E08E0F] flex items-center justify-center shadow-[0_4px_20px_rgba(253,160,20,0.4)] mb-5">
            <span className="text-white text-3xl font-black font-display tracking-widest">C</span>
          </div>
          <h1 className={cn('text-h1 tracking-widest', isDark ? 'text-white' : 'text-[#272831]')}>Join Clubify</h1>
          <p className={cn('text-sm mt-1 font-body', isDark ? 'text-[#929397]' : 'text-[#929397]')}>Create your GUC student account</p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 px-6 space-y-4">
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="type-label mb-1.5 block">Full Name</label>
            <div className={cn('flex items-center gap-3 px-4 py-3.5 rounded-2xl border-[1.5px] transition-colors focus-within:border-[#6F2F33] focus-within:shadow-[0_0_0_3px_rgba(186,230,253,0.5)]', isDark ? 'bg-[#272831] border-[#35363F]' : 'bg-[#FFFFFF] border-[#E5E5E8]')}>
              <User size={18} className="text-[#929397]" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Youssef Mahmoud"
                className={cn('flex-1 bg-transparent text-sm outline-none font-body', isDark ? 'text-white placeholder:text-[#929397]' : 'text-[#272831] placeholder:text-[#929397]')}
                required
              />
            </div>
          </div>

          <div>
            <label className="type-label mb-1.5 block">GUC Email</label>
            <div className={cn('flex items-center gap-3 px-4 py-3.5 rounded-2xl border-[1.5px] transition-colors focus-within:border-[#6F2F33] focus-within:shadow-[0_0_0_3px_rgba(186,230,253,0.5)]', isDark ? 'bg-[#272831] border-[#35363F]' : 'bg-[#FFFFFF] border-[#E5E5E8]')}>
              <Mail size={18} className="text-[#929397]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@guc.edu.eg"
                className={cn('flex-1 bg-transparent text-sm outline-none font-body', isDark ? 'text-white placeholder:text-[#929397]' : 'text-[#272831] placeholder:text-[#929397]')}
                required
              />
            </div>
          </div>

          <div>
            <label className="type-label mb-1.5 block">Password</label>
            <div className={cn('flex items-center gap-3 px-4 py-3.5 rounded-2xl border-[1.5px] transition-colors focus-within:border-[#6F2F33] focus-within:shadow-[0_0_0_3px_rgba(186,230,253,0.5)]', isDark ? 'bg-[#272831] border-[#35363F]' : 'bg-[#FFFFFF] border-[#E5E5E8]')}>
              <Lock size={18} className="text-[#929397]" />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className={cn('flex-1 bg-transparent text-sm outline-none font-body', isDark ? 'text-white placeholder:text-[#929397]' : 'text-[#272831] placeholder:text-[#929397]')}
                required
              />
              <button type="button" onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff size={16} className="text-[#929397]" /> : <Eye size={16} className="text-[#929397]" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#E14535]/10 border border-[#E14535]/20">
              <AlertCircle size={14} className="text-[#E14535] flex-shrink-0" />
              <p className="text-xs text-[#E14535] font-body">{error}</p>
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

        <p className={cn('text-center text-sm font-body', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
          Already have an account?{' '}
          <Link to="/login" className="text-[#6F2F33] font-semibold">Sign In</Link>
        </p>
      </motion.div>
    </div>
  )
}
