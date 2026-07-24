'use client'
import { Card, SectionTitle } from '@/components/ui'

const DAYS = ['Lun','Mar','Mié','Jue','Vie']
const TIMES = ['7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00']
const CLASSES = [
  {day:0,start:0,span:2,name:'Cálculo Diferencial',room:'B-201',color:'bg-[#00C4A0]/15 text-[#00875A] border-[#00C4A0]/30'},
  {day:2,start:0,span:2,name:'Cálculo Diferencial',room:'B-201',color:'bg-[#00C4A0]/15 text-[#00875A] border-[#00C4A0]/30'},
  {day:1,start:2,span:2,name:'Programación II',room:'Lab C-1',color:'bg-blue-50 text-blue-700 border-blue-200'},
  {day:3,start:2,span:2,name:'Programación II',room:'Lab C-1',color:'bg-blue-50 text-blue-700 border-blue-200'},
  {day:0,start:4,span:2,name:'Redes',room:'A-305',color:'bg-violet-50 text-violet-700 border-violet-200'},
  {day:4,start:4,span:2,name:'Redes',room:'A-305',color:'bg-violet-50 text-violet-700 border-violet-200'},
  {day:1,start:7,span:2,name:'Bases de Datos',room:'Lab C-2',color:'bg-orange-50 text-orange-700 border-orange-200'},
  {day:3,start:7,span:2,name:'Bases de Datos',room:'Lab C-2',color:'bg-orange-50 text-orange-700 border-orange-200'},
  {day:2,start:9,span:2,name:'Estadística',room:'B-102',color:'bg-[#00C4A0]/15 text-[#00875A] border-[#00C4A0]/30'},
  {day:4,start:9,span:2,name:'Estadística',room:'B-102',color:'bg-[#00C4A0]/15 text-[#00875A] border-[#00C4A0]/30'},
]

export default function HorarioPage() {
  return (
    <Card>
      <div className="flex items-center justify-between mb-5">
        <SectionTitle>Horario semanal — 12-16 Mayo 2025</SectionTitle>
        <div className="flex gap-3 text-xs text-slate-500 flex-wrap">
          {[['bg-[#00C4A0]/20','Cálculo/Estadística'],['bg-blue-100','Programación'],['bg-violet-100','Redes'],['bg-orange-100','Bases de Datos']].map(([c,l])=>(
            <span key={l} className="flex items-center gap-1.5"><span className={`w-3 h-3 rounded ${c}`}/>{l}</span>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0.5 min-w-[600px]">
          <thead>
            <tr>
              <th className="w-14"/>
              {DAYS.map(d=><th key={d} className="text-center text-xs font-semibold text-slate-400 py-2">{d}</th>)}
            </tr>
          </thead>
          <tbody>
            {TIMES.map((t,ti)=>(
              <tr key={t}>
                <td className="text-right pr-2 text-[11px] text-slate-300 align-middle">{t}</td>
                {DAYS.map((_,di)=>{
                  const cls = CLASSES.find(c=>c.day===di&&c.start===ti)
                  const occupied = CLASSES.some(c=>c.day===di&&ti>c.start&&ti<c.start+c.span)
                  if(occupied) return null
                  if(cls) return (
                    <td key={di} rowSpan={cls.span} className="p-0.5" style={{verticalAlign:'top'}}>
                      <div className={`h-full rounded-lg border px-2 py-1.5 text-[10px] font-semibold cursor-default ${cls.color}`} style={{minHeight: cls.span*40-4}}>
                        <div>{cls.name}</div>
                        <div className="opacity-70 mt-0.5">{cls.room}</div>
                      </div>
                    </td>
                  )
                  return <td key={di} className="h-10 border border-slate-100 rounded-lg"/>
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}