import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso Legal | FastIA',
  description: 'Aviso legal y términos de uso de FastIA.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-foreground">
          Aviso Legal
        </h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-foreground-muted">
          <p className="text-sm text-foreground-muted mb-8">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Información General</h2>
            <p>
              FastIA es una empresa especializada en desarrollo de plataformas digitales con inteligencia artificial. Al acceder y utilizar
              nuestros servicios, aceptas los términos y condiciones establecidos en este aviso legal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Uso del Sitio Web</h2>
            <p>
              El uso de este sitio web está sujeto a las siguientes condiciones:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>No utilizar el sitio para fines ilegales o no autorizados</li>
              <li>No intentar acceder a áreas restringidas del sitio</li>
              <li>Respetar los derechos de propiedad intelectual</li>
              <li>No transmitir virus o código malicioso</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Propiedad Intelectual</h2>
            <p>
              Todo el contenido de este sitio web, incluyendo textos, gráficos, logos, iconos y software,
              es propiedad de FastIA y está protegido por las leyes de propiedad intelectual.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Limitación de Responsabilidad</h2>
            <p>
              FastIA no se hace responsable de los daños derivados del uso o la imposibilidad de uso
              de este sitio web, incluyendo pero no limitado a daños directos, indirectos, incidentales o consecuentes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones
              entrarán en vigor desde su publicación en este sitio web.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
