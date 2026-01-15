'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Brain, MessageSquare, Zap, Shield, TrendingUp, Check } from 'lucide-react'
import { SolutionFeatures } from '@/components/services/SolutionFeatures'
import { ServiceFAQ } from '@/components/services/ServiceFAQ'
import { trackCTAClickAll } from '@/lib/analytics'

const features = [
  {
    icon: MessageSquare,
    title: 'Chatbots Inteligentes',
    description: 'Entienden contexto, intención y responden como humanos.'
  },
  {
    icon: Zap,
    title: 'Respuesta Instantánea',
    description: 'De 48h a 2 minutos. Atención 24/7 sin contratar.'
  },
  {
    icon: Shield,
    title: 'Datos Seguros',
    description: 'Tu información nunca sale de tu infraestructura.'
  },
  {
    icon: TrendingUp,
    title: 'Aprende Continuamente',
    description: 'Cada conversación mejora el modelo automáticamente.'
  }
]

const useCases = [
  {
    title: 'Atención al Cliente',
    description: 'Resuelve 70% de consultas sin escalar a humanos.',
    metrics: ['70% resueltas', '-60% tickets', '24/7']
  },
  {
    title: 'Ventas Automatizadas',
    description: 'Cualifica leads y agenda demos automáticamente.',
    metrics: ['+35% conversión', '-40% ciclo', '3x leads']
  },
  {
    title: 'Soporte Interno',
    description: 'Asistente para empleados sobre políticas y procedimientos.',
    metrics: ['-80% consultas RRHH', 'Instantáneo', '95% precisión']
  }
]


