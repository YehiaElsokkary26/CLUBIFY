import React, { createContext, useContext, useState, useEffect } from 'react'
import type { User } from '../data/types'
import { studentUser, adminUser, guestUser } from '../data/users'

interface AuthContextValue {
  user: User | null
  role: 'student' | 'admin' | null
  isGuest: boolean
  login: (email: string, password: string) => Promise<boolean>
  loginAsGuest: () => void
  loginAsAdmin: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<'student' | 'admin' | null>(null)
  const [isGuest, setIsGuest] = useState(false)

  useEffect(() => {
    const saved = sessionStorage.getItem('clubify_session')
    if (saved) {
      const { user: u, role: r, isGuest: ig } = JSON.parse(saved)
      setUser(u)
      setRole(r)
      setIsGuest(ig ?? false)
    }
  }, [])

  const saveSession = (u: User, r: 'student' | 'admin', ig = false) => {
    sessionStorage.setItem('clubify_session', JSON.stringify({ user: u, role: r, isGuest: ig }))
    setUser(u)
    setRole(r)
    setIsGuest(ig)
  }

  const login = async (email: string, _password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 800))
    if (email.endsWith('@guc.edu.eg') || email === studentUser.email) {
      saveSession(studentUser, 'student')
      return true
    }
    return false
  }

  const loginAsAdmin = async (email: string, _password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 800))
    if (email.endsWith('@guc.edu.eg')) {
      saveSession(adminUser, 'admin')
      return true
    }
    return false
  }

  const loginAsGuest = () => {
    saveSession(guestUser, 'student', true)
  }

  const logout = () => {
    sessionStorage.removeItem('clubify_session')
    setUser(null)
    setRole(null)
    setIsGuest(false)
  }

  const updateUser = (updates: Partial<User>) => {
    if (!user) return
    const updated = { ...user, ...updates }
    setUser(updated)
    const saved = sessionStorage.getItem('clubify_session')
    if (saved) {
      const session = JSON.parse(saved)
      sessionStorage.setItem('clubify_session', JSON.stringify({ ...session, user: updated }))
    }
  }

  return (
    <AuthContext.Provider value={{ user, role, isGuest, login, loginAsGuest, loginAsAdmin, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
