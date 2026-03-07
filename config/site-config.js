/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║              CONFIGURACIÓN DEL SITIO - CLÍNICA               ║
 * ║          Edite solo este archivo para personalizar           ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * Este es el ÚNICO archivo que el cliente debe modificar.
 * Todos los datos aquí se inyectan automáticamente en el sitio.
 */

const SITE_CONFIG = {

  // ─── INFORMACIÓN BÁSICA ─────────────────────────────────────────
  clinica: {
    nombre: "MediCare Clínica",
    nombreCorto: "MediCare",
    eslogan: "Tu salud, nuestra prioridad",
    descripcionHero: "Atención médica de excelencia en el corazón de Asunción. Especialistas comprometidos con tu bienestar y el de tu familia.",
    descripcionSobre: "Desde 2008, MediCare Clínica ha sido un referente en atención médica integral en Asunción. Contamos con un equipo de especialistas altamente calificados y tecnología de última generación para ofrecerte el mejor cuidado de tu salud.",
    aniosExperiencia: 16,
    pacientesAtendidos: 12000,
    especialistas: 8,
    satisfaccion: 98,
    logoTexto: "MediCare",
  },

  // ─── CONTACTO ───────────────────────────────────────────────────
  contacto: {
    telefono: "+595 21 555-0100",
    telefonoSecundario: "+595 21 555-0101",
    email: "consultas@medicare-clinica.com.py",
    direccion: "Av. Mariscal López 1234, Asunción, Paraguay",
    whatsapp: "595981234567", // Solo números, sin + ni espacios
    whatsappMensaje: "Hola, me gustaría agendar una consulta médica.",
  },

  // ─── HORARIOS ───────────────────────────────────────────────────
  horarios: [
    { dia: "Lunes – Viernes", hora: "07:00 – 20:00" },
    { dia: "Sábados", hora: "08:00 – 14:00" },
    { dia: "Domingos y Feriados", hora: "Urgencias 24h" },
  ],

  // ─── REDES SOCIALES ─────────────────────────────────────────────
  redesSociales: {
    facebook: "https://facebook.com/medicarecinica",
    instagram: "https://instagram.com/medicareclinica",
    twitter: "",
    linkedin: "https://linkedin.com/company/medicare-clinica",
  },

  // ─── SERVICIOS MÉDICOS ──────────────────────────────────────────
  servicios: [
    {
      icono: "stethoscope",
      nombre: "Medicina General",
      descripcion: "Atención primaria integral para adultos y niños. Diagnóstico, tratamiento y seguimiento de enfermedades comunes.",
    },
    {
      icono: "heart-pulse",
      nombre: "Cardiología",
      descripcion: "Evaluación cardiovascular completa. Electrocardiogramas, ecocardiogramas y monitoreo de presión arterial.",
    },
    {
      icono: "microscope",
      nombre: "Laboratorio Clínico",
      descripcion: "Análisis de sangre, orina y cultivos con resultados en 24 horas. Equipos de alta precisión.",
    },
    {
      icono: "scan",
      nombre: "Imágenes Diagnósticas",
      descripcion: "Ecografías, radiografías digitales y estudios de imagen con tecnología de última generación.",
    },
    {
      icono: "baby",
      nombre: "Ginecología y Obstetricia",
      descripcion: "Atención integral a la mujer en todas las etapas de su vida. Control prenatal y planificación familiar.",
    },
    {
      icono: "bone",
      nombre: "Traumatología",
      descripcion: "Tratamiento de lesiones musculoesqueléticas, fracturas y afecciones del aparato locomotor.",
    },
  ],

  // ─── MÉDICOS / ESPECIALISTAS ────────────────────────────────────
  medicos: [
    {
      nombre: "Dra. Valeria Núñez",
      especialidad: "Cardióloga",
      bio: "Especialista en cardiología preventiva con 12 años de experiencia. Fellowship en Buenos Aires.",
      imagen: null, // URL de imagen o null para placeholder
      iniciales: "VN",
    },
    {
      nombre: "Dr. Martín Rodríguez",
      especialidad: "Médico General",
      bio: "Director médico de la clínica. Más de 15 años atendiendo a familias asuncenas con dedicación y calidez.",
      imagen: null,
      iniciales: "MR",
    },
    {
      nombre: "Dra. Sofía Galeano",
      especialidad: "Ginecóloga",
      bio: "Especialista en salud femenina y medicina materno-fetal. Certificada por el Colegio Paraguayo de Médicos.",
      imagen: null,
      iniciales: "SG",
    },
    {
      nombre: "Dr. Andrés Villalba",
      especialidad: "Traumatólogo",
      bio: "Experto en cirugía ortopédica y rehabilitación. Formación en la Universidad Nacional de Asunción.",
      imagen: null,
      iniciales: "AV",
    },
  ],

  // ─── TESTIMONIOS ────────────────────────────────────────────────
  testimonios: [
    {
      nombre: "María José Fernández",
      texto: "Excelente atención desde el primer momento. Los médicos son muy profesionales y el personal administrativo siempre amable. Totalmente recomendado.",
      calificacion: 5,
      cargo: "Paciente frecuente",
    },
    {
      nombre: "Roberto Acosta",
      texto: "Llevé a mi hijo a la consulta de medicina general y quedé muy satisfecho. Las instalaciones son modernas y limpias. La doctora fue muy clara en su explicación.",
      calificacion: 5,
      cargo: "Padre de familia",
    },
    {
      nombre: "Lucía Martínez",
      texto: "El laboratorio es rápido y eficiente. Tuve mis resultados en pocas horas. La tecnología que usan es de primera. Sin duda la mejor clínica de la zona.",
      calificacion: 5,
      cargo: "Paciente",
    },
    {
      nombre: "Carlos Benítez",
      texto: "Desde que descubrí MediCare no voy a otro lugar. La atención de cardiología me salvó la vida. Excelentes profesionales con un trato muy humano.",
      calificacion: 5,
      cargo: "Paciente cardíaco",
    },
  ],

  // ─── PREGUNTAS FRECUENTES ────────────────────────────────────────
  faq: [
    {
      pregunta: "¿Cómo puedo agendar una consulta?",
      respuesta: "Puede agendar su consulta llamando al +595 21 555-0100, enviando un WhatsApp, o completando el formulario de contacto en nuestro sitio web. También puede venir directamente a nuestras instalaciones.",
    },
    {
      pregunta: "¿Aceptan obras sociales o seguros médicos?",
      respuesta: "Sí, trabajamos con las principales obras sociales y compañías de seguros del Paraguay. Consulte en recepción la disponibilidad de su cobertura antes de su cita.",
    },
    {
      pregunta: "¿Cuánto tiempo dura una consulta médica?",
      respuesta: "Una consulta estándar tiene una duración aproximada de 20 a 30 minutos. Las consultas de primera vez o con estudios incluidos pueden extenderse un poco más.",
    },
    {
      pregunta: "¿Realizan atención de urgencias?",
      respuesta: "Contamos con servicio de urgencias los 7 días de la semana. Para emergencias fuera del horario habitual, puede comunicarse al número de guardia disponible.",
    },
    {
      pregunta: "¿Los resultados de laboratorio se pueden recibir por correo?",
      respuesta: "Sí, enviamos los resultados al correo electrónico registrado en nuestra base de datos. También puede retirarlos personalmente en nuestro laboratorio a partir de las 24 horas.",
    },
    {
      pregunta: "¿Atienden a niños y adultos mayores?",
      respuesta: "Atendemos a pacientes de todas las edades. Contamos con médicos con formación en pediatría y geriatría para brindar la mejor atención según cada etapa de la vida.",
    },
  ],

  // ─── GALERÍA / INSTALACIONES ─────────────────────────────────────
  galeria: [
    { titulo: "Sala de Espera", descripcion: "Ambiente cómodo y climatizado" },
    { titulo: "Consultorio Principal", descripcion: "Equipamiento moderno" },
    { titulo: "Laboratorio", descripcion: "Tecnología de precisión" },
    { titulo: "Sala de Imágenes", descripcion: "Diagnóstico por imagen digital" },
    { titulo: "Recepción", descripcion: "Personal atento y capacitado" },
    { titulo: "Área Pediátrica", descripcion: "Espacios amigables para niños" },
  ],

  // ─── MAPA ────────────────────────────────────────────────────────
  mapa: {
    // Coordenadas de Asunción, Paraguay (Av. Mariscal López)
    lat: -25.2867,
    lng: -57.6470,
    zoom: 16,
    // Si tienes un embed de Google Maps, pega la URL aquí
    embedUrl: "",
  },

  // ─── SEO ─────────────────────────────────────────────────────────
  seo: {
    titulo: "MediCare Clínica | Atención Médica Integral en Asunción",
    descripcion: "Clínica privada en Asunción, Paraguay. Medicina general, cardiología, laboratorio, ginecología y más. Agendá tu consulta hoy.",
    keywords: "clínica médica Asunción, médico Asunción Paraguay, consulta médica, laboratorio clínico, cardiología Paraguay",
  },

};

// No modificar esta línea
if (typeof module !== "undefined") module.exports = SITE_CONFIG;
