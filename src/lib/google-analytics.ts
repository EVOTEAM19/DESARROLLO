/**
 * Helper para Google Analytics 4 Data API
 * Centraliza la creación del cliente y carga de credenciales
 */

import { BetaAnalyticsDataClient } from '@google-analytics/data'
import path from 'path'
import fs from 'fs'

export interface GACredentials {
  type: string
  project_id: string
  private_key_id: string
  private_key: string
  client_email: string
  client_id: string
  auth_uri: string
  token_uri: string
  auth_provider_x509_cert_url: string
  client_x509_cert_url: string
}

/**
 * Carga las credenciales del Service Account desde variables de entorno
 */
export function loadGACredentials(): GACredentials | null {
  // Opción 1: Desde ruta de archivo (desarrollo local)
  if (process.env.GA4_SERVICE_ACCOUNT_KEY_PATH) {
    try {
      const keyPath = path.isAbsolute(process.env.GA4_SERVICE_ACCOUNT_KEY_PATH)
        ? process.env.GA4_SERVICE_ACCOUNT_KEY_PATH
        : path.resolve(process.cwd(), process.env.GA4_SERVICE_ACCOUNT_KEY_PATH)
      
      if (!fs.existsSync(keyPath)) {
        console.error(`[GA4] Archivo no encontrado: ${keyPath}`)
        return null
      }
      
      const keyContent = fs.readFileSync(keyPath, 'utf8')
      return JSON.parse(keyContent)
    } catch (error: any) {
      console.error('[GA4] Error cargando credenciales desde archivo:', error.message)
      return null
    }
  }

  // Opción 2: Desde string JSON (producción)
  if (process.env.GA4_SERVICE_ACCOUNT_KEY) {
    try {
      return JSON.parse(process.env.GA4_SERVICE_ACCOUNT_KEY)
    } catch (error) {
      console.error('[GA4] Error parseando GA4_SERVICE_ACCOUNT_KEY:', error)
      return null
    }
  }

  return null
}

/**
 * Crea un cliente de Google Analytics Data API
 */
export function createGAClient(): BetaAnalyticsDataClient | null {
  const credentials = loadGACredentials()
  if (!credentials) return null
  
  return new BetaAnalyticsDataClient({ credentials })
}

/**
 * Obtiene el Property ID desde variables de entorno
 */
export function getGAPropertyId(): string | null {
  return process.env.GA4_PROPERTY_ID || null
}

/**
 * Valida que GA4 esté configurado
 */
export function isGA4Configured(): boolean {
  return !!(getGAPropertyId() && loadGACredentials())
}

/**
 * Formatea duración en segundos a formato legible
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}m ${secs}s`
}

/**
 * Calcula el período anterior para comparación
 */
export function calculatePreviousPeriod(startDate: string, endDate: string): { start: string; end: string } {
  if (startDate === '7daysAgo' && endDate === 'today') {
    return { start: '14daysAgo', end: '7daysAgo' }
  }
  if (startDate === '30daysAgo' && endDate === 'today') {
    return { start: '60daysAgo', end: '30daysAgo' }
  }
  if (startDate === '90daysAgo' && endDate === 'today') {
    return { start: '180daysAgo', end: '90daysAgo' }
  }

  try {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diff = end.getTime() - start.getTime()
    const prevEnd = new Date(start.getTime() - 1)
    const prevStart = new Date(prevEnd.getTime() - diff)

    return {
      start: prevStart.toISOString().split('T')[0],
      end: prevEnd.toISOString().split('T')[0],
    }
  } catch {
    return { start: '14daysAgo', end: '7daysAgo' }
  }
}

/**
 * Convierte dateRange string a formato GA4
 */
export function parseDateRange(dateRange: '7d' | '30d' | '90d' | string): { startDate: string; endDate: string } {
  if (dateRange === '7d' || dateRange === '7daysAgo') {
    return { startDate: '7daysAgo', endDate: 'today' }
  }
  if (dateRange === '30d' || dateRange === '30daysAgo') {
    return { startDate: '30daysAgo', endDate: 'today' }
  }
  if (dateRange === '90d' || dateRange === '90daysAgo') {
    return { startDate: '90daysAgo', endDate: 'today' }
  }
  
  // Si es objeto con startDate y endDate
  if (typeof dateRange === 'object' && 'startDate' in dateRange && 'endDate' in dateRange) {
    return { startDate: dateRange.startDate, endDate: dateRange.endDate }
  }
  
  return { startDate: '7daysAgo', endDate: 'today' }
}
