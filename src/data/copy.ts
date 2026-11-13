import type { Lang, ProjectId } from './site'

export const projectOrder: ProjectId[] = ['pawmate', 'maze', 'public-services']

export const nextOf: Record<ProjectId, ProjectId> = {
  pawmate: 'maze',
  maze: 'public-services',
  'public-services': 'pawmate',
}

type QA = { q: string; a: string }
type Step = { title: string; desc: string }
type Card = { title: string; desc: string }

export type ProjectCopy = {
  title: string
  subtitle: string
  kicker: string
  cardCategory: string
  cardDescription: string
  heroDescription: string
  roleLabel: string
  role: string
  timelineLabel: string
  timeline: string
  toolsLabel: string
  tools: string
  focusLabel?: string
  focus?: string
  challengeTitle: string
  challengeIntro: string
  challengeQs: QA[]
  challengeNeeds?: string[]
  challengeIssues?: { title: string; items: string[] }
  processTitle: string
  processIntro: string
  processSteps: Step[]
  solutionTitle?: string
  solutionBody?: string
  quote?: string
  quoteNote?: string
  impactTitle: string
  impactIntro: string
  impactCards?: Card[]
  outcomeTitle?: string
  learnedQ?: string
  learned?: string
  improvedQ?: string
  improved?: string[]
  nextQ?: string
  whatsNextTitle: string
  whatsNext: string[]
  metricsTitle?: string
  metricsIntro?: string
  findingsTitle?: string
  findingsIntro?: string
  findings?: { title: string; desc: string; impact?: string }[]
  recsTitle?: string
  recsIntro?: string
  recs?: string[]
  learningsTitle?: string
  keyLearningsTitle?: string
  keyLearnings?: string[]
  resultsTitle?: string
  resultsIntro?: string
  stats?: { value: string; label: string }[]
  libraryTitle?: string
  libraryIntro?: string
  togetherTitle?: string
  togetherIntro?: string
  figmaLabel?: string
  handwritten?: string
}

export type UICopy = {
  skip: string
  logoAria: string
  navProjects: string
  navAbout: string
  navContact: string
  navOpen: string
  navClose: string
  navPrimary: string
  tagline: string
  themeToLight: string
  themeToDark: string
  langToEs: string
  langToEn: string
  langName: string
  role: string
  heroTitle1: string
  heroTitle2: string
  heroLead: string
  viewProjects: string
  peopleIdeasImpact: string
  heroSide: string
  based: string
  openTo: string
  scribble: string
  sticky1: string
  sticky2: string
  seal: string
  heroAlt: string
  plantAlt: string
  workspaceAlt: string
  featuredKicker: string
  featuredTitle: string
  featuredIntro: string
  featuredProject: string
  viewCase: string
  aboutTitle: string
  aboutBody: string
  interestsTitle: string
  interests: string[]
  quote: string
  contactTitle: string
  contactBody: string
  emailMe: string
  linkedin: string
  instagram: string
  behance: string
  signoff: string
  copyright: string
  footerRole: string
  backToTop: string
  backToProjects: string
  nextProject: string
  myRole: string
  timeline: string
  tools: string
  focus: string
  carouselLabel: string
  prevSlide: string
  nextSlide: string
  goToSlide: string
  slideOf: string
  openLightbox: string
  closeLightbox: string
  zoomIn: string
  zoomOut: string
  zoomHint: string
  pageNotFound: string
  backHome: string
}

