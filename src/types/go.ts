export type CellState = 'EMPTY' | 'BLACK' | 'WHITE';
export type PlayerColor = 'BLACK' | 'WHITE';
export type BoardSize = 9 | 13 | 19;
export type ScoringRuleSet = 'AREA_CHINESE' | 'TERRITORY_JAPANESE';

export interface Coord {
  x: number;
  y: number;
}

export interface GroupInfo {
  id: string;
  color: PlayerColor;
  stones: Coord[];
  liberties: Coord[];
  inAtari: boolean;
}

export interface MoveRecord {
  moveNumber: number;
  color: PlayerColor;
  type: 'PLACE' | 'PASS' | 'RESIGN';
  coord?: Coord;
  coordinateLabel?: string;
  capturedStones: Coord[];
  groupsInAtariAfter: Coord[][];
  boardHashAfter: string;
  comment?: string;
}

export interface GameSnapshot {
  board: CellState[][];
  currentTurn: PlayerColor;
  captures: { BLACK: number; WHITE: number };
  consecutivePasses: number;
  lastMove: MoveRecord | null;
  positionHashes: string[];
  koPoint: Coord | null;
}

export interface GameState {
  size: BoardSize;
  board: CellState[][];
  currentTurn: PlayerColor;
  captures: { BLACK: number; WHITE: number };
  consecutivePasses: number;
  lastMove: MoveRecord | null;
  moveHistory: MoveRecord[];
  positionHashes: string[];
  undoStack: GameSnapshot[];
  koPoint: Coord | null;
  superkoPolicy: 'POSITIONAL_SUPERKO' | 'SIMPLE_KO';
  scoringRule: ScoringRuleSet;
  komi: number;
  status: 'PLAYING' | 'FINISHED';
  endReason?: 'TWO_PASSES' | 'RESIGNATION';
  winner?: PlayerColor | 'DRAW';
  markedDeadStones: Coord[];
}

export interface MoveValidationResult {
  legal: boolean;
  reason?: 'OUT_OF_BOUNDS' | 'OCCUPIED' | 'SUICIDE' | 'KO' | 'SUPERKO' | 'GAME_ALREADY_FINISHED';
  messageEs: string;
  nextState?: GameState;
  capturedStones?: Coord[];
  selfGroupLiberties?: number;
  atariGroups?: GroupInfo[];
}

export interface ScoreBreakdown {
  ruleSet: ScoringRuleSet;
  komi: number;
  blackTerritory: number;
  whiteTerritory: number;
  blackStonesOnBoard: number;
  whiteStonesOnBoard: number;
  blackCaptures: number;
  whiteCaptures: number;
  deadBlackStones: number;
  deadWhiteStones: number;
  blackTotal: number;
  whiteTotal: number;
  winner: PlayerColor | 'DRAW';
  margin: number;
  territoryMap: ('BLACK' | 'WHITE' | 'NEUTRAL')[][];
  explanationEs: string;
}

export interface BoardVisualLayers {
  showCoordinates: boolean;
  showLiberties: boolean;
  showGroups: boolean;
  showAtari: boolean;
  showLastMove: boolean;
  showTerritory?: boolean;
}

export interface BoardSetupStone {
  x: number;
  y: number;
  color: PlayerColor;
}

export interface BoardMarker {
  x: number;
  y: number;
  label?: string;
  type: 'CIRCLE' | 'TRIANGLE' | 'SQUARE' | 'HIGHLIGHT' | 'DANGER' | 'SUCCESS';
}

export interface DemoStep {
  title: string;
  narration: string;
  stones: BoardSetupStone[];
  lastMove?: Coord;
  markers?: BoardMarker[];
  turn?: PlayerColor;
}

export interface InteractiveExercise {
  id: string;
  prompt: string;
  boardSize: BoardSize;
  initialStones: BoardSetupStone[];
  turn: PlayerColor;
  exerciseType: 'PLACE_STONE' | 'SELECT_INTERSECTION' | 'MULTIPLE_CHOICE';
  validCoords?: Coord[];
  options?: { id: string; text: string; isCorrect: boolean; feedback: string }[];
  correctFeedback: string;
  wrongFeedback: Record<string, string>;
  defaultWrongFeedback: string;
  hints: [string, string];
  markers?: BoardMarker[];
}

