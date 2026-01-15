import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad | FastIA',
  description: 'Política de privacidad de FastIA. Información sobre cómo recopilamos, usamos y protegemos tus datos personales.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-foreground">
          Política de Privacidad
        </h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-foreground-muted">
          <p className="text-sm text-foreground-muted mb-8">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Información que Recopilamos</h2>
            <p>
              En FastIA, recopilamos información que nos proporcionas directamente cuando:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Te registras en nuestros servicios</li>
              <li>Completas formularios de contacto</li>
              <li>Te suscribes a nuestro boletín</li>
              <li>Utilizas nuestros servicios</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Uso de la Información</h2>
            <p>
              Utilizamos la información recopilada para:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Proporcionar y mejorar nuestros servicios</li>
              <li>Responder a tus consultas y solicitudes</li>
              <li>Enviar comunicaciones relacionadas con nuestros servicios</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Protección de Datos</h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos personales
              contra acceso no autorizado, pérdida o destrucción.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Tus Derechos</h2>
            <p>
              Tienes derecho a acceder, rectificar, eliminar o limitar el procesamiento de tus datos personales.
              Para ejercer estos derechos, contáctanos en la dirección de correo electrónico proporcionada.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Contacto</h2>
            <p>
              Si tienes preguntas sobre esta política de privacidad, puedes contactarnos a través de
              nuestro formulario de contacto o enviando un email a privacidad@fastia.com
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
