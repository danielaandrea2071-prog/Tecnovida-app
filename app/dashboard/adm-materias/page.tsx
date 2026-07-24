'use client'
import { useState } from 'react'
import { Card, SectionTitle, Badge, Table, Td, ProgressBar } from '@/components/ui'
const MATS = [
  {id:'MAT-101',nombre:'Cálculo Diferencial',docente:'Dra. Sofía Mora',creditos:4,cupos:32,matriculados:28,modalidad:'Presencial',prereq:'Ninguno'},
  {id:'SIS-201',nombre:'Programación II',docente:'Ing. Carlos Ruiz',creditos:5,cupos:28,matriculados:25,modalidad:'Presencial',prereq:'Programación I'},
  {id:'RED-150',nombre:'Redes de Computadoras',docente:'Dr. Pedro Vega',creditos:4,cupos:30,matriculados:22,modalidad:'Presencial',prereq:'Ninguno'},
  {id:'BD-220',nombre:'Bases de Datos I',docente:'Lic. María Santos',creditos:4,cupos:30,matriculados:30,modalidad:'Presencial',prereq:'Programación I'},
  {id:'EST-110',nombre:'Estadística Aplicada',docente:'Ing. Rosa Lima',creditos:3,cupos:35,matriculados:19,modalidad:'Híbrida',prereq:'Cálculo Diferencial'},
]
export default function AdmMateriasPage() {
  const [search,setSearch] = useState('')
  const filtered = MATS.filter(m=>m.nombre.toLowerCase().includes(search.toLowerCase())||m.id.toLowerCase().includes(search.toLowerCase()))
  return (
    <Card>
      <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
        <SectionTitle>Catálogo de materias — 142 activas</SectionTitle>
        <div className="flex gap-2">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Buscar..."
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#00C4A0] w-44"/>
          <button onClick={()=>alert('Crear nueva materia')} className="px-3 py-2 bg-[#00C4A0] text-[#0A2540] rounded-lg text-sm font-semibold hover:bg-[#00A88A] transition-all">+ Nueva</button>
        </div>
      </div>
      <Table headers={['ID','Materia','Docente','Créditos','Cupos','Ocupación','Modalidad','Prereq.','Acciones']}>
        {filtered.map(m=>{
          const pct = Math.round(m.matriculados/m.cupos*100)
          return (
            <tr key={m.id}>
              <Td><code className="text-[11px] bg-slate-50 px-2 py-0.5 rounded font-mono">{m.id}</code></Td>
              <Td className="font-semibold">{m.nombre}</Td>
              <Td className="text-[12px] text-slate-500">{m.docente}</Td>
              <Td><Badge variant="teal">{m.creditos}</Badge></Td>
              <Td>{m.cupos}</Td>
              <Td>
                <div className="flex items-center gap-2">
                  <span className="text-xs w-10">{m.matriculados}/{m.cupos}</span>
                  <ProgressBar value={pct} color={pct>=100?'danger':pct>=85?'warning':'teal'}/>
                </div>
              </Td>
              <Td><Badge variant={m.modalidad==='Presencial'?'info':'gray'}>{m.modalidad}</Badge></Td>
              <Td className="text-[11px] text-slate-400">{m.prereq}</Td>
              <Td>
                <div className="flex gap-1">
                  <button onClick={()=>alert('Editar: '+m.nombre)} className="px-2 py-1 border border-slate-200 rounded text-xs hover:bg-slate-50">✏</button>
                  <button onClick={()=>alert('Gestionar cupos: '+m.nombre)} className="px-2 py-1 border border-slate-200 rounded text-xs hover:bg-slate-50">👥</button>
                </div>
              </Td>
            </tr>
          )
        })}
      </Table>
    </Card>
  )
}