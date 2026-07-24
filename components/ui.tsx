import { ReactNode } from 'react'

// Badge
type BadgeVariant = 'success'|'warning'|'danger'|'info'|'teal'|'gray'|'purple'
const BADGE_STYLES: Record<BadgeVariant, string> = {
  success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  warning: 'bg-amber-50 text-amber-700 border border-amber-200',
  danger:  'bg-red-50 text-red-600 border border-red-200',
  info:    'bg-blue-50 text-blue-700 border border-blue-200',
  teal:    'bg-[#00C4A0]/10 text-[#007A64] border border-[#00C4A0]/30',
  gray:    'bg-slate-100 text-slate-500 border border-slate-200',
  purple:  'bg-violet-50 text-violet-700 border border-violet-200',
}
export function Badge({ variant = 'gray', children, className = '' }: { variant?: BadgeVariant, children: ReactNode, className?: string }) {
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${BADGE_STYLES[variant]} ${className}`}>{children}</span>
}

// Card
export function Card({ children, className = '' }: { children: ReactNode, className?: string }) {
  return <div className={`bg-white border border-slate-200 rounded-2xl p-5 ${className}`}>{children}</div>
}

// Stat Card
export function StatCard({ icon, label, value, change, changeUp, iconBg = 'teal' }: {
  icon: string, label: string, value: string, change?: string, changeUp?: boolean, iconBg?: string
}) {
  const bg: Record<string,string> = {
    teal:'bg-[#00C4A0]/10', blue:'bg-blue-100', orange:'bg-orange-100', purple:'bg-violet-100'
  }
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-start gap-3">
      <div className={`w-11 h-11 ${bg[iconBg]||bg.teal} rounded-xl flex items-center justify-center text-xl flex-shrink-0`}>{icon}</div>
      <div>
        <div className="text-xs text-slate-500">{label}</div>
        <div className="text-2xl font-bold text-[#0A2540] leading-tight mt-0.5" style={{fontFamily:'Space Grotesk'}}>{value}</div>
        {change && <div className={`text-[11px] mt-0.5 ${changeUp ? 'text-emerald-600' : 'text-slate-400'}`}>{change}</div>}
      </div>
    </div>
  )
}

// Table wrapper
export function Table({ headers, children }: { headers: string[], children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm tv-table">
        <thead>
          <tr>
            {headers.map(h => (
              <th key={h} className="text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400 px-3 py-2 border-b border-slate-100 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export function Td({ children, className='' }: { children: ReactNode, className?: string }) {
  return <td className={`px-3 py-2.5 border-b border-slate-50 text-slate-700 align-middle ${className}`}>{children}</td>
}

// Avatar
export function Avatar({ name, size = 'sm' }: { name: string, size?: 'sm'|'lg' }) {
  const parts = name.split(' ').filter(Boolean)
  const init = ((parts[0]?.[0]||'')+(parts[1]?.[0]||'')).toUpperCase()
  const sz = size === 'lg' ? 'w-12 h-12 text-base' : 'w-8 h-8 text-xs'
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br from-[#00C4A0] to-[#2563EB] flex items-center justify-center font-bold text-white flex-shrink-0`}>
      {init}
    </div>
  )
}

// Progress bar
export function ProgressBar({ value, color = 'teal' }: { value: number, color?: string }) {
  const colors: Record<string,string> = { teal:'bg-[#00C4A0]', warning:'bg-amber-400', danger:'bg-red-400', blue:'bg-blue-500' }
  return (
    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden flex-1">
      <div className={`h-full rounded-full ${colors[color]||colors.teal}`} style={{width:`${Math.min(value,100)}%`}} />
    </div>
  )
}

// Section title
export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-[15px] font-bold text-[#0A2540]" style={{fontFamily:'Space Grotesk'}}>{children}</h2>
}

// Empty state
export function EmptyState({ icon, text }: { icon: string, text: string }) {
  return (
    <div className="text-center py-12 text-slate-400">
      <div className="text-4xl mb-3">{icon}</div>
      <div className="text-sm">{text}</div>
    </div>
  )
}

// Button
type BtnVariant = 'primary'|'outline'|'ghost'|'danger'
export function Btn({ children, onClick, variant='outline', size='md', disabled, className='' }: {
  children: ReactNode, onClick?: ()=>void, variant?: BtnVariant,
  size?: 'sm'|'md', disabled?: boolean, className?: string
}) {
  const base = 'inline-flex items-center gap-1.5 font-medium rounded-lg transition-all disabled:opacity-50 cursor-pointer'
  const sizes = { sm: 'px-2.5 py-1 text-xs', md: 'px-3.5 py-1.5 text-sm' }
  const variants = {
    primary: 'bg-[#00C4A0] text-[#0A2540] hover:bg-[#00A88A] font-semibold',
    outline: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300',
    ghost:   'text-slate-500 hover:bg-slate-100 hover:text-slate-700',
    danger:  'border border-red-200 text-red-600 hover:bg-red-50',
  }
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} style={variant==='primary'?{fontFamily:'Space Grotesk'}:{}}>
      {children}
    </button>
  )
}
