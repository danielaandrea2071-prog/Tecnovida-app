import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type User = {
  id: string
  nombre: string
  email: string
  role: 'Admin' | 'Docente' | 'Estudiante'
  student_id?: string
  faculty?: string
  career?: string
  turno?: string
  specialty?: string
  degree?: string
  cedula?: string
  phone?: string
  address?: string
  birth_date?: string
  indice?: number
  creditos?: number
  estado?: string
}

export type PendingUser = {
  id: string
  nombre: string
  email: string
  password_hash: string
  role: string
  cedula?: string
  phone?: string
  address?: string
  birth_date?: string
  faculty?: string
  career?: string
  turno?: string
  specialty?: string
  degree?: string
  created_at: string
}
