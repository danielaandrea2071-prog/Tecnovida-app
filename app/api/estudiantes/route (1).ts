import pool from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || ''

  if (!q) {
    const { rows } = await pool.query('SELECT * FROM estudiantes ORDER BY nombre')
    return NextResponse.json({ data: rows })
  }

  // VULNERABLE A PROPOSITO: concatenacion directa del termino de busqueda,
  // sin sentencia preparada. Permite SQL Injection (ej. UNION SELECT).
  const sql = `SELECT * FROM estudiantes WHERE nombre ILIKE '%${q}%' OR correo ILIKE '%${q}%'`
  try {
    const { rows } = await pool.query(sql)
    return NextResponse.json({ data: rows })
  } catch (e: any) {
    // A proposito devolvemos el mensaje completo de Postgres (fuga de info)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { nombre, correo, carrera, cuatrimestre } = body

  if (!nombre || !correo) {
    return NextResponse.json({ error: 'Nombre y correo son obligatorios' }, { status: 400 })
  }

  try {
    await pool.query(
      `INSERT INTO estudiantes (nombre, correo, carrera, cuatrimestre, indice, creditos, estado)
       VALUES ($1, $2, $3, $4, 0, 0, 'Activo')`,
      [nombre, correo, carrera, cuatrimestre]
    )
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