export default function IAConversacionalPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <section className="relative py-32 bg-gradient-to-br from-orange-500/10 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/50 rounded-full mb-6">
              <Brain className="w-4 h-4 text-orange-500" />
              <span className="text-orange-500 font-semibold">IA Conversacional</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
              Chatbots que no parecen 
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"> robots</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              De 48 horas a 2 minutos. Asistentes que entienden contexto, intención y resuelven problemas reales.
            </p>
            
            <div className="flex gap-4">
              <Link 
                href="/contacto"
                onClick={() => trackCTAClickAll('Demo gratuita 30min', 'IA Conversacional - Hero', '/contacto')}
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors shadow-lg hover:shadow-orange-500/50"
              >
                Demo gratuita 30min →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
                  <div className="inline-flex p-4 bg-orange-500/20 rounded-xl mb-4">
                    <Icon className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-gray-400">{f.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-16 text-center">Casos de Uso Reales</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 bg-gray-900 rounded-2xl border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-3">{c.title}</h3>
                <p className="text-gray-400 mb-6">{c.description}</p>
                {c.metrics.map((m, j) => (
                  <div key={j} className="flex items-center gap-2 text-sm text-green-500 mb-2">
                    <Check className="w-4 h-4" />
                    <span>{m}</span>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SolutionFeatures
        title="Nuestra Metodología: Chatbots que Funcionan"
        features={[
          {
            title: "Discovery y Diseño",
            duration: "1-2 semanas",
            description: "Analizamos tu caso, definimos intenciones, flujos conversacionales y diseñamos la experiencia.",
            deliverables: [
              { text: "Mapa de intenciones completo" },
              { text: "Flujos conversacionales detallados" },
              { text: "Persona y tono de voz del chatbot" },
              { text: "Casos de uso definidos y priorizados" },
              { text: "Documento de especificaciones funcionales" },
              { text: "Mockups de interfaces conversacionales" },
              { text: "Matriz de escenarios y respuestas" },
              { text: "Plan de escalamiento a humano" }
            ]
          },
          {
            title: "Entrenamiento del Modelo",
            duration: "2-3 semanas",
            description: "Entrenamos el modelo con tus datos, documentación y ejemplos de conversaciones reales.",
            deliverables: [
              { text: "Modelo de IA entrenado y optimizado" },
              { text: "Base de conocimientos (RAG) configurada" },
              { text: "Embeddings de tu documentación" },
              { text: "Validación de precisión (85-95%)" },
              { text: "Tuning de respuestas personalizadas" },
              { text: "Sistema de aprendizaje continuo" },
              { text: "Biblioteca de respuestas predefinidas" },
              { text: "Configuración de detección de intenciones" }
            ]
          },
          {
            title: "Integración Multi-canal",
            duration: "2-3 semanas",
            description: "Integramos el chatbot con tu web, WhatsApp, Telegram y otros canales que necesites.",
            deliverables: [
              { text: "Widget de chatbot integrado en web" },
              { text: "Integración con WhatsApp Business API" },
              { text: "Integración con Telegram Bot" },
              { text: "API REST para sistemas propios" },
              { text: "Webhook para canales adicionales" },
              { text: "Sincronización de contexto entre canales" },
              { text: "Gestor de canales centralizado" },
              { text: "Documentación técnica de integración" }
            ]
          },
          {
            title: "Integración con Sistemas",
            duration: "2-3 semanas",
            description: "Conectamos el bot con tu CRM, ERP, base de datos y APIs para acceder a información en tiempo real.",
            deliverables: [
              { text: "Conexión con CRM (Salesforce, HubSpot, etc.)" },
              { text: "Integración con ERP (SAP, Oracle, etc.)" },
              { text: "Acceso seguro a base de datos" },
              { text: "Integraciones con APIs externas" },
              { text: "Automatización de acciones (crear tickets, pedidos)" },
              { text: "Sistema de autenticación y permisos" },
              { text: "Cache de consultas frecuentes" },
              { text: "Logs de todas las interacciones" }
            ]
          },
          {
            title: "Testing y Optimización",
            duration: "1-2 semanas",
            description: "Probamos el chatbot con usuarios reales, optimizamos respuestas y ajustamos flujos.",
            deliverables: [
              { text: "Testing con usuarios reales (beta)" },
              { text: "Análisis de conversaciones y errores" },
              { text: "Optimización de respuestas y flujos" },
              { text: "Ajuste de precisión y contexto" },
              { text: "Dashboard de métricas en tiempo real" },
              { text: "Reporte de testing y mejoras" },
              { text: "Sistema de A/B testing" },
              { text: "Plan de mejora continua" }
            ]
          },
          {
            title: "Deploy y Monitoreo",
            duration: "1 semana",
            description: "Desplegamos el chatbot en producción y configuramos monitoreo continuo para mejorarlo.",
            deliverables: [
              { text: "Deploy en producción (servidores cloud)" },
              { text: "Monitoreo 24/7 de rendimiento" },
              { text: "Sistema de alertas automáticas" },
              { text: "Dashboard de métricas (uptime, respuestas, errores)" },
              { text: "Reportes mensuales de uso y KPIs" },
              { text: "Backup y recuperación de datos" },
              { text: "Documentación de usuario final" },
              { text: "Capacitación para tu equipo" }
            ]
          }
        ]}
      />

      <section className="py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Por qué elegir nuestros Chatbots con IA?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              No vendemos chatbots genéricos. Construimos asistentes inteligentes que entienden contexto, aprenden de cada conversación y resuelven problemas reales.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">IA Propia, sin APIs de terceros</h3>
                  <p className="text-gray-300">
                    Desarrollamos modelos de IA específicos para tu empresa. No dependes de ChatGPT o Claude. Tus datos nunca salen de tu control y no pagas por cada consulta.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Entiende contexto, no solo palabras</h3>
                  <p className="text-gray-300">
                    Nuestros chatbots mantienen el contexto de la conversación, entienden intenciones complejas y responden de forma natural, como si hablaran con un humano experto.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Aprende continuamente</h3>
                  <p className="text-gray-300">
                    Cada conversación mejora el modelo. El bot aprende de errores, se adapta a tu tono de marca y se vuelve más preciso con el tiempo.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Integración completa con tus sistemas</h3>
                  <p className="text-gray-300">
                    Conectamos el chatbot con tu CRM, ERP, base de datos, APIs y cualquier sistema que uses. El bot accede a información en tiempo real y puede ejecutar acciones.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Multi-canal: Web, WhatsApp, Telegram</h3>
                  <p className="text-gray-300">
                    Un solo bot funciona en tu web, WhatsApp Business, Telegram y cualquier canal que necesites. La misma inteligencia, todas las plataformas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <Check className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">RAG con tu documentación</h3>
                  <p className="text-gray-300">
                    El bot accede a tus PDFs, documentación interna, FAQs y conocimientos específicos. Respuestas precisas basadas en tu información real.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center p-12 bg-gradient-to-br from-orange-500/20 to-gray-800 rounded-2xl border border-orange-500/50"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Listo para transformar tu atención al cliente?
            </h3>
            <p className="text-xl text-gray-300 mb-4">
              Agendamos una sesión de 30 minutos gratis. Analizamos tu caso, te mostramos qué podemos hacer y te damos un presupuesto sin compromiso.
            </p>
            <p className="text-lg text-orange-400 mb-8 font-semibold">
              ROI en 6 meses o devolvemos dinero
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                onClick={() => trackCTAClickAll('Demo gratuita 30min - ROI garantizado', 'IA Conversacional - CTA Final', '/contacto')}
                className="px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold text-lg transition-all shadow-2xl hover:shadow-orange-500/50"
              >
                Demo gratuita 30min →
              </Link>
              <Link
                href="/servicios"
                onClick={() => trackCTAClickAll('Ver otros servicios', 'IA Conversacional - CTA Secundario', '/servicios')}
                className="px-10 py-4 border-2 border-gray-600 hover:border-orange-500 text-white rounded-lg font-semibold text-lg transition-all"
              >
                Ver otros servicios
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ServiceFAQ
        faqs={[
          {
            question: "¿Cuánto cuesta desarrollar un chatbot con IA?",
            answer: "Chatbot básico: 15-25K€. Chatbot avanzado con integraciones: 40-60K€. Enterprise: 80K€+. Incluye discovery, desarrollo, integración y 6 meses de soporte."
          },
          {
            question: "¿Cuánto tarda el desarrollo?",
            answer: "Chatbot básico: 6-8 semanas. Chatbot avanzado: 10-14 semanas. Incluye discovery, entrenamiento, integración, testing y deploy."
          },
          {
            question: "¿El chatbot funciona solo o necesita mantenimiento?",
            answer: "Funciona solo, pero se mejora con mantenimiento. Incluimos 6 meses de soporte. Luego, mantenimiento opcional desde 500€/mes: ajustes, nuevas intenciones, optimización."
          },
          {
            question: "¿Qué precisión tiene el chatbot?",
            answer: "Depende del caso. Típico: 85-95% de respuestas correctas. Mejora con el tiempo. El bot aprende de cada conversación y se vuelve más preciso."
          },
          {
            question: "¿Se integra con mi CRM/ERP?",
            answer: "Sí, 100%. Integramos con Salesforce, HubSpot, SAP, bases de datos, APIs... El bot accede a información en tiempo real y puede ejecutar acciones."
          },
          {
            question: "¿Funciona en WhatsApp y Telegram?",
            answer: "Sí, un solo bot funciona en web, WhatsApp Business, Telegram y cualquier canal. La misma inteligencia, todas las plataformas."
          },
          {
            question: "¿El bot puede acceder a mi documentación interna?",
            answer: "Sí, con RAG (Retrieval-Augmented Generation). El bot accede a tus PDFs, documentación interna, FAQs y responde basándose en tu información real."
          },
          {
            question: "¿Qué pasa si el bot no sabe responder algo?",
            answer: "Escalamos a humano automáticamente. El bot detecta cuando no puede ayudar y transfiere la conversación a tu equipo. Sin pérdida de contexto."
          },
          {
            question: "¿Los datos de las conversaciones están seguros?",
            answer: "Sí, 100%. Encriptación en tránsito y reposo, acceso controlado, cumplimiento GDPR. Tus datos nunca salen de tu infraestructura o la nuestra."
          },
          {
            question: "¿Puedo probar el chatbot antes de contratar?",
            answer: "Sí, ofrecemos demo de 30 minutos gratis. Te mostramos un chatbot funcionando con un caso similar al tuyo. Sin compromiso."
          }
        ]}
      />
    </div>
  )
}
