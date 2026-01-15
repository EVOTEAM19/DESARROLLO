#!/usr/bin/env node

/**
 * Pre-build checks
 * Verifica que todas las variables de entorno necesarias estén configuradas
 */

const fs = require('fs')
const path = require('path')

// Cargar .env.local manualmente
const envPath = path.join(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  console.log(`📄 Leyendo archivo: ${envPath}\n`)
  const envFile = fs.readFileSync(envPath, 'utf8')
  const lines = envFile.split(/\r?\n/)
  
  lines.forEach((line, index) => {
    const trimmedLine = line.trim()
    // Ignorar comentarios y líneas vacías
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      // Buscar el primer signo = que separa key de value
      const equalIndex = trimmedLine.indexOf('=')
      if (equalIndex > 0) {
        const key = trimmedLine.substring(0, equalIndex).trim()
        const value = trimmedLine.substring(equalIndex + 1).trim()
        // Solo establecer si no existe ya en process.env
        if (!process.env[key] && key && value) {
          process.env[key] = value
        }
      }
    }
  })
} else {
  console.log(`⚠️  Archivo .env.local no encontrado en: ${envPath}\n`)
}

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
]

const optionalEnvVars = [
  'NEXT_PUBLIC_SITE_URL',
  'NEXT_PUBLIC_GA_MEASUREMENT_ID',
  'SUPABASE_SERVICE_ROLE_KEY',
]

console.log('🔍 Verificando variables de entorno...\n')

let hasErrors = false

// Verificar variables requeridas
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`❌ Variable requerida faltante: ${varName}`)
    hasErrors = true
  } else {
    console.log(`✅ ${varName}`)
  }
})

// Verificar variables opcionales
console.log('\n📋 Variables opcionales:')
optionalEnvVars.forEach((varName) => {
  if (process.env[varName]) {
    console.log(`✅ ${varName}`)
  } else {
    console.log(`⚠️  ${varName} (opcional)`)
  }
})

if (hasErrors) {
  console.error('\n❌ Faltan variables de entorno requeridas. Por favor, configúralas antes de continuar.')
  process.exit(1)
}

console.log('\n✅ Todas las variables de entorno requeridas están configuradas.')
console.log('🚀 Iniciando build...\n')
