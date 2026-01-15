'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Layers, 
  Brain, 
  Network, 
  Building2, 
  Users, 
  BookOpen,
  ArrowRight,
  Home,
  Mail,
} from 'lucide-react'

const contentSections = [
  {
    icon: Home,
    title: 'Página de Inicio',
    description: 'Gestiona el Hero, estadísticas y sección "Por qué FastIA" de la página principal',
    href: '/admin/content/home',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: Layers,
    title: 'The Modal',
    description: 'Gestiona los 5 servicios de IA: Conversacional, Predictivo, Datos, Automatización y Seguridad',
    href: '/admin/content/the-modal',
    color: 'from-blue-500 to-blue-600',
    count: 5,
  },
  {
    icon: Network,
    title: 'Synapse',
    description: 'Plataforma empresarial de IA - Hero, problemas, soluciones y casos de uso',
    href: '/admin/content/synapse',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Building2,
    title: 'Sectores',
    description: '20 industrias con sus descripciones, soluciones y casos de uso',
    href: '/admin/content/sectores',
    color: 'from-green-500 to-green-600',
    count: 20,
  },
  {
    icon: Users,
    title: 'Nosotros',
    description: 'Información sobre FastIA: historia, equipo, valores y cultura',
    href: '/admin/content/nosotros',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: BookOpen,
    title: 'Reflexiones',
    description: 'Configuración de la sección de blog y artículos',
    href: '/admin/content/reflexiones',
    color: 'from-red-500 to-red-600',
  },
  {
    icon: Mail,
    title: 'Contacto',
    description: 'Gestiona todos los textos, opciones y datos de contacto',
    href: '/admin/content/contacto',
    color: 'from-purple-500 to-purple-600',
  },
]

export default function ContentManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Gestión de Contenido</h1>
        <p className="text-gray-400">Gestiona todos los textos e imágenes de las secciones principales</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentSections.map((section, index) => {
          const Icon = section.icon
          return (
            <motion.div
              key={section.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={section.href}
                className="block p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-orange-500/50 transition-all group"
              >
                <div className={`inline-flex p-3 bg-gradient-to-br ${section.color} rounded-lg mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">
                  {section.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {section.description}
                </p>
                
                {section.count && (
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-semibold">
                      {section.count} elementos
                    </span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-orange-500 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                  Gestionar <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-8 p-6 bg-gray-800 rounded-xl border border-gray-700">
        <h3 className="text-lg font-bold text-white mb-2">💡 Consejos</h3>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li>• Todos los cambios se guardan automáticamente en Supabase</li>
          <li>• Las imágenes deben subirse primero en Media y luego usar su URL</li>
          <li>• Los textos soportan formato Markdown básico</li>
          <li>• Los cambios se reflejan inmediatamente en la web pública</li>
        </ul>
      </div>
    </div>
  )
}
