# 🎹 GuiaDePianos.com — Portal SEO & Amazon Afiliados de Pianos Digitales, Teclados y Accesorios

Portal editorial en español diseñado para quienes buscan su **primer piano digital o teclado**, comparando modelos de **61 y 88 teclas** según el **presupuesto**, el **espacio disponible en centímetros** y la **sensación al tocar** (acción de martillo contrapesada GHC / GHS / PHA-4 / Smart Scaled vs sensibilidad al tacto Touch Response), además de recomendar **pedales de sustain (con interruptor de polaridad N.O./N.C.), soportes en Z/X, bancos ajustables y audífonos sin latencia** con enlaces de afiliado a **Amazon Estados Unidos (`guiadepianos-20`)** y **Amazon España (`guiadepianos02-21`)**.

---

## 🚀 Arquitectura y Contenido (Cero Canibalización)

- **620 URLs estáticas SSG (Next.js 16 + React 19 + Tailwind CSS 4 + GSAP + Lenis)**:
  - **12 Hubs Pilares de Categoría** (`/resenas-pianos-y-teclados/`, `/comparativas/`, `/mejores-pianos-teclados-y-accesorios/`, `/primer-piano-o-teclado/`, `/sensacion-al-tocar-y-tipos-de-tecla/`, `/espacio-medidas-y-ergonomia/`, `/pedales-compatibles-y-polaridad/`, `/soportes-bancos-y-muebles/`, `/audifonos-sonido-y-practica-silenciosa/`, `/conexiones-midi-apps-y-aprendizaje/`, `/solucion-de-problemas-y-configuracion/`, `/mantenimiento-limpieza-y-transporte/`).
  - **100 Artículos Transaccionales Amazon Afiliados**: 40 Reseñas individuales + 30 Comparativas directas VS + 30 Rankings de compra Amazon.
  - **500 Artículos SEO Informacionales**: Guías técnicas paso a paso sin solapamiento semántico.
  - **8 Páginas Institucionales y Legales**: Home interactiva con los 15 efectos visuales inspirados en `prunex1.com`, Aviso Legal, Política de Privacidad, Política de Cookies, Divulgación de Afiliados de Amazon, Política Editorial, Sobre Nosotros y Contacto.
- **Imágenes Fotorrealistas y Diversas (`< 100 KB`)**: Generadas con **OpenAI ChatGPT Image API (`gpt-image-1`, `quality="medium"`)** a través de Supabase (`ehwjvuhbimqakvzqbvvg`) y optimizadas en WebP (`<= 68 KB`).
- **Asesor de Pianos IA Online (`gpt-4o-mini` predeterminado)**: Conectado a la Edge Function `guiadepianos-chat` en Supabase `charlielingan` y administrado en tiempo real desde el apartado **`guiadepianos.com`** del dashboard de `charlielingan.com`.

---

## 📋 Titularidad Legal

- **Titular**: CARLOS LINGAN BORJA
- **Domicilio**: Lima, Perú
- **Correo electrónico**: `info@charlielingan.com`
