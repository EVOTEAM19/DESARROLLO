/**
 * Funciones de generación de Schema.org para uso en Server Components
 * Estas funciones son puras y no requieren 'use client'
 */

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
