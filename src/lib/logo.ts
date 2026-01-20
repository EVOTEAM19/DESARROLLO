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
    console.error('Error en getLogoUrl:', error)
    return null
  }
}
