import { LessonContent } from '../types/go';

/**
 * 12 Nuevas Lecciones Interactivas (Lecciones 13 a 24)
 * Basadas en "Attack and Defense" (Elementary Go Series, Vol. 5) de Akira Ishida y James Davies,
 * junto con fundamentos de supervivencia, Semeai y Nakade.
 * Con estas 12 lecciones + las 12 anteriores, la Academia cuenta con 24 lecciones completas
 * distribuidas en Nivel Básico (8), Nivel Intermedio (8) y Nivel Avanzado (8).
 */
export const ATTACK_DEFENSE_LESSONS_CATALOG: LessonContent[] = [
  // ============================================================================
  // LECCIÓN 13 (Etapa 2 · Unidad 1 — Nivel Básico): Defensa Temprana y Regla 4 a 1
  // ============================================================================
  {
    id: 'lesson-13-defensa-temprana-escape',
    stageNumber: 2,
    stageTitle: '2. Sobrevivir',
    unitNumber: 1,
    unitTitle: 'Extensión de grupos en peligro y escape hacia el centro',
    title: 'Defensa Temprana: La Regla de 4 contra 1 y el Salto al Centro',
    subtitle:
      'Aprende el principio del Capítulo 4 de "Attack and Defense" (Ishida & Davies): por qué defender es más fácil que atacar y cómo poner a salvo tus grupos antes de que el ataque sea severo.',
    estimatedMinutes: 7,
    xpReward: 25,
    prerequisites: ['lesson-3-atari-captura'],
    relatedPuzzleIds: ['puzzle-3-salvar-atari', 'puzzle-26-escape-salto-centro', 'puzzle-35-defensa-preventiva'],
    observableObjective:
      'Al terminar, sabrás por qué se necesitan 4 jugadas para capturar una piedra aislada pero solo 1 para escapar, y usarás el salto de un espacio (Ikkentobi) para huir hacia el centro.',
    activationQuestion: {
      question:
        'Según Akira Ishida en "Attack and Defense", una piedra negra aislada en el centro tiene 4 libertades. Si Blanco ya ha ocupado 3 de sus libertades, ¿cuántas jugadas necesita Negro para escapar y multiplicar su aire?',
      options: [
        {
          id: 'a',
          text: 'Solo 1 jugada: extenderse por su cuarta libertad hacia el centro abierto',
          isCorrect: true,
          explanation:
            '¡Exacto! Como explica Ishida en el Capítulo 4 ("Defense"), hacen falta 4 jugadas enemigas para capturar una sola piedra, pero basta 1 sola jugada defensiva para escapar y ganar 3 nuevas libertades.',
        },
        {
          id: 'b',
          text: 'Necesita 4 jugadas consecutivas para poder escapar',
          isCorrect: false,
          explanation:
            'Al contrario: el atacante necesitó 3 jugadas para rodearte, pero tú solo necesitas 1 jugada para extenderte y salir del atari.',
        },
        {
          id: 'c',
          text: 'Ninguna, una piedra con 1 libertad ya no puede moverse ni conectarse',
          isCorrect: false,
          explanation:
            'Aunque la piedra no se mueve, al colocar una segunda piedra en su última libertad ambas se unen y suman nuevas libertades.',
        },
      ],
    },
    conceptSteps: [
      {
        title: 'Por qué defender es más sencillo que atacar (Regla 4 a 1)',
        body: 'En el Capítulo 4 de "Attack and Defense", Akira Ishida demuestra que las probabilidades en el Go favorecen al defensor: rodear una piedra en el centro exige 4 turnos del atacante, mientras que el defensor escapa con 1 solo turno.',
        deepDive:
          'Sin embargo, descuidar la defensa por completo es fatal: cuando dejas un grupo débil sin ojos, el rival lo perseguirá para construir territorio gratis a tu costa.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 4, y: 4, color: 'BLACK' },
            { x: 4, y: 3, color: 'WHITE' },
            { x: 5, y: 4, color: 'WHITE' },
            { x: 4, y: 5, color: 'WHITE' },
          ],
          markers: [{ x: 3, y: 4, type: 'SUCCESS', label: '1' }],
          caption: 'Blanco invirtió 3 jugadas (E6, F5, E4), pero Negro escapa con 1 sola jugada en D5.',
        },
      },
      {
        title: 'Defender antes de que el ataque sea severo: El Salto de Un Espacio (Ikkentobi)',
        body: 'Los jugadores profesionales defienden sus grupos débiles temprano, antes de quedar en atari. La jugada clásica para viajar rápido hacia el centro es el Salto de Un Espacio (Ikkentobi).',
        deepDive:
          'Un mal hábito común es arrastrarse pesadamente paso a paso cuando no hay contacto directo. El salto de un punto (dejando 1 intersección vacía en medio) avanza el doble de rápido hacia el centro abierto.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 4, y: 6, color: 'BLACK' },
            { x: 4, y: 7, color: 'BLACK' },
            { x: 2, y: 6, color: 'WHITE' },
            { x: 6, y: 6, color: 'WHITE' },
          ],
          markers: [{ x: 4, y: 4, type: 'SUCCESS', label: 'A' }],
          caption: 'El salto de un espacio a E5 (A) saca al grupo negro hacia el centro antes de ser rodeado.',
        },
      },
    ],
    demonstration: {
      title: 'Escapar a tiempo frente a quedar atrapado en el borde',
      size: 9,
      steps: [
        {
          title: '1. Un grupo negro sin ojos presionado en ambos lados',
          narration:
            'Las dos piedras negras en E2–E3 están rodeadas a distancia por piedras blancas en C3 y G3. Aún no tienen dos ojos en el borde.',
          stones: [
            { x: 4, y: 7, color: 'BLACK' },
            { x: 4, y: 6, color: 'BLACK' },
            { x: 2, y: 6, color: 'WHITE' },
            { x: 6, y: 6, color: 'WHITE' },
          ],
          markers: [{ x: 4, y: 6, type: 'TRIANGLE' }],
        },
        {
          title: '2. Defensa temprana con el Salto de Un Espacio (E5)',
          narration:
            'Siguiendo el consejo de Kitani y Sakata citado por Ishida ("cortar el ataque de raíz defendiendo temprano"), Negro salta a E5. Su grupo ya respira en el centro y quita fuerza al rival.',
          stones: [
            { x: 4, y: 7, color: 'BLACK' },
            { x: 4, y: 6, color: 'BLACK' },
            { x: 2, y: 6, color: 'WHITE' },
            { x: 6, y: 6, color: 'WHITE' },
            { x: 4, y: 4, color: 'BLACK' },
          ],
          lastMove: { x: 4, y: 4 },
          markers: [{ x: 4, y: 4, type: 'SUCCESS', label: '✓' }],
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l13-gd-1',
        prompt:
          'Blanco ha ocupado 3 libertades de tu piedra central en E5 (E6, F5 y E4). Juega en su única libertad restante para escapar y subir a 3 libertades.',
        boardSize: 9,
        initialStones: [
          { x: 4, y: 4, color: 'BLACK' },
          { x: 4, y: 3, color: 'WHITE' },
          { x: 5, y: 4, color: 'WHITE' },
          { x: 4, y: 5, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 3, y: 4 }],
        correctFeedback:
          '¡Escape limpio en D5! Como enseña el diagrama 1 del Capítulo 4 de Ishida, 1 sola jugada defensiva desarma las 3 jugadas de cerco del rival.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Tu piedra en E5 está en atari: extiende hacia la izquierda en D5.',
        hints: ['Mira el lado izquierdo de E5.', 'Juega en D5 (x=3, y=4).'],
      },
      {
        id: 'l13-gd-2',
        prompt:
          'Tu grupo en E2–E3 está flanqueado por piedras blancas en C3 y G3. Realiza el Salto de Un Espacio (Ikkentobi) hacia el centro en la columna E.',
        boardSize: 9,
        initialStones: [
          { x: 4, y: 7, color: 'BLACK' },
          { x: 4, y: 6, color: 'BLACK' },
          { x: 2, y: 6, color: 'WHITE' },
          { x: 6, y: 6, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 4 }],
        correctFeedback:
          '¡Salto ligero y veloz en E5! El salto de un espacio proyecta tu grupo hacia el centro y previene que Blanco te encierre con un sombrero.',
        wrongFeedback: {
          '4,5': 'E4 es un paso sólido pero lento; salta un espacio hasta E5 para ganar velocidad hacia el centro.',
        },
        defaultWrongFeedback: 'Salta una intersección desde E3 hacia arriba por la columna E (E5).',
        hints: ['Deja E4 vacío y coloca tu piedra una línea más arriba.', 'Juega en E5 (x=4, y=4).'],
      },
    ],
    independentPractice: [
      {
        id: 'l13-ip-1',
        prompt:
          'Práctica 1: Tu piedra en D3 tiene un salto hacia el centro en D5 antes de que las piedras blancas de B4 y F4 te tapen la salida. ¡Juega en D5!',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 6, color: 'BLACK' },
          { x: 3, y: 7, color: 'BLACK' },
          { x: 1, y: 5, color: 'WHITE' },
          { x: 5, y: 5, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 3, y: 4 }],
        correctFeedback: '¡Excelente defensa preventiva en D5! Ahora tu grupo tiene salida asegurada al centro.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Realiza el salto de un espacio desde D3 hasta D5.',
        hints: ['Salta sobre D4 hacia el centro.', 'Juega en D5 (x=3, y=4).'],
      },
    ],
    summary: {
      keyIdeas: [
        'Capturar una piedra exige rodear sus 4 lados; escapar solo requiere 1 jugada a tiempo.',
        'Defender temprano un grupo sin ojos evita que el rival gane territorio gratis atacándote.',
        'El Salto de Un Espacio (Ikkentobi) es la herramienta fundamental para escapar con rapidez hacia el centro.',
      ],
      vocabulary: [
        {
          term: 'Ikkentobi (Salto de un espacio)',
          japanese: '一間飛び',
          definition: 'Movimiento que avanza dos líneas en línea recta dejando un punto vacío intermedio.',
        },
      ],
    },
    transferQuestion: {
      id: 'l13-tq-1',
      prompt:
        'Evaluación: ¿Por qué los grandes maestros defienden sus grupos débiles incluso antes de que el rival los ponga en peligro de muerte inmediato?',
      boardSize: 9,
      initialStones: [],
      turn: 'BLACK',
      exerciseType: 'MULTIPLE_CHOICE',
      options: [
        {
          id: 'opt-1',
          text: 'Porque si dejas un grupo débil, el rival lo atacará para construir territorio e influencia gratis en el resto del tablero',
          isCorrect: true,
          feedback:
            '¡Exacto! Como enseña Ishida, el verdadero peligro de ser atacado no es solo morir, sino los "efectos secundarios" (territorio y poder) que el atacante obtiene gratis.',
        },
        {
          id: 'opt-2',
          text: 'Porque las reglas obligan a responder siempre cerca de la última piedra jugada',
          isCorrect: false,
          feedback: 'En Go tienes libertad total para jugar en cualquier intersección legal.',
        },
      ],
      correctFeedback: 'Has comprendido la filosofía de la defensa preventiva.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Recuerda los efectos secundarios del ataque sobre el equilibrio de territorio.',
      hints: ['Piensa en lo que gana el atacante mientras tú huyes desesperadamente.', 'Selecciona la primera opción.'],
    },
  },

  // ============================================================================
  // LECCIÓN 14 (Etapa 2 · Unidad 3 — Nivel Básico): Semeai y Doble Atari
  // ============================================================================
  {
    id: 'lesson-14-semeai-carreras-captura',
    stageNumber: 2,
    stageTitle: '2. Sobrevivir',
    unitNumber: 3,
    unitTitle: 'Carreras básicas de captura (Semeai elemental)',
    title: 'Carreras de Captura (Semeai) y el Golpe de Doble Atari',
    subtitle:
      'Aprende a ganar duelos cuerpo a cuerpo entre dos grupos sin ojos llenando primero las libertades exteriores y detectando puntos de Doble Atari.',
    estimatedMinutes: 7,
    xpReward: 25,
    prerequisites: ['lesson-6-conectar-cortar-defensa'],
    relatedPuzzleIds: ['puzzle-27-ganar-semeai', 'puzzle-28-doble-atari-tactico', 'puzzle-4-capturar-cadena'],
    observableObjective:
      'Al terminar, sabrás contar y comparar las libertades de dos grupos enfrentados (Semeai), rellenar libertades desde fuera hacia dentro y ejecutar un Doble Atari.',
    activationQuestion: {
      question:
        'Dos grupos adyacentes (uno negro y uno blanco) están cortados y ninguno tiene ojos. Ambos tienen exactamente 2 libertades y es el turno de Negro. ¿Quién gana la carrera de captura (Semeai)?',
      options: [
        {
          id: 'a',
          text: 'Gana Negro porque juega primero: en su primer turno pone a Blanco en atari (1 libertad) y en el siguiente lo captura',
          isCorrect: true,
          explanation:
            '¡Correcto! A igualdad de libertades en un Semeai simple sin ojos, gana siempre el bando que tiene el turno (Sente) para reducir primero las libertades del rival.',
        },
        {
          id: 'b',
          text: 'Termina en empate porque tenían el mismo número de libertades al empezar',
          isCorrect: false,
          explanation:
            'Como los turnos se alternan, quien juega primero lleva 1 tiempo de ventaja y deja al rival en atari primero.',
        },
        {
          id: 'c',
          text: 'Gana Blanco porque juega segundo',
          isCorrect: false,
          explanation: 'En una carrera de captura, llevar la iniciativa es decisivo.',
        },
      ],
    },
    conceptSteps: [
      {
        title: 'Regla de Oro del Semeai: Rellena primero las libertades exteriores',
        body: 'Cuando tu grupo y un grupo enemigo luchan a muerte sin ojos (Semeai), nunca empieces rellenando las libertades compartidas (dame internos) si aún quedan libertades exteriores del rival.',
        deepDive:
          'Si juegas en una libertad compartida demasiado pronto, reduces también tu propio aire. Rellena siempre desde el exterior del grupo enemigo.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 4, color: 'BLACK' },
            { x: 3, y: 5, color: 'BLACK' },
            { x: 3, y: 3, color: 'BLACK' },
            { x: 4, y: 4, color: 'WHITE' },
            { x: 4, y: 5, color: 'WHITE' },
            { x: 5, y: 3, color: 'BLACK' },
            { x: 5, y: 6, color: 'BLACK' },
          ],
          markers: [{ x: 5, y: 4, type: 'SUCCESS', label: '1' }],
          caption: 'Negro reduce las libertades exteriores de Blanco en F5 y F4 para ganar la carrera de captura.',
        },
      },
      {
        title: 'El Doble Atari (Ryo-atari): Dos amenazas con una sola piedra',
        body: 'En "Tesuji" y "Attack and Defense", James Davies destaca el Doble Atari como el golpe táctico más contundente: una sola piedra que deja simultáneamente a dos grupos enemigos con 1 sola libertad.',
        deepDive:
          'Como el oponente solo puede jugar una piedra en su turno, si salva una de las dos unidades amenazadas, tú capturas inevitablemente la otra.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 3, color: 'WHITE' },
            { x: 5, y: 5, color: 'WHITE' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 2, y: 3, color: 'BLACK' },
            { x: 6, y: 5, color: 'BLACK' },
            { x: 5, y: 6, color: 'BLACK' },
          ],
          markers: [{ x: 4, y: 4, type: 'SUCCESS', label: '★' }],
          caption: 'Si dos grupos blancos tienen solo 2 libertades y comparten una intersección, jugar allí da Doble Atari.',
        },
      },
    ],
    demonstration: {
      title: 'Ejecución de un Doble Atari que decide la lucha local',
      size: 9,
      steps: [
        {
          title: '1. Dos piedras blancas cortadas con 2 libertades cada una',
          narration:
            'Observa las piedras blancas en D5 (libertades en D6 y E5) y en E6 (libertades en F6 y E5). Ambas comparten la libertad central E5.',
          stones: [
            { x: 3, y: 4, color: 'WHITE' },
            { x: 4, y: 3, color: 'WHITE' },
            { x: 2, y: 4, color: 'BLACK' },
            { x: 3, y: 5, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 5, y: 4, color: 'BLACK' },
          ],
          markers: [{ x: 4, y: 4, type: 'CIRCLE' }],
        },
        {
          title: '2. Golpe en E5: ¡Doble Atari!',
          narration:
            'Negro juega en E5. Al instante, tanto D5 (solo le queda D6) como E6 (solo le queda F6) quedan en atari. Blanco perderá una de las dos piedras sin remedio.',
          stones: [
            { x: 3, y: 4, color: 'WHITE' },
            { x: 4, y: 3, color: 'WHITE' },
            { x: 2, y: 4, color: 'BLACK' },
            { x: 3, y: 5, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 5, y: 4, color: 'BLACK' },
            { x: 4, y: 4, color: 'BLACK' },
          ],
          lastMove: { x: 4, y: 4 },
          markers: [
            { x: 3, y: 4, type: 'DANGER', label: '1' },
            { x: 4, y: 3, type: 'DANGER', label: '1' },
          ],
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l14-gd-1',
        prompt:
          'Las piedras blancas en D5 y E6 tienen solo 2 libertades cada una. Encuentra la intersección común que las pone en Doble Atari simultáneamente.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 4, color: 'WHITE' },
          { x: 4, y: 3, color: 'WHITE' },
          { x: 2, y: 4, color: 'BLACK' },
          { x: 3, y: 5, color: 'BLACK' },
          { x: 4, y: 2, color: 'BLACK' },
          { x: 5, y: 4, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 4 }],
        correctFeedback:
          '¡Doble Atari perfecto en E5! Tanto D5 como E6 quedan con 1 sola libertad y tu piedra negra en E5 está conectada a F5.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Busca la intersección que toca ortogonalmente a D5 y a E6 a la vez.',
        hints: ['Está a la derecha de D5 y debajo de E6.', 'Juega en E5 (x=4, y=4).'],
      },
      {
        id: 'l14-gd-2',
        prompt:
          'Semeai en el borde: Tus dos piedras negras (C9–C8) tienen 2 libertades, y las dos piedras blancas (D9–D8) también tienen 2 libertades (E9 y E8). Da el primer atari exterior para ganar la carrera.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 0, color: 'BLACK' },
          { x: 2, y: 1, color: 'BLACK' },
          { x: 2, y: 2, color: 'WHITE' },
          { x: 3, y: 2, color: 'WHITE' },
          { x: 3, y: 0, color: 'WHITE' },
          { x: 3, y: 1, color: 'WHITE' },
          { x: 4, y: 2, color: 'BLACK' },
          { x: 5, y: 1, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [
          { x: 4, y: 0 },
          { x: 4, y: 1 },
        ],
        correctFeedback:
          '¡Victoria en Semeai! Al reducir inmediatamente las libertades de D9–D8 de 2 a 1, dejas a Blanco en atari antes de que pueda atacarte en B9 o B8.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Ataca directamente una de las dos libertades de la cadena blanca D9–D8 (E9 o E8).',
        hints: ['Las dos piedras blancas en D9 y D8 solo respiran por E9 y E8.', 'Juega en E9 (x=4, y=0) o E8 (x=4, y=1).'],
      },
    ],
    independentPractice: [
      {
        id: 'l14-ip-1',
        prompt:
          'Práctica 1: Las piedras blancas en D6 y F6 tienen 2 libertades cada una y comparten la intersección E6. ¡Ejecuta el Doble Atari en E6!',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 3, color: 'WHITE' },
          { x: 5, y: 3, color: 'WHITE' },
          { x: 2, y: 3, color: 'BLACK' },
          { x: 3, y: 2, color: 'BLACK' },
          { x: 5, y: 2, color: 'BLACK' },
          { x: 6, y: 3, color: 'BLACK' },
          { x: 4, y: 4, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 3 }],
        correctFeedback: '¡Golpe exacto en E6! Conectas con tu piedra de E5 y das Doble Atari a D6 y F6.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Juega en el punto entre D6 y F6 (E6).',
        hints: ['Mira la intersección E6 entre las dos piedras blancas.', 'Juega en E6 (x=4, y=3).'],
      },
    ],
    summary: {
      keyIdeas: [
        'En una carrera de captura (Semeai) sin ojos, cuenta primero las libertades de ambos grupos.',
        'Rellena siempre las libertades exteriores del rival antes de tocar las libertades compartidas.',
        'El Doble Atari ataca dos grupos de 2 libertades a la vez garantizando la captura de uno de ellos.',
      ],
      vocabulary: [
        {
          term: 'Semeai',
          japanese: '攻め合い',
          definition: 'Carrera de captura entre dos grupos adyacentes que carecen de dos ojos.',
        },
        {
          term: 'Ryo-atari (Doble Atari)',
          japanese: '両アタリ',
          definition: 'Jugada que pone en atari simultáneamente a dos piedras o cadenas enemigas separadas.',
        },
      ],
    },
    transferQuestion: {
      id: 'l14-tq-1',
      prompt: 'Evaluación: En un Semeai donde existe 1 libertad compartida entre tu grupo y el rival, ¿cuál es el orden correcto para quitar libertades?',
      boardSize: 9,
      initialStones: [],
      turn: 'BLACK',
      exerciseType: 'MULTIPLE_CHOICE',
      options: [
        {
          id: 'opt-1',
          text: 'Tapar primero todas las libertades exteriores del rival y dejar la libertad compartida para el final',
          isCorrect: true,
          feedback: '¡Exacto! Tapar una libertad compartida antes de tiempo te quita una libertad a ti mismo.',
        },
        {
          id: 'opt-2',
          text: 'Tapar primero la libertad compartida en medio de los dos grupos',
          isCorrect: false,
          feedback: 'Ese es el error clásico en Semeai: al tapar la libertad compartida reduces tu propio aire.',
        },
      ],
      correctFeedback: 'Dominas el principio fundamental del Semeai.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Recuerda: desde fuera hacia dentro.',
      hints: ['No reduzcas tu propio aire antes de tiempo.', 'Elige la primera opción.'],
    },
  },

  // ============================================================================
  // LECCIÓN 15 (Etapa 3 · Unidad 2 y 3 — Nivel Intermedio): Evitar Dango y Hane en la Cabeza
  // ============================================================================
  {
    id: 'lesson-15-formas-pesadas-hane-cabeza',
    stageNumber: 3,
    stageTitle: '3. Forma y eficiencia',
    unitNumber: 2,
    unitTitle: 'Defectos de forma: Triángulo vacío, Dango y Hane',
    title: 'Formas Pesadas (Dango) y el Hane en la Cabeza de Dos Piedras',
    subtitle:
      'Descubre por qué amontonar piedras en bloque (Dango) paraliza tu juego y cómo el "Hane en la cabeza de dos piedras" frena la expansión enemiga.',
    estimatedMinutes: 7,
    xpReward: 30,
    prerequisites: ['lesson-7-forma-eficiencia'],
    relatedPuzzleIds: ['puzzle-22-forma-bambu', 'puzzle-29-hane-cabeza-dos-piedras'],
    observableObjective:
      'Identificarás una masa pesada (Dango) con pocas libertades y aplicarás el proverbio clásico "Hane en la cabeza de dos piedras" para dominar la forma en combate.',
    activationQuestion: {
      question:
        'Un grupo de 4 piedras del mismo color dispuestas en un cuadrado compacto de 2×2 se llama en japonés "Dango" (bola de masa). ¿Cuántas libertades tiene en el centro en comparación con 4 piedras en línea recta?',
      options: [
        {
          id: 'a',
          text: 'El cuadrado 2×2 (Dango) tiene solo 8 libertades, mientras que 4 piedras en línea tienen 10 libertades y abarcan más espacio',
          isCorrect: true,
          explanation:
            '¡Exacto! El cuadrado 2×2 desperdicia contactos internos, carece de potencial de ojos y tiene menos libertades y alcance que una extensión limpia.',
        },
        {
          id: 'b',
          text: 'El cuadrado 2×2 tiene 16 libertades porque cada piedra conserva sus 4 lados',
          isCorrect: false,
          explanation: 'Las piedras en un cuadrado 2×2 se tapan mutuamente dos lados cada una.',
        },
        {
          id: 'c',
          text: 'Ambos tienen exactamente las mismas libertades y el mismo valor estratégico',
          isCorrect: false,
          explanation: 'La geometría en línea o en salto tiene más libertades y controla mucho más tablero.',
        },
      ],
    },
    conceptSteps: [
      {
        title: 'El peligro del Dango (Masa pesada sin ojos)',
        body: 'En "Attack and Defense", Ishida advierte contra ser forzado a formar una "masa" (lump / dango): un grupo de muchas piedras apelmazadas sin espacio interior para ojos y con muy pocas libertades exteriores.',
        deepDive:
          'Cuando el rival amenaza con forzarte a un Dango, a menudo es preferible sacrificar una piedra ligera y desplegarse con rapidez por fuera.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 4, y: 4, color: 'WHITE' },
            { x: 5, y: 4, color: 'WHITE' },
            { x: 4, y: 5, color: 'WHITE' },
            { x: 5, y: 5, color: 'WHITE' },
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 5, y: 3, color: 'BLACK' },
          ],
          markers: [{ x: 4, y: 4, type: 'DANGER', label: '!' }],
          caption: 'El bloque 2×2 de Blanco (Dango) es pesado, no tiene ojos y sufre escasez de libertades.',
        },
      },
      {
        title: 'Proverbio clásico: «Hane en la cabeza de dos piedras» (Nimoku no atama Mizu Hane)',
        body: 'Cuando tus dos piedras y dos piedras enemigas avanzan en paralelo, jugar el Hane doblando justo delante de las dos piedras enemigas ("en su cabeza") arrebata la iniciativa y presiona sus libertades.',
        deepDive:
          'Como explica Ishida (pág. 154, Dia. 18), dejar que el rival doble en la cabeza de tus dos piedras te somete inmediatamente a escasez de libertades y mala forma.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 5, color: 'BLACK' },
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 5, color: 'WHITE' },
            { x: 4, y: 4, color: 'WHITE' },
          ],
          markers: [{ x: 4, y: 3, type: 'SUCCESS', label: '1' }],
          caption: 'Negro 1 en E6 dobla en la cabeza de las dos piedras blancas (E4–E5) dominando el centro.',
        },
      },
    ],
    demonstration: {
      title: 'El poder del Hane en la cabeza de dos piedras',
      size: 9,
      steps: [
        {
          title: '1. Dos piedras negras y dos blancas avanzan hombro con hombro',
          narration:
            'Negro tiene D4–D5 y Blanco tiene E4–E5. Quien logre doblar delante de la columna rival dominará el combate central.',
          stones: [
            { x: 3, y: 5, color: 'BLACK' },
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 5, color: 'WHITE' },
            { x: 4, y: 4, color: 'WHITE' },
          ],
          markers: [{ x: 4, y: 3, type: 'CIRCLE' }],
        },
        {
          title: '2. Negro juega el Hane en E6',
          narration:
            'Al colocar la piedra en E6, Negro bloquea el avance de Blanco hacia arriba, proyecta influencia y amenaza con cortar o presionar a E5.',
          stones: [
            { x: 3, y: 5, color: 'BLACK' },
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 5, color: 'WHITE' },
            { x: 4, y: 4, color: 'WHITE' },
            { x: 4, y: 3, color: 'BLACK' },
          ],
          lastMove: { x: 4, y: 3 },
          markers: [{ x: 4, y: 3, type: 'SUCCESS', label: 'Hane' }],
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l15-gd-1',
        prompt:
          'Tus piedras en D4–D5 avanzan junto a las piedras blancas de E4–E5. Aplica el proverbio clásico y juega el Hane en la cabeza de las dos piedras blancas.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 5, color: 'BLACK' },
          { x: 3, y: 4, color: 'BLACK' },
          { x: 4, y: 5, color: 'WHITE' },
          { x: 4, y: 4, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 3 }],
        correctFeedback:
          '¡Hane magistral en E6! Frenas en seco el avance de las dos piedras blancas y tomas el mando hacia el centro.',
        wrongFeedback: {
          '3,3': 'Extender en D6 es pasivo y permitiría a Blanco doblar en D7 o extender cómodamente en E6.',
        },
        defaultWrongFeedback: 'Dobla diagonalmente desde D5 para colocarte justo encima de E5 (en E6).',
        hints: ['La "cabeza" de las piedras blancas E4–E5 es la intersección justo encima de E5.', 'Juega en E6 (x=4, y=3).'],
      },
    ],
    independentPractice: [
      {
        id: 'l15-ip-1',
        prompt:
          'Práctica 1: Ahora las dos piedras blancas avanzan horizontalmente en D4–E4 junto a tus piedras D5–E5. Juega el Hane en la cabeza de las dos piedras blancas (en F4).',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 4, color: 'BLACK' },
          { x: 4, y: 4, color: 'BLACK' },
          { x: 3, y: 5, color: 'WHITE' },
          { x: 4, y: 5, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 5, y: 5 }],
        correctFeedback: '¡Excelente Hane en F4! Bloqueas el extremo de las dos piedras blancas.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Coloca tu piedra justo delante del extremo derecho de D4–E4 (en F4).',
        hints: ['Mira el punto a la derecha de E4.', 'Juega en F4 (x=5, y=5).'],
      },
    ],
    summary: {
      keyIdeas: [
        'Evita formar masas compactas de piedras (Dango) sin ojos y con pocas libertades.',
        '«Hane en la cabeza de dos piedras» frena la expansión rival y reduce sus libertades.',
        'Si solo empujas una vez y te detienes, el rival doblará en la cabeza de tus dos piedras.',
      ],
      vocabulary: [
        {
          term: 'Dango',
          japanese: '団子',
          definition: 'Grupo pesado y apelotonado de piedras sin ojos e ineficiente en libertades.',
        },
        {
          term: 'Hane',
          japanese: 'ハネ',
          definition: 'Jugada diagonal que dobla alrededor del extremo de una o más piedras enemigas.',
        },
      ],
    },
    transferQuestion: {
      id: 'l15-tq-1',
      prompt: 'Evaluación: ¿Por qué en el Capítulo 7 (pág. 154) Ishida recomienda empujar dos veces antes de deslizarse cuando respondes a un golpe al hombro?',
      boardSize: 9,
      initialStones: [],
      turn: 'BLACK',
      exerciseType: 'MULTIPLE_CHOICE',
      options: [
        {
          id: 'opt-1',
          text: 'Para evitar que el rival gire inmediatamente con un Hane en la cabeza de tus dos piedras y te deje corto de libertades',
          isCorrect: true,
          feedback: '¡Exacto! Empujar dos veces impulsa tu forma antes de cambiar de dirección.',
        },
        {
          id: 'opt-2',
          text: 'Porque está prohibido deslizarse en la primera jugada',
          isCorrect: false,
          feedback: 'Es legal, pero estratégicamente permite el Hane severo del rival.',
        },
      ],
      correctFeedback: 'Has asimilado la relación entre forma y libertades.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Recuerda el efecto del Hane en la cabeza de dos piedras.',
      hints: ['Piensa en el diagrama 18 de la página 154.', 'Selecciona la primera opción.'],
    },
  },

  // ============================================================================
  // LECCIÓN 16 (Etapa 4 · Unidad 2 y 3 — Nivel Intermedio): Territorio y Poder (Atsui)
  // ============================================================================
  {
    id: 'lesson-16-equilibrio-territorio-poder-atsui',
    stageNumber: 4,
    stageTitle: '4. Territorio e influencia',
    unitNumber: 2,
    unitTitle: 'Equilibrio de Territorio y Poder (Atsui)',
    title: 'Territorio y Poder (Atsui): La Brújula del Medio Juego',
    subtitle:
      'Estudia el Capítulo 1 de "Attack and Defense": cómo estimar el balance de territorio, qué significa tener grosor (Atsui) y las 3 formas de usar el poder.',
    estimatedMinutes: 8,
    xpReward: 30,
    prerequisites: ['lesson-8-territorio-influencia-moyo'],
    relatedPuzzleIds: ['puzzle-30-empujar-hacia-muro', 'puzzle-23-invasion-san-san'],
    observableObjective:
      'Al finalizar, sabrás elegir tu estrategia según vayas ganando o perdiendo en territorio ("Un hombre rico no busca peleas") y usarás tu fuerza (Atsui) para atacar, invadir o cortar.',
    activationQuestion: {
      question:
        'Según el proverbio japonés citado por Akira Ishida en el Capítulo 1 ("Un hombre rico no busca peleas"), ¿cómo debes jugar cuando ya llevas una clara ventaja en territorio seguro?',
      options: [
        {
          id: 'a',
          text: 'Estabilizar la partida jugando de forma segura y sencilla, evitando peleas innecesarias donde el rival pueda dar un vuelco',
          isCorrect: true,
          explanation:
            '¡Exacto! Quien va ganando en territorio debe simplificar y asegurar sus fronteras; quien va por detrás en territorio es quien necesita invadir, cortar y provocar complicaciones.',
        },
        {
          id: 'b',
          text: 'Intentar matar todos los grupos del rival para ganar por cien puntos',
          isCorrect: false,
          explanation:
            'Iniciar combates arriesgados cuando ya vas ganando es la forma más común de regalarle al rival la oportunidad de remontar.',
        },
        {
          id: 'c',
          text: 'Pasar el turno inmediatamente aunque queden fronteras abiertas',
          isCorrect: false,
          explanation: 'Debes cerrar las fronteras y estabilizar tus grupos con jugadas sólidas.',
        },
      ],
    },
    conceptSteps: [
      {
        title: 'Los dos equilibrios del Medio Juego: Territorio y Poder (Atsui)',
        body: 'Ishida explica que el propósito del medio juego se resume en dos balanzas: el Equilibrio de Territorio (quien lidera al final gana la partida) y el Equilibrio de Poder o Grosor (en japonés "Atsui", grupos fuertes sin puntos débiles que irradian influencia).',
        deepDive:
          'Para estimar rápido el territorio en medio juego no cuentes punto por punto: empareja y compara directamente cada área negra con un área blanca equivalente.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 2, y: 2, color: 'BLACK' },
            { x: 2, y: 3, color: 'BLACK' },
            { x: 2, y: 4, color: 'BLACK' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 6, y: 4, color: 'WHITE' },
          ],
          markers: [{ x: 4, y: 4, type: 'SUCCESS', label: 'A' }],
          caption: 'El muro sólido de Negro a la izquierda es "Atsui" (poder): permite atacar a la piedra blanca de G5.',
        },
      },
      {
        title: 'Las 3 formas de convertir el Poder (Atsui) en victoria',
        body: '¿Cómo transforma un maestro su ventaja de poder (un muro grueso) en puntos reales? Ishida enseña tres métodos: 1) Atacar y empujar al enemigo hacia el muro para hacer territorio en otro lado; 2) Invadir el marco rival con el respaldo del muro; 3) Cortar y luchar.',
        deepDive:
          'Regla fundamental sobre los muros (Atsumi): jamás uses un muro fuerte solo para rodear unos pocos puntos pegados a él; úsalo como yunque para empujar grupos enemigos hacia él.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 2, y: 2, color: 'BLACK' },
            { x: 2, y: 3, color: 'BLACK' },
            { x: 2, y: 4, color: 'BLACK' },
            { x: 5, y: 3, color: 'WHITE' },
          ],
          markers: [{ x: 6, y: 4, type: 'SUCCESS', label: '1' }],
          caption: 'Negro ataca desde G5 empujando a la piedra blanca F6 hacia su muro fuerte de la columna C.',
        },
      },
    ],
    demonstration: {
      title: 'Usar un muro fuerte (Atsui) como yunque de ataque',
      size: 9,
      steps: [
        {
          title: '1. Negro posee un muro sólido en la izquierda y Blanco tiene una piedra débil en F6',
          narration:
            'Si Negro jugara cerca de su muro en D4, haría un territorio diminuto. En cambio, su muro en C7–C5 es un yunque perfecto.',
          stones: [
            { x: 2, y: 2, color: 'BLACK' },
            { x: 2, y: 3, color: 'BLACK' },
            { x: 2, y: 4, color: 'BLACK' },
            { x: 5, y: 3, color: 'WHITE' },
          ],
          markers: [{ x: 5, y: 3, type: 'TRIANGLE' }],
        },
        {
          title: '2. Negro ataca desde el otro lado (G5) empujando a Blanco contra el muro',
          narration:
            'Como muestra Ishida en el Diagrama 8 (pág. 14), Negro ataca en G5: empuja a Blanco hacia el muro negro mientras Negro construye un territorio nuevo en el lado derecho e inferior.',
          stones: [
            { x: 2, y: 2, color: 'BLACK' },
            { x: 2, y: 3, color: 'BLACK' },
            { x: 2, y: 4, color: 'BLACK' },
            { x: 5, y: 3, color: 'WHITE' },
            { x: 6, y: 4, color: 'BLACK' },
          ],
          lastMove: { x: 6, y: 4 },
          markers: [{ x: 6, y: 4, type: 'SUCCESS', label: '1' }],
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l16-gd-1',
        prompt:
          'Tienes un muro negro indestructible en la columna C (C7, C6, C5) y Blanco tiene una piedra débil en F6. Ataca en G5 para empujar a Blanco hacia tu muro mientras construyes territorio a la derecha.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 2, color: 'BLACK' },
          { x: 2, y: 3, color: 'BLACK' },
          { x: 2, y: 4, color: 'BLACK' },
          { x: 5, y: 3, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 6, y: 4 }],
        correctFeedback:
          '¡Dirección de juego profesional! Al jugar en G5 empujas a F6 hacia tu muro de la izquierda y reclamas el lado derecho.',
        wrongFeedback: {
          '3,3': 'Si juegas en D6 (cerca de tu muro), empujas a Blanco hacia el lado derecho abierto donde hará territorio cómodamente.',
        },
        defaultWrongFeedback: 'No juegues pegado a tu muro: ataca desde el lado derecho (G5) para empujar a Blanco hacia tu muro.',
        hints: ['En Go se empuja al enemigo HACIA tu muro fuerte.', 'Juega en G5 (x=6, y=4).'],
      },
    ],
    independentPractice: [
      {
        id: 'l16-ip-1',
        prompt:
          'Práctica 1: Tienes un muro superior muy fuerte (C7, D7, E7) y una cadena blanca débil en D4–F4 con punto de corte en E4. Como dominas el balance de poder arriba, ¡corta directamente en E4!',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 2, color: 'BLACK' },
          { x: 3, y: 2, color: 'BLACK' },
          { x: 4, y: 2, color: 'BLACK' },
          { x: 3, y: 5, color: 'WHITE' },
          { x: 5, y: 5, color: 'WHITE' },
          { x: 4, y: 4, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 5 }],
        correctFeedback:
          '¡Corte decisivo en E4! Como enseña la regla 3 de Ishida ("Cut and fight"), cuando tienes el poder exterior de tu lado, cortar al rival es demoledor.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Aprovecha tu piedra en E5 y tu muro superior para cortar en E4.',
        hints: ['Separa D4 de F4 conectando con E5.', 'Juega en E4 (x=4, y=5).'],
      },
    ],
    summary: {
      keyIdeas: [
        'Si vas por delante en territorio, juega sólido y evita peleas; si vas por detrás pero tienes poder, invade y lucha.',
        'Atsui (grosor/poder) significa tener grupos fuertes sin defectos que irradian influencia.',
        'Usa tu muro para atacar empujando al rival hacia él, para respaldar invasiones o para cortar.',
      ],
      vocabulary: [
        {
          term: 'Atsui / Atsumi',
          japanese: '厚い / 厚み',
          definition: 'Grosor o fuerza exterior sólida sin puntos de corte ni debilidades de ojos.',
        },
      ],
    },
    transferQuestion: {
      id: 'l16-tq-1',
      prompt: 'Evaluación: ¿Dónde suele dar su fruto territorial un muro grueso (Atsumi) según el Capítulo 1 de Ishida?',
      boardSize: 9,
      initialStones: [],
      turn: 'BLACK',
      exerciseType: 'MULTIPLE_CHOICE',
      options: [
        {
          id: 'opt-1',
          text: 'No en la vecindad inmediata del muro, sino en otra parte del tablero al atacar o presionar grupos enemigos contra él',
          isCorrect: true,
          feedback: '¡Exacto! "His thickness has yielded profit, not in its own immediate vicinity, but in another part of the board."',
        },
        {
          id: 'opt-2',
          text: 'Únicamente cerrando 4 o 5 puntos pegados a las piedras del muro',
          isCorrect: false,
          feedback: 'Usar un muro poderoso para cerrar unos pocos puntos pegados a él desaprovecha toda su influencia.',
        },
      ],
      correctFeedback: 'Comprendes la verdadera naturaleza del poder en el Go.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Recuerda cómo el muro actúa a distancia.',
      hints: ['El muro sirve para empujar al enemigo desde lejos.', 'Elige la primera opción.'],
    },
  },

  // ============================================================================
  // LECCIÓN 17 (Etapa 5 · Unidad 2 y 3 — Nivel Intermedio): Las 5 Fórmulas de Ataque sin Contacto
  // ============================================================================
  {
    id: 'lesson-17-cinco-formulas-ataque-sin-contacto',
    stageNumber: 5,
    stageTitle: '5. Táctica',
    unitNumber: 2,
    unitTitle: 'Las 5 Fórmulas de Ataque sin Contacto',
    title: '«No Toques lo que Atacas»: Las 5 Fórmulas de Ataque',
    subtitle:
      'Domina el principio cardinal del Capítulo 3 de "Attack and Defense": por qué el contacto fortalece al enemigo y cómo aplicar las 5 fórmulas clásicas de ataque a distancia.',
    estimatedMinutes: 8,
    xpReward: 30,
    prerequisites: ['lesson-9-escaleras-redes-snapback'],
    relatedPuzzleIds: ['puzzle-31-tesuji-roba-ojos', 'puzzle-32-ataque-sombrero-boshi', 'puzzle-33-asomo-nozoki'],
    observableObjective:
      'Aplicarás la regla "No toques lo que estás atacando" y reconocerás las 5 fórmulas de Ishida: Tesuji Roba-Ojos, Tesuji en Ángulo (Kado), Ataque de Caballo (Keima), Sombrero (Boshi) y Asomo (Nozoki).',
    activationQuestion: {
      question:
        'En el Capítulo 3 ("Attacking Moves"), ¿por qué Akira Ishida advierte con el principio «Don\'t touch what you are attacking» (No toques lo que estás atacando)?',
      options: [
        {
          id: 'a',
          text: 'Porque las jugadas de contacto provocan respuestas directas que ayudan al grupo enemigo a conectarse, ganar solidez y formar ojos rápidamente',
          isCorrect: true,
          explanation:
            '¡Exacto! Cuando tocas directamente a un grupo débil, el rival responde extendiéndose o haciendo hane con contacto, ganando forma sólida y ojos gratis.',
        },
        {
          id: 'b',
          text: 'Porque las reglas prohíben colocar piedras adyacentes a las del rival',
          isCorrect: false,
          explanation: 'El contacto es legal (y muy útil en defensa), pero al atacar un grupo débil suele ayudarle a estabilizarse.',
        },
        {
          id: 'c',
          text: 'Porque las piedras en contacto pierden automáticamente todas sus libertades',
          isCorrect: false,
          explanation: 'El problema es estratégico y de forma: el contacto endurece y fortalece al defensor.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1) El Tesuji Roba-Ojos y 2) El Tesuji en Ángulo (Kado)',
        body: 'Las dos fórmulas más severas atacan directamente la forma de ojos del rival sin tocarlo: el Tesuji Roba-Ojos (en salto de un punto frente a la base del borde) y el Tesuji en Ángulo (formando una "V" angular con dos piedras enemigas).',
        deepDive:
          'Ambos golpes destruyen la base de ojos en el borde y obligan al grupo enemigo a huir pesadamente hacia el centro sin ningún ojo asegurado.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 6, y: 3, color: 'WHITE' },
            { x: 6, y: 4, color: 'WHITE' },
            { x: 5, y: 2, color: 'BLACK' },
            { x: 6, y: 2, color: 'BLACK' },
          ],
          markers: [{ x: 7, y: 4, type: 'SUCCESS', label: '1' }],
          caption: 'El Tesuji Roba-Ojos en H5 (1) arruina de golpe la base de ojos de Blanco en el borde derecho.',
        },
      },
      {
        title: '3) Ataque de Caballo (Keima), 4) Sombrero (Boshi) y 5) Asomo (Nozoki)',
        body: 'Para perseguir o encerrar a distancia, Ishida presenta tres armas: el Caballo (Keima) para empujar al rival hacia un lado, el Sombrero (Boshi, a un espacio encima) para frenarlo de frente, y el Asomo (Nozoki) frente a un salto para forzar un triángulo vacío o contenerlo.',
        deepDive:
          'El Sombrero (Capping Attack) se juega exactamente a una intersección de distancia sobre la cabeza de las piedras enemigas, cerrando su salida al centro sin tocarlas.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 4, y: 6, color: 'WHITE' },
            { x: 5, y: 6, color: 'WHITE' },
            { x: 2, y: 5, color: 'BLACK' },
            { x: 7, y: 5, color: 'BLACK' },
          ],
          markers: [{ x: 4, y: 4, type: 'SUCCESS', label: 'Boshi' }],
          caption: 'El Ataque de Sombrero (Boshi) en E5 frena en seco la salida al centro de las piedras blancas.',
        },
      },
    ],
    demonstration: {
      title: 'Comparación: Ataque con Sombrero (Boshi) vs. Contacto erróneo',
      size: 9,
      steps: [
        {
          title: '1. Dos piedras blancas en E3–F3 buscan salir al centro',
          narration:
            'Si Negro las tocara directamente en E4, Blanco respondería en F4 quedando sólido y con muchas libertades.',
          stones: [
            { x: 4, y: 6, color: 'WHITE' },
            { x: 5, y: 6, color: 'WHITE' },
            { x: 2, y: 5, color: 'BLACK' },
            { x: 7, y: 5, color: 'BLACK' },
          ],
          markers: [{ x: 4, y: 4, type: 'CIRCLE' }],
        },
        {
          title: '2. Ataque sin contacto: El Sombrero (Boshi) en E5',
          narration:
            'Negro juega a un espacio de distancia en E5 (Boshi). Blanco queda atrapado bajo la red de influencia negra sin haber recibido ningún contacto que lo fortalezca.',
          stones: [
            { x: 4, y: 6, color: 'WHITE' },
            { x: 5, y: 6, color: 'WHITE' },
            { x: 2, y: 5, color: 'BLACK' },
            { x: 7, y: 5, color: 'BLACK' },
            { x: 4, y: 4, color: 'BLACK' },
          ],
          lastMove: { x: 4, y: 4 },
          markers: [{ x: 4, y: 4, type: 'SUCCESS', label: 'Boshi' }],
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l17-gd-1',
        prompt:
          'Fórmula 1 (El Tesuji Roba-Ojos): El grupo blanco en G6–G5 busca hacer dos ojos en el borde derecho. Juega el Tesuji Roba-Ojos en H5 (sin tocar a Blanco) para destruir su base.',
        boardSize: 9,
        initialStones: [
          { x: 6, y: 3, color: 'WHITE' },
          { x: 6, y: 4, color: 'WHITE' },
          { x: 5, y: 2, color: 'BLACK' },
          { x: 6, y: 2, color: 'BLACK' },
          { x: 6, y: 6, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 7, y: 4 }],
        correctFeedback:
          '¡Tesuji Roba-Ojos exacto en H5! Como enseña Ishida en la página 64, este golpe en la segunda línea priva a Blanco de su espacio de ojos en el borde.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Juega en H5 (segunda línea, a un salto de tu piedra G7) para robar la base de ojos blanca.',
        hints: ['Mira el punto vital en la segunda línea a la derecha de G5.', 'Juega en H5 (x=7, y=4).'],
      },
      {
        id: 'l17-gd-2',
        prompt:
          'Fórmula 4 (Ataque de Sombrero / Boshi): Detén de frente a las dos piedras blancas de E3–F3 jugando el Sombrero a un espacio de distancia en E5.',
        boardSize: 9,
        initialStones: [
          { x: 4, y: 6, color: 'WHITE' },
          { x: 5, y: 6, color: 'WHITE' },
          { x: 2, y: 5, color: 'BLACK' },
          { x: 7, y: 5, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [
          { x: 4, y: 4 },
          { x: 5, y: 4 },
        ],
        correctFeedback:
          '¡Sombrero (Boshi) impecable! Contienes al grupo blanco sin tocarlo y dominas el centro.',
        wrongFeedback: {
          '4,5': 'Tocar en E4 viola la regla "No toques lo que atacas": Blanco respondería con fuerza en F4.',
        },
        defaultWrongFeedback: 'Coloca el sombrero un espacio por encima de E3–F3 (en E5 o F5).',
        hints: ['Deja la fila 4 vacía y juega en la fila 5 encima de las piedras blancas.', 'Juega en E5 (x=4, y=4).'],
      },
    ],
    independentPractice: [
      {
        id: 'l17-ip-1',
        prompt:
          'Práctica 1 — Fórmula 5 (El Asomo / Nozoki): Blanco tiene una forma en L en D4, E4 y F5. Asómate (Peep / Nozoki) en D5 para obligar a Blanco a conectarse en un pesado Triángulo Vacío (Dia. 2, pág. 71 de Ishida).',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 5, color: 'WHITE' },
          { x: 4, y: 5, color: 'WHITE' },
          { x: 5, y: 4, color: 'WHITE' },
          { x: 2, y: 3, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 3, y: 4 }],
        correctFeedback:
          '¡Nozoki magistral en D5! Si Blanco conecta en E5 para no ser cortado, queda con un ineficiente Triángulo Vacío (D4–E4–E5) y sin forma de ojos.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Asómate en D5 (encima de D4 y a dos pasos de F5) amenazando con separar la forma blanca.',
        hints: ['Busca el punto que amenaza separar D4–E4 de F5.', 'Juega en D5 (x=3, y=4).'],
      },
    ],
    summary: {
      keyIdeas: [
        'Regla de oro del ataque: «No toques lo que estás atacando» (el contacto ayuda al defensor a fortalecerse).',
        'El Tesuji Roba-Ojos y el Tesuji en Ángulo (Kado) destruyen directamente la forma de ojos del rival.',
        'El Caballo (Keima) persigue, el Sombrero (Boshi) frena de frente y el Asomo (Nozoki) arruina la forma enemiga.',
      ],
      vocabulary: [
        {
          term: 'Boshi (Sombrero)',
          japanese: '帽子',
          definition: 'Ataque sin contacto a un espacio por encima de una piedra enemiga para tapar su salida al centro.',
        },
        {
          term: 'Nozoki (Asomo)',
          japanese: 'ノゾキ',
          definition: 'Jugada que amenaza con cortar una conexión de un espacio o diagonal, forzando al rival a conectarse con mala forma.',
        },
      ],
    },
    transferQuestion: {
      id: 'l17-tq-1',
      prompt: 'Evaluación: ¿Cuál es la diferencia entre el Ataque de Caballo (Keima) y el Ataque de Sombrero (Boshi) según el Capítulo 3 de Ishida?',
      boardSize: 9,
      initialStones: [],
      turn: 'BLACK',
      exerciseType: 'MULTIPLE_CHOICE',
      options: [
        {
          id: 'opt-1',
          text: 'El Ataque de Caballo se usa por un flanco para perseguir y dirigir al enemigo hacia un lado, mientras que el Sombrero se juega de frente para detener su salida al centro',
          isCorrect: true,
          feedback: '¡Exacto! "Whereas the aim of the knight\'s attack is to chase the enemy, the capping attack stops him head-on." (pág. 69).',
        },
        {
          id: 'opt-2',
          text: 'Ambos son jugadas de contacto directo para capturar una piedra en escalera',
          isCorrect: false,
          feedback: 'Ninguno de los dos toca directamente la piedra atacada.',
        },
      ],
      correctFeedback: 'Dominas las 5 fórmulas de ataque de Akira Ishida.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Recuerda: Caballo = perseguir lateralmente; Sombrero = frenar de frente.',
      hints: ['Piensa en la posición relativa de la piedra atacante.', 'Selecciona la primera opción.'],
    },
  },

  // ============================================================================
  // LECCIÓN 18 (Etapa 6 · Unidad 2 y 3 — Nivel Intermedio): Nakade y Puntos Vitales
  // ============================================================================
  {
    id: 'lesson-18-nakade-puntos-vitales-tsumego',
    stageNumber: 6,
    stageTitle: '6. Vida y muerte',
    unitNumber: 2,
    unitTitle: 'Espacios internos de 3, 4 y 5 puntos (Nakade)',
    title: 'Formas de Nakade: Tres en Ángulo, Pirámide de Cuatro y Cruz de Cinco',
    subtitle:
      'Domina la geometría de los espacios internos en Vida y Muerte (Tsumego): cómo encontrar instantáneamente el punto vital que da la vida o la muerte.',
    estimatedMinutes: 8,
    xpReward: 30,
    prerequisites: ['lesson-10-dos-ojos-vida-muerte'],
    relatedPuzzleIds: ['puzzle-17-hacer-dos-ojos', 'puzzle-18-matar-punto-vital', 'puzzle-34-nakade-piramide-cuatro'],
    observableObjective:
      'Reconocerás al instante el punto vital simétrico en las formas clásicas de Nakade (Tres en línea, Tres en ángulo, Pirámide de 4 / T-shape y Cruz de 5) tanto para vivir como para matar.',
    activationQuestion: {
      question:
        'Un grupo rodeado tiene un espacio interno con forma de "T" de 4 intersecciones vacías (Pirámide de Cuatro). ¿Qué ocurre si el atacante juega primero en el punto central de la "T"?',
      options: [
        {
          id: 'a',
          text: 'El grupo muere (Nakade): aunque el defensor capture después las 4 piedras, el punto central seguirá siendo el único ojo',
          isCorrect: true,
          explanation:
            '¡Exacto! En la Pirámide de 4 (y en los 3 en línea/ángulo), todas las intersecciones vecinas convergen en el nodo central; ocuparlo impide dividir el espacio en dos ojos.',
        },
        {
          id: 'b',
          text: 'Cualquier espacio de 4 puntos está siempre vivo sin importar quién juegue primero',
          isCorrect: false,
          explanation:
            'Mientras que "Cuatro en línea" está vivo incondicionalmente, el "Cuadrado 2×2" está muerto y la "Pirámide de 4" depende de quién ocupe primero su centro.',
        },
        {
          id: 'c',
          text: 'El atacante comete suicidio ilegal',
          isCorrect: false,
          explanation: 'Como aún quedan otras 3 intersecciones vacías dentro del espacio, jugar en el punto vital tiene libertades y es 100% legal.',
        },
      ],
    },
    conceptSteps: [
      {
        title: 'La Ley de la Simetría en Nakade',
        body: 'En las formas internas que tienen un nodo central conectado a todas las demás casillas vacías (3 en línea, 3 en L, Pirámide de 4 en T y Cruz de 5), ese nodo de simetría es SIEMPRE el punto vital.',
        deepDive:
          'Si el defensor juega allí primero, divide el espacio en dos o tres ojos independientes y vive. Si el atacante juega allí primero (Nakade), reduce todo el espacio a un único ojo.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 0, y: 2, color: 'WHITE' },
            { x: 1, y: 2, color: 'WHITE' },
            { x: 2, y: 2, color: 'WHITE' },
            { x: 2, y: 1, color: 'WHITE' },
            { x: 2, y: 0, color: 'WHITE' },
            { x: 0, y: 1, color: 'WHITE' },
            { x: 0, y: 3, color: 'BLACK' },
            { x: 1, y: 3, color: 'BLACK' },
            { x: 2, y: 3, color: 'BLACK' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 3, y: 1, color: 'BLACK' },
            { x: 3, y: 0, color: 'BLACK' },
          ],
          markers: [{ x: 1, y: 0, type: 'SUCCESS', label: '★' }],
          caption: 'Espacio de 3 en ángulo (A9, B9, B8): el vértice B9 es el punto vital para ambos bandos.',
        },
      },
      {
        title: 'Cuatro en Línea vs. Cuadrado 2×2 vs. Pirámide de Cuatro',
        body: 'Con 4 puntos vacíos dentro de un grupo rodeado existen tres destinos distintos: 1) Cuatro en línea recta = Vivo siempre (tiene dos puntos vitales en miai); 2) Cuadrado 2×2 = Muerto siempre; 3) Pirámide en T = Quien juega en el centro gana.',
        deepDive:
          'Por eso, cuando defiendes un grupo, busca siempre alargar tu espacio en línea en vez de dejarlo en cuadrado.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 0, y: 1, color: 'BLACK' },
            { x: 1, y: 2, color: 'BLACK' },
            { x: 2, y: 1, color: 'BLACK' },
            { x: 3, y: 1, color: 'BLACK' },
            { x: 3, y: 0, color: 'BLACK' },
            { x: 0, y: 2, color: 'WHITE' },
            { x: 1, y: 3, color: 'WHITE' },
            { x: 2, y: 2, color: 'WHITE' },
            { x: 4, y: 1, color: 'WHITE' },
            { x: 4, y: 0, color: 'WHITE' },
          ],
          markers: [{ x: 1, y: 0, type: 'SUCCESS', label: 'Vital' }],
          caption: 'Pirámide de 4 en el borde (A9, B9, C9 y B8): B9 es el corazón de la forma.',
        },
      },
    ],
    demonstration: {
      title: 'Salvar o matar la Pirámide de Cuatro en el punto vital B9',
      size: 9,
      steps: [
        {
          title: '1. Grupo negro con espacio interno en forma de T (A9, B9, C9, B8)',
          narration:
            'Observa cómo B9 toca simultáneamente a A9, C9 y B8. Es el único punto que conecta los tres brazos de la T.',
          stones: [
            { x: 0, y: 1, color: 'BLACK' },
            { x: 1, y: 2, color: 'BLACK' },
            { x: 2, y: 1, color: 'BLACK' },
            { x: 3, y: 1, color: 'BLACK' },
            { x: 3, y: 0, color: 'BLACK' },
            { x: 0, y: 2, color: 'WHITE' },
            { x: 1, y: 3, color: 'WHITE' },
            { x: 2, y: 2, color: 'WHITE' },
            { x: 4, y: 1, color: 'WHITE' },
            { x: 4, y: 0, color: 'WHITE' },
          ],
          markers: [{ x: 1, y: 0, type: 'CIRCLE' }],
        },
        {
          title: '2. Negro ocupa B9 y crea tres ojos separados (A9, C9 y B8)',
          narration:
            'Al jugar en B9, el grupo negro divide su espacio en compartimentos independientes y queda 100% vivo.',
          stones: [
            { x: 0, y: 1, color: 'BLACK' },
            { x: 1, y: 2, color: 'BLACK' },
            { x: 2, y: 1, color: 'BLACK' },
            { x: 3, y: 1, color: 'BLACK' },
            { x: 3, y: 0, color: 'BLACK' },
            { x: 0, y: 2, color: 'WHITE' },
            { x: 1, y: 3, color: 'WHITE' },
            { x: 2, y: 2, color: 'WHITE' },
            { x: 4, y: 1, color: 'WHITE' },
            { x: 4, y: 0, color: 'WHITE' },
            { x: 1, y: 0, color: 'BLACK' },
          ],
          lastMove: { x: 1, y: 0 },
          markers: [
            { x: 0, y: 0, type: 'SUCCESS', label: '1' },
            { x: 2, y: 0, type: 'SUCCESS', label: '2' },
            { x: 1, y: 1, type: 'SUCCESS', label: '3' },
          ],
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l18-gd-1',
        prompt:
          'El grupo blanco en la esquina superior izquierda tiene un espacio de "Tres en Ángulo" (A9, B9 y B8). Golpea en el vértice del ángulo (B9) para destruir sus dos ojos.',
        boardSize: 9,
        initialStones: [
          { x: 0, y: 1, color: 'WHITE' },
          { x: 0, y: 2, color: 'WHITE' },
          { x: 1, y: 2, color: 'WHITE' },
          { x: 2, y: 2, color: 'WHITE' },
          { x: 2, y: 1, color: 'WHITE' },
          { x: 2, y: 0, color: 'WHITE' },
          { x: 0, y: 3, color: 'BLACK' },
          { x: 1, y: 3, color: 'BLACK' },
          { x: 2, y: 3, color: 'BLACK' },
          { x: 3, y: 2, color: 'BLACK' },
          { x: 3, y: 1, color: 'BLACK' },
          { x: 3, y: 0, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 1, y: 0 }],
        correctFeedback:
          '¡Nakade letal en el vértice B9! Ahora A9 y B8 no pueden convertirse en dos ojos separados.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Ocupa el vértice central del ángulo formado por A9, B9 y B8.',
        hints: ['B9 es la intersección que une A9 con B8.', 'Juega en B9 (x=1, y=0).'],
      },
      {
        id: 'l18-gd-2',
        prompt:
          'Tu grupo negro tiene una "Pirámide de Cuatro" en el borde superior (A9, B9, C9 y B8). Juega en el punto vital para dividir el espacio y vivir.',
        boardSize: 9,
        initialStones: [
          { x: 0, y: 1, color: 'BLACK' },
          { x: 1, y: 2, color: 'BLACK' },
          { x: 2, y: 1, color: 'BLACK' },
          { x: 3, y: 1, color: 'BLACK' },
          { x: 3, y: 0, color: 'BLACK' },
          { x: 0, y: 2, color: 'WHITE' },
          { x: 1, y: 3, color: 'WHITE' },
          { x: 2, y: 2, color: 'WHITE' },
          { x: 4, y: 1, color: 'WHITE' },
          { x: 4, y: 0, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 1, y: 0 }],
        correctFeedback: '¡Grupo salvado en B9! Has separado A9, C9 y B8 en ojos independientes.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Juega en el centro de la T (B9).',
        hints: ['Mira la intersección donde se cruzan los tres brazos.', 'Juega en B9 (x=1, y=0).'],
      },
    ],
    independentPractice: [
      {
        id: 'l18-ip-1',
        prompt:
          'Práctica 1: El grupo blanco tiene una Pirámide de Cuatro en A9, B9, C9 y B8, pero es el turno de Negro. ¡Juega el Nakade en B9 para matar todo el grupo blanco!',
        boardSize: 9,
        initialStones: [
          { x: 0, y: 1, color: 'WHITE' },
          { x: 1, y: 2, color: 'WHITE' },
          { x: 2, y: 1, color: 'WHITE' },
          { x: 3, y: 1, color: 'WHITE' },
          { x: 3, y: 0, color: 'WHITE' },
          { x: 0, y: 2, color: 'BLACK' },
          { x: 1, y: 3, color: 'BLACK' },
          { x: 2, y: 2, color: 'BLACK' },
          { x: 4, y: 1, color: 'BLACK' },
          { x: 4, y: 0, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 1, y: 0 }],
        correctFeedback: '¡Nakade magistral en B9! El grupo blanco ya no puede dividir su espacio y está muerto.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Coloca tu piedra en el centro de la pirámide blanca (B9).',
        hints: ['El punto vital de tu enemigo es tu propio punto vital.', 'Juega en B9 (x=1, y=0).'],
      },
    ],
    summary: {
      keyIdeas: [
        'En Tres en Línea, Tres en Ángulo, Pirámide de 4 y Cruz de 5, el nodo central simétrico es el punto vital.',
        'Cuatro en Línea está vivo incondicionalmente; el Cuadrado 2×2 está muerto incondicionalmente.',
        'Jugar en el punto vital del espacio enemigo para reducirlo a un solo ojo se denomina Nakade.',
      ],
      vocabulary: [
        {
          term: 'Nakade',
          japanese: 'ナカデ',
          definition: 'Colocar una o varias piedras de sacrificio en el punto vital interior del enemigo para que al capturarlas solo le quede un ojo.',
        },
      ],
    },
    transferQuestion: {
      id: 'l18-tq-1',
      prompt: 'Evaluación: ¿Por qué un grupo rodeado con un espacio interno de "Cuatro en línea recta" (p. ej. A9–B9–C9–D9) está vivo incluso si el atacante juega primero?',
      boardSize: 9,
      initialStones: [],
      turn: 'BLACK',
      exerciseType: 'MULTIPLE_CHOICE',
      options: [
        {
          id: 'opt-1',
          text: 'Porque existen dos puntos divisorios centrales (B9 y C9) en Miai: si el atacante ocupa uno, el defensor ocupa inmediatamente el otro',
          isCorrect: true,
          feedback: '¡Exacto! Con dos puntos divisorios equivalentes (Miai), el atacante no puede ocupar ambos a la vez.',
        },
        {
          id: 'opt-2',
          text: 'Porque las reglas impiden jugar dentro de espacios de 4 puntos',
          isCorrect: false,
          feedback: 'El atacante puede jugar dentro, pero el defensor siempre conservará el segundo punto central para dividir.',
        },
      ],
      correctFeedback: 'Dominas la teoría de Nakade y espacios vitales.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Piensa en los dos puntos centrales B9 y C9 como pareja Miai.',
      hints: ['Si el rival juega B9, tú juegas C9.', 'Selecciona la primera opción.'],
    },
  },

  // ============================================================================
  // LECCIÓN 19 (Etapa 7 · Unidad 3 — Nivel Avanzado): Estrategia de Ataque (Ishida Cap. 2)
  // ============================================================================
  {
    id: 'lesson-19-estrategia-ataque-apoyo-division',
    stageNumber: 7,
    stageTitle: '7. Estrategia global',
    unitNumber: 3,
    unitTitle: 'Dirección de juego, Ataque de Apoyo y Divide y Vencerás',
    title: 'Estrategia de Ataque: Dirección, Apoyo (Motare) y División (Karami)',
    subtitle:
      'Estudia el Capítulo 2 de "Attack and Defense": por qué el objetivo del ataque no es obsesionarse con matar, sino ganar territorio y poder mediante ataques de apoyo y ataques dobles.',
    estimatedMinutes: 8,
    xpReward: 35,
    prerequisites: ['lesson-11-sente-gote-fuseki-joseki'],
    relatedPuzzleIds: ['puzzle-36-ataque-division-karami', 'puzzle-37-corte-bueno-vs-malo'],
    observableObjective:
      'Al terminar, sabrás elegir la dirección de ataque para expandir tu propio marco, usar el Ataque de Apoyo (Leaning Attack / Motare), ejecutar Ataques de División (Splitting Attack / Karami) y distinguir un corte bueno de uno malo.',
    activationQuestion: {
      question:
        'En el Capítulo 2 ("Attacking Strategy"), Akira Ishida relata la historia de un jugador que perdió 19 partidas seguidas porque intentaba matar a toda costa cada grupo rival. ¿Cuál es la verdadera respuesta de un maestro a la pregunta «¿Cuál es el propósito de atacar?»?',
      options: [
        {
          id: 'a',
          text: 'No es "capturar y matar", sino "ganar territorio o ganar poder (influencia)" mientras se obliga al grupo enemigo a vivir pequeño',
          isCorrect: true,
          explanation:
            '¡Exacto! Como escribe Ishida en la página 23: "If anyone asked him now about the purpose of attacking, his answer would not be \'To capture and kill,\' but \'To gain territory,\' or \'To gain power.\'"',
        },
        {
          id: 'b',
          text: 'Destruir todas las piedras del rival aunque tengas que arruinar tu propio territorio',
          isCorrect: false,
          explanation: 'Perseguir una escalera que no funciona o un ataque suicida solo destroza tu propia posición (Dia. 1 y 3, págs. 21-22).',
        },
        {
          id: 'c',
          text: 'No atacar jamás a ningún grupo débil',
          isCorrect: false,
          explanation: 'Debes atacar los grupos débiles, pero haciéndolo desde la dirección que construya tu propio territorio.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1) Dirección de Ataque y 2) Ataques de Apoyo (Leaning Attacks / Motare)',
        body: 'La pregunta clave al atacar no es "¿cómo lo mato?", sino "¿desde qué dirección lo ataco?". Ataca siempre desde el lado donde puedas expandir tu propio marco territorial. Y si tu propio grupo es débil, apóyate primero (Leaning Attack / Motare) contra un grupo vecino para fortalecerte antes de atacar a tu objetivo real.',
        deepDive:
          'En una Batalla en Carrera (Running Battle) entre dos grupos débiles que corren hacia el centro, la jugada clave es la que simultáneamente fortalece tu grupo y debilita el espacio de ojos del rival.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 2, y: 2, color: 'BLACK' },
            { x: 6, y: 2, color: 'BLACK' },
            { x: 4, y: 6, color: 'WHITE' },
            { x: 4, y: 7, color: 'WHITE' },
          ],
          markers: [{ x: 4, y: 4, type: 'SUCCESS', label: 'A' }],
          caption: 'Atacar desde arriba en E5 (A) expande el gran marco superior negro mientras presiona al grupo blanco inferior.',
        },
      },
      {
        title: '3) Divide y Vencerás (Splitting Attack / Karami) y 4) Cortes Buenos vs. Malos',
        body: 'Cuando el enemigo tiene dos grupos débiles, juega en medio de ambos (Splitting Attack) para impedir que se unan. Y respecto a los cortes: corta solo cuando el rival NO pueda permitirse sacrificar ninguno de los dos lados; si cortas una piedra insignificante que el rival sacrifica encantado para ganar fuerza exterior en Sente, es un mal corte (Dia. 4 y 6, págs. 46-47).',
        deepDive:
          'Si los dos grupos débiles están lejos, persigue a uno hacia el otro hasta estrechar la brecha y entonces lánzate en medio para dividirlos.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 2, y: 2, color: 'WHITE' },
            { x: 2, y: 3, color: 'WHITE' },
            { x: 2, y: 6, color: 'WHITE' },
            { x: 2, y: 7, color: 'WHITE' },
            { x: 5, y: 2, color: 'BLACK' },
            { x: 5, y: 7, color: 'BLACK' },
          ],
          markers: [{ x: 2, y: 4, type: 'SUCCESS', label: '1' }],
          caption: 'Negro 1 en C5 divide las dos cadenas blancas débiles (C7–C6 y C3–C2) para atacarlas a la vez.',
        },
      },
    ],
    demonstration: {
      title: 'Divide y Vencerás: El Ataque Doble (Splitting Attack)',
      size: 9,
      steps: [
        {
          title: '1. Dos grupos blancos débiles separados por una brecha en C5',
          narration:
            'Si Negro atacara desde fuera, Blanco conectaría en C5 formando un solo grupo gigante e invulnerable (Dia. 1, pág. 41).',
          stones: [
            { x: 2, y: 2, color: 'WHITE' },
            { x: 2, y: 3, color: 'WHITE' },
            { x: 2, y: 6, color: 'WHITE' },
            { x: 2, y: 7, color: 'WHITE' },
            { x: 5, y: 2, color: 'BLACK' },
            { x: 5, y: 7, color: 'BLACK' },
          ],
          markers: [{ x: 2, y: 4, type: 'CIRCLE' }],
        },
        {
          title: '2. Negro juega en C5: Ataque de División (Karami)',
          narration:
            'Al colocar la piedra en C5, Negro separa permanentemente ambos grupos blancos y los amenaza simultáneamente mientras construye poder en el centro.',
          stones: [
            { x: 2, y: 2, color: 'WHITE' },
            { x: 2, y: 3, color: 'WHITE' },
            { x: 2, y: 6, color: 'WHITE' },
            { x: 2, y: 7, color: 'WHITE' },
            { x: 5, y: 2, color: 'BLACK' },
            { x: 5, y: 7, color: 'BLACK' },
            { x: 2, y: 4, color: 'BLACK' },
          ],
          lastMove: { x: 2, y: 4 },
          markers: [{ x: 2, y: 4, type: 'SUCCESS', label: 'Split' }],
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l19-gd-1',
        prompt:
          'Atacar para Ganar Territorio (Ishida pág. 23, Dia. 1–2): Tienes dos piedras negras arriba (C7 y G7) y Blanco tiene un grupo débil abajo en E3–E2. ¿Atacas desde arriba en E5 para expandir tu marco central, o desde abajo en F2 empujando a Blanco hacia tu propio centro?',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 2, color: 'BLACK' },
          { x: 6, y: 2, color: 'BLACK' },
          { x: 4, y: 6, color: 'WHITE' },
          { x: 4, y: 7, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 4 }],
        correctFeedback:
          '¡Dirección perfecta en E5! Como demuestra Ishida en el Diagrama 2 (pág. 24), atacar desde E5 expande tu gran marco superior mientras presiona al grupo de E3.',
        wrongFeedback: {
          '5,7': 'Como advierte el Diagrama 3 de Ishida, atacar por el borde en F2 obliga a Blanco a saltar hacia el centro, arruinando tu propio marco superior.',
        },
        defaultWrongFeedback: 'Ataca desde el centro (E5) para cerrar tu marco entre C7 y G7.',
        hints: ['No empujes al enemigo hacia tu área de potencial.', 'Juega en E5 (x=4, y=4).'],
      },
      {
        id: 'l19-gd-2',
        prompt:
          'Divide y Vencerás (Ishida pág. 41): Blanco tiene dos grupos débiles en la izquierda (C7–C6 arriba y C3–C2 abajo). Juega el ataque de división (Splitting Attack) justo en medio para impedir que se conecten.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 2, color: 'WHITE' },
          { x: 2, y: 3, color: 'WHITE' },
          { x: 2, y: 6, color: 'WHITE' },
          { x: 2, y: 7, color: 'WHITE' },
          { x: 5, y: 2, color: 'BLACK' },
          { x: 5, y: 7, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [
          { x: 2, y: 4 },
          { x: 2, y: 5 },
        ],
        correctFeedback:
          '¡Ataque doble demoledor! Al separar ambos grupos blancos en la columna C, Blanco no podrá defender ambos cómodamente.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Coloca tu piedra entre los dos grupos blancos en C5 o C4.',
        hints: ['Busca el punto intermedio en la columna C entre C6 y C3.', 'Juega en C5 (x=2, y=4).'],
      },
    ],
    independentPractice: [
      {
        id: 'l19-ip-1',
        prompt:
          'Práctica 1 (Corte Bueno — Ishida pág. 46, Dia. 1–2): Las cadenas blancas de D6–D5 y E5–F5 tienen un defecto de corte fatal en E6. ¡Corta en E6 para separar ambos grupos blancos!',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 3, color: 'WHITE' },
          { x: 3, y: 4, color: 'WHITE' },
          { x: 4, y: 4, color: 'WHITE' },
          { x: 5, y: 4, color: 'WHITE' },
          { x: 3, y: 2, color: 'BLACK' },
          { x: 5, y: 3, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 3 }],
        correctFeedback:
          '¡Corte magistral en E6! Blanco no puede regalar ninguno de los dos grupos y tus piedras de D7 y F6 respaldan el doble ataque.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Juega en el punto de corte E6.',
        hints: ['Mira la esquina interior entre D6 y E5.', 'Juega en E6 (x=4, y=3).'],
      },
    ],
    summary: {
      keyIdeas: [
        'Ataca para ganar territorio o poder desde la dirección correcta, no por obsesión de matar.',
        'Usa Ataques de Apoyo (Motare) contra un grupo vecino para fortalecerte antes de lanzar tu ataque principal.',
        'Divide dos grupos débiles (Splitting Attack) y corta solo aquello que el rival no pueda sacrificar.',
      ],
      vocabulary: [
        {
          term: 'Motare (Ataque de apoyo)',
          japanese: 'モタレ攻め',
          definition: 'Presionar o apoyarse contra un grupo enemigo para ganar fuerza antes de atacar al verdadero objetivo.',
        },
        {
          term: 'Karami (Ataque doble / de división)',
          japanese: 'カラミ攻め',
          definition: 'Separar y amenazar simultáneamente a dos grupos débiles del oponente.',
        },
      ],
    },
    transferQuestion: {
      id: 'l19-tq-1',
      prompt: 'Evaluación: Según la sección "Cuts" (págs. 45–47) de Akira Ishida, ¿cuándo un corte es un MAL corte?',
      boardSize: 9,
      initialStones: [],
      turn: 'BLACK',
      exerciseType: 'MULTIPLE_CHOICE',
      options: [
        {
          id: 'opt-1',
          text: 'Cuando cortas una o dos piedras sin valor que el enemigo puede sacrificar gustosamente para apretarte (squeeze) y construir un muro exterior en Sente',
          isCorrect: true,
          feedback: '¡Exacto! "If you cut off something that the enemy can afford to give up, the cut may actually be counter-productive, helping him to strengthen his position."',
        },
        {
          id: 'opt-2',
          text: 'Cuando el corte separa dos grupos grandes sin ojos del rival',
          isCorrect: false,
          feedback: 'Separar dos grupos grandes e importantes es precisamente el mejor corte posible.',
        },
      ],
      correctFeedback: 'Sabes distinguir los cortes estratégicos de los cortes contraproducentes.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Recuerda qué pasa cuando el rival sacrifica lo cortado para ganar fuerza exterior.',
      hints: ['Piensa si el rival puede permitirse regalar esa piedra.', 'Selecciona la primera opción.'],
    },
  },

  // ============================================================================
  // LECCIÓN 20 (Etapa 8 · Unidad 1 y 2 — Nivel Avanzado): Josekis de Invasión en 3 Espacios (Ishida Cap. 8)
  // ============================================================================
  {
    id: 'lesson-20-joseki-invasion-tres-espacios',
    stageNumber: 8,
    stageTitle: '8. Joseki con criterio',
    unitNumber: 1,
    unitTitle: 'Josekis de Invasión en Extensiones de Tres Espacios',
    title: 'Invasiones en Extensiones de Tres Espacios y la Cuña (Warikomi)',
    subtitle:
      'Domina el Capítulo 8 de "Attack and Defense": dónde invadir las extensiones de 3 espacios en 3ª y 4ª línea, los puntos en "V" y las respuestas clásicas.',
    estimatedMinutes: 8,
    xpReward: 35,
    prerequisites: ['lesson-11-sente-gote-fuseki-joseki'],
    relatedPuzzleIds: ['puzzle-38-invasion-extension-tres-espacios', 'puzzle-39-cuna-warikomi'],
    observableObjective:
      'Sabrás exactamente dónde invadir una extensión de 3 espacios en la 3ª línea, identificarás los 3 puntos en "V" de la extensión de 3ª a 4ª línea y aplicarás la Cuña (Warikomi).',
    activationQuestion: {
      question:
        'Blanco ha formado una extensión de tres espacios en la tercera línea (por ejemplo, piedras en C3 y G3 con D3, E3 y F3 vacíos). Según el Capítulo 8 de Ishida (pág. 174), ¿cuál es el punto exacto para invadirla?',
      options: [
        {
          id: 'a',
          text: 'Directamente en el punto medio de la tercera línea entre las dos piedras (E3)',
          isCorrect: true,
          explanation:
            '¡Exacto! "The best place to invade it is on the third line directly between the two stones. Exceptions to this rule are so rare they do not matter." (pág. 174).',
        },
        {
          id: 'b',
          text: 'En la primera línea en el borde (E1)',
          isCorrect: false,
          explanation: 'En la primera línea quedarías aplastado sin libertades ni base.',
        },
        {
          id: 'c',
          text: 'Una extensión de 3 espacios es completamente invulnerable',
          isCorrect: false,
          explanation: 'La extensión de 2 espacios es sólida, pero la de 3 espacios deja un punto de invasión en el centro.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1) Extensión de 3 espacios en 3ª línea y las 3 respuestas del defensor',
        body: 'La invasión en el punto medio (E3) divide las dos piedras de C3 y G3. Según Ishida (pág. 175), el defensor elige entre 3 respuestas según su fuerza alrededor: 1) Jugada Diagonal (Kosumi) si es muy fuerte para atacar; 2) Salto o ataque indirecto; 3) Contacto inferior (2ª línea) para sacrificar la piedra de invasión y quedarse con fuerza exterior.',
        deepDive:
          'Si el invasor no tiene apoyo cercano, el defensor usa el Kosumi diagonal para empujarlo contra su esquina fuerte.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 2, y: 6, color: 'WHITE' },
            { x: 6, y: 6, color: 'WHITE' },
            { x: 1, y: 3, color: 'BLACK' },
          ],
          markers: [{ x: 4, y: 6, type: 'SUCCESS', label: '1' }],
          caption: 'Negro 1 en E3 invade exactamente en el punto medio de la extensión blanca de 3 espacios.',
        },
      },
      {
        title: '2) Extensión de 3ª a 4ª línea: Los Puntos en "V" y la Cuña (Warikomi)',
        body: 'Cuando la extensión de 3 espacios va de la 3ª a la 4ª línea (p. ej. C3 y G4), los tres puntos correctos forman una "V" (D4, E3, F4). El vértice en la 3ª línea (E3) es la única invasión verdadera; los otros dos son reducciones (pág. 179).',
        deepDive:
          'Si el defensor responde a la invasión en E3 pegándose en E4 (Attachment), y la escalera te favorece, la continuación más potente es la Cuña (Wedge / Warikomi) metiéndose entre las piedras (pág. 181).',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 2, y: 6, color: 'WHITE' },
            { x: 6, y: 5, color: 'WHITE' },
            { x: 4, y: 6, color: 'BLACK' },
            { x: 4, y: 5, color: 'WHITE' },
          ],
          markers: [{ x: 3, y: 5, type: 'SUCCESS', label: 'Cuña' }],
          caption: 'Tras la invasión en E3 y el contacto blanco en E4, la Cuña (Warikomi) en D4 destroza la forma rival si la escalera funciona.',
        },
      },
    ],
    demonstration: {
      title: 'Invasión en el punto medio E3 de una extensión de 3 espacios',
      size: 9,
      steps: [
        {
          title: '1. Extensión blanca de tres espacios entre C3 y G3',
          narration:
            'Entre C3 y G3 hay 3 intersecciones vacías (D3, E3, F3). Con la piedra negra de apoyo en B6, ha llegado el momento de invadir.',
          stones: [
            { x: 2, y: 6, color: 'WHITE' },
            { x: 6, y: 6, color: 'WHITE' },
            { x: 1, y: 3, color: 'BLACK' },
          ],
          markers: [{ x: 4, y: 6, type: 'CIRCLE' }],
        },
        {
          title: '2. Golpe en el vértice E3',
          narration:
            'Negro invade en E3, dejando a C3 y G3 desconectadas y con espacio suficiente para saltar al centro o enlazarse por debajo.',
          stones: [
            { x: 2, y: 6, color: 'WHITE' },
            { x: 6, y: 6, color: 'WHITE' },
            { x: 1, y: 3, color: 'BLACK' },
            { x: 4, y: 6, color: 'BLACK' },
          ],
          lastMove: { x: 4, y: 6 },
          markers: [{ x: 4, y: 6, type: 'SUCCESS', label: 'E3' }],
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l20-gd-1',
        prompt:
          'Blanco tiene una extensión de tres espacios en la tercera línea (C3 y G3). Invade en el punto clásico que divide ambas piedras.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 6, color: 'WHITE' },
          { x: 6, y: 6, color: 'WHITE' },
          { x: 1, y: 3, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 6 }],
        correctFeedback:
          '¡Invasión exacta en E3! Es el punto universal para invadir la extensión de 3 espacios en tercera línea.',
        wrongFeedback: {
          '4,5': 'Ishida advierte expresamente contra jugar en E4 (4ª línea): Blanco se pega debajo en E3 y endurece todo su territorio (Dia. 4, pág. 179).',
        },
        defaultWrongFeedback: 'Invade en la tercera línea justo en medio de C3 y G3 (en E3).',
        hints: ['Cuenta dos pasos desde C3 y dos desde G3 sobre la tercera línea.', 'Juega en E3 (x=4, y=6).'],
      },
      {
        id: 'l20-gd-2',
        prompt:
          'La Cuña (Warikomi — Ishida pág. 181): Invadiste en E3, Blanco respondió con contacto en E4 y tienes apoyo para la escalera. Juega la Cuña (Wedge) en D4 encajándote en diagonal entre C3 y E4.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 6, color: 'WHITE' },
          { x: 6, y: 5, color: 'WHITE' },
          { x: 4, y: 6, color: 'BLACK' },
          { x: 4, y: 5, color: 'WHITE' },
          { x: 1, y: 3, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 3, y: 5 }],
        correctFeedback:
          '¡Warikomi (Cuña) contundente en D4! Obligas a Blanco a ceder la conexión o quedar destrozado en el centro.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Juega la cuña en D4 (a la izquierda de E4 y encima de D3).',
        hints: ['Coloca tu piedra en D4 para amenazar doble corte.', 'Juega en D4 (x=3, y=5).'],
      },
    ],
    independentPractice: [
      {
        id: 'l20-ip-1',
        prompt:
          'Práctica 1 (Extensión en 4ª línea — Ishida pág. 190): Blanco tiene una extensión de tres espacios alta en C6 y G6. Invade de forma baja en la tercera línea (E7) para tomar base y territorio fácilmente.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 3, color: 'WHITE' },
          { x: 6, y: 3, color: 'WHITE' },
          { x: 2, y: 6, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [
          { x: 4, y: 2 },
          { x: 4, y: 3 },
        ],
        correctFeedback:
          '¡Invasión limpia en la columna central E! Tanto la invasión baja en E7 (3ª línea) como la alta en E6 (4ª línea) son los dos puntos maestros del Diagrama 1 (pág. 190).',
        wrongFeedback: {},
        defaultWrongFeedback: 'Invade en el centro de la extensión en E7 (3ª línea) o E6 (4ª línea).',
        hints: ['Apunta a la columna E entre C6 y G6.', 'Juega en E7 (x=4, y=2) o E6 (x=4, y=3).'],
      },
    ],
    summary: {
      keyIdeas: [
        'La extensión de 3 espacios en 3ª línea se invade siempre en el punto medio de la 3ª línea.',
        'En la extensión de 3ª a 4ª línea, los tres puntos clave forman una "V"; nunca invadas tímidamente un punto arriba del vértice.',
        'La Cuña (Warikomi) tras el contacto del defensor es fortísima cuando la escalera te favorece.',
      ],
      vocabulary: [
        {
          term: 'San-gen biraki',
          japanese: '三間開き',
          definition: 'Extensión de tres espacios a lo largo del lado.',
        },
        {
          term: 'Warikomi (Cuña)',
          japanese: '割り込み',
          definition: 'Tesuji que inserta una piedra directamente entre dos piedras enemigas en diagonal.',
        },
      ],
    },
    transferQuestion: {
      id: 'l20-tq-1',
      prompt: 'Evaluación: ¿Cuándo debe el defensor responder a una invasión en extensión de 3 espacios con el contacto inferior en 2ª línea (The Lower Attachment, pág. 177)?',
      boardSize: 9,
      initialStones: [],
      turn: 'BLACK',
      exerciseType: 'MULTIPLE_CHOICE',
      options: [
        {
          id: 'opt-1',
          text: 'Cuando sus piedras locales están débiles y prefiere sacrificar una piedra para construir buena forma y grosor exterior en lugar de entrar en una pelea desfavorable',
          isCorrect: true,
          feedback: '¡Exacto! El contacto inferior es una maniobra evasiva de sacrificio para hacer forma en el exterior.',
        },
        {
          id: 'opt-2',
          text: 'Cuando tiene un muro indestructible y quiere matar al invasor por la fuerza',
          isCorrect: false,
          feedback: 'Cuando el defensor es muy fuerte, usa la jugada diagonal (Kosumi) arriba para atacar con severidad.',
        },
      ],
      correctFeedback: 'Eliges la variante de Joseki según el contexto global del tablero.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Recuerda las 3 respuestas de la página 175.',
      hints: ['El contacto inferior cede el borde a cambio de forma exterior.', 'Selecciona la primera opción.'],
    },
  },

  // ============================================================================
  // LECCIÓN 21 (Etapa 10 · Unidad 1 — Nivel Avanzado): Jugadas Forzantes (Kikashi) e Inductoras (Cap. 5 y 6)
  // ============================================================================
  {
    id: 'lesson-21-jugadas-forzantes-kikashi-inductoras',
    stageNumber: 10,
    stageTitle: '10. Lectura profunda',
    unitNumber: 1,
    unitTitle: 'Jugadas Forzantes (Kikashi), Jugadas de Gracias e Inductoras',
    title: 'Kikashi, Jugadas de «Gracias» y «Fuerza Antes de Defender»',
    subtitle:
      'Estudia los Capítulos 5 y 6 de "Attack and Defense": cómo usar piedras forzantes desechables (Kikashi), evitar las "Thank-You Moves" y aplicar "Force Before Defending".',
    estimatedMinutes: 8,
    xpReward: 35,
    prerequisites: ['lesson-12-yose-lectura-revision'],
    relatedPuzzleIds: ['puzzle-40-kikashi-forzante', 'puzzle-41-fuerza-antes-de-defender'],
    observableObjective:
      'Distinguirás una jugada forzante genuina (Kikashi) de una jugada de «Gracias» (Thank-You Move) que ayuda al rival, y aplicarás el principio "Fuerza antes de defender".',
    activationQuestion: {
      question:
        'En el Capítulo 5 de "Attack and Defense", una vez que juegas una piedra forzante (Kikashi) y el rival responde, ¿qué debes hacer con esa piedra forzante?',
      options: [
        {
          id: 'a',
          text: 'Tratarla como una piedra desechable (expendable) y cambiar de frente a una jugada grande sin gastar otro turno en defenderla',
          isCorrect: true,
          explanation:
            '¡Exacto! Como subraya Ishida en la página 111: "The whole point of White 1 is that it does not need to be defended... Once played, a stone like White 1 should be regarded as expendable and left alone."',
        },
        {
          id: 'b',
          text: 'Gastar inmediatamente una segunda y tercera jugada para salvarla a toda costa',
          isCorrect: false,
          explanation:
            'Si gastas otro turno en defender tu Kikashi, pierdes el Sente y le regalas la jugada grande del tablero al rival (Dia. 3, pág. 110).',
        },
        {
          id: 'c',
          text: 'Retirarla del tablero antes de que el rival responda',
          isCorrect: false,
          explanation: 'Las piedras permanecen en el tablero dejando potencial futuro (afectar escaleras, quitar libertades o ayudar a ojos).',
        },
      ],
    },
    conceptSteps: [
      {
        title: 'Kikashi genuino vs. Jugada de «Gracias» (Thank-You Move)',
        body: 'Un Kikashi obliga al rival a responder en contra de su voluntad, sufriendo pérdida de forma o libertades. En cambio, una Jugada de «Gracias» (Thank-You Move, pág. 120) es un atari o asomo ingenuo que solo obliga al rival a conectar un punto de corte que él ya quería defender de todos modos, destruyendo tu propio potencial (Aji).',
        deepDive:
          'Recuerda el proverbio que cita Ishida en la página 120: «Nunca juegues al lado de un punto de corte» si en vez de cortar solo obligas al enemigo a conectarse sólidamente.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 4, y: 5, color: 'WHITE' },
            { x: 5, y: 4, color: 'WHITE' },
            { x: 5, y: 5, color: 'BLACK' },
            { x: 6, y: 4, color: 'BLACK' },
          ],
          markers: [{ x: 4, y: 4, type: 'SUCCESS', label: 'Corta!' }],
          caption: 'No juegues en D5 dándole las gracias a Blanco para que conecte E5: ¡corta directamente en E5!',
        },
      },
      {
        title: 'Jugadas Inductoras y el principio «Fuerza Antes de Defender» (Cap. 6)',
        body: 'En el Capítulo 6 ("Inducing Moves"), Ishida formula una máxima esencial (pág. 133): «Force before defending» (Fuerza antes de defender). Si necesitas añadir una piedra defensiva a tu grupo, haz primero tu Kikashi contra el grupo vecino: si defiendes primero de forma pasiva, el rival ya no tendrá que responder a tu Kikashi.',
        deepDive:
          'Las jugadas inductoras logran que la respuesta del enemigo haga el doble de eficiente la jugada defensiva que planeabas hacer desde el principio.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 4, y: 3, color: 'WHITE' },
            { x: 4, y: 5, color: 'WHITE' },
            { x: 5, y: 6, color: 'BLACK' },
            { x: 6, y: 5, color: 'BLACK' },
          ],
          markers: [{ x: 3, y: 4, type: 'SUCCESS', label: '1' }],
          caption: 'Negro asoma primero en D5 (1) forzando a Blanco a conectar en E5 antes de defender su propia forma abajo.',
        },
      },
    ],
    demonstration: {
      title: 'Kikashi y cambio de frente vs. Jugada de «Gracias»',
      size: 9,
      steps: [
        {
          title: '1. Blanco tiene un salto de un espacio en E6 y E4',
          narration:
            'Negro quiere defender su grupo inferior derecho, pero antes aplica la regla del Capítulo 6: «Fuerza antes de defender».',
          stones: [
            { x: 4, y: 3, color: 'WHITE' },
            { x: 4, y: 5, color: 'WHITE' },
            { x: 5, y: 6, color: 'BLACK' },
            { x: 6, y: 5, color: 'BLACK' },
          ],
          markers: [{ x: 3, y: 4, type: 'CIRCLE' }],
        },
        {
          title: '2. Negro juega el Kikashi en D5',
          narration:
            'El asomo en D5 amenaza cortar en E5. Cuando Blanco conecte pesadamente en E5, Negro dejará D5 como piedra desechable útil en el centro y pasará a defender su grupo.',
          stones: [
            { x: 4, y: 3, color: 'WHITE' },
            { x: 4, y: 5, color: 'WHITE' },
            { x: 5, y: 6, color: 'BLACK' },
            { x: 6, y: 5, color: 'BLACK' },
            { x: 3, y: 4, color: 'BLACK' },
          ],
          lastMove: { x: 3, y: 4 },
          markers: [{ x: 3, y: 4, type: 'SUCCESS', label: 'Kikashi' }],
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l21-gd-1',
        prompt:
          'Evita la Jugada de «Gracias» (Ishida pág. 120, Dia. 1–2): Las piedras blancas en E4 y F5 están desconectadas en E5. No juegues en D5 ayudando a Blanco a conectar: ¡corta directamente en E5!',
        boardSize: 9,
        initialStones: [
          { x: 4, y: 5, color: 'WHITE' },
          { x: 5, y: 4, color: 'WHITE' },
          { x: 5, y: 5, color: 'BLACK' },
          { x: 6, y: 4, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 4 }],
        correctFeedback:
          '¡Corte directo en E5! En vez de regalarle una jugada de «Gracias» para que se conecte, partes en dos la posición blanca.',
        wrongFeedback: {
          '3,4': '¡Esa es una jugada de «Gracias» (Thank-You Move)! Si juegas en D5, Blanco conecta felizmente en E5 y elimina su único defecto.',
        },
        defaultWrongFeedback: 'Corta directamente en el punto de corte E5.',
        hints: ['Recuerda el proverbio: "No juegues al lado de un punto de corte, ¡corta en él!".', 'Juega en E5 (x=4, y=4).'],
      },
      {
        id: 'l21-gd-2',
        prompt:
          '«Fuerza Antes de Defender» (Ishida pág. 132, Dia. 1): Antes de cerrar tu forma en la esquina inferior derecha, juega el Kikashi de asomo en D5 contra el salto blanco de E6–E4.',
        boardSize: 9,
        initialStones: [
          { x: 4, y: 3, color: 'WHITE' },
          { x: 4, y: 5, color: 'WHITE' },
          { x: 5, y: 6, color: 'BLACK' },
          { x: 6, y: 5, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 3, y: 4 }],
        correctFeedback:
          '¡Fuerza antes de defender en D5! Obligas a Blanco a conectarse en E5 antes de consolidar tu propia posición.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Asómate primero en D5 frente al hueco blanco de E5.',
        hints: ['Amenaza con empujar y cortar en E5 desde la izquierda.', 'Juega en D5 (x=3, y=4).'],
      },
    ],
    independentPractice: [
      {
        id: 'l21-ip-1',
        prompt:
          'Práctica 1 (Resistir un Kikashi — Ishida pág. 118, Dia. 1–2): Blanco acaba de asomarse en D5 intentando forzarte a conectar pasivamente en E5. Pero tu piedra en F6 hace que si Blanco corta en E5 caiga en atari inmediato. ¡Resiste jugando activamente en C5 para darle atari a la piedra de Blanco!',
        boardSize: 9,
        initialStones: [
          { x: 4, y: 3, color: 'BLACK' },
          { x: 4, y: 5, color: 'BLACK' },
          { x: 5, y: 3, color: 'BLACK' },
          { x: 5, y: 4, color: 'BLACK' },
          { x: 3, y: 3, color: 'BLACK' },
          { x: 3, y: 5, color: 'BLACK' },
          { x: 3, y: 4, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 2, y: 4 }],
        correctFeedback:
          '¡Resistencia magistral en C5! Como el corte en E5 no funciona para Blanco, en vez de obedecer pasivamente, capturas la piedra intrusa.',
        wrongFeedback: {
          '4,4': 'Conectar en E5 es obedecer sumisamente cuando Blanco ni siquiera podía cortar de verdad.',
        },
        defaultWrongFeedback: 'No te conectes pasivamente en E5: encierra a la piedra blanca de D5 jugando en C5.',
        hints: ['La piedra blanca en D5 solo tiene libertades en C5 y E5.', 'Juega en C5 (x=2, y=4).'],
      },
    ],
    summary: {
      keyIdeas: [
        'Un Kikashi es una jugada en Sente que deja potencial útil y cuya piedra se considera desechable.',
        'Evita las Jugadas de «Gracias» (Thank-You Moves) que obligan al rival a arreglar un defecto que ya quería arreglar.',
        'Aplica siempre «Fuerza antes de defender» (Force before defending) para maximizar la eficiencia de tus piedras.',
      ],
      vocabulary: [
        {
          term: 'Kikashi',
          japanese: '利かし',
          definition: 'Jugada forzante en Sente que produce un beneficio latente sin requerir defensa posterior.',
        },
        {
          term: 'Aji-keshi (Destruir potencial)',
          japanese: '味消し',
          definition: 'Jugada prematura (como una Thank-You Move) que elimina las amenazas latentes de la posición.',
        },
      ],
    },
    transferQuestion: {
      id: 'l21-tq-1',
      prompt: 'Evaluación: ¿Por qué un jugador fuerte evita hacer jugadas en Sente dudosas al principio o mitad de la partida (pág. 121)?',
      boardSize: 9,
      initialStones: [],
      turn: 'BLACK',
      exerciseType: 'MULTIPLE_CHOICE',
      options: [
        {
          id: 'opt-1',
          text: 'Porque pueden convertirse en jugadas de «Gracias» que quitan libertades propias, desperdician amenazas de Ko y destruyen el potencial (Aji) de la posición',
          isCorrect: true,
          feedback: '¡Exacto! Ishida enumera esas tres pérdidas exactas en la página 121.',
        },
        {
          id: 'opt-2',
          text: 'Porque las jugadas en Sente están prohibidas antes de la jugada 50',
          isCorrect: false,
          feedback: 'Son legales en cualquier momento, pero reservar el Aji hasta saber cómo aprovecharlo es señal de maestría.',
        },
      ],
      correctFeedback: 'Comprendes la sutileza entre Kikashi y Aji-keshi.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Recuerda las 3 razones de la página 121.',
      hints: ['No regales solidez gratis al enemigo.', 'Selecciona la primera opción.'],
    },
  },

  // ============================================================================
  // LECCIÓN 22 (Etapa 10 · Unidad 2 — Nivel Avanzado): Luchas de Ko Avanzadas (Ishida Cap. 9)
  // ============================================================================
  {
    id: 'lesson-22-ko-avanzado-hanami-dominante',
    stageNumber: 10,
    stageTitle: '10. Lectura profunda',
    unitNumber: 2,
    unitTitle: 'Hanami Ko, Ko de Pasos y Ko Dominante',
    title: 'Estrategia en Luchas de Ko: Hanami Ko, Ko de Pasos y Ko Dominante',
    subtitle:
      'Aprende el Capítulo 9 de "Attack and Defense": cuándo iniciar un Ko y cuándo terminarlo de inmediato evaluando el riesgo asimétrico de ambos jugadores.',
    estimatedMinutes: 8,
    xpReward: 35,
    prerequisites: ['lesson-5-regla-ko-amenazas'],
    relatedPuzzleIds: ['puzzle-10-iniciar-ko', 'puzzle-15-resolver-ko', 'puzzle-42-hanami-ko-picnic', 'puzzle-43-ko-dominante'],
    observableObjective:
      'Al terminar, sabrás distinguir un Hanami Ko (Ko de picnic sin riesgo), un Ko adverso, un Ko indirecto de múltiples pasos y un Ko Dominante (All-Dominating Ko).',
    activationQuestion: {
      question:
        'En el Capítulo 9 ("Ko Fights", pág. 199), Akira Ishida explica el término japonés "Hanami Ko" (literalmente «Ko de contemplar las flores de cerezo / Ko de picnic»). ¿Qué caracteriza a un Hanami Ko?',
      options: [
        {
          id: 'a',
          text: 'Es un Ko unilateral a tu favor: si lo ganas destruyes un gran grupo rival, y si lo pierdes solo entregas 1 prisionero sin sufrir ningún daño',
          isCorrect: true,
          explanation:
            '¡Exacto! "White only risks losing one point while Black risks losing over twenty. This one-sided type of ko is called a hanami ko... a picnic for White, who has everything to gain from it and practically nothing to lose."',
        },
        {
          id: 'b',
          text: 'Es un Ko que solo puede jugarse en el punto central del tablero',
          isCorrect: false,
          explanation: 'El nombre Hanami Ko se refiere al riesgo cero para quien lo inicia, no a su ubicación.',
        },
        {
          id: 'c',
          text: 'Es un Ko donde ambos jugadores pierden toda la partida si conectan',
          isCorrect: false,
          explanation: 'Ese sería un Ko dominante para ambos; el Hanami Ko es cómodo y sin riesgo para uno de los bandos.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1) Hanami Ko vs. Ko Adverso y 2) Ko Indirecto de Múltiples Pasos',
        body: 'Para saber si debes iniciar un Ko, compara siempre 3 resultados: 1) No iniciarlo; 2) Iniciarlo y perderlo; 3) Iniciarlo y ganarlo. Si al perderlo no pierdes nada (Hanami Ko), ¡adelante! Si al perderlo muere tu grupo de 45 puntos y al ganarlo solo ganas 15, NO lo inicies: conecta sólidamente (pág. 200).',
        deepDive:
          'Además, evita iniciar un Ko muy indirecto (de 3 o 4 pasos de aproximación, pág. 203): mientras gastas 4 turnos rellenando libertades para llegar al Ko, el rival juega 4 veces seguidas en el resto del tablero.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 2, y: 1, color: 'WHITE' },
            { x: 3, y: 0, color: 'WHITE' },
            { x: 3, y: 2, color: 'WHITE' },
            { x: 4, y: 1, color: 'WHITE' },
            { x: 1, y: 1, color: 'BLACK' },
            { x: 2, y: 0, color: 'BLACK' },
            { x: 2, y: 2, color: 'BLACK' },
          ],
          markers: [{ x: 3, y: 1, type: 'SUCCESS', label: 'Ko' }],
          caption: 'Evaluar qué arriesga cada bando antes de cortar en Ko decide si es un Hanami Ko o una trampa.',
        },
      },
      {
        title: '3) El Ko Dominante (All-Dominating Ko):Cuándo cerrar el Ko sin dudar',
        body: '¿Cuándo debes terminar y conectar un Ko? Cuando el Ko es tan gigantesco que domina todo lo demás en el tablero (All-Dominating Ko, pág. 204), o cuando cerrarlo te asegura ganar la partida.',
        deepDive:
          'Regla de oro de Ishida (pág. 204 y 207): «En un Ko que lo domina todo, ignora la primera amenaza de Ko del rival y termina el Ko de inmediato».',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 4, y: 5, color: 'BLACK' },
            { x: 5, y: 4, color: 'BLACK' },
            { x: 5, y: 3, color: 'WHITE' },
            { x: 5, y: 5, color: 'WHITE' },
            { x: 6, y: 4, color: 'WHITE' },
          ],
          markers: [{ x: 4, y: 4, type: 'SUCCESS', label: 'Cerrar' }],
          caption: 'Cuando el Ko vale toda la partida, ignora cualquier amenaza menor y conecta en E5.',
        },
      },
    ],
    demonstration: {
      title: 'Cerrar un Ko Dominante ignorando una amenaza menor',
      size: 9,
      steps: [
        {
          title: '1. Negro acaba de capturar el Ko central y Blanco amenaza en la esquina B2',
          narration:
            'El Ko en torno a E5–F5 decide la supervivencia de todo el centro (35 puntos). Blanco juega una amenaza pequeña en B2 que vale solo 6 puntos.',
          stones: [
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 4, y: 5, color: 'BLACK' },
            { x: 5, y: 4, color: 'BLACK' },
            { x: 5, y: 3, color: 'WHITE' },
            { x: 5, y: 5, color: 'WHITE' },
            { x: 6, y: 4, color: 'WHITE' },
            { x: 1, y: 7, color: 'WHITE' },
          ],
          lastMove: { x: 1, y: 7 },
          markers: [{ x: 4, y: 4, type: 'CIRCLE' }],
        },
        {
          title: '2. Negro aplica la regla de Ishida: ¡Conecta el Ko en E5 de inmediato!',
          narration:
            'Siguiendo la máxima "Never hesitate to finish an all-dominating ko", Negro ignora B2 y conecta en E5 sellando la victoria.',
          stones: [
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 4, y: 5, color: 'BLACK' },
            { x: 5, y: 4, color: 'BLACK' },
            { x: 5, y: 3, color: 'WHITE' },
            { x: 5, y: 5, color: 'WHITE' },
            { x: 6, y: 4, color: 'WHITE' },
            { x: 1, y: 7, color: 'WHITE' },
            { x: 4, y: 4, color: 'BLACK' },
          ],
          lastMove: { x: 4, y: 4 },
          markers: [{ x: 4, y: 4, type: 'SUCCESS', label: '✓' }],
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l22-gd-1',
        prompt:
          'Evitar un Ko Adverso (Ishida pág. 200, Dia. 7 y 15): Blanco amenaza iniciar un Ko cortando tu grupo en D5. Si luchas el Ko y lo pierdes, todo tu grupo negro muere; si conectas sólidamente en D5 ahora, tu grupo vive sin ningún riesgo. ¡Conecta en D5!',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 4, color: 'BLACK' },
          { x: 3, y: 3, color: 'BLACK' },
          { x: 3, y: 5, color: 'BLACK' },
          { x: 4, y: 4, color: 'WHITE' },
          { x: 4, y: 3, color: 'WHITE' },
          { x: 4, y: 5, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 3, y: 4 }],
        correctFeedback:
          '¡Juicio estratégico impecable! Como dice Ishida en el Diagrama 15 (pág. 202): cuando no tienes nada que ganar y sí todo que perder en un Ko, conecta sólidamente.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Conecta tus piedras en D5 para eliminar toda posibilidad de Ko contra tu grupo.',
        hints: ['Une C5, D6 y D4 en un solo bloque invulnerable.', 'Juega en D5 (x=3, y=4).'],
      },
      {
        id: 'l22-gd-2',
        prompt:
          'Iniciar un Hanami Ko (Ishida pág. 198): Tu grupo negro ya está seguro, pero puedes capturar la piedra blanca de D8 jugando en C8 para iniciar un Hanami Ko que amenaza matar toda la esquina blanca sin arriesgar nada.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 1, color: 'WHITE' },
          { x: 3, y: 0, color: 'BLACK' },
          { x: 3, y: 2, color: 'BLACK' },
          { x: 4, y: 1, color: 'BLACK' },
          { x: 2, y: 0, color: 'WHITE' },
          { x: 2, y: 2, color: 'WHITE' },
          { x: 1, y: 1, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 2, y: 1 }],
        correctFeedback:
          '¡Hanami Ko iniciado en C8! Capturas D8 y pones toda la presión sobre Blanco sin arriesgar tu propio grupo.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Captura la piedra blanca de D8 jugando en C8.',
        hints: ['D8 está en atari con su única libertad en C8.', 'Juega en C8 (x=2, y=1).'],
      },
    ],
    independentPractice: [
      {
        id: 'l22-ip-1',
        prompt:
          'Práctica 1 (Terminar un Ko Dominante): Blanco jugó una amenaza en A2, pero el Ko en E5 decide toda la partida. ¡Cierra y conecta el Ko en E5 inmediatamente!',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 4, color: 'BLACK' },
          { x: 4, y: 3, color: 'BLACK' },
          { x: 4, y: 5, color: 'BLACK' },
          { x: 5, y: 4, color: 'BLACK' },
          { x: 5, y: 3, color: 'WHITE' },
          { x: 5, y: 5, color: 'WHITE' },
          { x: 6, y: 4, color: 'WHITE' },
          { x: 0, y: 7, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 4 }],
        correctFeedback: '¡Ko dominante resuelto en E5! Nunca dudes en terminar un Ko que asegura la victoria.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Conecta el Ko jugando en E5.',
        hints: ['Ignora A2 y rellena el Ko central.', 'Juega en E5 (x=4, y=4).'],
      },
    ],
    summary: {
      keyIdeas: [
        'Hanami Ko (Ko de picnic) es un Ko unilateral donde tienes mucho que ganar y casi nada que perder.',
        'Evita iniciar Kos adversos (donde tú arriesgas mucho más que el rival) y Kos indirectos de 3 o 4 pasos.',
        'En un Ko Dominante (All-Dominating Ko), ignora la primera amenaza menor y cierra el Ko de inmediato.',
      ],
      vocabulary: [
        {
          term: 'Hanami Ko',
          japanese: '花見コウ',
          definition: 'Ko unilateral ("de picnic") en el que quien lo juega casi no arriesga nada si lo pierde, pero gana mucho si vence.',
        },
        {
          term: 'Oll-Dominating Ko (Tenka-koh)',
          japanese: '天下コウ',
          definition: 'Ko de magnitud decisiva cuyo valor supera a cualquier amenaza en el resto del tablero.',
        },
      ],
    },
    transferQuestion: {
      id: 'l22-tq-1',
      prompt: 'Evaluación: ¿Por qué un Ko indirecto de 4 pasos de aproximación (Four-step Ko, pág. 203) casi nunca debe iniciarse en medio juego?',
      boardSize: 9,
      initialStones: [],
      turn: 'BLACK',
      exerciseType: 'MULTIPLE_CHOICE',
      options: [
        {
          id: 'opt-1',
          text: 'Porque tienes que gastar 4 jugadas rellenando libertades antes de que empiece el Ko, regalándole al rival 4 jugadas libres seguidas en el resto del tablero',
          isCorrect: true,
          feedback: '¡Exacto! "With a four-step ko we are fully into the kingdom of never-never land." (pág. 203).',
        },
        {
          id: 'opt-2',
          text: 'Porque las reglas prohíben rellenar libertades de un grupo en esquina',
          isCorrect: false,
          feedback: 'Es legal, pero regalar 4 turnos gratis en otras zonas del tablero es estratégicamente ruinoso.',
        },
      ],
      correctFeedback: 'Evalúas las luchas de Ko como un jugador avanzado.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Piensa en cuántos turnos seguidos obtiene el rival fuera mientras tú rellenas libertades.',
      hints: ['Cada jugada de aproximación no respondida es un turno gratis para el rival en otro lugar.', 'Selecciona la primera opción.'],
    },
  },

  // ============================================================================
  // LECCIÓN 23 (Etapa 11 · Unidad 1 y 2 — Nivel Avanzado): Defensa con Contacto y Sacrificio (Ishida Cap. 4)
  // ============================================================================
  {
    id: 'lesson-23-defensa-contacto-sacrificio-suteishi',
    stageNumber: 11,
    stageTitle: '11. Revisión y competición',
    unitNumber: 1,
    unitTitle: 'Defensa de Emergencia con Contacto y Sacrificio (Sute-ishi)',
    title: 'Defensa en Emergencias: Contacto (Tsuke), Hombro y Sacrificio',
    subtitle:
      'Estudia la segunda mitad del Capítulo 4 de "Attack and Defense" (págs. 93–109): por qué las jugadas de contacto son las más fuertes para defenderse y cómo sacrificar piedras para escapar.',
    estimatedMinutes: 8,
    xpReward: 35,
    prerequisites: ['lesson-17-cinco-formulas-ataque-sin-contacto'],
    relatedPuzzleIds: ['puzzle-44-defensa-contacto-tsuke', 'puzzle-45-defensa-golpe-hombro'],
    observableObjective:
      'Comprenderás la dualidad de Ishida ("Ataca sin contacto, pero defiende en emergencias CON contacto") y usarás el Contacto (Tsuke), el Golpe al Hombro (Kata-tsuki) y el Sacrificio (Sute-ishi) para salvar grupos en apuros.',
    activationQuestion: {
      question:
        'En el Capítulo 3 aprendimos que los mejores ataques evitan tocar al enemigo. Según el Capítulo 4 ("Defend with Contact Plays", pág. 93), ¿qué propiedad tienen las mejores jugadas de DEFENSA en situaciones de emergencia?',
      options: [
        {
          id: 'a',
          text: 'Tienen la propiedad opuesta: las jugadas de contacto (Tsuke) y de hombro (Kata-tsuki) son las más fuertes para defenderse y crear forma de ojos o escapar',
          isCorrect: true,
          explanation:
            '¡Exacto! "We saw in the last chapter that the strongest attacking moves usually avoid making contact... Contact plays, or near-contact plays, are generally strongest for defense. They are the moves to use in emergencies." (pág. 93).',
        },
        {
          id: 'b',
          text: 'Nunca se debe hacer contacto tampoco al defender',
          isCorrect: false,
          explanation: 'Al revés: cuando tu grupo está rodeado o en apuros, apoyarte en contacto contra una piedra enemiga te da puntos de apoyo e impulso.',
        },
        {
          id: 'c',
          text: 'La única defensa en emergencias es pasar el turno',
          isCorrect: false,
          explanation: 'El Tesuji de contacto aprovecha la reacción del rival para construir forma ligera.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1) Defender con Contacto (Tsuke) y Descenso',
        body: 'Cuando tus piedras están en peligro y no tienen espacio para un salto tranquilo, el Contacto (Attachment / Tsuke) contra la piedra enemiga más cercana obliga al rival a responder con un hane, permitiéndote descender, cruzar el corte (crosscut) o formar ojos apoyándote en él (págs. 93–98).',
        deepDive:
          'Como explica Ishida en la página 98: «Aprender a sacrificar piedras sin importancia (Sute-ishi) es una de las llaves para aprender a defender. Quien se compromete a salvar cada piedra que pone en el tablero asume una tarea imposible».',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 6, y: 2, color: 'BLACK' },
            { x: 6, y: 3, color: 'BLACK' },
            { x: 4, y: 2, color: 'WHITE' },
            { x: 4, y: 5, color: 'WHITE' },
            { x: 6, y: 5, color: 'WHITE' },
          ],
          markers: [{ x: 7, y: 4, type: 'SUCCESS', label: 'Tsuke' }],
          caption: 'El contacto defensivo en H5 (Dia. 2, pág. 93) amenaza conectar por el borde y asegura la supervivencia.',
        },
      },
      {
        title: '2) El Golpe al Hombro Defensivo (Shoulder Play / Kata-tsuki)',
        body: 'Pariente cercano del contacto es el Golpe al Hombro (en diagonal a una piedra enemiga, págs. 99–102). Cuando un salto de un espacio es demasiado lento y sería castigado con un asomo, el Golpe al Hombro gana velocidad y elasticidad hacia el centro.',
        deepDive:
          'Si el rival empuja contra tu piedra de hombro, te apoyas en él con contactos sucesivos y sales al centro con forma ligera.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 2, y: 5, color: 'BLACK' },
            { x: 2, y: 6, color: 'BLACK' },
            { x: 4, y: 3, color: 'WHITE' },
            { x: 4, y: 7, color: 'WHITE' },
          ],
          markers: [{ x: 3, y: 4, type: 'SUCCESS', label: 'Hombro' }],
          caption: 'El Golpe al Hombro en D5 (en diagonal a la piedra blanca E6) permite a Negro escapar con vigor al centro.',
        },
      },
    ],
    demonstration: {
      title: 'Defensa de emergencia mediante Contacto (Tsuke)',
      size: 9,
      steps: [
        {
          title: '1. Dos piedras negras en G7–G6 necesitan defenderse',
          narration:
            'Blanco domina alrededor con E7 y E4–G4. Negro necesita estabilizar sus dos piedras de arriba y amenazar con enlazarlas.',
          stones: [
            { x: 6, y: 2, color: 'BLACK' },
            { x: 6, y: 3, color: 'BLACK' },
            { x: 4, y: 2, color: 'WHITE' },
            { x: 4, y: 5, color: 'WHITE' },
            { x: 6, y: 5, color: 'WHITE' },
          ],
          markers: [{ x: 7, y: 4, type: 'CIRCLE' }],
        },
        {
          title: '2. Contacto defensivo en H5 (Dia. 2, pág. 93 de Ishida)',
          narration:
            'Negro se pega al costado de G4 jugando en H5. Como amenaza conectar sus grupos, Blanco debe responder y Negro obtiene la forma e iniciativa necesarias para vivir.',
          stones: [
            { x: 6, y: 2, color: 'BLACK' },
            { x: 6, y: 3, color: 'BLACK' },
            { x: 4, y: 2, color: 'WHITE' },
            { x: 4, y: 5, color: 'WHITE' },
            { x: 6, y: 5, color: 'WHITE' },
            { x: 7, y: 4, color: 'BLACK' },
          ],
          lastMove: { x: 7, y: 4 },
          markers: [{ x: 7, y: 4, type: 'SUCCESS', label: 'Tsuke' }],
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l23-gd-1',
        prompt:
          'Defensa con Contacto (Ishida pág. 93, Dia. 1–2): Tus dos piedras negras en G7–G6 están bajo presión de las piedras blancas en E7, E4 y G4. Juega el Tesuji de contacto en H5 (en la segunda línea, tocando G4 en diagonal/costado) para defenderte.',
        boardSize: 9,
        initialStones: [
          { x: 6, y: 2, color: 'BLACK' },
          { x: 6, y: 3, color: 'BLACK' },
          { x: 4, y: 2, color: 'WHITE' },
          { x: 4, y: 5, color: 'WHITE' },
          { x: 6, y: 5, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [
          { x: 7, y: 4 },
          { x: 7, y: 5 },
        ],
        correctFeedback:
          '¡Tesuji de contacto defensivo! Apoyarte en el borde derecho te permite enlazar o estabilizar tu grupo en G7–G6.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Juega en H5 o H4 en la segunda línea para apoyarte y crear forma.',
        hints: ['Busca el punto en la columna H junto a G6–G4.', 'Juega en H5 (x=7, y=4) o H4 (x=7, y=5).'],
      },
      {
        id: 'l23-gd-2',
        prompt:
          'Golpe al Hombro Defensivo (Ishida pág. 100, Dia. 28): Tu grupo negro en C4–C3 necesita salir al centro, pero Blanco vigila desde E6. En lugar de un salto lento en C5, juega el Golpe al Hombro en D5 (en diagonal a E6).',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 5, color: 'BLACK' },
          { x: 2, y: 6, color: 'BLACK' },
          { x: 4, y: 3, color: 'WHITE' },
          { x: 4, y: 7, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 3, y: 4 }],
        correctFeedback:
          '¡Golpe al Hombro vigoroso en D5! Como demuestra el Diagrama 28 de Ishida, D5 es mucho más rápido y elástico que el salto lento en C5.',
        wrongFeedback: {
          '2,4': 'Como muestra el Diagrama 27 (pág. 99), saltar lento a C5 invita el asomo blanco en D5 seguido de D6.',
        },
        defaultWrongFeedback: 'Juega en D5 (al hombro diagonal de la piedra blanca de E6).',
        hints: ['Coloca tu piedra diagonalmente abajo a la izquierda de E6.', 'Juega en D5 (x=3, y=4).'],
      },
    ],
    independentPractice: [
      {
        id: 'l23-ip-1',
        prompt:
          'Práctica 1 (Contacto sobre la cabeza — Ishida pág. 98, Dia. 22–23): Tu grupo negro en L (D5, E5, E4) corre en una batalla central frente a las piedras blancas de F6 y D6. Juega el contacto defensivo en E7 (encima de D6/F6) para abrirte paso hacia el centro.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 4, color: 'BLACK' },
          { x: 4, y: 4, color: 'BLACK' },
          { x: 4, y: 5, color: 'BLACK' },
          { x: 3, y: 3, color: 'WHITE' },
          { x: 5, y: 3, color: 'WHITE' },
          { x: 5, y: 4, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [
          { x: 4, y: 2 },
          { x: 3, y: 2 },
        ],
        correctFeedback:
          '¡Defensa activa hacia el centro! Apoyarte en la parte superior de las piedras blancas te permite romper el cerco.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Juega en E7 o D7 apoyándote sobre la piedra blanca de D6.',
        hints: ['Toca por arriba la piedra blanca de D6.', 'Juega en D7 (x=3, y=2) o E7 (x=4, y=2).'],
      },
    ],
    summary: {
      keyIdeas: [
        'Ataca sin contacto, pero en emergencias defiende CON jugadas de contacto (Tsuke) y de hombro (Kata-tsuki).',
        'El contacto contra una piedra enemiga aprovecha su respuesta para ganar impulso, ojos o conexión.',
        'Sacrificar una o dos piedras secundarias (Sute-ishi) en Sente permite poner a salvo el grupo principal con forma ligera.',
      ],
      vocabulary: [
        {
          term: 'Tsuke (Contacto / Apego)',
          japanese: 'ツケ',
          definition: 'Colocar una piedra en contacto ortogonal directo con una piedra enemiga.',
        },
        {
          term: 'Sute-ishi (Piedra de sacrificio)',
          japanese: '捨て石',
          definition: 'Piedras que se entregan deliberadamente para obtener iniciativa, forma exterior o escape.',
        },
      ],
    },
    transferQuestion: {
      id: 'l23-tq-1',
      prompt: 'Evaluación: Según la página 98 de "Attack and Defense", ¿por qué es indispensable aprender a sacrificar piedras (Sute-ishi) para saber defenderse?',
      boardSize: 9,
      initialStones: [],
      turn: 'BLACK',
      exerciseType: 'MULTIPLE_CHOICE',
      options: [
        {
          id: 'opt-1',
          text: 'Porque quien intenta salvar obstinadamente cada piedra secundaria termina con grupos pesados y derrotados; sacrificar piedras en la retaguardia frena al perseguidor y salva el grupo principal en Sente',
          isCorrect: true,
          feedback: '¡Exacto! "A player who committed himself to defend every stone that he put on the board would be assuming an impossible task. Learning to sacrifice is one of the keys to learning to defend."',
        },
        {
          id: 'opt-2',
          text: 'Porque las piedras sacrificadas valen el triple de puntos para quien las regala',
          isCorrect: false,
          feedback: 'El valor del sacrificio no está en los puntos de la piedra entregada, sino en la forma, ojos y Sente que obtienes fuera.',
        },
      ],
      correctFeedback: 'Has comprendido el arte de la defensa ligera.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Piensa en la diferencia entre forma ligera y forma pesada.',
      hints: ['Sacrificar lo pequeño para salvar lo grande.', 'Selecciona la primera opción.'],
    },
  },

  // ============================================================================
  // LECCIÓN 24 (Etapa 12 · Unidad 1 y 2 — Nivel Avanzado): Reducción e Invasión de Moyo (Ishida Cap. 7 y 10)
  // ============================================================================
  {
    id: 'lesson-24-reduccion-invasion-grandes-marcos',
    stageNumber: 12,
    stageTitle: '12. Maestría integradora',
    unitNumber: 1,
    unitTitle: 'Reducción e Invasión de Grandes Marcos (Moyo) y Puntos de Unión',
    title: 'Reducción e Invasión de Grandes Marcos (Moyo), Puntos de Unión y Sondas',
    subtitle:
      'Culmina la Academia con el Capítulo 7 y los Problemas Maestros del Capítulo 10 de "Attack and Defense": Puntos de Unión (Junction Points), reducción con Hombro/Sombrero y flexibilidad.',
    estimatedMinutes: 9,
    xpReward: 40,
    prerequisites: ['lesson-23-defensa-contacto-sacrificio-suteishi'],
    relatedPuzzleIds: ['puzzle-46-punto-union-moyo', 'puzzle-47-reduccion-hombro-moyo', 'puzzle-48-sonda-flexible'],
    observableObjective:
      'Sabrás identificar la Línea de Unión (Junction Point) entre dos marcos territoriales opuestos, elegir entre reducción segura e invasión profunda, y jugar con flexibilidad mediante sondas (Probes).',
    activationQuestion: {
      question:
        'En el Capítulo 7 ("Reducing and Invading Large Frameworks", pág. 142), Akira Ishida presenta los dos enfoques ante un gran marco (Moyo) enemigo: Reducir desde fuera o Invadir por dentro. ¿Cómo eliges entre ambos?',
      options: [
        {
          id: 'a',
          text: 'Según el balance de territorio y de poder: si vas ganando en territorio basta una reducción segura desde fuera; si vas perdiendo en territorio y tienes poder cercano de apoyo, necesitas una invasión profunda',
          isCorrect: true,
          explanation:
            '¡Exacto! "If one is behind in territory, a drastic invasion may be necessary to restore equilibrium; if one is ahead in territory, a modest reduction of the framework may be enough. Invasions work best when one has the power to back them up." (pág. 142).',
        },
        {
          id: 'b',
          text: 'Siempre hay que invadir en la primera línea sin importar el marcador ni la fuerza exterior',
          isCorrect: false,
          explanation: 'Invadir demasiado profundo cuando no lo necesitas y sin respaldo exterior regala poder o la victoria al rival.',
        },
        {
          id: 'c',
          text: 'Nunca se debe jugar cerca de un Moyo enemigo',
          isCorrect: false,
          explanation: 'Si permites que un gran Moyo se cierre por completo sin reducirlo ni invadirlo, su tamaño decidirá la partida.',
        },
      ],
    },
    conceptSteps: [
      {
        title: 'Principio 1: Los Puntos de Unión (Junction Points) entre dos Marcos',
        body: 'Cuando el marco (Moyo) enemigo colinda con tu propio marco abierto, traza una frontera imaginaria a mitad de camino entre ambos (Junction Line, pág. 143). La jugada maestra está exactamente sobre ese Punto de Unión: expande tu marco al mismo tiempo que aplasta el del rival.',
        deepDive:
          'Como demuestra Ishida en el Diagrama 4 (pág. 144), si en vez de ocupar el Punto de Unión te lanzas a una invasión ciega dentro del marco rival, el enemigo te atacará cruzando él mismo la línea de unión y destruyendo tu propio marco.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 6, y: 2, color: 'WHITE' },
            { x: 6, y: 3, color: 'WHITE' },
            { x: 2, y: 6, color: 'BLACK' },
            { x: 3, y: 6, color: 'BLACK' },
          ],
          markers: [{ x: 4, y: 4, type: 'SUCCESS', label: 'Unión' }],
          caption: 'El Punto de Unión E5 está en la frontera entre el marco blanco derecho y el marco negro inferior.',
        },
      },
      {
        title: 'Principios 2 y 3: Golpe al Hombro, Sombrero y Flexibilidad con Sondas (Probes)',
        body: 'Para reducir desde fuera sin marcos adyacentes, las dos grandes armas son el Golpe al Hombro (Shoulder Move, contra piedras de 3ª o 4ª línea) y el Sombrero (Capping Play). Y el secreto supremo de los profesionales es la Flexibilidad (pág. 165): lanzar una sonda (Probe / Yosu-miru) para ver de qué lado responde el rival antes de decidir si reduces por fuera o invades la esquina.',
        deepDive:
          'No te ates a defender cada piedra de sonda que colocas en el marco rival: si el rival defiende la esquina con fuerza, cambia con ligereza al exterior; si protege el exterior, deslízate hacia la esquina.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 2, y: 2, color: 'WHITE' },
            { x: 6, y: 2, color: 'WHITE' },
            { x: 6, y: 5, color: 'WHITE' },
            { x: 2, y: 6, color: 'BLACK' },
          ],
          markers: [{ x: 5, y: 4, type: 'SUCCESS', label: 'Hombro' }],
          caption: 'El Golpe al Hombro en F5 reduce con elegancia el gran marco blanco sin crear un grupo pesado.',
        },
      },
    ],
    demonstration: {
      title: 'Ocupar el Punto de Unión (Junction Point) entre dos marcos',
      size: 9,
      steps: [
        {
          title: '1. Dos marcos opuestos: Blanco en el lado derecho y Negro en el lado inferior',
          narration:
            'Blanco proyecta un Moyo desde G7–G6 hacia el centro, y Negro proyecta el suyo desde C3–D3. La línea divisoria pasa por E5.',
          stones: [
            { x: 6, y: 2, color: 'WHITE' },
            { x: 6, y: 3, color: 'WHITE' },
            { x: 2, y: 6, color: 'BLACK' },
            { x: 3, y: 6, color: 'BLACK' },
          ],
          markers: [{ x: 4, y: 4, type: 'CIRCLE' }],
        },
        {
          title: '2. Negro ocupa el Punto de Unión en E5',
          narration:
            'Al jugar en E5, Negro agranda su territorio inferior y simultáneamente aplasta el potencial blanco de la derecha, conservando el control estratégico de la partida.',
          stones: [
            { x: 6, y: 2, color: 'WHITE' },
            { x: 6, y: 3, color: 'WHITE' },
            { x: 2, y: 6, color: 'BLACK' },
            { x: 3, y: 6, color: 'BLACK' },
            { x: 4, y: 4, color: 'BLACK' },
          ],
          lastMove: { x: 4, y: 4 },
          markers: [{ x: 4, y: 4, type: 'SUCCESS', label: 'Unión' }],
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l24-gd-1',
        prompt:
          'Punto de Unión (Ishida pág. 143, Dia. 1–3): Blanco tiene un marco en la derecha (G7, G6, G3) y tú tienes un marco abajo a la izquierda (C3, D3, C6). Ocupa el Punto de Unión en el centro (E5) para expandir tu marco mientras reduces el de Blanco.',
        boardSize: 9,
        initialStones: [
          { x: 6, y: 2, color: 'WHITE' },
          { x: 6, y: 3, color: 'WHITE' },
          { x: 6, y: 6, color: 'WHITE' },
          { x: 2, y: 6, color: 'BLACK' },
          { x: 3, y: 6, color: 'BLACK' },
          { x: 2, y: 3, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 4 }],
        correctFeedback:
          '¡Punto de Unión exacto en E5! Creces tu propio marco y limitas el de Blanco con una sola piedra.',
        wrongFeedback: {
          '7,4': 'Invadir profundamente en H5 cuando hay un Punto de Unión abierto permite que Blanco te ataque y cruce él mismo hacia E5 (Dia. 4, pág. 144).',
        },
        defaultWrongFeedback: 'Juega en la frontera equidistante entre ambos marcos (E5).',
        hints: ['Mira la intersección central donde chocan ambos marcos.', 'Juega en E5 (x=4, y=4).'],
      },
      {
        id: 'l24-gd-2',
        prompt:
          'Reducción con Golpe al Hombro (Ishida pág. 151, Dia. 4): Blanco ha construido un gran marco superior-derecho con C7, E7 y G4. Juega el Golpe al Hombro en F5 (en diagonal a G4) para reducir su Moyo desde arriba.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 2, color: 'WHITE' },
          { x: 4, y: 2, color: 'WHITE' },
          { x: 6, y: 5, color: 'WHITE' },
          { x: 2, y: 6, color: 'BLACK' },
          { x: 3, y: 7, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 5, y: 4 }],
        correctFeedback:
          '¡Reducción magistral con Golpe al Hombro en F5! Como enseña Ishida en las páginas 150–154, el golpe al hombro achata el marco rival mientras te impulsa al centro.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Juega el Golpe al Hombro en F5 (diagonalmente arriba a la izquierda de la piedra blanca G4).',
        hints: ['Busca la diagonal interior de la piedra blanca G4.', 'Juega en F5 (x=5, y=4).'],
      },
    ],
    independentPractice: [
      {
        id: 'l24-ip-1',
        prompt:
          'Práctica 1 (Doble propósito: Defender y Reducir — Ishida pág. 148, Dia. 2 y Problema 16 pág. 240): Tus piedras en C6–D6 aún no tienen dos ojos y Blanco tiene un gran marco abajo en D2–G3. Juega en D4 para defender tu grupo y reducir a la vez el marco blanco.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 3, color: 'BLACK' },
          { x: 3, y: 3, color: 'BLACK' },
          { x: 2, y: 2, color: 'WHITE' },
          { x: 3, y: 2, color: 'WHITE' },
          { x: 3, y: 7, color: 'WHITE' },
          { x: 6, y: 6, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 3, y: 5 }],
        correctFeedback:
          '¡Jugada de doble propósito perfecta en D4! Como destaca Ishida en la página 148, marcas la intersección entre las dos prioridades de la partida: salvar tu grupo y reducir el Moyo enemigo.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Salta desde D6 hasta D4 para proteger tu grupo y reducir el marco inferior de Blanco.',
        hints: ['Haz un salto de un espacio desde D6 hacia abajo (D4).', 'Juega en D4 (x=3, y=5).'],
      },
    ],
    summary: {
      keyIdeas: [
        'Los 3 principios eternos ante un Moyo: 1) Considera las áreas vecinas (Puntos de Unión y grupos débiles); 2) Golpea las debilidades; 3) Juega con flexibilidad.',
        'El Golpe al Hombro (Kata-tsuki) y el Sombrero (Boshi) son las técnicas principales de reducción.',
        'Usa sondas (Probes) para hacer que el rival se comprometa antes de elegir entre el borde y el centro.',
      ],
      vocabulary: [
        {
          term: 'Tennozan / Punto de Unión',
          japanese: '天王山',
          definition: 'Punto estratégico situado en la línea divisoria donde dos marcos territoriales opuestos buscan expandirse.',
        },
        {
          term: 'Yosu-miru (Sonda / Probe)',
          japanese: '様子見',
          definition: 'Jugada de tanteo que obliga al rival a revelar su intención defensiva antes de elegir tu plan principal.',
        },
      ],
    },
    transferQuestion: {
      id: 'l24-tq-1',
      prompt: 'Evaluación Final de la Academia: Según la síntesis del Capítulo 10 de "Attack and Defense" (pág. 208), ¿cuál es el propósito de lanzar una sonda (Probe) antes de reducir o invadir?',
      boardSize: 9,
      initialStones: [],
      turn: 'BLACK',
      exerciseType: 'MULTIPLE_CHOICE',
      options: [
        {
          id: 'opt-1',
          text: 'Hacer que el oponente se comprometa primero con una dirección (proteger la esquina o el exterior) para ajustar tu estrategia con flexibilidad hacia el lado que deje más vulnerable',
          isCorrect: true,
          feedback: '¡Exacto! "He cannot choose the best answer... because he does not know yet how White will play on the outside. That is of course the whole point of probing first." (pág. 167). ¡Felicidades por completar las 24 lecciones de la Academia Camino de Go!',
        },
        {
          id: 'opt-2',
          text: 'Obligarte a ti mismo a defender la piedra de sonda durante 30 jugadas seguidas',
          isCorrect: false,
          feedback: 'Al contrario: la sonda es ligera y flexible; puedes dejarla atrás según responda el rival.',
        },
      ],
      correctFeedback: '¡Has alcanzado el grado de Maestro en la Academia Camino de Go!',
      wrongFeedback: {},
      defaultWrongFeedback: 'Recuerda el principio de flexibilidad de la página 167.',
      hints: ['La sonda obliga al rival a mostrar sus cartas primero.', 'Selecciona la primera opción.'],
    },
  },
];
