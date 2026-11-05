import { PuzzleContent } from '../types/go';

/**
 * 23 Nuevos Problemas Tácticos y Estratégicos (#26 a #48)
 * Basados en "Attack and Defense" (Vol. 5) de Akira Ishida y James Davies,
 * "Tesuji" (Vol. 3) de James Davies y principios de Semeai y Nakade.
 * Todos validados automáticamente contra el motor determinista de Go.
 */
export const ATTACK_DEFENSE_PUZZLES_CATALOG: PuzzleContent[] = [
  // #26: ESCAPE CON SALTO DE UN ESPACIO (IKKENTOBI)
  {
    id: 'puzzle-26-escape-salto-centro',
    number: 26,
    title: 'Salto Ligero hacia el Centro (Ikkentobi)',
    theme: 'SALVAR_PIEDRA',
    themeLabel: 'Salvar grupo',
    difficulty: 'PRINCIPIANTE',
    boardSize: 9,
    initialStones: [
      { x: 4, y: 7, color: 'BLACK' },
      { x: 4, y: 6, color: 'BLACK' },
      { x: 2, y: 6, color: 'WHITE' },
      { x: 6, y: 6, color: 'WHITE' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro: Tus dos piedras en E2–E3 están flanqueadas por C3 y G3. Ejecuta el Salto de Un Espacio (Ikkentobi) hacia el centro antes de que Blanco te encierre.',
    acceptedFirstMoves: [{ x: 4, y: 4 }],
    variations: [
      {
        playerMove: { x: 4, y: 4 },
        explanationEs:
          '¡Salto limpio en E5! Como enseña el Capítulo 4 de Ishida, defender temprano con un salto de un espacio pone tu grupo a salvo en el centro y neutraliza el ataque rival.',
      },
    ],
    wrongMoveExplanations: {
      '4,5': 'Extender un solo paso en E4 es sólido pero lento: permite a Blanco encerrarte con un Sombrero en E6.',
    },
    defaultWrongExplanation: 'Salta una intersección por encima de E3 en la columna E (hacia E5).',
    hints: [
      'Pista 1: No avances arrastrándote en E4.',
      'Pista 2: Deja E4 vacío y salta directamente a la fila 5.',
      'Pista 3: Juega en E5 (x=4, y=4).',
    ],
    solutionExplanation:
      'El Salto de Un Espacio (Ikkentobi) en E5 proyecta velocidad hacia el centro manteniendo la conexión.',
    commonMistake: 'Empujar pesadamente paso a paso en E4 permitiendo que el rival tome la delantera.',
    prerequisites: ['lesson-13-defensa-temprana-escape'],
    relatedLessonId: 'lesson-13-defensa-temprana-escape',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 30,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 4, y: 6, type: 'TRIANGLE' }],
  },

  // #27: GANAR SEMEAI RELLENANDO LIBERTADES EXTERIORES (2 PASOS)
  {
    id: 'puzzle-27-ganar-semeai',
    number: 27,
    title: 'Duelo de Supervivencia (Semeai en 2 Pasos)',
    theme: 'LIBERTADES',
    themeLabel: 'Libertades y Atari',
    difficulty: 'FACIL',
    boardSize: 9,
    initialStones: [
      { x: 2, y: 0, color: 'BLACK' },
      { x: 2, y: 1, color: 'BLACK' },
      { x: 3, y: 0, color: 'WHITE' },
      { x: 3, y: 1, color: 'WHITE' },
      { x: 2, y: 2, color: 'WHITE' },
      { x: 3, y: 2, color: 'WHITE' },
      { x: 4, y: 2, color: 'BLACK' },
      { x: 5, y: 1, color: 'BLACK' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro (Secuencia en 2 pasos): Tus piedras en C9–C8 tienen 2 libertades y las blancas en D9–D8 tienen 2 libertades (E9 y E8). Da atari primero en E9 y luego captura en E8.',
    acceptedFirstMoves: [{ x: 4, y: 0 }],
    variations: [
      {
        playerMove: { x: 4, y: 0 },
        opponentReply: { x: 1, y: 0 },
        nextValidMoves: [{ x: 4, y: 1 }],
        explanationEs:
          '¡Victoria en Semeai! Redujiste primero la libertad exterior en E9 dejando a Blanco en atari, y tras el intento de Blanco en B9, capturaste D9–D8 jugando en E8.',
      },
    ],
    wrongMoveExplanations: {},
    defaultWrongExplanation:
      'En una carrera de captura (Semeai), reduce inmediatamente las libertades del grupo blanco D9–D8 jugando en E9.',
    hints: [
      'Pista 1: Las piedras blancas D9–D8 solo tienen dos libertades: E9 y E8.',
      'Pista 2: Empieza jugando en E9 para dejarlas con 1 sola libertad.',
      'Pista 3: Cuando Blanco dé atari en B9, captura D9–D8 jugando en E8.',
    ],
    solutionExplanation:
      'A igualdad de libertades (2 contra 2), quien juega primero poniendo en atari al rival gana la carrera de captura por un turno.',
    commonMistake: 'Jugar pasivamente en B9 sin quitarle primero una libertad al grupo blanco.',
    prerequisites: ['lesson-14-semeai-carreras-captura'],
    relatedLessonId: 'lesson-14-semeai-carreras-captura',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 40,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 3, y: 0, type: 'TRIANGLE' }],
  },

  // #28: DOBLE ATARI TÁCTICO
  {
    id: 'puzzle-28-doble-atari-tactico',
    number: 28,
    title: 'El Golpe de Doble Atari (Ryo-atari)',
    theme: 'TESUJI',
    themeLabel: 'Tesuji y sacrificios',
    difficulty: 'FACIL',
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
    objective:
      'Juega Negro: Las piedras blancas en D5 y E6 tienen solo 2 libertades cada una. Coloca una sola piedra que ponga a ambas en atari simultáneamente.',
    acceptedFirstMoves: [{ x: 4, y: 4 }],
    variations: [
      {
        playerMove: { x: 4, y: 4 },
        explanationEs:
          '¡Doble Atari letal en E5! Tanto D5 como E6 quedan con 1 sola libertad y tu piedra en E5 queda sólidamente conectada a F5.',
      },
    ],
    wrongMoveExplanations: {
      '3,3': 'Si das atari simple en D6, Blanco conecta en E5 salvando ambas piedras.',
      '5,3': 'Si das atari simple en F6, Blanco conecta en E5 salvando ambas piedras.',
    },
    defaultWrongExplanation: 'Busca la intersección central que comparten D5 y E6.',
    hints: [
      'Pista 1: D5 respira por D6 y E5; E6 respira por F6 y E5.',
      'Pista 2: Ambas piedras blancas comparten la libertad E5.',
      'Pista 3: Juega en E5 (x=4, y=4).',
    ],
    solutionExplanation:
      'Ocupar la libertad común E5 deja a dos grupos separados en atari al mismo tiempo, garantizando la captura de uno de ellos.',
    commonMistake: 'Dar atari desde fuera (D6 o F6) empujando al rival a conectarse en E5.',
    prerequisites: ['lesson-14-semeai-carreras-captura'],
    relatedLessonId: 'lesson-14-semeai-carreras-captura',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 30,
    xpBase: 5,
    xpNoHints: 7,
  },

  // #29: HANE EN LA CABEZA DE DOS PIEDRAS
  {
    id: 'puzzle-29-hane-cabeza-dos-piedras',
    number: 29,
    title: 'Hane en la Cabeza de Dos Piedras',
    theme: 'FORMA_Y_ATAQUE',
    themeLabel: 'Forma y ataque',
    difficulty: 'INTERMEDIO',
    boardSize: 9,
    initialStones: [
      { x: 3, y: 5, color: 'BLACK' },
      { x: 3, y: 4, color: 'BLACK' },
      { x: 4, y: 5, color: 'WHITE' },
      { x: 4, y: 4, color: 'WHITE' },
      { x: 2, y: 6, color: 'BLACK' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro: Tus piedras D4–D5 avanzan en paralelo con las piedras blancas E4–E5. Aplica el proverbio clásico doblando justo delante de las dos piedras blancas.',
    acceptedFirstMoves: [{ x: 4, y: 3 }],
    variations: [
      {
        playerMove: { x: 4, y: 3 },
        explanationEs:
          '¡Hane en la cabeza de dos piedras (E6)! Bloqueas el avance de Blanco hacia el centro y dejas a E4–E5 cortas de libertades.',
      },
    ],
    wrongMoveExplanations: {
      '3,3': 'Extender en D6 es demasiado blando y permite a Blanco extender en E6 con buena forma.',
    },
    defaultWrongExplanation: 'Coloca tu piedra justo encima de la columna blanca E4–E5 (en E6).',
    hints: [
      'Pista 1: Mira la punta superior de las dos piedras blancas en E5.',
      'Pista 2: Dobla diagonalmente desde D5 hacia E6.',
      'Pista 3: Juega en E6 (x=4, y=3).',
    ],
    solutionExplanation:
      '«Ante dos piedras en línea, haz Hane en su cabeza»: E6 frena la expansión rival y toma el dominio de la forma.',
    commonMistake: 'Extender pasivamente en D6 cediendo la iniciativa en el centro.',
    prerequisites: ['lesson-15-formas-pesadas-hane-cabeza'],
    relatedLessonId: 'lesson-15-formas-pesadas-hane-cabeza',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 35,
    xpBase: 5,
    xpNoHints: 7,
  },

  // #30: USAR EL PODER (ATSUI) — EMPUJAR HACIA EL MURO (ISHIDA CAP. 1)
  {
    id: 'puzzle-30-empujar-hacia-muro',
    number: 30,
    title: 'Usar el Grosor (Atsui): Empujar hacia el Muro',
    theme: 'FORMA_Y_ATAQUE',
    themeLabel: 'Forma y ataque',
    difficulty: 'INTERMEDIO',
    boardSize: 9,
    initialStones: [
      { x: 2, y: 2, color: 'BLACK' },
      { x: 2, y: 3, color: 'BLACK' },
      { x: 2, y: 4, color: 'BLACK' },
      { x: 3, y: 2, color: 'BLACK' },
      { x: 5, y: 3, color: 'WHITE' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro (Ishida Cap. 1, pág. 14): Posees un muro sólido (Atsui) en la izquierda (C7–C5) y Blanco tiene una piedra aislada en F6. Ataca desde el lado derecho para empujar a Blanco contra tu muro mientras construyes territorio a la derecha.',
    acceptedFirstMoves: [{ x: 6, y: 4 }],
    variations: [
      {
        playerMove: { x: 6, y: 4 },
        explanationEs:
          '¡Uso magistral del poder (Atsui) en G5! Empujas a la piedra blanca F6 hacia tu muro indestructible de la columna C mientras reclamas el lado derecho.',
      },
    ],
    wrongMoveExplanations: {
      '4,3': 'Si juegas en E6 (desde el lado de tu muro), empujas a Blanco hacia el lado derecho abierto y desperdicias tu grosor.',
    },
    defaultWrongExplanation:
      'No juegues entre tu muro y la piedra blanca: ataca desde el otro lado (G5) para empujarla hacia tu muro.',
    hints: [
      'Pista 1: Tu muro en C7–C5 funciona como un yunque.',
      'Pista 2: Coloca el martillo al otro lado de la piedra blanca F6.',
      'Pista 3: Juega en G5 (x=6, y=4).',
    ],
    solutionExplanation:
      'Como explica Akira Ishida en el Capítulo 1, el grosor (Atsui) rinde frutos cuando atacas grupos rivales empujándolos hacia él mientras haces territorio en otra parte del tablero.',
    commonMistake: 'Jugar pegado al propio muro empujando al enemigo hacia la zona libre.',
    prerequisites: ['lesson-16-equilibrio-territorio-poder-atsui'],
    relatedLessonId: 'lesson-16-equilibrio-territorio-poder-atsui',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 40,
    xpBase: 5,
    xpNoHints: 7,
  },

  // #31: TESUJI ROBA-OJOS (THE EYE-STEALING TESUJI — ISHIDA CAP. 3)
  {
    id: 'puzzle-31-tesuji-roba-ojos',
    number: 31,
    title: 'El Tesuji Roba-Ojos',
    theme: 'FORMA_Y_ATAQUE',
    themeLabel: 'Forma y ataque',
    difficulty: 'INTERMEDIO',
    boardSize: 9,
    initialStones: [
      { x: 6, y: 3, color: 'WHITE' },
      { x: 6, y: 4, color: 'WHITE' },
      { x: 5, y: 2, color: 'BLACK' },
      { x: 6, y: 2, color: 'BLACK' },
      { x: 6, y: 6, color: 'BLACK' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro (Ishida pág. 64, Dia. 1–2): El grupo blanco en G6–G5 intenta hacer ojos en el borde derecho. Juega el Tesuji Roba-Ojos sin contacto en la segunda línea para destruir su base.',
    acceptedFirstMoves: [{ x: 7, y: 4 }],
    variations: [
      {
        playerMove: { x: 7, y: 4 },
        explanationEs:
          '¡Tesuji Roba-Ojos exacto en H5! La relación en salto con tu piedra de G7 arruina el espacio de ojos de Blanco en el borde derecho y lo obliga a huir al centro.',
      },
    ],
    wrongMoveExplanations: {
      '7,3': 'Tocar directamente en H6 ayuda a Blanco a bloquear en H5 formando un ojo seguro.',
    },
    defaultWrongExplanation:
      'Recuerda el principio "No toques lo que atacas": juega en H5 en la segunda línea.',
    hints: [
      'Pista 1: Busca el punto vital en la segunda línea (columna H) frente a G5.',
      'Pista 2: No toques en H6; colócate en H5.',
      'Pista 3: Juega en H5 (x=7, y=4).',
    ],
    solutionExplanation:
      'El Tesuji Roba-Ojos en H5 (en salto respecto a G7) impide que Blanco consiga dos ojos en el borde.',
    commonMistake: 'Hacer contacto directo en H6 permitiendo a Blanco responder en el punto vital H5.',
    prerequisites: ['lesson-17-cinco-formulas-ataque-sin-contacto'],
    relatedLessonId: 'lesson-17-cinco-formulas-ataque-sin-contacto',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 40,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 6, y: 2, type: 'TRIANGLE' }],
  },

  // #32: ATAQUE DE SOMBRERO (CAPPING ATTACK / BOSHI — ISHIDA CAP. 3)
  {
    id: 'puzzle-32-ataque-sombrero-boshi',
    number: 32,
    title: 'Ataque de Sombrero (Boshi) sin Contacto',
    theme: 'FORMA_Y_ATAQUE',
    themeLabel: 'Forma y ataque',
    difficulty: 'FACIL',
    boardSize: 9,
    initialStones: [
      { x: 4, y: 6, color: 'WHITE' },
      { x: 5, y: 6, color: 'WHITE' },
      { x: 2, y: 5, color: 'BLACK' },
      { x: 7, y: 5, color: 'BLACK' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro (Ishida pág. 69): Frena de frente la salida al centro de las dos piedras blancas (E3–F3) mediante un Ataque de Sombrero (Boshi) en E5.',
    acceptedFirstMoves: [
      { x: 4, y: 4 },
      { x: 5, y: 4 },
    ],
    variations: [
      {
        playerMove: { x: 4, y: 4 },
        explanationEs:
          '¡Sombrero (Boshi) impecable en E5! Sin tocar las piedras blancas, cierras su ruta de escape hacia el centro y conectas la influencia de C4 y H4.',
      },
      {
        playerMove: { x: 5, y: 4 },
        explanationEs:
          '¡Sombrero (Boshi) impecable en F5! Detienes en seco el avance de Blanco hacia el centro.',
      },
    ],
    wrongMoveExplanations: {
      '4,5': 'Tocar en E4 viola la regla "No toques lo que atacas": Blanco golpea en F4 y sale con fuerza.',
    },
    defaultWrongExplanation: 'Coloca el sombrero un espacio por encima de E3 (en E5).',
    hints: [
      'Pista 1: No toques a las piedras blancas en la fila 4.',
      'Pista 2: Juega a un espacio de distancia en la fila 5.',
      'Pista 3: Coloca tu piedra en E5 (x=4, y=4).',
    ],
    solutionExplanation:
      'El Ataque de Sombrero (Boshi) en E5 detiene de frente al grupo enemigo sin darle puntos de apoyo para fortalecerse.',
    commonMistake: 'Hacer contacto directo en E4 o F4 ayudando a Blanco a endurecer su forma.',
    prerequisites: ['lesson-17-cinco-formulas-ataque-sin-contacto'],
    relatedLessonId: 'lesson-17-cinco-formulas-ataque-sin-contacto',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 35,
    xpBase: 5,
    xpNoHints: 7,
  },

  // #33: ATAQUE DE ASOMO (PEEPING ATTACK / NOZOKI — ISHIDA CAP. 3)
  {
    id: 'puzzle-33-asomo-nozoki',
    number: 33,
    title: 'El Asomo que Destruye la Forma (Nozoki)',
    theme: 'FORMA_Y_ATAQUE',
    themeLabel: 'Forma y ataque',
    difficulty: 'INTERMEDIO',
    boardSize: 9,
    initialStones: [
      { x: 3, y: 5, color: 'WHITE' },
      { x: 4, y: 5, color: 'WHITE' },
      { x: 5, y: 4, color: 'WHITE' },
      { x: 2, y: 3, color: 'BLACK' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro (Ishida pág. 71, Dia. 1–2): Asómate (Peep / Nozoki) contra la formación blanca de D4–E4–F5 para obligar a Blanco a conectarse en E5 formando un pesado Triángulo Vacío.',
    acceptedFirstMoves: [{ x: 3, y: 4 }],
    variations: [
      {
        playerMove: { x: 3, y: 4 },
        explanationEs:
          '¡Asomo (Nozoki) exacto en D5! Blanco no tiene más remedio que conectar en E5, quedando con un Triángulo Vacío (D4–E4–E5) sin forma de ojos.',
      },
    ],
    wrongMoveExplanations: {
      '4,4': 'Si tocas directamente en E5, Blanco te da atari o se extiende con buena forma.',
    },
    defaultWrongExplanation: 'Asómate desde fuera en D5 apuntando al punto de corte E5.',
    hints: [
      'Pista 1: El punto de conexión de Blanco está en E5.',
      'Pista 2: Amenaza ese punto sin jugar directamente en él.',
      'Pista 3: Juega en D5 (x=3, y=4).',
    ],
    solutionExplanation:
      'El asomo (Nozoki) en D5 amenaza separar D4–E4 de F5 y obliga a Blanco a deformar su propio grupo conectando en E5.',
    commonMistake: 'Jugar directamente en el punto de conexión E5 en lugar de asomarse desde D5.',
    prerequisites: ['lesson-17-cinco-formulas-ataque-sin-contacto'],
    relatedLessonId: 'lesson-17-cinco-formulas-ataque-sin-contacto',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 35,
    xpBase: 5,
    xpNoHints: 7,
  },

  // #34: NAKADE EN LA PIRÁMIDE DE CUATRO
  {
    id: 'puzzle-34-nakade-piramide-cuatro',
    number: 34,
    title: 'Nakade en la Pirámide de Cuatro',
    theme: 'VIDA_Y_MUERTE',
    themeLabel: 'Vida y muerte (Tsumego)',
    difficulty: 'INTERMEDIO',
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
    objective:
      'Juega Negro: El grupo blanco del borde superior encierra una "Pirámide de Cuatro" (A9, B9, C9 y B8). Golpea en su centro de simetría para reducirlo a un solo ojo.',
    acceptedFirstMoves: [{ x: 1, y: 0 }],
    variations: [
      {
        playerMove: { x: 1, y: 0 },
        explanationEs:
          '¡Nakade mortal en B9! Al ocupar la intersección donde se unen los tres brazos de la T, Blanco jamás podrá dividir su espacio en dos ojos.',
      },
    ],
    wrongMoveExplanations: {
      '1,1': 'Si juegas en B8, Blanco responde en B9 separando A9 y C9 en dos ojos reales.',
    },
    defaultWrongExplanation: 'Ocupa el nodo central de la T en B9.',
    hints: [
      'Pista 1: Observa las 4 intersecciones vacías: A9, B9, C9 y B8.',
      'Pista 2: ¿Cuál de las cuatro toca a las otras tres a la vez?',
      'Pista 3: Juega en B9 (x=1, y=0).',
    ],
    solutionExplanation:
      'En la Pirámide de Cuatro, B9 es el punto vital: quien lo ocupa primero decide la vida o la muerte del grupo.',
    commonMistake: 'Jugar en una de las puntas (A9, C9 o B8) permitiendo a Blanco ocupar el centro B9.',
    prerequisites: ['lesson-18-nakade-puntos-vitales-tsumego'],
    relatedLessonId: 'lesson-18-nakade-puntos-vitales-tsumego',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 35,
    xpBase: 5,
    xpNoHints: 7,
  },

  // #35: DEFENSA PREVENTIVA EN EL BORDE (ISHIDA CAP. 4 — RIN KAIHO VS ISHIDA)
  {
    id: 'puzzle-35-defensa-preventiva',
    number: 35,
    title: 'El Punto Vital Defensivo en el Borde',
    theme: 'VIDA_Y_MUERTE',
    themeLabel: 'Vida y muerte (Tsumego)',
    difficulty: 'INTERMEDIO',
    boardSize: 9,
    initialStones: [
      { x: 7, y: 2, color: 'BLACK' },
      { x: 7, y: 5, color: 'BLACK' },
      { x: 6, y: 2, color: 'WHITE' },
      { x: 6, y: 5, color: 'WHITE' },
      { x: 5, y: 3, color: 'WHITE' },
      { x: 5, y: 4, color: 'WHITE' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro (Ishida pág. 92, Dia. 9): Tu grupo en el borde derecho (H7–H4) está rodeado por fuera. Juega en el punto vital del borde para asegurar dos ojos antes de que Blanco te robe la base.',
    acceptedFirstMoves: [
      { x: 8, y: 3 },
      { x: 8, y: 4 },
      { x: 7, y: 3 },
      { x: 7, y: 4 },
    ],
    variations: [
      {
        playerMove: { x: 7, y: 3 },
        explanationEs:
          '¡Defensa oportuna en H6! Aseguras la conexión y el espacio vital de tu grupo en el borde derecho antes de que Blanco pueda dividirlo.',
      },
      {
        playerMove: { x: 7, y: 4 },
        explanationEs:
          '¡Defensa sólida en H5! Tu grupo del borde derecho queda unido y con espacio de ojos garantizado.',
      },
      {
        playerMove: { x: 8, y: 3 },
        explanationEs: '¡Buena defensa en J6 asegurando la base en el borde!',
      },
      {
        playerMove: { x: 8, y: 4 },
        explanationEs: '¡Buena defensa en J5 asegurando la base en el borde!',
      },
    ],
    wrongMoveExplanations: {},
    defaultWrongExplanation: 'Conecta y asegura tu espacio entre H7 y H4 jugando en H6 o H5.',
    hints: [
      'Pista 1: Tus piedras H7 y H4 están separadas por dos espacios.',
      'Pista 2: Si Blanco se mete en H6 o H5 destruirá tus ojos.',
      'Pista 3: Juega en H6 (x=7, y=3) o H5 (x=7, y=4).',
    ],
    solutionExplanation:
      'Como muestra Yoshio Ishida en la página 92, defender el punto vital de un grupo débil previene ataques dobles y te da libertad para luchar en el resto del tablero.',
    commonMistake: 'Ignorar la debilidad del grupo hasta que el rival juega el Tesuji Roba-Ojos.',
    prerequisites: ['lesson-13-defensa-temprana-escape'],
    relatedLessonId: 'lesson-13-defensa-temprana-escape',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 35,
    xpBase: 5,
    xpNoHints: 7,
  },

  // #36: DIVIDE Y VENCERÁS — ATAQUE DE DIVISIÓN (KARAMI — ISHIDA CAP. 2)
  {
    id: 'puzzle-36-ataque-division-karami',
    number: 36,
    title: 'Divide y Vencerás: El Ataque Doble (Karami)',
    theme: 'FORMA_Y_ATAQUE',
    themeLabel: 'Forma y ataque',
    difficulty: 'INTERMEDIO',
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
    objective:
      'Juega Negro (Ishida pág. 41, Dia. 1–2): Blanco tiene dos grupos débiles en la columna C (C7–C6 arriba y C3–C2 abajo). Juega en medio de ambos para impedir que se unan y atacarlos a la vez.',
    acceptedFirstMoves: [
      { x: 2, y: 4 },
      { x: 2, y: 5 },
    ],
    variations: [
      {
        playerMove: { x: 2, y: 4 },
        explanationEs:
          '¡Splitting Attack (Karami) perfecto en C5! Mantienes divididos los dos grupos blancos débiles y tomas el mando absoluto del medio juego.',
      },
      {
        playerMove: { x: 2, y: 5 },
        explanationEs:
          '¡Splitting Attack (Karami) perfecto en C4! Separas las dos cadenas blancas para presionar ambas simultáneamente.',
      },
    ],
    wrongMoveExplanations: {
      '1,4': 'Como advierte el Diagrama 1 de Ishida, jugar por fuera en B5 permite a Blanco conectarse en C5 formando un solo grupo invulnerable.',
    },
    defaultWrongExplanation: 'Coloca tu piedra directamente entre las dos cadenas blancas en C5 o C4.',
    hints: [
      'Pista 1: Si Blanco juega en C5 unirá sus dos grupos.',
      'Pista 2: Interponte en la línea que une C6 con C3.',
      'Pista 3: Juega en C5 (x=2, y=4).',
    ],
    solutionExplanation:
      'La técnica básica de "Divide y Vencerás" (Cap. 2, pág. 40) consiste en jugar justo en medio de dos grupos débiles para impedir su conexión.',
    commonMistake: 'Atacar desde un extremo dejando que los dos grupos enemigos se den la mano en el centro.',
    prerequisites: ['lesson-19-estrategia-ataque-apoyo-division'],
    relatedLessonId: 'lesson-19-estrategia-ataque-apoyo-division',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 35,
    xpBase: 5,
    xpNoHints: 7,
  },

  // #37: CORTE BUENO VS. CORTE MALO (ISHIDA CAP. 2)
  {
    id: 'puzzle-37-corte-bueno-vs-malo',
    number: 37,
    title: 'El Corte Severo que Divide en Dos',
    theme: 'CONECTAR_Y_CORTAR',
    themeLabel: 'Conectar y cortar',
    difficulty: 'INTERMEDIO',
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
    objective:
      'Juega Negro (Ishida pág. 46, Dia. 1–2): Corta en el punto vital donde las dos mitades del grupo blanco quedan separadas y respaldadas por tus piedras de D7 y F6.',
    acceptedFirstMoves: [{ x: 4, y: 3 }],
    variations: [
      {
        playerMove: { x: 4, y: 3 },
        explanationEs:
          '¡Corte ideal en E6! Como tus piedras en D7 y F6 ya están en posición, el corte en E6 crea Miai de capturar uno de los dos grupos blancos.',
      },
    ],
    wrongMoveExplanations: {},
    defaultWrongExplanation: 'Corta en E6 (entre D6 y E5, conectando tus piedras D7 y F6).',
    hints: [
      'Pista 1: D6–D5 y E5–F5 solo se tocan en diagonal.',
      'Pista 2: La intersección E6 las separa y une tus fuerzas.',
      'Pista 3: Juega en E6 (x=4, y=3).',
    ],
    solutionExplanation:
      'El corte es la forma suprema del ataque de división cuando el rival no puede permitirse entregar ninguno de los dos grupos separados.',
    commonMistake: 'Empujar desde fuera permitiendo a Blanco proteger E6.',
    prerequisites: ['lesson-19-estrategia-ataque-apoyo-division'],
    relatedLessonId: 'lesson-19-estrategia-ataque-apoyo-division',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 35,
    xpBase: 5,
    xpNoHints: 7,
  },

  // #38: INVASIÓN EN EXTENSIÓN DE 3 ESPACIOS (ISHIDA CAP. 8)
  {
    id: 'puzzle-38-invasion-extension-tres-espacios',
    number: 38,
    title: 'Invasión Exacta en la Extensión de Tres Espacios',
    theme: 'INVASION_Y_YOSE',
    themeLabel: 'Invasión y Yose',
    difficulty: 'INTERMEDIO',
    boardSize: 9,
    initialStones: [
      { x: 2, y: 6, color: 'WHITE' },
      { x: 6, y: 6, color: 'WHITE' },
      { x: 1, y: 3, color: 'BLACK' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro (Ishida Cap. 8, pág. 174): Blanco ha formado una extensión de 3 espacios en la tercera línea (C3 y G3). Invade en el único punto correcto para dividir ambas piedras.',
    acceptedFirstMoves: [{ x: 4, y: 6 }],
    variations: [
      {
        playerMove: { x: 4, y: 6 },
        explanationEs:
          '¡Invasión clásica en E3! Justo en el punto medio de la tercera línea entre C3 y G3, quitándole la base a ambas piedras blancas.',
      },
    ],
    wrongMoveExplanations: {
      '4,5': 'En E4 (4ª línea) Blanco responde pegándose debajo en E3 y se queda con todo el territorio del borde (pág. 179).',
    },
    defaultWrongExplanation: 'Invade en el punto medio de la tercera línea entre C3 y G3 (en E3).',
    hints: [
      'Pista 1: Las piedras blancas están en C3 y G3.',
      'Pista 2: El punto equidistante en la fila 3 es E3.',
      'Pista 3: Juega en E3 (x=4, y=6).',
    ],
    solutionExplanation:
      'En una extensión de tres espacios en tercera línea, el punto medio E3 es la invasión estándar que impide a Blanco conectarse.',
    commonMistake: 'Jugar tímidamente en E4 dejando que Blanco selle el borde en E3.',
    prerequisites: ['lesson-20-joseki-invasion-tres-espacios'],
    relatedLessonId: 'lesson-20-joseki-invasion-tres-espacios',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 35,
    xpBase: 5,
    xpNoHints: 7,
  },

  // #39: LA CUÑA (WARIKOMI — ISHIDA CAP. 8)
  {
    id: 'puzzle-39-cuna-warikomi',
    number: 39,
    title: 'Tesuji de Cuña (Warikomi) tras la Invasión',
    theme: 'TESUJI',
    themeLabel: 'Tesuji y sacrificios',
    difficulty: 'AVANZADO',
    boardSize: 9,
    initialStones: [
      { x: 2, y: 6, color: 'WHITE' },
      { x: 6, y: 5, color: 'WHITE' },
      { x: 4, y: 6, color: 'BLACK' },
      { x: 4, y: 5, color: 'WHITE' },
      { x: 1, y: 3, color: 'BLACK' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro (Ishida pág. 181, Dia. 1): Tras tu invasión en E3, Blanco se pegó encima en E4. Como la escalera te favorece gracias a B6, inserta la Cuña (Warikomi) en D4.',
    acceptedFirstMoves: [{ x: 3, y: 5 }],
    variations: [
      {
        playerMove: { x: 3, y: 5 },
        explanationEs:
          '¡Warikomi (Cuña) brillante en D4! Amenazas cortar simultáneamente en D3 y en E5; como la escalera funciona para Negro, Blanco no puede cortar sin perder su piedra.',
      },
    ],
    wrongMoveExplanations: {},
    defaultWrongExplanation: 'Inserta la cuña en D4 (a la izquierda de E4 y encima de D3).',
    hints: [
      'Pista 1: Mira la diagonal entre C3 y E4.',
      'Pista 2: Encaja tu piedra en D4 para crear doble amenaza de corte.',
      'Pista 3: Juega en D4 (x=3, y=5).',
    ],
    solutionExplanation:
      'La Cuña (Warikomi) en D4 es la respuesta más enérgica al contacto superior cuando el invasor domina la escalera.',
    commonMistake: 'Retirarse pasivamente en F3 cuando la cuña en D4 funciona.',
    prerequisites: ['lesson-20-joseki-invasion-tres-espacios'],
    relatedLessonId: 'lesson-20-joseki-invasion-tres-espacios',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 45,
    xpBase: 5,
    xpNoHints: 7,
  },

  // #40: EVITAR LA JUGADA DE «GRACIAS» (THANK-YOU MOVE — ISHIDA CAP. 5)
  {
    id: 'puzzle-40-kikashi-forzante',
    number: 40,
    title: 'Proverbio: No Juegues Junto al Corte, ¡Corta!',
    theme: 'CONECTAR_Y_CORTAR',
    themeLabel: 'Conectar y cortar',
    difficulty: 'INTERMEDIO',
    boardSize: 9,
    initialStones: [
      { x: 4, y: 5, color: 'WHITE' },
      { x: 5, y: 4, color: 'WHITE' },
      { x: 5, y: 5, color: 'BLACK' },
      { x: 6, y: 4, color: 'BLACK' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro (Ishida Cap. 5, pág. 120): Evita la "Jugada de Gracias" en D5 que solo ayudaría a Blanco a conectarse. ¡Corta directamente en el punto débil de Blanco!',
    acceptedFirstMoves: [{ x: 4, y: 4 }],
    variations: [
      {
        playerMove: { x: 4, y: 4 },
        explanationEs:
          '¡Corte directo en E5! En lugar de hacer un falso Kikashi en D5 que Blanco agradecería conectando en E5, divides en dos la posición blanca.',
      },
    ],
    wrongMoveExplanations: {
      '3,4': '¡Error de "Thank-You Move"! Jugar en D5 obliga a Blanco a conectar en E5, que es exactamente lo que Blanco deseaba hacer.',
    },
    defaultWrongExplanation: 'Corta directamente en E5.',
    hints: [
      'Pista 1: E4 y F5 están desconectadas en E5.',
      'Pista 2: No juegues en D5; ocupa el punto de corte E5.',
      'Pista 3: Juega en E5 (x=4, y=4).',
    ],
    solutionExplanation:
      'Como enseña Ishida en "Thank-You Moves" (pág. 120), nunca juegues al lado de un punto de corte para "forzar" al rival a conectarlo: corta directamente.',
    commonMistake: 'Creer que dar atari o asomarse en D5 es una jugada inteligente de Sente.',
    prerequisites: ['lesson-21-jugadas-forzantes-kikashi-inductoras'],
    relatedLessonId: 'lesson-21-jugadas-forzantes-kikashi-inductoras',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 35,
    xpBase: 5,
    xpNoHints: 7,
  },

  // #41: FUERZA ANTES DE DEFENDER (FORCE BEFORE DEFENDING — ISHIDA CAP. 6)
  {
    id: 'puzzle-41-fuerza-antes-de-defender',
    number: 41,
    title: '«Fuerza Antes de Defender»',
    theme: 'TESUJI',
    themeLabel: 'Tesuji y sacrificios',
    difficulty: 'AVANZADO',
    boardSize: 9,
    initialStones: [
      { x: 4, y: 3, color: 'WHITE' },
      { x: 4, y: 5, color: 'WHITE' },
      { x: 5, y: 6, color: 'BLACK' },
      { x: 6, y: 5, color: 'BLACK' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro (Ishida pág. 132, Dia. 1): Antes de cerrar tu posición inferior derecha, aplica el principio "Force before defending" asomándote en D5 contra el salto blanco de E6–E4.',
    acceptedFirstMoves: [{ x: 3, y: 4 }],
    variations: [
      {
        playerMove: { x: 3, y: 4 },
        explanationEs:
          '¡Fuerza antes de defender en D5! Obligas a Blanco a conectarse pesadamente en E5 ahora; si hubieras defendido primero abajo, Blanco ya no habría respondido a tu asomo.',
      },
    ],
    wrongMoveExplanations: {},
    defaultWrongExplanation: 'Haz primero el asomo forzante (Kikashi) en D5 frente al hueco de E5.',
    hints: [
      'Pista 1: Mira el hueco entre las piedras blancas E6 y E4.',
      'Pista 2: Asómate desde la izquierda en D5 antes de defenderte abajo.',
      'Pista 3: Juega en D5 (x=3, y=4).',
    ],
    solutionExplanation:
      '«Fuerza antes de defender» (Cap. 6, pág. 132): hacer el Kikashi en D5 primero garantiza que el rival responda antes de que consolides tu grupo.',
    commonMistake: 'Defender pasivamente primero y perder la oportunidad de forzar al rival en Sente.',
    prerequisites: ['lesson-21-jugadas-forzantes-kikashi-inductoras'],
    relatedLessonId: 'lesson-21-jugadas-forzantes-kikashi-inductoras',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 40,
    xpBase: 5,
    xpNoHints: 7,
  },

  // #42: INICIAR UN HANAMI KO (KO DE PICNIC — ISHIDA CAP. 9)
  {
    id: 'puzzle-42-hanami-ko-picnic',
    number: 42,
    title: 'Hanami Ko: El Ko sin Riesgo',
    theme: 'KO_BASICO',
    themeLabel: 'Regla de Ko',
    difficulty: 'INTERMEDIO',
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
    objective:
      'Juega Negro (Ishida Cap. 9, pág. 199): Tu grupo derecho es sólido, pero puedes iniciar un Hanami Ko capturando la piedra blanca de D8 para amenazar todo el rincón blanco sin arriesgar nada.',
    acceptedFirstMoves: [{ x: 2, y: 1 }],
    variations: [
      {
        playerMove: { x: 2, y: 1 },
        explanationEs:
          '¡Hanami Ko iniciado en C8! Capturas D8 y creas un Ko donde Blanco se juega la vida de su esquina mientras tú solo arriesgas un prisionero.',
      },
    ],
    wrongMoveExplanations: {},
    defaultWrongExplanation: 'Captura la piedra blanca de D8 jugando en C8 para abrir el Ko.',
    hints: [
      'Pista 1: La piedra blanca en D8 está en atari.',
      'Pista 2: Su única libertad es C8.',
      'Pista 3: Juega en C8 (x=2, y=1).',
    ],
    solutionExplanation:
      'En un Hanami Ko ("Ko de picnic"), las apuestas son totalmente asimétricas a tu favor: tienes todo que ganar y casi nada que perder.',
    commonMistake: 'Pasar por alto la oportunidad de iniciar un Ko unilateral gratuito.',
    prerequisites: ['lesson-22-ko-avanzado-hanami-dominante'],
    relatedLessonId: 'lesson-22-ko-avanzado-hanami-dominante',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 35,
    xpBase: 5,
    xpNoHints: 7,
  },

  // #43: EVITAR UN KO ADVERSO CONECTANDO SÓLIDAMENTE (ISHIDA CAP. 9)
  {
    id: 'puzzle-43-ko-dominante',
    number: 43,
    title: 'Evitar un Ko Desfavorable',
    theme: 'KO_BASICO',
    themeLabel: 'Regla de Ko',
    difficulty: 'INTERMEDIO',
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
    objective:
      'Juega Negro (Ishida pág. 202, Dia. 15): Blanco amenaza iniciar un Ko mortal contra tu grupo en D5. Como tienes todo que perder y nada que ganar si hay Ko, ¡conecta sólidamente en D5!',
    acceptedFirstMoves: [{ x: 3, y: 4 }],
    variations: [
      {
        playerMove: { x: 3, y: 4 },
        explanationEs:
          '¡Conexión impecable en D5! Eliminas de raíz el Ko adverso y dejas tu grupo completamente invulnerable.',
      },
    ],
    wrongMoveExplanations: {},
    defaultWrongExplanation: 'Conecta tus piedras en D5 para impedir que Blanco inicie el Ko.',
    hints: [
      'Pista 1: Mira el punto de corte y Ko en D5.',
      'Pista 2: Une C5, D6 y D4 en una cadena sólida.',
      'Pista 3: Juega en D5 (x=3, y=4).',
    ],
    solutionExplanation:
      'Como enseña Ishida en la página 202: cuando un Ko sería unilateral en tu contra, nunca permitas que empiece: conecta de forma directa.',
    commonMistake: 'Jugar en otro lado dejando que el rival inicie un Ko contra la vida de tu grupo.',
    prerequisites: ['lesson-22-ko-avanzado-hanami-dominante'],
    relatedLessonId: 'lesson-22-ko-avanzado-hanami-dominante',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 30,
    xpBase: 5,
    xpNoHints: 7,
  },

  // #44: DEFENSA DE EMERGENCIA CON CONTACTO (TSUKE — ISHIDA CAP. 4)
  {
    id: 'puzzle-44-defensa-contacto-tsuke',
    number: 44,
    title: 'Defensa de Emergencia con Contacto (Tsuke)',
    theme: 'SALVAR_PIEDRA',
    themeLabel: 'Salvar grupo',
    difficulty: 'AVANZADO',
    boardSize: 9,
    initialStones: [
      { x: 6, y: 2, color: 'BLACK' },
      { x: 6, y: 3, color: 'BLACK' },
      { x: 4, y: 2, color: 'WHITE' },
      { x: 4, y: 5, color: 'WHITE' },
      { x: 6, y: 5, color: 'WHITE' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro (Ishida Cap. 4, pág. 93): Tus dos piedras en G7–G6 están aisladas. Usa el Tesuji de defensa en la segunda línea (H5) para apoyarte en Blanco y asegurar forma de vida.',
    acceptedFirstMoves: [
      { x: 7, y: 4 },
      { x: 7, y: 5 },
    ],
    variations: [
      {
        playerMove: { x: 7, y: 4 },
        explanationEs:
          '¡Defensa magistral en H5! Como enseña el Capítulo 4 de Ishida, las jugadas de contacto o casi-contacto en el borde obligan a Blanco a responder y crean la forma necesaria para vivir.',
      },
      {
        playerMove: { x: 7, y: 5 },
        explanationEs:
          '¡Contacto directo en H4 (Dia. 2, pág. 93 de Ishida)! Amenazas enlazar por el borde y fuerzas a Blanco a darte forma defensiva.',
      },
    ],
    wrongMoveExplanations: {},
    defaultWrongExplanation: 'Juega en H4 o H5 en la segunda línea para apoyarte contra G4.',
    hints: [
      'Pista 1: En emergencias defensivas, busca el contacto en el borde derecho.',
      'Pista 2: Apunta a H4 o H5 junto a la piedra blanca G4.',
      'Pista 3: Juega en H5 (x=7, y=4) o H4 (x=7, y=5).',
    ],
    solutionExplanation:
      'Mientras que el ataque evita el contacto, la defensa de emergencia utiliza el contacto (Tsuke) para apoyarse en la solidez enemiga.',
    commonMistake: 'Intentar huir pesadamente hacia el centro donde Blanco domina con E7 y E4.',
    prerequisites: ['lesson-23-defensa-contacto-sacrificio-suteishi'],
    relatedLessonId: 'lesson-23-defensa-contacto-sacrificio-suteishi',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 45,
    xpBase: 5,
    xpNoHints: 7,
  },

  // #45: DEFENSA CON GOLPE AL HOMBRO (SHOULDER PLAY — ISHIDA CAP. 4)
  {
    id: 'puzzle-45-defensa-golpe-hombro',
    number: 45,
    title: 'Defensa Elástica con Golpe al Hombro (Kata-tsuki)',
    theme: 'SALVAR_PIEDRA',
    themeLabel: 'Salvar grupo',
    difficulty: 'AVANZADO',
    boardSize: 9,
    initialStones: [
      { x: 2, y: 5, color: 'BLACK' },
      { x: 2, y: 6, color: 'BLACK' },
      { x: 4, y: 3, color: 'WHITE' },
      { x: 4, y: 7, color: 'WHITE' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro (Ishida pág. 100, Dia. 28): Tu grupo en C4–C3 necesita salir al centro con rapidez. En lugar del salto lento en C5, juega el Golpe al Hombro en D5 (en diagonal a la piedra blanca E6).',
    acceptedFirstMoves: [{ x: 3, y: 4 }],
    variations: [
      {
        playerMove: { x: 3, y: 4 },
        explanationEs:
          '¡Golpe al Hombro vigoroso en D5! Evitas el asomo blanco y tomas impulso elástico hacia el centro.',
      },
    ],
    wrongMoveExplanations: {
      '2,4': 'Como muestra el Diagrama 27 de Ishida, el salto a C5 es demasiado lento y permite a Blanco asomarse en D5.',
    },
    defaultWrongExplanation: 'Juega en D5 (al hombro diagonal de la piedra blanca E6).',
    hints: [
      'Pista 1: Mira la piedra blanca en E6.',
      'Pista 2: Su hombro diagonal hacia tu grupo es D5.',
      'Pista 3: Juega en D5 (x=3, y=4).',
    ],
    solutionExplanation:
      'El Golpe al Hombro (Shoulder Play) en D5 es una técnica defensiva rápida que impide que el atacante te encierre.',
    commonMistake: 'Jugar un salto lento en C5 cuando estás bajo presión.',
    prerequisites: ['lesson-23-defensa-contacto-sacrificio-suteishi'],
    relatedLessonId: 'lesson-23-defensa-contacto-sacrificio-suteishi',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 40,
    xpBase: 5,
    xpNoHints: 7,
  },

  // #46: PUNTO DE UNIÓN ENTRE DOS MARCOS (JUNCTION POINT — ISHIDA CAP. 7)
  {
    id: 'puzzle-46-punto-union-moyo',
    number: 46,
    title: 'El Punto de Unión entre Dos Marcos (Tennozan)',
    theme: 'INVASION_Y_YOSE',
    themeLabel: 'Invasión y Yose',
    difficulty: 'AVANZADO',
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
    objective:
      'Juega Negro (Ishida Cap. 7, pág. 143): Tu marco izquierdo-inferior y el marco blanco derecho se encuentran en la línea central. Ocupa el Punto de Unión (Junction Point) en E5.',
    acceptedFirstMoves: [{ x: 4, y: 4 }],
    variations: [
      {
        playerMove: { x: 4, y: 4 },
        explanationEs:
          '¡Punto de Unión (Tennozan) dominado en E5! Expandes tu propio Moyo mientras reduces el de Blanco en una sola jugada maestra.',
      },
    ],
    wrongMoveExplanations: {
      '7,4': 'Invadir precipitadamente en H5 deja abierto E5 para que Blanco te ataque y destruya tu marco.',
    },
    defaultWrongExplanation: 'Ocupa el punto central de la frontera entre ambos marcos (E5).',
    hints: [
      'Pista 1: Traza una línea imaginaria a mitad de camino entre tus piedras (columna C) y las blancas (columna G).',
      'Pista 2: Esa línea pasa por la columna E.',
      'Pista 3: Juega en E5 (x=4, y=4).',
    ],
    solutionExplanation:
      'En palabras de Akira Ishida (pág. 143): cuando dos marcos abiertos colindan, dominar la línea de unión (Junction Line) decide el equilibrio territorial.',
    commonMistake: 'Ignorar la frontera común para hacer una invasión arriesgada e innecesaria.',
    prerequisites: ['lesson-24-reduccion-invasion-grandes-marcos'],
    relatedLessonId: 'lesson-24-reduccion-invasion-grandes-marcos',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 40,
    xpBase: 5,
    xpNoHints: 7,
  },

  // #47: REDUCCIÓN DE MOYO CON GOLPE AL HOMBRO (ISHIDA CAP. 7)
  {
    id: 'puzzle-47-reduccion-hombro-moyo',
    number: 47,
    title: 'Reducción de Gran Marco con Golpe al Hombro',
    theme: 'INVASION_Y_YOSE',
    themeLabel: 'Invasión y Yose',
    difficulty: 'AVANZADO',
    boardSize: 9,
    initialStones: [
      { x: 2, y: 2, color: 'WHITE' },
      { x: 4, y: 2, color: 'WHITE' },
      { x: 6, y: 5, color: 'WHITE' },
      { x: 2, y: 6, color: 'BLACK' },
      { x: 3, y: 7, color: 'BLACK' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro (Ishida Cap. 7, pág. 151): Blanco ha formado un amplio marco con C7, E7 y G4. Reduce su Moyo desde arriba mediante el Golpe al Hombro en F5.',
    acceptedFirstMoves: [{ x: 5, y: 4 }],
    variations: [
      {
        playerMove: { x: 5, y: 4 },
        explanationEs:
          '¡Reducción elegante con Golpe al Hombro en F5! Limitas profundamente el marco blanco sin arriesgar un grupo pesado dentro de su territorio.',
      },
    ],
    wrongMoveExplanations: {},
    defaultWrongExplanation: 'Juega el Golpe al Hombro en F5 (en diagonal a la piedra blanca G4).',
    hints: [
      'Pista 1: Mira la piedra blanca de G4 en la tercera línea.',
      'Pista 2: El golpe al hombro se juega un paso hacia el centro en diagonal.',
      'Pista 3: Juega en F5 (x=5, y=4).',
    ],
    solutionExplanation:
      'El Golpe al Hombro (Shoulder Move) en F5 es la jugada reductora por excelencia en el Capítulo 7 de Ishida.',
    commonMistake: 'Invadir demasiado profundo cuando una reducción limpia en F5 es suficiente.',
    prerequisites: ['lesson-24-reduccion-invasion-grandes-marcos'],
    relatedLessonId: 'lesson-24-reduccion-invasion-grandes-marcos',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 40,
    xpBase: 5,
    xpNoHints: 7,
  },

  // #48: DOBLE PROPÓSITO — DEFENDER GRUPO Y REDUCIR MOYO (ISHIDA PROBLEMA 16)
  {
    id: 'puzzle-48-sonda-flexible',
    number: 48,
    title: 'Doble Propósito: Defender y Reducir',
    theme: 'INVASION_Y_YOSE',
    themeLabel: 'Invasión y Yose',
    difficulty: 'AVANZADO',
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
    objective:
      'Juega Negro (Ishida Cap. 7 pág. 148 y Cap. 10 Problema 16): Tus piedras C6–D6 carecen de ojos y Blanco tiene un marco inferior en D2–G3. Juega en el punto que simultáneamente defiende tu grupo y reduce el marco blanco.',
    acceptedFirstMoves: [{ x: 3, y: 5 }],
    variations: [
      {
        playerMove: { x: 3, y: 5 },
        explanationEs:
          '¡Jugada maestra en D4! Como resume Akira Ishida en el Capítulo 10, si permitieras a Blanco jugar en D4 construiría un territorio gigantesco atacando tu grupo; al ocuparlo tú primero, resuelves defensa y reducción en un solo movimiento.',
      },
    ],
    wrongMoveExplanations: {},
    defaultWrongExplanation: 'Salta desde D6 hacia el centro-abajo en D4.',
    hints: [
      'Pista 1: Busca el punto donde se cruzan la salida de tu grupo C6–D6 y el techo del marco blanco D2–G3.',
      'Pista 2: Es un salto de un espacio hacia abajo desde D6.',
      'Pista 3: Juega en D4 (x=3, y=5).',
    ],
    solutionExplanation:
      'En el medio juego, las jugadas de doble propósito que defienden tu grupo débil mientras reducen el marco rival valen el doble que cualquier jugada unilateral.',
    commonMistake: 'Invadir a ciegas abajo olvidando que tu grupo de C6–D6 quedaría bajo un ataque devastador.',
    prerequisites: ['lesson-24-reduccion-invasion-grandes-marcos'],
    relatedLessonId: 'lesson-24-reduccion-invasion-grandes-marcos',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 45,
    xpBase: 5,
    xpNoHints: 7,
  },
];
