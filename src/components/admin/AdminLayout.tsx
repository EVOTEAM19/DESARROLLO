'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  FileText,
  Package,
  Briefcase,
  BookOpen,
  Image as ImageIcon,
  Settings,
  LogOut,
  User,
  Menu,
  X,
  Building2,
  Layers,
  BarChart3,
  Edit3,
} from 'lucide-react'
import { getCurrentUser } from '@/lib/supabase'
import { logout } from '@/lib/auth'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: BarChart3, label: 'Métricas', href: '/admin/analytics' },
  { icon: Edit3, label: 'Contenido', href: '/admin/content' },
  { icon: Building2, label: 'Clientes', href: '/admin/clients' },
  { icon: BookOpen, label: 'Blog', href: '/admin/blog' },
  { icon: ImageIcon, label: 'Media', href: '/admin/media' },
  { icon: Settings, label: 'Configuración', href: '/admin/settings' },
]

interface AdminLayoutProps {
  children: React.ReactNode
  title?: string
}

export function AdminLayout({ children, title = 'Admin' }: AdminLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsCheckingAuth(true)
        
        // Dar tiempo para que la sesión se sincronice después del login
        await new Promise(resolve => setTimeout(resolve, 100))
        
        // Intentar obtener el usuario con múltiples intentos si es necesario
        let currentUser = await getCurrentUser()
        
        // Si no hay usuario, intentar una vez más después de un breve delay
        if (!currentUser) {
          await new Promise(resolve => setTimeout(resolve, 200))
          currentUser = await getCurrentUser()
        }
        
        if (!currentUser) {
          console.warn('[AdminLayout] No se encontró usuario, redirigiendo a login')
          router.push('/login?redirect=' + encodeURIComponent(pathname))
          return
        }
        
        setUser(currentUser)
      } catch (error) {
        console.error('[AdminLayout] Error verificando autenticación:', error)
        router.push('/login?redirect=' + encodeURIComponent(pathname))
      } finally {
        setIsCheckingAuth(false)
      }
    }

    checkAuth()
  }, [router, pathname])

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  // Mostrar loading mientras se verifica la autenticación
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground-muted">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-[#f5f5f5]">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#1a1a1a] border-r border-foreground/10 transform transition-transform duration-300 ease-in-out lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo y toggle móvil */}
          <div className="flex items-center justify-between p-6 border-b border-foreground/10">
            <h1 className="text-xl font-display font-bold text-white">FastIA Admin</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-foreground-muted hover:text-white transition-colors"
              aria-label="Cerrar menú"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navegación */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive =
                pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-accent-orange-500/20 text-white border-l-4 border-accent-orange-500'
                      : 'text-foreground-muted hover:bg-foreground/10 hover:text-white'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Usuario y logout */}
          <div className="p-4 border-t border-foreground/10 space-y-2">
            {user && (
              <div className="flex items-center gap-3 px-4 py-2 text-foreground-muted">
                <User className="w-5 h-5" />
                <span className="text-sm truncate">{user.email}</span>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground-muted hover:bg-error/10 hover:text-error transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay móvil */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Área principal */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-foreground/10 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-foreground-muted hover:text-foreground transition-colors"
                aria-label="Abrir menú"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-display font-bold text-foreground">{title}</h2>
            </div>
            {user && (
              <div className="flex items-center gap-3 text-sm text-foreground-muted">
                <User className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
            )}
          </div>
        </header>

        {/* Contenido */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
