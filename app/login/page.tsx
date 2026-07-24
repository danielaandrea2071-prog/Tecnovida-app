'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'

const ROLES = ['Estudiante', 'Docente', 'Admin'] as const
const ROLE_ICONS: Record<string, string> = { Estudiante: '🎓', Docente: '📖', Admin: '🛠️' }

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !pass) { setError('Completa todos los campos.'); return }
    setLoading(true); setError('')
    const err = await login(email, pass)
    if (err) { setError(err); setLoading(false) }
    else router.replace('/dashboard')
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#0A2540' }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center p-16 relative overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full border border-[#00C4A0]/15 -top-40 -left-40" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-[#00C4A0]/10 -bottom-24 -right-24" />
        <div className="text-center z-10">
          <div className="w-20 h-20 bg-[#00C4A0] rounded-2xl flex items-center justify-center mx-auto mb-5 text-4xl font-bold text-[#0A2540] shadow-[0_8px_32px_rgba(0,196,160,0.4)]" style={{fontFamily:'Space Grotesk'}}>TV</div>
          <h1 className="text-3xl font-bold text-white tracking-tight" style={{fontFamily:'Space Grotesk'}}>TecnoVida Institute</h1>
          <p className="text-white/50 text-sm mt-2 tracking-widest uppercase">Instituto Técnico Superior</p>
        </div>
        <div className="mt-16 flex flex-col gap-5 w-full max-w-xs z-10">
          {[['📚','Gestión académica integral'],['📊','Dashboards en tiempo real'],['🎓','Portal multirol'],['🔒','Autenticación segura']].map(([i,t]) => (
            <div key={t} className="flex items-center gap-4 text-white/75 text-sm">
              <div className="w-9 h-9 bg-[#00C4A0]/15 rounded-lg flex items-center justify-center text-base flex-shrink-0">{i}</div>
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-[480px] bg-white flex flex-col items-center justify-center p-10 lg:p-14">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-[#0A2540] mb-1" style={{fontFamily:'Space Grotesk'}}>Iniciar sesión</h2>
          <p className="text-slate-500 text-sm mb-8">Accede al sistema institucional</p>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Correo institucional</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="usuario@tecnovida.edu"
                className="w-full px-3.5 py-2.5 border-2 border-slate-200 rounded-xl text-sm outline-none focus:border-[#00C4A0] focus:ring-2 focus:ring-[#00C4A0]/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Contraseña</label>
              <input
                type="password" value={pass} onChange={e => setPass(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 border-2 border-slate-200 rounded-xl text-sm outline-none focus:border-[#00C4A0] focus:ring-2 focus:ring-[#00C4A0]/10 transition-all"
              />
            </div>
            <button
              type="submit" disabled={loading}
              className="w-full py-3 bg-[#00C4A0] text-[#0A2540] rounded-xl font-semibold text-base hover:bg-[#00A88A] transition-all disabled:opacity-60 mt-2"
              style={{fontFamily:'Space Grotesk'}}
            >
              {loading ? '⏳ Verificando...' : 'Ingresar al sistema'}
            </button>
          </form>

          <div className="flex justify-between mt-6 text-xs text-slate-400">
            <Link href="/register" className="text-[#00C4A0] hover:underline">¿No tienes cuenta? Regístrate</Link>
            <span>v2.4.1 © 2025</span>
          </div>

          <div className="mt-6 p-3 bg-blue-50 rounded-xl border border-blue-100 text-xs text-slate-500">
            <strong className="block text-slate-700 mb-1">Credenciales demo:</strong>
            🛠 admin@tecnovida.edu / admin123<br/>
            📖 docente@tecnovida.edu / docente123<br/>
            🎓 estudiante@tecnovida.edu / est123
          </div>
        </div>
      </div>
    </div>
  )
}
