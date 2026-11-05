import { createGameState, getAllGroups, validateAndPlayMove, coordKey } from '../engine/goEngine';
import { PuzzleContent } from '../types/go';
import { EXPANDED_PUZZLES_CATALOG } from './puzzlesExpansionData';
import { ATTACK_DEFENSE_PUZZLES_CATALOG } from './attackDefensePuzzlesData';
import { TESUJI_PUZZLES_CATALOG } from './tesujiPuzzlesData';
import { KAGEYAMA_PUZZLES_CATALOG } from './kageyamaPuzzlesData';

export const PUZZLES_CATALOG: PuzzleContent[] = [
  {
    id: 'puzzle-1-captura-centro',
    number: 1,
    title: 'El Último Aliento en el Centro',
    theme: 'CAPTURA_SIMPLE',
    themeLabel: 'Captura simple',
    difficulty: 'PRINCIPIANTE',
    boardSize: 9,
    initialStones: [
      { x: 4, y: 4, color: 'WHITE' },
      { x: 4, y: 3, color: 'BLACK' },
      { x: 3, y: 4, color: 'BLACK' },
      { x: 5, y: 4, color: 'BLACK' },
    ],
    turn: 'BLACK',
    objective: 'Juega Negro: ocupa la última libertad de la piedra blanca central para capturarla.',
    acceptedFirstMoves: [{ x: 4, y: 5 }],
    variations: [
      {
        playerMove: { x: 4, y: 5 },
        explanationEs:
          '¡Correcto! Al jugar en E4 ocupas la cuarta y última libertad de la piedra blanca en E5, capturándola inmediatamente.',
      },
    ],
    wrongMoveExplanations: {
      '3,3': 'D6 es una diagonal; las diagonales no quitan libertades a la piedra blanca de E5.',
      '5,3': 'F6 está en diagonal respecto a E5. Para capturar debes ocupar sus intersecciones ortogonales.',
      '3,5': 'D4 está en diagonal. La única libertad ortogonal libre de E5 está justo debajo, en E4.',
      '5,5': 'F4 está en diagonal y deja libre la salida de Blanco en E4.',
    },
    defaultWrongExplanation:
      'Esa jugada no ocupa la última libertad de la piedra blanca en E5. Si Blanco juega en E4 en el siguiente turno, escapará.',
    hints: [
      'Pista 1: Cuenta las libertades ortogonales (arriba, abajo, izquierda, derecha) de la piedra blanca en E5.',
      'Pista 2: Las intersecciones E6, D5 y F5 ya están ocupadas por piedras negras. Solo queda 1 libertad.',
      'Pista 3: Mira justo debajo de la piedra blanca, en la columna E y fila 4 (coordenada E4).',
    ],
    solutionExplanation:
      'La piedra blanca en E5 está en atari con una sola libertad en E4. Negro juega en E4 y retira la piedra blanca del tablero.',
    commonMistake: 'Jugar en las diagonales pensando que rodean a la piedra.',
    prerequisites: ['lesson-1-tablero-turnos', 'lesson-2-libertades-grupos'],
    relatedLessonId: 'lesson-3-atari-captura',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 30,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 4, y: 4, type: 'TRIANGLE' }],
  },
  {
    id: 'puzzle-2-captura-esquina',
    number: 2,
    title: 'Encierro en la Esquina',
    theme: 'CAPTURA_SIMPLE',
    themeLabel: 'Captura simple',
    difficulty: 'PRINCIPIANTE',
    boardSize: 9,
    initialStones: [
      { x: 0, y: 0, color: 'WHITE' },
      { x: 1, y: 0, color: 'BLACK' },
      { x: 2, y: 2, color: 'WHITE' },
    ],
    turn: 'BLACK',
    objective: 'Juega Negro: captura la piedra blanca situada en la esquina extrema A9.',
    acceptedFirstMoves: [{ x: 0, y: 1 }],
    variations: [
      {
        playerMove: { x: 0, y: 1 },
        explanationEs:
          '¡Exacto! En la esquina extrema una piedra solo tiene 2 libertades (B9 y A8). Como B9 ya estaba ocupada, jugar en A8 la captura.',
      },
    ],
    wrongMoveExplanations: {
      '1,1': 'B8 es la diagonal de la esquina A9; no le quita su libertad en el borde A8.',
    },
    defaultWrongExplanation:
      'Recuerda que los bordes del tablero son intersecciones válidas. La piedra blanca de A9 respira por el borde izquierdo.',
    hints: [
      'Pista 1: Observa la piedra blanca en la esquina superior izquierda (A9). ¿Cuántas líneas salen de ella?',
      'Pista 2: Una piedra en la esquina solo tiene 2 libertades: B9 (ya ocupada por Negro) y una más en el borde.',
      'Pista 3: Juega en la primera columna del borde izquierdo, justo debajo de A9 (coordenada A8).',
    ],
    solutionExplanation:
      'En las esquinas solo se necesitan 2 piedras para capturar. Con B9 ya colocada, Negro juega A8 y captura A9.',
    commonMistake: 'Olvidar que las líneas del borde exterior (columna A) son jugables.',
    prerequisites: ['lesson-1-tablero-turnos', 'lesson-2-libertades-grupos'],
    relatedLessonId: 'lesson-1-tablero-turnos',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 30,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 0, y: 0, type: 'TRIANGLE' }],
  },
  {
    id: 'puzzle-3-salvar-atari',
    number: 3,
    title: 'Escapar del Atari',
    theme: 'SALVAR_PIEDRA',
    themeLabel: 'Salvar una piedra',
    difficulty: 'PRINCIPIANTE',
    boardSize: 9,
    initialStones: [
      { x: 4, y: 4, color: 'BLACK' },
      { x: 4, y: 3, color: 'WHITE' },
      { x: 3, y: 4, color: 'WHITE' },
      { x: 4, y: 5, color: 'WHITE' },
    ],
    turn: 'BLACK',
    objective: 'Juega Negro: tu piedra en E5 está en atari. ¡Extiéndela para salvarla y ganar libertades!',
    acceptedFirstMoves: [{ x: 5, y: 4 }],
    variations: [
      {
        playerMove: { x: 5, y: 4 },
        explanationEs:
          '¡Salvada! Al extender a F5 conectas una segunda piedra negra y tu grupo pasa de tener 1 libertad a tener 3 libertades.',
      },
    ],
    wrongMoveExplanations: {
      '5,3': 'F6 está en diagonal con E5; como no se conecta por línea recta, tu piedra en E5 sigue en atari con 1 sola libertad en F5.',
      '5,5': 'F4 está en diagonal; Blanco jugaría en F5 en el siguiente turno y capturaría tu piedra de E5.',
    },
    defaultWrongExplanation:
      'Tu piedra en E5 sigue teniendo una sola libertad en F5. Debes conectarte directamente en esa última libertad para escapar.',
    hints: [
      'Pista 1: Mira tu piedra negra en E5. Tres de sus cuatro vecinos están ocupados por Blanco.',
      'Pista 2: Para salvar una piedra en atari debes colocar otra piedra en su única libertad para formar un grupo con aire nuevo.',
      'Pista 3: Juega justo a la derecha de E5, en la intersección F5.',
    ],
    solutionExplanation:
      'Aunque las piedras no se mueven, al jugar en F5 unes la piedra amenazada de E5 con una piedra nueva en espacio abierto, alcanzando 3 libertades.',
    commonMistake: 'Intentar escapar en diagonal (F6 o F4), lo que deja la libertad F5 abierta para que Blanco capture.',
    prerequisites: ['lesson-2-libertades-grupos', 'lesson-3-atari-captura'],
    relatedLessonId: 'lesson-2-libertades-grupos',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 35,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 4, y: 4, type: 'TRIANGLE' }],
  },
  {
    id: 'puzzle-4-capturar-cadena',
    number: 4,
    title: 'Caza en la Frontera',
    theme: 'CAPTURA_SIMPLE',
    themeLabel: 'Captura simple',
    difficulty: 'PRINCIPIANTE',
    boardSize: 9,
    initialStones: [
      { x: 3, y: 4, color: 'WHITE' },
      { x: 4, y: 4, color: 'WHITE' },
      { x: 4, y: 3, color: 'BLACK' },
      { x: 5, y: 4, color: 'BLACK' },
      { x: 4, y: 5, color: 'BLACK' },
      { x: 3, y: 5, color: 'BLACK' },
      { x: 2, y: 4, color: 'BLACK' },
      { x: 2, y: 3, color: 'WHITE' },
      { x: 3, y: 2, color: 'WHITE' },
    ],
    turn: 'BLACK',
    objective: 'Juega Negro: captura el par de piedras blancas centrales (D5-E5) antes de que conecten con sus aliadas de arriba.',
    acceptedFirstMoves: [{ x: 3, y: 3 }],
    variations: [
      {
        playerMove: { x: 3, y: 3 },
        explanationEs:
          '¡Excelente captura! D6 era la última libertad compartida por las dos piedras blancas D5 y E5. Al ocuparla, capturas ambas.',
      },
    ],
    wrongMoveExplanations: {
      '5,3': 'Si juegas en F6, Blanco jugará en D6 y conectará todas sus piedras en un gran grupo seguro.',
    },
    defaultWrongExplanation:
      'Las dos piedras blancas en D5 y E5 forman un grupo al que le queda una sola libertad. Búscala y ocúpala.',
    hints: [
      'Pista 1: Las piedras blancas en D5 y E5 están conectadas. Cuenta cuántas libertades tiene ese par.',
      'Pista 2: Están rodeadas por C5, D4, E4, F5 y E6. Solo les queda un punto vacío adyacente.',
      'Pista 3: Juega encima de D5, en la intersección D6, para capturar las dos piedras blancas.',
    ],
    solutionExplanation:
      'Un grupo conectado vive o muere junto. Como a D5-E5 solo le quedaba la libertad en D6, Negro juega D6 y captura las dos piedras a la vez.',
    commonMistake: 'Temer a las piedras blancas de C6 y D7 sin notar que D5-E5 ya está en atari.',
    prerequisites: ['lesson-3-atari-captura'],
    relatedLessonId: 'lesson-3-atari-captura',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 40,
    xpBase: 5,
    xpNoHints: 7,
    markers: [
      { x: 3, y: 4, type: 'TRIANGLE' },
      { x: 4, y: 4, type: 'TRIANGLE' },
    ],
  },
  {
    id: 'puzzle-5-conectar-corte',
    number: 5,
    title: 'El Puente Sólido',
    theme: 'CONECTAR_Y_CORTAR',
    themeLabel: 'Conectar y cortar',
    difficulty: 'FACIL',
    boardSize: 9,
    initialStones: [
      { x: 3, y: 3, color: 'BLACK' },
      { x: 3, y: 4, color: 'BLACK' },
      { x: 4, y: 5, color: 'BLACK' },
      { x: 5, y: 5, color: 'BLACK' },
      { x: 4, y: 3, color: 'WHITE' },
      { x: 3, y: 5, color: 'WHITE' },
      { x: 2, y: 5, color: 'WHITE' },
    ],
    turn: 'BLACK',
    objective: 'Juega Negro: Blanco amenaza con cortar tus dos grupos negros en D5 y E4. ¡Conéctalos antes de que te separen!',
    acceptedFirstMoves: [{ x: 4, y: 4 }],
    variations: [
      {
        playerMove: { x: 4, y: 4 },
        explanationEs:
          '¡Conexión impecable! Jugando en E5 unes tus dos grupos en una cadena sólida de 5 piedras y dejas a las piedras blancas divididas.',
      },
    ],
    wrongMoveExplanations: {
      '2,4': 'Si juegas en C5, Blanco cortará inmediatamente en E5 y pondrá en grave peligro a tus piedras superiores.',
      '5,4': 'F5 acerca tus piedras pero deja el punto de corte E5 abierto para que Blanco te divida en dos.',
    },
    defaultWrongExplanation:
      'Observa el punto donde tus piedras D5 y E4 están en diagonal y Blanco tiene una piedra lista para cortar.',
    hints: [
      'Pista 1: Tus piedras en D6-D5 y E4-F4 están separadas por una diagonal.',
      'Pista 2: Blanco ya ocupó D4 y amenaza con jugar en el otro punto de cruce para cortarte.',
      'Pista 3: Coloca tu piedra negra en E5 para conectar sólidamente ambos grupos.',
    ],
    solutionExplanation:
      'Cuando el rival ocupa uno de los dos puntos que flanquean una diagonal (D4), debes responder conectando en el otro (E5) para mantener tus grupos unidos.',
    commonMistake: 'Ignorar la amenaza de corte (peep / nozoki) y permitir que el rival divida tus grupos.',
    prerequisites: ['lesson-2-libertades-grupos'],
    relatedLessonId: 'lesson-2-libertades-grupos',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 45,
    xpBase: 5,
    xpNoHints: 7,
  },
  {
    id: 'puzzle-6-doble-atari',
    number: 6,
    title: 'El Golpe Gemelo (Doble Atari)',
    theme: 'LIBERTADES',
    themeLabel: 'Libertades y Atari',
    difficulty: 'FACIL',
    boardSize: 9,
    initialStones: [
      { x: 3, y: 3, color: 'WHITE' },
      { x: 4, y: 4, color: 'WHITE' },
      { x: 3, y: 2, color: 'BLACK' },
      { x: 2, y: 3, color: 'BLACK' },
      { x: 5, y: 4, color: 'BLACK' },
      { x: 4, y: 5, color: 'BLACK' },
    ],
    turn: 'BLACK',
    objective: 'Juega Negro: encuentra el punto vital que pone a las DOS piedras blancas en atari simultáneamente.',
    acceptedFirstMoves: [{ x: 3, y: 4 }, { x: 4, y: 3 }],
    variations: [
      {
        playerMove: { x: 3, y: 4 },
        opponentReply: { x: 4, y: 3 },
        explanationEs:
          '¡Doble Atari en D5! Tanto la piedra blanca de D6 como la de E5 quedaron con 1 sola libertad. Aunque Blanco salve una, capturas la otra.',
      },
      {
        playerMove: { x: 4, y: 3 },
        opponentReply: { x: 3, y: 4 },
        explanationEs:
          '¡Doble Atari en E6! Tanto D6 como E5 quedaron con 1 sola libertad, garantizando la captura de una de las dos piedras blancas.',
      },
    ],
    wrongMoveExplanations: {},
    defaultWrongExplanation:
      'Busca una intersección vacía que toque ortogonalmente tanto a la piedra blanca de D6 como a la de E5.',
    hints: [
      'Pista 1: Cada una de las dos piedras blancas (D6 y E5) tiene actualmente solo 2 libertades.',
      'Pista 2: Las dos piedras blancas comparten exactamente dos intersecciones vacías vecinas.',
      'Pista 3: Juega en D5 o en E6 para quitar una libertad a ambas piedras blancas al mismo tiempo.',
    ],
    solutionExplanation:
      'El Doble Atari ataca dos grupos con 2 libertades a la vez. Como el rival solo puede jugar una piedra en su turno, no puede salvar ambos.',
    commonMistake: 'Atacar desde afuera en lugar de golpear el punto de corte interno que comparten ambas piedras.',
    prerequisites: ['lesson-3-atari-captura'],
    relatedLessonId: 'lesson-2-libertades-grupos',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 45,
    xpBase: 5,
    xpNoHints: 7,
  },
  {
    id: 'puzzle-7-boca-tigre',
    number: 7,
    title: 'La Boca del Tigre',
    theme: 'CONECTAR_Y_CORTAR',
    themeLabel: 'Conectar y cortar',
    difficulty: 'FACIL',
    boardSize: 9,
    initialStones: [
      { x: 3, y: 3, color: 'BLACK' },
      { x: 4, y: 4, color: 'BLACK' },
      { x: 3, y: 5, color: 'BLACK' },
      { x: 2, y: 3, color: 'WHITE' },
      { x: 2, y: 5, color: 'WHITE' },
      { x: 2, y: 4, color: 'WHITE' },
    ],
    turn: 'BLACK',
    objective: 'Juega Negro: Blanco amenaza dos puntos de corte en D5. Defiende ambos cortes a la vez formando una "Boca de Tigre".',
    acceptedFirstMoves: [{ x: 3, y: 4 }],
    variations: [
      {
        playerMove: { x: 3, y: 4 },
        explanationEs:
          '¡Excelente! Al conectar en D5 unes las tres piedras negras en un solo grupo sólido e impides cualquier corte blanco.',
      },
    ],
    wrongMoveExplanations: {
      '4,3': 'Si solo conectas arriba en E6, Blanco cortará abajo y separará tu piedra de D4.',
      '4,5': 'Si solo conectas abajo en E4, Blanco cortará arriba y separará tu piedra de D6.',
    },
    defaultWrongExplanation:
      'Si solo defiendes un lado, Blanco cortará por el otro. Busca la jugada central que une las tres piedras negras.',
    hints: [
      'Pista 1: Observa la forma en "V" de tus tres piedras negras (D6, E5 y D4).',
      'Pista 2: Necesitas una jugada que toque simultáneamente a las tres piedras negras.',
      'Pista 3: Juega en D5 para unir D6, E5 y D4 de un solo golpe.',
    ],
    solutionExplanation:
      'Al colocar la piedra en D5, las tres piedras negras que estaban en diagonal quedan unidas ortogonalmente en una sola cadena fuerte.',
    commonMistake: 'Conectar por fuera (E6 o E4) dejando vivo uno de los dos cortes.',
    prerequisites: ['lesson-2-libertades-grupos'],
    relatedLessonId: 'lesson-2-libertades-grupos',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 45,
    xpBase: 5,
    xpNoHints: 7,
  },
  {
    id: 'puzzle-8-evitar-suicidio',
    number: 8,
    title: 'Paciencia Antes del Golpe (Evitar Suicidio)',
    theme: 'EVITAR_SUICIDIO',
    themeLabel: 'Evitar suicidio',
    difficulty: 'FACIL',
    boardSize: 9,
    initialStones: [
      { x: 3, y: 3, color: 'WHITE' },
      { x: 5, y: 3, color: 'WHITE' },
      { x: 4, y: 2, color: 'WHITE' },
      { x: 3, y: 4, color: 'WHITE' },
      { x: 5, y: 4, color: 'WHITE' },
      { x: 4, y: 4, color: 'WHITE' },
      { x: 2, y: 3, color: 'BLACK' },
      { x: 2, y: 4, color: 'BLACK' },
      { x: 3, y: 2, color: 'BLACK' },
      { x: 4, y: 1, color: 'BLACK' },
      { x: 5, y: 2, color: 'BLACK' },
      { x: 6, y: 3, color: 'BLACK' },
      { x: 6, y: 4, color: 'BLACK' },
      { x: 3, y: 5, color: 'BLACK' },
      { x: 5, y: 5, color: 'BLACK' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro: No puedes jugar todavía dentro del ojo blanco en E6 (sería suicidio). Pon primero en atari al grupo blanco jugando en su última libertad exterior.',
    acceptedFirstMoves: [{ x: 4, y: 5 }],
    variations: [
      {
        playerMove: { x: 4, y: 5 },
        explanationEs:
          '¡Exacto! Primero debes cerrar la libertad exterior en E4. Ahora todo el grupo blanco queda en atari con una sola libertad en E6, lista para ser capturada en la siguiente jugada.',
      },
    ],
    wrongMoveExplanations: {
      '4,3': '¡Cuidado! Jugar directamente en E6 ahora mismo es ilegal por suicidio, porque al grupo blanco todavía le queda la libertad exterior E4.',
    },
    defaultWrongExplanation:
      'Para capturar al grupo blanco, primero debes quitarle su última libertad exterior para dejarlo en atari.',
    hints: [
      'Pista 1: Cuenta cuántas libertades tiene el grupo blanco de 6 piedras: tiene una adentro (E6) y una afuera.',
      'Pista 2: Si intentas jugar en E6 ahora, tu piedra no captura nada y tendría 0 libertades (suicidio ilegal).',
      'Pista 3: Juega primero afuera en E4 para dejar al grupo blanco con una sola libertad.',
    ],
    solutionExplanation:
      'Un grupo con un solo ojo tiene dos libertades mientras le quede una libertad exterior. Primero se bloquea la libertad exterior (E4) para ponerlo en atari, y en el turno siguiente ya es legal capturar dentro del ojo (E6).',
    commonMistake: 'Intentar jugar dentro del ojo enemigo antes de haber bloqueado todas sus libertades exteriores.',
    prerequisites: ['lesson-3-atari-captura'],
    relatedLessonId: 'lesson-3-atari-captura',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 50,
    xpBase: 5,
    xpNoHints: 7,
  },
  {
    id: 'puzzle-9-captura-ojo',
    number: 9,
    title: 'Captura Dentro del Ojo (Suicidio Aparente)',
    theme: 'EVITAR_SUICIDIO',
    themeLabel: 'Evitar suicidio',
    difficulty: 'INTERMEDIO',
    boardSize: 9,
    initialStones: [
      { x: 3, y: 3, color: 'WHITE' },
      { x: 5, y: 3, color: 'WHITE' },
      { x: 4, y: 2, color: 'WHITE' },
      { x: 3, y: 4, color: 'WHITE' },
      { x: 5, y: 4, color: 'WHITE' },
      { x: 4, y: 4, color: 'WHITE' },
      { x: 2, y: 3, color: 'BLACK' },
      { x: 2, y: 4, color: 'BLACK' },
      { x: 3, y: 2, color: 'BLACK' },
      { x: 4, y: 1, color: 'BLACK' },
      { x: 5, y: 2, color: 'BLACK' },
      { x: 6, y: 3, color: 'BLACK' },
      { x: 6, y: 4, color: 'BLACK' },
      { x: 3, y: 5, color: 'BLACK' },
      { x: 4, y: 5, color: 'BLACK' },
      { x: 5, y: 5, color: 'BLACK' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro: Todas las libertades exteriores del grupo blanco están bloqueadas. ¡Juega dentro de su único ojo para capturar las 6 piedras blancas!',
    acceptedFirstMoves: [{ x: 4, y: 3 }],
    variations: [
      {
        playerMove: { x: 4, y: 3 },
        explanationEs:
          '¡Captura total! Aunque E6 estaba rodeada por piedras blancas, era la última libertad de todo el grupo blanco. Al jugar allí, las 6 piedras blancas se retiran y tu piedra gana 4 libertades.',
      },
    ],
    wrongMoveExplanations: {},
    defaultWrongExplanation:
      'Al grupo blanco de 6 piedras solo le queda una libertad en su interior (E6). Juega allí para capturarlo.',
    hints: [
      'Pista 1: Comprueba que al grupo blanco no le queda ninguna libertad por fuera.',
      'Pista 2:Su única libertad es el punto central E6. Está en atari.',
      'Pista 3: Coloca tu piedra negra en E6 para capturar las 6 piedras blancas.',
    ],
    solutionExplanation:
      'No es suicidio cuando tu jugada deja al grupo rival con 0 libertades: el motor retira primero las 6 piedras blancas capturadas y tu piedra en E6 queda completamente libre.',
    commonMistake: 'Creer que nunca se puede jugar dentro de un espacio rodeado por el rival, incluso cuando el rival está en atari.',
    prerequisites: ['lesson-3-atari-captura'],
    relatedLessonId: 'lesson-3-atari-captura',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 40,
    xpBase: 5,
    xpNoHints: 7,
  },
  {
    id: 'puzzle-10-iniciar-ko',
    number: 10,
    title: 'El Despertar del Ko',
    theme: 'KO_BASICO',
    themeLabel: 'Regla de Ko',
    difficulty: 'INTERMEDIO',
    boardSize: 9,
    initialStones: [
      { x: 4, y: 4, color: 'WHITE' },
      { x: 3, y: 4, color: 'BLACK' },
      { x: 4, y: 3, color: 'BLACK' },
      { x: 4, y: 5, color: 'BLACK' },
      { x: 5, y: 3, color: 'WHITE' },
      { x: 5, y: 5, color: 'WHITE' },
      { x: 6, y: 4, color: 'WHITE' },
    ],
    turn: 'BLACK',
    objective:
      'Juega Negro: captura la piedra blanca en E5 para iniciar un Ko. Blanco no podrá recapturarte de inmediato por la regla de Ko.',
    acceptedFirstMoves: [{ x: 5, y: 4 }],
    variations: [
      {
        playerMove: { x: 5, y: 4 },
        explanationEs:
          '¡Ko iniciado! Al jugar en F5 capturas la piedra blanca de E5. Aunque tu nueva piedra en F5 queda en atari, la Regla de Ko prohíbe a Blanco recapturar en E5 en el turno siguiente.',
      },
    ],
    wrongMoveExplanations: {},
    defaultWrongExplanation:
      'La piedra blanca en E5 está en atari (tiene 3 lados bloqueados por Negro). Ocupa su cuarta libertad en F5.',
    hints: [
      'Pista 1: Observa la piedra blanca en E5. Está rodeada por D5, E6 y E4.',
      'Pista 2: Aunque F5 parece rodeado por tres piedras blancas, jugar allí captura la piedra blanca de E5.',
      'Pista 3: Coloca tu piedra negra en F5 para capturar en Ko.',
    ],
    solutionExplanation:
      'Negro juega F5 y captura E5. Esto crea un punto de Ko prohibido en E5 para el turno inmediato de Blanco, obligando a Blanco a buscar una amenaza de Ko en otra parte del tablero.',
    commonMistake: 'No atreverse a capturar en F5 por miedo a que la piedra sea recapturada inmediatamente.',
    prerequisites: ['lesson-3-atari-captura'],
    relatedLessonId: 'lesson-3-atari-captura',
    validationStatus: 'PUBLICADO',
    estimatedSeconds: 45,
    xpBase: 5,
    xpNoHints: 7,
    markers: [{ x: 4, y: 4, type: 'TRIANGLE' }],
  },
  ...EXPANDED_PUZZLES_CATALOG,
  ...ATTACK_DEFENSE_PUZZLES_CATALOG,
  ...TESUJI_PUZZLES_CATALOG,
  ...KAGEYAMA_PUZZLES_CATALOG,
];

/**
 * Validates that every puzzle in the catalog has a legal initial position,
 * that all accepted first moves are legal according to the deterministic Go engine,
 * and that any multi-move variations (opponentReply + nextValidMoves) are also legal.
 */
export function validateAllPuzzlesWithEngine(puzzles: PuzzleContent[] = PUZZLES_CATALOG): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  for (const p of puzzles) {
    const state = createGameState({
      size: p.boardSize,
      initialStones: p.initialStones,
      startingTurn: p.turn,
    });

    // Check that no initial group has 0 liberties
    const groups = getAllGroups(state.board);
    for (const g of groups) {
      if (g.liberties.length === 0) {
        errors.push(`Puzzle ${p.id}: posición inicial contiene grupo sin libertades (${g.id}).`);
      }
    }

    if (p.acceptedFirstMoves.length === 0) {
      errors.push(`Puzzle ${p.id}: no tiene jugadas de solución registradas.`);
    }

    for (const sol of p.acceptedFirstMoves) {
      const res = validateAndPlayMove(state, sol);
      if (!res.legal || !res.nextState) {
        errors.push(
          `Puzzle ${p.id}: la solución registrada (${sol.x},${sol.y}) fue rechazada por el motor (${res.reason}: ${res.messageEs}).`
        );
      }
    }

    for (const v of p.variations) {
      const r1 = validateAndPlayMove(state, v.playerMove);
      if (!r1.legal || !r1.nextState) {
        errors.push(`Puzzle ${p.id}: variación inicial (${v.playerMove.x},${v.playerMove.y}) ilegal.`);
        continue;
      }
      if (v.opponentReply) {
        const r2 = validateAndPlayMove(r1.nextState, v.opponentReply);
        if (!r2.legal || !r2.nextState) {
          errors.push(
            `Puzzle ${p.id}: respuesta del oponente (${v.opponentReply.x},${v.opponentReply.y}) ilegal (${r2.reason}).`
          );
          continue;
        }
        if (v.nextValidMoves && v.nextValidMoves.length > 0) {
          for (const nextMove of v.nextValidMoves) {
            const r3 = validateAndPlayMove(r2.nextState, nextMove);
            if (!r3.legal) {
              errors.push(
                `Puzzle ${p.id}: continuación (${nextMove.x},${nextMove.y}) ilegal tras respuesta del oponente (${r3.reason}).`
              );
            }
          }
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