export const ui: Record<Lang, UICopy> = {
  en: {
    skip: 'Skip to content',
    logoAria: 'Melisa Pardo — home',
    navProjects: 'Projects',
    navAbout: 'About',
    navContact: 'Contact',
    navOpen: 'Open menu',
    navClose: 'Close menu',
    navPrimary: 'Primary',
    tagline: 'Designing a more\ninclusive tomorrow',
    themeToLight: 'Switch to light mode',
    themeToDark: 'Switch to dark mode',
    langToEs: 'Cambiar el sitio a español',
    langToEn: 'Switch the site to English',
    langName: 'EN',
    role: 'UX/UI Designer',
    heroTitle1: 'Hi, I’m',
    heroTitle2: 'Melisa',
    heroLead:
      'I design inclusive, meaningful and human-centered digital experiences that create a positive impact.',
    viewProjects: 'View projects',
    peopleIdeasImpact: 'People\nIdeas\nImpact',
    heroSide: 'Design is a tool to create a kinder, more inclusive and brighter world.',
    based: 'Based anywhere',
    openTo: 'Open to opportunities',
    scribble: 'Good\ndesign,\nbrighter\npeople ♡',
    sticky1: 'Same passion.\nA brighter\ntomorrow ♡.',
    sticky2: 'Design\nPeople\nPurpose ♡',
    seal: 'DESIGN FOR A MORE INCLUSIVE WORLD • DESIGN FOR A MORE INCLUSIVE WORLD • ',
    heroAlt: 'Black and white portrait of Melisa smiling, resting her chin on her hand',
    plantAlt: 'Monstera plant in black and white',
    workspaceAlt: "Black and white photo of Melisa's workspace, with plants and posters",
    featuredKicker: '02',
    featuredTitle: 'Featured\nProjects',
    featuredIntro:
      'A selection of projects where design meets real people, real needs and real impact.',
    featuredProject: 'Featured project',
    viewCase: 'View case study',
    aboutTitle: 'About Me',
    aboutBody:
      'I’m a UX/UI Designer with a background in graphic design, passionate about creating meaningful experiences through research, design systems and visual storytelling. I’m especially interested in projects with a social impact and in making digital spaces more accessible for everyone.',
    interestsTitle: 'Areas of Interest',
    interests: [
      'Accessibility',
      'Design Systems',
      'Visual Storytelling',
      'Social Impact',
      'Product Design',
    ],
    quote: 'A more inclusive internet is a kinder internet.',
    contactTitle: 'Let’s connect',
    contactBody: 'I’d love to hear about your ideas, projects or opportunities.',
    emailMe: 'Email me',
    linkedin: 'LinkedIn',
    instagram: 'Instagram',
    behance: 'Behance',
    signoff: 'Good\ndesign,\nbrighter\ntomorrow',
    copyright: '© 2026 Melisa Pardo',
    footerRole: 'UX/UI Designer',
    backToTop: 'Back to top ↑',
    backToProjects: 'Back to all projects',
    nextProject: 'Next project',
    myRole: 'My role',
    timeline: 'Timeline',
    tools: 'Tools',
    focus: 'Focus',
    carouselLabel: 'Project screens',
    prevSlide: 'Previous image',
    nextSlide: 'Next image',
    goToSlide: 'Go to image {n}',
    slideOf: 'Image {n} of {total}',
    openLightbox: 'Enlarge image',
    closeLightbox: 'Close',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    zoomHint: 'Scroll or pinch to zoom · drag to pan · Esc to close',
    pageNotFound: 'This project could not be found.',
    backHome: 'Back to home',
  },
  es: {
    skip: 'Ir al contenido',
    logoAria: 'Melisa Pardo — inicio',
    navProjects: 'Proyectos',
    navAbout: 'Sobre mí',
    navContact: 'Contacto',
    navOpen: 'Abrir menú',
    navClose: 'Cerrar menú',
    navPrimary: 'Principal',
    tagline: 'Diseñando un mañana\nmás inclusivo',
    themeToLight: 'Cambiar a modo claro',
    themeToDark: 'Cambiar a modo oscuro',
    langToEs: 'Cambiar el sitio a español',
    langToEn: 'Switch the site to English',
    langName: 'ES',
    role: 'Diseñadora UX/UI',
    heroTitle1: 'Hola, soy',
    heroTitle2: 'Melisa',
    heroLead:
      'Diseño experiencias digitales inclusivas, significativas y centradas en las personas, con un impacto positivo.',
    viewProjects: 'Ver proyectos',
    peopleIdeasImpact: 'Personas\nIdeas\nImpacto',
    heroSide: 'El diseño es una herramienta para crear un mundo más amable, inclusivo y brillante.',
    based: 'Desde cualquier lugar',
    openTo: 'Abierta a oportunidades',
    scribble: 'Buen\ndiseño,\npersonas\nmás brillantes ♡',
    sticky1: 'La misma pasión.\nUn mañana más\nbrillante ♡.',
    sticky2: 'Diseño\nPersonas\nPropósito ♡',
    seal: 'DISEÑAR PARA UN MUNDO MÁS INCLUSIVO • DISEÑAR PARA UN MUNDO MÁS INCLUSIVO • ',
    heroAlt: 'Retrato en blanco y negro de Melisa sonriendo, con el mentón apoyado en la mano',
    plantAlt: 'Planta monstera en blanco y negro',
    workspaceAlt: 'Foto en blanco y negro del espacio de trabajo de Melisa, con plantas y láminas',
    featuredKicker: '02',
    featuredTitle: 'Proyectos\ndestacados',
    featuredIntro:
      'Una selección de proyectos en los que el diseño se encuentra con personas, necesidades e impacto reales.',
    featuredProject: 'Proyecto destacado',
    viewCase: 'Ver caso de estudio',
    aboutTitle: 'Sobre mí',
    aboutBody:
      'Soy diseñadora UX/UI con formación en diseño gráfico, y me apasiona crear experiencias significativas a través de la investigación, los sistemas de diseño y la narración visual. Me interesan especialmente los proyectos con impacto social y lograr que los espacios digitales sean más accesibles para todas las personas.',
    interestsTitle: 'Áreas de interés',
    interests: [
      'Accesibilidad',
      'Sistemas de diseño',
      'Narración visual',
      'Impacto social',
      'Diseño de producto',
    ],
    quote: 'Un internet más inclusivo es un internet más amable.',
    contactTitle: 'Conversemos',
    contactBody: 'Me encantaría conocer tus ideas, proyectos u oportunidades.',
    emailMe: 'Escríbeme',
    linkedin: 'LinkedIn',
    instagram: 'Instagram',
    behance: 'Behance',
    signoff: 'Buen\ndiseño,\nmañana más\nbrillante',
    copyright: '© 2026 Melisa Pardo',
    footerRole: 'Diseñadora UX/UI',
    backToTop: 'Volver arriba ↑',
    backToProjects: 'Volver a todos los proyectos',
    nextProject: 'Siguiente proyecto',
    myRole: 'Mi rol',
    timeline: 'Tiempo',
    tools: 'Herramientas',
    focus: 'Enfoque',
    carouselLabel: 'Pantallas del proyecto',
    prevSlide: 'Imagen anterior',
    nextSlide: 'Imagen siguiente',
    goToSlide: 'Ir a la imagen {n}',
    slideOf: 'Imagen {n} de {total}',
    openLightbox: 'Ampliar imagen',
    closeLightbox: 'Cerrar',
    zoomIn: 'Acercar',
    zoomOut: 'Alejar',
    zoomHint: 'Rueda o pellizco para zoom · arrastra para mover · Esc para cerrar',
    pageNotFound: 'No se encontró este proyecto.',
    backHome: 'Volver al inicio',
  },
}

