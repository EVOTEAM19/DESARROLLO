'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { StructuredData } from './StructuredData'

interface BreadcrumbItem {
  name: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [
    { name: 'Inicio', href: '/' },
    ...items,
  ]

  // Schema markup
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fastia.es'}${item.href}`,
    })),
  }

  return (
    <>
      <StructuredData schema={breadcrumbSchema} />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-gray-400">
          {allItems.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index === 0 ? (
                <Link
                  href={item.href}
                  className="hover:text-orange-500 transition-colors"
                  aria-label="Inicio"
                >
                  <Home className="w-4 h-4" />
                </Link>
              ) : (
                <>
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                  {index === allItems.length - 1 ? (
                    <span className="text-white font-medium">{item.name}</span>
                  ) : (
                    <Link
                      href={item.href}
                      className="hover:text-orange-500 transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
