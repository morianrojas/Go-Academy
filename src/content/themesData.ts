import { AppThemeId, AppThemeOption, BoardThemeId, BoardThemeOption } from '../types/go';

export const DEFAULT_UNLOCKED_APP_THEMES: AppThemeId[] = ['KAYA'];

export const DEFAULT_UNLOCKED_BOARD_THEMES: BoardThemeId[] = ['KAYA_TRADICIONAL'];

export interface DragonBallParallaxLayerSpec {
  layerNumber: number;
  id: string;
  label: string;
  src: string;
  /** Optional full-canvas numbered reference image used to determine relative size and placement */
  referenceLayerSrc?: string;
  zIndex: number;
  /** Vertical scroll multiplier (positive moves down on scroll, negative moves up on scroll) */
  scrollSpeed: number;
  /** Maximum vertical displacement in pixels to prevent layers from leaving the frame */
  maxOffsetPx: number;
  /** Initial vertical offset in pixels at scrollY = 0 */
  initialOffsetY: number;
  /** Optional horizontal scroll multiplier for diagonal flight (e.g., Goku, Bulma, Roshi) */
  scrollSpeedX?: number;
  /** Maximum horizontal displacement in pixels for diagonal flight */
  maxOffsetXPx?: number;
  /** Initial horizontal offset in pixels at scrollY = 0 */
  initialOffsetX?: number;
  /** When true, moves identically with the base background image as a single unified piece */
  syncWithBaseBg?: boolean;
  /** When true, removes any green chroma-key fringe around cloud cutouts */
  despillGreenChroma?: boolean;
  /** Optional custom percentage bounds when placing a full-resolution cutout at its exact relative size/position */
  customBounds?: {
    topPct: number;
    leftPct: number;
    widthPct: number;
    minWidthPx?: number;
    maxWidthPx?: number;
  };
  /** Sizing mode: 'landscape-band' fills horizontal width; 'focal-contain' preserves aspect ratio; 'custom-cutout' uses customBounds */
  fitMode: 'landscape-band' | 'focal-contain' | 'custom-cutout';
}

export const DRAGON_BALL_PARALLAX_BASE_BG = '/assets/aistudio/fondo_oscuro_19de2dc7.png';

export const DRAGON_BALL_HOY_PROFILE_BASE_BG = '/assets/aistudio/fondo_ca47cea4.webp';

/**
 * Group 2 Parallax (visible in HOY and PERFIL tabs):
 * Front-to-back order: 1 (goku) - 2 (bulma) - 4 (roshi) - f1 - f2 - f3 - 3 (nubes) - 5 (shenlong) - fondo
 * - Base sky & clouds (`fondo_ca47cea4.webp`, zIndex 0) and Cloud Cutout layer (`3_bb43a599.webp`, zIndex 2) move together as one single unit (`syncWithBaseBg: true`).
 * - Layer 5 (`5_a7530eb6.webp` - Shenlong, zIndex 1) moves strictly vertically behind the cloud cutouts.
 * - Dragon Ball layers `f3` (`f3_d57b8f64.png`, zIndex 3), `f2` (`f2_65598993.png`, zIndex 4), and `f1` (`f1_9d53ae5f.png`, zIndex 5)
 *   move predominantly vertically (up and down) with a subtle horizontal drift, positioned in front of layer 3 and behind layer 4.
 * - Layer 4 (`roshi_1b1537ff.png`, zIndex 6), Layer 2 (`bulma_0745a655.png`, zIndex 7),
 *   and Layer 1 (`goku_5ec46cd4.png`, zIndex 8) use full-resolution cutouts at their relative sizes and fly diagonally.
 */
