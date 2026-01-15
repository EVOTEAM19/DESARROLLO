import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <h1 className="text-6xl font-display font-bold text-foreground">404</h1>
        <h2 className="text-2xl font-display font-bold text-foreground">
          Producto no encontrado
        </h2>
        <p className="text-foreground-muted">
          El producto que buscas no existe o ha sido eliminado.
        </p>
        <Link
          href="/productos"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent-blue-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a productos
        </Link>
      </div>
    </div>
  )
}
