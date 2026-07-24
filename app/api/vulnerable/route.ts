import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// VULNERABLE A PROPOSITO: el termino de busqueda llega tal cual del usuario
// y se pasa a una funcion de Postgres que arma el SQL por concatenacion.
// No hay validacion, ni escapado, ni longitud maxima.
export async function GET(req: NextRequest) {
  const termino = req.nextUrl.searchParams.get('q') || ''

  const { data, error } = await supabase.rpc('buscar_estudiantes_vulnerable', {
    termino,
  })

  if (error) {
    // A proposito devolvemos el mensaje de error completo de Postgres:
    // esto tambien es un hallazgo (fuga de informacion / verbose errors)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}
