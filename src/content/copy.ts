// Textos de la página. Un cliente nuevo edita SOLO este archivo (y config/funnel.ts).
// Todo lo que está entre [corchetes] es un marcador: reemplazar con lo que dice el VSL del cliente.
// No inventar cifras, testimonios, garantías ni bonos.
import { BRAND_NAME, PERSON_NAME } from '@/config/funnel'

export interface Testimonial {
  name: string
  role: string
  quote: string
  /** Resultado concreto que dijo el testimonio (opcional): "+30% en ventas" */
  result?: string
  photo?: string
}

export interface TeamMember {
  name: string
  role: string
  bio?: string
  photo?: string
}

export const SEO = {
  landing: {
    title: `${BRAND_NAME} | Diseño de interiores y fábrica propia en Samborondón`,
    description:
      'Diseñamos y fabricamos tu sala, cocina, dormitorio o casa completa en Samborondón. Fábrica propia: lo que ves en el diseño es lo que llega a tu casa.',
  },
  video: { title: `Mira el video | ${BRAND_NAME}`, description: 'Cristin te cuenta cómo trabajamos, cuánto cuesta y cuál es el primer paso.' },
  booking: { title: `Agenda tu visita | ${BRAND_NAME}`, description: 'Elige el día y la hora.' },
  booked: { title: `Visita agendada | ${BRAND_NAME}`, description: 'Tu visita está agendada.' },
  noSpace: { title: `Todavía no es el momento | ${BRAND_NAME}`, description: 'Gracias por tu interés.' },
  pago: { title: `Confirma tu lugar | ${BRAND_NAME}`, description: 'Completa tu inscripción.' },
  confirmada: { title: `Inscripción confirmada | ${BRAND_NAME}`, description: 'Tu lugar está confirmado.' },
  privacy: { title: `Política de privacidad | ${BRAND_NAME}`, description: `Política de privacidad de ${BRAND_NAME}.` },
  legal: { title: `Aviso legal | ${BRAND_NAME}`, description: `Aviso legal de ${BRAND_NAME}.` },
}

