import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidad | FastIA',
  description: 'Política de privacidad de FastIA - POSPON SL. Información sobre cómo recopilamos, usamos y protegemos tus datos personales conforme al RGPD.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-20 bg-gray-900">
      <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-white">
          Política de Privacidad
        </h1>
        
        <div className="prose prose-invert max-w-none space-y-8 text-gray-300">
          <p className="text-sm text-gray-400 mb-8">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Responsable del Tratamiento</h2>
            <p className="mb-4">
              En cumplimiento de lo establecido en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo 
              de 27 de abril de 2016 (RGPD), y de la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos 
              Personales y garantía de los derechos digitales (LOPDGDD), se informa que:
            </p>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-6">
              <p className="mb-2"><strong className="text-white">Responsable:</strong> POSPON SL</p>
              <p className="mb-2"><strong className="text-white">CIF:</strong> B19919091</p>
              <p className="mb-2"><strong className="text-white">Domicilio:</strong> Calle Columela, 9, 28001 Madrid, España</p>
              <p className="mb-0"><strong className="text-white">Correo electrónico:</strong> <a href="mailto:hola@fastia.es" className="text-orange-500 hover:text-orange-400">hola@fastia.es</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Información que Recopilamos</h2>
            <p className="mb-4">
              Recopilamos y tratamos los siguientes datos personales:
            </p>
            <h3 className="text-xl font-semibold text-white mb-3 mt-6">2.1. Datos facilitados directamente</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong className="text-white">Datos de identificación:</strong> nombre, apellidos</li>
              <li><strong className="text-white">Datos de contacto:</strong> correo electrónico, teléfono</li>
              <li><strong className="text-white">Datos profesionales:</strong> empresa, cargo</li>
              <li><strong className="text-white">Datos de comunicación:</strong> mensajes y consultas realizadas a través de formularios</li>
            </ul>
            <h3 className="text-xl font-semibold text-white mb-3 mt-6">2.2. Datos recopilados automáticamente</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong className="text-white">Datos de navegación:</strong> dirección IP, tipo de navegador, páginas visitadas, tiempo de permanencia</li>
              <li><strong className="text-white">Cookies y tecnologías similares:</strong> consulte nuestra 
                <Link href="/legal/cookies" className="text-orange-500 hover:text-orange-400 underline mx-1">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Finalidad del Tratamiento</h2>
            <p className="mb-4">
              Los datos personales recopilados serán tratados con las siguientes finalidades:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong className="text-white">Gestionar consultas y solicitudes:</strong> responder a las consultas realizadas a través de los formularios de contacto</li>
              <li><strong className="text-white">Prestación de servicios:</strong> ejecutar los servicios solicitados por el usuario</li>
              <li><strong className="text-white">Comunicaciones comerciales:</strong> enviar información sobre nuestros servicios, siempre que el usuario haya dado su consentimiento</li>
              <li><strong className="text-white">Mejora del sitio web:</strong> analizar el uso del sitio web para mejorar nuestros servicios</li>
              <li><strong className="text-white">Cumplimiento legal:</strong> cumplir con las obligaciones legales aplicables</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Base Legal</h2>
            <p className="mb-4">
              El tratamiento de sus datos personales se basa en:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong className="text-white">Ejecución de contrato:</strong> para la prestación de servicios solicitados</li>
              <li><strong className="text-white">Consentimiento:</strong> para el envío de comunicaciones comerciales y uso de cookies no esenciales</li>
              <li><strong className="text-white">Interés legítimo:</strong> para la mejora del sitio web y análisis de uso</li>
              <li><strong className="text-white">Obligación legal:</strong> para el cumplimiento de obligaciones legales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Conservación de los Datos</h2>
            <p className="mb-4">
              Los datos personales serán conservados:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Mientras exista una relación contractual o comercial</li>
              <li>Durante los plazos establecidos por la legislación aplicable (en particular, la Ley General Tributaria 
                  y la Ley 10/2010 de prevención del blanqueo de capitales, que establecen plazos de conservación de hasta 10 años)</li>
              <li>Hasta que el interesado solicite su supresión o retire su consentimiento</li>
              <li>Los datos de navegación se conservan durante los plazos establecidos en nuestra 
                <Link href="/legal/cookies" className="text-orange-500 hover:text-orange-400 underline mx-1">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Destinatarios de los Datos</h2>
            <p className="mb-4">
              Los datos personales no serán comunicados a terceros, salvo:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong className="text-white">Proveedores de servicios:</strong> empresas que nos prestan servicios de hosting, 
                  email marketing, analytics, etc., que actúan como encargados del tratamiento</li>
              <li><strong className="text-white">Obligaciones legales:</strong> cuando sea necesario para el cumplimiento de 
                  obligaciones legales o requerimientos de autoridades competentes</li>
              <li><strong className="text-white">Transferencias internacionales:</strong> algunos de nuestros proveedores pueden 
                  procesar datos fuera del EEE, garantizándose el mismo nivel de protección mediante cláusulas contractuales tipo</li>
            </ul>
            <p>
              <strong className="text-white">Proveedores principales:</strong> Supabase (hosting y base de datos), 
              Google Analytics (analytics), Vercel (hosting).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Derechos del Interesado</h2>
            <p className="mb-4">
              En virtud del RGPD y la LOPDGDD, usted tiene derecho a:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong className="text-white">Acceso:</strong> obtener información sobre sus datos personales que estamos tratando</li>
              <li><strong className="text-white">Rectificación:</strong> solicitar la corrección de datos inexactos o incompletos</li>
              <li><strong className="text-white">Supresión:</strong> solicitar la eliminación de sus datos cuando ya no sean necesarios</li>
              <li><strong className="text-white">Limitación:</strong> solicitar la limitación del tratamiento en determinadas circunstancias</li>
              <li><strong className="text-white">Portabilidad:</strong> recibir sus datos en formato estructurado y de uso común</li>
              <li><strong className="text-white">Oposición:</strong> oponerse al tratamiento de sus datos en determinadas circunstancias</li>
              <li><strong className="text-white">Revocación del consentimiento:</strong> retirar el consentimiento otorgado en cualquier momento</li>
            </ul>
            <p className="mb-4">
              Para ejercer estos derechos, puede dirigirse a POSPON SL mediante:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Correo electrónico: <a href="mailto:hola@fastia.es" className="text-orange-500 hover:text-orange-400">hola@fastia.es</a></li>
              <li>Correo postal: Calle Columela, 9, 28001 Madrid, España</li>
              <li>
                <Link href="/contacto" className="text-orange-500 hover:text-orange-400 underline">
                  Formulario de contacto
                </Link>
              </li>
            </ul>
            <p>
              También tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos 
              (AEPD) si considera que el tratamiento de sus datos no se ajusta a la normativa vigente. 
              Más información en <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400">www.aepd.es</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Medidas de Seguridad</h2>
            <p className="mb-4">
              POSPON SL ha adoptado las medidas técnicas y organizativas necesarias para garantizar la seguridad 
              de los datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado, 
              teniendo en cuenta el estado de la tecnología, la naturaleza de los datos almacenados y los 
              riesgos a que están expuestos.
            </p>
            <p>
              Entre otras medidas, utilizamos conexiones cifradas (HTTPS), sistemas de autenticación seguros, 
              copias de seguridad periódicas y control de accesos basado en roles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Menores de Edad</h2>
            <p>
              Nuestros servicios están dirigidos a personas mayores de 18 años. No recopilamos intencionalmente 
              datos personales de menores de edad. Si descubrimos que hemos recopilado datos de un menor sin 
              el consentimiento paterno, tomaremos medidas para eliminar esa información de nuestros servidores.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de modificar esta Política de Privacidad para adaptarla a novedades 
              legislativas, jurisprudenciales o de la práctica. En tal caso, anunciaremos en esta página los 
              cambios introducidos con razonable antelación a su puesta en práctica.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Contacto</h2>
            <p>
              Para cualquier duda o consulta sobre esta Política de Privacidad o sobre el tratamiento de sus 
              datos personales, puede contactarnos en:
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
