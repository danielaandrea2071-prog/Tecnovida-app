'use client'
import { Card, SectionTitle, Badge } from '@/components/ui'
const NOTIFS = [
  {icon:'📅',t:'Examen parcial de Cálculo — 20 Mayo 7am',b:'Sala B-201. Lleva carnet y bolígrafo. Cubre temas del módulo 1-3.',time:'Hace 2 horas',unread:true,tag:'Académico'},
  {icon:'📦',t:'Nuevo módulo publicado: Programación II — Módulo 4',b:'Ing. Carlos Ruiz publicó Módulo 4: "Colecciones y Genéricos". Tarea con fecha límite 25 Mayo.',time:'Hace 4 horas',unread:true,tag:'Materia'},
  {icon:'🏆',t:'Calificación registrada: Redes — Parcial 2: 80/100',b:'Tu nota del Parcial 2 ha sido publicada. Consulta el detalle en Calificaciones.',time:'Ayer 3:30pm',unread:true,tag:'Calificación'},
  {icon:'📣',t:'Cambio de aula: Estadística Aplicada → C-104',b:'A partir del próximo jueves el horario permanece igual.',time:'Hace 2 días',unread:false,tag:'Administrativo'},
  {icon:'💰',t:'Saldo pendiente: $235 — vence 31 Mayo',b:'Realiza tu pago a tiempo para evitar penalidades y bloqueo de servicios.',time:'Hace 3 días',unread:false,tag:'Finanzas'},
]
export default function NotificacionesPage() {
  return (
    <Card>
      <div className="flex items-center justify-between mb-5">
        <SectionTitle>Centro de notificaciones</SectionTitle>
        <button className="text-xs px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500">Marcar todas leídas</button>
      </div>
      <div className="divide-y divide-slate-50">
        {NOTIFS.map((n,i)=>(
          <div key={i} className={`flex gap-3 py-4 ${n.unread?'':'opacity-60'}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${n.unread?'bg-[#00C4A0]/10':'bg-slate-50'}`}>{n.icon}</div>
            <div className="flex-1 min-w-0">
              <div className={`text-[13px] ${n.unread?'font-semibold text-slate-800':'text-slate-600'}`}>{n.t}</div>
              <div className="text-[12px] text-slate-400 mt-0.5 leading-relaxed">{n.b}</div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="gray">{n.tag}</Badge>
                <span className="text-[11px] text-slate-400">{n.time}</span>
              </div>
            </div>
            {n.unread && <div className="w-2 h-2 rounded-full bg-[#00C4A0] flex-shrink-0 mt-2"/>}
          </div>
        ))}
      </div>
    </Card>
  )
}