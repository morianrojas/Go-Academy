import { PuzzleContent } from '../types/go';

/**
 * 16 Nuevos Problemas Tácticos (#49 a #64)
 * Basados directamente en "Tesuji" (Elementary Go Series, Vol. 3) de James Davies.
 * Cubren capítulos clave sin repetir problemas previos:
 * - Cap. 2: Captura de piedras de corte (Keima, Escalera Floja, Pinza, Nariz, Corte Cruzado)
 * - Cap. 3: Amputar piedras de corte (Shibori/Exprimir, Doble Amenaza, Colocación/Oki)
 * - Cap. 4: El mejor Ko y sacrificios de lectura
 * - Cap. 5: Cuando las libertades cuentan (Descenso al borde, Tesuji al estómago)
 * - Cap. 6 y 7: Enlazar grupos por falta de libertades y cortar el salto de caballo
 * - Cap. 8, 11 y 14: Cuña en territorio enemigo, Retroceso letal (Hiki) y Contra-Atari (Gyaku-atari)
 */
export const TESUJI_PUZZLES_CATALOG: PuzzleContent[] = [
  // #49: TESUJI DE SALTO DE CABALLO (DAVIES CAP. 2)
  {
    id: 'puzzle-49-tesuji-caballo-captura',
    number: 49,
    title: 'El Salto de Caballo que Atrapa',
    theme: 'REDES',
    themeLabel: 'Redes (Geta)',
    difficulty: 'FACIL',
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
    objective:
      'Juega Negro: Captura las dos piedras blancas de corte (D5–E5) usando el Tesuji de Salto de Caballo respecto a tu piedra débil en F6.',
    acceptedFirstMoves: [{ x: 4, y: 5 }],
    variations: [
      {
        playerMove: { x: 4, y: 5 },
        opponentReply: { x: 5, y: 4 },
        nextValidMoves: [{ x: 6, y: 4 }],
        explanationEs:
          '¡Excelente Tesuji de Caballo (Keima) en E4! Aunque Blanco intente asomar en F5, bloqueas en G5 y las piedras blancas de corte quedan completamente atrapadas sin poder dar atari a F6.',
      },
    ],
    wrongMoveExplanations: {
      '5,4': 'Si juegas directamente en F5, Blanco empuja en E4 y escapa hacia abajo rompiendo tu cerco.',
      '3,5': 'Si das atari directo en D4, Blanco extiende a E4 y luego escapa dando atari a tu piedra débil de F6.',
    },
    defaultWrongExplanation:
      'Observa tu piedra débil en F6 (x=5, y=3): haz un salto de caballo (Keima) hacia E4 para cerrar todas las rutas de escape.',
    hints: [
      'Pista 1: Las piedras blancas en D5–E5 son piedras de corte; no les des atari directo en D4 ni en F5.',
      'Pista 2: Como explica James Davies (Cap. 2, p. 16), el tesuji está a un salto de caballo de la piedra débil F6.',
      'Pista 3: Juega en E4 (x=4, y=5) y, cuando Blanco juegue F5, bloquea en G5.',
    ],
    solutionExplanation:
      'El Tesuji de Salto de Caballo en E4 protege indirectamente la debilidad de F6 y encierra a las piedras de corte D5–E5 en una red inquebrantable.',
    commonMistake: 'Dar atari apresurado empujando a las piedras enemigas hacia la libertad de nuestra piedra débil.',
    prerequisites: ['lesson-26-piedras-corte-escalera-floja'],
    relatedLessonId: 'lesson-26-piedras-corte-escalera-floja',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 45,
    xpBase: 5,
    xpNoHints: 7,
    markers: [
      { x: 3, y: 4, type: 'TRIANGLE' },
      { x: 4, y: 4, type: 'TRIANGLE' },
    ],
  },

  // #50: ESCALERA FLOJA (YURUMI-SHICHO — DAVIES CAP. 2)
  {
    id: 'puzzle-50-escalera-floja-yurumishicho',
    number: 50,
    title: 'La Escalera Floja hacia el Borde (Yurumi-shicho)',
    theme: 'ESCALERAS',
    themeLabel: 'Escaleras (Shicho)',
    difficulty: 'FACIL',
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
    objective:
      'Juega Negro (Secuencia en 2 pasos): Atrapa las piedras blancas de corte D8–E8 en una Escalera Floja (Yurumi-shicho) conduciéndolas hacia el borde izquierdo.',
    acceptedFirstMoves: [{ x: 2, y: 2 }],
    variations: [
      {
        playerMove: { x: 2, y: 2 },
        opponentReply: { x: 2, y: 1 },
        nextValidMoves: [{ x: 1, y: 1 }],
        explanationEs:
          '¡Escalera Floja perfecta! Con C7 cierras el paso interior; cuando Blanco extiende a C8, lo bloqueas en B8 contra el borde y no puede escapar.',
      },
    ],
    wrongMoveExplanations: {
      '2,1': 'Si das atari directo en C8 desde afuera, Blanco escapa hacia abajo por D7 capturando tus piedras centrales.',
      '3,2': 'Si das atari en D7, Blanco extiende a C8 con 3 libertades libres hacia el lado izquierdo.',
    },
    defaultWrongExplanation:
      'No des atari directo: coloca tu piedra en C7 para dejar a Blanco con solo 2 libertades y guiarlo hacia el borde.',
    hints: [
      'Pista 1: Si das atari en C8, Blanco huye por D7; si das atari en D7, Blanco huye por C8.',
      'Pista 2: En la Escalera Floja (Davies Cap. 2, p. 18), bloqueas la salida diagonal en C7 manteniendo a Blanco con 2 libertades.',
      'Pista 3: Juega primero en C7 (x=2, y=2) y tras C8 bloquea en B8 (x=1, y=1).',
    ],
    solutionExplanation:
      'La Escalera Floja (Yurumi-shicho) persigue a un grupo con 2 libertades apoyándose en el borde del tablero hasta dejarlo en atari.',
    commonMistake: 'Creer que solo se puede perseguir dando atari directo en cada turno.',
    prerequisites: ['lesson-26-piedras-corte-escalera-floja'],
    relatedLessonId: 'lesson-26-piedras-corte-escalera-floja',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 50,
    xpBase: 5,
    xpNoHints: 7,
    markers: [
      { x: 3, y: 1, type: 'TRIANGLE' },
      { x: 4, y: 1, type: 'TRIANGLE' },
    ],
  },

  // #51: TESUJI DE PINZA (HASAMI-TSUKE — DAVIES CAP. 2)
  {
    id: 'puzzle-51-tesuji-pinza-hasamitsuke',
    number: 51,
    title: 'La Pinza que Crea Miai (Hasami-tsuke)',
    theme: 'TESUJI',
    themeLabel: 'Tesuji y sacrificios',
    difficulty: 'INTERMEDIO',
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
    objective:
      'Juega Blanco: Parece imposible capturar las piedras negras de corte D5–E5 porque si cortas en E6 escapan por D6. Usa el Tesuji de Pinza (Hasami-tsuke) para hacer miai de ambos puntos.',
    acceptedFirstMoves: [{ x: 3, y: 3 }],
    variations: [
      {
        playerMove: { x: 3, y: 3 },
        opponentReply: { x: 4, y: 3 },
        nextValidMoves: [{ x: 2, y: 3 }],
        explanationEs:
          '¡Pinza magistral en D6 (Hasami-tsuke)! Cuando Negro conecta en E6, bloqueas en C6 y las tres piedras negras quedan encerradas sin salida.',
      },
    ],
    wrongMoveExplanations: {
      '4,3': 'Si cortas directamente en E6, Negro extiende a D6 y conecta con su piedra de D7.',
    },
    defaultWrongExplanation:
      'Aplica el Tesuji de Pinza (Davies Cap. 2, p. 21) jugando en el flanco D6 de la piedra negra D5.',
    hints: [
      'Pista 1: Si cortas en E6, Negro escapa por D6.',
      'Pista 2: Coloca tu piedra blanca directamente en D6 (en contacto con D5) para crear Miai entre E6 y C6.',
      'Pista 3: Juega en D6 (x=3, y=3) y responde a E6 con C6 (x=2, y=3).',
    ],
    solutionExplanation:
      'El Tesuji de Pinza (Hasami-tsuke) en D6 quita la ruta de escape antes de cortar, dejando a Negro sin defensa.',
    commonMistake: 'Cortar impulsivamente en E6 permitiendo que las piedras de corte escapen hacia el centro.',
    prerequisites: ['lesson-27-tesuji-pinza-nariz-corte-cruzado'],
    relatedLessonId: 'lesson-27-tesuji-pinza-nariz-corte-cruzado',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 50,
    xpBase: 5,
    xpNoHints: 7,
    markers: [
      { x: 3, y: 4, type: 'TRIANGLE' },
      { x: 4, y: 4, type: 'TRIANGLE' },
    ],
  },

  // #52: GOLPE EN LA NARIZ (HANA-TSUKE — DAVIES CAP. 2)
  {
    id: 'puzzle-52-tesuji-nariz-hanatsuke',
    number: 52,
    title: 'El Tesuji en la Nariz (Hana-tsuke)',
    theme: 'TESUJI',
    themeLabel: 'Tesuji y sacrificios',
    difficulty: 'INTERMEDIO',
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
    objective:
      'Juega Negro: Captura el par de piedras blancas D7–E7 antes de que Blanco juegue en D6. Una jugada sin contacto sería demasiado lenta: golpea directo en la "nariz".',
    acceptedFirstMoves: [{ x: 2, y: 2 }],
    variations: [
      {
        playerMove: { x: 2, y: 2 },
        opponentReply: { x: 3, y: 1 },
        nextValidMoves: [{ x: 2, y: 1 }],
        explanationEs:
          '¡Golpe exacto en la nariz en C7 (Hana-tsuke)! Proteges el corte de D6 y conduces a las piedras blancas hacia el borde superior con C8.',
      },
    ],
    wrongMoveExplanations: {
      '3,3': 'Defender pasivamente en D6 permite a Blanco extenderse a C7 y escapar con facilidad.',
      '3,1': 'Si das atari en D8, Blanco juega en D6 poniendo en peligro tu forma.',
    },
    defaultWrongExplanation:
      'Golpea directamente en la punta ("nariz") del par blanco D7–E7 jugando en C7.',
    hints: [
      'Pista 1: Blanco amenaza con salir por D6 o extender a C7.',
      'Pista 2: El Tesuji de la Nariz (Davies Cap. 2, p. 24) hace contacto frontal con las dos piedras enemigas.',
      'Pista 3: Juega en C7 (x=2, y=2) y cuando Blanco juegue D8, bloquea en C8 (x=2, y=1).',
    ],
    solutionExplanation:
      'El contacto en la nariz (C7) cumple doble función: evita el corte en D6 y atrapa a las piedras blancas contra el borde.',
    commonMistake: 'Defender pasivamente el punto de corte D6 dejando escapar a las piedras rivales.',
    prerequisites: ['lesson-27-tesuji-pinza-nariz-corte-cruzado'],
    relatedLessonId: 'lesson-27-tesuji-pinza-nariz-corte-cruzado',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 50,
    xpBase: 5,
    xpNoHints: 7,
    markers: [
      { x: 3, y: 2, type: 'TRIANGLE' },
      { x: 4, y: 2, type: 'TRIANGLE' },
    ],
  },

  // #53: CORTE CRUZADO Y FALTA DE LIBERTADES (DAVIES CAP. 2)
  {
    id: 'puzzle-53-corte-cruzado-captura',
    number: 53,
    title: 'Corte Cruzado y Contra-Atari',
    theme: 'CONECTAR_Y_CORTAR',
    themeLabel: 'Conectar y cortar',
    difficulty: 'INTERMEDIO',
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
    objective:
      'Juega Negro (Secuencia en 2 pasos): No des atari prematuro en E5. Usa el contacto y Corte Cruzado para dejar a las piedras blancas D6–E6 sin libertades.',
    acceptedFirstMoves: [{ x: 4, y: 4 }, { x: 5, y: 3 }],
    variations: [
      {
        playerMove: { x: 5, y: 3 },
        opponentReply: { x: 4, y: 4 },
        nextValidMoves: [{ x: 3, y: 5 }, { x: 4, y: 5 }],
        explanationEs:
          '¡Excelente lectura! Al golpear en F6 dejas a las dos piedras blancas D6–E6 con una sola libertad en E5; incluso si Blanco juega en E5, sus tres piedras quedan con una sola libertad y las capturas.',
      },
      {
        playerMove: { x: 4, y: 4 },
        opponentReply: { x: 5, y: 3 },
        nextValidMoves: [{ x: 6, y: 3 }],
        explanationEs:
          '¡Muy bien! Al jugar en E5 pones en atari a D6–E6 y cuando Blanco extiende a F6 lo persigues en G6.',
      },
    ],
    wrongMoveExplanations: {},
    defaultWrongExplanation:
      'Ataca directamente las dos piedras blancas de corte D6–E6 quitándoles sus libertades en F6 o E5.',
    hints: [
      'Pista 1: Las piedras blancas en D6–E6 separan tus dos grupos negros pero solo tienen 2 libertades (E5 y F6).',
      'Pista 2: Si juegas en F6 (x=5, y=3), pones en atari inmediato al par D6–E6.',
      'Pista 3: Juega en F6 (o E5) y continúa reduciendo la única salida de Blanco.',
    ],
    solutionExplanation:
      'Cuando las piedras de corte enemigas tienen pocas libertades, atacarlas directamente une tus dos grupos negros.',
    commonMistake: 'Jugar lejos permitiendo que las dos piedras blancas se extiendan y ganen libertades.',
    prerequisites: ['lesson-27-tesuji-pinza-nariz-corte-cruzado'],
    relatedLessonId: 'lesson-27-tesuji-pinza-nariz-corte-cruzado',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 45,
    xpBase: 5,
    xpNoHints: 7,
    markers: [
      { x: 3, y: 3, type: 'TRIANGLE' },
      { x: 4, y: 3, type: 'TRIANGLE' },
    ],
  },

  // #54: EXPRIMIR LIBERTADES (SHIBORI — DAVIES CAP. 3)
  {
    id: 'puzzle-54-exprimir-shibori-esquina',
    number: 54,
    title: 'La Técnica de Exprimir (Shibori)',
    theme: 'TESUJI',
    themeLabel: 'Tesuji y sacrificios',
    difficulty: 'INTERMEDIO',
    boardSize: 9,
    initialStones: [
      { x: 5, y: 4, color: 'BLACK' },
      { x: 6, y: 4, color: 'BLACK' },
      { x: 7, y: 4, color: 'BLACK' },
      { x: 4, y: 5, color: 'BLACK' },
      { x: 4, y: 6, color: 'BLACK' },
      { x: 4, y: 7, color: 'BLACK' },
      { x: 5, y: 5, color: 'WHITE' },
      { x: 6, y: 5, color: 'WHITE' },
      { x: 7, y: 5, color: 'WHITE' },
      { x: 5, y: 6, color: 'WHITE' },
      { x: 5, y: 7, color: 'WHITE' },
      { x: 6, y: 7, color: 'BLACK' },
      { x: 7, y: 6, color: 'BLACK' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro: El grupo blanco de 5 piedras (F4–G4–H4–F3–F2) ya tiene pocas libertades. Encuentra el golpe que lo pone en atari inmediato y exprime su forma.',
    acceptedFirstMoves: [{ x: 6, y: 6 }, { x: 8, y: 5 }, { x: 5, y: 8 }],
    variations: [
      {
        playerMove: { x: 6, y: 6 },
        explanationEs:
          '¡Golpe vital en G3! Ocupas la libertad interior crítica del grupo blanco, dejándolo completamente colapsado.',
      },
      {
        playerMove: { x: 8, y: 5 },
        explanationEs:
          '¡Excelente cierre en J4! Reduces las libertades exteriores del grupo blanco en la esquina.',
      },
      {
        playerMove: { x: 5, y: 8 },
        explanationEs:
          '¡Buen bloqueo en F1! Cierras la libertad del borde inferior del grupo blanco.',
      },
    ],
    wrongMoveExplanations: {},
    defaultWrongExplanation:
      'Busca el punto vital interior G3 (x=6, y=6) donde se cruzan las piedras blancas F3 y G4.',
    hints: [
      'Pista 1: Observa la forma en L de las piedras blancas F4–G4–H4 y F3–F2.',
      'Pista 2: El punto interior G3 (x=6, y=6) toca dos piedras blancas y une tus piedras G2 y H3.',
      'Pista 3: Juega en G3 (x=6, y=6).',
    ],
    solutionExplanation:
      'Colocar la piedra en el ángulo interior G3 exprime las libertades del grupo blanco y asegura la victoria en la lucha local.',
    commonMistake: 'Jugar pasivamente por fuera sin atacar el punto vital de las libertades rivales.',
    prerequisites: ['lesson-31-amputar-exprimir-shibori-colocacion'],
    relatedLessonId: 'lesson-31-amputar-exprimir-shibori-colocacion',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 45,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 5, y: 5, type: 'TRIANGLE' }],
  },

  // #55: CONSTRUCCIÓN DE DOBLE AMENAZA DE CAPTURA (DAVIES CAP. 3)
  {
    id: 'puzzle-55-construir-doble-escalera',
    number: 55,
    title: 'Doble Amenaza de Captura',
    theme: 'TESUJI',
    themeLabel: 'Tesuji y sacrificios',
    difficulty: 'INTERMEDIO',
    boardSize: 9,
    initialStones: [
      { x: 4, y: 5, color: 'BLACK' },
      { x: 4, y: 6, color: 'BLACK' },
      { x: 3, y: 5, color: 'WHITE' },
      { x: 3, y: 6, color: 'WHITE' },
      { x: 5, y: 5, color: 'WHITE' },
      { x: 5, y: 6, color: 'WHITE' },
      { x: 2, y: 4, color: 'BLACK' },
      { x: 6, y: 4, color: 'BLACK' },
      { x: 3, y: 3, color: 'BLACK' },
      { x: 5, y: 3, color: 'BLACK' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro: Tus dos piedras en E4–E3 están atrapadas entre dos pares blancos (D4–D3 y F4–F3). Juega la cuña central que amenaza capturar uno de los dos pares blancos por Miai.',
    acceptedFirstMoves: [{ x: 4, y: 4 }],
    variations: [
      {
        playerMove: { x: 4, y: 4 },
        opponentReply: { x: 3, y: 4 },
        nextValidMoves: [{ x: 5, y: 4 }],
        explanationEs:
          '¡Excelente Tesuji en E5! Al extender a E5 amenazas cortar y capturar en D5 o en F5. Cuando Blanco defiende D5, das atari en F5 y rescatas tus piedras.',
      },
    ],
    wrongMoveExplanations: {
      '4,7': 'Descender a E2 no amenaza a los grupos blancos de los lados y Blanco te encerrará en E5.',
    },
    defaultWrongExplanation:
      'Avanza por el centro en E5 (x=4, y=4) para amenazar simultáneamente los dos puntos de corte D5 y F5.',
    hints: [
      'Pista 1: Tus piedras de apoyo en C5, D6, F6 y G5 preparan dos redes/escaleras a ambos lados.',
      'Pista 2: Si extiendes tus piedras E4–E3 hacia E5, creas Miai entre D5 y F5.',
      'Pista 3: Juega en E5 (x=4, y=4) y luego responde en F5 (x=5, y=4).',
    ],
    solutionExplanation:
      'Como explica Davies en "Ladder-Building" (Cap. 3, p. 38), avanzar al punto central E5 amenaza capturar por la izquierda o por la derecha en Miai.',
    commonMistake: 'Rendirse y abandonar las piedras E4–E3 sin notar la doble amenaza en D5 y F5.',
    prerequisites: ['lesson-31-amputar-exprimir-shibori-colocacion'],
    relatedLessonId: 'lesson-31-amputar-exprimir-shibori-colocacion',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 50,
    xpBase: 5,
    xpNoHints: 7,
    markers: [
      { x: 4, y: 5, type: 'TRIANGLE' },
      { x: 4, y: 6, type: 'TRIANGLE' },
    ],
  },

  // #56: COLOCACIÓN (OKI) PARA AMPUTAR PIEDRAS (DAVIES CAP. 3)
  {
    id: 'puzzle-56-colocacion-oki-amputar',
    number: 56,
    title: 'El Tesuji de Colocación (Oki)',
    theme: 'TESUJI',
    themeLabel: 'Tesuji y sacrificios',
    difficulty: 'INTERMEDIO',
    boardSize: 9,
    initialStones: [
      { x: 2, y: 5, color: 'BLACK' },
      { x: 3, y: 5, color: 'BLACK' },
      { x: 3, y: 6, color: 'BLACK' },
      { x: 2, y: 6, color: 'WHITE' },
      { x: 1, y: 6, color: 'WHITE' },
      { x: 1, y: 4, color: 'WHITE' },
      { x: 2, y: 3, color: 'WHITE' },
      { x: 4, y: 4, color: 'BLACK' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro: Blanco dejó un defecto entre sus piedras de arriba (B5) y las de abajo (B3–C3). Coloca una piedra en el punto vital B4 (Oki) para amputar y capturar las piedras inferiores.',
    acceptedFirstMoves: [{ x: 1, y: 5 }],
    variations: [
      {
        playerMove: { x: 1, y: 5 },
        opponentReply: { x: 2, y: 4 },
        nextValidMoves: [{ x: 1, y: 7 }, { x: 2, y: 7 }],
        explanationEs:
          '¡Colocación precisa en B4! Separas las piedras blancas de B3–C3 del resto de su grupo y las dejas atrapadas en la esquina.',
      },
    ],
    wrongMoveExplanations: {
      '2,7': 'Si juegas directo en C2, Blanco conecta sólidamente en B4 y salva todas sus piedras.',
    },
    defaultWrongExplanation:
      'Usa el Tesuji de Colocación en B4 (x=1, y=5) para impedir que B3–C3 se conecten con B5.',
    hints: [
      'Pista 1: Las piedras blancas en B3–C3 necesitan pasar por B4 para conectarse con B5.',
      'Pista 2: Si Blanco juega en B4 está seguro; por lo tanto, el punto vital de Negro también es B4.',
      'Pista 3: Juega en B4 (x=1, y=5).',
    ],
    solutionExplanation:
      'El Tesuji de Colocación (Oki) en B4 se sitúa justo en el punto de enlace rival, amputando las dos piedras inferiores.',
    commonMistake: 'Atacar desde abajo en C2 empujando a Blanco a conectarse en B4.',
    prerequisites: ['lesson-31-amputar-exprimir-shibori-colocacion'],
    relatedLessonId: 'lesson-31-amputar-exprimir-shibori-colocacion',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 50,
    xpBase: 5,
    xpNoHints: 7,
    markers: [
      { x: 1, y: 6, type: 'TRIANGLE' },
      { x: 2, y: 6, type: 'TRIANGLE' },
    ],
  },

  // #57: LECTURA PROFUNDA EN EL BORDE: DESTRUIR EL OJO Y DAMEZUMARI (DAVIES CAP. 1 DIA. 20)
  {
    id: 'puzzle-57-el-mejor-ko-throwin',
    number: 57,
    title: 'Lectura hasta el Final: Robar el Ojo',
    theme: 'VIDA_Y_MUERTE',
    themeLabel: 'Vida y muerte (Tsumego)',
    difficulty: 'AVANZADO',
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
    objective:
      'Juega Negro: El grupo blanco del borde derecho (H6–H3–J3) busca hacer dos ojos en la columna J. Juega el tesuji en el borde que destruye su ojo e impide que Blanco te capture por falta de libertades.',
    acceptedFirstMoves: [{ x: 8, y: 4 }, { x: 8, y: 3 }],
    variations: [
      {
        playerMove: { x: 8, y: 4 },
        opponentReply: { x: 8, y: 5 },
        nextValidMoves: [{ x: 8, y: 2 }, { x: 8, y: 3 }],
        explanationEs:
          '¡Exacto como el Diagrama 20 del Capítulo 1 de Davies! Al jugar en J5 destruyes el espacio de ojos de Blanco y lo dejas en Damezumari (falta de libertades).',
      },
      {
        playerMove: { x: 8, y: 3 },
        explanationEs:
          '¡Excelente golpe en J6! Reduces el espacio vital del borde derecho dejando a Blanco con un solo ojo.',
      },
    ],
    wrongMoveExplanations: {
      '8,7': 'Si juegas abajo en J2, Blanco juega en J5 y asegura dos ojos en el borde derecho.',
    },
    defaultWrongExplanation:
      'Ataca directamente el punto vital de ojos en la primera línea derecha (J5 o J6).',
    hints: [
      'Pista 1: Blanco necesita dividir la primera línea derecha (columna J) para formar dos ojos.',
      'Pista 2: Como muestra Davies al final del Capítulo 1 (Dia. 20), jugar en la primera línea J5 destruye su forma.',
      'Pista 3: Juega en J5 (x=8, y=4) o J6 (x=8, y=3).',
    ],
    solutionExplanation:
      'La jugada en la primera línea J5 arrebata el segundo ojo de Blanco mientras explota su falta de libertades.',
    commonMistake: 'Rendir la lectura demasiado pronto creyendo que el grupo blanco del borde ya está vivo.',
    prerequisites: ['lesson-25-lectura-tactica-arbol'],
    relatedLessonId: 'lesson-25-lectura-tactica-arbol',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 55,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 7, y: 4, type: 'TRIANGLE' }],
  },

  // #58: DESCENSO DIRECTO AL BORDE EN SEMEAI (SAGARI — DAVIES CAP. 5)
  {
    id: 'puzzle-58-descenso-al-borde-sagari',
    number: 58,
    title: 'Descenso al Borde en Semeai (Sagari)',
    theme: 'LIBERTADES',
    themeLabel: 'Libertades y Atari',
    difficulty: 'INTERMEDIO',
    boardSize: 9,
    initialStones: [
      { x: 6, y: 7, color: 'BLACK' },
      { x: 5, y: 6, color: 'BLACK' },
      { x: 4, y: 6, color: 'BLACK' },
      { x: 4, y: 7, color: 'WHITE' },
      { x: 5, y: 7, color: 'WHITE' },
      { x: 7, y: 6, color: 'WHITE' },
      { x: 7, y: 5, color: 'WHITE' },
      { x: 6, y: 5, color: 'WHITE' },
      { x: 3, y: 5, color: 'BLACK' },
      { x: 2, y: 7, color: 'BLACK' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro: Tus tres piedras (E3–F3–G2) están en carrera de captura contra el par blanco E2–F2. Desciende recto al borde (Sagari) para ganar una libertad extra y vencer en el Semeai.',
    acceptedFirstMoves: [{ x: 6, y: 8 }],
    variations: [
      {
        playerMove: { x: 6, y: 8 },
        opponentReply: { x: 7, y: 7 },
        nextValidMoves: [{ x: 3, y: 7 }, { x: 4, y: 8 }],
        explanationEs:
          '¡Descenso magistral en G1 (Sagari)! Como enseña Davies en el Capítulo 5 (p. 63), descender recto al borde obliga a Blanco a formar un triángulo vacío o gastar jugadas de aproximación, dándote la victoria por 1 libertad.',
      },
    ],
    wrongMoveExplanations: {
      '5,8': 'Si haces Hane en F1 en lugar de descender recto, Blanco te dará atari en G1 y perderás la carrera de captura (Davies p. 64, Dia. 5).',
    },
    defaultWrongExplanation:
      'Desciende en línea recta debajo de G2 hacia el borde inferior G1 (Sagari).',
    hints: [
      'Pista 1: No juegues el Hane en F1 porque expone un punto de corte en G1.',
      'Pista 2: El Descenso al Borde (Sagari) en G1 aumenta tus libertades y protege tu forma.',
      'Pista 3: Juega en G1 (x=6, y=8).',
    ],
    solutionExplanation:
      'En carreras de captura junto al borde, el descenso sólido (Sagari) en G1 vale una jugada extra frente al hane prematuro.',
    commonMistake: 'Jugar Hane en F1 por reflejo, permitiendo que el rival corte o dé atari en G1.',
    prerequisites: ['lesson-32-semeai-avanzado-estomago-ojos-grandes'],
    relatedLessonId: 'lesson-32-semeai-avanzado-estomago-ojos-grandes',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 50,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 6, y: 7, type: 'TRIANGLE' }],
  },

  // #59: TESUJI AL ESTÓMAGO EN SEMEAI (HARA-TSUKE — DAVIES CAP. 5)
  {
    id: 'puzzle-59-tesuji-estomago-haratsuke',
    number: 59,
    title: 'El Tesuji al Estómago (Hara-tsuke)',
    theme: 'TESUJI',
    themeLabel: 'Tesuji y sacrificios',
    difficulty: 'INTERMEDIO',
    boardSize: 9,
    initialStones: [
      { x: 5, y: 7, color: 'BLACK' },
      { x: 6, y: 7, color: 'BLACK' },
      { x: 6, y: 6, color: 'BLACK' },
      { x: 4, y: 7, color: 'WHITE' },
      { x: 4, y: 6, color: 'WHITE' },
      { x: 5, y: 6, color: 'WHITE' },
      { x: 5, y: 5, color: 'BLACK' },
      { x: 6, y: 5, color: 'BLACK' },
      { x: 7, y: 5, color: 'WHITE' },
      { x: 7, y: 6, color: 'WHITE' },
    ],
    turn: 'WHITE',
    objective:
      'Juega Blanco: Tus tres piedras (E2–E3–F3) tienen 3 libertades y las tres piedras negras (F2–G2–G3) tienen 3 libertades. Si juegas F1, Negro bloquea en G1. Golpea en el "estómago" de Negro.',
    acceptedFirstMoves: [{ x: 7, y: 7 }],
    variations: [
      {
        playerMove: { x: 7, y: 7 },
        opponentReply: { x: 6, y: 8 },
        nextValidMoves: [{ x: 5, y: 8 }, { x: 7, y: 8 }],
        explanationEs:
          '¡Brillante Tesuji al Estómago en H2 (Hara-tsuke)! Como muestra Davies (Cap. 5, p. 72), ahora si Negro juega G1 tú enlazas o das atari, dejando a Negro con solo 2 libertades.',
      },
    ],
    wrongMoveExplanations: {
      '5,8': 'Si empiezas con el Hane en F1, Negro desciende a G1 (Davies p. 71, Dia. 2) y te gana la carrera de libertades.',
    },
    defaultWrongExplanation:
      'Juega en el "estómago" de las piedras negras de la esquina colocando tu piedra blanca en H2 (x=7, y=7).',
    hints: [
      'Pista 1: Empezar por el lado izquierdo en F1 permite a Negro defenderse en G1.',
      'Pista 2: Mira el lado derecho de la piedra negra G2: la intersección H2 es su "estómago" (Hara).',
      'Pista 3: Juega en H2 (x=7, y=7).',
    ],
    solutionExplanation:
      'El Tesuji al Estómago (Hara-tsuke) en H2 impide que Negro amplíe sus libertades en el borde y gana el Semeai.',
    commonMistake: 'Empezar con el hane obvio en F1 ayudando a Negro a consolidar sus libertades.',
    prerequisites: ['lesson-32-semeai-avanzado-estomago-ojos-grandes'],
    relatedLessonId: 'lesson-32-semeai-avanzado-estomago-ojos-grandes',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 55,
    xpBase: 5,
    xpNoHints: 7,
    markers: [
      { x: 5, y: 7, type: 'TRIANGLE' },
      { x: 6, y: 7, type: 'TRIANGLE' },
    ],
  },

  // #60: ENLAZAR GRUPOS USANDO FALTA DE LIBERTADES (DAVIES CAP. 6)
  {
    id: 'puzzle-60-conectar-falta-libertades',
    number: 60,
    title: 'Enlace por Falta de Libertades',
    theme: 'CONECTAR_Y_CORTAR',
    themeLabel: 'Conectar y cortar',
    difficulty: 'INTERMEDIO',
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
    objective:
      'Juega Blanco: Tus dos piedras de B5–B4 están separadas de tu grupo inferior C2–D2–D3 por el grupo negro de 4 piedras. Como Negro sufre falta de libertades, juega el Hane en el borde izquierdo para enlazar tus grupos.',
    acceptedFirstMoves: [{ x: 0, y: 5 }, { x: 0, y: 6 }],
    variations: [
      {
        playerMove: { x: 0, y: 5 },
        opponentReply: { x: 0, y: 6 },
        nextValidMoves: [{ x: 0, y: 7 }],
        explanationEs:
          '¡Enlace impecable en A4! Como el grupo negro tiene solo 2 libertades, no puede bloquear tu paso por la columna A sin quedar en atari inmediato.',
      },
      {
        playerMove: { x: 0, y: 6 },
        explanationEs:
          '¡Excelente jugada en A3! Reduces directamente las libertades del grupo negro en el borde izquierdo y aseguras la conexión con tus piedras de arriba.',
      },
    ],
    wrongMoveExplanations: {},
    defaultWrongExplanation:
      'Usa la primera línea izquierda (A4 o A3) aprovechando que las 4 piedras negras tienen pocas libertades.',
    hints: [
      'Pista 1: Cuenta las libertades de las 4 piedras negras (B3, C3, C4, B2): solo les quedan libertades en la columna A.',
      'Pista 2: Si desciendes o haces hane en A4/A3, Negro no puede cortarte porque se quedaría en atari.',
      'Pista 3: Juega en A4 (x=0, y=5) o A3 (x=0, y=6).',
    ],
    solutionExplanation:
      'Explotar la falta de libertades (Damezumari) del grupo enemigo permite enlazar grupos amigos por la primera línea (Watari).',
    commonMistake: 'Dar por muertas las piedras superiores sin contar las libertades de las piedras negras que las separan.',
    prerequisites: ['lesson-29-arte-conectar-indirecto-protege-ojos'],
    relatedLessonId: 'lesson-29-arte-conectar-indirecto-protege-ojos',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 50,
    xpBase: 5,
    xpNoHints: 7,
    markers: [
      { x: 1, y: 5, type: 'TRIANGLE' },
      { x: 2, y: 6, type: 'TRIANGLE' },
    ],
  },

  // #61: CORTAR EL SALTO DE CABALLO CON SACRIFICIO (DAVIES CAP. 7)
  {
    id: 'puzzle-61-cortar-salto-caballo-sacrificio',
    number: 61,
    title: 'Cortar el Salto de Caballo',
    theme: 'CONECTAR_Y_CORTAR',
    themeLabel: 'Conectar y cortar',
    difficulty: 'AVANZADO',
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
    objective:
      'Juega Negro (Secuencia en 2 pasos): Blanco parece conectado en el lado izquierdo mediante dos saltos de caballo (C7–D5–C3), pero tu piedra en D6 permite una combinación de corte.',
    acceptedFirstMoves: [{ x: 2, y: 4 }],
    variations: [
      {
        playerMove: { x: 2, y: 4 },
        opponentReply: { x: 3, y: 5 },
        nextValidMoves: [{ x: 2, y: 5 }],
        explanationEs:
          '¡Combinación exacta del Capítulo 7 de Davies (p. 109)! Juegas en la cintura del caballo (C5) y cuando Blanco intenta resistir en D4, cortas en C4 dividiendo a Blanco en dos.',
      },
    ],
    wrongMoveExplanations: {
      '3,5': 'Si empiezas en D4, Blanco conecta sólidamente en C5 y sus tres piedras quedan unidas.',
    },
    defaultWrongExplanation:
      'Golpea primero en el punto simétrico C5 (x=2, y=4) entre las piedras blancas.',
    hints: [
      'Pista 1: No empujes primero en D4 porque ayudas a Blanco a conectarse en C5.',
      'Pista 2: Coloca tu primera piedra negra en C5 (a un salto de D6) amenazando separar tanto arriba como abajo.',
      'Pista 3: Juega C5 (x=2, y=4) y tras D4 corta en C4 (x=2, y=5).',
    ],
    solutionExplanation:
      'Al colocar primero la piedra en C5 en coordinación con D6, cualquier intento blanco de mantener unido un lado permite cortar el otro.',
    commonMistake: 'Tocar en D4 antes de colocar la piedra de invasión en C5.',
    prerequisites: ['lesson-30-cortar-formas-cuello-perro'],
    relatedLessonId: 'lesson-30-cortar-formas-cuello-perro',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 55,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 3, y: 4, type: 'TRIANGLE' }],
  },

  // #62: CUÑA PARA ENTRAR EN TERRITORIO ENEMIGO (DAVIES CAP. 8)
  {
    id: 'puzzle-62-cuna-territorio-warikomi',
    number: 62,
    title: 'La Cuña que Abre el Territorio (Warikomi)',
    theme: 'INVASION_Y_YOSE',
    themeLabel: 'Invasión, Sente y Yose',
    difficulty: 'AVANZADO',
    boardSize: 9,
    initialStones: [
      { x: 5, y: 2, color: 'WHITE' },
      { x: 5, y: 3, color: 'WHITE' },
      { x: 5, y: 5, color: 'WHITE' },
      { x: 6, y: 6, color: 'WHITE' },
      { x: 4, y: 2, color: 'BLACK' },
      { x: 4, y: 3, color: 'BLACK' },
      { x: 4, y: 5, color: 'BLACK' },
      { x: 5, y: 6, color: 'BLACK' },
      { x: 6, y: 7, color: 'BLACK' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro: El territorio blanco del lado derecho tiene un salto de un punto en F6–F4 y un contacto en G3. Inserta la Cuña (Warikomi) en F5 para destruir la frontera blanca.',
    acceptedFirstMoves: [{ x: 5, y: 4 }],
    variations: [
      {
        playerMove: { x: 5, y: 4 },
        opponentReply: { x: 6, y: 4 },
        nextValidMoves: [{ x: 4, y: 4 }, { x: 6, y: 5 }],
        explanationEs:
          '¡Cuña impecable en F5 (Warikomi — Davies Cap. 8, p. 115)! Si Blanco da atari por fuera en G5, conectas en E5 dejando en Miai el corte superior y la captura de F4.',
      },
    ],
    wrongMoveExplanations: {
      '4,4': 'Si juegas pasivamente en E5, Blanco conecta sólidamente en F5 y su territorio derecho queda blindado.',
    },
    defaultWrongExplanation:
      'Introduce la Cuña (Warikomi) directamente en F5 (x=5, y=4), entre las piedras blancas F6 y F4.',
    hints: [
      'Pista 1: El punto que Blanco necesita para defender su frontera es F5.',
      'Pista 2: Como enseña Davies en el Capítulo 8 ("The Wedge Tesuji"), el punto defensivo del rival es tu punto de cuña.',
      'Pista 3: Juega en F5 (x=5, y=4) y luego conecta o corta en E5/G4.',
    ],
    solutionExplanation:
      'La Cuña (Warikomi) en F5 explota la debilidad de la piedra F4 y obliga a Blanco a ceder piedras en Sente o perder su esquina.',
    commonMistake: 'Empujar desde afuera en E5 obligando a Blanco a reparar su propio defecto en F5.',
    prerequisites: ['lesson-33-dentro-territorio-enemigo-escape-muro'],
    relatedLessonId: 'lesson-33-dentro-territorio-enemigo-escape-muro',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 55,
    xpBase: 5,
    xpNoHints: 7,
    markers: [
      { x: 5, y: 3, type: 'TRIANGLE' },
      { x: 5, y: 5, type: 'TRIANGLE' },
    ],
  },

  // #63: RETROCEDER UN ESPACIO PARA CAPTURAR (HIKI — DAVIES CAP. 11)
  {
    id: 'puzzle-63-retroceso-hiki-captura',
    number: 63,
    title: 'Retroceder para Capturar (Hiki)',
    theme: 'FORMA_Y_ATAQUE',
    themeLabel: 'Forma, Ataque y Defensa',
    difficulty: 'AVANZADO',
    boardSize: 9,
    initialStones: [
      { x: 1, y: 5, color: 'WHITE' },
      { x: 1, y: 6, color: 'WHITE' },
      { x: 2, y: 6, color: 'WHITE' },
      { x: 2, y: 5, color: 'BLACK' },
      { x: 2, y: 7, color: 'BLACK' },
      { x: 3, y: 6, color: 'BLACK' },
      { x: 3, y: 7, color: 'BLACK' },
      { x: 1, y: 7, color: 'BLACK' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro: El grupo blanco del borde izquierdo (B4–B3–C3) tiene un solo ojo y busca arrastrarse hacia arriba por la columna B. No hagas Hane en B5: retrocede un espacio (Hiki) en C6 para encerrarlo sin debilidades.',
    acceptedFirstMoves: [{ x: 2, y: 3 }],
    variations: [
      {
        playerMove: { x: 2, y: 3 },
        opponentReply: { x: 1, y: 4 },
        nextValidMoves: [{ x: 1, y: 3 }, { x: 2, y: 4 }],
        explanationEs:
          '¡Dominio total de "Draw Back to Capture" (Davies Cap. 11, p. 146)! Al colocar tranquilamente C6 sin contacto, Blanco no tiene ningún punto de corte que explotar y no puede escapar ni hacer un segundo ojo.',
      },
    ],
    wrongMoveExplanations: {
      '1,4': 'Si haces Hane directo en B5, Blanco cortará o se arrastrará en B6 exponiendo puntos de corte en tu muro C5.',
    },
    defaultWrongExplanation:
      'En lugar de tocar a Blanco en B5, retrocede un espacio sólido a C6 (x=2, y=3).',
    hints: [
      'Pista 1: Tocar a un grupo débil con Hane en B5 le da fuerza para contraatacar tus cortes.',
      'Pista 2: En el Capítulo 11 ("Draw Back to Capture", p. 146), Davies enseña a colocar la piedra un paso atrás en tercera línea.',
      'Pista 3: Juega en C6 (x=2, y=3).',
    ],
    solutionExplanation:
      'Retroceder un espacio (C6) construye una barrera sin puntos de corte que detiene en seco la huida del grupo blanco.',
    commonMistake: 'Jugar Hane de contacto en B5 creando debilidades de corte innecesarias.',
    prerequisites: ['lesson-34-sacrificio-tempo-ataque-doble-hane'],
    relatedLessonId: 'lesson-34-sacrificio-tempo-ataque-doble-hane',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 55,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 1, y: 5, type: 'TRIANGLE' }],
  },

  // #64: EL CONTRA-ATARI (GYAKU-ATARI — DAVIES CAP. 14)
  {
    id: 'puzzle-64-contra-atari-gyakuatari',
    number: 64,
    title: 'Ignorar el Atari: El Contra-Atari (Gyaku-atari)',
    theme: 'TESUJI',
    themeLabel: 'Tesuji y sacrificios',
    difficulty: 'INTERMEDIO',
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
    objective:
      'Juega Negro: Blanco acaba de poner tu piedra central E5 en atari jugando D5. En lugar de escapar pesadamente en E4, ejecuta el Contra-Atari (Gyaku-atari) en F6 contra la piedra blanca F5.',
    acceptedFirstMoves: [{ x: 5, y: 3 }],
    variations: [
      {
        playerMove: { x: 5, y: 3 },
        opponentReply: { x: 4, y: 5 },
        nextValidMoves: [{ x: 4, y: 6 }],
        explanationEs:
          '¡Contra-Atari magistral en F6 (Gyaku-atari — Davies Cap. 14, p. 186)! Dejas en atari a la piedra blanca F5 y, si Blanco captura en E4, lo encierras por fuera con E3 obteniendo una forma exterior dominante.',
      },
    ],
    wrongMoveExplanations: {
      '4,5': 'Si escapas pasivamente del atari en E4, Blanco extiende en F6 logrando una forma excelente mientras tus piedras quedan pesadas (Davies p. 186, Dia. 2).',
    },
    defaultWrongExplanation:
      'No escapes en E4: responde con el Contra-Atari en F6 (x=5, y=3) atacando la piedra blanca F5.',
    hints: [
      'Pista 1: Tu piedra en E5 está en atari, pero escapar en E4 permite a Blanco extenderse cómodamente en F6.',
      'Pista 2: Observa que la piedra blanca F5 tiene solo 2 libertades (E4 y F6).',
      'Pista 3: Juega el Contra-Atari en F6 (x=5, y=3) y, si Blanco captura en E4, bloquéalo en E3 (x=4, y=6).',
    ],
    solutionExplanation:
      'Como enseña James Davies en el Capítulo 14 ("The Counter-Atari Tesuji"), responder a un atari con un contra-atari en el punto vital F6 destruye la forma rival.',
    commonMistake: 'Sacar automáticamente cualquier piedra en atari sin evaluar el contra-atari.',
    prerequisites: ['lesson-28-ignorar-atari-contra-atari'],
    relatedLessonId: 'lesson-28-ignorar-atari-contra-atari',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 45,
    xpBase: 5,
    xpNoHints: 7,
    markers: [
      { x: 4, y: 4, type: 'TRIANGLE' },
      { x: 5, y: 4, type: 'CIRCLE' },
    ],
  },
];
