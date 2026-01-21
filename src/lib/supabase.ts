import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'

// Tipos para Supabase
import type { Database } from '@/types/supabase'

// Variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validar que las variables estén configuradas
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.'
  )
}

// Singleton para el cliente del navegador (evitar múltiples instancias)
// Usar window para persistir entre hot reloads en desarrollo
let browserClient: SupabaseClient<Database> | null = null

// Clave única para almacenamiento persistente
const STORAGE_KEY = 'sb-thinkia-auth-token'
const GLOBAL_CLIENT_KEY = '__SUPABASE_CLIENT__'

/**
 * Cliente de Supabase para componentes del cliente (Client Components)
 * Usa cookies para mantener la sesión del usuario
 * Implementa patrón singleton para evitar múltiples instancias
 */
export function createBrowserClient(): SupabaseClient<Database> {
  // En el navegador, usar window para persistir entre hot reloads
  if (typeof window !== 'undefined') {
    // Verificar si ya existe una instancia en window (persistente entre hot reloads)
    if ((window as any)[GLOBAL_CLIENT_KEY]) {
      return (window as any)[GLOBAL_CLIENT_KEY]
    }
  }
  
  // Si ya existe una instancia en memoria, reutilizarla
  if (browserClient) {
    // Asegurarse de que también esté en window si estamos en el navegador
    if (typeof window !== 'undefined') {
      (window as any)[GLOBAL_CLIENT_KEY] = browserClient
    }
    return browserClient
  }
  
  // En Next.js, las variables NEXT_PUBLIC_* están disponibles tanto en servidor como cliente
  // Usar las constantes del módulo que se evalúan en build time
  const url = supabaseUrl
  const key = supabaseAnonKey
  
  // Debug: Log en desarrollo para verificar valores
  if (process.env.NODE_ENV === 'development') {
    console.log('[Supabase Client] URL:', url ? `${url.substring(0, 30)}...` : 'undefined')
    console.log('[Supabase Client] Key:', key ? `${key.substring(0, 20)}... (length: ${key.length})` : 'undefined')
  }
  
  if (!url || !key) {
    const errorMsg = 'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file and restart the server.'
    console.error('[Supabase Client Error]', errorMsg)
    console.error('  URL:', url || 'undefined')
    console.error('  Key:', key ? `${key.substring(0, 20)}...` : 'undefined')
    throw new Error(errorMsg)
  }
  
  // Validar formato básico de la key (debe ser un JWT que empieza con "eyJ")
  if (!key.startsWith('eyJ')) {
    const errorMsg = `Invalid Supabase API key format. Expected JWT starting with "eyJ", got: ${key.substring(0, 10)}...`
    console.error('[Supabase Client Error]', errorMsg)
    throw new Error('Invalid Supabase API key format. Please check your .env.local file.')
  }
  
  // Validar longitud mínima de la key
  if (key.length < 100) {
    console.warn('[Supabase Client Warning] Key seems too short:', key.length, 'characters')
  }
  
  // Crear una sola instancia del cliente
  // Usar createClientComponentClient para que maneje cookies automáticamente
  // Esto asegura que las cookies se sincronicen con el middleware
  if (typeof window !== 'undefined') {
    // En el navegador, usar createClientComponentClient para sincronizar cookies
    // Esto maneja automáticamente las cookies que el middleware puede leer
    // IMPORTANTE: createClientComponentClient tiene comportamiento singleton por defecto (isSingleton: true)
    // pero aún así implementamos nuestro propio singleton para mayor seguridad
    // @ts-ignore - createClientComponentClient devuelve un tipo compatible pero TypeScript no lo reconoce
    browserClient = createClientComponentClient<Database>()
    
    // Guardar en window INMEDIATAMENTE después de crear para evitar que se cree otra instancia
    ;(window as any)[GLOBAL_CLIENT_KEY] = browserClient
  } else {
    // En el servidor, usar createClient normal
    browserClient = createClient<Database>(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: STORAGE_KEY,
      },
    })
  }
  
  // Asegurarse de que browserClient no sea null
  if (!browserClient) {
    throw new Error('Failed to create Supabase browser client')
  }
  
  return browserClient
}

/**
 * Cliente de Supabase para Server Components
 * Accede a las cookies del servidor para mantener la sesión
 * IMPORTANTE: Solo usar en Server Components o Server Actions
 */
export async function createServerClient(): Promise<SupabaseClient<Database>> {
  // Importación dinámica para evitar errores en el cliente
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  // @ts-ignore - createServerComponentClient devuelve un tipo compatible pero TypeScript no lo reconoce
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
}

let publicClientInstance: SupabaseClient<Database> | null = null

/**
 * Cliente de Supabase básico (sin autenticación de cookies)
 * Útil para operaciones públicas o cuando no necesitas sesión.
 * Singleton para evitar múltiples instancias (y avisos "Multiple GoTrueClient").
 */
export function createPublicClient(): SupabaseClient<Database> {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.'
    )
  }
  if (publicClientInstance) return publicClientInstance
  publicClientInstance = createClient<Database>(supabaseUrl, supabaseAnonKey)
  return publicClientInstance
}

// Exportar cliente público por defecto para compatibilidad
export const supabase = createPublicClient()

// ==================== FUNCIONES HELPER DE AUTENTICACIÓN ====================

/**
 * Obtiene el usuario actual desde el cliente del navegador
 */
export async function getCurrentUser() {
  const supabase = createBrowserClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  
  if (error) {
    console.error('Error obteniendo usuario:', error)
    return null
  }
  
  return user
}

/**
 * Obtiene el usuario actual desde el servidor
 */
export async function getCurrentUserServer() {
  const supabase = await createServerClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  
  if (error) {
    console.error('Error obteniendo usuario:', error)
    return null
  }
  
  return user
}

/**
 * Inicia sesión con email y contraseña
 */
export async function signInWithEmail(email: string, password: string) {
  const supabase = createBrowserClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  return { data, error }
}

/**
 * Registra un nuevo usuario con email y contraseña
 */
export async function signUpWithEmail(email: string, password: string, options?: {
  data?: Record<string, any>
  redirectTo?: string
}) {
  const supabase = createBrowserClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options,
  })
  
  return { data, error }
}

/**
 * Cierra la sesión del usuario actual
 */
export async function signOut() {
  const supabase = createBrowserClient()
  const { error } = await supabase.auth.signOut()
  
  return { error }
}

/**
 * Envía un email de recuperación de contraseña
 * @param email - Email del usuario
 * @param redirectTo - URL de redirección (opcional, por defecto usa la URL base)
 */
export async function resetPassword(email: string, redirectTo?: string) {
  const supabase = createBrowserClient()
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectTo || `${baseUrl}/auth/reset-password`,
  })
  
  return { data, error }
}

/**
 * Actualiza la contraseña del usuario
 */
export async function updatePassword(newPassword: string) {
  const supabase = createBrowserClient()
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  })
  
  return { data, error }
}

/**
 * Obtiene la sesión actual del usuario
 */
export async function getSession() {
  const supabase = createBrowserClient()
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()
  
  return { session, error }
}

/**
 * Verifica si el usuario está autenticado
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return user !== null
}

/**
 * Verifica si el usuario está autenticado (versión servidor)
 */
export async function isAuthenticatedServer(): Promise<boolean> {
  const user = await getCurrentUserServer()
  return user !== null
}
