'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const sectors = [
  {
    emoji: '🛒',
    title: 'E-commerce / Retail',
    description: 'Vendemos productos online o tenemos tienda física',
    features: [
      { text: 'Chatbot de ventas 24/7: Atiende, recomienda productos y cierra ventas mientras duermes' },
      { text: 'Recomendaciones personalizadas: IA que sugiere productos basándose en comportamiento' },
      { text: 'Análisis predictivo de inventario: Predice demanda y optimiza stock automáticamente' },
      { text: 'Generación automática de descripciones: IA crea textos SEO para miles de productos' },
      { text: 'Detección de fraude: IA identifica transacciones sospechosas en tiempo real' },
    ],
  },
  {
    emoji: '💻',
    title: 'SaaS / Software',
    description: 'Ofrecemos software como servicio o plataforma digital',
    features: [
      { text: 'Asistente IA integrado: Copilot personalizado dentro de tu producto' },
      { text: 'Automatización de onboarding: IA guía a nuevos usuarios paso a paso' },
      { text: 'Predicción de churn: Detecta usuarios que van a cancelar antes de que lo hagan' },
      { text: 'Generación automática de reportes: IA crea análisis personalizados para cada cliente' },
      { text: 'Smart search semántico: Búsqueda inteligente que entiende intención del usuario' },
    ],
  },
  {
    emoji: '💼',
    title: 'Servicios Profesionales',
    description: 'Consultoría, asesoría, servicios B2B',
    features: [
      { text: 'Cualificación automática de leads: IA filtra y prioriza contactos de alto valor' },
      { text: 'Propuestas personalizadas en minutos: Genera documentos adaptados a cada cliente' },
      { text: 'Asistente de investigación: IA analiza documentos y extrae insights clave' },
      { text: 'Automatización de seguimientos: Emails personalizados y recordatorios inteligentes' },
      { text: 'Knowledge base inteligente: Chatbot experto en tu documentación interna' },
    ],
  },
  {
    emoji: '🎓',
    title: 'Educación / Formación',
    description: 'Academia online, cursos, e-learning',
    features: [
      { text: 'Tutor IA personalizado: Asistente que responde dudas 24/7 como un profesor' },
      { text: 'Generación de ejercicios adaptativos: IA crea problemas según nivel del alumno' },
      { text: 'Corrección automática: Evalúa respuestas y da feedback instantáneo' },
      { text: 'Transcripción y resúmenes: Convierte clases en texto y genera apuntes automáticos' },
      { text: 'Rutas de aprendizaje personalizadas: IA adapta el temario a cada estudiante' },
    ],
  },
  {
    emoji: '🏥',
    title: 'Salud / Healthcare',
    description: 'Clínicas, telemedicina, healthtech',
    features: [
      { text: 'Asistente de triaje: IA evalúa síntomas y prioriza pacientes automáticamente' },
      { text: 'Gestión inteligente de citas: Optimiza agenda y reduce no-shows con recordatorios IA' },
      { text: 'Análisis de documentación médica: Extrae datos clave de historiales y reportes' },
      { text: 'Chatbot de pre-consulta: Recopila información del paciente antes de la cita' },
      { text: 'Seguimiento post-tratamiento: IA monitoriza recuperación y alerta anomalías' },
    ],
  },
  {
    emoji: '🏠',
    title: 'Inmobiliaria',
    description: 'Agencia, marketplace, proptech',
    features: [
      { text: 'Asistente de captación IA: Cualifica leads, agenda visitas sin intervención humana' },
      { text: 'Valoración automática: IA estima precio de propiedades en segundos' },
      { text: 'Matching inteligente: Conecta clientes con propiedades perfectas para ellos' },
      { text: 'Descripciones SEO automáticas: Genera textos optimizados para cada inmueble' },
      { text: 'Tours virtuales con IA: Mejora fotos y crea recorridos interactivos' },
    ],
  },
  {
    emoji: '📦',
    title: 'Logística / Supply Chain',
    description: 'Transporte, almacén, distribución',
    features: [
      { text: 'Optimización de rutas: IA calcula las rutas más eficientes en tiempo real' },
      { text: 'Predicción de demanda: Anticipa picos y optimiza inventario automáticamente' },
      { text: 'Tracking inteligente: Chatbot que informa estado de envíos 24/7' },
      { text: 'Detección de anomalías: Identifica retrasos y problemas antes de que escalen' },
      { text: 'Automatización de documentación: IA genera albaranes y documentos aduaneros' },
    ],
  },
  {
    emoji: '📱',
    title: 'Marketing / Agencia',
    description: 'Agencia digital, marketing, publicidad',
    features: [
      { text: 'Generación de contenido escalable: IA crea posts, ads y emails en segundos' },
      { text: 'Análisis de sentimiento: Monitoriza menciones y detecta crisis antes de que exploten' },
      { text: 'Optimización de campañas: IA ajusta pujas y creatividades automáticamente' },
      { text: 'Reportes automáticos para clientes: Genera informes personalizados sin esfuerzo' },
      { text: 'Segmentación predictiva: Identifica audiencias de alto valor automáticamente' },
    ],
  },
  {
    emoji: '⚖️',
    title: 'Legal / Compliance',
    description: 'Despachos, legaltech, compliance',
    features: [
      { text: 'Análisis de contratos: IA revisa documentos y extrae cláusulas clave en minutos' },
      { text: 'Búsqueda jurisprudencial: Encuentra precedentes relevantes instantáneamente' },
      { text: 'Generación de documentos: Crea contratos personalizados desde plantillas' },
      { text: 'Due diligence automatizada: IA analiza documentación corporativa masivamente' },
      { text: 'Asistente legal interno: Chatbot que responde consultas del equipo 24/7' },
    ],
  },
]

export function BusinessSectors() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 text-foreground">
            ¿Qué hace tu negocio? Te decimos cómo integramos IA
          </h2>
          <p className="text-xl text-foreground-muted mb-12 max-w-3xl mx-auto">
            Cada negocio es único. Selecciona tu sector o actividad y descubre las oportunidades específicas de IA que podemos implementar para ti.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-background-secondary p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow cursor-pointer border border-foreground/10"
            >
              <div className="text-4xl mb-4">{sector.emoji}</div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{sector.title}</h3>
              <p className="text-foreground-muted mb-4">{sector.description}</p>
              <div className="space-y-2 text-sm">
                {sector.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                    <span className="text-foreground-muted">
                      <strong className="text-foreground">{feature.text.split(':')[0]}:</strong>
                      {feature.text.split(':').slice(1).join(':')}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/contacto"
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition block text-center"
              >
                Ver cómo funciona →
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-foreground-muted mb-6">
            ¿No ves tu sector? No hay problema.
          </p>
          <Link
            href="/contacto"
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition"
          >
            Cuéntanos tu negocio y diseñamos tu solución IA →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
