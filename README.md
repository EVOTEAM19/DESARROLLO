# FastIA - Desarrollo de Software con IA

Sitio web corporativo para FastIA, empresa líder en desarrollo de software con inteligencia artificial. 6 años de experiencia transformando empresas con soluciones innovadoras.

## 🚀 Características

- **Frontend Moderno**: Next.js 14 con App Router, TypeScript, Tailwind CSS
- **Backend como Servicio**: Supabase para base de datos, autenticación y storage
- **Panel de Administración**: Gestión completa de servicios, proyectos, blog y medios
- **SEO Optimizado**: Sitemap dinámico, metadata completa, structured data
- **Performance**: Optimizado para producción con lazy loading, code splitting, ISR
- **Analytics**: Integración con Google Analytics 4
- **Responsive**: Diseño adaptativo para todos los dispositivos
- **Branding FastIA**: Paleta de colores naranja y gris oscuro

## 📋 Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Base de Datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Animaciones**: Framer Motion
- **Formularios**: React Hook Form + Zod
- **Iconos**: Lucide React
- **Editor Rich Text**: Tiptap

## 🛠️ Requisitos Previos

- Node.js 20.x o superior
- npm o yarn
- Cuenta de Supabase
- (Opcional) Cuenta de Google Analytics 4

## 📦 Instalación Local

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd DESARROLLO
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo `env.example` a `.env.local`:

```bash
cp env.example .env.local
```

Edita `.env.local` y completa las variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3001

# Google Analytics (opcional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Node Environment
NODE_ENV=development
```

### 4. Configurar Supabase

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Ejecuta el script de schema en el SQL Editor de Supabase:
   - Abre `supabase/schema_fastia_todo_en_uno.sql`
   - Copia y pega todo el contenido en el SQL Editor
   - Ejecuta el script
3. (Opcional) Verifica el schema:
   - Ejecuta `supabase/verificar_schema.sql` para verificar que todo esté correcto

### 5. Iniciar servidor de desarrollo

```bash
npm run dev
```

El servidor se iniciará en [http://localhost:3001](http://localhost:3001)

## 📁 Estructura del Proyecto

```
DESARROLLO/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── admin/              # Panel de administración
│   │   ├── blog/               # Páginas dinámicas de blog
│   │   ├── productos/          # Páginas de productos
│   │   ├── servicios/          # Páginas dinámicas de servicios
│   │   ├── contacto/           # Página de contacto
│   │   ├── layout.tsx          # Layout principal
│   │   ├── page.tsx            # Página de inicio
│   │   ├── sitemap.ts         # Sitemap dinámico
│   │   └── robots.ts          # robots.txt
│   ├── components/
│   │   ├── admin/              # Componentes del panel admin
│   │   ├── analytics/          # Componentes de analytics
│   │   ├── layout/             # Header, Footer, Navigation
│   │   ├── sections/           # Secciones de la página principal
│   │   │   ├── Hero.tsx
│   │   │   ├── StatsCounter.tsx
│   │   │   ├── ProductsSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── TestimonialsCarousel.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── WhyFastIA.tsx
│   │   │   ├── BlogGrid.tsx
│   │   │   └── ContactForm.tsx
│   │   └── ui/                 # Componentes UI reutilizables
│   ├── lib/
│   │   ├── api.ts              # Funciones API para Supabase
│   │   ├── auth.ts             # Funciones de autenticación
│   │   ├── supabase.ts         # Clientes de Supabase
│   │   ├── analytics.ts        # Utilidades de analytics
│   │   ├── logger.ts           # Logger utility
│   │   └── utils.ts            # Utilidades generales
│   └── types/
│       ├── index.ts            # Tipos generales
│       └── supabase.ts         # Tipos generados de Supabase
├── supabase/
│   ├── migrations/             # Migraciones de base de datos
│   ├── schema_fastia_todo_en_uno.sql  # Schema completo FastIA
│   ├── seed_data_fastia.sql    # Datos de ejemplo
│   └── verificar_schema.sql    # Script de verificación
├── scripts/
│   ├── pre-build.js            # Checks pre-build
│   ├── post-build.js           # Verificaciones post-build
│   └── backup-database.js      # Script de backup
├── public/                     # Archivos estáticos
├── next.config.js              # Configuración de Next.js
├── tailwind.config.ts          # Configuración de Tailwind
├── tsconfig.json               # Configuración de TypeScript
├── vercel.json                 # Configuración de Vercel
└── package.json                # Dependencias y scripts
```

## 🎯 Comandos Disponibles

### Desarrollo

```bash
# Iniciar servidor de desarrollo (puerto 3001)
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm start

# Ejecutar linter
npm run lint
```

### Scripts Adicionales

```bash
# Pre-build checks
npm run pre-build

# Post-build verification
npm run post-build

# Backup database
npm run backup-db

# Crear usuario admin
npm run create-admin

# Actualizar contraseña de usuario
npm run update-password
```

## 🌐 Deploy en Vercel

### Configuración Inicial

1. **Instalar Vercel CLI** (opcional):
   ```bash
   npm i -g vercel
   ```

2. **Conectar proyecto**:
   ```bash
   vercel
   ```

3. **Configurar variables de entorno en Vercel Dashboard**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (ej: https://fastia.com)
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` (opcional)
   - `SUPABASE_SERVICE_ROLE_KEY` (solo server, opcional)

