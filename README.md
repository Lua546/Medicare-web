# MediCare Clínica — Landing Page Premium

Template premium para clínicas privadas desarrollado con HTML5, CSS3 y JavaScript Vanilla puro. Diseñado para ser fácilmente personalizable con mínimos conocimientos técnicos.

---

## Estructura del Proyecto

```
clinica-landing/
│
├── index.html                  ← Estructura principal (no editar)
│
├── config/
│   └── site-config.js          ← ÚNICO archivo a editar por el cliente
│
├── assets/
│   ├── css/
│   │   ├── variables.css       ← Tokens de diseño (colores, fuentes, espaciado)
│   │   ├── base.css            ← Reset y estilos base
│   │   ├── components.css      ← Botones, cards, formularios, carousel
│   │   ├── sections.css        ← Estilos por sección (navbar, hero, footer...)
│   │   └── responsive.css      ← Breakpoints y ajustes mobile
│   │
│   ├── js/
│   │   ├── main.js             ← Orquestador principal
│   │   ├── config-injector.js  ← Inyecta datos del config al DOM
│   │   ├── navbar.js           ← Sticky navbar, hamburger, scroll spy
│   │   ├── carousel.js         ← Carousel reutilizable con touch
│   │   ├── scroll-reveal.js    ← Animaciones al hacer scroll
│   │   ├── counter.js          ← Contadores animados
│   │   ├── faq.js              ← Accordion FAQ
│   │   └── whatsapp.js         ← Botón flotante y back-to-top
│   │
│   └── img/
│       ├── hero-bg.jpg         ← Fondo del hero (reemplazar con foto real)
│       ├── nosotros-bg.jpg     ← Imagen sección Nosotros
│       ├── testimonios-bg.jpg  ← Fondo sección Testimonios
│       ├── esp-ginecologia.jpg ← Especialidad Ginecología
│       ├── esp-cardiologia.jpg ← Especialidad Cardiología
│       ├── esp-imagenes.jpg    ← Especialidad Imágenes
│       ├── esp-laboratorio.jpg ← Especialidad Laboratorio
│       ├── esp-traumatologia.jpg ← Especialidad Traumatología
│       ├── esp-general.jpg     ← Medicina General
│       ├── gallery-sala-espera.jpg
│       ├── gallery-consultorio.jpg
│       ├── gallery-laboratorio.jpg
│       └── gallery-imagenes.jpg
│
└── README.md
```

---

## Cómo Personalizar: `config/site-config.js`

Este es el **único archivo que el cliente debe editar**. Todos los datos se inyectan automáticamente.

### 1. Información básica

```js
clinica: {
  nombre: "MediCare Clínica",
  eslogan: "Tu salud, nuestra prioridad",
  descripcionHero: "Texto del hero...",
  aniosExperiencia: 16,
  pacientesAtendidos: 12000,
  especialistas: 8,
  satisfaccion: 98,
}
```

### 2. Contacto y WhatsApp

```js
contacto: {
  telefono: "+595 21 555-0100",
  email: "consultas@miclínica.com",
  direccion: "Av. Principal 123, Asunción",
  whatsapp: "595981234567",  // Solo números, sin + ni espacios
  whatsappMensaje: "Hola, quiero agendar una consulta.",
}
```

### 3. Redes sociales

Dejar vacío (`""`) para ocultar automáticamente:

```js
redesSociales: {
  facebook: "https://facebook.com/miclínica",
  instagram: "",   // ← se oculta si está vacío
  linkedin: "",
}
```

### 4. Servicios / Especialidades

```js
servicios: [
  {
    icono: "stethoscope",  // stethoscope | heart-pulse | microscope | scan | baby | bone
    nombre: "Medicina General",
    descripcion: "Descripción breve.",
  },
]
```

### 5. Médicos

```js
medicos: [
  {
    nombre: "Dra. Ana García",
    especialidad: "Cardióloga",
    bio: "Breve biografía.",
    imagen: null,        // null = iniciales; o ruta: "assets/img/dra-garcia.jpg"
    iniciales: "AG",
    aniosExperiencia: 12,
    certificaciones: "CPM / FACC",
  },
]
```

### 6. Testimonios

```js
testimonios: [
  {
    nombre: "Juan Pérez",
    texto: "Excelente atención...",
    calificacion: 5,
    cargo: "Paciente",
  },
]
```

---

## Cómo Reemplazar Imágenes

1. Colocar las fotos reales en `assets/img/` usando los mismos nombres de archivo listados en la estructura
2. Formatos recomendados: **JPG o WebP** para mejor rendimiento
3. Tamaños recomendados:
   - `hero-bg.jpg` → 1800×1000px
   - `nosotros-bg.jpg` → 900×700px
   - `esp-*.jpg` → 700×900px (portrait)
   - `gallery-*.jpg` → 900×600px

---

## Personalizar Colores

Editar `assets/css/variables.css`:

```css
--teal:       #0fc4b8;   /* Color de acento principal */
--teal-dark:  #0d9488;   /* Variante oscura */
--bg-deep:    #0e0f11;   /* Fondo principal */
```

Cambiar estas variables actualiza todo el diseño automáticamente.

---

## Secciones Incluidas

| Sección        | ID               | Descripción                              |
|----------------|------------------|------------------------------------------|
| Hero           | `#inicio`        | Encabezado con CTA y tarjetas de servicio |
| Stats          | (barra)          | Contadores animados de métricas           |
| Especialidades | `#servicios`     | Cuadrícula de 6 especialidades con foto   |
| Nosotros       | `#nosotros`      | Historia y valores con features           |
| Instalaciones  | `#instalaciones` | Galería de fotos de la clínica            |
| Médicos        | `#medicos`       | Tarjetas del equipo médico                |
| Testimonios    | `#testimonios`   | Carousel con testimonios reales           |
| FAQ            | `#faq`           | Acordeón de preguntas frecuentes          |
| Contacto       | `#contacto`      | Info + formulario de agendamiento         |

---

## Características Técnicas

- **Mobile-first y 100% responsive** — Adaptado a todos los tamaños
- **Sin dependencias externas** — Solo HTML, CSS y JS nativos
- **Accesible** — ARIA labels, navegación por teclado, `prefers-reduced-motion`
- **Rendimiento** — Lazy loading, IntersectionObserver, requestAnimationFrame
- **Compatibilidad** — Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Sin servidor** — Funciona abriendo `index.html` directamente

---

## Notas

- El formulario de contacto incluye validación visual. Para recibir mensajes por email, integrar con [Formspree](https://formspree.io) o [EmailJS](https://emailjs.com).
- Las imágenes incluidas son **placeholders SVG**. Reemplazarlas con fotos reales de alta calidad antes de publicar.

---

Desarrollado como template premium para agencias web.  
Tecnologías: HTML5 · CSS3 · JavaScript ES2020+  
Fuentes: Playfair Display + DM Sans (Google Fonts)
