import pool from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

// VULNERABLE A PROPOSITO: comparacion de contraseña en texto plano,
// sin hash. La version segura reemplaza esto por Argon2id.
export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  const cleanEmail = (email || '').toLowerCase().trim()

  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [cleanEmail])
  const user = rows[0]

  if (!user) {
    const { rows: pendingRows } = await pool.query(
      'SELECT id FROM users_pending WHERE email = $1',
      [cleanEmail]
    )
    if (pendingRows[0]) {
      return NextResponse.json(
        { error: 'Tu cuenta está pendiente de aprobación. El administrador debe aprobarla primero.' },
        { status: 403 }
      )
    }
    return NextResponse.json({ error: 'Correo no encontrado en el sistema.' }, { status: 404 })
  }

  if (user.password_hash !== password) {
    return NextResponse.json({ error: 'Contraseña incorrecta.' }, { status: 401 })
  }

  await pool.query(
    'INSERT INTO audit_logs (user_email, action) VALUES ($1, $2)',
    [cleanEmail, 'Login exitoso']
  )

  return NextResponse.json({ user })
}
