'use client'
import { Card, SectionTitle, Badge } from '@/components/ui'
export default function ConfigPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-4xl">
      <Card>
        <SectionTitle>Configuración académica</SectionTitle>
        <div className="mt-4 divide-y divide-slate-50">
          {[
            ['Cuatrimestre activo','I Cuatrimestre 2025'],
            ['Apertura de matrícula','1 Mayo 2025'],
            ['Cierre de matrícula','20 Mayo 2025'],
            ['Inicio de clases','26 Mayo 2025'],
            ['Máx. créditos por cuatrimestre','20'],
            ['Mínimo índice para beca','3.50'],
            ['Mínimo asistencia requerida','80%'],
          ].map(([l,v])=>(
            <div key={l} className="flex items-center justify-between py-2.5">
              <span className="text-[13px] text-slate-500">{l}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium text-[13px]">{v}</span>
                <button onClick={()=>alert('Editar: '+l)} className="p-1 hover:bg-slate-100 rounded transition-all text-slate-400 text-xs">✏</button>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <SectionTitle>Integraciones activas</SectionTitle>
        <div className="mt-4 divide-y divide-slate-50">
          {[
            ['📧','Supabase (Base de datos)','Activo'],
            ['🔐','Auth JWT (Supabase)','Activo'],
            ['☁','Backup automático','Activo'],
            ['📱','SMS notificaciones','Inactivo'],
            ['📊','BI Dashboard','Inactivo'],
          ].map(([i,n,s])=>(
            <div key={n as string} className="flex items-center gap-3 py-2.5">
              <span className="text-lg">{i}</span>
              <span className="flex-1 text-[13px]">{n}</span>
              <Badge variant={s==='Activo'?'success':'gray'}>{s}</Badge>
              <button onClick={()=>alert(s==='Activo'?'Desactivar: '+n:'Activar: '+n)} className="px-2.5 py-1 border border-slate-200 rounded-lg text-xs hover:bg-slate-50">
                {s==='Activo'?'Desactivar':'Activar'}
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}