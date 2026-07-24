'use client'
import { useAuth } from '@/lib/auth-context'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

type NavItem = { icon: string; label: string; href: string; badge?: number }

const NAV: Record<string, NavItem[]> = {
  Estudiante: [
    { icon:'🏠', label:'Dashboard',       href:'/dashboard' },
    { icon:'📋', label:'Matrícula',        href:'/dashboard/matricula' },
    { icon:'📅', label:'Mi Horario',       href:'/dashboard/horario' },
    { icon:'📚', label:'Mis Materias',     href:'/dashboard/materias' },
    { icon:'✅', label:'Asistencia',       href:'/dashboard/asistencia' },
    { icon:'🏆', label:'Calificaciones',   href:'/dashboard/calificaciones' },
    { icon:'👤', label:'Mi Perfil',        href:'/dashboard/perfil' },
    { icon:'💳', label:'Carnet Digital',   href:'/dashboard/carnet' },
    { icon:'💰', label:'Pagos',            href:'/dashboard/pagos' },
    { icon:'🔔', label:'Notificaciones',   href:'/dashboard/notificaciones', badge: 3 },
    { icon:'🎫', label:'Soporte',          href:'/dashboard/soporte' },
    { icon:'📖', label:'Biblioteca',       href:'/dashboard/biblioteca' },
  ],
  Docente: [
    { icon:'🏠', label:'Dashboard',        href:'/dashboard' },
    { icon:'📖', label:'Mis Materias',     href:'/dashboard/doc-materias' },
    { icon:'👥', label:'Estudiantes',      href:'/dashboard/doc-estudiantes' },
    { icon:'📦', label:'Módulos',          href:'/dashboard/doc-modulos' },
    { icon:'✅', label:'Asistencia',       href:'/dashboard/asistencia' },
    { icon:'🏆', label:'Calificaciones',   href:'/dashboard/calificaciones' },
    { icon:'📅', label:'Mi Horario',       href:'/dashboard/horario' },
    { icon:'👤', label:'Mi Perfil',        href:'/dashboard/perfil' },
    { icon:'🔔', label:'Notificaciones',   href:'/dashboard/notificaciones', badge: 2 },
  ],
  Admin: [
    { icon:'🏠', label:'Dashboard Global', href:'/dashboard' },
    { icon:'👥', label:'Estudiantes',      href:'/dashboard/adm-estudiantes' },
    { icon:'📖', label:'Docentes',         href:'/dashboard/adm-docentes' },
    { icon:'📚', label:'Materias',         href:'/dashboard/adm-materias' },
    { icon:'📋', label:'Matrículas',       href:'/dashboard/adm-matriculas' },
    { icon:'📊', label:'Reportes',         href:'/dashboard/reportes' },
    { icon:'⏳', label:'Usuarios Pendientes', href:'/dashboard/pendientes' },
    { icon:'💰', label:'Pagos',            href:'/dashboard/pagos' },
    { icon:'🔐', label:'Seguridad',        href:'/dashboard/seguridad' },
    { icon:'📣', label:'Anuncios',         href:'/dashboard/biblioteca' },
    { icon:'🎫', label:'Tickets',          href:'/dashboard/soporte' },
    { icon:'⚙️', label:'Configuración',   href:'/dashboard/config' },
  ],
}

const SECTIONS: Record<string, string[]> = {
  Estudiante: ['Inicio','Académico','Académico','Académico','Académico','Académico','Personal','Personal','Finanzas','Comunicación','Comunicación','Recursos'],
  Docente:    ['Inicio','Académico','Académico','Académico','Académico','Académico','Académico','Personal','Comunicación'],
  Admin:      ['Inicio','Gestión','Gestión','Gestión','Gestión','Reportes','Gestión','Finanzas','Sistema','Comunicación','Comunicación','Sistema'],
}

export default function Sidebar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const role = user?.role || 'Estudiante'
  const items = NAV[role] || NAV.Estudiante
  const sections = SECTIONS[role] || []

  function handleLogout() {
    logout()
    router.replace('/login')
  }

  const initials = user ? ((user.nombre.split(' ')[0]?.[0]||'')+(user.nombre.split(' ')[1]?.[0]||'')).toUpperCase() : 'US'

  let lastSection = ''

  return (
    <aside className="w-[240px] flex-shrink-0 flex flex-col h-screen" style={{background:'#0A2540'}}>
      {/* Brand */}
      <div className="px-4 py-4 flex items-center gap-2.5 border-b border-white/10">
        <div className="w-9 h-9 bg-[#00C4A0] rounded-lg flex items-center justify-center text-[#0A2540] font-bold text-base flex-shrink-0" style={{fontFamily:'Space Grotesk'}}>TV</div>
        <div>
          <div className="text-white text-[13px] font-bold truncate" style={{fontFamily:'Space Grotesk'}}>TecnoVida</div>
          <div className="text-[#00C4A0] text-[10px] uppercase tracking-wider">Institute</div>
        </div>
      </div>

      {/* User */}
      <div className="px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00C4A0] to-[#2563EB] flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0">{initials}</div>
          <div className="min-w-0">
            <div className="text-white text-[13px] font-semibold truncate">{user?.nombre}</div>
            <span className="text-[11px] text-white/40 bg-white/10 px-2 py-0.5 rounded-full">{role}</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2.5 py-3 overflow-y-auto sidebar-nav">
        {items.map((item, i) => {
          const sec = sections[i] || ''
          const showSection = sec !== lastSection
          if (showSection) lastSection = sec
          const isActive = pathname === item.href
          return (
            <div key={item.href}>
              {showSection && (
                <div className="text-[10px] uppercase tracking-widest text-white/30 font-medium px-2 pt-3 pb-1">{sec}</div>
              )}
              <Link
                href={item.href}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg mb-0.5 text-[13px] transition-all
                  ${isActive
                    ? 'bg-[#00C4A0]/20 text-[#00C4A0] font-medium'
                    : 'text-white/55 hover:bg-white/10 hover:text-white'}`}
              >
                <span className="text-base w-5 text-center flex-shrink-0">{item.icon}</span>
                <span className="truncate">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-[#FF6B35] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span>
                )}
              </Link>
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-2.5 py-3 border-t border-white/[0.06]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-2.5 py-2 w-full text-white/40 text-[12px] rounded-lg hover:bg-white/[0.06] hover:text-white/70 transition-all"
        >
          ⬅ Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