export const DRAGON_BALL_HOY_PROFILE_PARALLAX_LAYERS: DragonBallParallaxLayerSpec[] = [
  {
    layerNumber: 5,
    id: 'db-hoy-layer-5-shenlong',
    label: 'Capa 5 · Shenlong (Movimiento Vertical)',
    src: '/assets/aistudio/5_a7530eb6.webp',
    zIndex: 1,
    scrollSpeed: -0.20,
    maxOffsetPx: 165,
    initialOffsetY: 36,
    scrollSpeedX: 0,
    maxOffsetXPx: 0,
    initialOffsetX: 0,
    fitMode: 'focal-contain',
  },
  {
    layerNumber: 3,
    id: 'db-hoy-layer-clouds-sync',
    label: 'Capa 3 · Nubes Sincronizadas con Fondo',
    src: '/assets/aistudio/3_bb43a599.webp',
    zIndex: 2,
    scrollSpeed: -0.04,
    maxOffsetPx: 42,
    initialOffsetY: 0,
    scrollSpeedX: 0,
    maxOffsetXPx: 0,
    initialOffsetX: 0,
    syncWithBaseBg: true,
    despillGreenChroma: true,
    fitMode: 'landscape-band',
  },
  {
    layerNumber: 33,
    id: 'db-hoy-layer-f3-dragonballs',
    label: 'Capa F3 · Esferas del Dragón (2 y 5 Estrellas)',
    src: '/assets/aistudio/f3_d57b8f64.png',
    zIndex: 3,
    scrollSpeed: -0.025,
    maxOffsetPx: 22,
    initialOffsetY: 4,
    scrollSpeedX: 0.006,
    maxOffsetXPx: 6,
    initialOffsetX: 0,
    fitMode: 'focal-contain',
  },
  {
    layerNumber: 32,
    id: 'db-hoy-layer-f2-dragonballs',
    label: 'Capa F2 · Esferas del Dragón (3 y 6 Estrellas)',
    src: '/assets/aistudio/f2_65598993.png',
    zIndex: 4,
    scrollSpeed: 0.032,
    maxOffsetPx: 28,
    initialOffsetY: -4,
    scrollSpeedX: -0.008,
    maxOffsetXPx: 8,
    initialOffsetX: 0,
    fitMode: 'focal-contain',
  },
  {
    layerNumber: 31,
    id: 'db-hoy-layer-f1-dragonballs',
    label: 'Capa F1 · Esferas del Dragón (1, 4 y 7 Estrellas)',
    src: '/assets/aistudio/f1_9d53ae5f.png',
    zIndex: 5,
    scrollSpeed: -0.042,
    maxOffsetPx: 34,
    initialOffsetY: 6,
    scrollSpeedX: 0.01,
    maxOffsetXPx: 10,
    initialOffsetX: 0,
    fitMode: 'focal-contain',
  },
  {
    layerNumber: 4,
    id: 'db-hoy-layer-4-roshi',
    label: 'Capa 4 · Maestro Roshi, Launch y Krilin (Vuelo Diagonal)',
    src: '/assets/aistudio/roshi_1b1537ff.png',
    zIndex: 6,
    scrollSpeed: -0.16,
    maxOffsetPx: 135,
    initialOffsetY: 0,
    scrollSpeedX: -0.11,
    maxOffsetXPx: 85,
    initialOffsetX: 0,
    customBounds: {
      topPct: 76,
      leftPct: 9,
      widthPct: 20,
      minWidthPx: 115,
      maxWidthPx: 195,
    },
    fitMode: 'custom-cutout',
  },
  {
    layerNumber: 2,
    id: 'db-hoy-layer-2-bulma',
    label: 'Capa 2 · Bulma y Yamcha (Vuelo Diagonal)',
    src: '/assets/aistudio/bulma_0745a655.png',
    zIndex: 7,
    scrollSpeed: -0.12,
    maxOffsetPx: 100,
    initialOffsetY: 0,
    scrollSpeedX: -0.20,
    maxOffsetXPx: 165,
    initialOffsetX: 0,
    customBounds: {
      topPct: 51,
      leftPct: 54,
      widthPct: 16,
      minWidthPx: 95,
      maxWidthPx: 165,
    },
    fitMode: 'custom-cutout',
  },
  {
    layerNumber: 1,
    id: 'db-hoy-layer-1-goku',
    label: 'Capa 1 · Goku en la Nube Voladora (Vuelo Diagonal)',
    src: '/assets/aistudio/goku_5ec46cd4.png',
    zIndex: 8,
    scrollSpeed: 0.09,
    maxOffsetPx: 80,
    initialOffsetY: 0,
    scrollSpeedX: 0.22,
    maxOffsetXPx: 175,
    initialOffsetX: 0,
    customBounds: {
      topPct: 25,
      leftPct: 19,
      widthPct: 11,
      minWidthPx: 65,
      maxWidthPx: 115,
    },
    fitMode: 'custom-cutout',
  },
];

