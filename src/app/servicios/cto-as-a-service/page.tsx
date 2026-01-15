import { ServiceHero } from '@/components/services/ServiceHero'
import { ProblemSection } from '@/components/services/ProblemSection'
import { SolutionFeatures } from '@/components/services/SolutionFeatures'
import { ComparisonTable } from '@/components/services/ComparisonTable'
import { ServiceFAQ } from '@/components/services/ServiceFAQ'
import { ServiceCTA } from '@/components/services/ServiceCTA'

export const metadata = {
  title: 'CTO as a Service | FastIA',
  description:
    'Dirección tecnológica senior bajo demanda: estrategia, arquitectura, equipo, delivery y control de calidad sin contratar un CTO full-time.',
}

export default function CTOAsAServicePage() {
  return (
    <>
      <ServiceHero
        badge="⚡ CTO senior en días, no en meses"
        title="CTO as a Service para ejecutar con claridad"
        subtitle="Estrategia, arquitectura y delivery. Te damos liderazgo técnico real sin aumentar estructura fija."
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80"
      />

      <ProblemSection
        problems={[
          {
            title: 'Decisiones técnicas a ciegas',
            description:
              'Stack, arquitectura y proveedores se eligen por intuición. Luego llegan reescrituras y costes sorpresa.',
          },
          {
            title: 'Equipo sin dirección',
            description:
              'Hay devs, pero falta liderazgo: prioridades difusas, calidad irregular y poca accountability.',
          },
          {
            title: 'Delivery lento',
            description:
              'Mucho trabajo “en progreso” y poco entregable. Sin sprints, sin definición, sin demos.',
          },
          {
            title: 'Sin control de costes',
            description:
              'Infra, licencias y proveedores sin gobernanza. El gasto crece más rápido que el valor.',
          },
          {
            title: 'Riesgos de seguridad',
            description:
              'Auth, roles, secretos, despliegues… sin buenas prácticas, la exposición es alta.',
          },
          {
            title: 'Vendor lock-in',
            description:
              'Dependencia de una agencia o persona. Si se va, el producto se queda sin rumbo.',
          },
        ]}
      />

      <SolutionFeatures
        title="Qué hacemos como CTO externo"
        features={[
          {
            title: 'Estrategia tecnológica',
            duration: 'Semana 1',
            description:
              'Alineamos tecnología con negocio: objetivos, roadmap, KPIs y decisiones de arquitectura.',
            deliverables: [
              { text: 'Roadmap por sprints' },
              { text: 'Stack recomendado (con razones)' },
              { text: 'Plan de riesgos + mitigación' },
            ],
          },
          {
            title: 'Arquitectura y estándares',
            duration: 'Semanas 1-2',
            description:
              'Definimos cómo construir para escalar: módulos, CI/CD, testing, observabilidad y seguridad.',
            deliverables: [
              { text: 'Arquitectura target + ADRs' },
              { text: 'Guías de calidad (linting, review, testing)' },
              { text: 'Pipelines CI/CD' },
            ],
          },
          {
            title: 'Gestión de equipo y delivery',
            duration: 'Continuo',
            description:
              'Sprints de 2 semanas, definición de historias, priorización, demos y control de alcance.',
            deliverables: [
              { text: 'Rituales ágiles + tablero' },
              { text: 'KPIs de delivery (lead time, throughput)' },
              { text: 'Revisión semanal con stakeholders' },
            ],
          },
          {
            title: 'Selección de proveedores',
            duration: '1-2 semanas',
            description:
              'Evaluamos agencias/freelancers y evitamos lock-in. Contratación con criterios objetivos.',
            deliverables: [
              { text: 'RFP + evaluación técnica' },
              { text: 'Pruebas y entrevistas' },
              { text: 'Plan de onboarding y handoff' },
            ],
          },
          {
            title: 'Governance + seguridad',
            duration: 'Continuo',
            description:
              'Buenas prácticas en auth, secrets, permisos, despliegue y monitorización.',
            deliverables: [
              { text: 'Checklist seguridad' },
              { text: 'Políticas de acceso y auditoría' },
              { text: 'Alertas y observabilidad' },
            ],
          },
        ]}
      />

      <ComparisonTable
        title="¿CTO full-time, agencia o CTO as a Service?"
        description="Elige el modelo que encaja con tu fase:"
        comparison={{
          headers: ['', 'CTO Full-time', 'Agencia', 'CTO as a Service'],
          rows: [
            {
              feature: 'Coste',
              native: { value: '€€€€€', color: 'red', note: 'Alto fijo' },
              hybrid: { value: '€€€', color: 'orange', note: 'Variable' },
              pwa: { value: '€€', color: 'green', note: 'Optimizado' },
            },
            {
              feature: 'Velocidad de arranque',
              native: { value: '★★☆☆☆', color: 'red', note: 'Meses' },
              hybrid: { value: '★★★★☆', color: 'green', note: 'Rápido' },
              pwa: { value: '★★★★★', color: 'green', note: 'Días' },
            },
            {
              feature: 'Dirección estratégica',
              native: { value: '★★★★★', color: 'green', note: 'Alta' },
              hybrid: { value: '★★★☆☆', color: 'yellow', note: 'Depende' },
              pwa: { value: '★★★★★', color: 'green', note: 'Alta' },
            },
            {
              feature: 'Riesgo lock-in',
              native: { value: '★★★★★', color: 'green', note: 'Bajo' },
              hybrid: { value: '★★☆☆☆', color: 'red', note: 'Medio/alto' },
              pwa: { value: '★★★★☆', color: 'orange', note: 'Bajo/medio' },
            },
          ],
          recommendations: [
            {
              type: 'CTO Full-time',
              when: 'Scale-up con equipo grande y necesidades permanentes',
              examples: 'Producto maduro, múltiples squads',
            },
            {
              type: 'Agencia',
              when: 'Necesitas ejecución puntual y tienes dirección interna fuerte',
              examples: 'Proyecto cerrado, alcance claro',
            },
            {
              type: 'CTO as a Service',
              when: 'Startup/empresa en crecimiento que necesita liderazgo sin coste fijo',
              examples: 'MVP, crecimiento, re-arquitectura, control de proveedores',
            },
          ],
        }}
      />

      <ServiceFAQ
        faqs={[
          {
            question: '¿Cuántas horas/semana necesitáis?',
            answer:
              'Depende de la fase. Habitual: 8-20h/semana. Podemos subir/bajar según roadmap y necesidades.',
          },
          {
            question: '¿También gestionáis al equipo y la delivery?',
            answer:
              'Sí. Organizamos sprints, definimos prioridades, revisamos calidad y desbloqueamos al equipo.',
          },
          {
            question: '¿Podéis evaluar mi stack actual?',
            answer:
              'Sí. Hacemos auditoría: arquitectura, código, infra, seguridad, costes y proponemos plan realista.',
          },
          {
            question: '¿Esto sustituye a contratar un CTO?',
            answer:
              'Para muchas empresas en fase MVP/crecimiento, sí. Si en el futuro necesitas CTO full-time, te ayudamos a contratar y hacer transición.',
          },
        ]}
      />

      <ServiceCTA
        title="¿Necesitas dirección tecnológica ya?"
        description="Te ayudamos a ordenar prioridades, reducir riesgo y acelerar entregas desde la primera semana."
        primaryButton={{ text: 'Agendar sesión gratuita →', href: '/contacto' }}
        secondaryButton={{ text: 'Ver otros servicios', href: '/servicios' }}
      />
    </>
  )
}

