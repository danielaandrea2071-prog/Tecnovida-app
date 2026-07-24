'use client'
import { Card, SectionTitle, Badge, StatCard } from '@/components/ui'
export default function PagosPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon="💰" label="Balance pendiente" value="$235" change="Vence: 31 May" iconBg="orange"/>
        <StatCard icon="✅" label="Pagado este cuatrimestre" value="$705" change="Al día" changeUp iconBg="teal"/>
        <StatCard icon="🏦" label="Beca aplicada" value="-$200" change="Beca Excelencia" changeUp iconBg="blue"/>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <SectionTitle>Estado de cuenta — II Cuatrimestre</SectionTitle>
            <button onClick={()=>alert('Procesando pago...')} className="px-4 py-2 bg-[#00C4A0] text-[#0A2540] rounded-lg text-sm font-semibold hover:bg-[#00A88A] transition-all">💳 Pagar</button>
          </div>
          {[['Matrícula base','$180','Pagado','success'],['Programación II (5cr)','$235','Pagado','success'],['Redes (4cr)','$188','Pagado','success'],['Bases de Datos I (4cr)','$188','Pendiente','warning'],['Estadística (3cr)','$141','Pendiente','warning'],['Beca Excelencia','-$200','Aplicada','teal']].map(([c,m,s,b])=>(
            <div key={c as string} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
              <span className="text-sm text-slate-700">{c}</span>
              <div className="flex items-center gap-2"><span className="font-semibold text-sm">{m}</span><Badge variant={b as any}>{s}</Badge></div>
            </div>
          ))}
          <div className="flex justify-between items-center pt-3 mt-1 border-t-2 border-slate-200">
            <strong className="text-sm">Balance pendiente</strong>
            <strong className="text-lg text-amber-500" style={{fontFamily:'Space Grotesk'}}>$235.00</strong>
          </div>
        </Card>
        <Card>
          <SectionTitle>Historial de pagos</SectionTitle>
          <div className="mt-4 divide-y divide-slate-50">
            {[['15 Abr 2025','Pago cuota 1 — II Cuatrimestre','$235'],['28 Mar 2025','Matrícula + Redes','$368'],['10 Feb 2025','Pago cuota 3 — I Cuatrimestre','$235'],['15 Ene 2025','Beca aplicada','-$200']].map(([f,d,m])=>(
              <div key={f as string} className="flex items-center justify-between py-2.5">
                <div><div className="text-[13px] font-medium text-slate-700">{d}</div><div className="text-[11px] text-slate-400">{f}</div></div>
                <div className="text-right"><div className="font-semibold text-sm">{m}</div><Badge variant="success">Aprobado</Badge></div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}