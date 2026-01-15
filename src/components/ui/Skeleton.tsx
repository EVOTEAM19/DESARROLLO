import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'rectangular' | 'circular'
}

export function Skeleton({ className, variant = 'rectangular' }: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-background-secondary'
  const variantClasses = {
    text: 'h-4 rounded',
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
  }

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      aria-label="Cargando..."
    />
  )
}

export function HeroSkeleton() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-background">
      <div className="relative z-10 container mx-auto px-4 lg:px-6">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <Skeleton className="h-16 w-full max-w-3xl mx-auto" variant="text" />
          <Skeleton className="h-12 w-full max-w-2xl mx-auto" variant="text" />
          <Skeleton className="h-12 w-64 mx-auto" variant="rectangular" />
        </div>
      </div>
    </section>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-background-secondary rounded-2xl overflow-hidden border border-foreground/10">
      <Skeleton className="h-64 w-full" />
      <div className="p-6 lg:p-8 space-y-4">
        <Skeleton className="h-8 w-3/4" variant="text" />
        <Skeleton className="h-4 w-1/2" variant="text" />
        <Skeleton className="h-20 w-full" variant="text" />
        <Skeleton className="h-4 w-1/3" variant="text" />
      </div>
    </div>
  )
}

export function ServiceCardSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
      <div className="flex-1 space-y-6">
        <Skeleton className="h-16 w-16 rounded-2xl" />
        <Skeleton className="h-12 w-3/4" variant="text" />
        <Skeleton className="h-6 w-1/2" variant="text" />
        <Skeleton className="h-24 w-full" variant="text" />
      </div>
      <Skeleton className="flex-1 w-full lg:max-w-md h-80 rounded-2xl" />
    </div>
  )
}

export function BlogCardSkeleton() {
  return (
    <div className="bg-background rounded-2xl overflow-hidden border border-foreground/10">
      <Skeleton className="h-48 w-full" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-4 w-1/3" variant="text" />
        <Skeleton className="h-8 w-full" variant="text" />
        <Skeleton className="h-16 w-full" variant="text" />
        <Skeleton className="h-4 w-1/4" variant="text" />
      </div>
    </div>
  )
}
