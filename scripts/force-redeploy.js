#!/usr/bin/env node

/**
 * Script para forzar un nuevo deploy en Vercel
 * 
 * Uso:
 *   node scripts/force-redeploy.js
 * 
 * Este script crea un commit vacío para forzar un nuevo deploy
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🚀 Forzando nuevo deploy en Vercel...\n')

try {
  // Verificar que estamos en un repositorio git
  try {
    execSync('git rev-parse --git-dir', { stdio: 'ignore' })
  } catch (error) {
    console.error('❌ Error: No estás en un repositorio git')
    process.exit(1)
  }

  // Verificar que estamos en la rama main
  const currentBranch = execSync('git branch --show-current', { encoding: 'utf-8' }).trim()
  if (currentBranch !== 'main' && currentBranch !== 'master') {
    console.warn(`⚠️  Advertencia: Estás en la rama "${currentBranch}", no en "main"`)
    console.warn('   El deploy se hará en la rama actual\n')
  }

  // Crear un archivo temporal con timestamp para forzar cambio
  const timestamp = new Date().toISOString()
  const tempFile = path.join(__dirname, '..', '.vercel-deploy-trigger')
  fs.writeFileSync(tempFile, timestamp)

  // Añadir el archivo temporal
  execSync('git add .vercel-deploy-trigger', { stdio: 'inherit' })

  // Crear commit vacío
  const commitMessage = `chore: forzar redeploy - ${timestamp}`
  execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' })

  // Push a la rama actual
  console.log(`\n📤 Haciendo push a la rama "${currentBranch}"...`)
  execSync(`git push origin ${currentBranch}`, { stdio: 'inherit' })

  // Eliminar el archivo temporal
  fs.unlinkSync(tempFile)
  execSync('git add .vercel-deploy-trigger', { stdio: 'ignore' })
  execSync('git commit -m "chore: eliminar archivo temporal"', { stdio: 'ignore' })
  execSync(`git push origin ${currentBranch}`, { stdio: 'ignore' })

  console.log('\n✅ Deploy forzado exitosamente!')
  console.log('⏳ Espera 1-2 minutos y verifica en Vercel Dashboard')
  console.log('🌐 URL: https://vercel.com/dashboard\n')

} catch (error) {
  console.error('\n❌ Error al forzar deploy:', error.message)
  console.log('\n💡 Alternativa: Hazlo manualmente:')
  console.log('   1. git commit --allow-empty -m "Forzar redeploy"')
  console.log('   2. git push origin main\n')
  process.exit(1)
}
