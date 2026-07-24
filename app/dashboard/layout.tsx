'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) router.replace('/login')
  }, [user, loading, router])

  if (loading || !user) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A2540]">
      <div className="text-center">
        <div className="w-14 h-14 bg-[#00C4A0] rounded-2xl flex items-center justify-center mx-auto mb-3 text-xl font-bold text-[#0A2540]" style={{fontFamily:'Space Grotesk'}}>TV</div>
        <div className="text-white/50 text-sm">Cargando sesión...</div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
