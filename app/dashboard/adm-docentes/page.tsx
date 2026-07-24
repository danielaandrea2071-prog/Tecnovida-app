'use client'
import { Card, SectionTitle, Badge, Table, Td, Avatar } from '@/components/ui'
const DATA = [
  {nombre:'Dr. Marco Ríos',id:'DOC-2019',dept:'Ing. en Sistemas',grado:'PhD',materias:4,est:112,status:'Activo'},
  {nombre:'Dra. Sofía Mora',id:'DOC-2020',dept:'Matemáticas',grado:'PhD',materias:3,est:95,status:'Activo'},
  {nombre:'Ing. Carlos Ruiz',id:'DOC-2021',dept:'Ing. en Software',grado:'Maestría',materias:4,est:108,status:'Activo'},
  {nombre:'Dr. Pedro Vega',id:'DOC-2018',dept:'Redes',grado:'PhD',materias:3,est:86,status:'Activo'},
  {nombre:'Lic. María Santos',id:'DOC-2022',dept:'Bases de Datos',grado:'Maestría',materias:4,est:120,status:'Activo'},
  {nombre:'Ing. Rosa Lima',id:'DOC-2023',dept:'Estadística',grado:'Maestría',materias:2,est:65,status:'Licencia'},
]
export default function AdmDocentesPage() {
  return (
    <Card>
      <div className="flex items-center justify-between mb-5">
        <SectionTitle>Planta docente — 87 activos</SectionTitle>
        <div className="flex gap-2">
          <button onClick={()=>alert('Crear nuevo docente')} className="px-3 py-2 bg-[#00C4A0] text-[#0A2540] rounded-lg text-sm font-semibold hover:bg-[#00A88A] transition-all">+ Nuevo docente</button>
          <button onClick={()=>alert('Exportando...')} className="px-3 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50">📊 Exportar</button>
        </div>
      </div>
      <Table headers={['Docente','ID','Departamento','Grado','Materias','Estudiantes','Estado','Acciones']}>
        {DATA.map(d=>(
          <tr key={d.id}>
            <Td><div className="flex items-center gap-2"><Avatar name={d.nombre}/><span className="font-medium text-[13px]">{d.nombre}</span></div></Td>
            <Td className="font-mono text-[11px] text-slate-400">{d.id}</Td>
            <Td className="text-[12px]">{d.dept}</Td>
            <Td><Badge variant="info">{d.grado}</Badge></Td>
            <Td className="text-center">{d.materias}</Td>
            <Td className="text-center">{d.est}</Td>
            <Td><Badge variant={d.status==='Activo'?'success':'warning'}>{d.status}</Badge></Td>
            <Td>
              <div className="flex gap-1">
                <button onClick={()=>alert('Editar: '+d.nombre)} className="px-2 py-1 border border-slate-200 rounded text-xs hover:bg-slate-50">✏</button>
                <button onClick={()=>alert('Asignar materia a: '+d.nombre)} className="px-2 py-1 border border-slate-200 rounded text-xs hover:bg-slate-50">📚</button>
              </div>
            </Td>
          </tr>
        ))}
      </Table>
    </Card>
  )
}