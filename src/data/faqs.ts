import { FAQItem } from '@/components/FAQ'

export const faqsAppMoviles: FAQItem[] = [
  {
    question: '¿Cuánto cuesta desarrollar una app móvil con IA?',
    answer: 'El desarrollo de una app móvil con IA cuesta entre 15.000€ y 80.000€ en FastIA, dependiendo de la complejidad. Una app básica con funciones IA simples (chatbot, recomendaciones) cuesta 15-25K€. Una app media con ML personalizado cuesta 30-50K€. Una app avanzada con IA compleja cuesta 50-80K€. El precio incluye diseño UX/UI, desarrollo frontend y backend, integración IA, testing completo y despliegue en App Store y Google Play.',
  },
  {
    question: '¿Cuánto tiempo tarda el desarrollo de una app con IA?',
    answer: 'El tiempo de desarrollo varía según complejidad: App básica con IA (8-12 semanas), App media (12-20 semanas), App compleja (20-30 semanas). En FastIA usamos metodología ágil con entregas cada 2 semanas, para que puedas ver el progreso constantemente. El 90% de nuestros proyectos se entregan en el plazo acordado.',
  },
  {
    question: '¿App nativa o híbrida? ¿Cuál es mejor?',
    answer: 'App nativa (Swift/Kotlin) es mejor para apps complejas que necesitan máximo rendimiento, acceso completo al hardware, y presupuesto amplio. App híbrida (Flutter/React Native) es mejor para startups que necesitan lanzar rápido en iOS y Android con un presupuesto ajustado. En FastIA recomendamos híbrida para productos que necesitan salir rápido y nativa para apps que requieren alta performance (juegos, apps con AR/VR, edición de video).',
  },
  {
    question: '¿La app incluye inteligencia artificial o hay que pagarla aparte?',
    answer: 'La IA está incluida en el precio base del desarrollo. Usamos nuestra IA propia (no APIs de terceros como ChatGPT) lo que significa sin costos recurrentes por uso. Solo pagas una vez el desarrollo. Si necesitas funciones IA muy específicas o modelos personalizados entrenados, eso sí tiene un costo adicional que estimamos en el presupuesto inicial.',
  },
  {
    question: '¿Qué tecnologías usan para desarrollar apps?',
    answer: 'Para apps nativas usamos Swift (iOS) y Kotlin (Android). Para apps híbridas usamos Flutter (recomendado) o React Native. Para backend usamos Node.js, Python (FastAPI) o .NET. Para IA usamos TensorFlow, PyTorch, y nuestros modelos propios. Para bases de datos usamos PostgreSQL, MongoDB o Firebase. Elegimos el stack según tus necesidades específicas.',
  },
  {
    question: '¿FastIA se encarga de publicar la app en las stores?',
    answer: 'Sí, nos encargamos de todo el proceso de publicación en App Store (iOS) y Google Play (Android). Incluye: creación de cuentas de desarrollador (si no las tienes), preparación de assets (capturas, descripciones, iconos), optimización ASO básica, envío a revisión, y gestión de posibles rechazos. El tiempo de aprobación es de 1-7 días en Google Play y 2-14 días en App Store.',
  },
]

export const faqsAutomatizacion: FAQItem[] = [
  {
    question: '¿Qué es la automatización con IA propia?',
    answer: 'La automatización con IA propia significa que desarrollamos modelos de inteligencia artificial específicamente para tu empresa, que se ejecutan en tu propia infraestructura o la nuestra. No dependes de APIs de terceros como ChatGPT o Claude. Ventajas: (1) Tus datos nunca salen de tu control, (2) No hay costos por uso (no pagas por cada consulta), (3) Personalización total para tus procesos, (4) Funciona aunque OpenAI o Anthropic caigan.',
  },
  {
    question: '¿Cuánto se ahorra automatizando con IA?',
    answer: 'Nuestros clientes ahorran entre 30-60% en costos operativos del proceso automatizado. Ejemplo real: una empresa con 5 personas en atención al cliente ahorraba 180K€/año en salarios. Implementamos chatbot con IA que automatizó el 70% de consultas, reduciendo el equipo a 2 personas. Ahorro anual: 108K€. Inversión en IA: 25K€. ROI recuperado en 3 meses.',
  },
  {
    question: '¿Qué procesos se pueden automatizar con IA?',
    answer: 'Casi todo: (1) Atención al cliente (chatbots, email automation), (2) Procesamiento de documentos (OCR, clasificación, extracción datos), (3) Marketing (segmentación, contenido, campañas), (4) Ventas (lead scoring, seguimiento automático), (5) Operaciones (predicción demanda, optimización rutas), (6) RRHH (screening CVs, onboarding). Si un humano hace una tarea repetitiva más de 10 veces al día, probablemente se puede automatizar.',
  },
  {
    question: '¿Cuánto tiempo tarda implementar automatización con IA?',
    answer: 'Depende de complejidad: Chatbot básico (2-3 semanas), Automatización de procesos simples (4-6 semanas), Sistemas de automatización complejos (8-12 semanas). En FastIA empezamos con un piloto en 2 semanas para validar que funciona antes de escalar. El 80% de nuestros clientes ven resultados medibles en el primer mes.',
  },
  {
    question: '¿Es seguro usar IA para procesos críticos del negocio?',
    answer: 'Sí, si está bien implementada. En FastIA: (1) La IA solo sugiere, el humano decide en procesos críticos, (2) Logs completos de todas las decisiones, (3) Testing exhaustivo antes de producción, (4) Monitorización 24/7 de comportamiento anómalo, (5) Rollback inmediato si algo falla. Nunca ponemos IA en producción sin supervisión humana en procesos que impactan dinero o seguridad.',
  },
]

