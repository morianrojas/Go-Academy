import { CurriculumStageOverview, DemoStep, LessonContent, VocabularyTerm } from '../types/go';
import { EXPANDED_LESSONS_CATALOG } from './lessonsExpansionData';
import { ATTACK_DEFENSE_LESSONS_CATALOG } from './attackDefenseLessonsData';
import { TESUJI_LESSONS_PART1_CATALOG } from './tesujiLessonsPart1Data';
import { TESUJI_LESSONS_PART2_CATALOG } from './tesujiLessonsPart2Data';
import { KAGEYAMA_LESSONS_CATALOG } from './kageyamaLessonsData';

export const CURRICULUM_STAGES: CurriculumStageOverview[] = [
  {
    stage: 0,
    title: '0. Orientación',
    topics: 'Qué es Go, tablero y líneas, piedras, turnos, objetivo de rodear puntos',
    expectedMastery: 'Entiende la meta y coloca piedras en intersecciones',
    unlockedInMvp: true,
    lessonIds: ['lesson-1-tablero-turnos', 'lesson-4-territorio-conteo'],
    plannedLessonsTarget: 2,
    units: [
      {
        id: 'stg0-u1',
        unitNumber: 1,
        title: 'El Goban, las intersecciones y el ritmo del juego',
        focus: 'Cuadrícula 9×9, turnos alternos, inmovilidad de las piedras y puntos estrella.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-1-tablero-turnos'],
      },
      {
        id: 'stg0-u2',
        unitNumber: 2,
        title: 'Objetivo del juego y concepto inicial de territorio',
        focus: 'Rodear intersecciones vacías en esquinas, lados y centro; pase y final de partida.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-4-territorio-conteo'],
      },
    ],
  },
  {
    stage: 1,
    title: '1. Reglas esenciales y lectura',
    topics: 'Libertades, grupos, captura, atari, suicidio, ko y método de lectura táctica en árbol',
    expectedMastery: 'Juega una partida legal y lee secuencias con propósito definido',
    unlockedInMvp: true,
    lessonIds: [
      'lesson-2-libertades-grupos',
      'lesson-3-atari-captura',
      'lesson-5-regla-ko-amenazas',
      'lesson-25-lectura-tactica-arbol',
      'lesson-37-kageyama-redes-firmes-romper-escaleras',
    ],
    plannedLessonsTarget: 5,
    units: [
      {
        id: 'stg1-u1',
        unitNumber: 1,
        title: 'Libertades ortogonales y cadenas conectadas (Kim & Jeong)',
        focus: 'Conteo de aire en centro, borde y esquina; unión solidaria frente a diagonales.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-2-libertades-grupos'],
      },
      {
        id: 'stg1-u2',
        unitNumber: 2,
        title: 'Atari, captura de cadenas y suicidio ilegal (Kim & Jeong)',
        focus: 'Amenaza de captura, retiro de prisioneros y excepción de captura aparente.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-3-atari-captura'],
      },
      {
        id: 'stg1-u3',
        unitNumber: 3,
        title: 'Regla de Ko, Superko y conteo básico (Kim & Jeong)',
        focus: 'Prohibición de repetición inmediata, amenazas de Ko y cierre de fronteras.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-5-regla-ko-amenazas'],
      },
      {
        id: 'stg1-u4',
        unitNumber: 4,
        title: 'El método de lectura táctica en árbol y orden de jugadas (Davies Cap. 1)',
        focus: 'Definir propósito táctico, retroceder desde el final del árbol y cambiar el orden de jugadas.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-25-lectura-tactica-arbol'],
      },
      {
        id: 'stg1-u5',
        unitNumber: 5,
        title: 'Firmeza en la captura, rompedores de escalera y ceder el paso en la red (Kageyama Cap. 1)',
        focus: 'Elegir siempre la captura sin defectos entre dos opciones y aplicar la red de ceder el paso.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-37-kageyama-redes-firmes-romper-escaleras'],
      },
    ],
  },
  {
    stage: 2,
    title: '2. Sobrevivir y Tesujis de Captura',
    topics: 'Extender, conectar, cortar, semeai básico, escalera floja, pinza, nariz y contra-atari',
    expectedMastery: 'Reconoce peligro, salva grupos y captura piedras de corte clave',
    unlockedInMvp: true,
    lessonIds: [
      'lesson-13-defensa-temprana-escape',
      'lesson-6-conectar-cortar-defensa',
      'lesson-14-semeai-carreras-captura',
      'lesson-26-piedras-corte-escalera-floja',
      'lesson-27-tesuji-pinza-nariz-corte-cruzado',
      'lesson-28-ignorar-atari-contra-atari',
      'lesson-38-kageyama-no-asomarse-corte-continuidad',
      'lesson-39-kageyama-piedras-caminan-paso-atras',
    ],
    plannedLessonsTarget: 8,
    units: [
      {
        id: 'stg2-u1',
        unitNumber: 1,
        title: 'Extensión de grupos en peligro y escape hacia el centro (Ishida Cap. 4)',
        focus: 'Aumentar libertades al salir de atari y usar el salto de un espacio (Ikkentobi).',
        plannedLessonCount: 1,
        lessonIds: ['lesson-13-defensa-temprana-escape'],
      },
      {
        id: 'stg2-u2',
        unitNumber: 2,
        title: 'Conexión sólida, boca de tigre y defensa ante cortes (Kim & Jeong)',
        focus: 'Proteger puntos débiles (nozoki) y dividir grupos rivales sin sobreextenderse.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-6-conectar-cortar-defensa'],
      },
      {
        id: 'stg2-u3',
        unitNumber: 3,
        title: 'Carreras básicas de captura (Semeai elemental)',
        focus: 'Comparar libertades entre dos grupos adyacentes sin ojos y ejecutar Doble Atari.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-14-semeai-carreras-captura'],
      },
      {
        id: 'stg2-u4',
        unitNumber: 4,
        title: 'Captura de piedras de corte: Salto de Caballo y Escalera Floja (Davies Cap. 2)',
        focus: 'Distinguir piedras clave (Kaname-ishi) de basura (Kasu-ishi) y encerrar con Yurumi-shicho.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-26-piedras-corte-escalera-floja'],
      },
      {
        id: 'stg2-u5',
        unitNumber: 5,
        title: 'Pinza (Hasami-tsuke), Tesuji de Nariz (Hana-tsuke) y Corte Cruzado (Davies Cap. 2)',
        focus: 'Extraer piedras de corte en la segunda línea y extender el brazo más vulnerable tras un corte cruzado.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-27-tesuji-pinza-nariz-corte-cruzado'],
      },
      {
        id: 'stg2-u6',
        unitNumber: 6,
        title: 'Cuándo ignorar un Atari y el poder del Contra-Atari (Davies Cap. 14)',
        focus: 'Responder al atari con Gyaku-atari o sacrificando una piedra para ganar una presa mayor.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-28-ignorar-atari-contra-atari'],
      },
      {
        id: 'stg2-u7',
        unitNumber: 7,
        title: 'No asomarse donde se puede cortar y continuidad global (Kageyama Cap. 2)',
        focus: 'Evitar el asomo crudo (Nozoki) cuando el corte directo funciona y mantener un solo grupo conectado.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-38-kageyama-no-asomarse-corte-continuidad'],
      },
      {
        id: 'stg2-u8',
        unitNumber: 8,
        title: 'Las piedras salen a caminar: el ritmo en contacto y el paso atrás (Kageyama Cap. 3)',
        focus: 'Caminar paso a paso en contacto directo, castigar sobreextensiones y usar el paso atrás (Hiki).',
        plannedLessonCount: 1,
        lessonIds: ['lesson-39-kageyama-piedras-caminan-paso-atras'],
      },
    ],
  },
  {
    stage: 3,
    title: '3. Forma, Conexión y Corte',
    topics: 'Kosumi, junta de bambú, hane en la cabeza, tesuji protege-ojos, enlace indirecto y corte del caballo',
    expectedMastery: 'Conecta grupos por bajo el borde y corta formas defectuosas con precisión',
    unlockedInMvp: true,
    lessonIds: [
      'lesson-7-forma-eficiencia',
      'lesson-15-formas-pesadas-hane-cabeza',
      'lesson-29-arte-conectar-indirecto-protege-ojos',
      'lesson-30-cortar-formas-cuello-perro',
      'lesson-40-kageyama-lucha-tomar-delantera',
    ],
    plannedLessonsTarget: 5,
    units: [
      {
        id: 'stg3-u1',
        unitNumber: 1,
        title: 'Formas clásicas de conexión: Kosumi, Tobis y Junta de Bambú (Kim & Jeong)',
        focus: 'Relaciones ligeras y flexibles entre piedras del mismo color.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-7-forma-eficiencia'],
      },
      {
        id: 'stg3-u2',
        unitNumber: 2,
        title: 'Defectos de forma (Triángulo vacío, Dango) y Hane en la cabeza de dos piedras',
        focus: 'Evitar masas pesadas y dominar el Hane en la cabeza de dos o tres piedras.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-15-formas-pesadas-hane-cabeza'],
      },
      {
        id: 'stg3-u4',
        unitNumber: 4,
        title: 'El Arte de Conectar: Tesuji Protege-Ojos y Enlace por Damezumari (Davies Cap. 6 y 12)',
        focus: 'Conectar protegiendo territorio ocular y enlazar grupos en el borde explotando la falta de libertades rival.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-29-arte-conectar-indirecto-protege-ojos'],
      },
      {
        id: 'stg3-u5',
        unitNumber: 5,
        title: 'Cómo Cortar: Cuello de Perro y Corte a través del Salto de Caballo (Davies Cap. 7)',
        focus: 'Castigar la forma de cuello de perro y atravesar el Keima enemigo con contacto y doble corte.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-30-cortar-formas-cuello-perro'],
      },
      {
        id: 'stg3-u6',
        unitNumber: 6,
        title: 'La lucha por tomar la delantera y abandonar la segunda línea (Kageyama Cap. 4)',
        focus: 'Dejar la línea de la derrota a la primera oportunidad y saltar por delante del bloqueo rival.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-40-kageyama-lucha-tomar-delantera'],
      },
    ],
  },
  {
    stage: 4,
    title: '4. Territorio e influencia',
    topics: 'Esquinas, lados, centro, moyo, territorio, invasión, reducción, grosor y debilidad',
    expectedMastery: 'Distingue territorio asegurado de influencia potencial',
    unlockedInMvp: true,
    lessonIds: [
      'lesson-8-territorio-influencia-moyo',
      'lesson-16-equilibrio-territorio-poder-atsui',
      'lesson-41-kageyama-esferas-influencia-uso-grosor',
    ],
    plannedLessonsTarget: 3,
    units: [
      {
        id: 'stg4-u1',
        unitNumber: 1,
        title: 'La jerarquía del tablero: Esquinas de oro, lados de plata, centro de hierba',
        focus: 'Eficiencia geométrica al cerrar puntos con ayuda del borde y uso del Moyo.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-8-territorio-influencia-moyo'],
      },
      {
        id: 'stg4-u2',
        unitNumber: 2,
        title: 'Línea de muerte (3ª), línea de victoria (4ª) y Balance de Poder (Ishida Cap. 1)',
        focus: 'Contraste entre beneficio inmediato en territorio y fuerza exterior (Atsui).',
        plannedLessonCount: 1,
        lessonIds: ['lesson-16-equilibrio-territorio-poder-atsui'],
      },
      {
        id: 'stg4-u3',
        unitNumber: 3,
        title: 'Territorio vs. Esferas de Influencia y la Regla del Grosor (Kageyama Cap. 5)',
        focus: 'No usar el grosor (Atsumi) para rodear territorio pequeño, sino para atacar y empujar al enemigo.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-41-kageyama-esferas-influencia-uso-grosor'],
      },
    ],
  },
  {
    stage: 5,
    title: '5. Táctica y Amputación a Gran Escala',
    topics: 'Escaleras (shicho), redes (geta), snapback, 5 fórmulas sin contacto, exprimir (shibori) y colocación (oki)',
    expectedMastery: 'Lee secuencias tácticas profundas y captura grupos cortantes grandes',
    unlockedInMvp: true,
    lessonIds: [
      'lesson-9-escaleras-redes-snapback',
      'lesson-17-cinco-formulas-ataque-sin-contacto',
      'lesson-31-amputar-exprimir-shibori-colocacion',
    ],
    plannedLessonsTarget: 3,
    units: [
      {
        id: 'stg5-u1',
        unitNumber: 1,
        title: 'La Escalera (Shicho), la Red (Geta) y el Snapback (Uttegaeshi)',
        focus: 'Lectura lineal en zigzag, redes envolventes y sacrificios de recaptura inmediata.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-9-escaleras-redes-snapback'],
      },
      {
        id: 'stg5-u2',
        unitNumber: 2,
        title: 'Las 5 Fórmulas de Ataque sin Contacto (Ishida Cap. 3)',
        focus: '«No toques lo que atacas»: Tesuji Roba-Ojos, Ángulo, Caballo, Sombrero y Asomo.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-17-cinco-formulas-ataque-sin-contacto'],
      },
      {
        id: 'stg5-u4',
        unitNumber: 4,
        title: 'Amputar a Gran Escala: Exprimir (Shibori), Doble Escalera y Colocación (Davies Cap. 3)',
        focus: 'Sacrificar piedras para comprimir al enemigo y usar la Colocación (Oki) en la primera línea.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-31-amputar-exprimir-shibori-colocacion'],
      },
    ],
  },
  {
    stage: 6,
    title: '6. Vida, Muerte y Semeai Avanzado',
    topics: 'Dos ojos, falso ojo, seki, nakade, descenso al borde (sagari), estómago (hara-tsuke) y ojos grandes',
    expectedMastery: 'Resuelve problemas de vida y muerte y gana carreras de captura complejas',
    unlockedInMvp: true,
    lessonIds: [
      'lesson-10-dos-ojos-vida-muerte',
      'lesson-18-nakade-puntos-vitales-tsumego',
      'lesson-32-semeai-avanzado-estomago-ojos-grandes',
      'lesson-42-kageyama-regla-fundamental-tsumego-cerco',
    ],
    plannedLessonsTarget: 4,
    units: [
      {
        id: 'stg6-u1',
        unitNumber: 1,
        title: 'Inmortalidad en el tablero: Los dos ojos reales, el ojo falso y el Seki',
        focus: 'Por qué el rival jamás puede capturar un grupo con dos ojos independientes y vida mutua.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-10-dos-ojos-vida-muerte'],
      },
      {
        id: 'stg6-u2',
        unitNumber: 2,
        title: 'Espacios internos de 3, 4 y 5 puntos (Nakade y puntos vitales)',
        focus: 'La simetría del punto vital en Tres en ángulo y Pirámide de Cuatro.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-18-nakade-puntos-vitales-tsumego'],
      },
      {
        id: 'stg6-u4',
        unitNumber: 4,
        title: 'Semeai Avanzado: Descenso al Borde, Tesuji al Estómago y Ojos Grandes (Davies Cap. 5)',
        focus: 'Ganar libertades con Sagari y Hara-tsuke, y calcular Ojos Grandes (4 puntos = 5 libertades, 5 = 8).',
        plannedLessonCount: 1,
        lessonIds: ['lesson-32-semeai-avanzado-estomago-ojos-grandes'],
      },
      {
        id: 'stg6-u5',
        unitNumber: 5,
        title: 'La Primera Regla del Tsumego («Hay muerte en el Hane») y romper el cerco (Kageyama Cap. 6)',
        focus: 'Estrechar primero desde afuera con Hane antes de ir al punto vital y escapar al aire fresco.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-42-kageyama-regla-fundamental-tsumego-cerco'],
      },
    ],
  },
  {
    stage: 7,
    title: '7. Estrategia global',
    topics: 'Fuseki, dirección de juego, balance, urgencia vs. tamaño, sente/gote, iniciativa',
    expectedMastery: 'Compara jugadas globales y formula un plan',
    unlockedInMvp: true,
    lessonIds: [
      'lesson-11-sente-gote-fuseki-joseki',
      'lesson-19-estrategia-ataque-apoyo-division',
    ],
    plannedLessonsTarget: 2,
    units: [
      {
        id: 'stg7-u1',
        unitNumber: 1,
        title: 'Principios de Fuseki, Sente/Gote y urgencia frente a tamaño',
        focus: 'Ocupación de esquinas, aproximaciones (kakari), cierres (shimari) y valor de la iniciativa.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-11-sente-gote-fuseki-joseki'],
      },
      {
        id: 'stg7-u3',
        unitNumber: 3,
        title: 'Estrategia de Ataque: Dirección, Apoyo (Motare) y División (Karami)',
        focus: 'Atacar para ganar territorio/poder y dividir grupos débiles (Ishida Cap. 2).',
        plannedLessonCount: 1,
        lessonIds: ['lesson-19-estrategia-ataque-apoyo-division'],
      },
    ],
  },
  {
    stage: 8,
    title: '8. Joseki, Invasión y Ruptura de Cercos',
    topics: 'Invasión en extensiones de 3 espacios, cuña (warikomi), revivir piedras y escapar de cercos',
    expectedMastery: 'Invade con criterio y perfora bloqueos enemigos mediante tesujis de corte',
    unlockedInMvp: true,
    lessonIds: [
      'lesson-20-joseki-invasion-tres-espacios',
      'lesson-33-dentro-territorio-enemigo-escape-muro',
      'lesson-43-kageyama-crear-joseki-armonia-global',
    ],
    plannedLessonsTarget: 3,
    units: [
      {
        id: 'stg8-u1',
        unitNumber: 1,
        title: 'Josekis de Invasión en Extensiones de Tres Espacios (Ishida Cap. 8)',
        focus: 'Dónde invadir en 3ª y 4ª línea, puntos en "V" y las 3 respuestas del defensor.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-20-joseki-invasion-tres-espacios'],
      },
      {
        id: 'stg8-u4',
        unitNumber: 4,
        title: 'Dentro del Territorio Enemigo y Ruptura de Cercos (Davies Cap. 8 y 9)',
        focus: 'Usar la Cuña (Warikomi) y el Corte Cruzado para romper muros y revivir piedras aisladas.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-33-dentro-territorio-enemigo-escape-muro'],
      },
      {
        id: 'stg8-u5',
        unitNumber: 5,
        title: 'El Estudio Vivo del Joseki y el Castigo a las Desviaciones (Kageyama Cap. 7)',
        focus: 'Castigar desviaciones de Joseki y adaptar las secuencias de esquina al tablero global.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-43-kageyama-crear-joseki-armonia-global'],
      },
    ],
  },
  {
    stage: 9,
    title: '9. Final de partida',
    topics: 'Yose, valor de puntos, sente/gote en el final, conteo y estimación de resultado',
    expectedMastery: 'Prioriza movimientos de final de partida',
    unlockedInMvp: true,
    lessonIds: [
      'lesson-12-yose-lectura-revision',
      'lesson-44-kageyama-psicologia-yose-doble-sente',
    ],
    plannedLessonsTarget: 2,
    units: [
      {
        id: 'stg9-u1',
        unitNumber: 1,
        title: 'Categorías de Yose (Doble Sente, Sente, Gote) y tesujis de borde',
        focus: 'Orden óptimo de cierre de fronteras, cálculo de valor y relleno de dame.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-12-yose-lectura-revision'],
      },
      {
        id: 'stg9-u2',
        unitNumber: 2,
        title: 'Psicología del Yose, Doble Sente y el Salto del Mono (Kageyama Cap. 11 y Apéndice)',
        focus: '«Tú ve por tu camino y yo por el mío», trampas del borde en primera línea y Salto del Mono.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-44-kageyama-psicologia-yose-doble-sente'],
      },
    ],
  },
  {
    stage: 10,
    title: '10. Lectura profunda, Tempo y Retroceso',
    topics: 'Jugadas forzantes (kikashi), ko avanzado, sacrificio por tempo, retroceso (hiki) y doble hane',
    expectedMastery: 'Construye secuencias forzantes, sacrifica por tempo y captura con Hiki',
    unlockedInMvp: true,
    lessonIds: [
      'lesson-21-jugadas-forzantes-kikashi-inductoras',
      'lesson-22-ko-avanzado-hanami-dominante',
      'lesson-34-sacrificio-tempo-ataque-doble-hane',
    ],
    plannedLessonsTarget: 3,
    units: [
      {
        id: 'stg10-u1',
        unitNumber: 1,
        title: 'Jugadas Forzantes (Kikashi), Jugadas de Gracias y «Fuerza Antes de Defender»',
        focus: 'Piedras desechables en Sente, resistencia y secuencias inductoras (Ishida Cap. 5 y 6).',
        plannedLessonCount: 1,
        lessonIds: ['lesson-21-jugadas-forzantes-kikashi-inductoras'],
      },
      {
        id: 'stg10-u2',
        unitNumber: 2,
        title: 'Estrategia en Luchas de Ko: Hanami Ko, Ko de Pasos y Ko Dominante',
        focus: 'Cuándo iniciar un Ko y cuándo cerrarlo de inmediato (Ishida Cap. 9).',
        plannedLessonCount: 1,
        lessonIds: ['lesson-22-ko-avanzado-hanami-dominante'],
      },
      {
        id: 'stg10-u3',
        unitNumber: 3,
        title: 'Sacrificio por Tempo, Retroceso (Hiki) y Ataque mediante Tesuji (Davies Cap. 10 y 11)',
        focus: 'Cortar el salto de caballo por iniciativa y usar el Retroceso (Hiki) cuando el atari falla.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-34-sacrificio-tempo-ataque-doble-hane'],
      },
    ],
  },
  {
    stage: 11,
    title: '11. Crear Forma, Defensa y Conducción',
    topics: 'Defensa con contacto (tsuke), sacrificio (sute-ishi), contra-hane y tesuji de conducción (oikomi)',
    expectedMastery: 'Resuelve emergencias defensivas, crea forma con contra-hane y aplica Oikomi',
    unlockedInMvp: true,
    lessonIds: [
      'lesson-23-defensa-contacto-sacrificio-suteishi',
      'lesson-35-crear-forma-contra-hane-conduccion',
      'lesson-45-kageyama-jugadas-propias-espiral-bajo-piedras',
    ],
    plannedLessonsTarget: 3,
    units: [
      {
        id: 'stg11-u1',
        unitNumber: 1,
        title: 'Defensa en Emergencias: Contacto (Tsuke), Golpe al Hombro y Sacrificio (Ishida Cap. 4)',
        focus: 'Apoyarse en las piedras enemigas y entregar piedras secundarias para ganar ojos o escapar.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-23-defensa-contacto-sacrificio-suteishi'],
      },
      {
        id: 'stg11-u3',
        unitNumber: 3,
        title: 'Crear Forma (Sabaki), Contra-Hane y Tesuji de Conducción Oikomi (Davies Cap. 13)',
        focus: 'Castigar el hane enemigo con Contra-Hane y conducir al rival a Damezumari con Oikomi.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-35-crear-forma-contra-hane-conduccion'],
      },
      {
        id: 'stg11-u4',
        unitNumber: 4,
        title: 'Jugadas Propias (Honte), Escalera en Espiral y Jugar Bajo las Piedras (Kageyama Cap. 8, 9 y 10)',
        focus: 'Sujetar la piedra cortadora con Honte, comprimir con Guruguru-mawashi y sacrificar con Ishi-no-shita.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-45-kageyama-jugadas-propias-espiral-bajo-piedras'],
      },
    ],
  },
  {
    stage: 12,
    title: '12. Maestría continua y Doble Amenaza',
    topics: 'Reducción de grandes marcos, sondas, ko de dos etapas, ko de mil años y tesuji de doble amenaza',
    expectedMastery: 'Integra estrategia global, Kos indirectos y tesujis de doble amenaza',
    unlockedInMvp: true,
    lessonIds: [
      'lesson-24-reduccion-invasion-grandes-marcos',
      'lesson-36-ko-indirecto-doble-amenaza-maestria',
    ],
    plannedLessonsTarget: 2,
    units: [
      {
        id: 'stg12-u1',
        unitNumber: 1,
        title: 'Puntos de Unión, Sondas (Yosu-miru) y Reducción de Grandes Marcos (Ishida Cap. 7 y 10)',
        focus: 'Dominar la frontera entre Moyos opuestos y usar sondas para fijar la forma.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-24-reduccion-invasion-grandes-marcos'],
      },
      {
        id: 'stg12-u3',
        unitNumber: 3,
        title: 'Maestría en Tesuji: Ko de Dos Etapas, Ko de Mil Años y Doble Amenaza (Davies Cap. 4, 15 y 16)',
        focus: 'Obtener el mejor Ko con Throw-in, dominar Kos indirectos y coordinar dos objetivos con Doble Amenaza.',
        plannedLessonCount: 1,
        lessonIds: ['lesson-36-ko-indirecto-doble-amenaza-maestria'],
      },
    ],
  },
];

