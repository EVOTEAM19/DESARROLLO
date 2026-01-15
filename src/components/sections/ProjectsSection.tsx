'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Datos hardcodeados de proyectos FastIA
const projects = [
  {
    id: '1',
    title: 'Plataforma de gestión para equipos de fútbol',
    client: 'Evoteam',
    category: 'SaaS | Gestión Deportiva',
    description: 'Plataforma completa que digitaliza la gestión de equipos de fútbol profesionales y amateur.',
    result: '60% reducción en gestión administrativa',
    technologies: ['React', 'Node.js', 'Python', 'MongoDB', 'AWS'],
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
    link: '/proyectos/evoteam',
  },
  {
    id: '2',
    title: 'App con IA para entrenamiento canino',
    client: 'DogWise',
    category: 'App Móvil | IA',
    description: 'App que analiza el comportamiento de perros y ofrece planes de entrenamiento personalizados con IA.',
    result: '+50K descargas, 4.8★ rating',
    technologies: ['Flutter', 'TensorFlow', 'Firebase'],
    image: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800&q=80',
    link: '/proyectos/dogwise',
  },
  {
    id: '3',
    title: 'Software de gestión para rent a car',
    client: 'Drivix',
    category: 'Software | Gestión',
    description: 'Sistema completo de gestión de flota, reservas, facturación y mantenimiento.',
    result: '45% aumento en eficiencia',
    technologies: ['Vue.js', 'Laravel', 'MySQL'],
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
    link: '/proyectos/drivix',
  },
  {
    id: '4',
    title: 'Análisis de flujo de personas con IA',
    client: 'TastyP',
    category: 'Big Data | Análisis',
    description: 'Software que analiza y predice flujos de personas por zonas y horarios con IA.',
    result: '30% reducción costos laborales',
    technologies: ['Python', 'TensorFlow', 'React', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    link: '/proyectos/tastyp',
  },
  {
    id: '5',
    title: 'ERP completo para tiendas deportivas',
    client: 'New Sport',
    category: 'ERP | Retail',
    description: 'Sistema de gestión integral: almacén, contabilidad, logística, RRHH y ventas unificados.',
    result: '15 tiendas integradas',
    technologies: ['Angular', '.NET Core', 'SQL Server', 'Azure'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    link: '/proyectos/new-sport',
  },
]

export function ProjectsSection() {
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
            Proyectos que <span className="text-gradient">hablan por sí solos</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground-muted max-w-3xl mx-auto">
            Soluciones reales para clientes reales
          </p>
        </motion.div>

        {/* Grid de proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Botón "Ver todos los proyectos" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Link
            href="/proyectos"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-accent-orange-500 text-accent-orange-500 rounded-xl font-semibold text-lg hover:bg-accent-orange-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-glow-orange group"
          >
            <span>Ver todos los proyectos</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: typeof projects[0]
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
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
      <Link href={project.link} className="block h-full">
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
          className="relative h-full bg-background-secondary rounded-2xl overflow-hidden border border-foreground/10 hover:border-accent-orange-500/50 transition-all duration-300 hover:shadow-glow-orange"
        >
          {/* Imagen principal */}
          <div className="relative h-64 overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Overlay gradient en hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Badge de categoría */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-accent-orange-500 text-white shadow-lg">
                {project.category}
              </span>
            </div>
          </div>

          {/* Contenido de la card */}
          <div className="p-6 lg:p-8 flex flex-col h-full">
            {/* Cliente */}
            <p className="text-sm text-foreground-muted mb-2 uppercase tracking-wider">
              {project.client}
            </p>

            {/* Título */}
            <h3 className="text-2xl lg:text-3xl font-display font-bold mb-3 text-foreground group-hover:text-accent-orange-400 transition-colors duration-300">
              {project.title}
            </h3>

            {/* Descripción */}
            <p className="text-foreground-muted mb-4 leading-relaxed flex-grow">
              {project.description}
            </p>

            {/* Resultado destacado */}
            <div className="mb-4 p-3 rounded-lg bg-accent-orange-500/10 border border-accent-orange-500/20">
              <p className="text-sm font-semibold text-accent-orange-400">
                ✨ {project.result}
              </p>
            </div>

            {/* Tecnologías */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-background-tertiary text-foreground-muted border border-foreground/10"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Link "Ver caso completo" */}
            <div className="flex items-center gap-2 text-accent-orange-500 group-hover:text-accent-orange-400 transition-colors duration-300 mt-auto">
              <span className="font-semibold text-sm">Ver caso completo</span>
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
          <div className="absolute inset-0 bg-gradient-to-br from-accent-orange-500/0 to-accent-orange-500/0 group-hover:from-accent-orange-500/5 group-hover:to-accent-orange-500/5 transition-opacity duration-300 pointer-events-none rounded-2xl" />
        </motion.div>
      </Link>
    </motion.div>
  )
}
