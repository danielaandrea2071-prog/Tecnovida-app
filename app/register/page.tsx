'use client'
import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

type Step = 1 | 2 | 3

export default function RegisterPage() {
  const [step, setStep] = useState<Step>(1)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const [f, setF] = useState({
    fname: '', lname: '', cedula: '', birth: '', phone: '', address: '',
    role: 'Estudiante', faculty: 'Ciencias e Ingeniería', career: 'Ingeniería en Sistemas',
    turno: 'Matutino (7am - 1pm)', specialty: '', degree: 'Maestría',
    email: '', pass: '', pass2: '', terms: false,
  })

  const set = (k: string, v: string | boolean) => setF(p => ({ ...p, [k]: v }))

  function next1() {
    if (!f.fname || !f.lname || !f.cedula || !f.birth || !f.phone || !f.address) {
      setError('Completa todos los campos obligatorios.'); return
    }
    setError(''); setStep(2)
  }
  function next2() {
    if (f.role === 'Docente' && !f.specialty) { setError('Indica tu especialidad.'); return }
    setError(''); setStep(3)
  }
  async function submit() {
    if (!f.email || !f.pass || !f.pass2) { setError('Completa todos los campos.'); return }
    if (f.pass.length < 8) { setError('Contraseña mínimo 8 caracteres.'); return }
    if (f.pass !== f.pass2) { setError('Las contraseñas no coinciden.'); return }
    if (!f.terms) { setError('Debes aceptar los términos.'); return }
    setLoading(true); setError('')
    try {
      const { data: ex1 } = await supabase.from('users').select('id').eq('email', f.email.toLowerCase()).maybeSingle()
      const { data: ex2 } = await supabase.from('users_pending').select('id').eq('email', f.email.toLowerCase()).maybeSingle()
      if (ex1 || ex2) { setError('Este correo ya está registrado.'); setLoading(false); return }

      const { error: insErr } = await supabase.from('users_pending').insert({
        nombre: `${f.fname} ${f.lname}`,
        email: f.email.toLowerCase().trim(),
        password_hash: f.pass,
        role: f.role,
        cedula: f.cedula,
        phone: f.phone,
        address: f.address,
        birth_date: f.birth,
        faculty: f.role === 'Estudiante' ? f.faculty : null,
        career: f.role === 'Estudiante' ? f.career : null,
        turno: f.role === 'Estudiante' ? f.turno : null,
        specialty: f.role === 'Docente' ? f.specialty : null,
        degree: f.role === 'Docente' ? f.degree : null,
      })
      if (insErr) throw insErr
      await supabase.from('audit_logs').insert({ user_email: f.email, action: 'Registro enviado — pendiente aprobación' })
      setDone(true)
    } catch (e: any) {
      setError('Error: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  if (done) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A2540] p-6">
      <div className="bg-white rounded-2xl p-10 max-w-md w-full text-center shadow-2xl">
        <div className="text-6xl mb-5">✅</div>
        <h2 className="text-2xl font-bold text-[#0A2540] mb-3" style={{fontFamily:'Space Grotesk'}}>¡Registro exitoso!</h2>
        <p className="text-slate-500 text-sm mb-6">Tu solicitud fue enviada. El área de Registraduría la revisará en 24-48 horas hábiles y recibirás confirmación.</p>
        <div className="bg-blue-50 rounded-xl p-4 text-xs text-slate-600 text-left mb-6">
          <strong className="block mb-2 text-slate-700">Próximos pasos:</strong>
          1. Espera la aprobación del administrador<br/>
          2. Recibirás notificación por correo<br/>
          3. Ingresa con tus credenciales registradas
        </div>
        <Link href="/login" className="block w-full py-3 bg-[#00C4A0] text-[#0A2540] rounded-xl font-semibold text-sm hover:bg-[#00A88A] transition-all" style={{fontFamily:'Space Grotesk'}}>
          ← Volver al inicio de sesión
        </Link>
      </div>
    </div>
  )

  const steps = [
    { n: 1, label: 'Personal' },
    { n: 2, label: 'Académico' },
    { n: 3, label: 'Acceso' },
  ]

  return (
    <div className="min-h-screen flex bg-[#0A2540]">
      {/* Left */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center p-16 relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full border border-[#00C4A0]/15 -top-32 -left-32" />
        <div className="text-center z-10">
          <div className="w-16 h-16 bg-[#00C4A0] rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-[#0A2540] shadow-[0_8px_32px_rgba(0,196,160,0.4)]" style={{fontFamily:'Space Grotesk'}}>TV</div>
          <h1 className="text-2xl font-bold text-white" style={{fontFamily:'Space Grotesk'}}>TecnoVida Institute</h1>
          <p className="text-white/50 text-xs mt-1 tracking-widest uppercase">Registro de nuevo usuario</p>
        </div>
        <div className="mt-12 flex flex-col gap-4 w-full max-w-xs z-10">
          {[['✅','Registro en 3 pasos simples'],['🔐','Cuenta aprobada por Registraduría'],['📧','Notificación por correo'],['🎓','Acceso inmediato al portal']].map(([i,t]) => (
            <div key={t} className="flex items-center gap-3 text-white/70 text-sm">
              <span className="text-base">{i}</span>{t}
            </div>
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="w-full lg:w-[540px] bg-white flex flex-col items-center justify-center p-8 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md">
          <h2 className="text-xl font-bold text-[#0A2540] mb-1" style={{fontFamily:'Space Grotesk'}}>Crear cuenta nueva</h2>
          <p className="text-slate-500 text-sm mb-6">Completa los datos para registrarte</p>

          {/* Step indicator */}
          <div className="flex items-center mb-8">
            {steps.map((s, i) => (
              <div key={s.n} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                    ${step > s.n ? 'bg-green-500 text-white' : step === s.n ? 'bg-[#00C4A0] text-[#0A2540]' : 'bg-slate-100 text-slate-400'}`}>
                    {step > s.n ? '✓' : s.n}
                  </div>
                  <span className="text-xs mt-1 text-slate-400">{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 mb-4 transition-all ${step > s.n ? 'bg-green-400' : 'bg-slate-200'}`} />
                )}
              </div>
            ))}
          </div>

          {error && <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}

          {/* Step 1 */}
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <p className="text-sm font-semibold text-[#0A2540]" style={{fontFamily:'Space Grotesk'}}>Paso 1: Datos personales</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Primer nombre *</label>
                  <input value={f.fname} onChange={e=>set('fname',e.target.value)} placeholder="Ana"
                    className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-xl text-sm outline-none focus:border-[#00C4A0] transition-all"/>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Apellido *</label>
                  <input value={f.lname} onChange={e=>set('lname',e.target.value)} placeholder="Torres"
                    className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-xl text-sm outline-none focus:border-[#00C4A0] transition-all"/>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Cédula / ID Nacional *</label>
                <input value={f.cedula} onChange={e=>set('cedula',e.target.value)} placeholder="8-978-456"
                  className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-xl text-sm outline-none focus:border-[#00C4A0] transition-all"/>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Fecha de nacimiento *</label>
                  <input type="date" value={f.birth} onChange={e=>set('birth',e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-xl text-sm outline-none focus:border-[#00C4A0] transition-all"/>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Teléfono *</label>
                  <input value={f.phone} onChange={e=>set('phone',e.target.value)} placeholder="+507 6000-0000"
                    className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-xl text-sm outline-none focus:border-[#00C4A0] transition-all"/>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Dirección *</label>
                <input value={f.address} onChange={e=>set('address',e.target.value)} placeholder="Ciudad de Panamá"
                  className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-xl text-sm outline-none focus:border-[#00C4A0] transition-all"/>
              </div>
              <div className="flex gap-3 mt-2">
                <Link href="/login" className="flex-1 py-2.5 text-center border-2 border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">← Volver</Link>
                <button onClick={next1} className="flex-[2] py-2.5 bg-[#00C4A0] text-[#0A2540] rounded-xl font-semibold text-sm hover:bg-[#00A88A] transition-all" style={{fontFamily:'Space Grotesk'}}>Siguiente →</button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="flex flex-col gap-4">
              <p className="text-sm font-semibold text-[#0A2540]" style={{fontFamily:'Space Grotesk'}}>Paso 2: Datos académicos</p>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Tipo de registro *</label>
                <select value={f.role} onChange={e=>set('role',e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-xl text-sm outline-none focus:border-[#00C4A0] transition-all bg-white">
                  <option>Estudiante</option>
                  <option>Docente</option>
                </select>
              </div>
              {f.role === 'Estudiante' && <>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Facultad *</label>
                  <select value={f.faculty} onChange={e=>set('faculty',e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-xl text-sm outline-none focus:border-[#00C4A0] transition-all bg-white">
                    <option>Ciencias e Ingeniería</option>
                    <option>Tecnología en Redes</option>
                    <option>Ingeniería Industrial</option>
                    <option>Ciencias Básicas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Carrera *</label>
                  <select value={f.career} onChange={e=>set('career',e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-xl text-sm outline-none focus:border-[#00C4A0] transition-all bg-white">
                    <option>Ingeniería en Sistemas</option>
                    <option>Ingeniería en Software</option>
                    <option>Tecnología en Redes</option>
                    <option>Técnico en Sistemas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Turno *</label>
                  <select value={f.turno} onChange={e=>set('turno',e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-xl text-sm outline-none focus:border-[#00C4A0] transition-all bg-white">
                    <option>Matutino (7am - 1pm)</option>
                    <option>Vespertino (1pm - 7pm)</option>
                    <option>Nocturno (6pm - 10pm)</option>
                  </select>
                </div>
              </>}
              {f.role === 'Docente' && <>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Especialidad *</label>
                  <input value={f.specialty} onChange={e=>set('specialty',e.target.value)} placeholder="Ej: Ingeniería de Software"
                    className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-xl text-sm outline-none focus:border-[#00C4A0] transition-all"/>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Grado académico *</label>
                  <select value={f.degree} onChange={e=>set('degree',e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-xl text-sm outline-none focus:border-[#00C4A0] transition-all bg-white">
                    <option>Licenciatura</option>
                    <option>Maestría</option>
                    <option>Doctorado (PhD)</option>
                  </select>
                </div>
              </>}
              <div className="flex gap-3 mt-2">
                <button onClick={()=>{setError('');setStep(1)}} className="flex-1 py-2.5 border-2 border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">← Atrás</button>
                <button onClick={next2} className="flex-[2] py-2.5 bg-[#00C4A0] text-[#0A2540] rounded-xl font-semibold text-sm hover:bg-[#00A88A] transition-all" style={{fontFamily:'Space Grotesk'}}>Siguiente →</button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="flex flex-col gap-4">
              <p className="text-sm font-semibold text-[#0A2540]" style={{fontFamily:'Space Grotesk'}}>Paso 3: Credenciales de acceso</p>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Correo electrónico *</label>
                <input type="email" value={f.email} onChange={e=>set('email',e.target.value)} placeholder="tu@correo.com"
                  className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-xl text-sm outline-none focus:border-[#00C4A0] transition-all"/>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Contraseña *</label>
                <input type="password" value={f.pass} onChange={e=>set('pass',e.target.value)} placeholder="Mínimo 8 caracteres"
                  className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-xl text-sm outline-none focus:border-[#00C4A0] transition-all"/>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Confirmar contraseña *</label>
                <input type="password" value={f.pass2} onChange={e=>set('pass2',e.target.value)} placeholder="Repite la contraseña"
                  className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-xl text-sm outline-none focus:border-[#00C4A0] transition-all"/>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
                ⚠ Tu cuenta será revisada por Registraduría en 24-48 horas hábiles.
              </div>
              <label className="flex items-start gap-2 text-xs text-slate-500 cursor-pointer">
                <input type="checkbox" checked={f.terms} onChange={e=>set('terms',e.target.checked)} className="mt-0.5 flex-shrink-0"/>
                Acepto los <span className="text-[#00C4A0] font-medium">términos y condiciones</span> y la política de privacidad del instituto.
              </label>
              <div className="flex gap-3 mt-1">
                <button onClick={()=>{setError('');setStep(2)}} className="flex-1 py-2.5 border-2 border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">← Atrás</button>
                <button onClick={submit} disabled={loading} className="flex-[2] py-2.5 bg-[#00C4A0] text-[#0A2540] rounded-xl font-semibold text-sm hover:bg-[#00A88A] transition-all disabled:opacity-60" style={{fontFamily:'Space Grotesk'}}>
                  {loading ? '⏳ Registrando...' : '✓ Crear cuenta'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
