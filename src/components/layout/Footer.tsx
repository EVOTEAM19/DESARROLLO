import Link from 'next/link'
import { Linkedin, Github, Mail, ArrowUpRight } from 'lucide-react'
import { Logo } from './Logo'

const COLUMNS = [
  {
    title: 'Servicios',
    links: [
      { href: '/servicios', label: 'Software a medida' },
      { href: '/servicios', label: 'Apps móviles' },
      { href: '/servicios', label: 'Plataformas web' },
      { href: '/servicios', label: 'Automatización & IA' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { href: '/nosotros', label: 'Nosotros' },
      { href: '/#proyectos', label: 'Proyectos' },
      { href: '/#freelance', label: 'Freelance' },
      { href: '/contacto', label: 'Contacto' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/legal/terms', label: 'Aviso legal' },
      { href: '/legal/privacy', label: 'Privacidad' },
      { href: '/legal/cookies', label: 'Cookies' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gray-200 bg-background">
      <div className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[120px]" />

      <div className="container-tight relative py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Marca + CTA */}
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm leading-relaxed text-foreground-muted">
              Agencia de desarrollo de software a medida. Convertimos tu idea en una app, web o plataforma —
              desde 2.000 € y en tiempo récord.
            </p>
            <Link
              href="/contacto"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-blue-700"
            >
              Empieza tu proyecto
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <div className="mt-8 flex items-center gap-3">
              <a
                href="https://linkedin.com/company/fastia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-foreground-muted transition-all hover:border-indigo-500/40 hover:text-gray-900"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/fastia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-foreground-muted transition-all hover:border-indigo-500/40 hover:text-gray-900"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:hola@fastia.es"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-foreground-muted transition-all hover:border-indigo-500/40 hover:text-gray-900"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Columnas de enlaces */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">{col.title}</h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-foreground-muted transition-colors hover:text-gray-900">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 text-sm text-foreground-muted sm:flex-row">
          <p>© {new Date().getFullYear()} FastIA. Todos los derechos reservados.</p>
          <p className="flex items-center gap-2">
            Hecho con <span className="text-indigo-400">♦</span> en España
          </p>
        </div>
      </div>
    </footer>
  )
}