export const projects: Record<ProjectId, Record<Lang, ProjectCopy>> = {
  pawmate: {
    en: {
      title: 'PawMate',
      subtitle: 'Pet Care & Adoption App',
      kicker: 'Featured project',
      cardCategory: 'UX/UI Design · Social Impact',
      cardDescription:
        'A mobile app to help pet owners care, connect and make a difference.',
      heroDescription:
        'A mobile app designed to help pet owners manage their pets’ well-being while promoting responsible adoption.',
      roleLabel: 'My role',
      role: 'UX/UI Designer',
      timelineLabel: 'Timeline',
      timeline: 'Sprints 2–11',
      toolsLabel: 'Tools',
      tools: 'Figma, FigJam, Maze',
      challengeTitle: 'The Challenge',
      challengeIntro:
        'Pet owners often struggle to keep track of veterinary appointments, vaccinations and care routines across multiple tools, making it difficult to provide consistent and informed care — and to find a responsible path to adoption.',
      challengeQs: [
        {
          q: 'What problem existed?',
          a: 'Pet owners often struggle to keep track of veterinary appointments, vaccination schedules, pet care routines, and adoption-related information in a single place. Existing solutions are frequently fragmented, making it difficult to manage a pet’s wellbeing efficiently.',
        },
        {
          q: 'Why did it matter?',
          a: 'Missed appointments, incomplete health records, and scattered information can negatively impact pet care. The project aimed to create a more organized and accessible experience for pet owners while promoting responsible pet ownership.',
        },
        {
          q: 'What did users need?',
          a: 'Users needed a simple and intuitive platform that would help them:',
        },
      ],
      challengeNeeds: [
        'Manage pet profiles and health records.',
        'Track appointments and vaccinations.',
        'Access adoption and care information.',
        'Navigate essential pet-related tasks in a clear and stress-free way.',
      ],
      processTitle: 'The Process',
      processIntro:
        'From research to testing, I followed a user-centered process to design a simple and meaningful experience.',
      processSteps: [
        { title: 'Research', desc: 'Interviews and insights into owners’ and adopters’ needs.' },
        { title: 'Personas', desc: 'Two primary personas grounded in the research.' },
        { title: 'Journey Map', desc: 'The adoption and care journey, end to end.' },
        { title: 'Sitemap', desc: 'A clear information architecture for every task.' },
        { title: 'Wireframes', desc: 'Low- and mid-fidelity structure before visual design.' },
        { title: 'UI Design', desc: 'A warm, trustworthy visual system and high-fidelity screens.' },
        { title: 'Prototyping', desc: 'Interactive flows for care, records and adoption.' },
        { title: 'Testing', desc: 'Validation to refine navigation and task clarity.' },
      ],
      solutionTitle: 'The Solution',
      solutionBody:
        'A clean, intuitive and friendly interface that helps users manage their pets’ well-being and access adoption resources — all in one place.',
      quote:
        'A more organized and compassionate way to care for the ones who always care for us.',
      impactTitle: 'The Impact',
      impactIntro:
        'The result is a user-centered solution that makes pet care more accessible, organized and meaningful. PawMate became a complete end-to-end UX/UI project that demonstrated the full product design process, from research and strategy to interface design, prototyping, and validation.',
      impactCards: [
        { title: 'Clearer navigation', desc: 'Easier access to key tasks.' },
        { title: 'Better organization', desc: 'All pet information in one place.' },
        { title: 'Reusable components', desc: 'Greater consistency across every screen.' },
      ],
      learnedQ: 'What did I learn?',
      learned:
        'A successful pet care experience depends as much on information clarity and task prioritization as it does on visual design.',
      improvedQ: 'What improved?',
      improved: [
        'Clearer navigation structure.',
        'More intuitive task flows.',
        'Better organization of pet information.',
        'Increased consistency across screens through reusable components.',
      ],
      nextQ: 'What would I validate next?',
      whatsNextTitle: 'What’s next?',
      whatsNext: [
        'Long-term engagement and retention.',
        'Feature prioritization based on user behavior.',
        'Accessibility improvements and edge-case scenarios.',
      ],
      figmaLabel: 'View the full prototype on Figma',
      handwritten: 'Happier\npets,\nbrighter\ntomorrows',
    },
    es: {
      title: 'PawMate',
      subtitle: 'App de cuidado y adopción de mascotas',
      kicker: 'Proyecto destacado',
      cardCategory: 'Diseño UX/UI · Impacto social',
      cardDescription:
        'Una app móvil para que quienes cuidan mascotas puedan cuidar, conectar y marcar la diferencia.',
      heroDescription:
        'Una app móvil pensada para ayudar a las personas a gestionar el bienestar de sus mascotas y, al mismo tiempo, promover una adopción responsable.',
      roleLabel: 'Mi rol',
      role: 'Diseñadora UX/UI',
      timelineLabel: 'Tiempo',
      timeline: 'Sprints 2–11',
      toolsLabel: 'Herramientas',
      tools: 'Figma, FigJam, Maze',
      challengeTitle: 'El desafío',
      challengeIntro:
        'Quienes cuidan mascotas suelen tener que seguir turnos veterinarios, vacunas y rutinas de cuidado en varias herramientas, lo que dificulta un cuidado informado y constante — y un camino responsable hacia la adopción.',
      challengeQs: [
        {
          q: '¿Qué problema existía?',
          a: 'Con frecuencia es difícil llevar en un solo lugar los turnos veterinarios, los calendarios de vacunación, las rutinas de cuidado y la información de adopción. Las soluciones existentes suelen estar fragmentadas, y eso complica gestionar el bienestar de la mascota con eficiencia.',
        },
        {
          q: '¿Por qué era importante?',
          a: 'Los turnos perdidos, las historias clínicas incompletas y la información dispersa pueden afectar el cuidado. El proyecto buscó una experiencia más organizada y accesible, y promover una tenencia responsable.',
        },
        {
          q: '¿Qué necesitaban las personas?',
          a: 'Necesitaban una plataforma simple e intuitiva que les permitiera:',
        },
      ],
      challengeNeeds: [
        'Gestionar perfiles e historias de salud.',
        'Seguir turnos y vacunaciones.',
        'Acceder a información de adopción y de cuidado.',
        'Recorrer las tareas esenciales con claridad y sin estrés.',
      ],
      processTitle: 'El proceso',
      processIntro:
        'De la investigación a las pruebas, seguí un proceso centrado en las personas para diseñar una experiencia simple y significativa.',
      processSteps: [
        { title: 'Investigación', desc: 'Entrevistas y hallazgos sobre las necesidades de quienes cuidan y adoptan.' },
        { title: 'Personas', desc: 'Dos personas principales, ancladas en la investigación.' },
        { title: 'Mapa de viaje', desc: 'El recorrido de adopción y cuidado, de punta a punta.' },
        { title: 'Arquitectura', desc: 'Una arquitectura de información clara para cada tarea.' },
        { title: 'Wireframes', desc: 'Estructura en baja y media fidelidad, antes del diseño visual.' },
        { title: 'Diseño UI', desc: 'Un sistema visual cálido y confiable, y pantallas de alta fidelidad.' },
        { title: 'Prototipo', desc: 'Flujos interactivos de cuidado, registros y adopción.' },
        { title: 'Pruebas', desc: 'Validación para afinar la navegación y la claridad de las tareas.' },
      ],
      solutionTitle: 'La solución',
      solutionBody:
        'Una interfaz limpia, intuitiva y cercana que ayuda a gestionar el bienestar de las mascotas y a acceder a recursos de adopción, todo en un solo lugar.',
      quote:
        'Una forma más organizada y compasiva de cuidar a quienes siempre cuidan de nosotros.',
      impactTitle: 'El impacto',
      impactIntro:
        'El resultado es una solución centrada en las personas que hace el cuidado más accesible, organizado y significativo. PawMate se convirtió en un proyecto UX/UI de punta a punta, que recorrió todo el proceso de diseño de producto: de la investigación y la estrategia al diseño de interfaz, el prototipado y la validación.',
      impactCards: [
        { title: 'Navegación más clara', desc: 'Un acceso más fácil a las tareas clave.' },
        { title: 'Mejor organización', desc: 'Toda la información de la mascota en un solo lugar.' },
        { title: 'Componentes reutilizables', desc: 'Más consistencia en todas las pantallas.' },
      ],
      learnedQ: '¿Qué aprendí?',
      learned:
        'Una buena experiencia de cuidado depende tanto de la claridad de la información y de priorizar las tareas como del diseño visual.',
      improvedQ: '¿Qué mejoró?',
      improved: [
        'Una estructura de navegación más clara.',
        'Flujos de tarea más intuitivos.',
        'Mejor organización de la información.',
        'Mayor consistencia entre pantallas, gracias a componentes reutilizables.',
      ],
      nextQ: '¿Qué validaría a continuación?',
      whatsNextTitle: '¿Qué sigue?',
      whatsNext: [
        'El compromiso y la retención a largo plazo.',
        'La priorización de funciones a partir del comportamiento real.',
        'Mejoras de accesibilidad y casos límite.',
      ],
      figmaLabel: 'Ver el prototipo completo en Figma',
      handwritten: 'Mascotas\nmás felices,\nmañanas más\nbrillantes',
    },
  },
  maze: {
    en: {
      title: 'Maze Usability Testing',
      subtitle: 'Evidence-Based UX Validation',
      kicker: 'Case study',
      cardCategory: 'UX Research · Usability',
      cardDescription: 'Validating design decisions with real users.',
      heroDescription:
        'A usability test to evaluate the experience, identify friction and turn insights into meaningful improvements — on a prototype where people vote for the opening speaker at an innovation event.',
      roleLabel: 'My role',
      role: 'UX/UI Designer',
      timelineLabel: 'Timeline',
      timeline: 'Sprint 11',
      toolsLabel: 'Tools',
      tools: 'Maze, Figma',
      focusLabel: 'Focus',
      focus: 'Usability testing, data analysis',
      challengeTitle: 'The Challenge',
      challengeIntro:
        'The design was complete, but we needed to validate whether people could finish the key tasks without friction. Design assumptions can lead to usability issues, so it was important to test with real users and base decisions on evidence.',
      challengeQs: [
        {
          q: 'What problem existed?',
          a: 'While the interface design had already been completed, there was no evidence confirming whether users could successfully complete key tasks without friction.',
        },
        {
          q: 'Why did it matter?',
          a: 'Design assumptions can lead to usability issues if they are not validated with real users. The team needed objective data to identify opportunities for improvement.',
        },
        {
          q: 'What did users need?',
          a: 'Users needed to complete critical workflows efficiently, confidently, and without confusion.',
        },
      ],
      processTitle: 'The Process',
      processIntro:
        'I planned and conducted a moderated usability test through Maze, analyzing quantitative and qualitative data to identify opportunities for improvement.',
      processSteps: [
        { title: 'Test setup', desc: 'Defined objectives and the most critical user tasks.' },
        { title: 'Participants', desc: 'People from the target audience: attendees of innovation events.' },
        { title: 'Testing in Maze', desc: 'An interactive prototype and a clear task scenario.' },
        { title: 'Analysis', desc: 'Success rate, time, misclicks, drop-off, and qualitative feedback.' },
        { title: 'Recommendations', desc: 'Insights turned into actionable improvements, prioritized by impact.' },
      ],
      impactTitle: 'Impact',
      impactIntro:
        'The study transformed design assumptions into evidence-based decisions and demonstrated the importance of validating designs before development.',
      metricsTitle: 'Key Metrics',
      metricsIntro: 'Quantitative results from the Maze usability test, with 9 responses.',
      findingsTitle: 'Key Findings',
      findingsIntro: 'Main insights from user behavior and feedback.',
      findings: [
        {
          title: 'Limited visual feedback',
          desc: 'Everyone completed the vote, but comments such as “I’m not sure I picked the speaker I wanted” showed people doubted whether their vote had been registered.',
          impact: 'High',
        },
        {
          title: 'Unintuitive controls',
          desc: 'A 22% misclick rate pointed to buttons and interaction targets that were not as clear as they needed to be.',
          impact: 'High',
        },
        {
          title: 'Missing information',
          desc: 'Some participants looked for more context about the speakers before deciding.',
          impact: 'Medium',
        },
      ],
      recsTitle: 'Recommendations',
      recsIntro: 'Based on the findings, I proposed the following improvements.',
      recs: [
        'Add immediate visual confirmation after voting — a message or animation that the vote was recorded.',
        'A confirmation pop-up before submitting, to prevent accidental votes and allow people to go back.',
        'A success state (“Vote registered successfully”) to close the task with a clear sense of control.',
        'Micro-adjustments to visual consistency — alignment, spacing and type — without changing the existing flow.',
      ],
      learningsTitle: 'Learnings & Next Steps',
      keyLearningsTitle: 'Key learnings',
      keyLearnings: [
        'User behavior often reveals friction points that are not visible during the design phase.',
        'The product was functionally solid; visual clarity and feedback were the critical areas to improve.',
        'Small interface changes can significantly improve confidence and reduce mental load.',
      ],
      learned:
        'User behavior often reveals friction points that are not visible during the design phase.',
      improvedQ: 'What improved?',
      improved: [
        'A clearer picture of friction in key interactions.',
        'Concrete, prioritized recommendations for the primary flow.',
        'Better alignment between what people expected and how the interface behaved.',
      ],
      nextQ: 'What would I validate next?',
      whatsNextTitle: 'Next steps',
      whatsNext: [
        'Whether the proposed changes reduce hesitation and misclicks.',
        'Whether revised flows reduce cognitive load.',
        'User satisfaction after the improvements are implemented.',
      ],
      quote: 'Testing with real users turned assumptions into actionable insights.',
      handwritten: 'Real users.\nReal insights.\nA better product.',
      figmaLabel: 'View full report',
    },
    es: {
      title: 'Pruebas de usabilidad con Maze',
      subtitle: 'Validación UX basada en evidencia',
      kicker: 'Caso de estudio',
      cardCategory: 'Investigación UX · Usabilidad',
      cardDescription: 'Validar decisiones de diseño con personas reales.',
      heroDescription:
        'Una prueba de usabilidad para evaluar la experiencia, detectar fricciones y convertir los hallazgos en mejoras concretas — sobre un prototipo en el que se vota quién dará la charla inicial de un evento de innovación.',
      roleLabel: 'Mi rol',
      role: 'Diseñadora UX/UI',
      timelineLabel: 'Tiempo',
      timeline: 'Sprint 11',
      toolsLabel: 'Herramientas',
      tools: 'Maze, Figma',
      focusLabel: 'Enfoque',
      focus: 'Pruebas de usabilidad, análisis de datos',
      challengeTitle: 'El desafío',
      challengeIntro:
        'El diseño ya estaba listo, pero hacía falta validar si las personas podían completar las tareas clave sin fricción. Las suposiciones de diseño pueden generar problemas de usabilidad, así que era importante probar con usuarios reales y decidir con evidencia.',
      challengeQs: [
        {
          q: '¿Qué problema existía?',
          a: 'Aunque la interfaz ya estaba diseñada, no había evidencia de que las personas pudieran completar las tareas clave sin fricción.',
        },
        {
          q: '¿Por qué era importante?',
          a: 'Las suposiciones de diseño pueden traducirse en problemas de usabilidad si no se validan. El equipo necesitaba datos objetivos para detectar oportunidades de mejora.',
        },
        {
          q: '¿Qué necesitaban las personas?',
          a: 'Completar los flujos críticos con eficiencia, confianza y sin confusión.',
        },
      ],
      processTitle: 'El proceso',
      processIntro:
        'Planifiqué y realicé una prueba de usabilidad a través de Maze, y analicé datos cuantitativos y cualitativos para identificar oportunidades de mejora.',
      processSteps: [
        { title: 'Preparación', desc: 'Definí los objetivos y las tareas de usuario más críticas.' },
        { title: 'Participantes', desc: 'Personas del público objetivo: asistentes a eventos de innovación.' },
        { title: 'Prueba en Maze', desc: 'Un prototipo interactivo y un escenario de tarea claro.' },
        { title: 'Análisis', desc: 'Tasa de éxito, tiempo, clics erróneos, abandono y comentarios cualitativos.' },
        { title: 'Recomendaciones', desc: 'Hallazgos convertidos en mejoras accionables, priorizadas por impacto.' },
      ],
      impactTitle: 'Impacto',
      impactIntro:
        'El estudio convirtió suposiciones de diseño en decisiones basadas en evidencia, y mostró por qué conviene validar antes de desarrollar.',
      metricsTitle: 'Métricas clave',
      metricsIntro: 'Resultados cuantitativos de la prueba en Maze, a partir de 9 respuestas.',
      findingsTitle: 'Hallazgos clave',
      findingsIntro: 'Principales insights del comportamiento y de los comentarios.',
      findings: [
        {
          title: 'Poco feedback visual',
          desc: 'Todas las personas completaron el voto, pero comentarios como “no estoy segura de haber elegido al orador que quería” muestran que dudaban de si el voto había quedado registrado.',
          impact: 'Alto',
        },
        {
          title: 'Controles poco intuitivos',
          desc: 'Una tasa de clics erróneos del 22% señaló botones y zonas de interacción que no eran tan claros como debían.',
          impact: 'Alto',
        },
        {
          title: 'Información insuficiente',
          desc: 'Algunas personas buscaron más contexto sobre los oradores antes de decidir.',
          impact: 'Medio',
        },
      ],
      recsTitle: 'Recomendaciones',
      recsIntro: 'A partir de los hallazgos, propuse estas mejoras.',
      recs: [
        'Sumar confirmación visual inmediata después de votar: un mensaje o una animación de que el voto quedó registrado.',
        'Un pop-up de confirmación antes de enviar, para evitar votos accidentales y permitir volver atrás.',
        'Un estado de éxito (“Voto registrado con éxito”) que cierre la tarea con una sensación clara de control.',
        'Microajustes de consistencia visual — alineación, espaciado y tipografía — sin alterar el flujo existente.',
      ],
      learningsTitle: 'Aprendizajes y próximos pasos',
      keyLearningsTitle: 'Aprendizajes clave',
      keyLearnings: [
        'El comportamiento de las personas suele revelar fricciones que no se ven en la etapa de diseño.',
        'El producto era sólido en lo funcional; la claridad visual y el feedback eran las áreas críticas de mejora.',
        'Pequeños cambios de interfaz pueden aumentar mucho la confianza y reducir la carga mental.',
      ],
      learned:
        'El comportamiento de las personas suele revelar fricciones que no se ven en la etapa de diseño.',
      improvedQ: '¿Qué mejoró?',
      improved: [
        'Una visión más clara de la fricción en las interacciones clave.',
        'Recomendaciones concretas y priorizadas para el flujo principal.',
        'Mejor alineación entre lo que las personas esperaban y cómo se comportaba la interfaz.',
      ],
      nextQ: '¿Qué validaría a continuación?',
      whatsNextTitle: 'Próximos pasos',
      whatsNext: [
        'Si los cambios propuestos reducen la duda y los clics erróneos.',
        'Si los flujos revisados disminuyen la carga cognitiva.',
        'La satisfacción de las personas después de implementar las mejoras.',
      ],
      quote: 'Probar con personas reales convirtió las suposiciones en insights accionables.',
      handwritten: 'Personas reales.\nInsights reales.\nUn mejor producto.',
      figmaLabel: 'Ver el informe completo',
    },
  },
  'public-services': {
    en: {
      title: 'Public Services Design System',
      subtitle: 'Atomic Design & Component Architecture',
      kicker: 'Case study',
      cardCategory: 'Design Systems · UX/UI',
      cardDescription:
        'A scalable component system for a better experience in public-service booking.',
      heroDescription:
        'A scalable component system for a clearer, more consistent experience when people schedule public-service appointments.',
      roleLabel: 'My role',
      role: 'UX/UI Designer',
      timelineLabel: 'Timeline',
      timeline: 'Sprint 8',
      toolsLabel: 'Tools',
      tools: 'Figma',
      focusLabel: 'Focus',
      focus: 'Design systems, Atomic Design',
      challengeTitle: 'The Challenge',
      challengeIntro:
        'The existing interface lacked consistency, making it difficult to maintain and scale. Components were duplicated, styles were inconsistent, and there was no clear structure — which affected both the user experience and the design process.',
      challengeQs: [
        {
          q: 'What problem existed?',
          a: 'The interface needed a scalable structure that could support multiple screens, states, and interactions while maintaining consistency.',
        },
        {
          q: 'Why did it matter?',
          a: 'Without a reusable component system, design files become difficult to maintain, update, and scale.',
        },
        {
          q: 'What did users need?',
          a: 'Users needed a clear, accessible, and consistent booking experience when scheduling public service appointments.',
        },
      ],
      challengeIssues: {
        title: 'Common issues',
        items: ['Duplicated components', 'Inconsistent styles', 'Difficult maintenance'],
      },
      processTitle: 'The Process',
      processIntro:
        'I applied Atomic Design principles to create a structured and scalable component system.',
      processSteps: [
        { title: 'Interface analysis', desc: 'Reviewed the provided interface and decomposed it into reusable building blocks.' },
        { title: 'Atoms', desc: 'Basic elements: icons, labels, inputs and buttons.' },
        { title: 'Molecules', desc: 'Combinations of those elements into small, reusable groups.' },
        { title: 'Organisms', desc: 'Functional sections assembled from molecules.' },
        { title: 'Templates & screens', desc: 'The real interface, rebuilt exclusively from component instances.' },
        { title: 'Organization', desc: 'Naming conventions, hierarchy, variants and usage guidelines.' },
      ],
      libraryTitle: 'Component library',
      libraryIntro: 'A set of reusable, flexible and accessible components — captured in the project’s Atomic Design board.',
      togetherTitle: 'Putting it all together',
      togetherIntro: 'Components in action: the final screens were built entirely with the design system.',
      resultsTitle: 'Results & Impact',
      resultsIntro: 'A solid foundation for a consistent and scalable product.',
      stats: [
        { value: '12', label: 'Components' },
        { value: '32', label: 'Variants' },
        { value: '3', label: 'Screen states' },
        { value: '100%', label: 'Built with instances' },
      ],
      impactTitle: 'Impact',
      impactIntro:
        'The project established a foundational design system and demonstrated the ability to think beyond individual screens by designing scalable, reusable UI solutions.',
      learnedQ: 'What I learned',
      learned:
        'A well-structured design system accelerates design decisions and improves collaboration between designers and developers.',
      keyLearningsTitle: 'What I learned',
      keyLearnings: [
        'Designing systems requires a more strategic and long-term mindset.',
        'Consistency improves scalability and collaboration.',
        'Documentation is as important as visual design.',
        'A well-structured system makes the design process faster and more efficient.',
      ],
      improvedQ: 'What improved?',
      improved: [
        'Consistency across the interface.',
        'Faster screen creation.',
        'Better scalability and maintainability.',
        'Reduced duplication of design elements.',
      ],
      nextQ: 'What would I validate next?',
      whatsNextTitle: 'What’s next?',
      whatsNext: [
        'Accessibility compliance.',
        'Additional component states and edge cases.',
        'Expansion to more complex user flows.',
      ],
      handwritten: 'Interfaces\nthat work\nfor everyone',
      figmaLabel: 'Explore the full component library on Figma',
    },
    es: {
      title: 'Sistema de diseño de servicios públicos',
      subtitle: 'Atomic Design y arquitectura de componentes',
      kicker: 'Caso de estudio',
      cardCategory: 'Sistemas de diseño · UX/UI',
      cardDescription:
        'Un sistema de componentes escalable para una mejor experiencia al reservar servicios públicos.',
      heroDescription:
        'Un sistema de componentes escalable para una experiencia más clara y consistente cuando las personas agendan un turno de un servicio público.',
      roleLabel: 'Mi rol',
      role: 'Diseñadora UX/UI',
      timelineLabel: 'Tiempo',
      timeline: 'Sprint 8',
      toolsLabel: 'Herramientas',
      tools: 'Figma',
      focusLabel: 'Enfoque',
      focus: 'Sistemas de diseño, Atomic Design',
      challengeTitle: 'El desafío',
      challengeIntro:
        'La interfaz existente carecía de consistencia, y eso dificultaba mantenerla y escalarla. Había componentes duplicados, estilos inconsistentes y ninguna estructura clara, lo que afectaba tanto la experiencia de uso como el proceso de diseño.',
      challengeQs: [
        {
          q: '¿Qué problema existía?',
          a: 'La interfaz necesitaba una estructura escalable, capaz de sostener múltiples pantallas, estados e interacciones sin perder consistencia.',
        },
        {
          q: '¿Por qué era importante?',
          a: 'Sin un sistema de componentes reutilizable, los archivos de diseño se vuelven difíciles de mantener, actualizar y escalar.',
        },
        {
          q: '¿Qué necesitaban las personas?',
          a: 'Una experiencia de reserva clara, accesible y consistente al agendar un turno de un servicio público.',
        },
      ],
      challengeIssues: {
        title: 'Problemas habituales',
        items: ['Componentes duplicados', 'Estilos inconsistentes', 'Mantenimiento difícil'],
      },
      processTitle: 'El proceso',
      processIntro:
        'Apliqué los principios de Atomic Design para crear un sistema de componentes estructurado y escalable.',
      processSteps: [
        { title: 'Análisis de la interfaz', desc: 'Revisé la interfaz recibida y la descomponí en bloques reutilizables.' },
        { title: 'Átomos', desc: 'Elementos básicos: iconos, etiquetas, campos y botones.' },
        { title: 'Moléculas', desc: 'Combinaciones de esos elementos en grupos pequeños y reutilizables.' },
        { title: 'Organismos', desc: 'Secciones funcionales armadas a partir de moléculas.' },
        { title: 'Plantillas y pantallas', desc: 'La interfaz real, reconstruida únicamente con instancias de componentes.' },
        { title: 'Organización', desc: 'Convenciones de nombre, jerarquía, variantes y guías de uso.' },
      ],
      libraryTitle: 'Librería de componentes',
      libraryIntro: 'Un conjunto de componentes reutilizables, flexibles y accesibles, documentado en el tablero de Atomic Design del proyecto.',
      togetherTitle: 'Todo junto',
      togetherIntro: 'Los componentes en acción: las pantallas finales se armaron por completo con el sistema de diseño.',
      resultsTitle: 'Resultados e impacto',
      resultsIntro: 'Una base sólida para un producto consistente y escalable.',
      stats: [
        { value: '12', label: 'Componentes' },
        { value: '32', label: 'Variantes' },
        { value: '3', label: 'Estados de pantalla' },
        { value: '100%', label: 'Construido con instancias' },
      ],
      impactTitle: 'Impacto',
      impactIntro:
        'El proyecto dejó un sistema de diseño fundacional y mostró la capacidad de pensar más allá de pantallas sueltas, diseñando soluciones de interfaz escalables y reutilizables.',
      learnedQ: 'Qué aprendí',
      learned:
        'Un sistema de diseño bien estructurado acelera las decisiones y mejora la colaboración entre diseño y desarrollo.',
      keyLearningsTitle: 'Qué aprendí',
      keyLearnings: [
        'Diseñar sistemas pide una mirada más estratégica y de largo plazo.',
        'La consistencia mejora la escalabilidad y la colaboración.',
        'La documentación es tan importante como el diseño visual.',
        'Un sistema bien estructurado hace el proceso de diseño más rápido y eficiente.',
      ],
      improvedQ: '¿Qué mejoró?',
      improved: [
        'La consistencia de la interfaz.',
        'La velocidad para crear pantallas.',
        'Mejor escalabilidad y mantenibilidad.',
        'Menos duplicación de elementos de diseño.',
      ],
      nextQ: '¿Qué validaría a continuación?',
      whatsNextTitle: '¿Qué sigue?',
      whatsNext: [
        'El cumplimiento de criterios de accesibilidad.',
        'Más estados de componentes y casos límite.',
        'La expansión a flujos de usuario más complejos.',
      ],
      handwritten: 'Interfaces\nque funcionan\npara todas\nlas personas',
      figmaLabel: 'Explorar la librería completa en Figma',
    },
  },
}

/** Maze metrics taken from the project's own "Métricas clave" slide, not the layout mockup. */
export const mazeMetrics = {
  success: { value: '100%', label: { en: 'Task success rate', es: 'Tasa de éxito' } },
  time: { value: '83.3s', label: { en: 'Avg. completion time', es: 'Tiempo promedio' } },
  misclick: { value: '22%', label: { en: 'Misclick rate', es: 'Clics erróneos' } },
  dropoff: { value: '0%', label: { en: 'Drop-off rate', es: 'Tasa de abandono' } },
  responses: { value: '9', label: { en: 'Responses', es: 'Respuestas' } },
  ease: { value: '3.6 / 5', label: { en: 'Ease of choosing a speaker', es: 'Facilidad para elegir orador' } },
}

export const titles = {
  home: {
    en: 'Melisa Pardo — UX/UI Designer',
    es: 'Melisa Pardo — Diseñadora UX/UI',
  },
}