export const faqsCTO: FAQItem[] = [
  {
    question: '¿Qué es CTO as a Service?',
    answer: 'CTO as a Service es tener un Director de Tecnología experimentado trabajando para tu empresa sin contratarlo full-time. Pagas solo por las horas que necesitas (desde 20h/mes). El CTO define tu estrategia tecnológica, arquitectura de software, selecciona tecnologías, lidera el equipo de desarrollo, y asesora al CEO en decisiones tech. Ideal para startups que no pueden pagar un CTO full-time (60-100K€/año) o empresas que necesitan expertise puntual.',
  },
  {
    question: '¿Cuánto cuesta un CTO externo?',
    answer: 'En FastIA: CTO part-time 20h/mes: 2.500€/mes, CTO 40h/mes: 4.500€/mes, CTO full-time (160h/mes): 8.000€/mes. Incluye: estrategia tecnológica, arquitectura, code reviews, liderazgo de equipo, asesoría CEO/Board. Comparado con CTO interno (salario 70-100K€ + cargas sociales + equity), el CTO externo es 50-70% más económico y puedes empezar/parar cuando quieras.',
  },
  {
    question: '¿Qué hace exactamente el CTO externo?',
    answer: 'El CTO externo: (1) Define stack tecnológico óptimo para tu producto, (2) Diseña arquitectura escalable, (3) Lidera equipo de desarrollo (internos o externos), (4) Code reviews y buenas prácticas, (5) Roadmap tecnológico trimestral/anual, (6) Decisiones build vs buy, (7) Selección y negociación con proveedores tech, (8) Preparación de due diligence técnica para inversores, (9) Asesoría en contrataciones técnicas, (10) Resolución de crisis técnicas.',
  },
  {
    question: '¿Cuándo necesita mi startup un CTO?',
    answer: 'Necesitas CTO cuando: (1) Vas a levantar inversión y los inversores preguntan por tu tech stack, (2) Tu equipo de desarrollo está atascado y no sabes por qué, (3) El CTO actual se fue y necesitas reemplazarlo rápido, (4) Estás contratando desarrolladores y no sabes evaluarlos técnicamente, (5) Tu aplicación no escala y no sabes cómo solucionarlo, (6) Tienes un equipo técnico pequeño (<5 devs) que necesita liderazgo. Si tienes alguno de estos problemas, necesitas CTO ya.',
  },
  {
    question: '¿Puedo tener CTO externo y equipo de desarrollo interno?',
    answer: 'Sí, es lo más común. El CTO externo lidera tu equipo interno: define procesos, hace code reviews, establece buenas prácticas, planifica sprints, resuelve bloqueos técnicos. Es como tener un VP of Engineering sin el coste full-time. Muchos de nuestros clientes empiezan con CTO externo y cuando el equipo crece a 10-15 devs, contratan CTO interno y nosotros hacemos la transición suave.',
  },
]

export const faqsGeneral: FAQItem[] = [
  {
    question: '¿Qué hace FastIA?',
    answer: 'FastIA es una empresa de desarrollo de software especializada en inteligencia artificial. Creamos apps móviles, plataformas web, automatizaciones y ofrecemos consultoría tecnológica. Llevamos 6 años ayudando a startups y empresas a digitalizarse. Tenemos +40 desarrolladores especializados en Madrid.',
  },
  {
    question: '¿Dónde está FastIA?',
    answer: 'Nuestra oficina principal está en Calle Columela, 9 28001 Madrid. Trabajamos con clientes de toda España y Latinoamérica. También hacemos proyectos 100% remotos.',
  },
  {
    question: '¿Cuánto cuestan vuestros servicios?',
    answer: 'Depende del proyecto. Apps desde 15K€, automatizaciones desde 10K€, CTO externo desde 2.5K€/mes. Ofrecemos consultoría gratuita de 30 minutos donde analizamos tu proyecto y te damos presupuesto sin compromiso.',
  },
  {
    question: '¿Trabajáis con startups o solo con grandes empresas?',
    answer: 'Trabajamos con ambos. El 60% de nuestros clientes son startups en fases pre-seed a Series A. El 40% son pymes y grandes empresas. Tenemos paquetes específicos para startups con presupuestos ajustados.',
  },
  {
    question: '¿Ofrecéis consultoría gratuita?',
    answer: 'Sí, la primera videollamada de 30 minutos es gratis. Analizamos tu proyecto, te asesoramos sobre tecnologías, te damos estimación de tiempo y presupuesto aproximado. Sin compromiso. Puedes agendarla desde nuestra web o llamando al +34 910 123 456.',
  },
]
