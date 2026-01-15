#!/usr/bin/env node

/**
 * Post-build optimizations
 * Verifica que el build se haya completado correctamente
 */

const fs = require('fs')
const path = require('path')

console.log('🔍 Verificando build...\n')

const buildDir = path.join(process.cwd(), '.next')

if (!fs.existsSync(buildDir)) {
  console.error('❌ El directorio .next no existe. El build falló.')
  process.exit(1)
}

// Verificar archivos críticos
const criticalFiles = [
  '.next/static/chunks/webpack.js',
  '.next/BUILD_ID',
]

let hasErrors = false

criticalFiles.forEach((file) => {
  const filePath = path.join(process.cwd(), file)
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`)
  } else {
    console.error(`❌ Archivo faltante: ${file}`)
    hasErrors = true
  }
})

if (hasErrors) {
  console.error('\n❌ El build parece estar incompleto.')
  process.exit(1)
}

console.log('\n✅ Build completado correctamente.')
console.log('📦 Listo para deploy.\n')
