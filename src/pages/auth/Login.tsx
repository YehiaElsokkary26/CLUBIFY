import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, AlertCircle, Zap, UserRound, GraduationCap } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { cn } from '../../lib/utils'

export function Login() {
  const navigate = useNavigate()
  const { login, loginAsAdmin, loginAsGuest, loginAsDemo } = useAuth()
  const { isDark } = useTheme()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [demoLoading, setDemoLoading] = useState<'student' | 'admin' | null>(null)
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
          const onboarded = localStorage.getItem('clubify_onboarded')
          const destination = onboarded ? '/student/home' : '/onboarding'
          if (!termsAccepted) {
            navigate('/terms', { state: { postLoginRedirect: destination } })
            return
          }
          navigate(destination)
        } else {
          setError('Invalid credentials. Try youssef.mahmoud@guc.edu.eg')
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDemo = (demoRole: 'student' | 'admin') => {
    setDemoLoading(demoRole)
    setTimeout(() => {
      loginAsDemo(demoRole)
      navigate(demoRole === 'admin' ? '/admin/feed' : '/student/home')
    }, 600)
  }

  return (
    <div
      className="min-h-[844px] flex flex-col"
      style={{ background: isDark ? '#272831' : '#F5F5F6' }}
    >
      {/* Teal accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#FDA014] to-[#E08E0F]" />

      {/* Hero */}
      <div className="flex-shrink-0 pt-14 pb-8 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center"
        >
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#FDA014] to-[#E08E0F] flex items-center justify-center shadow-[0_4px_20px_rgba(253,160,20,0.4)] mb-5">
            <span className="text-white text-3xl font-black font-display tracking-widest">C</span>
          </div>
          <h1 className={cn('text-h1 tracking-widest', isDark ? 'text-white' : 'text-[#272831]')}>
            CLUBIFY
          </h1>
          <p className={cn('text-sm mt-1 font-body', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
            Your GUC Student Hub
          </p>
        </motion.div>
      </div>

      {/* ── ONE-TAP DEMO ACCOUNTS ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-6 mb-5"
      >
        <div className={cn(
          'rounded-3xl p-4 border-2 border-dashed',
          isDark ? 'bg-[#272831] border-[#6F2F33]/40' : 'bg-[#6F2F33]/5 border-[#6F2F33]/25'
        )}>
          <div className="flex items-center gap-2 mb-3">
            <Zap size={13} className="text-[#6F2F33]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6F2F33]">
              Try instantly — no sign up needed
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {/* Student demo */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => handleDemo('student')}
              disabled={demoLoading !== null}
              className="flex flex-col items-center gap-2.5 py-4 px-3 rounded-2xl bg-[#6F2F33] text-white disabled:opacity-60 transition-opacity"
            >
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=youssef&backgroundColor=b6e3f4"
                alt="Student"
                className="w-11 h-11 rounded-full bg-white"
              />
              <div className="text-center">
                <p className="text-xs font-bold leading-tight">Youssef Mahmoud</p>
                <p className="flex items-center justify-center gap-1 text-[10px] opacity-75 mt-0.5">
                  {demoLoading === 'student' ? 'Entering…' : (<><UserRound size={10} /> Student View</>)}
                </p>
              </div>
            </motion.button>

            {/* Admin demo */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => handleDemo('admin')}
              disabled={demoLoading !== null}
              className={cn(
                'flex flex-col items-center gap-2.5 py-4 px-3 rounded-2xl border-2 disabled:opacity-60 transition-opacity',
                isDark ? 'border-[#272831] bg-[#272831]' : 'border-gray-200 bg-white'
              )}
            >
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=sara&backgroundColor=ffdfbf"
                alt="Officer"
                className="w-11 h-11 rounded-full bg-gray-100"
              />
              <div className="text-center">
                <p className={cn('text-xs font-bold leading-tight', isDark ? 'text-white' : 'text-[#272831]')}>
                  Sara Ahmed
                </p>
                <p className={cn('flex items-center justify-center gap-1 text-[10px] mt-0.5', isDark ? 'text-gray-400' : 'text-gray-500')}>
                  {demoLoading === 'admin' ? 'Entering…' : (<><GraduationCap size={10} /> Club Officer</>)}
                </p>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="flex items-center gap-3 px-6 mb-4">
        <div className={cn('flex-1 h-px', isDark ? 'bg-[#272831]' : 'bg-gray-200')} />
        <span className={cn('text-[11px]', isDark ? 'text-gray-500' : 'text-gray-400')}>or sign in with GUC account</span>
        <div className={cn('flex-1 h-px', isDark ? 'bg-[#272831]' : 'bg-gray-200')} />
      </div>

      {/* Mode toggle */}
      <div className="px-6 mb-6">
        <div className={cn('flex p-1 rounded-2xl', isDark ? 'bg-[#272831]' : 'bg-[#FFFFFF] shadow-sm')}>
          {(['student', 'admin'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                'flex-1 py-2.5 rounded-xl text-sm font-semibold font-body transition-all duration-200 capitalize',
                mode === m ? 'bg-[#6F2F33] text-white shadow-sm' : isDark ? 'text-[#929397]' : 'text-[#929397]'
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
        <div className={cn('rounded-2xl px-4 py-3 border border-dashed', isDark ? 'bg-[#272831] border-[#FDA014]/40' : 'bg-[#FDA014]/5 border-[#FDA014]/30')}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FDA014] font-display">Demo Account</span>
            <button
              type="button"
              onClick={() => {
                setEmail(mode === 'student' ? 'youssef.mahmoud@guc.edu.eg' : 'sara.ahmed@guc.edu.eg')
                setPassword('demo1234')
              }}
              className="text-[10px] font-bold text-[#6F2F33] px-2 py-0.5 rounded-full border border-[#6F2F33]/40 active:scale-95 transition-transform font-body"
            >
              Autofill
            </button>
          </div>
          {mode === 'student' ? (
            <div className="space-y-0.5">
              <p className={cn('text-xs font-body', isDark ? 'text-[#B8B9C1]' : 'text-[#4A4B52]')}>
                <span className={cn('font-semibold', isDark ? 'text-[#929397]' : 'text-[#929397]')}>Email: </span>
                youssef.mahmoud@guc.edu.eg
              </p>
              <p className={cn('text-xs font-body', isDark ? 'text-[#B8B9C1]' : 'text-[#4A4B52]')}>
                <span className={cn('font-semibold', isDark ? 'text-[#929397]' : 'text-[#929397]')}>Password: </span>
                demo1234
              </p>
            </div>
          ) : (
            <div className="space-y-0.5">
              <p className={cn('text-xs font-body', isDark ? 'text-[#B8B9C1]' : 'text-[#4A4B52]')}>
                <span className={cn('font-semibold', isDark ? 'text-[#929397]' : 'text-[#929397]')}>Email: </span>
                sara.ahmed@guc.edu.eg
              </p>
              <p className={cn('text-xs font-body', isDark ? 'text-[#B8B9C1]' : 'text-[#4A4B52]')}>
                <span className={cn('font-semibold', isDark ? 'text-[#929397]' : 'text-[#929397]')}>Password: </span>
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

          {/* Password */}
          <div>
            <label className="type-label mb-1.5 block">Password</label>
            <div className={cn('flex items-center gap-3 px-4 py-3.5 rounded-2xl border-[1.5px] transition-colors focus-within:border-[#6F2F33] focus-within:shadow-[0_0_0_3px_rgba(186,230,253,0.5)]', isDark ? 'bg-[#272831] border-[#35363F]' : 'bg-[#FFFFFF] border-[#E5E5E8]')}>
              <Lock size={18} className="text-[#929397]" />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
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
            className="w-full py-4 rounded-2xl bg-[#6F2F33] text-white font-bold text-base font-body shadow-[0_4px_20px_rgba(111,47,51,0.30)] disabled:opacity-45 mt-2 tracking-wide hover:bg-[#5c2427] transition-colors active:scale-[0.98]"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </motion.button>
        </form>

        <div className="flex items-center gap-3">
          <div className={cn('flex-1 h-px', isDark ? 'bg-[#35363F]' : 'bg-[#F0F0F2]')} />
          <span className={cn('text-xs font-body', isDark ? 'text-[#929397]' : 'text-[#929397]')}>or</span>
          <div className={cn('flex-1 h-px', isDark ? 'bg-[#35363F]' : 'bg-[#F0F0F2]')} />
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => { loginAsGuest(); navigate('/student/home') }}
          className={cn('w-full py-4 rounded-2xl font-bold text-base font-body border-[1.5px] transition-all', isDark ? 'border-[#35363F] text-[#B8B9C1] hover:border-[#6F2F33] hover:text-[#6F2F33]' : 'border-[#E5E5E8] text-[#6B6C72] hover:border-[#6F2F33] hover:text-[#6F2F33] hover:bg-[#FAE8E9]')}
        >
          Continue as Guest
        </motion.button>

        <p className={cn('text-center text-sm font-body', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#6F2F33] font-semibold">Sign Up</Link>
        </p>
      </motion.div>
    </div>
  )
}
