import { ServiceHero } from '@/components/services/ServiceHero'
import { ProblemSection } from '@/components/services/ProblemSection'
import { SolutionFeatures } from '@/components/services/SolutionFeatures'
import { ComparisonTable } from '@/components/services/ComparisonTable'
import { ServiceFAQ } from '@/components/services/ServiceFAQ'
import { ServiceCTA } from '@/components/services/ServiceCTA'

export const metadata = {
  title: 'Desarrollo de Apps Móviles con IA | FastIA',
  description: 'Apps nativas, híbridas o PWA. Desde el concepto hasta 50K+ descargas. Desarrollo de aplicaciones móviles con inteligencia artificial integrada.',
}

export default function AppsMovilesPage() {
  return (
    <>
      <ServiceHero
        badge="⚡ De la idea a las stores en 8-12 semanas"
        title="Apps Móviles que Conquistan Usuarios"
        subtitle="Nativas, híbridas o PWA. Desde el concepto hasta 50K+ descargas."
        image="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80"
      />
      
      <ProblemSection
        problems={[
          {
            title: "Costes desbocados",
            description: "Empiezas con 30K€ de presupuesto y acabas en 100K€ sin MVP funcional."
          },
          {
            title: "Stack equivocado",
            description: "Te venden Flutter cuando necesitas nativo, o viceversa. Rediseño = 50K€ más."
          },
          {
            title: "UX que no convierte",
            description: "App bonita pero nadie la usa. Onboarding confuso, flujos rotos."
          },
          {
            title: "Performance horrible",
            description: "Carga lenta, crashes frecuentes. 70% usuarios la desinstalan en la primera semana."
          },
          {
            title: "Sin estrategia ASO",
            description: "App lista pero invisible en stores. Cero descargas orgánicas."
          },
          {
            title: "Bugs post-lanzamiento",
            description: "Lanzas y empiezan los problemas. Ningún testing exhaustivo previo."
          }
        ]}
      />
      
      <SolutionFeatures
        title="Nuestra Metodología: Apps que Funcionan"
        features={[
          {
            title: "Discovery Workshop",
            duration: "1-2 semanas",
            description: "Validamos tu idea ANTES de escribir código.",
            deliverables: [
              { text: "Product Brief detallado" },
              { text: "User Research" },
              { text: "Competitive Analysis" },
              { text: "Tech Stack recomendado" },
              { text: "Budget y timeline realistas" }
            ]
          },
          {
            title: "Diseño UX/UI",
            duration: "2-3 semanas",
            description: "Diseño centrado en conversión, no solo bonito.",
            deliverables: [
              { text: "Wireframes detallados" },
              { text: "Prototipos interactivos" },
              { text: "Design System completo" },
              { text: "Iconografía custom" }
            ]
          },
          {
            title: "Desarrollo Ágil",
            duration: "6-12 semanas",
            description: "Sprints de 2 semanas con demos continuas.",
            deliverables: [
              { text: "MVP funcional" },
              { text: "Integraciones IA" },
              { text: "Backend escalable" },
              { text: "Notificaciones push" }
            ]
          },
          {
            title: "Testing QA",
            duration: "2 semanas",
            description: "Testing exhaustivo: funcional, performance, seguridad.",
            deliverables: [
              { text: "Test plan completo" },
              { text: "Bug reports" },
              { text: "Performance audit" },
              { text: "Security scan" }
            ]
          },
          {
            title: "Lanzamiento",
            duration: "1 semana",
            description: "Publicación en stores con estrategia ASO.",
            deliverables: [
              { text: "Publicación App Store/Play" },
              { text: "ASO (keywords, screenshots)" },
              { text: "Monitorización activa" },
              { text: "Soporte post-launch" }
            ]
          }
        ]}
      />
      
      <ComparisonTable
        title="¿Nativa, Híbrida o PWA?"
        description="La decisión más importante de tu app. Aquí está la verdad:"
        comparison={{
          headers: ['', 'Nativa', 'Híbrida (Flutter)', 'PWA'],
          rows: [
            {
              feature: 'Performance',
              native: { value: '★★★★★', color: 'green', note: 'Máxima velocidad' },
              hybrid: { value: '★★★★☆', color: 'orange', note: 'Muy buena' },
              pwa: { value: '★★★☆☆', color: 'yellow', note: 'Depende del browser' }
            },
            {
              feature: 'Coste desarrollo',
              native: { value: '€€€€€', color: 'red', note: '2 apps separadas' },
              hybrid: { value: '€€€', color: 'green', note: '1 codebase' },
              pwa: { value: '€€', color: 'green', note: 'Más económica' }
            },
            {
              feature: 'Time to market',
              native: { value: '12-20 sem', color: 'red', note: '' },
              hybrid: { value: '8-12 sem', color: 'green', note: '' },
              pwa: { value: '4-8 sem', color: 'green', note: '' }
            },
            {
              feature: 'Acceso hardware',
              native: { value: '100%', color: 'green', note: 'Cámara, GPS, NFC, todo' },
              hybrid: { value: '95%', color: 'green', note: 'Casi todo' },
              pwa: { value: '60%', color: 'yellow', note: 'Limitado' }
            },
            {
              feature: 'Experiencia offline',
              native: { value: 'Perfecta', color: 'green', note: '' },
              hybrid: { value: 'Muy buena', color: 'green', note: '' },
              pwa: { value: 'Básica', color: 'yellow', note: '' }
            },
            {
              feature: 'Mantenimiento',
              native: { value: 'Alto', color: 'red', note: '2 equipos' },
              hybrid: { value: 'Medio', color: 'green', note: '1 equipo' },
              pwa: { value: 'Bajo', color: 'green', note: 'Como web' }
            }
          ],
          recommendations: [
            {
              type: 'Nativa',
              when: 'Performance crítica, acceso completo hardware, presupuesto >80K€',
              examples: 'Juegos, apps de edición foto/video, fitness trackers'
            },
            {
              type: 'Híbrida',
              when: 'Mejor balance coste/calidad, lanzamiento rápido, startups',
              examples: 'E-commerce, SaaS, redes sociales, fintech'
            },
            {
              type: 'PWA',
              when: 'Presupuesto limitado, validación rápida, contenido > funcionalidad',
              examples: 'Blogs, noticias, dashboards, landing pages'
            }
          ]
        }}
      />
      
      <ServiceFAQ
        faqs={[
          {
            question: "¿Cuánto cuesta una app con IA?",
            answer: "Depende de la complejidad. MVP básico con IA: 25-40K€. App completa: 60-120K€. Incluye diseño, desarrollo, integraciones IA, testing y publicación en stores."
          },
          {
            question: "¿Cuánto tiempo tarda el desarrollo?",
            answer: "MVP: 8-12 semanas. App completa: 16-24 semanas. Trabajamos en sprints de 2 semanas con demos continuas para que veas el progreso."
          },
          {
            question: "¿Nativa o híbrida para mi caso?",
            answer: "Depende de: (1) Necesidad de performance extrema, (2) Acceso a hardware específico, (3) Presupuesto, (4) Timeline. En una sesión de 30 minutos te damos recomendación clara."
          },
          {
            question: "¿La IA ya está incluida en el precio?",
            answer: "Sí. Integramos IA desde el primer día sin coste adicional. Recomendaciones, chatbots, análisis predictivo, computer vision - lo que tu app necesite."
          },
          {
            question: "¿Incluye la publicación en stores?",
            answer: "Sí, 100%. Nos encargamos de App Store y Google Play, incluyendo capturas, descripción optimizada (ASO) y seguimiento de aprobación."
          },
          {
            question: "¿Qué pasa después del lanzamiento?",
            answer: "Ofrecemos mantenimiento opcional desde 500€/mes: updates iOS/Android, bugs críticos, nuevas features, monitorización, soporte prioritario."
          },
          {
            question: "¿Podemos empezar con MVP e iterar?",
            answer: "Totalmente. De hecho, lo recomendamos. MVP en 8-12 semanas (25-40K€), validamos con usuarios reales, y luego escalamos según feedback."
          },
          {
            question: "¿Necesito contratar a alguien técnico?",
            answer: "No. Nosotros somos tu equipo técnico. Hablamos tu idioma, sin tecnicismos innecesarios. Tú enfócate en el negocio."
          }
        ]}
      />
      
      <ServiceCTA
        title="¿Tienes una idea de app?"
        description="Validémosla juntos en 60 minutos. Sin coste, sin compromiso."
        primaryButton={{
          text: "Agendar sesión gratuita",
          href: "/contacto"
        }}
        secondaryButton={{
          text: "Ver otros servicios",
          href: "/servicios"
        }}
      />
    </>
  )
}
