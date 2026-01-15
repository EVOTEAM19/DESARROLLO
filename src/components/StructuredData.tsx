'use client'

interface StructuredDataProps {
  schema: Record<string, any>
}

export function StructuredData({ schema }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  )
}

// Schemas predefinidos
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareCompany',
  name: 'FastIA',
  alternateName: 'Fast IA',
  description: 'Empresa líder en desarrollo de software con inteligencia artificial en Madrid. 11 años de experiencia, +40 desarrolladores especializados en apps móviles, automatización y plataformas web inteligentes.',
  url: 'https://www.fastia.es',
  logo: 'https://www.fastia.es/logo.png',
  image: 'https://www.fastia.es/og-image.jpg',
  foundingDate: '2014',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Gran Vía 45, 3ª planta',
    addressLocality: 'Madrid',
    addressRegion: 'Madrid',
    postalCode: '28013',
    addressCountry: 'ES',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '40.4168',
    longitude: '-3.7038',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+34-910-123-456',
    contactType: 'Sales',
    email: 'hola@fastia.com',
    areaServed: 'ES',
    availableLanguage: ['Spanish', 'English'],
  },
  sameAs: [
    'https://linkedin.com/company/fastia',
    'https://twitter.com/fastia',
    'https://github.com/fastia',
  ],
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    value: '40',
  },
  knowsAbout: [
    'Inteligencia Artificial',
    'Machine Learning',
    'Desarrollo de Software',
    'Automatización Empresarial',
    'Desarrollo Apps Móviles',
    'Cloud Computing',
    'DevOps',
    'Desarrollo Web',
  ],
  slogan: 'Transformamos ideas en soluciones inteligentes',
}

// Schema para LocalBusiness (Madrid)
export const localBusinessSchemaMadrid = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'FastIA - Madrid',
  image: 'https://www.fastia.es/office.jpg',
  '@id': 'https://www.fastia.es#madrid',
  url: 'https://www.fastia.es',
  telephone: '+34910123456',
  priceRange: '€€€',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Gran Vía 45, 3ª planta',
    addressLocality: 'Madrid',
    addressRegion: 'Madrid',
    postalCode: '28013',
    addressCountry: 'ES',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 40.4168,
    longitude: -3.7038,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
    ],
    opens: '09:00',
    closes: '18:00',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '47',
  },
}

// Schema para LocalBusiness (Barcelona)
export const localBusinessSchemaBarcelona = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'FastIA - Barcelona',
  image: 'https://www.fastia.es/office.jpg',
  '@id': 'https://www.fastia.es#barcelona',
  url: 'https://www.fastia.es',
  telephone: '+34910123456',
  priceRange: '€€€',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Passeig de Gràcia 21',
    addressLocality: 'Barcelona',
    addressRegion: 'Cataluña',
    postalCode: '08007',
    addressCountry: 'ES',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 41.3851,
    longitude: 2.1734,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
    ],
    opens: '09:00',
    closes: '18:00',
  },
}

// Schema para LocalBusiness (Sevilla)
export const localBusinessSchemaSevilla = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'FastIA - Sevilla',
  image: 'https://www.fastia.es/office.jpg',
  '@id': 'https://www.fastia.es#sevilla',
  url: 'https://www.fastia.es',
  telephone: '+34910123456',
  priceRange: '€€€',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Avenida de la Constitución 18',
    addressLocality: 'Sevilla',
    addressRegion: 'Andalucía',
    postalCode: '41001',
    addressCountry: 'ES',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.3891,
    longitude: -5.9845,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
    ],
    opens: '09:00',
    closes: '18:00',
  },
}

// Schema combinado para múltiples ubicaciones
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FastIA',
  url: 'https://www.fastia.es',
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: 'Gran Vía 45, 3ª planta',
      addressLocality: 'Madrid',
      postalCode: '28013',
      addressCountry: 'ES',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'Passeig de Gràcia 21',
      addressLocality: 'Barcelona',
      postalCode: '08007',
      addressCountry: 'ES',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'Avenida de la Constitución 18',
      addressLocality: 'Sevilla',
      postalCode: '41001',
      addressCountry: 'ES',
    },
  ],
}

export function generateServiceSchema(service: {
  name: string
  description: string
  url: string
  category?: string
  image?: string
  priceRange?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url,
    serviceType: service.category || 'Servicio de Software',
    image: service.image || 'https://www.fastia.es/og-image.jpg',
    provider: {
      '@type': 'Organization',
      name: 'FastIA',
      url: 'https://www.fastia.es',
      logo: 'https://www.fastia.es/logo.png',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Madrid',
        addressCountry: 'ES',
      },
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Madrid',
      },
      {
        '@type': 'City',
        name: 'Barcelona',
      },
      {
        '@type': 'City',
        name: 'Sevilla',
      },
      {
        '@type': 'Country',
        name: 'España',
      },
    ],
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      priceRange: service.priceRange || '€€€',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '47',
    },
  }
}

export function generateArticleSchema(article: {
  headline: string
  description: string
  image: string
  author: string
  datePublished: string
  dateModified?: string
  url?: string
  category?: string
  keywords?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    image: Array.isArray(article.image) ? article.image : [article.image],
    author: {
      '@type': 'Person',
      name: article.author,
      url: 'https://www.fastia.es/nosotros',
    },
    publisher: {
      '@type': 'Organization',
      name: 'FastIA',
      url: 'https://www.fastia.es',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.fastia.es/logo.png',
        width: 512,
        height: 512,
      },
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url || 'https://www.fastia.es',
    },
    articleSection: article.category || 'Tecnología',
    keywords: article.keywords || ['IA', 'Inteligencia Artificial', 'Desarrollo de Software'],
    inLanguage: 'es-ES',
  }
}