const RAW_LESSONS_CATALOG: LessonContent[] = [
  {
    id: 'lesson-1-tablero-turnos',
    stageNumber: 0,
    stageTitle: '0. Orientación',
    unitNumber: 1,
    unitTitle: 'El Goban, las intersecciones y el ritmo del juego',
    title: 'El Tablero, las Intersecciones y los Turnos',
    subtitle: 'Al terminar, comprenderás la cuadrícula del Go, sabrás colocar piedras sobre las intersecciones y entenderás que las piedras nunca se mueven una vez jugadas.',
    estimatedMinutes: 5,
    xpReward: 20,
    prerequisites: [],
    relatedPuzzleIds: ['puzzle-1-captura-centro', 'puzzle-2-captura-esquina'],
    observableObjective:
      'Al terminar, podrás colocar piedras negras y blancas en cualquier intersección válida (incluyendo bordes y esquinas), alternar turnos correctamente y explicar cómo se gana una partida rodeando territorio.',
    activationQuestion: {
      question:
        'A diferencia del ajedrez o las damas, ¿dónde se colocan las piedras en el tablero de Go?',
      options: [
        {
          id: 'opt-squares',
          text: 'En el centro de las casillas cuadradas',
          isCorrect: false,
          explanation:
            'Es la duda más común al empezar, pero en Go las piedras nunca van dentro de las casillas: se colocan sobre las intersecciones de las líneas.',
        },
        {
          id: 'opt-intersections',
          text: 'En los puntos de cruce (intersecciones) de las líneas',
          isCorrect: true,
          explanation:
            '¡Exacto! En Go, las piedras se juegan directamente sobre las intersecciones donde las líneas horizontales y verticales se cruzan, incluyendo las esquinas y los bordes.',
        },
        {
          id: 'opt-only-center',
          text: 'Solo en los bordes exteriores del tablero',
          isCorrect: false,
          explanation:
            'Los bordes y las esquinas son jugables, pero también puedes colocar piedras en todas las intersecciones interiores del tablero.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. La cuadrícula de intersecciones (Goban)',
        body: 'El tablero de Go (llamado Goban en japonés) es una red de líneas horizontales y verticales. En la academia comenzamos en el tablero de 9×9 líneas, que tiene 81 intersecciones llamadas puntos. Los bordes y las 4 esquinas extremas también son intersecciones jugables.',
        deepDive:
          'El tablero oficial de torneo mide 19×19 líneas (361 intersecciones), y el tamaño intermedio mide 13×13 (169 intersecciones). Sin embargo, todas las reglas tácticas y estratégicas fundamentales funcionan exactamente igual en 9×9, permitiendo ver el impacto de cada piedra en pocos minutos.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 4, y: 4, color: 'BLACK' },
            { x: 0, y: 0, color: 'WHITE' },
            { x: 8, y: 4, color: 'BLACK' },
          ],
          markers: [
            { x: 4, y: 4, type: 'HIGHLIGHT', label: 'C' },
            { x: 0, y: 0, type: 'CIRCLE', label: 'E' },
            { x: 8, y: 4, type: 'SQUARE', label: 'B' },
          ],
          caption: 'Tres intersecciones válidas: centro (E5), esquina extrema (A9) y borde derecho (J5).',
        },
      },
      {
        title: '2. Alternancia de turnos e inmovilidad',
        body: 'Dos jugadores se enfrentan: Negro y Blanco. Negro siempre realiza el primer movimiento en una partida igualada. En cada turno colocas una sola piedra en una intersección vacía. Una vez colocada, la piedra nunca se desplaza por el tablero (solo puede ser retirada si es capturada).',
        deepDive:
          'Como Negro tiene la ventaja de jugar primero, al final de la partida Blanco recibe una compensación en puntos llamada Komi (habitualmente 5.5 o 6.5 puntos). El medio punto (.5) evita los empates.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 6, y: 2, color: 'BLACK' },
            { x: 2, y: 6, color: 'WHITE' },
            { x: 6, y: 6, color: 'BLACK' },
            { x: 2, y: 2, color: 'WHITE' },
          ],
          markers: [
            { x: 6, y: 2, type: 'CIRCLE', label: '1' },
            { x: 2, y: 6, type: 'CIRCLE', label: '2' },
            { x: 6, y: 6, type: 'CIRCLE', label: '3' },
            { x: 2, y: 2, type: 'CIRCLE', label: '4' },
          ],
          caption: 'Negro (1 y 3) y Blanco (2 y 4) alternan turnos ocupando los puntos estrella.',
        },
      },
      {
        title: '3. El objetivo: rodear territorio',
        body: 'El objetivo del Go no es aniquilar todas las piezas rivales, sino rodear más intersecciones vacías (llamadas territorio) que tu oponente. Las esquinas y los bordes ayudan a cerrar territorio con menos piedras porque el borde del tablero actúa como un muro natural.',
        deepDive:
          'Para rodear 9 puntos de territorio en el centro necesitas 16 piedras; en un lado necesitas 11 piedras; y en una esquina solo necesitas 7 piedras. Por eso la sabiduría clásica dice: "Primero las esquinas, luego los lados, por último el centro".',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 0, y: 2, color: 'BLACK' },
            { x: 1, y: 2, color: 'BLACK' },
            { x: 2, y: 2, color: 'BLACK' },
            { x: 2, y: 1, color: 'BLACK' },
            { x: 2, y: 0, color: 'BLACK' },
          ],
          markers: [
            { x: 0, y: 0, type: 'SUCCESS', label: 'T' },
            { x: 1, y: 0, type: 'SUCCESS', label: 'T' },
            { x: 0, y: 1, type: 'SUCCESS', label: 'T' },
            { x: 1, y: 1, type: 'SUCCESS', label: 'T' },
          ],
          caption: 'Con solo 5 piedras negras, Negro asegura 4 puntos de territorio (T) en la esquina superior izquierda.',
        },
      },
    ],
    demonstration: {
      title: 'Demostración: Las primeras piedras y la formación de territorio',
      size: 9,
      steps: [
        {
          title: 'Tablero vacío (9×9)',
          narration:
            'Observa los 5 puntos más oscuros en el tablero 9×9: son los puntos estrella (hoshi) en C7, G7, E5, C3 y G3.',
          stones: [],
          turn: 'BLACK',
        },
        {
          title: 'Movimiento 1: Negro juega en G7',
          narration:
            'Negro inicia la partida colocando su primera piedra en el punto estrella superior derecho (G7), equilibrando influencia hacia el centro y territorio en la esquina.',
          stones: [{ x: 6, y: 2, color: 'BLACK' }],
          lastMove: { x: 6, y: 2 },
          turn: 'WHITE',
        },
        {
          title: 'Movimiento 2: Blanco responde en C3',
          narration:
            'Blanco reclama la esquina opuesta en C3. Cada jugador coloca exactamente una piedra por turno.',
          stones: [
            { x: 6, y: 2, color: 'BLACK' },
            { x: 2, y: 6, color: 'WHITE' },
          ],
          lastMove: { x: 2, y: 6 },
          turn: 'BLACK',
        },
        {
          title: 'Movimiento 3 y 4: Ocupando las esquinas restantes',
          narration:
            'Negro ocupa G3 y Blanco ocupa C7. Las cuatro esquinas tienen ahora presencia inicial.',
          stones: [
            { x: 6, y: 2, color: 'BLACK' },
            { x: 2, y: 6, color: 'WHITE' },
            { x: 6, y: 6, color: 'BLACK' },
            { x: 2, y: 2, color: 'WHITE' },
          ],
          lastMove: { x: 2, y: 2 },
          turn: 'BLACK',
        },
        {
          title: 'Movimiento 5: Negro extiende por el lado derecho (G5)',
          narration:
            'Al colocar una piedra en G5, Negro une el potencial de sus dos esquinas derechas y comienza a delimitar un territorio amplio en el lado derecho.',
          stones: [
            { x: 6, y: 2, color: 'BLACK' },
            { x: 2, y: 6, color: 'WHITE' },
            { x: 6, y: 6, color: 'BLACK' },
            { x: 2, y: 2, color: 'WHITE' },
            { x: 6, y: 4, color: 'BLACK' },
          ],
          lastMove: { x: 6, y: 4 },
          markers: [
            { x: 7, y: 3, type: 'HIGHLIGHT' },
            { x: 7, y: 4, type: 'HIGHLIGHT' },
            { x: 7, y: 5, type: 'HIGHLIGHT' },
          ],
          turn: 'WHITE',
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l1-guided-1',
        prompt:
          'Es el turno de Negro. Coloca una piedra en el punto estrella central (Tengen, coordenada E5) para experimentar cómo se coloca una piedra en una intersección.',
        boardSize: 9,
        initialStones: [],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 4 }],
        correctFeedback:
          '¡Muy bien! E5 es el punto central (Tengen) del tablero 9×9, donde se cruzan la quinta columna y la quinta fila.',
        wrongFeedback: {},
        defaultWrongFeedback:
          'Busca el punto estrella justo en el centro del tablero (intersección E5, columna E y fila 5).',
        hints: [
          'Observa el punto negro pequeño en el centro exacto del tablero.',
          'Haz clic en la intersección central E5.',
        ],
        markers: [{ x: 4, y: 4, type: 'CIRCLE' }],
      },
    ],
    independentPractice: [
      {
        id: 'l1-prac-1',
        prompt:
          'Ejercicio 1: Las esquinas y los bordes también son intersecciones válidas. Cierra la muralla de Negro en el borde superior colocando una piedra en C9.',
        boardSize: 9,
        initialStones: [
          { x: 0, y: 2, color: 'BLACK' },
          { x: 1, y: 2, color: 'BLACK' },
          { x: 2, y: 2, color: 'BLACK' },
          { x: 2, y: 1, color: 'BLACK' },
          { x: 4, y: 4, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 2, y: 0 }],
        correctFeedback:
          '¡Excelente! Al jugar en el borde C9, Negro completa el cierre de la esquina superior izquierda y asegura 4 puntos de territorio.',
        wrongFeedback: {},
        defaultWrongFeedback:
          'Necesitas cerrar el hueco en la primera línea superior, justo encima de C8 (coordenada C9).',
        hints: [
          'Fíjate en la fila superior (fila 9) donde termina la pared negra.',
          'Coloca la piedra negra en la intersección C9.',
        ],
      },
      {
        id: 'l1-prac-2',
        prompt:
          'Ejercicio 2: Blanco intenta entrar por D5 en el territorio derecho de Negro. Bloquea la entrada jugando exactamente en E5.',
        boardSize: 9,
        initialStones: [
          { x: 4, y: 0, color: 'BLACK' },
          { x: 4, y: 1, color: 'BLACK' },
          { x: 4, y: 2, color: 'BLACK' },
          { x: 4, y: 3, color: 'BLACK' },
          { x: 4, y: 5, color: 'BLACK' },
          { x: 5, y: 5, color: 'BLACK' },
          { x: 6, y: 5, color: 'BLACK' },
          { x: 7, y: 5, color: 'BLACK' },
          { x: 8, y: 5, color: 'BLACK' },
          { x: 2, y: 4, color: 'WHITE' },
          { x: 3, y: 4, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 4 }],
        correctFeedback:
          '¡Perfecto! Con E5 tu muralla queda completamente cerrada y el territorio superior derecho permanece intacto.',
        wrongFeedback: {},
        defaultWrongFeedback:
          'Si no tapas la brecha entre E6 y E4, las piedras blancas penetrarán en tu territorio.',
        hints: [
          'Observa dónde la fila de piedras blancas amenaza con cruzar tu muro negro.',
          'Juega en E5, justo delante de la piedra blanca de D5.',
        ],
      },
      {
        id: 'l1-prac-3',
        prompt:
          'Ejercicio 3: En esta posición, ¿en qué región es más eficiente hacer territorio con menos piedras?',
        boardSize: 9,
        initialStones: [
          { x: 0, y: 2, color: 'BLACK' },
          { x: 1, y: 2, color: 'BLACK' },
          { x: 2, y: 2, color: 'BLACK' },
          { x: 2, y: 1, color: 'BLACK' },
          { x: 2, y: 0, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'MULTIPLE_CHOICE',
        options: [
          {
            id: 'esquina',
            text: 'En las esquinas, porque dos bordes del tablero sirven de muros gratis.',
            isCorrect: true,
            feedback: '¡Correcto! En la esquina dos lados ya están cerrados por el borde del tablero.',
          },
          {
            id: 'centro',
            text: 'En el centro, porque tienes que rodear por los cuatro lados.',
            isCorrect: false,
            feedback: 'En el centro necesitas rodear por los 4 lados, por lo que requiere muchas más piedras.',
          },
          {
            id: 'igual',
            text: 'Cuesta exactamente el mismo número de piedras en cualquier zona.',
            isCorrect: false,
            feedback: 'Los bordes ahorran piedras: Esquina > Lado > Centro en eficiencia territorial.',
          },
        ],
        correctFeedback: '¡Exacto! Las esquinas son las zonas más eficientes para asegurar territorio temprano.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Recuerda cuántos muros debes construir en la esquina (2) frente al centro (4).',
        hints: [
          'Cuenta cuántos lados de piedras tuviste que poner en la esquina superior izquierda.',
          'En la esquina los bordes del tablero hacen la mitad del trabajo.',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'Las piedras se colocan siempre en las intersecciones de las líneas (incluyendo bordes y esquinas), nunca dentro de los cuadros.',
        'Negro juega primero y luego ambos jugadores alternan colocando una piedra por turno; las piedras colocadas no se mueven.',
        'Gana quien controle más territorio (intersecciones vacías rodeadas); las esquinas son más eficientes para rodear puntos que los lados y el centro.',
      ],
      vocabulary: [
        {
          term: 'Goban',
          japanese: '碁盤',
          definition: 'El tablero de Go compuesto por una red de líneas que forman intersecciones.',
        },
        {
          term: 'Hoshi (Punto estrella)',
          japanese: '星',
          definition: 'Puntos de referencia visual marcados con un círculo discreto en el tablero.',
        },
        {
          term: 'Territorio (Jip / Ji)',
          japanese: '地',
          definition: 'Intersecciones vacías completamente rodeadas y protegidas por piedras de un mismo color.',
        },
      ],
    },
    transferQuestion: {
      id: 'l1-transfer',
      prompt:
        'Pregunta de transferencia: Blanco acaba de jugar cerca de tu muro en la esquina inferior derecha. ¿Dónde debe jugar Negro para cerrar su territorio de esquina en la primera línea inferior?',
      boardSize: 9,
      initialStones: [
        { x: 6, y: 8, color: 'WHITE' },
        { x: 6, y: 7, color: 'BLACK' },
        { x: 6, y: 6, color: 'BLACK' },
        { x: 7, y: 6, color: 'BLACK' },
        { x: 8, y: 6, color: 'BLACK' },
      ],
      turn: 'BLACK',
      exerciseType: 'PLACE_STONE',
      validCoords: [{ x: 7, y: 8 }],
      correctFeedback:
        '¡Dominado! Al bloquear en H1 (el borde inferior), Negro sella su esquina derecha e impide que la piedra blanca en G1 reduzca su territorio.',
      wrongFeedback: {},
      defaultWrongFeedback:
        'Busca la intersección del borde inferior (fila 1) que bloquea directamente a la piedra blanca y cierra la esquina.',
      hints: [
        'Mira la piedra blanca en el borde inferior (G1).',
        'Juega en H1 (justo a la derecha de la piedra blanca, en la primera línea).',
      ],
    },
  },
  {
    id: 'lesson-2-libertades-grupos',
    stageNumber: 1,
    stageTitle: '1. Reglas esenciales',
    unitNumber: 1,
    unitTitle: 'Libertades ortogonales y cadenas conectadas',
    title: 'Libertades y Grupos Conectados',
    subtitle: 'Descubre el aliento vital de cada piedra y cómo las conexiones ortogonales multiplican su fuerza.',
    estimatedMinutes: 6,
    xpReward: 20,
    prerequisites: ['lesson-1-tablero-turnos'],
    relatedPuzzleIds: [
      'puzzle-3-salvar-atari',
      'puzzle-5-conectar-corte',
      'puzzle-6-doble-atari',
      'puzzle-7-boca-tigre',
    ],
    observableObjective:
      'Al terminar, podrás contar con exactitud las libertades de piedras aisladas y grupos conectados, y distinguirás conexiones sólidas ortogonales de piedras en diagonal.',
    activationQuestion: {
      question:
        'Si colocas una piedra negra sola en el centro de un tablero vacío, ¿cuántas líneas salen directamente de ella hacia intersecciones vacías vecinas?',
      options: [
        {
          id: 'four-lib',
          text: 'Cuatro: arriba, abajo, izquierda y derecha.',
          isCorrect: true,
          explanation:
            '¡Correcto! Esos cuatro puntos vacíos ortogonalmente adyacentes son sus 4 libertades.',
        },
        {
          id: 'eight-lib',
          text: 'Ocho, contando también las cuatro diagonales.',
          isCorrect: false,
          explanation:
            'En Go las diagonales no tienen línea que las una. Solo cuentan las intersecciones conectadas directamente por las líneas (arriba, abajo, izquierda, derecha).',
        },
        {
          id: 'two-lib',
          text: 'Dos: solo horizontalmente.',
          isCorrect: false,
          explanation: 'Tanto las líneas horizontales como las verticales otorgan libertades.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. ¿Qué es una libertad?',
        body: 'Las libertades de una piedra son las intersecciones vacías inmediatamente adyacentes a ella siguiendo las líneas del tablero (arriba, abajo, izquierda y derecha). Una piedra en el centro empieza con 4 libertades; en el borde empieza con 3; y en la esquina extrema solo tiene 2.',
        deepDive:
          'En chino y japonés, el término para libertades significa literalmente "aliento" o "camino de vida" (Dàme / Kokyūten). Mientras un grupo tenga al menos un aliento libre, permanece vivo sobre el tablero.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 4, y: 4, color: 'BLACK' },
            { x: 4, y: 0, color: 'WHITE' },
            { x: 0, y: 8, color: 'BLACK' },
          ],
          markers: [
            { x: 4, y: 3, type: 'HIGHLIGHT', label: '1' },
            { x: 5, y: 4, type: 'HIGHLIGHT', label: '2' },
            { x: 4, y: 5, type: 'HIGHLIGHT', label: '3' },
            { x: 3, y: 4, type: 'HIGHLIGHT', label: '4' },
          ],
          caption: 'Centro (E5): 4 libertades. Borde superior (E9): 3 libertades. Esquina (A1): 2 libertades.',
        },
      },
      {
        title: '2. Grupos conectados y libertades compartidas',
        body: 'Cuando dos o más piedras del mismo color están en intersecciones adyacentes unidas por una línea ortogonal, forman un único grupo sólido. Todas las piedras de un grupo comparten sus libertades: viven o son capturadas juntas. Una intersección vacía adyacente a dos piedras del mismo grupo se cuenta una sola vez.',
        deepDive:
          'Conectar tus piedras es la forma más rápida de aumentar su resistencia. Una piedra aislada en el centro tiene 4 libertades, pero dos piedras conectadas tienen 6 libertades, y tres en línea recta tienen 8 libertades.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 4, color: 'BLACK' },
            { x: 4, y: 4, color: 'BLACK' },
          ],
          markers: [
            { x: 3, y: 3, type: 'HIGHLIGHT', label: '1' },
            { x: 4, y: 3, type: 'HIGHLIGHT', label: '2' },
            { x: 5, y: 4, type: 'HIGHLIGHT', label: '3' },
            { x: 4, y: 5, type: 'HIGHLIGHT', label: '4' },
            { x: 3, y: 5, type: 'HIGHLIGHT', label: '5' },
            { x: 2, y: 4, type: 'HIGHLIGHT', label: '6' },
          ],
          caption: 'Dos piedras negras conectadas en D5 y E5 forman un solo grupo con 6 libertades.',
        },
      },
      {
        title: '3. Las diagonales NO conectan directamente',
        body: 'Dos piedras colocadas en diagonal NO están conectadas en un mismo grupo porque no hay ninguna línea del tablero entre ellas. Si el rival juega en los dos puntos de corte entre ellas, quedan separadas y cada una debe defender sus propias libertades por separado.',
        deepDive:
          'Aunque la diagonal (Kosumi) no es una conexión directa, tácticamente permite conectar en el siguiente turno porque si el rival ocupa uno de los dos puntos de cruce, tú puedes ocupar el otro (principio de Miai).',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 4, color: 'WHITE' },
            { x: 4, y: 3, color: 'WHITE' },
            { x: 3, y: 3, color: 'BLACK' },
          ],
          markers: [{ x: 4, y: 4, type: 'CIRCLE', label: 'A' }],
          caption: 'Las dos piedras blancas están en diagonal. Si Blanco juega en A (E5), las conecta en un solo grupo.',
        },
      },
    ],
    demonstration: {
      title: 'Demostración: Cómo cambian las libertades al conectar y rodear',
      size: 9,
      steps: [
        {
          title: 'Una piedra aislada (4 libertades)',
          narration: 'Negro coloca una piedra en E5. Tiene 4 libertades alrededor (E6, F5, E4, D5).',
          stones: [{ x: 4, y: 4, color: 'BLACK' }],
          lastMove: { x: 4, y: 4 },
          turn: 'WHITE',
        },
        {
          title: 'Blanco reduce una libertad en E6',
          narration:
            'Blanco juega en E6, en contacto con Negro. Ahora la piedra negra solo tiene 3 libertades restantes (F5, E4 y D5).',
          stones: [
            { x: 4, y: 4, color: 'BLACK' },
            { x: 4, y: 3, color: 'WHITE' },
          ],
          lastMove: { x: 4, y: 3 },
          turn: 'BLACK',
        },
        {
          title: 'Negro extiende a D5 y forma un grupo',
          narration:
            'Negro responde jugando en D5, conectando sólidamente dos piedras. El grupo negro pasa de tener 3 libertades a tener 5 libertades.',
          stones: [
            { x: 4, y: 4, color: 'BLACK' },
            { x: 4, y: 3, color: 'WHITE' },
            { x: 3, y: 4, color: 'BLACK' },
          ],
          lastMove: { x: 3, y: 4 },
          turn: 'WHITE',
        },
        {
          title: 'Conexión contra intento de corte',
          narration:
            'Cuando tus piedras están separadas pero comparten una intersección vacía común, jugar en ese punto une ambos grupos y suma todas sus libertades.',
          stones: [
            { x: 4, y: 4, color: 'BLACK' },
            { x: 4, y: 3, color: 'WHITE' },
            { x: 3, y: 4, color: 'BLACK' },
            { x: 3, y: 3, color: 'WHITE' },
            { x: 5, y: 4, color: 'BLACK' },
          ],
          lastMove: { x: 5, y: 4 },
          turn: 'WHITE',
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l2-guided-1',
        prompt:
          'Las dos piedras negras en D5 y E6 están en diagonal y Blanco amenaza con separarlas jugando en D6. Juega con Negro para conectar sólidamente tus dos piedras en un único grupo.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 4, color: 'BLACK' },
          { x: 4, y: 3, color: 'BLACK' },
          { x: 3, y: 3, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 4 }],
        correctFeedback:
          '¡Excelente! Al jugar en E5, las tres piedras negras quedan unidas ortogonalmente en un grupo sólido de 7 libertades.',
        wrongFeedback: {},
        defaultWrongFeedback:
          'Para unir D5 y E6 por las líneas del tablero, debes colocar tu piedra en la intersección que toca a ambas (E5).',
        hints: [
          'Recuerda que las piedras solo se conectan siguiendo las líneas horizontales y verticales.',
          'Coloca tu piedra en E5 (debajo de E6 y a la derecha de D5).',
        ],
      },
    ],
    independentPractice: [
      {
        id: 'l2-prac-1',
        prompt:
          'Ejercicio 1: La piedra negra en D5 tiene solo 2 libertades porque está rodeada por dos piedras blancas. Extiende tu piedra hacia la derecha (E5) para aumentar tus libertades a 4.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 4, color: 'BLACK' },
          { x: 3, y: 3, color: 'WHITE' },
          { x: 2, y: 4, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 4 }, { x: 3, y: 5 }],
        correctFeedback:
          '¡Muy bien! Al extender hacia espacio abierto, tus dos piedras se conectan y ganan aire inmediatamente.',
        wrongFeedback: {},
        defaultWrongFeedback:
          'Juega en una de las libertades directas de la piedra negra (E5 o D4) para conectarte con ella y ganar libertades.',
        hints: [
          'Toca el botón "Capas: Libertades" si quieres ver las libertades actuales de D5.',
          'Juega en E5 o D4 para extender el grupo negro.',
        ],
      },
      {
        id: 'l2-prac-2',
        prompt:
          'Ejercicio 2: Negro tiene dos grupos separados (C5-D5 y F5-G5) y Blanco amenaza con partirlos por la mitad. Conéctalos en un solo grupo de 5 piedras.',
        boardSize: 9,
        initialStones: [
          { x: 2, y: 4, color: 'BLACK' },
          { x: 3, y: 4, color: 'BLACK' },
          { x: 5, y: 4, color: 'BLACK' },
          { x: 6, y: 4, color: 'BLACK' },
          { x: 4, y: 3, color: 'WHITE' },
          { x: 4, y: 5, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 4 }],
        correctFeedback:
          '¡Exacto! Jugando en E5 unes los dos segmentos en una sola cadena irrompible y separas a las dos piedras blancas.',
        wrongFeedback: {},
        defaultWrongFeedback:
          'Busca el único punto entre D5 y F5 donde ambos grupos negros se unen.',
        hints: [
          'Mira el punto vacío entre D5 y F5.',
          'Juega en E5 para conectar ambos lados.',
        ],
      },
      {
        id: 'l2-prac-3',
        prompt:
          'Ejercicio 3: Cuenta con cuidado. ¿Cuántas libertades tiene el grupo negro de dos piedras en la esquina superior izquierda (A9 y B9)?',
        boardSize: 9,
        initialStones: [
          { x: 0, y: 0, color: 'BLACK' },
          { x: 1, y: 0, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'MULTIPLE_CHOICE',
        options: [
          {
            id: 'three-libs',
            text: '3 libertades (A8, B8 y C9).',
            isCorrect: true,
            feedback: '¡Correcto! A8 debajo de A9, B8 debajo de B9 y C9 a la derecha de B9.',
          },
          {
            id: 'four-libs',
            text: '4 libertades, porque cada piedra de esquina aporta 2.',
            isCorrect: false,
            feedback: 'Al conectarse entre sí, A9 y B9 ocupan mutuamente una intersección vecina; en total suman 3 libertades libres.',
          },
          {
            id: 'two-libs',
            text: '2 libertades.',
            isCorrect: false,
            feedback: 'Cuenta las intersecciones vacías adyacentes: A8, B8 y C9 son 3 en total.',
          },
        ],
        correctFeedback: '¡Excelente conteo! En el borde y la esquina las libertades son escasas.',
        wrongFeedback: {},
        defaultWrongFeedback: 'Cuenta cada intersección vacía ortogonalmente vecina a A9 o B9.',
        hints: [
          'Revisa las intersecciones justo debajo de A9 y B9, más la que está a la derecha de B9.',
          'Son A8, B8 y C9: 3 libertades en total.',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'Las libertades son las intersecciones vacías ortogonalmente adyacentes a una piedra o grupo (4 en el centro, 3 en el borde, 2 en la esquina).',
        'Las piedras del mismo color adyacentes en horizontal o vertical forman un solo grupo y comparten todas sus libertades.',
        'Las piedras en diagonal no están conectadas directamente; necesitan una piedra puente en uno de los puntos adyacentes para unirse.',
      ],
      vocabulary: [
        {
          term: 'Libertad (Dame / Kokyūten)',
          japanese: '呼吸点',
          definition: 'Intersección vacía inmediatamente adyacente en horizontal o vertical a una piedra o grupo.',
        },
        {
          term: 'Conexión sólida (Nobi / Tsugi)',
          japanese: '継ぎ',
          definition: 'Unir piedras del mismo color en intersecciones ortogonalmente adyacentes para que formen una sola cadena.',
        },
        {
          term: 'Corte (Kiri)',
          japanese: '切り',
          definition: 'Jugada que ocupa el punto de conexión del rival para separar sus piedras en grupos independientes.',
        },
      ],
    },
    transferQuestion: {
      id: 'l2-transfer',
      prompt:
        'Pregunta de transferencia: Blanco quiere cortar tus piedras negras en el lado derecho. ¿Dónde debe jugar Negro ahora mismo para conectar sus dos grupos y proteger su punto débil?',
      boardSize: 9,
      initialStones: [
        { x: 6, y: 2, color: 'BLACK' },
        { x: 6, y: 3, color: 'BLACK' },
        { x: 7, y: 4, color: 'BLACK' },
        { x: 7, y: 3, color: 'WHITE' },
        { x: 5, y: 4, color: 'WHITE' },
      ],
      turn: 'BLACK',
      exerciseType: 'PLACE_STONE',
      validCoords: [{ x: 6, y: 4 }],
      correctFeedback:
        '¡Dominado! Al jugar en G5 conectas las piedras superiores (G7-G6) con H5, formando un grupo sólido de 4 piedras.',
      wrongFeedback: {},
      defaultWrongFeedback:
        'Busca la intersección que toca simultáneamente a G6 y a H5 para unirlas.',
      hints: [
        'Observa que G6 y H5 están en diagonal y Blanco tiene piedras listas para cortar.',
        'Juega en G5 para conectar sólidamente todo el grupo negro.',
      ],
    },
  },
  {
    id: 'lesson-3-atari-captura',
    stageNumber: 1,
    stageTitle: '1. Reglas esenciales',
    unitNumber: 2,
    unitTitle: 'Atari, captura de cadenas y suicidio ilegal',
    title: 'Atari, Captura, Suicidio y Regla de Ko',
    subtitle: 'Aprende a dar el golpe final a grupos sin libertades, escapar del peligro y respetar las leyes de suicidio y Ko.',
    estimatedMinutes: 7,
    xpReward: 20,
    prerequisites: ['lesson-2-libertades-grupos'],
    relatedPuzzleIds: [
      'puzzle-1-captura-centro',
      'puzzle-4-capturar-cadena',
      'puzzle-8-evitar-suicidio',
      'puzzle-9-captura-ojo',
      'puzzle-10-iniciar-ko',
    ],
    observableObjective:
      'Al terminar, podrás identificar grupos en atari (1 libertad), ejecutar capturas simples y múltiples, distinguir una jugada ilegal por suicidio de una captura legal, y aplicar la regla de Ko.',
    activationQuestion: {
      question:
        'Si una piedra blanca tiene 3 de sus 4 libertades ocupadas por piedras negras, solo le queda 1 libertad. ¿Qué ocurre si es el turno de Negro y coloca una piedra en esa última libertad?',
      options: [
        {
          id: 'captured-removed',
          text: 'La piedra blanca pierde su última libertad, es capturada y se retira inmediatamente del tablero.',
          isCorrect: true,
          explanation:
            '¡Exacto! Cuando un grupo se queda con 0 libertades, es capturado de inmediato y pasa a ser prisionero del jugador que lo rodeó.',
        },
        {
          id: 'stays-paralyzed',
          text: 'La piedra blanca queda bloqueada pero permanece sobre el tablero hasta el final.',
          isCorrect: false,
          explanation:
            'En Go las piedras con 0 libertades se retiran del tablero inmediatamente, dejando libre esa intersección.',
        },
        {
          id: 'illegal-move',
          text: 'Negro no tiene permitido ocupar la última libertad.',
          isCorrect: false,
          explanation: 'Al contrario: ocupar la última libertad del rival es precisamente cómo se captura en Go.',
        },
      ],
    },
    conceptSteps: [
      {
        title: '1. Atari y Captura',
        body: 'Cuando a una piedra o grupo le queda exactamente 1 libertad, decimos que está en Atari (amenaza inmediata de captura). Si el atacante ocupa esa última libertad en su siguiente jugada, todas las piedras de ese grupo quedan con 0 libertades y se retiran del tablero como prisioneros.',
        deepDive:
          'A diferencia del jaque en ajedrez, en Go no es obligatorio avisar en voz alta "¡Atari!" en partidas avanzadas, ni tampoco estás obligado por reglamento a defender una piedra en atari si prefieres jugar una jugada más valiosa en otra parte del tablero.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 4, y: 4, color: 'WHITE' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 3, y: 4, color: 'BLACK' },
            { x: 5, y: 4, color: 'BLACK' },
          ],
          markers: [{ x: 4, y: 5, type: 'DANGER', label: 'A' }],
          caption: 'La piedra blanca en E5 está en Atari. Si Negro juega en A (E4), la captura; si juega Blanco en A, escapa.',
        },
      },
      {
        title: '2. Prohibición de Suicidio (y la excepción de captura)',
        body: 'No puedes colocar una piedra en una intersección donde tu propio grupo quede inmediatamente con 0 libertades: eso se llama suicidio y es ilegal. Sin embargo, hay una excepción crucial: si tu jugada quita primero la última libertad de un grupo enemigo y lo captura, las piedras enemigas se retiran primero y tu piedra gana esas libertades.',
        deepDive:
          'El orden en que el motor evalúa cada jugada es siempre: 1º Colocar la piedra; 2º Retirar grupos rivales que hayan quedado con 0 libertades; 3º Comprobar si tu propio grupo tiene al menos 1 libertad. Por eso capturar hacia adentro de un ojo enemigo en atari es 100% legal.',
        boardIllustration: {
          size: 9,
          stones: [
            { x: 3, y: 3, color: 'BLACK' },
            { x: 5, y: 3, color: 'BLACK' },
            { x: 4, y: 2, color: 'BLACK' },
            { x: 4, y: 4, color: 'BLACK' },
          ],
          markers: [{ x: 4, y: 3, type: 'DANGER', label: 'X' }],
          caption: 'Blanco NO puede jugar en X (E6) porque quedaría con 0 libertades y las piedras negras tienen libertades exteriores.',
        },
      },
      {
        title: '3. La Regla de Ko (Eternidad)',
        body: 'En ciertas formas tácticas llamadas Ko, Negro captura una piedra blanca, pero la piedra negra que acaba de capturar queda a su vez en atari de una sola piedra. Si Blanco pudiera recapturarla de inmediato, el tablero volvería exactamente a la posición anterior en un bucle infinito. La Regla de Ko prohíbe la recaptura inmediata: debes hacer al menos una jugada en otro lugar (una amenaza de Ko) antes de poder recapturar.',
        deepDive:
          'En japonés, "Ko" (劫) proviene de un término budista que significa "eón" o "eternidad". Además del Ko simple, Camino de Go implementa Superko Posicional para garantizar que ninguna posición previa del tablero pueda repetirse jamás.',
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
          markers: [{ x: 4, y: 4, type: 'CIRCLE', label: 'Ko' }],
          caption: 'Posición clásica de Ko: tras capturar Negro en F5, Blanco no puede recapturar en E5 inmediatamente.',
        },
      },
    ],
    demonstration: {
      title: 'Demostración: Atari, Escape, Captura de Grupo y Ko',
      size: 9,
      steps: [
        {
          title: 'Piedra blanca en Atari',
          narration:
            'La piedra blanca en E5 está rodeada por tres lados (E6, D5 y F5). Solo le queda una libertad abajo en E4: está en Atari.',
          stones: [
            { x: 4, y: 4, color: 'WHITE' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 3, y: 4, color: 'BLACK' },
            { x: 5, y: 4, color: 'BLACK' },
          ],
          markers: [{ x: 4, y: 5, type: 'DANGER', label: '!' }],
          turn: 'WHITE',
        },
        {
          title: 'Blanco escapa extendiendo en E4',
          narration:
            'Como es el turno de Blanco, juega en E4. Ahora las dos piedras blancas están conectadas y tienen 3 libertades (D4, F4 y E3). Ya no están en atari.',
          stones: [
            { x: 4, y: 4, color: 'WHITE' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 3, y: 4, color: 'BLACK' },
            { x: 5, y: 4, color: 'BLACK' },
            { x: 4, y: 5, color: 'WHITE' },
          ],
          lastMove: { x: 4, y: 5 },
          turn: 'BLACK',
        },
        {
          title: 'Negro vuelve a rodear al grupo de dos piedras',
          narration:
            'Si Blanco se distrae jugando en otra parte y Negro ocupa D4 y F4, el grupo entero de dos piedras blancas vuelve a quedar en atari con una sola libertad en E3.',
          stones: [
            { x: 4, y: 4, color: 'WHITE' },
            { x: 4, y: 5, color: 'WHITE' },
            { x: 4, y: 3, color: 'BLACK' },
            { x: 3, y: 4, color: 'BLACK' },
            { x: 5, y: 4, color: 'BLACK' },
            { x: 3, y: 5, color: 'BLACK' },
            { x: 5, y: 5, color: 'BLACK' },
          ],
          markers: [{ x: 4, y: 6, type: 'DANGER', label: '!' }],
          turn: 'BLACK',
        },
        {
          title: 'Captura del grupo en E3',
          narration:
            'Negro juega en E3, tapando la última libertad. Las dos piedras blancas desaparecen del tablero y suman 2 prisioneros para Negro.',
          stones: [
            { x: 4, y: 3, color: 'BLACK' },
            { x: 3, y: 4, color: 'BLACK' },
            { x: 5, y: 4, color: 'BLACK' },
            { x: 3, y: 5, color: 'BLACK' },
            { x: 5, y: 5, color: 'BLACK' },
            { x: 4, y: 6, color: 'BLACK' },
          ],
          lastMove: { x: 4, y: 6 },
          markers: [
            { x: 4, y: 4, type: 'CIRCLE' },
            { x: 4, y: 5, type: 'CIRCLE' },
          ],
          turn: 'WHITE',
        },
      ],
    },
    guidedDecisions: [
      {
        id: 'l3-guided-1',
        prompt:
          'Tanto una piedra negra (D5) como una piedra blanca (E5) están en atari. Es el turno de Negro: captura la piedra blanca antes de que Blanco te capture a ti.',
        boardSize: 9,
        initialStones: [
          { x: 3, y: 4, color: 'BLACK' },
          { x: 4, y: 4, color: 'WHITE' },
          { x: 3, y: 3, color: 'WHITE' },
          { x: 2, y: 4, color: 'WHITE' },
          { x: 4, y: 3, color: 'BLACK' },
          { x: 5, y: 4, color: 'BLACK' },
          { x: 3, y: 5, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 5 }],
        correctFeedback:
          '¡Bien visto! Al capturar la piedra blanca en E4, no solo ganas un prisionero sino que tu piedra en D5 deja de estar en atari.',
        wrongFeedback: {},
        defaultWrongFeedback:
          'Observa cuál es la única libertad que le queda a la piedra blanca de E5 y ocúpala.',
        hints: [
          'La piedra blanca en E5 está rodeada por E6, F5 y D5.',
          'Su única libertad está abajo, en E4. Juega ahí para capturarla.',
        ],
      },
    ],
    independentPractice: [
      {
        id: 'l3-prac-1',
        prompt:
          'Ejercicio 1: Tres piedras negras en la esquina superior derecha están en atari, pero la piedra blanca de la esquina extrema (J9) también está en atari. ¡Captúrala para salvar tus piedras!',
        boardSize: 9,
        initialStones: [
          { x: 8, y: 0, color: 'WHITE' },
          { x: 7, y: 0, color: 'BLACK' },
          { x: 7, y: 1, color: 'BLACK' },
          { x: 6, y: 0, color: 'WHITE' },
          { x: 6, y: 1, color: 'WHITE' },
          { x: 7, y: 2, color: 'WHITE' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 8, y: 1 }],
        correctFeedback:
          '¡Exacto! En la esquina extrema una piedra solo tiene 2 libertades. Jugando en J8 capturas la piedra blanca de J9 y salvas tu grupo.',
        wrongFeedback: {},
        defaultWrongFeedback:
          'Mira la piedra blanca en la esquina superior derecha (J9). Solo le queda una libertad en J8.',
        hints: [
          'La piedra blanca en J9 tiene ocupada H9.',
          'Su única libertad restante es J8 (borde derecho, segunda fila desde arriba).',
        ],
      },
      {
        id: 'l3-prac-2',
        prompt:
          'Ejercicio 2 (Suicidio aparente vs Captura): Parece que el punto E5 no tiene libertades, pero las dos piedras blancas de E6 y F5 están en atari. Juega en E5 para comprobar que la captura es legal.',
        boardSize: 9,
        initialStones: [
          { x: 4, y: 3, color: 'WHITE' },
          { x: 5, y: 4, color: 'WHITE' },
          { x: 3, y: 4, color: 'WHITE' },
          { x: 4, y: 5, color: 'WHITE' },
          { x: 4, y: 2, color: 'BLACK' },
          { x: 3, y: 3, color: 'BLACK' },
          { x: 5, y: 3, color: 'BLACK' },
          { x: 6, y: 4, color: 'BLACK' },
          { x: 5, y: 5, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 4 }],
        correctFeedback:
          '¡Perfecto! Aunque E5 estaba rodeado por 4 piedras blancas, al jugar allí quitaste la última libertad de E6 y F5, capturándolas al instante.',
        wrongFeedback: {},
        defaultWrongFeedback:
          'Haz clic en el punto central E5: no es suicidio porque captura a las piedras blancas en atari.',
        hints: [
          'Revisa las libertades de las piedras blancas en E6 y F5: su única libertad es E5.',
          'Coloca tu piedra negra en E5 para capturarlas.',
        ],
      },
      {
        id: 'l3-prac-3',
        prompt:
          'Ejercicio 3 (Doble Atari): Encuentra la intersección donde una sola piedra negra pone a DOS piedras blancas en atari al mismo tiempo.',
        boardSize: 9,
        initialStones: [
          { x: 4, y: 3, color: 'WHITE' },
          { x: 5, y: 4, color: 'WHITE' },
          { x: 4, y: 2, color: 'BLACK' },
          { x: 6, y: 4, color: 'BLACK' },
        ],
        turn: 'BLACK',
        exerciseType: 'PLACE_STONE',
        validCoords: [{ x: 4, y: 4 }],
        correctFeedback:
          '¡Brillante! Eso es un Doble Atari en E5: tanto la piedra blanca de E6 como la de F5 quedan con 1 sola libertad, así que capturarás una de las dos sin importar cómo responda Blanco.',
        wrongFeedback: {},
        defaultWrongFeedback:
          'Busca el punto de contacto que reduce las libertades de E6 y de F5 simultáneamente.',
        hints: [
          'Ambas piedras blancas tienen ya bloqueada una libertad exterior (E7 y G5).',
          'Juega en E5 para atacar a las dos piedras blancas a la vez.',
        ],
      },
    ],
    summary: {
      keyIdeas: [
        'Un grupo con 1 sola libertad está en Atari; si pierde esa última libertad, es capturado y retirado del tablero.',
        'El suicidio (quedar con 0 libertades sin capturar nada) es ilegal, pero jugar en un punto sin libertades ES legal si esa jugada captura piedras rivales.',
        'La Regla de Ko impide recapturar inmediatamente cuando ello repetiría la posición previa del tablero; antes debes jugar una amenaza en otro lugar.',
      ],
      vocabulary: [
        {
          term: 'Atari',
          japanese: 'アタリ',
          definition: 'Estado de alerta en el que una piedra o grupo tiene exactamente 1 libertad restante.',
        },
        {
          term: 'Doble Atari (Ryo-atari)',
          japanese: '両アタリ',
          definition: 'Jugada táctica que amenaza simultáneamente a dos grupos rivales dejándolos con 1 libertad a cada uno.',
        },
        {
          term: 'Ko',
          japanese: '劫',
          definition: 'Regla que prohíbe repetir la posición inmediata anterior del tablero mediante recapturas infinitas.',
        },
      ],
    },
    transferQuestion: {
      id: 'l3-transfer',
      prompt:
        'Pregunta de transferencia: Tu grupo negro de dos piedras (D4-E4) acaba de quedar en atari por la jugada blanca en D3. ¿Cuál es la única jugada que salva a tus dos piedras?',
      boardSize: 9,
      initialStones: [
        { x: 3, y: 5, color: 'BLACK' },
        { x: 4, y: 5, color: 'BLACK' },
        { x: 3, y: 4, color: 'WHITE' },
        { x: 4, y: 4, color: 'WHITE' },
        { x: 2, y: 5, color: 'WHITE' },
        { x: 3, y: 6, color: 'WHITE' },
        { x: 4, y: 6, color: 'WHITE' },
      ],
      turn: 'BLACK',
      exerciseType: 'PLACE_STONE',
      validCoords: [{ x: 5, y: 5 }],
      correctFeedback:
        '¡Dominado! Al extender hacia F4 tu grupo escapa del atari y alcanza 3 libertades nuevas en espacio abierto.',
      wrongFeedback: {},
      defaultWrongFeedback:
        'Tus dos piedras en D4 y E4 solo tienen una libertad restante hacia la derecha. Juega allí para salvarlas.',
      hints: [
        'Observa qué única intersección adyacente al par negro D4-E4 sigue vacía.',
        'Juega en F4 para escapar del atari.',
      ],
    },
  },
  ...EXPANDED_LESSONS_CATALOG,
  ...ATTACK_DEFENSE_LESSONS_CATALOG,
  ...TESUJI_LESSONS_PART1_CATALOG,
  ...TESUJI_LESSONS_PART2_CATALOG,
  ...KAGEYAMA_LESSONS_CATALOG,
];

