import { createPublicClient } from './supabase'

/**
 * Obtiene el contenido de una sección desde site_settings.
 * Los scripts init (init_content_management, init_contacto_content) usan site_settings.
 */
export async function getSectionContent(section: string, key: string = 'content') {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('section', section)
      .eq('key', key)
      .single()

    // PGRST116 = ninguna fila con .single() (contenido no configurado aún)
    if (error?.code === 'PGRST116') return null
    // 42P01 = la tabla no existe → indicar que se ejecuten las migraciones
    if (error?.code === '42P01' || error?.message?.includes('does not exist')) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[content] Tabla site_settings no encontrada. Ejecuta las migraciones/init (init_content_management.sql o schema) en tu proyecto Supabase.`)
      }
      return null
    }
    if (error) {
      console.error(`Error obteniendo contenido de ${section}:`, error)
      return null
    }

    if (!(data as any)?.value) return null

    // Parsear JSON si es string
    if (typeof (data as any).value === 'string') {
      try {
        return JSON.parse((data as any).value)
      } catch {
        return (data as any).value
      }
    }

    return (data as any).value
  } catch (error) {
    console.error(`Error en getSectionContent(${section}):`, error)
    return null
  }
}

/**
 * Obtiene contenido de The Modal
 */
export async function getTheModalContent() {
  return await getSectionContent('the-modal', 'content')
}

/**
 * Obtiene contenido de Synapse
 */
export async function getSynapseContent() {
  return await getSectionContent('synapse', 'content')
}

/**
 * Obtiene contenido de Sectores
 */
export async function getSectoresContent() {
  return await getSectionContent('sectores', 'content')
}

/**
 * Obtiene contenido de Nosotros
 */
export async function getNosotrosContent() {
  return await getSectionContent('nosotros', 'content')
}

/**
 * Obtiene contenido de Reflexiones
 */
export async function getReflexionesContent() {
  return await getSectionContent('reflexiones', 'content')
}

/**
 * Obtiene contenido de la página de inicio
 */
export async function getHomeContent() {
  return await getSectionContent('home', 'content')
}

/**
 * Obtiene contenido de la página de contacto
 */
export async function getContactoContent() {
  return await getSectionContent('contacto', 'content')
}
