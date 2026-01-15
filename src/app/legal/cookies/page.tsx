import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Cookies | FastIA',
  description: 'Política de cookies de FastIA - POSPON SL. Información detallada sobre cómo utilizamos las cookies en nuestro sitio web.',
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen py-20 bg-gray-900">
      <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-white">
          Política de Cookies
        </h1>
        
        <div className="prose prose-invert max-w-none space-y-8 text-gray-300">
          <p className="text-sm text-gray-400 mb-8">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. ¿Qué son las Cookies?</h2>
            <p className="mb-4">
              Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (ordenador, 
              tablet, smartphone) cuando visita un sitio web. Las cookies permiten que el sitio web 
              recuerde sus acciones y preferencias durante un período de tiempo, por lo que no tiene 
              que volver a configurarlas cada vez que regresa al sitio o navega de una página a otra.
            </p>
            <p>
              Este sitio web utiliza cookies propias y de terceros para mejorar la experiencia del 
              usuario y analizar cómo se utiliza el sitio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Tipos de Cookies que Utilizamos</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3 mt-6">2.1. Cookies Técnicas o Necesarias</h3>
            <p className="mb-4">
              Estas cookies son estrictamente necesarias para el funcionamiento del sitio web y no 
              pueden desactivarse en nuestros sistemas. Normalmente solo se configuran en respuesta 
              a acciones realizadas por usted que equivalen a una solicitud de servicios, como 
              establecer sus preferencias de privacidad, iniciar sesión o rellenar formularios.
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong className="text-white">Finalidad:</strong> Autenticación de usuarios, seguridad, 
                  mantenimiento de sesión, personalización de la interfaz</li>
              <li><strong className="text-white">Duración:</strong> Sesión o persistentes según necesidad</li>
              <li><strong className="text-white">Base legal:</strong> Interés legítimo (funcionamiento del sitio)</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">2.2. Cookies de Análisis y Estadísticas</h3>
            <p className="mb-4">
              Estas cookies nos permiten contar las visitas y fuentes de tráfico para poder medir y 
              mejorar el rendimiento de nuestro sitio. Nos ayudan a saber qué páginas son las más y 
              menos populares y ver cómo los visitantes se mueven por el sitio.
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong className="text-white">Google Analytics 4:</strong> Analiza el comportamiento de los usuarios, 
                  páginas visitadas, tiempo de permanencia, fuentes de tráfico. 
                  Más información: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400">Política de Privacidad de Google</a></li>
              <li><strong className="text-white">Microsoft Clarity:</strong> Grabaciones de sesiones y heatmaps para 
                  mejorar la experiencia del usuario. 
                  Más información: <a href="https://clarity.microsoft.com/terms" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400">Términos de Microsoft Clarity</a></li>
              <li><strong className="text-white">Finalidad:</strong> Análisis de uso, mejora del sitio web, optimización de contenidos</li>
              <li><strong className="text-white">Duración:</strong> 2 años (Google Analytics), según configuración (Clarity)</li>
              <li><strong className="text-white">Base legal:</strong> Consentimiento del usuario</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">2.3. Cookies de Marketing y Publicidad</h3>
            <p className="mb-4">
              Estas cookies se utilizan para hacer seguimiento de los visitantes a través de diferentes 
              sitios web con la intención de mostrar anuncios que son relevantes y atractivos para el 
              usuario individual y, por tanto, más valiosos para los editores y los anunciantes de terceros.
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong className="text-white">Meta Pixel (Facebook/Instagram):</strong> Seguimiento de conversiones 
                  y creación de audiencias para publicidad. 
                  Más información: <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400">Política de Privacidad de Meta</a></li>
              <li><strong className="text-white">LinkedIn Insight Tag:</strong> Análisis de visitas y conversiones 
                  para publicidad en LinkedIn. 
                  Más información: <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400">Política de Privacidad de LinkedIn</a></li>
              <li><strong className="text-white">Finalidad:</strong> Publicidad dirigida, remarketing, análisis de campañas</li>
              <li><strong className="text-white">Duración:</strong> Según configuración de cada plataforma (normalmente 90-180 días)</li>
              <li><strong className="text-white">Base legal:</strong> Consentimiento del usuario</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">2.4. Cookies de Funcionalidad</h3>
            <p className="mb-4">
              Estas cookies permiten que el sitio web proporcione funcionalidad y personalización mejoradas. 
              Pueden ser establecidas por nosotros o por proveedores externos cuyos servicios hemos agregado 
              a nuestras páginas.
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong className="text-white">Finalidad:</strong> Recordar preferencias del usuario, idioma seleccionado, 
                  configuraciones personalizadas</li>
              <li><strong className="text-white">Duración:</strong> Persistentes (hasta 1 año)</li>
              <li><strong className="text-white">Base legal:</strong> Interés legítimo o consentimiento según el caso</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Cookies de Terceros</h2>
            <p className="mb-4">
              Utilizamos servicios de terceros que pueden instalar cookies en su dispositivo. 
              No tenemos control sobre estas cookies y le recomendamos revisar las políticas de 
              privacidad de estos servicios:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong className="text-white">Google Analytics:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400">https://policies.google.com/privacy</a></li>
              <li><strong className="text-white">Google Tag Manager:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400">https://policies.google.com/privacy</a></li>
              <li><strong className="text-white">Meta (Facebook/Instagram):</strong> <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400">https://www.facebook.com/privacy/policy</a></li>
              <li><strong className="text-white">LinkedIn:</strong> <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400">https://www.linkedin.com/legal/privacy-policy</a></li>
              <li><strong className="text-white">Microsoft Clarity:</strong> <a href="https://clarity.microsoft.com/terms" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400">https://clarity.microsoft.com/terms</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Gestión de Cookies</h2>
            <p className="mb-4">
              Usted puede gestionar o eliminar las cookies según sus preferencias. Puede eliminar todas 
              las cookies que ya están en su dispositivo y puede configurar la mayoría de los navegadores 
              para evitar que se coloquen. Sin embargo, si hace esto, es posible que tenga que ajustar 
              manualmente algunas preferencias cada vez que visite un sitio y es posible que algunos servicios 
              y funcionalidades no funcionen.
            </p>
            <h3 className="text-xl font-semibold text-white mb-3 mt-6">4.1. Configuración del Navegador</h3>
            <p className="mb-4">
              La mayoría de los navegadores permiten gestionar las preferencias de cookies. Puede configurar 
              su navegador para rechazar cookies o eliminar ciertas cookies. A continuación, le indicamos 
              cómo hacerlo en los navegadores más populares:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong className="text-white">Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios</li>
              <li><strong className="text-white">Firefox:</strong> Opciones → Privacidad y seguridad → Cookies y datos del sitio</li>
              <li><strong className="text-white">Safari:</strong> Preferencias → Privacidad → Cookies y datos de sitios web</li>
              <li><strong className="text-white">Edge:</strong> Configuración → Privacidad, búsqueda y servicios → Cookies y permisos de sitio</li>
            </ul>
            <h3 className="text-xl font-semibold text-white mb-3 mt-6">4.2. Herramientas de Terceros</h3>
            <p>
              También puede gestionar las cookies de terceros a través de las plataformas de opt-out:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong className="text-white">Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400">Complemento de inhabilitación de Google Analytics</a></li>
              <li><strong className="text-white">Facebook:</strong> Configuración de anuncios en <a href="https://www.facebook.com/settings?tab=ads" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400">Facebook</a></li>
              <li><strong className="text-white">LinkedIn:</strong> Configuración de privacidad en <a href="https://www.linkedin.com/psettings/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400">LinkedIn</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Consentimiento</h2>
            <p className="mb-4">
              Al continuar navegando por este sitio web después de haber sido informado sobre el uso de cookies, 
              usted consiente el uso de las cookies técnicas necesarias para el funcionamiento del sitio.
            </p>
            <p>
              Para las cookies no esenciales (análisis, marketing), solicitamos su consentimiento explícito. 
              Puede retirar su consentimiento en cualquier momento configurando las preferencias de cookies 
              en su navegador o contactándonos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Actualización de la Política de Cookies</h2>
            <p>
              Esta Política de Cookies puede ser actualizada periódicamente. Le recomendamos revisar esta 
              página de vez en cuando para estar informado sobre cómo utilizamos las cookies. La fecha de 
              la última actualización se indica al inicio de este documento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Información Adicional</h2>
            <p className="mb-4">
              Para obtener más información sobre el tratamiento de sus datos personales, consulte nuestra 
              <Link href="/legal/privacy" className="text-orange-500 hover:text-orange-400 underline mx-1">
                Política de Privacidad
              </Link>.
            </p>
            <p>
              Si tiene dudas sobre nuestra Política de Cookies, puede contactarnos:
            </p>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mt-4">
              <p className="mb-2"><strong className="text-white">Correo electrónico:</strong> <a href="mailto:hola@fastia.es" className="text-orange-500 hover:text-orange-400">hola@fastia.es</a></p>
              <p className="mb-2"><strong className="text-white">Dirección postal:</strong> Calle Columela, 9, 28001 Madrid, España</p>
              <p className="mb-0">
                <Link href="/contacto" className="text-orange-500 hover:text-orange-400 underline">
                  Formulario de contacto
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
