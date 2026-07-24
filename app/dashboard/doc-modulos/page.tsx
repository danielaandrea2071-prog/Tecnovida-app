'use client'
import { useState } from 'react'
import { Card, SectionTitle, Badge } from '@/components/ui'
const MODULOS = [
  {n:1,titulo:'Introducción a OOP',mat:'4 materiales · 2 tareas',status:'Publicado'},
  {n:2,titulo:'Estructuras de datos',mat:'3 materiales · 1 tarea',status:'Publicado'},
  {n:3,titulo:'Patrones de diseño',mat:'5 materiales · 3 tareas',status:'En curso'},
  {n:4,titulo:'Colecciones y genéricos',mat:'2 materiales · 0 tareas',status:'Borrador'},
  {n:5,titulo:'Manejo de excepciones',mat:'3 materiales · 2 tareas',status:'Borrador'},
]
export default function DocModulosPage() {
  const [mods, setMods] = useState(MODULOS)
  return (
    <Card>
      <div className="flex items-center justify-between mb-5">
        <SectionTitle>Módulos — Programación II</SectionTitle>
        <button onClick={()=>alert('Crear nuevo módulo')} className="px-4 py-2 bg-[#00C4A0] text-[#0A2540] rounded-lg text-sm font-semibold hover:bg-[#00A88A] transition-all">+ Nuevo módulo</button>
      </div>
      <div className="flex flex-col gap-2">
        {mods.map(m=>(
          <div key={m.n} className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl hover:border-slate-300 transition-all">
            <div className="w-9 h-9 rounded-xl bg-[#00C4A0]/10 flex items-center justify-center text-[13px] font-bold text-[#00C4A0] flex-shrink-0">{m.n}</div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-slate-800">{m.titulo}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{m.mat}</div>
            </div>
            <Badge variant={m.status==='Publicado'?'success':m.status==='En curso'?'info':'gray'}>{m.status}</Badge>
            <div className="flex gap-1.5">
              <button onClick={()=>alert('Editar módulo '+m.n)} className="px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs hover:bg-slate-50 transition-all">✏ Editar</button>
              <button onClick={()=>alert('Subir material al módulo '+m.n)} className="px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs hover:bg-slate-50 transition-all">📎 Material</button>
              <button onClick={()=>{
                setMods(p=>p.map(x=>x.n===m.n?{...x,status:x.status==='Publicado'?'Borrador':'Publicado'}:x))
              }} className="px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs hover:bg-slate-50 transition-all">
                {m.status==='Publicado'?'⏸ Ocultar':'▶ Publicar'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}