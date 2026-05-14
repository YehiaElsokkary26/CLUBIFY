import React, { createContext, useContext, useState, useEffect } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import type { User } from '../data/types'

interface AuthContextValue {
  user: User | null
  role: 'student' | 'admin' | null
  isGuest: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<{ error: string | null }>
  signup: (email: string, password: string, name: string) => Promise<{ error: string | null }>
  loginAsAdmin: (email: string, password: string) => Promise<{ error: string | null }>
  loginAsGuest: () => Promise<void>
  logout: () => Promise<void>
  updateUser: (updates: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

function profileToUser(profile: Record<string, unknown>, email: string): User {
  return {
    id: profile.id as string,
    name: (profile.name as string) || 'Student',
    email,
    gucId: (profile.guc_id as string) || '',
    faculty: (profile.faculty as string) || '',
    year: (profile.year as number) || 1,
    avatar: (profile.avatar_url as string) ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.id}`,
    bio: (profile.bio as string) || '',
    role: ((profile.role as string) || 'student') as 'student' | 'admin',
    joinedClubs: (profile.joined_clubs as string[]) || [],
    attendedSessions: (profile.attended_sessions as number) || 0,
    totalSessions: (profile.total_sessions as number) || 0,
    warnings: (profile.warnings as string[]) || [],
    profileCompletion: (profile.profile_completion as number) || 10,
  }
}

async function fetchProfile(session: Session): Promise<User | null> {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()
  if (!data) return null
  return profileToUser(data, session.user.email ?? '')
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<'student' | 'admin' | null>(null)
  const [isGuest, setIsGuest] = useState(false)
  const [loading, setLoading] = useState(true)

  const applyUser = (u: User, anonymous = false) => {
    setUser(u)
    setRole(u.role)
    setIsGuest(anonymous)
  }

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        const u = await fetchProfile(session)
        if (u) applyUser(u, session.user.is_anonymous ?? false)
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session) {
          const u = await fetchProfile(session)
          if (u) applyUser(u, session.user.is_anonymous ?? false)
        } else {
          setUser(null)
          setRole(null)
          setIsGuest(false)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const login = async (email: string, password: string): Promise<{ error: string | null }> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { error: error.message }
    return { error: null }
  }

  const signup = async (
    email: string,
    password: string,
    name: string
  ): Promise<{ error: string | null }> => {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    })
    if (error) return { error: error.message }
    if (data.user) {
      await supabase
        .from('profiles')
        .upsert({ id: data.user.id, name }, { onConflict: 'id' })
    }
    return { error: null }
  }

  const loginAsAdmin = async (
    email: string,
    password: string
  ): Promise<{ error: string | null }> => {
    const { error, data } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { error: error.message }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    if (profile?.role !== 'admin') {
      await supabase.auth.signOut()
      return { error: 'This account does not have admin privileges.' }
    }
    return { error: null }
  }

  const loginAsGuest = async () => {
    const { error } = await supabase.auth.signInAnonymously()
    if (error) {
      // Fallback: set a local guest state if anonymous auth is disabled
      setUser({
        id: 'guest',
        name: 'Guest',
        email: '',
        gucId: '',
        faculty: '',
        year: 1,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest',
        bio: '',
        role: 'student',
        joinedClubs: [],
        attendedSessions: 0,
        totalSessions: 0,
        warnings: [],
        profileCompletion: 10,
      })
      setRole('student')
      setIsGuest(true)
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
  }

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return

    const dbUpdates: Record<string, unknown> = {}
    if (updates.bio !== undefined)               dbUpdates.bio = updates.bio
    if (updates.name !== undefined)              dbUpdates.name = updates.name
    if (updates.faculty !== undefined)           dbUpdates.faculty = updates.faculty
    if (updates.year !== undefined)              dbUpdates.year = updates.year
    if (updates.avatar !== undefined)            dbUpdates.avatar_url = updates.avatar
    if (updates.profileCompletion !== undefined) dbUpdates.profile_completion = updates.profileCompletion
    if (updates.joinedClubs !== undefined)       dbUpdates.joined_clubs = updates.joinedClubs

    if (user.id !== 'guest') {
      await supabase.from('profiles').update(dbUpdates).eq('id', user.id)
    }
    setUser({ ...user, ...updates })
  }

  return (
    <AuthContext.Provider
      value={{ user, role, isGuest, loading, login, signup, loginAsAdmin, loginAsGuest, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
