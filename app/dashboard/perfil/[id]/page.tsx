'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, SectionTitle, Avatar } from '@/components/ui'
import { supabase } from '@/lib/supabase'

// VULNERABLE A PROPOSITO:
// 1) IDOR: no verifica si el usuario logueado tiene permiso para ver
//    este ID en particular. Cualquiera puede cambiar el numero en la URL
//    (/dashboard/perfil/1, /dashboard/perfil/2, ...) y ver cualquier perfil.
// 2) XSS almacenado: la bio se guarda tal cual y se renderiza con
//    dangerouslySetInnerHTML, sin sanitizar. Un usuario puede guardar
//    <img src=x onerror=alert(1)> como bio y afecta a todo el que la vea.

type Estudiante = {
  id: string
  nombre: string
  correo: string
  carrera: string
  cuatrimestre: string
  indice: number
  creditos: number
  estado: string
  bio: string | null
}

export default function PerfilVulnerablePage() {
  const params = useParams()
  const id = params.id as string
  const [estudiante, setEstudiante] = useState<Estudiante | null>(null)
  const [bioDraft, setBioDraft] = useState('')
  const [loading, setLoading] = useState(true)

  async function cargar() {
    setLoading(true)
    // Sin ningun chequeo de "es este el propio usuario" o "es admin"
    const { data } = await supabase.from('estudiantes').select('*').eq('id', id).maybeSingle()
    setEstudiante(data as Estudiante)
    setBioDraft((data as Estudiante)?.bio || '')
    setLoading(false)
  }

  useEffect(() => {
    cargar()
  }, [id])

  async function guardarBio() {
    await supabase.from('estudiantes').update({ bio: bioDraft }).eq('id', id)
    cargar()
  }

  if (loading) return <Card>Cargando perfil...</Card>
  if (!estudiante) return <Card>No se encontró el estudiante con ID {id}</Card>

  return (
    <Card>
      <p className="text-xs text-red-500 mb-3">
        Pantalla de prueba (versión vulnerable) — sin control de acceso por rol/propietario.
      </p>
      <div className="flex items-center gap-3 mb-5">
        <Avatar name={estudiante.nombre} />
        <div>
          <SectionTitle>{estudiante.nombre}</SectionTitle>
          <p className="text-sm text-slate-500">{estudiante.correo}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm mb-5">
        <p><strong>ID:</strong> {estudiante.id}</p>
        <p><strong>Carrera:</strong> {estudiante.carrera}</p>
        <p><strong>Cuatrimestre:</strong> {estudiante.cuatrimestre}</p>
        <p><strong>Índice:</strong> {estudiante.indice}</p>
        <p><strong>Créditos:</strong> {estudiante.creditos}</p>
        <p><strong>Estado:</strong> {estudiante.estado}</p>
      </div>

      <div className="mb-3">
        <p className="text-sm font-semibold mb-1">Bio (se muestra sin sanitizar):</p>
        {/* Renderizado inseguro a proposito */}
        <div
          className="border border-slate-200 rounded-lg p-3 text-sm min-h-[60px]"
          dangerouslySetInnerHTML={{ __html: estudiante.bio || '<em>Sin bio</em>' }}
        />
      </div>

      <div className="flex gap-2">
        <input
          value={bioDraft}
          onChange={(e) => setBioDraft(e.target.value)}
          placeholder="Editar bio (prueba con <img src=x onerror=alert(1)>)"
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm flex-1"
        />
        <button
          onClick={guardarBio}
          className="px-3 py-2 bg-[#00C4A0] text-[#0A2540] rounded-lg text-sm font-semibold"
        >
          Guardar bio
        </button>
      </div>
    </Card>
  )
}
