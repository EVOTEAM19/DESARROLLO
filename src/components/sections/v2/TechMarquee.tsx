'use client'

const ROW_A = ['Next.js', 'React', 'React Native', 'TypeScript', 'Node.js', 'Python', 'Flutter', 'PostgreSQL', 'Supabase']
const ROW_B = ['AWS', 'Vercel', 'OpenAI', 'Stripe', 'Tailwind', 'Docker', 'GraphQL', 'Figma', 'n8n']

function Track({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  // Repetimos lo suficiente para que SIEMPRE llene el ancho (también en pantallas
  // grandes) y el bucle -50% sea continuo: así queda centrado y nunca pegado a la izquierda.
  const set = [...items, ...items, ...items]
  const doubled = [...set, ...set]
  return (
    <div className="flex w-max gap-4 animate-marquee" style={reverse ? { animationDirection: 'reverse' } : undefined}>
      {doubled.map((t, i) => (
        <span
          key={i}
          className="whitespace-nowrap rounded-full border border-gray-200 bg-gray-50 px-5 py-2 text-sm font-medium text-foreground-muted"
        >
          {t}
        </span>
      ))}
    </div>
  )
}

export function TechMarquee() {
  return (
    <section className="border-y border-gray-200 py-12">
      <div className="container-tight">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-[0.2em] text-foreground-muted">
          Construimos con tecnología de primer nivel
        </p>
      </div>
      <div className="relative space-y-4 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <Track items={ROW_A} />
        <Track items={ROW_B} reverse />
      </div>
    </section>
  )
}
