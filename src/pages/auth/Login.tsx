import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { cn } from '../../lib/utils'

export function Login() {
  const navigate = useNavigate()
  const { login, loginAsGuest, loginAsAdmin } = useAuth()
  const { isDark } = useTheme()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mode, setMode] = useState<'student' | 'admin'>('student')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email.endsWith('@guc.edu.eg')) {
      setError('Please use your GUC email (@guc.edu.eg)')
      return
    }
    setLoading(true)
    try {
      if (mode === 'admin') {
        await loginAsAdmin(email, password)
        navigate('/admin/feed')
      } else {
        const ok = await login(email, password)
        if (ok) {
          const onboarded = localStorage.getItem('clubify_onboarded')
          navigate(onboarded ? '/student/home' : '/onboarding')
        } else {
          setError('Invalid credentials. Try youssef.mahmoud@guc.edu.eg')
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-[844px] flex flex-col"
      style={{ background: isDark ? '#1C1C1E' : '#FAF8F5' }}
    >
      {/* Hero */}
      <div className="flex-shrink-0 pt-16 pb-8 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center"
        >
          <div className="w-20 h-20 rounded-3xl bg-[#8B1A1A] flex items-center justify-center shadow-lg mb-5">
            <span className="text-white text-3xl font-black">C</span>
          </div>
          <h1 className={cn('text-3xl font-black', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Clubify</h1>
          <p className={cn('text-sm mt-1', isDark ? 'text-gray-400' : 'text-gray-500')}>
            Your GUC Student Hub
          </p>
        </motion.div>
      </div>

      {/* Mode toggle */}
      <div className="px-6 mb-6">
        <div className={cn('flex p-1 rounded-2xl', isDark ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm')}>
          {(['student', 'admin'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                'flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 capitalize',
                mode === m ? 'bg-[#8B1A1A] text-white shadow-sm' : isDark ? 'text-gray-400' : 'text-gray-500'
              )}
            >
              {m === 'student' ? 'Student' : 'Admin'}
            </button>
          ))}
        </div>
      </div>

      {/* Demo credentials card */}
      <motion.div
        key={`demo-${mode}`}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 mb-2"
      >
        <div className={cn('rounded-2xl px-4 py-3 border border-dashed', isDark ? 'bg-[#2C2C2E] border-[#8B1A1A]/40' : 'bg-[#8B1A1A]/5 border-[#8B1A1A]/30')}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B1A1A]">Demo Account</span>
            <button
              type="button"
              onClick={() => {
                setEmail(mode === 'student' ? 'youssef.mahmoud@guc.edu.eg' : 'sara.ahmed@guc.edu.eg')
                setPassword('demo1234')
              }}
              className="text-[10px] font-bold text-[#8B1A1A] px-2 py-0.5 rounded-full border border-[#8B1A1A]/40 active:scale-95 transition-transform"
            >
              Autofill
            </button>
          </div>
          {mode === 'student' ? (
            <div className="space-y-0.5">
              <p className={cn('text-xs', isDark ? 'text-gray-300' : 'text-gray-700')}>
                <span className={cn('font-semibold', isDark ? 'text-gray-400' : 'text-gray-500')}>Email: </span>
                youssef.mahmoud@guc.edu.eg
              </p>
              <p className={cn('text-xs', isDark ? 'text-gray-300' : 'text-gray-700')}>
                <span className={cn('font-semibold', isDark ? 'text-gray-400' : 'text-gray-500')}>Password: </span>
                demo1234
              </p>
            </div>
          ) : (
            <div className="space-y-0.5">
              <p className={cn('text-xs', isDark ? 'text-gray-300' : 'text-gray-700')}>
                <span className={cn('font-semibold', isDark ? 'text-gray-400' : 'text-gray-500')}>Email: </span>
                sara.ahmed@guc.edu.eg
              </p>
              <p className={cn('text-xs', isDark ? 'text-gray-300' : 'text-gray-700')}>
                <span className={cn('font-semibold', isDark ? 'text-gray-400' : 'text-gray-500')}>Password: </span>
                demo1234
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        key={mode}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 px-6 space-y-4"
      >
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className={cn('text-xs font-semibold mb-1.5 block', isDark ? 'text-gray-400' : 'text-gray-600')}>
              GUC Email
            </label>
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

          {/* Password */}
          <div>
            <label className={cn('text-xs font-semibold mb-1.5 block', isDark ? 'text-gray-400' : 'text-gray-600')}>
              Password
            </label>
            <div className={cn('flex items-center gap-3 px-4 py-3.5 rounded-2xl border', isDark ? 'bg-[#2C2C2E] border-[#3A3A3C]' : 'bg-white border-gray-200')}>
              <Lock size={18} className="text-gray-400" />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
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
            className="w-full py-4 rounded-2xl bg-[#8B1A1A] text-white font-bold text-base shadow-lg disabled:opacity-60 mt-2"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </form>

        <div className="flex items-center gap-3">
          <div className={cn('flex-1 h-px', isDark ? 'bg-[#2C2C2E]' : 'bg-gray-200')} />
          <span className={cn('text-xs', isDark ? 'text-gray-500' : 'text-gray-400')}>or</span>
          <div className={cn('flex-1 h-px', isDark ? 'bg-[#2C2C2E]' : 'bg-gray-200')} />
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => { loginAsGuest(); navigate('/student/home') }}
          className={cn('w-full py-4 rounded-2xl font-bold text-base border-2', isDark ? 'border-[#3A3A3C] text-gray-300' : 'border-gray-200 text-gray-600')}
        >
          Continue as Guest
        </motion.button>

        <p className={cn('text-center text-sm', isDark ? 'text-gray-500' : 'text-gray-500')}>
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#8B1A1A] font-semibold">Sign Up</Link>
        </p>
      </motion.div>
    </div>
  )
}
