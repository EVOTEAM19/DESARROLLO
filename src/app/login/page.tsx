'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { LogIn, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { login } from '@/lib/auth'
import Link from 'next/link'

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Por favor, ingresa un email válido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

type LoginFormData = z.infer<typeof loginSchema>

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  })

  // Verificar si hay un redirect en los query params
  const redirectTo = searchParams.get('redirect') || '/admin'

  // Verificar si ya está autenticado
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { createBrowserClient } = await import('@/lib/supabase')
        const supabase = createBrowserClient()
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session) {
          router.push(redirectTo)
        }
      } catch (error) {
        // Ignorar errores en verificación inicial
      }
    }

    checkAuth()
  }, [router, redirectTo])

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError('')

    try {
      const result = await login(data.email, data.password)

      if (result.success) {
        // Esperar un momento para que la sesión y las cookies se establezcan completamente
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Verificar que la sesión esté establecida antes de redirigir
        const { createBrowserClient } = await import('@/lib/supabase')
        const supabase = createBrowserClient()
        
        // Intentar obtener la sesión con múltiples intentos
        let session = null
        for (let i = 0; i < 5; i++) {
          const { data: { session: currentSession } } = await supabase.auth.getSession()
          if (currentSession) {
            session = currentSession
            console.log('[Login] Sesión confirmada, redirigiendo...')
            break
          }
          console.log(`[Login] Intento ${i + 1}/5: Esperando sesión...`)
          await new Promise(resolve => setTimeout(resolve, 200))
        }
        
        if (session) {
          // Usar window.location.href para forzar recarga completa y sincronizar cookies
          console.log('[Login] Redirigiendo a:', redirectTo)
          window.location.href = redirectTo
        } else {
          console.error('[Login] No se pudo establecer la sesión después de múltiples intentos')
          setError('Error: La sesión no se estableció correctamente. Por favor, intenta nuevamente.')
          setIsLoading(false)
        }
      } else {
        setError(result.error || 'Error al iniciar sesión')
        setIsLoading(false)
      }
    } catch (err: any) {
      console.error('Login error:', err)
      setError(err?.message || 'Error inesperado. Por favor, intenta nuevamente.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card del formulario */}
        <div className="bg-background-secondary rounded-2xl p-8 md:p-10 border border-foreground/10 shadow-xl">
          {/* Logo y título */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-blue-500 to-accent-purple-600 mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2 text-foreground">
              Iniciar Sesión
            </h1>
            <p className="text-foreground-muted">
              Accede al panel de administración
            </p>
          </div>

          {/* Mensaje de error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-error flex-shrink-0" />
              <p className="text-error text-sm font-medium">{error}</p>
            </motion.div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            {/* Campo: Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2 text-foreground"
              >
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                aria-required="true"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-background text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-error focus:ring-error/20 focus:border-error'
                    : 'border-foreground/20 focus:ring-accent-blue-500/20 focus:border-accent-blue-500'
                }`}
                placeholder="tu@email.com"
                disabled={isLoading}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="email-error"
                  className="mt-2 text-sm text-error flex items-center gap-1.5"
                  role="alert"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            {/* Campo: Contraseña */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-2 text-foreground"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  aria-required="true"
                  aria-invalid={errors.password ? 'true' : 'false'}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  className={`w-full px-4 py-3 pr-12 rounded-lg border transition-all duration-200 bg-background text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 ${
                    errors.password
                      ? 'border-error focus:ring-error/20 focus:border-error'
                      : 'border-foreground/20 focus:ring-accent-blue-500/20 focus:border-accent-blue-500'
                  }`}
                  placeholder="Tu contraseña"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground transition-colors"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="password-error"
                  className="mt-2 text-sm text-error flex items-center gap-1.5"
                  role="alert"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.password.message}
                </motion.p>
              )}
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-accent-blue-600 via-accent-purple-600 to-accent-cyan-500 text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-300 hover:shadow-glow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-accent-blue-500/50"
              aria-label="Iniciar sesión"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Iniciando sesión...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Iniciar sesión</span>
                </>
              )}
            </button>
          </form>

          {/* Link de ayuda (opcional) */}
          <div className="mt-6 text-center">
            <p className="text-sm text-foreground-muted">
              ¿Problemas para acceder?{' '}
              <Link
                href="/contacto"
                className="text-accent-blue-500 hover:text-accent-purple-500 transition-colors font-medium"
              >
                Contacta con soporte
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-foreground-muted">
            © {new Date().getFullYear()} FastIA. Todos los derechos reservados.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-accent-blue-500" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}