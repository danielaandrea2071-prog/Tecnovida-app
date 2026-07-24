'use client'
import { useState } from 'react'
import { Card, SectionTitle, Badge, Table, Td, Avatar } from '@/components/ui'
const DATA = [
  {nombre:'Ana Torres Méndez',id:'2023-001',p1:92,p2:90,ast:95},
  {nombre:'Luis Hernández García',id:'2022-084',p1:85,p2:80,ast:92},
  {nombre:'María Castillo Rojas',id:'2023-019',p1:78,p2:85,ast:88},
  {nombre:'Carlos Jiménez Paz',id:'2022-156',p1:90,p2:88,ast:82},
  {nombre:'Valeria Mora Díaz',id:'2024-007',p1:88,p2:92,ast:96},
  {nombre:'Diego Salazar Cruz',id:'2023-042',p1:72,p2:68,ast:75},
]
export default function DocEstudiantesPage() {
  const [mat, setMat] = useState('Programación II')
  return (
    <Card>
      <div className="flex items-center justify-between mb-5 gap-4 flex-wrap">
        <SectionTitle>Estudiantes matriculados</SectionTitle>
        <div className="flex gap-2">
          <select value={mat} onChange={e=>setMat(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#00C4A0] bg-white">
            {['Programación II','Bases de Datos I','Algoritmos','Prog. Web'].map(m=><option key={m}>{m}</option>)}
          </select>
          <button onClick={()=>alert('Exportando lista...')} className="px-3 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50">📄 Exportar</button>
        </div>
      </div>
      <Table headers={['Estudiante','ID','Asistencia','Parcial 1','Parcial 2','Promedio','Estado']}>
        {DATA.map(e=>{
          const avg = Math.round((e.p1+e.p2)/2)
          return (
            <tr key={e.id}>
              <Td>
                <div className="flex items-center gap-2">
                  <Avatar name={e.nombre}/>
                  <span className="font-medium text-[13px]">{e.nombre}</span>
                </div>
              </Td>
              <Td className="text-slate-400 text-[11px] font-mono">{e.id}</Td>
              <Td><Badge variant={e.ast>=90?'success':e.ast>=80?'warning':'danger'}>{e.ast}%</Badge></Td>
              <Td>{e.p1}</Td>
              <Td>{e.p2}</Td>
              <Td><strong className={avg>=80?'text-emerald-600':avg>=70?'text-slate-700':'text-red-500'}>{avg}</strong></Td>
              <Td><Badge variant={avg>=70?'success':'danger'}>{avg>=70?'Aprobado':'En riesgo'}</Badge></Td>
            </tr>
          )
        })}
      </Table>
    </Card>
  )
}