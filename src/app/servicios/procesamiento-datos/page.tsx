import { ServiceHero } from '@/components/services/ServiceHero'
import { ProblemSection } from '@/components/services/ProblemSection'
import { SolutionFeatures } from '@/components/services/SolutionFeatures'
import { ComparisonTable } from '@/components/services/ComparisonTable'
import { ServiceFAQ } from '@/components/services/ServiceFAQ'
import { ServiceCTA } from '@/components/services/ServiceCTA'

export const metadata = {
  title: 'Procesamiento de Datos con IA | FastIA',
  description: 'Transformación y análisis de grandes volúmenes de datos para extraer insights accionables.',
}

export default function ProcesamientoDatosPage() {
  return (
    <>
      <ServiceHero
        badge="💾 Datos que generan valor"
        title="Procesamiento de Datos que Impulsa Decisiones"
        subtitle="Transformación y análisis de grandes volúmenes de datos para extraer insights accionables en tiempo real."
        image="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80"
      />
      
      <ProblemSection
        problems={[
          {
            title: "Datos en silos",
            description: "Tus datos están dispersos en Excel, bases de datos, APIs y sistemas legacy. Imposible de analizar."
          },
          {
            title: "Procesamiento lento",
            description: "Un análisis que debería tardar minutos tarda horas. Tu infraestructura no escala."
          },
          {
            title: "Calidad inconsistente",
            description: "Datos duplicados, incompletos, con errores. No puedes confiar en los resultados."
          },
          {
            title: "Sin automatización",
            description: "Procesos manuales que consumen horas cada día. No escalan con el crecimiento."
          },
          {
            title: "Insights ocultos",
            description: "Tienes datos valiosos pero no sabes cómo extraerlos. Falta de herramientas y expertise."
          },
          {
            title: "Costes descontrolados",
            description: "Infraestructura cara que no usas al 100%. Pagas por recursos ociosos."
          }
        ]}
      />
      
      <SolutionFeatures
        title="Nuestra Metodología: Datos que Funcionan"
        features={[
          {
            title: "Auditoría de Datos",
            duration: "1-2 semanas",
            description: "Identificamos todas tus fuentes de datos y evaluamos su calidad.",
            deliverables: [
              "Inventario de datos",
              "Análisis de calidad",
              "Gaps identificados",
              "Roadmap de integración"
            ]
          },
          {
            title: "Arquitectura de Datos",
            duration: "2-3 semanas",
            description: "Diseñamos un data pipeline escalable y eficiente.",
            deliverables: [
              "Arquitectura definida",
              "Tech stack seleccionado",
              "Plan de migración",
              "Estimación de costes"
            ]
          },
          {
            title: "ETL/ELT Pipeline",
            duration: "4-6 semanas",
            description: "Construimos pipelines que extraen, transforman y cargan datos automáticamente.",
            deliverables: [
              "Pipeline funcional",
              "Automatización completa",
              "Monitoreo y alertas",
              "Documentación técnica"
            ]
          },
          {
            title: "Data Warehouse/Lake",
            duration: "3-4 semanas",
            description: "Creamos un repositorio centralizado de datos listo para análisis.",
            deliverables: [
              "Data warehouse/lake",
              "Modelo de datos",
              "Optimización de queries",
              "Backup y recovery"
            ]
          },
          {
            title: "Dashboards y Analytics",
            duration: "2-3 semanas",
            description: "Construimos dashboards interactivos para visualizar insights.",
            deliverables: [
              "Dashboards personalizados",
              "Reportes automatizados",
              "Alertas inteligentes",
              "Acceso self-service"
            ]
          }
        ]}
      />
      
      <ComparisonTable
        title="Arquitecturas de Datos"
        description="Diferentes enfoques según tus necesidades:"
        comparison={{
          headers: ['', 'Data Warehouse', 'Data Lake', 'Lakehouse'],
          rows: [
            {
              feature: 'Estructura',
              native: { value: 'Estructurado', color: 'green', note: 'SQL, tablas relacionales' },
              hybrid: { value: 'No estructurado', color: 'green', note: 'Raw data, flexible' },
              pwa: { value: 'Híbrido', color: 'green', note: 'Lo mejor de ambos' }
            },
            {
              feature: 'Escalabilidad',
              native: { value: 'Alta', color: 'green', note: 'Pero costosa' },
              hybrid: { value: 'Muy alta', color: 'green', note: 'Escala horizontal' },
              pwa: { value: 'Muy alta', color: 'green', note: 'Mejor balance' }
            },
            {
              feature: 'Time to insights',
              native: { value: 'Rápido', color: 'green', note: 'Datos ya procesados' },
              hybrid: { value: 'Lento', color: 'red', note: 'Requiere procesamiento' },
              pwa: { value: 'Rápido', color: 'green', note: 'Optimizado' }
            },
            {
              feature: 'Coste',
              native: { value: '€€€', color: 'red', note: 'Alto' },
              hybrid: { value: '€€', color: 'green', note: 'Más económico' },
              pwa: { value: '€€€', color: 'orange', note: 'Intermedio' }
            },
            {
              feature: 'Uso ideal',
              native: { value: 'BI tradicional', color: 'green', note: 'Reportes estructurados' },
              hybrid: { value: 'ML/AI', color: 'green', note: 'Análisis exploratorio' },
              pwa: { value: 'Todo', color: 'green', note: 'Versátil' }
            }
          ],
          recommendations: [
            {
              type: 'Data Warehouse',
              when: 'Datos estructurados, BI tradicional, reportes predefinidos',
              examples: 'Retail, finanzas, operaciones'
            },
            {
              type: 'Data Lake',
              when: 'Datos diversos, ML/AI, análisis exploratorio',
              examples: 'Tech, investigación, IoT'
            },
            {
              type: 'Lakehouse',
              when: 'Necesitas lo mejor de ambos mundos',
              examples: 'Empresas grandes, casos complejos'
            }
          ]
        }}
      />
      
      <ServiceFAQ
        faqs={[
          {
            question: "¿Cuánto cuesta un proyecto de procesamiento de datos?",
            answer: "MVP: 40-60K€. Solución completa: 100-200K€. Incluye arquitectura, pipeline, data warehouse y dashboards."
          },
          {
            question: "¿Qué volumen de datos puedo procesar?",
            answer: "Desde GB hasta PB. Diseñamos la arquitectura según tu volumen actual y proyección de crecimiento."
          },
          {
            question: "¿Cuánto tarda el desarrollo?",
            answer: "MVP: 10-12 semanas. Solución completa: 16-20 semanas. Incluye discovery, desarrollo, testing y deploy."
          },
          {
            question: "¿Qué tecnologías usáis?",
            answer: "Depende del caso. Común: AWS/GCP/Azure, Spark, Kafka, Airflow, dbt, Snowflake/BigQuery. Te recomendamos la mejor stack."
          },
          {
            question: "¿Se integra con mis sistemas?",
            answer: "Sí, 100%. Integramos con SAP, Salesforce, bases de datos, APIs, archivos... Lo que necesites."
          },
          {
            question: "¿Los datos están seguros?",
            answer: "Sí. Encriptación en tránsito y reposo, acceso controlado, cumplimiento GDPR, backups automáticos."
          },
          {
            question: "¿Cuánto cuesta mantenerlo?",
            answer: "Desde 1.5K€/mes: monitoreo, optimización, actualizaciones, soporte. Costes de infraestructura aparte."
          }
        ]}
      />
      
      <ServiceCTA
        title="¿Quieres transformar tus datos en ventaja competitiva?"
        description="Agenda una sesión de 60 minutos. Analizamos tus datos y te mostramos qué podemos hacer."
        primaryButton={{
          text: "Agendar sesión gratuita →",
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
