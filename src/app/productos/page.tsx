import { getProducts } from '@/lib/api'
import { ProductsSection } from '@/components/sections/ProductsSection'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Productos IA | FastIA',
  description: 'Plataformas digitales con IA desarrolladas con TypeScript, React, Node.js, Kotlin, iOS, Android y Flux. Soluciones empresariales que transforman negocios.',
}

export default async function ProductsPage() {
  return (
    <div className="min-h-screen">
      <ProductsSection />
    </div>
  )
}
