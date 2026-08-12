'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { User } from '@/lib/supabase'

type AuthCtx = {
  user: User | null
  loading: boolean
  login: (email: string, pass: string) => Promise<string | null>
  logout: () => void
}

const AuthContext = createContext<AuthCtx>({
  user: null, loading: true,
  login: async () => null, logout: () => {}
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('tv_user')
    if (stored) setUser(JSON.parse(stored))
    setLoading(false)
  }, [])

  async function login(email: string, pass: string): Promise<string | null> {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass }),
    })
    const json = await res.json()

    if (!res.ok) {
      return json.error || 'Error al iniciar sesión.'
    }

    const u = json.user as User
    setUser(u)
    localStorage.setItem('tv_user', JSON.stringify(u))
    return null
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('tv_user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
