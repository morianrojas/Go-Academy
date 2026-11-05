import { LessonContent } from '../types/go';

/**
 * Parte 1 de las Nuevas Lecciones de "Tesuji" (Elementary Go Series, Vol. 3) de James Davies
 * Lecciones 25 a 30 (4 de Nivel Básico + 2 de Nivel Intermedio)
 * Sin repetir temas previos; cada lección incluye ejercicios interactivos en el tablero dinámico.
 */
export const TESUJI_LESSONS_PART1_CATALOG: LessonContent[] = [
  // ============================================================================
  // LECCIÓN 25 (Etapa 1 · Unidad 4 — Nivel Básico): Lectura Táctica en Árbol (Davies Cap. 1)
  // ============================================================================
  {
    id: 'lesson-25-lectura-tactica-arbol',
    stageNumber: 1,
    stageTitle: '1. Reglas esenciales',
    unitNumber: 4,
    unitTitle: 'El método de lectura táctica en árbol y orden de jugadas',
    title: 'Lectura Táctica: El Árbol Mental y el Orden de Jugadas',
    subtitle:
      'Aprende el método del Capítulo 1 de "Tesuji" (James Davies): definir un objetivo claro antes de leer, revisar variantes de atrás hacia adelante y alterar el orden de jugadas.',
    estimatedMinutes: 8,
    xpReward: 30,
    prerequisites: ['lesson-5-regla-ko-amenazas'],
    relatedPuzzleIds: ['puzzle-57-el-mejor-ko-throwin', 'puzzle-49-tesuji-caballo-captura'],
    observableObjective:
      'Al terminar, aplicarás la lectura con propósito, descartarás variantes fallidas retrocediendo desde el final de la secuencia y explotarás la falta de libertades (Damezumari) en el borde.',
    activationQuestion: {
      question:
        'Según James Davies en el Capítulo 1 ("Reading"), ¿cuál es el primer principio fundamental antes de empezar a calcular secuencias en tu cabeza?',
      options: [
        {
          id: 'a',
          text: 'Definir un propósito táctico claro (capturar, cortar, enlazar o vivir) antes de buscar la jugada',
          isCorrect: true,
          explanation:
            '¡Exacto! Davies explica: «La táctica debe servir a la estrategia. Empieza preguntándote qué quieres lograr en la posición y luego busca la secuencia que lo consigue».',
        },
        {
          id: 'b',
          text: 'Probar jugadas al azar diciendo «me pregunto qué pasa si juego aquí» sin meta fija',
          isCorrect: false,
          explanation:
            'Davies advierte que no hay peor forma de perder tiempo que trazar secuencias sin rumbo ni objetivo definido.',
        },
        {
          id: 'c',
          text: 'Colocar primero la piedra en el tablero y pensar después según responda el rival',
          isCorrect: false,
          explanation:
            'Un buen jugador lee el problema en su mente antes de tocar el tablero («mira antes de saltar»).',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. Leer con propósito y retroceder desde el final del árbol',
        body: 'Con el objetivo claro en mente, la lectura consiste en recorrer un árbol mental de jugadas: empiezas por la jugada obvia y la respuesta obvia del rival. Si la secuencia falla, cambias la última jugada de tu bando; si todas fallan ahí, retrocedes un paso hacia el inicio de la secuencia.',
        deepDive:
          'Davies subraya que trabajar desde el final hacia el frente de la secuencia («from the back toward the front») evita saltar ramas intermedias o dejar respuestas fuertes del oponente sin revisar.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 6, y: 2, color: 'BLACK' },
            { x: 7, y: 2, color: 'BLACK' },
            { x: 6, y: 3, color: 'BLACK' },
            { x: 6, y: 4, color: 'BLACK' },
            { x: 6, y: 5, color: 'BLACK' },
            { x: 6, y: 6, color: 'BLACK' },
            { x: 7, y: 3, color: 'WHITE' },
            { x: 7, y: 4, color: 'WHITE' },
            { x: 7, y: 5, color: 'WHITE' },
            { x: 7, y: 6, color: 'WHITE' },
            { x: 8, y: 6, color: 'WHITE' },
          ],
          markers: [
            { x: 8, y: 4, type: 'SUCCESS', label: '1' },
            { x: 8, y: 3, type: 'CIRCLE', label: 'a' },
          ],
          caption:
            'Inspirado en Davies Cap. 1 (Dia. 20): leer un paso más en la primera línea (J5) destruye los ojos de Blanco por falta de libertades.',
        },
      },
      {
        title: '2. Reexaminar secuencias «casi exitosas» y guardar amenazas',
        body: 'Cuando una secuencia casi funciona pero falla por un detalle al final, no la descartes por completo: a menudo basta cambiar el orden de dos jugadas o añadir un golpe que provoque falta de libertades (Damezumari). Además, si la posición no es urgente, reservar la secuencia leída sirve como valiosa amenaza de Ko.',
        deepDive:
          'En una partida profesional, las 200 jugadas colocadas en el tablero son solo la punta visible de un iceberg de secuencias leídas y guardadas en reserva.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 7, y: 3, color: 'WHITE' },
            { x: 7, y: 4, color: 'WHITE' },
            { x: 7, y: 5, color: 'WHITE' },
            { x: 6, y: 2, color: 'BLACK' },
            { x: 7, y: 2, color: 'BLACK' },
            { x: 6, y: 3, color: 'BLACK' },
            { x: 6, y: 4, color: 'BLACK' },
            { x: 6, y: 5, color: 'BLACK' },
            { x: 6, y: 6, color: 'BLACK' },
            { x: 7, y: 6, color: 'BLACK' },
          ],
          markers: [{ x: 8, y: 4, type: 'SUCCESS', label: '★' }],
          caption:
            'El golpe en J5 impide que Blanco forme dos ojos en el borde y no puede ser capturado.',
        },
      },
    ],
    demonstration: {
      title: 'Demostración: De una lectura incompleta a la refutación definitiva (Davies Cap. 1)',
      size: 9,
      steps: [
        {
          title: '1. El problema en el borde derecho',
          narration:
            'Las piedras blancas en la columna H buscan sobrevivir formando ojos en la columna J. Negro quiere impedir que vivan.',
          stones: [
            { x: 6, y: 2, color: 'BLACK' },
            { x: 7, y: 2, color: 'BLACK' },
            { x: 6, y: 3, color: 'BLACK' },
            { x: 6, y: 4, color: 'BLACK' },
            { x: 6, y: 5, color: 'BLACK' },
            { x: 6, y: 6, color: 'BLACK' },
            { x: 7, y: 6, color: 'BLACK' },
            { x: 7, y: 3, color: 'WHITE' },
            { x: 7, y: 4, color: 'WHITE' },
            { x: 7, y: 5, color: 'WHITE' },
          ],
          turn: 'BLACK',
        },
        {
          title: '2. El golpe decisivo en el punto vital J5',
          narration:
            'Negro coloca su piedra en J5 (x=8, y=4). Blanco no puede dar atari en J6 ni J4 sin quedarse él mismo con una sola libertad.',
          stones: [
            { x: 6, y: 2, color: 'BLACK' },
            { x: 7, y: 2, color: 'BLACK' },
            { x: 6, y: 3, color: 'BLACK' },
            { x: 6, y: 4, color: 'BLACK' },
            { x: 6, y: 5, color: 'BLACK' },
            { x: 6, y: 6, color: 'BLACK' },
            { x: 7, y: 6, color: 'BLACK' },
            { x: 7, y: 3, color: 'WHITE' },
            { x: 7, y: 4, color: 'WHITE' },
            { x: 7, y: 5, color: 'WHITE' },
            { x: 8, y: 4, color: 'BLACK' },
          ],
          lastMove: { x: 8, y: 4 },
          markers: [{ x: 8, y: 4, type: 'SUCCESS', label: '!' }],
          turn: 'WHITE',
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l25-gd-1',
        prompt:
          'Blanco tiene tres piedras atrapadas en H6–H5–H4. Juega en el punto vital de la primera línea derecha para robar su forma de dos ojos.',
        boardSize: 9,
        initialStones: [
          { x: 6, y: 2, color: 'BLACK' },
          { x: 7, y: 2, color: 'BLACK' },
          { x: 6, y: 3, color: 'BLACK' },
          { x: 6, y: 4, color: 'BLACK' },
          { x: 6, y: 5, color: 'BLACK' },
          { x: 6, y: 6, color: 'BLACK' },
          { x: 7, y: 6, color: 'BLACK' },
          { x: 7, y: 3, color: 'WHITE' },
          { x: 7, y: 4, color: 'WHITE' },
          { x: 7, y: 5, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 8, y: 4 }],
        correctFeedback:
          '¡Lectura exacta en J5! Blanco no puede dividir su espacio ni capturar tu piedra por falta de libertades.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Ocupa el punto central de simetría en la primera línea derecha (J5).',
        hints: [
          'Mira las tres intersecciones vacías junto a Blanco en la columna J (J6, J5, J4).',
          'Juega en J5 (x=8, y=4).',
        ],
      },
    ],
    independentPractice: [
      {
        id: 'l25-prac-1',
        prompt:
          'Ejercicio 1: Blanco intenta conectar sus piedras del borde superior jugando en E8. Corta e impide su conexión jugando en el punto clave de primera línea.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 1, color: 'BLACK' },
          { x: 3, y: 2, color: 'BLACK' },
          { x: 4, y: 2, color: 'BLACK' },
          { x: 5, y: 2, color: 'BLACK' },
          { x: 5, y: 1, color: 'BLACK' },
          { x: 4, y: 1, color: 'WHITE' },
          { x: 2, y: 0, color: 'WHITE' },
          { x: 6, y: 0, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 0 }],
        correctFeedback:
          '¡Muy bien! Al jugar en E9 dejas a la piedra blanca de E8 en atari e impides que conecte con C9 o G9.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Quita la última libertad de la piedra blanca E8 jugando en E9.',
        hints: [
          'La piedra blanca en E8 solo tiene una libertad arriba.',
          'Juega en E9 (x=4, y=0).',
        ],
      },
      {
        id: 'l25-prac-2',
        prompt:
          'Ejercicio 2: Antes de dar atari por fuera, lee el orden correcto: conecta tus dos grupos negros en E5 para dejar a las piedras blancas sin contrajuego.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 4, color: 'BLACK' },
          { x: 4, y: 3, color: 'BLACK' },
          { x: 5, y: 4, color: 'BLACK' },
          { x: 3, y: 3, color: 'WHITE' },
          { x: 4, y: 5, color: 'WHITE' },
          { x: 5, y: 5, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 4 }],
        correctFeedback:
          '¡Orden impecable! Al conectar primero en E5 tus tres piedras forman un muro sólido de 6 libertades.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Une tus tres piedras negras jugando en el centro E5.',
        hints: [
          'Si das atari afuera, Blanco cortará en E5.',
          'Juega en E5 (x=4, y=4).',
        ],
      },
      {
        id: 'l25-prac-3',
        prompt:
          'Ejercicio 3: Blanco amenaza con enlazar por debajo en D1 o cortar en D2. Encuentra la jugada única que resuelve ambas amenazas a la vez.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 7, color: 'BLACK' },
          { x: 2, y: 6, color: 'BLACK' },
          { x: 3, y: 6, color: 'BLACK' },
          { x: 4, y: 6, color: 'BLACK' },
          { x: 4, y: 7, color: 'WHITE' },
          { x: 5, y: 7, color: 'WHITE' },
          { x: 1, y: 7, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 3, y: 7 }, { x: 3, y: 8 }],
        correctFeedback:
          '¡Excelente lectura defensiva! Bloqueas el paso de Blanco en la columna D y aseguras tu grupo.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Juega en D2 (x=3, y=7) o D1 (x=3, y=8) para cortar el enlace blanco.',
        hints: [
          'Blanco quiere unir E2 con B2 pasando por la columna D.',
          'Juega en D2 (x=3, y=7).',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'Empieza toda lectura definiendo primero qué objetivo táctico necesitas lograr en la posición.',
        'Cuando una variante falla, retrocede desde el final hacia el principio del árbol mental para encontrar mejores jugadas.',
        'Si una secuencia casi funciona, prueba cambiar el orden de jugadas; y si no es urgente, guárdala como amenaza de Ko.',
      ],
      vocabulary: [
        {
          term: 'Yomi (Lectura)',
          japanese: '読み',
          definition: 'Cálculo mental sistemático de secuencias y variantes antes de colocar una piedra.',
        },
        {
          term: 'Damezumari (Falta de libertades)',
          japanese: 'ダメヅマリ',
          definition: 'Escasez crítica de libertades que impide a un grupo cortar o resistir porque quedaría en auto-atari.',
        },
      ],
    },
    transferQuestion: {
      id: 'l25-transfer',
      prompt:
        'Pregunta de transferencia: Blanco intenta separar tus piedras en el borde derecho. Juega el tesuji en J5 que protege tu conexión y deja a Blanco sin poder cortar por falta de libertades.',
      boardSize: 9,
      initialStones: [
        { x: 7, y: 3, color: 'WHITE' },
        { x: 7, y: 4, color: 'WHITE' },
        { x: 7, y: 5, color: 'WHITE' },
        { x: 7, y: 6, color: 'WHITE' },
        { x: 8, y: 6, color: 'WHITE' },
        { x: 6, y: 2, color: 'BLACK' },
        { x: 7, y: 2, color: 'BLACK' },
        { x: 6, y: 3, color: 'BLACK' },
        { x: 6, y: 4, color: 'BLACK' },
        { x: 6, y: 5, color: 'BLACK' },
        { x: 6, y: 6, color: 'BLACK' },
        { x: 6, y: 7, color: 'BLACK' },
        { x: 7, y: 7, color: 'BLACK' },
      ],
      turn: 'BLACK',
      exerciseType: 'PLACE_STONE',
      validCoords: [{ x: 8, y: 4 }, { x: 8, y: 3 }],
      correctFeedback:
        '¡Dominado! Has aplicado la lectura profunda del Capítulo 1 de Davies para destruir el grupo blanco en el borde.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Golpea el punto vital de la primera línea derecha en J5 (x=8, y=4).',
      hints: [
        'Recuerda el Diagrama 20 del Capítulo 1 de Davies.',
        'Juega en J5 (x=8, y=4).',
      ],
    },
  },

  // ============================================================================
  // LECCIÓN 26 (Etapa 2 · Unidad 4 — Nivel Básico): Piedras de Corte y Escalera Floja (Davies Cap. 2)
  // ============================================================================
  {
    id: 'lesson-26-piedras-corte-escalera-floja',
    stageNumber: 2,
    stageTitle: '2. Sobrevivir',
    unitNumber: 4,
    unitTitle: 'Capturar piedras de corte: Caballo, Escalera Floja y Golpe Lateral',
    title: 'Capturar Piedras de Corte: Caballo y Escalera Floja',
    subtitle:
      'Distingue las Piedras de Corte (Kaname-ishi) de las piedras irrelevantes y atrápales con el Salto de Caballo, la Escalera Floja (Yurumi-shicho) y el Golpe Lateral.',
    estimatedMinutes: 8,
    xpReward: 30,
    prerequisites: ['lesson-14-semeai-carreras-captura'],
    relatedPuzzleIds: ['puzzle-49-tesuji-caballo-captura', 'puzzle-50-escalera-floja-yurumishicho'],
    observableObjective:
      'Al terminar, sabrás por qué capturar piedras de corte une todos tus grupos y utilizarás el Tesuji de Caballo y la Escalera Floja para atraparlas.',
    activationQuestion: {
      question:
        'En el Capítulo 2 de "Tesuji", James Davies compara capturar dos piedras enemigas que separan a tus grupos frente a capturar dos piedras enemigas que no cortan nada. ¿Por qué las primeras valen muchísimo más?',
      options: [
        {
          id: 'a',
          text: 'Porque son Piedras de Corte (Kaname-ishi): si escapan, dividen tus piedras en dos grupos débiles que pueden morir',
          isCorrect: true,
          explanation:
            '¡Exacto! El valor no son los 2 o 4 puntos de los prisioneros, sino que al capturar las piedras de corte unes tus grupos en una sola fortaleza.',
        },
        {
          id: 'b',
          text: 'Porque las piedras de corte valen el triple en el conteo final por reglamento',
          isCorrect: false,
          explanation:
            'En el reglamento cada prisionero vale 1 punto, pero tácticamente las piedras de corte deciden la vida de los grupos vecinos.',
        },
        {
          id: 'c',
          text: 'Todas las piedras enemigas tienen exactamente la misma importancia estratégica',
          isCorrect: false,
          explanation:
            'Davies muestra en el Diagrama 3 (p. 15) que capturar piedras que NO cortan nada es una jugada pequeña que debe ignorarse.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. Piedras de Corte (Kaname-ishi) y el Tesuji de Salto de Caballo',
        body: 'Cuando las piedras enemigas dividen tus grupos, darles atari directo suele empujarlas a escapar aprovechando alguna piedra débil tuya. El Tesuji de Salto de Caballo (Keima) se coloca a un salto de caballo de tu piedra débil, cerrando la red sin permitir contra-ataris.',
        deepDive:
          'Observa la relación geométrica: en lugar de tocar al enemigo y darle impulso, colocas una red a distancia que protege indirectamente tu piedra vulnerable (Davies p. 16, Dia. 3).',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 4, color: 'WHITE' },
            { x: 4, y: 4, color: 'WHITE' },
            { x: 2, y: 4, color: 'BLACK' },
            { x: 3, y: 3, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 5, y: 3, color: 'BLACK' },
            { x: 2, y: 6, color: 'BLACK' },
            { x: 5, y: 2, color: 'WHITE' },
            { x: 6, y: 3, color: 'WHITE' },
          ],
          markers: [
            { x: 4, y: 5, type: 'SUCCESS', label: '1' },
            { x: 5, y: 3, type: 'TRIANGLE' },
          ],
          caption:
            'Negro 1 en E4 (a un salto de caballo de la piedra débil F6 ▲) atrapa las dos piedras blancas de corte.',
        },
      },
      {
        title: '2. La Escalera Floja (Yurumi-shicho) y el Golpe Lateral (Slapping Tesuji)',
        body: 'En una escalera normal el enemigo tiene 1 libertad en cada paso; en una Escalera Floja (Yurumi-shicho) el enemigo conserva 2 libertades, pero lo conduces firmemente hacia el borde del tablero donde el borde actúa como barrera y lo ahoga. A menudo se prepara con un Golpe Lateral (Slapping Tesuji) que obliga al rival a conectarse.',
        deepDive:
          'Si intentas dar atari directo cuando el rival tiene dos salidas hacia el borde, escapará por la otra. La Escalera Floja cierra el escape hacia el centro y deja que el borde haga el resto (Davies pp. 18–19).',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 1, color: 'WHITE' },
            { x: 4, y: 1, color: 'WHITE' },
            { x: 3, y: 0, color: 'BLACK' },
            { x: 4, y: 0, color: 'BLACK' },
            { x: 5, y: 0, color: 'BLACK' },
            { x: 5, y: 1, color: 'WHITE' },
            { x: 5, y: 2, color: 'WHITE' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 2, y: 3, color: 'BLACK' },
          ],
          markers: [{ x: 2, y: 2, type: 'SUCCESS', label: '1' }],
          caption:
            'Escalera Floja (Davies p. 18): Negro 1 en C7 encierra a las piedras blancas contra el borde superior.',
        },
      },
    ],
    demonstration: {
      title: 'Demostración: Cómo la Escalera Floja guía al enemigo hacia el borde',
      size: 9,
      steps: [
        {
          title: '1. Dos piedras blancas de corte listas para escapar',
          narration:
            'Blanco tiene D8–E8 con 2 libertades (C8 y D7). Si Negro da atari en C8, Blanco escapa por D7.',
          stones: [
            { x: 3, y: 1, color: 'WHITE' },
            { x: 4, y: 1, color: 'WHITE' },
            { x: 3, y: 0, color: 'BLACK' },
            { x: 4, y: 0, color: 'BLACK' },
            { x: 5, y: 0, color: 'BLACK' },
            { x: 5, y: 1, color: 'WHITE' },
            { x: 5, y: 2, color: 'WHITE' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 2, y: 3, color: 'BLACK' },
          ],
          turn: 'BLACK',
        },
        {
          title: '2. Negro juega C7 (Escalera Floja)',
          narration:
            'Negro coloca C7 sin dar atari directo. Si Blanco juega D7 queda en auto-atari, así que intenta correr por C8.',
          stones: [
            { x: 3, y: 1, color: 'WHITE' },
            { x: 4, y: 1, color: 'WHITE' },
            { x: 3, y: 0, color: 'BLACK' },
            { x: 4, y: 0, color: 'BLACK' },
            { x: 5, y: 0, color: 'BLACK' },
            { x: 5, y: 1, color: 'WHITE' },
            { x: 5, y: 2, color: 'WHITE' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 2, y: 3, color: 'BLACK' },
            { x: 2, y: 2, color: 'BLACK' },
          ],
          lastMove: { x: 2, y: 2 },
          turn: 'WHITE',
        },
        {
          title: '3. Blanco extiende a C8 y Negro bloquea en B8',
          narration:
            'Cuando Blanco extiende a C8, Negro lo bloquea en B8. Contra el borde superior, las piedras blancas no tienen escapatoria.',
          stones: [
            { x: 3, y: 1, color: 'WHITE' },
            { x: 4, y: 1, color: 'WHITE' },
            { x: 3, y: 0, color: 'BLACK' },
            { x: 4, y: 0, color: 'BLACK' },
            { x: 5, y: 0, color: 'BLACK' },
            { x: 5, y: 1, color: 'WHITE' },
            { x: 5, y: 2, color: 'WHITE' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 2, y: 3, color: 'BLACK' },
            { x: 2, y: 2, color: 'BLACK' },
            { x: 2, y: 1, color: 'WHITE' },
            { x: 1, y: 1, color: 'BLACK' },
          ],
          lastMove: { x: 1, y: 1 },
          markers: [{ x: 1, y: 1, type: 'SUCCESS', label: '✓' }],
          turn: 'WHITE',
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l26-gd-1',
        prompt:
          'Captura las dos piedras blancas de corte (D5–E5) jugando el Tesuji de Salto de Caballo respecto a tu piedra débil F6.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 4, color: 'WHITE' },
          { x: 4, y: 4, color: 'WHITE' },
          { x: 2, y: 4, color: 'BLACK' },
          { x: 3, y: 3, color: 'BLACK' },
          { x: 4, y: 3, color: 'BLACK' },
          { x: 5, y: 3, color: 'BLACK' },
          { x: 2, y: 6, color: 'BLACK' },
          { x: 5, y: 2, color: 'WHITE' },
          { x: 6, y: 3, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 5 }],
        correctFeedback:
          '¡Perfecto! El salto de caballo en E4 encierra a las dos piedras blancas sin exponer F6.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Juega en E4 (x=4, y=5), a un salto de caballo de F6.',
        hints: [
          'No juegues en F5 porque Blanco saldrá por E4 dando ataris.',
          'Coloca tu piedra en E4 (x=4, y=5).',
        ],
      },
    ],
    independentPractice: [
      {
        id: 'l26-prac-1',
        prompt:
          'Ejercicio 1: Inicia la Escalera Floja para atrapar las piedras blancas de corte D8–E8 hacia el borde superior.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 1, color: 'WHITE' },
          { x: 4, y: 1, color: 'WHITE' },
          { x: 3, y: 0, color: 'BLACK' },
          { x: 4, y: 0, color: 'BLACK' },
          { x: 5, y: 0, color: 'BLACK' },
          { x: 5, y: 1, color: 'WHITE' },
          { x: 5, y: 2, color: 'WHITE' },
          { x: 4, y: 2, color: 'BLACK' },
          { x: 4, y: 3, color: 'BLACK' },
          { x: 2, y: 3, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 2, y: 2 }],
        correctFeedback:
          '¡Excelente! Con C7 cierras el escape al centro y atrapas a Blanco en la Escalera Floja.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Cierra la diagonal en C7 (x=2, y=2) sin dar atari prematuro.',
        hints: [
          'Evita dar atari en C8 o D7.',
          'Juega en C7 (x=2, y=2).',
        ],
      },
      {
        id: 'l26-prac-2',
        prompt:
          'Ejercicio 2 (Golpe Lateral / Slapping Tesuji): Blanco intenta sacar sus dos piedras D5–E5. Golpea en el costado F6 para amenazar cortar en E6 y preparar la escalera.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 4, color: 'WHITE' },
          { x: 4, y: 4, color: 'WHITE' },
          { x: 3, y: 3, color: 'WHITE' },
          { x: 2, y: 3, color: 'BLACK' },
          { x: 2, y: 4, color: 'BLACK' },
          { x: 3, y: 5, color: 'BLACK' },
          { x: 4, y: 5, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 5, y: 3 }, { x: 4, y: 3 }],
        correctFeedback:
          '¡Golpe Lateral exacto! Amenazas el punto de corte E6 y dejas a las piedras blancas atrapadas si conectan.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Juega en F6 (x=5, y=3) o directamente en E6 (x=4, y=3).',
        hints: [
          'Mira el punto de conexión de Blanco en E6.',
          'Golpea en F6 (x=5, y=3) o corta en E6 (x=4, y=3).',
        ],
      },
      {
        id: 'l26-prac-3',
        prompt:
          'Ejercicio 3: La piedra blanca de corte en E5 intenta escapar hacia arriba. Ciérrale el paso con una red directa en E6.',
        boardSize: 9,
        initialStones: [
          { x: 4, y: 4, color: 'WHITE' },
          { x: 3, y: 5, color: 'BLACK' },
          { x: 4, y: 5, color: 'BLACK' },
          { x: 5, y: 4, color: 'BLACK' },
          { x: 2, y: 4, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 3 }],
        correctFeedback:
          '¡Capturada! Al bloquear en E6 (como en el Diagrama 1 del Cap. 2 de Davies), la piedra de corte no puede escapar.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Bloquea la salida superior de la piedra blanca jugando en E6.',
        hints: [
          'Mira hacia dónde quiere correr la piedra blanca E5.',
          'Juega en E6 (x=4, y=3).',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'Capturar Piedras de Corte (Kaname-ishi) tiene un valor estratégico enorme porque une tus grupos débiles.',
        'El Tesuji de Salto de Caballo (Keima) atrapa piedras de corte protegiendo indirectamente tu propia piedra débil.',
        'La Escalera Floja (Yurumi-shicho) conduce a un grupo con 2 libertades hacia el borde del tablero hasta ahogarlo.',
      ],
      vocabulary: [
        {
          term: 'Kaname-ishi (Piedras de corte / clave)',
          japanese: '要石',
          definition: 'Piedras que separan dos grupos enemigos; su captura une ambos grupos en uno solo.',
        },
        {
          term: 'Yurumi-shicho (Escalera floja)',
          japanese: '緩みシチョウ',
          definition: 'Persecución hacia el borde donde el grupo perseguido mantiene 2 libertades pero no puede escapar.',
        },
      ],
    },
    transferQuestion: {
      id: 'l26-transfer',
      prompt:
        'Pregunta de transferencia: Blanco acaba de extender a C8 en la Escalera Floja. Juega el bloqueo en el borde izquierdo para sellar su captura.',
      boardSize: 9,
      initialStones: [
        { x: 3, y: 1, color: 'WHITE' },
        { x: 4, y: 1, color: 'WHITE' },
        { x: 2, y: 1, color: 'WHITE' },
        { x: 3, y: 0, color: 'BLACK' },
        { x: 4, y: 0, color: 'BLACK' },
        { x: 5, y: 0, color: 'BLACK' },
        { x: 4, y: 2, color: 'BLACK' },
        { x: 4, y: 3, color: 'BLACK' },
        { x: 2, y: 3, color: 'BLACK' },
        { x: 2, y: 2, color: 'BLACK' },
      ],
      turn: 'BLACK',
      exerciseType: 'PLACE_STONE',
      validCoords: [{ x: 1, y: 1 }],
      correctFeedback:
        '¡Dominado! Con B8 conduces a Blanco directamente contra el borde del tablero y completas la Escalera Floja.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Bloquea la cabeza de las piedras blancas en B8 (x=1, y=1).',
      hints: [
        'Impide que la fila blanca de la fila 8 siga avanzando.',
        'Juega en B8 (x=1, y=1).',
      ],
    },
  },

  // ============================================================================
  // LECCIÓN 27 (Etapa 2 · Unidad 5 — Nivel Básico): Pinza, Nariz y Corte Cruzado (Davies Cap. 2)
  // ============================================================================
  {
    id: 'lesson-27-tesuji-pinza-nariz-corte-cruzado',
    stageNumber: 2,
    stageTitle: '2. Sobrevivir',
    unitNumber: 5,
    unitTitle: 'La Pinza (Hasami-tsuke), Tesuji en la Nariz y Corte Cruzado',
    title: 'La Pinza (Hasami-tsuke), Golpe en la Nariz y Corte Cruzado',
    subtitle:
      'Domina los tres tesujis de contacto del Capítulo 2 de James Davies para capturar piedras de corte cuando las redes simples no bastan.',
    estimatedMinutes: 8,
    xpReward: 30,
    prerequisites: ['lesson-26-piedras-corte-escalera-floja'],
    relatedPuzzleIds: [
      'puzzle-51-tesuji-pinza-hasamitsuke',
      'puzzle-52-tesuji-nariz-hanatsuke',
      'puzzle-53-corte-cruzado-captura',
    ],
    observableObjective:
      'Al terminar, podrás aplicar el Tesuji de Pinza (Hasami-tsuke), el Tesuji de la Nariz (Hana-tsuke) y el Corte Cruzado (Nobi-kiri) sobre el tablero dinámico.',
    activationQuestion: {
      question:
        '¿Por qué el Tesuji de Pinza (Clamping Tesuji / Hasami-tsuke) funciona donde un corte directo falla (Davies Cap. 2, p. 21)?',
      options: [
        {
          id: 'a',
          text: 'Porque coloca la piedra en el flanco de escape enemigo antes de cortar, haciendo Miai del punto de corte y del bloqueo exterior',
          isCorrect: true,
          explanation:
            '¡Exacto! Si el rival conecta el corte, queda encerrado sin espacio; y si extiende por fuera, lo cortas o capturas en Snapback.',
        },
        {
          id: 'b',
          text: 'Porque retira piedras enemigas aunque todavía tengan 3 libertades',
          isCorrect: false,
          explanation:
            'Ninguna jugada retira piedras con libertades; la Pinza funciona creando dos amenazas simultáneas (Miai).',
        },
        {
          id: 'c',
          text: 'Porque obliga al rival a pasar su turno',
          isCorrect: false,
          explanation:
            'El rival puede responder, pero cualquiera de sus dos defensas deja libre la otra amenaza.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. El Tesuji de Pinza (Hasami-tsuke) y el Tesuji en la Nariz (Hana-tsuke)',
        body: 'La Pinza (Hasami-tsuke) se adhiere al costado de la piedra de corte enemiga creando Miai entre cortar y bloquear. Por su parte, el Tesuji en la Nariz (Hana-tsuke) golpea de frente la punta de una fila de dos piedras enemigas: defiende tu propio corte mientras las atrapa en una escalera floja.',
        deepDive:
          'Davies explica (p. 24) que cuando el peligro de un corte enemigo te mira a la cara, una jugada sin contacto es demasiado lenta: debes golpear a las dos piedras «justo en la nariz».',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 2, color: 'WHITE' },
            { x: 4, y: 2, color: 'WHITE' },
            { x: 4, y: 1, color: 'BLACK' },
            { x: 5, y: 1, color: 'BLACK' },
            { x: 5, y: 2, color: 'WHITE' },
            { x: 5, y: 3, color: 'BLACK' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 4, y: 4, color: 'BLACK' },
            { x: 2, y: 4, color: 'BLACK' },
          ],
          markers: [
            { x: 2, y: 2, type: 'SUCCESS', label: '1' },
            { x: 3, y: 3, type: 'CIRCLE', label: 'a' },
          ],
          caption:
            'El Tesuji en la Nariz (Negro 1 en C7) defiende el corte en "a" (D6) y atrapa a las dos piedras blancas.',
        },
      },
      {
        title: '2. El Tesuji de Corte Cruzado (Cross-Cut / Nobi-kiri)',
        body: 'Cuando dos piedras enemigas separan tus grupos y tienes dos posibles ataris, sería un error fatal dar cualquiera de los dos ataris demasiado pronto. En cambio, mantén ambos ataris en reserva y juega un contacto seguido de Corte Cruzado: el enemigo quedará atrapado por falta de libertades sin importar de qué lado dé atari.',
        deepDive:
          'Guardar los ataris en reserva («hold both ataris in reserve until one becomes effective», Davies p. 25) es uno de los hábitos más importantes de un jugador fuerte.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 2, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 5, y: 2, color: 'BLACK' },
            { x: 2, y: 3, color: 'BLACK' },
            { x: 3, y: 4, color: 'BLACK' },
            { x: 3, y: 3, color: 'WHITE' },
            { x: 4, y: 3, color: 'WHITE' },
            { x: 2, y: 2, color: 'WHITE' },
            { x: 5, y: 4, color: 'WHITE' },
          ],
          markers: [{ x: 5, y: 3, type: 'SUCCESS', label: '1' }],
          caption:
            'En vez de dar atari prematuro en E5, Negro golpea en F6 dejando a las piedras de corte D6–E6 sin aire.',
        },
      },
    ],
    demonstration: {
      title: 'Demostración: La Pinza (Hasami-tsuke) en acción',
      size: 9,
      steps: [
        {
          title: '1. Piedras negras de corte en D5–E5',
          narration:
            'Blanco quiere capturar las piedras negras D5–E5. Si Blanco corta directo en E6, Negro escapa por D6.',
          stones: [
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 4, color: 'BLACK' },
            { x: 5, y: 3, color: 'BLACK' },
            { x: 5, y: 4, color: 'WHITE' },
            { x: 4, y: 5, color: 'WHITE' },
            { x: 3, y: 5, color: 'WHITE' },
            { x: 2, y: 4, color: 'WHITE' },
            { x: 5, y: 2, color: 'WHITE' },
            { x: 3, y: 2, color: 'BLACK' },
          ],
          turn: 'WHITE',
        },
        {
          title: '2. Blanco aplica la Pinza en D6',
          narration:
            'Blanco juega D6 (Hasami-tsuke). Ahora los puntos E6 (corte) y C6 (bloqueo) son Miai.',
          stones: [
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 4, color: 'BLACK' },
            { x: 5, y: 3, color: 'BLACK' },
            { x: 5, y: 4, color: 'WHITE' },
            { x: 4, y: 5, color: 'WHITE' },
            { x: 3, y: 5, color: 'WHITE' },
            { x: 2, y: 4, color: 'WHITE' },
            { x: 5, y: 2, color: 'WHITE' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 3, y: 3, color: 'WHITE' },
          ],
          lastMove: { x: 3, y: 3 },
          markers: [
            { x: 4, y: 3, type: 'CIRCLE', label: 'a' },
            { x: 2, y: 3, type: 'CIRCLE', label: 'b' },
          ],
          turn: 'BLACK',
        },
        {
          title: '3. Negro conecta en E6 y Blanco cierra en C6',
          narration:
            'Cuando Negro conecta en E6 para evitar ser cortado, Blanco juega C6 dejando al grupo negro sin salida.',
          stones: [
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 4, color: 'BLACK' },
            { x: 5, y: 3, color: 'BLACK' },
            { x: 5, y: 4, color: 'WHITE' },
            { x: 4, y: 5, color: 'WHITE' },
            { x: 3, y: 5, color: 'WHITE' },
            { x: 2, y: 4, color: 'WHITE' },
            { x: 5, y: 2, color: 'WHITE' },
            { x: 3, y: 2, color: 'BLACK' },
            { x: 3, y: 3, color: 'WHITE' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 2, y: 3, color: 'WHITE' },
          ],
          lastMove: { x: 2, y: 3 },
          turn: 'BLACK',
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l27-gd-1',
        prompt:
          'Juega con Blanco el Tesuji de Pinza (Hasami-tsuke) para hacer Miai de E6 y C6 y capturar las piedras negras de corte D5–E5.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 4, color: 'BLACK' },
          { x: 4, y: 4, color: 'BLACK' },
          { x: 5, y: 3, color: 'BLACK' },
          { x: 5, y: 4, color: 'WHITE' },
          { x: 4, y: 5, color: 'WHITE' },
          { x: 3, y: 5, color: 'WHITE' },
          { x: 2, y: 4, color: 'WHITE' },
          { x: 5, y: 2, color: 'WHITE' },
          { x: 3, y: 2, color: 'BLACK' },
        ],
        turn: 'WHITE',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 3, y: 3 }],
        correctFeedback:
          '¡Pinza perfecta en D6! Ahora Negro no puede defender E6 y C6 al mismo tiempo.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Coloca la piedra blanca en D6 (x=3, y=3), justo encima de D5.',
        hints: [
          'No cortes primero en E6.',
          'Juega en D6 (x=3, y=3).',
        ],
      },
    ],
    independentPractice: [
      {
        id: 'l27-prac-1',
        prompt:
          'Ejercicio 1 (Tesuji en la Nariz): Golpea en la nariz de las dos piedras blancas D7–E7 para proteger tu corte en D6 y atraparlas.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 2, color: 'WHITE' },
          { x: 4, y: 2, color: 'WHITE' },
          { x: 4, y: 1, color: 'BLACK' },
          { x: 5, y: 1, color: 'BLACK' },
          { x: 5, y: 2, color: 'WHITE' },
          { x: 5, y: 3, color: 'BLACK' },
          { x: 4, y: 3, color: 'BLACK' },
          { x: 4, y: 4, color: 'BLACK' },
          { x: 2, y: 4, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 2, y: 2 }],
        correctFeedback:
          '¡Golpe en la nariz en C7! Defiendes D6 y atrapas a las piedras blancas.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Juega en la punta de las dos piedras blancas: C7 (x=2, y=2).',
        hints: [
          'Haz contacto frontal con la piedra blanca D7.',
          'Juega en C7 (x=2, y=2).',
        ],
      },
      {
        id: 'l27-prac-2',
        prompt:
          'Ejercicio 2: Pon en atari inmediato al par blanco de corte D6–E6 jugando en su punto vital exterior.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 2, color: 'BLACK' },
          { x: 4, y: 2, color: 'BLACK' },
          { x: 5, y: 2, color: 'BLACK' },
          { x: 2, y: 3, color: 'BLACK' },
          { x: 3, y: 4, color: 'BLACK' },
          { x: 3, y: 3, color: 'WHITE' },
          { x: 4, y: 3, color: 'WHITE' },
          { x: 2, y: 2, color: 'WHITE' },
          { x: 5, y: 4, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 5, y: 3 }, { x: 4, y: 4 }],
        correctFeedback:
          '¡Excelente! Al atacar en F6 (o E5) dejas a las dos piedras blancas de corte sin escape.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Juega en F6 (x=5, y=3) o E5 (x=4, y=4).',
        hints: [
          'Las dos piedras blancas D6–E6 solo tienen 2 libertades.',
          'Juega en F6 (x=5, y=3).',
        ],
      },
      {
        id: 'l27-prac-3',
        prompt:
          'Ejercicio 3: Blanco ha jugado entre tus piedras. Completa el Corte Cruzado en E4 para dejar a la piedra blanca E5 con solo 2 libertades rodeada por tus muros.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 4, color: 'BLACK' },
          { x: 4, y: 3, color: 'BLACK' },
          { x: 4, y: 4, color: 'WHITE' },
          { x: 3, y: 5, color: 'WHITE' },
          { x: 5, y: 3, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 5 }, { x: 5, y: 4 }],
        correctFeedback:
          '¡Corte Cruzado ejecutado! Ahora tienes dos ataris en reserva contra la piedra blanca E5.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Corta cruzado en E4 (x=4, y=5) o presiona en F5 (x=5, y=4).',
        hints: [
          'Coloca tu piedra diagonalmente opuesta a D5 para formar el corte cruzado.',
          'Juega en E4 (x=4, y=5).',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'El Tesuji de Pinza (Hasami-tsuke) ataca el flanco de las piedras de corte creando dos amenazas simultáneas (Miai).',
        'El Tesuji en la Nariz (Hana-tsuke) golpea la cabeza de dos piedras para defender un corte propio y atraparlas.',
        'En el Corte Cruzado, guarda ambos ataris en reserva hasta que uno de ellos capture por falta de libertades.',
      ],
      vocabulary: [
        {
          term: 'Hasami-tsuke (Pinza)',
          japanese: 'ハサミツケ',
          definition: 'Contacto lateral que encierra una piedra enemiga haciendo Miai de conexión y captura.',
        },
        {
          term: 'Hana-tsuke (Golpe en la nariz)',
          japanese: '鼻ツケ',
          definition: 'Jugada de contacto directo en la punta frontal de dos o más piedras en línea.',
        },
      ],
    },
    transferQuestion: {
      id: 'l27-transfer',
      prompt:
        'Pregunta de transferencia: Negro acaba de conectar en E6 tras tu Pinza en D6. Juega el bloqueo que sella definitivamente a las piedras negras.',
      boardSize: 9,
      initialStones: [
        { x: 3, y: 4, color: 'BLACK' },
        { x: 4, y: 4, color: 'BLACK' },
        { x: 5, y: 3, color: 'BLACK' },
        { x: 4, y: 3, color: 'BLACK' },
        { x: 5, y: 4, color: 'WHITE' },
        { x: 4, y: 5, color: 'WHITE' },
        { x: 3, y: 5, color: 'WHITE' },
        { x: 2, y: 4, color: 'WHITE' },
        { x: 5, y: 2, color: 'WHITE' },
        { x: 3, y: 2, color: 'BLACK' },
        { x: 3, y: 3, color: 'WHITE' },
      ],
      turn: 'WHITE',
      exerciseType: 'PLACE_STONE',
      validCoords: [{ x: 2, y: 3 }],
      correctFeedback:
        '¡Dominado! Con C6 completas la Pinza y dejas a las piedras negras atrapadas sin escapatoria.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Cierra la salida izquierda de Negro jugando en C6 (x=2, y=3).',
      hints: [
        'Mira el otro punto del Miai a la izquierda de D6.',
        'Juega en C6 (x=2, y=3).',
      ],
    },
  },

  // ============================================================================
  // LECCIÓN 28 (Etapa 2 · Unidad 6 — Nivel Básico): Ignorar el Atari y Contra-Atari (Davies Cap. 14)
  // ============================================================================
  {
    id: 'lesson-28-ignorar-atari-contra-atari',
    stageNumber: 2,
    stageTitle: '2. Sobrevivir',
    unitNumber: 6,
    unitTitle: 'Ignorar el atari, evitar ataris torpes y el Contra-Atari',
    title: 'Ignorar el Atari y el Tesuji de Contra-Atari (Gyaku-atari)',
    subtitle:
      'Supera el reflejo de dar atari siempre que puedas o huir de cada atari: aprende cuándo sacrificar la piedra amenazada y cuándo responder con un Contra-Atari letal.',
    estimatedMinutes: 8,
    xpReward: 30,
    prerequisites: ['lesson-27-tesuji-pinza-nariz-corte-cruzado'],
    relatedPuzzleIds: ['puzzle-64-contra-atari-gyakuatari', 'puzzle-40-kikashi-forzante'],
    observableObjective:
      'Al terminar, evitarás dar ataris que fortalezcan al rival y responderás a un atari enemigo ejecutando un Contra-Atari (Gyaku-atari) sobre su piedra clave.',
    activationQuestion: {
      question:
        'En el Capítulo 14 ("Ignore the Atari"), ¿qué critica James Davies sobre los jugadores cuya lectura está dominada por la idea del atari?',
      options: [
        {
          id: 'a',
          text: 'Que dan atari siempre que pueden (fortaleciendo al rival) y escapan de cualquier atari distrayéndose con el destino de piedras individuales',
          isCorrect: true,
          explanation:
            '¡Exacto! Davies escribe: «Dan atari siempre que pueden y salen de él siempre que se encuentran en atari, distrayéndose con piedras individuales y perdiendo los verdaderos tesujis».',
        },
        {
          id: 'b',
          text: 'Que nunca está permitido capturar una piedra en atari',
          isCorrect: false,
          explanation:
            'Capturar piedras de corte es vital; el error es dar ataris inútiles que obligan al rival a arreglar sus defectos.',
        },
        {
          id: 'c',
          text: 'Que el reglamento obliga a salvar toda piedra en atari como el jaque en ajedrez',
          isCorrect: false,
          explanation:
            'En Go jamás es obligatorio defender una piedra en atari si ignorarla o contraatacar es mejor.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. Cuándo NO dar Atari: Evitar el «Atari Torpe»',
        body: 'Dar atari a una piedra enemiga que tiene salida obliga a tu oponente a extenderse o conectarse, haciendo su grupo más fuerte y matando la utilidad (Aji) de tus propias piedras cercanas. Antes de dar un atari automático, pregúntate si ese intercambio ayuda más al enemigo que a ti.',
        deepDive:
          'Davies muestra (p. 184, Dia. 4–5) que proteger limpiamente sin dar atari conserva el potencial de tus piedras y te deja en Sente, mientras que el atari torpe te deja en Gote.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 4, y: 4, color: 'BLACK' },
            { x: 5, y: 4, color: 'WHITE' },
            { x: 5, y: 5, color: 'BLACK' },
            { x: 6, y: 5, color: 'BLACK' },
            { x: 3, y: 6, color: 'WHITE' },
          ],
          markers: [
            { x: 3, y: 4, type: 'SUCCESS', label: '1' },
            { x: 4, y: 3, type: 'DANGER', label: 'X' },
          ],
          caption:
            'Blanco 1 en D5 defiende con elegancia sin dar el atari torpe en X (E6), que solo fortalecería a Negro.',
        },
      },
      {
        title: '2. El Tesuji de Contra-Atari (Gyaku-atari)',
        body: 'Cuando el rival pone una de tus piedras en atari, no te apresures a extenderla si eso te deja con forma pesada. Mira primero las libertades de la piedra enemiga que te ataca o de su piedra de corte adyacente: un Contra-Atari (Gyaku-atari) inmediato puede capturar su piedra clave o encerrar todo su grupo.',
        deepDive:
          'En el Diagrama 3 de la pág. 186, Negro ignora el atari contra su piedra y da contra-atari a la piedra blanca vecina: si Blanco captura, Negro vuelve a dar atari y atrapa todo el grupo blanco.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 4, y: 4, color: 'BLACK' },
            { x: 3, y: 5, color: 'BLACK' },
            { x: 5, y: 5, color: 'BLACK' },
            { x: 6, y: 4, color: 'BLACK' },
            { x: 5, y: 4, color: 'WHITE' },
            { x: 3, y: 4, color: 'WHITE' },
            { x: 4, y: 3, color: 'WHITE' },
          ],
          markers: [
            { x: 5, y: 3, type: 'SUCCESS', label: '1' },
            { x: 4, y: 5, type: 'DANGER', label: 'X' },
          ],
          caption:
            'Davies Cap. 14 (p. 186): Negro ignora el atari sobre E5 (no huye en X) y juega el Contra-Atari 1 en F6.',
        },
      },
    ],
    demonstration: {
      title: 'Demostración: Huir del Atari vs. Contra-Atari (Davies Cap. 14, p. 186)',
      size: 9,
      steps: [
        {
          title: '1. Blanco da atari en D5 a la piedra negra E5',
          narration:
            'La piedra negra E5 acaba de quedar en atari. Huir en E4 parece obvio, pero dejaría a Blanco extender en F6 con excelente forma.',
          stones: [
            { x: 4, y: 4, color: 'BLACK' },
            { x: 3, y: 5, color: 'BLACK' },
            { x: 5, y: 5, color: 'BLACK' },
            { x: 6, y: 4, color: 'BLACK' },
            { x: 5, y: 4, color: 'WHITE' },
            { x: 3, y: 4, color: 'WHITE' },
            { x: 4, y: 3, color: 'WHITE' },
          ],
          lastMove: { x: 3, y: 4 },
          turn: 'BLACK',
        },
        {
          title: '2. Negro responde con el Contra-Atari en F6',
          narration:
            'En lugar de escapar en E4, Negro pone en atari a la piedra blanca F5 jugando en F6 (Gyaku-atari).',
          stones: [
            { x: 4, y: 4, color: 'BLACK' },
            { x: 3, y: 5, color: 'BLACK' },
            { x: 5, y: 5, color: 'BLACK' },
            { x: 6, y: 4, color: 'BLACK' },
            { x: 5, y: 4, color: 'WHITE' },
            { x: 3, y: 4, color: 'WHITE' },
            { x: 4, y: 3, color: 'WHITE' },
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
        id: 'l28-gd-1',
        prompt:
          'Blanco acaba de poner tu piedra E5 en atari con D5. Ignora la huida en E4 y ejecuta el Contra-Atari contra la piedra blanca F5.',
        boardSize: 9,
        initialStones: [
          { x: 4, y: 4, color: 'BLACK' },
          { x: 3, y: 5, color: 'BLACK' },
          { x: 5, y: 5, color: 'BLACK' },
          { x: 6, y: 4, color: 'BLACK' },
          { x: 5, y: 4, color: 'WHITE' },
          { x: 3, y: 4, color: 'WHITE' },
          { x: 4, y: 3, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 5, y: 3 }],
        correctFeedback:
          '¡Contra-Atari brillante en F6! Capturas o encierras a Blanco obteniendo una forma exterior impecable.',
        wrongFeedback: {
          '4,5': 'Huir en E4 ayuda a Blanco a jugar F6 y arruina tu forma.',
        },
        defaultWrongFeedback: 'Juega el Contra-Atari en F6 (x=5, y=3) contra la piedra blanca F5.',
        hints: [
          'Mira cuántas libertades tiene la piedra blanca F5.',
          'Juega en F6 (x=5, y=3).',
        ],
      },
    ],
    independentPractice: [
      {
        id: 'l28-prac-1',
        prompt:
          'Ejercicio 1: Tu piedra negra en D5 está en atari, pero la piedra blanca que te corta en E5 también está en atari. Captura la piedra blanca en vez de huir.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 4, color: 'BLACK' },
          { x: 4, y: 4, color: 'WHITE' },
          { x: 3, y: 3, color: 'WHITE' },
          { x: 2, y: 4, color: 'WHITE' },
          { x: 4, y: 3, color: 'BLACK' },
          { x: 5, y: 4, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 5 }],
        correctFeedback:
          '¡Bien hecho! Al dar atari/capturar hacia E4 resuelves la amenaza atacando la piedra clave de Blanco.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Ataca la piedra blanca de E5 jugando debajo de ella en E4 (x=4, y=5).',
        hints: [
          'Observa la piedra blanca en E5.',
          'Juega en E4 (x=4, y=5).',
        ],
      },
      {
        id: 'l28-prac-2',
        prompt:
          'Ejercicio 2: Blanco ha puesto en atari tu piedra de C4. En lugar de conectarla, cierra por fuera en D5 para atrapar las piedras blancas centrales.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 5, color: 'BLACK' },
          { x: 1, y: 5, color: 'WHITE' },
          { x: 2, y: 6, color: 'WHITE' },
          { x: 3, y: 4, color: 'WHITE' },
          { x: 2, y: 3, color: 'BLACK' },
          { x: 3, y: 3, color: 'BLACK' },
          { x: 4, y: 4, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 3, y: 5 }],
        correctFeedback:
          '¡Contra-Atari decisivo en D4! Sacrificas C4 si hace falta pero capturas la piedra de corte D5.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Pon en atari la piedra blanca de corte D5 jugando en D4 (x=3, y=5).',
        hints: [
          'La piedra más importante es la piedra blanca de corte en D5.',
          'Juega en D4 (x=3, y=5).',
        ],
      },
      {
        id: 'l28-prac-3',
        prompt:
          'Ejercicio 3: No des el atari torpe en E6. Defiende tu forma con el contacto limpio en F6 (Attachment Tesuji) que prepara la conducción.',
        boardSize: 9,
        initialStones: [
          { x: 4, y: 4, color: 'BLACK' },
          { x: 5, y: 4, color: 'BLACK' },
          { x: 5, y: 5, color: 'BLACK' },
          { x: 4, y: 5, color: 'WHITE' },
          { x: 3, y: 6, color: 'WHITE' },
          { x: 5, y: 2, color: 'BLACK' },
        ],
        turn: 'WHITE',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 5, y: 3 }, { x: 3, y: 4 }],
        correctFeedback:
          '¡Excelente criterio (Davies p. 183, Dia. 3 y 5)! Evitas el atari torpe en E6 y tomas el punto vital de forma.',
        wrongFeedback: {
          '4,3': 'Dar atari en E6 solo obliga a Negro a extenderse en D5 con una forma poderosa.',
        },
        defaultWrongFeedback: 'Evita E6 y juega el tesuji en F6 (x=5, y=3) o la defensa limpia en D5 (x=3, y=4).',
        hints: [
          'No juegues en E6.',
          'Juega en F6 (x=5, y=3) o D5 (x=3, y=4).',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'Evita dar ataris automáticos que solo obligan al rival a conectarse y fortalecer su grupo.',
        'Cuando una piedra tuya quede en atari, evalúa si es una piedra secundaria que conviene sacrificar por iniciativa.',
        'El Tesuji de Contra-Atari (Gyaku-atari) responde al atari rival atacando inmediatamente su piedra de corte.',
      ],
      vocabulary: [
        {
          term: 'Gyaku-atari (Contra-Atari)',
          japanese: '逆アタリ',
          definition: 'Responder a un atari enemigo ignorando la defensa pasiva y dando atari inmediato a una piedra rival.',
        },
        {
          term: 'Kasu-ishi (Piedra desechable)',
          japanese: 'カス石',
          definition: 'Piedra que ya cumplió su función o carece de valor estratégico y puede sacrificarse sin pérdida.',
        },
      ],
    },
    transferQuestion: {
      id: 'l28-transfer',
      prompt:
        'Pregunta de transferencia: Blanco capturó tu piedra en E4 tras tu Contra-Atari en F6. Ahora dale atari a las dos piedras blancas en E3 para encerrarlas por completo (Davies p. 186, Dia. 4).',
      boardSize: 9,
      initialStones: [
        { x: 3, y: 5, color: 'BLACK' },
        { x: 5, y: 5, color: 'BLACK' },
        { x: 6, y: 4, color: 'BLACK' },
        { x: 5, y: 3, color: 'BLACK' },
        { x: 5, y: 4, color: 'WHITE' },
        { x: 3, y: 4, color: 'WHITE' },
        { x: 4, y: 3, color: 'WHITE' },
        { x: 4, y: 5, color: 'WHITE' },
      ],
      turn: 'BLACK',
      exerciseType: 'PLACE_STONE',
      validCoords: [{ x: 4, y: 6 }, { x: 4, y: 4 }],
      correctFeedback:
        '¡Dominado! Al bloquear en E3 (o recapturar), todo el grupo blanco queda atrapado en tu red exterior.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Bloquea la salida inferior de la piedra blanca E4 jugando en E3 (x=4, y=6).',
      hints: [
        'Mira la piedra blanca que acaba de capturar en E4.',
        'Juega debajo de ella en E3 (x=4, y=6).',
      ],
    },
  },

  // ============================================================================
  // LECCIÓN 29 (Etapa 3 · Unidad 4 — Nivel Intermedio): Cómo Conectar y Enlazar (Davies Cap. 6 y 12)
  // ============================================================================
  {
    id: 'lesson-29-arte-conectar-indirecto-protege-ojos',
    stageNumber: 3,
    stageTitle: '3. Forma y eficiencia',
    unitNumber: 4,
    unitTitle: 'El Arte de Conectar: Conexión Indirecta, Protege-Ojos y Enlaces',
    title: 'El Arte de Conectar: Protege-Ojos, Conexión Indirecta y Enlaces',
    subtitle:
      'Aprende el principio del Capítulo 12 de James Davies («elige la conexión que más desarrolle mientras sea segura»), el Tesuji Protege-Ojos y los enlaces por falta de libertades.',
    estimatedMinutes: 9,
    xpReward: 35,
    prerequisites: ['lesson-15-formas-pesadas-hane-cabeza'],
    relatedPuzzleIds: ['puzzle-60-conectar-falta-libertades', 'puzzle-5-conectar-corte'],
    observableObjective:
      'Al terminar, elegirás entre conexión sólida, diagonal, salto de caballo y Tesuji Protege-Ojos, y enlazarás grupos explotando la falta de libertades del rival.',
    activationQuestion: {
      question:
        'Según el Capítulo 12 de "Tesuji" ("How to Connect"), ¿cuál es el principio rector al elegir cómo conectar dos grupos propios?',
      options: [
        {
          id: 'a',
          text: 'Elegir la conexión que más desarrolle tu posición hacia el exterior o en ojos, siempre que sea lo bastante fuerte para defender',
          isCorrect: true,
          explanation:
            '¡Exacto! Las conexiones son jugadas defensivas pero también desarrollan forma: si una diagonal o salto de caballo defiende sin riesgo, es más eficiente que una conexión pesada.',
        },
        {
          id: 'b',
          text: 'Usar siempre la conexión sólida directa aunque forme un triángulo vacío',
          isCorrect: false,
          explanation:
            'Davies muestra en la pág. 157 (Dia. 3) que una conexión sólida mal elegida puede formar un triángulo vacío y regalar el punto vital.',
        },
        {
          id: 'c',
          text: 'Nunca conectar grupos y dejar siempre abiertos todos los cortes',
          isCorrect: false,
          explanation:
            'Dejar cortes indefensos destruye tus grupos; el arte está en elegir la conexión óptima.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. El Tesuji Protege-Ojos y la Jerarquía de Conexiones',
        body: 'El Tesuji Protege-Ojos (p. 157) es el reverso exacto del Tesuji Roba-Ojos: colocas tu piedra a un salto de caballo protegiendo simultáneamente el corte y el espacio de ojos, evitando formar un triángulo vacío. Cuando dos muros sólidos se encuentran en ángulo recto, incluso una conexión en Salto de Caballo (Keima) es segura gracias a la escalera.',
        deepDive:
          'Compara siempre tres candidatas: 1) Conexión sólida (no regala jugadas forzantes al rival), 2) Conexión diagonal (avanza una línea más y prepara ojos), y 3) Tesuji Protege-Ojos / Caballo.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 4, y: 3, color: 'BLACK' },
            { x: 5, y: 4, color: 'BLACK' },
            { x: 6, y: 4, color: 'BLACK' },
            { x: 5, y: 6, color: 'BLACK' },
            { x: 4, y: 4, color: 'WHITE' },
            { x: 4, y: 5, color: 'WHITE' },
            { x: 5, y: 5, color: 'WHITE' },
            { x: 3, y: 6, color: 'WHITE' },
          ],
          markers: [
            { x: 2, y: 4, type: 'SUCCESS', label: '1' },
            { x: 3, y: 4, type: 'DANGER', label: 'X' },
          ],
          caption:
            'El Tesuji Protege-Ojos (Blanco 1 en C5, Davies p. 157) evita el triángulo vacío en X (D5) y protege la forma.',
        },
      },
      {
        title: '2. Conectar Indirectamente y Enlazar por Falta de Libertades (Cap. 6)',
        body: 'A veces no necesitas tapar el punto de corte directamente: puedes defenderlo indirectamente amenazando un Snapback o falta de libertades si el rival corta (p. 159). Del mismo modo, en el borde puedes enlazar dos grupos separados mediante el Salto Largo de Caballo (Monkey Jump), un Hane en primera línea o un sacrificio en el centro de simetría.',
        deepDive:
          'En el Capítulo 6 (pp. 95–98), Davies demuestra que si las piedras enemigas que intentan separarte tienen solo 2 libertades, un Hane en el borde las obliga a cederte el paso subterráneo (Watari).',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 1, y: 4, color: 'WHITE' },
            { x: 1, y: 5, color: 'WHITE' },
            { x: 1, y: 6, color: 'BLACK' },
            { x: 2, y: 6, color: 'BLACK' },
            { x: 2, y: 5, color: 'BLACK' },
            { x: 2, y: 7, color: 'WHITE' },
            { x: 3, y: 7, color: 'WHITE' },
            { x: 3, y: 6, color: 'WHITE' },
            { x: 2, y: 4, color: 'WHITE' },
            { x: 1, y: 7, color: 'BLACK' },
          ],
          markers: [{ x: 0, y: 5, type: 'SUCCESS', label: '1' }],
          caption:
            'Enlace por falta de libertades (Davies Cap. 6, p. 96): Blanco 1 en A4 une sus grupos porque Negro no puede bloquear sin quedar en atari.',
        },
      },
    ],
    demonstration: {
      title: 'Demostración: Conexión Indirecta mediante amenaza de Snapback (Davies p. 159)',
      size: 9,
      steps: [
        {
          title: '1. Un punto de corte aparente en E4',
          narration:
            'Negro tiene un punto de corte en E4 entre D4 y F4. Conectar pasivamente en E4 sería lento y cedería presión.',
          stones: [
            { x: 3, y: 5, color: 'BLACK' },
            { x: 5, y: 5, color: 'BLACK' },
            { x: 5, y: 4, color: 'BLACK' },
            { x: 3, y: 3, color: 'BLACK' },
            { x: 4, y: 3, color: 'WHITE' },
            { x: 4, y: 4, color: 'WHITE' },
            { x: 3, y: 6, color: 'WHITE' },
            { x: 4, y: 6, color: 'WHITE' },
          ],
          turn: 'BLACK',
        },
        {
          title: '2. Conexión indirecta en C5 que ataca y defiende a la vez',
          narration:
            'Negro juega C5 quitando una libertad a las piedras blancas E6–E5. Ahora si Blanco corta en E4, Negro captura todo en Snapback.',
          stones: [
            { x: 3, y: 5, color: 'BLACK' },
            { x: 5, y: 5, color: 'BLACK' },
            { x: 5, y: 4, color: 'BLACK' },
            { x: 3, y: 3, color: 'BLACK' },
            { x: 4, y: 3, color: 'WHITE' },
            { x: 4, y: 4, color: 'WHITE' },
            { x: 3, y: 6, color: 'WHITE' },
            { x: 4, y: 6, color: 'WHITE' },
            { x: 2, y: 4, color: 'BLACK' },
          ],
          lastMove: { x: 2, y: 4 },
          markers: [{ x: 2, y: 4, type: 'SUCCESS', label: '!' }],
          turn: 'WHITE',
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l29-gd-1',
        prompt:
          'Enlaza tus dos grupos blancos en el borde izquierdo usando el Hane en primera línea que explota la falta de libertades de Negro.',
        boardSize: 9,
        initialStones: [
          { x: 1, y: 4, color: 'WHITE' },
          { x: 1, y: 5, color: 'WHITE' },
          { x: 1, y: 6, color: 'BLACK' },
          { x: 2, y: 6, color: 'BLACK' },
          { x: 2, y: 5, color: 'BLACK' },
          { x: 2, y: 7, color: 'WHITE' },
          { x: 3, y: 7, color: 'WHITE' },
          { x: 3, y: 6, color: 'WHITE' },
          { x: 2, y: 4, color: 'WHITE' },
          { x: 1, y: 7, color: 'BLACK' },
        ],
        turn: 'WHITE',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 0, y: 5 }, { x: 0, y: 6 }],
        correctFeedback:
          '¡Enlace perfecto! Negro no puede bloquear tu paso por la columna A porque quedaría en atari.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Juega en la primera línea izquierda A4 (x=0, y=5) o A3 (x=0, y=6).',
        hints: [
          'Las 4 piedras negras solo respiran por la columna A.',
          'Juega en A4 (x=0, y=5).',
        ],
      },
    ],
    independentPractice: [
      {
        id: 'l29-prac-1',
        prompt:
          'Ejercicio 1 (Tesuji Protege-Ojos): Conecta y protege el espacio de ojos de tu grupo blanco sin hacer el triángulo vacío en D5.',
        boardSize: 9,
        initialStones: [
          { x: 4, y: 3, color: 'BLACK' },
          { x: 5, y: 4, color: 'BLACK' },
          { x: 6, y: 4, color: 'BLACK' },
          { x: 5, y: 6, color: 'BLACK' },
          { x: 4, y: 4, color: 'WHITE' },
          { x: 4, y: 5, color: 'WHITE' },
          { x: 5, y: 5, color: 'WHITE' },
          { x: 3, y: 6, color: 'WHITE' },
        ],
        turn: 'WHITE',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 2, y: 4 }, { x: 3, y: 5 }],
        correctFeedback:
          '¡Excelente forma! Proteges tu conexión y mantienes intacto tu potencial de ojos.',
        wrongFeedback: {
          '3,4': 'Jugar en D5 forma un triángulo vacío pesado y sin ojos.',
        },
        defaultWrongFeedback: 'Usa el Tesuji Protege-Ojos en C5 (x=2, y=4) o la boca de tigre en D4 (x=3, y=5).',
        hints: [
          'Evita el triángulo vacío en D5.',
          'Juega en C5 (x=2, y=4).',
        ],
      },
      {
        id: 'l29-prac-2',
        prompt:
          'Ejercicio 2 (Enlace con Salto de Caballo): Une tus dos piedras negras D7 y D3 mediante el punto en salto de caballo que impide a Blanco atravesar tu línea (Davies Cap. 6, p. 91).',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 2, color: 'BLACK' },
          { x: 3, y: 6, color: 'BLACK' },
          { x: 4, y: 3, color: 'WHITE' },
          { x: 4, y: 5, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 2, y: 4 }],
        correctFeedback:
          '¡Conexión en doble salto de caballo en C5! Como muestra Davies (p. 91, Dia. 2), Blanco no puede cortar ninguno de los dos lados.',
        wrongFeedback: {
          '3,4': 'Si juegas en D5, Blanco empuja y corta tus piedras.',
        },
        defaultWrongFeedback: 'Coloca tu piedra en C5 (x=2, y=4), a un salto de caballo tanto de D7 como de D3.',
        hints: [
          'Busca el punto que forma salto de caballo (Keima) con D7 y con D3 a la vez.',
          'Juega en C5 (x=2, y=4).',
        ],
      },
      {
        id: 'l29-prac-3',
        prompt:
          'Ejercicio 3 (Sacrificio en el Centro de Simetría — Davies p. 98): Blanco amenaza dos cortes en D5 y F5. Juega en el punto central E6 para defender ambos cortes.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 4, color: 'WHITE' },
          { x: 3, y: 4, color: 'WHITE' },
          { x: 4, y: 4, color: 'WHITE' },
          { x: 5, y: 4, color: 'WHITE' },
          { x: 6, y: 4, color: 'WHITE' },
          { x: 3, y: 3, color: 'BLACK' },
          { x: 5, y: 3, color: 'BLACK' },
          { x: 3, y: 5, color: 'BLACK' },
          { x: 5, y: 5, color: 'BLACK' },
        ],
        turn: 'WHITE',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 3 }],
        correctFeedback:
          '¡Exacto como el Diagrama 2 de la pág. 98 de Davies! Al jugar en el centro de simetría E6, mientras Negro captura esa piedra tú conectas tu cadena principal.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Juega en el centro de simetría E6 (x=4, y=3) entre las dos piedras negras.',
        hints: [
          'Si conectas un solo lado, Negro corta el otro.',
          'Juega en E6 (x=4, y=3).',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'Elige siempre la conexión que más desarrolle tu posición mientras siga siendo tácticamente segura.',
        'El Tesuji Protege-Ojos defiende tu forma en reversa al Tesuji Roba-Ojos, evitando triángulos vacíos.',
        'Puedes enlazar grupos separados mediante doble salto de caballo, falta de libertades rival o sacrificio en el centro de simetría.',
      ],
      vocabulary: [
        {
          term: 'Watari (Puente / Enlace en el borde)',
          japanese: 'ワタリ',
          definition: 'Jugada que conecta dos grupos amigos por debajo de las piedras enemigas en primera o segunda línea.',
        },
        {
          term: 'Saru-suberi (Salto del mono)',
          japanese: '猿滑り',
          definition: 'Salto largo de caballo en la primera línea que sirve tanto para enlazar grupos como para reducir en Yose.',
        },
      ],
    },
    transferQuestion: {
      id: 'l29-transfer',
      prompt:
        'Pregunta de transferencia: Blanco quiere enlazar sus piedras de la esquina derecha (H2–H3) con su grupo superior (H7). Usa el Salto Largo de Caballo en primera línea (Davies p. 92, Dia. 5).',
      boardSize: 9,
      initialStones: [
        { x: 7, y: 7, color: 'WHITE' },
        { x: 7, y: 6, color: 'WHITE' },
        { x: 7, y: 2, color: 'WHITE' },
        { x: 6, y: 6, color: 'BLACK' },
        { x: 6, y: 5, color: 'BLACK' },
        { x: 6, y: 4, color: 'BLACK' },
        { x: 6, y: 3, color: 'BLACK' },
      ],
      turn: 'WHITE',
      exerciseType: 'PLACE_STONE',
      validCoords: [{ x: 8, y: 4 }, { x: 8, y: 3 }],
      correctFeedback:
        '¡Dominado! El salto largo de caballo en la primera línea derecha une ambos grupos blancos sin que Negro pueda cortarlos.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Juega en la primera línea derecha J5 (x=8, y=4) o J6 (x=8, y=3).',
      hints: [
        'Usa la primera línea del borde derecho (columna J).',
        'Juega en J5 (x=8, y=4).',
      ],
    },
  },

  // ============================================================================
  // LECCIÓN 30 (Etapa 3 · Unidad 5 — Nivel Intermedio): Cortar Grupos y Cuello de Perro (Davies Cap. 7)
  // ============================================================================
  {
    id: 'lesson-30-cortar-formas-cuello-perro',
    stageNumber: 3,
    stageTitle: '3. Forma y eficiencia',
    unitNumber: 5,
    unitTitle: 'Cortar grupos: Formas cortables, Cuello de Perro y Corte del Caballo',
    title: 'Cortar Grupos: Formas Cortables, Cuello de Perro y Corte del Caballo',
    subtitle:
      'Estudia el Capítulo 7 de James Davies: qué formas son cortables o incortables, la extensión Cuello de Perro (Inu-no-kao) y cómo usar un sacrificio para cortar el salto de caballo.',
    estimatedMinutes: 9,
    xpReward: 35,
    prerequisites: ['lesson-29-arte-conectar-indirecto-protege-ojos'],
    relatedPuzzleIds: ['puzzle-61-cortar-salto-caballo-sacrificio', 'puzzle-37-corte-bueno-vs-malo'],
    observableObjective:
      'Al terminar, distinguirás cuándo un salto de un punto o de caballo puede ser cortado y ejecutarás combinaciones de sacrificio para dividir la línea enemiga.',
    activationQuestion: {
      question:
        'En el Capítulo 7 ("Cutting Groups Apart", pp. 105–108), ¿qué enseña James Davies sobre el Salto de Un Punto (Ikkentobi) y la extensión "Cuello de Perro" (Dog\'s-Neck)?',
      options: [
        {
          id: 'a',
          text: 'El Salto de Un Punto puede cortarse con una cuña si el atacante es muy fuerte alrededor; el Cuello de Perro es incortable por sí mismo, pero permite meter una piedra de sacrificio para cortar la forma vecina',
          isCorrect: true,
          explanation:
            '¡Exacto! Ningún salto de un punto es mágicamente incortable si está rodeado de fuerza enemiga; y el Cuello de Perro se explota insertando un sacrificio para ganar fuerza exterior.',
        },
        {
          id: 'b',
          text: 'El Salto de Dos Puntos (Nikentobi) sin muro es la forma más sólida e imposible de cortar',
          isCorrect: false,
          explanation:
            'Davies explica (p. 106, Dia. 4) que un salto de dos puntos aislado es frágil y una invitación abierta al corte.',
        },
        {
          id: 'c',
          text: 'El Salto de Caballo nunca depende de ninguna escalera para defenderse del corte',
          isCorrect: false,
          explanation:
            'Que un salto de caballo pueda cortarse o no depende directamente de si la escalera favorece al atacante o al defensor (p. 107, Dia. 9–10).',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. Formas Cortables e Incortables: Salto de 1 Punto, 2 Puntos y Cuello de Perro',
        body: 'El Salto de Un Punto (Ikkentobi) suele ser seguro, pero cuando tus posiciones vecinas se fortalecen puedes insertar una Cuña (Warikomi) en medio y cortarlo por Miai (p. 105, Dia. 3). En cambio, la extensión Cuello de Perro (a un salto de caballo de dos piedras conectadas) es incortable directamente porque responde con Miai.',
        deepDive:
          'Sin embargo, como revela Davies en la pág. 110 (Dia. 4–5), si el enemigo combina un Cuello de Perro con un Salto de Un Punto, puedes sacrificar una piedra dentro del Cuello de Perro para construir el muro que corta el Salto de Un Punto.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 4, y: 3, color: 'BLACK' },
            { x: 4, y: 5, color: 'BLACK' },
            { x: 2, y: 3, color: 'WHITE' },
            { x: 2, y: 5, color: 'WHITE' },
            { x: 6, y: 4, color: 'WHITE' },
          ],
          markers: [
            { x: 4, y: 4, type: 'SUCCESS', label: '1' },
            { x: 3, y: 4, type: 'CIRCLE', label: '2' },
            { x: 5, y: 4, type: 'CIRCLE', label: '3' },
          ],
          caption:
            'Davies Cap. 7 (p. 105, Dia. 3): Con apoyo blanco alrededor, la cuña 1 en E5 corta el salto de un punto negro.',
        },
      },
      {
        title: '2. Cortar a través del Salto de Caballo (Cutting Through the Knight\'s Move)',
        body: 'Cuando el enemigo enlaza sus piedras con dos saltos de caballo consecutivos (o un cuello de perro y un salto), no empujes por donde él pueda conectarse sólidamente. Golpea primero en el punto de sacrificio interior: si lo captura, habrás ganado las piedras de apoyo necesarias para cortar su otra conexión.',
        deepDive:
          'En el Diagrama 2 de la pág. 109, Negro ofrece una piedra de sacrificio en la cintura del salto de caballo superior y utiliza su piedra de apoyo para partir en dos la línea blanca.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 2, y: 2, color: 'WHITE' },
            { x: 3, y: 4, color: 'WHITE' },
            { x: 2, y: 6, color: 'WHITE' },
            { x: 3, y: 3, color: 'BLACK' },
            { x: 4, y: 4, color: 'BLACK' },
            { x: 4, y: 5, color: 'BLACK' },
            { x: 3, y: 6, color: 'BLACK' },
          ],
          markers: [
            { x: 2, y: 4, type: 'SUCCESS', label: '1' },
            { x: 2, y: 5, type: 'CIRCLE', label: '3' },
          ],
          caption:
            'Davies Cap. 7 (p. 109): Negro 1 en C5 prepara el corte definitivo en C4 (3).',
        },
      },
    ],
    demonstration: {
      title: 'Demostración: Cómo cortar dos Saltos de Caballo con una combinación (Davies p. 109)',
      size: 9,
      steps: [
        {
          title: '1. La línea blanca de dos saltos de caballo',
          narration:
            'Blanco parece conectado entre C7, D5 y C3. Pero Negro tiene la piedra clave D6 y el muro E5–E4.',
          stones: [
            { x: 2, y: 2, color: 'WHITE' },
            { x: 3, y: 4, color: 'WHITE' },
            { x: 2, y: 6, color: 'WHITE' },
            { x: 3, y: 3, color: 'BLACK' },
            { x: 4, y: 4, color: 'BLACK' },
            { x: 4, y: 5, color: 'BLACK' },
            { x: 3, y: 6, color: 'BLACK' },
          ],
          turn: 'BLACK',
        },
        {
          title: '2. Negro golpea en C5 ofreciendo un sacrificio',
          narration:
            'Negro coloca su piedra en C5 (x=2, y=4). Si Blanco conecta arriba, Negro corta abajo en D4/C4.',
          stones: [
            { x: 2, y: 2, color: 'WHITE' },
            { x: 3, y: 4, color: 'WHITE' },
            { x: 2, y: 6, color: 'WHITE' },
            { x: 3, y: 3, color: 'BLACK' },
            { x: 4, y: 4, color: 'BLACK' },
            { x: 4, y: 5, color: 'BLACK' },
            { x: 3, y: 6, color: 'BLACK' },
            { x: 2, y: 4, color: 'BLACK' },
          ],
          lastMove: { x: 2, y: 4 },
          turn: 'WHITE',
        },
        {
          title: '3. Blanco intenta resistir en D4 y Negro corta en C4',
          narration:
            'Cuando Blanco juega D4 para mantener el enlace inferior, Negro corta en C4 dejando a D5–D4 sin salida por la presencia de D6.',
          stones: [
            { x: 2, y: 2, color: 'WHITE' },
            { x: 3, y: 4, color: 'WHITE' },
            { x: 2, y: 6, color: 'WHITE' },
            { x: 3, y: 3, color: 'BLACK' },
            { x: 4, y: 4, color: 'BLACK' },
            { x: 4, y: 5, color: 'BLACK' },
            { x: 3, y: 6, color: 'BLACK' },
            { x: 2, y: 4, color: 'BLACK' },
            { x: 3, y: 5, color: 'WHITE' },
            { x: 2, y: 5, color: 'BLACK' },
          ],
          lastMove: { x: 2, y: 5 },
          markers: [{ x: 2, y: 5, type: 'SUCCESS', label: '✓' }],
          turn: 'WHITE',
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l30-gd-1',
        prompt:
          'Inicia la combinación del Capítulo 7 de Davies para cortar la línea blanca de saltos de caballo C7–D5–C3.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 2, color: 'WHITE' },
          { x: 3, y: 4, color: 'WHITE' },
          { x: 2, y: 6, color: 'WHITE' },
          { x: 3, y: 3, color: 'BLACK' },
          { x: 4, y: 4, color: 'BLACK' },
          { x: 4, y: 5, color: 'BLACK' },
          { x: 3, y: 6, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 2, y: 4 }],
        correctFeedback:
          '¡Golpe exacto en C5! Preparas el corte decisivo sin importar de qué lado responda Blanco.',
        wrongFeedback: {
          '3,5': 'Empezar en D4 permite a Blanco conectar sólidamente en C5.',
        },
        defaultWrongFeedback: 'Juega primero en C5 (x=2, y=4).',
        hints: [
          'Apunta a la cintura del salto de caballo a la izquierda de D5.',
          'Juega en C5 (x=2, y=4).',
        ],
      },
    ],
    independentPractice: [
      {
        id: 'l30-prac-1',
        prompt:
          'Ejercicio 1 (Cortar un Salto de Un Punto con apoyo — Davies p. 105, Dia. 3): Tus piedras blancas rodean el salto negro E6–E4. Inserta la cuña central para partirlo.',
        boardSize: 9,
        initialStones: [
          { x: 4, y: 3, color: 'BLACK' },
          { x: 4, y: 5, color: 'BLACK' },
          { x: 2, y: 3, color: 'WHITE' },
          { x: 2, y: 5, color: 'WHITE' },
          { x: 6, y: 4, color: 'WHITE' },
        ],
        turn: 'WHITE',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 4 }],
        correctFeedback:
          '¡Cuña impecable en E5! Gracias a tus piedras en C6, C4 y G5, Negro no puede impedir quedar dividido.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Inserta la cuña directamente en medio del salto negro: E5 (x=4, y=4).',
        hints: [
          'Mira el espacio vacío entre las dos piedras negras E6 y E4.',
          'Juega en E5 (x=4, y=4).',
        ],
      },
      {
        id: 'l30-prac-2',
        prompt:
          'Ejercicio 2 (Cortar un Salto de Dos Puntos frágil — Davies p. 106, Dia. 5): Inicia el corte más severo contra el salto de dos puntos negro D6–D3.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 3, color: 'BLACK' },
          { x: 3, y: 6, color: 'BLACK' },
          { x: 5, y: 4, color: 'WHITE' },
        ],
        turn: 'WHITE',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 3, y: 4 }, { x: 3, y: 5 }],
        correctFeedback:
          '¡Muy bien! Al penetrar directamente en la línea del salto de dos puntos (D5 o D4), separas las dos piedras negras.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Juega directamente entre las dos piedras negras en D5 (x=3, y=4) o D4 (x=3, y=5).',
        hints: [
          'Un salto de dos puntos aislado es vulnerable en sus dos intersecciones centrales.',
          'Juega en D5 (x=3, y=4).',
        ],
      },
      {
        id: 'l30-prac-3',
        prompt:
          'Ejercicio 3: Blanco tiene una fila de saltos de un punto (E7–E5–E3), pero tu fuerza negra es máxima alrededor de E4. Corta en el punto donde estás más fuerte (Davies p. 108, Prob. 1).',
        boardSize: 9,
        initialStones: [
          { x: 4, y: 2, color: 'WHITE' },
          { x: 4, y: 4, color: 'WHITE' },
          { x: 4, y: 6, color: 'WHITE' },
          { x: 3, y: 5, color: 'BLACK' },
          { x: 5, y: 5, color: 'BLACK' },
          { x: 3, y: 6, color: 'BLACK' },
          { x: 5, y: 6, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 5 }],
        correctFeedback:
          '¡Corte certero en E4! Con D4 y F4 ya colocadas, cortas y capturas la piedra inferior blanca al instante.',
        wrongFeedback: {
          '4,3': 'Cortar arriba en E6 donde no tienes apoyo permite a Blanco defenderse.',
        },
        defaultWrongFeedback: 'Corta en E4 (x=4, y=5) donde tus piedras negras ya flanquean ambos lados.',
        hints: [
          'Compara el apoyo que tienes en la fila 4 frente a la fila 6.',
          'Juega en E4 (x=4, y=5).',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'Incluso un Salto de Un Punto (Ikkentobi) puede cortarse mediante una cuña (Warikomi) cuando tus grupos vecinos son fuertes.',
        'Un Salto de Dos Puntos aislado es frágil, mientras que desde un muro de dos piedras es mucho más resistente.',
        'Para cortar una cadena de saltos de caballo o cuello de perro, ofrece primero un sacrificio que construya la fuerza de corte.',
      ],
      vocabulary: [
        {
          term: 'Inu-no-kao (Cuello de perro)',
          japanese: '犬の顔',
          definition: 'Extensión a un salto de caballo de dos piedras conectadas; es incortable directamente pero vulnerable a sacrificios.',
        },
        {
          term: 'Warikomi (Cuña)',
          japanese: '割り込み',
          definition: 'Introducir una piedra directamente entre dos piedras enemigas separadas por un espacio.',
        },
      ],
    },
    transferQuestion: {
      id: 'l30-transfer',
      prompt:
        'Pregunta de transferencia: Tras tu primera jugada en C5, Blanco jugó D4 para intentar conectar. Completa el corte jugando en C4.',
      boardSize: 9,
      initialStones: [
        { x: 2, y: 2, color: 'WHITE' },
        { x: 3, y: 4, color: 'WHITE' },
        { x: 2, y: 6, color: 'WHITE' },
        { x: 3, y: 3, color: 'BLACK' },
        { x: 4, y: 4, color: 'BLACK' },
        { x: 4, y: 5, color: 'BLACK' },
        { x: 3, y: 6, color: 'BLACK' },
        { x: 2, y: 4, color: 'BLACK' },
        { x: 3, y: 5, color: 'WHITE' },
      ],
      turn: 'BLACK',
      exerciseType: 'PLACE_STONE',
      validCoords: [{ x: 2, y: 5 }],
      correctFeedback:
        '¡Dominado! Con C4 partes la línea blanca y las dos piedras centrales D5–D4 quedan atrapadas.',
      wrongFeedback: {},
      defaultWrongFeedback: 'Corta debajo de C5 jugando en C4 (x=2, y=5).',
      hints: [
        'Conecta con C5 cortando el salto blanco en C4.',
        'Juega en C4 (x=2, y=5).',
      ],
    },
  },
];
