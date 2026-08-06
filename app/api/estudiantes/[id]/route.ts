import pool from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

// VULNERABLE A PROPOSITO (IDOR): no se verifica que el usuario logueado
// sea dueño de este id, ni que tenga rol de administrador, ni en GET ni en PUT.

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { rows } = await pool.query('SELECT * FROM estudiantes WHERE id = $1', [params.id])
  return NextResponse.json({ data: rows[0] || null })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json()
  const fields: string[] = []
  const values: any[] = []
  let i = 1

  if (body.bio !== undefined) { fields.push(`bio = $${i++}`); values.push(body.bio) }
  if (body.indice !== undefined) { fields.push(`indice = $${i++}`); values.push(body.indice) }
  if (body.creditos !== undefined) { fields.push(`creditos = $${i++}`); values.push(body.creditos) }
  if (body.estado !== undefined) { fields.push(`estado = $${i++}`); values.push(body.estado) }

  if (fields.length === 0) {
    return NextResponse.json({ error: 'Nada que actualizar' }, { status: 400 })
  }

  values.push(params.id)
  try {
    await pool.query(`UPDATE estudiantes SET ${fields.join(', ')} WHERE id = $${i}`, values)
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
