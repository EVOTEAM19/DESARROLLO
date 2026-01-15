/**
 * Utilidades de Analytics para FastIA
 * Integración con Google Analytics 4, Meta Pixel, LinkedIn Insight Tag
 */

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
    dataLayer?: any[]
    fbq?: (command: string, event: string, params?: Record<string, any>) => void
    lintrk?: (command: string, params?: Record<string, any>) => void
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

/**
 * Verifica si Google Analytics está disponible
 */
export function isAnalyticsEnabled(): boolean {
  return typeof window !== 'undefined' && !!GA_MEASUREMENT_ID && !!window.gtag
}

/**
 * Trackea un evento personalizado
 * @param eventName - Nombre del evento
 * @param eventData - Datos adicionales del evento
 */
export function trackEvent(eventName: string, eventData?: Record<string, any>) {
  if (!isAnalyticsEnabled()) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics] Event tracked:', eventName, eventData)
    }
    return
  }

  window.gtag!('event', eventName, eventData)
}

/**
 * Trackea el envío de un formulario
 * @param formName - Nombre del formulario
 * @param formData - Datos del formulario (opcional)
 */
export function trackFormSubmit(formName: string, formData?: Record<string, any>) {
  trackEvent('form_submit', {
    form_name: formName,
    ...formData,
  })
}

/**
 * Trackea una conversión
 * @param conversionName - Nombre de la conversión
 * @param value - Valor de la conversión (opcional)
 */
export function trackConversion(conversionName: string, value?: number) {
  trackEvent('conversion', {
    conversion_name: conversionName,
    value: value,
  })
}

/**
 * Trackea un click en un CTA
 * @param ctaName - Nombre del CTA
 * @param location - Ubicación del CTA en la página
 */
export function trackCTAClick(ctaName: string, location: string) {
  trackEvent('cta_click', {
    cta_name: ctaName,
    location: location,
  })
}

/**
 * Trackea la visualización de una página
 * @param pagePath - Ruta de la página
 * @param pageTitle - Título de la página (opcional)
 */
export function trackPageView(pagePath: string, pageTitle?: string) {
  if (!isAnalyticsEnabled()) return

  window.gtag!('config', GA_MEASUREMENT_ID!, {
    page_path: pagePath,
    page_title: pageTitle,
  })
}

/**
 * Trackea un error
 * @param errorMessage - Mensaje de error
 * @param errorLocation - Ubicación del error (opcional)
 */
export function trackError(errorMessage: string, errorLocation?: string) {
  trackEvent('exception', {
    description: errorMessage,
    fatal: false,
    location: errorLocation,
  })
}

/**
 * Trackea la descarga de un archivo
 * @param fileName - Nombre del archivo
 * @param fileType - Tipo de archivo
 */
export function trackDownload(fileName: string, fileType?: string) {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType,
  })
}

/**
 * Trackea la visualización de un video
 * @param videoTitle - Título del video
 * @param videoDuration - Duración del video en segundos
 */
export function trackVideoView(videoTitle: string, videoDuration?: number) {
  trackEvent('video_view', {
    video_title: videoTitle,
    video_duration: videoDuration,
  })
}

/**
 * Trackea la búsqueda en el sitio
 * @param searchTerm - Término de búsqueda
 * @param resultsCount - Número de resultados (opcional)
 */
export function trackSearch(searchTerm: string, resultsCount?: number) {
  trackEvent('search', {
    search_term: searchTerm,
    results_count: resultsCount,
  })
}

/**
 * Trackea un lead generado
 * @param source - Fuente del lead (form, phone, email, etc.)
 */
export function trackLead(source: string) {
  trackEvent('generate_lead', {
    event_category: 'Conversions',
    event_label: source,
  })
}

/**
 * Trackea la visualización de un servicio
 * @param serviceName - Nombre del servicio
 */
export function trackServiceView(serviceName: string) {
  trackEvent('service_view', {
    event_category: 'Services',
    event_label: serviceName,
  })
}

/**
 * Trackea un evento en Meta Pixel (Facebook)
 * @param eventName - Nombre del evento (PageView, Lead, Contact, etc.)
 * @param eventData - Datos adicionales del evento
 */
export function trackMetaPixelEvent(eventName: string, eventData?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    ;(window as any).fbq('track', eventName, eventData || {})
  }
}

/**
 * Trackea un evento en LinkedIn Insight Tag
 * @param eventName - Nombre del evento
 * @param eventData - Datos adicionales del evento
 */
export function trackLinkedInEvent(eventName: string, eventData?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).lintrk) {
    ;(window as any).lintrk('track', { conversion_id: eventName, ...eventData })
  }
}

/**
 * Trackea un CTA click con todos los sistemas de tracking
 * @param ctaName - Nombre del CTA
 * @param location - Ubicación del CTA
 * @param url - URL a la que lleva el CTA
 */
export function trackCTAClickAll(ctaName: string, location: string, url?: string) {
  // Google Analytics
  trackCTAClick(ctaName, location)
  
  // Meta Pixel
  trackMetaPixelEvent('Contact', {
    content_name: ctaName,
    content_category: 'CTA',
    content_location: location,
  })
  
  // LinkedIn
  trackLinkedInEvent('CTA_Click', {
    cta_name: ctaName,
    location: location,
    url: url || (typeof window !== 'undefined' ? window.location.href : ''),
  })
}
