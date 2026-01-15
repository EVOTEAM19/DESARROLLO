'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code2, Database, Brain, Cloud } from 'lucide-react'

// Tecnologías sin logos (usaremos iconos de Lucide)
const technologies = {
  frontend: [
    { name: 'React', icon: '⚛️', color: '#61DAFB' },
    { name: 'Next.js', icon: '▲', color: '#000000' },
    { name: 'TypeScript', icon: '📘', color: '#3178C6' },
    { name: 'Tailwind CSS', icon: '🎨', color: '#06B6D4' },
    { name: 'Flutter', icon: '📱', color: '#02569B' },
  ],
  backend: [
    { name: 'Node.js', icon: '🟢', color: '#339933' },
    { name: 'Python', icon: '🐍', color: '#3776AB' },
    { name: 'PostgreSQL', icon: '🐘', color: '#4169E1' },
    { name: 'MongoDB', icon: '🍃', color: '#47A248' },
    { name: 'Redis', icon: '🔴', color: '#DC382D' },
  ],
  ai: [
    { name: 'TensorFlow', icon: '🧠', color: '#FF6F00' },
    { name: 'PyTorch', icon: '🔥', color: '#EE4C2C' },
    { name: 'OpenAI', icon: '🤖', color: '#412991' },
    { name: 'LangChain', icon: '🔗', color: '#1C3C3C' },
    { name: 'Hugging Face', icon: '🤗', color: '#FFD21E' },
  ],
  cloud: [
    { name: 'AWS', icon: '☁️', color: '#FF9900' },
    { name: 'Google Cloud', icon: '☁️', color: '#4285F4' },
    { name: 'Azure', icon: '☁️', color: '#0078D4' },
    { name: 'Vercel', icon: '▲', color: '#000000' },
    { name: 'Docker', icon: '🐳', color: '#2496ED' },
  ],
}

const categoryIcons = {
  frontend: Code2,
  backend: Database,
  ai: Brain,
  cloud: Cloud,
}

interface TechCardProps {
  tech: { name: string; icon: string; color: string }
  index: number
}

function TechCard({ tech, index }: TechCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -10, scale: 1.05 }}
      className="group p-6 bg-background-secondary backdrop-blur-sm rounded-xl border border-foreground/10 hover:border-accent-orange-500/50 transition-all duration-300 cursor-pointer hover:shadow-glow-orange"
    >
      <div className="flex flex-col items-center gap-4">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 flex items-center justify-center text-4xl"
        >
          {tech.icon}
        </motion.div>
        <span className="text-sm font-semibold text-foreground group-hover:text-accent-orange-400 transition-colors text-center">
          {tech.name}
        </span>
      </div>
    </motion.div>
  )
}

export function TechStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-b from-background-secondary to-background"
    >
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-foreground">
            Stack <span className="text-gradient">tecnológico</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground-muted max-w-3xl mx-auto">
            Trabajamos con las tecnologías más avanzadas del mercado. Elegimos el stack perfecto para cada proyecto.
          </p>
        </motion.div>

        <div className="space-y-12 lg:space-y-16">
          {Object.entries(technologies).map(([category, techs], catIndex) => {
            const CategoryIcon = categoryIcons[category as keyof typeof categoryIcons]
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: catIndex * 0.2 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <CategoryIcon className="w-6 h-6 text-accent-orange-500" />
                  <h3 className="text-2xl font-display font-bold text-foreground capitalize">
                    {category === 'ai' ? 'IA & ML' : category === 'frontend' ? 'Frontend' : category === 'backend' ? 'Backend' : 'Cloud & DevOps'}
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {techs.map((tech, index) => (
                    <TechCard key={tech.name} tech={tech} index={index} />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