export function isDragonBallHoyOrProfileTab(
  activeTab: 'HOME' | 'LEARN' | 'PUZZLES' | 'PLAY' | 'PROFILE',
  hasActiveLesson: boolean = false
): boolean {
  if (hasActiveLesson) return false;
  return activeTab === 'HOME' || activeTab === 'PROFILE';
}

/**
 * Group 1 Parallax (visible in ACADEMIA, PUZZLES, and PRÁCTICA tabs):
 * Front-to-back order: 1 - f1 - 2 - 3 - f2 - f3 - 4 - 5 - 6 - fondo
 * Ordered from back to front in array & zIndex:
 * fondo (0) -> 6 (1) -> 5 (2) -> 4 (3) -> f3 (4) -> f2 (5) -> 3 (6) -> 2 (7) -> f1 (8) -> 1 (9)
 */
export const DRAGON_BALL_PARALLAX_LAYERS: DragonBallParallaxLayerSpec[] = [
  {
    layerNumber: 6,
    id: 'db-layer-6-namek-ground',
    label: 'Capa 6 · Aldea de Namek',
    src: '/assets/aistudio/6_02206d1a.webp',
    zIndex: 1,
    scrollSpeed: -0.05,
    maxOffsetPx: 48,
    initialOffsetY: 16,
    fitMode: 'landscape-band',
  },
  {
    layerNumber: 5,
    id: 'db-layer-5-dark-sky',
    label: 'Capa 5 · Cielo Nocturno',
    src: '/assets/aistudio/5_42f26437.png',
    zIndex: 2,
    scrollSpeed: -0.025,
    maxOffsetPx: 28,
    initialOffsetY: 0,
    fitMode: 'landscape-band',
  },
  {
    layerNumber: 4,
    id: 'db-layer-4-storm-clouds',
    label: 'Capa 4 · Nubes de Tormenta',
    src: '/assets/aistudio/4_4e3d3323.webp',
    zIndex: 3,
    scrollSpeed: -0.075,
    maxOffsetPx: 68,
    initialOffsetY: 8,
    fitMode: 'landscape-band',
  },
  {
    layerNumber: 33,
    id: 'db-layer-f3-dragonballs',
    label: 'Capa F3 · Esferas del Dragón',
    src: '/assets/aistudio/f3_292b71d1.png',
    zIndex: 4,
    scrollSpeed: -0.065,
    maxOffsetPx: 54,
    initialOffsetY: -12,
    scrollSpeedX: 0.008,
    maxOffsetXPx: 8,
    initialOffsetX: 28,
    fitMode: 'focal-contain',
  },
  {
    layerNumber: 32,
    id: 'db-layer-f2-dragonballs',
    label: 'Capa F2 · Esferas del Dragón',
    src: '/assets/aistudio/f2_4ed39e55.png',
    zIndex: 5,
    scrollSpeed: -0.045,
    maxOffsetPx: 40,
    initialOffsetY: 4,
    scrollSpeedX: -0.008,
    maxOffsetXPx: 8,
    initialOffsetX: 0,
    fitMode: 'focal-contain',
  },
  {
    layerNumber: 3,
    id: 'db-layer-3-shenlong',
    label: 'Capa 3 · Shenlong y las 7 Esferas',
    src: '/assets/aistudio/3_d2074f42.webp',
    zIndex: 6,
    scrollSpeed: -0.055,
    maxOffsetPx: 48,
    initialOffsetY: 0,
    fitMode: 'focal-contain',
  },
  {
    layerNumber: 2,
    id: 'db-layer-2-moon',
    label: 'Capa 2 · Luna de Namek',
    src: '/assets/aistudio/2_6f49d42c.png',
    zIndex: 7,
    scrollSpeed: 0.055,
    maxOffsetPx: 52,
    initialOffsetY: 36,
    fitMode: 'focal-contain',
  },
  {
    layerNumber: 31,
    id: 'db-layer-f1-dragonballs',
    label: 'Capa F1 · Esferas del Dragón',
    src: '/assets/aistudio/f1_df724884.png',
    zIndex: 8,
    scrollSpeed: -0.035,
    maxOffsetPx: 32,
    initialOffsetY: -10,
    scrollSpeedX: 0.01,
    maxOffsetXPx: 10,
    initialOffsetX: 0,
    fitMode: 'focal-contain',
  },
  {
    layerNumber: 1,
    id: 'db-layer-1-logo',
    label: 'Capa 1 · Logo Dragon Ball',
    src: '/assets/aistudio/1_74c824e2.png',
    zIndex: 9,
    scrollSpeed: 0.11,
    maxOffsetPx: 95,
    initialOffsetY: 44,
    fitMode: 'focal-contain',
  },
];

