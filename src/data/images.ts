import type { Lang, ProjectId } from './site'

export type Img = {
  id: string
  width: number
  height: number
  variants: Record<string, string>
  alt: Record<Lang, string>
}

const v = (slug: string, n: number, widths: number[]) =>
  Object.fromEntries(widths.map((w) => [String(w), `projects/${slug}/${String(n).padStart(2, '0')}-${w}.webp`]))

const pm = (n: number, alt: Record<Lang, string>): Img => ({
  id: `pawmate-${String(n).padStart(2, '0')}`,
  width: 1400,
  height: n === 1 || n === 2 || n === 4 ? 1024 : n === 5 ? 1120 : n === 11 ? 1038 : 1171,
  variants: v('pawmate', n, [640, 960, 1400]),
  alt,
})

const mz = (n: number, alt: Record<Lang, string>): Img => ({
  id: `maze-${String(n).padStart(2, '0')}`,
  width: 1920,
  height: 1080,
  variants: v('maze', n, [640, 960, 1440, 1920]),
  alt,
})

export const projectImages: Record<ProjectId, Img[]> = {
  pawmate: [
    pm(1, {
      en: 'PawMate case-study cover: “Find your Fur-ever friend,” with the app on a phone over a photo of families meeting pets at an Adopt-a-Pet event.',
      es: 'Portada del caso PawMate: “Find your Fur-ever friend”, con la app en un teléfono sobre una foto de familias conociendo mascotas en un evento Adopt-a-Pet.',
    }),
    pm(2, {
      en: 'About this project: the problem of fragmented shelter and adoption processes, and the proposed unified platform, illustrated with dogs, a cat and a rabbit.',
      es: 'Sobre el proyecto: el problema de procesos de adopción fragmentados y la plataforma unificada propuesta, ilustrada con perros, un gato y un conejo.',
    }),
    pm(3, {
      en: 'Design Thinking diagram for PawMate covering Empathize, Define, Ideate, Prototype and Test.',
      es: 'Diagrama de Design Thinking de PawMate: Empatizar, Definir, Idear, Prototipar y Testear.',
    }),
    pm(4, {
      en: 'PawMate brand and UI style: teal, rust and cream palette, with Fredoka and Quicksand type specimens.',
      es: 'Identidad y estilo de interfaz de PawMate: paleta en verde azulado, terracota y crema, con muestras tipográficas de Fredoka y Quicksand.',
    }),
    pm(5, {
      en: 'PawMate logo, icon set and UI component library, including buttons and form controls.',
      es: 'Logo, set de iconos y librería de componentes de PawMate, con botones y controles de formulario.',
    }),
    pm(6, {
      en: 'UX research persona 1: Emily Carter, a young woman in sunglasses, with goals, frustrations and behaviors around pet adoption.',
      es: 'Persona de investigación 1: Emily Carter, una joven con gafas de sol, con metas, frustraciones y comportamientos en torno a la adopción.',
    }),
    pm(7, {
      en: 'UX research persona 2: Carlos Ramirez, a young man in a cap and hoodie, with goals, frustrations and behaviors around pet adoption.',
      es: 'Persona de investigación 2: Carlos Ramirez, un joven con gorra y sudadera, con metas, frustraciones y comportamientos en torno a la adopción.',
    }),
    pm(8, {
      en: 'PawMate user-journey map across stages of the adoption experience, with actions, thoughts and emotions, illustrated with a cat.',
      es: 'Mapa de viaje de usuario de PawMate a lo largo de las etapas de adopción, con acciones, pensamientos y emociones, ilustrado con un gato.',
    }),
    pm(9, {
      en: 'PawMate user-flow diagram of the adoption journey, illustrated with a corgi.',
      es: 'Diagrama de flujo de usuario de PawMate para el recorrido de adopción, ilustrado con un corgi.',
    }),
    pm(10, {
      en: 'Interview insights from PawMate research: questions asked and key quotes, illustrated with a dog.',
      es: 'Hallazgos de entrevistas de PawMate: preguntas realizadas y citas clave, ilustrados con un perro.',
    }),
    pm(11, {
      en: 'Key needs and opportunities for PawMate — centralized information, trust, donation tracking, curated shelter profiles — and a short conclusion.',
      es: 'Necesidades y oportunidades clave de PawMate — información centralizada, confianza, seguimiento de donaciones, perfiles de refugios — y una breve conclusión.',
    }),
    pm(12, {
      en: 'Low-fidelity wireframes of the main PawMate mobile screens.',
      es: 'Wireframes de baja fidelidad de las pantallas principales de PawMate.',
    }),
    pm(13, {
      en: 'Medium-fidelity PawMate screens showing structure, hierarchy and core task flows.',
      es: 'Pantallas de media fidelidad de PawMate, con estructura, jerarquía y flujos principales.',
    }),
    pm(14, {
      en: 'High-fidelity PawMate interface screens of the adoption experience, with photography and the final visual system.',
      es: 'Pantallas de alta fidelidad de PawMate con la experiencia de adopción, fotografía y el sistema visual final.',
    }),
  ],
  maze: [
    mz(1, {
      en: 'Test scenario: participants imagine attending an innovation event and vote for who should give the opening talk, choosing from a row of speaker portraits.',
      es: 'Escenario de la prueba: las personas participantes imaginan un evento de innovación y votan quién dará la charla inicial, eligiendo entre retratos de oradores.',
    }),
    mz(2, {
      en: 'Key Maze metrics: 100% success rate, 0% drop-off, 83.3 seconds average completion time, 22% misclick rate, from 9 responses.',
      es: 'Métricas clave de Maze: 100% de éxito, 0% de abandono, 83,3 segundos de tiempo promedio, 22% de clics erróneos, a partir de 9 respuestas.',
    }),
    mz(3, {
      en: 'Summary of key findings: missing visual feedback after voting, unintuitive buttons (22% misclicks), and insufficient information about speakers.',
      es: 'Resumen de hallazgos: falta de feedback visual después del voto, botones poco intuitivos (22% de clics erróneos) e información insuficiente sobre los oradores.',
    }),
    mz(4, {
      en: 'Finding 1, with participant comments: the flow is completable, but 22% misclicks and doubts about whether a vote was registered point to weak confirmation feedback.',
      es: 'Hallazgo 1, con comentarios de participantes: el flujo se puede completar, pero un 22% de clics erróneos y dudas sobre si el voto quedó registrado señalan un feedback de confirmación débil.',
    }),
    mz(5, {
      en: 'Finding 2: analysis of unintuitive controls on the speaker-selection screen, with a recommended design direction.',
      es: 'Hallazgo 2: análisis de controles poco intuitivos en la pantalla de elección de orador, con una dirección de diseño recomendada.',
    }),
    mz(6, {
      en: 'Finding 3: limited information about speakers left some participants wanting more context before voting.',
      es: 'Hallazgo 3: la información limitada sobre los oradores hizo que algunas personas pidieran más contexto antes de votar.',
    }),
    mz(7, {
      en: 'Finding 4: ease-of-choice ratings averaged 3.6 out of 5 across 9 responses, with a recommendation to refine visual consistency.',
      es: 'Hallazgo 4: la facilidad para elegir orador promedió 3,6 sobre 5 en 9 respuestas, con la recomendación de afinar la consistencia visual.',
    }),
    mz(8, {
      en: 'Improvement proposal: a confirmation pop-up before the vote is submitted, and a success screen that says the vote was registered.',
      es: 'Propuesta de mejora: un pop-up de confirmación antes de enviar el voto, y una pantalla de éxito que indica que el voto quedó registrado.',
    }),
    mz(9, {
      en: 'Learnings and conclusions: the product was functionally solid, but visual clarity and feedback were the critical areas to improve.',
      es: 'Aprendizajes y conclusiones: el producto era sólido en lo funcional, pero la claridad visual y el feedback eran las áreas críticas de mejora.',
    }),
  ],
  'public-services': [
    {
      id: 'public-01',
      width: 3224,
      height: 1528,
      variants: {
        '640': 'projects/public-services/01-640.webp',
        '960': 'projects/public-services/01-960.webp',
        '1440': 'projects/public-services/01-1440.webp',
        '1920': 'projects/public-services/01-1920.webp',
        '3224': 'projects/public-services/01-3224.webp',
      },
      alt: {
        en: 'Atomic Design breakdown of the public-services interface: atoms (icons, type, buttons), molecules (cards, dropdowns, time slots) and organisms (time-grid and service selector).',
        es: 'Desglose de Atomic Design de la interfaz de servicios públicos: átomos (iconos, tipografía, botones), moléculas (tarjetas, desplegables, franjas horarias) y organismos (grilla de horarios y selector de trámite).',
      },
    },
    {
      id: 'public-02',
      width: 2412,
      height: 1352,
      variants: {
        '640': 'projects/public-services/02-640.webp',
        '960': 'projects/public-services/02-960.webp',
        '1440': 'projects/public-services/02-1440.webp',
        '1920': 'projects/public-services/02-1920.webp',
        '2412': 'projects/public-services/02-2412.webp',
      },
      alt: {
        en: 'Final public-services booking screens assembled from the design system: service selection, appointment scheduling and a confirmation state.',
        es: 'Pantallas finales del agendamiento de servicios públicos, armadas con el sistema de diseño: selección de trámite, reserva de turno y estado de confirmación.',
      },
    },
  ],
}

export const covers: Record<ProjectId, Img> = {
  pawmate: projectImages.pawmate[0],
  maze: projectImages.maze[0],
  'public-services': projectImages['public-services'][1],
}
