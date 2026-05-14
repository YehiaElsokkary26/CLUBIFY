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
    <div className="min-h-[844px] flex flex-col" style={{ background: isDark ? '#1C1C1E' : '#FAF8F5' }}>
      <div className="flex-shrink-0 pt-16 pb-8 px-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-3xl bg-[#8B1A1A] flex items-center justify-center shadow-lg mb-5">
            <span className="text-white text-3xl font-black">C</span>
          </div>
          <h1 className={cn('text-3xl font-black', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Join Clubify</h1>
          <p className={cn('text-sm mt-1', isDark ? 'text-gray-400' : 'text-gray-500')}>Create your GUC student account</p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 px-6 space-y-4">
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className={cn('text-xs font-semibold mb-1.5 block', isDark ? 'text-gray-400' : 'text-gray-600')}>Full Name</label>
            <div className={cn('flex items-center gap-3 px-4 py-3.5 rounded-2xl border', isDark ? 'bg-[#2C2C2E] border-[#3A3A3C]' : 'bg-white border-gray-200')}>
              <User size={18} className="text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Youssef Mahmoud"
                className={cn('flex-1 bg-transparent text-sm outline-none', isDark ? 'text-white placeholder:text-gray-500' : 'text-[#1C1C1E] placeholder:text-gray-400')}
                required
              />
            </div>
          </div>

          <div>
            <label className={cn('text-xs font-semibold mb-1.5 block', isDark ? 'text-gray-400' : 'text-gray-600')}>GUC Email</label>
            <div className={cn('flex items-center gap-3 px-4 py-3.5 rounded-2xl border', isDark ? 'bg-[#2C2C2E] border-[#3A3A3C]' : 'bg-white border-gray-200')}>
              <Mail size={18} className="text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@guc.edu.eg"
                className={cn('flex-1 bg-transparent text-sm outline-none', isDark ? 'text-white placeholder:text-gray-500' : 'text-[#1C1C1E] placeholder:text-gray-400')}
                required
              />
            </div>
          </div>

          <div>
            <label className={cn('text-xs font-semibold mb-1.5 block', isDark ? 'text-gray-400' : 'text-gray-600')}>Password</label>
            <div className={cn('flex items-center gap-3 px-4 py-3.5 rounded-2xl border', isDark ? 'bg-[#2C2C2E] border-[#3A3A3C]' : 'bg-white border-gray-200')}>
              <Lock size={18} className="text-gray-400" />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className={cn('flex-1 bg-transparent text-sm outline-none', isDark ? 'text-white placeholder:text-gray-500' : 'text-[#1C1C1E] placeholder:text-gray-400')}
                required
              />
              <button type="button" onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff size={16} className="text-gray-400" /> : <Eye size={16} className="text-gray-400" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-50 border border-red-100">
              <AlertCircle size={14} className="text-red-500 flex-shrink-0" />
              <p className="text-xs text-red-600">{error}</p>
            </div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 rounded-2xl bg-[#8B1A1A] text-white font-bold text-base shadow-lg disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </motion.button>
        </form>

        <p className={cn('text-center text-sm', isDark ? 'text-gray-500' : 'text-gray-500')}>
          Already have an account?{' '}
          <Link to="/login" className="text-[#8B1A1A] font-semibold">Sign In</Link>
        </p>
      </motion.div>
    </div>
  )
}
