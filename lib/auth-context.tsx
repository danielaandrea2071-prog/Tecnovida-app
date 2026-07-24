'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase, User } from '@/lib/supabase'

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
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase().trim())
      .maybeSingle()

    if (error) return 'Error de base de datos: ' + error.message
    if (!data) {
      const { data: pend } = await supabase
        .from('users_pending').select('id').eq('email', email).maybeSingle()
      return pend
        ? 'Tu cuenta está pendiente de aprobación. El administrador debe aprobarla primero.'
        : 'Correo no encontrado en el sistema.'
    }
    if (data.password_hash !== pass) return 'Contraseña incorrecta.'

    const u = data as User
    setUser(u)
    localStorage.setItem('tv_user', JSON.stringify(u))
    await supabase.from('audit_logs').insert({ user_email: email, action: 'Login exitoso' })
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
