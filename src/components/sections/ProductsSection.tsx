'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Smartphone, Monitor, Cog, Compass, Cloud, ShieldCheck, Brain, MessageSquare } from 'lucide-react'
import Link from 'next/link'

// Datos hardcodeados de servicios FastIA - Enfocados en IA
const services = [
  {
    id: '1',
    title: 'Automatización Inteligente que Trabaja 24/7',
    description: 'Dejamos que la IA haga el trabajo pesado. Automatizamos atención al cliente, análisis de datos, generación de contenido, y procesos internos. Tú solo ves los resultados: más ingresos, menos costes.',
    icon: Cog,
    link: '/servicios/automatizacion-inteligente',
    gradient: 'from-accent-orange-500 to-accent-orange-600',
  },
  {
    id: '2',
    title: 'Apps Móviles Nativas e Híbridas con IA',
    description: 'Desarrollamos apps para iOS y Android con Inteligencia Artificial integrada. Apps que aprenden de tus usuarios, personalizan experiencias y automatizan tareas. De la idea a App Store/Play Store en 8-12 semanas.',
    icon: Smartphone,
    link: '/servicios/desarrollo-apps-moviles',
    gradient: 'from-accent-orange-500 to-accent-orange-700',
  },
  {
    id: '3',
    title: 'Plataformas Web y SaaS que Escalan con IA',
    description: 'Construimos plataformas web, e-commerce y SaaS con Inteligencia Artificial desde el código base. Tu plataforma aprende, predice y optimiza automáticamente. Arquitectura escalable, código limpio, IA potente.',
    icon: Monitor,
    link: '/servicios/plataformas-web-ia',
    gradient: 'from-accent-orange-600 to-accent-orange-700',
  },
  {
    id: '4',
    title: 'CTO Experto en IA para tu Empresa',
    description: 'Liderazgo tecnológico especializado en Inteligencia Artificial. Diseñamos tu estrategia de IA, seleccionamos las mejores tecnologías y ejecutamos. Sin contratar full-time.',
    icon: Compass,
    link: '/servicios/cto-as-a-service',
    gradient: 'from-accent-orange-500 to-accent-orange-600',
  },
  {
    id: '5',
    title: 'Chatbots que Venden y Atienden Mejor que Humanos',
    description: 'IA conversacional que atiende clientes 24/7, cierra ventas, agenda citas y resuelve problemas. Entrenada específicamente para tu negocio. Resultados desde el día 1.',
    icon: MessageSquare,
    link: '/servicios/ia-conversacional',
    gradient: 'from-accent-orange-600 to-accent-orange-700',
  },
  {
    id: '6',
    title: 'IA que Predice el Futuro de tu Negocio',
    description: 'Análisis predictivo con Machine Learning. Anticipamos tendencias, detectamos oportunidades y evitamos riesgos antes de que ocurran. Decisiones basadas en datos, no en intuición.',
    icon: Brain,
    link: '/servicios/analisis-predictivo',
    gradient: 'from-accent-orange-500 to-accent-orange-700',
  },
]

export function ProductsSection() {

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Título de sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 text-foreground">
            IA que <span className="text-gradient">transforma cada área de tu negocio</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground-muted max-w-3xl mx-auto">
            No vendemos apps. Vendemos resultados. Integramos IA para automatizar, optimizar y escalar tu empresa.
          </p>
        </motion.div>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ServiceCardProps {
  service: typeof services[0]
  index: number
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <Link href={service.link} className="block h-full">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="relative h-full bg-background-secondary rounded-2xl overflow-hidden border border-foreground/10 hover:border-accent-orange-500/50 transition-all duration-300 hover:shadow-glow-orange"
        >
          {/* Contenido de la card */}
          <div className="p-6 lg:p-8 flex flex-col h-full">
            {/* Icono con gradiente naranja */}
            <div className="mb-6">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg group-hover:shadow-glow-orange transition-all duration-300`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Título */}
            <h3 className="text-xl lg:text-2xl font-display font-bold mb-3 text-foreground group-hover:text-accent-orange-400 transition-colors duration-300">
              {service.title}
            </h3>

            {/* Descripción */}
            <p className="text-foreground-muted mb-6 leading-relaxed flex-grow">
              {service.description}
            </p>

            {/* Link "Saber más" */}
            <div className="flex items-center gap-2 text-accent-orange-500 group-hover:text-accent-orange-400 transition-colors duration-300 mt-auto">
              <span className="font-semibold text-sm">Saber más</span>
              <motion.div
                animate={{
                  x: [0, 4, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </div>

          {/* Efecto de glow en hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none rounded-2xl`}
          />
        </motion.div>
      </Link>
    </motion.div>
  )
}
