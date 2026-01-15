'use client'

import { useEffect, useState } from 'react'

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [toc, setToc] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    // Extraer H2 y H3 del contenido
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const headings = doc.querySelectorAll('h2, h3')

    const items: TOCItem[] = Array.from(headings).map((heading, index) => {
      const id = heading.id || `heading-${index}`
      if (!heading.id) {
        heading.id = id
      }
      return {
        id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName[1]),
      }
    })

    setToc(items)

    // Intersection Observer para active state
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -80% 0px' }
    )

    headings.forEach((h) => observer.observe(h))

    return () => observer.disconnect()
  }, [content])

  if (toc.length === 0) return null

  return (
    <nav className="sticky top-24 max-h-screen overflow-auto p-6 bg-gray-900 rounded-lg border border-gray-800">
      <h4 className="font-bold mb-4 text-white">En este artículo</h4>
      <ul className="space-y-2">
        {toc.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 2) * 16}px` }}
          >
            <a
              href={`#${item.id}`}
              className={`text-sm hover:text-orange-500 transition block ${
                activeId === item.id
                  ? 'text-orange-500 font-semibold'
                  : 'text-gray-400'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
