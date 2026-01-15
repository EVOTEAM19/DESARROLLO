import { ServiceHero } from '@/components/services/ServiceHero'
import { ProblemSection } from '@/components/services/ProblemSection'
import { SolutionFeatures } from '@/components/services/SolutionFeatures'
import { ComparisonTable } from '@/components/services/ComparisonTable'
import { ServiceFAQ } from '@/components/services/ServiceFAQ'
import { ServiceCTA } from '@/components/services/ServiceCTA'

export const metadata = {
  title: 'Plataformas Web con IA | FastIA',
  description:
    'Plataformas web escalables con IA integrada. Next.js, TypeScript, Node, PostgreSQL y automatización inteligente para crecer sin fricción.',
}

export default function PlataformasWebIAPage() {
  return (
    <>
      <ServiceHero
        badge="⚡ MVP web en 6-10 semanas (con IA integrada)"
        title="Plataformas Web con IA que escalan contigo"
        subtitle="Arquitectura moderna, performance real y automatización inteligente. De 0 a producto sólido sin deuda técnica."
        image="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1600&q=80"
      />

      <ProblemSection
        problems={[
          {
            title: 'Deuda técnica desde el día 1',
            description:
              'Lanzan rápido pero sin base. A los 3 meses todo se rompe: refactors infinitos y costes multiplicados.',
          },
          {
            title: 'Backoffice inexistente',
            description:
              'La web funciona, pero el equipo no puede operar: sin panel de admin, sin roles, sin trazabilidad.',
          },
          {
            title: 'Integraciones frágiles',
            description:
              'APIs sin contratos, errores silenciosos, y procesos manuales que deberían estar automatizados.',
          },
          {
            title: 'Performance mediocre',
            description:
              'LCP alto, UX lenta y conversiones bajas. Un segundo de más puede costarte miles al mes.',
          },
          {
            title: 'Datos sin valor',
            description:
              'Recolectas datos, pero no los conviertes en decisiones: sin analítica, sin predicción, sin IA útil.',
          },
          {
            title: 'Seguridad como “extra”',
            description:
              'Riesgos de acceso y fuga de datos por falta de buenas prácticas (RLS, auditoría, hardening).',
          },
        ]}
      />

      <SolutionFeatures
        title="Nuestra metodología: plataforma sólida + IA accionable"
        features={[
          {
            title: 'Discovery + Arquitectura',
            duration: '1-2 semanas',
            description:
              'Definimos el core del producto, métricas, roles, flujos y una arquitectura que aguanta el crecimiento.',
            deliverables: [
              { text: 'Mapa de módulos + roadmap MVP' },
              { text: 'Modelo de datos (Postgres) y RLS' },
              { text: 'Arquitectura frontend/backend' },
              { text: 'Estimación realista y riesgos' },
            ],
          },
          {
            title: 'UX/UI orientado a conversión',
            duration: '2-3 semanas',
            description:
              'Diseño claro, rápido y orientado a negocio. Menos fricción → más conversión.',
            deliverables: [
              { text: 'Wireframes + prototipo interactivo' },
              { text: 'Design System reutilizable' },
              { text: 'Accesibilidad y estados' },
            ],
          },
          {
            title: 'Desarrollo full-stack',
            duration: '4-8 semanas',
            description:
              'Next.js + TypeScript + API robusta + base de datos + panel de administración.',
            deliverables: [
              { text: 'Frontend (Next.js) optimizado' },
              { text: 'API (REST/GraphQL) con validación' },
              { text: 'Auth, roles y auditoría' },
              { text: 'Admin panel para operar contenido' },
            ],
          },
          {
            title: 'IA integrada (sin humo)',
            duration: '1-3 semanas (paralelo)',
            description:
              'Automatización y asistentes que ahorran tiempo: búsqueda semántica, clasificación, resúmenes, recomendaciones.',
            deliverables: [
              { text: 'Casos de uso priorizados por ROI' },
              { text: 'Métricas y evaluación' },
              { text: 'Implementación + logs' },
            ],
          },
          {
            title: 'QA + Seguridad',
            duration: '1-2 semanas',
            description:
              'Probamos flujos críticos y blindamos accesos. Menos incidentes, más confianza.',
            deliverables: [
              { text: 'Test plan + checklist' },
              { text: 'Revisión RLS y permisos' },
              { text: 'Performance audit' },
            ],
          },
        ]}
      />

      <ComparisonTable
        title="¿Monolito, modular o microservicios?"
        description="La arquitectura define tu velocidad de crecimiento. Esta es la guía práctica:"
        comparison={{
          headers: ['', 'Monolito', 'Modular', 'Microservicios'],
          // reutilizamos el componente: native/hybrid/pwa -> monolito/modular/microservicios
          rows: [
            {
              feature: 'Velocidad inicial',
              native: { value: '★★★★★', color: 'green', note: 'Rápido para MVP' },
              hybrid: { value: '★★★★☆', color: 'orange', note: 'Muy buena' },
              pwa: { value: '★★★☆☆', color: 'yellow', note: 'Más setup' },
            },
            {
              feature: 'Escalabilidad',
              native: { value: '★★★☆☆', color: 'yellow', note: 'Se complica con el tiempo' },
              hybrid: { value: '★★★★☆', color: 'green', note: 'Equilibrio ideal' },
              pwa: { value: '★★★★★', color: 'green', note: 'Máxima' },
            },
            {
              feature: 'Coste mantenimiento',
              native: { value: '★★★☆☆', color: 'yellow', note: 'Sube con deuda' },
              hybrid: { value: '★★★★☆', color: 'green', note: 'Controlado' },
              pwa: { value: '★★☆☆☆', color: 'red', note: 'Equipo senior necesario' },
            },
            {
              feature: 'Complejidad operativa',
              native: { value: '★★★★★', color: 'green', note: 'Simple' },
              hybrid: { value: '★★★★☆', color: 'orange', note: 'Moderada' },
              pwa: { value: '★★☆☆☆', color: 'red', note: 'Alta' },
            },
          ],
          recommendations: [
            {
              type: 'Monolito',
              when: 'MVP rápido, equipo pequeño, producto en validación',
              examples: 'Landing + dashboard, SaaS early stage',
            },
            {
              type: 'Modular',
              when: 'Mejor opción para 80% de empresas: crecer sin dolor',
              examples: 'Plataformas B2B, marketplaces, portals',
            },
            {
              type: 'Microservicios',
              when: 'Escala grande, múltiples equipos, cargas altas y dominios separados',
              examples: 'Fintech grande, logística, infra multi-país',
            },
          ],
        }}
      />

      <ServiceFAQ
        faqs={[
          {
            question: '¿Cuánto cuesta una plataforma web con IA?',
            answer:
              'Depende del alcance. MVP sólido: 30-60K€. Plataforma completa: 80-200K€. La IA se prioriza por ROI y se integra por módulos.',
          },
          {
            question: '¿Qué stack recomendáis?',
            answer:
              'Normalmente Next.js + TypeScript + Postgres + Supabase (auth/RLS) y servicios modulares. Elegimos por objetivos (performance, equipo, escalabilidad).',
          },
          {
            question: '¿Incluye panel de administración?',
            answer:
              'Sí. Diseñamos el admin para operar el negocio: contenido, usuarios, permisos, logs y automatizaciones.',
          },
          {
            question: '¿La IA va en el frontend o backend?',
            answer:
              'En backend siempre que sea posible (seguridad y control). En frontend solo para UX (autocompletado, previews, etc.).',
          },
          {
            question: '¿Cómo aseguráis seguridad?',
            answer:
              'RLS, validación de inputs, hardening de APIs, separación de permisos, auditoría y buenas prácticas en despliegue.',
          },
          {
            question: '¿Podemos empezar pequeño e ir ampliando?',
            answer:
              'Sí. Construimos por módulos: MVP → métricas → iteración. Es la forma más rentable.',
          },
        ]}
      />

      <ServiceCTA
        title="¿Quieres una plataforma web que no se rompa al escalar?"
        description="En 60 minutos te damos una propuesta de arquitectura + roadmap MVP, sin compromiso."
        primaryButton={{ text: 'Agendar sesión gratuita →', href: '/contacto' }}
        secondaryButton={{ text: 'Ver otros servicios', href: '/servicios' }}
      />
    </>
  )
}

