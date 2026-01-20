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
  description: 'Empresa líder en desarrollo de software con inteligencia artificial en Madrid. 6 años de experiencia, +40 desarrolladores especializados en apps móviles, automatización y plataformas web inteligentes.',
  url: 'https://www.fastia.es',
  logo: 'https://www.fastia.es/logo.png',
  image: 'https://www.fastia.es/og-image.jpg',
  foundingDate: '2014',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle Columela, 9',
    addressLocality: 'Madrid',
    addressRegion: 'Madrid',
    postalCode: '28001',
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
    email: 'hola@fastia.es',
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
    streetAddress: 'Calle Columela, 9',
    addressLocality: 'Madrid',
    addressRegion: 'Madrid',
    postalCode: '28001',
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
    streetAddress: 'Calle Columela, 9',
    addressLocality: 'Madrid',
    postalCode: '28001',
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

// ProfessionalService - SEO freelance / CTO
export const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'FastIA - Desarrollo Freelance',
  description:
    'Desarrolladores freelance expertos en apps móviles, web y software. MVP en 8 semanas. CTO as a Service para startups.',
  url: 'https://www.fastia.es',
  telephone: '+34910123456',
  email: 'hola@fastia.es',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle Columela, 9',
    addressLocality: 'Madrid',
    postalCode: '28001',
    addressCountry: 'ES',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '40.4168',
    longitude: '-3.7038',
  },
  priceRange: '€€',
  areaServed: ['Madrid', 'Barcelona', 'Sevilla', 'España'],
  serviceType: [
    'Desarrollo de aplicaciones móviles',
    'Desarrollo web',
    'Desarrollo de software a medida',
    'CTO as a Service',
    'Consultoría tecnológica',
    'Desarrollo freelance',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '47',
  },
  sameAs: [
    'https://linkedin.com/company/fastia',
    'https://twitter.com/fastia',
    'https://github.com/fastia',
  ],
}

// Re-exportar funciones de schemas.ts para compatibilidad hacia atrás
// Nota: Estas funciones deben importarse desde '@/lib/schemas' en Server Components
export { generateServiceSchema, generateArticleSchema } from '@/lib/schemas'
