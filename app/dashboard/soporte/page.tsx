'use client'
import { useState } from 'react'
import { Card, SectionTitle, Badge } from '@/components/ui'
const TICKETS = [
  {id:'#TK-2047',asunto:'Error en carga de notas del cuatrimestre',estado:'En proceso',tipo:'Académico',fecha:'12 May 2025'},
  {id:'#TK-2031',asunto:'Solicitud de constancia de estudios',estado:'Resuelto',tipo:'Administrativo',fecha:'08 May 2025'},
]
export default function SoportePage() {
  const [msgs, setMsgs] = useState([{from:'bot',text:'¡Hola! Soy el asistente de soporte TecnoVida. ¿En qué puedo ayudarte?'}])
  const [input, setInput] = useState('')
  function send() {
    if(!input.trim()) return
    const t = input.trim(); setInput('')
    setMsgs(p=>[...p,{from:'user',text:t}])
    setTimeout(()=>setMsgs(p=>[...p,{from:'bot',text:'Tu consulta ha sido registrada. Un asesor te responderá pronto. ¿Hay algo más en que pueda ayudarte?'}]),600)
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="flex flex-col gap-4">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <SectionTitle>Mis tickets</SectionTitle>
            <button onClick={()=>alert('Formulario para nuevo ticket')} className="px-3 py-1.5 bg-[#00C4A0] text-[#0A2540] rounded-lg text-xs font-semibold hover:bg-[#00A88A] transition-all">+ Nuevo ticket</button>
          </div>
          {TICKETS.map(t=>(
            <div key={t.id} className="border border-slate-200 rounded-xl p-3.5 mb-2 hover:border-slate-300 cursor-pointer">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <code className="text-[11px] bg-slate-50 px-2 py-0.5 rounded font-mono">{t.id}</code>
                <Badge variant={t.estado==='En proceso'?'warning':'success'}>{t.estado}</Badge>
                <Badge variant="info">{t.tipo}</Badge>
                <span className="text-[11px] text-slate-400 ml-auto">{t.fecha}</span>
              </div>
              <div className="text-[13px] font-medium text-slate-700">{t.asunto}</div>
            </div>
          ))}
        </Card>
        <Card>
          <SectionTitle>Centro de ayuda</SectionTitle>
          <div className="mt-3 divide-y divide-slate-50">
            {[['📋','Solicitud académica','Retiro, cambio carrera, congelación'],['📄','Documentos','Constancias, certificados'],['🎓','Becas','Consulta estado de beca'],['📞','Contacto','Registraduría ext. 200']].map(([i,t,d])=>(
              <button key={t as string} onClick={()=>alert(d as string)} className="flex items-center gap-3 py-3 w-full text-left hover:bg-slate-50 px-1 rounded transition-all">
                <span className="text-xl">{i}</span>
                <div><div className="text-[13px] font-medium text-slate-700">{t}</div><div className="text-[11px] text-slate-400">{d}</div></div>
              </button>
            ))}
          </div>
        </Card>
      </div>
      <Card className="flex flex-col">
        <SectionTitle>💬 Chat de soporte</SectionTitle>
        <div className="flex-1 mt-4 border border-slate-100 rounded-xl p-3 bg-slate-50 overflow-y-auto flex flex-col gap-2 min-h-64 max-h-80">
          {msgs.map((m,i)=>(
            <div key={i} className={`flex ${m.from==='user'?'justify-end':''}`}>
              {m.from==='bot' && <div className="w-7 h-7 rounded-full bg-[#00C4A0] flex items-center justify-center text-[11px] font-bold text-[#0A2540] mr-2 flex-shrink-0 mt-0.5">S</div>}
              <div className={`px-3 py-2 rounded-xl text-[12px] max-w-[80%] ${m.from==='user'?'bg-[#00C4A0]/15 border border-[#00C4A0]/20 text-slate-800':'bg-white border border-slate-200 text-slate-700'}`}>{m.text}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-3">
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()}
            placeholder="Escribe tu consulta..." className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#00C4A0] transition-all"/>
          <button onClick={send} className="px-4 py-2 bg-[#00C4A0] text-[#0A2540] rounded-lg text-sm font-semibold hover:bg-[#00A88A] transition-all">Enviar</button>
        </div>
      </Card>
    </div>
  )
}