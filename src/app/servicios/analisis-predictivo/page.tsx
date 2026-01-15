import { ServiceHero } from '@/components/services/ServiceHero'
import { ProblemSection } from '@/components/services/ProblemSection'
import { SolutionFeatures } from '@/components/services/SolutionFeatures'
import { ComparisonTable } from '@/components/services/ComparisonTable'
import { ServiceFAQ } from '@/components/services/ServiceFAQ'
import { ServiceCTA } from '@/components/services/ServiceCTA'

export const metadata = {
  title: 'Análisis Predictivo con IA | FastIA',
  description: 'Machine Learning para predecir tendencias, detectar patrones y tomar decisiones basadas en datos.',
}

export default function AnalisisPredictivoPage() {
  return (
    <>
      <ServiceHero
        badge="📊 Predice el futuro de tu negocio"
        title="Análisis Predictivo que Transforma Decisiones"
        subtitle="Machine Learning para predecir tendencias, detectar patrones y tomar decisiones basadas en datos reales."
        image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
      />
      
      <ProblemSection
        problems={[
          {
            title: "Decisiones a ciegas",
            description: "Tomas decisiones basadas en intuición, no en datos. No sabes qué va a pasar mañana."
          },
          {
            title: "Datos sin explotar",
            description: "Tienes terabytes de datos pero no sabes qué hacer con ellos. Información valiosa sin usar."
          },
          {
            title: "Análisis reactivos, no predictivos",
            description: "Ves qué pasó ayer, pero no qué pasará mañana. Siempre vas un paso por detrás."
          },
          {
            title: "Modelos que no escalan",
            description: "Excel y dashboards manuales. No puedes procesar millones de registros en tiempo real."
          },
          {
            title: "Falta de precisión",
            description: "Predicciones con 40% de error. No confías en los resultados y sigues usando tu intuición."
          },
          {
            title: "Sin integración con sistemas",
            description: "El modelo vive aislado. No se integra con tu ERP, CRM ni herramientas de negocio."
          }
        ]}
      />
      
      <SolutionFeatures
        title="Nuestra Metodología: ML que Funciona"
        features={[
          {
            title: "Discovery de Datos",
            duration: "2 semanas",
            description: "Analizamos tus datos, identificamos fuentes y definimos qué predecir.",
            deliverables: [
              "Auditoría de datos",
              "Fuentes identificadas",
              "Objetivos de predicción",
              "Métricas de éxito"
            ]
          },
          {
            title: "Feature Engineering",
            duration: "2-3 semanas",
            description: "Preparamos y limpiamos datos para entrenar modelos precisos.",
            deliverables: [
              "Pipeline de datos",
              "Features extraídas",
              "Datos normalizados",
              "Validación de calidad"
            ]
          },
          {
            title: "Desarrollo de Modelos",
            duration: "4-6 semanas",
            description: "Entrenamos y optimizamos modelos de ML para tu caso específico.",
            deliverables: [
              "Modelo entrenado",
              "Validación cruzada",
              "Métricas de precisión",
              "A/B testing"
            ]
          },
          {
            title: "Integración y Deploy",
            duration: "2-3 semanas",
            description: "Integramos el modelo con tus sistemas y lo desplegamos en producción.",
            deliverables: [
              "API de predicciones",
              "Integración con sistemas",
              "Dashboard de métricas",
              "Sistema de alertas"
            ]
          },
          {
            title: "Monitoreo y Mejora",
            duration: "Continuo",
            description: "Monitoreamos el modelo y lo reentrenamos cuando baja la precisión.",
            deliverables: [
              "Monitoreo 24/7",
              "Reentrenamiento automático",
              "Reportes mensuales",
              "Mejora continua"
            ]
          }
        ]}
      />
      
      <ComparisonTable
        title="Tipos de Análisis Predictivo"
        description="Diferentes técnicas para diferentes necesidades:"
        comparison={{
          headers: ['', 'Forecasting', 'Clasificación', 'Recomendación'],
          rows: [
            {
              feature: 'Uso principal',
              native: { value: 'Series temporales', color: 'green', note: 'Ventas, demanda, tráfico' },
              hybrid: { value: 'Categorización', color: 'green', note: 'Churn, fraude, calidad' },
              pwa: { value: 'Personalización', color: 'green', note: 'Productos, contenido' }
            },
            {
              feature: 'Precisión típica',
              native: { value: '85-95%', color: 'green', note: 'Depende de datos históricos' },
              hybrid: { value: '90-98%', color: 'green', note: 'Con datos balanceados' },
              pwa: { value: '70-85%', color: 'orange', note: 'Métricas de relevancia' }
            },
            {
              feature: 'Complejidad',
              native: { value: 'Media', color: 'orange', note: 'Requiere datos históricos' },
              hybrid: { value: 'Alta', color: 'red', note: 'Feature engineering crítico' },
              pwa: { value: 'Media', color: 'orange', note: 'Colaborative filtering' }
            },
            {
              feature: 'Time to market',
              native: { value: '6-8 sem', color: 'orange', note: '' },
              hybrid: { value: '8-12 sem', color: 'red', note: '' },
              pwa: { value: '4-6 sem', color: 'green', note: '' }
            },
            {
              feature: 'Ejemplos',
              native: { value: 'Ventas, demanda', color: 'green', note: '' },
              hybrid: { value: 'Churn, fraude', color: 'green', note: '' },
              pwa: { value: 'Netflix, Amazon', color: 'green', note: '' }
            }
          ],
          recommendations: [
            {
              type: 'Forecasting',
              when: 'Necesitas predecir valores futuros (ventas, demanda, tráfico)',
              examples: 'Retail, logística, energía, finanzas'
            },
            {
              type: 'Clasificación',
              when: 'Necesitas categorizar o detectar eventos (churn, fraude, calidad)',
              examples: 'Banca, seguros, e-commerce, SaaS'
            },
            {
              type: 'Recomendación',
              when: 'Quieres personalizar experiencia (productos, contenido)',
              examples: 'Streaming, e-commerce, medios, educación'
            }
          ]
        }}
      />
      
      <ServiceFAQ
        faqs={[
          {
            question: "¿Cuánto cuesta un proyecto de análisis predictivo?",
            answer: "MVP: 30-50K€. Solución completa: 80-150K€. Incluye discovery, desarrollo de modelos, integración y 6 meses de soporte."
          },
          {
            question: "¿Qué datos necesito?",
            answer: "Depende del caso. Mínimo: 6-12 meses de datos históricos. Ideal: 2+ años. Te ayudamos a identificar qué datos necesitas."
          },
          {
            question: "¿Cuánto tarda el desarrollo?",
            answer: "MVP: 8-10 semanas. Solución completa: 14-18 semanas. Incluye discovery, desarrollo, testing y deploy."
          },
          {
            question: "¿Qué precisión puedo esperar?",
            answer: "Depende del caso. Forecasting: 85-95%. Clasificación: 90-98%. Te damos métricas realistas en el discovery."
          },
          {
            question: "¿Se integra con mis sistemas?",
            answer: "Sí, 100%. Integramos con SAP, Salesforce, bases de datos, APIs... Lo que necesites."
          },
          {
            question: "¿El modelo se actualiza solo?",
            answer: "Sí, con reentrenamiento automático. El modelo aprende de nuevos datos y se ajusta cuando baja la precisión."
          },
          {
            question: "¿Qué pasa si mis datos cambian?",
            answer: "El modelo se adapta. Reentrenamos automáticamente cuando detectamos cambios en los patrones de datos."
          }
        ]}
      />
      
      <ServiceCTA
        title="¿Quieres predecir el futuro de tu negocio?"
        description="Agenda una sesión de 60 minutos. Analizamos tus datos y te mostramos qué podemos predecir."
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
