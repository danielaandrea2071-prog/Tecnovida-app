'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, SectionTitle, Avatar, Badge } from '@/components/ui'
import { supabase } from '@/lib/supabase'

// VULNERABLE A PROPOSITO:
// 1) IDOR (lectura): no verifica si el usuario logueado tiene permiso
//    para ver este ID. Cualquiera puede cambiar el numero en la URL
//    (/dashboard/perfil/1, /dashboard/perfil/2, ...) y ver cualquier perfil.
// 2) IDOR (escritura): tampoco verifica permiso para EDITAR. Cualquier
//    usuario autenticado puede modificar el indice, creditos y estado
//    de cualquier otro estudiante, no solo el suyo.
// 3) XSS almacenado: la bio se guarda tal cual y se renderiza con
//    dangerouslySetInnerHTML, sin sanitizar.

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
  const [indiceDraft, setIndiceDraft] = useState('')
  const [creditosDraft, setCreditosDraft] = useState('')
  const [estadoDraft, setEstadoDraft] = useState('Activo')
  const [loading, setLoading] = useState(true)
  const [savedMsg, setSavedMsg] = useState('')

  async function cargar() {
    setLoading(true)
    // Sin ningun chequeo de "es este el propio usuario" o "es admin"
    const { data } = await supabase.from('estudiantes').select('*').eq('id', id).maybeSingle()
    const e = data as Estudiante
    setEstudiante(e)
    setBioDraft(e?.bio || '')
    setIndiceDraft(String(e?.indice ?? ''))
    setCreditosDraft(String(e?.creditos ?? ''))
    setEstadoDraft(e?.estado || 'Activo')
    setLoading(false)
  }

  useEffect(() => {
    cargar()
  }, [id])

  async function guardarBio() {
    await supabase.from('estudiantes').update({ bio: bioDraft }).eq('id', id)
    setSavedMsg('Bio actualizada')
    cargar()
  }

  // VULNERABLE: cualquier usuario autenticado puede llamar esto sobre
  // cualquier id, sin que el servidor verifique propiedad ni rol.
  async function guardarAcademico() {
    const { error } = await supabase
      .from('estudiantes')
      .update({
        indice: parseFloat(indiceDraft) || 0,
        creditos: parseInt(creditosDraft) || 0,
        estado: estadoDraft,
      })
      .eq('id', id)
    if (error) {
      setSavedMsg('Error: ' + error.message)
    } else {
      setSavedMsg('Registro académico actualizado sin verificación de permisos')
    }
    cargar()
  }

  if (loading) return <Card>Cargando perfil...</Card>
  if (!estudiante) return <Card>No se encontró el estudiante con ID {id}</Card>

  return (
    <Card>
      <p className="text-xs text-red-500 mb-3">
        Pantalla de prueba (versión vulnerable) — sin control de acceso por rol/propietario,
        ni en lectura ni en escritura.
      </p>
      <div className="flex items-center gap-3 mb-5">
        <Avatar name={estudiante.nombre} />
        <div>
          <SectionTitle>{estudiante.nombre}</SectionTitle>
          <p className="text-sm text-slate-500">{estudiante.correo}</p>
        </div>
        <Badge variant={estudiante.estado === 'Activo' ? 'success' : estudiante.estado === 'Condicional' ? 'warning' : 'danger'}>
          {estudiante.estado}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm mb-5">
        <p><strong>ID:</strong> {estudiante.id}</p>
        <p><strong>Carrera:</strong> {estudiante.carrera}</p>
        <p><strong>Cuatrimestre:</strong> {estudiante.cuatrimestre}</p>
        <p><strong>Índice actual:</strong> {estudiante.indice}</p>
        <p><strong>Créditos actuales:</strong> {estudiante.creditos}</p>
      </div>

      {savedMsg && <p className="text-sm text-emerald-600 mb-3">{savedMsg}</p>}

      <div className="border border-red-200 rounded-lg p-4 mb-5 bg-red-50/30">
        <p className="text-sm font-semibold mb-2">
          Editar registro académico (sin verificación de propietario ni rol)
        </p>
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div>
            <label className="text-xs text-slate-500">Índice</label>
            <input
              value={indiceDraft}
              onChange={(e) => setIndiceDraft(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm w-full"
            />
          </div>
          <div>
            <label className="text-xs text-slate-500">Créditos</label>
            <input
              value={creditosDraft}
              onChange={(e) => setCreditosDraft(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm w-full"
            />
          </div>
          <div>
            <label className="text-xs text-slate-500">Estado</label>
            <select
              value={estadoDraft}
              onChange={(e) => setEstadoDraft(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm w-full"
            >
              <option>Activo</option>
              <option>Condicional</option>
              <option>Suspendido</option>
            </select>
          </div>
        </div>
        <button
          onClick={guardarAcademico}
          className="px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold"
        >
          Guardar cambios académicos
        </button>
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
