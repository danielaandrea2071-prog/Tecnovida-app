'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/matricula': 'Proceso de Matrícula',
  '/dashboard/horario': 'Mi Horario Académico',
  '/dashboard/materias': 'Mis Materias',
  '/dashboard/asistencia': 'Control de Asistencia',
  '/dashboard/calificaciones': 'Calificaciones',
  '/dashboard/perfil': 'Mi Perfil',
  '/dashboard/carnet': 'Carnet Digital',
  '/dashboard/pagos': 'Estado de Cuenta',
  '/dashboard/notificaciones': 'Notificaciones',
  '/dashboard/soporte': 'Centro de Soporte',
  '/dashboard/biblioteca': 'Biblioteca Digital',
  '/dashboard/doc-materias': 'Mis Materias Asignadas',
  '/dashboard/doc-estudiantes': 'Gestión de Estudiantes',
  '/dashboard/doc-modulos': 'Módulos Académicos',
  '/dashboard/adm-estudiantes': 'Gestión de Estudiantes',
  '/dashboard/adm-docentes': 'Gestión de Docentes',
  '/dashboard/adm-materias': 'Gestión de Materias',
  '/dashboard/adm-matriculas': 'Control de Matrículas',
  '/dashboard/reportes': 'Reportes y Estadísticas',
  '/dashboard/pendientes': 'Usuarios Pendientes',
  '/dashboard/seguridad': 'Seguridad y Auditoría',
  '/dashboard/config': 'Configuración del Sistema',
}

export default function Topbar() {
  const pathname = usePathname()
  const [search, setSearch] = useState('')
  const title = TITLES[pathname] || 'Panel'

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center gap-4 px-6 flex-shrink-0">
      <h1 className="text-[17px] font-bold text-[#0A2540] flex-1 truncate" style={{fontFamily:'Space Grotesk'}}>{title}</h1>

      <div className="relative flex-1 max-w-xs hidden md:block">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-8 pr-3 py-2 border-2 border-slate-100 bg-slate-50 rounded-lg text-sm outline-none focus:border-[#00C4A0] focus:bg-white transition-all"
        />
      </div>

      <button className="relative w-9 h-9 border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 hover:border-[#00C4A0] hover:text-[#00C4A0] transition-all">
        🔔
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#FF6B35] rounded-full border border-white" />
      </button>

      <div className="text-[11px] text-slate-400 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full whitespace-nowrap hidden sm:block">
        I Cuatrimestre 2025
      </div>
    </header>
  )
}