export const APP_THEMES_CATALOG: AppThemeOption[] = [
  {
    id: 'KAYA',
    shortLabel: 'Kaya',
    name: 'Kaya Imperial',
    subtitle: 'Hon-Kaya · Clásico Cálido',
    description:
      'Inspirada en los tableros centenarios de madera de Kaya dorada y papel Washi.',
    dotColor: '#B45309',
    swatches: ['#FCF9F4', '#F4EDE2', '#B45309', '#1E1915'],
    jadeCost: 0,
    requiresJadeUnlock: false,
  },
  {
    id: 'BOSQUE',
    shortLabel: 'Bosque',
    name: 'Bosque de Bambú',
    subtitle: 'Arashiyama · Zen Esmeralda',
    description:
      'Tonos serenos de musgo, jade y bambú que descansan la vista durante el cálculo.',
    dotColor: '#08745C',
    swatches: ['#F3FAF7', '#E5F3ED', '#08745C', '#0B2920'],
    jadeCost: 3,
    requiresJadeUnlock: true,
  },
  {
    id: 'TINTA',
    shortLabel: 'Tinta',
    name: 'Tinta Sumi Nocturna',
    subtitle: 'Yoru · Modo Oscuro Profundo',
    description:
      'Contraste nocturno de tinta negra Sumi-e con acentos de ámbar y linterna.',
    dotColor: '#EA7A1E',
    swatches: ['#0B0F17', '#182030', '#EA7A1E', '#F3F4F6'],
    isDark: true,
    jadeCost: 5,
    requiresJadeUnlock: true,
  },
  {
    id: 'OCEANO',
    shortLabel: 'Océano',
    name: 'Índigo de Okinawa',
    subtitle: 'Umi · Serenidad Marina',
    description:
      'Aguas profundas de Okinawa y porcelana blanca Arita para sesiones largas de lectura.',
    dotColor: '#1D4ED8',
    swatches: ['#F4F8FC', '#E6F0FA', '#1D4ED8', '#0F172A'],
    jadeCost: 7,
    requiresJadeUnlock: true,
  },
  {
    id: 'CEREZOS',
    shortLabel: 'Cerezos',
    name: 'Cerezos de Kioto',
    subtitle: 'Haru · Editorial Primavera',
    description:
      'Paleta luminosa con matices de flor de cerezo y madera clara.',
    dotColor: '#C01B5D',
    swatches: ['#FDF7F9', '#FCEEF3', '#C01B5D', '#2A121D'],
    jadeCost: 15,
    requiresJadeUnlock: true,
  },
  {
    id: 'LAVANDA',
    shortLabel: 'Lavanda',
    name: 'Lavanda de Hokkaidō',
    subtitle: 'Fuji · Crepúsculo Imperial',
    description:
      'Matices de glicinia y lavanda alpina que evocan los jardines imperiales al atardecer.',
    dotColor: '#6D28D9',
    swatches: ['#FAF7FD', '#F1E9FA', '#6D28D9', '#1E1035'],
    jadeCost: 20,
    requiresJadeUnlock: true,
  },
  {
    id: 'DRAGON_BALL',
    shortLabel: 'Dragon Ball',
    name: 'Shenlong · Esferas del Dragón',
    subtitle: 'Parallax Multicapa · Invocación en Namek',
    description:
      'Escenario multicapa con efecto parallax de Shenlong, las 7 Esferas del Dragón y el cielo de Namek en movimiento al desplazar la pantalla.',
    dotColor: '#10B981',
    swatches: ['#06100E', '#14532D', '#F59E0B', '#34D399'],
    isDark: true,
    isParallax: true,
    jadeCost: 60,
    requiresJadeUnlock: true,
  },
];

