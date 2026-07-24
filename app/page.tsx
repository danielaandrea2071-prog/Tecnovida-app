'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (!loading) {
      if (user) router.replace('/dashboard')
      else router.replace('/login')
    }
  }, [user, loading, router])
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A2540]">
      <div className="text-center">
        <div className="w-16 h-16 bg-[#00C4A0] rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-[#0A2540]" style={{fontFamily:'Space Grotesk'}}>TV</div>
        <div className="text-white/60 text-sm">Cargando...</div>
      </div>
    </div>
  )
}
