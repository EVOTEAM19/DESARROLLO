import { createPublicClient } from './supabase'

/**
 * Obtiene el contenido de una sección desde site_settings
 */
export async function getSectionContent(section: string, key: string = 'content') {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('site_content')
      .select('value')
      .eq('section', section)
      .eq('key', key)
      .single()

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