export const BOARD_THEMES_CATALOG: BoardThemeOption[] = [
  {
    id: 'KAYA_TRADICIONAL',
    name: 'Madera Kaya Tradicional',
    subtitle: 'Hon-Kaya · Nachiguro y Hamaguri',
    description:
      'Veta cálida de Kaya japonesa con piedras de pizarra Nachiguro y concha Hamaguri.',
    jadeCost: 0,
    requiresJadeUnlock: false,
    swatches: ['#DCB35C', '#181C1A', '#F9F7F2'],
    boardStops: ['#E4BF6E', '#DCB35C', '#CFA349'],
    boardBorder: '#C69C49',
    gridColor: '#3A2E19',
    coordColor: '#3D311B',
    starColor: '#2C2211',
    blackStoneStops: ['#4A524D', '#222724', '#101311'],
    blackStoneStroke: '#0B0E0C',
    whiteStoneStops: ['#FFFFFF', '#F4F1EA', '#D6D0C4'],
    whiteStoneStroke: '#9E9689',
  },
  {
    id: 'CEDRO_JADE',
    name: 'Cedro y Jade',
    subtitle: 'Arashiyama · Bambú y Pino',
    description:
      'Superficie suave de bambú claro con líneas en verde pino oscuro y piedras de jade blanco.',
    jadeCost: 3,
    requiresJadeUnlock: true,
    swatches: ['#D2CBA9', '#0E241C', '#F2FAF6'],
    boardStops: ['#DDD6B6', '#D2CBA9', '#C2BA95'],
    boardBorder: '#A9A17E',
    gridColor: '#103125',
    coordColor: '#133A2C',
    starColor: '#0B241B',
    blackStoneStops: ['#315247', '#152A23', '#091410'],
    blackStoneStroke: '#07120E',
    whiteStoneStops: ['#FFFFFF', '#EBF7F2', '#C5DED4'],
    whiteStoneStroke: '#83A899',
  },
  {
    id: 'PIZARRA_ZEN',
    name: 'Pizarra Zen Minimalista',
    subtitle: 'Karesansui · Piedra de Jardín Seco',
    description:
      'Acabado mineral inspirado en los jardines secos de Ryoan-ji con máxima claridad táctica.',
    jadeCost: 5,
    requiresJadeUnlock: true,
    swatches: ['#DCE3DF', '#16201D', '#FFFFFF'],
    boardStops: ['#E6ECE9', '#DCE3DF', '#CBD4CF'],
    boardBorder: '#B0BDB6',
    gridColor: '#1E2D28',
    coordColor: '#263832',
    starColor: '#13201C',
    blackStoneStops: ['#45544F', '#1F2926', '#0D1311'],
    blackStoneStroke: '#0D1311',
    whiteStoneStops: ['#FFFFFF', '#F7FAF8', '#D5DDD9'],
    whiteStoneStroke: '#96A69E',
  },
  {
    id: 'EBANO_NOCTURNO',
    name: 'Ébano Nocturno Sumi-e',
    subtitle: 'Yoru · Obsidiana y Oro',
    description:
      'Tablero imperial de ébano nocturno con cuadrícula dorada de laca Urushi y alto contraste.',
    jadeCost: 10,
    requiresJadeUnlock: true,
    swatches: ['#1E2636', '#0A0E17', '#FDE68A'],
    boardStops: ['#252F42', '#1E2636', '#161C29'],
    boardBorder: '#3B4861',
    gridColor: '#D49B54',
    coordColor: '#E2B477',
    starColor: '#F3C68F',
    blackStoneStops: ['#4B5563', '#1F2937', '#090D16'],
    blackStoneStroke: '#6B7280',
    whiteStoneStops: ['#FFFBEB', '#FEF3C7', '#D9C398'],
    whiteStoneStroke: '#B49B6B',
  },
  {
    id: 'SAKURA_KIOTO',
    name: 'Sakura de Kioto',
    subtitle: 'Haru · Cerezo Rosado y Ciruela',
    description:
      'Madera de cerezo clara con líneas en tono ciruela imperial y piedras nacaradas.',
    jadeCost: 15,
    requiresJadeUnlock: true,
    swatches: ['#F3DCE4', '#2A121D', '#FFF9FB'],
    boardStops: ['#F8E6EC', '#F0D5DF', '#E4C2CF'],
    boardBorder: '#D4A5B8',
    gridColor: '#4A192C',
    coordColor: '#5C1F37',
    starColor: '#3B1122',
    blackStoneStops: ['#593444', '#2E1520', '#170910'],
    blackStoneStroke: '#170910',
    whiteStoneStops: ['#FFFFFF', '#FDF2F6', '#E5CED7'],
    whiteStoneStroke: '#B894A3',
  },
];