export interface VocabularyTerm {
  term: string;
  japanese?: string;
  definition: string;
}

export interface LessonContent {
  id: string;
  stageNumber: number;
  stageTitle: string;
  unitNumber: number;
  unitTitle?: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  xpReward: number;
  prerequisites: string[];
  relatedPuzzleIds?: string[];
  observableObjective: string;
  activationQuestion: {
    question: string;
    options: { id: string; text: string; isCorrect: boolean; explanation: string }[];
  };
  conceptSteps: {
    title: string;
    body: string;
    deepDive: string;
    boardIllustration?: {
      size: BoardSize;
      stones: BoardSetupStone[];
      markers?: BoardMarker[];
      caption: string;
    };
  }[];
  demonstration: {
    title: string;
    size: BoardSize;
    steps: DemoStep[];
  };
  guidedDecisions: InteractiveExercise[];
  independentPractice: InteractiveExercise[];
  summary: {
    keyIdeas: [string, string, string];
    vocabulary: VocabularyTerm[];
  };
  transferQuestion: InteractiveExercise;
}

export type PuzzleTheme =
  | 'LIBERTADES'
  | 'CAPTURA_SIMPLE'
  | 'SALVAR_PIEDRA'
  | 'CONECTAR_Y_CORTAR'
  | 'EVITAR_SUICIDIO'
  | 'KO_BASICO'
  | 'ESCALERAS'
  | 'REDES'
  | 'SNAPBACK'
  | 'TESUJI'
  | 'VIDA_Y_MUERTE'
  | 'FORMA_Y_ATAQUE'
  | 'INVASION_Y_YOSE';

export type PuzzleDifficulty = 'PRINCIPIANTE' | 'FACIL' | 'INTERMEDIO' | 'AVANZADO';

export type PuzzleValidationStatus = 'BORRADOR' | 'PENDIENTE' | 'VALIDADO' | 'PUBLICADO';

export type DojoPracticeMode =
  | 'LIBRE'
  | 'ALEATORIO'
  | 'CATEGORIA'
  | 'DIFICULTAD'
  | 'DESAFIO_DIARIO'
  | 'REPASO_ERRORES';

export interface PuzzleVariantNode {
  playerMove: Coord;
  opponentReply?: Coord;
  nextValidMoves?: Coord[];
  explanationEs: string;
}

export interface PuzzleContent {
  id: string;
  number: number;
  title: string;
  theme: PuzzleTheme;
  themeLabel: string;
  difficulty: PuzzleDifficulty;
  boardSize: BoardSize;
  initialStones: BoardSetupStone[];
  turn: PlayerColor;
  objective: string;
  acceptedFirstMoves: Coord[];
  variations: PuzzleVariantNode[];
  wrongMoveExplanations: Record<string, string>;
  defaultWrongExplanation: string;
  hints: [string, string, string];
  solutionExplanation: string;
  commonMistake: string;
  prerequisites: string[];
  relatedLessonId?: string;
  validationStatus?: PuzzleValidationStatus;
  estimatedSeconds: number;
  xpBase: number;
  xpNoHints: number;
  markers?: BoardMarker[];
}

export interface CurriculumUnitOverview {
  id: string;
  unitNumber: number;
  title: string;
  focus: string;
  plannedLessonCount: number;
  lessonIds: string[];
}

export interface CurriculumStageOverview {
  stage: number;
  title: string;
  topics: string;
  expectedMastery: string;
  unlockedInMvp: boolean;
  lessonIds: string[];
  plannedLessonsTarget?: number;
  units?: CurriculumUnitOverview[];
}

export interface LessonProgress {
  lessonId: string;
  status: 'LOCKED' | 'AVAILABLE' | 'IN_PROGRESS' | 'COMPLETED' | 'MASTERED';
  currentStepIndex: number;
  scorePct: number;
  attempts: number;
  lastReviewedDate: string | null;
  nextReviewDate: string | null;
  completedAtMs?: number;
}

