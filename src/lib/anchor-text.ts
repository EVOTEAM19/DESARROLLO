// Variaciones de anchor text para evitar over-optimization
export const anchorTextVariations: Record<string, string[]> = {
  'desarrollo-apps-ia': [
    'desarrollo de apps con IA',
    'desarrollo de aplicaciones móviles con inteligencia artificial',
    'crear apps con IA',
    'desarrollo apps móviles IA',
    'apps con inteligencia artificial',
  ],
  'automatizacion-ia': [
    'automatización con IA',
    'automatización empresarial',
    'automatizar procesos con IA',
    'automatización inteligente',
    'IA para automatización',
  ],
  'cto-as-a-service': [
    'CTO externo',
    'CTO as a Service',
    'CTO para startups',
    'consultoría tecnológica',
    'director de tecnología externo',
  ],
  'plataformas-web-ia': [
    'plataformas web con IA',
    'desarrollo web inteligente',
    'plataformas web escalables',
    'desarrollo web con inteligencia artificial',
  ],
}

export function getRandomAnchorText(keyword: string): string {
  const variations = anchorTextVariations[keyword]
  if (!variations || variations.length === 0) {
    return keyword
  }
  return variations[Math.floor(Math.random() * variations.length)]
}
