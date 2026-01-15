import { ContactForm } from '@/components/sections/ContactForm'
import { getContactoContent } from '@/lib/content'
import { Suspense } from 'react'

export default async function ContactoPage() {
  const content = await getContactoContent()
  
  return (
    <div className="min-h-screen bg-gray-900">
      <section className="relative py-32 bg-gradient-to-br from-orange-500/10 via-orange-600/5 to-gray-900 overflow-hidden">
        {/* Efectos de fondo */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white text-center">
            {content?.hero?.title ? (
              <>
                {content.hero.title.split(' ').map((word: string, i: number) => (
                  <span key={i}>
                    {word === 'proyecto' || word.includes('proyecto') ? (
                      <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                        {word}{' '}
                      </span>
                    ) : (
                      <span>{word} </span>
                    )}
                  </span>
                ))}
              </>
            ) : (
              <>
                Hablemos de tu <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">proyecto</span>
              </>
            )}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 text-center max-w-3xl mx-auto">
            {content?.hero?.subtitle || 'Respondemos en menos de 24h. Sin comerciales pesados, solo una conversación honesta.'}
          </p>
        </div>
      </section>

      <Suspense fallback={<div className="py-24"><div className="text-center text-gray-400">Cargando formulario...</div></div>}>
        <ContactForm />
      </Suspense>
    </div>
  )
}
