import type { Metadata } from 'next'
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
    default: 'FastIA | Desarrollo de Software con IA en Madrid',
    template: '%s | FastIA',
  },
  description: '11 años transformando empresas con desarrollo de apps, plataformas web y automatizaciones impulsadas por IA. +40 desarrolladores en Madrid. #1 en IA para desarrollo de software.',
  keywords: ['desarrollo software IA', 'apps móviles IA', 'automatización empresarial', 'CTO externo', 'desarrollo web Madrid', 'inteligencia artificial'],
  authors: [{ name: 'FastIA' }],
  creator: 'FastIA',
  publisher: 'FastIA',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: '/',
    siteName: 'FastIA',
    title: 'FastIA | Desarrollo de Software con IA',
    description: '11 años transformando empresas con desarrollo de apps, plataformas web y automatizaciones impulsadas por IA. +40 desarrolladores en Madrid. #1 en IA para desarrollo de software.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FastIA - Transformamos ideas en soluciones inteligentes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FastIA | Desarrollo de Software con IA',
    description: '11 años transformando empresas con desarrollo de apps, plataformas web y automatizaciones impulsadas por IA. +40 desarrolladores en Madrid.',
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
        <link rel="apple-touch-icon" href="/favicon-32x32.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://lbhviwctsjufyryoauem.supabase.co" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
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
        
        <SiteChrome>{children}</SiteChrome>
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
