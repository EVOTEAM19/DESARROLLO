#!/usr/bin/env node

/**
 * Script para actualizar la contraseña de un usuario existente
 * 
 * Uso: node scripts/update-user-password.js <email> <new-password>
 * 
 * Requiere: SUPABASE_SERVICE_ROLE_KEY en variables de entorno
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Cargar .env.local manualmente
const envPath = path.join(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8')
  const lines = envFile.split(/\r?\n/)
  
  lines.forEach((line) => {
    const trimmedLine = line.trim()
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const equalIndex = trimmedLine.indexOf('=')
      if (equalIndex > 0) {
        const key = trimmedLine.substring(0, equalIndex).trim()
        const value = trimmedLine.substring(equalIndex + 1).trim()
        if (!process.env[key] && key && value) {
          process.env[key] = value
        }
      }
    }
  })
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Faltan variables de entorno:')
  console.error('   - NEXT_PUBLIC_SUPABASE_URL')
  console.error('   - SUPABASE_SERVICE_ROLE_KEY')
  console.error('\n💡 Verifica que estas variables estén en tu .env.local')
  process.exit(1)
}

const email = process.argv[2]
const newPassword = process.argv[3]

if (!email || !newPassword) {
  console.error('❌ Uso: node scripts/update-user-password.js <email> <new-password>')
  console.error('\nEjemplo:')
  console.error('   node scripts/update-user-password.js alvaro@pospon.es NuevaPassword123!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function updateUserPassword() {
  console.log('🔐 Actualizando contraseña de usuario...\n')
  console.log(`📧 Email: ${email}`)
  console.log('⏳ Procesando...\n')

  try {
    // Primero, obtener el usuario por email
    const { data: users, error: listError } = await supabase.auth.admin.listUsers()
    
    if (listError) {
      console.error('❌ Error al listar usuarios:', listError.message)
      process.exit(1)
    }

    const user = users.users.find(u => u.email?.toLowerCase() === email.trim().toLowerCase())

    if (!user) {
      console.error(`❌ Usuario no encontrado: ${email}`)
      console.error('\n💡 Verifica que el email sea correcto en Supabase Dashboard')
      process.exit(1)
    }

    console.log(`✅ Usuario encontrado: ${user.email} (ID: ${user.id})`)

    // Actualizar la contraseña
    const { data, error } = await supabase.auth.admin.updateUserById(
      user.id,
      {
        password: newPassword,
      }
    )

    if (error) {
      console.error('❌ Error al actualizar contraseña:', error.message)
      process.exit(1)
    }

    console.log('\n✅ Contraseña actualizada exitosamente!')
    console.log(`\n📋 Detalles:`)
    console.log(`   Email: ${data.user.email}`)
    console.log(`   ID: ${data.user.id}`)
    console.log(`   Actualizado: ${new Date().toLocaleString()}`)
    console.log(`\n🚀 Ahora puedes acceder a:`)
    console.log(`   http://localhost:3001/login`)
    console.log(`\n📝 Credenciales:`)
    console.log(`   Email: ${email}`)
    console.log(`   Password: ${newPassword}`)
    console.log(`\n⚠️  Guarda esta contraseña de forma segura!`)
  } catch (error) {
    console.error('❌ Error inesperado:', error.message)
    process.exit(1)
  }
}

updateUserPassword()
