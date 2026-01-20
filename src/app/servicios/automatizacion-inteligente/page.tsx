import { ServiceHero } from '@/components/services/ServiceHero'
import { ProblemSection } from '@/components/services/ProblemSection'
import { SolutionFeatures } from '@/components/services/SolutionFeatures'
import { ComparisonTable } from '@/components/services/ComparisonTable'
import { ServiceFAQ } from '@/components/services/ServiceFAQ'
import { ServiceCTA } from '@/components/services/ServiceCTA'

export const metadata = {
  title: 'Automatización Inteligente con IA | FastIA',
  description: 'RPA con IA que automatiza procesos complejos y toma decisiones en tiempo real.',
}

export default function AutomatizacionInteligentePage() {
  return (
    <>
      <ServiceHero
        badge="⚡ Automatiza lo que otros no pueden"
        title="Automatización Inteligente que Libera Tiempo"
        subtitle="RPA con IA que automatiza procesos complejos, toma decisiones en tiempo real y aprende de cada ejecución."
        image="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80"
      />
      
      <ProblemSection
        problems={[
          {
            title: "Tareas repetitivas que consumen horas",
            description: "Tu equipo pierde 20+ horas semanales en tareas manuales que podrían automatizarse."
          },
          {
            title: "Errores humanos costosos",
            description: "Errores de copy-paste, datos mal ingresados, procesos inconsistentes. Cada error cuesta dinero."
          },
          {
            title: "RPA básico que se rompe",
            description: "Bots frágiles que fallan cuando cambia una pantalla. Mantenimiento constante y costoso."
          },
          {
            title: "Sin capacidad de decisión",
            description: "Los bots solo siguen scripts. No pueden tomar decisiones ni adaptarse a casos nuevos."
          },
          {
            title: "Integración limitada",
            description: "El bot solo funciona con una aplicación. No puede cruzar datos entre sistemas."
          },
          {
            title: "ROI negativo",
            description: "Pagas más en mantenimiento que lo que ahorras. El bot no escala."
          }
        ]}
      />
      
      <SolutionFeatures
        title="Nuestra Metodología: Automatización que Funciona"
        features={[
          {
            title: "Análisis de Procesos",
            duration: "1-2 semanas",
            description: "Identificamos procesos automatizables y calculamos ROI real.",
            deliverables: [
              { text: "Mapa de procesos" },
              { text: "Análisis de ROI" },
              { text: "Priorización" },
              { text: "Plan de automatización" }
            ]
          },
          {
            title: "Diseño de Flujos",
            duration: "2 semanas",
            description: "Diseñamos flujos inteligentes que manejan excepciones y toman decisiones.",
            deliverables: [
              { text: "Flujos documentados" },
              { text: "Casos de excepción" },
              { text: "Lógica de decisión" },
              { text: "Handoff a humanos" }
            ]
          },
          {
            title: "Desarrollo con IA",
            duration: "4-6 semanas",
            description: "Construimos bots inteligentes con visión por computadora y NLP.",
            deliverables: [
              { text: "Bot funcional" },
              { text: "Integración con sistemas" },
              { text: "Detección de errores" },
              { text: "Dashboard de métricas" }
            ]
          },
          {
            title: "Testing y Optimización",
            duration: "2 semanas",
            description: "Probamos con datos reales y optimizamos para máxima eficiencia.",
            deliverables: [
              { text: "Test completo" },
              { text: "Optimización de velocidad" },
              { text: "Reducción de errores" },
              { text: "Documentación" }
            ]
          },
          {
            title: "Deploy y Monitoreo",
            duration: "1 semana",
            description: "Desplegamos y monitoreamos 24/7 para detectar problemas.",
            deliverables: [
              { text: "Deploy en producción" },
              { text: "Sistema de alertas" },
              { text: "Reportes automáticos" },
              { text: "Soporte continuo" }
            ]
          }
        ]}
      />
      
      <ComparisonTable
        title="Tipos de Automatización"
        description="Diferentes niveles según la complejidad:"
        comparison={{
          headers: ['', 'RPA Básico', 'RPA + IA', 'Automatización Completa'],
          rows: [
            {
              feature: 'Capacidad',
              native: { value: 'Scripts simples', color: 'yellow', note: 'Tareas repetitivas' },
              hybrid: { value: 'Decisiones básicas', color: 'green', note: 'NLP, visión' },
              pwa: { value: 'Procesos complejos', color: 'green', note: 'End-to-end' }
            },
            {
              feature: 'Adaptabilidad',
              native: { value: 'Baja', color: 'red', note: 'Se rompe fácilmente' },
              hybrid: { value: 'Media', color: 'orange', note: 'Maneja cambios' },
              pwa: { value: 'Alta', color: 'green', note: 'Auto-adaptación' }
            },
            {
              feature: 'ROI',
              native: { value: '€€', color: 'orange', note: 'Limitado' },
              hybrid: { value: '€€€', color: 'green', note: 'Bueno' },
              pwa: { value: '€€€€', color: 'green', note: 'Excelente' }
            },
            {
              feature: 'Time to market',
              native: { value: '2-4 sem', color: 'green', note: 'Rápido' },
              hybrid: { value: '4-6 sem', color: 'orange', note: 'Intermedio' },
              pwa: { value: '8-12 sem', color: 'red', note: 'Más lento' }
            },
            {
              feature: 'Mantenimiento',
              native: { value: 'Alto', color: 'red', note: 'Constante' },
              hybrid: { value: 'Medio', color: 'orange', note: 'Moderado' },
              pwa: { value: 'Bajo', color: 'green', note: 'Mínimo' }
            }
          ],
          recommendations: [
            {
              type: 'RPA Básico',
              when: 'Tareas muy simples y repetitivas, presupuesto limitado',
              examples: 'Copy-paste, rellenar formularios, mover archivos'
            },
            {
              type: 'RPA + IA',
              when: 'Procesos con decisiones, documentos no estructurados',
              examples: 'Clasificación de emails, extracción de datos, validación'
            },
            {
              type: 'Automatización Completa',
              when: 'Procesos end-to-end complejos, alto volumen',
              examples: 'Onboarding clientes, facturación, gestión de pedidos'
            }
          ]
        }}
      />
      
      <ServiceFAQ
        faqs={[
          {
            question: "¿Cuánto cuesta automatizar un proceso?",
            answer: "Proceso simple: 15-25K€. Proceso complejo con IA: 40-80K€. Incluye análisis, desarrollo, testing y 3 meses de soporte."
          },
          {
            question: "¿Qué procesos puedo automatizar?",
            answer: "Cualquier proceso repetitivo: facturación, onboarding, clasificación, extracción de datos, reportes, integraciones..."
          },
          {
            question: "¿Cuánto tarda el desarrollo?",
            answer: "Proceso simple: 4-6 semanas. Proceso complejo: 10-14 semanas. Incluye análisis, desarrollo, testing y deploy."
          },
          {
            question: "¿El bot se adapta a cambios?",
            answer: "Sí, con IA. El bot detecta cambios en interfaces y se adapta automáticamente. Reducción de mantenimiento del 70%."
          },
          {
            question: "¿Qué pasa si el bot falla?",
            answer: "Handoff automático a humano. El bot identifica cuando no puede completar una tarea y notifica al equipo."
          },
          {
            question: "¿Cuánto ahorro puedo esperar?",
            answer: "Depende del proceso. Típico: 60-80% de tiempo ahorrado. ROI típico: 6-12 meses."
          },
          {
            question: "¿Cuánto cuesta mantenerlo?",
            answer: "Desde 500€/mes: monitoreo, ajustes, actualizaciones, soporte. Sin costes ocultos."
          }
        ]}
      />
      
      <ServiceCTA
        title="¿Quieres liberar tiempo de tu equipo?"
        description="Agenda una sesión de 60 minutos. Analizamos tus procesos y te mostramos qué podemos automatizar."
        primaryButton={{
          text: "Demo gratuita 30min →",
          href: "/contacto"
        }}
        secondaryButton={{
          text: "Ver otros servicios",
          href: "/the-modal"
        }}
      />
    </>
  )
}
