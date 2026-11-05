import { LessonContent } from '../types/go';

/**
 * Parte 2 de las Nuevas Lecciones de "Tesuji" (Elementary Go Series, Vol. 3) de James Davies
 * Lecciones 31 a 36 (2 de Nivel Intermedio + 4 de Nivel Avanzado)
 * Cubre los Capítulos 3, 4, 5, 8, 9, 10, 11, 13, 15 y 16 sin repetir temas previos.
 */
export const TESUJI_LESSONS_PART2_CATALOG: LessonContent[] = [
  // ============================================================================
  // LECCIÓN 31 (Etapa 5 · Unidad 4 — Nivel Intermedio): Exprimir (Shibori) y Colocación (Oki)
  // ============================================================================
  {
    id: 'lesson-31-amputar-exprimir-shibori-colocacion',
    stageNumber: 5,
    stageTitle: '5. Táctica',
    unitNumber: 4,
    unitTitle: 'Amputar a gran escala: Exprimir (Shibori), Construir Escalera y Colocación (Oki)',
    title: 'Amputar a Gran Escala: Exprimir (Shibori), Doble Escalera y Colocación',
    subtitle:
      'Domina el Capítulo 3 de "Tesuji" (James Davies): cómo capturar grupos de corte que tienen demasiadas libertades mediante sacrificios de compresión (Shibori), construcción de escaleras y colocación a distancia (Oki).',
    estimatedMinutes: 9,
    xpReward: 40,
    prerequisites: ['lesson-17-cinco-formulas-ataque-sin-contacto'],
    relatedPuzzleIds: [
      'puzzle-54-exprimir-shibori-esquina',
      'puzzle-55-construir-doble-escalera',
      'puzzle-56-colocacion-oki-amputar',
    ],
    observableObjective:
      'Al terminar, podrás usar el sacrificio de compresión (Shibori) para reducir las libertades enemigas, preparar una escalera con doble amenaza y amputar tres piedras en el borde mediante Colocación (Oki).',
    activationQuestion: {
      question:
        'En el Capítulo 3 de "Tesuji", cuando un grupo enemigo de corte tiene 3 o 4 piedras y no puede ser capturado en escalera ni en red directa, ¿qué logra el Tesuji de Exprimir (Shibori)?',
      options: [
        {
          id: 'a',
          text: 'Sacrifica una o dos piedras adentro para obligar al rival a capturarlas formando una masa pesada con pocas libertades',
          isCorrect: true,
          explanation:
            '¡Exacto! Al obligar al enemigo a capturar tus piedras sacrificadas, su grupo se vuelve un grumo ineficiente (Dango) cuyas libertades exteriores puedes sellar en sente.',
        },
        {
          id: 'b',
          text: 'Intenta salvar todas las piedras propias sin entregar ni un solo prisionero',
          isCorrect: false,
          explanation:
            'Aferrarse a piedras aisladas impide ejecutar el Shibori y suele destruir tu propia posición exterior.',
        },
        {
          id: 'c',
          text: 'Pasa el turno esperando a que el oponente llene sus propias libertades solo',
          isCorrect: false,
          explanation:
            'El Shibori es una secuencia forzada en sente basada en ataris y sacrificios tácticos.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. El Tesuji de Exprimir (Shibori) y Construir una Escalera',
        body: 'Cuando una piedra tuya ha quedado atrapada dentro del rincón o costado enemigo, en lugar de darla por perdida sin más, puedes añadir una segunda piedra de sacrificio que obligue al rival a capturar ambas. Al hacerlo, el grupo rival rellena sus propias libertades internas y queda listo para ser exprimido desde el exterior.',
        deepDive:
          'Davies también muestra el Tesuji de «Construir una Escalera»: cuando la escalera directa sobre las piedras de corte falla, primero atacas o das atari a otra piedra enemiga vecina para colocar una piedra negra en la trayectoria exacta de la escalera.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 2, y: 2, color: 'BLACK' },
            { x: 3, y: 1, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 1, y: 4, color: 'BLACK' },
            { x: 3, y: 2, color: 'WHITE' },
            { x: 3, y: 3, color: 'WHITE' },
            { x: 2, y: 3, color: 'WHITE' },
            { x: 1, y: 1, color: 'WHITE' },
          ],
          markers: [{ x: 3, y: 4, type: 'SUCCESS', label: '1' }],
          caption: 'Tras el sacrificio en la esquina, el bloqueo en D5 (1) exprime y encierra al grupo blanco.',
        },
      },
      {
        title: '2. Colocación (Oki) para amputar tres piedras de corte',
        body: 'Si tres piedras enemigas en fila o en ángulo cortan tus dos grupos cerca del borde, empujar desde afuera solo les ayuda a ganar más espacio y libertades. La Colocación (Oki) deposita una piedra directamente en el punto vital de la primera o segunda línea sin hacer contacto directo inicial, paralizando ambos flancos.',
        deepDive:
          'El Oki es el equivalente táctico de cortar la línea de suministros: sea cual sea el lado por donde el enemigo intente conectar o bloquear, cae en falta de libertades (Damezumari).',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 2, color: 'BLACK' },
            { x: 3, y: 1, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 5, y: 3, color: 'BLACK' },
            { x: 6, y: 2, color: 'BLACK' },
            { x: 4, y: 2, color: 'WHITE' },
            { x: 4, y: 1, color: 'WHITE' },
            { x: 5, y: 1, color: 'WHITE' },
            { x: 5, y: 2, color: 'WHITE' },
          ],
          markers: [{ x: 5, y: 0, type: 'SUCCESS', label: 'Oki' }],
          caption: 'La Colocación (Oki) en F9 priva de libertades en la primera línea a las piedras blancas de corte.',
        },
      },
    ],
    demonstration: {
      title: 'Demostración: Exprimir en la esquina y Colocación (Oki) en el borde',
      size: 9,
      steps: [
        {
          title: '1. Cuatro piedras blancas pesadas tras capturar el sacrificio',
          narration:
            'Blanco capturó una piedra negra en el rincón superior izquierdo, pero su grupo (D7-D6-C6) ha quedado pesado y sin ojos.',
          stones: [
            { x: 2, y: 2, color: 'BLACK' },
            { x: 3, y: 1, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 1, y: 4, color: 'BLACK' },
            { x: 3, y: 2, color: 'WHITE' },
            { x: 3, y: 3, color: 'WHITE' },
            { x: 2, y: 3, color: 'WHITE' },
            { x: 1, y: 1, color: 'WHITE' },
          ],
          turn: 'BLACK',
        },
        {
          title: '2. Negro cierra en D5 completando el Shibori',
          narration:
            'Negro juega en D5 (x=3, y=4). Las piedras blancas quedan atrapadas con solo dos libertades y Negro obtiene un muro exterior impecable.',
          stones: [
            { x: 2, y: 2, color: 'BLACK' },
            { x: 3, y: 1, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 1, y: 4, color: 'BLACK' },
            { x: 3, y: 2, color: 'WHITE' },
            { x: 3, y: 3, color: 'WHITE' },
            { x: 2, y: 3, color: 'WHITE' },
            { x: 1, y: 1, color: 'WHITE' },
            { x: 3, y: 4, color: 'BLACK' },
          ],
          lastMove: { x: 3, y: 4 },
          markers: [{ x: 3, y: 4, type: 'SUCCESS', label: '!' }],
          turn: 'WHITE',
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l31-gd-1',
        prompt:
          'Blanco acaba de capturar en el rincón y sus piedras D7–D6–C6 están pesadas. Juega el cierre de Shibori para dejarlas sin salida hacia el centro.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 2, color: 'BLACK' },
          { x: 3, y: 1, color: 'BLACK' },
          { x: 4, y: 2, color: 'BLACK' },
          { x: 4, y: 3, color: 'BLACK' },
          { x: 1, y: 4, color: 'BLACK' },
          { x: 3, y: 2, color: 'WHITE' },
          { x: 3, y: 3, color: 'WHITE' },
          { x: 2, y: 3, color: 'WHITE' },
          { x: 1, y: 1, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 3, y: 4 }],
        correctFeedback:
          '¡Shibori perfecto! Al bloquear en D5, el grupo pesado blanco queda encerrado con solo dos libertades.',
        wrongFeedback: {
          '2,4': 'Si juegas en C5, Blanco extiende en D5 hacia el centro y escapa del encierro.',
        },
        defaultWrongFeedback: 'Bloquea la salida central de D6 jugando en D5 (x=3, y=4).',
        hints: [
          'Mira la piedra blanca de D6 que intenta salir hacia el centro.',
          'Coloca tu piedra en D5 (x=3, y=4).',
        ],
      },
    ],
    independentPractice: [
      {
        id: 'l31-ip-1',
        prompt:
          'Ejercicio 1 (Construir doble amenaza / escalera): Blanco tiene piedras de corte en E6–E5 y otra en C5. Juega el tesuji que ataca C5 y prepara la captura de E6–E5.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 3, color: 'BLACK' },
          { x: 3, y: 4, color: 'BLACK' },
          { x: 5, y: 3, color: 'BLACK' },
          { x: 5, y: 5, color: 'BLACK' },
          { x: 2, y: 3, color: 'BLACK' },
          { x: 4, y: 3, color: 'WHITE' },
          { x: 4, y: 4, color: 'WHITE' },
          { x: 2, y: 4, color: 'WHITE' },
          { x: 3, y: 5, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 2, y: 5 }],
        correctFeedback:
          '¡Bien leído! Con C4 (x=2, y=5) pones en atari C5 y salvas tus piedras D6–D5, dejando sin defensa a E6–E5.',
        wrongFeedback: {
          '4,5': 'Dar atari inmediato en E4 permite a Blanco contragolpear contra tus piedras D6–D5.',
        },
        defaultWrongFeedback: 'Ataca primero la piedra blanca de C5 jugando en C4 (x=2, y=5).',
        hints: [
          'Observa que tus piedras D6–D5 tienen pocas libertades por culpa de C5 y D4.',
          'Juega en C4 (x=2, y=5) para poner en atari C5.',
        ],
      },
      {
        id: 'l31-ip-2',
        prompt:
          'Ejercicio 2 (Colocación / Oki): Las cuatro piedras blancas en E7–E8–F8–F7 separan tus dos grupos negros. Juega la Colocación (Oki) en la primera línea superior para amputarlas.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 2, color: 'BLACK' },
          { x: 3, y: 1, color: 'BLACK' },
          { x: 4, y: 3, color: 'BLACK' },
          { x: 5, y: 3, color: 'BLACK' },
          { x: 6, y: 2, color: 'BLACK' },
          { x: 4, y: 2, color: 'WHITE' },
          { x: 4, y: 1, color: 'WHITE' },
          { x: 5, y: 1, color: 'WHITE' },
          { x: 5, y: 2, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 5, y: 0 }],
        correctFeedback:
          '¡Oki letal en F9! Blanco no puede extender sus libertades en el borde sin caer en auto-atari y queda amputado.',
        wrongFeedback: {
          '6,1': 'Si empujas desde G8, Blanco desciende a F9 y gana suficientes libertades en el borde.',
        },
        defaultWrongFeedback: 'Deposita tu piedra en la primera línea superior: F9 (x=5, y=0).',
        hints: [
          'No empujes desde los costados; busca el punto vital en la primera línea superior.',
          'Juega en F9 (x=5, y=0).',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'Exprimir (Shibori) sacrifica piedras en el interior para forzar al enemigo a convertirse en una masa pesada con pocas libertades.',
        'Cuando una escalera directa falla, busca un atari preparatorio contra otra piedra vecina para construir la escalera.',
        'La Colocación (Oki) en el punto vital del borde priva de libertades a grupos cortantes de tres o cuatro piedras.',
      ],
      vocabulary: [
        {
          term: 'Shibori (Exprimir)',
          japanese: '絞り',
          definition: 'Secuencia de sacrificio táctico que comprime al grupo enemigo y sella el exterior en sente.',
        },
        {
          term: 'Oki (Colocación)',
          japanese: '置き',
          definition: 'Jugada depositada directamente en el punto vital interior o del borde sin hacer contacto directo previo.',
        },
      ],
    },
    transferQuestion: {
      id: 'l31-tq-1',
      prompt:
        'Pregunta de transferencia: Tres piedras blancas (E8–F8–F7) cortan tus grupos en el borde superior. ¿Dónde colocas el Oki para capturarlas sin dejarles espacio ocular?',
      boardSize: 9,
      initialStones: [
        { x: 3, y: 1, color: 'BLACK' },
        { x: 4, y: 2, color: 'BLACK' },
        { x: 5, y: 3, color: 'BLACK' },
        { x: 6, y: 2, color: 'BLACK' },
        { x: 4, y: 1, color: 'WHITE' },
        { x: 5, y: 1, color: 'WHITE' },
        { x: 5, y: 2, color: 'WHITE' },
      ],
      turn: 'BLACK',
      exerciseType: 'PLACE_STONE',
      validCoords: [{ x: 5, y: 0 }, { x: 6, y: 1 }],
      correctFeedback:
        '¡Dominado! El golpe en F9 (o el cierre directo en G8) paraliza las libertades de las tres piedras blancas de corte.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Apunta a la cabeza en la primera línea F9 (x=5, y=0) o al cierre en G8 (x=6, y=1).',
      hints: [
        'Mira la primera línea encima de F8.',
        'Juega en F9 (x=5, y=0) o G8 (x=6, y=1).',
      ],
    },
  },

  // ============================================================================
  // LECCIÓN 32 (Etapa 6 · Unidad 4 — Nivel Intermedio): Semeai Avanzado (Davies Cap. 5)
  // ============================================================================
  {
    id: 'lesson-32-semeai-avanzado-estomago-ojos-grandes',
    stageNumber: 6,
    stageTitle: '6. Vida y muerte',
    unitNumber: 4,
    unitTitle: 'Semeai avanzado: Descenso al borde, Tesuji al estómago y Ojos grandes',
    title: 'Semeai Avanzado: Descenso al Borde, Tesuji al Estómago y Ojos Grandes',
    subtitle:
      'Estudia el Capítulo 5 de "Tesuji" («When Liberties Count»): cómo ganar carreras de captura estirando tus libertades con el Descenso al Borde (Sagari), el Tesuji al Estómago (Hara-tsuke) y la regla matemática de los Ojos Grandes (3, 5, 8 y 12 libertades).',
    estimatedMinutes: 9,
    xpReward: 40,
    prerequisites: ['lesson-18-nakade-puntos-vitales-tsumego'],
    relatedPuzzleIds: [
      'puzzle-58-descenso-al-borde-sagari',
      'puzzle-59-tesuji-estomago-haratsuke',
    ],
    observableObjective:
      'Al terminar, ganarás carreras de captura aplicando el Descenso al Borde (Sagari), el Tesuji al Estómago (Hara-tsuke) y la fórmula de libertades de los ojos grandes (4 puntos = 5 libertades, 5 puntos = 8 libertades).',
    activationQuestion: {
      question:
        'Según la tabla del Capítulo 5 de James Davies («Big Eyes»), si un grupo en Semeai logra encerrar un «ojo grande» de 4 puntos vacíos en la esquina, ¿a cuántas libertades efectivas equivale ese ojo de 4 espacios?',
      options: [
        {
          id: 'a',
          text: 'A 5 libertades efectivas (y un ojo de 5 puntos equivale a 8 libertades)',
          isCorrect: true,
          explanation:
            '¡Exacto! Porque para capturar el grupo, el rival tiene que rellenar 3 puntos, dejar que captures y luego volver a rellenar: 3 puntos = 3 libertades; 4 puntos = 5 libertades; 5 puntos = 8 libertades; 6 puntos = 12 libertades.',
        },
        {
          id: 'b',
          text: 'A solo 2 libertades efectivas',
          isCorrect: false,
          explanation:
            'Un ojo grande multiplica las libertades porque obliga al rival a sacrificar piedras adentro repetidamente.',
        },
        {
          id: 'c',
          text: 'Exactamente a 4 libertades, una por cada punto',
          isCorrect: false,
          explanation:
            'A partir de 4 puntos, las libertades crecen más rápido que el número de intersecciones: 4 puntos dan 5 libertades.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. El Descenso al Borde (Sagari) y Jugadas de Aproximación',
        body: 'Cuando tu grupo compite en una carrera de captura (Semeai) junto al borde, hacer hane en la primera línea suele ser un error porque expone un punto de corte. En cambio, descender recto a la primera línea (Sagari) maximiza tus libertades y crea «jugadas de aproximación»: intersecciones donde el rival no puede entrar de inmediato sin ponerse en auto-atari.',
        deepDive:
          'Davies añade dos principios de oro para el Semeai: «Dos hanes equivalen a ganar una libertad» y «Guarda el Ko como último recurso si aún existe la posibilidad de ganar sin Ko».',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 1, y: 1, color: 'BLACK' },
            { x: 2, y: 1, color: 'BLACK' },
            { x: 2, y: 2, color: 'BLACK' },
            { x: 1, y: 3, color: 'WHITE' },
            { x: 2, y: 3, color: 'WHITE' },
            { x: 3, y: 3, color: 'WHITE' },
            { x: 3, y: 2, color: 'WHITE' },
            { x: 3, y: 1, color: 'WHITE' },
            { x: 4, y: 1, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
          ],
          markers: [{ x: 2, y: 0, type: 'SUCCESS', label: '1' }],
          caption: 'El Descenso al Borde (Sagari) en C9 impide que Blanco juegue en D9 sin quedar en auto-atari.',
        },
      },
      {
        title: '2. El Tesuji al Estómago (Hara-tsuke) y los Ojos Grandes (3, 5, 8, 12)',
        body: 'Contra una fila de tres piedras enemigas que bloquean el borde, el Tesuji al Estómago (Hara-tsuke) consiste en hacer contacto directo en la piedra central (la segunda línea). Si el rival bloquea arriba, cruzas por debajo en la primera línea; si bloquea abajo, cortas arriba.',
        deepDive:
          'Memoriza la progresión de los Ojos Grandes de Davies (Cap. 5): 3 espacios = 3 libertades; 4 espacios = 5 libertades; 5 espacios = 8 libertades; 6 espacios = 12 libertades.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 1, y: 1, color: 'BLACK' },
            { x: 1, y: 2, color: 'BLACK' },
            { x: 2, y: 2, color: 'BLACK' },
            { x: 2, y: 3, color: 'WHITE' },
            { x: 3, y: 3, color: 'WHITE' },
            { x: 3, y: 2, color: 'WHITE' },
            { x: 3, y: 1, color: 'WHITE' },
            { x: 3, y: 0, color: 'WHITE' },
            { x: 5, y: 2, color: 'BLACK' },
          ],
          markers: [{ x: 4, y: 1, type: 'SUCCESS', label: '★' }],
          caption: 'El Tesuji al Estómago (Hara-tsuke) en E8 desarticula la columna blanca D9–D8–D7.',
        },
      },
    ],
    demonstration: {
      title: 'Demostración: Descenso al Borde (Sagari) y Tesuji al Estómago (Hara-tsuke)',
      size: 9,
      steps: [
        {
          title: '1. Carrera de captura en el borde superior',
          narration:
            'Las tres piedras negras (B8-C8-C7) luchan contra la columna blanca (D8-D7-D6). Negro necesita ganar una libertad extra.',
          stones: [
            { x: 1, y: 1, color: 'BLACK' },
            { x: 2, y: 1, color: 'BLACK' },
            { x: 2, y: 2, color: 'BLACK' },
            { x: 1, y: 3, color: 'WHITE' },
            { x: 2, y: 3, color: 'WHITE' },
            { x: 3, y: 3, color: 'WHITE' },
            { x: 3, y: 2, color: 'WHITE' },
            { x: 3, y: 1, color: 'WHITE' },
            { x: 4, y: 1, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
          ],
          turn: 'BLACK',
        },
        {
          title: '2. El Descenso (Sagari) en C9 gana el Semeai',
          narration:
            'Negro desciende a C9 (x=2, y=0). Blanco no puede entrar en D9 porque quedaría inmediatamente en atari, dando a Negro la libertad decisiva.',
          stones: [
            { x: 1, y: 1, color: 'BLACK' },
            { x: 2, y: 1, color: 'BLACK' },
            { x: 2, y: 2, color: 'BLACK' },
            { x: 1, y: 3, color: 'WHITE' },
            { x: 2, y: 3, color: 'WHITE' },
            { x: 3, y: 3, color: 'WHITE' },
            { x: 3, y: 2, color: 'WHITE' },
            { x: 3, y: 1, color: 'WHITE' },
            { x: 4, y: 1, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
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
        id: 'l32-gd-1',
        prompt:
          'Tu grupo negro (B8–C8–C7) compite en Semeai contra las piedras blancas de la columna D. Ejecuta el Descenso al Borde (Sagari) para ganar la carrera de libertades.',
        boardSize: 9,
        initialStones: [
          { x: 1, y: 1, color: 'BLACK' },
          { x: 2, y: 1, color: 'BLACK' },
          { x: 2, y: 2, color: 'BLACK' },
          { x: 1, y: 3, color: 'WHITE' },
          { x: 2, y: 3, color: 'WHITE' },
          { x: 3, y: 3, color: 'WHITE' },
          { x: 3, y: 2, color: 'WHITE' },
          { x: 3, y: 1, color: 'WHITE' },
          { x: 4, y: 1, color: 'BLACK' },
          { x: 4, y: 2, color: 'BLACK' },
          { x: 4, y: 3, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 2, y: 0 }],
        correctFeedback:
          '¡Sagari exacto en C9! Blanco no puede acercarse por D9 sin ponerse en auto-atari y Negro captura primero.',
        wrongFeedback: {
          '3,0': 'Hacer hane en D9 permite a Blanco cortar en C9 y reducir tus libertades de golpe.',
        },
        defaultWrongFeedback: 'Desciende recto desde C8 hasta C9 (x=2, y=0).',
        hints: [
          'Evita el hane en D9 porque deja un corte en C9.',
          'Baja en línea recta a C9 (x=2, y=0).',
        ],
      },
    ],
    independentPractice: [
      {
        id: 'l32-ip-1',
        prompt:
          'Ejercicio 1 (Tesuji al Estómago / Hara-tsuke): La pared blanca D9–D8–D7 encierra a tu grupo de la esquina. Golpea su "estómago" en la segunda línea para romper el bloqueo.',
        boardSize: 9,
        initialStones: [
          { x: 1, y: 1, color: 'BLACK' },
          { x: 1, y: 2, color: 'BLACK' },
          { x: 2, y: 2, color: 'BLACK' },
          { x: 2, y: 3, color: 'WHITE' },
          { x: 3, y: 3, color: 'WHITE' },
          { x: 3, y: 2, color: 'WHITE' },
          { x: 3, y: 1, color: 'WHITE' },
          { x: 3, y: 0, color: 'WHITE' },
          { x: 5, y: 2, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 1 }],
        correctFeedback:
          '¡Hara-tsuke brillante en E8! Blanco queda sin respuesta satisfactoria entre E9 y E7.',
        wrongFeedback: {
          '4,2': 'Jugar en E7 permite a Blanco defender sólidamente en E8.',
        },
        defaultWrongFeedback: 'Haz contacto directo en el centro de la fila blanca jugando en E8 (x=4, y=1).',
        hints: [
          'Apunta al costado medio de las tres piedras blancas en la segunda línea.',
          'Juega en E8 (x=4, y=1).',
        ],
      },
      {
        id: 'l32-ip-2',
        prompt:
          'Ejercicio 2 (Agrandar el ojo en la esquina): Juega en el borde para ampliar el ojo de tu grupo negro en la esquina superior izquierda a un Ojo Grande de 4 puntos (5 libertades).',
        boardSize: 9,
        initialStones: [
          { x: 0, y: 2, color: 'BLACK' },
          { x: 1, y: 2, color: 'BLACK' },
          { x: 2, y: 2, color: 'BLACK' },
          { x: 2, y: 1, color: 'BLACK' },
          { x: 0, y: 3, color: 'WHITE' },
          { x: 1, y: 3, color: 'WHITE' },
          { x: 2, y: 3, color: 'WHITE' },
          { x: 3, y: 2, color: 'WHITE' },
          { x: 3, y: 1, color: 'WHITE' },
          { x: 3, y: 0, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 2, y: 0 }],
        correctFeedback:
          '¡Excelente! Al cerrar en C9 encierras un ojo de 4 puntos (A9, B9, A8, B8), que te otorga 5 libertades efectivas en el Semeai.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Desciende a C9 (x=2, y=0) para encerrar los 4 puntos de la esquina.',
        hints: [
          'Cierra la frontera del rincón en la primera línea.',
          'Juega en C9 (x=2, y=0).',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'En carreras de captura junto al borde, el Descenso (Sagari) supera al hane porque evita cortes y crea jugadas de aproximación.',
        'El Tesuji al Estómago (Hara-tsuke) golpea el flanco medio de una fila de piedras en el borde para dividir su defensa.',
        'Los Ojos Grandes multiplican tus libertades: 3 puntos = 3 libertades; 4 puntos = 5 libertades; 5 puntos = 8 libertades.',
      ],
      vocabulary: [
        {
          term: 'Sagari (Descenso al borde)',
          japanese: '下がり',
          definition: 'Extender verticalmente hacia la primera línea para maximizar libertades en Semeai.',
        },
        {
          term: 'Hara-tsuke (Tesuji al estómago)',
          japanese: '腹ツケ',
          definition: 'Jugada de contacto directo en el costado central de una formación de dos o tres piedras enemigas.',
        },
      ],
    },
    transferQuestion: {
      id: 'l32-tq-1',
      prompt:
        'Pregunta de transferencia: Tres piedras blancas (F9–F8–F7) cierran el paso en el borde superior. ¿Dónde juegas el Tesuji al Estómago (Hara-tsuke) para romper su bloqueo?',
      boardSize: 9,
      initialStones: [
        { x: 7, y: 1, color: 'BLACK' },
        { x: 7, y: 2, color: 'BLACK' },
        { x: 6, y: 2, color: 'BLACK' },
        { x: 5, y: 0, color: 'WHITE' },
        { x: 5, y: 1, color: 'WHITE' },
        { x: 5, y: 2, color: 'WHITE' },
        { x: 5, y: 3, color: 'WHITE' },
        { x: 3, y: 2, color: 'BLACK' },
      ],
      turn: 'BLACK',
      exerciseType: 'PLACE_STONE',
      validCoords: [{ x: 4, y: 1 }],
      correctFeedback:
        '¡Dominado! El contacto en E8 golpea el estómago de la pared blanca y conecta tus piedras por arriba o por abajo.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Haz contacto lateral con F8 jugando en E8 (x=4, y=1).',
      hints: [
        'Mira la piedra central de la fila blanca en F8.',
        'Juega a su izquierda en E8 (x=4, y=1).',
      ],
    },
  },

  // ============================================================================
  // LECCIÓN 33 (Etapa 8 · Unidad 4 — Nivel Avanzado): Dentro de Territorio Enemigo y Escape (Davies Cap. 8 y 9)
  // ============================================================================
  {
    id: 'lesson-33-dentro-territorio-enemigo-escape-muro',
    stageNumber: 8,
    stageTitle: '8. Combate y medio juego',
    unitNumber: 4,
    unitTitle: 'Dentro del territorio enemigo y cómo escapar de un cerco',
    title: 'Dentro del Territorio Enemigo y Ruptura de Cercos: Cuña y Contacto',
    subtitle:
      'Aprende los Capítulos 8 («Inside Enemy Territory») y 9 («Getting Out») de James Davies: cómo revivir piedras dentro de un territorio rival y cómo perforar un cerco mediante la Cuña (Warikomi) y el Corte Cruzado.',
    estimatedMinutes: 9,
    xpReward: 45,
    prerequisites: ['lesson-21-ataque-asfixia-moyo-sente'],
    relatedPuzzleIds: [
      'puzzle-62-cuna-territorio-warikomi',
      'puzzle-39-cuna-warikomi',
      'puzzle-40-kikashi-forzante',
    ],
    observableObjective:
      'Al terminar, podrás usar la Cuña (Warikomi) para fracturar cercos formados por saltos de un espacio y revivir piedras aisladas dentro del territorio enemigo.',
    activationQuestion: {
      question:
        'En los Capítulos 8 y 9 de "Tesuji", cuando tus piedras están encerradas por una formación enemiga que tiene dos piedras separadas por un espacio, ¿por qué la Cuña (Warikomi) supera al simple empuje lateral?',
      options: [
        {
          id: 'a',
          text: 'Porque inserta la piedra entre las dos piedras rivales creando dos puntos de corte simultáneos que el rival no puede tapar a la vez',
          isCorrect: true,
          explanation:
            '¡Exacto! Empujar desde un lado solo obliga al rival a conectar sólidamente; en cambio, la Cuña (Warikomi) se mete en el punto de conexión y crea un miai de doble corte.',
        },
        {
          id: 'b',
          text: 'Porque la piedra de la Cuña nunca queda en atari',
          isCorrect: false,
          explanation:
            'Al contrario: la Cuña casi siempre queda en atari inmediato, pero al conectar o dar contra-atari revela la fractura del muro rival.',
        },
        {
          id: 'c',
          text: 'Porque permite pasar el turno sin combatir',
          isCorrect: false,
          explanation:
            'La Cuña es una jugada de contacto directo altamente táctica.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. La Cuña (Warikomi) para romper un cerco o invadir el borde',
        body: 'Cuando el oponente te rodea con saltos de un espacio o intenta tragarse una esquina con una formación suelta, nunca empujes desde un costado ayudándole a cerrar la puerta. Inserta la Cuña (Warikomi) justo en medio de las dos piedras enemigas: por cualquier lado que el rival dé atari, tú extiendes o das contra-atari por el otro.',
        deepDive:
          'Davies demuestra en el Capítulo 8 que incluso en el borde inferior o lateral, meter la Cuña en la segunda línea entre dos piedras blancas destroza el territorio aparentemente seguro.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 2, color: 'WHITE' },
            { x: 5, y: 2, color: 'WHITE' },
            { x: 2, y: 3, color: 'WHITE' },
            { x: 6, y: 3, color: 'WHITE' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 4, y: 4, color: 'BLACK' },
          ],
          markers: [{ x: 4, y: 2, type: 'SUCCESS', label: '1' }],
          caption: 'La Cuña (Warikomi) en E7 parte por la mitad el bloqueo blanco D7–F7.',
        },
      },
      {
        title: '2. Revivir piedras «muertas» mediante Corte Cruzado',
        body: 'Si tienes una piedra aislada dentro de la esfera de influencia enemiga, no intentes huir arrastrándote en fila india. Haz contacto con la piedra más cercana del marco rival para provocar un Corte Cruzado (Cross-cut): usarás esa piedra de apoyo para capturar un fragmento del cerco o salir con forma ligera.',
        deepDive:
          'En el Capítulo 9 («Getting Out»), Davies combina el Warikomi, el Corte Cruzado y el sacrificio de una piedra en un flanco para abrir la puerta principal en sente.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 2, y: 2, color: 'WHITE' },
            { x: 3, y: 4, color: 'WHITE' },
            { x: 1, y: 5, color: 'WHITE' },
            { x: 2, y: 3, color: 'BLACK' },
            { x: 5, y: 3, color: 'BLACK' },
          ],
          markers: [{ x: 3, y: 2, type: 'SUCCESS', label: '★' }],
          caption: 'El contacto en D7 revive la piedra negra C6 creando un corte cruzado contra C7 y D5.',
        },
      },
    ],
    demonstration: {
      title: 'Demostración: La Cuña (Warikomi) que perfora el bloqueo central',
      size: 9,
      steps: [
        {
          title: '1. Dos piedras negras cercadas en el centro',
          narration:
            'Blanco rodea a E6–E5 con piedras en C6, D7, F7 y G6. Parece una red sin fisuras, pero D7 y F7 están separadas por un espacio.',
          stones: [
            { x: 3, y: 2, color: 'WHITE' },
            { x: 5, y: 2, color: 'WHITE' },
            { x: 2, y: 3, color: 'WHITE' },
            { x: 6, y: 3, color: 'WHITE' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 4, y: 4, color: 'BLACK' },
          ],
          turn: 'BLACK',
        },
        {
          title: '2. Negro inserta la Cuña (Warikomi) en E7',
          narration:
            'Negro juega en E7 (x=4, y=2). Si Blanco da atari desde E8, Negro corta en D6 o F6 con doble atari y rompe el cerco.',
          stones: [
            { x: 3, y: 2, color: 'WHITE' },
            { x: 5, y: 2, color: 'WHITE' },
            { x: 2, y: 3, color: 'WHITE' },
            { x: 6, y: 3, color: 'WHITE' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 4, y: 4, color: 'BLACK' },
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
        id: 'l33-gd-1',
        prompt:
          'Tus piedras E6–E5 están rodeadas por el marco blanco. Inserta la Cuña (Warikomi) para fracturar el bloqueo entre D7 y F7.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 2, color: 'WHITE' },
          { x: 5, y: 2, color: 'WHITE' },
          { x: 2, y: 3, color: 'WHITE' },
          { x: 6, y: 3, color: 'WHITE' },
          { x: 4, y: 3, color: 'BLACK' },
          { x: 4, y: 4, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 2 }],
        correctFeedback:
          '¡Warikomi exacto en E7! Creas dos cortes simultáneos en D6 y F6 que Blanco no puede defender a la vez.',
        wrongFeedback: {
          '3,3': 'Empujar en D6 permite a Blanco conectar sólidamente en E7 cerrando el muro.',
        },
        defaultWrongFeedback: 'Mete la cuña justo entre D7 y F7 jugando en E7 (x=4, y=2).',
        hints: [
          'Mira el punto vacío exactamente entre las piedras blancas D7 y F7.',
          'Juega en E7 (x=4, y=2).',
        ],
      },
    ],
    independentPractice: [
      {
        id: 'l33-ip-1',
        prompt:
          'Ejercicio 1 (Cuña en territorio enemigo, Davies Cap. 8): Blanco cree que su territorio del borde superior está cerrado con D8 y F8. Inserta la Cuña (Warikomi) para destrozar su base.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 2, color: 'BLACK' },
          { x: 4, y: 2, color: 'BLACK' },
          { x: 6, y: 2, color: 'BLACK' },
          { x: 3, y: 1, color: 'WHITE' },
          { x: 5, y: 1, color: 'WHITE' },
          { x: 2, y: 1, color: 'WHITE' },
          { x: 6, y: 1, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 1 }],
        correctFeedback:
          '¡Cuña implacable en E8! Como tienes la piedra de apoyo en E7, Blanco no puede evitar que captures uno de los dos lados.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Inserta la Cuña entre D8 y F8 jugando en E8 (x=4, y=1).',
        hints: [
          'Aprovecha tu piedra de apoyo en E7.',
          'Juega en E8 (x=4, y=1) entre las dos piedras blancas.',
        ],
      },
      {
        id: 'l33-ip-2',
        prompt:
          'Ejercicio 2 (Revivir piedra aislada): Tu piedra en C6 está dentro del marco blanco C7–D5–B4. Juega el contacto cruzado que la revive y conecta hacia F6.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 2, color: 'WHITE' },
          { x: 3, y: 4, color: 'WHITE' },
          { x: 1, y: 5, color: 'WHITE' },
          { x: 2, y: 3, color: 'BLACK' },
          { x: 5, y: 3, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 3, y: 2 }],
        correctFeedback:
          '¡Gran lectura! Al jugar en D7 creas un corte cruzado con C6 y C7 que te permite salir hacia el centro o capturar C7.',
        wrongFeedback: {
          '2,4': 'Extender en C5 permite a Blanco bloquear en D6 encerrándote.',
        },
        defaultWrongFeedback: 'Haz contacto en D7 (x=3, y=2) para cruzar la forma contra C7.',
        hints: [
          'Usa tu piedra C6 para formar un corte cruzado contra C7.',
          'Juega en D7 (x=3, y=2).',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'La Cuña (Warikomi) se inserta entre dos piedras enemigas separadas por un punto para crear un doble punto de corte.',
        'Empujar desde un costado ayuda al rival a conectarse; meter la Cuña explota su falta de conexión.',
        'Para revivir una piedra dentro del territorio enemigo, usa el contacto y el Corte Cruzado en lugar de huir en línea recta.',
      ],
      vocabulary: [
        {
          term: 'Warikomi (Cuña)',
          japanese: '割り込み',
          definition: 'Insertar una piedra directamente entre dos piedras enemigas alineadas con un espacio entre sí.',
        },
        {
          term: 'Toppa (Ruptura de cerco)',
          japanese: '突破',
          definition: 'Perforar un bloqueo enemigo utilizando tesujis de corte o sacrificio.',
        },
      ],
    },
    transferQuestion: {
      id: 'l33-tq-1',
      prompt:
        'Pregunta de transferencia: Blanco intenta encerrar tu piedra E4 con piedras en D3 y F3. ¿Dónde juegas la Cuña (Warikomi) para romper el bloqueo inferior?',
      boardSize: 9,
      initialStones: [
        { x: 4, y: 5, color: 'BLACK' },
        { x: 4, y: 4, color: 'BLACK' },
        { x: 3, y: 6, color: 'WHITE' },
        { x: 5, y: 6, color: 'WHITE' },
        { x: 2, y: 5, color: 'WHITE' },
        { x: 6, y: 5, color: 'WHITE' },
      ],
      turn: 'BLACK',
      exerciseType: 'PLACE_STONE',
      validCoords: [{ x: 4, y: 6 }],
      correctFeedback:
        '¡Dominado! La Cuña en E3 parte en dos la defensa blanca entre D3 y F3.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Coloca tu piedra entre D3 y F3: en E3 (x=4, y=6).',
      hints: [
        'Mira el espacio vacío entre las piedras blancas D3 y F3.',
        'Juega en E3 (x=4, y=6).',
      ],
    },
  },

  // ============================================================================
  // LECCIÓN 34 (Etapa 10 · Unidad 3 — Nivel Avanzado): Sacrificio por Tempo y Retroceso Hiki (Davies Cap. 10 y 11)
  // ============================================================================
  {
    id: 'lesson-34-sacrificio-tempo-ataque-doble-hane',
    stageNumber: 10,
    stageTitle: '10. Invasión, reducción y sabaki',
    unitNumber: 3,
    unitTitle: 'Sacrificio por Tempo, Retroceso (Hiki) y Ataque mediante Tesuji',
    title: 'Sacrificio por Tempo, Retroceso (Hiki) y Doble Hane Ofensivo',
    subtitle:
      'Domina los Capítulos 10 («Sacrifice for Tempo») y 11 («Attacking by Tesuji») de James Davies: cómo cortar el salto de caballo enemigo para ganar jugadas en sente y cómo capturar sin dar atari mediante el Retroceso (Hiki).',
    estimatedMinutes: 9,
    xpReward: 45,
    prerequisites: ['lesson-23-defensa-contacto-golpe-hombro'],
    relatedPuzzleIds: [
      'puzzle-63-retroceso-hiki-captura',
      'puzzle-31-tesuji-roba-ojos',
      'puzzle-43-ko-dominante',
    ],
    observableObjective:
      'Al terminar, sabrás cuándo abstenerte de dar un atari directo usando en su lugar el Retroceso (Hiki) para capturar limpiamente, y cómo sacrificar una piedra en el salto de caballo rival para ganar tempo.',
    activationQuestion: {
      question:
        'En el Capítulo 11 de "Tesuji" («Drawing Back to Capture»), ¿por qué a veces retroceder silenciosamente (Hiki) una piedra amenazada es mucho mejor que dar atari inmediato a la piedra de corte rival?',
      options: [
        {
          id: 'a',
          text: 'Porque el atari directo permite un contra-atari o Ko del rival, mientras que el Retroceso (Hiki) repara tu debilidad y deja a la piedra enemiga atrapada sin contrajuego',
          isCorrect: true,
          explanation:
            '¡Exacto! Davies muestra que cuando dar atari expone tus propias piedras a un contra-atari, retroceder un paso (Hiki) multiplica tus libertades y mata la piedra de corte en silencio.',
        },
        {
          id: 'b',
          text: 'Porque en Go está prohibido dar atari a una piedra de corte',
          isCorrect: false,
          explanation:
            'Es legal, pero tácticamente inferior cuando invita a un contra-atari enemigo.',
        },
        {
          id: 'c',
          text: 'Porque el Retroceso te hace perder la piedra pero ganas medio punto de Komi',
          isCorrect: false,
          explanation:
            'El Retroceso (Hiki) salva tu piedra y además captura la piedra de corte rival.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. El Retroceso que Captura (Hiki) frente al Atari prematuro',
        body: 'Cuando el rival corta tus piedras y deja una de las tuyas con solo dos libertades, el impulso instintivo es dar atari a la piedra que acaba de cortar. Pero si el rival puede responder con un contra-atari sobre tu piedra débil, fracasarás. El Retroceso (Hiki) retira tu piedra débil un paso, sube a 4 libertades y deja a la piedra cortante sin salida.',
        deepDive:
          'Este tesuji silencioso es una de las señales más claras de madurez táctica: resolver la captura sin conceder ni una sola amenaza de Ko.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 3, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 2, y: 2, color: 'BLACK' },
            { x: 5, y: 3, color: 'BLACK' },
            { x: 3, y: 2, color: 'WHITE' },
            { x: 2, y: 3, color: 'WHITE' },
            { x: 2, y: 4, color: 'WHITE' },
          ],
          markers: [
            { x: 3, y: 4, type: 'SUCCESS', label: 'Hiki' },
            { x: 3, y: 1, type: 'DANGER', label: 'X' },
          ],
          caption: 'Retroceder en D5 (Hiki) captura la piedra blanca D7; dar atari en D8 (X) permitiría el contra-atari en D5.',
        },
      },
      {
        title: '2. Sacrificio por Tempo en el Salto de Caballo',
        body: 'En el Capítulo 10, Davies enseña a cortar dentro del salto de caballo enemigo no con la intención de salvar la piedra que corta, sino para sacrificarla: mientras el rival gasta jugadas capturándola, tú encadenas dos jugadas exteriores en sente que transforman el tablero.',
        deepDive:
          'Una piedra sacrificada con propósito vale el doble que una piedra salvada en gote.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 2, color: 'WHITE' },
            { x: 5, y: 3, color: 'WHITE' },
            { x: 2, y: 3, color: 'WHITE' },
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 4, color: 'BLACK' },
            { x: 5, y: 2, color: 'BLACK' },
          ],
          markers: [{ x: 4, y: 2, type: 'SUCCESS', label: '1' }],
          caption: 'Cortar en E7 dentro del salto de caballo blanco D7–F6 gana un tiempo decisivo.',
        },
      },
    ],
    demonstration: {
      title: 'Demostración: Por qué el Retroceso (Hiki) triunfa donde el Atari falla',
      size: 9,
      steps: [
        {
          title: '1. Blanco corta en D7 amenazando D6',
          narration:
            'Si Negro da atari en D8, Blanco responde en D5 dando contra-atari a la piedra negra D6.',
          stones: [
            { x: 3, y: 3, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 2, y: 2, color: 'BLACK' },
            { x: 5, y: 3, color: 'BLACK' },
            { x: 3, y: 2, color: 'WHITE' },
            { x: 2, y: 3, color: 'WHITE' },
            { x: 2, y: 4, color: 'WHITE' },
          ],
          turn: 'BLACK',
        },
        {
          title: '2. Negro retrocede en D5 (Hiki) y atrapa D7',
          narration:
            'Al jugar en D5 (x=3, y=4), Negro fortalece su grupo central y la piedra blanca D7 queda completamente muerta (si sube a D8, E8 la captura).',
          stones: [
            { x: 3, y: 3, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 2, y: 2, color: 'BLACK' },
            { x: 5, y: 3, color: 'BLACK' },
            { x: 3, y: 2, color: 'WHITE' },
            { x: 2, y: 3, color: 'WHITE' },
            { x: 2, y: 4, color: 'WHITE' },
            { x: 3, y: 4, color: 'BLACK' },
          ],
          lastMove: { x: 3, y: 4 },
          markers: [{ x: 3, y: 4, type: 'SUCCESS', label: '!' }],
          turn: 'WHITE',
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l34-gd-1',
        prompt:
          'Blanco cortó en D7 dejando tu piedra D6 con dos libertades. Usa el Retroceso (Hiki) para defender tu piedra y capturar D7 sin permitir contra-atari.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 3, color: 'BLACK' },
          { x: 4, y: 2, color: 'BLACK' },
          { x: 2, y: 2, color: 'BLACK' },
          { x: 5, y: 3, color: 'BLACK' },
          { x: 3, y: 2, color: 'WHITE' },
          { x: 2, y: 3, color: 'WHITE' },
          { x: 2, y: 4, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 3, y: 4 }],
        correctFeedback:
          '¡Hiki magistral en D5! Tus piedras quedan sólidas y la piedra blanca D7 no tiene escapatoria.',
        wrongFeedback: {
          '3,1': 'Si das atari en D8, Blanco juega D5 en contra-atari sobre tu piedra D6.',
        },
        defaultWrongFeedback: 'Retrocede tu piedra D6 hacia abajo jugando en D5 (x=3, y=4).',
        hints: [
          'No des atari en D8 porque tu piedra D6 tiene solo dos libertades.',
          'Extiende D6 hacia abajo en D5 (x=3, y=4).',
        ],
      },
    ],
    independentPractice: [
      {
        id: 'l34-ip-1',
        prompt:
          'Ejercicio 1 (Sacrificio por Tempo en Salto de Caballo): Blanco tiene un salto de caballo entre D7 y F6. Corta en el punto exacto para ganar iniciativa táctica.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 2, color: 'WHITE' },
          { x: 5, y: 3, color: 'WHITE' },
          { x: 2, y: 3, color: 'WHITE' },
          { x: 3, y: 4, color: 'BLACK' },
          { x: 4, y: 4, color: 'BLACK' },
          { x: 5, y: 2, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 2 }],
        correctFeedback:
          '¡Excelente corte en E7! Blanco no puede defender al mismo tiempo D7 y F6.',
        wrongFeedback: {
          '4,3': 'Empujar en E6 permite a Blanco conectar sólido en E7.',
        },
        defaultWrongFeedback: 'Corta en la cintura del salto de caballo jugando en E7 (x=4, y=2).',
        hints: [
          'Mira el punto de corte entre D7 y F6 junto a tu piedra F7.',
          'Juega en E7 (x=4, y=2).',
        ],
      },
      {
        id: 'l34-ip-2',
        prompt:
          'Ejercicio 2 (Ataque roba-ojos en la segunda línea, Davies Cap. 11): Golpea el punto vital de la base blanca en el borde superior para impedir que forme su segundo ojo.',
        boardSize: 9,
        initialStones: [
          { x: 1, y: 2, color: 'BLACK' },
          { x: 2, y: 2, color: 'BLACK' },
          { x: 4, y: 2, color: 'BLACK' },
          { x: 6, y: 2, color: 'BLACK' },
          { x: 7, y: 1, color: 'BLACK' },
          { x: 2, y: 1, color: 'WHITE' },
          { x: 3, y: 1, color: 'WHITE' },
          { x: 5, y: 1, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 1 }],
        correctFeedback:
          '¡Golpe certero en E8! Separas la piedra F8 y destruyes el segundo ojo del grupo blanco.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Juega en E8 (x=4, y=1) justo entre D8 y F8.',
        hints: [
          'Apunta al hueco de la segunda línea entre D8 y F8.',
          'Juega en E8 (x=4, y=1).',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'Cuando el atari directo permite un contra-atari rival, el Retroceso (Hiki) defiende tu debilidad y captura la piedra de corte en silencio.',
        'Cortar el salto de caballo enemigo permite sacrificar una piedra para ganar jugadas forzadas (tempo) en el exterior.',
        'Atacar el punto vital de la base ocular con contacto o cuña destruye los ojos sin dejar contrajuego.',
      ],
      vocabulary: [
        {
          term: 'Hiki (Retroceso)',
          japanese: '引き',
          definition: 'Retirar o extender una piedra amenazada hacia tu propio bando para fortalecer libertades y capturar sin dar atari.',
        },
        {
          term: 'Sute-ishi (Piedra de sacrificio)',
          japanese: '捨て石',
          definition: 'Piedra entregada deliberadamente para obtener iniciativa (sente), forma exterior o compresión.',
        },
      ],
    },
    transferQuestion: {
      id: 'l34-tq-1',
      prompt:
        'Pregunta de transferencia: Blanco cortó en F7 dejando tu piedra F6 con dos libertades. ¿Dónde juegas el Retroceso (Hiki) para capturar F7 sin permitir contra-atari?',
      boardSize: 9,
      initialStones: [
        { x: 5, y: 3, color: 'BLACK' },
        { x: 4, y: 2, color: 'BLACK' },
        { x: 6, y: 2, color: 'BLACK' },
        { x: 3, y: 3, color: 'BLACK' },
        { x: 5, y: 2, color: 'WHITE' },
        { x: 6, y: 3, color: 'WHITE' },
        { x: 6, y: 4, color: 'WHITE' },
      ],
      turn: 'BLACK',
      exerciseType: 'PLACE_STONE',
      validCoords: [{ x: 5, y: 4 }],
      correctFeedback:
        '¡Dominado! El Retroceso (Hiki) en F5 protege F6 y deja la piedra blanca F7 muerta en el acto.',
      wrongFeedback: {
        '5,1': 'Si das atari en F8, Blanco juega F5 en contra-atari sobre F6.',
      },
      defaultWrongFeedback: 'Retrocede tu piedra F6 hacia abajo jugando en F5 (x=5, y=4).',
      hints: [
        'Evita dar atari en F8.',
        'Juega en F5 (x=5, y=4).',
      ],
    },
  },

  // ============================================================================
  // LECCIÓN 35 (Etapa 11 · Unidad 3 — Nivel Avanzado): Crear Forma y Conducción Oikomi (Davies Cap. 13)
  // ============================================================================
  {
    id: 'lesson-35-crear-forma-contra-hane-conduccion',
    stageNumber: 11,
    stageTitle: '11. Yose y cálculo de final',
    unitNumber: 3,
    unitTitle: 'Crear Forma (Sabaki), Contra-Hane y Tesuji de Conducción Oikomi',
    title: 'Crear Forma: Contra-Hane, Uso de Piedras Muertas y Conducción',
    subtitle:
      'Aprende el Capítulo 13 de "Tesuji" («Making Shape»): cómo rebelarte contra la presión enemiga con el Contra-Hane y cómo conducir al rival hacia la falta de libertades mediante el Oikomi.',
    estimatedMinutes: 9,
    xpReward: 45,
    prerequisites: ['lesson-19-yose-sente-doble-gote'],
    relatedPuzzleIds: [
      'puzzle-44-defensa-contacto-tsuke',
      'puzzle-45-defensa-golpe-hombro',
      'puzzle-54-exprimir-shibori-esquina',
    ],
    observableObjective:
      'Al terminar, podrás usar el Contra-Hane para evitar formas sumisas y aplicar el Tesuji de Conducción (Oikomi) para obligar al rival a quedarse sin libertades.',
    activationQuestion: {
      question:
        'En el Capítulo 13 de "Tesuji", cuando el oponente te hace un Hane intentando aplastar la cabeza de tus piedras, ¿cuándo es efectivo responder con un Contra-Hane (Kaeshi-bane)?',
      options: [
        {
          id: 'a',
          text: 'Cuando la piedra con la que el rival hizo hane deja un punto de corte detrás que puedes explotar para tomar la iniciativa y crear forma',
          isCorrect: true,
          explanation:
            '¡Exacto! En lugar de retroceder sumisamente cada vez que te hacen hane, el Contra-Hane corta o amenaza la piedra agresora para desplegar tus piedras con elasticidad.',
        },
        {
          id: 'b',
          text: 'Nunca; siempre hay que extender pasivamente hacia atrás',
          isCorrect: false,
          explanation:
            'Extender pasivamente cuando el rival tiene defectos de corte suele dejarte encerrado y pesado.',
        },
        {
          id: 'c',
          text: 'Solo cuando tienes 10 piedras conectadas en línea',
          isCorrect: false,
          explanation:
            'El Contra-Hane se usa precisamente con grupos pequeños de 2 o 3 piedras para crear forma rápida (Sabaki).',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. El Contra-Hane (Kaeshi-bane) para negarse a ser aplastado',
        body: 'Si Blanco empuja y luego te hace Hane para doblar la cabeza de tu grupo, observa si su piedra de hane quedó desconectada de su cuerpo principal. Si es así, el Contra-Hane golpea inmediatamente el punto de corte detrás de esa piedra, obligando a Blanco a ceder y dándote una forma amplia y elástica.',
        deepDive:
          'Davies enseña también a «usar piedras muertas»: incluso una piedra tuya que no puede escapar sirve para amenazar un atari que te regale dos jugadas gratis para hacer ojos.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 4, color: 'BLACK' },
            { x: 2, y: 5, color: 'BLACK' },
            { x: 3, y: 3, color: 'WHITE' },
            { x: 4, y: 3, color: 'WHITE' },
            { x: 5, y: 4, color: 'WHITE' },
          ],
          markers: [{ x: 5, y: 3, type: 'SUCCESS', label: '1' }],
          caption: 'El Contra-Hane y corte en F6 castiga el hane blanco de F5.',
        },
      },
      {
        title: '2. El Tesuji de Conducción (Oikomi)',
        body: 'El Tesuji de Conducción (Oikomi) es una jugada que amenaza simultáneamente cortar o capturar y que "conduce" a las piedras enemigas a avanzar hacia una casilla donde pierden sus propias libertades (Damezumari).',
        deepDive:
          'En lugar de defender pasivamente tu piedra amenazada, golpeas la libertad clave exterior del grupo atacante para que no pueda dar atari.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 2, y: 2, color: 'BLACK' },
            { x: 3, y: 1, color: 'BLACK' },
            { x: 3, y: 3, color: 'BLACK' },
            { x: 5, y: 2, color: 'BLACK' },
            { x: 5, y: 3, color: 'BLACK' },
            { x: 3, y: 2, color: 'WHITE' },
            { x: 4, y: 2, color: 'WHITE' },
            { x: 4, y: 3, color: 'WHITE' },
            { x: 2, y: 3, color: 'WHITE' },
          ],
          markers: [{ x: 4, y: 1, type: 'SUCCESS', label: '★' }],
          caption: 'El golpe en E8 (Oikomi) conduce a las tres piedras blancas a una falta mortal de libertades.',
        },
      },
    ],
    demonstration: {
      title: 'Demostración: Contra-Hane y Conducción (Oikomi)',
      size: 9,
      steps: [
        {
          title: '1. Blanco hace un hane agresivo en F5',
          narration:
            'Blanco juega F5 para presionar a las piedras negras D5–E5, pero dejó el punto F6 sin proteger.',
          stones: [
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 4, color: 'BLACK' },
            { x: 2, y: 5, color: 'BLACK' },
            { x: 3, y: 3, color: 'WHITE' },
            { x: 4, y: 3, color: 'WHITE' },
            { x: 5, y: 4, color: 'WHITE' },
          ],
          turn: 'BLACK',
        },
        {
          title: '2. Negro responde con Contra-Hane en F6',
          narration:
            'Negro corta y hace contra-hane en F6 (x=5, y=3), separando F5 de D6–E6 y tomando el control de la lucha.',
          stones: [
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 4, color: 'BLACK' },
            { x: 2, y: 5, color: 'BLACK' },
            { x: 3, y: 3, color: 'WHITE' },
            { x: 4, y: 3, color: 'WHITE' },
            { x: 5, y: 4, color: 'WHITE' },
            { x: 5, y: 3, color: 'BLACK' },
          ],
          lastMove: { x: 5, y: 3 },
          markers: [{ x: 5, y: 3, type: 'SUCCESS', label: '!' }],
          turn: 'WHITE',
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l35-gd-1',
        prompt:
          'Blanco acaba de hacer hane en F5 contra tus piedras D5–E5. Ejecuta el Contra-Hane cortando en el punto débil de Blanco.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 4, color: 'BLACK' },
          { x: 4, y: 4, color: 'BLACK' },
          { x: 2, y: 5, color: 'BLACK' },
          { x: 3, y: 3, color: 'WHITE' },
          { x: 4, y: 3, color: 'WHITE' },
          { x: 5, y: 4, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 5, y: 3 }],
        correctFeedback:
          '¡Contra-Hane impecable en F6! Cortas la piedra blanca F5 y evitas quedar comprimido.',
        wrongFeedback: {
          '4,5': 'Retroceder en E4 es sumiso y permite a Blanco conectar en F6 dominando el centro.',
        },
        defaultWrongFeedback: 'Corta con Contra-Hane jugando en F6 (x=5, y=3).',
        hints: [
          'Mira el punto de corte entre E6 y F5.',
          'Juega en F6 (x=5, y=3).',
        ],
      },
    ],
    independentPractice: [
      {
        id: 'l35-ip-1',
        prompt:
          'Ejercicio 1 (Tesuji de Conducción / Oikomi): Las piedras blancas D7–E7–E6 amenazan capturar D6. Juega el Oikomi en la cabeza blanca para dejarlas en Damezumari.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 2, color: 'BLACK' },
          { x: 3, y: 1, color: 'BLACK' },
          { x: 3, y: 3, color: 'BLACK' },
          { x: 5, y: 2, color: 'BLACK' },
          { x: 5, y: 3, color: 'BLACK' },
          { x: 3, y: 2, color: 'WHITE' },
          { x: 4, y: 2, color: 'WHITE' },
          { x: 4, y: 3, color: 'WHITE' },
          { x: 2, y: 3, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 1 }],
        correctFeedback:
          '¡Oikomi perfecto en E8! El grupo blanco queda con solo dos libertades y no puede atacar D6.',
        wrongFeedback: {
          '3,4': 'Si defiendes pasivamente en D5, Blanco juega E8 y escapa con cuatro libertades.',
        },
        defaultWrongFeedback: 'Golpea la libertad superior del grupo blanco jugando en E8 (x=4, y=1).',
        hints: [
          'En vez de mover D6, quita la libertad clave de D7–E7.',
          'Juega en E8 (x=4, y=1).',
        ],
      },
      {
        id: 'l35-ip-2',
        prompt:
          'Ejercicio 2 (Golpear debajo para hacer forma, Davies Cap. 13): Haz contacto en la segunda línea para asegurar la base y conexión de tus piedras.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 2, color: 'BLACK' },
          { x: 6, y: 2, color: 'BLACK' },
          { x: 3, y: 2, color: 'WHITE' },
          { x: 5, y: 2, color: 'WHITE' },
          { x: 4, y: 3, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 1 }],
        correctFeedback:
          '¡Excelente tesuji de forma en E8! Conectas por debajo de las piedras blancas en miai entre D8 y F8.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Juega en el punto simétrico de la segunda línea: E8 (x=4, y=1).',
        hints: [
          'Busca el punto en la segunda línea que amenaza conectar tanto con C7 como con G7.',
          'Juega en E8 (x=4, y=1).',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'El Contra-Hane (Kaeshi-bane) castiga el hane rival cuando éste deja un punto de corte descubierto.',
        'El Tesuji de Conducción (Oikomi) quita la libertad clave exterior obligando al enemigo a entrar en Damezumari.',
        'Golpear en el punto simétrico de la segunda línea permite conectar por debajo o crear ojos con rapidez.',
      ],
      vocabulary: [
        {
          term: 'Kaeshi-bane (Contra-Hane)',
          japanese: '返しバネ',
          definition: 'Responder inmediatamente al hane del oponente con otro hane que explota su defecto de corte.',
        },
        {
          term: 'Oikomi (Conducción)',
          japanese: '追い込み',
          definition: 'Jugada táctica que dirige al grupo enemigo hacia una falta fatal de libertades.',
        },
      ],
    },
    transferQuestion: {
      id: 'l35-tq-1',
      prompt:
        'Pregunta de transferencia: Blanco hizo hane en D5 contra tus piedras E5–F5 dejando D6 vulnerable. ¿Dónde juegas el Contra-Hane?',
      boardSize: 9,
      initialStones: [
        { x: 4, y: 4, color: 'BLACK' },
        { x: 5, y: 4, color: 'BLACK' },
        { x: 6, y: 5, color: 'BLACK' },
        { x: 4, y: 3, color: 'WHITE' },
        { x: 5, y: 3, color: 'WHITE' },
        { x: 3, y: 4, color: 'WHITE' },
      ],
      turn: 'BLACK',
      exerciseType: 'PLACE_STONE',
      validCoords: [{ x: 3, y: 3 }],
      correctFeedback:
        '¡Dominado! El Contra-Hane en D6 corta la piedra blanca D5 y toma el mando de la pelea.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Juega el Contra-Hane en D6 (x=3, y=3).',
      hints: [
        'Mira el punto de corte justo encima de D5.',
        'Juega en D6 (x=3, y=3).',
      ],
    },
  },

  // ============================================================================
  // LECCIÓN 36 (Etapa 12 · Unidad 3 — Nivel Avanzado): Ko Indirecto y Doble Amenaza (Davies Cap. 4, 15 y 16)
  // ============================================================================
  {
    id: 'lesson-36-ko-indirecto-doble-amenaza-maestria',
    stageNumber: 12,
    stageTitle: '12. Maestría y revisión de partidas',
    unitNumber: 3,
    unitTitle: 'Ko Indirecto, Ko de Mil Años y Tesuji de Doble Amenaza',
    title: 'Maestría en Tesuji: Ko de Dos Etapas, Ko de Mil Años y Doble Amenaza',
    subtitle:
      'Culmina la Academia con los Capítulos 4, 15 y 16 de "Tesuji" (James Davies): cómo forzar el mejor Ko mediante Throw-in, distinguir el Ko de Dos Etapas y el Ko de Mil Años, y encontrar el Tesuji de Doble Amenaza.',
    estimatedMinutes: 10,
    xpReward: 50,
    prerequisites: ['lesson-24-ataque-mayor-escala-sondas'],
    relatedPuzzleIds: [
      'puzzle-57-el-mejor-ko-throwin',
      'puzzle-42-hanami-ko-picnic',
      'puzzle-48-sonda-flexible',
    ],
    observableObjective:
      'Al terminar, podrás usar el Throw-in en la primera línea para obtener el mejor Ko posible, comprenderás el Ko de Dos Etapas (Nidan-ko) y el Ko de Mil Años (Sennen-ko), y ejecutarás el Tesuji de Doble Amenaza.',
    activationQuestion: {
      question:
        'En el Capítulo 15 de "Tesuji" («Indirect Ko»), ¿qué caracteriza a un Ko de Mil Años (Sennen-ko) en una carrera de captura en el borde?',
      options: [
        {
          id: 'a',
          text: 'Ninguno de los dos jugadores quiere iniciar el Ko primero porque quien lo inicia se pone en desventaja, por lo que a menudo se resuelve en Seki si nadie tiene exceso de amenazas',
          isCorrect: true,
          explanation:
            '¡Exacto! En el Ko de Mil Años (Sennen-ko), el jugador que da el primer paso para iniciar el Ko regala la primera captura al rival o le permite hacer Seki.',
        },
        {
          id: 'b',
          text: 'Es un Ko que dura obligatoriamente 1000 jugadas por reglamento',
          isCorrect: false,
          explanation:
            'El nombre es poético: alude a que la posición puede permanecer latente durante toda la partida sin que nadie quiera tocarla.',
        },
        {
          id: 'c',
          text: 'Es un Ko donde está permitido recapturar sin hacer amenazas',
          isCorrect: false,
          explanation:
            'La regla de prohibición de recaptura inmediata se aplica a todos los Kos.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. Obtener el Mejor Ko (Cap. 4) y Ko Indirecto: Dos Etapas y Mil Años (Cap. 15)',
        body: 'En el Capítulo 4 («Getting the Best Ko»), Davies demuestra que antes de resignarse a que el rival viva o a jugar un Ko desfavorable, insertar un Throw-in (Hourikomi) en la primera línea suele darte un Ko donde tú capturas primero. Y en el Capítulo 15 distingue el Ko Directo del Ko de Dos Etapas (donde hay que ganar dos Kos seguidos) y del Ko de Mil Años (Sennen-ko).',
        deepDive:
          'Si tienes dos caminos hacia un Ko, elige siempre aquel donde sea el oponente quien deba buscar la primera amenaza de Ko.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 0, y: 1, color: 'WHITE' },
            { x: 1, y: 1, color: 'WHITE' },
            { x: 2, y: 1, color: 'WHITE' },
            { x: 2, y: 0, color: 'WHITE' },
            { x: 0, y: 2, color: 'BLACK' },
            { x: 1, y: 2, color: 'BLACK' },
            { x: 2, y: 2, color: 'BLACK' },
            { x: 3, y: 1, color: 'BLACK' },
            { x: 3, y: 0, color: 'BLACK' },
          ],
          markers: [{ x: 1, y: 0, type: 'SUCCESS', label: 'Ko' }],
          caption: 'El golpe en B9 destruye el segundo ojo blanco en el rincón y fuerza el combate decisivo.',
        },
      },
      {
        title: '2. El Tesuji de Doble Amenaza (Capítulo 16)',
        body: 'En el capítulo final de "Tesuji", Davies presenta los problemas más bellos del Go: posiciones donde dos grupos o debilidades parecen independientes, pero existe una única intersección en el tablero que lanza una Doble Amenaza simultánea contra ambos.',
        deepDive:
          'Cuando un problema táctico parece imposible atacando de frente, amplía tu mirada a todo el cuadrante: la jugada correcta suele ser un punto de coordinación entre dos frentes.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 2, color: 'WHITE' },
            { x: 5, y: 2, color: 'WHITE' },
            { x: 2, y: 4, color: 'WHITE' },
            { x: 3, y: 5, color: 'WHITE' },
            { x: 2, y: 2, color: 'BLACK' },
            { x: 2, y: 3, color: 'BLACK' },
            { x: 4, y: 4, color: 'BLACK' },
            { x: 5, y: 3, color: 'BLACK' },
          ],
          markers: [{ x: 3, y: 3, type: 'SUCCESS', label: '★' }],
          caption: 'La Doble Amenaza en D6 amenaza cortar en E7 arriba y capturar C5 a la izquierda.',
        },
      },
    ],
    demonstration: {
      title: 'Demostración: Destrucción de ojos en primera línea y Doble Amenaza',
      size: 9,
      steps: [
        {
          title: '1. Blanco está a punto de formar dos ojos en B9',
          narration:
            'Si Blanco juega en B9, tendrá dos ojos independientes en A9 y C9. Negro debe golpear el punto vital antes.',
          stones: [
            { x: 0, y: 1, color: 'WHITE' },
            { x: 1, y: 1, color: 'WHITE' },
            { x: 2, y: 1, color: 'WHITE' },
            { x: 2, y: 0, color: 'WHITE' },
            { x: 0, y: 2, color: 'BLACK' },
            { x: 1, y: 2, color: 'BLACK' },
            { x: 2, y: 2, color: 'BLACK' },
            { x: 3, y: 1, color: 'BLACK' },
            { x: 3, y: 0, color: 'BLACK' },
          ],
          turn: 'BLACK',
        },
        {
          title: '2. Negro golpea en B9 en la primera línea',
          narration:
            'Al colocar en B9 (x=1, y=0), Negro reduce el espacio ocular a un solo ojo y fuerza el Ko o la captura del rincón.',
          stones: [
            { x: 0, y: 1, color: 'WHITE' },
            { x: 1, y: 1, color: 'WHITE' },
            { x: 2, y: 1, color: 'WHITE' },
            { x: 2, y: 0, color: 'WHITE' },
            { x: 0, y: 2, color: 'BLACK' },
            { x: 1, y: 2, color: 'BLACK' },
            { x: 2, y: 2, color: 'BLACK' },
            { x: 3, y: 1, color: 'BLACK' },
            { x: 3, y: 0, color: 'BLACK' },
            { x: 1, y: 0, color: 'BLACK' },
          ],
          lastMove: { x: 1, y: 0 },
          markers: [{ x: 1, y: 0, type: 'SUCCESS', label: '!' }],
          turn: 'WHITE',
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l36-gd-1',
        prompt:
          'Blanco amenaza vivir en el rincón superior izquierdo jugando en B9. Golpea el punto vital de la primera línea para destruir sus dos ojos.',
        boardSize: 9,
        initialStones: [
          { x: 0, y: 1, color: 'WHITE' },
          { x: 1, y: 1, color: 'WHITE' },
          { x: 2, y: 1, color: 'WHITE' },
          { x: 2, y: 0, color: 'WHITE' },
          { x: 0, y: 2, color: 'BLACK' },
          { x: 1, y: 2, color: 'BLACK' },
          { x: 2, y: 2, color: 'BLACK' },
          { x: 3, y: 1, color: 'BLACK' },
          { x: 3, y: 0, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 1, y: 0 }],
        correctFeedback:
          '¡Golpe maestro en B9! Impides que Blanco divida su espacio en dos ojos.',
        wrongFeedback: {
          '0,0': 'Si juegas en A9 primero, Blanco responde en B9 y vive con dos ojos.',
        },
        defaultWrongFeedback: 'Coloca tu piedra en el punto vital B9 (x=1, y=0).',
        hints: [
          'Recuerda que el punto donde el rival haría dos ojos es también tu punto vital de ataque.',
          'Juega en B9 (x=1, y=0).',
        ],
      },
    ],
    independentPractice: [
      {
        id: 'l36-ip-1',
        prompt:
          'Ejercicio 1 (Tesuji de Doble Amenaza, Davies Cap. 16): Encuentra la jugada central que amenaza simultáneamente cortar las piedras blancas superiores en E7 y atrapar C5.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 2, color: 'WHITE' },
          { x: 5, y: 2, color: 'WHITE' },
          { x: 2, y: 4, color: 'WHITE' },
          { x: 3, y: 5, color: 'WHITE' },
          { x: 2, y: 2, color: 'BLACK' },
          { x: 2, y: 3, color: 'BLACK' },
          { x: 4, y: 4, color: 'BLACK' },
          { x: 5, y: 3, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 3, y: 3 }],
        correctFeedback:
          '¡Doble Amenaza brillante en D6! Blanco no puede defender a la vez el corte superior en E7 y la piedra C5.',
        wrongFeedback: {
          '4,2': 'Cortar directo en E7 permite a Blanco dar atari en D6 y salvar C5 con ventaja.',
        },
        defaultWrongFeedback: 'Juega en la encrucijada central D6 (x=3, y=3).',
        hints: [
          'Busca el punto que conecta tus grupos y amenaza tanto el norte (E7) como el oeste (C5).',
          'Juega en D6 (x=3, y=3).',
        ],
      },
      {
        id: 'l36-ip-2',
        prompt:
          'Ejercicio 2 (Throw-in para forzar falta de libertades en el borde): Lanza el sacrificio en la primera línea derecha para destruir el ojo de las piedras blancas.',
        boardSize: 9,
        initialStones: [
          { x: 6, y: 1, color: 'BLACK' },
          { x: 6, y: 2, color: 'BLACK' },
          { x: 6, y: 3, color: 'BLACK' },
          { x: 7, y: 3, color: 'BLACK' },
          { x: 8, y: 3, color: 'BLACK' },
          { x: 7, y: 0, color: 'WHITE' },
          { x: 7, y: 1, color: 'WHITE' },
          { x: 7, y: 2, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 8, y: 1 }],
        correctFeedback:
          '¡Lectura digna de un Dan! Con J8 (x=8, y=1) destruyes el espacio ocular de Blanco en la primera línea.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Golpea el punto vital de la primera línea derecha: J8 (x=8, y=1).',
        hints: [
          'Mira la columna J junto a H8.',
          'Juega en J8 (x=8, y=1).',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'El Throw-in (Hourikomi) en la primera línea permite transformar una vida enemiga en Ko o un Ko desfavorable en un Ko favorable.',
        'El Ko de Dos Etapas (Nidan-ko) y el Ko de Mil Años (Sennen-ko) exigen evaluar quién lleva la carga de las amenazas antes de iniciar la pelea.',
        'El Tesuji de Doble Amenaza coordina dos objetivos tácticos distantes mediante una sola jugada central.',
      ],
      vocabulary: [
        {
          term: 'Nidan-ko (Ko de Dos Etapas)',
          japanese: '二段コウ',
          definition: 'Combate donde es necesario ganar dos Kos consecutivos para decidir la vida o captura del grupo.',
        },
        {
          term: 'Sennen-ko (Ko de Mil Años)',
          japanese: '千年コウ',
          definition: 'Posición en la que iniciar el Ko perjudica a quien mueve primero, derivando a menudo en Seki.',
        },
      ],
    },
    transferQuestion: {
      id: 'l36-tq-1',
      prompt:
        'Pregunta de transferencia final: Blanco busca hacer dos ojos en el borde superior derecho jugando en H9. ¿Dónde colocas tu piedra para destruir sus ojos?',
      boardSize: 9,
      initialStones: [
        { x: 8, y: 1, color: 'WHITE' },
        { x: 7, y: 1, color: 'WHITE' },
        { x: 6, y: 1, color: 'WHITE' },
        { x: 6, y: 0, color: 'WHITE' },
        { x: 8, y: 2, color: 'BLACK' },
        { x: 7, y: 2, color: 'BLACK' },
        { x: 6, y: 2, color: 'BLACK' },
        { x: 5, y: 1, color: 'BLACK' },
        { x: 5, y: 0, color: 'BLACK' },
      ],
      turn: 'BLACK',
      exerciseType: 'PLACE_STONE',
      validCoords: [{ x: 7, y: 0 }],
      correctFeedback:
        '¡Graduación completada! Con H9 (x=7, y=0) arrebatas el punto vital de la esquina y culminas las 36 lecciones de la Academia.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Juega en el punto vital de la primera línea: H9 (x=7, y=0).',
      hints: [
        'Ocupa el punto simétrico de la primera línea en H9.',
        'Juega en H9 (x=7, y=0).',
      ],
    },
  },
];
