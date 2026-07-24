'use client'
import { Card, SectionTitle, Badge, Table, Td, StatCard } from '@/components/ui'
export default function AdmMatriculasPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="📋" label="Total matrículas" value="4,078" change="I Cuatrimestre 2025" iconBg="teal"/>
        <StatCard icon="✅" label="Confirmadas" value="3,847" change="94.4%" changeUp iconBg="blue"/>
        <StatCard icon="⏳" label="Pendientes" value="142" change="Requieren revisión" iconBg="orange"/>
        <StatCard icon="❌" label="Canceladas" value="89" change="2.2%" iconBg="purple"/>
      </div>
      <Card>
        <div className="flex items-center justify-between mb-5">
          <SectionTitle>Matrículas recientes</SectionTitle>
          <button onClick={()=>alert('Exportando...')} className="px-3 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50">📄 Exportar</button>
        </div>
        <Table headers={['Estudiante','Materia','Sección','Fecha','Créditos','Estado','Acciones']}>
          {[
            ['Ana Torres','Programación II','SIS-201-A','12 May',5,'Confirmada','success'],
            ['Ana Torres','Cálculo Diferencial','MAT-101-C','12 May',4,'Confirmada','success'],
            ['Luis Hernández','Bases de Datos II','BD-320-A','11 May',4,'Confirmada','success'],
            ['María Castillo','Redes Avanzadas','RED-250-B','11 May',4,'Pendiente','warning'],
            ['Carlos Jiménez','Estadística','EST-110-A','10 May',3,'Condicional','warning'],
            ['Valeria Mora','Cálculo Diferencial','MAT-101-A','10 May',4,'Confirmada','success'],
            ['Diego Salazar','Prog. Web','WEB-250-A','09 May',4,'Cancelada','danger'],
          ].map(([e,m,s,f,c,st,b],i)=>(
            <tr key={i}>
              <Td className="font-medium">{e}</Td>
              <Td>{m}</Td>
              <Td className="text-[11px] text-slate-400 font-mono">{s}</Td>
              <Td className="text-[12px] text-slate-400">{f}</Td>
              <Td><Badge variant="teal">{c} cr.</Badge></Td>
              <Td><Badge variant={b as any}>{st}</Badge></Td>
              <Td>
                <div className="flex gap-1">
                  <button onClick={()=>alert('Editar matrícula')} className="px-2 py-1 border border-slate-200 rounded text-xs hover:bg-slate-50">✏</button>
                  <button onClick={()=>{if(confirm('¿Cancelar esta matrícula?'))alert('Cancelada')}} className="px-2 py-1 border border-red-200 rounded text-xs text-red-500 hover:bg-red-50">✕</button>
                </div>
              </Td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  )
}