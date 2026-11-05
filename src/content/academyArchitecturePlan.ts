export interface DojoCategoryPlan {
  id: string;
  label: string;
  description: string;
  targetPuzzleCount: number;
  activeCount: number;
  mappedTheme?: string;
}

export interface PhaseMilestone {
  phase: number;
  title: string;
  status: 'COMPLETADA' | 'EN_CURSO' | 'PLANIFICADA';
  summary: string;
  deliverables: string[];
}

export const DOJO_CATEGORIES_PLAN: DojoCategoryPlan[] = [
  {
    id: 'cat-libertades-capturas',
    label: 'Libertades y capturas',
    description: 'Conteo de aire ortogonal, atari directo y retiro de cadenas sin libertades.',
    targetPuzzleCount: 120,
    activeCount: 5,
    mappedTheme: 'CAPTURA_SIMPLE',
  },
  {
    id: 'cat-salvar-escapar',
    label: 'Escape y persecución',
    description: 'Extender grupos en atari, ganar libertades hacia el centro y evitar encierros.',
    targetPuzzleCount: 100,
    activeCount: 1,
    mappedTheme: 'SALVAR_PIEDRA',
  },
  {
    id: 'cat-conexion-corte',
    label: 'Conexión y corte',
    description: 'Puentes sólidos, boca de tigre, peep (nozoki), doble atari y separación de grupos.',
    targetPuzzleCount: 110,
    activeCount: 2,
    mappedTheme: 'CONECTAR_Y_CORTAR',
  },
  {
    id: 'cat-suicidio-reglas',
    label: 'Suicidio vs. captura legal',
    description: 'Distinguir jugadas ilegales sin aire de capturas inmediatas en puntos críticos.',
    targetPuzzleCount: 60,
    activeCount: 1,
    mappedTheme: 'EVITAR_SUICIDIO',
  },
  {
    id: 'cat-ko-superko',
    label: 'Ko y amenazas de Ko',
    description: 'Regla de no repetición inmediata, búsqueda de amenazas locales y resolución de ko.',
    targetPuzzleCount: 80,
    activeCount: 1,
    mappedTheme: 'KO_BASICO',
  },
  {
    id: 'cat-escaleras',
    label: 'Escaleras (Shicho)',
    description: 'Persecución en zigzag hasta el borde y lectura de rompedores de escalera.',
    targetPuzzleCount: 90,
    activeCount: 2,
    mappedTheme: 'ESCALERAS',
  },
  {
    id: 'cat-redes',
    label: 'Redes (Geta)',
    description: 'Encierros indirectos donde la piedra enemiga no puede escapar por ninguna dirección.',
    targetPuzzleCount: 90,
    activeCount: 1,
    mappedTheme: 'REDES',
  },
  {
    id: 'cat-snapback',
    label: 'Snapback (Uttegaeshi)',
    description: 'Sacrificio táctico de una piedra para recapturar un grupo mayor en el turno siguiente.',
    targetPuzzleCount: 80,
    activeCount: 1,
    mappedTheme: 'SNAPBACK',
  },
  {
    id: 'cat-tesuji',
    label: 'Tesuji',
    description: 'Jugadas hábiles locales: hane en la cabeza de dos piedras, throw-in (horikomi) y cuñas.',
    targetPuzzleCount: 130,
    activeCount: 1,
    mappedTheme: 'TESUJI',
  },
  {
    id: 'cat-ojos-grupos',
    label: 'Ojos y grupos',
    description: 'Distinción entre ojo real y ojo falso, formación de dos ojos y puntos vitales.',
    targetPuzzleCount: 110,
    activeCount: 2,
    mappedTheme: 'VIDA_Y_MUERTE',
  },
  {
    id: 'cat-vida-muerte',
    label: 'Vida y muerte (Tsumego)',
    description: 'Vivir en espacio reducido, matar grupos sin dos ojos y posiciones de seki (vida mutua).',
    targetPuzzleCount: 160,
    activeCount: 2,
    mappedTheme: 'VIDA_Y_MUERTE',
  },
  {
    id: 'cat-ataque-defensa',
    label: 'Ataque y defensa',
    description: 'Presión sobre grupos débiles para construir influencia, dividir y defender con eficiencia.',
    targetPuzzleCount: 90,
    activeCount: 1,
    mappedTheme: 'FORMA_Y_ATAQUE',
  },
  {
    id: 'cat-forma',
    label: 'Forma (Katachi)',
    description: 'Formas eficientes (bambú, salto de caballo, kosumi) frente a defectos (triángulo vacío).',
    targetPuzzleCount: 70,
    activeCount: 1,
    mappedTheme: 'FORMA_Y_ATAQUE',
  },
  {
    id: 'cat-invasion-reduccion',
    label: 'Invasión y reducción',
    description: 'Entrar en san-san (3-3), reducir moyos rivales y equilibrar territorio con influencia.',
    targetPuzzleCount: 70,
    activeCount: 1,
    mappedTheme: 'INVASION_Y_YOSE',
  },
  {
    id: 'cat-sente-gote',
    label: 'Sente y Gote',
    description: 'Identificar jugadas que conservan la iniciativa (sente) frente a jugadas que la ceden (gote).',
    targetPuzzleCount: 60,
    activeCount: 1,
    mappedTheme: 'INVASION_Y_YOSE',
  },
  {
    id: 'cat-joseki-yose',
    label: 'Joseki y Yose (Final)',
    description: 'Secuencias equitativas de esquina y cálculo exacto del valor en puntos al final de partida.',
    targetPuzzleCount: 50,
    activeCount: 2,
    mappedTheme: 'INVASION_Y_YOSE',
  },
  {
    id: 'cat-lectura-mixtos',
    label: 'Lectura avanzada y problemas mixtos',
    description: 'Posiciones sin etiqueta previa donde el estudiante debe diagnosticar el objetivo táctico.',
    targetPuzzleCount: 50,
    activeCount: 1,
  },
];

