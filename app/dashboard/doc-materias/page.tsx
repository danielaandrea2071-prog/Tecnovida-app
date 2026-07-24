'use client'
import { Card, SectionTitle, Badge, Table, Td } from '@/components/ui'
export default function DocMateriasPage() {
  return (
    <Card>
      <SectionTitle>Materias asignadas — I Cuatrimestre 2025</SectionTitle>
      <div className="mt-4">
        <Table headers={['Materia','Sección','Horario','Aula','Estudiantes','Asistencia','Promedio','Acciones']}>
          {[
            ['Programación II','SIS-201-A','Mar/Jue 9:00-11:00','Lab C-1',25,92,91],
            ['Bases de Datos I','BD-220-B','Mar/Jue 14:00-16:00','Lab C-2',30,87,78],
            ['Algoritmos','ALG-310-A','Lun/Mié 7:00-9:00','B-201',22,95,88],
            ['Prog. Web','WEB-250-B','Vie 9:00-13:00','Lab C-3',28,89,82],
          ].map(([m,s,h,a,e,ast,pr])=>(
            <tr key={m as string}>
              <Td><div className="font-semibold">{m}</div><div className="text-[11px] text-slate-400">{s}</div></Td>
              <Td className="text-[12px]">{s}</Td>
              <Td className="text-[12px]">{h}</Td>
              <Td className="text-[12px]">{a}</Td>
              <Td>{e}</Td>
              <Td><Badge variant={(ast as number)>=90?'success':(ast as number)>=80?'warning':'danger'}>{ast}%</Badge></Td>
              <Td><strong className={(pr as number)>=85?'text-emerald-600':'text-slate-700'}>{pr}</strong></Td>
              <Td>
                <div className="flex gap-1">
                  <button onClick={()=>alert('Ver estudiantes de '+m)} className="px-2 py-1 border border-slate-200 rounded text-xs hover:bg-slate-50">👥</button>
                  <button onClick={()=>alert('Gestionar módulos de '+m)} className="px-2 py-1 border border-slate-200 rounded text-xs hover:bg-slate-50">📦</button>
                </div>
              </Td>
            </tr>
          ))}
        </Table>
      </div>
    </Card>
  )
}