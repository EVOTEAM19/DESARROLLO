import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { AdminLayout } from '@/components/admin/AdminLayout'

// Lazy load del AdminLayout para reducir bundle inicial
const AdminLayoutClient = dynamic(
  () => import('@/components/admin/AdminLayout').then((mod) => ({ default: mod.AdminLayout })),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground-muted">Cargando panel de administración...</p>
        </div>
      </div>
    ),
  }
)

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground-muted">Cargando...</p>
        </div>
      </div>
    }>
      <AdminLayoutClient title="Admin">
        {children}
      </AdminLayoutClient>
    </Suspense>
  )
}
