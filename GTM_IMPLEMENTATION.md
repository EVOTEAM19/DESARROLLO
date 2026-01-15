# Google Tag Manager - Implementación Completada

## ✅ Implementación

Google Tag Manager (GTM) ha sido implementado en el proyecto FastIA con el ID: **GTM-NNZH6KX4**

### Ubicación del código

1. **Código en `<head>`**: 
   - Archivo: `src/app/layout.tsx`
   - Se ejecuta antes de cualquier otro script para asegurar tracking completo

2. **Código noscript después de `<body>`**:
   - Archivo: `src/app/layout.tsx`
   - Fallback para usuarios sin JavaScript

### Verificación

Para verificar que GTM está funcionando:

1. **En el navegador**:
   - Abre DevTools (F12)
   - Ve a la pestaña "Network"
   - Recarga la página
   - Busca peticiones a `googletagmanager.com`
   - Deberías ver `gtm.js?id=GTM-NNZH6KX4`

2. **En Google Tag Manager**:
   - Ve a tu contenedor GTM
   - Usa "Vista previa" para verificar que las etiquetas se disparan correctamente

3. **Extensiones del navegador**:
   - Instala "Tag Assistant Legacy" de Google
   - Verifica que detecta GTM correctamente

### Configuración de etiquetas en GTM

Ahora puedes configurar etiquetas en Google Tag Manager sin tocar código:

- **Google Analytics 4**: Añade la etiqueta GA4 en GTM
- **Facebook Pixel**: Configura el pixel desde GTM
- **Conversiones**: Crea triggers personalizados
- **Eventos personalizados**: Trackea eventos específicos

### Variables de entorno

Asegúrate de tener configurado en `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://www.fastia.es
```

### Notas importantes

- GTM se carga de forma asíncrona, no bloquea el renderizado
- El código noscript asegura tracking incluso sin JavaScript
- Todas las páginas incluyen GTM automáticamente
- Compatible con Next.js 14 App Router

## 🎯 Próximos pasos

1. Configurar etiquetas en GTM (GA4, conversiones, etc.)
2. Crear triggers personalizados para eventos
3. Configurar variables para tracking avanzado
4. Probar en modo Preview antes de publicar
