import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <h1 className="text-6xl font-display font-bold text-foreground">404</h1>
        <h2 className="text-2xl font-display font-bold text-foreground">
          Artículo no encontrado
        </h2>
        <p className="text-foreground-muted">
          El artículo que buscas no existe o ha sido eliminado.
        </p>
        <Link
          href="/reflexiones"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent-blue-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a reflexiones
        </Link>
      </div>
    </div>
  )
}
