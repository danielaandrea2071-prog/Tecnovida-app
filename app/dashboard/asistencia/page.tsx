'use client'
import { Card, SectionTitle, ProgressBar } from '@/components/ui'
const MATS = ['Cálculo Diferencial','Programación II','Redes de Computadoras','Bases de Datos I','Estadística']
const PCTS = [91,96,84,93,88]
export default function AsistenciaPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <Card>
        <SectionTitle>Resumen de asistencia por materia</SectionTitle>
        <div className="mt-4 flex flex-col gap-3">
          {MATS.map((m,i)=>(
            <div key={m}>
              <div className="flex justify-between text-xs mb-1"><span className="text-slate-600">{m}</span><span className={`font-semibold ${PCTS[i]<85?'text-red-500':PCTS[i]<90?'text-amber-500':'text-emerald-600'}`}>{PCTS[i]}%</span></div>
              <ProgressBar value={PCTS[i]} color={PCTS[i]<85?'danger':PCTS[i]<90?'warning':'teal'}/>
            </div>
          ))}
        </div>
        {PCTS.some(p=>p<85) && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
            ⚠ Redes de Computadoras está por debajo del 85%. Riesgo de pérdida por asistencia (mínimo: 80%).
          </div>
        )}
      </Card>
      <Card>
        <SectionTitle>Registro detallado — Cálculo Diferencial</SectionTitle>
        <div className="text-xs text-slate-400 mt-1 mb-4">Haz clic en un círculo para ver detalles</div>
        <div className="flex flex-wrap gap-1.5">
          {Array.from({length:20},(_,i)=>{
            const t = [4,8,17].includes(i)?'A':[3,11].includes(i)?'T':'P'
            const colors = {P:'bg-emerald-50 text-emerald-600 border-emerald-200',A:'bg-red-50 text-red-500 border-red-200',T:'bg-amber-50 text-amber-600 border-amber-200'}
            return (
              <button key={i} title={`Sesión ${i+1}: ${t==='P'?'Presente':t==='A'?'Ausente':'Tardanza'}`}
                className={`w-8 h-8 rounded-lg border flex items-center justify-center text-[11px] font-bold ${colors[t as keyof typeof colors]}`}>
                {t}
              </button>
            )
          })}
        </div>
        <div className="grid grid-cols-3 gap-2 mt-5">
          {[['17','Presencias','emerald'],['2','Tardanzas','amber'],['1','Ausencias','red']].map(([v,l,c])=>(
            <div key={l} className={`bg-${c}-50 border border-${c}-200 rounded-xl p-3 text-center`}>
              <div className={`text-xl font-bold text-${c}-600`} style={{fontFamily:'Space Grotesk'}}>{v}</div>
              <div className={`text-[11px] text-${c}-500`}>{l}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}