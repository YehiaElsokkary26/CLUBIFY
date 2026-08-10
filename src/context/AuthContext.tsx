import React, { createContext, useContext, useState, useEffect } from 'react'
import type { User } from '../data/types'
import { studentUser, adminUser, guestUser } from '../data/users'
import { apiRequest } from '../lib/api'

const DEMO_STUDENT: User = {
  id: 'demo-student',
  name: 'Youssef Mahmoud',
  email: 'youssef.mahmoud@guc.edu.eg',
  gucId: '49-12345',
  faculty: 'Media Engineering & Technology',
  year: 3,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=youssef&backgroundColor=b6e3f4',
  bio: 'CS student passionate about tech, media, and making a difference.',
  role: 'student',
  joinedClubs: ['c1', 'c7', 'c10'],
  attendedSessions: 14,
  totalSessions: 18,
  warnings: [],
  profileCompletion: 75,
}

const DEMO_ADMIN: User = {
  id: 'demo-admin',
  name: 'Sara Ahmed',
  email: 'sara.ahmed@guc.edu.eg',
  gucId: '49-67890',
  faculty: 'Management Technology',
  year: 4,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sara&backgroundColor=ffdfbf',
  bio: 'President of GUC Media Club. Passionate about storytelling and student leadership.',
  role: 'admin',
  joinedClubs: ['c1'],
  attendedSessions: 28,
  totalSessions: 30,
  warnings: [],
  profileCompletion: 95,
}

interface AuthContextValue {
  user: User | null
  role: 'student' | 'admin' | null
  isGuest: boolean
  isLoading: boolean
  /** Real JWT from the Express/Supabase backend, when we managed to obtain one. Null for demo/guest sessions. */
  accessToken: string | null
  login: (email: string, password: string) => Promise<boolean>
  loginAsGuest: () => void
  loginAsAdmin: (email: string, password: string) => Promise<boolean>
  loginAsDemo: (demoRole: 'student' | 'admin') => void
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

// The rest of the app (joinedClubs, warnings, profileCompletion, ...) still runs on the
// mock user model, so login here never fails just because the real backend is unreachable
// or the account doesn't exist in Supabase yet — we just won't have a usable accessToken.
async function tryGetRealAccessToken(email: string, password: string): Promise<string | null> {
  try {
    const data = await apiRequest<{ accessToken: string }>('/auth/login', {
      method: 'POST',
      body: { email, password },
    })
    return data.accessToken
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<'student' | 'admin' | null>(null)
  const [isGuest, setIsGuest] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('clubify_session')
    if (saved) {
      const { user: u, role: r, isGuest: ig, accessToken: t } = JSON.parse(saved)
      setUser(u)
      setRole(r)
      setIsGuest(ig ?? false)
      setAccessToken(t ?? null)
    }
    setIsLoading(false)
  }, [])

  const saveSession = (u: User, r: 'student' | 'admin', ig = false, token: string | null = null) => {
    localStorage.setItem('clubify_session', JSON.stringify({ user: u, role: r, isGuest: ig, accessToken: token }))
    setUser(u)
    setRole(r)
    setIsGuest(ig)
    setAccessToken(token)
  }

  const loginAsDemo = (demoRole: 'student' | 'admin') => {
    const demoUser = demoRole === 'admin' ? DEMO_ADMIN : DEMO_STUDENT
    saveSession(demoUser, demoRole)
    if (demoRole === 'student') {
      localStorage.setItem('clubify_onboarded', 'true')
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    const [, token] = await Promise.all([
      new Promise((r) => setTimeout(r, 800)),
      tryGetRealAccessToken(email, password),
    ])
    if (email.endsWith('@guc.edu.eg') || email === studentUser.email) {
      saveSession(studentUser, 'student', false, token)
      return true
    }
    return false
  }

  const loginAsAdmin = async (email: string, password: string): Promise<boolean> => {
    const [, token] = await Promise.all([
      new Promise((r) => setTimeout(r, 800)),
      tryGetRealAccessToken(email, password),
    ])
    if (email.endsWith('@guc.edu.eg')) {
      saveSession(adminUser, 'admin', false, token)
      return true
    }
    return false
  }

  const loginAsGuest = () => {
    saveSession(guestUser, 'student', true)
  }

  const logout = () => {
    localStorage.removeItem('clubify_session')
    setUser(null)
    setRole(null)
    setIsGuest(false)
    setAccessToken(null)
  }

  const updateUser = (updates: Partial<User>) => {
    if (!user) return
    const updated = { ...user, ...updates }
    setUser(updated)
    const saved = localStorage.getItem('clubify_session')
    if (saved) {
      const session = JSON.parse(saved)
      localStorage.setItem('clubify_session', JSON.stringify({ ...session, user: updated }))
    }
  }

  return (
    <AuthContext.Provider value={{ user, role, isGuest, isLoading, accessToken, login, loginAsGuest, loginAsAdmin, loginAsDemo, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