export interface RoshiTeaching {
  id: string;
  title: string;
  greeting: string;
  principle: string;
  meditationQuote: string;
}

export const MAESTRO_ROSHI_TEACHINGS: RoshiTeaching[] = [
  {
    id: 'roshi-1',
    title: 'Maestro Roshi · Bienvenida al Dojo',
    greeting:
      '¡Hola, estudiante! En el Go cada piedra que colocas en una intersección cobra vida y respira a través de sus libertades. Empieza en el Módulo 1 y te guiaré paso a paso hasta el rango 1 Dan.',
    principle:
      'Haz clic en "Empezar Lección" para practicar directamente sobre el tablero Goban.',
    meditationQuote:
      'Un tablero agradable a la vista aquieta el espíritu; cuando la mente está en calma, las jugadas correctas emergen por sí solas.',
  },
  {
    id: 'roshi-2',
    title: 'Maestro Roshi · El Secreto de las Libertades',
    greeting:
      'Recuerda siempre contar las libertades antes de dar atari. Una piedra conectada a sus compañeras multiplica su aliento y resiste cualquier tormenta táctica.',
    principle:
      'Conecta tus piedras débiles con Bam-bu o Boca de Tigre antes de lanzarte a capturar.',
    meditationQuote:
      'Quien persigue una piedra pequeña sin mirar su propia forma, entrega el bosque por una hoja.',
  },
  {
    id: 'roshi-3',
    title: 'Maestro Roshi · Dos Ojos y Vida Eterna',
    greeting:
      'Ningún ejército puede capturar a un grupo que posee dos ojos verdaderos separados. En las esquinas, el punto vital suele ser el punto simétrico.',
    principle:
      'Para vivir, amplía tu espacio de ojos; para atacar, golpea primero el punto vital del enemigo.',
    meditationQuote:
      'El punto vital de mi adversario es también mi propio punto vital (Proverbio clásico del Go).',
  },
  {
    id: 'roshi-4',
    title: 'Maestro Roshi · Ataque con Propósito (Ishida & Davies)',
    greeting:
      'En el Go avanzado rara vez atacamos solo para matar. Atacamos en Sente para construir influencia en el exterior mientras el rival lucha por sobrevivir en segunda línea.',
    principle:
      'No empujes al enemigo hacia donde ya quieres hacer territorio; oblígalo a huir hacia tu muro.',
    meditationQuote:
      'La verdadera victoria en el ataque no es capturar piedras muertas, sino transformar el tablero entero a tu favor.',
  },
  {
    id: 'roshi-5',
    title: 'Maestro Roshi · El Tesuji de Pinza (Davies Vol. 3)',
    greeting:
      '¡Hohoho! Cuando una piedra de corte enemiga en la segunda línea parece imposible de atrapar con un atari simple, salta a su flanco con la Pinza (Hasami-tsuke) para crear un miai de conexión y captura.',
    principle:
      'Antes de rendir una piedra cortada, busca el punto de contacto que deja al rival en falta de libertades (Damezumari).',
    meditationQuote:
      'El Tesuji es la chispa de ingenio que hace posible en una jugada lo que la fuerza bruta no logra en diez.',
  },
  {
    id: 'roshi-6',
    title: 'Maestro Roshi · La Cuña que Parte Muros (Warikomi)',
    greeting:
      'Si el rival intenta encerrarte con piedras separadas por un espacio, no empujes desde un lado ayudándole a cerrar la puerta: ¡inserta la Cuña (Warikomi) justo en medio!',
    principle:
      'La Cuña crea dos puntos de corte simultáneos; por donde el rival dé atari, tú rompes por el otro lado.',
    meditationQuote:
      'Donde el ojo inexperto ve un muro cerrado, el lector de Tesuji ve una puerta esperando su llave.',
  },
];

export function getAppThemeById(id?: AppThemeId): AppThemeOption {
  return APP_THEMES_CATALOG.find((t) => t.id === id) ?? APP_THEMES_CATALOG[0]; // default KAYA
}

export function getBoardThemeById(id?: BoardThemeId): BoardThemeOption {
  return BOARD_THEMES_CATALOG.find((b) => b.id === id) ?? BOARD_THEMES_CATALOG[0]; // default KAYA_TRADICIONAL
}
