import pool from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || ''
  if (!q) {
    const { rows } = await pool.query('SELECT * FROM estudiantes ORDER BY nombre')
    return NextResponse.json({ data: rows })
  }
  // Vulnerable a proposito: concatenacion directa, igual que la funcion de Supabase
  const sql = `SELECT * FROM estudiantes WHERE nombre ILIKE '%${q}%' OR correo ILIKE '%${q}%'`
  try {
    const { rows } = await pool.query(sql)
    return NextResponse.json({ data: rows })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}