import { ServiceHero } from '@/components/services/ServiceHero'
import { ProblemSection } from '@/components/services/ProblemSection'
import { SolutionFeatures } from '@/components/services/SolutionFeatures'
import { ComparisonTable } from '@/components/services/ComparisonTable'
import { ServiceFAQ } from '@/components/services/ServiceFAQ'
import { ServiceCTA } from '@/components/services/ServiceCTA'

export const metadata = {
  title: 'Seguridad con IA | FastIA',
  description: 'Protección avanzada con detección de amenazas, análisis de vulnerabilidades y respuesta automática.',
}

export default function SeguridadIAPage() {
  return (
    <>
      <ServiceHero
        badge="🛡️ Protección inteligente 24/7"
        title="Seguridad con IA que Protege tu Negocio"
        subtitle="Protección avanzada con detección de amenazas, análisis de vulnerabilidades y respuesta automática."
        image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80"
      />
      
      <ProblemSection
        problems={[
          {
            title: "Amenazas que evolucionan más rápido",
            description: "Los ataques son cada vez más sofisticados. Las defensas tradicionales no son suficientes."
          },
          {
            title: "Falsos positivos que consumen tiempo",
            description: "Tu equipo de seguridad pierde horas investigando alertas que resultan ser falsas."
          },
          {
            title: "Detección reactiva, no preventiva",
            description: "Descubres amenazas cuando ya es tarde. El daño ya está hecho."
          },
          {
            title: "Falta de visibilidad",
            description: "No sabes qué está pasando en tu infraestructura. Ciegos ante amenazas internas."
          },
          {
            title: "Respuesta lenta a incidentes",
            description: "Cuando detectas un ataque, la respuesta manual tarda horas. El atacante tiene ventaja."
          },
          {
            title: "Cumplimiento complejo",
            description: "GDPR, ISO 27001, SOC 2... Mantener el cumplimiento es un dolor de cabeza constante."
          }
        ]}
      />
      
      <SolutionFeatures
        title="Nuestra Metodología: Seguridad que Funciona"
        features={[
          {
            title: "Auditoría de Seguridad",
            duration: "2 semanas",
            description: "Evaluamos tu infraestructura y identificamos vulnerabilidades y riesgos.",
            deliverables: [
              { text: "Reporte de vulnerabilidades" },
              { text: "Análisis de riesgos" },
              { text: "Gaps de seguridad" },
              { text: "Roadmap de mejora" }
            ]
          },
          {
            title: "Diseño de Arquitectura Segura",
            duration: "2-3 semanas",
            description: "Diseñamos una arquitectura de seguridad multicapa y resiliente.",
            deliverables: [
              { text: "Arquitectura definida" },
              { text: "Políticas de seguridad" },
              { text: "Plan de implementación" },
              { text: "Cumplimiento normativo" }
            ]
          },
          {
            title: "Implementación con IA",
            duration: "6-8 semanas",
            description: "Desplegamos sistemas de detección y respuesta con IA integrada.",
            deliverables: [
              { text: "Sistema de detección" },
              { text: "Respuesta automática" },
              { text: "Monitoreo 24/7" },
              { text: "Dashboard de seguridad" }
            ]
          },
          {
            title: "Testing y Penetration",
            duration: "2 semanas",
            description: "Probamos la seguridad con ataques simulados y ajustamos defensas.",
            deliverables: [
              { text: "Penetration test" },
              { text: "Vulnerabilidades corregidas" },
              { text: "Plan de respuesta" },
              { text: "Documentación" }
            ]
          },
          {
            title: "Monitoreo Continuo",
            duration: "Continuo",
            description: "Monitoreamos 24/7 y respondemos automáticamente a amenazas.",
            deliverables: [
              { text: "Monitoreo activo" },
              { text: "Alertas inteligentes" },
              { text: "Respuesta automática" },
              { text: "Reportes mensuales" }
            ]
          }
        ]}
      />
      
      <ComparisonTable
        title="Niveles de Seguridad"
        description="Diferentes enfoques según tus necesidades:"
        comparison={{
          headers: ['', 'Básico', 'Avanzado', 'Enterprise'],
          rows: [
            {
              feature: 'Detección',
              native: { value: 'Reglas simples', color: 'yellow', note: 'Basado en firmas' },
              hybrid: { value: 'IA + Reglas', color: 'green', note: 'Anomalías detectadas' },
              pwa: { value: 'IA Avanzada', color: 'green', note: 'Threat hunting' }
            },
            {
              feature: 'Respuesta',
              native: { value: 'Manual', color: 'red', note: 'Lenta' },
              hybrid: { value: 'Semi-automática', color: 'orange', note: 'Rápida' },
              pwa: { value: 'Automática', color: 'green', note: 'Inmediata' }
            },
            {
              feature: 'Cobertura',
              native: { value: 'Parcial', color: 'yellow', note: 'Sistemas críticos' },
              hybrid: { value: 'Amplia', color: 'green', note: 'Mayoría de sistemas' },
              pwa: { value: 'Completa', color: 'green', note: 'Todo el stack' }
            },
            {
              feature: 'Cumplimiento',
              native: { value: 'Básico', color: 'yellow', note: 'GDPR mínimo' },
              hybrid: { value: 'Completo', color: 'green', note: 'ISO 27001' },
              pwa: { value: 'Enterprise', color: 'green', note: 'SOC 2, etc.' }
            },
            {
              feature: 'Coste',
              native: { value: '€€', color: 'green', note: 'Económico' },
              hybrid: { value: '€€€', color: 'orange', note: 'Intermedio' },
              pwa: { value: '€€€€', color: 'red', note: 'Alto' }
            }
          ],
          recommendations: [
            {
              type: 'Básico',
              when: 'Startups, presupuesto limitado, datos no críticos',
              examples: 'Landing pages, blogs, MVPs'
            },
            {
              type: 'Avanzado',
              when: 'Empresas medianas, datos sensibles, cumplimiento necesario',
              examples: 'E-commerce, SaaS, fintech'
            },
            {
              type: 'Enterprise',
              when: 'Grandes empresas, datos críticos, múltiples normativas',
              examples: 'Banca, salud, gobierno'
            }
          ]
        }}
      />
      
      <ServiceFAQ
        faqs={[
          {
            question: "¿Cuánto cuesta un proyecto de seguridad con IA?",
            answer: "Básico: 30-50K€. Avanzado: 80-150K€. Enterprise: 200K€+. Incluye auditoría, implementación y 6 meses de soporte."
          },
          {
            question: "¿Qué normativas cumplís?",
            answer: "GDPR, ISO 27001, SOC 2, PCI-DSS según tu caso. Te ayudamos a mantener el cumplimiento."
          },
          {
            question: "¿Cuánto tarda el desarrollo?",
            answer: "Básico: 8-10 semanas. Avanzado: 14-18 semanas. Enterprise: 20+ semanas. Incluye auditoría, desarrollo y testing."
          },
          {
            question: "¿Detectáis amenazas en tiempo real?",
            answer: "Sí, 24/7. IA analiza tráfico, logs y comportamiento para detectar amenazas antes de que causen daño."
          },
          {
            question: "¿Qué pasa si detectáis un ataque?",
            answer: "Respuesta automática: bloqueo, aislamiento, notificación. Tu equipo recibe alerta con contexto completo."
          },
          {
            question: "¿Incluye penetration testing?",
            answer: "Sí, en proyectos avanzados y enterprise. Simulamos ataques reales para validar defensas."
          },
          {
            question: "¿Cuánto cuesta mantenerlo?",
            answer: "Desde 1K€/mes: monitoreo 24/7, actualizaciones, parches, reportes, soporte. Sin costes ocultos."
          }
        ]}
      />
      
      <ServiceCTA
        title="¿Quieres proteger tu negocio con IA?"
        description="Agenda una sesión de 60 minutos. Evaluamos tu seguridad actual y te mostramos cómo mejorarla."
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
