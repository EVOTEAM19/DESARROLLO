import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Aviso Legal | FastIA',
  description: 'Aviso legal y términos de uso de FastIA - POSPON SL.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen py-20 bg-gray-900">
      <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-white">
          Aviso Legal
        </h1>
        
        <div className="prose prose-invert max-w-none space-y-8 text-gray-300">
          <p className="text-sm text-gray-400 mb-8">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Información General</h2>
            <p className="mb-4">
              En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico, se informa a los usuarios de los datos identificativos de la empresa titular del sitio web <strong className="text-white">www.fastia.es</strong>:
            </p>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-6">
              <p className="mb-2"><strong className="text-white">Denominación social:</strong> POSPON SL</p>
              <p className="mb-2"><strong className="text-white">CIF:</strong> B19919091</p>
              <p className="mb-2"><strong className="text-white">Domicilio social:</strong> Calle Columela, 9, 28001 Madrid, España</p>
              <p className="mb-2"><strong className="text-white">Correo electrónico:</strong> <a href="mailto:hola@fastia.es" className="text-orange-500 hover:text-orange-400">hola@fastia.es</a></p>
              <p className="mb-0"><strong className="text-white">Sitio web:</strong> <a href="https://www.fastia.es" className="text-orange-500 hover:text-orange-400">www.fastia.es</a></p>
            </div>
            <p>
              POSPON SL es una empresa especializada en desarrollo de software con inteligencia artificial, 
              desarrollo de aplicaciones móviles, plataformas web y automatización empresarial.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Objeto</h2>
            <p>
              El presente Aviso Legal regula el uso del sitio web <strong className="text-white">www.fastia.es</strong> (en adelante, el "Sitio Web"), 
              propiedad de POSPON SL. La navegación por el Sitio Web atribuye la condición de usuario del mismo 
              e implica la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este Aviso Legal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Condiciones de Acceso y Uso</h2>
            <p className="mb-4">El uso del Sitio Web está sujeto a las siguientes condiciones:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>El usuario se compromete a hacer un uso adecuado y lícito del Sitio Web conforme a la ley, 
                  el presente Aviso Legal, las buenas costumbres y el orden público.</li>
              <li>Queda prohibido el uso del Sitio Web con fines ilícitos o no autorizados, o de forma 
                  que pueda causar daño o impedir el normal funcionamiento del mismo.</li>
              <li>No está permitida la reproducción, distribución o comunicación pública de los contenidos 
                  del Sitio Web sin la autorización previa y por escrito de POSPON SL.</li>
              <li>El usuario se compromete a no transmitir, introducir, difundir y poner a disposición de 
                  terceros cualquier tipo de material e información que pueda ser contrario a la ley, la moral, 
                  el orden público y el presente Aviso Legal.</li>
              <li>Queda prohibido el uso de cualquier dispositivo, software o rutina que interfiera o intente 
                  interferir con el funcionamiento normal del Sitio Web.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Propiedad Intelectual e Industrial</h2>
            <p className="mb-4">
              Todos los contenidos del Sitio Web, incluyendo a título enunciativo, pero no limitativo, 
              textos, fotografías, gráficos, imágenes, iconos, tecnología, software, así como su diseño 
              gráfico y códigos fuente, constituyen una obra cuya propiedad pertenece a POSPON SL, 
              sin que puedan entenderse cedidos al usuario ninguno de los derechos de explotación sobre 
              los mismos más allá de lo estrictamente necesario para el correcto uso del Sitio Web.
            </p>
            <p>
              En consecuencia, el usuario no podrá reproducir, copiar, distribuir, comunicar públicamente, 
              transformar o modificar dichos contenidos, salvo en los casos contemplados en la ley o 
              expresamente autorizado por POSPON SL.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Limitación de Responsabilidad</h2>
            <p className="mb-4">
              POSPON SL no se hace responsable de:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Los daños y perjuicios de toda naturaleza que puedan deberse a la falta de disponibilidad, 
                  continuidad o calidad del funcionamiento del Sitio Web y de los servicios ofrecidos en el mismo.</li>
              <li>Los daños y perjuicios que puedan deberse a la falta de utilidad, veracidad, exhaustividad 
                  y/o autenticidad de los contenidos y servicios ofrecidos en el Sitio Web.</li>
              <li>Los daños producidos como consecuencia de la utilización indebida del Sitio Web por parte 
                  de los usuarios.</li>
              <li>La existencia de virus u otros elementos en los contenidos que puedan producir alteraciones 
                  en el sistema informático, documentos electrónicos o ficheros de los usuarios.</li>
              <li>El incumplimiento de las leyes, la buena fe, el orden público y los usos del tráfico 
                  como consecuencia del uso incorrecto del Sitio Web.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Enlaces</h2>
            <p className="mb-4">
              En el caso de que en el Sitio Web se dispusieran enlaces o hipervínculos hacía otros sitios 
              de Internet, POSPON SL no ejercerá ningún tipo de control sobre dichos sitios y contenidos.
            </p>
            <p>
              En ningún caso POSPON SL asumirá responsabilidad alguna por los contenidos de algún enlace 
              perteneciente a un sitio web ajeno, ni garantizará la disponibilidad técnica, calidad, 
              fiabilidad, exactitud, amplitud, veracidad, validez y constitucionalidad de cualquier 
              material o información contenida en ninguno de dichos hipervínculos u otros sitios de Internet.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Protección de Datos</h2>
            <p>
              El tratamiento de los datos personales de los usuarios se regirá por lo dispuesto en la 
              Política de Privacidad del Sitio Web. Para más información, consulte nuestra 
              <Link href="/legal/privacy" className="text-orange-500 hover:text-orange-400 underline mx-1">
                Política de Privacidad
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Modificaciones</h2>
            <p>
              POSPON SL se reserva el derecho de efectuar sin previo aviso las modificaciones que 
              considere oportunas en su Sitio Web, pudiendo cambiar, suprimir o añadir tanto los 
              contenidos y servicios que se presten a través de la misma como la forma en la que 
              éstos aparezcan presentados o localizados en su Sitio Web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Ley Aplicable y Jurisdicción</h2>
            <p className="mb-4">
              El presente Aviso Legal se rige por la legislación española. Para cualquier controversia 
              que pudiera derivarse del acceso o uso del Sitio Web, POSPON SL y el usuario, con renuncia 
              expresa a cualquier otro fuero que pudiera corresponderles, se someten a la jurisdicción 
              de los Juzgados y Tribunales de Madrid.
            </p>
            <p>
              En caso de que alguna disposición del presente Aviso Legal fuera declarada nula o ineficaz 
              por sentencia firme dictada por autoridad competente, el resto de las cláusulas permanecerán 
              en vigor, sin que queden afectadas por dicha declaración de nulidad.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Contacto</h2>
            <p>
              Para cualquier duda o consulta sobre el presente Aviso Legal, puede contactar con nosotros 
              a través del correo electrónico <a href="mailto:hola@fastia.es" className="text-orange-500 hover:text-orange-400">hola@fastia.es</a> 
              o mediante nuestro <Link href="/contacto" className="text-orange-500 hover:text-orange-400 underline">formulario de contacto</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
