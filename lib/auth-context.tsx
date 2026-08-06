import pool from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email])
  const user = rows[0]
  if (!user) return NextResponse.json({ error: 'Correo no encontrado' }, { status: 404 })
  if (user.password_hash !== password) return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 })
  return NextResponse.json({ user })
}