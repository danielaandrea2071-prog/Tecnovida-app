'use client'
import { useState } from 'react'
import { Card, SectionTitle, Table, Td } from '@/components/ui'

// VULNERABLE A PROPOSITO — pantalla de prueba para el examen de
// Seguridad en Aplicaciones Web (demo de SQL Injection).
export default function BuscarVulnerablePage() {
  const [q, setQ] = useState('')
  const [resultados, setResultados] = useState<any[]>([])
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function buscar() {
    setLoading(true)
    setErrorMsg(null)
    const res = await fetch('/api/buscar-vulnerable?q=' + encodeURIComponent(q))
    const json = await res.json()
    if (json.error) {
      setErrorMsg(json.error)
      setResultados([])
    } else {
      setResultados(json.data || [])
    }
    setLoading(false)
  }

  return (
    <Card>
      <SectionTitle>Búsqueda de estudiantes (versión vulnerable — demo)</SectionTitle>
      <p className="text-xs text-red-500 mb-3">
        Esta pantalla existe solo para el examen de Seguridad en Aplicaciones Web.
        No tiene validación de entradas ni sentencias preparadas.
      </p>
      <div className="flex gap-2 mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nombre o correo..."
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm flex-1"
        />
        <button
          onClick={buscar}
          className="px-3 py-2 bg-[#00C4A0] text-[#0A2540] rounded-lg text-sm font-semibold"
        >
          Buscar
        </button>
      </div>

      {loading && <p className="text-sm text-slate-400">Buscando...</p>}
      {errorMsg && (
        <p className="text-sm text-red-500 mb-3">Error de base de datos: {errorMsg}</p>
      )}

      {resultados.length > 0 && (
        <Table headers={['ID', 'Nombre', 'Correo', 'Carrera', 'Estado']}>
          {resultados.map((r) => (
            <tr key={r.id}>
              <Td className="font-mono text-[11px]">{r.id}</Td>
              <Td>{r.nombre}</Td>
              <Td>{r.correo}</Td>
              <Td>{r.carrera}</Td>
              <Td>{r.estado}</Td>
            </tr>
          ))}
        </Table>
      )}
    </Card>
  )
}
