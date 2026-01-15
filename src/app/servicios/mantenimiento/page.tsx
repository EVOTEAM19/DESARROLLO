import { ServiceHero } from '@/components/services/ServiceHero'
import { ProblemSection } from '@/components/services/ProblemSection'
import { SolutionFeatures } from '@/components/services/SolutionFeatures'
import { ComparisonTable } from '@/components/services/ComparisonTable'
import { ServiceFAQ } from '@/components/services/ServiceFAQ'
import { ServiceCTA } from '@/components/services/ServiceCTA'

export const metadata = {
  title: 'Mantenimiento y Evolución | FastIA',
  description:
    'Mantenimiento de software con SLAs, monitorización, seguridad y evolución continua. Menos incidencias, más velocidad.',
}

export default function MantenimientoPage() {
  return (
    <>
      <ServiceHero
        badge="⚡ Soporte + evolución con SLAs y control"
        title="Mantenimiento que evita incendios"
        subtitle="Monitorización, seguridad, mejoras y nuevas features. Tu producto estable y en crecimiento."
        image="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1600&q=80"
      />

      <ProblemSection
        problems={[
          {
            title: 'Incidencias recurrentes',
            description:
              'Se arregla lo urgente, pero no la raíz. Los bugs vuelven y el equipo se quema.',
          },
          {
            title: 'Sin monitorización',
            description:
              'Te enteras por el cliente. Sin alertas, logs y métricas, operar es ir a ciegas.',
          },
          {
            title: 'Actualizaciones rotas',
            description:
              'Cambios de dependencias, releases y seguridad sin control causan regresiones.',
          },
          {
            title: 'Backlog eterno',
            description:
              'Nuevas mejoras se retrasan porque todo el tiempo se va en “apagar fuegos”.',
          },
          {
            title: 'Seguridad olvidada',
            description:
              'Vulnerabilidades sin parchear y accesos sin auditoría. Riesgo acumulado.',
          },
          {
            title: 'Sin ownership',
            description:
              'Nadie se responsabiliza del estado del producto. Falta un sistema claro de mantenimiento.',
          },
        ]}
      />

      <SolutionFeatures
        title="Nuestro sistema de mantenimiento (con métricas)"
        features={[
          {
            title: 'Onboarding técnico',
            duration: '1 semana',
            description:
              'Entendemos el producto y ponemos orden: repos, entornos, accesos, documentación mínima.',
            deliverables: [
              { text: 'Inventario + mapa de arquitectura' },
              { text: 'Checklist de seguridad y accesos' },
              { text: 'Plan de estabilización 30 días' },
            ],
          },
          {
            title: 'Monitorización + alertas',
            duration: '1 semana',
            description:
              'Logs, métricas, errores y uptime. Alertas antes de que el cliente note el problema.',
            deliverables: [
              { text: 'Dashboards (errores, rendimiento, uptime)' },
              { text: 'Alertas (SLA/SLO) y guardias' },
              { text: 'Runbooks básicos' },
            ],
          },
          {
            title: 'Mantenimiento correctivo',
            duration: 'Continuo',
            description:
              'Bugs críticos, hotfixes y parches con proceso y QA.',
            deliverables: [
              { text: 'Gestión de incidencias por severidad' },
              { text: 'Root cause analysis en casos críticos' },
              { text: 'Hotfix + verificación' },
            ],
          },
          {
            title: 'Mantenimiento evolutivo',
            duration: 'Continuo',
            description:
              'Mejoras, features, UX y performance. Tu producto no se estanca.',
            deliverables: [
              { text: 'Backlog priorizado (valor vs esfuerzo)' },
              { text: 'Sprints de mejoras y releases' },
              { text: 'Optimización performance' },
            ],
          },
          {
            title: 'Seguridad y compliance',
            duration: 'Mensual',
            description:
              'Actualizaciones, vulnerabilidades y revisiones de permisos.',
            deliverables: [
              { text: 'Parcheo de dependencias' },
              { text: 'Revisión de permisos/roles' },
              { text: 'Informe de riesgos' },
            ],
          },
        ]}
      />

      <ComparisonTable
        title="¿Mantenimiento reactivo o proactivo?"
        description="La diferencia entre apagar fuegos o prevenirlos:"
        comparison={{
          headers: ['', 'Reactivo', 'Mixto', 'Proactivo'],
          rows: [
            {
              feature: 'Tiempo en incidentes',
              native: { value: 'Alto', color: 'red', note: 'Siempre urgente' },
              hybrid: { value: 'Medio', color: 'yellow', note: 'Mejorando' },
              pwa: { value: 'Bajo', color: 'green', note: 'Prevención' },
            },
            {
              feature: 'Estabilidad',
              native: { value: '★★☆☆☆', color: 'red', note: 'Regresiones' },
              hybrid: { value: '★★★☆☆', color: 'yellow', note: 'Aceptable' },
              pwa: { value: '★★★★★', color: 'green', note: 'Alta' },
            },
            {
              feature: 'Velocidad de evolución',
              native: { value: '★☆☆☆☆', color: 'red', note: 'Bloqueada' },
              hybrid: { value: '★★★☆☆', color: 'orange', note: 'OK' },
              pwa: { value: '★★★★☆', color: 'green', note: 'Constante' },
            },
            {
              feature: 'Coste mensual',
              native: { value: 'Impredecible', color: 'red', note: 'Sorpresas' },
              hybrid: { value: 'Controlado', color: 'orange', note: 'Mejor' },
              pwa: { value: 'Optimizado', color: 'green', note: 'Planificado' },
            },
          ],
          recommendations: [
            {
              type: 'Reactivo',
              when: 'Solo si el producto no es crítico',
              examples: 'Proyectos internos pequeños',
            },
            {
              type: 'Mixto',
              when: 'Transición hacia operación estable',
              examples: 'Producto con crecimiento moderado',
            },
            {
              type: 'Proactivo',
              when: 'Producto crítico o en crecimiento',
              examples: 'SaaS, e-commerce, plataformas B2B',
            },
          ],
        }}
      />

      <ServiceFAQ
        faqs={[
          {
            question: '¿Ofrecéis SLAs?',
            answer:
              'Sí. Definimos severidades, tiempos de respuesta y resolución según necesidad del negocio.',
          },
          {
            question: '¿Podéis mantener un producto hecho por otro equipo?',
            answer:
              'Sí. Hacemos onboarding técnico y estabilizamos primero antes de acelerar nuevas features.',
          },
          {
            question: '¿Incluye mejoras o solo bugs?',
            answer:
              'Incluye ambos: correctivo (bugs) y evolutivo (mejoras/features) en un sistema ordenado.',
          },
          {
            question: '¿Qué pasa con actualizaciones de seguridad?',
            answer:
              'Las gestionamos con revisiones periódicas y releases controladas para evitar roturas.',
          },
        ]}
      />

      <ServiceCTA
        title="¿Quieres un producto estable y que siga creciendo?"
        description="Ponemos orden, monitorizamos y evolucionamos tu software con un proceso profesional."
        primaryButton={{ text: 'Demo gratuita 30min →', href: '/contacto' }}
        secondaryButton={{ text: 'Ver otros servicios', href: '/servicios' }}
      />
    </>
  )
}

