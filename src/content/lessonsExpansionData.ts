import { LessonContent } from '../types/go';

export const EXPANDED_LESSONS_CATALOG: LessonContent[] = [
  // ============================================================================
  // LESSON 4 (STAGE 0 · UNIT 2): OBJETIVO DEL JUEGO, FRONTERAS Y CONTEO
  // ============================================================================
  {
    id: 'lesson-4-territorio-conteo',
    stageNumber: 0,
    stageTitle: '0. Orientación',
    unitNumber: 2,
    unitTitle: 'Objetivo del juego y concepto inicial de territorio',
    title: 'Territorio, Fronteras Cerradas y Final de Partida',
    subtitle:
      'Aprende cómo se gana en Go: rodear intersecciones vacías con muros continuos, distinguir fronteras abiertas de cerradas y finalizar con dos pases.',
    estimatedMinutes: 6,
    xpReward: 25,
    prerequisites: ['lesson-3-atari-captura'],
    relatedPuzzleIds: ['puzzle-11-cerrar-frontera-yose', 'puzzle-2-captura-esquina'],
    observableObjective:
      'Al terminar, podrás identificar qué intersecciones vacías cuentan como territorio seguro, cerrar una frontera abierta en el borde y saber cuándo pasar el turno.',
    activationQuestion: {
      question: '¿Cuál es el objetivo principal que define al ganador de una partida de Go?',
      options: [
        {
          id: 'opt-king',
          text: 'Capturar una pieza especial llamada Rey o General enemigo',
          isCorrect: false,
          explanation:
            'En Go todas las piedras tienen exactamente el mismo valor; no existe un Rey que dar jaque mate.',
        },
        {
          id: 'opt-territory',
          text: 'Controlar más puntos (territorio rodeado y piedras vivas) que el oponente al final',
          isCorrect: true,
          explanation:
            '¡Exacto! Las capturas ayudan, pero el propósito central del Go es rodear y asegurar más intersecciones del tablero que tu rival.',
        },
        {
          id: 'opt-eliminate',
          text: 'Eliminar absolutamente todas las piedras del rival del tablero',
          isCorrect: false,
          explanation:
            'En una partida normal ambos jugadores conservan grupos vivos y reparten el espacio del tablero.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. ¿Qué es el territorio?',
        body: 'Las intersecciones vacías que quedan completamente rodeadas por piedras de un solo color (o entre tus piedras y el borde del tablero) forman tu territorio. Cada intersección vacía rodeada vale 1 punto.',
        deepDive:
          'Los bordes y las esquinas del tablero funcionan como muros naturales gratuitos: en una esquina solo necesitas rodear por dos lados, mientras que en el centro necesitas rodear por los cuatro lados.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 2, y: 0, color: 'BLACK' },
            { x: 2, y: 1, color: 'BLACK' },
            { x: 2, y: 2, color: 'BLACK' },
            { x: 1, y: 2, color: 'BLACK' },
            { x: 0, y: 2, color: 'BLACK' },
          ],
          markers: [
            { x: 0, y: 0, type: 'SQUARE', label: '1' },
            { x: 1, y: 0, type: 'SQUARE', label: '2' },
            { x: 0, y: 1, type: 'SQUARE', label: '3' },
            { x: 1, y: 1, type: 'SQUARE', label: '4' },
          ],
          caption:
            'Con 5 piedras negras apoyadas en la esquina superior izquierda, Negro asegura 4 puntos de territorio vacío (A9, B9, A8 y B8).',
        },
      },
      {
        title: '2. Fronteras cerradas vs. fronteras con filtraciones',
        body: 'Para que un área cuente como territorio al final de la partida, su frontera debe llegar hasta el borde del tablero sin huecos por donde el rival pueda colarse.',
        deepDive:
          'Si dejas la primera línea del borde abierta, las intersecciones interiores siguen conectadas ortogonalmente con las piedras enemigas y el motor las declarará neutrales (0 puntos) hasta que cierres la puerta.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 2, y: 1, color: 'BLACK' },
            { x: 2, y: 2, color: 'BLACK' },
            { x: 1, y: 2, color: 'BLACK' },
            { x: 0, y: 2, color: 'BLACK' },
            { x: 3, y: 0, color: 'WHITE' },
            { x: 3, y: 1, color: 'WHITE' },
          ],
          markers: [{ x: 2, y: 0, type: 'DANGER', label: '!' }],
          caption:
            'Falta colocar la piedra negra en C9 (primera línea superior). Si Negro no cierra C9, Blanco puede filtrarse en la esquina.',
        },
      },
      {
        title: '3. El pase, el Komi y las dos reglas de conteo',
        body: 'Cuando ya no quedan jugadas útiles que ganen puntos ni capturas posibles, pasas tu turno. Dos pases consecutivos (uno de Negro y otro de Blanco) detienen la partida y activan el conteo.',
        deepDive:
          'Como Negro juega primero, Blanco recibe una compensación llamada Komi (habitualmente 5.5 o 6.5 puntos, con medio punto para evitar empates). En Reglas de Área (Chinas) cuentas tus intersecciones vacías + tus piedras vivas en el tablero; en Reglas de Territorio (Japonesas) cuentas tus intersecciones vacías + prisioneros capturados.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 2, y: 0, color: 'BLACK' },
            { x: 2, y: 1, color: 'BLACK' },
            { x: 1, y: 1, color: 'BLACK' },
            { x: 0, y: 1, color: 'BLACK' },
            { x: 6, y: 0, color: 'WHITE' },
            { x: 6, y: 1, color: 'WHITE' },
            { x: 7, y: 1, color: 'WHITE' },
            { x: 8, y: 1, color: 'WHITE' },
          ],
          caption:
            'Ambas esquinas superiores están completamente cerradas. Cuando todo el tablero está definido así, ambos jugadores pasan.',
        },
      },
    ],
    demonstration: {
      title: 'Cerrar fronteras para convertir potencial en territorio real',
      size: 9,
      steps: [
        {
          title: 'Un muro casi terminado en la esquina',
          narration:
            'Negro ha construido una pared alrededor de la esquina superior izquierda (A9–B8), pero la intersección C9 en el borde superior sigue vacía.',
          stones: [
            { x: 2, y: 1, color: 'BLACK' },
            { x: 2, y: 2, color: 'BLACK' },
            { x: 1, y: 2, color: 'BLACK' },
            { x: 0, y: 2, color: 'BLACK' },
            { x: 4, y: 0, color: 'WHITE' },
            { x: 4, y: 1, color: 'WHITE' },
          ],
          markers: [{ x: 2, y: 0, type: 'HIGHLIGHT' }],
        },
        {
          title: 'Qué ocurre si Negro olvida cerrar C9',
          narration:
            'Si Negro juega en otro lugar y Blanco avanza a C9, el espacio de la esquina queda en contacto con una piedra blanca y deja de ser territorio exclusivo de Negro.',
          stones: [
            { x: 2, y: 1, color: 'BLACK' },
            { x: 2, y: 2, color: 'BLACK' },
            { x: 1, y: 2, color: 'BLACK' },
            { x: 0, y: 2, color: 'BLACK' },
            { x: 4, y: 0, color: 'WHITE' },
            { x: 4, y: 1, color: 'WHITE' },
            { x: 2, y: 0, color: 'WHITE' },
          ],
          lastMove: { x: 2, y: 0 },
          markers: [{ x: 1, y: 0, type: 'DANGER', label: '?' }],
        },
        {
          title: 'El cierre correcto en primera línea',
          narration:
            'Cuando Negro juega a tiempo en C9, la frontera queda hermética de borde a borde: las 4 intersecciones vacías (A9, B9, A8 y B8) son 100% territorio negro.',
          stones: [
            { x: 2, y: 0, color: 'BLACK' },
            { x: 2, y: 1, color: 'BLACK' },
            { x: 2, y: 2, color: 'BLACK' },
            { x: 1, y: 2, color: 'BLACK' },
            { x: 0, y: 2, color: 'BLACK' },
            { x: 4, y: 0, color: 'WHITE' },
            { x: 4, y: 1, color: 'WHITE' },
          ],
          lastMove: { x: 2, y: 0 },
          markers: [
            { x: 0, y: 0, type: 'SUCCESS', label: '1' },
            { x: 1, y: 0, type: 'SUCCESS', label: '2' },
            { x: 0, y: 1, type: 'SUCCESS', label: '3' },
            { x: 1, y: 1, type: 'SUCCESS', label: '4' },
          ],
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l4-gd-1',
        prompt:
          'Juega Negro: Cierra la única abertura de tu frontera en el borde superior para asegurar los 4 puntos de territorio de la esquina superior izquierda.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 1, color: 'BLACK' },
          { x: 2, y: 2, color: 'BLACK' },
          { x: 1, y: 2, color: 'BLACK' },
          { x: 0, y: 2, color: 'BLACK' },
          { x: 4, y: 0, color: 'WHITE' },
          { x: 4, y: 1, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 2, y: 0 }],
        correctFeedback:
          '¡Excelente cierre! Al jugar en C9 sellas la frontera contra el borde superior y aseguras los 4 puntos vacíos del interior.',
        wrongFeedback: {
          '0,0': 'Si juegas dentro de tu propio territorio (A9), rellenas tus propios puntos en vez de cerrar la frontera exterior.',
          '1,0': 'B9 está dentro de tu territorio; la puerta exterior que debes bloquear es C9.',
        },
        defaultWrongFeedback:
          'Busca la intersección de la primera línea superior (fila 9) que conecta tu muro de la columna C con el borde.',
        hints: [
          'Observa la columna C: tienes piedras en C8 y C7, pero falta llegar al borde superior.',
          'Haz clic en C9 (columna C, fila 9).',
        ],
        markers: [{ x: 2, y: 0, type: 'CIRCLE' }],
      },
    ],
    independentPractice: [
      {
        id: 'l4-ip-1',
        prompt:
          'Práctica 1: Juega Negro. Sella la frontera inferior en la columna C para que Blanco no pueda entrar en tu esquina inferior izquierda.',
        boardSize: 9,
        initialStones: [
          { x: 0, y: 6, color: 'BLACK' },
          { x: 1, y: 6, color: 'BLACK' },
          { x: 2, y: 6, color: 'BLACK' },
          { x: 2, y: 7, color: 'BLACK' },
          { x: 4, y: 7, color: 'WHITE' },
          { x: 4, y: 8, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 2, y: 8 }],
        correctFeedback:
          '¡Frontera sellada en C1! Ahora las 4 intersecciones vacías de la esquina inferior izquierda (A2, B2, A1, B1) están completamente protegidas.',
        wrongFeedback: {
          '0,8': 'A1 está dentro de tu propio rincón. Debes cerrar la frontera exterior en la columna C.',
        },
        defaultWrongFeedback:
          'Mira el borde inferior (fila 1) justo debajo de tu piedra negra en C2.',
        hints: [
          'Tu muro baja por C3 y C2, pero aún no toca la fila 1.',
          'Coloca tu piedra en C1.',
        ],
      },
      {
        id: 'l4-ip-2',
        prompt:
          'Práctica 2: Observa la esquina superior derecha de Blanco (H9 y J9 vacías, rodeadas por G9, G8, H8 y J8). ¿Cuántos puntos de territorio vacío tiene Blanco ahí?',
        boardSize: 9,
        initialStones: [
          { x: 6, y: 0, color: 'WHITE' },
          { x: 6, y: 1, color: 'WHITE' },
          { x: 7, y: 1, color: 'WHITE' },
          { x: 8, y: 1, color: 'WHITE' },
        ],
        turn: 'WHITE',
        exerciseType: 'MULTIPLE_CHOICE',
        options: [
          {
            id: 'opt-2pts',
            text: '2 puntos de territorio vacío (las intersecciones H9 y J9)',
            isCorrect: true,
            feedback:
              '¡Correcto! Las intersecciones vacías completamente rodeadas por Blanco son H9 y J9: exactamente 2 puntos de territorio.',
          },
          {
            id: 'opt-6pts',
            text: '6 puntos de territorio vacío',
            isCorrect: false,
            feedback:
              'Hay 4 piedras blancas formando el muro y 2 intersecciones vacías dentro (H9 y J9). El territorio vacío son esos 2 puntos.',
          },
          {
            id: 'opt-0pts',
            text: '0 puntos porque toca el borde del tablero',
            isCorrect: false,
            feedback:
              'Al contrario: el borde del tablero ayuda a cerrar el territorio con menos piedras.',
          },
        ],
        correctFeedback: '¡Exacto! H9 y J9 son 2 intersecciones vacías rodeadas.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Cuenta cuántas intersecciones vacías quedan dentro del muro blanco en la esquina superior derecha.',
        hints: [
          'Mira las coordenadas vacías en la fila 9 a la derecha de G9.',
          'Son H9 y J9: 2 intersecciones vacías.',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'Cada intersección vacía completamente rodeada por tus piedras cuenta como territorio.',
        'Las fronteras deben tocar los bordes sin huecos; una puerta abierta deja la zona neutral.',
        'La partida termina de común acuerdo cuando ambos jugadores pasan consecutivamente y se suma el Komi a Blanco.',
      ],
      vocabulary: [
        {
          term: 'Territorio (Ji)',
          japanese: '地',
          definition: 'Intersecciones vacías rodeadas de forma segura por las piedras de un jugador.',
        },
        {
          term: 'Komi',
          japanese: 'コミ',
          definition: 'Puntos de compensación otorgados a Blanco por jugar en segundo lugar (habitualmente 5.5 o 6.5).',
        },
        {
          term: 'Dame (Punto neutral)',
          japanese: 'ダメ',
          definition: 'Intersección vacía situada entre los muros de Negro y Blanco que no pertenece a ningún territorio.',
        },
      ],
    },
    transferQuestion: {
      id: 'l4-tq-1',
      prompt:
        'Pregunta de dominio: Todas las fronteras del tablero ya están cerradas. ¿Por qué NO debes seguir colocando piedras dentro de tu propio territorio vacío?',
      boardSize: 9,
      initialStones: [
        { x: 2, y: 0, color: 'BLACK' },
        { x: 2, y: 1, color: 'BLACK' },
        { x: 2, y: 2, color: 'BLACK' },
        { x: 1, y: 2, color: 'BLACK' },
        { x: 0, y: 2, color: 'BLACK' },
      ],
      turn: 'BLACK',
      exerciseType: 'MULTIPLE_CHOICE',
      options: [
        {
          id: 'tq-waste',
          text: 'Porque rellenas tus propias intersecciones vacías y reduces tus libertades internas sin ganar puntos (debes pasar)',
          isCorrect: true,
          feedback:
            '¡Dominio demostrado! En reglas de territorio cada piedra jugada dentro de tu propio territorio te resta 1 punto, y en reglas de área no añade nada y quita libertades a tus grupos.',
        },
        {
          id: 'tq-double',
          text: 'Porque cada piedra que pongas dentro vale el doble de puntos',
          isCorrect: false,
          feedback:
            'Poner piedras innecesarias dentro de tu territorio seguro nunca multiplica tus puntos; solo quita espacio y libertades.',
        },
        {
          id: 'tq-illegal',
          text: 'Porque el reglamento prohíbe pasar el turno antes de llenar todo el tablero',
          isCorrect: false,
          feedback:
            'Pasar el turno es totalmente legal y es la forma correcta de finalizar cuando el territorio ya está definido.',
        },
      ],
      correctFeedback: '¡Exacto! Cuando no quedan jugadas útiles fuera, la jugada maestra es pasar.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Piensa qué ocurre con las intersecciones vacías de tu territorio si las ocupas con tus propias piedras.',
      hints: [
        'Tu territorio ya está seguro.',
        'Rellenarlo no te da más espacio y en reglas japonesas te resta puntos.',
      ],
    },
  },

  // ============================================================================
  // LESSON 5 (STAGE 1 · UNIT 3): REGLA DE KO, AMENAZAS Y RESOLUCIÓN
  // ============================================================================
  {
    id: 'lesson-5-regla-ko-amenazas',
    stageNumber: 1,
    stageTitle: '1. Reglas esenciales',
    unitNumber: 3,
    unitTitle: 'Regla de Ko, Superko y conteo básico',
    title: 'La Batalla de Ko: Amenazas Locales y Resolución',
    subtitle:
      'Domina el ciclo táctico del Ko: por qué se prohíbe recapturar al instante, cómo usar una amenaza de Ko en otra zona y cómo cerrar el Ko.',
    estimatedMinutes: 7,
    xpReward: 25,
    prerequisites: ['lesson-4-territorio-conteo'],
    relatedPuzzleIds: ['puzzle-10-iniciar-ko', 'puzzle-15-resolver-ko'],
    observableObjective:
      'Al terminar, sabrás iniciar un Ko, reconocer la intersección bloqueada por un turno, jugar una amenaza de Ko y conectar para terminar la disputa.',
    activationQuestion: {
      question:
        'Acabas de capturar una piedra en Ko y el rival no puede recapturar de inmediato. ¿Qué puede hacer tu rival en su turno?',
      options: [
        {
          id: 'opt-lose-turn',
          text: 'Pierde su turno automáticamente y tú vuelves a jugar',
          isCorrect: false,
          explanation:
            'En Go nunca se pierde el turno por un Ko: el rival simplemente debe jugar en cualquier otra intersección del tablero.',
        },
        {
          id: 'opt-ko-threat',
          text: 'Jugar una amenaza importante en otra parte del tablero (Amenaza de Ko) para obligarte a responder',
          isCorrect: true,
          explanation:
            '¡Exacto! Como esa jugada cambia la posición global del tablero, en el turno siguiente el Ko vuelve a ser legal para recapturar.',
        },
        {
          id: 'opt-draw',
          text: 'Declarar empate inmediato en toda la partida',
          isCorrect: false,
          explanation:
            'Precisamente la regla de Ko existe para evitar empates por repetición y convertir la lucha en un intercambio estratégico.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. Las tres fases de una lucha de Ko',
        body: 'Una lucha de Ko tiene tres pasos: (1) Capturar la piedra del Ko, (2) El rival juega una amenaza de Ko en otro sector, y (3) Tú decides si respondes a esa amenaza o si conectas el Ko para terminarlo.',
        deepDive:
          'Esta dinámica convierte un problema local de una sola piedra en una negociación global por todo el tablero.',
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
          markers: [{ x: 4, y: 4, type: 'DANGER', label: 'KO' }],
          caption:
            'Negro acaba de jugar en F5 capturando E5. E5 está bloqueado para Blanco durante este turno.',
        },
      },
      {
        title: '2. ¿Cómo se termina definitivamente un Ko?',
        body: 'Si quien capturó el Ko tiene el turno de nuevo (porque el rival jugó en otro lado y tú decidiste ignorarlo), puedes jugar dentro del punto vacío del Ko para conectar sólidamente tus piedras.',
        deepDive:
          'Una vez que rellenas el punto de Ko (o capturas las piedras rivales que formaban la boca del Ko), ya no queda ninguna piedra en atari y la disputa termina para siempre.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 4, y: 5, color: 'BLACK' },
            { x: 5, y: 4, color: 'BLACK' },
            { x: 4, y: 4, color: 'BLACK' },
            { x: 5, y: 3, color: 'WHITE' },
            { x: 5, y: 5, color: 'WHITE' },
            { x: 6, y: 4, color: 'WHITE' },
          ],
          markers: [{ x: 4, y: 4, type: 'SUCCESS', label: '✓' }],
          caption:
            'Al conectar en E5, las 5 piedras negras forman una cruz sólida imposible de recapturar en Ko.',
        },
      },
    ],
    demonstration: {
      title: 'Ciclo completo: Captura de Ko, amenaza externa y conexión final',
      size: 9,
      steps: [
        {
          title: 'Paso 1: Negro inicia el Ko en F5',
          narration:
            'Negro juega F5 y captura la piedra blanca de E5. El punto E5 queda marcado como Ko prohibido para la respuesta inmediata de Blanco.',
          stones: [
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 4, y: 5, color: 'BLACK' },
            { x: 5, y: 4, color: 'BLACK' },
            { x: 5, y: 3, color: 'WHITE' },
            { x: 5, y: 5, color: 'WHITE' },
            { x: 6, y: 4, color: 'WHITE' },
            { x: 1, y: 1, color: 'BLACK' },
            { x: 1, y: 2, color: 'WHITE' },
          ],
          lastMove: { x: 5, y: 4 },
          markers: [{ x: 4, y: 4, type: 'DANGER', label: 'KO' }],
        },
        {
          title: 'Paso 2: Blanco hace una amenaza de Ko en A8',
          narration:
            'Como Blanco no puede jugar en E5 ahora mismo, juega en A8 poniendo en atari la piedra negra de B8 en la esquina.',
          stones: [
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 4, y: 5, color: 'BLACK' },
            { x: 5, y: 4, color: 'BLACK' },
            { x: 5, y: 3, color: 'WHITE' },
            { x: 5, y: 5, color: 'WHITE' },
            { x: 6, y: 4, color: 'WHITE' },
            { x: 1, y: 1, color: 'BLACK' },
            { x: 1, y: 2, color: 'WHITE' },
            { x: 0, y: 1, color: 'WHITE' },
          ],
          lastMove: { x: 0, y: 1 },
          markers: [{ x: 1, y: 1, type: 'TRIANGLE' }],
        },
        {
          title: 'Paso 3: Negro decide resolver y cerrar el Ko en E5',
          narration:
            'Si el Ko central vale más que la piedra de B8, Negro juega en E5, conecta sus 5 piedras y pone fin al Ko para siempre.',
          stones: [
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 4, y: 5, color: 'BLACK' },
            { x: 5, y: 4, color: 'BLACK' },
            { x: 4, y: 4, color: 'BLACK' },
            { x: 5, y: 3, color: 'WHITE' },
            { x: 5, y: 5, color: 'WHITE' },
            { x: 6, y: 4, color: 'WHITE' },
            { x: 1, y: 1, color: 'BLACK' },
            { x: 1, y: 2, color: 'WHITE' },
            { x: 0, y: 1, color: 'WHITE' },
          ],
          lastMove: { x: 4, y: 4 },
          markers: [{ x: 4, y: 4, type: 'SUCCESS', label: '✓' }],
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l5-gd-1',
        prompt:
          'Juega Negro: Blanco acaba de jugar en otra esquina tras tu captura de Ko. ¡Rellena y conecta el punto del Ko en E5 para terminar la disputa definitivamente!',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 4, color: 'BLACK' },
          { x: 4, y: 3, color: 'BLACK' },
          { x: 4, y: 5, color: 'BLACK' },
          { x: 5, y: 4, color: 'BLACK' },
          { x: 5, y: 3, color: 'WHITE' },
          { x: 5, y: 5, color: 'WHITE' },
          { x: 6, y: 4, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 4 }],
        correctFeedback:
          '¡Ko resuelto! Al conectar en E5 tu grupo negro queda unido en una sola cadena con 7 libertades.',
        wrongFeedback: {},
        defaultWrongFeedback:
          'El punto vacío en el centro del Ko es E5. Juega allí para unir tu piedra de F5 con el resto de tus piedras.',
        hints: [
          'Tu piedra en F5 está en atari con su única libertad en E5.',
          'Juega en E5 para conectar todas tus piedras negras.',
        ],
        markers: [{ x: 4, y: 4, type: 'CIRCLE' }],
      },
    ],
    independentPractice: [
      {
        id: 'l5-ip-1',
        prompt:
          'Práctica: Otra forma de resolver un Ko es capturar una de las piedras rivales que rodean a tu piedra en atari. Juega Negro y captura la piedra blanca en F6 (que está en atari) para terminar el Ko con ganancia extra.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 4, color: 'BLACK' },
          { x: 4, y: 3, color: 'BLACK' },
          { x: 4, y: 5, color: 'BLACK' },
          { x: 5, y: 4, color: 'BLACK' },
          { x: 5, y: 3, color: 'WHITE' },
          { x: 5, y: 2, color: 'BLACK' },
          { x: 6, y: 3, color: 'BLACK' },
          { x: 5, y: 5, color: 'WHITE' },
          { x: 6, y: 4, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 4 }],
        correctFeedback:
          '¡Doble beneficio! Al jugar en E5 conectas tu grupo y además dejas sin aire si hubiera piedras rivales atrapadas.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Juega en E5 para conectar sólidamente el Ko.',
        hints: [
          'Mira el punto central del Ko en E5.',
          'Haz clic en E5.',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'La regla de Ko impide repetir exactamente la posición anterior del tablero.',
        'Una amenaza de Ko (Ko-date) obliga al rival a elegir entre defender otro sector o cerrar el Ko.',
        'Conectar en el punto vacío del Ko elimina el atari y cierra la batalla definitivamente.',
      ],
      vocabulary: [
        {
          term: 'Ko-date (Amenaza de Ko)',
          japanese: 'コウ立て',
          definition: 'Jugada urgente en otra zona del tablero que permite cambiar la posición para poder recapturar el Ko.',
        },
        {
          term: 'Tsugi (Conectar)',
          japanese: '継ぎ',
          definition: 'Unir piedras propias amenazadas (o cerrar un Ko) en un solo grupo.',
        },
      ],
    },
    transferQuestion: {
      id: 'l5-tq-1',
      prompt:
        'Pregunta de transferencia: ¿Cuándo conviene ignorar la amenaza de Ko de tu rival y cerrar inmediatamente el Ko?',
      boardSize: 9,
      initialStones: [
        { x: 3, y: 4, color: 'BLACK' },
        { x: 4, y: 3, color: 'BLACK' },
        { x: 4, y: 5, color: 'BLACK' },
        { x: 5, y: 4, color: 'BLACK' },
      ],
      turn: 'BLACK',
      exerciseType: 'MULTIPLE_CHOICE',
      options: [
        {
          id: 'tq-bigger',
          text: 'Cuando el valor del Ko es mayor que el daño que puede causar la amenaza del rival en el otro lado',
          isCorrect: true,
          feedback:
            '¡Exacto! El Go es un juego de evaluación y equilibrio: si la amenaza del rival vale 4 puntos pero el Ko vale 15 puntos, cierras el Ko sin dudar.',
        },
        {
          id: 'tq-never',
          text: 'Nunca: es obligatorio por reglamento responder siempre a todas las amenazas del rival',
          isCorrect: false,
          feedback:
            'Responder a una amenaza de Ko nunca es obligatorio por reglamento; es una decisión puramente estratégica.',
        },
      ],
      correctFeedback: '¡Criterio estratégico impecable!',
      wrongFeedback: {},
      defaultWrongFeedback: 'Compara el tamaño en puntos del Ko frente al tamaño de la amenaza.',
      hints: [
        'Compara cuántos puntos ganas cerrando el Ko frente a cuántos pierdes ignorando la amenaza.',
        'Elige siempre la opción de mayor valor global.',
      ],
    },
  },

  // ============================================================================
  // LESSON 6 (STAGE 2 · UNITS 1 & 2): CONEXIÓN SÓLIDA, BOCA DE TIGRE Y CORTE
  // ============================================================================
  {
    id: 'lesson-6-conectar-cortar-defensa',
    stageNumber: 2,
    stageTitle: '2. Sobrevivir',
    unitNumber: 2,
    unitTitle: 'Conexión sólida, boca de tigre y defensa ante cortes',
    title: 'Conexión Sólida, Boca de Tigre y Punto de Corte',
    subtitle:
      'Mantén tus grupos unidos para multiplicar sus libertades y aprende a cortar las piedras diagonales de tu oponente para dividir su fuerza.',
    estimatedMinutes: 7,
    xpReward: 25,
    prerequisites: ['lesson-5-regla-ko-amenazas'],
    relatedPuzzleIds: ['puzzle-5-conectar-corte', 'puzzle-6-doble-atari', 'puzzle-7-boca-tigre'],
    observableObjective:
      'Al terminar, podrás identificar puntos de corte (kirime), defender con conexión sólida o Boca de Tigre, y ejecutar un Doble Atari contra piedras desconectadas.',
    activationQuestion: {
      question:
        '¿Por qué dos piedras del mismo color colocadas en diagonal están en peligro cuando hay piedras rivales cerca?',
      options: [
        {
          id: 'opt-diag-cut',
          text: 'Porque las diagonales no conectan en Go: si el rival ocupa las intersecciones ortogonales entre ellas, las separa en dos grupos débiles',
          isCorrect: true,
          explanation:
            '¡Exacto! Dos piedras separadas tienen que defenderse cada una por su cuenta, mientras que conectadas comparten todas sus libertades.',
        },
        {
          id: 'opt-diag-rule',
          text: 'Porque colocar piedras en diagonal resta 2 puntos de penalización',
          isCorrect: false,
          explanation:
            'Jugar en diagonal (Kosumi) es muy común, pero debes estar atento a sus dos puntos de corte ortogonales.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. El punto de corte (Kirime) y el Doble Atari',
        body: 'Cuando dos piedras o grupos propios se tocan solo en diagonal y el rival ya ocupa uno de los dos cruces adyacentes, el otro cruce es un punto de corte crítico.',
        deepDive:
          'Si el rival coloca una piedra en ese punto de corte, no solo divide tus grupos: muchas veces da un Doble Atari simultáneo, garantizando la captura de al menos una de tus piedras.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 3, y: 3, color: 'WHITE' },
            { x: 2, y: 4, color: 'WHITE' },
            { x: 4, y: 2, color: 'WHITE' },
          ],
          markers: [{ x: 4, y: 4, type: 'DANGER', label: '!' }],
          caption:
            'Si Blanco juega en E5, corta a las dos piedras negras (D5 y E6) y las deja a ambas en atari al mismo tiempo.',
        },
      },
      {
        title: '2. La Boca de Tigre (Kake-tsugi)',
        body: 'Además de la conexión directa (Tsugi), puedes proteger un punto de corte formando una "Boca de Tigre": tres piedras alrededor del punto de corte.',
        deepDive:
          'Si el rival intenta meterse dentro de la Boca de Tigre, su piedra nace inmediatamente en atari con una sola libertad y es capturada en el siguiente turno.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 5, y: 4, color: 'BLACK' },
          ],
          markers: [{ x: 4, y: 4, type: 'SUCCESS', label: '🐯' }],
          caption:
            'Las tres piedras negras (D5, E6 y F5) forman una Boca de Tigre: si Blanco entra en E5, queda instantáneamente en atari.',
        },
      },
    ],
    demonstration: {
      title: 'Comparación: Cortar al rival vs. proteger tu propio corte',
      size: 9,
      steps: [
        {
          title: 'Una forma diagonal amenazada por un peep (Nozoki)',
          narration:
            'Negro tiene piedras en D5 y E6. Blanco juega D6 amenazando con cortar en E5.',
          stones: [
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 3, y: 3, color: 'WHITE' },
          ],
          lastMove: { x: 3, y: 3 },
          markers: [{ x: 4, y: 4, type: 'HIGHLIGHT' }],
        },
        {
          title: 'Defensa flexible: La Boca de Tigre en F5',
          narration:
            'Si Negro juega en F5 (o conecta directamente en E5), el corte queda neutralizado porque cualquier piedra blanca que entre en E5 quedará en atari inmediato.',
          stones: [
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 3, y: 3, color: 'WHITE' },
            { x: 5, y: 4, color: 'BLACK' },
          ],
          lastMove: { x: 5, y: 4 },
          markers: [{ x: 4, y: 4, type: 'SUCCESS', label: '✓' }],
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l6-gd-1',
        prompt:
          'Juega Negro: Las dos piedras blancas en D5 y E6 están desconectadas y solo tienen 2 libertades cada una. ¡Corta en el punto vital para darles Doble Atari!',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 4, color: 'WHITE' },
          { x: 4, y: 3, color: 'WHITE' },
          { x: 3, y: 3, color: 'BLACK' },
          { x: 2, y: 4, color: 'BLACK' },
          { x: 4, y: 2, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 4 }],
        correctFeedback:
          '¡Doble Atari perfecto en E5! Tanto la piedra blanca en D5 como la de E6 quedan con 1 sola libertad; Blanco no puede salvar ambas.',
        wrongFeedback: {},
        defaultWrongFeedback:
          'Busca la intersección que toca simultáneamente a la piedra blanca de D5 y a la de E6.',
        hints: [
          'Mira el cruce común entre D5 y E6.',
          'Juega en E5.',
        ],
        markers: [{ x: 4, y: 4, type: 'CIRCLE' }],
      },
    ],
    independentPractice: [
      {
        id: 'l6-ip-1',
        prompt:
          'Práctica: Juega Negro. Forma una Boca de Tigre jugando en F5 (o conecta en E5) para proteger tus piedras D5 y E6 del corte blanco.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 4, color: 'BLACK' },
          { x: 4, y: 3, color: 'BLACK' },
          { x: 3, y: 3, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [
          { x: 4, y: 4 },
          { x: 5, y: 4 },
        ],
        correctFeedback:
          '¡Defensa impecable! Ya sea con conexión sólida en E5 o con Boca de Tigre en F5, tus piedras quedan a salvo del corte.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Conecta directamente en E5 o forma la Boca de Tigre en F5.',
        hints: [
          'El punto donde Blanco quiere cortar es E5.',
          'Juega en E5 o en F5.',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'Conectar grupos propios reduce el número de objetivos que tienes que defender.',
        'Cortar grupos rivales los obliga a luchar por separado con menos libertades.',
        'La Boca de Tigre protege un corte de forma elástica poniendo en atari cualquier intento de invasión.',
      ],
      vocabulary: [
        {
          term: 'Kiri (Corte)',
          japanese: '切り',
          definition: 'Jugada que separa piedras rivales en diagonal impidiendo que se conecten.',
        },
        {
          term: 'Boca de Tigre (Kake-tsugi)',
          japanese: '掛け継ぎ',
          definition: 'Forma de tres piedras alrededor de un punto de corte donde el rival entraría en auto-atari.',
        },
      ],
    },
    transferQuestion: {
      id: 'l6-tq-1',
      prompt:
        'Pregunta de transferencia: ¿Por qué un Doble Atari es tan poderoso tácticamente?',
      boardSize: 9,
      initialStones: [
        { x: 3, y: 4, color: 'WHITE' },
        { x: 4, y: 3, color: 'WHITE' },
        { x: 3, y: 3, color: 'BLACK' },
        { x: 4, y: 4, color: 'BLACK' },
      ],
      turn: 'BLACK',
      exerciseType: 'MULTIPLE_CHOICE',
      options: [
        {
          id: 'tq-one-turn',
          text: 'Porque el rival solo tiene un turno por jugada: si salva uno de los dos grupos en atari, tú capturas el otro en el turno siguiente',
          isCorrect: true,
          feedback:
            '¡Exacto! A menos que pueda capturar la piedra atacante misma, el rival no puede defender dos amenazas de captura independientes en un solo turno.',
        },
        {
          id: 'tq-extra-turn',
          text: 'Porque el reglamento te regala dos turnos seguidos al anunciar Doble Atari',
          isCorrect: false,
          feedback:
            'Los turnos siempre se alternan; la ventaja nace de que una sola piedra tuya crea dos amenazas simultáneas.',
        },
      ],
      correctFeedback: '¡Lectura táctica clara!',
      wrongFeedback: {},
      defaultWrongFeedback: 'Recuerda que cada jugador solo puede colocar una piedra por turno.',
      hints: [
        'Blanco tiene dos grupos amenazados pero solo puede hacer una jugada.',
        'Cualquiera que salve, el otro caerá.',
      ],
    },
  },

  // ============================================================================
  // LESSON 7 (STAGE 3 · UNITS 1 & 2): FORMA EFICIENTE VS. TRIÁNGULO VACÍO
  // ============================================================================
  {
    id: 'lesson-7-forma-eficiencia',
    stageNumber: 3,
    stageTitle: '3. Forma y eficiencia',
    unitNumber: 1,
    unitTitle: 'Formas clásicas de conexión y defectos de forma',
    title: 'Buena Forma (Katachi): Junta de Bambú vs. Triángulo Vacío',
    subtitle:
      'Aprende por qué la geometría de tus piedras determina sus libertades: la Junta de Bambú inquebrantable frente al ineficiente Triángulo Vacío.',
    estimatedMinutes: 6,
    xpReward: 25,
    prerequisites: ['lesson-6-conectar-cortar-defensa'],
    relatedPuzzleIds: ['puzzle-22-forma-bambu', 'puzzle-7-boca-tigre'],
    observableObjective:
      'Al terminar, sabrás distinguir un Triángulo Vacío de un grupo estirado (Nobi) y construir una Junta de Bambú que conecta dos grupos con máxima eficiencia.',
    activationQuestion: {
      question:
        'Si colocas 3 piedras negras en línea recta en el centro tienen 8 libertades. ¿Qué pasa si las colocas dobladas formando una "L" de 3 piedras (Triángulo Vacío)?',
      options: [
        {
          id: 'opt-fewer',
          text: 'Sus piedras se estorban entre sí y el grupo baja a solo 7 libertades sin encerrar ningún ojo',
          isCorrect: true,
          explanation:
            '¡Exacto! Las dos piedras de los extremos comparten la misma libertad interior vacía, desperdiciando eficiencia y alcance.',
        },
        {
          id: 'opt-more',
          text: 'Ganan 12 libertades porque forman una esquina',
          isCorrect: false,
          explanation:
            'Al doblarse sin una piedra rival en medio, dos piedras apuntan a la misma intersección vacía y pierden una libertad.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. El defecto clásico: El Triángulo Vacío (Gukei)',
        body: 'Tres piedras del mismo color formando una "L" con la intersección interior vacía se llaman Triángulo Vacío. Es una de las formas más ineficientes del Go.',
        deepDive:
          'A diferencia de la Boca de Tigre (donde hay una piedra enemiga que estás envolviendo), en el Triángulo Vacío no hay nada que rodear: tus piedras se quitan libertades mutuas.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 4, y: 4, color: 'BLACK' },
            { x: 5, y: 4, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
          ],
          markers: [{ x: 5, y: 3, type: 'DANGER', label: '×' }],
          caption:
            'Triángulo Vacío: E5, F5 y E6 forman una L con F6 vacío. Tienen solo 7 libertades en lugar de las 8 de una línea recta.',
        },
      },
      {
        title: '2. La Junta de Bambú (Takefu) y el Salto de un punto (Ikken Tobi)',
        body: 'Dos pares de piedras enfrentadas paralelamente forman una Junta de Bambú: es imposible de cortar porque tiene dos caminos de conexión simultáneos (miai).',
        deepDive:
          'Si el rival intenta cortar por un lado de la Junta de Bambú, tú conectas por el otro lado.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 3, color: 'BLACK' },
            { x: 5, y: 3, color: 'BLACK' },
            { x: 3, y: 5, color: 'BLACK' },
            { x: 5, y: 5, color: 'BLACK' },
          ],
          markers: [
            { x: 3, y: 4, type: 'SUCCESS', label: 'A' },
            { x: 5, y: 4, type: 'SUCCESS', label: 'B' },
          ],
          caption:
            'Junta de Bambú: si Blanco juega en A (D5), Negro conecta en B (F5), y viceversa.',
        },
      },
    ],
    demonstration: {
      title: 'Extender con buena forma frente a apelotonarse',
      size: 9,
      steps: [
        {
          title: 'Evitar el Triángulo Vacío al extender',
          narration:
            'Negro tiene dos piedras en D5 y E5 frente a Blanco en D6 y E6. Si Negro juega E4 se dobla en un Triángulo Vacío pesado; si extiende en línea recta a F5 (Nobi), gana 8 libertades y presiona a Blanco.',
          stones: [
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 4, color: 'BLACK' },
            { x: 5, y: 4, color: 'BLACK' },
            { x: 3, y: 3, color: 'WHITE' },
            { x: 4, y: 3, color: 'WHITE' },
          ],
          lastMove: { x: 5, y: 4 },
          markers: [{ x: 5, y: 4, type: 'SUCCESS', label: '✓' }],
        },
        {
          title: 'Completar la Junta de Bambú',
          narration:
            'Cuando Negro tiene D6, F6 y D4, jugar en F4 completa la Junta de Bambú y une ambos lados sin que Blanco pueda cortarlos.',
          stones: [
            { x: 3, y: 3, color: 'BLACK' },
            { x: 5, y: 3, color: 'BLACK' },
            { x: 3, y: 5, color: 'BLACK' },
            { x: 5, y: 5, color: 'BLACK' },
          ],
          lastMove: { x: 5, y: 5 },
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l7-gd-1',
        prompt:
          'Juega Negro: Tienes piedras en D6, F6 y D4 amenazadas de separación por Blanco. Juega la cuarta piedra para completar la Junta de Bambú inquebrantable.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 3, color: 'BLACK' },
          { x: 5, y: 3, color: 'BLACK' },
          { x: 3, y: 5, color: 'BLACK' },
          { x: 2, y: 4, color: 'WHITE' },
          { x: 6, y: 4, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 5, y: 5 }],
        correctFeedback:
          '¡Junta de Bambú completada en F4! Ahora D5 y F5 son puntos equivalentes (miai): Blanco nunca podrá separar tus piedras.',
        wrongFeedback: {
          '4,3': 'E6 rellena el espacio entre D6 y F6 formando un bloque pesado sin conectar con D4.',
        },
        defaultWrongFeedback:
          'Busca la intersección simétrica que completa el rectángulo de bambú con D6, F6 y D4.',
        hints: [
          'Tienes D6, F6 y D4.',
          'Juega en F4.',
        ],
        markers: [{ x: 5, y: 5, type: 'CIRCLE' }],
      },
    ],
    independentPractice: [
      {
        id: 'l7-ip-1',
        prompt:
          'Práctica: Negro tiene piedras en D5 y E5 contra Blanco en D6 y E6. Extiende tu grupo en línea recta (Nobi) hacia la derecha para maximizar tus libertades sin hacer un Triángulo Vacío.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 4, color: 'BLACK' },
          { x: 4, y: 4, color: 'BLACK' },
          { x: 3, y: 3, color: 'WHITE' },
          { x: 4, y: 3, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 5, y: 4 }],
        correctFeedback:
          '¡Forma limpia en F5! Tu muro de 3 piedras en línea recta disfruta de 7 libertades y supera en alcance a las 2 piedras blancas.',
        wrongFeedback: {
          '4,5': 'E4 forma una L (Triángulo Vacío) sin necesidad.',
        },
        defaultWrongFeedback: 'Continúa la fila 5 hacia la derecha jugando en F5.',
        hints: [
          'Tus piedras están en D5 y E5.',
          'Extiende a F5.',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'La buena forma (Katachi) maximiza libertades, alcance y flexibilidad con el menor número de piedras.',
        'El Triángulo Vacío desperdicia una libertad porque dos piedras apuntan al mismo punto vacío.',
        'La Junta de Bambú garantiza la conexión mediante dos caminos equivalentes (Miai).',
      ],
      vocabulary: [
        {
          term: 'Takefu (Junta de Bambú)',
          japanese: '竹生',
          definition: 'Conexión elástica de cuatro piedras en dos pares paralelos imposible de cortar.',
        },
        {
          term: 'Gukei (Triángulo Vacío)',
          japanese: '愚形',
          definition: 'Tres piedras en L sin piedra rival en su esquina interior; pierde eficiencia y libertades.',
        },
        {
          term: 'Miai',
          japanese: '見合い',
          definition: 'Dos opciones equivalentes: si el rival toma la primera, tú tomas la segunda.',
        },
      ],
    },
    transferQuestion: {
      id: 'l7-tq-1',
      prompt: 'Pregunta de transferencia: ¿Por qué la Junta de Bambú no puede ser cortada por el rival?',
      boardSize: 9,
      initialStones: [
        { x: 3, y: 3, color: 'BLACK' },
        { x: 5, y: 3, color: 'BLACK' },
        { x: 3, y: 5, color: 'BLACK' },
        { x: 5, y: 5, color: 'BLACK' },
      ],
      turn: 'BLACK',
      exerciseType: 'MULTIPLE_CHOICE',
      options: [
        {
          id: 'tq-miai',
          text: 'Porque ofrece dos rutas ortogonales paralelas (Miai): si el rival bloquea una, tú conectas por la otra',
          isCorrect: true,
          feedback: '¡Exacto! Ese principio de equivalencia (Miai) es uno de los pilares tácticos del Go.',
        },
        {
          id: 'tq-diag',
          text: 'Porque permite conectar en diagonal',
          isCorrect: false,
          feedback: 'Las conexiones siguen siendo 100% ortogonales (por la columna D o por la columna F).',
        },
      ],
      correctFeedback: '¡Comprensión perfecta de forma y Miai!',
      wrongFeedback: {},
      defaultWrongFeedback: 'Observa los dos caminos entre la fila 6 y la fila 4: D5 y F5.',
      hints: [
        'Mira los puntos D5 y F5.',
        'Si Blanco juega en uno, Negro juega en el otro.',
      ],
    },
  },

  // ============================================================================
  // LESSON 8 (STAGE 4 · UNITS 1 & 2): TERRITORIO E INFLUENCIA (ESQUINA, LADO, CENTRO)
  // ============================================================================
  {
    id: 'lesson-8-territorio-influencia-moyo',
    stageNumber: 4,
    stageTitle: '4. Territorio e influencia',
    unitNumber: 1,
    unitTitle: 'La jerarquía del tablero y equilibrio territorio-influencia',
    title: 'Esquinas de Oro, Lados de Plata: 3ª Línea vs. 4ª Línea',
    subtitle:
      'Descubre por qué la apertura comienza en las esquinas y cómo elegir entre la 3ª línea (territorio seguro) y la 4ª línea (influencia hacia el centro).',
    estimatedMinutes: 6,
    xpReward: 25,
    prerequisites: ['lesson-7-forma-eficiencia'],
    relatedPuzzleIds: ['puzzle-23-invasion-san-san', 'puzzle-11-cerrar-frontera-yose'],
    observableObjective:
      'Al terminar, sabrás ocupar esquinas eficientemente en la apertura, distinguir el valor de la 3ª y 4ª línea, e invadir el punto 3-3 (San-san).',
    activationQuestion: {
      question:
        'Para rodear 9 puntos de territorio vacío, ¿dónde necesitas colocar MENOS piedras?',
      options: [
        {
          id: 'opt-corner',
          text: 'En una esquina, porque dos bordes del tablero actúan como paredes naturales gratuitas',
          isCorrect: true,
          explanation:
            '¡Exacto! Por eso el proverbio clásico dice: "Las esquinas son de oro, los lados son de plata y el centro es de hierba".',
        },
        {
          id: 'opt-center',
          text: 'En el centro exacto del tablero',
          isCorrect: false,
          explanation:
            'En el centro no tienes ningún borde que te ayude: necesitas cerrar los cuatro costados completos con el doble de piedras.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. La jerarquía geométrica: Esquina → Lado → Centro',
        body: 'Para encerrar 4 puntos vacíos en una esquina bastan 5 piedras (apoyadas en 2 bordes). En un lado necesitas 7 piedras (apoyadas en 1 borde). En el centro necesitas 10 piedras.',
        deepDive:
          'Por esta razón matemática, todas las partidas de Go comienzan disputando las cuatro esquinas antes de expandirse hacia los lados y el centro.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 2, y: 2, color: 'BLACK' },
            { x: 6, y: 2, color: 'WHITE' },
            { x: 2, y: 6, color: 'BLACK' },
            { x: 6, y: 6, color: 'WHITE' },
          ],
          markers: [
            { x: 2, y: 2, type: 'CIRCLE' },
            { x: 6, y: 2, type: 'CIRCLE' },
            { x: 2, y: 6, type: 'CIRCLE' },
            { x: 6, y: 6, type: 'CIRCLE' },
          ],
          caption:
            'Los cuatro puntos 3-3 (C7, G7, C3, G3) aseguran las esquinas de forma directa en un tablero 9×9.',
        },
      },
      {
        title: '2. Tercera línea (Territorio) vs. Cuarta línea (Influencia)',
        body: 'Jugar en la 3ª línea desde el borde asegura territorio en la esquina y el lado porque es difícil que el rival invada por debajo. Jugar en la 4ª línea cede el punto 3-3 pero proyecta poder e influencia hacia el centro.',
        deepDive:
          'Si un jugador construye un muro alto en la 4ª línea sin asegurar el rincón, el rival puede invadir en el punto 3-3 (San-san) y vivir fácilmente en la esquina.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 3, color: 'WHITE' },
            { x: 3, y: 2, color: 'WHITE' },
            { x: 2, y: 3, color: 'WHITE' },
            { x: 2, y: 2, color: 'BLACK' },
          ],
          markers: [{ x: 2, y: 2, type: 'SUCCESS', label: '3-3' }],
          caption:
            'Invasión en San-san (C7): aunque Blanco tiene un muro exterior en la 4ª línea, Negro entra en C7 y reclama el territorio de la esquina.',
        },
      },
    ],
    demonstration: {
      title: 'Equilibrio entre asegurar la esquina y proyectar influencia',
      size: 9,
      steps: [
        {
          title: 'Ocupación equilibrada de las esquinas',
          narration:
            'Negro abre en C7 (3ª línea) asegurando territorio rápido; Blanco responde en G3 y Negro toma C3.',
          stones: [
            { x: 2, y: 2, color: 'BLACK' },
            { x: 6, y: 6, color: 'WHITE' },
            { x: 2, y: 6, color: 'BLACK' },
          ],
          lastMove: { x: 2, y: 6 },
        },
        {
          title: 'Extensión por el lado occidental',
          narration:
            'Con las dos esquinas izquierdas ocupadas (C7 y C3), Negro extiende en C5 formando un marco territorial (Moyo) a lo largo de todo el lado izquierdo.',
          stones: [
            { x: 2, y: 2, color: 'BLACK' },
            { x: 6, y: 6, color: 'WHITE' },
            { x: 2, y: 6, color: 'BLACK' },
            { x: 6, y: 2, color: 'WHITE' },
            { x: 2, y: 4, color: 'BLACK' },
          ],
          lastMove: { x: 2, y: 4 },
          markers: [{ x: 2, y: 4, type: 'SUCCESS', label: 'Moyo' }],
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l8-gd-1',
        prompt:
          'Juega Negro: Tienes ocupadas las dos esquinas izquierdas en C7 y C3. Juega en el punto medio de la 3ª línea izquierda para unir tu marco territorial (Moyo).',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 2, color: 'BLACK' },
          { x: 2, y: 6, color: 'BLACK' },
          { x: 6, y: 2, color: 'WHITE' },
          { x: 6, y: 6, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 2, y: 4 }],
        correctFeedback:
          '¡Excelente extensión en C5! Con C7, C5 y C3 en la tercera línea, todo el lado izquierdo trabaja en armonía.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Busca el punto estrella intermedio entre C7 y C3 en la columna C.',
        hints: [
          'Mira la columna C entre la fila 7 y la fila 3.',
          'Juega en C5.',
        ],
        markers: [{ x: 2, y: 4, type: 'CIRCLE' }],
      },
    ],
    independentPractice: [
      {
        id: 'l8-ip-1',
        prompt:
          'Práctica: Blanco ha construido piedras altas en F6 y G6 dejando su esquina superior derecha abierta. Juega Negro en el punto 3-3 (G7) para invadir la esquina.',
        boardSize: 9,
        initialStones: [
          { x: 5, y: 3, color: 'WHITE' },
          { x: 6, y: 3, color: 'WHITE' },
          { x: 2, y: 6, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 6, y: 2 }],
        correctFeedback:
          '¡Invasión en San-san (G7)! En el punto 3-3 Negro dispone de amplio espacio en ambas direcciones del borde para vivir y quitarle el territorio a Blanco.',
        wrongFeedback: {},
        defaultWrongFeedback: 'El punto 3-3 de la esquina superior derecha es G7 (columna G, fila 7).',
        hints: [
          'Cuenta 3 líneas desde el borde derecho y 3 líneas desde el borde superior.',
          'Haz clic en G7.',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'Las esquinas son las zonas más eficientes para hacer territorio porque cuentan con dos bordes.',
        'La 3ª línea prioriza el territorio seguro; la 4ª línea prioriza la influencia hacia el centro.',
        'Un marco territorial amplio pero aún abierto se llama Moyo y puede ser invadido o reducido.',
      ],
      vocabulary: [
        {
          term: 'San-san (Punto 3-3)',
          japanese: '三々',
          definition: 'Intersección situada en la tercera línea desde ambos bordes de una esquina; ideal para asegurar o invadir territorio.',
        },
        {
          term: 'Moyo (Marco territorial)',
          japanese: '模様',
          definition: 'Gran área de potencial territorial proyectada por piedras coordinadas que aún no está completamente cerrada.',
        },
      ],
    },
    transferQuestion: {
      id: 'l8-tq-1',
      prompt: 'Pregunta de transferencia: ¿Por qué suele ser mala idea jugar muchas piedras en la 1ª o 2ª línea al comienzo de la partida?',
      boardSize: 9,
      initialStones: [{ x: 2, y: 2, color: 'BLACK' }],
      turn: 'BLACK',
      exerciseType: 'MULTIPLE_CHOICE',
      options: [
        {
          id: 'tq-low',
          text: 'Porque encierran muy pocos puntos pegados al borde ("línea de la derrota") mientras el rival domina la 3ª y 4ª línea por encima',
          isCorrect: true,
          feedback:
            '¡Exacto! La primera y segunda línea son valiosas al final de la partida (Yose) o para vivir en espacios pequeños, pero en la apertura son demasiado bajas.',
        },
        {
          id: 'tq-illegal-edge',
          text: 'Porque las primeras jugadas están prohibidas en la fila 1 y 2',
          isCorrect: false,
          feedback: 'Son jugadas perfectamente legales, pero estratégicamente muy lentas en la apertura.',
        },
      ],
      correctFeedback: '¡Visión global de apertura demostrada!',
      wrongFeedback: {},
      defaultWrongFeedback: 'Compara el espacio que encierra la 2ª línea frente a la 3ª y 4ª línea.',
      hints: [
        'En la apertura buscamos eficiencia global.',
        'La 3ª y 4ª línea dan mucho más espacio e influencia que la 1ª y 2ª.',
      ],
    },
  },

  // ============================================================================
  // LESSON 9 (STAGE 5 · UNITS 1, 2 & 3): ESCALERAS (SHICHO), REDES (GETA) Y SNAPBACK
  // ============================================================================
  {
    id: 'lesson-9-escaleras-redes-snapback',
    stageNumber: 5,
    stageTitle: '5. Táctica',
    unitNumber: 1,
    unitTitle: 'Escaleras, Redes y Snapback',
    title: 'Tácticas de Caza: Escalera (Shicho), Red (Geta) y Snapback',
    subtitle:
      'Domina las tres técnicas clásicas para atrapar piedras enemigas: persecución en zigzag, encierro a distancia y sacrificio con recaptura inmediata.',
    estimatedMinutes: 8,
    xpReward: 30,
    prerequisites: ['lesson-8-territorio-influencia-moyo'],
    relatedPuzzleIds: [
      'puzzle-12-escalera-shicho',
      'puzzle-13-red-geta',
      'puzzle-14-snapback',
      'puzzle-16-rompedor-escalera',
    ],
    observableObjective:
      'Al terminar, podrás iniciar una Escalera verificando que no haya un rompedor en el camino, encerrar una piedra en Red (Geta) y ejecutar un Snapback.',
    activationQuestion: {
      question:
        '¿Qué requisito debe cumplirse para perseguir una piedra enemiga en Escalera (Shicho)?',
      options: [
        {
          id: 'opt-2-lib',
          text: 'La piedra enemiga debe tener solo 2 libertades, de modo que cada jugada tuya la deje en atari (1 libertad) hasta chocar con el borde',
          isCorrect: true,
          explanation:
            '¡Exacto! Si el grupo enemigo tiene 3 libertades, al jugar tú todavía le quedarán 2 libertades y no estará obligado a huir en zigzag.',
        },
        {
          id: 'opt-4-lib',
          text: 'La piedra enemiga debe tener sus 4 libertades vacías',
          isCorrect: false,
          explanation:
            'Con 4 libertades no puedes darle atari; necesitas que ya tenga 2 lados bloqueados.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. La Escalera (Shicho) y el Rompedor de Escalera',
        body: 'En una Escalera das atari alternando izquierda y derecha en diagonal hacia el borde. La piedra enemiga nunca supera las 2 libertades y muere al llegar al borde.',
        deepDive:
          '¡Cuidado! Si en la diagonal por donde avanza la escalera hay una piedra del color enemigo ("Rompedor de escalera"), la presa se conectará a ella, ganará libertades y tus piedras perseguidoras quedarán llenas de cortes.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 5, color: 'WHITE' },
            { x: 3, y: 6, color: 'BLACK' },
            { x: 2, y: 5, color: 'BLACK' },
            { x: 4, y: 4, color: 'BLACK' },
          ],
          markers: [{ x: 3, y: 4, type: 'SUCCESS', label: '1' }],
          caption:
            'D4 (Blanco) tiene solo 2 libertades (D5 y E4). Cuando Negro juega D5, Blanco queda en atari y no puede escapar hacia el borde derecho.',
        },
      },
      {
        title: '2. La Red (Geta): Capturar sin dar atari directo',
        body: 'Cuando la escalera no funciona o quieres evitar dejar debilidades, puedes lanzar una Red (Geta): colocas una piedra a un salto de distancia que bloquea ambas salidas a la vez.',
        deepDive:
          'Aunque la piedra atrapada en la Red tiene 2 libertades momentáneas, si intenta correr hacia cualquiera de las dos queda inmediatamente bloqueada y sin salida.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 4, y: 4, color: 'WHITE' },
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 3, y: 6, color: 'BLACK' },
            { x: 6, y: 3, color: 'BLACK' },
          ],
          markers: [{ x: 5, y: 5, type: 'SUCCESS', label: 'Red' }],
          caption:
            'Al jugar Negro en F4 (Red / Geta), la piedra blanca en E5 no puede escapar ni por F5 ni por E4.',
        },
      },
      {
        title: '3. El Snapback (Uttegaeshi): Dar una piedra para capturar tres',
        body: 'En el Snapback entregas deliberadamente una piedra tuya en atari dentro de la boca del rival. Cuando el rival la captura, su propio grupo completo queda con una sola libertad y lo capturas de inmediato.',
        deepDive:
          'A diferencia del Ko (donde se captura 1 piedra contra 1 piedra y se repite el tablero), en el Snapback recapturas un grupo de 2 o más piedras, por lo que es 100% legal recapturar al instante.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 3, color: 'WHITE' },
            { x: 5, y: 3, color: 'WHITE' },
            { x: 3, y: 4, color: 'WHITE' },
            { x: 5, y: 4, color: 'WHITE' },
            { x: 4, y: 5, color: 'WHITE' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 5, y: 2, color: 'BLACK' },
            { x: 2, y: 3, color: 'BLACK' },
            { x: 2, y: 4, color: 'BLACK' },
            { x: 3, y: 5, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
          ],
          markers: [{ x: 4, y: 4, type: 'HIGHLIGHT' }],
          caption:
            'En el Snapback, sacrificar una piedra reduce las libertades internas del rival a 1 tras su captura.',
        },
      },
    ],
    demonstration: {
      title: 'Escalera paso a paso y Red (Geta)',
      size: 9,
      steps: [
        {
          title: 'Inicio de la Escalera en D5',
          narration:
            'La piedra blanca en D4 tiene solo 2 libertades (D5 y E4). Negro juega D5 dando atari desde arriba y empujando a Blanco hacia la derecha.',
          stones: [
            { x: 3, y: 5, color: 'WHITE' },
            { x: 3, y: 6, color: 'BLACK' },
            { x: 2, y: 5, color: 'BLACK' },
            { x: 4, y: 4, color: 'BLACK' },
            { x: 3, y: 4, color: 'BLACK' },
          ],
          lastMove: { x: 3, y: 4 },
        },
        {
          title: 'Blanco intenta huir en E4 y Negro cierra en E3',
          narration:
            'Si Blanco extiende a E4 (2 libertades), Negro da atari en E3 o F4 y las dos piedras blancas quedan atrapadas sin escapatoria.',
          stones: [
            { x: 3, y: 5, color: 'WHITE' },
            { x: 3, y: 6, color: 'BLACK' },
            { x: 2, y: 5, color: 'BLACK' },
            { x: 4, y: 4, color: 'BLACK' },
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 5, color: 'WHITE' },
            { x: 4, y: 6, color: 'BLACK' },
          ],
          lastMove: { x: 4, y: 6 },
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l9-gd-1',
        prompt:
          'Juega Negro: Inicia la Escalera (Shicho) dando atari a la piedra blanca de D4 por el lado que la empuja hacia tu piedra de apoyo en E5.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 5, color: 'WHITE' },
          { x: 3, y: 6, color: 'BLACK' },
          { x: 2, y: 5, color: 'BLACK' },
          { x: 4, y: 4, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 3, y: 4 }],
        correctFeedback:
          '¡Atari en D5! La piedra blanca de D4 queda con una sola libertad en E4, donde chocará directamente contra tu piedra negra de E5.',
        wrongFeedback: {
          '4,5': 'Si juegas en E4, Blanco escapa hacia arriba por D5 con espacio abierto.',
        },
        defaultWrongFeedback:
          'Observa las dos libertades de D4 (D5 y E4). Juega en D5 para empujar a Blanco hacia tu muro de E5.',
        hints: [
          'La piedra blanca en D4 respira por D5 y E4.',
          'Juega en D5.',
        ],
        markers: [{ x: 3, y: 5, type: 'TRIANGLE' }],
      },
    ],
    independentPractice: [
      {
        id: 'l9-ip-1',
        prompt:
          'Práctica: Juega Negro y atrapa la piedra blanca de E5 mediante una Red (Geta) en F4.',
        boardSize: 9,
        initialStones: [
          { x: 4, y: 4, color: 'WHITE' },
          { x: 3, y: 4, color: 'BLACK' },
          { x: 4, y: 3, color: 'BLACK' },
          { x: 3, y: 6, color: 'BLACK' },
          { x: 6, y: 3, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 5, y: 5 }],
        correctFeedback:
          '¡Red (Geta) tejida en F4! Aunque E5 tiene dos libertades (F5 y E4), cualquier intento de salida choca contra la red negra.',
        wrongFeedback: {
          '5,4': 'Si das atari directo en F5, Blanco escapa hacia abajo por E4.',
          '4,5': 'Si das atari directo en E4, Blanco escapa hacia la derecha por F5.',
        },
        defaultWrongFeedback:
          'En lugar de empujar desde atrás, coloca la piedra diagonal en F4 que vigila tanto F5 como E4.',
        hints: [
          'Busca la intersección que toca tanto F5 como E4.',
          'Haz clic en F4.',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'La Escalera (Shicho) funciona dando ataris sucesivos a un grupo de 2 libertades; lee siempre toda la diagonal antes de empezarla.',
        'La Red (Geta) encierra sin tocar directamente cuando el atari directo permitiría al rival escapar.',
        'El Snapback sacrifica 1 piedra para quitar la penúltima libertad de un grupo rival y recapturarlo completo.',
      ],
      vocabulary: [
        {
          term: 'Shicho (Escalera)',
          japanese: 'シチョウ',
          definition: 'Persecución en zigzag donde el atacante da atari en cada turno hasta el borde.',
        },
        {
          term: 'Geta (Red)',
          japanese: 'ゲタ',
          definition: 'Captura indirecta a un paso de distancia que bloquea todas las rutas de escape.',
        },
        {
          term: 'Uttegaeshi (Snapback)',
          japanese: 'ウッテガエシ',
          definition: 'Sacrificio táctico de una piedra que es recapturado inmediatamente junto con el grupo enemigo.',
        },
      ],
    },
    transferQuestion: {
      id: 'l9-tq-1',
      prompt: 'Pregunta de transferencia: ¿Por qué el Snapback NO está prohibido por la regla de Ko?',
      boardSize: 9,
      initialStones: [{ x: 4, y: 4, color: 'BLACK' }],
      turn: 'BLACK',
      exerciseType: 'MULTIPLE_CHOICE',
      options: [
        {
          id: 'tq-no-repeat',
          text: 'Porque al recapturar te llevas 2 o más piedras rivales, por lo que la posición resultante del tablero NO repite la posición anterior',
          isCorrect: true,
          feedback:
            '¡Exacto! La regla de Ko solo impide repetir exactamente la misma posición del tablero (lo que ocurre en 1 contra 1, nunca cuando capturas un grupo mayor).',
        },
        {
          id: 'tq-special',
          text: 'Porque el Snapback solo vale en el centro del tablero',
          isCorrect: false,
          feedback: 'El Snapback es legal en cualquier parte del tablero porque cambia el número de piedras.',
        },
      ],
      correctFeedback: '¡Dominio total de las reglas y la táctica!',
      wrongFeedback: {},
      defaultWrongFeedback: 'Piensa cuántas piedras se retiran en la recaptura del Snapback frente al Ko.',
      hints: [
        'En el Ko se captura 1 piedra y luego 1 piedra.',
        'En el Snapback la segunda captura retira un grupo entero de varias piedras.',
      ],
    },
  },

  // ============================================================================
  // LESSON 10 (STAGE 6 · UNITS 1, 2 & 3): DOS OJOS, VIDA Y MUERTE Y SEKI
  // ============================================================================
  {
    id: 'lesson-10-dos-ojos-vida-muerte',
    stageNumber: 6,
    stageTitle: '6. Vida y muerte',
    unitNumber: 1,
    unitTitle: 'Ojos reales, ojos falsos, puntos vitales y Seki',
    title: 'Inmortalidad en el Tablero: Dos Ojos Reales, Ojo Falso y Seki',
    subtitle:
      'El corazón profundo del Go: por qué un grupo con dos ojos independientes jamás puede ser capturado, cómo detectar un ojo falso y qué es la vida mutua (Seki).',
    estimatedMinutes: 8,
    xpReward: 30,
    prerequisites: ['lesson-9-escaleras-redes-snapback'],
    relatedPuzzleIds: [
      'puzzle-17-hacer-dos-ojos',
      'puzzle-18-matar-punto-vital',
      'puzzle-19-ojo-falso',
      'puzzle-21-seki-vida-mutua',
    ],
    observableObjective:
      'Al terminar, podrás dividir un espacio interno para formar dos ojos vivos, destruir el espacio rival jugando en el punto vital (Nakade) y reconocer un ojo falso.',
    activationQuestion: {
      question:
        '¿Por qué un grupo que tiene DOS ojos internos separados e independientes es inmortal aunque el rival lo rodee por completo por fuera?',
      options: [
        {
          id: 'opt-two-eyes',
          text: 'Porque el rival solo puede poner una piedra por turno: jugar en cualquiera de los dos ojos es suicidio ilegal al quedarle aún el otro ojo como libertad',
          isCorrect: true,
          explanation:
            '¡Esa es la ley fundamental de Vida y Muerte en Go! Con dos libertades internas separadas, el rival necesitaría jugar dos piedras simultáneas para dejarte con 0 libertades.',
        },
        {
          id: 'opt-one-eye',
          text: 'Un solo ojo grande o pequeño ya basta siempre para ser inmortal',
          isCorrect: false,
          explanation:
            'Si un grupo solo tiene UN ojo y el rival bloquea todas sus libertades exteriores, el rival sí puede jugar dentro de ese único ojo porque es la última libertad y captura todo el grupo.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. Un ojo muere, dos ojos viven',
        body: 'Un grupo con un solo ojo acabará en atari cuando el rival ocupe todas sus libertades exteriores. En cambio, si divides tu espacio interior en dos compartimentos separados (dos ojos), el rival jamás podrá ponerte en atari.',
        deepDive:
          'El punto que divide un espacio de 3 intersecciones en dos ojos separados es el punto central (el Punto Vital). Quien juegue primero en ese punto vital decide la vida o la muerte del grupo.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 0, y: 1, color: 'BLACK' },
            { x: 1, y: 1, color: 'BLACK' },
            { x: 2, y: 1, color: 'BLACK' },
            { x: 3, y: 1, color: 'BLACK' },
            { x: 3, y: 0, color: 'BLACK' },
            { x: 1, y: 0, color: 'BLACK' },
          ],
          markers: [
            { x: 0, y: 0, type: 'SUCCESS', label: 'Ojo 1' },
            { x: 2, y: 0, type: 'SUCCESS', label: 'Ojo 2' },
          ],
          caption:
            'Al colocar la piedra divisoria en B9, Negro crea dos ojos independientes en A9 y C9: el grupo es 100% inmortal.',
        },
      },
      {
        title: '2. Ojo Real vs. Ojo Falso (Kake-me)',
        body: 'Si las piedras que rodean una intersección vacía están desconectadas en diagonal y el rival controla las esquinas diagonales, ese espacio es un Ojo Falso.',
        deepDive:
          'En un Ojo Falso, el rival puede dar atari a una de las piedras del borde del ojo, obligándote a rellenar tu propio ojo para evitar que capturen tu piedra.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 4, y: 3, color: 'BLACK' },
            { x: 3, y: 4, color: 'BLACK' },
            { x: 5, y: 4, color: 'BLACK' },
            { x: 4, y: 5, color: 'BLACK' },
            { x: 3, y: 3, color: 'WHITE' },
            { x: 5, y: 3, color: 'WHITE' },
          ],
          markers: [{ x: 4, y: 4, type: 'DANGER', label: 'Falso' }],
          caption:
            'Como Blanco controla D6 y F6, la piedra negra de E6 está separada del resto: E5 es un Ojo Falso.',
        },
      },
      {
        title: '3. Seki: La vida mutua pacífica',
        body: 'A veces dos grupos rivales sin dos ojos comparten las mismas libertades neutrales entre ellos, de forma que cualquiera que intente dar atari se pone primero en auto-atari.',
        deepDive:
          'Esa situación de equilibrio se llama Seki ("vida mutua"): ninguno de los dos bandos juega allí y ambos grupos se consideran vivos al final de la partida.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 0, y: 1, color: 'BLACK' },
            { x: 1, y: 1, color: 'BLACK' },
            { x: 1, y: 2, color: 'WHITE' },
            { x: 0, y: 2, color: 'WHITE' },
          ],
          markers: [
            { x: 0, y: 0, type: 'HIGHLIGHT' },
            { x: 1, y: 0, type: 'HIGHLIGHT' },
          ],
          caption:
            'En Seki, las libertades compartidas impiden que ninguno de los dos grupos dé el primer paso sin ser capturado.',
        },
      },
    ],
    demonstration: {
      title: 'El proverbio maestro: "El punto vital de mi enemigo es mi propio punto vital"',
      size: 9,
      steps: [
        {
          title: 'Un espacio recto de 3 puntos en el borde superior (A9, B9, C9)',
          narration:
            'El grupo negro en el borde superior está rodeado por Blanco y dispone de 3 intersecciones vacías en línea: A9, B9 y C9.',
          stones: [
            { x: 0, y: 1, color: 'BLACK' },
            { x: 1, y: 1, color: 'BLACK' },
            { x: 2, y: 1, color: 'BLACK' },
            { x: 3, y: 1, color: 'BLACK' },
            { x: 3, y: 0, color: 'BLACK' },
            { x: 0, y: 2, color: 'WHITE' },
            { x: 1, y: 2, color: 'WHITE' },
            { x: 2, y: 2, color: 'WHITE' },
            { x: 4, y: 1, color: 'WHITE' },
            { x: 4, y: 0, color: 'WHITE' },
          ],
          markers: [{ x: 1, y: 0, type: 'HIGHLIGHT' }],
        },
        {
          title: 'Si juega Negro: B9 divide el espacio en 2 ojos y vive',
          narration:
            'Negro juega en el centro B9. Ahora A9 y C9 están separados: Blanco nunca podrá jugar en A9 ni en C9 porque sería suicidio.',
          stones: [
            { x: 0, y: 1, color: 'BLACK' },
            { x: 1, y: 1, color: 'BLACK' },
            { x: 2, y: 1, color: 'BLACK' },
            { x: 3, y: 1, color: 'BLACK' },
            { x: 3, y: 0, color: 'BLACK' },
            { x: 0, y: 2, color: 'WHITE' },
            { x: 1, y: 2, color: 'WHITE' },
            { x: 2, y: 2, color: 'WHITE' },
            { x: 4, y: 1, color: 'WHITE' },
            { x: 4, y: 0, color: 'WHITE' },
            { x: 1, y: 0, color: 'BLACK' },
          ],
          lastMove: { x: 1, y: 0 },
          markers: [
            { x: 0, y: 0, type: 'SUCCESS', label: '1' },
            { x: 2, y: 0, type: 'SUCCESS', label: '2' },
          ],
        },
        {
          title: 'Si juega Blanco: B9 (Nakade) impide que Negro divida y el grupo muere',
          narration:
            'Si le toca a Blanco y juega primero en el punto vital B9, incluso si Negro captura esa piedra más tarde solo le quedará un único ojo en B9 y todo el grupo negro morirá.',
          stones: [
            { x: 0, y: 1, color: 'BLACK' },
            { x: 1, y: 1, color: 'BLACK' },
            { x: 2, y: 1, color: 'BLACK' },
            { x: 3, y: 1, color: 'BLACK' },
            { x: 3, y: 0, color: 'BLACK' },
            { x: 0, y: 2, color: 'WHITE' },
            { x: 1, y: 2, color: 'WHITE' },
            { x: 2, y: 2, color: 'WHITE' },
            { x: 4, y: 1, color: 'WHITE' },
            { x: 4, y: 0, color: 'WHITE' },
            { x: 1, y: 0, color: 'WHITE' },
          ],
          lastMove: { x: 1, y: 0 },
          markers: [{ x: 1, y: 0, type: 'DANGER', label: '!' }],
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l10-gd-1',
        prompt:
          'Juega Negro: Tu grupo en el borde superior está rodeado y tiene el espacio de 3 puntos A9–B9–C9. Juega en el punto vital para dividirlo en dos ojos reales y vivir.',
        boardSize: 9,
        initialStones: [
          { x: 0, y: 1, color: 'BLACK' },
          { x: 1, y: 1, color: 'BLACK' },
          { x: 2, y: 1, color: 'BLACK' },
          { x: 3, y: 1, color: 'BLACK' },
          { x: 3, y: 0, color: 'BLACK' },
          { x: 0, y: 2, color: 'WHITE' },
          { x: 1, y: 2, color: 'WHITE' },
          { x: 2, y: 2, color: 'WHITE' },
          { x: 4, y: 1, color: 'WHITE' },
          { x: 4, y: 0, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 1, y: 0 }],
        correctFeedback:
          '¡Dos ojos creados en A9 y C9! Al jugar en el punto vital B9 tu grupo negro es inmortal.',
        wrongFeedback: {
          '0,0': 'Si juegas en A9, Blanco responderá en B9 y te quedarás con un solo ojo.',
          '2,0': 'Si juegas en C9, Blanco ocupará B9 y destruirá tu segundo ojo.',
        },
        defaultWrongFeedback: 'El punto vital que divide 3 intersecciones en 2 ojos es el punto del medio: B9.',
        hints: [
          'Las 3 intersecciones vacías son A9, B9 y C9.',
          'Coloca tu piedra en el centro B9.',
        ],
        markers: [{ x: 1, y: 0, type: 'CIRCLE' }],
      },
    ],
    independentPractice: [
      {
        id: 'l10-ip-1',
        prompt:
          'Práctica (Ataque Tsumego): Ahora el grupo en el borde superior es de Blanco y tiene el espacio A9–B9–C9 abierto. ¡Juega Negro en el punto vital para impedir que Blanco forme dos ojos!',
        boardSize: 9,
        initialStones: [
          { x: 0, y: 1, color: 'WHITE' },
          { x: 1, y: 1, color: 'WHITE' },
          { x: 2, y: 1, color: 'WHITE' },
          { x: 3, y: 1, color: 'WHITE' },
          { x: 3, y: 0, color: 'WHITE' },
          { x: 0, y: 2, color: 'BLACK' },
          { x: 1, y: 2, color: 'BLACK' },
          { x: 2, y: 2, color: 'BLACK' },
          { x: 4, y: 1, color: 'BLACK' },
          { x: 4, y: 0, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 1, y: 0 }],
        correctFeedback:
          '¡Golpe en el punto vital (Kyusho) en B9! Ahora Blanco jamás podrá dividir A9 y C9 en dos ojos independientes.',
        wrongFeedback: {},
        defaultWrongFeedback:
          'Recuerda el proverbio: el punto donde Blanco querría jugar para hacer dos ojos (B9) es exactamente donde Negro debe jugar para impedirlo.',
        hints: [
          '¿Dónde jugaste en el ejercicio anterior para hacer dos ojos?',
          'Juega en B9.',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'Un grupo con dos ojos reales separados es inmortal porque el rival nunca puede ponerlo en atari.',
        'En un espacio de 3 puntos, el centro es el punto vital tanto para vivir como para matar (Nakade).',
        'Un ojo cuyas esquinas diagonales están cortadas por el rival es un Ojo Falso y puede ser obligado a rellenarse.',
      ],
      vocabulary: [
        {
          term: 'Tsumego (Problema de Vida y Muerte)',
          japanese: '詰碁',
          definition: 'Problema táctico centrado en hacer dos ojos para vivir o destruir los ojos del rival.',
        },
        {
          term: 'Kake-me (Ojo falso)',
          japanese: '欠け目',
          definition: 'Intersección rodeada por piedras desconectadas que el rival puede forzar a rellenar.',
        },
        {
          term: 'Seki (Vida mutua)',
          japanese: 'セキ',
          definition: 'Equilibrio donde dos grupos sin dos ojos comparten libertades y ninguno puede dar atari sin morir.',
        },
      ],
    },
    transferQuestion: {
      id: 'l10-tq-1',
      prompt: 'Pregunta de transferencia: ¿Qué significa el proverbio "El punto vital de mi enemigo es mi propio punto vital"?',
      boardSize: 9,
      initialStones: [{ x: 1, y: 0, color: 'BLACK' }],
      turn: 'BLACK',
      exerciseType: 'MULTIPLE_CHOICE',
      options: [
        {
          id: 'tq-vital',
          text: 'Que la intersección clave que tu rival necesita para dividir su espacio en dos ojos suele ser exactamente la misma intersección donde debes jugar tú para destruirlos',
          isCorrect: true,
          feedback:
            '¡Exacto! Por eso al leer problemas de Vida y Muerte siempre debes preguntarte primero dónde jugaría el defensor para vivir.',
        },
        {
          id: 'tq-mirror',
          text: 'Que debes imitar simétricamente todas las jugadas del rival',
          isCorrect: false,
          feedback: 'Se refiere específicamente al punto geométrico clave (Kyusho) de la forma local.',
        },
      ],
      correctFeedback: '¡Sabiduría de Tsumego consolidada!',
      wrongFeedback: {},
      defaultWrongFeedback: 'Piensa en el punto central B9 que servía tanto para que el grupo viviera como para matarlo.',
      hints: [
        'Recuerda cómo B9 daba dos ojos al defensor y un solo ojo si jugaba el atacante.',
        'Ambos jugadores buscan esa misma intersección crítica.',
      ],
    },
  },

  // ============================================================================
  // LESSON 11 (STAGES 7 & 8): SENTE, GOTE, FUSEKI Y JOSEKI CON CRITERIO
  // ============================================================================
  {
    id: 'lesson-11-sente-gote-fuseki-joseki',
    stageNumber: 7,
    stageTitle: '7. Estrategia global y Joseki',
    unitNumber: 2,
    unitTitle: 'Sente, Gote, dirección de juego y Joseki',
    title: 'La Iniciativa (Sente vs. Gote), Urgencia y Equilibrio en Joseki',
    subtitle:
      'Aprende el concepto estratégico más valioso del Go: conservar el Sente (la iniciativa), distinguir jugadas urgentes de jugadas grandes y entender el propósito de un Joseki.',
    estimatedMinutes: 7,
    xpReward: 30,
    prerequisites: ['lesson-10-dos-ojos-vida-muerte'],
    relatedPuzzleIds: ['puzzle-24-amenaza-sente', 'puzzle-23-invasion-san-san'],
    observableObjective:
      'Al terminar, podrás distinguir una jugada en Sente (que obliga a responder) de una en Gote, y priorizar la seguridad de grupos débiles antes que puntos grandes de borde.',
    activationQuestion: {
      question:
        '¿Qué es una jugada en "Sente" (Iniciativa)?',
      options: [
        {
          id: 'opt-sente',
          text: 'Una jugada que logra un beneficio local y además crea una amenaza tan seria que obliga al rival a responder, devolviéndote el turno para jugar en otro sector del tablero',
          isCorrect: true,
          explanation:
            '¡Exacto! Quien juega en Sente dirige el rumbo de la partida porque termina la secuencia local con las manos libres (Tenuki).',
        },
        {
          id: 'opt-gote',
          text: 'Una jugada pasiva que no amenaza nada y permite al rival tomar la iniciativa en otro lado',
          isCorrect: false,
          explanation: 'Eso se llama Gote (perder la iniciativa).',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. Sente (Iniciativa) vs. Gote (Responder al final)',
        body: 'Si haces una jugada a la que tu rival está obligado a responder (por ejemplo, amenazando con matar su grupo o invadir su territorio) y después puedes cambiar de sector (Tenuki), tu jugada fue Sente.',
        deepDive:
          'Si en cambio haces una jugada que cierra puntos pero no amenaza nada más, el rival no necesita responder y aprovecha su turno para jugar el punto más grande del tablero: tu jugada fue Gote.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 1, y: 1, color: 'WHITE' },
            { x: 2, y: 1, color: 'WHITE' },
            { x: 2, y: 2, color: 'BLACK' },
            { x: 3, y: 2, color: 'BLACK' },
          ],
          markers: [{ x: 3, y: 1, type: 'SUCCESS', label: 'Sente' }],
          caption:
            'Jugar D8 bloquea el borde en Sente porque amenaza con cortar y encerrar las piedras blancas de B8–C8.',
        },
      },
      {
        title: '2. "Jugadas urgentes antes que jugadas grandes" y el sentido del Joseki',
        body: 'Una jugada que decide la vida, muerte o conexión de un grupo es URGENTE. Una jugada que solo suma puntos en un borde tranquilo es GRANDE. Siempre van primero las urgentes.',
        deepDive:
          'Un Joseki es una secuencia estudiada de esquina donde ambos jugadores obtienen un resultado equitativo (por ejemplo, uno toma territorio en la esquina y el otro obtiene influencia en Sente hacia el lado donde quiere construir).',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 6, y: 2, color: 'BLACK' },
            { x: 5, y: 2, color: 'WHITE' },
            { x: 6, y: 3, color: 'BLACK' },
            { x: 5, y: 3, color: 'WHITE' },
          ],
          markers: [{ x: 6, y: 1, type: 'HIGHLIGHT' }],
          caption:
            'Intercambio equitativo: Negro asegura el territorio de la esquina derecha mientras Blanco construye un muro exterior hacia el centro.',
        },
      },
    ],
    demonstration: {
      title: 'Ganar puntos en Sente y hacer Tenuki al punto más grande',
      size: 9,
      steps: [
        {
          title: 'Una amenaza en Sente antes de cambiar de lado',
          narration:
            'Negro juega en D8 amenazando con dar atari a las piedras blancas de B8–C8. Como la amenaza es enorme, Blanco está obligado a defender en C9.',
          stones: [
            { x: 1, y: 1, color: 'WHITE' },
            { x: 2, y: 1, color: 'WHITE' },
            { x: 2, y: 2, color: 'BLACK' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 3, y: 1, color: 'BLACK' },
            { x: 2, y: 0, color: 'WHITE' },
          ],
          lastMove: { x: 2, y: 0 },
        },
        {
          title: 'Tenuki: Negro conserva la iniciativa y ocupa la esquina libre G3',
          narration:
            'Habiendo ganado el intercambio superior en Sente, Negro tiene las manos libres para hacer Tenuki y ocupar la gran esquina abierta inferior derecha en G3.',
          stones: [
            { x: 1, y: 1, color: 'WHITE' },
            { x: 2, y: 1, color: 'WHITE' },
            { x: 2, y: 2, color: 'BLACK' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 3, y: 1, color: 'BLACK' },
            { x: 2, y: 0, color: 'WHITE' },
            { x: 6, y: 6, color: 'BLACK' },
          ],
          lastMove: { x: 6, y: 6 },
          markers: [{ x: 6, y: 6, type: 'SUCCESS', label: 'Tenuki' }],
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l11-gd-1',
        prompt:
          'Juega Negro: Tus dos piedras en C4 y D4 tienen solo 2 libertades y están a punto de ser capturadas, mientras la esquina G7 está vacía. ¡Juega la jugada URGENTE antes que la jugada grande!',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 5, color: 'BLACK' },
          { x: 3, y: 5, color: 'BLACK' },
          { x: 2, y: 4, color: 'WHITE' },
          { x: 3, y: 4, color: 'WHITE' },
          { x: 1, y: 5, color: 'WHITE' },
          { x: 2, y: 6, color: 'WHITE' },
          { x: 3, y: 6, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 5 }],
        correctFeedback:
          '¡Prioridad correcta en E4! Salvar y extender tu grupo amenazado de muerte es urgente y vale mucho más que irse a una esquina vacía.',
        wrongFeedback: {
          '6,2': 'G7 es un punto grande de esquina, pero si juegas allí Blanco jugará en E4 y capturará tu grupo entero.',
        },
        defaultWrongFeedback:
          'Tus piedras en C4 y D4 solo respiran por E4. Extiende en E4 para salvar tu grupo.',
        hints: [
          'Mira tus piedras negras en C4 y D4: están casi rodeadas.',
          'Juega en E4 para escapar hacia el centro.',
        ],
        markers: [{ x: 4, y: 5, type: 'CIRCLE' }],
      },
    ],
    independentPractice: [
      {
        id: 'l11-ip-1',
        prompt:
          'Práctica: Juega Negro en E8 (Sente) dando atari a la piedra blanca de D8 que corta tus grupos.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 1, color: 'WHITE' },
          { x: 2, y: 1, color: 'BLACK' },
          { x: 3, y: 2, color: 'BLACK' },
          { x: 5, y: 2, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 1 }],
        correctFeedback:
          '¡Jugada en Sente en E8! Pones en atari la piedra blanca de D8 y conectas simultáneamente tus piedras del borde superior.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Mira la piedra blanca en D8: tiene ocupados C8 y D7. Da atari por el lado E8.',
        hints: [
          'La piedra blanca en D8 separa tus piedras.',
          'Juega en E8.',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'Sente es mantener la iniciativa obligando al rival a responder; Gote es terminar una secuencia local cediendo el turno.',
        'Las jugadas urgentes (vida, muerte y cortes de grupos) siempre tienen prioridad sobre las jugadas grandes de territorio.',
        'Un Joseki no es una receta mecánica: debe elegirse según el resto del tablero (Fuseki).',
      ],
      vocabulary: [
        {
          term: 'Sente (Iniciativa)',
          japanese: '先手',
          definition: 'Jugada o secuencia que obliga al rival a responder y te permite jugar primero en otro lugar.',
        },
        {
          term: 'Gote',
          japanese: '後手',
          definition: 'Jugada que responde o cierra localmente sin amenazar nada, cediendo la iniciativa al rival.',
        },
        {
          term: 'Tenuki',
          japanese: '手抜き',
          definition: 'Decidir no responder en la zona local para jugar en otro sector más valioso del tablero.',
        },
      ],
    },
    transferQuestion: {
      id: 'l11-tq-1',
      prompt: 'Pregunta de transferencia: Tienes dos jugadas que valen 6 puntos cada una, pero la Opción A es Sente y la Opción B es Gote. ¿Cuál debes jugar primero?',
      boardSize: 9,
      initialStones: [{ x: 4, y: 4, color: 'BLACK' }],
      turn: 'BLACK',
      exerciseType: 'MULTIPLE_CHOICE',
      options: [
        {
          id: 'tq-sente-first',
          text: 'La Opción A (Sente) primero: el rival tendrá que responder, y como conservas el turno podrás jugar inmediatamente la Opción B también',
          isCorrect: true,
          feedback:
            '¡Exacto! Si juegas primero la de Sente te llevas AMBAS jugadas (A + B = 12 puntos). Si juegas primero la de Gote, el rival te quitará la otra.',
        },
        {
          id: 'tq-gote-first',
          text: 'La Opción B (Gote) primero para guardarte el Sente para el próximo partido',
          isCorrect: false,
          feedback: 'Si juegas Gote primero, cedes el turno y el rival aprovechará para jugar la Opción A.',
        },
      ],
      correctFeedback: '¡Principio de oro del orden de jugadas!',
      wrongFeedback: {},
      defaultWrongFeedback: 'Piensa qué pasa con el turno después de jugar una jugada Sente.',
      hints: [
        'Después de una jugada Sente, vuelve a ser tu turno.',
        'Así puedes jugar A y luego también B.',
      ],
    },
  },

  // ============================================================================
  // LESSON 12 (STAGES 9–12): YOSE (FINAL DE PARTIDA), LECTURA Y REVISIÓN
  // ============================================================================
  {
    id: 'lesson-12-yose-lectura-revision',
    stageNumber: 9,
    stageTitle: '9. Final de partida, Lectura y Maestría',
    unitNumber: 1,
    unitTitle: 'Yose, árboles de variantes y ciclo de estudio',
    title: 'Maestría en el Final (Yose), Lectura de Variantes y Revisión',
    subtitle:
      'Aprende a cerrar partidas con precisión matemática en el Yose (Hane en primera línea, Doble Sente), podar variantes de lectura y analizar tus propias partidas.',
    estimatedMinutes: 8,
    xpReward: 35,
    prerequisites: ['lesson-11-sente-gote-fuseki-joseki'],
    relatedPuzzleIds: [
      'puzzle-25-tesuji-yose-hane',
      'puzzle-24-amenaza-sente',
      'puzzle-20-tesuji-throw-in',
    ],
    observableObjective:
      'Al terminar, sabrás ejecutar el Hane y conexión en primera línea durante el Yose, ordenar jugadas de final de partida (Doble Sente → Sente → Gote) y aplicar el método de revisión en 3 preguntas.',
    activationQuestion: {
      question:
        'En el final de partida (Yose), ¿cuál es el orden correcto de prioridad para cerrar las fronteras?',
      options: [
        {
          id: 'opt-yose-order',
          text: '1º Doble Sente (sente para ambos), 2º Tu propio Sente, 3º El Sente del rival (para quitárselo), y 4º Las jugadas Gote de mayor a menor valor',
          isCorrect: true,
          explanation:
            '¡Exacto! Seguir este orden técnico garantiza ganar todos los puntos gratuitos antes de gastar un turno en jugadas Gote.',
        },
        {
          id: 'opt-dame-first',
          text: 'Rellenar primero todos los puntos neutrales (Dame) que valen 0 puntos',
          isCorrect: false,
          explanation:
            'Los puntos neutrales (Dame) que no dan territorio ni ponen grupos en peligro se rellenan siempre al final de todo.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. El Tesuji clásico de Yose: Hane en primera línea (Borde)',
        body: 'Cuando los muros de Negro y Blanco llegan juntos en paralelo hasta la segunda línea, avanzar en la primera línea delante de la piedra rival (Hane en el borde) reduce el territorio enemigo y amplía el tuyo.',
        deepDive:
          'Una sola jugada de Hane y conexión en la primera línea suele cambiar el marcador entre 2 y 4 puntos (sumando lo que ganas tú y lo que deja de ganar tu rival).',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 1, color: 'BLACK' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 4, y: 1, color: 'WHITE' },
            { x: 4, y: 2, color: 'WHITE' },
          ],
          markers: [{ x: 4, y: 0, type: 'SUCCESS', label: 'Hane' }],
          caption:
            'Negro juega Hane en E9 (primera línea superior) metiéndose bajo la piedra blanca de E8.',
        },
      },
      {
        title: '2. Lectura de variantes y el método de revisión post-partida',
        body: 'Para leer con precisión sin abrumarte, selecciona solo 2 o 3 jugadas candidatas y pregúntate siempre: "¿Cuál es la respuesta más fuerte de mi rival a esta jugada?".',
        deepDive:
          'Al terminar cada partida, revisa usando 3 preguntas: (1) ¿Qué grupo quedó débil o desconectado?, (2) ¿Dónde perdí el Sente por responder a algo pequeño?, y (3) ¿Cerré el Yose en el orden correcto?',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 1, color: 'BLACK' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 4, y: 1, color: 'WHITE' },
            { x: 4, y: 2, color: 'WHITE' },
            { x: 4, y: 0, color: 'BLACK' },
            { x: 5, y: 0, color: 'WHITE' },
            { x: 3, y: 0, color: 'BLACK' },
          ],
          markers: [{ x: 3, y: 0, type: 'SUCCESS', label: '✓' }],
          caption:
            'Tras E9 de Negro y el bloqueo blanco en F9, Negro conecta sólidamente en D9 asegurando su ganancia en el borde.',
        },
      },
    ],
    demonstration: {
      title: 'Secuencia completa de Hane y conexión en primera línea',
      size: 9,
      steps: [
        {
          title: 'Frontera abierta en el borde superior (D8 vs. E8)',
          narration:
            'Negro domina la izquierda (columna D) y Blanco la derecha (columna E), pero la fila 9 en el borde superior aún no se ha jugado.',
          stones: [
            { x: 3, y: 1, color: 'BLACK' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 2, y: 2, color: 'BLACK' },
            { x: 4, y: 1, color: 'WHITE' },
            { x: 4, y: 2, color: 'WHITE' },
            { x: 5, y: 2, color: 'WHITE' },
          ],
          markers: [{ x: 4, y: 0, type: 'HIGHLIGHT' }],
        },
        {
          title: 'Negro ejecuta Hane en E9',
          narration:
            'Negro juega E9 en la primera línea. Blanco no puede cortar en D9 porque su piedra de E9 o D9 quedaría capturada, así que Blanco bloquea en F9.',
          stones: [
            { x: 3, y: 1, color: 'BLACK' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 2, y: 2, color: 'BLACK' },
            { x: 4, y: 1, color: 'WHITE' },
            { x: 4, y: 2, color: 'WHITE' },
            { x: 5, y: 2, color: 'WHITE' },
            { x: 4, y: 0, color: 'BLACK' },
            { x: 5, y: 0, color: 'WHITE' },
          ],
          lastMove: { x: 5, y: 0 },
        },
        {
          title: 'Negro conecta en D9 y sella la ganancia',
          narration:
            'Como la piedra negra de E9 quedó en atari tras F9, Negro conecta tranquilamente en D9: redujo el territorio blanco y amplió el suyo.',
          stones: [
            { x: 3, y: 1, color: 'BLACK' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 2, y: 2, color: 'BLACK' },
            { x: 4, y: 1, color: 'WHITE' },
            { x: 4, y: 2, color: 'WHITE' },
            { x: 5, y: 2, color: 'WHITE' },
            { x: 4, y: 0, color: 'BLACK' },
            { x: 5, y: 0, color: 'WHITE' },
            { x: 3, y: 0, color: 'BLACK' },
          ],
          lastMove: { x: 3, y: 0 },
          markers: [{ x: 3, y: 0, type: 'SUCCESS', label: '✓' }],
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l12-gd-1',
        prompt:
          'Juega Negro: En este final de partida (Yose), ejecuta el Hane en primera línea superior para reducir el territorio blanco de la derecha.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 1, color: 'BLACK' },
          { x: 3, y: 2, color: 'BLACK' },
          { x: 2, y: 2, color: 'BLACK' },
          { x: 4, y: 1, color: 'WHITE' },
          { x: 4, y: 2, color: 'WHITE' },
          { x: 5, y: 2, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 0 }],
        correctFeedback:
          '¡Hane exacto en E9! Te adelantas en la primera línea reduciendo el territorio blanco y asegurando el borde superior.',
        wrongFeedback: {
          '3,0': 'Jugar pasivamente en D9 permite que sea Blanco quien haga Hane en D9 o cierre en E9 sin perder ningún punto.',
        },
        defaultWrongFeedback:
          'Coloca tu piedra en la primera línea justo encima de la piedra blanca de E8 (coordenada E9).',
        hints: [
          'Tu piedra está en D8 y la de Blanco en E8.',
          'Avanza en diagonal hacia la primera línea en E9.',
        ],
        markers: [{ x: 4, y: 0, type: 'CIRCLE' }],
      },
    ],
    independentPractice: [
      {
        id: 'l12-ip-1',
        prompt:
          'Práctica: Después de tu Hane en E9, Blanco bloqueó en F9 dejando tu piedra de E9 en atari. ¡Conecta en D9 para completar la secuencia de Yose!',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 1, color: 'BLACK' },
          { x: 3, y: 2, color: 'BLACK' },
          { x: 2, y: 2, color: 'BLACK' },
          { x: 4, y: 1, color: 'WHITE' },
          { x: 4, y: 2, color: 'WHITE' },
          { x: 5, y: 2, color: 'WHITE' },
          { x: 4, y: 0, color: 'BLACK' },
          { x: 5, y: 0, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 3, y: 0 }],
        correctFeedback:
          '¡Secuencia de Yose completada en D9! Tu frontera queda hermética y ganaste puntos decisivos en el borde.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Tu piedra en E9 está en atari: únelas jugando en D9.',
        hints: [
          'La única libertad de tu piedra en E9 es D9.',
          'Juega en D9.',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'En el Yose muchas partidas cerradas se deciden por 1 o 2 puntos mediante el Hane en primera línea y el respeto al Sente.',
        'La lectura profunda consiste en elegir pocas jugadas candidatas y buscar siempre la mejor resistencia del rival.',
        'Revisar tus propias partidas buscando dónde perdiste la iniciativa o dejaste grupos cortados acelera tu progreso.',
      ],
      vocabulary: [
        {
          term: 'Yose (Final de partida)',
          japanese: 'ヨセ',
          definition: 'Fase final donde se cierran las fronteras de los territorios y se calculan los puntos exactos.',
        },
        {
          term: 'Hane',
          japanese: 'ハネ',
          definition: 'Jugada diagonal en contacto que rodea por el extremo a una piedra rival.',
        },
        {
          term: 'Yomi (Lectura)',
          japanese: '読み',
          definition: 'Visualización mental de secuencias de jugadas y sus variantes antes de colocar la piedra.',
        },
      ],
    },
    transferQuestion: {
      id: 'l12-tq-1',
      prompt: 'Pregunta de transferencia: Al calcular el valor de una jugada en el Yose, ¿por qué una jugada que te da 2 puntos a ti y le quita 2 puntos a tu rival vale en realidad 4 puntos en el marcador?',
      boardSize: 9,
      initialStones: [{ x: 4, y: 0, color: 'BLACK' }],
      turn: 'BLACK',
      exerciseType: 'MULTIPLE_CHOICE',
      options: [
        {
          id: 'tq-swing',
          text: 'Porque el resultado es relativo (diferencia neta entre ambos): ganar +2 tú en vez de que gane +2 el rival produce un cambio total (swing) de 4 puntos',
          isCorrect: true,
          feedback:
            '¡Cálculo de Yose de nivel avanzado! Esa diferencia entre el resultado si juegas tú primero frente a si juega el rival primero se llama valor "De-iri" en Go.',
        },
        {
          id: 'tq-komi',
          text: 'Porque en el Yose los puntos del borde cuentan doble por reglamento',
          isCorrect: false,
          feedback: 'Cada intersección sigue valiendo 1 punto; el valor de 4 viene de sumar tus +2 ganados y los 2 que evitaste que ganara el rival.',
        },
      ],
      correctFeedback: '¡Has completado el recorrido curricular de la Academia Camino de Go!',
      wrongFeedback: {},
      defaultWrongFeedback: 'Compara el marcador final si haces tú la jugada (+2 para ti) frente a si la hace el rival (+2 para él).',
      hints: [
        'La diferencia entre +2 y -2 es 4.',
        'Por eso el Yose en los bordes es tan valioso.',
      ],
    },
  },
];
