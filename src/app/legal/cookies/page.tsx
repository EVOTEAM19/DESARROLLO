import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies | FastIA',
  description: 'Política de cookies de FastIA. Información sobre cómo utilizamos las cookies en nuestro sitio web.',
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-foreground">
          Política de Cookies
        </h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-foreground-muted">
          <p className="text-sm text-foreground-muted mb-8">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. ¿Qué son las Cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas
              un sitio web. Nos ayudan a mejorar tu experiencia de navegación y a proporcionar funcionalidades personalizadas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Tipos de Cookies que Utilizamos</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Cookies Esenciales</h3>
            <p>
              Estas cookies son necesarias para el funcionamiento del sitio web y no se pueden desactivar.
              Incluyen cookies de autenticación y seguridad.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Cookies de Análisis</h3>
            <p>
              Utilizamos estas cookies para entender cómo los visitantes interactúan con nuestro sitio web,
              lo que nos ayuda a mejorar nuestros servicios.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Cookies de Preferencias</h3>
            <p>
              Estas cookies nos permiten recordar tus preferencias y configuraciones para proporcionarte
              una experiencia más personalizada.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Gestión de Cookies</h2>
            <p>
              Puedes gestionar o eliminar las cookies a través de la configuración de tu navegador.
              Ten en cuenta que desactivar ciertas cookies puede afectar la funcionalidad del sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Cookies de Terceros</h2>
            <p>
              Algunos servicios de terceros que utilizamos pueden establecer sus propias cookies.
              No tenemos control sobre estas cookies y te recomendamos revisar las políticas de privacidad
              de estos servicios.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
