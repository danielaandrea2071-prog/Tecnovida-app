'use client'
import { useState, useEffect, useCallback } from 'react'
import { supabase, PendingUser } from '@/lib/supabase'
import { useAuth } from '@/lib/auth-context'
import { Card, Badge, Btn, Table, Td, EmptyState, SectionTitle } from '@/components/ui'

export default function PendientesPage() {
  const { user } = useAuth()
  const [pending, setPending] = useState<PendingUser[]>([])
  const [loading, setLoading] = useState(true)
  const [actionId, setActionId] = useState<string|null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('users_pending')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setPending(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  async function approve(p: PendingUser) {
    if (!confirm(`¿Aprobar la cuenta de "${p.nombre}"?`)) return
    setActionId(p.id)
    try {
      const { count } = await supabase.from('users').select('*', { count:'exact', head:true })
      const year = new Date().getFullYear()
      const studentId = `${year}-${String((count||0)+1).padStart(3,'0')}`

      const { error } = await supabase.from('users').insert({
        nombre: p.nombre, email: p.email, password_hash: p.password_hash,
        role: p.role || 'Estudiante', cedula: p.cedula, phone: p.phone,
        address: p.address, birth_date: p.birth_date, faculty: p.faculty,
        career: p.career, turno: p.turno, specialty: p.specialty, degree: p.degree,
        student_id: studentId, estado: 'Activo',
        approved_at: new Date().toISOString(), approved_by: user?.email
      })
      if (error) throw error

      await supabase.from('users_pending').delete().eq('id', p.id)
      await supabase.from('audit_logs').insert({ user_email: user?.email, action: `Aprobó cuenta de ${p.nombre} — ID: ${studentId}` })
      await supabase.from('notifications').insert({ user_email: p.email, title: '¡Tu cuenta fue aprobada!', body: `Bienvenido/a ${p.nombre}. Tu ID es ${studentId}. Ya puedes ingresar.`, type: 'aprobacion' })

      alert(`✅ Cuenta aprobada.\nID asignado: ${studentId}\nCorreo: ${p.email}`)
      load()
    } catch (e: any) {
      alert('Error: ' + e.message)
    } finally {
      setActionId(null)
    }
  }

  async function reject(p: PendingUser) {
    if (!confirm(`¿Rechazar la solicitud de "${p.nombre}"?`)) return
    setActionId(p.id)
    await supabase.from('users_pending').delete().eq('id', p.id)
    await supabase.from('audit_logs').insert({ user_email: user?.email, action: `Rechazó solicitud de ${p.nombre}` })
    load()
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4"><div className="text-xs text-slate-500">Pendientes</div><div className="text-2xl font-bold text-[#0A2540]" style={{fontFamily:'Space Grotesk'}}>{pending.length}</div></Card>
        <Card className="p-4"><div className="text-xs text-slate-500">Estudiantes</div><div className="text-2xl font-bold text-[#00C4A0]" style={{fontFamily:'Space Grotesk'}}>{pending.filter(p=>p.role==='Estudiante').length}</div></Card>
        <Card className="p-4"><div className="text-xs text-slate-500">Docentes</div><div className="text-2xl font-bold text-[#2563EB]" style={{fontFamily:'Space Grotesk'}}>{pending.filter(p=>p.role==='Docente').length}</div></Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-5">
          <SectionTitle>Solicitudes de registro pendientes</SectionTitle>
          <Btn variant="outline" onClick={load}>↺ Actualizar</Btn>
        </div>

        {loading ? (
          <div className="text-center py-10 text-slate-400">⏳ Cargando solicitudes...</div>
        ) : pending.length === 0 ? (
          <EmptyState icon="✅" text="No hay solicitudes pendientes" />
        ) : (
          <Table headers={['Nombre','Correo','Rol','Carrera/Especialidad','Cédula','Fecha','Acciones']}>
            {pending.map(p => (
              <tr key={p.id}>
                <Td><div className="font-semibold text-slate-800">{p.nombre}</div></Td>
                <Td className="text-slate-400 text-[12px]">{p.email}</Td>
                <Td><Badge variant={p.role==='Estudiante'?'success':'info'}>{p.role||'Estudiante'}</Badge></Td>
                <Td className="text-[12px]">{p.career||p.specialty||'—'}</Td>
                <Td className="text-[12px]">{p.cedula||'—'}</Td>
                <Td className="text-[11px] text-slate-400">{new Date(p.created_at).toLocaleDateString('es')}</Td>
                <Td>
                  <div className="flex gap-2">
                    <Btn variant="outline" size="sm" className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                      disabled={actionId===p.id} onClick={()=>approve(p)}>
                      {actionId===p.id?'⏳':'✓'} Aprobar
                    </Btn>
                    <Btn variant="danger" size="sm" disabled={actionId===p.id} onClick={()=>reject(p)}>
                      ✕ Rechazar
                    </Btn>
                  </div>
                </Td>
              </tr>
            ))}
          </Table>
        )}
      </Card>
    </div>
  )
}