// ── Landing (/) ───────────────────────────────────────────────────────────────
// Todo sale del VSL de Cristin (fases 1 a 6). Estructura corta: hero → origen → proceso → Cristin.
export const LANDING = {
  // Temporizador del encabezado (components/CountdownTimer.vue). short = versión de celular.
  timer: { label: 'Agenda de visitas', short: 'Visitas', prefix: 'Cierra en' },
  headline: 'Una casa bonita no se arma comprando muebles.',
  headlineAccent: 'Se diseña completa.',
  sub: `Hola, soy ${PERSON_NAME}. Hace diez años diseño y fabrico espacios para casas y departamentos en Samborondón. En este video te cuento cómo trabajamos, cuánto cuesta y cuál es el primer paso.`,
  videoCaption: 'Fundadora de DECO by DC',
  cta: 'Ver el video completo',
  ctaNote: 'Sin costo · Solo te pedimos tus datos para mostrártelo',
  heroFacts: ['10 años', 'Fábrica propia', 'Samborondón'],

  // Banda oscura: el origen en el taller de piedra
  origin: {
    kicker: 'Empezamos fabricando mesas de mármol.',
    story: [
      'Un cliente recibía su mesa y, a los pocos días, nos escribía: "Las sillas que tengo ya no van con la mesa, ¿me las pueden hacer?". Luego nos pedía el aparador. Después la sala.',
      'Ahí entendimos algo: nuestros clientes no buscaban una mesa. Buscaban que su casa se sintiera completa.',
    ],
    photoCaption: 'Una mesa de piedra, como las primeras que fabricamos.',
    statement: 'Lo que ves en el diseño es lo que llega a tu casa.',
    statementSub:
      'Como venimos de la fábrica, cuando diseño tu sala o tu cocina ya sé cómo se va a fabricar cada pieza, con qué material y cuánto va a costar.',
  },

  // Galería de proyectos (fotos de Instagram que mandó el cliente, en public/proyectos)
  projects: {
    title: 'Cada espacio, pensado junto con el resto de la casa.',
    items: [
      { src: '/proyectos/cocina.webp', label: 'Cocina', alt: 'Cocina con isla de mármol, muebles altos en tono arena y lámparas colgantes negras', w: 1100, h: 1467 },
      { src: '/proyectos/sala-comedor.webp', label: 'Sala y comedor', alt: 'Comedor con mesa de piedra y sillas tapizadas, integrado a la sala', w: 1100, h: 1375 },
      { src: '/proyectos/dormitorio.webp', label: 'Dormitorio', alt: 'Dormitorio con cabecera tapizada, veladores y espejos ovalados iluminados', w: 1200, h: 1200 },
      { src: '/proyectos/mueble-tv.webp', label: 'Mueble de TV', alt: 'Pared de TV con iluminación indirecta, listones azules y mueble bajo a medida', w: 1100, h: 1467 },
      { src: '/proyectos/comedor.webp', label: 'Comedor', alt: 'Comedor de cuatro puestos con lámpara dorada y mueble alto de madera', w: 1100, h: 1956 },
    ],
  },

steps: {
    title: 'De la primera visita a tu casa terminada, en un mes y medio.',
    items: [
      {
        title: 'La visita',
        meta: '1 hora · $40 en Samborondón',
        text: 'Voy a tu casa, conozco el espacio y tomo medidas. Pero es una asesoría: conversamos cómo usas el espacio, quién vive ahí y qué te gustaría sentir al llegar. Te quedas con recomendaciones concretas aunque no sigamos juntos.',
      },
      {
        title: 'El diseño',
        meta: 'En unos 10 días · $20 por m²',
        text: 'No es un boceto: es el proyecto completo. Renders con iluminación, colores y cada mueble en su lugar, medidas y acabados. Junto con el presupuesto, detallado rubro por rubro.',
      },
      {
        title: 'El diseño es tuyo',
        meta: 'Sin presión',
        text: 'Los renders y los planos son tuyos. Si decides que lo fabriquemos nosotros, encantados. Y si no, te los llevas igual.',
      },
      {
        title: 'La fabricación',
        meta: '20 días a 1 mes · Garantía de 1 año',
        text: 'Fábrica propia, sin subcontratar: todo pasa por nuestro taller y nuestro control de calidad. Y como venimos de las piedras naturales, te asesoramos en mármol, granito, cuarzo y porcelanato.',
      },
    ],
    budgetNote:
      'Si el proyecto suma $12,000 y quieres invertir $8,000, no bajamos la calidad para que cuadre. Revisamos juntos cada rubro y dejamos para una segunda etapa lo que no es prioridad.',
    cta: 'Ver el video completo',
  },

  // Referencias de inversión del VSL (fase 3)
  prices: {
    title: 'Para que tengas una referencia desde ahora',
    items: [
      { space: 'Dormitorio completo', detail: 'Paredes, cama, veladores y espejos', range: '$4,000 – $6,000' },
      { space: 'Walk-in closet pequeño', detail: '', range: '$2,000 – $3,000' },
      { space: 'Walk-in closet amplio', detail: '', range: '$5,000 – $8,000' },
      { space: 'Cocina', detail: 'Remodelación total', range: '$8,000 – $12,000' },
    ],
    note: 'Cada proyecto depende del tamaño del espacio y de los acabados que elijas.',
  },

  about: {
    title: `Hola, soy ${PERSON_NAME}.`,
    role: 'Fundadora de DECO by DC',
    paragraphs: [
      'En este proceso, quien decide eres tú. Tu estilo y tu forma de vivir son el punto de partida, y mi firma pasa a segundo plano. Si te gusta lo cálido, lo minimalista o algo más clásico, el diseño nace de ahí.',
      'Durante todo el proceso hablas directamente conmigo, sin intermediarios. Y la mayoría de nuestros clientes llega porque alguien cercano les recomendó.',
    ],
    stats: [
      { value: '10', unit: 'años', label: 'diseñando y fabricando' },
      { value: '1', unit: 'año', label: 'de garantía por fabricación' },
      { value: '100', unit: '%', label: 'en nuestro taller, sin subcontratar' },
    ],
    quote: 'Quedó tal como lo soñaba.',
    quoteSource: 'La frase que más escucho al entregar un proyecto',
    closing: 'Si te acabas de mudar o quieres renovar un espacio de tu casa, mira el video y agenda tu visita.',
    cta: 'Ver el video completo',
  },

  // Testimonios REALES del cliente. Vacío = la sección no se muestra.
  testimonials: {
    eyebrow: 'Resultados',
    title: 'Lo que dicen nuestros clientes',
    items: [] as Testimonial[],
  },

  // Equipo. Vacío = la sección no se muestra.
  team: {
    eyebrow: 'Quién te acompaña',
    title: 'El equipo',
    items: [] as TeamMember[],
  },

  sticky: { title: 'Tu casa, diseñada completa', sub: `Video de ${PERSON_NAME} · ${BRAND_NAME}`, cta: 'Ver video' },
  disclaimer:
    'Los resultados dependen de cada caso. Este sitio no está respaldado por Meta Platforms, Inc. ni forma parte de Facebook.',
}

// ── Modal de registro ─────────────────────────────────────────────────────────
export const REGISTRO = {
  eyebrow: 'DECO by DC',
  title: 'Mira el video completo',
  sub: 'Cristin te cuenta cómo trabajamos, cuánto cuesta y cuál es el primer paso. Al final puedes agendar tu visita.',
  submit: 'Ver el video completo',
  submitPago: 'Continuar',
  legal: 'Tus datos están seguros · No spam',
}

// ── /ver-video ────────────────────────────────────────────────────────────────
export const VIDEO = {
  step: 'Paso 1 de 2',
  eyebrow: `${PERSON_NAME} · ${BRAND_NAME}`,
  title: 'Cómo diseñamos y fabricamos tu espacio completo',
  sub: 'Mira el video completo. Al final puedes agendar tu visita.',
  lockText: 'El botón se habilita en',
  cta: 'Agendar mi visita',
  trust: 'Visita de asesoría: $40 en Samborondón · Otras zonas según la distancia',
}

