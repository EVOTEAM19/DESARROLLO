import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política Integrada | FastIA',
  description: 'Política integrada de privacidad, términos y cookies de FastIA.',
}

export default function IntegratedPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-foreground">
          Política Integrada
        </h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-foreground-muted">
          <p className="text-sm text-foreground-muted mb-8">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section>
            <p className="text-lg mb-6">
              Esta página integra todas nuestras políticas legales en un solo lugar para tu conveniencia.
              Puedes acceder a cada política individual haciendo clic en los enlaces correspondientes.
            </p>
          </section>

          <section className="space-y-4">
            <div className="p-6 bg-background-secondary rounded-lg border border-foreground/10">
              <h2 className="text-2xl font-bold text-foreground mb-3">
                <Link href="/legal/privacy" className="hover:text-accent-blue-500 transition-colors">
                  Política de Privacidad
                </Link>
              </h2>
              <p>
                Información sobre cómo recopilamos, usamos y protegemos tus datos personales.
              </p>
            </div>

            <div className="p-6 bg-background-secondary rounded-lg border border-foreground/10">
              <h2 className="text-2xl font-bold text-foreground mb-3">
                <Link href="/legal/terms" className="hover:text-accent-blue-500 transition-colors">
                  Aviso Legal
                </Link>
              </h2>
              <p>
                Términos y condiciones de uso de nuestros servicios y sitio web.
              </p>
            </div>

            <div className="p-6 bg-background-secondary rounded-lg border border-foreground/10">
              <h2 className="text-2xl font-bold text-foreground mb-3">
                <Link href="/legal/cookies" className="hover:text-accent-blue-500 transition-colors">
                  Política de Cookies
                </Link>
              </h2>
              <p>
                Información sobre cómo utilizamos las cookies en nuestro sitio web.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Contacto</h2>
            <p>
              Si tienes preguntas sobre cualquiera de estas políticas, puedes contactarnos a través de
              nuestro <Link href="/contacto" className="text-accent-blue-500 hover:underline">formulario de contacto</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
