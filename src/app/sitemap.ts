import { MetadataRoute } from 'next'
import { getServices, getBlogPosts } from '@/lib/api'

export const revalidate = 3600 // Revalidar cada hora
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fastia.es'
  const now = new Date()

  // Páginas estáticas principales
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/the-modal`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/productos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reflexiones`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sectores`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Productos IA
    {
      url: `${baseUrl}/productos-ia/ia-empresas`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/productos-ia/ia-startups`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/productos-ia/todos-productos`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Páginas legales
    {
      url: `${baseUrl}/legal/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/cookies`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    // Servicios individuales estáticos
    {
      url: `${baseUrl}/servicios/desarrollo-apps-moviles`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/servicios/plataformas-web-ia`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/servicios/automatizacion-ia`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/servicios/cto-as-a-service`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/servicios/migraciones-cloud`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/servicios/mantenimiento`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/servicios/ia-conversacional`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/servicios/analisis-predictivo`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/servicios/procesamiento-datos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/servicios/automatizacion-inteligente`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/servicios/seguridad-ia`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Páginas dinámicas de servicios
  let servicePages: MetadataRoute.Sitemap = []
  try {
    const services = await getServices()
    servicePages = services.map((service) => ({
      url: `${baseUrl}/servicios/${service.slug}`,
      lastModified: service.updated_at ? new Date(service.updated_at) : now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch (error) {
    console.error('Error fetching services for sitemap:', error)
  }

  // Páginas dinámicas de blog (reflexiones)
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const blogPosts = await getBlogPosts(500) // Aumentar límite para incluir todos los posts
    blogPages = blogPosts.map((post) => ({
      url: `${baseUrl}/reflexiones/${post.slug}`,
      lastModified: post.updated_at 
        ? new Date(post.updated_at) 
        : post.published_at 
        ? new Date(post.published_at) 
        : post.created_at 
        ? new Date(post.created_at) 
        : now,
      changeFrequency: 'weekly' as const,
      priority: post.is_featured ? 0.7 : 0.6,
    }))
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
  }

  // Combinar y ordenar por prioridad (mayor a menor)
  const allPages = [...staticPages, ...servicePages, ...blogPages]
  allPages.sort((a, b) => (b.priority || 0) - (a.priority || 0))

  return allPages
}
