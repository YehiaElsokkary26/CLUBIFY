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
          const termsAccepted = localStorage.getItem('clubify_terms_accepted') === 'true'
          if (!termsAccepted) { navigate('/terms'); return }
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
      style={{ background: isDark ? '#0D1A12' : '#F4FBF6' }}
    >
      {/* Teal accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#1A5E3A] to-[#154B2E]" />

      {/* Hero */}
      <div className="flex-shrink-0 pt-14 pb-8 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center"
        >
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#1A5E3A] to-[#154B2E] flex items-center justify-center shadow-[0_4px_20px_rgba(111,47,51,0.4)] mb-5">
            <span className="text-white text-3xl font-black font-display tracking-widest">C</span>
          </div>
          <h1 className={cn('text-3xl font-black font-display tracking-widest', isDark ? 'text-white' : 'text-[#0D1A12]')}>
            CLUBIFY
          </h1>
          <p className={cn('text-sm mt-1 font-body', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>
            Your GUC Student Hub
          </p>
        </motion.div>
      </div>

      {/* Mode toggle */}
      <div className="px-6 mb-6">
        <div className={cn('flex p-1 rounded-2xl', isDark ? 'bg-[#23323F]' : 'bg-[#FFFFFF] shadow-sm')}>
          {(['student', 'admin'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                'flex-1 py-2.5 rounded-xl text-sm font-semibold font-body transition-all duration-200 capitalize',
                mode === m ? 'bg-[#1A5E3A] text-white shadow-sm' : isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]'
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
        <div className={cn('rounded-2xl px-4 py-3 border border-dashed', isDark ? 'bg-[#23323F] border-[#1A5E3A]/40' : 'bg-[#1A5E3A]/5 border-[#1A5E3A]/30')}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A5E3A] font-display">Demo Account</span>
            <button
              type="button"
              onClick={() => {
                setEmail(mode === 'student' ? 'youssef.mahmoud@guc.edu.eg' : 'sara.ahmed@guc.edu.eg')
                setPassword('demo1234')
              }}
              className="text-[10px] font-bold text-[#1A5E3A] px-2 py-0.5 rounded-full border border-[#1A5E3A]/40 active:scale-95 transition-transform font-body"
            >
              Autofill
            </button>
          </div>
          {mode === 'student' ? (
            <div className="space-y-0.5">
              <p className={cn('text-xs font-body', isDark ? 'text-[#C0D4C8]' : 'text-[#42403C]')}>
                <span className={cn('font-semibold', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>Email: </span>
                youssef.mahmoud@guc.edu.eg
              </p>
              <p className={cn('text-xs font-body', isDark ? 'text-[#C0D4C8]' : 'text-[#42403C]')}>
                <span className={cn('font-semibold', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>Password: </span>
                demo1234
              </p>
            </div>
          ) : (
            <div className="space-y-0.5">
              <p className={cn('text-xs font-body', isDark ? 'text-[#C0D4C8]' : 'text-[#42403C]')}>
                <span className={cn('font-semibold', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>Email: </span>
                sara.ahmed@guc.edu.eg
              </p>
              <p className={cn('text-xs font-body', isDark ? 'text-[#C0D4C8]' : 'text-[#42403C]')}>
                <span className={cn('font-semibold', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>Password: </span>
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
            <label className="type-label mb-1.5 block">GUC Email</label>
            <div className={cn('flex items-center gap-3 px-4 py-3.5 rounded-2xl border-[1.5px] transition-colors focus-within:border-[#1A5E3A] focus-within:shadow-[0_0_0_3px_rgba(186,230,253,0.5)]', isDark ? 'bg-[#23323F] border-[#2d3d4a]' : 'bg-[#FFFFFF] border-[#C8E0D0]')}>
              <Mail size={18} className="text-[#9AB0A0]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@guc.edu.eg"
                className={cn('flex-1 bg-transparent text-sm outline-none font-body', isDark ? 'text-white placeholder:text-[#6A7870]' : 'text-[#0D1A12] placeholder:text-[#9AB0A0]')}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="type-label mb-1.5 block">Password</label>
            <div className={cn('flex items-center gap-3 px-4 py-3.5 rounded-2xl border-[1.5px] transition-colors focus-within:border-[#1A5E3A] focus-within:shadow-[0_0_0_3px_rgba(186,230,253,0.5)]', isDark ? 'bg-[#23323F] border-[#2d3d4a]' : 'bg-[#FFFFFF] border-[#C8E0D0]')}>
              <Lock size={18} className="text-[#9AB0A0]" />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={cn('flex-1 bg-transparent text-sm outline-none font-body', isDark ? 'text-white placeholder:text-[#6A7870]' : 'text-[#0D1A12] placeholder:text-[#9AB0A0]')}
                required
              />
              <button type="button" onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff size={16} className="text-[#9AB0A0]" /> : <Eye size={16} className="text-[#9AB0A0]" />}
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
            className="w-full py-4 rounded-2xl bg-[#1A5E3A] text-white font-bold text-base font-body shadow-[0_4px_20px_rgba(111,47,51,0.30)] disabled:opacity-45 mt-2 tracking-wide hover:bg-[#154B2E] transition-colors active:scale-[0.98]"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </form>

        <div className="flex items-center gap-3">
          <div className={cn('flex-1 h-px', isDark ? 'bg-[#2d3d4a]' : 'bg-[#E4E4E7]')} />
          <span className={cn('text-xs font-body', isDark ? 'text-[#6A7870]' : 'text-[#9AB0A0]')}>or</span>
          <div className={cn('flex-1 h-px', isDark ? 'bg-[#2d3d4a]' : 'bg-[#E4E4E7]')} />
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => { loginAsGuest(); navigate('/student/home') }}
          className={cn('w-full py-4 rounded-2xl font-bold text-base font-body border-[1.5px] transition-all', isDark ? 'border-[#2d3d4a] text-[#C0D4C8] hover:border-[#1A5E3A] hover:text-[#1A5E3A]' : 'border-[#C8E0D0] text-[#5C5650] hover:border-[#1A5E3A] hover:text-[#1A5E3A] hover:bg-[#E6F4EC]')}
        >
          Continue as Guest
        </motion.button>

        <p className={cn('text-center text-sm font-body', isDark ? 'text-[#6A7870]' : 'text-[#6A7870]')}>
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#1A5E3A] font-semibold">Sign Up</Link>
        </p>
      </motion.div>
    </div>
  )
}