export interface PuzzleAttemptRecord {
  puzzleId: string;
  solved: boolean;
  solvedWithoutHints: boolean;
  attemptsCount: number;
  hintsUsedMax: number;
  lastAttemptDate: string;
  needsReview: boolean;
}

export interface SkillMastery {
  theme: PuzzleTheme;
  label: string;
  correctCount: number;
  totalAttempts: number;
  confidencePct: number;
  lastUpdated: string;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedDate?: string;
  conditionText: string;
  jadeReward: number;
}

export interface DailyActivity {
  dateLocal: string; // YYYY-MM-DD
  minutesPracticed: number;
  xpEarned: number;
  lessonsCompleted: number;
  puzzlesSolved: number;
  infinitePuzzlesSolved?: number;
  meaningfulPracticeDone: boolean;
  goalMet: boolean;
  solvedHoyReviewIndices?: number[];
  hoyReviewsCompleted?: boolean;
}

export type StudentLevelTitle =
  | 'Novato'
  | 'Aprendiz'
  | 'Explorador'
  | 'Estratega'
  | 'Táctico'
  | 'Jugador avanzado'
  | 'Maestro en formación';

export type AppThemeId =
  | 'KAYA'
  | 'BOSQUE'
  | 'TINTA'
  | 'CEREZOS'
  | 'OCEANO'
  | 'LAVANDA'
  | 'DRAGON_BALL';

export type BoardThemeId =
  | 'KAYA_TRADICIONAL'
  | 'CEDRO_JADE'
  | 'EBANO_NOCTURNO'
  | 'SAKURA_KIOTO'
  | 'PIZARRA_ZEN';

export interface AppThemeOption {
  id: AppThemeId;
  shortLabel: string;
  name: string;
  subtitle: string;
  description: string;
  dotColor: string;
  swatches: [string, string, string, string];
  isDark?: boolean;
  isParallax?: boolean;
  jadeCost?: number;
  requiresJadeUnlock?: boolean;
}

export interface BoardThemeOption {
  id: BoardThemeId;
  name: string;
  subtitle: string;
  description: string;
  jadeCost: number;
  requiresJadeUnlock?: boolean;
  swatches: [string, string, string]; // [board color, black stone, white stone]
  boardStops: [string, string, string];
  boardBorder: string;
  gridColor: string;
  coordColor: string;
  starColor: string;
  blackStoneStops: [string, string, string];
  blackStoneStroke: string;
  whiteStoneStops: [string, string, string];
  whiteStoneStroke: string;
}

export interface UserState {
  profile: {
    id: string;
    name: string;
    language: 'es';
    createdAt: string;
    onboardingCompleted: boolean;
    startingPath: 'FROM_ZERO' | 'HAS_BASICS';
    dailyGoalMinutes: 5 | 10 | 15 | 20;
    scoringRulePreference: ScoringRuleSet;
    soundEnabled: boolean;
    reducedMotion: boolean;
    analyticsOptIn: boolean;
    defaultVisualLayers: BoardVisualLayers;
    appTheme?: AppThemeId;
    boardTheme?: BoardThemeId;
    unlockedAppThemes?: AppThemeId[];
    unlockedBoardThemes?: BoardThemeId[];
    themeUnlocksInitializedV2?: boolean;
    themeUnlocksInitializedV3?: boolean;
    dragonBallLockedV1?: boolean;
    jadeInitializedV2?: boolean;
    allowRepeatHoyReviews?: boolean;
  };
  xp: number;
  jade?: number;
  streakDays: number;
  lastActiveDate: string | null;
  awardedXpKeys: string[]; // Prevents duplicate XP farming
  lessonProgress: Record<string, LessonProgress>;
  puzzleRecords: Record<string, PuzzleAttemptRecord>;
  skillMastery: Record<PuzzleTheme, SkillMastery>;
  achievements: AchievementBadge[];
  dailyHistory: Record<string, DailyActivity>;
  savedGamesCount: number;
  askedTutorCount: number;
}

