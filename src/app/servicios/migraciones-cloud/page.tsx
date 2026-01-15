import { ServiceHero } from '@/components/services/ServiceHero'
import { ProblemSection } from '@/components/services/ProblemSection'
import { SolutionFeatures } from '@/components/services/SolutionFeatures'
import { ComparisonTable } from '@/components/services/ComparisonTable'
import { ServiceFAQ } from '@/components/services/ServiceFAQ'
import { ServiceCTA } from '@/components/services/ServiceCTA'

export const metadata = {
  title: 'Migraciones Cloud | FastIA',
  description:
    'Migraciones a cloud sin downtime: arquitectura, seguridad, CI/CD y optimización de costes. AWS/GCP/Azure según tu caso.',
}

export default function MigracionesCloudPage() {
  return (
    <>
      <ServiceHero
        badge="⚡ Migración controlada en 3-8 semanas"
        title="Migraciones Cloud sin sustos (y con ahorro real)"
        subtitle="Moderniza infra, mejora seguridad y reduce costes. Migramos por fases, con rollback y observabilidad."
        image="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1600&q=80"
      />

      <ProblemSection
        problems={[
          {
            title: 'Downtime y miedo al cambio',
            description:
              'Migrar “a pelo” da miedo. Un corte puede costar miles y dañar la reputación.',
          },
          {
            title: 'Costes descontrolados',
            description:
              'Cloud mal configurado = facturas sorpresa. Sin governance ni límites, el gasto se dispara.',
          },
          {
            title: 'Seguridad incompleta',
            description:
              'Secrets expuestos, permisos amplios, redes sin segmentación. Riesgo innecesario.',
          },
          {
            title: 'CI/CD inexistente',
            description:
              'Deploys manuales, errores en producción y ciclos lentos. Sin automatización no hay velocidad.',
          },
          {
            title: 'Observabilidad cero',
            description:
              'Sin logs/metrics/traces no se puede operar. Incidentes que tardan horas en resolverse.',
          },
          {
            title: 'Arquitectura legacy',
            description:
              'Monolitos rígidos, acoplamientos y dependencias. La migración es la oportunidad de hacerlo bien.',
          },
        ]}
      />

      <SolutionFeatures
        title="Plan de migración por fases (con rollback)"
        features={[
          {
            title: 'Assessment + diseño target',
            duration: '1-2 semanas',
            description:
              'Auditoría técnica y diseño de arquitectura objetivo: redes, IAM, despliegue y datos.',
            deliverables: [
              { text: 'Inventario de sistemas + dependencias' },
              { text: 'Arquitectura target + riesgos' },
              { text: 'Plan de migración por fases' },
            ],
          },
          {
            title: 'Infra como código',
            duration: '1 semana',
            description:
              'Provisionado reproducible para evitar “clickops”.',
            deliverables: [
              { text: 'IaC (Terraform/alternativas)' },
              { text: 'Entornos: dev/staging/prod' },
              { text: 'Seguridad base (IAM, redes)' },
            ],
          },
          {
            title: 'CI/CD + despliegue',
            duration: '1 semana',
            description:
              'Deploys automáticos con checks. Menos errores, más velocidad.',
            deliverables: [
              { text: 'Pipelines CI/CD' },
              { text: 'Deploy blue/green o canary' },
              { text: 'Rollback seguro' },
            ],
          },
          {
            title: 'Datos y servicios',
            duration: '1-3 semanas',
            description:
              'Migramos BBDD, almacenamiento y servicios con mínima interrupción.',
            deliverables: [
              { text: 'Plan de migración de datos' },
              { text: 'Backups + verificación' },
              { text: 'Pruebas de carga' },
            ],
          },
          {
            title: 'Observabilidad + optimización de costes',
            duration: 'Continuo',
            description:
              'Logs, métricas y alertas + control de costes (FinOps).',
            deliverables: [
              { text: 'Dashboards + alertas' },
              { text: 'Presupuestos y límites' },
              { text: 'Informe de ahorro' },
            ],
          },
        ]}
      />

      <ComparisonTable
        title="¿Lift & Shift o Modernización?"
        description="Dos estrategias. Elegimos según riesgo, tiempo y retorno:"
        comparison={{
          headers: ['', 'Lift & Shift', 'Híbrido', 'Modernización'],
          rows: [
            {
              feature: 'Velocidad inicial',
              native: { value: '★★★★★', color: 'green', note: 'Rápido' },
              hybrid: { value: '★★★★☆', color: 'orange', note: 'Buena' },
              pwa: { value: '★★★☆☆', color: 'yellow', note: 'Más tiempo' },
            },
            {
              feature: 'Ahorro a largo plazo',
              native: { value: '★★☆☆☆', color: 'red', note: 'Limitado' },
              hybrid: { value: '★★★★☆', color: 'green', note: 'Alto' },
              pwa: { value: '★★★★★', color: 'green', note: 'Máximo' },
            },
            {
              feature: 'Riesgo',
              native: { value: '★★★☆☆', color: 'yellow', note: 'Medio' },
              hybrid: { value: '★★★★☆', color: 'green', note: 'Controlado' },
              pwa: { value: '★★★☆☆', color: 'yellow', note: 'Medio' },
            },
            {
              feature: 'Cambios en producto',
              native: { value: '★☆☆☆☆', color: 'green', note: 'Mínimos' },
              hybrid: { value: '★★★☆☆', color: 'orange', note: 'Algunos' },
              pwa: { value: '★★★★★', color: 'green', note: 'Muchos' },
            },
          ],
          recommendations: [
            {
              type: 'Lift & Shift',
              when: 'Necesitas mover rápido y estabilizar',
              examples: 'Legacy urgente, fin de soporte, quick win',
            },
            {
              type: 'Híbrido',
              when: 'Balance entre velocidad y mejora',
              examples: 'Refactor por módulos, mejoras de seguridad/CI',
            },
            {
              type: 'Modernización',
              when: 'Quieres maximizar ROI y escalabilidad',
              examples: 'Contenedores, arquitectura modular, serverless',
            },
          ],
        }}
      />

      <ServiceFAQ
        faqs={[
          {
            question: '¿Se puede migrar sin downtime?',
            answer:
              'Sí. Diseñamos migración por fases, con blue/green, replicación y ventanas controladas cuando aplique.',
          },
          {
            question: '¿Qué cloud recomendáis?',
            answer:
              'Depende: AWS/GCP/Azure. Elegimos por necesidades, equipo, compliance y costes.',
          },
          {
            question: '¿Cómo evitáis facturas sorpresa?',
            answer:
              'Presupuestos, límites, tagging, alertas y revisión de dimensionamiento. FinOps desde el inicio.',
          },
          {
            question: '¿Incluye CI/CD?',
            answer:
              'Sí. Dejarlo manual es volver al pasado. Automatizamos deploys con checks y rollback.',
          },
        ]}
      />

      <ServiceCTA
        title="¿Listo para migrar a cloud con seguridad?"
        description="Te damos un plan por fases con riesgos, costes y roadmap. Sin compromiso."
        primaryButton={{ text: 'Demo gratuita 30min →', href: '/contacto' }}
        secondaryButton={{ text: 'Ver otros servicios', href: '/servicios' }}
      />
    </>
  )
}

