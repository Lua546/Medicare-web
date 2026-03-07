# MediCare Clínica — Landing Page

Template premium para clínicas privadas desarrollado con HTML5, CSS3 y JavaScript Vanilla puro. Diseñado para ser fácilmente personalizable por el cliente con mínimos conocimientos técnicos.

---

## Características

- **Mobile-first y 100% responsive** — Adaptado a todos los tamaños de pantalla
- **Animaciones suaves** — Scroll reveal, contadores animados, float cards
- **Sin dependencias externas** — Solo HTML, CSS y JS nativos
- **Sistema de configuración centralizado** — Un solo archivo para personalizar todo
- **Accesible** — ARIA labels, navegación por teclado, prefers-reduced-motion
- **Rendimiento optimizado** — Lazy loading, IntersectionObserver, requestAnimationFrame

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
│       └── (colocar imágenes aquí)
│
└── README.md
```

---

## Cómo Personalizar: `config/site-config.js`

Este es el **único archivo que el cliente debe editar**. Contiene toda la información de la clínica organizada en secciones:

### 1. Información básica de la clínica

```js
clinica: {
  nombre: "MediCare Clínica",
  nombreCorto: "MediCare",
  eslogan: "Tu salud, nuestra prioridad",
  descripcionHero: "Texto que aparece en el hero...",
  aniosExperiencia: 16,
  pacientesAtendidos: 12000,
  especialistas: 8,
  satisfaccion: 98,
}
```

### 2. Datos de contacto

```js
contacto: {
  telefono: "+595 21 555-0100",
  email: "consultas@miclínica.com",
  direccion: "Av. Principal 123, Asunción",
  whatsapp: "595981234567",  // Solo números, sin + ni espacios
  whatsappMensaje: "Hola, quiero agendar una consulta.",
}
```

### 3. Horarios de atención

```js
horarios: [
  { dia: "Lunes – Viernes", hora: "07:00 – 20:00" },
  { dia: "Sábados",         hora: "08:00 – 14:00" },
]
```

### 4. Redes sociales

Dejar vacío (`""`) para ocultar una red social:

```js
redesSociales: {
  facebook: "https://facebook.com/miclínica",
  instagram: "",   // ← se oculta si está vacío
  linkedin: "",
}
```

### 5. Servicios médicos

```js
servicios: [
  {
    icono: "stethoscope",  // Ver lista de iconos disponibles abajo
    nombre: "Medicina General",
    descripcion: "Descripción breve del servicio.",
  },
  // ... más servicios
]
```

**Iconos disponibles:** `stethoscope`, `heart-pulse`, `microscope`, `scan`, `baby`, `bone`

### 6. Médicos / Especialistas

```js
medicos: [
  {
    nombre: "Dra. Ana García",
    especialidad: "Cardióloga",
    bio: "Breve biografía del médico.",
    imagen: null,        // null = mostrar iniciales; o poner URL de foto
    iniciales: "AG",     // Se muestran si imagen es null
  },
]
```

Para agregar foto: `imagen: "assets/img/dra-garcia.jpg"`

### 7. Testimonios

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

### 8. FAQ

```js
faq: [
  {
    pregunta: "¿Cómo agendo una consulta?",
    respuesta: "Puede comunicarse al...",
  },
]
```

### 9. Mapa (Google Maps embed)

Para usar un mapa real:
1. Ir a Google Maps → buscar la dirección → Compartir → Insertar mapa
2. Copiar la URL del `src` del iframe
3. Pegarla en:

```js
mapa: {
  embedUrl: "https://www.google.com/maps/embed?pb=...",
}
```

### 10. SEO

```js
seo: {
  titulo: "Clínica ABC | Medicina en Asunción",
  descripcion: "Descripción para Google (150-160 caracteres).",
  keywords: "clínica, médico, Asunción, Paraguay",
}
```

---

## Cómo agregar imágenes reales

1. Colocar las imágenes en `assets/img/`
2. Para la sección **Sobre Nosotros**: reemplazar el placeholder en `index.html` (sección `#nosotros`) con:
   ```html
   <img src="assets/img/clinica-fachada.jpg" alt="Clínica ABC" loading="lazy">
   ```
3. Para la **Galería de instalaciones**: reemplazar los `gallery-placeholder` por imágenes reales en `config-injector.js` > función `injectGaleria()`.

---

## Personalizar Colores

Editar `assets/css/variables.css`:

```css
:root {
  --color-primary:       #0d9488;  /* Color principal (teal) */
  --color-primary-dark:  #0f766e;  /* Variante oscura */
  --color-primary-light: #14b8a6;  /* Variante clara */
}
```

Cambiar esas 3 variables actualizará todo el diseño automáticamente.

---

## Secciones incluidas

| Sección | ID | Descripción |
|---|---|---|
| Hero | `#inicio` | Encabezado con CTA y card de servicios |
| Servicios | `#servicios` | Cards de especialidades médicas |
| Nosotros | `#nosotros` | Info institucional con features |
| Instalaciones | `#instalaciones` | Galería de fotos |
| Médicos | `#medicos` | Carousel de especialistas |
| Testimonios | `#testimonios` | Carousel de opiniones |
| FAQ | `#faq` | Acordeón de preguntas frecuentes |
| Contacto | `#contacto` | Mapa, info y formulario |

---

## Notas Técnicas

- **Compatibilidad:** Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **No requiere servidor** — Funciona abriendo `index.html` directamente en el navegador
- **Formulario de contacto:** El formulario incluido es una simulación visual. Para recibir los mensajes por email, integrar con [Formspree](https://formspree.io), [EmailJS](https://emailjs.com) u otro servicio similar.

---

## Créditos

Desarrollado como template premium para agencias web.  
Tecnologías: HTML5 · CSS3 · JavaScript ES2020+  
Fuentes: Playfair Display + DM Sans (Google Fonts)
