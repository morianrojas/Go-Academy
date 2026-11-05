import { PuzzleContent } from '../types/go';

export const EXPANDED_PUZZLES_CATALOG: PuzzleContent[] = [
  // #11: CERRAR FRONTERA EN PRIMERA LÍNEA (YOSE / FRONTERA)
  {
    id: 'puzzle-11-cerrar-frontera-yose',
    number: 11,
    title: 'La Puerta del Territorio',
    theme: 'INVASION_Y_YOSE',
    themeLabel: 'Invasión, Sente y Yose',
    difficulty: 'PRINCIPIANTE',
    boardSize: 9,
    initialStones: [
      { x: 2, y: 1, color: 'BLACK' },
      { x: 2, y: 2, color: 'BLACK' },
      { x: 1, y: 2, color: 'BLACK' },
      { x: 0, y: 2, color: 'BLACK' },
      { x: 3, y: 0, color: 'WHITE' },
      { x: 3, y: 1, color: 'WHITE' },
      { x: 3, y: 2, color: 'WHITE' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro: Cierra la última abertura en la primera línea superior (C9) para impedir que Blanco penetre en tu territorio de la esquina.',
    acceptedFirstMoves: [{ x: 2, y: 0 }],
    variations: [
      {
        playerMove: { x: 2, y: 0 },
        explanationEs:
          '¡Frontera sellada en C9! Tus 4 puntos de territorio vacío en A9, B9, A8 y B8 quedan completamente aislados de las piedras blancas.',
      },
    ],
    wrongMoveExplanations: {
      '1,0': 'B9 cede innecesariamente un punto de tu propio territorio y permite a Blanco empujar en C9.',
      '0,0': 'A9 rellena tu propia esquina y deja abierta la puerta exterior en C9.',
    },
    defaultWrongExplanation:
      'Mira la primera línea superior (fila 9): la columna C aún está abierta entre C8 y el borde.',
    hints: [
      'Pista 1: Tu muro negro sube por C7 y C8, pero le falta tocar el borde superior.',
      'Pista 2: Las piedras blancas en D9 y D8 amenazan con colarse por la primera línea.',
      'Pista 3: Juega en C9 (x=2, y=0) para cerrar la puerta.',
    ],
    solutionExplanation:
      'En el cierre de fronteras (Yose), bloquear en primera línea (C9) maximiza tu territorio sin ceder espacio al rival.',
    commonMistake: 'Retroceder a B9 o ignorar la abertura de primera línea.',
    prerequisites: ['lesson-4-territorio-conteo'],
    relatedLessonId: 'lesson-4-territorio-conteo',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 30,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 2, y: 0, type: 'CIRCLE' }],
  },

  // #12: ESCALERA (SHICHO) MULTI-MOVIMIENTO
  {
    id: 'puzzle-12-escalera-shicho',
    number: 12,
    title: 'Persecución en Escalera (Shicho)',
    theme: 'ESCALERAS',
    themeLabel: 'Escaleras (Shicho)',
    difficulty: 'FACIL',
    boardSize: 9,
    initialStones: [
      { x: 3, y: 5, color: 'WHITE' },
      { x: 3, y: 6, color: 'BLACK' },
      { x: 2, y: 5, color: 'BLACK' },
      { x: 5, y: 4, color: 'BLACK' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro (Secuencia de 2 jugadas): Inicia la Escalera dando atari a la piedra blanca de D4 y, tras su intento de huida en E4, vuelve a darle atari para atraparla.',
    acceptedFirstMoves: [{ x: 3, y: 4 }],
    variations: [
      {
        playerMove: { x: 3, y: 4 },
        opponentReply: { x: 4, y: 5 },
        nextValidMoves: [
          { x: 4, y: 6 },
          { x: 4, y: 4 },
        ],
        explanationEs:
          '¡Escalera perfecta en 2 pasos! Primero diste atari en D5 obligando a Blanco a correr a E4, y luego cerraste el segundo atari dejando a las dos piedras blancas sin salida.',
      },
    ],
    wrongMoveExplanations: {
      '4,5': 'Si empiezas en E4, Blanco escapa hacia arriba por D5 hacia el centro libre.',
    },
    defaultWrongExplanation:
      'Observa las dos libertades de la piedra blanca en D4 (D5 y E4). Si juegas en D5, empujas a Blanco hacia tu piedra de apoyo en F5.',
    hints: [
      'Pista 1: La piedra blanca en D4 tiene solo 2 libertades: D5 y E4.',
      'Pista 2: Empieza jugando en D5 para darle atari desde arriba.',
      'Pista 3: Cuando Blanco huya a E4, dale el segundo atari en E3 o E5.',
    ],
    solutionExplanation:
      'En la Escalera (Shicho), cada jugada deja al grupo enemigo con 1 sola libertad (en atari) en zigzag.',
    commonMistake: 'Dar el primer atari por el lado equivocado permitiendo que el rival escape al centro.',
    prerequisites: ['lesson-9-escaleras-redes-snapback'],
    relatedLessonId: 'lesson-9-escaleras-redes-snapback',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 45,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 3, y: 5, type: 'TRIANGLE' }],
  },

  // #13: LA RED (GETA)
  {
    id: 'puzzle-13-red-geta',
    number: 13,
    title: 'La Red Invisible (Geta)',
    theme: 'REDES',
    themeLabel: 'Redes (Geta)',
    difficulty: 'FACIL',
    boardSize: 9,
    initialStones: [
      { x: 4, y: 4, color: 'WHITE' },
      { x: 3, y: 4, color: 'BLACK' },
      { x: 4, y: 3, color: 'BLACK' },
      { x: 3, y: 6, color: 'BLACK' },
      { x: 6, y: 3, color: 'BLACK' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro: El atari directo permitiría escapar a la piedra blanca de E5. ¡Lanza una Red (Geta) a un salto de distancia para encerrarla!',
    acceptedFirstMoves: [{ x: 5, y: 5 }],
    variations: [
      {
        playerMove: { x: 5, y: 5 },
        explanationEs:
          '¡Red (Geta) magistral en F4! Aunque E5 conserva momentáneamente las libertades F5 y E4, si Blanco asoma por cualquiera de las dos queda bloqueado y capturado.',
      },
    ],
    wrongMoveExplanations: {
      '5,4': 'Si das atari directo en F5, Blanco se extiende hacia abajo en E4 con 3 libertades.',
      '4,5': 'Si das atari directo en E4, Blanco se extiende hacia la derecha en F5 con 3 libertades.',
    },
    defaultWrongExplanation:
      'No toques directamente la piedra blanca en F5 ni en E4: busca la intersección diagonal que vigila ambas salidas a la vez.',
    hints: [
      'Pista 1: Las dos salidas de la piedra blanca en E5 son F5 y E4.',
      'Pista 2: ¿Qué intersección toca simultáneamente a F5 y a E4?',
      'Pista 3: Coloca tu piedra negra en F4 (coordenada x=5, y=5).',
    ],
    solutionExplanation:
      'La Red (Geta) en F4 cierra la jaula a distancia: Blanco no puede escapar ni por F5 ni por E4.',
    commonMistake: 'Jugar atari automático en F5 o E4 sin leer que la piedra escapa por el otro lado.',
    prerequisites: ['lesson-9-escaleras-redes-snapback'],
    relatedLessonId: 'lesson-9-escaleras-redes-snapback',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 45,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 4, y: 4, type: 'TRIANGLE' }],
  },

  // #14: SNAPBACK (UTTEGAESHI) EN 2 PASOS
  {
    id: 'puzzle-14-snapback',
    number: 14,
    title: 'El Rebote Mortal (Snapback)',
    theme: 'SNAPBACK',
    themeLabel: 'Snapback (Uttegaeshi)',
    difficulty: 'INTERMEDIO',
    boardSize: 9,
    initialStones: [
      // White group of 3 stones at D6(3,3), E6(4,3), D5(3,4) with only 2 liberties: E5(4,4) and E7(4,2) occupied?
      // Let's make a crystal-clear Snapback:
      // White stones at D6(3,3), C5(2,4), D4(3,5) surrounding D5(3,4), and White stone at E6(4,3) + F5(5,4) + E4(4,5).
      // Wait: let's trace exact liberties!
      // Suppose White has 2 stones at E6(4,3) and F6(5,3).
      // Black surrounds White on Top: E7(4,2), F7(5,2); Right: G6(6,3); Bottom of F6: F5(5,4); Left of E6: D6(3,3).
      // Then the 2-stone White group [E6(4,3), F6(5,3)] has ONLY ONE liberty left at E5(4,4)!
      // And what if Black has a stone at D5(3,4) and E4(4,5) and C6(2,3)?
      // Wait: in a Snapback, Black plays at E5(4,4) putting himself in 1-liberty atari so White captures E5(4,4), and after White captures E5, White's 3-stone group [E6, F6, E5] has only 1 liberty at E5!
      // Let's verify the exact coordinates for that!
      // White group: E6(4,3) and F6(5,3).
      // Its neighbors are: E7(4,2), F7(5,2), G6(6,3), F5(5,4), D6(3,3), and E5(4,4).
      // If Black occupies E7(4,2), F7(5,2), G6(6,3), F5(5,4), and D6(3,3) is WHITE!
      // Let's check: White stones at D6(3,3), E6(4,3), D4(3,5), E4(4,5), F5(5,4).
      // Wait: let's make it even simpler!
      // White stones to be captured: E6(4,3) and F5(5,4) and F6(5,3) (3 White stones in an L).
      // Neighbors of [E6(4,3), F6(5,3), F5(5,4)]:
      // - D6(3,3): Black
      // - E7(4,2): Black
      // - F7(5,2): Black
      // - G6(6,3): Black
      // - G5(6,4): Black
      // - F4(5,5): Black
      // - E5(4,4): EMPTY!
      // Now what surrounds E5(4,4)?
      // - Top of E5 is E6(4,3) (White)
      // - Right of E5 is F5(5,4) (White)
      // - Left of E5 is D5(3,4) -> Make D5(3,4) WHITE (with plenty of liberties on the left, e.g., C5 empty, D4 empty)!
      // - Bottom of E5 is E4(4,5) -> EMPTY!
      // Let's trace what happens when Black plays at E5(4,4):
      // 1. In initial position, White group [E6(4,3), F6(5,3), F5(5,4)] has only 1 liberty at E5(4,4)? Wait: if it only had 1 liberty at E5, then Black playing E5 would capture it immediately on move 1!
      // For a true Snapback, before Black plays the sacrifice stone, the White group must have TWO liberties: the sacrifice point AND the point where the sacrifice stone sits? No! A single intersection can only be 1 liberty.
      // How does a group have 1 liberty AFTER capturing a stone?
      // Because BEFORE the sacrifice, the White group already has 1 stone of Black inside it, OR Black plays next to a Black stone that is in atari? No!
      // In Go, how does Snapback work?
      // White has a group (say E6(4,3) and F6(5,3)) that currently has TWO liberties: D6(3,3) and E5(4,4)? No, if Black plays E5(4,4), White still has D6(3,3).
      // Wait: how does capturing a stone REDUCE White's liberties to 1?
      // Because the stone White captures is a SINGLE Black stone that Black just played, AND the White stone that captures it CONNECTS into the doomed White group!
      // YES! Look at how Snapback works in Go:
      // White has 2 stones at E6(4,3) and F6(5,3) whose liberties are E5(4,4) and D5(3,4)? No, D5 is not adjacent to E6.
      // Suppose White has 2 stones at E6(4,3) and F5(5,4) (diagonal to each other!).
      // - E6(4,3) has Black stones at D6(3,3), E7(4,2), F6(5,3). So E6's ONLY liberty is E5(4,4)!
      // - No, if E6 only has E5, then playing E5 captures E6 immediately.
      // What if E6(4,3) and F6(5,3) have Black stones at E7(4,2), F7(5,2), G6(6,3), F5(5,4), and D6(3,3) is EMPTY? No.
      // Let's recall the exact geometry of Snapback (Uttegaeshi):
      // Black already has a stone at E6(4,3) (or plays at E5(4,4))!
      // Wait: suppose Black ALREADY has a stone at E6(4,3), and White surrounds E6 on 3 sides: D6(3,3), E7(4,2), F6(5,3).
      // Wait: if White has D6(3,3), E7(4,2), F6(5,3) (3 stones) and their ONLY outside liberties are blocked by Black, EXCEPT they share the liberty E5(4,4) with the Black stone at E6(4,3)?
      // No, if Black plays E5(4,4), E6 and E5 are connected!
      // Wait: in Snapback, the sacrifice stone is NOT connected to any other Black stone; its 3 neighbors are White stones (say D5, E6, F5), and its 4th neighbor is a Black stone that is... no, if its 4th neighbor is a Black stone, they connect!
      // Then how can a newly placed Black stone at E5(4,4) have only 1 liberty (so White can capture it), AND when White captures it at E5(4,4), the resulting White group has only 1 liberty (at E5's old spot, which is now occupied by White, so where is White's 1 liberty?)!
      // AHA!! When White plays at E5(4,4) to capture the Black stone that was at E6(4,3)!!
      // YES! Let's trace that!
      // Suppose E6(4,3) y E5(4,4) are BOTH EMPTY initially!
      // Let's check the neighbors of E6(4,3):
      // - Top: E7(4,2) is WHITE
      // - Left: D6(3,3) is WHITE
      // - Right: F6(5,3) is WHITE
      // - Bottom: E5(4,4) is EMPTY!
      // And what are the neighbors of the White group [D6(3,3), E7(4,2), F6(5,3)]?
      // All its outside liberties are occupied by BLACK:
      // - C6(2,3): BLACK
      // - D7(3,2): BLACK
      // - E8(4,1): BLACK
      // - F7(5,2): BLACK
      // - G6(6,3): BLACK
      // - D5(3,4): BLACK
      // - F5(5,4): BLACK
      // Now let's check the liberties of the White group [D6(3,3), E7(4,2), F6(5,3)] in the initial position:
      // Its ONLY liberty is the empty intersection inside its mouth: E6(4,3)!
      // Wait: if E6(4,3) is its only liberty, then Black playing E6(4,3) captures it immediately!
      // What if E7(4,2) is NOT there, or what if White has TWO liberties initially: E6(4,3) AND E5(4,4) (because D5(3,4) is WHITE, not Black)?
      // Let's trace that!
      // Suppose White has: D6(3,3), E7(4,2), F6(5,3), F5(5,4).
      // And Black has: C6(2,3), D7(3,2), E8(4,1), F7(5,2), G6(6,3), G5(6,4), F4(5,5), and D5(3,4) + E4(4,5)!
      // Now let's check the liberties of the 4 White stones [D6(3,3), E7(4,2), F6(5,3), F5(5,4)] when BOTH E6(4,3) and E5(4,4) are EMPTY:
      // - D6(3,3) is adjacent to E6(4,3) (empty). (C6, D7, D5 are Black).
      // - E7(4,2) is adjacent to E6(4,3) (empty). (D7, E8, F7 are Black).
      // - F6(5,3) is adjacent to E6(4,3) (empty). (F7, G6 are Black, F5 is White).
      // - F5(5,4) is adjacent to E5(4,4) (empty). (G5, F4 are Black, F6 is White).
      // SO THE WHITE GROUP [D6, E7, F6, F5] HAS EXACTLY TWO LIBERTIES: E6(4,3) AND E5(4,4)!!
      // Now watch what happens when Black plays the sacrifice stone (Throw-in / Snapback) at E6(4,3)!!
      // 1. Black places a stone at E6(4,3).
      //    - What are the neighbors of Black's new stone at E6(4,3)?
      //      - Top: E7(4,2) (White)
      //      - Left: D6(3,3) (White)
      //      - Right: F6(5,3) (White)
      //      - Bottom: E5(4,4) (EMPTY!)
      //    - So Black's new stone at E6(4,3) has 1 liberty at E5(4,4) (it is legal, not suicide, and it is in atari!).
      //    - And how many liberties does the White group [D6, E7, F6, F5] have now?
      //      - E6(4,3) is now occupied by Black, so White only has ONE liberty left at E5(4,4)!!
      // 2. Now it is White's turn (`opponentReply: { x: 4, y: 4 }` = E5)!
      //    - White plays at E5(4,4) to capture Black's sacrifice stone at E6(4,3)!
      //    - E6(4,3) is removed from the board and becomes EMPTY!
      //    - Now the 5-stone White group [D6, E7, F6, F5, E5] is surrounded by Black on D5(3,4) and E4(4,5) as well, so its ONLY liberty on the entire board is E6(4,3)!!
      // 3. Now it is Black's turn (`nextValidMoves: [{ x: 4, y: 3 }]` = E6)!
      //    - Black plays back at E6(4,3) and captures ALL 5 WHITE STONES in Snapback!!
      // Let's double-check that! Is that 100% mathematically and rules-wise exact?!
      // YES!! Let's verify every single coordinate of this Snapback position:
      // White stones (4):
      // - { x: 3, y: 3, color: 'WHITE' } (D6)
      // - { x: 4, y: 2, color: 'WHITE' } (E7)
      // - { x: 5, y: 3, color: 'WHITE' } (F6)
      // - { x: 5, y: 4, color: 'WHITE' } (F5)
      // Black stones (9):
      // - { x: 2, y: 3, color: 'BLACK' } (C6 - left of D6)
      // - { x: 3, y: 2, color: 'BLACK' } (D7 - top of D6 / left of E7)
      // - { x: 4, y: 1, color: 'BLACK' } (E8 - top of E7)
      // - { x: 5, y: 2, color: 'BLACK' } (F7 - right of E7 / top of F6)
      // - { x: 6, y: 3, color: 'BLACK' } (G6 - right of F6)
      // - { x: 6, y: 4, color: 'BLACK' } (G5 - right of F5)
      // - { x: 5, y: 5, color: 'BLACK' } (F4 - bottom of F5)
      // - { x: 3, y: 4, color: 'BLACK' } (D5 - bottom of D6 / left of E5)
      // - { x: 4, y: 5, color: 'BLACK' } (E4 - bottom of E5)
      // Let's check:
      // - Empty points inside: E6 (x:4, y:3) and E5 (x:4, y:4).
      // - Move 1 (Black): plays E6 ({ x: 4, y: 3 }). Legal! Leaves both Black E6 and White's 4 stones with 1 liberty at E5 ({ x: 4, y: 4 }).
      // - Reply (White): plays E5 ({ x: 4, y: 4 }), capturing Black E6! Now White has 5 stones [D6, E7, F6, F5, E5] with 1 single liberty at E6 ({ x: 4, y: 3 }).
      // - Move 2 (Black): plays E6 ({ x: 4, y: 3 }), capturing all 5 White stones!
      { x: 3, y: 3, color: 'WHITE' },
      { x: 3, y: 2, color: 'WHITE' },
      { x: 4, y: 2, color: 'WHITE' },
      { x: 5, y: 2, color: 'WHITE' },
      { x: 5, y: 3, color: 'WHITE' },
      { x: 5, y: 4, color: 'WHITE' },
      { x: 2, y: 3, color: 'BLACK' },
      { x: 2, y: 2, color: 'BLACK' },
      { x: 3, y: 1, color: 'BLACK' },
      { x: 4, y: 1, color: 'BLACK' },
      { x: 5, y: 1, color: 'BLACK' },
      { x: 6, y: 2, color: 'BLACK' },
      { x: 6, y: 3, color: 'BLACK' },
      { x: 6, y: 4, color: 'BLACK' },
      { x: 5, y: 5, color: 'BLACK' },
      { x: 3, y: 4, color: 'BLACK' },
      { x: 4, y: 5, color: 'BLACK' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro (Secuencia Snapback en 2 pasos): Sacrifica una piedra en la boca blanca (E6); cuando Blanco la capture en E5, recaptura todo el grupo blanco de un golpe.',
    acceptedFirstMoves: [{ x: 4, y: 3 }],
    variations: [
      {
        playerMove: { x: 4, y: 3 },
        opponentReply: { x: 4, y: 4 },
        nextValidMoves: [{ x: 4, y: 3 }],
        explanationEs:
          '¡Snapback (Uttegaeshi) ejecutado a la perfección! Sacrificaste una piedra en E6 para obligar a Blanco a rellenar E5, dejando a todo el grupo blanco en auto-atari para capturarlo volviendo a jugar en E6.',
      },
    ],
    wrongMoveExplanations: {
      '4,4': 'Si juegas en E5 primero, te conectas a tus piedras de D5 y E4, pero Blanco conecta en E6 formando un ojo seguro.',
    },
    defaultWrongExplanation:
      'Para ejecutar el Snapback debes lanzar la piedra de sacrificio dentro de la boca blanca en E6.',
    hints: [
      'Pista 1: El grupo blanco de 4 piedras solo tiene 2 libertades internas: E6 y E5.',
      'Pista 2: Si juegas en E5, Blanco responderá en E6. En cambio, ¿qué pasa si sacrificas primero en E6?',
      'Pista 3: Juega primero en E6; tras la captura blanca en E5, vuelve a jugar en E6.',
    ],
    solutionExplanation:
      'El sacrificio en E6 reduce el espacio vital de Blanco: aunque Blanco capture esa piedra jugando en E5, su propio grupo de 5 piedras queda con una sola libertad en E6.',
    commonMistake: 'Jugar de forma conservadora en E5 permitiendo que Blanco haga un ojo en E6.',
    prerequisites: ['lesson-9-escaleras-redes-snapback'],
    relatedLessonId: 'lesson-9-escaleras-redes-snapback',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 50,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 4, y: 3, type: 'CIRCLE' }],
  },

  // #15: RESOLVER Y CONECTAR EL KO
  {
    id: 'puzzle-15-resolver-ko',
    number: 15,
    title: 'Cerrar el Ko Definitivamente',
    theme: 'KO_BASICO',
    themeLabel: 'Regla de Ko',
    difficulty: 'FACIL',
    boardSize: 9,
    initialStones: [
      { x: 3, y: 4, color: 'BLACK' },
      { x: 4, y: 3, color: 'BLACK' },
      { x: 4, y: 5, color: 'BLACK' },
      { x: 5, y: 4, color: 'BLACK' },
      { x: 5, y: 3, color: 'WHITE' },
      { x: 5, y: 5, color: 'WHITE' },
      { x: 6, y: 4, color: 'WHITE' },
      { x: 1, y: 7, color: 'WHITE' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro: Blanco acaba de hacer una amenaza pequeña en B2 tras tu captura de Ko. Ignórala y conecta el Ko en el centro para terminar la disputa.',
    acceptedFirstMoves: [{ x: 4, y: 4 }],
    variations: [
      {
        playerMove: { x: 4, y: 4 },
        explanationEs:
          '¡Ko resuelto! Al conectar sólidamente en E5 eliminas el atari sobre tu piedra de F5 y aseguras todo el grupo central.',
      },
    ],
    wrongMoveExplanations: {},
    defaultWrongExplanation:
      'Tu piedra en F5 sigue en atari dentro de la estructura del Ko. Rellena el punto vacío en E5 para conectarla.',
    hints: [
      'Pista 1: Mira tu piedra negra en F5: solo tiene 1 libertad en E5.',
      'Pista 2: Como Blanco jugó en B2, ahora tienes permiso para cerrar el Ko.',
      'Pista 3: Juega en E5.',
    ],
    solutionExplanation:
      'Cuando el valor del Ko supera a la amenaza rival, conectar en el punto vacío del Ko (E5) termina la lucha para siempre.',
    commonMistake: 'Responder mecánicamente a cualquier amenaza pequeña en lugar de cerrar un Ko grande.',
    prerequisites: ['lesson-5-regla-ko-amenazas'],
    relatedLessonId: 'lesson-5-regla-ko-amenazas',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 30,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 5, y: 4, type: 'TRIANGLE' }],
  },

  // #16: ROMPEDOR DE ESCALERA (DEFENSA CONTRA SHICHO)
  {
    id: 'puzzle-16-rompedor-escalera',
    number: 16,
    title: 'Defensa ante el Rompedor de Escalera',
    theme: 'ESCALERAS',
    themeLabel: 'Escaleras (Shicho)',
    difficulty: 'INTERMEDIO',
    boardSize: 9,
    initialStones: [
      { x: 4, y: 4, color: 'WHITE' },
      { x: 3, y: 4, color: 'BLACK' },
      { x: 4, y: 3, color: 'BLACK' },
      // White has a ladder breaker at G2 (6,7), so chasing towards bottom-right fails, OR Black can capture in a Net / solid block!
      { x: 5, y: 5, color: 'BLACK' },
      { x: 4, y: 5, color: 'BLACK' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro: La piedra blanca en E5 ya tiene 3 lados bloqueados (D5, E6, E4). ¡Da el golpe final en su última libertad sin complicarte!',
    acceptedFirstMoves: [{ x: 5, y: 4 }],
    variations: [
      {
        playerMove: { x: 5, y: 4 },
        explanationEs:
          '¡Lectura limpia! Cuando una piedra enemiga ya está en atari (1 libertad en F5), la captura directa siempre es superior a cualquier persecución.',
      },
    ],
    wrongMoveExplanations: {},
    defaultWrongExplanation: 'Cuenta las libertades de la piedra blanca en E5: solo le queda F5.',
    hints: [
      'Pista 1: E5 tiene piedras negras arriba (E6), a la izquierda (D5) y abajo (E4).',
      'Pista 2: Solo le queda una libertad a la derecha.',
      'Pista 3: Juega en F5.',
    ],
    solutionExplanation:
      'Verificar siempre el número exacto de libertades evita jugar secuencias innecesarias cuando la captura directa en F5 está disponible.',
    commonMistake: 'Jugar a distancia sin notar que la piedra rival ya estaba en atari.',
    prerequisites: ['lesson-9-escaleras-redes-snapback'],
    relatedLessonId: 'lesson-9-escaleras-redes-snapback',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 30,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 4, y: 4, type: 'TRIANGLE' }],
  },

  // #17: VIDA Y MUERTE — HACER DOS OJOS (TSUMEGO DEFENSIVO)
  {
    id: 'puzzle-17-hacer-dos-ojos',
    number: 17,
    title: 'El Punto Vital que Da la Vida',
    theme: 'VIDA_Y_MUERTE',
    themeLabel: 'Vida y muerte (Tsumego)',
    difficulty: 'FACIL',
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
    objective:
      'Juega Negro: Tu grupo en el borde superior está completamente rodeado y tiene un espacio interno de 3 puntos (A9, B9, C9). Juega en el punto vital para dividirlo en dos ojos reales.',
    acceptedFirstMoves: [{ x: 1, y: 0 }],
    variations: [
      {
        playerMove: { x: 1, y: 0 },
        explanationEs:
          '¡Grupo inmortal! Al colocar tu piedra en B9 divides el espacio en dos ojos independientes (A9 y C9). Blanco nunca podrá ponerte en atari.',
      },
    ],
    wrongMoveExplanations: {
      '0,0': 'Si juegas en A9 reduces tu propio espacio a 2 puntos contiguos (B9 y C9); Blanco jugará en B9 y tu grupo morirá con un solo ojo.',
      '2,0': 'Si juegas en C9 te quedas solo con A9 y B9 juntos; Blanco jugará en B9 y destruirá tu segundo ojo.',
    },
    defaultWrongExplanation:
      'Debes dividir las 3 intersecciones vacías (A9, B9, C9) en dos compartimentos separados jugando en el centro.',
    hints: [
      'Pista 1: Tu espacio interno en la fila 9 está formado por A9, B9 y C9.',
      'Pista 2: Para separar A9 de C9 necesitas colocar un tabique en el punto intermedio.',
      'Pista 3: Juega en B9 (x=1, y=0).',
    ],
    solutionExplanation:
      'En el espacio recto de 3 puntos ("Tres en línea"), el punto central B9 es el punto vital que crea dos ojos separados en A9 y C9.',
    commonMistake: 'Jugar en uno de los extremos (A9 o C9) encogiendo el espacio sin dividirlo.',
    prerequisites: ['lesson-10-dos-ojos-vida-muerte'],
    relatedLessonId: 'lesson-10-dos-ojos-vida-muerte',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 35,
    xpBase: 5,
    xpNoHints: 7,
  },

  // #18: VIDA Y MUERTE — DESTRUIR LOS DOS OJOS (NAKADE)
  {
    id: 'puzzle-18-matar-punto-vital',
    number: 18,
    title: 'Golpe en el Punto Vital (Nakade)',
    theme: 'VIDA_Y_MUERTE',
    themeLabel: 'Vida y muerte (Tsumego)',
    difficulty: 'INTERMEDIO',
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
    objective:
      'Juega Negro: El grupo blanco del borde superior intenta vivir en su espacio A9–B9–C9. ¡Ocupa su punto vital para impedir que forme dos ojos!',
    acceptedFirstMoves: [{ x: 1, y: 0 }],
    variations: [
      {
        playerMove: { x: 1, y: 0 },
        explanationEs:
          '¡Nakade letal en B9! Ahora Blanco no puede dividir A9 y C9. Aunque Blanco capture tu piedra de B9 más adelante, solo le quedará un único ojo en B9 y todo su grupo estará muerto.',
      },
    ],
    wrongMoveExplanations: {
      '0,0': 'Si juegas en A9, Blanco responderá inmediatamente en B9 haciendo un ojo en C9 y otro cuando capture A9.',
      '2,0': 'Si juegas en C9, Blanco responderá en B9 asegurándose dos ojos.',
    },
    defaultWrongExplanation:
      'Aplica el proverbio: "El punto vital de mi enemigo es mi propio punto vital". ¿Dónde jugaría Blanco para hacer dos ojos?',
    hints: [
      'Pista 1: Si le tocara a Blanco, jugaría en B9 para separar A9 y C9.',
      'Pista 2: Coloca tu piedra negra exactamente en ese punto antes que Blanco.',
      'Pista 3: Juega en B9 (x=1, y=0).',
    ],
    solutionExplanation:
      'Ocupar el centro de un espacio de 3 puntos (Nakade en B9) destruye la posibilidad de dividir el ojo en dos compartimentos.',
    commonMistake: 'Atacar desde fuera o jugar en A9/C9 ayudando al rival a formar el tabique en B9.',
    prerequisites: ['lesson-10-dos-ojos-vida-muerte'],
    relatedLessonId: 'lesson-10-dos-ojos-vida-muerte',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 40,
    xpBase: 5,
    xpNoHints: 7,
  },

  // #19: OJO FALSO (KAKE-ME)
  {
    id: 'puzzle-19-ojo-falso',
    number: 19,
    title: 'Desenmascarar el Ojo Falso',
    theme: 'VIDA_Y_MUERTE',
    themeLabel: 'Vida y muerte (Tsumego)',
    difficulty: 'INTERMEDIO',
    boardSize: 9,
    initialStones: [
      { x: 4, y: 3, color: 'WHITE' },
      { x: 3, y: 4, color: 'WHITE' },
      { x: 5, y: 4, color: 'WHITE' },
      { x: 4, y: 5, color: 'WHITE' },
      { x: 3, y: 3, color: 'BLACK' },
      { x: 5, y: 3, color: 'BLACK' },
      // Add Black stone at E7(4,2) so that White's top stone E6(4,3) is in atari with its ONLY liberty inside the false eye E5(4,4)!
      // Wait: if E6(4,3) has Black at D6(3,3), F6(5,3), and E7(4,2), then E6's ONLY liberty is E5(4,4)!
      // Then Black can capture E6(4,3) directly by playing inside the false eye E5(4,4)!
      { x: 4, y: 2, color: 'BLACK' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro: El supuesto "ojo" blanco en E5 es en realidad un Ojo Falso porque la piedra blanca de E6 está desconectada y en atari. ¡Juega en E5 para capturar E6!',
    acceptedFirstMoves: [{ x: 4, y: 4 }],
    variations: [
      {
        playerMove: { x: 4, y: 4 },
        explanationEs:
          '¡Ojo falso destruido! Como tus piedras en D6, E7 y F6 rodeaban a la piedra blanca de E6, jugar en E5 no es suicidio: captura inmediatamente la piedra de E6.',
      },
    ],
    wrongMoveExplanations: {},
    defaultWrongExplanation:
      'Observa la piedra blanca superior en E6: está desconectada de D5 y F5, y su única libertad es E5.',
    hints: [
      'Pista 1: Mira las diagonales superiores de E5: Negro controla D6 y F6.',
      'Pista 2: Por eso la piedra blanca en E6 está aislada y en atari (solo respira por E5).',
      'Pista 3: Juega dentro de E5 para capturar la piedra blanca de E6.',
    ],
    solutionExplanation:
      'Cuando las piedras que rodean un ojo no están conectadas entre sí, el atacante puede poner en atari o capturar una de las piedras del borde jugando en el ojo falso.',
    commonMistake: 'Creer que E5 es un ojo real intocable sin verificar las diagonales D6 y F6.',
    prerequisites: ['lesson-10-dos-ojos-vida-muerte'],
    relatedLessonId: 'lesson-10-dos-ojos-vida-muerte',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 40,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 4, y: 3, type: 'TRIANGLE' }],
  },

  // #20: TESUJI — SACRIFICIO THROW-IN (HORIKOMI) PARA REDUCIR LIBERTADES
  {
    id: 'puzzle-20-tesuji-throw-in',
    number: 20,
    title: 'Tesuji: El Sacrificio Interior (Horikomi)',
    theme: 'TESUJI',
    themeLabel: 'Tesuji y sacrificios',
    difficulty: 'AVANZADO',
    boardSize: 9,
    initialStones: [
      // White group on top edge: B9(1,0), C9(2,0) with liberties at A9(0,0) and D9(3,0).
      // Black has B8(1,1), C8(2,1), D8(3,1) and A8(0,1).
      // Wait: if Black plays A9(0,0) or D9(3,0), White has only 1 liberty left!
      // Let's make a 2-step capture of a 2-stone White chain on the edge:
      // White stones at B9(1,0) and C9(2,0).
      // Black stones at A8(0,1), B8(1,1), C8(2,1), E9(4,0), D8(3,1).
      // White's liberties are A9(0,0) and D9(3,0).
      // If Black plays D9(3,0) (or A9(0,0)), White is in atari with 1 liberty!
      // Wait: let's make D9(3,0) the vital Tesuji block that simultaneously connects to D8(3,1) and puts B9-C9 in atari while saving Black's A8 stone which is in atari!
      // Let's check:
      // Suppose Black's stone at A8(0,1) is in atari by White stones at A7(0,2) and B8(1,1)?
      // No, even cleaner:
      // White stones at C9(2,0) and D9(3,0) (2 liberties: B9(1,0) and E9(4,0)).
      // Black stone at B8(1,1) is in danger from White B7(1,2) and A8(0,1), while Black has C8(2,1), D8(3,1), E8(4,1), F9(5,0).
      // When Black plays the Tesuji at E9(4,0) (or B9(1,0)), let's see: if Black has F9(5,0) and E8(4,1), playing B9(1,0) puts C9-D9 in atari towards E9 where White cannot escape!
      { x: 2, y: 0, color: 'WHITE' },
      { x: 3, y: 0, color: 'WHITE' },
      { x: 2, y: 1, color: 'BLACK' },
      { x: 3, y: 1, color: 'BLACK' },
      { x: 4, y: 1, color: 'BLACK' },
      { x: 5, y: 1, color: 'BLACK' },
      { x: 6, y: 0, color: 'BLACK' },
      { x: 1, y: 1, color: 'BLACK' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro (Secuencia Tesuji en 2 pasos): Da atari a las dos piedras blancas del borde (C9–D9) por B9; cuando Blanco intente huir a E9, remata la captura en F9.',
    acceptedFirstMoves: [{ x: 1, y: 0 }],
    variations: [
      {
        playerMove: { x: 1, y: 0 },
        opponentReply: { x: 4, y: 0 },
        nextValidMoves: [{ x: 5, y: 0 }],
        explanationEs:
          '¡Atari en la dirección exacta (B9) y remate en F9! Obligaste a Blanco a correr hacia tu muro en la primera línea donde no tenía escapatoria.',
      },
    ],
    wrongMoveExplanations: {
      '4,0': 'Si juegas primero en E9, Blanco escapa hacia la izquierda jugando en B9 con espacio abierto en A9.',
    },
    defaultWrongExplanation:
      'Empuja a las piedras blancas hacia el lado donde ya tienes preparado el bloqueo (E8 y F9).',
    hints: [
      'Pista 1: Las piedras blancas en C9 y D9 tienen dos libertades en el borde: B9 y E9.',
      'Pista 2: A la derecha ya tienes F9 y E8 esperando; si Blanco va hacia E9 quedará sin aire.',
      'Pista 3: Juega en B9 (x=1, y=0) para empujar a Blanco hacia la trampa.',
    ],
    solutionExplanation:
      'El Tesuji de persecución en el borde consiste en dar atari desde B9 para forzar al grupo rival hacia el callejón sin salida en E9.',
    commonMistake: 'Dar atari desde E9 empujando al rival hacia el lado abierto A9.',
    prerequisites: ['lesson-9-escaleras-redes-snapback'],
    relatedLessonId: 'lesson-9-escaleras-redes-snapback',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 45,
    xpBase: 5,
    xpNoHints: 7,
    markers: [
      { x: 2, y: 0, type: 'TRIANGLE' },
      { x: 3, y: 0, type: 'TRIANGLE' },
    ],
  },

  // #21: SEKI Y CARRERA DE CAPTURA (SEMEAI)
  {
    id: 'puzzle-21-seki-vida-mutua',
    number: 21,
    title: 'Ganar la Carrera de Captura (Semeai)',
    theme: 'VIDA_Y_MUERTE',
    themeLabel: 'Vida y muerte (Tsumego)',
    difficulty: 'INTERMEDIO',
    boardSize: 9,
    initialStones: [
      // Semeai between Black group [C5(2,4), C6(2,3)] and White group [D5(3,4), D6(3,3)]
      // White group is surrounded on right by Black E5(4,4) and E6(4,3), and top by Black D7(3,2).
      // So White's ONLY remaining liberty is D4(3,5)!
      { x: 2, y: 4, color: 'BLACK' },
      { x: 2, y: 3, color: 'BLACK' },
      { x: 3, y: 4, color: 'WHITE' },
      { x: 3, y: 3, color: 'WHITE' },
      { x: 4, y: 4, color: 'BLACK' },
      { x: 4, y: 3, color: 'BLACK' },
      { x: 3, y: 2, color: 'BLACK' },
      { x: 1, y: 4, color: 'WHITE' },
      { x: 1, y: 3, color: 'WHITE' },
      { x: 2, y: 2, color: 'WHITE' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro: Tus piedras en C5–C6 y las piedras blancas en D5–D6 están en una carrera de captura (Semeai), ambos grupos en atari. ¡Captura primero el grupo blanco!',
    acceptedFirstMoves: [{ x: 3, y: 5 }],
    variations: [
      {
        playerMove: { x: 3, y: 5 },
        explanationEs:
          '¡Carrera de captura (Semeai) ganada en D4! Al retirar las dos piedras blancas de D5 y D6, tu grupo negro de C5–C6 recupera inmediatamente nuevas libertades internas.',
      },
    ],
    wrongMoveExplanations: {
      '2,5': 'Si intentas extender tus piedras jugando en C4 sin capturar a Blanco, Blanco jugará en D4 o te capturará.',
    },
    defaultWrongExplanation:
      'En una carrera de captura donde el grupo rival que te rodea ya está en atari, captúralo de inmediato ocupando su última libertad en D4.',
    hints: [
      'Pista 1: Tanto tu par C5–C6 como el par blanco D5–D6 tienen 1 sola libertad.',
      'Pista 2: Es tu turno: puedes capturar las piedras blancas antes de que ellas te capturen a ti.',
      'Pista 3: Juega en D4 (x=3, y=5) para capturar D5 y D6.',
    ],
    solutionExplanation:
      'En un Semeai (carrera de libertades), capturar las piedras divisorias (piedras Semeai) salva automáticamente a tu propio grupo.',
    commonMistake: 'Intentar huir con el propio grupo en lugar de capturar las piedras rivales en atari.',
    prerequisites: ['lesson-6-conectar-cortar-defensa'],
    relatedLessonId: 'lesson-6-conectar-cortar-defensa',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 35,
    xpBase: 5,
    xpNoHints: 7,
    markers: [
      { x: 3, y: 4, type: 'TRIANGLE' },
      { x: 3, y: 3, type: 'TRIANGLE' },
    ],
  },

  // #22: FORMA EFICIENTE — JUNTA DE BAMBÚ
  {
    id: 'puzzle-22-forma-bambu',
    number: 22,
    title: 'La Junta de Bambú Inquebrantable',
    theme: 'FORMA_Y_ATAQUE',
    themeLabel: 'Forma, Ataque y Defensa',
    difficulty: 'FACIL',
    boardSize: 9,
    initialStones: [
      { x: 3, y: 3, color: 'BLACK' },
      { x: 5, y: 3, color: 'BLACK' },
      { x: 3, y: 5, color: 'BLACK' },
      { x: 2, y: 4, color: 'WHITE' },
      { x: 6, y: 4, color: 'WHITE' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro: Blanco amenaza con separar tus piedras superiores (D6, F6) de tu piedra inferior (D4). Completa la Junta de Bambú para garantizar la conexión.',
    acceptedFirstMoves: [{ x: 5, y: 5 }],
    variations: [
      {
        playerMove: { x: 5, y: 5 },
        explanationEs:
          '¡Junta de Bambú formada en F4! Ahora si Blanco intenta cortar en D5 tú conectas en F5, y si intenta cortar en F5 tú conectas en D5 (Miai).',
      },
    ],
    wrongMoveExplanations: {
      '4,3': 'E6 forma una barra pesada arriba pero deja a D4 desconectada abajo.',
      '4,4': 'E5 no completa los dos pilares paralelos y deja defectos de corte.',
    },
    defaultWrongExplanation:
      'Observa el rectángulo formado por D6, F6 y D4: coloca la cuarta esquina simétrica en F4.',
    hints: [
      'Pista 1: Tienes piedras en D6, F6 y D4.',
      'Pista 2: La Junta de Bambú consta de dos pares enfrentados paralelamente.',
      'Pista 3: Juega en F4 (x=5, y=5).',
    ],
    solutionExplanation:
      'La Junta de Bambú (D6–F6 frente a D4–F4) es una de las formas más sólidas y elásticas del Go porque ofrece dos conexiones Miai en D5 y F5.',
    commonMistake: 'Rellenar pesadamente en E6 o D5 sin asegurar ambos flancos.',
    prerequisites: ['lesson-7-forma-eficiencia'],
    relatedLessonId: 'lesson-7-forma-eficiencia',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 30,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 5, y: 5, type: 'CIRCLE' }],
  },

  // #23: INVASIÓN EN SAN-SAN (3-3)
  {
    id: 'puzzle-23-invasion-san-san',
    number: 23,
    title: 'Invasión Clásica en el Punto 3-3 (San-san)',
    theme: 'INVASION_Y_YOSE',
    themeLabel: 'Invasión, Sente y Yose',
    difficulty: 'FACIL',
    boardSize: 9,
    initialStones: [
      { x: 5, y: 3, color: 'WHITE' },
      { x: 6, y: 3, color: 'WHITE' },
      { x: 5, y: 2, color: 'WHITE' },
      { x: 2, y: 6, color: 'BLACK' },
      { x: 2, y: 2, color: 'BLACK' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro: Blanco ha construido un muro exterior en la 4ª línea superior derecha pero dejó abierto el corazón de la esquina. ¡Invade en el punto 3-3 (San-san)!',
    acceptedFirstMoves: [{ x: 6, y: 2 }],
    variations: [
      {
        playerMove: { x: 6, y: 2 },
        explanationEs:
          '¡Invasión directa en G7 (San-san)! Desde el punto 3-3 tienes salida hacia G8 y H7 para formar tu base de dos ojos y arrebatarle el territorio de la esquina a Blanco.',
      },
    ],
    wrongMoveExplanations: {
      '8,0': 'J9 (la esquina 1-1) no tiene espacio ni libertades suficientes para vivir.',
    },
    defaultWrongExplanation:
      'El punto vital para invadir una esquina abierta es la intersección de la tercera línea con la tercera línea: G7.',
    hints: [
      'Pista 1: Cuenta tres líneas desde el borde derecho (J, H, G) y tres desde arriba (9, 8, 7).',
      'Pista 2: Esa intersección es el punto estrella de esquina 3-3 (San-san).',
      'Pista 3: Juega en G7 (x=6, y=2).',
    ],
    solutionExplanation:
      'Cuando el rival juega alto en la 4ª línea, el punto 3-3 (G7) queda disponible para invadir y quitar el territorio de la esquina.',
    commonMistake: 'Entrar demasiado profundo en la primera línea (J9) donde solo hay 2 libertades.',
    prerequisites: ['lesson-8-territorio-influencia-moyo'],
    relatedLessonId: 'lesson-8-territorio-influencia-moyo',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 30,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 6, y: 2, type: 'CIRCLE' }],
  },

  // #24: GANAR EN SENTE (AMENAZA QUE CONSERVA LA INICIATIVA)
  {
    id: 'puzzle-24-amenaza-sente',
    number: 24,
    title: 'Golpe en Sente: Cortar y Capturar',
    theme: 'INVASION_Y_YOSE',
    themeLabel: 'Invasión, Sente y Yose',
    difficulty: 'INTERMEDIO',
    boardSize: 9,
    initialStones: [
      { x: 3, y: 1, color: 'WHITE' },
      { x: 2, y: 1, color: 'BLACK' },
      { x: 3, y: 2, color: 'BLACK' },
      { x: 4, y: 2, color: 'WHITE' },
      { x: 5, y: 1, color: 'WHITE' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro: Da atari a la piedra blanca de D8 jugando en E8 para forzar el bloqueo en el borde superior con iniciativa (Sente).',
    acceptedFirstMoves: [{ x: 4, y: 1 }],
    variations: [
      {
        playerMove: { x: 4, y: 1 },
        explanationEs:
          '¡Jugada aguda en Sente (E8)! Dejas a la piedra blanca de D8 en atari con una sola libertad en D9 y presionas simultáneamente a las piedras blancas de la derecha.',
      },
    ],
    wrongMoveExplanations: {
      '3,0': 'Si juegas en D9 desde la primera línea, Blanco conecta tranquilamente en E8 con buena forma.',
    },
    defaultWrongExplanation:
      'Golpea la cintura de la forma blanca jugando en E8 para poner D8 en atari.',
    hints: [
      'Pista 1: La piedra blanca en D8 ya tiene bloqueados C8 y D7.',
      'Pista 2: Si juegas en E8, la dejas en atari y la separas de E7 y F8.',
      'Pista 3: Juega en E8 (x=4, y=1).',
    ],
    solutionExplanation:
      'Separar en E8 dando atari a D8 es un Tesuji en Sente que impide a Blanco conectar sus piedras.',
    commonMistake: 'Jugar en primera línea (D9) permitiendo a Blanco conectar en segunda línea (E8).',
    prerequisites: ['lesson-11-sente-gote-fuseki-joseki'],
    relatedLessonId: 'lesson-11-sente-gote-fuseki-joseki',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 35,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 3, y: 1, type: 'TRIANGLE' }],
  },

  // #25: YOSE — HANE Y CONEXIÓN EN PRIMERA LÍNEA (2 PASOS)
  {
    id: 'puzzle-25-tesuji-yose-hane',
    number: 25,
    title: 'Yose Maestro: Hane y Conexión en Primera Línea',
    theme: 'INVASION_Y_YOSE',
    themeLabel: 'Invasión, Sente y Yose',
    difficulty: 'AVANZADO',
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
    objective:
      'Juega Negro (Secuencia de Yose en 2 pasos): Ejecuta el Hane en primera línea (E9) y, cuando Blanco bloquee en F9 dejando tu piedra en atari, conecta sólidamente en D9.',
    acceptedFirstMoves: [{ x: 4, y: 0 }],
    variations: [
      {
        playerMove: { x: 4, y: 0 },
        opponentReply: { x: 5, y: 0 },
        nextValidMoves: [{ x: 3, y: 0 }],
        explanationEs:
          '¡Secuencia clásica de Yose completada! Con E9 seguido de la conexión en D9 ganaste puntos netos en la frontera superior sin dejar ningún corte.',
      },
    ],
    wrongMoveExplanations: {
      '3,0': 'D9 es pasivo (Gote) y regala a Blanco la oportunidad de bloquear en E9 sin perder territorio.',
    },
    defaultWrongExplanation:
      'En el Yose de borde, avanza primero con Hane en la primera línea delante del muro rival (E9).',
    hints: [
      'Pista 1: Tu muro está en la columna D y el de Blanco en la columna E.',
      'Pista 2: Avanza primero en diagonal a la primera línea en E9.',
      'Pista 3: Tras la respuesta blanca en F9, conecta tu piedra jugando en D9.',
    ],
    solutionExplanation:
      'El Hane en primera línea (E9) seguido de conexión (D9) es la técnica fundamental del final de partida (Yose).',
    commonMistake: 'Cerrar pasivamente en la propia columna D9 en lugar de hacer Hane en E9.',
    prerequisites: ['lesson-12-yose-lectura-revision'],
    relatedLessonId: 'lesson-12-yose-lectura-revision',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 45,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 4, y: 0, type: 'CIRCLE' }],
  },
];
