'use client'
import { Card, SectionTitle, ProgressBar } from '@/components/ui'
export default function ReportesPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {icon:'📊',title:'Reporte académico general',desc:'Índices, aprobación, materias. Ejecutivo PDF.',tipo:'PDF',color:'teal'},
          {icon:'👥',title:'Listado estudiantil',desc:'Datos de todos los estudiantes por carrera.',tipo:'Excel',color:'blue'},
          {icon:'📖',title:'Carga docente',desc:'Materias, horas y grupos por docente.',tipo:'Excel',color:'purple'},
          {icon:'💰',title:'Estado financiero',desc:'Pagos, deuda, becas del cuatrimestre.',tipo:'PDF',color:'orange'},
          {icon:'✅',title:'Reporte de asistencia',desc:'Asistencia global por materia y docente.',tipo:'PDF',color:'teal'},
          {icon:'🏆',title:'Rendimiento académico',desc:'Top 10, en riesgo, índices históricos.',tipo:'PDF',color:'blue'},
        ].map(r=>(
          <div key={r.title} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer" onClick={()=>alert('Generando: '+r.title)}>
            <div className="text-3xl mb-3">{r.icon}</div>
            <div className="font-bold text-[#0A2540] mb-1" style={{fontFamily:'Space Grotesk'}}>{r.title}</div>
            <div className="text-[12px] text-slate-400 mb-4">{r.desc}</div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] px-2 py-0.5 bg-slate-100 rounded-full text-slate-500">{r.tipo}</span>
              <button onClick={e=>{e.stopPropagation();alert('Descargando '+r.tipo+': '+r.title)}} className="px-3 py-1.5 bg-[#00C4A0] text-[#0A2540] rounded-lg text-xs font-semibold hover:bg-[#00A88A] transition-all">⬇ Descargar</button>
            </div>
          </div>
        ))}
      </div>
      <Card>
        <SectionTitle>Estadísticas rápidas — I Cuatrimestre 2025</SectionTitle>
        <div className="mt-4 flex flex-col gap-3">
          {[['Tasa de aprobación global',87],['Materias con cupos llenos',62],['Estudiantes en buen estado académico',84],['Retención estudiantil',93],['Satisfacción docente (encuesta)',78]].map(([n,v])=>(
            <div key={n as string} className="flex items-center gap-3">
              <span className="text-[13px] text-slate-600 w-64 flex-shrink-0">{n}</span>
              <ProgressBar value={v as number} color={(v as number)>=85?'teal':(v as number)>=70?'blue':'warning'}/>
              <span className="text-xs font-semibold text-slate-600 w-8 text-right">{v}%</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}