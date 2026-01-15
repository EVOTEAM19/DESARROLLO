import { redirect } from 'next/navigation'

/**
 * Redirección de /legal/aviso-legal a /legal/terms
 * Mantiene compatibilidad con enlaces antiguos
 */
export default function AvisoLegalPage() {
  redirect('/legal/terms')
}
