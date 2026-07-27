'use client'
import { Card, SectionTitle, Avatar, Badge } from '@/components/ui'
import { useAuth } from '@/lib/auth-context'

export default function MiPerfilPage() {
  const { user } = useAuth()

  if (!user) return <Card>Cargando perfil...</Card>

  return (
    <Card>
      <div className="flex items-center gap-3 mb-5">
        <Avatar name={user.nombre} />
        <div>
          <SectionTitle>{user.nombre}</SectionTitle>
          <p className="text-sm text-slate-500">{user.email}</p>
        </div>
        <Badge variant="success">{user.role}</Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        {user.student_id && <p><strong>ID estudiante:</strong> {user.student_id}</p>}
        {user.career && <p><strong>Carrera:</strong> {user.career}</p>}
        {user.faculty && <p><strong>Facultad:</strong> {user.faculty}</p>}
        {user.turno && <p><strong>Turno:</strong> {user.turno}</p>}
        {user.specialty && <p><strong>Especialidad:</strong> {user.specialty}</p>}
        {user.degree && <p><strong>Grado:</strong> {user.degree}</p>}
        {user.cedula && <p><strong>Cédula:</strong> {user.cedula}</p>}
        {user.phone && <p><strong>Teléfono:</strong> {user.phone}</p>}
        {user.address && <p><strong>Dirección:</strong> {user.address}</p>}
        {user.birth_date && <p><strong>Nacimiento:</strong> {user.birth_date}</p>}
        {user.indice != null && <p><strong>Índice:</strong> {user.indice}</p>}
        {user.creditos != null && <p><strong>Créditos:</strong> {user.creditos}</p>}
        {user.estado && <p><strong>Estado:</strong> {user.estado}</p>}
      </div>
    </Card>
  )
}