// ── Cualificación (las preguntas están en utils/qualification.ts) ─────────────
export const CUALIFICACION = {
  eyebrow: 'Último paso',
  title: 'Cuéntame qué espacio quieres trabajar',
  sub: 'Una pregunta a la vez. Te toma un minuto.',
  consent: `Acepto que ${BRAND_NAME} me contacte por WhatsApp y correo, y acepto su`,
  submit: 'Ver horarios disponibles',
}

// ── /agendar ──────────────────────────────────────────────────────────────────
export const BOOKING = {
  step: 'Paso 2 de 2',
  title: 'Elige el día de tu visita',
  sub: 'Conozco tu espacio, tomo medidas y conversamos qué quieres lograr. La visita tiene un valor de $40 en Samborondón; en otras zonas varía según la distancia.',
  pending:
    'Estamos terminando de configurar el calendario. Te escribiremos por WhatsApp para coordinar tu visita.',
}

// ── /cita-confirmada ──────────────────────────────────────────────────────────
export const BOOKED = {
  title: 'Tu visita está agendada',
  whatsappCta: `Escríbele a ${PERSON_NAME} por WhatsApp`,
  whatsappMsg: (nombre: string) =>
    nombre ? `Hola, soy ${nombre}. Acabo de agendar mi visita con ${BRAND_NAME}.` : `Hola, acabo de agendar mi visita con ${BRAND_NAME}.`,
  sub: 'Te enviamos los detalles a tu correo.',
  steps: [
    { icon: 'fa-solid fa-envelope', title: 'Revisa tu correo', text: 'Ahí tienes la fecha y la hora de tu visita.' },
    { icon: 'fa-brands fa-whatsapp', title: 'Te escribimos por WhatsApp', text: 'Mi equipo te escribe para confirmar la dirección y resolver dudas.' },
    { icon: 'fa-solid fa-list-check', title: 'Piensa en tu espacio', text: 'Cómo lo usas, quién vive ahí, qué no te gusta hoy y qué te gustaría sentir al llegar.' },
  ],
}

// ── /sin-espacio ──────────────────────────────────────────────────────────────
export const NO_SPACE = {
  title: 'Todavía no es el momento, y está bien',
  text: 'Nosotros trabajamos proyectos de diseño: no vendemos una silla o una mesa suelta. Si lo que buscas es un mueble puntual, hay muchas opciones en el mercado, y es completamente válido. Cuando quieras resolver un espacio completo, aquí estamos.',
  cooldown: 'Ya enviaste una solicitud. Podrás intentarlo de nuevo en',
  resourcesTitle: `Sigue aprendiendo con ${BRAND_NAME}`,
  resourcesText: 'En Instagram compartimos proyectos, materiales y el día a día del taller.',
}

// ── Pago (opcional) ───────────────────────────────────────────────────────────
export const PAGO = {
  step: 'Paso 2 de 2 · Confirma tu lugar',
  title: 'falta un paso para confirmar tu lugar',
  sub: 'Tu lugar queda reservado cuando completas el pago.',
  bullets: ['[Formato: en vivo, en línea]', '[Qué se lleva el asistente]'],
  noLink: 'Recibimos tus datos. Te enviaremos el enlace de pago a tu WhatsApp y a tu correo.',
  whatsappMsg: (nombre: string) => `Hola, soy ${nombre}. Me registré y quiero completar mi pago.`,
  expired: 'El formulario de pago venció por seguridad. Ábrelo de nuevo para pagar.',
  loadError: 'No pudimos cargar el pago. Inténtalo de nuevo o escríbenos.',
}

export const CONFIRMADA = {
  title: 'Tu lugar está confirmado',
  steps: [
    { icon: 'fa-solid fa-envelope-open-text', text: 'Revisa tu correo: ahí te llega la confirmación y el acceso.' },
    { icon: 'fa-brands fa-whatsapp', text: 'Te escribiremos por WhatsApp antes de empezar.' },
    { icon: 'fa-solid fa-list-check', text: '[Qué preparar antes del evento]' },
  ],
  calendarTitle: '¿Prefieres que veamos tu caso? Agenda una reunión',
  calendarButton: 'Agendar una reunión',
  // Solo con Payphone: estados mientras se confirma el pago o si no se aprobó
  checking: 'Confirmando tu pago…',
  checkingSub: 'No cierres esta página, toma unos segundos.',
  failedTitle: 'Tu pago no se completó',
  failedSub: 'Payphone no aprobó el cobro. Puedes intentarlo de nuevo con otra tarjeta.',
  nodataTitle: 'No encontramos un pago en este enlace',
  nodataSub: 'Si ya pagaste, te llega la confirmación a tu correo. Si no, completa tu pago aquí.',
  errorTitle: 'No pudimos confirmar tu pago',
  errorSub: 'Si se te descontó el dinero, escríbenos con este número de transacción y lo revisamos.',
  helpMsg: (nombre: string, tx: string) =>
    `Hola, soy ${nombre}. Pagué y no me aparece confirmado${tx ? ` (transacción ${tx})` : ''}.`,
}
