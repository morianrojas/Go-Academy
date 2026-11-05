import { LessonContent } from '../types/go';

/**
 * 9 Nuevas Lecciones Interactivas (Lecciones 37 a 45)
 * Basadas en "Lessons in the Fundamentals of Go" de Toshiro Kageyama (7-Dan), traducido por James Davies.
 * Integradas sin duplicar conocimientos previos y distribuidas equitativamente:
 * - 3 en Nivel Básico (Etapas 1 y 2)
 * - 3 en Nivel Intermedio (Etapas 3, 4 y 6)
 * - 3 en Nivel Avanzado (Etapas 8, 9 y 11)
 */
export const KAGEYAMA_LESSONS_CATALOG: LessonContent[] = [
  // ============================================================================
  // LECCIÓN 37 (Etapa 1 · Unidad 5 — Nivel Básico): Firmeza en la Red y Ceder el Paso
  // ============================================================================
  {
    id: 'lesson-37-kageyama-redes-firmes-romper-escaleras',
    stageNumber: 1,
    stageTitle: '1. Reglas esenciales',
    unitNumber: 5,
    unitTitle: 'Firmeza al elegir entre dos capturas y el tesuji de ceder el paso en la red',
    title: 'La Firmeza en la Captura y el Tesuji de Ceder el Paso en la Red',
    subtitle:
      'Aprende el rigor fundamental de Toshiro Kageyama: por qué cuando dos ataris o redes capturan debes elegir siempre el más firme sin defectos, cómo usar el rompedor de escalera como amenaza doble y el tesuji de «ceder el paso» en la red.',
    estimatedMinutes: 8,
    xpReward: 30,
    prerequisites: ['lesson-25-lectura-tactica-arbol'],
    relatedPuzzleIds: [
      'puzzle-65-kageyama-firmeza-en-la-red',
      'puzzle-66-kageyama-red-ceder-el-paso',
    ],
    observableObjective:
      'Al terminar, elegirás entre dos posibles capturas de una jugada la que no deja defectos de corte, y aplicarás el tesuji de ceder un paso en diagonal para atrapar piedras de corte.',
    activationQuestion: {
      question:
        'Cuando dos piedras enemigas tienen solo dos libertades y cualquiera de los dos ataris parece capturarlas en el acto, ¿cuál es la diferencia entre el aficionado y el profesional según Kageyama?',
      options: [
        {
          id: 'a',
          text: 'El profesional examina ambos ataris y elige siempre el más firme: aquel que no deja puntos de corte ni aji frente a las piedras enemigas cercanas',
          isCorrect: true,
          explanation:
            '¡Exacto! Kageyama recalca que «cualquiera sirve» es el hábito que impide progresar: entre dos capturas de una jugada, una deja tu muro de acero y la otra regala defectos futuros.',
        },
        {
          id: 'b',
          text: 'Da exactamente igual cuál jugar porque el resultado inmediato es idéntico',
          isCorrect: false,
          explanation:
            'Aunque ambos capturen hoy, el atari flojo deja debilidades que el oponente explotará diez jugadas más tarde.',
        },
        {
          id: 'c',
          text: 'Conviene elegir el atari más arriesgado para provocar complicaciones',
          isCorrect: false,
          explanation:
            'Los fundamentos exigen máxima solidez cuando el resultado táctico ya está asegurado.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. Entre dos capturas posibles, elige siempre la más firme',
        body: 'Cuando un par de piedras enemigas de corte tiene dos libertades, no juegues el primer atari que vean tus ojos. Mira hacia dónde apuntan las piedras de apoyo del rival: un atari empuja al enemigo hacia tus debilidades, mientras que el atari opuesto lo estrella contra tu muro más grueso.',
        deepDive:
          'Kageyama compara los fundamentos con caminar por una escalera: no hay diferencia secreta en las reglas entre un aficionado y un profesional, sino la negativa absoluta a jugar el atari descuidado.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 4, y: 3, color: 'WHITE' },
            { x: 4, y: 4, color: 'WHITE' },
            { x: 3, y: 3, color: 'BLACK' },
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 5, y: 3, color: 'BLACK' },
            { x: 6, y: 5, color: 'WHITE' },
          ],
          markers: [
            { x: 4, y: 5, type: 'SUCCESS', label: '1' },
            { x: 5, y: 4, type: 'DANGER', label: 'X' },
          ],
          caption:
            'El atari en E4 (1) sujeta las piedras blancas con firmeza; dar atari en F5 (X) dejaría cortes junto a la piedra blanca G4.',
        },
      },
      {
        title: '2. El Tesuji de «Ceder el Paso» en la Red (Geta)',
        body: 'A veces dar atari directo a la piedra cortadora rival le ayuda a escapar dando contra-atari a tus piedras débiles. En esa situación, el tesuji de Kageyama consiste en «ceder un paso»: colocar tu piedra tranquilamente en diagonal a un espacio de distancia, envolviendo al enemigo sin tocarlo.',
        deepDive:
          'De igual modo, cuando el oponente juega un rompedor de escalera (Shicho-atari), antes de defender pasivamente la escalera verifica si ignorarlo te da una ganancia aún mayor en el otro lado.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 4, y: 4, color: 'WHITE' },
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 3, y: 3, color: 'WHITE' },
            { x: 2, y: 3, color: 'BLACK' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 6, y: 4, color: 'BLACK' },
          ],
          markers: [
            { x: 5, y: 5, type: 'SUCCESS', label: '1' },
            { x: 5, y: 4, type: 'CIRCLE', label: 'a' },
          ],
          caption:
            'Negro 1 en F4 cede un paso sin dar atari: si Blanco avanza a "a" (F5), Negro bloquea en F6 y la red es total.',
        },
      },
    ],
    demonstration: {
      title: 'Demostración: El Tesuji de Ceder el Paso frente al Atari Precipitado',
      size: 9,
      steps: [
        {
          title: '1. Blanco corta en E5 amenazando D5 y E6',
          narration:
            'Si Negro da atari impulsivo en F5, Blanco escapa por E4 poniendo en aprietos a D5.',
          stones: [
            { x: 4, y: 4, color: 'WHITE' },
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 3, y: 3, color: 'WHITE' },
            { x: 2, y: 3, color: 'BLACK' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 6, y: 4, color: 'BLACK' },
          ],
          turn: 'BLACK',
        },
        {
          title: '2. Negro juega F4: el tesuji de ceder el paso',
          narration:
            'Al colocar en F4 (x=5, y=5), Negro tiende una red suave. Si Blanco empuja en F5, Negro cierra en F6; si Blanco baja a E4, Negro bloquea en E3.',
          stones: [
            { x: 4, y: 4, color: 'WHITE' },
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 3, y: 3, color: 'WHITE' },
            { x: 2, y: 3, color: 'BLACK' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 6, y: 4, color: 'BLACK' },
            { x: 5, y: 5, color: 'BLACK' },
          ],
          lastMove: { x: 5, y: 5 },
          markers: [{ x: 5, y: 5, type: 'SUCCESS', label: '!' }],
          turn: 'WHITE',
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l37-gd-1',
        prompt:
          'Las dos piedras blancas E6–E5 tienen dos libertades (E4 y F5). Elige el atari más firme que no regale defectos frente a la piedra blanca G4.',
        boardSize: 9,
        initialStones: [
          { x: 4, y: 3, color: 'WHITE' },
          { x: 4, y: 4, color: 'WHITE' },
          { x: 3, y: 3, color: 'BLACK' },
          { x: 3, y: 4, color: 'BLACK' },
          { x: 4, y: 2, color: 'BLACK' },
          { x: 5, y: 3, color: 'BLACK' },
          { x: 6, y: 5, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 5 }],
        correctFeedback:
          '¡Firmeza profesional! Desde E4 empujas a Blanco hacia tu muro sólido sin dejar cortes.',
        wrongFeedback: {
          '5,4': 'Dar atari desde F5 expone un punto de corte con la piedra blanca G4.',
        },
        defaultWrongFeedback: 'Da el atari sólido desde abajo jugando en E4 (x=4, y=5).',
        hints: [
          'Compara las dos libertades de Blanco: E4 y F5.',
          'Juega en E4 (x=4, y=5).',
        ],
      },
    ],
    independentPractice: [
      {
        id: 'l37-prac-1',
        prompt:
          'Ejercicio 1: Envuelve la piedra blanca cortadora E5 mediante el tesuji de ceder el paso en diagonal.',
        boardSize: 9,
        initialStones: [
          { x: 4, y: 4, color: 'WHITE' },
          { x: 3, y: 4, color: 'BLACK' },
          { x: 4, y: 3, color: 'BLACK' },
          { x: 3, y: 3, color: 'WHITE' },
          { x: 2, y: 4, color: 'BLACK' },
          { x: 3, y: 2, color: 'BLACK' },
          { x: 6, y: 4, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 5, y: 5 }],
        correctFeedback:
          '¡Excelente red en F4! Cedes un paso y dejas a la piedra blanca E5 completamente atrapada.',
        wrongFeedback: {
          '5,4': 'Atari directo en F5 permite a Blanco escapar por E4.',
        },
        defaultWrongFeedback: 'Coloca tu piedra en diagonal en F4 (x=5, y=5).',
        hints: [
          'No toques directamente la piedra E5.',
          'Juega en F4 (x=5, y=5).',
        ],
      },
      {
        id: 'l37-prac-2',
        prompt:
          'Ejercicio 2: Blanco intenta salvar su piedra de corte D5. Elige la red (Geta) en D6 que la encierra limpiamente sin dejar debilidades.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 4, color: 'WHITE' },
          { x: 2, y: 5, color: 'BLACK' },
          { x: 3, y: 5, color: 'BLACK' },
          { x: 4, y: 4, color: 'BLACK' },
          { x: 4, y: 5, color: 'WHITE' },
          { x: 5, y: 5, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 2, y: 3 }, { x: 3, y: 3 }],
        correctFeedback:
          '¡Captura firme! Cierras las salidas superiores de D5 manteniendo tu estructura intacta.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Bloquea por arriba en D6 (x=3, y=3) o C6 (x=2, y=3).',
        hints: [
          'Mira las salidas superiores de la piedra blanca D5.',
          'Juega en D6 (x=3, y=3) o C6 (x=2, y=3).',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'Cuando dos ataris o redes capturan, nunca digas «cualquiera da igual»: elige el que deje cero defectos en tu forma.',
        'A veces dar un paso atrás en diagonal (el tesuji de ceder el paso) atrapa en red lo que el atari directo dejaría escapar.',
        'Un rompedor de escalera (Shicho-atari) funciona porque crea una doble amenaza en dos sectores del tablero.',
      ],
      vocabulary: [
        {
          term: 'Geta (Red)',
          japanese: 'ゲタ',
          definition: 'Técnica de captura que envuelve piedras enemigas a distancia sin necesidad de dar atari inmediato.',
        },
        {
          term: 'Shicho-atari (Rompedor de escalera)',
          japanese: 'シチョウアタリ',
          definition: 'Jugada estratégica colocada en la trayectoria de una escalera que amenaza rescatar las piedras atrapadas.',
        },
      ],
    },
    transferQuestion: {
      id: 'l37-transfer',
      prompt:
        'Pregunta de transferencia: Blanco avanzó a F5 tras tu red en F4. Juega el bloqueo que sella definitivamente su captura.',
      boardSize: 9,
      initialStones: [
        { x: 4, y: 4, color: 'WHITE' },
        { x: 5, y: 4, color: 'WHITE' },
        { x: 3, y: 4, color: 'BLACK' },
        { x: 4, y: 3, color: 'BLACK' },
        { x: 3, y: 3, color: 'WHITE' },
        { x: 2, y: 4, color: 'BLACK' },
        { x: 3, y: 2, color: 'BLACK' },
        { x: 6, y: 4, color: 'BLACK' },
        { x: 5, y: 5, color: 'BLACK' },
      ],
      turn: 'BLACK',
      exerciseType: 'PLACE_STONE',
      validCoords: [{ x: 5, y: 3 }],
      correctFeedback:
        '¡Dominado! Con F6 completas la red de Kageyama y capturas las piedras blancas.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Cierra la salida superior en F6 (x=5, y=3).',
      hints: [
        'Mira la única libertad exterior de la piedra blanca F5.',
        'Juega en F6 (x=5, y=3).',
      ],
    },
  },

  // ============================================================================
  // LECCIÓN 38 (Etapa 2 · Unidad 7 — Nivel Básico): No Te Asomes Donde Puedes Cortar y Continuidad
  // ============================================================================
  {
    id: 'lesson-38-kageyama-no-asomarse-corte-continuidad',
    stageNumber: 2,
    stageTitle: '2. Sobrevivir',
    unitNumber: 7,
    unitTitle: 'No asomarse donde se puede cortar y el poder de mantener un solo grupo conectado',
    title: 'No Te Asomes Donde Puedes Cortar y la Continuidad Global',
    subtitle:
      'Descubre por qué el «asomo crudo» (Nozoki) que obliga al rival a conectar es un grave error cuando puedes cortar directamente, y por qué un solo grupo continuo vence a cinco grupos fragmentados.',
    estimatedMinutes: 8,
    xpReward: 30,
    prerequisites: ['lesson-28-ignorar-atari-contra-atari'],
    relatedPuzzleIds: [
      'puzzle-67-kageyama-cortar-sin-asomarse',
      'puzzle-5-conectar-corte',
    ],
    observableObjective:
      'Al terminar, cortarás directamente los puntos vitales del enemigo sin regalarle la conexión mediante un asomo crudo, y priorizarás mantener tus grupos unidos.',
    activationQuestion: {
      question:
        'Un proverbio famoso que destaca Toshiro Kageyama dice: «Incluso un morón conecta contra un asomo (Nozoki)». ¿Qué añade Kageyama inmediatamente después?',
      options: [
        {
          id: 'a',
          text: '«...Y otro morón es quien se asoma donde podía cortar directamente»',
          isCorrect: true,
          explanation:
            '¡Exacto! Si el punto de corte del rival es vulnerable, asomarse frente a él solo lo obliga a reparar su defecto y desperdicia tu oportunidad de dividirlo.',
        },
        {
          id: 'b',
          text: '«...Por eso debes asomarte frente a todos los cortes del tablero antes de pensar»',
          isCorrect: false,
          explanation:
            'Kageyama llama a ese reflejo el «asomo crudo» (raw peep): ayuda al rival a hacerse sólido gratis.',
        },
        {
          id: 'c',
          text: '«...Nunca debes conectar cuando el oponente se asoma a tu corte»',
          isCorrect: false,
          explanation:
            'Conectar ante un asomo suele ser correcto; el error es del atacante que se asomó cuando podía cortar.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. Prohibido el «Asomo Crudo» cuando el corte directo funciona',
        body: 'Muchos jugadores sienten un impulso irresistible de asomarse (Nozoki) frente a cualquier salto o diagonal del enemigo diciendo «es sente». Pero cuando el enemigo responde conectando, su grupo pasa de ser frágil y cortable a ser una roca indestructible. Si puedes cortar, ¡corta sin avisar!',
        deepDive:
          'Solo debes asomarte cuando cortar directamente sea imposible y necesites usar ese asomo para construir fuerza exterior sin destruir un corte real.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 3, color: 'WHITE' },
            { x: 5, y: 3, color: 'WHITE' },
            { x: 4, y: 4, color: 'WHITE' },
            { x: 3, y: 4, color: 'BLACK' },
            { x: 5, y: 4, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
          ],
          markers: [
            { x: 4, y: 3, type: 'SUCCESS', label: '¡Corta!' },
            { x: 4, y: 5, type: 'DANGER', label: 'X' },
          ],
          caption:
            'Cortar en E6 divide a Blanco en tres pedazos; asomarse en E4 (X) obliga a Blanco a conectar en E6.',
        },
      },
      {
        title: '2. La lección de las 9 piedras: 1 grupo conectado vence a 5 aislados',
        body: 'Al analizar una partida con 9 piedras de ventaja, Kageyama muestra cómo el jugador que permite que sus piedras queden divididas en 5 o 6 grupos pequeños termina perdiendo contra un rival que mantiene todas sus piedras en una o dos cadenas conectadas.',
        deepDive:
          'Cada grupo desconectado es una boca más que alimentar con dos ojos; mantener tus piedras enlazadas te libera de defender y te permite atacar con toda tu fuerza.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 2, y: 2, color: 'BLACK' },
            { x: 2, y: 4, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 3, y: 3, color: 'WHITE' },
            { x: 3, y: 4, color: 'WHITE' },
          ],
          markers: [{ x: 2, y: 3, type: 'SUCCESS', label: '1' }],
          caption:
            'Mantener conectadas tus piedras en C6 (1) preserva una base sólida mientras las piedras blancas quedan bajo presión.',
        },
      },
    ],
    demonstration: {
      title: 'Demostración: El error del Asomo Crudo frente al Corte Directo',
      size: 9,
      steps: [
        {
          title: '1. La formación blanca tiene un defecto abierto en E6',
          narration:
            'Las tres piedras blancas D6, F6 y E5 solo se mantienen unidas a través de la intersección vacía E6.',
          stones: [
            { x: 3, y: 3, color: 'WHITE' },
            { x: 5, y: 3, color: 'WHITE' },
            { x: 4, y: 4, color: 'WHITE' },
            { x: 3, y: 4, color: 'BLACK' },
            { x: 5, y: 4, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
          ],
          turn: 'BLACK',
        },
        {
          title: '2. Negro corta directamente en E6',
          narration:
            'Al jugar E6 (x=4, y=3), Negro separa instantáneamente D6 y F6, asegurando la captura de al menos una de las piedras blancas.',
          stones: [
            { x: 3, y: 3, color: 'WHITE' },
            { x: 5, y: 3, color: 'WHITE' },
            { x: 4, y: 4, color: 'WHITE' },
            { x: 3, y: 4, color: 'BLACK' },
            { x: 5, y: 4, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
          ],
          lastMove: { x: 4, y: 3 },
          markers: [{ x: 4, y: 3, type: 'SUCCESS', label: '!' }],
          turn: 'WHITE',
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l38-gd-1',
        prompt:
          'No cometas el «asomo crudo» en E4. Corta directamente el punto vital que separa a las tres piedras blancas.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 3, color: 'WHITE' },
          { x: 5, y: 3, color: 'WHITE' },
          { x: 4, y: 4, color: 'WHITE' },
          { x: 3, y: 4, color: 'BLACK' },
          { x: 5, y: 4, color: 'BLACK' },
          { x: 4, y: 2, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 3 }],
        correctFeedback:
          '¡Corte directo en E6! Divides la posición blanca sin darle oportunidad de conectarse.',
        wrongFeedback: {
          '4,5': 'Asomarse en E4 obliga a Blanco a conectar en E6 y arruina el corte.',
        },
        defaultWrongFeedback: 'Corta directamente en E6 (x=4, y=3).',
        hints: [
          'Mira el punto vacío entre D6, F6 y E5.',
          'Juega en E6 (x=4, y=3).',
        ],
      },
    ],
    independentPractice: [
      {
        id: 'l38-prac-1',
        prompt:
          'Ejercicio 1: Blanco acaba de asomarse para intentar dividir tus piedras C7 y C5. Conecta sólidamente para mantener un solo grupo continuo.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 2, color: 'BLACK' },
          { x: 2, y: 4, color: 'BLACK' },
          { x: 4, y: 2, color: 'BLACK' },
          { x: 3, y: 3, color: 'WHITE' },
          { x: 3, y: 4, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 2, y: 3 }],
        correctFeedback:
          '¡Conexión impecable en C6! Tu grupo izquierdo es una sola unidad sólida y ahora las piedras blancas quedan débiles.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Conecta tus dos piedras jugando en C6 (x=2, y=3).',
        hints: [
          'Une C7 con C5 antes de que Blanco corte.',
          'Juega en C6 (x=2, y=3).',
        ],
      },
      {
        id: 'l38-prac-2',
        prompt:
          'Ejercicio 2: En lugar de asomarte desde afuera, corta el punto clave D5 que separa las dos alas blancas.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 4, color: 'WHITE' },
          { x: 3, y: 3, color: 'WHITE' },
          { x: 4, y: 4, color: 'WHITE' },
          { x: 3, y: 5, color: 'BLACK' },
          { x: 2, y: 3, color: 'BLACK' },
          { x: 4, y: 3, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 3, y: 4 }],
        correctFeedback:
          '¡Exacto! Cortar directo en D5 fragmenta las piedras blancas sin darles respiro.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Corta en el corazón de la forma blanca en D5 (x=3, y=4).',
        hints: [
          'Apunta a la intersección central entre C5, D6 y E5.',
          'Juega en D5 (x=3, y=4).',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        '«No te asomes donde puedes cortar»: un asomo prematuro obliga al rival a reparar su propio punto débil.',
        'Cuando el rival se asome a una conexión vital tuya, conecta sin vacilar: un solo grupo unido es inmensamente más fuerte que dos grupos separados.',
        'En el Go global, quien mantiene menos grupos débiles en el tablero lleva la iniciativa estratégica.',
      ],
      vocabulary: [
        {
          term: 'Nozoki (Asomo)',
          japanese: 'ノゾキ',
          definition: 'Jugada que amenaza cortar una conexión enemiga; es un error jugarla cuando el corte directo ya funciona.',
        },
        {
          term: 'Renraku (Continuidad / Conexión)',
          japanese: '連絡',
          definition: 'Mantener las piedras propias enlazadas en una sola cadena estratégica para evitar grupos débiles.',
        },
      ],
    },
    transferQuestion: {
      id: 'l38-transfer',
      prompt:
        'Pregunta de transferencia: Blanco dejó desconectadas sus piedras en E6 y F5. Corta directamente sin hacer ningún asomo previo.',
      boardSize: 9,
      initialStones: [
        { x: 4, y: 3, color: 'WHITE' },
        { x: 5, y: 4, color: 'WHITE' },
        { x: 3, y: 4, color: 'WHITE' },
        { x: 4, y: 2, color: 'BLACK' },
        { x: 6, y: 3, color: 'BLACK' },
        { x: 4, y: 5, color: 'BLACK' },
      ],
      turn: 'BLACK',
      exerciseType: 'PLACE_STONE',
      validCoords: [{ x: 5, y: 3 }, { x: 4, y: 4 }],
      correctFeedback:
        '¡Dominado! Cortas directamente la conexión blanca y tomas el control de la lucha.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Corta en F6 (x=5, y=3) o en el centro E5 (x=4, y=4).',
      hints: [
        'Mira los puntos de corte directos entre E6 y F5.',
        'Juega en F6 (x=5, y=3) o E5 (x=4, y=4).',
      ],
    },
  },

  // ============================================================================
  // LECCIÓN 39 (Etapa 2 · Unidad 8 — Nivel Básico): Las Piedras Salen a Caminar
  // ============================================================================
  {
    id: 'lesson-39-kageyama-piedras-caminan-paso-atras',
    stageNumber: 2,
    stageTitle: '2. Sobrevivir',
    unitNumber: 8,
    unitTitle: 'El ritmo natural de las piedras en contacto: extensión, paso atrás y doble hane',
    title: 'Las Piedras Salen a Caminar: El Ritmo en Contacto',
    subtitle:
      'Aprende la metáfora central del Capítulo 3 de Kageyama («Stones Go Walking»): cómo las piedras caminan un paso a la vez cuando están en contacto, cuándo castigar una sobreextensión con Doble Hane y cuándo dar el Paso Atrás sólido.',
    estimatedMinutes: 8,
    xpReward: 30,
    prerequisites: ['lesson-38-kageyama-no-asomarse-corte-continuidad'],
    relatedPuzzleIds: [
      'puzzle-68-kageyama-paso-atras-en-contacto',
      'puzzle-63-retroceso-hiki-captura',
    ],
    observableObjective:
      'Al terminar, responderás a un corte y hane enemigo con el Paso Atrás sólido (Hiki) que conserva tus libertades, y castigarás las sobreextensiones en contacto.',
    activationQuestion: {
      question:
        'En el Capítulo 3 («Las piedras salen a caminar»), ¿qué enseña Kageyama sobre la distancia a la que deben moverse las piedras cuando están en combate cuerpo a cuerpo?',
      options: [
        {
          id: 'a',
          text: 'Cuando están libres en campo abierto pueden saltar, pero en contacto directo deben caminar paso a paso (Nobi y Hiki) para no ser cortadas',
          isCorrect: true,
          explanation:
            '¡Exacto! En espacio abierto un salto de dos espacios es ligero, pero cuando tus piedras tocan al enemigo un salto deja huecos mortales: en contacto hay que caminar con pasos firmes.',
        },
        {
          id: 'b',
          text: 'En combate de contacto siempre debes hacer saltos largos de dos o tres espacios',
          isCorrect: false,
          explanation:
            'Saltar lejos mientras tus piedras están en contacto permite que el rival atraviese y corte tu formación.',
        },
        {
          id: 'c',
          text: 'Nunca debes extender una piedra que ha sido tocada por el enemigo',
          isCorrect: false,
          explanation:
            'La extensión sólida (Nobi) o el paso atrás (Hiki) son la base del combate en contacto.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. En campo abierto se salta; en contacto directo se camina paso a paso',
        body: 'Kageyama explica que las piedras tienen su propio ritmo natural de marcha: lejos del enemigo dan zancadas amplias (saltos de uno o dos puntos), pero en cuanto chocan hombro con hombro con piedras rivales, deben dar pasos cortos y firmes (Nobi) para mantener sus libertades superiores a las del adversario.',
        deepDive:
          'Si el rival intenta dar una zancada demasiado larga en medio de un combate de contacto, puedes castigarlo con el Doble Hane (Nidan-bane) y cortar su sobreextensión.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 3, y: 3, color: 'WHITE' },
            { x: 4, y: 4, color: 'WHITE' },
            { x: 5, y: 3, color: 'WHITE' },
            { x: 2, y: 4, color: 'WHITE' },
          ],
          markers: [
            { x: 4, y: 2, type: 'SUCCESS', label: '1' },
            { x: 5, y: 2, type: 'DANGER', label: 'X' },
          ],
          caption:
            'El paso atrás en E7 (1) alarga las libertades de E6; hacer hane en F7 (X) permitiría un corte con atari en E7.',
        },
      },
      {
        title: '2. El Paso Atrás (Back-pedaling / Hiki) ante el Hane enemigo',
        body: 'Cuando Blanco corta tus piedras y además te hace Hane en la cabeza, rebelarse con otro Hane sin libertades es suicida. El movimiento maestro que enseña Kageyama (Cap. 3, Dia. 5) es dar un paso recto hacia atrás (Hiki): tu piedra sube inmediatamente a 4 libertades y deja en Miai capturar la piedra cortadora o cortar el hane exterior.',
        deepDive:
          'Aunque parezca una jugada tranquila, ese paso atrás contiene una fuerza latente tremenda porque todas tus libertades quedan abiertas.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 3, y: 3, color: 'WHITE' },
            { x: 4, y: 4, color: 'WHITE' },
            { x: 5, y: 3, color: 'WHITE' },
            { x: 2, y: 4, color: 'WHITE' },
          ],
          markers: [
            { x: 3, y: 2, type: 'CIRCLE', label: 'a' },
            { x: 5, y: 2, type: 'CIRCLE', label: 'b' },
          ],
          caption:
            'Tras E7, Negro amenaza simultáneamente atrapar D6 en "a" (D7) o cortar en "b" (F7).',
        },
      },
    ],
    demonstration: {
      title: 'Demostración: El Paso Atrás de Kageyama en Combate de Contacto',
      size: 9,
      steps: [
        {
          title: '1. Blanco corta y juega Hane en F6',
          narration:
            'La piedra negra E6 está rodeada por D6, E5 y F6. Hacer hane en F7 expondría un corte con atari en E7.',
          stones: [
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 3, y: 3, color: 'WHITE' },
            { x: 4, y: 4, color: 'WHITE' },
            { x: 5, y: 3, color: 'WHITE' },
            { x: 2, y: 4, color: 'WHITE' },
          ],
          turn: 'BLACK',
        },
        {
          title: '2. Negro camina un paso atrás en E7',
          narration:
            'Con E7 (x=4, y=2), Negro gana 4 libertades limpias y Blanco no puede defender simultáneamente D7 y F7.',
          stones: [
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 3, y: 3, color: 'WHITE' },
            { x: 4, y: 4, color: 'WHITE' },
            { x: 5, y: 3, color: 'WHITE' },
            { x: 2, y: 4, color: 'WHITE' },
            { x: 4, y: 2, color: 'BLACK' },
          ],
          lastMove: { x: 4, y: 2 },
          markers: [{ x: 4, y: 2, type: 'SUCCESS', label: '!' }],
          turn: 'WHITE',
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l39-gd-1',
        prompt:
          'Blanco acaba de cortar y hacer hane en F6 contra tu piedra E6. Juega el «paso atrás» sólido que mantiene tus libertades y crea Miai entre D7 y F7.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 4, color: 'BLACK' },
          { x: 4, y: 3, color: 'BLACK' },
          { x: 3, y: 3, color: 'WHITE' },
          { x: 4, y: 4, color: 'WHITE' },
          { x: 5, y: 3, color: 'WHITE' },
          { x: 2, y: 4, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 2 }],
        correctFeedback:
          '¡Paso atrás perfecto en E7! Ahora tienes 4 libertades y Blanco no puede evitar perder D6 o F6.',
        wrongFeedback: {
          '5,2': 'Hacer hane en F7 permite a Blanco cortar en E7 con atari.',
          '3,2': 'Dar atari en D7 primero permite a Blanco dar atari en E7.',
        },
        defaultWrongFeedback: 'Retrocede un paso recto jugando en E7 (x=4, y=2).',
        hints: [
          'Protege la intersección justo encima de E6.',
          'Juega en E7 (x=4, y=2).',
        ],
      },
    ],
    independentPractice: [
      {
        id: 'l39-prac-1',
        prompt:
          'Ejercicio 1: Blanco defendió su ala derecha en F7 tras tu paso atrás en E7. Ahora captura la piedra blanca cortadora D6.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 4, color: 'BLACK' },
          { x: 4, y: 3, color: 'BLACK' },
          { x: 4, y: 2, color: 'BLACK' },
          { x: 3, y: 3, color: 'WHITE' },
          { x: 4, y: 4, color: 'WHITE' },
          { x: 5, y: 3, color: 'WHITE' },
          { x: 5, y: 2, color: 'WHITE' },
          { x: 2, y: 4, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 3, y: 2 }],
        correctFeedback:
          '¡Exacto! Con D7 pones en atari a la piedra blanca D6 contra tu muro.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Juega en D7 (x=3, y=2) para atrapar D6.',
        hints: [
          'Mira la piedra blanca de corte en D6.',
          'Juega encima de ella en D7 (x=3, y=2).',
        ],
      },
      {
        id: 'l39-prac-2',
        prompt:
          'Ejercicio 2: Blanco se ha sobreextendido dejando un corte entre D6 y F6. Corta en E6 y camina sólido.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 3, color: 'WHITE' },
          { x: 5, y: 3, color: 'WHITE' },
          { x: 3, y: 4, color: 'BLACK' },
          { x: 4, y: 4, color: 'BLACK' },
          { x: 5, y: 2, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 3 }],
        correctFeedback:
          '¡Paso firme en E6! Separas las piedras blancas mientras tus piedras caminan conectadas.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Extiende tu piedra E5 hacia arriba en E6 (x=4, y=3).',
        hints: [
          'Avanza un paso sólido desde E5.',
          'Juega en E6 (x=4, y=3).',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'Las piedras saltan cuando están libres, pero caminan paso a paso (Nobi y Hiki) cuando luchan en contacto.',
        'Ante un corte y hane enemigo, el Paso Atrás recto (Hiki) preserva tus libertades y prepara el contraataque.',
        'Revisa siempre las libertades de tu piedra antes de responder a un hane con otro hane.',
      ],
      vocabulary: [
        {
          term: 'Nobi (Extensión sólida)',
          japanese: 'ノビ',
          definition: 'Caminar un paso en línea recta junto a una piedra propia para ganar libertades y solidez.',
        },
        {
          term: 'Hiki (Paso atrás)',
          japanese: '引き',
          definition: 'Retroceder un paso recto ante el hane enemigo para evitar cortes y mantener 4 libertades.',
        },
      ],
    },
    transferQuestion: {
      id: 'l39-transfer',
      prompt:
        'Pregunta de transferencia: Blanco decidió salvar D6 jugando en D7 tras tu paso atrás en E7. Ahora corta y captura la piedra blanca del otro lado en F6.',
      boardSize: 9,
      initialStones: [
        { x: 3, y: 4, color: 'BLACK' },
        { x: 4, y: 3, color: 'BLACK' },
        { x: 4, y: 2, color: 'BLACK' },
        { x: 3, y: 3, color: 'WHITE' },
        { x: 3, y: 2, color: 'WHITE' },
        { x: 4, y: 4, color: 'WHITE' },
        { x: 5, y: 3, color: 'WHITE' },
        { x: 2, y: 4, color: 'WHITE' },
      ],
      turn: 'BLACK',
      exerciseType: 'PLACE_STONE',
      validCoords: [{ x: 5, y: 2 }, { x: 5, y: 4 }],
      correctFeedback:
        '¡Dominado! Al bloquear en F7 (o F5) cobras el otro lado del Miai creado por tu paso atrás.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Ataca la piedra blanca F6 jugando en F7 (x=5, y=2) o F5 (x=5, y=4).',
      hints: [
        'Mira la piedra blanca aislada en F6.',
        'Juega en F7 (x=5, y=2).',
      ],
    },
  },

  // ============================================================================
  // LECCIÓN 40 (Etapa 3 · Unidad 6 — Nivel Intermedio): La Lucha por Tomar la Delantera
  // ============================================================================
  {
    id: 'lesson-40-kageyama-lucha-tomar-delantera',
    stageNumber: 3,
    stageTitle: '3. Forma y eficiencia',
    unitNumber: 6,
    unitTitle: 'La lucha por tomar la delantera, dejar la segunda línea y cambiar al salto de caballo',
    title: 'La Lucha por Tomar la Delantera y la Línea de la Derrota',
    subtitle:
      'Estudia el Capítulo 4 de Kageyama («The Struggle to Get Ahead»): por qué arrastrarse en la segunda línea equivale a rendirse, cómo saltar hacia adelante a la primera oportunidad y cómo cambiar del empuje al salto de caballo.',
    estimatedMinutes: 9,
    xpReward: 35,
    prerequisites: ['lesson-30-cortar-formas-cuello-perro'],
    relatedPuzzleIds: [
      'puzzle-69-kageyama-saltar-adelante',
      'puzzle-26-escape-salto-centro',
    ],
    observableObjective:
      'Al terminar, dejarás de empujar desde atrás o arrastrarte en la segunda línea y saltarás un paso por delante del bloqueo rival para tomar la iniciativa hacia el centro.',
    activationQuestion: {
      question:
        'Cuando dos hileras de piedras avanzan en paralelo hacia el centro o a lo largo del costado, ¿por qué Kageyama insiste en que jamás debes limitarte a empujar al mismo nivel que la última piedra del rival?',
      options: [
        {
          id: 'a',
          text: 'Porque empujar al mismo nivel va siempre un paso por detrás; debes doblar en la cabeza (Hane) o saltar un punto más adelante para tomar la delantera',
          isCorrect: true,
          explanation:
            '¡Exacto! Quien solo empuja desde atrás ayuda al enemigo a construir un muro; quien salta adelante o hace hane en la cabeza toma el mando del centro.',
        },
        {
          id: 'b',
          text: 'Porque arrastrarse diez veces seguidas en la segunda línea da más puntos que salir al centro',
          isCorrect: false,
          explanation:
            'La segunda línea se llama «la línea de la derrota»: cada piedra que se arrastra en ella regala a tu rival un muro exterior de 3ª o 4ª línea.',
        },
        {
          id: 'c',
          text: 'Porque está prohibido saltar hacia el centro antes de la jugada 100',
          isCorrect: false,
          explanation:
            'Saltar adelante a la primera oportunidad es un principio esencial desde la apertura.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. Abandonar la «Línea de la Derrota» a la primera oportunidad',
        body: 'Si tus piedras han sido presionadas en la segunda línea, arrastrarte un paso más en la segunda línea solo invita al rival a seguir aplastándote desde la tercera línea. Tan pronto como tu grupo tenga los pies seguros, salta en diagonal o en caballo hacia la tercera o cuarta línea para tomar la delantera.',
        deepDive:
          'Incluso si el rival intenta cortar detrás de tu salto, descubrirás que al haber colocado primero una piedra en el exterior ahora eres tú quien lucha desde arriba.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 2, y: 7, color: 'BLACK' },
            { x: 3, y: 7, color: 'BLACK' },
            { x: 4, y: 7, color: 'BLACK' },
            { x: 2, y: 6, color: 'WHITE' },
            { x: 3, y: 6, color: 'WHITE' },
            { x: 4, y: 6, color: 'WHITE' },
            { x: 1, y: 7, color: 'WHITE' },
          ],
          markers: [
            { x: 5, y: 5, type: 'SUCCESS', label: '1' },
            { x: 5, y: 7, type: 'DANGER', label: 'X' },
          ],
          caption:
            'Saltar a F4 (1) toma la delantera hacia el centro; arrastrarse en F2 (X) perpetúa la sumisión en la segunda línea.',
        },
      },
      {
        title: '2. Cambiar del empuje pesado al Salto de Caballo (Keima)',
        body: 'En las luchas por escapar hacia el centro, empujar una y otra vez contra el muro rival es como correr detrás de alguien sin alcanzarlo nunca. Cambiar el ritmo con un Salto de Caballo (Keima) o un Salto de Un Espacio te coloca delante de la línea enemiga.',
        deepDive:
          'Kageyama resume este principio así: «Un paso adelante es luz; un paso atrás empujando al rival es oscuridad».',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 6, color: 'BLACK' },
            { x: 3, y: 5, color: 'BLACK' },
            { x: 4, y: 6, color: 'WHITE' },
            { x: 4, y: 5, color: 'WHITE' },
            { x: 2, y: 6, color: 'BLACK' },
          ],
          markers: [
            { x: 3, y: 4, type: 'SUCCESS', label: '1' },
            { x: 4, y: 4, type: 'CIRCLE', label: 'a' },
          ],
          caption:
            'Tomar la cabeza en D5 o saltar adelante impide que Blanco doble en la cabeza de tus piedras.',
        },
      },
    ],
    demonstration: {
      title: 'Demostración: Saltar Adelante para Romper el Bloqueo en 2ª Línea',
      size: 9,
      steps: [
        {
          title: '1. Tres piedras negras comprimidas en la segunda línea',
          narration:
            'Blanco ha presionado en C3, D3 y E3. Si Negro se arrastra en F2, Blanco seguirá bloqueando en F3.',
          stones: [
            { x: 2, y: 7, color: 'BLACK' },
            { x: 3, y: 7, color: 'BLACK' },
            { x: 4, y: 7, color: 'BLACK' },
            { x: 2, y: 6, color: 'WHITE' },
            { x: 3, y: 6, color: 'WHITE' },
            { x: 4, y: 6, color: 'WHITE' },
            { x: 1, y: 7, color: 'WHITE' },
          ],
          turn: 'BLACK',
        },
        {
          title: '2. Negro salta directamente a F4 y toma la delantera',
          narration:
            'Con F4 (x=5, y=5), Negro se adelanta al muro blanco. Si Blanco corta en F3, Negro conecta en F2 y su piedra F4 ya domina el centro.',
          stones: [
            { x: 2, y: 7, color: 'BLACK' },
            { x: 3, y: 7, color: 'BLACK' },
            { x: 4, y: 7, color: 'BLACK' },
            { x: 2, y: 6, color: 'WHITE' },
            { x: 3, y: 6, color: 'WHITE' },
            { x: 4, y: 6, color: 'WHITE' },
            { x: 1, y: 7, color: 'WHITE' },
            { x: 5, y: 5, color: 'BLACK' },
          ],
          lastMove: { x: 5, y: 5 },
          markers: [{ x: 5, y: 5, type: 'SUCCESS', label: '!' }],
          turn: 'WHITE',
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l40-gd-1',
        prompt:
          'Deja de arrastrarte en la segunda línea. Juega el salto hacia el centro que toma la delantera frente al muro blanco C3–D3–E3.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 7, color: 'BLACK' },
          { x: 3, y: 7, color: 'BLACK' },
          { x: 4, y: 7, color: 'BLACK' },
          { x: 2, y: 6, color: 'WHITE' },
          { x: 3, y: 6, color: 'WHITE' },
          { x: 4, y: 6, color: 'WHITE' },
          { x: 1, y: 7, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 5, y: 5 }],
        correctFeedback:
          '¡Salto magistral a F4! Dejas atrás la línea de la derrota y tomas la iniciativa en el centro.',
        wrongFeedback: {
          '5,7': 'Arrastrarte en F2 regala más influencia a Blanco en F3.',
          '5,6': 'Empujar en F3 permite que Blanco te bloquee en la cabeza en F4.',
        },
        defaultWrongFeedback: 'Salta adelante hacia el centro jugando en F4 (x=5, y=5).',
        hints: [
          'Apunta a la cabeza de la línea blanca en la cuarta línea.',
          'Juega en F4 (x=5, y=5).',
        ],
      },
    ],
    independentPractice: [
      {
        id: 'l40-prac-1',
        prompt:
          'Ejercicio 1: Blanco intentó cortar en F3 tras tu salto a F4. Conecta sólidamente tus piedras de abajo para dejar a F3 aislada.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 7, color: 'BLACK' },
          { x: 3, y: 7, color: 'BLACK' },
          { x: 4, y: 7, color: 'BLACK' },
          { x: 5, y: 5, color: 'BLACK' },
          { x: 2, y: 6, color: 'WHITE' },
          { x: 3, y: 6, color: 'WHITE' },
          { x: 4, y: 6, color: 'WHITE' },
          { x: 5, y: 6, color: 'WHITE' },
          { x: 1, y: 7, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 5, y: 7 }],
        correctFeedback:
          '¡Conexión firme en F2! Tu grupo inferior está a salvo y tu piedra en F4 lidera en el centro.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Protege el corte inferior jugando en F2 (x=5, y=7).',
        hints: [
          'Impide que Blanco baje a F2 con atari.',
          'Juega en F2 (x=5, y=7).',
        ],
      },
      {
        id: 'l40-prac-2',
        prompt:
          'Ejercicio 2: Dos columnas luchan hacia el centro (D3–D4 contra E3–E4). Dobla en la cabeza de las dos piedras blancas (Hane) para tomar la delantera.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 6, color: 'BLACK' },
          { x: 3, y: 5, color: 'BLACK' },
          { x: 2, y: 6, color: 'BLACK' },
          { x: 4, y: 6, color: 'WHITE' },
          { x: 4, y: 5, color: 'WHITE' },
          { x: 5, y: 6, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 4 }],
        correctFeedback:
          '¡Hane en la cabeza de dos piedras en E5! Tomas la delantera y detienes en seco el avance blanco.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Golpea la cabeza de la fila blanca jugando en E5 (x=4, y=4).',
        hints: [
          'Bloquea justo delante de la piedra blanca E4.',
          'Juega en E5 (x=4, y=4).',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'La segunda línea es la línea de la derrota: salta hacia la tercera o cuarta línea a la primera oportunidad.',
        'Nunca te limites a empujar desde atrás al mismo nivel que el enemigo; busca doblar en su cabeza o saltar adelante.',
        'Un salto de caballo o diagonal a tiempo transforma un grupo presionado en un grupo con iniciativa.',
      ],
      vocabulary: [
        {
          term: 'Nisen (Segunda línea)',
          japanese: '二線',
          definition: 'Línea baja llamada «la línea de la derrota» cuando se arrastra en ella durante la apertura o el medio juego.',
        },
        {
          term: 'Sente-dori (Tomar la delantera)',
          japanese: '先手取り',
          definition: 'Adelantarse al flujo de las piedras enemigas para dictar la dirección del combate.',
        },
      ],
    },
    transferQuestion: {
      id: 'l40-transfer',
      prompt:
        'Pregunta de transferencia: Tus piedras en el lado izquierdo están presionadas en B6–B5. Salta hacia el centro en D4 para tomar la delantera frente al muro blanco.',
      boardSize: 9,
      initialStones: [
        { x: 1, y: 2, color: 'BLACK' },
        { x: 1, y: 3, color: 'BLACK' },
        { x: 1, y: 4, color: 'BLACK' },
        { x: 2, y: 2, color: 'WHITE' },
        { x: 2, y: 3, color: 'WHITE' },
        { x: 2, y: 4, color: 'WHITE' },
        { x: 1, y: 1, color: 'WHITE' },
      ],
      turn: 'BLACK',
      exerciseType: 'PLACE_STONE',
      validCoords: [{ x: 3, y: 5 }, { x: 2, y: 5 }],
      correctFeedback:
        '¡Dominado! Sales hacia el centro antes de que Blanco pueda seguir sellándote en la segunda línea.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Salta adelante en D4 (x=3, y=5) o bloquea en C4 (x=2, y=5).',
      hints: [
        'No te arrastres en B4.',
        'Salta a D4 (x=3, y=5).',
      ],
    },
  },

  // ============================================================================
  // LECCIÓN 41 (Etapa 4 · Unidad 3 — Nivel Intermedio): Territorio vs. Esferas de Influencia y Uso del Grosor
  // ============================================================================
  {
    id: 'lesson-41-kageyama-esferas-influencia-uso-grosor',
    stageNumber: 4,
    stageTitle: '4. Apertura y dirección de juego',
    unitNumber: 3,
    unitTitle: 'Territorio frente a esferas de influencia y la regla de oro del grosor (Atsumi)',
    title: 'Territorio vs. Esferas de Influencia y la Regla del Grosor',
    subtitle:
      'Domina el Capítulo 5 de Kageyama: la diferencia exacta entre territorio contable y esfera de influencia, y la regla de oro: «No uses tu grosor (Atsumi) para rodear territorio; úsalo para atacar».',
    estimatedMinutes: 9,
    xpReward: 35,
    prerequisites: ['lesson-16-direccion-juego-valor-jugada'],
    relatedPuzzleIds: [
      'puzzle-30-empujar-hacia-muro',
      'puzzle-36-ataque-division-karami',
    ],
    observableObjective:
      'Al terminar, distinguirás el territorio firme de las esferas de influencia abiertas y usarás tu grosor exterior (Atsumi) para lanzar ataques de división en lugar de cerrar territorio pequeño.',
    activationQuestion: {
      question:
        'En el Capítulo 5 («Territory and Spheres of Influence»), ¿cuál es la máxima fundamental de Kageyama sobre cómo emplear un muro grueso o influencia exterior (Atsumi)?',
      options: [
        {
          id: 'a',
          text: '«No uses el grosor para hacer territorio directamente; usa el grosor para atacar grupos débiles del rival y empujarlos contra tu muro»',
          isCorrect: true,
          explanation:
            '¡Exacto! Cuando intentas rodear territorio justo al lado de un muro grueso, obtienes pocos puntos de forma ineficiente; cuando atacas al rival y lo persigues hacia tu muro, el territorio nace solo en el lado opuesto.',
        },
        {
          id: 'b',
          text: '«Usa siempre un muro de 6 piedras para encerrar 4 puntos de territorio al lado»',
          isCorrect: false,
          explanation:
            'Usar un muro poderoso para rodear unos pocos puntos es el mayor desperdicio estratégico en Go.',
        },
        {
          id: 'c',
          text: '«Cualquier área abierta en cuarta línea ya es territorio imposible de invadir»',
          isCorrect: false,
          explanation:
            'Kageyama explica que una esfera de influencia NO es territorio fijo: invita a ser invadida para que tu muro tenga a quién atacar.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. Territorio Firme vs. Esfera de Influencia (Seiryoku-ken)',
        body: 'Kageyama traza una distinción cristalina: el Territorio (Ji) es el espacio ya asegurado en esquinas y bordes bajos que el enemigo no puede invadir con vida; la Esfera de Influencia (Moyo) es un marco amplio proyectado por un muro exterior (Atsumi). Contar una esfera de influencia como si ya fuera territorio fijo lleva al error de defenderla pasivamente.',
        deepDive:
          'Si el oponente invade tu esfera de influencia, ¡alégrate! Esa piedra invasora es la presa perfecta para que tu muro grueso despliegue su verdadero poder de ataque.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 2, y: 2, color: 'BLACK' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 2, y: 1, color: 'WHITE' },
            { x: 3, y: 1, color: 'WHITE' },
            { x: 4, y: 1, color: 'WHITE' },
            { x: 6, y: 6, color: 'WHITE' },
          ],
          markers: [
            { x: 4, y: 6, type: 'SUCCESS', label: '1' },
            { x: 5, y: 3, type: 'DANGER', label: 'X' },
          ],
          caption:
            'Con el muro negro en C7–E7, jugar cerca en F6 (X) es pequeño; atacar a Blanco abajo en E3 (1) aprovecha todo el grosor.',
        },
      },
      {
        title: '2. Empujar al enemigo hacia tu muro como un «Pez en la Red»',
        body: 'Cuando posees un muro sólido (Atsumi), juega lejos de él, cerca de la piedra débil del enemigo. Al atacarla desde el lado opuesto a tu muro, obligas al grupo enemigo a huir precisamente en dirección a tu fortaleza, donde tu grosor le quitará ojos y libertades sin gastar jugadas extra.',
        deepDive:
          'Por el contrario, cuando el rival es quien tiene el muro grueso, mantente alejado de su influencia («No te acerques al grosor»).',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 2, y: 2, color: 'BLACK' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 4, y: 5, color: 'WHITE' },
            { x: 6, y: 6, color: 'BLACK' },
          ],
          markers: [{ x: 4, y: 6, type: 'SUCCESS', label: '★' }],
          caption:
            'Atacar desde abajo en E3 empuja a la piedra blanca E4 directamente contra el muro negro superior.',
        },
      },
    ],
    demonstration: {
      title: 'Demostración: Cómo usar el Grosor (Atsumi) para Atacar a Distancia',
      size: 9,
      steps: [
        {
          title: '1. Negro tiene un muro grueso en el norte (C7–D7–E7)',
          narration:
            'Blanco tomó el territorio pequeño del borde superior, pero Negro obtuvo un muro radiante hacia el sur y Blanco tiene una piedra suelta en G3.',
          stones: [
            { x: 2, y: 2, color: 'BLACK' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 2, y: 1, color: 'WHITE' },
            { x: 3, y: 1, color: 'WHITE' },
            { x: 4, y: 1, color: 'WHITE' },
            { x: 6, y: 6, color: 'WHITE' },
          ],
          turn: 'BLACK',
        },
        {
          title: '2. Negro ataca G3 jugando lejos de su muro',
          narration:
            'En vez de jugar pegado a su muro en la fila 6, Negro juega en E3 (x=4, y=6) o F5, quitando base a G3 y conduciéndolo hacia el muro.',
          stones: [
            { x: 2, y: 2, color: 'BLACK' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 2, y: 1, color: 'WHITE' },
            { x: 3, y: 1, color: 'WHITE' },
            { x: 4, y: 1, color: 'WHITE' },
            { x: 6, y: 6, color: 'WHITE' },
            { x: 4, y: 6, color: 'BLACK' },
          ],
          lastMove: { x: 4, y: 6 },
          markers: [{ x: 4, y: 6, type: 'SUCCESS', label: '!' }],
          turn: 'WHITE',
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l41-gd-1',
        prompt:
          'Tienes un muro grueso en C7–D7–E7. Aplica la regla de Kageyama: no cierres territorio pequeño junto al muro; juega lejos en el sur para presionar la piedra blanca G3.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 2, color: 'BLACK' },
          { x: 3, y: 2, color: 'BLACK' },
          { x: 4, y: 2, color: 'BLACK' },
          { x: 2, y: 1, color: 'WHITE' },
          { x: 3, y: 1, color: 'WHITE' },
          { x: 4, y: 1, color: 'WHITE' },
          { x: 6, y: 6, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 6 }, { x: 6, y: 4 }],
        correctFeedback:
          '¡Dirección profesional! Juegas lejos de tu grosor y conviertes la piedra blanca G3 en un blanco de ataque.',
        wrongFeedback: {
          '5,3': 'Jugar tan cerca de tu propio muro en F6 es sobreconcentración y desperdicia tu grosor.',
        },
        defaultWrongFeedback: 'Ataca a distancia en E3 (x=4, y=6) o G5 (x=6, y=4).',
        hints: [
          'Aléjate de tu muro norte y presiona la piedra blanca G3.',
          'Juega en E3 (x=4, y=6) o G5 (x=6, y=4).',
        ],
      },
    ],
    independentPractice: [
      {
        id: 'l41-prac-1',
        prompt:
          'Ejercicio 1: Blanco invadió en E4 frente a tu muro superior C7–D7–E7. Quítale su base inferior en E3 para obligarlo a correr hacia tu muro.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 2, color: 'BLACK' },
          { x: 3, y: 2, color: 'BLACK' },
          { x: 4, y: 2, color: 'BLACK' },
          { x: 4, y: 5, color: 'WHITE' },
          { x: 6, y: 6, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 6 }, { x: 3, y: 5 }],
        correctFeedback:
          '¡Excelente uso del Atsumi! Al golpear desde abajo en E3, empujas a la piedra blanca directamente contra tu fortaleza del norte.',
        wrongFeedback: {
          '4,3': 'Empujar desde tu propio muro en E6 ayuda a Blanco a hacer base abajo en E3.',
        },
        defaultWrongFeedback: 'Ataca desde el lado opuesto a tu muro jugando en E3 (x=4, y=6).',
        hints: [
          'No ataques desde tu muro; ataca hacia tu muro.',
          'Juega debajo de la piedra blanca en E3 (x=4, y=6).',
        ],
      },
      {
        id: 'l41-prac-2',
        prompt:
          'Ejercicio 2: Tienes dos grupos débiles blancos en C5 y G5, y un muro negro abajo. Juega el ataque de división (Splitting Attack) en el centro E5.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 6, color: 'BLACK' },
          { x: 4, y: 6, color: 'BLACK' },
          { x: 6, y: 6, color: 'BLACK' },
          { x: 2, y: 4, color: 'WHITE' },
          { x: 6, y: 4, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 4 }],
        correctFeedback:
          '¡Ataque de división en E5! Impides que las dos piedras blancas se unan y aprovechas tu muro inferior.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Divide las dos piedras blancas jugando en el centro E5 (x=4, y=4).',
        hints: [
          'Coloca tu piedra justo entre C5 y G5.',
          'Juega en E5 (x=4, y=4).',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'Territorio es el espacio cerrado y seguro; Esfera de Influencia es un potencial abierto proyectado por el grosor.',
        'Regla de oro de Kageyama: «Nunca uses el grosor (Atsumi) para rodear territorio pequeño; úsalo para atacar».',
        'Para aprovechar un muro propio, ataca al enemigo desde el lado opuesto y empújalo hacia tu muro.',
      ],
      vocabulary: [
        {
          term: 'Atsumi (Grosor / Fuerza exterior)',
          japanese: '厚み',
          definition: 'Formación sólida sin defectos de corte ni debilidades de ojos que irradia poder hacia todo el tablero.',
        },
        {
          term: 'Seiryoku-ken (Esfera de influencia)',
          japanese: '勢力圏',
          definition: 'Región amplia dominada por muros exteriores que sirve como campo de caza si el rival invade.',
        },
      ],
    },
    transferQuestion: {
      id: 'l41-transfer',
      prompt:
        'Pregunta de transferencia: Negro tiene un muro sólido en el oeste (C7–C5–C3) y Blanco tiene una piedra suelta en F5. ¿Desde qué lado debes presionar a F5 para empujarla contra tu muro?',
      boardSize: 9,
      initialStones: [
        { x: 2, y: 2, color: 'BLACK' },
        { x: 2, y: 4, color: 'BLACK' },
        { x: 2, y: 6, color: 'BLACK' },
        { x: 5, y: 4, color: 'WHITE' },
      ],
      turn: 'BLACK',
      exerciseType: 'PLACE_STONE',
      validCoords: [{ x: 6, y: 4 }, { x: 6, y: 3 }, { x: 6, y: 5 }],
      correctFeedback:
        '¡Dominado! Al atacar desde el este (columna G), quitas la base de Blanco en el borde derecho y lo conduces hacia tu muro occidental.',
      wrongFeedback: {
        '4,4': 'Jugar en E5 desde tu muro empuja a Blanco a hacer territorio cómodo en el borde derecho.',
      },
      defaultWrongFeedback: 'Ataca desde el lado derecho de F5 jugando en G5 (x=6, y=4).',
      hints: [
        'Juega entre la piedra blanca F5 y el borde derecho para empujarla hacia tu muro de la columna C.',
        'Juega en G5 (x=6, y=4).',
      ],
    },
  },

  // ============================================================================
  // LECCIÓN 42 (Etapa 6 · Unidad 5 — Nivel Intermedio): La Primera Regla de Vida y Muerte y Romper el Cerco
  // ============================================================================
  {
    id: 'lesson-42-kageyama-regla-fundamental-tsumego-cerco',
    stageNumber: 6,
    stageTitle: '6. Vida y muerte',
    unitNumber: 5,
    unitTitle: 'La primera regla del Tsumego («Hay muerte en el Hane») y romper el cerco hacia el aire fresco',
    title: 'La Primera Regla de Vida y Muerte y Romper el Cerco',
    subtitle:
      'Aprende el método sistemático del Capítulo 6 de Kageyama para resolver cualquier problema de Vida y Muerte: «Para matar, estrecha primero el espacio desde afuera (Hane) y luego ve al punto vital; para vivir, amplía primero tu espacio».',
    estimatedMinutes: 9,
    xpReward: 40,
    prerequisites: ['lesson-32-semeai-avanzado-estomago-ojos-grandes'],
    relatedPuzzleIds: [
      'puzzle-70-kageyama-hay-muerte-en-el-hane',
      'puzzle-71-kageyama-siete-abultado-esquina',
      'puzzle-74-kageyama-colocacion-cuatro-doblado',
    ],
    observableObjective:
      'Al terminar, resolverás problemas de Tsumego aplicando en orden: 1) Estrechar el espacio ocular con Hane exterior, y 2) Golpear el punto vital de simetría.',
    activationQuestion: {
      question:
        'En el Capítulo 6 («Life and Death»), ¿cuál es la Primera Regla Fundamental de Kageyama para matar un grupo enemigo?',
      options: [
        {
          id: 'a',
          text: 'Primero comprobar si se puede estrechar su espacio de ojos desde el exterior («Hay muerte en el Hane»), y segundo colocar en el punto vital interior',
          isCorrect: true,
          explanation:
            '¡Exacto! Kageyama enseña que casi todos los Tsumegos se resuelven con esa combinación de dos pasos: estrechar desde afuera con Hane y golpear después el punto vital.',
        },
        {
          id: 'b',
          text: 'Sacrificar siempre piedras dentro del grupo enemigo sin mirar el borde exterior',
          isCorrect: false,
          explanation:
            'Si juegas adentro sin estrechar antes cuando el borde está abierto, el enemigo simplemente se expandirá por fuera y hará dos ojos.',
        },
        {
          id: 'c',
          text: 'Rodea únicamente por la cuarta línea dejando libre la primera línea',
          isCorrect: false,
          explanation:
            'La primera línea es donde se deciden los ojos de esquina y costado; ahí es donde actúa el Hane reductor.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. «Hay Muerte en el Hane»: Estrechar antes de golpear el punto vital',
        body: 'Cuando quieras matar un grupo enemigo, aplica el algoritmo de dos pasos de Kageyama: Paso 1: Revisa los bordes exteriores del grupo y estrecha su base con un Hane en primera o segunda línea. Paso 2: Una vez reducido el espacio a una forma crítica (de 3, 4 o 5 puntos), golpea el Punto Vital central.',
        deepDive:
          'Y si te toca defender para vivir, aplica la regla inversa: Paso 1: Amplía tu espacio ocular todo lo posible hacia los lados; Paso 2: Si ampliar no basta, protege directamente tu punto vital interior.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 1, y: 0, color: 'WHITE' },
            { x: 1, y: 1, color: 'WHITE' },
            { x: 2, y: 1, color: 'WHITE' },
            { x: 3, y: 1, color: 'WHITE' },
            { x: 4, y: 0, color: 'WHITE' },
            { x: 0, y: 1, color: 'BLACK' },
            { x: 1, y: 2, color: 'BLACK' },
            { x: 2, y: 2, color: 'BLACK' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 5, y: 1, color: 'BLACK' },
          ],
          markers: [
            { x: 5, y: 0, type: 'SUCCESS', label: '1' },
            { x: 2, y: 0, type: 'CIRCLE', label: '2' },
          ],
          caption:
            'Paso 1: Hane exterior en F9 (1) para estrechar; Paso 2: Punto vital interior en C9 (2).',
        },
      },
      {
        title: '2. Romper el cerco hacia el «Aire Fresco» cuando no hay ojos locales',
        body: 'Kageyama advierte que el Tsumego en partida real no ocurre en el vacío: si el espacio local no alcanza para formar dos ojos, busca una debilidad en la red que te rodea (un punto de corte o falta de libertades enemiga) para romper el cerco hacia el aire fresco del centro.',
        deepDive:
          'Incluso ganar una o dos libertades extra contra las piedras que te rodean puede permitirte dar doble atari y escapar.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 0, y: 1, color: 'BLACK' },
            { x: 1, y: 1, color: 'BLACK' },
            { x: 2, y: 1, color: 'BLACK' },
            { x: 3, y: 0, color: 'BLACK' },
            { x: 3, y: 1, color: 'BLACK' },
            { x: 0, y: 2, color: 'WHITE' },
            { x: 1, y: 2, color: 'WHITE' },
            { x: 2, y: 2, color: 'WHITE' },
            { x: 3, y: 2, color: 'WHITE' },
            { x: 4, y: 0, color: 'WHITE' },
            { x: 4, y: 1, color: 'WHITE' },
          ],
          markers: [{ x: 1, y: 0, type: 'SUCCESS', label: '★' }],
          caption:
            'El punto vital B9 sirve tanto a Negro para vivir con dos ojos como a Blanco (Oki) para matar.',
        },
      },
    ],
    demonstration: {
      title: 'Demostración: La Regla de Dos Pasos de Kageyama (Hane + Punto Vital)',
      size: 9,
      steps: [
        {
          title: '1. Blanco parece tener espacio suficiente en el borde superior',
          narration:
            'Si Negro juega directamente adentro en C9, Blanco extiende a F9 y forma dos ojos separados.',
          stones: [
            { x: 1, y: 0, color: 'WHITE' },
            { x: 1, y: 1, color: 'WHITE' },
            { x: 2, y: 1, color: 'WHITE' },
            { x: 3, y: 1, color: 'WHITE' },
            { x: 4, y: 0, color: 'WHITE' },
            { x: 0, y: 1, color: 'BLACK' },
            { x: 1, y: 2, color: 'BLACK' },
            { x: 2, y: 2, color: 'BLACK' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 5, y: 1, color: 'BLACK' },
          ],
          turn: 'BLACK',
        },
        {
          title: '2. Paso 1: Hane exterior en F9 para estrechar',
          narration:
            'Negro juega F9 (x=5, y=0) amenazando cortar en E8. Blanco está obligado a conectar en E8.',
          stones: [
            { x: 1, y: 0, color: 'WHITE' },
            { x: 1, y: 1, color: 'WHITE' },
            { x: 2, y: 1, color: 'WHITE' },
            { x: 3, y: 1, color: 'WHITE' },
            { x: 4, y: 0, color: 'WHITE' },
            { x: 0, y: 1, color: 'BLACK' },
            { x: 1, y: 2, color: 'BLACK' },
            { x: 2, y: 2, color: 'BLACK' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 5, y: 1, color: 'BLACK' },
            { x: 5, y: 0, color: 'BLACK' },
          ],
          lastMove: { x: 5, y: 0 },
          turn: 'WHITE',
        },
        {
          title: '3. Paso 2: Golpe en el punto vital C9',
          narration:
            'Tras la conexión blanca en E8, Negro golpea C9 (x=2, y=0) y el grupo blanco muere con un solo ojo.',
          stones: [
            { x: 1, y: 0, color: 'WHITE' },
            { x: 1, y: 1, color: 'WHITE' },
            { x: 2, y: 1, color: 'WHITE' },
            { x: 3, y: 1, color: 'WHITE' },
            { x: 4, y: 0, color: 'WHITE' },
            { x: 4, y: 1, color: 'WHITE' },
            { x: 0, y: 1, color: 'BLACK' },
            { x: 1, y: 2, color: 'BLACK' },
            { x: 2, y: 2, color: 'BLACK' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 5, y: 1, color: 'BLACK' },
            { x: 5, y: 0, color: 'BLACK' },
            { x: 2, y: 0, color: 'BLACK' },
          ],
          lastMove: { x: 2, y: 0 },
          markers: [{ x: 2, y: 0, type: 'SUCCESS', label: '!' }],
          turn: 'WHITE',
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l42-gd-1',
        prompt:
          'Aplica el Paso 1 de la Regla Fundamental de Kageyama: estrecha el espacio del grupo blanco desde el exterior con Hane antes de ir al punto vital.',
        boardSize: 9,
        initialStones: [
          { x: 1, y: 0, color: 'WHITE' },
          { x: 1, y: 1, color: 'WHITE' },
          { x: 2, y: 1, color: 'WHITE' },
          { x: 3, y: 1, color: 'WHITE' },
          { x: 4, y: 0, color: 'WHITE' },
          { x: 0, y: 1, color: 'BLACK' },
          { x: 1, y: 2, color: 'BLACK' },
          { x: 2, y: 2, color: 'BLACK' },
          { x: 3, y: 2, color: 'BLACK' },
          { x: 4, y: 2, color: 'BLACK' },
          { x: 5, y: 1, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 5, y: 0 }],
        correctFeedback:
          '¡Exacto! «Hay muerte en el Hane»: F9 obliga a Blanco a defender E8 y deja listo el golpe en C9.',
        wrongFeedback: {
          '2,0': 'Ir directamente a C9 permite a Blanco extender a F9 y vivir.',
        },
        defaultWrongFeedback: 'Estrecha primero desde el exterior con Hane en F9 (x=5, y=0).',
        hints: [
          'Mira el borde derecho del grupo blanco en la primera línea.',
          'Juega en F9 (x=5, y=0).',
        ],
      },
    ],
    independentPractice: [
      {
        id: 'l42-prac-1',
        prompt:
          'Ejercicio 1: Blanco ya conectó en E8 tras tu Hane en F9. Ahora ejecuta el Paso 2: golpea el punto vital interior para matar al grupo blanco.',
        boardSize: 9,
        initialStones: [
          { x: 1, y: 0, color: 'WHITE' },
          { x: 1, y: 1, color: 'WHITE' },
          { x: 2, y: 1, color: 'WHITE' },
          { x: 3, y: 1, color: 'WHITE' },
          { x: 4, y: 0, color: 'WHITE' },
          { x: 4, y: 1, color: 'WHITE' },
          { x: 0, y: 1, color: 'BLACK' },
          { x: 1, y: 2, color: 'BLACK' },
          { x: 2, y: 2, color: 'BLACK' },
          { x: 3, y: 2, color: 'BLACK' },
          { x: 4, y: 2, color: 'BLACK' },
          { x: 5, y: 1, color: 'BLACK' },
          { x: 5, y: 0, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 2, y: 0 }],
        correctFeedback:
          '¡Golpe vital en C9! El espacio interior era un Tres Recto y Blanco queda con un solo ojo.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Juega en el centro del espacio de tres puntos: C9 (x=2, y=0).',
        hints: [
          'Las tres intersecciones vacías son B9–C9–D9 (C9 en el centro).',
          'Juega en C9 (x=2, y=0).',
        ],
      },
      {
        id: 'l42-prac-2',
        prompt:
          'Ejercicio 2: Juega con Negro para vivir en la esquina ocupando el punto vital antes de que Blanco te lo robe.',
        boardSize: 9,
        initialStones: [
          { x: 0, y: 1, color: 'BLACK' },
          { x: 1, y: 1, color: 'BLACK' },
          { x: 2, y: 1, color: 'BLACK' },
          { x: 3, y: 0, color: 'BLACK' },
          { x: 3, y: 1, color: 'BLACK' },
          { x: 0, y: 2, color: 'WHITE' },
          { x: 1, y: 2, color: 'WHITE' },
          { x: 2, y: 2, color: 'WHITE' },
          { x: 3, y: 2, color: 'WHITE' },
          { x: 4, y: 0, color: 'WHITE' },
          { x: 4, y: 1, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 1, y: 0 }],
        correctFeedback:
          '¡Vida incondicional en B9! Divides tu esquina en dos ojos limpios en A9 y C9.',
        wrongFeedback: {
          '2,0': 'Jugar en C9 permite a Blanco colocarse en B9 y matarte.',
        },
        defaultWrongFeedback: 'Ocupa el punto vital B9 (x=1, y=0).',
        hints: [
          'Divide las tres casillas vacías A9–B9–C9 por el medio.',
          'Juega en B9 (x=1, y=0).',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'Primera Regla para Matar: 1) Estrechar el espacio desde el exterior («Hay muerte en el Hane»), y 2) Golpear el punto vital interior.',
        'Primera Regla para Vivir: 1) Ampliar el espacio de ojos al máximo, y 2) Proteger el punto vital que divide los dos ojos.',
        'Cuando el espacio local es insuficiente para vivir, busca los cortes del cerco enemigo para escapar al aire fresco.',
      ],
      vocabulary: [
        {
          term: 'Hane ni shi ari (Hay muerte en el Hane)',
          japanese: 'ハネに死あり',
          definition: 'Proverbio clásico de Tsumego que recuerda reducir primero desde afuera con Hane para matar un grupo.',
        },
        {
          term: 'Kyusho (Punto vital)',
          japanese: '急所',
          definition: 'La intersección clave donde un grupo vive si la ocupa el defensor o muere si la ocupa el atacante.',
        },
      ],
    },
    transferQuestion: {
      id: 'l42-transfer',
      prompt:
        'Pregunta de transferencia: Blanco intenta vivir en la esquina superior izquierda. Coloca tu piedra en el punto vital de la primera línea para impedir que forme dos ojos.',
      boardSize: 9,
      initialStones: [
        { x: 0, y: 1, color: 'WHITE' },
        { x: 1, y: 1, color: 'WHITE' },
        { x: 2, y: 1, color: 'WHITE' },
        { x: 3, y: 0, color: 'WHITE' },
        { x: 3, y: 1, color: 'WHITE' },
        { x: 0, y: 2, color: 'BLACK' },
        { x: 1, y: 2, color: 'BLACK' },
        { x: 2, y: 2, color: 'BLACK' },
        { x: 3, y: 2, color: 'BLACK' },
        { x: 4, y: 0, color: 'BLACK' },
        { x: 4, y: 1, color: 'BLACK' },
      ],
      turn: 'BLACK',
      exerciseType: 'PLACE_STONE',
      validCoords: [{ x: 1, y: 0 }],
      correctFeedback:
        '¡Dominado! La colocación en B9 roba el punto vital y destruye la vida del grupo blanco.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Coloca tu piedra directamente en B9 (x=1, y=0).',
      hints: [
        'Apunta al punto central de la primera línea en la esquina.',
        'Juega en B9 (x=1, y=0).',
      ],
    },
  },

  // ============================================================================
  // LECCIÓN 43 (Etapa 8 · Unidad 5 — Nivel Avanzado): El Estudio Vivo del Joseki y Castigo a Desviaciones
  // ============================================================================
  {
    id: 'lesson-43-kageyama-crear-joseki-armonia-global',
    stageNumber: 8,
    stageTitle: '8. Combate y medio juego',
    unitNumber: 5,
    unitTitle: 'Cómo estudiar Joseki: castigar desviaciones y adaptar la esquina al tablero global',
    title: 'El Estudio Vivo del Joseki y el Castigo a las Desviaciones',
    subtitle:
      'Comprende la filosofía del Capítulo 7 de Kageyama («How to Study Joseki»): por qué un Joseki memorizado sin entender sus variantes de castigo es inútil, y por qué «los Joseki no se memorizan: se crean en armonía con todo el tablero».',
    estimatedMinutes: 9,
    xpReward: 45,
    prerequisites: ['lesson-33-dentro-territorio-enemigo-escape-muro'],
    relatedPuzzleIds: [
      'puzzle-51-tesuji-pinza-hasamitsuke',
      'puzzle-62-cuna-territorio-warikomi',
    ],
    observableObjective:
      'Al terminar, sabrás castigar una desviación de Joseki cuando el rival omite una jugada necesaria y elegirás la continuación local que mejor coordine con tus piedras vecinas.',
    activationQuestion: {
      question:
        'Según Toshiro Kageyama en el Capítulo 7, ¿por qué aprender de memoria el orden principal de un Joseki hace a muchos aficionados más débiles en lugar de más fuertes?',
      options: [
        {
          id: 'a',
          text: 'Porque si el rival se desvía del Joseki no saben cómo castigarlo, y además repiten el mismo Joseki aunque choque con las piedras del resto del tablero',
          isCorrect: true,
          explanation:
            '¡Exacto! Kageyama afirma: «Estudiar Joseki significa aprender por qué cada jugada es necesaria y cómo refutar las jugadas que se desvían; y en la partida real, elegir o modificar el Joseki según el tablero entero».',
        },
        {
          id: 'b',
          text: 'Porque los profesionales nunca juegan en las esquinas durante la apertura',
          isCorrect: false,
          explanation:
            'Los profesionales conocen miles de Joseki, pero los adaptan flexiblemente al contexto global.',
        },
        {
          id: 'c',
          text: 'Porque cualquier secuencia jugada en una esquina da siempre un resultado 50-50 sin importar el resto del tablero',
          isCorrect: false,
          explanation:
            'Un Joseki que es 50-50 en una esquina aislada puede ser un desastre total si construye un muro hacia donde el enemigo ya es fuerte.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. Conocer un Joseki significa saber castigar sus desviaciones',
        body: 'Un Joseki es un equilibrio local donde cada jugada tiene una razón táctica precisa. Si tu oponente juega una variante codiciosa o hace Tenuki (juega en otro lado) antes de terminar una defensa obligatoria del Joseki, debes conocer el golpe exacto que castiga esa omisión.',
        deepDive:
          'Si el rival se sale del Joseki y tú no logras obtener ventaja contra su jugada incorrecta, entonces aún no has comprendido ese Joseki.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 2, y: 2, color: 'WHITE' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 2, y: 3, color: 'BLACK' },
            { x: 3, y: 1, color: 'WHITE' },
          ],
          markers: [{ x: 3, y: 3, type: 'SUCCESS', label: '1' }],
          caption:
            'Cuando Blanco corta o presiona sin base, Negro conecta con solidez en D6 (1) dejando a Blanco dividido.',
        },
      },
      {
        title: '2. «Los Joseki no están para memorizarse, sino para crearse»',
        body: 'Al elegir cómo responder en una esquina, levanta la vista hacia las otras tres esquinas y los costados: si ya tienes un marco en el lado derecho, elige una variante que construya un muro mirando hacia la derecha; si el rival ya tiene un muro fuerte allí, elige una variante tranquila que tome territorio en la esquina y evite crear una pelea desfavorable.',
        deepDive:
          'Kageyama cita a los grandes maestros: la jugada perfecta en una esquina cambia en cuanto se añade una sola piedra en el costado vecino.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 2, y: 2, color: 'WHITE' },
            { x: 2, y: 3, color: 'BLACK' },
            { x: 3, y: 3, color: 'BLACK' },
            { x: 6, y: 2, color: 'BLACK' },
          ],
          markers: [{ x: 3, y: 2, type: 'SUCCESS', label: '★' }],
          caption:
            'Con la piedra negra ya situada en G7, bloquear o presionar por arriba en D7 coordina todo el costado superior.',
        },
      },
    ],
    demonstration: {
      title: 'Demostración: Castigar una Desviación en la Esquina',
      size: 9,
      steps: [
        {
          title: '1. Blanco deja su forma de esquina sin defender',
          narration:
            'Blanco jugó C7 y D8, pero omitió conectar su defecto entre C7 y D8.',
          stones: [
            { x: 2, y: 2, color: 'WHITE' },
            { x: 3, y: 1, color: 'WHITE' },
            { x: 2, y: 3, color: 'BLACK' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
          ],
          turn: 'BLACK',
        },
        {
          title: '2. Negro corta en C8 castigando la omisión',
          narration:
            'Negro juega C8 (x=2, y=1), separando por completo las dos piedras blancas y destruyendo la esquina de Blanco.',
          stones: [
            { x: 2, y: 2, color: 'WHITE' },
            { x: 3, y: 1, color: 'WHITE' },
            { x: 2, y: 3, color: 'BLACK' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 2, y: 1, color: 'BLACK' },
          ],
          lastMove: { x: 2, y: 1 },
          markers: [{ x: 2, y: 1, type: 'SUCCESS', label: '!' }],
          turn: 'WHITE',
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l43-gd-1',
        prompt:
          'Blanco hizo Tenuki en mitad del Joseki dejando desconectadas sus piedras C7 y D8. Castiga su desviación cortando en el punto vital.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 2, color: 'WHITE' },
          { x: 3, y: 1, color: 'WHITE' },
          { x: 2, y: 3, color: 'BLACK' },
          { x: 3, y: 2, color: 'BLACK' },
          { x: 4, y: 2, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 2, y: 1 }],
        correctFeedback:
          '¡Castigo exacto en C8! Separas C7 de D8 y capturas la esquina.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Corta el defecto de Blanco jugando en C8 (x=2, y=1).',
        hints: [
          'Mira el punto de corte entre C7 y D8.',
          'Juega en C8 (x=2, y=1).',
        ],
      },
    ],
    independentPractice: [
      {
        id: 'l43-prac-1',
        prompt:
          'Ejercicio 1: Ya tienes una piedra negra en G7 en el lado superior. Elige el bloqueo en D7 que construye un marco armónico con G7.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 2, color: 'WHITE' },
          { x: 2, y: 3, color: 'BLACK' },
          { x: 3, y: 3, color: 'BLACK' },
          { x: 6, y: 2, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 3, y: 2 }, { x: 4, y: 2 }],
        correctFeedback:
          '¡Armonía global! Al presionar desde D7 sellas a Blanco en la esquina y conectas tu influencia con G7.',
        wrongFeedback: {
          '1,3': 'Jugar en B6 deja a Blanco extender cómodamente hacia el costado superior.',
        },
        defaultWrongFeedback: 'Presiona en D7 (x=3, y=2) para coordinar con tu piedra G7.',
        hints: [
          'Construye hacia tu piedra amiga en G7.',
          'Juega en D7 (x=3, y=2).',
        ],
      },
      {
        id: 'l43-prac-2',
        prompt:
          'Ejercicio 2: Blanco intentó cortar imprudentemente en D6. Conecta o extiende en C7 para castigar su sobreextensión.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 3, color: 'BLACK' },
          { x: 3, y: 2, color: 'BLACK' },
          { x: 4, y: 3, color: 'BLACK' },
          { x: 3, y: 3, color: 'WHITE' },
          { x: 3, y: 4, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 2, y: 2 }],
        correctFeedback:
          '¡Sólido y severo en C7! Tus piedras quedan unidas y las dos piedras blancas quedan sin base.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Conecta tus dos piedras jugando en C7 (x=2, y=2).',
        hints: [
          'Une C6 con D7 en el ángulo superior.',
          'Juega en C7 (x=2, y=2).',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'Aprender un Joseki exige comprender el propósito de cada jugada y saber cómo castigar las desviaciones del rival.',
        'Un resultado que es equitativo en una esquina vacía puede ser malo si contradice las piedras vecinas del tablero.',
        '«Los Joseki no están para memorizarse ciegamente, sino para crearse en cada partida».',
      ],
      vocabulary: [
        {
          term: 'Joseki (Secuencia equitativa de esquina)',
          japanese: '定石',
          definition: 'Patrón establecido de jugadas de apertura en la esquina que produce un resultado equilibrado localmente.',
        },
        {
          term: 'Togame (Castigo / Refutación)',
          japanese: '咎め',
          definition: 'Secuencia táctica que explota un error de orden de jugadas o una omisión del oponente.',
        },
      ],
    },
    transferQuestion: {
      id: 'l43-transfer',
      prompt:
        'Pregunta de transferencia: Blanco jugó una aproximación excesiva en F7 junto a tu rincón G7–F6. Corta o separa su piedra jugando en E7.',
      boardSize: 9,
      initialStones: [
        { x: 6, y: 2, color: 'BLACK' },
        { x: 5, y: 3, color: 'BLACK' },
        { x: 5, y: 2, color: 'WHITE' },
        { x: 3, y: 2, color: 'WHITE' },
      ],
      turn: 'BLACK',
      exerciseType: 'PLACE_STONE',
      validCoords: [{ x: 4, y: 2 }, { x: 5, y: 1 }],
      correctFeedback:
        '¡Dominado! Castigas la piedra blanca F7 quitándole el enlace o la base en la esquina.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Interfiere entre D7 y F7 jugando en E7 (x=4, y=2) o bloquea en F8 (x=5, y=1).',
      hints: [
        'Separa la piedra blanca F7 de su compañera D7.',
        'Juega en E7 (x=4, y=2).',
      ],
    },
  },

  // ============================================================================
  // LECCIÓN 44 (Etapa 9 · Unidad 2 — Nivel Avanzado): Psicología del Yose, Doble Sente y el Salto del Mono
  // ============================================================================
  {
    id: 'lesson-44-kageyama-psicologia-yose-doble-sente',
    stageNumber: 9,
    stageTitle: '9. Sentido global (Fuseki)',
    unitNumber: 2,
    unitTitle: 'La psicología del Yose («Tú ve por tu camino y yo por el mío»), Doble Sente y trampas en el borde',
    title: 'Psicología del Yose, Doble Sente y Trampas del Borde',
    subtitle:
      'Aprende el Capítulo 11 y el Apéndice de Kageyama (su victoria contra el Meijin Rin Kaiho): la actitud activa en el final («Tú ve por tu camino y yo iré por el mío»), el valor real de los Hanes en primera línea y los tesujis ocultos en el Yose.',
    estimatedMinutes: 9,
    xpReward: 45,
    prerequisites: ['lesson-22-estrategia-ko-hanami-dos-etapas'],
    relatedPuzzleIds: [
      'puzzle-76-kageyama-yose-hana-tsuke-borde',
      'puzzle-46-punto-union-moyo',
    ],
    observableObjective:
      'Al terminar, dejarás de seguir dócilmente al rival en Gote durante el Yose, tomarás primero los puntos de Doble Sente y ejecutarás reducciones profundas en la primera línea.',
    activationQuestion: {
      question:
        'En el Capítulo 11 («Endgame»), ¿qué actitud psicológica distingue al maestro del aficionado cuando el oponente juega una reducción en el borde que NO es estrictamente Sente?',
      options: [
        {
          id: 'a',
          text: 'Decir «Tú ve por tu camino y yo iré por el mío»: en lugar de responder sumisamente en Gote, jugar primero el punto más grande o de Doble Sente en otro borde',
          isCorrect: true,
          explanation:
            '¡Exacto! Kageyama explica que el mayor defecto del aficionado en el Yose es seguir al rival como una sombra respondiendo a cada jugada aunque no sea una amenaza vital.',
        },
        {
          id: 'b',
          text: 'Responder automáticamente en el mismo lugar a absolutamente todas las jugadas del rival hasta el final',
          isCorrect: false,
          explanation:
            'Quien responde a cada jugada gote del rival nunca toma la iniciativa y pierde todos los grandes puntos del final.',
        },
        {
          id: 'c',
          text: 'Ignorar también los ataques que matan a todo tu grupo principal',
          isCorrect: false,
          explanation:
            'Siempre debes calcular primero si la jugada rival es Sente real (amenaza matar o penetrar profundamente) o si puedes hacer Tenuki.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. «Tú ve por tu camino y yo por el mío»: Prioridad del Doble Sente',
        body: 'En el Yose (final de partida), las jugadas se ordenan así: 1º Doble Sente (Sente para ambos bandos), 2º Sente para uno de los jugadores (como el Salto del Mono / Saru-suberi de 9 puntos), y 3º Gote grande. Cuando el rival juegue un Gote en un borde, resiste el reflejo de contestarle por inercia si aún queda un Doble Sente o un Sente mayor en otra parte.',
        deepDive:
          'En su famosa victoria contra el Meijin Rin Kaiho (incluida en el Apéndice del libro), Kageyama demuestra que mantener la calma y ceñirse a los fundamentos del conteo vence incluso a los mayores campeones.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 2, y: 1, color: 'WHITE' },
            { x: 3, y: 1, color: 'WHITE' },
            { x: 3, y: 2, color: 'WHITE' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 5, y: 1, color: 'BLACK' },
            { x: 5, y: 0, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
          ],
          markers: [
            { x: 3, y: 0, type: 'SUCCESS', label: '1' },
            { x: 4, y: 1, type: 'DANGER', label: 'X' },
          ],
          caption:
            'Entrar hasta D9 (1) aprovecha que Blanco no puede cortar en E8; empujar en E8 (X) regalaría puntos a Blanco.',
        },
      },
      {
        title: '2. Trampas ocultas tras el Hane y Conexión en primera línea',
        body: 'Un Hane y conexión estándar en el borde parece sencillo, pero si las piedras defensoras tienen pocas libertades (Damezumari) o puntos de corte en segunda línea, existen tesujis de Pinza (Clamp), salto de un punto en primera línea o contacto bajo la piedra que arrebatan entre 4 y 10 puntos extra.',
        deepDive:
          'Antes de jugar el empuje rutinario desde afuera en el Yose, pregúntate siempre: «¿Puedo ir un punto más lejos en la primera línea sin que el rival pueda cortarme?».',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 2, y: 1, color: 'WHITE' },
            { x: 3, y: 1, color: 'WHITE' },
            { x: 3, y: 2, color: 'WHITE' },
            { x: 3, y: 0, color: 'BLACK' },
            { x: 2, y: 0, color: 'WHITE' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 5, y: 1, color: 'BLACK' },
            { x: 5, y: 0, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
          ],
          markers: [{ x: 4, y: 0, type: 'SUCCESS', label: '3' }],
          caption:
            'Cuando Blanco bloquea en C9, Negro conecta limpiamente en E9 (3) porque E8 sería auto-atari para Blanco.',
        },
      },
    ],
    demonstration: {
      title: 'Demostración: El Tesuji de Primera Línea que Gana Puntos Extra en el Yose',
      size: 9,
      steps: [
        {
          title: '1. Frontera superior aparentemente normal',
          narration:
            'Un jugador descuidado empujaría en E8 ayudando a Blanco a bloquear en D9. Pero observa que si Blanco juega E8 queda en atari.',
          stones: [
            { x: 2, y: 1, color: 'WHITE' },
            { x: 3, y: 1, color: 'WHITE' },
            { x: 3, y: 2, color: 'WHITE' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 5, y: 1, color: 'BLACK' },
            { x: 5, y: 0, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
          ],
          turn: 'BLACK',
        },
        {
          title: '2. Negro salta directamente a D9 en la primera línea',
          narration:
            'Con D9 (x=3, y=0), Negro se desliza bajo la piedra blanca D8. Blanco no puede cortar en E8 y debe retroceder a C9.',
          stones: [
            { x: 2, y: 1, color: 'WHITE' },
            { x: 3, y: 1, color: 'WHITE' },
            { x: 3, y: 2, color: 'WHITE' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 5, y: 1, color: 'BLACK' },
            { x: 5, y: 0, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 3, y: 0, color: 'BLACK' },
          ],
          lastMove: { x: 3, y: 0 },
          markers: [{ x: 3, y: 0, type: 'SUCCESS', label: '!' }],
          turn: 'WHITE',
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l44-gd-1',
        prompt:
          'No empujes rutinariamente en E8. Entra un punto más profundo en la primera línea aprovechando que Blanco no puede cortar en E8.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 1, color: 'WHITE' },
          { x: 3, y: 1, color: 'WHITE' },
          { x: 3, y: 2, color: 'WHITE' },
          { x: 4, y: 2, color: 'BLACK' },
          { x: 5, y: 1, color: 'BLACK' },
          { x: 5, y: 0, color: 'BLACK' },
          { x: 4, y: 3, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 3, y: 0 }],
        correctFeedback:
          '¡Yose de maestro en D9! Ganas 2 puntos extra en sente porque Blanco no puede cortar en E8.',
        wrongFeedback: {
          '4,1': 'Empujar en E8 regala a Blanco el bloqueo sólido en D9.',
        },
        defaultWrongFeedback: 'Juega directamente en la primera línea: D9 (x=3, y=0).',
        hints: [
          'Mira debajo de la piedra blanca D8.',
          'Juega en D9 (x=3, y=0).',
        ],
      },
    ],
    independentPractice: [
      {
        id: 'l44-prac-1',
        prompt:
          'Ejercicio 1: Blanco jugó una jugada pequeña en el sur, pero en el borde superior el punto E9 es Doble Sente (amenaza entrar en ambas esquinas). Toma el Doble Sente en el norte.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 1, color: 'BLACK' },
          { x: 2, y: 2, color: 'BLACK' },
          { x: 6, y: 1, color: 'WHITE' },
          { x: 6, y: 2, color: 'WHITE' },
          { x: 2, y: 7, color: 'BLACK' },
          { x: 6, y: 7, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 1 }, { x: 5, y: 0 }],
        correctFeedback:
          '¡Excelente sentido del Yose! Tomas la iniciativa en el borde superior presionando el territorio blanco en sente.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Avanza en el borde superior jugando en E8 (x=4, y=1) o F9 (x=5, y=0).',
        hints: [
          'Apunta a la frontera superior hacia la esquina blanca de G8.',
          'Juega en E8 (x=4, y=1) o F9 (x=5, y=0).',
        ],
      },
      {
        id: 'l44-prac-2',
        prompt:
          'Ejercicio 2: Ejecuta el Salto del Mono (Saru-suberi) en la primera línea inferior desde C2 hasta F1 para reducir profundamente el territorio blanco.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 7, color: 'BLACK' },
          { x: 2, y: 6, color: 'BLACK' },
          { x: 3, y: 5, color: 'WHITE' },
          { x: 4, y: 6, color: 'WHITE' },
          { x: 5, y: 6, color: 'WHITE' },
          { x: 6, y: 6, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 5, y: 8 }, { x: 4, y: 8 }],
        correctFeedback:
          '¡Salto del Mono (Saru-suberi) impecable! Reduces el territorio blanco en sente desde la primera línea.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Deslízate por la primera línea inferior hasta F1 (x=5, y=8) o E1 (x=4, y=8).',
        hints: [
          'Usa el salto largo de caballo en la primera línea inferior (fila 1).',
          'Juega en F1 (x=5, y=8) o E1 (x=4, y=8).',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'En el Yose, nunca sigas ciegamente al rival en Gote: aplica el principio «Tú ve por tu camino y yo iré por el mío».',
        'Toma siempre primero las jugadas de Doble Sente antes que cualquier jugada unilateral.',
        'Antes de empujar desde afuera en el borde, verifica si la falta de libertades enemiga te permite saltar directamente a la primera línea.',
      ],
      vocabulary: [
        {
          term: 'Sogo-sente (Doble Sente)',
          japanese: '双方先手',
          definition: 'Jugada de final de partida que es forzante (Sente) para cualquiera de los dos jugadores que la ejecute primero.',
        },
        {
          term: 'Saru-suberi (Salto del mono)',
          japanese: '猿滑り',
          definition: 'Salto largo de caballo desde la segunda a la primera línea que penetra profundamente en el territorio lateral del enemigo.',
        },
      ],
    },
    transferQuestion: {
      id: 'l44-transfer',
      prompt:
        'Pregunta de transferencia: Blanco respondió en C9 a tu tesuji en D9. Conecta ahora tu piedra D9 en la primera línea para completar la reducción sin pérdidas.',
      boardSize: 9,
      initialStones: [
        { x: 2, y: 1, color: 'WHITE' },
        { x: 3, y: 1, color: 'WHITE' },
        { x: 3, y: 2, color: 'WHITE' },
        { x: 2, y: 0, color: 'WHITE' },
        { x: 3, y: 0, color: 'BLACK' },
        { x: 4, y: 2, color: 'BLACK' },
        { x: 5, y: 1, color: 'BLACK' },
        { x: 5, y: 0, color: 'BLACK' },
        { x: 4, y: 3, color: 'BLACK' },
      ],
      turn: 'BLACK',
      exerciseType: 'PLACE_STONE',
      validCoords: [{ x: 4, y: 0 }],
      correctFeedback:
        '¡Dominado! Conectas en E9 y Blanco sigue sin poder jugar en E8 por falta de libertades.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Conecta tu piedra D9 jugando en E9 (x=4, y=0).',
      hints: [
        'Une D9 con F9 en la primera línea.',
        'Juega en E9 (x=4, y=0).',
      ],
    },
  },

  // ============================================================================
  // LECCIÓN 45 (Etapa 11 · Unidad 4 — Nivel Avanzado): Jugadas Propias (Honte), Escalera en Espiral y Bajo las Piedras
  // ============================================================================
  {
    id: 'lesson-45-kageyama-jugadas-propias-espiral-bajo-piedras',
    stageNumber: 11,
    stageTitle: '11. Yose y cálculo de final',
    unitNumber: 4,
    unitTitle: 'Jugadas Propias (Honte), la Escalera en Espiral (Guruguru-mawashi) y Jugar Bajo las Piedras (Ishi-no-shita)',
    title: 'Jugadas Propias (Honte), Escalera en Espiral y Bajo las Piedras',
    subtitle:
      'Culmina las enseñanzas de Kageyama (Capítulos 8, 9 y 10): el concepto moral y técnico de Honte (la jugada propia sin trucos), la «buena jugada con mala forma», la Escalera en Espiral (Guruguru-mawashi) y el sacrificio para Jugar Bajo las Piedras (Ishi-no-shita).',
    estimatedMinutes: 10,
    xpReward: 50,
    prerequisites: ['lesson-35-crear-forma-contra-hane-conduccion'],
    relatedPuzzleIds: [
      'puzzle-72-kageyama-honte-sujetar-piedra-corte',
      'puzzle-73-kageyama-escalera-en-espiral',
      'puzzle-75-kageyama-jugar-bajo-las-piedras',
    ],
    observableObjective:
      'Al terminar, jugarás la Jugada Propia (Honte) que sujeta la piedra cortadora sin dejar aji, y ejecutarás secuencias avanzadas de Escalera en Espiral e Ishi-no-shita.',
    activationQuestion: {
      question:
        'En el Capítulo 8 («Proper Moves»), ¿qué significa para Toshiro Kageyama jugar Honte (la Jugada Propia) frente a jugar trucos (Hamete)?',
      options: [
        {
          id: 'a',
          text: 'Honte es la jugada honesta y fundamentalmente sólida que responde a las necesidades reales de la posición (como sujetar la piedra de corte) y funciona incluso contra el mejor jugador del mundo',
          isCorrect: true,
          explanation:
            '¡Exacto! Un truco (Hamete) espera que el rival se equivoque y fracasa si el rival responde bien; el Honte no deja debilidades y construye una fuerza duradera.',
        },
        {
          id: 'b',
          text: 'Honte consiste en tender trampas esperando que el oponente no vea un atari oculto',
          isCorrect: false,
          explanation:
            'Eso es precisamente un Hamete (jugada tramposa), lo opuesto al Honte.',
        },
        {
          id: 'c',
          text: 'Honte significa elegir únicamente jugadas que luzcan bonitas aunque pierdan las piedras de corte',
          isCorrect: false,
          explanation:
            'Kageyama muestra incluso la «buena jugada con forma fea» (como un triángulo vacío puntual) cuando esa es la única jugada propia que sujeta el corte y los ojos.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. Honte (La Jugada Propia) y sujetar siempre la Piedra Cortadora',
        body: 'El núcleo del Capítulo 8 de Kageyama es aprender a distinguir la piedra clave (Kaname-ishi) de las piedras secundarias. Cuando una piedra enemiga corta tus grupos, el Honte consiste en sujetarla y capturarla limpiamente sin codiciar ganancias laterales que permitan a la piedra cortadora revivir.',
        deepDive:
          'A veces el Honte adopta lo que Kageyama llama «la buena jugada con mala forma»: una jugada que parece pesada a primera vista pero que protege simultáneamente el corte y la base ocular.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 4, y: 4, color: 'WHITE' },
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 5, y: 4, color: 'BLACK' },
            { x: 3, y: 5, color: 'WHITE' },
            { x: 5, y: 5, color: 'WHITE' },
            { x: 2, y: 4, color: 'BLACK' },
          ],
          markers: [
            { x: 4, y: 5, type: 'SUCCESS', label: 'Honte' },
            { x: 3, y: 6, type: 'DANGER', label: 'X' },
          ],
          caption:
            'Sujetar la piedra de corte E5 jugando en E4 (Honte) une todo el centro negro; perseguir D4 en D3 (X) dejaría escapar a E5.',
        },
      },
      {
        title: '2. Escalera en Espiral (Guruguru-mawashi) y Jugar Bajo las Piedras (Ishi-no-shita)',
        body: 'En los Capítulos 9 y 10, Kageyama presenta las dos joyas clásicas del Tesuji: la Escalera en Espiral (Guruguru-mawashi), donde sacrificas piedras en remolino para convertir al grupo enemigo en una bola pesada sin libertades; y Jugar Bajo las Piedras (Ishi-no-shita), donde entregas un grupo de 3 o 4 piedras para volver a jugar dentro del espacio recién vaciado y cortar al rival.',
        deepDive:
          'Ambas técnicas demuestran por qué el Go trasciende el apego material: las piedras sacrificadas cumplen su misión al transformar la geometría de libertades del enemigo.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 3, color: 'WHITE' },
            { x: 4, y: 3, color: 'WHITE' },
            { x: 3, y: 4, color: 'WHITE' },
            { x: 2, y: 3, color: 'BLACK' },
            { x: 2, y: 4, color: 'BLACK' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 5, y: 3, color: 'BLACK' },
            { x: 4, y: 4, color: 'BLACK' },
          ],
          markers: [
            { x: 3, y: 5, type: 'SUCCESS', label: '1' },
            { x: 5, y: 4, type: 'CIRCLE', label: '3' },
          ],
          caption:
            'Exprimido en espiral: Negro da atari en D4 (1), entrega E5 y cierra en F5 (3) ahogando a toda la masa blanca.',
        },
      },
    ],
    demonstration: {
      title: 'Demostración: Sacrificio y Compresión en Espiral',
      size: 9,
      steps: [
        {
          title: '1. Tres piedras blancas amenazan capturar la piedra negra E5',
          narration:
            'Si Negro intenta salvar E5 o defender pasivamente F5, Blanco escapa hacia el centro por D4.',
          stones: [
            { x: 3, y: 3, color: 'WHITE' },
            { x: 4, y: 3, color: 'WHITE' },
            { x: 3, y: 4, color: 'WHITE' },
            { x: 2, y: 3, color: 'BLACK' },
            { x: 2, y: 4, color: 'BLACK' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 5, y: 3, color: 'BLACK' },
            { x: 4, y: 4, color: 'BLACK' },
          ],
          turn: 'BLACK',
        },
        {
          title: '2. Negro da atari exterior en D4 sacrificando E5',
          narration:
            'Negro juega D4 (x=3, y=5). Blanco captura E5 jugando en E4, pero sus cuatro piedras quedan convertidas en un bloque pesado.',
          stones: [
            { x: 3, y: 3, color: 'WHITE' },
            { x: 4, y: 3, color: 'WHITE' },
            { x: 3, y: 4, color: 'WHITE' },
            { x: 4, y: 5, color: 'WHITE' },
            { x: 2, y: 3, color: 'BLACK' },
            { x: 2, y: 4, color: 'BLACK' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 5, y: 3, color: 'BLACK' },
            { x: 3, y: 5, color: 'BLACK' },
          ],
          lastMove: { x: 4, y: 5 },
          turn: 'BLACK',
        },
        {
          title: '3. Negro sella en F5 y atrapa toda la masa blanca',
          narration:
            'Al cerrar en F5 (x=5, y=4), Negro completa el exprimido y las piedras blancas quedan sin ojos ni salida.',
          stones: [
            { x: 3, y: 3, color: 'WHITE' },
            { x: 4, y: 3, color: 'WHITE' },
            { x: 3, y: 4, color: 'WHITE' },
            { x: 4, y: 5, color: 'WHITE' },
            { x: 2, y: 3, color: 'BLACK' },
            { x: 2, y: 4, color: 'BLACK' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 5, y: 3, color: 'BLACK' },
            { x: 3, y: 5, color: 'BLACK' },
            { x: 5, y: 4, color: 'BLACK' },
          ],
          lastMove: { x: 5, y: 4 },
          markers: [{ x: 5, y: 4, type: 'SUCCESS', label: '!' }],
          turn: 'WHITE',
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l45-gd-1',
        prompt:
          'Juega la Jugada Propia (Honte) de Kageyama: sujeta directamente la piedra cortadora blanca E5 antes de que pueda escapar y dividir tus grupos.',
        boardSize: 9,
        initialStones: [
          { x: 4, y: 4, color: 'WHITE' },
          { x: 3, y: 4, color: 'BLACK' },
          { x: 4, y: 3, color: 'BLACK' },
          { x: 5, y: 4, color: 'BLACK' },
          { x: 3, y: 5, color: 'WHITE' },
          { x: 5, y: 5, color: 'WHITE' },
          { x: 2, y: 4, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 5 }],
        correctFeedback:
          '¡Honte impecable en E4! Sujetas la piedra cortadora y conectas tus grupos en una fortaleza invulnerable.',
        wrongFeedback: {
          '3,6': 'Atacar D4 deja escapar a la piedra cortadora E5 con doble atari.',
        },
        defaultWrongFeedback: 'Captura la piedra cortadora central jugando en E4 (x=4, y=5).',
        hints: [
          'La piedra más importante del tablero es la piedra de corte en E5.',
          'Juega en E4 (x=4, y=5).',
        ],
      },
    ],
    independentPractice: [
      {
        id: 'l45-prac-1',
        prompt:
          'Ejercicio 1 (Exprimido en Espiral): Inicia el sacrificio dando atari desde afuera en D4 a las tres piedras blancas D6–E6–D5.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 3, color: 'WHITE' },
          { x: 4, y: 3, color: 'WHITE' },
          { x: 3, y: 4, color: 'WHITE' },
          { x: 2, y: 3, color: 'BLACK' },
          { x: 2, y: 4, color: 'BLACK' },
          { x: 3, y: 2, color: 'BLACK' },
          { x: 4, y: 2, color: 'BLACK' },
          { x: 5, y: 3, color: 'BLACK' },
          { x: 4, y: 4, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 3, y: 5 }],
        correctFeedback:
          '¡Excelente inicio del exprimido en D4! Obligas a Blanco a volverse pesado al capturar E5.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Da atari exterior en D4 (x=3, y=5).',
        hints: [
          'Sacrifica la piedra E5 dando atari desde abajo.',
          'Juega en D4 (x=3, y=5).',
        ],
      },
      {
        id: 'l45-prac-2',
        prompt:
          'Ejercicio 2 (Preparación en la esquina / Ishi-no-shita): Extiende tus dos piedras B9–C9 hasta A9 para ganar libertades y encerrar al grupo blanco.',
        boardSize: 9,
        initialStones: [
          { x: 1, y: 0, color: 'BLACK' },
          { x: 2, y: 0, color: 'BLACK' },
          { x: 2, y: 1, color: 'WHITE' },
          { x: 1, y: 1, color: 'WHITE' },
          { x: 3, y: 0, color: 'WHITE' },
          { x: 3, y: 1, color: 'BLACK' },
          { x: 3, y: 2, color: 'BLACK' },
          { x: 1, y: 2, color: 'BLACK' },
          { x: 0, y: 1, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 0, y: 0 }],
        correctFeedback:
          '¡Lectura brillante en A9! Alargas tu cadena en la esquina y dejas a Blanco sin suficientes libertades.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Juega en la esquina A9 (x=0, y=0).',
        hints: [
          'Ocupa la esquina A9 para conectar B9–C9 con A8.',
          'Juega en A9 (x=0, y=0).',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'Honte (la Jugada Propia) es la jugada honesta que elimina las debilidades de corte sin depender de errores del oponente.',
        'La Escalera en Espiral (Guruguru-mawashi) sacrifica piedras en giro para comprimir al grupo enemigo y ganar el Semeai.',
        'Jugar Bajo las Piedras (Ishi-no-shita) sacrifica una cadena para volver a jugar dentro de las casillas recién capturadas.',
      ],
      vocabulary: [
        {
          term: 'Honte (Jugada propia / auténtica)',
          japanese: '本手',
          definition: 'La jugada correcta, sólida y sin trucos que protege los fundamentos de forma y conexión en una posición.',
        },
        {
          term: 'Ishi-no-shita (Bajo las piedras)',
          japanese: '石の下',
          definition: 'Tesuji de sacrificio donde se entregan varias piedras para jugar inmediatamente después en el espacio vacío que dejaron.',
        },
      ],
    },
    transferQuestion: {
      id: 'l45-transfer',
      prompt:
        'Pregunta de transferencia: Blanco acaba de capturar tu piedra E5 jugando en E4 tras tu atari en D4. Cierra ahora el anillo exterior en F5 para atrapar toda la masa blanca.',
      boardSize: 9,
      initialStones: [
        { x: 3, y: 3, color: 'WHITE' },
        { x: 4, y: 3, color: 'WHITE' },
        { x: 3, y: 4, color: 'WHITE' },
        { x: 4, y: 5, color: 'WHITE' },
        { x: 2, y: 3, color: 'BLACK' },
        { x: 2, y: 4, color: 'BLACK' },
        { x: 3, y: 2, color: 'BLACK' },
        { x: 4, y: 2, color: 'BLACK' },
        { x: 5, y: 3, color: 'BLACK' },
        { x: 3, y: 5, color: 'BLACK' },
      ],
      turn: 'BLACK',
      exerciseType: 'PLACE_STONE',
      validCoords: [{ x: 5, y: 4 }],
      correctFeedback:
        '¡Dominado! Cierras en F5 y completas la compresión de Kageyama.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Cierra el cerco exterior jugando en F5 (x=5, y=4).',
      hints: [
        'Une F6 con D4 cerrando el costado derecho del grupo blanco.',
        'Juega en F5 (x=5, y=4).',
      ],
    },
  },
];
