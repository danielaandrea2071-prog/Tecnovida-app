'use client'
import { Card, SectionTitle, ProgressBar, Badge } from '@/components/ui'
const NOTAS = [
  {materia:'Cálculo Diferencial',p1:82,p2:78,p3:85,final:88,nota:83},
  {materia:'Programación II',p1:90,p2:92,p3:88,final:95,nota:91},
  {materia:'Redes de Computadoras',p1:75,p2:80,p3:77,final:82,nota:78},
  {materia:'Bases de Datos I',p1:88,p2:85,p3:90,final:92,nota:89},
]
export default function CalificacionesPage() {
  return (
    <div className="flex flex-col gap-5">
      <Card className="flex items-center gap-8 flex-wrap">
        <div className="text-center">
          <div className="text-xs text-slate-500 uppercase tracking-wide">Índice académico</div>
          <div className="text-6xl font-bold text-[#00C4A0]" style={{fontFamily:'Space Grotesk'}}>3.72</div>
          <div className="text-xs text-slate-400">I Cuatrimestre 2025</div>
        </div>
        <div className="flex-1 min-w-48">
          {NOTAS.map(n=>(
            <div key={n.materia} className="flex items-center gap-3 mb-2">
              <span className="text-xs text-slate-600 w-40 truncate">{n.materia}</span>
              <ProgressBar value={n.nota} color={n.nota>=90?'teal':n.nota>=70?'blue':'warning'}/>
              <span className={`text-xs font-bold w-7 text-right ${n.nota>=90?'text-emerald-600':'text-slate-700'}`}>{n.nota}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <div className="flex items-center justify-between mb-4">
          <SectionTitle>Detalle de calificaciones</SectionTitle>
          <button className="text-xs px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">📄 Exportar PDF</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead><tr>{['Materia','Parcial 1','Parcial 2','Parcial 3','Final','Promedio','Resultado'].map(h=><th key={h} className="text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400 px-3 py-2 border-b border-slate-100">{h}</th>)}</tr></thead>
            <tbody>
              {NOTAS.map(n=>(
                <tr key={n.materia} className="hover:bg-slate-50">
                  <td className="px-3 py-2.5 font-semibold border-b border-slate-50">{n.materia}</td>
                  {[n.p1,n.p2,n.p3,n.final].map((v,i)=><td key={i} className="px-3 py-2.5 border-b border-slate-50">{v}</td>)}
                  <td className="px-3 py-2.5 border-b border-slate-50 font-bold" style={{color:n.nota>=90?'#059669':'#0A2540'}}>{n.nota}</td>
                  <td className="px-3 py-2.5 border-b border-slate-50"><Badge variant={n.nota>=70?'success':'danger'}>{n.nota>=70?'Aprobado':'Reprobado'}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}