import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Home } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mensaje enviado | Gracias por contactar | FastIA',
  description: 'Hemos recibido tu mensaje. Nos pondremos en contacto lo antes posible.',
  robots: 'noindex, follow',
}

export default function ContactoGraciasPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <section className="relative flex-1 flex items-center justify-center py-24 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-500/20 mb-8">
            <CheckCircle className="w-12 h-12 text-orange-500" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Gracias por tu mensaje
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            Lo hemos recibido correctamente.
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-lg mx-auto">
            Nos pondremos en contacto contigo lo antes posible, normalmente en menos de 24 horas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
              Volver al inicio
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-600 hover:border-orange-500 text-white rounded-lg transition-colors"
            >
              Enviar otro mensaje
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
