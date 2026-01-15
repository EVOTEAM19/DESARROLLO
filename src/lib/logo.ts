import { createPublicClient } from './supabase'

/**
 * Obtiene la URL del logo desde site_settings
 */
export async function getLogoUrl(): Promise<string | null> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'logo_url')
      .single()

    if (error) {
      console.error('Error obteniendo logo:', error)
      return null
    }

    if (!data?.value) return null

    // Parsear JSON si es string
    if (typeof data.value === 'string') {
      try {
        return JSON.parse(data.value)
      } catch {
        return data.value
      }
    }

    return data.value
  } catch (error) {
    console.error('Error en getLogoUrl:', error)
    return null
  }
}
