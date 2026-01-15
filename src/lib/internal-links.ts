export interface RelatedLink {
  title: string
  description: string
  href: string
  category?: string
}

export const internalLinksMap: Record<string, RelatedLink[]> = {
  // Desde HOME hacia servicios
  home: [
    {
      title: 'Desarrollo de Apps Móviles con IA',
      description: 'Apps nativas e híbridas con inteligencia artificial integrada',
      href: '/servicios/desarrollo-apps-moviles',
      category: 'Servicios',
    },
    {
      title: 'Automatización Empresarial con IA',
      description: 'Automatizamos procesos con IA propia y segura',
      href: '/servicios/automatizacion-ia',
      category: 'Servicios',
    },
    {
      title: 'CTO as a Service',
      description: 'Tu director de tecnología sin contratación full-time',
      href: '/servicios/cto-as-a-service',
      category: 'Servicios',
    },
    {
      title: 'Plataformas Web con IA',
      description: 'Desarrollo de plataformas web escalables con IA integrada',
      href: '/servicios/plataformas-web-ia',
      category: 'Servicios',
    },
  ],
  
  // Desde APPS MÓVILES hacia contenido relacionado
  appsMoviles: [
    {
      title: '¿App nativa o híbrida? Guía completa',
      description: 'Comparativa técnica y de costos para elegir la mejor opción',
      href: '/reflexiones/nativa-vs-hibrida',
      category: 'Blog',
    },
    {
      title: 'Presupuesto: ¿Cuánto cuesta una app con IA?',
      description: 'Precios reales y factores que influyen en el desarrollo',
      href: '/reflexiones/cuanto-cuesta-app-ia',
      category: 'Blog',
    },
    {
      title: 'Automatización Empresarial',
      description: 'Automatiza procesos con IA propia y segura',
      href: '/servicios/automatizacion-ia',
      category: 'Servicios',
    },
  ],
  
  // Desde AUTOMATIZACIÓN hacia contenido relacionado
  automatizacion: [
    {
      title: 'IA propia vs ChatGPT: ¿Qué elegir?',
      description: 'Comparativa de costos, seguridad y personalización',
      href: '/reflexiones/ia-propia-vs-chatgpt',
      category: 'Blog',
    },
    {
      title: 'CTO as a Service',
      description: 'Tu director de tecnología sin contratación full-time',
      href: '/servicios/cto-as-a-service',
      category: 'Servicios',
    },
  ],
  
  // Desde CTO hacia contenido relacionado
  cto: [
    {
      title: 'Desarrollo de Apps Móviles',
      description: 'Apps nativas e híbridas con IA integrada',
      href: '/servicios/desarrollo-apps-moviles',
      category: 'Servicios',
    },
    {
      title: 'Plataformas Web con IA',
      description: 'Desarrollo de plataformas web escalables',
      href: '/servicios/plataformas-web-ia',
      category: 'Servicios',
    },
  ],
}
