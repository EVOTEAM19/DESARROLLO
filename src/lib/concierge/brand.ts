/**
 * Concierge — marca y copy del widget (SEGURO para el cliente).
 *
 * Solo textos visibles. NO importa nada del servidor (system prompt, tools),
 * así se puede usar desde el componente cliente sin filtrar el "cerebro" del
 * asistente al navegador.
 */

export const CONCIERGE = {
  /** Nombre del asistente (header del widget). */
  assistantName: 'Maite',
  /** Marca / empresa. */
  brand: 'FastIA',
  /** Color de acento (azul FastIA). */
  accent: '#0a84ff',
  /** Degradado del header. */
  accentGradient: 'linear-gradient(135deg, #0062c4 0%, #0a84ff 100%)',
  /** Saludo inicial proactivo al abrir el chat. */
  greeting:
    'Hola, soy Maite, de FastIA. Convertimos tu idea en software a medida desde 2.000 € y en semanas. ¿Qué necesitas?',
  /** Sugerencias rápidas (chips) bajo el saludo. Categorías para arrancar con un clic. */
  quickReplies: [
    'Software a medida',
    'Agentes IA',
    'Automatización',
    'CRM',
    'Web o app',
    'Otro',
  ],
} as const
