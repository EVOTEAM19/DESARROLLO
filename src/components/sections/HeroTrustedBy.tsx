'use client'

import { useState } from 'react'
import Image from 'next/image'

const BRANDS = [
  { name: 'Movistar', logo: '/logos/Movistar_isotype_2025.png' },
  { name: 'Iberdrola', logo: '/logos/Logo-Iberdrola.png' },
  { name: 'Amazon', logo: '/logos/Amazon-logo2.png' },
  { name: 'Red Bull', logo: '/logos/Logo_of_Red_bull.svg.png' },
  { name: 'LG', logo: '/logos/LG-Logo.webp' },
] as const

const LOGO_HEIGHT = 40

function BrandLogo({ name, logo }: { name: string; logo: string }) {
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    return (
      <div className="flex items-center justify-center shrink-0" style={{ height: LOGO_HEIGHT }}>
        <span className="text-white font-semibold text-sm tracking-tight whitespace-nowrap opacity-90">
          {name}
        </span>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center shrink-0" style={{ height: LOGO_HEIGHT }}>
      <Image
        src={logo}
        alt={name}
        width={120}
        height={LOGO_HEIGHT}
        className="object-contain w-auto opacity-90 hover:opacity-100 transition-opacity"
        style={{ height: LOGO_HEIGHT, filter: 'brightness(0) invert(1)' }}
        unoptimized
        onError={() => setImgError(true)}
      />
    </div>
  )
}

export function HeroTrustedBy() {
  return (
    <section className="py-8 md:py-10 bg-gray-900 border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-nowrap items-center justify-center gap-8 md:gap-12 overflow-x-auto">
          {BRANDS.map((brand) => (
            <BrandLogo key={brand.logo} name={brand.name} logo={brand.logo} />
          ))}
        </div>
      </div>
    </section>
  )
}
