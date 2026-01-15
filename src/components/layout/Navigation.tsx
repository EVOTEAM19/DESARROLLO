'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavigationProps {
  mobile?: boolean
  onLinkClick?: () => void
}

export function Navigation({ mobile = false, onLinkClick }: NavigationProps) {
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Inicio' },
    { href: '/products', label: 'Productos' },
    { href: '/services', label: 'Servicios' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contacto' },
    { href: '/admin', label: 'Admin' },
  ]

  const baseClasses = mobile
    ? 'flex flex-col space-y-4'
    : 'flex items-center space-x-6'

  return (
    <ul className={baseClasses}>
      {links.map((link) => {
        const isActive = pathname === link.href
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onLinkClick}
              className={cn(
                'transition-colors hover:text-foreground',
                isActive
                  ? 'text-foreground font-semibold'
                  : 'text-gray-600 dark:text-gray-400'
              )}
            >
              {link.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