export const EXPANSION_PHASES_ROADMAP: PhaseMilestone[] = [
  {
    phase: 1,
    title: 'Fase 1 · Auditoría, Paleta Visual y Planificación',
    status: 'COMPLETADA',
    summary:
      'Inspección de la arquitectura existente, preservación íntegra de las 3 lecciones y 10 puzzles, renovación armónica de iconos y colores de respuestas, y definición del plan escalable.',
    deliverables: [
      'Conservación de IDs estables (lesson-1..3, puzzle-1..10) y almacenamiento local compatible.',
      'Nueva paleta cromática serena y sistema de selección de respuestas con retroalimentación clara.',
      'Vínculo bidireccional entre lecciones y puzzles más estados de validación del motor.',
    ],
  },
  {
    phase: 2,
    title: 'Fase 2 · Arquitectura Curricular (Etapas, Unidades y Lecciones)',
    status: 'COMPLETADA',
    summary:
      'Organización del currículo de 13 etapas en 32 unidades temáticas con meta de 168 lecciones progresivas en módulos independientes.',
    deliverables: [
      'Mapa de unidades por etapa con prerrequisitos y metas observables.',
      'Navegación de Academia con filtros por etapa, modo estudio abierto y ejercicios vinculados.',
    ],
  },
  {
    phase: 3,
    title: 'Fase 3 · Expansión de la Academia (12 Lecciones Interactivas de Etapas 0 a 12)',
    status: 'COMPLETADA',
    summary:
      'Ampliación modular con 12 lecciones completas de 8 pasos: Orientación, Reglas, Territorio, Ko, Conexión/Corte, Forma (Bambú), Territorio/Influencia, Escaleras/Redes/Snapback, Dos Ojos/Seki, Sente/Gote y Yose.',
    deliverables: [
      'Carga modular en lessonsExpansionData.ts con demostraciones interactivas y exploración en vivo.',
      'Transición directa a la siguiente lección y a los puzzles asociados.',
    ],
  },
  {
    phase: 4,
    title: 'Fase 4 a 8 · Dojo Independiente (25 Puzzles Validados, Secuencias Multi-Jugada y Modos)',
    status: 'COMPLETADA',
    summary:
      'Dojo de 25 problemas verificados por el motor determinista con soporte para respuesta automática del rival en secuencias de 2 pasos, modo Desafío de Racha y estadísticas integrales.',
    deliverables: [
      'Validador automático de posiciones, capturas y variantes multi-jugada.',
      'Modos de práctica en el Dojo (Libre, Desafío de Racha, Serie Diaria, Repaso de Errores).',
    ],
  },
];

