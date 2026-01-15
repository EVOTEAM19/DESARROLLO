import { createPublicClient } from './supabase'
import type { Database } from '@/types/supabase'

type Product = Database['public']['Tables']['products']['Row']
type Service = Database['public']['Tables']['services']['Row']
type BlogPost = Database['public']['Tables']['blog_posts']['Row']
type SiteSetting = Database['public']['Tables']['site_settings']['Row']
type Page = Database['public']['Tables']['pages']['Row']

/**
 * Obtiene productos publicados ordenados por campo 'order'
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('published', true)
      .order('order', { ascending: true })

    if (error) {
      console.error('Error obteniendo productos:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error en getProducts:', error)
    return []
  }
}

/**
 * Obtiene servicios publicados, opcionalmente agrupados por categoría
 */
export async function getServices(category?: string): Promise<Service[]> {
  try {
    const supabase = createPublicClient()
    let query = supabase
      .from('services')
      .select('*')
      .eq('published', true)
      .order('order_index', { ascending: true })

    if (category) {
      query = query.eq('category', category)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error obteniendo servicios:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error en getServices:', error)
    return []
  }
}

/**
 * Obtiene posts del blog publicados
 * @param limit - Número máximo de posts a retornar (default: 9)
 */
export async function getBlogPosts(limit: number = 9): Promise<BlogPost[]> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error obteniendo posts del blog:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error en getBlogPosts:', error)
    return []
  }
}

/**
 * Obtiene una página por su slug
 */
export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error) {
      console.error('Error obteniendo página:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error en getPageBySlug:', error)
    return null
  }
}

/**
 * Obtiene una configuración del sitio por su key
 */
export async function getSiteSettings(key: string): Promise<any | null> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', key)
      .single()

    if (error) {
      console.error(`Error obteniendo site_settings para key "${key}":`, error)
      return null
    }

    return data?.value || null
  } catch (error) {
    console.error('Error en getSiteSettings:', error)
    return null
  }
}

/**
 * Obtiene todas las configuraciones del sitio
 */
export async function getAllSiteSettings(): Promise<Record<string, any>> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value')

    if (error) {
      console.error('Error obteniendo todas las configuraciones:', error)
      return {}
    }

    const settings: Record<string, any> = {}
    data?.forEach((item) => {
      settings[item.key] = item.value
    })

    return settings
  } catch (error) {
    console.error('Error en getAllSiteSettings:', error)
    return {}
  }
}
