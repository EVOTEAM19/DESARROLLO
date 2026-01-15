'use client'

import Link from 'next/link'

interface RelatedLink {
  title: string
  description: string
  href: string
  category?: string
}

interface InternalLinksProps {
  links: RelatedLink[]
  title?: string
}

export function InternalLinks({ 
  links, 
  title = 'Contenido relacionado' 
}: InternalLinksProps) {
  if (links.length === 0) return null

  return (
    <section className="my-16 p-8 bg-gray-900 rounded-lg border border-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-white">{title}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link, index) => (
          <Link 
            key={index}
            href={link.href}
            className="group block p-6 bg-gray-800 rounded-lg hover:bg-gray-750 hover:border-orange-500/50 border border-gray-700 transition-all"
          >
            {link.category && (
              <span className="text-xs text-orange-500 mb-2 block font-semibold">
                {link.category}
              </span>
            )}
            <h3 className="text-lg font-semibold mb-2 group-hover:text-orange-500 transition-colors text-white">
              {link.title} →
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {link.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
