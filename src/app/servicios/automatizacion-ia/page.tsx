import { ServiceHero } from '@/components/services/ServiceHero'
import { ProblemSection } from '@/components/services/ProblemSection'
import { SolutionFeatures } from '@/components/services/SolutionFeatures'
import { ComparisonTable } from '@/components/services/ComparisonTable'
import { ServiceFAQ } from '@/components/services/ServiceFAQ'
import { ServiceCTA } from '@/components/services/ServiceCTA'

export const metadata = {
  title: 'Automatización con IA | FastIA',
  description:
    'Automatiza procesos de negocio con IA: clasificación, extracción de datos, asistentes y workflows. Menos tareas manuales, más velocidad.',
}

export default function AutomatizacionIAPage() {
  return (
    <>
      <ServiceHero
        badge="⚡ Reduce tareas manuales en 2-6 semanas"
        title="Automatización con IA que ahorra tiempo y dinero"
        subtitle="Workflows inteligentes para operaciones: documentos, tickets, emails, reporting y procesos repetitivos."
        image="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1600&q=80"
      />

      <ProblemSection
        problems={[
          {
            title: 'Procesos manuales eternos',
            description:
              'El equipo dedica horas a tareas repetitivas: copiar/pegar, revisar documentos, actualizar estados.',
          },
          {
            title: 'Errores humanos',
            description:
              'Una validación mal hecha o un dato mal transcrito cuesta incidencias, devoluciones y pérdida de confianza.',
          },
          {
            title: 'Sistemas que no hablan',
            description:
              'CRM, ERP, email y hojas de cálculo sin integración. La operación se vuelve “artesanal”.',
          },
          {
            title: 'Sin trazabilidad',
            description:
              'No hay logs ni auditoría: nadie sabe qué pasó, cuándo y por qué. Imposible optimizar.',
          },
          {
            title: 'Cuellos de botella',
            description:
              'La empresa crece pero el equipo no. Se dispara el coste operativo y se frena el negocio.',
          },
          {
            title: 'IA mal usada',
            description:
              '“ChatGPT por aquí y por allá” sin control. Sin métricas, sin seguridad, sin consistencia.',
          },
        ]}
      />

      <SolutionFeatures
        title="Automatización en serio: casos de uso + métricas + control"
        features={[
          {
            title: 'Mapeo del proceso + ROI',
            duration: '3-5 días',
            description:
              'Identificamos tareas repetitivas, puntos de fallo y priorizamos por impacto económico.',
            deliverables: [
              { text: 'Mapa AS-IS / TO-BE' },
              { text: 'Priorización por ahorro (€/mes)' },
              { text: 'KPIs (tiempo, errores, SLA)' },
            ],
          },
          {
            title: 'Diseño del workflow',
            duration: '1 semana',
            description:
              'Definimos entradas/salidas, reglas, excepciones y fallback humano (human-in-the-loop).',
            deliverables: [
              { text: 'Reglas + validaciones' },
              { text: 'Estados y transiciones' },
              { text: 'Trazabilidad y auditoría' },
            ],
          },
          {
            title: 'Integraciones',
            duration: '1-2 semanas',
            description:
              'Conectamos tus sistemas: CRM, ERP, email, Slack/Teams, webhooks, APIs.',
            deliverables: [
              { text: 'Conectores y webhooks' },
              { text: 'Reintentos y colas' },
              { text: 'Observabilidad (logs/alertas)' },
            ],
          },
          {
            title: 'IA aplicada',
            duration: '1-3 semanas (paralelo)',
            description:
              'Clasificación, extracción, resúmenes, routing automático, asistentes para soporte/operaciones.',
            deliverables: [
              { text: 'Prompts/plantillas controladas' },
              { text: 'Evaluación y métricas de calidad' },
              { text: 'Seguridad (PII/roles)' },
            ],
          },
          {
            title: 'Despliegue + mejora continua',
            duration: '1 semana',
            description:
              'Lanzamos por fases, medimos y optimizamos. Automatización que se mantiene sola.',
            deliverables: [
              { text: 'Dashboard de KPIs' },
              { text: 'Alertas y SLAs' },
              { text: 'Plan de iteración' },
            ],
          },
        ]}
      />

      <ComparisonTable
        title="¿RPA, reglas o IA?"
        description="Elegimos la herramienta correcta para cada parte del proceso:"
        comparison={{
          headers: ['', 'Reglas', 'RPA', 'IA'],
          rows: [
            {
              feature: 'Fiabilidad',
              native: { value: '★★★★★', color: 'green', note: 'Determinista' },
              hybrid: { value: '★★★★☆', color: 'orange', note: 'Depende del UI' },
              pwa: { value: '★★★☆☆', color: 'yellow', note: 'Probabilística' },
            },
            {
              feature: 'Flexibilidad',
              native: { value: '★★☆☆☆', color: 'red', note: 'Limitada' },
              hybrid: { value: '★★★☆☆', color: 'yellow', note: 'Media' },
              pwa: { value: '★★★★★', color: 'green', note: 'Alta' },
            },
            {
              feature: 'Coste operación',
              native: { value: '★★★★★', color: 'green', note: 'Bajo' },
              hybrid: { value: '★★☆☆☆', color: 'red', note: 'Licencias/fragilidad' },
              pwa: { value: '★★★★☆', color: 'orange', note: 'Depende del uso' },
            },
            {
              feature: 'Mejor para…',
              native: { value: 'Normas claras', color: 'green', note: 'Validaciones' },
              hybrid: { value: 'Apps legacy', color: 'yellow', note: 'Sin API' },
              pwa: { value: 'Texto/documentos', color: 'green', note: 'Clasificar/extraer' },
            },
          ],
          recommendations: [
            {
              type: 'Reglas',
              when: 'Procesos con lógica clara y estable',
              examples: 'Validación de datos, routing por reglas',
            },
            {
              type: 'RPA',
              when: 'Legacy sin API donde hay que “usar la pantalla”',
              examples: 'Automatizar tareas en software antiguo',
            },
            {
              type: 'IA',
              when: 'Texto/documentos, ambigüedad o decisiones con contexto',
              examples: 'Emails, tickets, documentos, extracción de campos',
            },
          ],
        }}
      />

      <ServiceFAQ
        faqs={[
          {
            question: '¿Qué procesos se pueden automatizar?',
            answer:
              'Soporte, operaciones, finanzas, RRHH: clasificación de tickets, extracción de facturas, reporting, enrutado, resúmenes, notificaciones, etc.',
          },
          {
            question: '¿Cuándo es mejor usar reglas y cuándo IA?',
            answer:
              'Reglas cuando la lógica es clara. IA cuando hay texto, variabilidad y contexto. Normalmente combinamos ambos.',
          },
          {
            question: '¿Cómo controláis la calidad de la IA?',
            answer:
              'Definimos métricas, datasets de prueba, evaluación continua y fallback humano para casos límite.',
          },
          {
            question: '¿Es seguro para datos sensibles?',
            answer:
              'Sí: aplicamos redacción de PII, control de accesos, logs y políticas de retención. La seguridad es parte del diseño.',
          },
          {
            question: '¿Cuánto se tarda en ver impacto?',
            answer:
              'En 2-6 semanas suele verse el primer ahorro real con un proceso priorizado por ROI.',
          },
        ]}
      />

      <ServiceCTA
        title="¿Quieres automatizar tu operación con IA?"
        description="Dinos tu proceso y te devolvemos un plan con ROI estimado y roadmap de implementación."
        primaryButton={{ text: 'Demo gratuita 30min →', href: '/contacto' }}
        secondaryButton={{ text: 'Ver otros servicios', href: '/servicios' }}
      />
    </>
  )
}

