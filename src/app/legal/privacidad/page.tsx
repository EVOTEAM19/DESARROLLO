import { redirect } from 'next/navigation'

/**
 * Redirección de /legal/privacidad a /legal/privacy
 * Mantiene compatibilidad con enlaces antiguos
 */
export default function PrivacidadPage() {
  redirect('/legal/privacy')
}