### Variables de Entorno en Vercel

#### Variables Públicas (NEXT_PUBLIC_*)
- `NEXT_PUBLIC_SUPABASE_URL`: URL de tu proyecto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Anon key de Supabase
- `NEXT_PUBLIC_SITE_URL`: URL de tu sitio (ej: https://fastia.com)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: ID de Google Analytics 4 (opcional)

#### Variables Privadas (Server-only)
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key de Supabase (solo para operaciones server-side)

### Deploy Automático

El proyecto está configurado para:
- **Deploy automático** desde la rama `main`
- **Preview deployments** en Pull Requests
- **Rollback automático** si el build falla

### Configuración de Dominio

1. En Vercel Dashboard, ve a **Settings > Domains**
2. Agrega tu dominio personalizado
3. Configura los registros DNS según las instrucciones
4. SSL se configura automáticamente

## 🔐 Autenticación

### Panel de Administración

1. Accede a `/login`
2. Usa las credenciales configuradas en Supabase Auth
3. Las rutas `/admin/*` están protegidas automáticamente

### Crear Usuario Admin

En Supabase Dashboard:
1. Ve a **Authentication > Users**
2. Crea un nuevo usuario o invita por email
3. El usuario podrá acceder al panel admin

O usa el script:
```bash
npm run create-admin
```

## 📊 Base de Datos

### Tablas Principales

- `services`: Servicios de FastIA (The Mesh)
- `projects`: Proyectos destacados
- `testimonials`: Testimonios de clientes
- `blog_posts`: Artículos del blog
- `contact_messages`: Mensajes de contacto
- `site_settings`: Configuración del sitio

### Schema

El schema completo está en `supabase/schema_fastia_todo_en_uno.sql`. Este script:
- Crea todas las tablas necesarias
- Configura índices para performance
- Establece triggers para `updated_at`
- Configura Row Level Security (RLS)
- Incluye datos de ejemplo

## 🎨 Personalización

### Tema y Colores

El tema FastIA está configurado en:
- `tailwind.config.ts`: Colores naranja (#FF6B35) y gris oscuro, fuentes, animaciones
- `src/app/globals.css`: Variables CSS y estilos globales

### Contenido

El contenido se gestiona desde:
- Panel de administración (`/admin`)
- Base de datos Supabase
- Configuración en `site_settings`

## ⚡ Optimizaciones de Performance

### Imágenes
- Todas las imágenes usan `next/image` con lazy loading
- Configuración de dominios remotos en `next.config.js`
- Placeholders blur para mejor UX

### Code Splitting
- Componentes pesados cargados dinámicamente
- Admin panel con lazy loading
- Suspense boundaries para mejor UX

### Fonts
- Fuentes optimizadas con `next/font`
- Preload de fuentes críticas
- Variable fonts cuando es posible

### Build
- Eliminación automática de `console.log` en producción
- Tree shaking de librerías no usadas
- Compresión automática de CSS/JS

## 📈 SEO

- **Sitemap dinámico**: `/sitemap.xml`
- **robots.txt**: `/robots.txt`
- **Metadata completa**: Open Graph, Twitter Cards
- **Structured Data**: JSON-LD cuando sea necesario

## 🧪 Testing Pre-Producción

```bash
# Build de producción
npm run build

# Iniciar servidor de producción local
npm start

# Verificar:
# ✅ Build exitoso sin errores
# ✅ Todas las rutas cargan
# ✅ Forms funcionan
# ✅ Admin login funciona
# ✅ Imágenes cargan
# ✅ Performance > 85 (Lighthouse)
```

## 🐛 Troubleshooting

### Error: Variables de entorno no encontradas

Asegúrate de que `.env.local` existe y tiene todas las variables requeridas. Ver `env.example` para referencia.

### Error: No se puede conectar a Supabase

Verifica que las URLs y keys en `.env.local` sean correctas. Asegúrate de que:
- `NEXT_PUBLIC_SUPABASE_URL` no tenga trailing slash
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` sea la anon key, no la service role key

### Error: Build falla en Vercel

1. Verifica que todas las variables de entorno estén configuradas
2. Revisa los logs de build en Vercel Dashboard
3. Ejecuta `npm run build` localmente para ver errores
4. Verifica que el schema de Supabase esté correctamente configurado

### Error: Imágenes no cargan

Verifica que los dominios estén configurados en `next.config.js`:
- `images.unsplash.com`
- `*.supabase.co`
- Cualquier otro dominio que uses

## 📝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guía de Contribución

- Sigue las convenciones de código existentes
- Añade tests para nuevas funcionalidades
- Actualiza la documentación cuando sea necesario
- Asegúrate de que el build pase antes de hacer PR

## 📄 Licencia

Este proyecto es privado y propietario de FastIA.

## 👥 Equipo

Desarrollado por el equipo de FastIA.

## 📞 Soporte

Para soporte, contacta al equipo de desarrollo o abre un issue en el repositorio.

---

**Última actualización**: Enero 2025
