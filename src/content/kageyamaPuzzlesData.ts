import { PuzzleContent } from '../types/go';

/**
 * 12 Nuevos Problemas Tácticos (#65 a #76)
 * Basados directamente en "Lessons in the Fundamentals of Go" de Toshiro Kageyama (7-Dan).
 * Cubren enseñanzas no duplicadas del libro:
 * - Cap. 1: Firmeza al elegir entre dos ataris/redes y el Tesuji de Ceder el Paso en la Red
 * - Cap. 2: Cortar directamente sin "asomarse" (Nozoki crudo)
 * - Cap. 3: Las piedras caminan: el paso atrás sólido (Hiki) en contacto
 * - Cap. 4: La lucha por tomar la delantera saltando antes que arrastrarse en 2ª línea
 * - Cap. 6: La Primera Regla del Tsumego ("Hay muerte en el Hane") y punto vital de esquina
 * - Cap. 8: Jugadas Propias (Honte) sujetando la piedra cortadora
 * - Cap. 9: Escalera en Espiral (Guruguru-mawashi) y Colocación (Oki) en la esquina
 * - Cap. 10 y 11: Jugar Bajo las Piedras (Ishi-no-shita) y Tesuji de Yose en primera línea
 */
export const KAGEYAMA_PUZZLES_CATALOG: PuzzleContent[] = [
  // #65: LA RED Y EL ATARI MÁS FIRME (KAGEYAMA CAP. 1 PROB. 3)
  {
    id: 'puzzle-65-kageyama-firmeza-en-la-red',
    number: 65,
    title: 'La Captura más Firme sin Defectos',
    theme: 'REDES',
    themeLabel: 'Redes (Geta)',
    difficulty: 'FACIL',
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
    objective:
      'Juega Negro: Las dos piedras blancas E6–E5 tienen dos libertades. Elige el atari más firme que no deje defectos frente a la piedra blanca G4.',
    acceptedFirstMoves: [{ x: 4, y: 5 }],
    variations: [
      {
        playerMove: { x: 4, y: 5 },
        opponentReply: { x: 5, y: 4 },
        nextValidMoves: [{ x: 5, y: 5 }],
        explanationEs:
          '¡Exacto! El atari desde E4 sujeta las dos piedras blancas contra tu muro sin dejar ningún defecto de corte, y si Blanco huye a F5 lo cierras en F4.',
      },
    ],
    wrongMoveExplanations: {
      '5,4': 'Dar atari desde F5 parece activo, pero deja un defecto de corte con la piedra blanca de apoyo en G4. Cuando dos jugadas capturan, elige siempre la más firme.',
      '5,5': 'La red suelta en F4 permite a Blanco salir en E4 con fuerza contra tu muro izquierdo.',
    },
    defaultWrongExplanation:
      'Busca el atari en E4 (x=4, y=5) que encierra a las dos piedras blancas sin crear debilidades.',
    hints: [
      'Pista 1: Las dos piedras blancas en E6–E5 solo tienen dos libertades: E4 y F5.',
      'Pista 2: Observa la piedra blanca en G4: si das atari desde F5, Blanco tendrá contrajuego en el exterior.',
      'Pista 3: Juega en E4 (x=4, y=5) y cuando Blanco juegue F5, sella en F4 (x=5, y=5).',
    ],
    solutionExplanation:
      'Como enseña Kageyama en el Capítulo 1, cuando existen dos maneras de atrapar piedras de corte, el profesional elige siempre la que no deja ningún aji ni defecto futuro.',
    commonMistake: 'Jugar cualquiera de los dos ataris al azar sin verificar las piedras enemigas cercanas.',
    prerequisites: ['lesson-37-kageyama-redes-firmes-romper-escaleras'],
    relatedLessonId: 'lesson-37-kageyama-redes-firmes-romper-escaleras',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 40,
    xpBase: 5,
    xpNoHints: 7,
    markers: [
      { x: 4, y: 3, type: 'TRIANGLE' },
      { x: 4, y: 4, type: 'TRIANGLE' },
    ],
  },

  // #66: EL TESUJI DE CEDER EL PASO EN LA RED (KAGEYAMA CAP. 1 DIA. 14)
  {
    id: 'puzzle-66-kageyama-red-ceder-el-paso',
    number: 66,
    title: 'El Tesuji de Ceder el Paso en la Red',
    theme: 'REDES',
    themeLabel: 'Redes (Geta)',
    difficulty: 'INTERMEDIO',
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
    objective:
      'Juega Negro: En lugar de dar un atari precipitado que expone tus piedras, aplica el tesuji de "ceder el paso" a un salto de distancia para envolver a E5.',
    acceptedFirstMoves: [{ x: 5, y: 5 }],
    variations: [
      {
        playerMove: { x: 5, y: 5 },
        opponentReply: { x: 5, y: 4 },
        nextValidMoves: [{ x: 5, y: 3 }],
        explanationEs:
          '¡Brillante! F4 es el famoso tesuji de Kageyama (Cap. 1, Dia. 14): cedes un paso en diagonal y cuando Blanco avanza a F5 lo cierras en F6.',
      },
    ],
    wrongMoveExplanations: {
      '5,4': 'Si empujas o das atari en F5, Blanco escapa por E4 poniendo en peligro tu piedra D5.',
      '4,5': 'El atari directo en E4 empuja a Blanco hacia F5 con impulso contra E6.',
    },
    defaultWrongExplanation:
      'No des atari directo a E5: colócate en diagonal en F4 (x=5, y=5) para tender una red imparable.',
    hints: [
      'Pista 1: Dar atari inmediato en E4 o F5 ayuda a Blanco a escapar.',
      'Pista 2: A veces dar un paso atrás en diagonal envuelve mejor que empujar.',
      'Pista 3: Juega en F4 (x=5, y=5) y cuando Blanco avance a F5, bloquea en F6 (x=5, y=3).',
    ],
    solutionExplanation:
      'El tesuji en F4 cede la iniciativa aparente por un instante pero cierra herméticamente todas las rutas de fuga de la piedra cortadora E5.',
    commonMistake: 'Dar atari por reflejo en cada turno sin leer la red tranquila a distancia.',
    prerequisites: ['lesson-37-kageyama-redes-firmes-romper-escaleras'],
    relatedLessonId: 'lesson-37-kageyama-redes-firmes-romper-escaleras',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 50,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 4, y: 4, type: 'TRIANGLE' }],
  },

  // #67: NO TE ASOMES DONDE PUEDES CORTAR (KAGEYAMA CAP. 2)
  {
    id: 'puzzle-67-kageyama-cortar-sin-asomarse',
    number: 67,
    title: 'No Te Asomes Donde Puedes Cortar',
    theme: 'CONECTAR_Y_CORTAR',
    themeLabel: 'Conectar y cortar',
    difficulty: 'FACIL',
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
    objective:
      'Juega Negro: Corta directamente el punto vital de la formación blanca sin cometer el "asomo crudo" (Nozoki) que regala la conexión.',
    acceptedFirstMoves: [{ x: 4, y: 3 }],
    variations: [
      {
        playerMove: { x: 4, y: 3 },
        opponentReply: { x: 4, y: 5 },
        nextValidMoves: [{ x: 3, y: 2 }, { x: 5, y: 2 }],
        explanationEs:
          '¡Exacto! Cortar directo en E6 divide las tres piedras blancas al instante y permite capturar una de las alas.',
      },
    ],
    wrongMoveExplanations: {
      '4,5': '¡El "asomo crudo" que Kageyama reprueba! Al jugar E4 obligas a Blanco a conectar en E6 y pierdes toda oportunidad de cortar.',
      '3,2': 'Demasiado pasivo en D7; Blanco conecta inmediatamente en E6 y queda invulnerable.',
    },
    defaultWrongExplanation:
      'Corta directamente en el corazón de la forma blanca en E6 (x=4, y=3).',
    hints: [
      'Pista 1: Recuerda el axioma del Capítulo 2 de Kageyama: "No te asomes donde puedes cortar".',
      'Pista 2: El punto E6 une a las tres piedras blancas D6, F6 y E5.',
      'Pista 3: Juega directamente en E6 (x=4, y=3).',
    ],
    solutionExplanation:
      'Cortar sin vacilar en E6 fragmenta a Blanco en tres pedazos aislados, mientras que asomarse en E4 le regalaría un grupo sólido.',
    commonMistake: 'Jugar "asomos" (Nozoki) automáticos creyendo que siempre son sente.',
    prerequisites: ['lesson-38-kageyama-no-asomarse-corte-continuidad'],
    relatedLessonId: 'lesson-38-kageyama-no-asomarse-corte-continuidad',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 40,
    xpBase: 5,
    xpNoHints: 7,
    markers: [
      { x: 3, y: 3, type: 'TRIANGLE' },
      { x: 5, y: 3, type: 'TRIANGLE' },
    ],
  },

  // #68: LAS PIEDRAS CAMINAN: EL PASO ATRÁS SÓLIDO (KAGEYAMA CAP. 3 DIA. 5)
  {
    id: 'puzzle-68-kageyama-paso-atras-en-contacto',
    number: 68,
    title: 'Las Piedras Caminan: El Paso Atrás Sólido',
    theme: 'CONECTAR_Y_CORTAR',
    themeLabel: 'Conectar y cortar',
    difficulty: 'INTERMEDIO',
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
    objective:
      'Juega Negro: Blanco acaba de cortar y dar hane en F6. Juega el "paso atrás" natural (Hiki) que alarga tus libertades y amenaza atrapar D6 o cortar F6.',
    acceptedFirstMoves: [{ x: 4, y: 2 }],
    variations: [
      {
        playerMove: { x: 4, y: 2 },
        opponentReply: { x: 5, y: 2 },
        nextValidMoves: [{ x: 3, y: 2 }],
        explanationEs:
          '¡Magistral! Retroceder limpiamente a E7 alarga tus libertades y cuando Blanco defiende F7, capturas la piedra cortadora D6 jugando D7.',
      },
    ],
    wrongMoveExplanations: {
      '5,2': 'Si haces contra-hane precipitado en F7, Blanco corta en E7 con atari y destruye tu posición.',
      '3,2': 'Dar atari prematuro en D7 permite a Blanco dar atari en E7 y aplastar tu piedra E6.',
    },
    defaultWrongExplanation:
      'Camina un paso sólido hacia atrás en E7 (x=4, y=2) para fortalecer tu piedra E6.',
    hints: [
      'Pista 1: Tu piedra en E6 está bajo presión de dos piedras blancas.',
      'Pista 2: Hacer hane en D7 o F7 deja un punto de atari fatal en E7.',
      'Pista 3: Extiende un paso atrás en E7 (x=4, y=2) y luego responde en D7 (x=3, y=2).',
    ],
    solutionExplanation:
      'Como explica Kageyama en "Las piedras salen a caminar" (Cap. 3), el paso atrás recto en E7 mantiene la armonía de tus piedras y castiga la sobreextensión rival.',
    commonMistake: 'Responder a cada hane rival con otro hane impulsivo sin revisar las libertades propias.',
    prerequisites: ['lesson-39-kageyama-piedras-caminan-paso-atras'],
    relatedLessonId: 'lesson-39-kageyama-piedras-caminan-paso-atras',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 45,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 4, y: 3, type: 'TRIANGLE' }],
  },

  // #69: LA LUCHA POR TOMAR LA DELANTERA (KAGEYAMA CAP. 4 DIA. 7-13)
  {
    id: 'puzzle-69-kageyama-saltar-adelante',
    number: 69,
    title: 'La Lucha por Tomar la Delantera',
    theme: 'FORMA_Y_ATAQUE',
    themeLabel: 'Forma, Ataque y Defensa',
    difficulty: 'INTERMEDIO',
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
    objective:
      'Juega Negro: Deja de arrastrarte por la segunda línea ("la línea de la derrota") y salta adelante hacia el centro antes de que Blanco bloquee tu cabeza.',
    acceptedFirstMoves: [{ x: 5, y: 5 }],
    variations: [
      {
        playerMove: { x: 5, y: 5 },
        opponentReply: { x: 5, y: 6 },
        nextValidMoves: [{ x: 5, y: 7 }],
        explanationEs:
          '¡Excelente sentido del flujo! Saltar a F4 toma la delantera hacia el centro; si Blanco intenta cortar en F3, conectas sólidamente en F2.',
      },
    ],
    wrongMoveExplanations: {
      '5,7': '¡Arrastrarse otra vez en la segunda línea (F2)! Blanco volverá a presionarte en F3 y sellará tu grupo.',
      '5,6': 'Empujar en contacto en F3 invita a Blanco a bloquear en F4 (Hane en la cabeza de tus piedras) manteniendo la iniciativa.',
    },
    defaultWrongExplanation:
      'Salta un paso por delante del muro blanco jugando directamente en F4 (x=5, y=5).',
    hints: [
      'Pista 1: Arrastrarse en F2 regala más influencia exterior a Blanco.',
      'Pista 2: Empujar en F3 permite que Blanco te golpee en la cabeza en F4.',
      'Pista 3: Salta directamente a F4 (x=5, y=5) y si Blanco juega F3, conecta en F2 (x=5, y=7).',
    ],
    solutionExplanation:
      'En la lucha por tomar la delantera (Cap. 4), saltar al punto vital F4 rompe el bloqueo rival y transforma una posición comprimida en una salida activa.',
    commonMistake: 'Seguir empujando desde atrás en F3 o arrastrándose en F2.',
    prerequisites: ['lesson-40-kageyama-lucha-tomar-delantera'],
    relatedLessonId: 'lesson-40-kageyama-lucha-tomar-delantera',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 45,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 4, y: 7, type: 'TRIANGLE' }],
  },

  // #70: HAY MUERTE EN EL HANE: ESTRECHAR PRIMERO (KAGEYAMA CAP. 6)
  {
    id: 'puzzle-70-kageyama-hay-muerte-en-el-hane',
    number: 70,
    title: 'Hay Muerte en el Hane: Estrechar Primero',
    theme: 'VIDA_Y_MUERTE',
    themeLabel: 'Vida y muerte (Tsumego)',
    difficulty: 'INTERMEDIO',
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
    objective:
      'Juega Negro: Mata al grupo blanco de la esquina aplicando la Primera Regla del Tsumego de Kageyama: estrechar desde el exterior antes de golpear el punto vital.',
    acceptedFirstMoves: [{ x: 5, y: 0 }],
    variations: [
      {
        playerMove: { x: 5, y: 0 },
        opponentReply: { x: 4, y: 1 },
        nextValidMoves: [{ x: 2, y: 0 }],
        explanationEs:
          '¡Exacto! "Para matar, estrecha primero desde afuera; hay muerte en el hane". F9 reduce el espacio y luego C9 destruye el segundo ojo.',
      },
    ],
    wrongMoveExplanations: {
      '2,0': 'Si juegas en el interior C9 sin estrechar antes, Blanco extiende a F9 y consigue dos ojos separados.',
      '3,0': 'Golpear dentro en D9 sin reducir desde afuera permite a Blanco ampliar su base en F9.',
    },
    defaultWrongExplanation:
      'Aplica primero el Hane exterior en F9 (x=5, y=0) y después golpea el punto vital C9 (x=2, y=0).',
    hints: [
      'Pista 1: El grupo blanco vivirá si le permites expandir su base en F9.',
      'Pista 2: Aplica la regla fundamental de Kageyama: estrecha desde afuera con Hane antes de ir al punto vital.',
      'Pista 3: Juega primero en F9 (x=5, y=0) y tras E8 golpea en C9 (x=2, y=0).',
    ],
    solutionExplanation:
      'El Hane exterior en F9 obliga a Blanco a defender en E8, reduciendo su espacio interior a un Tres Recto que muere cuando Negro juega C9.',
    commonMistake: 'Saltar directamente al punto interior C9 olvidando reducir primero la frontera exterior.',
    prerequisites: ['lesson-42-kageyama-regla-fundamental-tsumego-cerco'],
    relatedLessonId: 'lesson-42-kageyama-regla-fundamental-tsumego-cerco',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 50,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 4, y: 0, type: 'TRIANGLE' }],
  },

  // #71: EL PUNTO VITAL DEL ESPACIO DE ESQUINA (KAGEYAMA CAP. 6)
  {
    id: 'puzzle-71-kageyama-siete-abultado-esquina',
    number: 71,
    title: 'El Punto Vital del Espacio de Esquina',
    theme: 'VIDA_Y_MUERTE',
    themeLabel: 'Vida y muerte (Tsumego)',
    difficulty: 'INTERMEDIO',
    boardSize: 9,
    initialStones: [
      { x: 0, y: 1, color: 'BLACK' },
      { x: 1, y: 1, color: 'BLACK' },
      { x: 2, y: 1, color: 'BLACK' },
      { x: 3, y: 1, color: 'BLACK' },
      { x: 4, y: 0, color: 'BLACK' },
      { x: 4, y: 1, color: 'BLACK' },
      { x: 0, y: 2, color: 'WHITE' },
      { x: 1, y: 2, color: 'WHITE' },
      { x: 2, y: 2, color: 'WHITE' },
      { x: 3, y: 2, color: 'WHITE' },
      { x: 4, y: 2, color: 'WHITE' },
      { x: 5, y: 0, color: 'WHITE' },
      { x: 5, y: 1, color: 'WHITE' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro: Vive incondicionalmente ocupando el punto vital B9 de la primera línea que asegura tus dos ojos.',
    acceptedFirstMoves: [{ x: 1, y: 0 }, { x: 2, y: 0 }],
    variations: [
      {
        playerMove: { x: 1, y: 0 },
        opponentReply: { x: 2, y: 0 },
        nextValidMoves: [{ x: 3, y: 0 }],
        explanationEs:
          '¡Vida limpia! En B9 aseguras un ojo intocable en A9 y capturas cualquier invasión en C9–D9.',
      },
      {
        playerMove: { x: 2, y: 0 },
        opponentReply: { x: 1, y: 0 },
        nextValidMoves: [{ x: 0, y: 0 }],
        explanationEs:
          '¡Vida limpia! Divides el espacio de esquina y aseguras dos ojos reales.',
      },
    ],
    wrongMoveExplanations: {
      '2,0': 'Si juegas en C9, Blanco coloca en B9 y reduce tu espacio a un Tres Recto muerto.',
      '0,0': 'Jugar en A9 encoge tu propio espacio y permite que Blanco golpee B9 para matarte.',
    },
    defaultWrongExplanation:
      'Ocupa el punto simétrico B9 (x=1, y=0) para dividir la esquina en dos ojos.',
    hints: [
      'Pista 1: Recuerda que "el punto vital de mi enemigo es mi propio punto vital".',
      'Pista 2: Si Blanco jugara primero, ¿qué punto en la primera línea destruiría tus dos ojos?',
      'Pista 3: Juega en B9 (x=1, y=0).',
    ],
    solutionExplanation:
      'Al ocupar B9, Negro divide las tres intersecciones vacías de la primera línea en dos ojos reales en A9 y C9.',
    commonMistake: 'Jugar en C9 o A9 encogiendo el propio espacio de ojos.',
    prerequisites: ['lesson-42-kageyama-regla-fundamental-tsumego-cerco'],
    relatedLessonId: 'lesson-42-kageyama-regla-fundamental-tsumego-cerco',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 45,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 1, y: 1, type: 'TRIANGLE' }],
  },

  // #72: HONTE: LA JUGADA PROPIA QUE SUJETA EL CORTE (KAGEYAMA CAP. 8 PROB. 2)
  {
    id: 'puzzle-72-kageyama-honte-sujetar-piedra-corte',
    number: 72,
    title: 'Honte: La Jugada Propia que Sujeta el Corte',
    theme: 'FORMA_Y_ATAQUE',
    themeLabel: 'Forma, Ataque y Defensa',
    difficulty: 'INTERMEDIO',
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
    objective:
      'Juega Negro: Juega la jugada propia (Honte) para capturar y sujetar la piedra cortadora blanca E5 sin dejar ninguna debilidad.',
    acceptedFirstMoves: [{ x: 4, y: 5 }],
    variations: [
      {
        playerMove: { x: 4, y: 5 },
        opponentReply: { x: 4, y: 6 },
        nextValidMoves: [{ x: 3, y: 6 }, { x: 5, y: 6 }],
        explanationEs:
          '¡Auténtico Honte! Sujetar directamente la piedra clave en E4 elimina todo el aji y deja a las piedras blancas laterales aisladas.',
      },
    ],
    wrongMoveExplanations: {
      '3,6': 'Atacar D4 ignorando la piedra cortadora central permite a Blanco salvar E5 jugando en E4 con doble atari.',
      '5,6': 'Perseguir F4 permite a Blanco escapar por el centro en E4 y partir tu grupo en dos.',
    },
    defaultWrongExplanation:
      'Sujeta directamente la piedra cortadora central jugando en E4 (x=4, y=5).',
    hints: [
      'Pista 1: La piedra blanca en E5 es la piedra cortadora que separa tus grupos.',
      'Pista 2: Como enseña Kageyama en el Capítulo 8, nunca dejes con vida la piedra cortadora por perseguir ganancias menores.',
      'Pista 3: Juega en E4 (x=4, y=5).',
    ],
    solutionExplanation:
      'Capturar la piedra de corte con E4 es la única jugada propia (Honte): conecta todo el centro negro y deja sin base a D4 y F4.',
    commonMistake: 'Codiciar las piedras exteriores permitiendo que la piedra cortadora central reviva.',
    prerequisites: ['lesson-45-kageyama-jugadas-propias-espiral-bajo-piedras'],
    relatedLessonId: 'lesson-45-kageyama-jugadas-propias-espiral-bajo-piedras',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 45,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 4, y: 4, type: 'TRIANGLE' }],
  },

  // #73: LA ESCALERA EN ESPIRAL (GURUGURU-MAWASHI — KAGEYAMA CAP. 9)
  {
    id: 'puzzle-73-kageyama-escalera-en-espiral',
    number: 73,
    title: 'La Escalera en Espiral (Guruguru-mawashi)',
    theme: 'TESUJI',
    themeLabel: 'Tesuji y sacrificios',
    difficulty: 'AVANZADO',
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
    objective:
      'Juega Negro: Cierra y exprime en espiral a las tres piedras blancas (D6–E6–D5) obligándolas a volverse una masa pesada sin libertades.',
    acceptedFirstMoves: [{ x: 3, y: 5 }],
    variations: [
      {
        playerMove: { x: 3, y: 5 },
        opponentReply: { x: 4, y: 5 },
        nextValidMoves: [{ x: 5, y: 4 }],
        explanationEs:
          '¡Excelente exprimido en espiral! D4 pone en atari a las tres piedras blancas; aunque Blanco capture E5 en E4, cierras en F5 y toda la masa blanca queda atrapada.',
      },
    ],
    wrongMoveExplanations: {
      '5,4': 'Si defiendes pasivamente en F5 primero, Blanco escapa hacia D4 ganando múltiples libertades en el centro.',
      '4,5': 'Conectar en E4 permite a Blanco dar atari y escapar por D4.',
    },
    defaultWrongExplanation:
      'Sacrifica la piedra E5 dando atari exterior en D4 (x=3, y=5) y luego sella en F5 (x=5, y=4).',
    hints: [
      'Pista 1: Las tres piedras blancas D6–E6–D5 tienen solo dos libertades y amenazan tu piedra E5.',
      'Pista 2: No intentes salvar E5 conectando; úsala como carnada para obligar a Blanco a formar un dumpling pesado.',
      'Pista 3: Juega D4 (x=3, y=5) y cuando Blanco capture en E4, cierra en F5 (x=5, y=4).',
    ],
    solutionExplanation:
      'La técnica de exprimir en espiral (Guruguru-mawashi) entrega piedras interiores para reducir las libertades del grupo enemigo desde afuera.',
    commonMistake: 'Intentar salvar la piedra interior E5 permitiendo que el rival salga al centro.',
    prerequisites: ['lesson-45-kageyama-jugadas-propias-espiral-bajo-piedras'],
    relatedLessonId: 'lesson-45-kageyama-jugadas-propias-espiral-bajo-piedras',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 55,
    xpBase: 5,
    xpNoHints: 7,
    markers: [
      { x: 3, y: 3, type: 'TRIANGLE' },
      { x: 4, y: 4, type: 'CIRCLE' },
    ],
  },

  // #74: COLOCACIÓN MORTAL EN LA ESQUINA (KAGEYAMA CAP. 9)
  {
    id: 'puzzle-74-kageyama-colocacion-cuatro-doblado',
    number: 74,
    title: 'Colocación Mortal en la Primera Línea',
    theme: 'VIDA_Y_MUERTE',
    themeLabel: 'Vida y muerte (Tsumego)',
    difficulty: 'AVANZADO',
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
    objective:
      'Juega Negro: Aplica el tesuji de colocación (Oki) en la primera línea que impide a Blanco formar dos ojos separados.',
    acceptedFirstMoves: [{ x: 1, y: 0 }],
    variations: [
      {
        playerMove: { x: 1, y: 0 },
        opponentReply: { x: 2, y: 0 },
        nextValidMoves: [{ x: 0, y: 0 }],
        explanationEs:
          '¡Colocación letal en B9! Cuando Blanco bloquea en C9, extiendes a A9 reduciendo su espacio a una forma muerta de tres en línea.',
      },
    ],
    wrongMoveExplanations: {
      '2,0': 'Jugar en C9 permite a Blanco responder en B9 y asegurar dos ojos separados.',
      '0,0': 'El hane en A9 permite a Blanco bloquear en B9 y vivir limpiamente.',
    },
    defaultWrongExplanation:
      'Coloca tu piedra directamente en el punto vital B9 (x=1, y=0) y luego extiende a A9 (x=0, y=0).',
    hints: [
      'Pista 1: Blanco quiere jugar en B9 para tener un ojo en A9 y otro en C9.',
      'Pista 2: Usa el tesuji de colocación (Oki) directamente en el punto de simetría.',
      'Pista 3: Coloca en B9 (x=1, y=0) y tras C9 extiende a A9 (x=0, y=0).',
    ],
    solutionExplanation:
      'La colocación en B9 seguida de la extensión a A9 fuerza un Tres en Línea muerto tras la captura.',
    commonMistake: 'Hacer hane exterior en A9 ayudando a Blanco a dividir su espacio en B9.',
    prerequisites: ['lesson-42-kageyama-regla-fundamental-tsumego-cerco'],
    relatedLessonId: 'lesson-42-kageyama-regla-fundamental-tsumego-cerco',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 50,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 1, y: 1, type: 'TRIANGLE' }],
  },

  // #75: JUGAR BAJO LAS PIEDRAS (ISHI-NO-SHITA — KAGEYAMA CAP. 10)
  {
    id: 'puzzle-75-kageyama-jugar-bajo-las-piedras',
    number: 75,
    title: 'Sacrificio y Captura Bajo las Piedras (Ishi-no-shita)',
    theme: 'TESUJI',
    themeLabel: 'Tesuji y sacrificios',
    difficulty: 'AVANZADO',
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
    objective:
      'Juega Negro: Alarga tus dos piedras de la esquina B9–C9 hasta A9 como sacrificio preparatorio para encerrar a la cadena blanca.',
    acceptedFirstMoves: [{ x: 0, y: 0 }],
    variations: [
      {
        playerMove: { x: 0, y: 0 },
        opponentReply: { x: 2, y: 2 },
        nextValidMoves: [{ x: 0, y: 2 }],
        explanationEs:
          '¡Excelente preparación de Ishi-no-shita! Al extender a A9 ganas libertades en la esquina y cuando Blanco intenta salir en C7, cierras en A7 atrapando sus piedras.',
      },
    ],
    wrongMoveExplanations: {
      '2,2': 'Dar atari en C7 primero permite a Blanco capturar inmediatamente tus dos piedras de B9–C9 jugando en A9.',
    },
    defaultWrongExplanation:
      'Extiende primero en la esquina A9 (x=0, y=0) antes de cerrar el cerco exterior en A7 (x=0, y=2).',
    hints: [
      'Pista 1: Tus dos piedras en B9–C9 tienen solo una libertad en A9.',
      'Pista 2: Como explica Kageyama en el Capítulo 10, alargar la cadena en la esquina obliga al rival a gastar más jugadas.',
      'Pista 3: Juega primero en A9 (x=0, y=0) y luego sella en A7 (x=0, y=2).',
    ],
    solutionExplanation:
      'Extender a A9 transforma dos piedras en atari en una cadena de tres piedras que gana la carrera de libertades contra el grupo blanco.',
    commonMistake: 'Jugar por fuera en C7 dejando las piedras de la esquina en atari inmediato.',
    prerequisites: ['lesson-45-kageyama-jugadas-propias-espiral-bajo-piedras'],
    relatedLessonId: 'lesson-45-kageyama-jugadas-propias-espiral-bajo-piedras',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 55,
    xpBase: 5,
    xpNoHints: 7,
    markers: [
      { x: 1, y: 0, type: 'TRIANGLE' },
      { x: 2, y: 0, type: 'TRIANGLE' },
    ],
  },

  // #76: EL TESUJI DE CONTACTO EN EL YOSE DE PRIMERA LÍNEA (KAGEYAMA CAP. 11)
  {
    id: 'puzzle-76-kageyama-yose-hana-tsuke-borde',
    number: 76,
    title: 'El Tesuji de Primera Línea en el Yose',
    theme: 'INVASION_Y_YOSE',
    themeLabel: 'Invasión, Sente y Yose',
    difficulty: 'AVANZADO',
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
    objective:
      'Juega Negro: Reduce drásticamente el territorio blanco del borde superior entrando directamente en D9 aprovechando que Blanco no puede cortar en E8.',
    acceptedFirstMoves: [{ x: 3, y: 0 }],
    variations: [
      {
        playerMove: { x: 3, y: 0 },
        opponentReply: { x: 2, y: 0 },
        nextValidMoves: [{ x: 4, y: 0 }],
        explanationEs:
          '¡Yose profesional! Al entrar hasta D9 y luego conectar en E9, Blanco no puede cortar en E8 porque quedaría en atari inmediato.',
      },
    ],
    wrongMoveExplanations: {
      '4,1': 'Empujar en E8 solo ayuda a Blanco a bloquear sólidamente en D9 conservando todo su territorio.',
      '4,0': 'Avanzar solo un paso a E9 permite a Blanco bloquear en D9 en sente y ganar puntos extra.',
    },
    defaultWrongExplanation:
      'Entra directamente en la primera línea en D9 (x=3, y=0) y luego conecta en E9 (x=4, y=0).',
    hints: [
      'Pista 1: Observa el punto de corte E8: si Blanco jugara allí, quedaría con una sola libertad.',
      'Pista 2: En lugar de empujar en E8, salta directamente a la primera línea bajo la piedra blanca D8.',
      'Pista 3: Juega en D9 (x=3, y=0) y tras C9 conecta en E9 (x=4, y=0).',
    ],
    solutionExplanation:
      'Como enseña Kageyama en el Capítulo 11 sobre Yose, verificar la falta de libertades enemigas en el borde permite deslizarse un punto más profundo en primera línea.',
    commonMistake: 'Empujar automáticamente desde afuera en E8 regalando a Blanco una conexión sólida.',
    prerequisites: ['lesson-44-kageyama-psicologia-yose-doble-sente'],
    relatedLessonId: 'lesson-44-kageyama-psicologia-yose-doble-sente',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 50,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 3, y: 1, type: 'TRIANGLE' }],
  },
];
