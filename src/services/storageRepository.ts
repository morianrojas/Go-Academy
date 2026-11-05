import {
  AchievementBadge,
  AppThemeId,
  BoardThemeId,
  DailyActivity,
  PuzzleTheme,
  ScoringRuleSet,
  SkillMastery,
  StudentLevelTitle,
  UserState,
} from '../types/go';
import { LESSONS_CATALOG } from '../content/curriculumData';
import { PUZZLES_CATALOG } from '../content/puzzlesData';
import {
  APP_THEMES_CATALOG,
  BOARD_THEMES_CATALOG,
  DEFAULT_UNLOCKED_APP_THEMES,
  DEFAULT_UNLOCKED_BOARD_THEMES,
} from '../content/themesData';

const STORAGE_KEY = 'camino_de_go_user_state_v1';

export function getLocalTodayString(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export interface StudentLevelTierSpec {
  min: number;
  max: number;
  rankLabel: string;
  title: StudentLevelTitle;
  description: string;
}

export const STUDENT_LEVEL_TIERS: StudentLevelTierSpec[] = [
  {
    min: 0,
    max: 50,
    rankLabel: '25 Kyu',
    title: 'Novato',
    description: 'Primer contacto con el Goban, turnos, intersecciones y libertades básicas.',
  },
  {
    min: 50,
    max: 140,
    rankLabel: '22 Kyu',
    title: 'Aprendiz',
    description: 'Identifica piedras en atari, ejecuta capturas simples y distingue jugadas ilegales.',
  },
  {
    min: 140,
    max: 280,
    rankLabel: '19 Kyu',
    title: 'Explorador',
    description: 'Conecta cadenas propias, corta grupos rivales y comprende el concepto de dos ojos.',
  },
  {
    min: 280,
    max: 470,
    rankLabel: '16 Kyu',
    title: 'Estratega',
    description: 'Domina escaleras (Shicho), redes (Geta), regla de Ko y conteo territorial.',
  },
  {
    min: 470,
    max: 720,
    rankLabel: '13 Kyu',
    title: 'Táctico',
    description: 'Resuelve problemas de vida y muerte (Tsumego), tesuji de captura y buena forma.',
  },
  {
    min: 720,
    max: 1040,
    rankLabel: '10 Kyu',
    title: 'Jugador avanzado',
    description: 'Equilibra territorio e influencia en la apertura y mantiene la iniciativa (Sente).',
  },
  {
    min: 1040,
    max: 1500,
    rankLabel: '5 Kyu',
    title: 'Maestro en formación',
    description: 'Lectura profunda de combate, invasiones precisas y cierre técnico de partida (Yose).',
  },
];

export function getStudentTierIndexFromXp(xp: number): number {
  for (let i = 0; i < STUDENT_LEVEL_TIERS.length; i++) {
    if (xp < STUDENT_LEVEL_TIERS[i].max) {
      return i;
    }
  }
  return STUDENT_LEVEL_TIERS.length - 1;
}

export interface StudentTitlePromotion {
  previousTier: StudentLevelTierSpec;
  newTier: StudentLevelTierSpec;
}

/**
 * Detects whether an XP increase caused the student to ascend to a new title/rank,
 * starting from "Aprendiz" (tier index >= 1) onwards.
 */
export function detectStudentTitlePromotion(
  prevXp: number,
  nextXp: number
): StudentTitlePromotion | null {
  if (nextXp <= prevXp) return null;
  const prevIdx = getStudentTierIndexFromXp(prevXp);
  const nextIdx = getStudentTierIndexFromXp(nextXp);
  if (nextIdx > prevIdx && nextIdx >= 1) {
    return {
      previousTier: STUDENT_LEVEL_TIERS[prevIdx],
      newTier: STUDENT_LEVEL_TIERS[nextIdx],
    };
  }
  return null;
}

export function getStudentLevelFromXp(xp: number): {
  rankLabel: string;
  title: StudentLevelTitle;
  description: string;
  nextThreshold: number;
  progressPct: number;
} {
  for (const tier of STUDENT_LEVEL_TIERS) {
    if (xp < tier.max) {
      const pct = Math.min(100, Math.round(((xp - tier.min) / (tier.max - tier.min)) * 100));
      return {
        rankLabel: tier.rankLabel,
        title: tier.title,
        description: tier.description,
        nextThreshold: tier.max,
        progressPct: pct,
      };
    }
  }
  const lastTier = STUDENT_LEVEL_TIERS[STUDENT_LEVEL_TIERS.length - 1];
  return {
    rankLabel: lastTier.rankLabel,
    title: lastTier.title,
    description: lastTier.description,
    nextThreshold: lastTier.max,
    progressPct: 100,
  };
}

const INITIAL_ACHIEVEMENTS: AchievementBadge[] = [
  {
    id: 'badge-first-lesson',
    title: 'Primera Piedra',
    description: 'Completaste tu primera lección interactiva en el dojo.',
    iconName: 'Compass',
    unlocked: false,
    conditionText: 'Completar 1 lección',
    jadeReward: 1,
  },
  {
    id: 'badge-first-capture',
    title: 'Primeras Capturas',
    description: 'Resolviste un ejercicio de captura o capturaste piedras en el tablero.',
    iconName: 'Target',
    unlocked: false,
    conditionText: 'Resolver un puzzle de captura o lección de captura',
    jadeReward: 1,
  },
  {
    id: 'badge-save-group',
    title: 'Guardián del Grupo',
    description: 'Salvaste una piedra en atari o conectaste un grupo amenazado de corte.',
    iconName: 'Shield',
    unlocked: false,
    conditionText: 'Resolver un puzzle de salvar piedra o conexión',
    jadeReward: 2,
  },
  {
    id: 'badge-three-puzzles',
    title: 'Lectura Despierta',
    description: 'Resolviste al menos 3 puzzles verificados por el motor.',
    iconName: 'Sparkles',
    unlocked: false,
    conditionText: 'Resolver 3 puzzles',
    jadeReward: 2,
  },
  {
    id: 'badge-ten-puzzles',
    title: 'Diez Problemas Resueltos',
    description: 'Completaste los 10 puzzles tácticos del catálogo inicial.',
    iconName: 'Award',
    unlocked: false,
    conditionText: 'Resolver los 10 puzzles',
    jadeReward: 3,
  },
];

const INITIAL_SKILL_MASTERY: Record<PuzzleTheme, SkillMastery> = {
  LIBERTADES: {
    theme: 'LIBERTADES',
    label: 'Libertades y Atari',
    correctCount: 0,
    totalAttempts: 0,
    confidencePct: 0,
    lastUpdated: '',
  },
  CAPTURA_SIMPLE: {
    theme: 'CAPTURA_SIMPLE',
    label: 'Captura simple',
    correctCount: 0,
    totalAttempts: 0,
    confidencePct: 0,
    lastUpdated: '',
  },
  SALVAR_PIEDRA: {
    theme: 'SALVAR_PIEDRA',
    label: 'Salvar piedras',
    correctCount: 0,
    totalAttempts: 0,
    confidencePct: 0,
    lastUpdated: '',
  },
  CONECTAR_Y_CORTAR: {
    theme: 'CONECTAR_Y_CORTAR',
    label: 'Conectar y cortar',
    correctCount: 0,
    totalAttempts: 0,
    confidencePct: 0,
    lastUpdated: '',
  },
  EVITAR_SUICIDIO: {
    theme: 'EVITAR_SUICIDIO',
    label: 'Suicidio vs Captura',
    correctCount: 0,
    totalAttempts: 0,
    confidencePct: 0,
    lastUpdated: '',
  },
  KO_BASICO: {
    theme: 'KO_BASICO',
    label: 'Regla de Ko',
    correctCount: 0,
    totalAttempts: 0,
    confidencePct: 0,
    lastUpdated: '',
  },
  ESCALERAS: {
    theme: 'ESCALERAS',
    label: 'Escaleras (Shicho)',
    correctCount: 0,
    totalAttempts: 0,
    confidencePct: 0,
    lastUpdated: '',
  },
  REDES: {
    theme: 'REDES',
    label: 'Redes (Geta)',
    correctCount: 0,
    totalAttempts: 0,
    confidencePct: 0,
    lastUpdated: '',
  },
  SNAPBACK: {
    theme: 'SNAPBACK',
    label: 'Snapback (Uttegaeshi)',
    correctCount: 0,
    totalAttempts: 0,
    confidencePct: 0,
    lastUpdated: '',
  },
  TESUJI: {
    theme: 'TESUJI',
    label: 'Tesuji y sacrificios',
    correctCount: 0,
    totalAttempts: 0,
    confidencePct: 0,
    lastUpdated: '',
  },
  VIDA_Y_MUERTE: {
    theme: 'VIDA_Y_MUERTE',
    label: 'Vida y muerte (Tsumego)',
    correctCount: 0,
    totalAttempts: 0,
    confidencePct: 0,
    lastUpdated: '',
  },
  FORMA_Y_ATAQUE: {
    theme: 'FORMA_Y_ATAQUE',
    label: 'Forma, Ataque y Defensa',
    correctCount: 0,
    totalAttempts: 0,
    confidencePct: 0,
    lastUpdated: '',
  },
  INVASION_Y_YOSE: {
    theme: 'INVASION_Y_YOSE',
    label: 'Invasión, Sente y Yose',
    correctCount: 0,
    totalAttempts: 0,
    confidencePct: 0,
    lastUpdated: '',
  },
};

export function enforceSequentialLessonUnlocks(
  rawProgress: UserState['lessonProgress']
): UserState['lessonProgress'] {
  const normalized: UserState['lessonProgress'] = {};

  LESSONS_CATALOG.forEach((lesson, idx) => {
    const existing = rawProgress?.[lesson.id];
    const isAlreadyDone =
      existing?.status === 'COMPLETED' || existing?.status === 'MASTERED';

    const prevLesson = idx > 0 ? LESSONS_CATALOG[idx - 1] : null;
    const prevProg = prevLesson ? normalized[prevLesson.id] : null;
    const isPrevDone =
      idx === 0 ||
      prevProg?.status === 'COMPLETED' ||
      prevProg?.status === 'MASTERED';

    let nextStatus: 'LOCKED' | 'AVAILABLE' | 'IN_PROGRESS' | 'COMPLETED' | 'MASTERED';
    if (isAlreadyDone) {
      nextStatus = existing.status;
    } else if (isPrevDone) {
      nextStatus = existing?.status === 'IN_PROGRESS' ? 'IN_PROGRESS' : 'AVAILABLE';
    } else {
      nextStatus = 'LOCKED';
    }

    normalized[lesson.id] = {
      lessonId: lesson.id,
      status: nextStatus,
      currentStepIndex: existing?.currentStepIndex ?? 0,
      scorePct: existing?.scorePct ?? 0,
      attempts: existing?.attempts ?? 0,
      lastReviewedDate: existing?.lastReviewedDate ?? null,
      nextReviewDate: existing?.nextReviewDate ?? null,
      ...(existing?.completedAtMs ? { completedAtMs: existing.completedAtMs } : {}),
    };
  });

  return normalized;
}

export function createDefaultUserState(autostartSkipOnboarding: boolean = false): UserState {
  const today = getLocalTodayString();
  const lessonProgress = enforceSequentialLessonUnlocks({});

  return {
    profile: {
      id: 'local-student-1',
      name: 'Estudiante',
      language: 'es',
      createdAt: today,
      onboardingCompleted: autostartSkipOnboarding,
      startingPath: 'FROM_ZERO',
      dailyGoalMinutes: 10,
      scoringRulePreference: 'AREA_CHINESE',
      soundEnabled: true,
      reducedMotion: false,
      analyticsOptIn: true,
      appTheme: 'KAYA',
      boardTheme: 'KAYA_TRADICIONAL',
      unlockedAppThemes: [...DEFAULT_UNLOCKED_APP_THEMES],
      unlockedBoardThemes: [...DEFAULT_UNLOCKED_BOARD_THEMES],
      themeUnlocksInitializedV2: true,
      themeUnlocksInitializedV3: true,
      dragonBallLockedV1: true,
      jadeInitializedV2: true,
      defaultVisualLayers: {
        showCoordinates: true,
        showLiberties: false,
        showGroups: false,
        showAtari: true,
        showLastMove: true,
        showTerritory: false,
      },
    },
    xp: 0,
    jade: 2,
    streakDays: 0,
    lastActiveDate: null,
    awardedXpKeys: [],
    lessonProgress,
    puzzleRecords: {},
    skillMastery: JSON.parse(JSON.stringify(INITIAL_SKILL_MASTERY)),
    achievements: JSON.parse(JSON.stringify(INITIAL_ACHIEVEMENTS)),
    dailyHistory: {
      [today]: {
        dateLocal: today,
        minutesPracticed: 0,
        xpEarned: 0,
        lessonsCompleted: 0,
        puzzlesSolved: 0,
        meaningfulPracticeDone: false,
        goalMet: false,
      },
    },
    savedGamesCount: 0,
    askedTutorCount: 0,
  };
}

function evaluateAchievements(state: UserState): UserState {
  const today = getLocalTodayString();
  const completedLessonsCount = Object.values(state.lessonProgress).filter(
    (lp) => lp.status === 'COMPLETED' || lp.status === 'MASTERED'
  ).length;
  const solvedPuzzles = Object.values(state.puzzleRecords).filter((pr) => pr.solved);

  const hasCaptureSolved =
    solvedPuzzles.some((pr) =>
      ['puzzle-1-captura-centro', 'puzzle-2-captura-esquina', 'puzzle-4-capturar-cadena'].includes(
        pr.puzzleId
      )
    ) || state.lessonProgress['lesson-3-atari-captura']?.status === 'MASTERED';

  const hasSaveOrConnectSolved = solvedPuzzles.some((pr) =>
    ['puzzle-3-salvar-atari', 'puzzle-5-conectar-corte', 'puzzle-7-boca-tigre'].includes(pr.puzzleId)
  );

  let bonusJadeFromBadges = 0;
  const nextAwardedKeys = [...(state.awardedXpKeys || [])];

  // Hydrate against INITIAL_ACHIEVEMENTS to preserve order and jadeReward
  const existingMap = new Map((state.achievements || []).map((b) => [b.id, b]));
  const updatedAchievements = INITIAL_ACHIEVEMENTS.map((template) => {
    const prev = existingMap.get(template.id);
    const badge: AchievementBadge = {
      ...template,
      unlocked: prev?.unlocked ?? false,
      unlockedDate: prev?.unlockedDate,
      jadeReward: template.jadeReward,
    };

    if (!badge.unlocked) {
      let shouldUnlock = false;
      if (badge.id === 'badge-first-lesson' && completedLessonsCount >= 1) shouldUnlock = true;
      if (badge.id === 'badge-first-capture' && hasCaptureSolved) shouldUnlock = true;
      if (badge.id === 'badge-save-group' && hasSaveOrConnectSolved) shouldUnlock = true;
      if (badge.id === 'badge-three-puzzles' && solvedPuzzles.length >= 3) shouldUnlock = true;
      if (badge.id === 'badge-ten-puzzles' && solvedPuzzles.length >= 10) shouldUnlock = true;

      if (shouldUnlock) {
        badge.unlocked = true;
        badge.unlockedDate = today;
      }
    }

    if (badge.unlocked) {
      const jadeKey = `badge_jade:${badge.id}`;
      if (!nextAwardedKeys.includes(jadeKey)) {
        nextAwardedKeys.push(jadeKey);
        bonusJadeFromBadges += badge.jadeReward;
      }
    }

    return badge;
  });

  return {
    ...state,
    jade: (state.jade ?? 2) + bonusJadeFromBadges,
    awardedXpKeys: nextAwardedKeys,
    achievements: updatedAchievements,
  };
}

function recordMeaningfulActivity(
  state: UserState,
  xpDelta: number,
  minutesDelta: number,
  lessonDelta: number,
  puzzleDelta: number,
  infinitePuzzleDelta: number = 0
): UserState {
  const today = getLocalTodayString();
  const prevDaily: DailyActivity = state.dailyHistory[today] ?? {
    dateLocal: today,
    minutesPracticed: 0,
    xpEarned: 0,
    lessonsCompleted: 0,
    puzzlesSolved: 0,
    infinitePuzzlesSolved: 0,
    meaningfulPracticeDone: false,
    goalMet: false,
  };

  const nextMinutes = prevDaily.minutesPracticed + minutesDelta;
  const nextLessons = prevDaily.lessonsCompleted + lessonDelta;
  const nextPuzzles = prevDaily.puzzlesSolved + puzzleDelta;
  const nextInfinitePuzzles = (prevDaily.infinitePuzzlesSolved ?? 0) + infinitePuzzleDelta;
  const meaningful =
    prevDaily.meaningfulPracticeDone ||
    nextLessons >= 1 ||
    nextPuzzles >= 1 ||
    nextInfinitePuzzles >= 1;

  const allCatalogLessonsCompleted = LESSONS_CATALOG.every((l) => {
    const prog = state.lessonProgress[l.id];
    return prog?.status === 'COMPLETED' || prog?.status === 'MASTERED';
  });
  const allCatalogPuzzlesSolved = PUZZLES_CATALOG.every((p) =>
    Boolean(state.puzzleRecords[p.id]?.solved)
  );
  const allCatalogCompleted = allCatalogLessonsCompleted && allCatalogPuzzlesSolved;

  const classesRequirementMet = nextLessons >= 1 || allCatalogLessonsCompleted;
  const puzzlesRequirementMet =
    allCatalogCompleted && nextLessons === 0
      ? nextInfinitePuzzles >= 2
      : nextPuzzles >= 2 ||
        (allCatalogPuzzlesSolved && (nextInfinitePuzzles >= 2 || nextPuzzles >= 1));

  const goalMet = prevDaily.goalMet || (classesRequirementMet && puzzlesRequirementMet);

  let nextStreak = state.streakDays;
  let nextLastActive = state.lastActiveDate;

  if (meaningful && state.lastActiveDate !== today) {
    nextStreak = state.streakDays + 1;
    nextLastActive = today;
  }

  const nextState: UserState = {
    ...state,
    xp: state.xp + xpDelta,
    streakDays: nextStreak,
    lastActiveDate: nextLastActive,
    dailyHistory: {
      ...state.dailyHistory,
      [today]: {
        ...prevDaily,
        dateLocal: today,
        minutesPracticed: nextMinutes,
        xpEarned: prevDaily.xpEarned + xpDelta,
        lessonsCompleted: nextLessons,
        puzzlesSolved: nextPuzzles,
        infinitePuzzlesSolved: nextInfinitePuzzles,
        meaningfulPracticeDone: meaningful,
        goalMet,
      },
    },
  };

  return evaluateAchievements(nextState);
}

export const storageRepository = {
  loadUserState(autostartParam: boolean = false): UserState {
    if (typeof window === 'undefined') {
      return createDefaultUserState(autostartParam);
    }

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        let fresh = createDefaultUserState(autostartParam);
        fresh = evaluateAchievements(fresh);
        this.saveUserState(fresh);
        return fresh;
      }
      let parsed = JSON.parse(raw) as UserState;

      // Clean up any legacy auto-seeded Lesson 1 & 2 if the user never actually completed a lesson in dailyHistory
      const totalHistoricalLessons = Object.values(parsed.dailyHistory || {}).reduce(
        (sum, d) => sum + (d?.lessonsCompleted ?? 0),
        0
      );
      if (totalHistoricalLessons === 0 && parsed.xp === 40) {
        parsed.xp = 0;
        parsed.awardedXpKeys = (parsed.awardedXpKeys || []).filter(
          (k) =>
            k !== `lesson:${LESSONS_CATALOG[0]?.id}` &&
            k !== `lesson:${LESSONS_CATALOG[1]?.id}` &&
            k !== 'badge_jade:badge-first-lesson'
        );
        parsed.lessonProgress = enforceSequentialLessonUnlocks({});
      } else {
        parsed.lessonProgress = enforceSequentialLessonUnlocks(parsed.lessonProgress || {});
      }

      parsed.skillMastery = {
        ...JSON.parse(JSON.stringify(INITIAL_SKILL_MASTERY)),
        ...(parsed.skillMastery || {}),
      };
      if (!parsed.profile.appTheme) {
        parsed.profile.appTheme = 'KAYA';
      }
      if (!parsed.profile.boardTheme) {
        parsed.profile.boardTheme = 'KAYA_TRADICIONAL';
      }
      if (!parsed.profile.themeUnlocksInitializedV3) {
        parsed.profile.unlockedAppThemes = [...DEFAULT_UNLOCKED_APP_THEMES];
        parsed.profile.unlockedBoardThemes = [...DEFAULT_UNLOCKED_BOARD_THEMES];
        parsed.profile.appTheme = 'KAYA';
        parsed.profile.boardTheme = 'KAYA_TRADICIONAL';
        parsed.profile.themeUnlocksInitializedV2 = true;
        parsed.profile.themeUnlocksInitializedV3 = true;
      } else {
        if (!parsed.profile.unlockedAppThemes) {
          parsed.profile.unlockedAppThemes = [...DEFAULT_UNLOCKED_APP_THEMES];
        } else {
          for (const defaultTheme of DEFAULT_UNLOCKED_APP_THEMES) {
            if (!parsed.profile.unlockedAppThemes.includes(defaultTheme)) {
              parsed.profile.unlockedAppThemes.push(defaultTheme);
            }
          }
        }
        if (!parsed.profile.unlockedBoardThemes) {
          parsed.profile.unlockedBoardThemes = [...DEFAULT_UNLOCKED_BOARD_THEMES];
        }
        if (!parsed.profile.dragonBallLockedV1) {
          parsed.profile.unlockedAppThemes = parsed.profile.unlockedAppThemes.filter(
            (id) => id !== 'DRAGON_BALL'
          );
          if (parsed.profile.appTheme === 'DRAGON_BALL') {
            parsed.profile.appTheme = 'KAYA';
          }
          parsed.profile.dragonBallLockedV1 = true;
        }
        if (!parsed.profile.unlockedAppThemes.includes(parsed.profile.appTheme)) {
          parsed.profile.appTheme = 'KAYA';
        }
        if (!parsed.profile.unlockedBoardThemes.includes(parsed.profile.boardTheme)) {
          parsed.profile.boardTheme = 'KAYA_TRADICIONAL';
        }
      }
      if (typeof parsed.jade !== 'number' || !parsed.profile.jadeInitializedV2) {
        parsed.jade = 2;
        parsed.profile.jadeInitializedV2 = true;
      }
      if (autostartParam && !parsed.profile.onboardingCompleted) {
        parsed.profile.onboardingCompleted = true;
      }
      parsed = evaluateAchievements(parsed);
      this.saveUserState(parsed);
      return parsed;
    } catch {
      return createDefaultUserState(autostartParam);
    }
  },

  saveUserState(state: UserState): void {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore quota errors
    }
  },

  setAppTheme(state: UserState, appTheme: AppThemeId): UserState {
    const unlocked = state.profile.unlockedAppThemes ?? DEFAULT_UNLOCKED_APP_THEMES;
    if (!unlocked.includes(appTheme)) {
      return state;
    }
    const updated: UserState = {
      ...state,
      profile: {
        ...state.profile,
        appTheme,
      },
    };
    this.saveUserState(updated);
    return updated;
  },

  setBoardTheme(state: UserState, boardTheme: BoardThemeId): UserState {
    const unlocked = state.profile.unlockedBoardThemes ?? DEFAULT_UNLOCKED_BOARD_THEMES;
    if (!unlocked.includes(boardTheme)) {
      return state;
    }
    const updated: UserState = {
      ...state,
      profile: {
        ...state.profile,
        boardTheme,
      },
    };
    this.saveUserState(updated);
    return updated;
  },

  unlockAppThemeWithJade(state: UserState, appTheme: AppThemeId): UserState {
    const unlocked = state.profile.unlockedAppThemes ?? DEFAULT_UNLOCKED_APP_THEMES;
    if (unlocked.includes(appTheme)) {
      return this.setAppTheme(state, appTheme);
    }
    const themeSpec = APP_THEMES_CATALOG.find((t) => t.id === appTheme);
    const cost = themeSpec?.jadeCost ?? 10;
    const currentJade = state.jade ?? 0;
    if (currentJade < cost) {
      return state;
    }
    const updated: UserState = {
      ...state,
      jade: currentJade - cost,
      profile: {
        ...state.profile,
        appTheme,
        unlockedAppThemes: [...unlocked, appTheme],
      },
    };
    this.saveUserState(updated);
    return updated;
  },

  unlockBoardThemeWithJade(state: UserState, boardTheme: BoardThemeId): UserState {
    const unlocked = state.profile.unlockedBoardThemes ?? DEFAULT_UNLOCKED_BOARD_THEMES;
    if (unlocked.includes(boardTheme)) {
      return this.setBoardTheme(state, boardTheme);
    }
    const boardSpec = BOARD_THEMES_CATALOG.find((b) => b.id === boardTheme);
    const cost = boardSpec?.jadeCost ?? 10;
    const currentJade = state.jade ?? 0;
    if (currentJade < cost) {
      return state;
    }
    const updated: UserState = {
      ...state,
      jade: currentJade - cost,
      profile: {
        ...state.profile,
        boardTheme,
        unlockedBoardThemes: [...unlocked, boardTheme],
      },
    };
    this.saveUserState(updated);
    return updated;
  },

  swapUnlockedTheme(
    state: UserState,
    target: { kind: 'APP'; id: AppThemeId } | { kind: 'BOARD'; id: BoardThemeId },
    source: { kind: 'APP'; id: AppThemeId } | { kind: 'BOARD'; id: BoardThemeId }
  ): UserState {
    let unlockedApp = [...(state.profile.unlockedAppThemes ?? DEFAULT_UNLOCKED_APP_THEMES)];
    let unlockedBoard = [...(state.profile.unlockedBoardThemes ?? DEFAULT_UNLOCKED_BOARD_THEMES)];
    let nextAppTheme = state.profile.appTheme ?? 'KAYA';
    let nextBoardTheme = state.profile.boardTheme ?? 'KAYA_TRADICIONAL';

    const sourceCost =
      source.kind === 'APP'
        ? APP_THEMES_CATALOG.find((t) => t.id === source.id)?.jadeCost ?? 0
        : BOARD_THEMES_CATALOG.find((b) => b.id === source.id)?.jadeCost ?? 0;
    const targetCost =
      target.kind === 'APP'
        ? APP_THEMES_CATALOG.find((t) => t.id === target.id)?.jadeCost ?? 0
        : BOARD_THEMES_CATALOG.find((b) => b.id === target.id)?.jadeCost ?? 0;

    const nextJade = (state.jade ?? 0) + sourceCost - targetCost;
    if (nextJade < 0) {
      return state;
    }

    // Remove source from unlocked
    if (source.kind === 'APP') {
      if (!unlockedApp.includes(source.id) || DEFAULT_UNLOCKED_APP_THEMES.includes(source.id)) {
        return state;
      }
      unlockedApp = unlockedApp.filter((id) => id !== source.id);
      if (nextAppTheme === source.id) {
        nextAppTheme = 'KAYA';
      }
    } else {
      if (!unlockedBoard.includes(source.id) || DEFAULT_UNLOCKED_BOARD_THEMES.includes(source.id)) {
        return state;
      }
      unlockedBoard = unlockedBoard.filter((id) => id !== source.id);
      if (nextBoardTheme === source.id) {
        nextBoardTheme = 'KAYA_TRADICIONAL';
      }
    }

    // Add target to unlocked and equip it
    if (target.kind === 'APP') {
      if (!unlockedApp.includes(target.id)) {
        unlockedApp.push(target.id);
      }
      nextAppTheme = target.id;
    } else {
      if (!unlockedBoard.includes(target.id)) {
        unlockedBoard.push(target.id);
      }
      nextBoardTheme = target.id;
    }

    const updated: UserState = {
      ...state,
      jade: nextJade,
      profile: {
        ...state.profile,
        appTheme: nextAppTheme,
        boardTheme: nextBoardTheme,
        unlockedAppThemes: unlockedApp,
        unlockedBoardThemes: unlockedBoard,
      },
    };
    this.saveUserState(updated);
    return updated;
  },

  refundUnlockedTheme(
    state: UserState,
    item: { kind: 'APP'; id: AppThemeId } | { kind: 'BOARD'; id: BoardThemeId }
  ): UserState {
    let unlockedApp = [...(state.profile.unlockedAppThemes ?? DEFAULT_UNLOCKED_APP_THEMES)];
    let unlockedBoard = [...(state.profile.unlockedBoardThemes ?? DEFAULT_UNLOCKED_BOARD_THEMES)];
    let nextAppTheme = state.profile.appTheme ?? 'KAYA';
    let nextBoardTheme = state.profile.boardTheme ?? 'KAYA_TRADICIONAL';
    let refundJade = 0;

    if (item.kind === 'APP') {
      if (!unlockedApp.includes(item.id) || DEFAULT_UNLOCKED_APP_THEMES.includes(item.id)) {
        return state;
      }
      const spec = APP_THEMES_CATALOG.find((t) => t.id === item.id);
      refundJade = spec?.jadeCost ?? 10;
      unlockedApp = unlockedApp.filter((id) => id !== item.id);
      if (nextAppTheme === item.id) {
        nextAppTheme = 'KAYA';
      }
    } else {
      if (!unlockedBoard.includes(item.id) || DEFAULT_UNLOCKED_BOARD_THEMES.includes(item.id)) {
        return state;
      }
      const spec = BOARD_THEMES_CATALOG.find((b) => b.id === item.id);
      refundJade = spec?.jadeCost ?? 10;
      unlockedBoard = unlockedBoard.filter((id) => id !== item.id);
      if (nextBoardTheme === item.id) {
        nextBoardTheme = 'KAYA_TRADICIONAL';
      }
    }

    const updated: UserState = {
      ...state,
      jade: (state.jade ?? 0) + refundJade,
      profile: {
        ...state.profile,
        appTheme: nextAppTheme,
        boardTheme: nextBoardTheme,
        unlockedAppThemes: unlockedApp,
        unlockedBoardThemes: unlockedBoard,
      },
    };
    this.saveUserState(updated);
    return updated;
  },

  completeOnboarding(
    state: UserState,
    options: {
      startingPath: 'FROM_ZERO' | 'HAS_BASICS';
      dailyGoalMinutes: 5 | 10 | 15 | 20;
      scoringRulePreference?: ScoringRuleSet;
    }
  ): UserState {
    const nextLessonProgress = enforceSequentialLessonUnlocks(state.lessonProgress);

    const updated: UserState = {
      ...state,
      profile: {
        ...state.profile,
        onboardingCompleted: true,
        startingPath: options.startingPath,
        dailyGoalMinutes: options.dailyGoalMinutes,
        scoringRulePreference: options.scoringRulePreference ?? state.profile.scoringRulePreference,
      },
      lessonProgress: nextLessonProgress,
    };
    this.saveUserState(updated);
    return updated;
  },

  saveLessonStepProgress(state: UserState, lessonId: string, stepIndex: number): UserState {
    const existing = state.lessonProgress[lessonId];
    if (!existing) return state;

    const nextStatus =
      existing.status === 'COMPLETED' || existing.status === 'MASTERED'
        ? existing.status
        : 'IN_PROGRESS';

    const updated: UserState = {
      ...state,
      lessonProgress: {
        ...state.lessonProgress,
        [lessonId]: {
          ...existing,
          status: nextStatus,
          currentStepIndex: stepIndex,
        },
      },
    };
    this.saveUserState(updated);
    return updated;
  },

  completeLesson(state: UserState, lessonId: string, scorePct: number): { state: UserState; xpAwarded: number } {
    const today = getLocalTodayString();
    const xpKey = `lesson:${lessonId}`;
    const alreadyAwarded = state.awardedXpKeys.includes(xpKey);
    const lessonObj = LESSONS_CATALOG.find((l) => l.id === lessonId);
    const xpAwarded = alreadyAwarded ? 0 : lessonObj?.xpReward ?? 20;
    const jadeAwarded = alreadyAwarded ? 0 : 1;

    const existing = state.lessonProgress[lessonId];
    const nextLessonProgress = enforceSequentialLessonUnlocks({
      ...state.lessonProgress,
      [lessonId]: {
        lessonId,
        status: (scorePct >= 80 ? 'MASTERED' : 'COMPLETED') as 'MASTERED' | 'COMPLETED',
        currentStepIndex: 0,
        scorePct: Math.max(existing?.scorePct ?? 0, scorePct),
        attempts: (existing?.attempts ?? 0) + 1,
        lastReviewedDate: today,
        nextReviewDate: today,
        completedAtMs: Date.now(),
      },
    });

    let nextState: UserState = {
      ...state,
      jade: (state.jade ?? 2) + jadeAwarded,
      awardedXpKeys: alreadyAwarded ? state.awardedXpKeys : [...state.awardedXpKeys, xpKey],
      lessonProgress: nextLessonProgress,
    };

    const allCatalogLessonsCompleted = LESSONS_CATALOG.every((l) => {
      const prog = nextLessonProgress[l.id];
      return prog?.status === 'COMPLETED' || prog?.status === 'MASTERED';
    });
    const lessonDeltaForToday = !alreadyAwarded || allCatalogLessonsCompleted ? 1 : 0;

    nextState = recordMeaningfulActivity(
      nextState,
      xpAwarded,
      lessonObj?.estimatedMinutes ?? 5,
      lessonDeltaForToday,
      0,
      0
    );

    this.saveUserState(nextState);
    return { state: nextState, xpAwarded };
  },

  recordPuzzleAttempt(
    state: UserState,
    params: {
      puzzleId: string;
      theme: PuzzleTheme;
      solved: boolean;
      hintsUsed: number;
      isInfinite?: boolean;
    }
  ): { state: UserState; xpAwarded: number } {
    const today = getLocalTodayString();
    const prevRecord = state.puzzleRecords[params.puzzleId];
    const prevSkill = state.skillMastery[params.theme];
    const wasAlreadySolved = Boolean(prevRecord?.solved);
    const isInfinitePuzzle =
      Boolean(params.isInfinite) || params.puzzleId.startsWith('infinite-');

    const xpKeyBase = `puzzle:${params.puzzleId}:solved`;
    const xpKeyNoHints = `puzzle:${params.puzzleId}:nohints`;

    let xpAwarded = 0;
    let jadeAwarded = 0;
    const nextAwardedKeys = [...state.awardedXpKeys];

    if (params.solved) {
      if (!nextAwardedKeys.includes(xpKeyBase)) {
        nextAwardedKeys.push(xpKeyBase);
        jadeAwarded = 1;
        if (params.hintsUsed === 0) {
          nextAwardedKeys.push(xpKeyNoHints);
          xpAwarded = 7;
        } else {
          xpAwarded = 5;
        }
      } else if (params.hintsUsed === 0 && !nextAwardedKeys.includes(xpKeyNoHints)) {
        // Upgraded from solved-with-hints (5 XP) to solved-without-hints (+2 XP bonus)
        nextAwardedKeys.push(xpKeyNoHints);
        xpAwarded = 2;
      }
    }

    const updatedRecord = {
      puzzleId: params.puzzleId,
      solved: (prevRecord?.solved ?? false) || params.solved,
      solvedWithoutHints:
        (prevRecord?.solvedWithoutHints ?? false) || (params.solved && params.hintsUsed === 0),
      attemptsCount: (prevRecord?.attemptsCount ?? 0) + 1,
      hintsUsedMax: Math.max(prevRecord?.hintsUsedMax ?? 0, params.hintsUsed),
      lastAttemptDate: today,
      // If failed, mark needsReview = true; if solved cleanly later, clear needsReview
      needsReview: params.solved ? false : true,
    };

    const nextCorrect = prevSkill.correctCount + (params.solved ? 1 : 0);
    const nextTotal = prevSkill.totalAttempts + 1;
    const nextConfidence = Math.min(100, Math.round((nextCorrect / nextTotal) * 100));

    let nextState: UserState = {
      ...state,
      jade: (state.jade ?? 2) + jadeAwarded,
      awardedXpKeys: nextAwardedKeys,
      puzzleRecords: {
        ...state.puzzleRecords,
        [params.puzzleId]: updatedRecord,
      },
      skillMastery: {
        ...state.skillMastery,
        [params.theme]: {
          ...prevSkill,
          correctCount: nextCorrect,
          totalAttempts: nextTotal,
          confidencePct: nextConfidence,
          lastUpdated: today,
        },
      },
    };

    // Only count puzzles that were NOT already solved before (or infinite puzzles) toward today's new puzzles solved
    const isNewlySolvedPuzzle = params.solved && (!wasAlreadySolved || isInfinitePuzzle);
    const puzzleDelta = isNewlySolvedPuzzle ? 1 : 0;
    const infinitePuzzleDelta = params.solved && isInfinitePuzzle ? 1 : 0;

    nextState = recordMeaningfulActivity(
      nextState,
      xpAwarded,
      params.solved ? 2 : 1,
      0,
      puzzleDelta,
      infinitePuzzleDelta
    );

    this.saveUserState(nextState);
    return { state: nextState, xpAwarded };
  },

  unlockAllLessons(state: UserState): UserState {
    const nextLessonProgress = { ...state.lessonProgress };
    for (const lesson of LESSONS_CATALOG) {
      const existing = nextLessonProgress[lesson.id];
      if (!existing || existing.status === 'LOCKED') {
        nextLessonProgress[lesson.id] = {
          lessonId: lesson.id,
          status: 'AVAILABLE',
          currentStepIndex: existing?.currentStepIndex ?? 0,
          scorePct: existing?.scorePct ?? 0,
          attempts: existing?.attempts ?? 0,
          lastReviewedDate: existing?.lastReviewedDate ?? null,
          nextReviewDate: existing?.nextReviewDate ?? null,
        };
      }
    }
    const updated: UserState = {
      ...state,
      lessonProgress: nextLessonProgress,
    };
    this.saveUserState(updated);
    return updated;
  },

  recordHoyReviewSolved(
    state: UserState,
    reviewIdx: number,
    totalReviews: number = 6
  ): { state: UserState; justCompletedAll: boolean } {
    const today = getLocalTodayString();
    const prevDaily: DailyActivity = state.dailyHistory[today] ?? {
      dateLocal: today,
      minutesPracticed: 0,
      xpEarned: 0,
      lessonsCompleted: 0,
      puzzlesSolved: 0,
      meaningfulPracticeDone: false,
      goalMet: false,
    };
    const prevSolved = prevDaily.solvedHoyReviewIndices ?? [];
    const nextSolved = prevSolved.includes(reviewIdx)
      ? prevSolved
      : [...prevSolved, reviewIdx];
    const isLastReviewOrAllSolved =
      reviewIdx === totalReviews - 1 || nextSolved.length >= totalReviews;
    const nextCompleted = Boolean(prevDaily.hoyReviewsCompleted) || isLastReviewOrAllSolved;
    const justCompletedAll = isLastReviewOrAllSolved;

    const nextState: UserState = {
      ...state,
      dailyHistory: {
        ...state.dailyHistory,
        [today]: {
          ...prevDaily,
          solvedHoyReviewIndices: nextSolved,
          hoyReviewsCompleted: nextCompleted,
        },
      },
    };
    this.saveUserState(nextState);
    return { state: nextState, justCompletedAll };
  },

  setAllowRepeatHoyReviews(state: UserState, allow: boolean): UserState {
    const today = getLocalTodayString();
    const prevDaily = state.dailyHistory[today];
    const nextDailyHistory = { ...state.dailyHistory };
    if (allow && prevDaily) {
      nextDailyHistory[today] = {
        ...prevDaily,
        solvedHoyReviewIndices: [],
        hoyReviewsCompleted: false,
      };
    }
    const nextState: UserState = {
      ...state,
      profile: {
        ...state.profile,
        allowRepeatHoyReviews: allow,
      },
      dailyHistory: nextDailyHistory,
    };
    this.saveUserState(nextState);
    return nextState;
  },

  resetAllProgress(): UserState {
    const fresh = createDefaultUserState(false);
    this.saveUserState(fresh);
    return fresh;
  },

  importUserStateFromJson(rawJson: string): UserState | null {
    try {
      const parsed = JSON.parse(rawJson);
      if (
        !parsed ||
        typeof parsed !== 'object' ||
        !parsed.profile ||
        typeof parsed.profile !== 'object'
      ) {
        return null;
      }

      const defaults = createDefaultUserState(true);
      const unlockedAppThemes: AppThemeId[] = Array.isArray(parsed.profile.unlockedAppThemes)
        ? parsed.profile.unlockedAppThemes
        : [...DEFAULT_UNLOCKED_APP_THEMES];
      for (const defaultTheme of DEFAULT_UNLOCKED_APP_THEMES) {
        if (!unlockedAppThemes.includes(defaultTheme)) {
          unlockedAppThemes.push(defaultTheme);
        }
      }

      const unlockedBoardThemes: BoardThemeId[] = Array.isArray(parsed.profile.unlockedBoardThemes)
        ? parsed.profile.unlockedBoardThemes
        : [...DEFAULT_UNLOCKED_BOARD_THEMES];
      for (const defaultBoard of DEFAULT_UNLOCKED_BOARD_THEMES) {
        if (!unlockedBoardThemes.includes(defaultBoard)) {
          unlockedBoardThemes.push(defaultBoard);
        }
      }

      const requestedAppTheme: AppThemeId = parsed.profile.appTheme ?? 'KAYA';
      const requestedBoardTheme: BoardThemeId = parsed.profile.boardTheme ?? 'KAYA_TRADICIONAL';

      const hydrated: UserState = {
        ...defaults,
        ...parsed,
        profile: {
          ...defaults.profile,
          ...parsed.profile,
          onboardingCompleted: true,
          unlockedAppThemes,
          unlockedBoardThemes,
          appTheme: unlockedAppThemes.includes(requestedAppTheme) ? requestedAppTheme : 'KAYA',
          boardTheme: unlockedBoardThemes.includes(requestedBoardTheme)
            ? requestedBoardTheme
            : 'KAYA_TRADICIONAL',
          themeUnlocksInitializedV2: true,
          themeUnlocksInitializedV3: true,
          dragonBallLockedV1: true,
          jadeInitializedV2: true,
        },
        xp: typeof parsed.xp === 'number' && parsed.xp >= 0 ? parsed.xp : 0,
        jade: typeof parsed.jade === 'number' && parsed.jade >= 0 ? parsed.jade : 2,
        streakDays:
          typeof parsed.streakDays === 'number' && parsed.streakDays >= 0 ? parsed.streakDays : 0,
        awardedXpKeys: Array.isArray(parsed.awardedXpKeys) ? parsed.awardedXpKeys : [],
        lessonProgress: enforceSequentialLessonUnlocks(parsed.lessonProgress || {}),
        puzzleRecords:
          parsed.puzzleRecords && typeof parsed.puzzleRecords === 'object'
            ? parsed.puzzleRecords
            : {},
        skillMastery: {
          ...JSON.parse(JSON.stringify(INITIAL_SKILL_MASTERY)),
          ...(parsed.skillMastery || {}),
        },
        dailyHistory:
          parsed.dailyHistory && typeof parsed.dailyHistory === 'object'
            ? parsed.dailyHistory
            : defaults.dailyHistory,
      };

      const evaluated = evaluateAchievements(hydrated);
      this.saveUserState(evaluated);
      return evaluated;
    } catch {
      return null;
    }
  },
};
