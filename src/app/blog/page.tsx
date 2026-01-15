import { getBlogPosts } from '@/lib/api'
import { BlogGrid } from '@/components/sections/BlogGrid'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Reflexiones - Blog | FastIA',
  description: 'Reflexiones, análisis y tendencias sobre inteligencia artificial y transformación digital',
}

export default async function BlogPage() {
  return (
    <div className="min-h-screen">
      <BlogGrid />
    </div>
  )
}
