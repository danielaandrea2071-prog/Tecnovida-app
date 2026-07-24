'use client'
import { useState } from 'react'
import { Card, Badge, Btn, SectionTitle, ProgressBar } from '@/components/ui'

const MATERIAS = [
  {id:'MAT-101',nombre:'Cálculo Diferencial',docente:'Dra. Sofía Mora',hora:'7:00-9:00',dias:'Lun/Mié',aula:'B-201',creditos:4,modalidad:'Presencial'},
  {id:'SIS-201',nombre:'Programación II',docente:'Ing. Carlos Ruiz',hora:'9:00-11:00',dias:'Mar/Jue',aula:'Lab C-1',creditos:5,modalidad:'Presencial'},
  {id:'RED-150',nombre:'Redes de Computadoras',docente:'Dr. Pedro Vega',hora:'11:00-13:00',dias:'Lun/Vie',aula:'A-305',creditos:4,modalidad:'Presencial'},
  {id:'BD-220',nombre:'Bases de Datos I',docente:'Lic. María Santos',hora:'14:00-16:00',dias:'Mar/Jue',aula:'Lab C-2',creditos:4,modalidad:'Presencial'},
  {id:'EST-110',nombre:'Estadística Aplicada',docente:'Ing. Rosa Lima',hora:'16:00-18:00',dias:'Mié/Vie',aula:'B-102',creditos:3,modalidad:'Híbrida'},
]
const MODULOS = ['Introducción','Fundamentos','Estructuras','Patrones','Aplicaciones']

export default function MateriasPage() {
  const [sel, setSel] = useState(MATERIAS[0].id)
  const mat = MATERIAS.find(m=>m.id===sel)!
  return (
    <div className="flex gap-5">
      <div className="w-64 flex-shrink-0 flex flex-col gap-2">
        {MATERIAS.map(m=>(
          <button key={m.id} onClick={()=>setSel(m.id)}
            className={`text-left p-3.5 rounded-xl border-2 transition-all ${sel===m.id?'border-[#00C4A0] bg-[#00C4A0]/5':'border-slate-200 bg-white hover:border-slate-300'}`}>
            <div className="text-[11px] text-slate-400">{m.id}</div>
            <div className="text-[13px] font-semibold text-slate-800 mt-0.5">{m.nombre}</div>
            <div className="text-[11px] text-slate-400 mt-1">{m.creditos} cr. · {m.modalidad}</div>
          </button>
        ))}
      </div>
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#00C4A0]/10 flex items-center justify-center text-2xl flex-shrink-0">💻</div>
          <div className="flex-1 min-w-0">
            <div className="text-lg font-bold text-[#0A2540]" style={{fontFamily:'Space Grotesk'}}>{mat.nombre}</div>
            <div className="text-sm text-slate-400">{mat.docente} · {mat.aula} · {mat.dias} {mat.hora}</div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Badge variant="info">{mat.modalidad}</Badge>
            <Badge variant="teal">{mat.creditos} cr.</Badge>
          </div>
        </Card>
        <Card>
          <SectionTitle>Módulos del curso</SectionTitle>
          <div className="mt-4 flex flex-col gap-2">
            {MODULOS.map((m,i)=>(
              <div key={m} className="flex items-center gap-3 p-3.5 border border-slate-200 rounded-xl hover:border-[#00C4A0] hover:bg-[#00C4A0]/5 transition-all cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-[#00C4A0]/10 flex items-center justify-center text-[13px] font-bold text-[#00C4A0] flex-shrink-0">{i+1}</div>
                <div className="flex-1">
                  <div className="text-[13px] font-semibold">Módulo {i+1}: {m}</div>
                  <div className="text-[11px] text-slate-400">{[4,3,5,2,3][i]} materiales · {[2,1,3,0,2][i]} tareas</div>
                </div>
                <Badge variant={i<2?'success':i===2?'info':'gray'}>{i<2?'Completado':i===2?'En curso':'Próximo'}</Badge>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionTitle>Asistencia — {mat.nombre}</SectionTitle>
          <div className="flex flex-wrap gap-1 mt-4">
            {Array.from({length:24},(_,i)=>{
              const t = [0,4,8,17].includes(i)?'A':[3,11].includes(i)?'T':'P'
              const colors = {P:'bg-emerald-50 text-emerald-600 border-emerald-200',A:'bg-red-50 text-red-500 border-red-200',T:'bg-amber-50 text-amber-600 border-amber-200'}
              return <div key={i} className={`w-7 h-7 rounded-md border flex items-center justify-center text-[10px] font-bold ${colors[t as keyof typeof colors]}`}>{t}</div>
            })}
          </div>
          <div className="flex gap-4 mt-3 text-xs text-slate-400">
            <span>🟢 Presente: 20</span><span>🔴 Ausente: 3</span><span>🟡 Tardanza: 1</span>
          </div>
        </Card>
      </div>
    </div>
  )
}