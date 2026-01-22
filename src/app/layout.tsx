import type { Metadata } from 'next'

// Forzar renderizado dinámico en todo el sitio
export const dynamic = 'force-dynamic'
export const revalidate = 0
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { SiteChrome } from '@/components/layout/SiteChrome'
import { Analytics } from '@/components/analytics/Analytics'
import { Suspense } from 'react'
import { 
  organizationSchema, 
  localBusinessSchema,
  localBusinessSchemaMadrid,
  localBusinessSchemaBarcelona,
  localBusinessSchemaSevilla,
  professionalServiceSchema,
} from '@/components/StructuredData'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: false, // Solo cargar cuando se necesite
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fastia.es'),
  title: {
    default: 'FastIA - Desarrollo Freelance Apps & Software | CTO as a Service | Madrid',
    template: '%s | FastIA - Desarrollo Rápido y Económico',
  },
  description: 'Desarrolladores freelance expertos en apps móviles, web y software a medida. MVP en 8 semanas. CTO as a Service para startups. +40 developers, 11 años experiencia. Precio competitivo, calidad premium. Madrid, Barcelona, Sevilla.',
  keywords: [
    'desarrollador freelance madrid',
    'desarrollo app movil freelance',
    'cto freelance',
    'cto as a service',
    'desarrollo software rapido',
    'mvp 8 semanas',
    'programador freelance españa',
    'app personalizada precio',
    'desarrollo web economico',
    'freelance react native',
    'flutter freelance madrid',
    'full stack developer freelance',
    'crear app rapido',
    'desarrollo software agil',
    'mejor programador freelance',
    'desarrollo software IA',
    'apps móviles IA',
    'automatización empresarial',
  ],
  authors: [{ name: 'FastIA Team' }],
  creator: 'FastIA',
  publisher: 'FastIA',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: { 'es-ES': '/' },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: '/',
    siteName: 'FastIA',
    title: 'FastIA - Desarrollo Freelance Apps & Software | CTO as a Service',
    description: 'Desarrolladores freelance expertos. MVP en 8 semanas. +40 developers. Precio competitivo, calidad premium. Madrid, Barcelona, Sevilla.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FastIA - Desarrollo Freelance Profesional',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FastIA - Desarrollo Freelance Apps & Software',
    description: 'MVP en 8 semanas. +40 developers freelance. Precio competitivo. CTO as a Service.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
    ],
    apple: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NNZH6KX4');`,
          }}
        />
        
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://lbhviwctsjufyryoauem.supabase.co" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://snap.licdn.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NNZH6KX4"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* Structured Data - Organization & LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchemaMadrid),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchemaBarcelona),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchemaSevilla),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceSchema),
          }}
        />
        
        <SiteChrome>{children}</SiteChrome>
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
