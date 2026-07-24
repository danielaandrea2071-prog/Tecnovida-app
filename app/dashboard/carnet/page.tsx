'use client'
import { useAuth } from '@/lib/auth-context'
export default function CarnetPage() {
  const { user } = useAuth()
  if(!user) return null
  const init = ((user.nombre.split(' ')[0]?.[0]||'')+(user.nombre.split(' ')[1]?.[0]||'')).toUpperCase()
  return (
    <div className="flex gap-8 flex-wrap items-start">
      <div className="rounded-2xl p-6 text-white relative overflow-hidden w-80" style={{background:'linear-gradient(135deg,#0A2540,#0F4C75)'}}>
        <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-[#00C4A0]/15"/>
        <div className="text-[11px] text-[#00C4A0] uppercase tracking-widest mb-4">🎓 TecnoVida Institute</div>
        <div className="w-14 h-14 rounded-xl bg-[#00C4A0] flex items-center justify-center text-xl font-bold text-[#0A2540] mb-3" style={{fontFamily:'Space Grotesk'}}>{init}</div>
        <div className="text-xl font-bold" style={{fontFamily:'Space Grotesk'}}>{user.nombre}</div>
        <div className="text-white/50 text-sm mt-1">{user.career||user.role}</div>
        <div className="flex gap-6 mt-4">
          <div><div className="text-[10px] text-white/40 uppercase">ID</div><div className="text-sm font-medium">{user.student_id||'—'}</div></div>
          <div><div className="text-[10px] text-white/40 uppercase">Rol</div><div className="text-sm font-medium">{user.role}</div></div>
          <div><div className="text-[10px] text-white/40 uppercase">Vigencia</div><div className="text-sm font-medium">Dic 2025</div></div>
        </div>
        <div className="mt-5 h-7 rounded" style={{background:'repeating-linear-gradient(90deg,rgba(255,255,255,0.7) 0,rgba(255,255,255,0.7) 2px,transparent 2px,transparent 5px)'}}/>
      </div>
      <div className="flex flex-col gap-3">
        {[['📥 Descargar PDF','Descarga el carnet en formato PDF'],['📧 Enviar al correo','Envía a tu correo institucional'],['🔗 Código QR','Genera QR de verificación'],['🖨 Imprimir','Abre diálogo de impresión']].map(([b,d])=>(
          <button key={b as string} onClick={()=>alert(d as string)} className="flex items-center gap-3 px-4 py-3 border border-slate-200 rounded-xl text-sm hover:bg-slate-50 transition-all text-left">
            <span className="font-medium text-slate-700">{b}</span>
            <span className="text-slate-400 text-xs ml-auto">{d}</span>
          </button>
        ))}
      </div>
    </div>
  )
}