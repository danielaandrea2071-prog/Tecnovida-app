'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, SectionTitle, Badge, Table, Td } from '@/components/ui'
export default function SeguridadPage() {
  const [logs,setLogs] = useState<any[]>([])
  useEffect(()=>{
    supabase.from('audit_logs').select('*').order('created_at',{ascending:false}).limit(20)
      .then(({data})=>setLogs(data||[]))
  },[])
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[['🟢','API Gateway','Operativo'],['🟢','Base de datos','Operativo'],['🟡','Correo SMTP','Degradado'],['🟢','Auth / JWT','Operativo']].map(([c,n,s])=>(
          <div key={n as string} className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-1"><span>{c}</span><span className="font-semibold text-[13px]">{n}</span></div>
            <Badge variant={s==='Operativo'?'success':s==='Degradado'?'warning':'danger'}>{s}</Badge>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <SectionTitle>Roles y permisos</SectionTitle>
          <div className="mt-4 divide-y divide-slate-50">
            {[['Admin','Acceso total al sistema','danger'],['Docente','Materias, módulos, notas, asistencia','info'],['Estudiante','Portal personal, matrícula, horario','success'],['Pendiente','Sin acceso al sistema','gray']].map(([r,d,b])=>(
              <div key={r} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2">
                  <Badge variant={b as any}>{r}</Badge>
                  <span className="text-[12px] text-slate-400">{d}</span>
                </div>
                <button onClick={()=>alert('Editar permisos: '+r)} className="px-2.5 py-1 border border-slate-200 rounded-lg text-xs hover:bg-slate-50">✏</button>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <SectionTitle>Log de auditoría — Tiempo real</SectionTitle>
            <button onClick={()=>supabase.from('audit_logs').select('*').order('created_at',{ascending:false}).limit(20).then(({data})=>setLogs(data||[]))} className="text-xs px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50">↺ Actualizar</button>
          </div>
          {logs.length===0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">Sin logs registrados aún</div>
          ) : (
            <Table headers={['Usuario','Acción','Fecha']}>
              {logs.map((l,i)=>(
                <tr key={i}>
                  <Td><code className="text-[11px] bg-slate-50 px-2 py-0.5 rounded">{l.user_email||'sistema'}</code></Td>
                  <Td className="text-[12px]">{l.action}</Td>
                  <Td className="text-[11px] text-slate-400 whitespace-nowrap">{new Date(l.created_at).toLocaleString('es')}</Td>
                </tr>
              ))}
            </Table>
          )}
        </Card>
      </div>
    </div>
  )
}