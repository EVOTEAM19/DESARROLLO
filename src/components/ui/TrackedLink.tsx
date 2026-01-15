'use client'

import Link from 'next/link'
import { trackCTAClickAll } from '@/lib/analytics'
import { ComponentProps } from 'react'

interface TrackedLinkProps extends ComponentProps<typeof Link> {
  ctaName: string
  location: string
  children: React.ReactNode
}

/**
 * Componente Link que trackea automáticamente los clicks en CTAs
 * Trackea en Google Analytics, Meta Pixel y LinkedIn Insight Tag
 */
export function TrackedLink({ ctaName, location, href, children, onClick, ...props }: TrackedLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Trackear en todos los sistemas
    const url = typeof href === 'string' ? href : href.pathname || window.location.href
    trackCTAClickAll(ctaName, location, url)
    
    // Ejecutar onClick personalizado si existe
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