// Sort strictly by difficulty stage (stageNumber) and unit (unitNumber),
// and chain prerequisites sequentially so Lesson i+1 unlocks only when Lesson i is completed.
const SORTED_LESSONS = [...RAW_LESSONS_CATALOG].sort((a, b) => {
  if (a.stageNumber !== b.stageNumber) {
    return a.stageNumber - b.stageNumber;
  }
  return a.unitNumber - b.unitNumber;
});

export const LESSONS_CATALOG: LessonContent[] = SORTED_LESSONS.map((lesson, idx, arr) => ({
  ...lesson,
  prerequisites: idx === 0 ? [] : [arr[idx - 1].id],
}));

export const DEMO_MINI_GAME_9X9: DemoStep[] = [
  {
    title: '1. Negro F6 · 2. Blanco D4',
    narration:
      'Bienvenido a una partida comentada en 9×9. Negro comienza cerca del centro-derecha (F6) y Blanco responde en el lado opuesto (D4), reclamando influencia central y esquinas.',
    stones: [
      { x: 5, y: 3, color: 'BLACK' },
      { x: 3, y: 5, color: 'WHITE' },
    ],
    lastMove: { x: 3, y: 5 },
    turn: 'BLACK',
  },
  {
    title: '3. Negro D6 · 4. Blanco F4',
    narration:
      'Negro se extiende a D6 para controlar la mitad superior del tablero. Blanco responde en F4 equilibrando la mitad inferior.',
    stones: [
      { x: 5, y: 3, color: 'BLACK' },
      { x: 3, y: 5, color: 'WHITE' },
      { x: 3, y: 3, color: 'BLACK' },
      { x: 5, y: 5, color: 'WHITE' },
    ],
    lastMove: { x: 5, y: 5 },
    turn: 'BLACK',
  },
  {
    title: '5. Negro E5 (Contacto central) · 6. Blanco E4',
    narration:
      'Negro juega en el centro E5 para conectar sus dos piedras superiores. Blanco defiende sólidamente en E4 formando un muro inferior.',
    stones: [
      { x: 5, y: 3, color: 'BLACK' },
      { x: 3, y: 5, color: 'WHITE' },
      { x: 3, y: 3, color: 'BLACK' },
      { x: 5, y: 5, color: 'WHITE' },
      { x: 4, y: 4, color: 'BLACK' },
      { x: 4, y: 5, color: 'WHITE' },
    ],
    lastMove: { x: 4, y: 5 },
    turn: 'BLACK',
  },
  {
    title: '7. Negro C5 · 8. Blanco C4',
    narration:
      'Ambos jugadores extienden sus muros hacia el borde izquierdo. Observa cómo se define la frontera entre el territorio superior (Negro) y el inferior (Blanco).',
    stones: [
      { x: 5, y: 3, color: 'BLACK' },
      { x: 3, y: 5, color: 'WHITE' },
      { x: 3, y: 3, color: 'BLACK' },
      { x: 5, y: 5, color: 'WHITE' },
      { x: 4, y: 4, color: 'BLACK' },
      { x: 4, y: 5, color: 'WHITE' },
      { x: 2, y: 4, color: 'BLACK' },
      { x: 2, y: 5, color: 'WHITE' },
    ],
    lastMove: { x: 2, y: 5 },
    turn: 'BLACK',
  },
  {
    title: '9. Negro G5 · 10. Blanco G4',
    narration:
      'Ahora la frontera se extiende hacia el lado derecho: Negro refuerza G5 y Blanco bloquea en G4.',
    stones: [
      { x: 5, y: 3, color: 'BLACK' },
      { x: 3, y: 5, color: 'WHITE' },
      { x: 3, y: 3, color: 'BLACK' },
      { x: 5, y: 5, color: 'WHITE' },
      { x: 4, y: 4, color: 'BLACK' },
      { x: 4, y: 5, color: 'WHITE' },
      { x: 2, y: 4, color: 'BLACK' },
      { x: 2, y: 5, color: 'WHITE' },
      { x: 6, y: 4, color: 'BLACK' },
      { x: 6, y: 5, color: 'WHITE' },
    ],
    lastMove: { x: 6, y: 5 },
    turn: 'BLACK',
  },
  {
    title: '11. Negro B4 (Hane en el borde) · 12. Blanco B3',
    narration:
      'En el final de partida (Yose), Negro gira en B4 (Hane) amenazando reducir la esquina blanca. Blanco bloquea con calma en B3.',
    stones: [
      { x: 5, y: 3, color: 'BLACK' },
      { x: 3, y: 5, color: 'WHITE' },
      { x: 3, y: 3, color: 'BLACK' },
      { x: 5, y: 5, color: 'WHITE' },
      { x: 4, y: 4, color: 'BLACK' },
      { x: 4, y: 5, color: 'WHITE' },
      { x: 2, y: 4, color: 'BLACK' },
      { x: 2, y: 5, color: 'WHITE' },
      { x: 6, y: 4, color: 'BLACK' },
      { x: 6, y: 5, color: 'WHITE' },
      { x: 1, y: 5, color: 'BLACK' },
      { x: 1, y: 6, color: 'WHITE' },
    ],
    lastMove: { x: 1, y: 6 },
    turn: 'BLACK',
  },
  {
    title: '13. Negro B5 (Conexión necesaria) · 14. Blanco H5',
    narration:
      'La piedra negra en B4 había quedado con pocas libertades, por lo que Negro conecta sólidamente en B5. Blanco aprovecha la iniciativa (Sente) para avanzar en H5 por la derecha.',
    stones: [
      { x: 5, y: 3, color: 'BLACK' },
      { x: 3, y: 5, color: 'WHITE' },
      { x: 3, y: 3, color: 'BLACK' },
      { x: 5, y: 5, color: 'WHITE' },
      { x: 4, y: 4, color: 'BLACK' },
      { x: 4, y: 5, color: 'WHITE' },
      { x: 2, y: 4, color: 'BLACK' },
      { x: 2, y: 5, color: 'WHITE' },
      { x: 6, y: 4, color: 'BLACK' },
      { x: 6, y: 5, color: 'WHITE' },
      { x: 1, y: 5, color: 'BLACK' },
      { x: 1, y: 6, color: 'WHITE' },
      { x: 1, y: 4, color: 'BLACK' },
      { x: 7, y: 4, color: 'WHITE' },
    ],
    lastMove: { x: 7, y: 4 },
    turn: 'BLACK',
  },
  {
    title: '15. Negro H6 · 16. Blanco A4 · Cierre de bordes',
    narration:
      'Ambos jugadores aseguran los flancos exteriores en primera y segunda línea (Negro en H6 y A5; Blanco en A4 y J5) para impedir invasiones laterales.',
    stones: [
      { x: 5, y: 3, color: 'BLACK' },
      { x: 3, y: 5, color: 'WHITE' },
      { x: 3, y: 3, color: 'BLACK' },
      { x: 5, y: 5, color: 'WHITE' },
      { x: 4, y: 4, color: 'BLACK' },
      { x: 4, y: 5, color: 'WHITE' },
      { x: 2, y: 4, color: 'BLACK' },
      { x: 2, y: 5, color: 'WHITE' },
      { x: 6, y: 4, color: 'BLACK' },
      { x: 6, y: 5, color: 'WHITE' },
      { x: 1, y: 5, color: 'BLACK' },
      { x: 1, y: 6, color: 'WHITE' },
      { x: 1, y: 4, color: 'BLACK' },
      { x: 7, y: 4, color: 'WHITE' },
      { x: 7, y: 3, color: 'BLACK' },
      { x: 0, y: 5, color: 'WHITE' },
      { x: 0, y: 4, color: 'BLACK' },
      { x: 8, y: 4, color: 'WHITE' },
      { x: 8, y: 3, color: 'BLACK' },
    ],
    lastMove: { x: 8, y: 3 },
    turn: 'WHITE',
  },
  {
    title: '17. Sellado de puntos de corte (D5, F5, C3 y H4)',
    narration:
      'Antes de pasar turno, ambos jugadores refuerzan los últimos puntos de corte en el centro (Negro en D5 y F5; Blanco en C3, H4 y J4) dejando las fronteras completamente selladas.',
    stones: [
      { x: 5, y: 3, color: 'BLACK' },
      { x: 3, y: 5, color: 'WHITE' },
      { x: 3, y: 3, color: 'BLACK' },
      { x: 5, y: 5, color: 'WHITE' },
      { x: 4, y: 4, color: 'BLACK' },
      { x: 4, y: 5, color: 'WHITE' },
      { x: 2, y: 4, color: 'BLACK' },
      { x: 2, y: 5, color: 'WHITE' },
      { x: 6, y: 4, color: 'BLACK' },
      { x: 6, y: 5, color: 'WHITE' },
      { x: 1, y: 5, color: 'BLACK' },
      { x: 1, y: 6, color: 'WHITE' },
      { x: 1, y: 4, color: 'BLACK' },
      { x: 7, y: 4, color: 'WHITE' },
      { x: 7, y: 3, color: 'BLACK' },
      { x: 0, y: 5, color: 'WHITE' },
      { x: 0, y: 4, color: 'BLACK' },
      { x: 8, y: 4, color: 'WHITE' },
      { x: 8, y: 3, color: 'BLACK' },
      { x: 2, y: 6, color: 'WHITE' },
      { x: 3, y: 4, color: 'BLACK' },
      { x: 7, y: 5, color: 'WHITE' },
      { x: 5, y: 4, color: 'BLACK' },
      { x: 8, y: 5, color: 'WHITE' },
    ],
    lastMove: { x: 8, y: 5 },
    turn: 'BLACK',
  },
  {
    title: 'Fin de la Partida · Victoria de Negro (+2.5 pts)',
    narration:
      '¡Partida terminada! Ambos jugadores pasan turno consecutivamente al no quedar jugadas útiles. Negro asegura 32 puntos de territorio en el norte (12 piedras = 44.0 pts de Área) frente a los 24 puntos de territorio de Blanco en el sur (+12 piedras + 5.5 de Komi = 41.5 pts de Área). ¡Gana Negro por +2.5 puntos!',
    stones: [
      { x: 5, y: 3, color: 'BLACK' },
      { x: 3, y: 5, color: 'WHITE' },
      { x: 3, y: 3, color: 'BLACK' },
      { x: 5, y: 5, color: 'WHITE' },
      { x: 4, y: 4, color: 'BLACK' },
      { x: 4, y: 5, color: 'WHITE' },
      { x: 2, y: 4, color: 'BLACK' },
      { x: 2, y: 5, color: 'WHITE' },
      { x: 6, y: 4, color: 'BLACK' },
      { x: 6, y: 5, color: 'WHITE' },
      { x: 1, y: 5, color: 'BLACK' },
      { x: 1, y: 6, color: 'WHITE' },
      { x: 1, y: 4, color: 'BLACK' },
      { x: 7, y: 4, color: 'WHITE' },
      { x: 7, y: 3, color: 'BLACK' },
      { x: 0, y: 5, color: 'WHITE' },
      { x: 0, y: 4, color: 'BLACK' },
      { x: 8, y: 4, color: 'WHITE' },
      { x: 8, y: 3, color: 'BLACK' },
      { x: 2, y: 6, color: 'WHITE' },
      { x: 3, y: 4, color: 'BLACK' },
      { x: 7, y: 5, color: 'WHITE' },
      { x: 5, y: 4, color: 'BLACK' },
      { x: 8, y: 5, color: 'WHITE' },
    ],
    lastMove: undefined,
    turn: 'BLACK',
  },
];

