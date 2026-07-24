'use client'
import { useState } from 'react'
import { Card, SectionTitle, Badge } from '@/components/ui'
const LIBROS = [
  {titulo:'Fundamentos de Bases de Datos (7ma Ed.)',autor:'Silberschatz, Korth, Sudarshan',categoria:'Sistemas',tipo:'PDF'},
  {titulo:'Computer Networks (6ta Ed.)',autor:'Andrew Tanenbaum',categoria:'Redes',tipo:'PDF'},
  {titulo:'Cálculo: Una Variable (12va Ed.)',autor:'Thomas & Weir',categoria:'Matemáticas',tipo:'PDF'},
  {titulo:'Clean Code: A Handbook',autor:'Robert C. Martin',categoria:'Programación',tipo:'eBook'},
  {titulo:'Design Patterns: Elements of Reusable OO Software',autor:'Gang of Four',categoria:'Software',tipo:'PDF'},
  {titulo:'Ingeniería del Software (7ma Ed.)',autor:'Ian Sommerville',categoria:'Sistemas',tipo:'PDF'},
]
export default function BibliotecaPage() {
  const [search,setSearch] = useState('')
  const filtered = LIBROS.filter(l=>l.titulo.toLowerCase().includes(search.toLowerCase())||l.categoria.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="flex flex-col gap-5">
      <Card className="p-4">
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Buscar libro, autor, categoría..."
          className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl text-sm outline-none focus:border-[#00C4A0] transition-all"/>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map(l=>(
          <div key={l.titulo} className="bg-white border border-slate-200 rounded-2xl p-4 flex gap-3 hover:border-[#00C4A0] hover:shadow-sm transition-all cursor-pointer" onClick={()=>alert('Descargando: '+l.titulo)}>
            <div className="w-11 h-14 rounded bg-gradient-to-b from-[#0A2540] to-[#1E3A5F] flex items-center justify-center text-xl flex-shrink-0">📘</div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-slate-800 leading-snug">{l.titulo}</div>
              <div className="text-[11px] text-slate-400 mt-1">{l.autor}</div>
              <div className="flex gap-2 mt-2">
                <Badge variant="teal">{l.categoria}</Badge>
                <Badge variant="info">{l.tipo}</Badge>
                <button onClick={e=>{e.stopPropagation();alert('Descargando '+l.tipo+': '+l.titulo)}} className="ml-auto text-[11px] px-2.5 py-0.5 bg-[#00C4A0] text-[#0A2540] rounded-full font-semibold hover:bg-[#00A88A] transition-all">⬇ Descargar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}