// Modelo de cualificación del funnel: UNA sola fuente de verdad.
// Para un cliente nuevo solo se editan QUESTIONS, OBJETIVO y la regla de qualifies().
// Salen del cierre del VSL / de lo que el cliente define como "sí es cliente" (no inventar).
//
// Cada respuesta viaja a GHL como `<key>` (valor interno) y `<key>_label` (texto legible:
// es el que se mapea en los campos personalizados). Ver references/contrato-ghl.md de la skill.
// Los `value` son estables: si GHL ya está mapeado, NO renombrarlos (solo agregar).

export interface QuestionOption {
  value: string
  label: string
}

export interface Question {
  key: string
  title: string
  /** Etiqueta corta para la nota del CRM */
  noteLabel: string
  options: readonly QuestionOption[]
}

export const QUESTIONS = [
  {
    key: 'espacio',
    title: '¿Qué espacio quieres trabajar?',
    noteLabel: 'Espacio',
    options: [
      { value: 'casa_completa', label: 'Mi casa o departamento completo' },
      { value: 'sala_comedor', label: 'La sala y el comedor' },
      { value: 'cocina', label: 'La cocina' },
      { value: 'dormitorio_closet', label: 'Un dormitorio o un walk-in closet' },
      { value: 'un_mueble', label: 'Solo busco un mueble puntual' },
    ],
  },
  {
    key: 'momento',
    title: '¿En qué momento estás?',
    noteLabel: 'Momento',
    options: [
      { value: 'recien_mudado', label: 'Me acaban de entregar mi casa o me voy a mudar' },
      { value: 'renovar', label: 'Quiero renovar un espacio de mi casa' },
      { value: 'solo_info', label: 'Solo estoy viendo ideas por ahora' },
    ],
  },
  {
    key: 'inversion',
    title: '¿Cuánto tienes pensado invertir en tu proyecto?',
    noteLabel: 'Inversión',
    options: [
      { value: 'menos_2k', label: 'Menos de $2,000' },
      { value: '2k_5k', label: 'Entre $2,000 y $5,000' },
      { value: '5k_10k', label: 'Entre $5,000 y $10,000' },
      { value: 'mas_10k', label: 'Más de $10,000' },
    ],
  },
] as const satisfies readonly Question[]

/** Último paso: pregunta abierta (va a GHL como `objetivo`). */
export const OBJETIVO = {
  title: 'Cuéntame de tu espacio: ¿qué no te gusta de cómo está hoy y qué te gustaría sentir al llegar?',
  placeholder: 'Ej.: quién vive ahí, cómo usan el espacio y el estilo que te gusta (cálido, minimalista, clásico…)',
  minWords: 10,
}

export type QuestionKey = (typeof QUESTIONS)[number]['key']
export type Answers = Record<QuestionKey, string>

export const emptyAnswers = (): Answers =>
  Object.fromEntries(QUESTIONS.map((q) => [q.key, ''])) as Answers

export function labelFor(key: QuestionKey, value: string): string {
  const q = QUESTIONS.find((x) => x.key === key)
  return q?.options.find((o) => o.value === value)?.label ?? value
}

// ── Regla de cualificación ────────────────────────────────────────────────────
// Del VSL: "No vendemos una silla o una mesa suelta" y la fabricación arranca en ~$2,000
// (walk-in closet pequeño). Quien solo ve ideas tampoco pasa a la agenda.
const DISQUALIFY: Partial<Record<QuestionKey, readonly string[]>> = {
  espacio: ['un_mueble'],
  momento: ['solo_info'],
  inversion: ['menos_2k'],
}

export function qualifies(a: Answers): boolean {
  return (Object.keys(DISQUALIFY) as QuestionKey[]).every(
    (k) => !(DISQUALIFY[k] ?? []).includes(a[k]),
  )
}
