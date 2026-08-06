'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, SectionTitle, Badge, Table, Td, Avatar, StatCard } from '@/components/ui'
import { supabase } from '@/lib/supabase'

const TABLE = 'estudiantes'

type Estudiante = {
  id: string
  nombre: string
  carrera: string
  cuatrimestre: string
  indice: number
  creditos: number
  estado: 'Activo' | 'Condicional' | 'Suspendido'
  correo: string
}

export default function AdmEstudiantesPage() {
  const [search, setSearch] = useState('')
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([])
  const [totalGeneral, setTotalGeneral] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [nuevo, setNuevo] = useState({ nombre: '', correo: '', carrera: '', cuatrimestre: 'I' })

  async function cargarTodos() {
    const { data, error } = await supabase.from(TABLE).select('*').order('nombre')
    if (!error && data) {
      setTotalGeneral(data.length)
      if (!search) setEstudiantes(data as Estudiante[])
    }
  }

  // VULNERABLE A PROPOSITO: la caja "Buscar nombre o ID..." de esta pantalla
  // llama a una funcion de Postgres que arma el SQL por concatenacion.
  // No hay sentencias preparadas ni validacion de entrada.
  async function buscar(termino: string) {
    setLoading(true)
    setError(null)
    if (!termino) {
      await cargarTodos()
      setLoading(false)
      return
    }
    const { data, error } = await supabase.rpc('buscar_estudiantes_vulnerable',  {
      termino,
    })
    if (error) {
      setError('Error de base de datos: ' + error.message)
      setEstudiantes([])
    } else {
      setEstudiantes(data as Estudiante[])
    }
    setLoading(false)
  }

  useEffect(() => {
    cargarTodos().finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const t = setTimeout(() => buscar(search), 350)
    return () => clearTimeout(t)
  }, [search])

  const activos = estudiantes.filter((e) => e.estado === 'Activo').length
  const condicionales = estudiantes.filter((e) => e.estado === 'Condicional').length
  const suspendidos = estudiantes.filter((e) => e.estado === 'Suspendido').length

  async function crearEstudiante() {
    if (!nuevo.nombre || !nuevo.correo) {
      alert('Nombre y correo son obligatorios')
      return
    }
    const { error } = await supabase.from(TABLE).insert([
      {
        nombre: nuevo.nombre,
        correo: nuevo.correo,
        carrera: nuevo.carrera,
        cuatrimestre: nuevo.cuatrimestre,
        indice: 0,
        creditos: 0,
        estado: 'Activo',
      },
    ])
    if (error) {
      alert('No se pudo crear: ' + error.message)
      return
    }
    setShowForm(false)
    setNuevo({ nombre: '', correo: '', carrera: '', cuatrimestre: 'I' })
    cargarTodos()
    buscar(search)
  }

  async function suspenderEstudiante(id: string, nombre: string) {
    if (!confirm('¿Suspender cuenta de ' + nombre + '?')) return
    const { error } = await supabase.from(TABLE).update({ estado: 'Suspendido' }).eq('id', id)
    if (error) {
      alert('No se pudo suspender: ' + error.message)
      return
    }
    cargarTodos()
    buscar(search)
  }

  async function exportarExcel() {
    const XLSX = await import('xlsx')
    const ws = XLSX.utils.json_to_sheet(
      estudiantes.map((e) => ({
        ID: e.id,
        Nombre: e.nombre,
        Correo: e.correo,
        Carrera: e.carrera,
        Cuatrimestre: e.cuatrimestre,
        Indice: e.indice,
        Creditos: e.creditos,
        Estado: e.estado,
      }))
    )
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Estudiantes')
    XLSX.writeFile(wb, 'estudiantes_tecnovida.xlsx')
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="🎓" label="Total estudiantes" value={String(totalGeneral)} iconBg="teal" />
        <StatCard icon="✅" label="Activos" value={String(activos)} iconBg="blue" />
        <StatCard icon="⚠️" label="Condicionales" value={String(condicionales)} iconBg="orange" />
        <StatCard icon="🚫" label="Suspendidos" value={String(suspendidos)} iconBg="purple" />
      </div>

      {showForm && (
        <Card>
          <SectionTitle>Nuevo estudiante</SectionTitle>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <input placeholder="Nombre completo" value={nuevo.nombre}
              onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm" />
            <input placeholder="Correo institucional" value={nuevo.correo}
              onChange={(e) => setNuevo({ ...nuevo, correo: e.target.value })}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm" />
            <input placeholder="Carrera" value={nuevo.carrera}
              onChange={(e) => setNuevo({ ...nuevo, carrera: e.target.value })}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm" />
            <select value={nuevo.cuatrimestre}
              onChange={(e) => setNuevo({ ...nuevo, cuatrimestre: e.target.value })}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm">
              {['I', 'II', 'III', 'IV', 'V', 'VI'].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={crearEstudiante} className="px-3 py-2 bg-[#00C4A0] text-[#0A2540] rounded-lg text-sm font-semibold">Guardar</button>
            <button onClick={() => setShowForm(false)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm">Cancelar</button>
          </div>
        </Card>
      )}

      <Card>
        <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
          <SectionTitle>Estudiantes registrados (mostrando {estudiantes.length} de {totalGeneral})</SectionTitle>
          <div className="flex gap-2 flex-wrap">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="🔍 Buscar nombre o ID..."
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#00C4A0] w-52" />
            <button onClick={() => setShowForm(true)} className="px-3 py-2 bg-[#00C4A0] text-[#0A2540] rounded-lg text-sm font-semibold hover:bg-[#00A88A] transition-all">+ Nuevo</button>
            <button onClick={exportarExcel} className="px-3 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50">📊 Excel</button>
          </div>
        </div>

        {loading && <p className="text-sm text-slate-400 mb-3">Buscando...</p>}
        {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

        <Table headers={['Estudiante', 'ID', 'Carrera', 'Cuatrim.', 'Índice', 'Créditos', 'Estado', 'Acciones']}>
          {estudiantes.map((e) => (
            <tr key={e.id}>
              <Td>
                <div className="flex items-center gap-2">
                  <Avatar name={e.nombre} />
                  <div>
                    <div className="font-medium text-[13px]">{e.nombre}</div>
                    <div className="text-[11px] text-slate-400">{e.correo}</div>
                  </div>
                </div>
              </Td>
              <Td className="font-mono text-[11px] text-slate-400">{e.id}</Td>
              <Td className="text-[12px]">{e.carrera}</Td>
              <Td className="text-center">{e.cuatrimestre}</Td>
              <Td><strong className={e.indice >= 3.5 ? 'text-emerald-600' : e.indice >= 2.5 ? 'text-slate-700' : 'text-red-500'}>{e.indice}</strong></Td>
              <Td>{e.creditos}</Td>
              <Td><Badge variant={e.estado === 'Activo' ? 'success' : e.estado === 'Condicional' ? 'warning' : 'danger'}>{e.estado}</Badge></Td>
              <Td>
                <div className="flex gap-1">
                  <Link href={`/dashboard/perfil/${e.id}`} className="px-2 py-1 border border-slate-200 rounded text-xs hover:bg-slate-50">👁</Link>
                  <button onClick={() => alert('Editar: ' + e.nombre)} className="px-2 py-1 border border-slate-200 rounded text-xs hover:bg-slate-50">✏</button>
                  <button onClick={() => suspenderEstudiante(e.id, e.nombre)} className="px-2 py-1 border border-red-200 rounded text-xs text-red-500 hover:bg-red-50">⛔</button>
                </div>
              </Td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  )
}
