'use client'
import { useState } from 'react'
import { Card, Badge, Btn, SectionTitle } from '@/components/ui'

const MATERIAS = [
  {id:'MAT-101',nombre:'Cálculo Diferencial',docente:'Dra. Sofía Mora',hora:'7:00-9:00',dias:'Lun/Mié',aula:'B-201',creditos:4,cupos:32,matriculados:28,modalidad:'Presencial',prereq:'Ninguno'},
  {id:'SIS-201',nombre:'Programación II',docente:'Ing. Carlos Ruiz',hora:'9:00-11:00',dias:'Mar/Jue',aula:'Lab C-1',creditos:5,cupos:28,matriculados:25,modalidad:'Presencial',prereq:'Programación I'},
  {id:'RED-150',nombre:'Redes de Computadoras',docente:'Dr. Pedro Vega',hora:'11:00-13:00',dias:'Lun/Vie',aula:'A-305',creditos:4,cupos:30,matriculados:22,modalidad:'Presencial',prereq:'Ninguno'},
  {id:'BD-220',nombre:'Bases de Datos I',docente:'Lic. María Santos',hora:'14:00-16:00',dias:'Mar/Jue',aula:'Lab C-2',creditos:4,cupos:30,matriculados:30,modalidad:'Presencial',prereq:'Programación I'},
  {id:'EST-110',nombre:'Estadística Aplicada',docente:'Ing. Rosa Lima',hora:'16:00-18:00',dias:'Mié/Vie',aula:'B-102',creditos:3,cupos:35,matriculados:19,modalidad:'Híbrida',prereq:'Cálculo Diferencial'},
]

export default function MatriculaPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set(['MAT-101','SIS-201']))
  const [confirmed, setConfirmed] = useState(false)
  const [search, setSearch] = useState('')

  const toggle = (id: string) => {
    const n = new Set(selected)
    if (n.has(id)) n.delete(id); else n.add(id)
    setSelected(n)
  }

  const credits = MATERIAS.filter(m => selected.has(m.id)).reduce((a, m) => a + m.creditos, 0)
  const cost = credits * 47
  const filtered = MATERIAS.filter(m => m.nombre.toLowerCase().includes(search.toLowerCase()) || m.id.toLowerCase().includes(search.toLowerCase()))

  if (confirmed) return (
    <div className="max-w-lg mx-auto mt-10">
      <Card className="text-center p-10">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-xl font-bold text-[#0A2540] mb-2" style={{fontFamily:'Space Grotesk'}}>Matrícula confirmada</h2>
        <p className="text-slate-500 text-sm mb-4">Se ha enviado un comprobante a tu correo institucional. El período de ajuste cierra el 20 de Mayo.</p>
        <div className="bg-slate-50 rounded-xl p-4 text-sm text-left mb-4">
          <div className="flex justify-between mb-1"><span className="text-slate-500">Materias seleccionadas</span><strong>{selected.size}</strong></div>
          <div className="flex justify-between mb-1"><span className="text-slate-500">Créditos</span><strong>{credits}</strong></div>
          <div className="flex justify-between"><span className="text-slate-500">Costo total</span><strong className="text-[#FF6B35]">${cost.toLocaleString()}</strong></div>
        </div>
        <Btn variant="primary" onClick={() => setConfirmed(false)} className="w-full justify-center py-2.5">← Editar matrícula</Btn>
      </Card>
    </div>
  )

  return (
    <div className="flex flex-col gap-5">
      {/* Summary bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4"><div className="text-xs text-slate-500">Seleccionadas</div><div className="text-2xl font-bold text-[#0A2540]" style={{fontFamily:'Space Grotesk'}}>{selected.size}/5</div></Card>
        <Card className="p-4"><div className="text-xs text-slate-500">Créditos</div><div className="text-2xl font-bold text-[#00C4A0]" style={{fontFamily:'Space Grotesk'}}>{credits}</div></Card>
        <Card className="p-4"><div className="text-xs text-slate-500">Costo estimado</div><div className="text-2xl font-bold text-[#FF6B35]" style={{fontFamily:'Space Grotesk'}}>${cost.toLocaleString()}</div></Card>
        <div className="flex items-center">
          <Btn variant="primary" className="w-full justify-center py-3 text-base" onClick={() => {if(selected.size===0){alert('Selecciona al menos una materia');return}setConfirmed(true)}}>
            ✓ Confirmar matrícula
          </Btn>
        </div>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
          <SectionTitle>Oferta académica — II Cuatrimestre 2025</SectionTitle>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Buscar materia o ID..."
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#00C4A0] w-56"/>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>{['','ID','Materia','Docente','Horario','Aula','Créditos','Cupos','Modalidad','Prereq.'].map(h=>(
                <th key={h} className="text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400 px-3 py-2 border-b border-slate-100 whitespace-nowrap">{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {filtered.map(m => {
                const isSel = selected.has(m.id)
                const full = m.matriculados >= m.cupos
                return (
                  <tr key={m.id} className={`transition-colors ${isSel?'bg-[#00C4A0]/5':''} hover:bg-slate-50`}>
                    <td className="px-3 py-2.5 border-b border-slate-50">
                      <input type="checkbox" checked={isSel} disabled={full && !isSel}
                        onChange={() => toggle(m.id)}
                        className="w-4 h-4 accent-[#00C4A0] cursor-pointer"/>
                    </td>
                    <td className="px-3 py-2.5 border-b border-slate-50"><code className="text-[11px] bg-slate-50 px-2 py-0.5 rounded font-mono">{m.id}</code></td>
                    <td className="px-3 py-2.5 border-b border-slate-50 font-semibold text-slate-800">{m.nombre}</td>
                    <td className="px-3 py-2.5 border-b border-slate-50 text-[12px] text-slate-500">{m.docente}</td>
                    <td className="px-3 py-2.5 border-b border-slate-50 text-[12px]">
                      <div className="font-medium">{m.dias}</div>
                      <div className="text-slate-400">{m.hora}</div>
                    </td>
                    <td className="px-3 py-2.5 border-b border-slate-50 text-[12px]">{m.aula}</td>
                    <td className="px-3 py-2.5 border-b border-slate-50"><Badge variant="teal">{m.creditos}</Badge></td>
                    <td className="px-3 py-2.5 border-b border-slate-50 text-[12px]">
                      {m.matriculados}/{m.cupos}
                      {full && <Badge variant="danger" className="ml-1">Lleno</Badge>}
                    </td>
                    <td className="px-3 py-2.5 border-b border-slate-50"><Badge variant={m.modalidad==='Presencial'?'info':'gray'}>{m.modalidad}</Badge></td>
                    <td className="px-3 py-2.5 border-b border-slate-50 text-[11px] text-slate-400">{m.prereq}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