export const GO_GLOSSARY: VocabularyTerm[] = [
  {
    term: 'Atari',
    japanese: 'アタリ',
    definition: 'Situación en la que una piedra o grupo tiene una sola libertad restante y puede ser capturado en el turno siguiente.',
  },
  {
    term: 'Goban',
    japanese: '碁盤',
    definition: 'El tablero tradicional de Go (9×9, 13×13 o 19×19 líneas).',
  },
  {
    term: 'Hoshi',
    japanese: '星',
    definition: 'Puntos estrella marcados en el tablero para orientar la vista y las aperturas.',
  },
  {
    term: 'Ko',
    japanese: '劫',
    definition: 'Regla que prohíbe recapturar inmediatamente una piedra si eso repite la posición exacta anterior del tablero.',
  },
  {
    term: 'Komi',
    japanese: 'コミ',
    definition: 'Puntos de compensación otorgados a Blanco por jugar en segundo lugar (habitualmente 5.5 o 6.5 puntos).',
  },
  {
    term: 'Libertad (Kokyūten)',
    japanese: '呼吸点',
    definition: 'Intersección vacía inmediatamente adyacente en línea recta (ortogonal) a una piedra o grupo.',
  },
  {
    term: 'Ojo (Me)',
    japanese: '眼',
    definition: 'Espacio vacío interno rodeado por un mismo grupo donde el rival no puede jugar sin cometer suicidio.',
  },
  {
    term: 'Sente y Gote',
    japanese: '先手 / 後手',
    definition: 'Sente es conservar la iniciativa para elegir dónde jugar después; Gote es perder la iniciativa al tener que responder o cerrar una jugada.',
  },
  {
    term: 'Tesuji',
    japanese: '手筋',
    definition: 'La jugada táctica más hábil y eficiente en una posición local (como escalera, red o snapback).',
  },
  {
    term: 'Yose',
    japanese: 'ヨセ',
    definition: 'Fase final de la partida en la que se cierran las fronteras de los territorios antes del conteo.',
  },
  {
    term: 'Atsui / Atsumi (Grosor)',
    japanese: '厚い / 厚み',
    definition: 'Posición fuerte y sólida sin defectos ni puntos de corte que proyecta poder hacia todo el tablero (Ishida Cap. 1).',
  },
  {
    term: 'Motare (Ataque de apoyo)',
    japanese: 'モタレ攻め',
    definition: 'Apoyarse y presionar contra un grupo enemigo para ganar fuerza antes de atacar al verdadero objetivo (Ishida Cap. 2).',
  },
  {
    term: 'Karami (Ataque doble / de división)',
    japanese: 'カラミ攻め',
    definition: 'Separar y amenazar simultáneamente a dos grupos débiles del oponente ("Divide y vencerás", Ishida Cap. 2).',
  },
  {
    term: 'Boshi (Ataque de sombrero)',
    japanese: '帽子',
    definition: 'Jugada de ataque o reducción a un espacio sobre la cabeza de una piedra enemiga para frenar su avance al centro (Ishida Cap. 3 y 7).',
  },
  {
    term: 'Nozoki (Asomo)',
    japanese: 'ノゾキ',
    definition: 'Amenazar directamente una conexión enemiga para forzarla a conectarse con mala forma o contenerla (Ishida Cap. 3).',
  },
  {
    term: 'Tsuke y Kata-tsuki (Contacto y Golpe al hombro)',
    japanese: 'ツケ / 肩ツキ',
    definition: 'Recursos esenciales para defender grupos en emergencia o reducir grandes marcos con elasticidad (Ishida Cap. 4 y 7).',
  },
  {
    term: 'Kikashi (Jugada forzante)',
    japanese: '利かし',
    definition: 'Jugada coercitiva en Sente que deja potencial útil y cuya piedra se trata como desechable (Ishida Cap. 5).',
  },
  {
    term: 'Warikomi (Cuña)',
    japanese: '割り込み',
    definition: 'Tesuji que inserta una piedra entre dos piedras enemigas amenazando doble corte (Ishida Cap. 8).',
  },
  {
    term: 'Hanami Ko (Ko de picnic)',
    japanese: '花見コウ',
    definition: 'Ko unilateral en el que quien lo inicia casi no arriesga nada si lo pierde, pero gana enormemente si vence (Ishida Cap. 9).',
  },
  {
    term: 'Yurumi-shicho (Escalera floja)',
    japanese: '緩みシチョウ',
    definition: 'Persecución de un grupo con dos libertades donde el atacante encierra en lugar de dar atari constante (Davies Cap. 2).',
  },
  {
    term: 'Hasami-tsuke (Tesuji de Pinza)',
    japanese: 'ハサミツケ',
    definition: 'Contacto en pinza sobre el flanco de una piedra enemiga para rescatar piedras propias o destruir ojos en la segunda línea (Davies Cap. 2 y 11).',
  },
  {
    term: 'Hana-tsuke (Tesuji de la Nariz)',
    japanese: '鼻ツケ',
    definition: 'Contacto frontal directo en la punta o "nariz" de dos piedras enemigas alineadas (Davies Cap. 2 y 6).',
  },
  {
    term: 'Shibori (Exprimir)',
    japanese: '絞り',
    definition: 'Secuencia de sacrificio táctico que obliga al rival a capturar piedras convirtiéndose en una masa sin libertades y sella el exterior en Sente (Davies Cap. 3 y 13).',
  },
  {
    term: 'Oki (Colocación)',
    japanese: '置き',
    definition: 'Depositar una piedra a distancia en el punto vital del borde o del espacio ocular enemigo sin contacto previo (Davies Cap. 3 y 8).',
  },
  {
    term: 'Hara-tsuke (Tesuji al estómago)',
    japanese: '腹ツケ',
    definition: 'Contacto lateral en el centro ("estómago") de una fila de tres piedras enemigas en el borde para ganar libertades o cruzar (Davies Cap. 5 y 8).',
  },
  {
    term: 'Gyaku-atari (Contra-Atari)',
    japanese: '逆アタリ',
    definition: 'Ignorar la amenaza sobre una piedra propia para dar atari inmediato a una piedra de corte o grupo más importante del rival (Davies Cap. 14).',
  },
  {
    term: 'Hiki (Retroceso)',
    japanese: '引き',
    definition: 'Retirar o extender una piedra amenazada hacia tu propio bando; a menudo captura la piedra de corte rival sin permitir contra-atari (Davies Cap. 11).',
  },
  {
    term: 'Oikomi (Tesuji de Conducción)',
    japanese: '追い込み',
    definition: 'Jugada que dirige al grupo enemigo hacia una casilla donde sus propias libertades se agotan (Damezumari) (Davies Cap. 13).',
  },
  {
    term: 'Sennen-ko (Ko de Mil Años)',
    japanese: '千年コウ',
    definition: 'Posición de Semeai latente donde quien inicia el Ko primero queda en desventaja, derivando a menudo en Seki (Davies Cap. 15).',
  },
  {
    term: 'Honte (Jugada propia / auténtica)',
    japanese: '本手',
    definition: 'La jugada honesta, sólida y sin trucos que protege los fundamentos de la posición y sujeta las piedras de corte (Kageyama Cap. 8).',
  },
  {
    term: 'Hane ni shi ari (Hay muerte en el Hane)',
    japanese: 'ハネに死あり',
    definition: 'Primera Regla del Tsumego: reducir primero el espacio ocular desde el exterior con Hane antes de golpear el punto vital (Kageyama Cap. 6).',
  },
  {
    term: 'Guruguru-mawashi (Escalera en espiral)',
    japanese: 'グルグル回し',
    definition: 'Sacrificio en espiral que obliga al enemigo a formar una masa pesada sin libertades para ganar el Semeai (Kageyama Cap. 9).',
  },
  {
    term: 'Ishi-no-shita (Jugar bajo las piedras)',
    japanese: '石の下',
    definition: 'Entregar deliberadamente un grupo de piedras para volver a jugar dentro de las intersecciones recién capturadas (Kageyama Cap. 10).',
  },
];
