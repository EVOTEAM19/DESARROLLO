/**
 * Script para enviar sitemap a motores de búsqueda
 * Ejecutar después de cada deploy
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fastia.es'
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`

async function submitSitemap() {
  try {
    // Google
    const googleResponse = await fetch(
      `http://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
    )
    if (googleResponse.ok) {
      console.log('✅ Sitemap enviado a Google')
    } else {
      console.warn('⚠️ Error enviando sitemap a Google:', googleResponse.status)
    }

    // Bing
    const bingResponse = await fetch(
      `http://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
    )
    if (bingResponse.ok) {
      console.log('✅ Sitemap enviado a Bing')
    } else {
      console.warn('⚠️ Error enviando sitemap a Bing:', bingResponse.status)
    }

    console.log(`\n📋 Sitemap URL: ${SITEMAP_URL}`)
    console.log('✅ Proceso completado')
  } catch (error) {
    console.error('❌ Error enviando sitemap:', error.message)
    process.exit(1)
  }
}

submitSitemap()
