/**
 * Funciones de autenticación para el panel admin
 * Usa Supabase Auth para gestionar sesiones
 */

import { createBrowserClient, createServerClient, getCurrentUser, getCurrentUserServer } from './supabase'

/**
 * Inicia sesión con email y contraseña
 */
export async function login(email: string, password: string) {
  try {
    const supabase = createBrowserClient()
    
    // Log para debugging (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      console.log('[Auth] Intentando login para:', email.trim().toLowerCase())
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    })

    if (error) {
      // Mensajes de error más descriptivos para debugging
      console.error('[Auth] Error de autenticación:', {
        message: error.message,
        status: error.status,
        name: error.name,
      })
      
      // Verificar el tipo de error específico
      const errorMessage = error.message.toLowerCase()
      
      if (errorMessage.includes('invalid login credentials') || 
          errorMessage.includes('invalid_credentials') ||
          errorMessage.includes('invalid password') ||
          error.status === 400) {
        return {
          success: false,
          error: 'Credenciales inválidas. Por favor, verifica tu email y contraseña. Si olvidaste tu contraseña, puedes resetearla desde Supabase Dashboard.',
        }
      }
      
      if (errorMessage.includes('email not confirmed') || 
          errorMessage.includes('email_not_confirmed')) {
        return {
          success: false,
          error: 'Por favor, confirma tu email antes de iniciar sesión. Ve a Supabase Dashboard > Authentication > Users y confirma tu email.',
        }
      }
      
      if (errorMessage.includes('user not found') || 
          errorMessage.includes('user_not_found')) {
        return {
          success: false,
          error: 'Usuario no encontrado. Verifica que el usuario exista en Supabase Dashboard.',
        }
      }
      
      if (errorMessage.includes('too many requests') || 
          error.status === 429) {
        return {
          success: false,
          error: 'Demasiados intentos. Por favor, espera unos minutos antes de intentar nuevamente.',
        }
      }
      
      // Error genérico con detalles para debugging
      return {
        success: false,
        error: `Error al iniciar sesión: ${error.message || 'Error desconocido'}. Código: ${error.status || 'N/A'}`,
      }
    }

    // Verificar que la sesión se creó correctamente
    if (!data.session) {
      console.error('[Auth] Login exitoso pero sin sesión')
      return {
        success: false,
        error: 'Error al crear la sesión. Por favor, intenta nuevamente.',
      }
    }

    // Log exitoso (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      console.log('[Auth] Login exitoso para:', data.user?.email)
    }

    return {
      success: true,
      user: data.user,
      session: data.session,
    }
  } catch (err: any) {
    console.error('[Auth] Excepción durante login:', err)
    return {
      success: false,
      error: `Error inesperado: ${err?.message || 'Error desconocido'}. Por favor, verifica tu conexión e intenta nuevamente.`,
    }
  }
}

/**
 * Cierra la sesión del usuario actual
 */
export async function logout() {
  const supabase = createBrowserClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    return {
      success: false,
      error: 'Error al cerrar sesión. Por favor, intenta nuevamente.',
    }
  }

  return {
    success: true,
  }
}

/**
 * Verifica si el usuario está autenticado (cliente)
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return user !== null
}

/**
 * Verifica si el usuario está autenticado (servidor)
 */
export async function isAuthenticatedServer(): Promise<boolean> {
  const user = await getCurrentUserServer()
  return user !== null
}

/**
 * Obtiene la sesión actual (servidor)
 * Usado en middleware para verificar autenticación
 * IMPORTANTE: Solo usar en Server Components o Server Actions
 */
export async function getSession() {
  try {
    const supabase = await createServerClient()
    
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()

    if (error || !session) {
      return null
    }

    return session
  } catch (error) {
    console.error('Error obteniendo sesión:', error)
    return null
  }
}

/**
 * Obtiene el usuario actual (servidor)
 */
export async function getServerUser() {
  try {
    const user = await getCurrentUserServer()
    return user
  } catch (error) {
    console.error('Error obteniendo usuario:', error)
    return null
  }
}
