import Link from 'next/link'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`group flex items-center gap-2.5 ${className}`} aria-label="FastIA, inicio">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-blue-500 to-blue-600 transition-transform duration-300 group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" aria-hidden>
          <rect x="3" y="3" width="8" height="8" rx="1.6" fill="currentColor" opacity="0.95" />
          <rect x="13" y="3" width="8" height="8" rx="1.6" fill="currentColor" opacity="0.55" />
          <rect x="3" y="13" width="8" height="8" rx="1.6" fill="currentColor" opacity="0.55" />
          <rect x="13" y="13" width="8" height="8" rx="1.6" fill="currentColor" opacity="0.8" />
        </svg>
      </span>
      <span className="font-display text-xl font-semibold tracking-tight text-gray-900">
        Fast<span className="text-gradient">ia</span>
      </span>
    </Link>
  )
}
