#!/usr/bin/env node

/**
 * Script para crear un usuario administrador
 * 
 * Uso: node scripts/create-admin-user.js <email> <password>
 * 
 * Requiere: SUPABASE_SERVICE_ROLE_KEY en variables de entorno
 */

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Faltan variables de entorno:')
  console.error('   - NEXT_PUBLIC_SUPABASE_URL')
  console.error('   - SUPABASE_SERVICE_ROLE_KEY')
  console.error('\n💡 Agrega SUPABASE_SERVICE_ROLE_KEY a tu .env.local')
  process.exit(1)
}

const email = process.argv[2]
const password = process.argv[3]

if (!email || !password) {
  console.error('❌ Uso: node scripts/create-admin-user.js <email> <password>')
  console.error('\nEjemplo:')
  console.error('   node scripts/create-admin-user.js admin@thinkia.com MiPassword123!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function createAdminUser() {
  console.log('🔐 Creando usuario administrador...\n')
  console.log(`📧 Email: ${email}`)
  console.log('⏳ Procesando...\n')

  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email: email.trim().toLowerCase(),
      password: password,
      email_confirm: true,
      user_metadata: {
        role: 'admin',
      },
    })

    if (error) {
      console.error('❌ Error al crear usuario:', error.message)
      
      if (error.message.includes('already registered')) {
        console.error('\n💡 El usuario ya existe. Intenta con otro email o inicia sesión directamente.')
      }
      
      process.exit(1)
    }

    console.log('✅ Usuario creado exitosamente!')
    console.log(`\n📋 Detalles:`)
    console.log(`   ID: ${data.user.id}`)
    console.log(`   Email: ${data.user.email}`)
    console.log(`   Confirmado: ${data.user.email_confirmed_at ? 'Sí' : 'No'}`)
    console.log(`\n🚀 Ahora puedes acceder a:`)
    console.log(`   http://localhost:3000/login`)
    console.log(`\n📝 Credenciales:`)
    console.log(`   Email: ${email}`)
    console.log(`   Password: ${password}`)
  } catch (error) {
    console.error('❌ Error inesperado:', error.message)
    process.exit(1)
  }
}

createAdminUser()
