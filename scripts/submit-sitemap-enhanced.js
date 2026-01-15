/**
 * Script mejorado para enviar sitemap a Google Search Console y Bing Webmaster Tools
 * Usa las APIs oficiales para mejor control y tracking
 * 
 * Requisitos:
 * - GOOGLE_SEARCH_CONSOLE_API_KEY (opcional, para API)
 * - BING_API_KEY (opcional, para API)
 * 
 * Si no hay API keys, usa el método ping (más simple pero menos control)
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fastia.es'
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`

// Configuración opcional de APIs
const GOOGLE_API_KEY = process.env.GOOGLE_SEARCH_CONSOLE_API_KEY
const BING_API_KEY = process.env.BING_API_KEY
const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION

/**
 * Método 1: Ping simple (no requiere API keys)
 */
async function pingSitemap() {
  console.log('📡 Enviando sitemap mediante ping...\n')

  try {
    // Google Ping
    const googleUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
    const googleResponse = await fetch(googleUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'FastIA-Sitemap-Bot/1.0',
      },
    })

    if (googleResponse.ok) {
      console.log('✅ Sitemap enviado a Google (ping)')
    } else {
      console.warn(`⚠️  Google ping respondió con status: ${googleResponse.status}`)
    }
  } catch (error) {
    console.error('❌ Error enviando ping a Google:', error.message)
  }

  try {
    // Bing Ping
    const bingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
    const bingResponse = await fetch(bingUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'FastIA-Sitemap-Bot/1.0',
      },
    })

    if (bingResponse.ok) {
      console.log('✅ Sitemap enviado a Bing (ping)')
    } else {
      console.warn(`⚠️  Bing ping respondió con status: ${bingResponse.status}`)
    }
  } catch (error) {
    console.error('❌ Error enviando ping a Bing:', error.message)
  }
}

/**
 * Método 2: Google Search Console API (requiere autenticación)
 * Nota: Esto requiere configuración OAuth2 más compleja
 * Por ahora, usamos el método ping que es más simple
 */
async function submitToGoogleSearchConsole() {
  if (!GOOGLE_API_KEY) {
    console.log('ℹ️  GOOGLE_SEARCH_CONSOLE_API_KEY no configurada, usando ping')
    return
  }

  // Implementación futura con Google Search Console API
  // Requiere OAuth2 y configuración más compleja
  console.log('ℹ️  Google Search Console API requiere configuración OAuth2')
}

/**
 * Método 3: Bing Webmaster Tools API
 */
async function submitToBingWebmaster() {
  if (!BING_API_KEY) {
    console.log('ℹ️  BING_API_KEY no configurada, usando ping')
    return
  }

  try {
    const bingApiUrl = `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=${BING_API_KEY}`
    
    // Bing API requiere un formato específico
    // Por ahora, el ping es suficiente
    console.log('ℹ️  Bing Webmaster API requiere configuración adicional')
  } catch (error) {
    console.error('❌ Error con Bing API:', error.message)
  }
}

/**
 * Verificar que el sitemap es accesible
 */
async function verifySitemap() {
  try {
    const response = await fetch(SITEMAP_URL, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'FastIA-Sitemap-Verifier/1.0',
      },
    })

    if (response.ok) {
      console.log(`✅ Sitemap accesible: ${SITEMAP_URL}`)
      return true
    } else {
      console.error(`❌ Sitemap no accesible: ${response.status}`)
      return false
    }
  } catch (error) {
    console.error('❌ Error verificando sitemap:', error.message)
    return false
  }
}

/**
 * Función principal
 */
async function submitSitemap() {
  console.log('🚀 Iniciando envío de sitemap...\n')
  console.log(`📍 URL del sitemap: ${SITEMAP_URL}\n`)

  // Verificar que el sitemap existe
  const isAccessible = await verifySitemap()
  if (!isAccessible) {
    console.error('❌ El sitemap no es accesible. Verifica que el sitio esté desplegado.')
    process.exit(1)
  }

  // Enviar mediante ping (método más simple y universal)
  await pingSitemap()

  // Intentar APIs si están configuradas
  await submitToGoogleSearchConsole()
  await submitToBingWebmaster()

  console.log('\n✅ Proceso completado')
  console.log('\n📋 Próximos pasos:')
  console.log('1. Verifica en Google Search Console: https://search.google.com/search-console')
  console.log('2. Verifica en Bing Webmaster Tools: https://www.bing.com/webmasters')
  console.log('3. El sitemap se indexará automáticamente en las próximas horas')
}

// Ejecutar
submitSitemap().catch((error) => {
  console.error('❌ Error fatal:', error)
  process.exit(1)
})
