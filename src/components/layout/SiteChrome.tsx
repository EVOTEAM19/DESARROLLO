'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')
  const isHome = pathname === '/'

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      {/* La home tiene un hero full-bleed; el resto de páginas dejan hueco bajo el header fijo (topbar + nav) */}
      <main className={`min-h-screen ${isHome ? '' : 'pt-[6.5rem]'}`}>{children}</main>
      <Footer />
    </>
  )
}

