import React, { useEffect, useMemo, useState } from 'react';
import {
  Award,
  BookOpen,
  Compass,
  Flame,
  GraduationCap,
  Home,
  Play,
  Puzzle,
  Settings,
  Sparkles,
  Target,
  Lock,
  ArrowRight,
  Download,
  Palette,
  Volume2,
  VolumeX,
  Gem,
  ChevronDown,
  ChevronUp,
  Filter,
  CheckCircle2,
  Info,
  Zap,
  Clock,
  X,
} from 'lucide-react';
import {
  AppThemeId,
  BoardThemeId,
  BoardVisualLayers,
  ScoringRuleSet,
  UserState,
} from './types/go';
import {
  detectStudentTitlePromotion,
  getLocalTodayString,
  getStudentLevelFromXp,
  storageRepository,
  STUDENT_LEVEL_TIERS,
} from './services/storageRepository';
import { CURRICULUM_STAGES, GO_GLOSSARY, LESSONS_CATALOG } from './content/curriculumData';
import { PUZZLES_CATALOG } from './content/puzzlesData';
import {
  APP_THEMES_CATALOG,
  DEFAULT_UNLOCKED_APP_THEMES,
  DEFAULT_UNLOCKED_BOARD_THEMES,
} from './content/themesData';
import { OnboardingFlow } from './components/OnboardingFlow';
import { LessonPlayer } from './components/LessonPlayer';
import { PuzzleArena } from './components/PuzzleArena';
import { PlayAndDemoView } from './components/PlayAndDemoView';
import {
  AcademyDojoHero,
  DragonBallParallaxBackground,
  PaletasYRecompensasView,
} from './components/DojoAestheticsAndHero';
import {
  animateScrollToElement,
  CelebrationGifOverlay,
  MaestroRoshiTeachingCard,
  notifySpecialRewardPriority,
  SHOW_REWARD_TEST_BUTTONS,
  triggerTestRewardWithPreloadDelay,
} from './components/MaestroRoshiTeachingCard';
import {
  advanceGlobalAcademyRoshiDialogue,
  consumeLevelStartDialogueOnce,
  getAcademyLevelBoundaryInfo,
  getAdvancedLessonSpecialVideoUrl,
  getTitlePromotionSpecialReward,
  INTERMEDIATE_LEVEL_COMPLETE_SPECIAL_VIDEO_URL,
  ROSHI_ESPECIAL_1_VIDEO_URL,
  ROSHI_ESPECIAL_2_VIDEO_URL,
  ROSHI_GRADUACION_DIALOGUE,
  ROSHI_GRADUACION_TITLE,
  ROSHI_LEVEL_COMPLETE_DIALOGUE,
  ROSHI_RESET_PROGRESS_DIALOGUE,
  ROSHI_RESET_PROGRESS_TITLE,
  ROSHI_RESET_PROGRESS_VIDEO_URL,
} from './utils/roshiSpriteScheduler';

type NavTab = 'HOME' | 'LEARN' | 'PUZZLES' | 'PLAY' | 'PROFILE';

export default function App() {
  const autostartParam = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('autostart') === '1';
  }, []);

  const [userState, setUserState] = useState<UserState>(() =>
    storageRepository.loadUserState(autostartParam)
  );
  // "Hoy" (HOME) is the first tab and the default screen when the user opens the app
  const [activeTab, setActiveTab] = useState<NavTab>('HOME');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [targetPuzzleId, setTargetPuzzleId] = useState<string | null>(null);
  const [showOnboardingModal, setShowOnboardingModal] = useState<boolean>(
    !userState.profile.onboardingCompleted
  );

  // Live preview states for locked palettes/boards (only active while previewing in Perfil)
  const [previewAppTheme, setPreviewAppTheme] = useState<AppThemeId | null>(null);
  const [previewBoardTheme, setPreviewBoardTheme] = useState<BoardThemeId | null>(null);
  const [academyRoshiDialogue, setAcademyRoshiDialogue] = useState<string>(() =>
    advanceGlobalAcademyRoshiDialogue()
  );

  // Collapsible UI toggles to prevent visual saturation
  const [confirmResetProgress, setConfirmResetProgress] = useState<boolean>(false);
  const [showHeaderPaletteOptions, setShowHeaderPaletteOptions] = useState<boolean>(false);
  const [skipProfileRoshiSpotlight, setSkipProfileRoshiSpotlight] = useState<boolean>(false);
  const [lockedHeaderThemeId, setLockedHeaderThemeId] = useState<AppThemeId | null>(null);
  const [lockedThemeNoticeSeq, setLockedThemeNoticeSeq] = useState<number>(0);
  const [academyStageFilter, setAcademyStageFilter] = useState<
    'ALL' | 'FUNDAMENTOS' | 'TACTICA_VIDA' | 'ESTRATEGIA_YOSE'
  >('ALL');
  const [showAcademyLevelFilters, setShowAcademyLevelFilters] = useState<boolean>(false);
  const [showDetailedSyllabus, setShowDetailedSyllabus] = useState<boolean>(false);
  const [expandedLessonCardId, setExpandedLessonCardId] = useState<string | null>(null);
  const [highlightedLessonId, setHighlightedLessonId] = useState<string | null>(null);
  const [showRankProgressionInfo, setShowRankProgressionInfo] = useState<boolean>(false);
  const [activeHeaderStatInfo, setActiveHeaderStatInfo] = useState<
    'RANK' | 'STREAK' | 'JADE' | 'XP' | null
  >(null);
  const [expandedBadgeId, setExpandedBadgeId] = useState<string | null>(null);
  const [activeCollectionPanel, setActiveCollectionPanel] = useState<
    'NONE' | 'REVIEW' | 'BADGES' | 'GLOSSARY'
  >('REVIEW');
  const [showProfileDataOptions, setShowProfileDataOptions] = useState<boolean>(false);
  const [cameFromOnboardingStartLesson, setCameFromOnboardingStartLesson] =
    useState<boolean>(false);
  const [showAcademyScrollTopCue, setShowAcademyScrollTopCue] = useState<boolean>(false);
  const [specialVideoRewardModal, setSpecialVideoRewardModal] = useState<{
    open: boolean;
    videoUrl: string;
    congratsTitle: string;
    subtitle?: string;
    xpEarned?: number;
    totalJade?: number;
    accomplishmentText?: string;
    specialLevelDialogue?: string;
    bottomScoreText?: string;
  } | null>(null);

  const unlockedAppThemes = userState.profile.unlockedAppThemes ?? DEFAULT_UNLOCKED_APP_THEMES;
  const unlockedBoardThemes = userState.profile.unlockedBoardThemes ?? DEFAULT_UNLOCKED_BOARD_THEMES;

  const activeAppTheme: AppThemeId = userState.profile.appTheme ?? 'KAYA';
  const activeBoardTheme: BoardThemeId = userState.profile.boardTheme ?? 'KAYA_TRADICIONAL';

  // Effective displayed theme (includes live preview when on PROFILE tab)
  const effectiveAppTheme: AppThemeId =
    activeTab === 'PROFILE' && !activeLessonId && previewAppTheme
      ? previewAppTheme
      : activeAppTheme;
  const effectiveBoardTheme: BoardThemeId =
    activeTab === 'PROFILE' && !activeLessonId && previewBoardTheme
      ? previewBoardTheme
      : activeBoardTheme;

  const studentLevel = useMemo(() => getStudentLevelFromXp(userState.xp), [userState.xp]);
  const currentRank = useMemo(
    () => ({
      rankLabel: studentLevel.rankLabel,
      title: studentLevel.title,
    }),
    [studentLevel.rankLabel, studentLevel.title]
  );
  const todayStr = getLocalTodayString();
  const todayActivity = userState.dailyHistory[todayStr] ?? {
    dateLocal: todayStr,
    minutesPracticed: 0,
    xpEarned: 0,
    lessonsCompleted: 0,
    puzzlesSolved: 0,
    meaningfulPracticeDone: false,
    goalMet: false,
  };

  const completedLessonsCount = useMemo(
    () =>
      LESSONS_CATALOG.filter((l) => {
        const st = userState.lessonProgress[l.id]?.status;
        return st === 'COMPLETED' || st === 'MASTERED';
      }).length,
    [userState.lessonProgress]
  );

  const solvedPuzzlesTotal = useMemo(
    () => PUZZLES_CATALOG.filter((p) => userState.puzzleRecords[p.id]?.solved).length,
    [userState.puzzleRecords]
  );

  const isAllCatalogCompleted =
    completedLessonsCount >= LESSONS_CATALOG.length &&
    solvedPuzzlesTotal >= PUZZLES_CATALOG.length;

  const prevGoalMetRef = React.useRef<boolean>(todayActivity.goalMet);
  const pendingDailyMissionVideoRef = React.useRef<boolean>(false);
  const pendingSpecialVideoQueueRef = React.useRef<
    Array<{
      videoUrl: string;
      congratsTitle: string;
      subtitle?: string;
      xpEarned?: number;
      totalJade?: number;
      accomplishmentText?: string;
      specialLevelDialogue?: string;
      bottomScoreText?: string;
    }>
  >([]);
  const pendingLessonDismissSpecialVideosRef = React.useRef<
    Array<{
      videoUrl: string;
      congratsTitle: string;
      subtitle?: string;
      xpEarned?: number;
      totalJade?: number;
      accomplishmentText?: string;
      specialLevelDialogue?: string;
      bottomScoreText?: string;
    }>
  >([]);

  const [preloadingTestKey, setPreloadingTestKey] = useState<string | null>(null);

  const enqueueOrShowSpecialVideo = (item: {
    videoUrl: string;
    congratsTitle: string;
    subtitle?: string;
    xpEarned?: number;
    totalJade?: number;
    accomplishmentText?: string;
    specialLevelDialogue?: string;
    bottomScoreText?: string;
  }) => {
    notifySpecialRewardPriority();
    setSpecialVideoRewardModal((current) => {
      if (current && current.open) {
        pendingSpecialVideoQueueRef.current.push(item);
        return current;
      }
      return {
        ...item,
        open: true,
      };
    });
  };

  const triggerTestSpecialVideo = (
    testKey: string,
    item: {
      videoUrl: string;
      congratsTitle: string;
      subtitle?: string;
      xpEarned?: number;
      totalJade?: number;
      accomplishmentText?: string;
      specialLevelDialogue?: string;
      bottomScoreText?: string;
    }
  ) => {
    triggerTestRewardWithPreloadDelay(
      item.videoUrl,
      () => enqueueOrShowSpecialVideo(item),
      (loading) => setPreloadingTestKey(loading ? testKey : null)
    );
  };

  const flushLessonDismissSpecialVideos = () => {
    while (pendingLessonDismissSpecialVideosRef.current.length > 0) {
      const nextItem = pendingLessonDismissSpecialVideosRef.current.shift()!;
      enqueueOrShowSpecialVideo(nextItem);
    }
    if (pendingDailyMissionVideoRef.current) {
      pendingDailyMissionVideoRef.current = false;
      showDailyMissionSpecialVideo();
    }
  };

  const buildDailyMissionSolvedSummary = () => {
    const lessonsToday = todayActivity.lessonsCompleted;
    const puzzlesToday = todayActivity.puzzlesSolved;
    const infiniteToday = todayActivity.infinitePuzzlesSolved ?? 0;

    if (isAllCatalogCompleted && lessonsToday === 0) {
      const count = Math.max(2, infiniteToday || puzzlesToday);
      return `Completado hoy: ${count} puzzles infinitos`;
    }
    if (completedLessonsCount >= LESSONS_CATALOG.length && lessonsToday === 0) {
      const count = Math.max(2, puzzlesToday);
      return `Completado hoy: ${count} puzzles`;
    }
    const lCount = Math.max(1, lessonsToday);
    const pCount = Math.max(2, puzzlesToday);
    return `Completado hoy: ${lCount} ${lCount === 1 ? 'clase' : 'clases'} y ${pCount} ${
      pCount === 1 ? 'puzzle' : 'puzzles'
    }`;
  };

  const showDailyMissionSpecialVideo = () => {
    enqueueOrShowSpecialVideo({
      videoUrl: ROSHI_ESPECIAL_2_VIDEO_URL,
      congratsTitle: 'Cumpliste con tu Misión Diaria',
      accomplishmentText: 'Cumpliste con tu Misión Diaria',
      bottomScoreText: buildDailyMissionSolvedSummary(),
    });
  };

  useEffect(() => {
    const goalJustMet = !prevGoalMetRef.current && todayActivity.goalMet;
    prevGoalMetRef.current = todayActivity.goalMet;

    if (goalJustMet) {
      if (activeLessonId === null) {
        pendingDailyMissionVideoRef.current = false;
        showDailyMissionSpecialVideo();
      } else {
        pendingDailyMissionVideoRef.current = true;
      }
    }
  }, [
    todayActivity.goalMet,
    todayActivity.lessonsCompleted,
    todayActivity.puzzlesSolved,
    todayActivity.infinitePuzzlesSolved,
    activeLessonId,
  ]);

  useEffect(() => {
    if (activeLessonId === null) {
      flushLessonDismissSpecialVideos();
    }
  }, [activeLessonId]);

  useEffect(() => {
    document.body.dataset.state = showOnboardingModal ? 'onboarding' : 'ready';
  }, [showOnboardingModal]);

  useEffect(() => {
    document.documentElement.dataset.theme = effectiveAppTheme;
    document.documentElement.dataset.boardTheme = effectiveBoardTheme;
    document.documentElement.dataset.sound = userState.profile.soundEnabled ? 'on' : 'off';
  }, [effectiveAppTheme, effectiveBoardTheme, userState.profile.soundEnabled]);

  // Clear temporary locked theme preview, close header palette dropdown, and immediately reset scroll to top when switching tabs
  const resetViewportScrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  };

  const resetCollapsibleMenus = () => {
    setShowHeaderPaletteOptions(false);
    setActiveHeaderStatInfo(null);
    setShowAcademyLevelFilters(false);
    setShowDetailedSyllabus(false);
    setExpandedLessonCardId(null);
    setHighlightedLessonId(null);
    setShowRankProgressionInfo(false);
    setExpandedBadgeId(null);
    setActiveCollectionPanel('REVIEW');
    setShowProfileDataOptions(false);
    setConfirmResetProgress(false);
  };

  const handleSelectNavTab = (nextTab: NavTab) => {
    resetViewportScrollToTop();
    resetCollapsibleMenus();
    setAcademyStageFilter('ALL');
    setActiveLessonId(null);
    setSkipProfileRoshiSpotlight(false);
    setLockedHeaderThemeId(null);
    if (activeTab === 'LEARN' && nextTab !== 'LEARN') {
      setCameFromOnboardingStartLesson(false);
    }
    if (nextTab !== 'PROFILE') {
      setPreviewAppTheme(null);
      setPreviewBoardTheme(null);
    }
    setActiveTab(nextTab);
  };

  useEffect(() => {
    resetCollapsibleMenus();
    if (activeTab === 'PROFILE' && lockedHeaderThemeId) {
      return;
    }
    resetViewportScrollToTop();
  }, [activeTab, activeLessonId, lockedHeaderThemeId]);

  // Show/hide the animated "Subir / Inicio" cue on the right edge when scrolling down in the Academia tab
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (activeTab !== 'LEARN' || activeLessonId !== null) {
      setShowAcademyScrollTopCue(false);
      return;
    }
    const updateScrollCue = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      setShowAcademyScrollTopCue(y > 260);
    };
    updateScrollCue();
    window.addEventListener('scroll', updateScrollCue, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollCue);
  }, [activeTab, activeLessonId]);

  const handleSelectAppTheme = (themeId: AppThemeId) => {
    setLockedHeaderThemeId(null);
    setUserState((prev) => storageRepository.setAppTheme(prev, themeId));
  };

  const handleSelectBoardTheme = (boardThemeId: BoardThemeId) => {
    setLockedHeaderThemeId(null);
    setUserState((prev) => storageRepository.setBoardTheme(prev, boardThemeId));
  };

  const handleUnlockAppTheme = (themeId: AppThemeId) => {
    setLockedHeaderThemeId(null);
    setUserState((prev) => storageRepository.unlockAppThemeWithJade(prev, themeId));
  };

  const handleUnlockBoardTheme = (boardThemeId: BoardThemeId) => {
    setLockedHeaderThemeId(null);
    setUserState((prev) => storageRepository.unlockBoardThemeWithJade(prev, boardThemeId));
  };

  const handleSwapTheme = (
    target: { kind: 'APP'; id: AppThemeId } | { kind: 'BOARD'; id: BoardThemeId },
    source: { kind: 'APP'; id: AppThemeId } | { kind: 'BOARD'; id: BoardThemeId }
  ) => {
    setLockedHeaderThemeId(null);
    setUserState((prev) => storageRepository.swapUnlockedTheme(prev, target, source));
  };

  const handleRefundTheme = (
    item: { kind: 'APP'; id: AppThemeId } | { kind: 'BOARD'; id: BoardThemeId }
  ) => {
    setLockedHeaderThemeId(null);
    setUserState((prev) => storageRepository.refundUnlockedTheme(prev, item));
  };

  const handleToggleSound = () => {
    setUserState((prev) => {
      const next: UserState = {
        ...prev,
        profile: {
          ...prev.profile,
          soundEnabled: !prev.profile.soundEnabled,
        },
      };
      storageRepository.saveUserState(next);
      return next;
    });
  };

  const handleToggleLayer = (layer: keyof BoardVisualLayers) => {
    setUserState((prev) => {
      const next: UserState = {
        ...prev,
        profile: {
          ...prev.profile,
          defaultVisualLayers: {
            ...prev.profile.defaultVisualLayers,
            [layer]: !prev.profile.defaultVisualLayers[layer],
          },
        },
      };
      storageRepository.saveUserState(next);
      return next;
    });
  };

  const handleCompleteOnboarding = (options: {
    startingPath: 'FROM_ZERO' | 'HAS_BASICS';
    dailyGoalMinutes: 5 | 10 | 15 | 20;
    scoringRulePreference: ScoringRuleSet;
    startFirstLessonImmediately: boolean;
  }) => {
    const updated = storageRepository.completeOnboarding(userState, options);
    setUserState(updated);
    setShowOnboardingModal(false);
    setActiveLessonId(null);
    if (options.startFirstLessonImmediately) {
      consumeLevelStartDialogueOnce(LESSONS_CATALOG[0].id);
      setCameFromOnboardingStartLesson(true);
      setActiveTab('LEARN');
    } else {
      setCameFromOnboardingStartLesson(false);
      setActiveTab('HOME');
    }
  };

  // Advance the shuffled Maestro Roshi quote whenever the student enters the Academia view
  useEffect(() => {
    if (activeTab === 'LEARN' && activeLessonId === null) {
      setAcademyRoshiDialogue(advanceGlobalAcademyRoshiDialogue());
    }
  }, [activeTab, activeLessonId]);

  // Next recommended lesson in the curriculum
  const nextRecommendedLesson = useMemo(() => {
    for (const l of LESSONS_CATALOG) {
      const prog = userState.lessonProgress[l.id];
      if (!prog || prog.status === 'AVAILABLE' || prog.status === 'IN_PROGRESS') {
        return l;
      }
    }
    return LESSONS_CATALOG[0];
  }, [userState.lessonProgress]);

  const nextRecommendedOrderNum = useMemo(
    () => Math.max(1, LESSONS_CATALOG.findIndex((l) => l.id === nextRecommendedLesson.id) + 1),
    [nextRecommendedLesson.id]
  );

  // Puzzles needing review
  const puzzlesNeedingReview = useMemo(() => {
    return PUZZLES_CATALOG.filter((p) => userState.puzzleRecords[p.id]?.needsReview);
  }, [userState.puzzleRecords]);

  // Daily recommended puzzle
  const dailyPuzzle = useMemo(() => {
    if (puzzlesNeedingReview.length > 0) return puzzlesNeedingReview[0];
    const unsolved = PUZZLES_CATALOG.find((p) => !userState.puzzleRecords[p.id]?.solved);
    return unsolved ?? PUZZLES_CATALOG[0];
  }, [puzzlesNeedingReview, userState.puzzleRecords]);

  if (showOnboardingModal) {
    return <OnboardingFlow onComplete={handleCompleteOnboarding} />;
  }

  const activeLessonObj = activeLessonId
    ? LESSONS_CATALOG.find((l) => l.id === activeLessonId) ?? null
    : null;

  const nextLessonTag = `${nextRecommendedLesson.stageNumber + 1}.${nextRecommendedLesson.unitNumber}`;

  return (
    <div
      className="relative min-h-screen bg-[var(--app-bg)] text-[var(--app-text)] flex flex-col pb-12 md:pb-10 transition-colors"
      data-theme={effectiveAppTheme}
    >
      {/* Multi-layer Dragon Ball Parallax Background (Active when DRAGON_BALL theme is selected or previewed) */}
      <DragonBallParallaxBackground
        active={effectiveAppTheme === 'DRAGON_BALL'}
        activeTab={activeTab}
        hasActiveLesson={Boolean(activeLessonObj)}
      />

      {/* Sticky Top Header */}
      <header className="sticky top-0 z-50 bg-[var(--app-surface)]/95 backdrop-blur-xs border-b border-[var(--app-border)]">
        {/* Desktop Row 1: Brand, Navigation Links (with "Hoy" first), and Primary CTA */}
        <div className="hidden md:flex max-w-7xl mx-auto px-4 md:px-8 py-3 items-center justify-between gap-6">
          <button
            type="button"
            onClick={() => handleSelectNavTab('HOME')}
            className="text-xl font-display font-bold tracking-tight text-[var(--app-text)] whitespace-nowrap shrink-0 cursor-pointer"
          >
            Go Academy
          </button>

          <nav
            aria-label="Navegación principal"
            className="flex items-center gap-6 text-sm font-medium text-[var(--app-muted)]"
          >
            {(
              [
                { id: 'HOME', label: 'Hoy' },
                { id: 'LEARN', label: 'Academia' },
                { id: 'PUZZLES', label: 'Puzzles' },
                { id: 'PLAY', label: 'Práctica' },
                { id: 'PROFILE', label: 'Perfil' },
              ] as const
            ).map((item) => {
              const isActive = activeTab === item.id && !activeLessonId;
              return (
                <button
                  key={item.id}
                  type="button"
                  data-testid={`nav-tab-${item.id}`}
                  onClick={() => handleSelectNavTab(item.id)}
                  className={`py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
                    isActive
                      ? 'text-[var(--app-text)] font-semibold border-[var(--app-primary)]'
                      : 'border-transparent hover:text-[var(--app-text)]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5 shrink-0" />
        </div>

        {/* Mobile Top Navigation Bar ("Hoy" placed first, located at top to avoid bottom overlays) */}
        <nav
          aria-label="Navegación móvil"
          className="md:hidden bg-[var(--app-surface)] px-1.5 py-1.5 grid grid-cols-5 items-center gap-1"
        >
          {(
            [
              { id: 'HOME', label: 'Hoy', Icon: Home },
              { id: 'LEARN', label: 'Academia', Icon: GraduationCap },
              { id: 'PUZZLES', label: 'Puzzles', Icon: Puzzle },
              { id: 'PLAY', label: 'Práctica', Icon: Compass },
              { id: 'PROFILE', label: 'Perfil', Icon: Settings },
            ] as const
          ).map(({ id, label, Icon }) => {
            const active = activeTab === id && !activeLessonId;
            return (
              <button
                key={id}
                type="button"
                data-testid={`mobile-nav-tab-${id}`}
                onClick={() => handleSelectNavTab(id)}
                className={`flex flex-col items-center justify-center gap-0.5 py-1 px-1 rounded-lg text-[11px] leading-tight transition-colors cursor-pointer border-b-2 ${
                  active
                    ? 'text-[var(--app-primary)] font-bold bg-[var(--app-subtle)]/80 border-[var(--app-primary)]'
                    : 'text-[var(--app-muted)] font-medium border-transparent hover:text-[var(--app-text)]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate max-w-full">{label}</span>
              </button>
            );
          })}
        </nav>

        {/* Row 2: Compact Rank, Streak, Jade, XP & Quick Color Palette Switcher */}
        <div
          className="bg-[var(--app-subheader)] border-t border-[var(--app-border)] px-4 md:px-8 py-1.5"
          data-testid="header-user-status"
        >
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs">
              <button
                type="button"
                onClick={() =>
                  setActiveHeaderStatInfo((prev) => (prev === 'RANK' ? null : 'RANK'))
                }
                className="inline-flex items-center gap-1 font-mono font-bold text-[var(--app-primary)] px-2 py-0.5 rounded-md bg-[var(--app-surface)] border border-[var(--app-border)] hover:border-[var(--app-primary)] whitespace-nowrap cursor-pointer transition-colors"
                data-testid="header-user-rank"
                title={`Rango: ${currentRank.rankLabel} (${currentRank.title}). Presiona para más contexto.`}
              >
                <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                <span>{currentRank.rankLabel}</span>
              </button>

              <span className="text-[var(--app-border)]" aria-hidden="true">
                ·
              </span>

              <button
                type="button"
                onClick={() =>
                  setActiveHeaderStatInfo((prev) => (prev === 'STREAK' ? null : 'STREAK'))
                }
                title="Racha de práctica diaria. Presiona para ver detalle."
                className="inline-flex items-center gap-1 font-mono font-semibold text-[#D97706] hover:opacity-85 whitespace-nowrap cursor-pointer"
              >
                <Flame className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
                <span>{userState.streakDays}d</span>
              </button>

              <span className="text-[var(--app-border)]" aria-hidden="true">
                ·
              </span>

              <button
                type="button"
                onClick={() =>
                  setActiveHeaderStatInfo((prev) => (prev === 'JADE' ? null : 'JADE'))
                }
                title="Piedras de Jade para desbloquear estéticas del Dojo. Presiona para más información."
                className="inline-flex items-center gap-1 font-mono font-semibold text-[#059669] hover:underline cursor-pointer whitespace-nowrap"
              >
                <Gem className="w-3.5 h-3.5 text-[#059669]" />
                <span>{userState.jade ?? 2}</span>
              </button>

              <span className="text-[var(--app-border)]" aria-hidden="true">
                ·
              </span>

              <button
                type="button"
                onClick={() =>
                  setActiveHeaderStatInfo((prev) => (prev === 'XP' ? null : 'XP'))
                }
                title="Puntos de experiencia acumulados. Presiona para ver progreso de nivel."
                className="inline-flex items-center gap-1 font-mono font-bold text-[var(--app-text)] hover:text-[var(--app-primary)] whitespace-nowrap cursor-pointer"
                data-testid="header-user-xp"
              >
                <Zap className="w-3.5 h-3.5 text-[#D97706]" />
                <span>{userState.xp} XP</span>
              </button>
            </div>

            <div
              className="relative flex items-center gap-1.5"
              role="group"
              aria-label="Selector rápido de paleta de colores"
            >
              <button
                type="button"
                onClick={() => setShowHeaderPaletteOptions((prev) => !prev)}
                aria-expanded={showHeaderPaletteOptions}
                aria-label="Seleccionar paleta de colores"
                data-testid="header-palette-toggle-btn"
                title="Cambiar paleta de colores"
                className={`p-1.5 rounded-lg border transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                  showHeaderPaletteOptions
                    ? 'bg-[var(--app-primary)] text-white border-[var(--app-primary)] shadow-2xs'
                    : 'bg-[var(--app-surface)] text-[var(--app-text)] border-[var(--app-border)] hover:border-[var(--app-primary)]'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
              </button>

              {showHeaderPaletteOptions && (
                <div
                  data-testid="header-palette-options"
                  className="flex flex-wrap items-center gap-1.5 pl-1 animate-in fade-in duration-150"
                >
                  {APP_THEMES_CATALOG.map((t) => {
                    const isUnlocked = unlockedAppThemes.includes(t.id);
                    const isSelected = effectiveAppTheme === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          setShowHeaderPaletteOptions(false);
                          if (isUnlocked) {
                            setLockedHeaderThemeId(null);
                            setPreviewAppTheme(null);
                            handleSelectAppTheme(t.id);
                          } else {
                            setSkipProfileRoshiSpotlight(true);
                            setLockedHeaderThemeId(t.id);
                            setLockedThemeNoticeSeq((s) => s + 1);
                            setActiveLessonId(null);
                            setActiveTab('PROFILE');
                            setPreviewAppTheme(t.id);
                            setTimeout(() => {
                              const paletteCard = document.querySelector<HTMLElement>(
                                `[data-testid="palette-card-${t.id}"]`
                              );
                              const palettesSection = document.querySelector<HTMLElement>(
                                '[data-testid="app-palettes-section"]'
                              );
                              const targetEl = paletteCard ?? palettesSection;
                              if (targetEl) {
                                animateScrollToElement(targetEl, 'center', 480);
                              }
                            }, 90);
                          }
                        }}
                        aria-pressed={isSelected}
                        data-testid={`quick-theme-${t.id}`}
                        title={
                          isUnlocked
                            ? `Aplicar paleta ${t.shortLabel}`
                            : `Vista previa de ${t.shortLabel} (Desbloquear en Perfil)`
                        }
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-[var(--app-primary)] text-white border-[var(--app-primary)] shadow-2xs'
                            : 'bg-[var(--app-surface)] text-[var(--app-text)] border-[var(--app-border)] hover:border-[var(--app-primary)]/50'
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0 border border-white/40"
                          style={{
                            backgroundColor: isSelected ? 'transparent' : t.dotColor,
                          }}
                        />
                        <span>{t.shortLabel}</span>
                        {!isUnlocked && <Lock className="w-2.5 h-2.5 opacity-70" />}
                      </button>
                    );
                  })}
                </div>
              )}

              <button
                type="button"
                onClick={handleToggleSound}
                aria-label={
                  userState.profile.soundEnabled ? 'Silenciar sonidos' : 'Activar sonidos'
                }
                className="p-1.5 rounded-lg bg-[var(--app-surface)] border border-[var(--app-border)] text-[var(--app-text)] hover:border-[var(--app-primary)] transition-colors cursor-pointer"
              >
                {userState.profile.soundEnabled ? (
                  <Volume2 className="w-3.5 h-3.5" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 opacity-60" />
                )}
              </button>
            </div>
          </div>

          {activeHeaderStatInfo && (
            <div
              data-testid="header-stat-info-popover"
              className="max-w-7xl mx-auto mt-1.5 px-3 py-1.5 rounded-lg bg-[var(--app-surface)] border border-[var(--app-border)] text-xs text-[var(--app-text)] flex items-center justify-between gap-2 animate-in fade-in duration-150"
            >
              <span>
                {activeHeaderStatInfo === 'RANK' && (
                  <>
                    <strong>Rango {currentRank.rankLabel} ({currentRank.title}):</strong> En el Go, los estudiantes inician en 25 Kyu y descienden hacia 1 Kyu conforme ganan experiencia. Consulta todos los títulos en la pestaña Perfil.
                  </>
                )}
                {activeHeaderStatInfo === 'STREAK' && (
                  <>
                    <strong>Racha de estudio:</strong> {userState.streakDays} día(s) seguidos entrenando lectura y principios en el Dojo.
                  </>
                )}
                {activeHeaderStatInfo === 'JADE' && (
                  <>
                    <strong>Jade imperial ({userState.jade}):</strong> Ganas <strong>+1 Jade por cada clase completada</strong>, <strong>+1 Jade por cada puzzle resuelto</strong> y Jades adicionales por insignias para desbloquear paletas y tableros en Perfil.
                  </>
                )}
                {activeHeaderStatInfo === 'XP' && (
                  <>
                    <strong>Experiencia ({userState.xp} XP):</strong> Ganas +20 XP (y +1 Jade) por clase completada y hasta +7 XP (y +1 Jade) por puzzle resuelto.
                  </>
                )}
              </span>
              <button
                type="button"
                onClick={() => setActiveHeaderStatInfo(null)}
                aria-label="Cerrar información"
                className="p-0.5 rounded hover:bg-[var(--app-surface-2)] text-[var(--app-muted)] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Container */}
      <main className="relative flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 pt-6">
        {activeLessonObj ? (
          <LessonPlayer
            lesson={activeLessonObj}
            initialStepIndex={userState.lessonProgress[activeLessonObj.id]?.currentStepIndex ?? 0}
            visualLayers={userState.profile.defaultVisualLayers}
            soundEnabled={userState.profile.soundEnabled}
            onToggleLayer={handleToggleLayer}
            onSaveStepProgress={(lessonId, stepIdx) => {
              setUserState((prev) =>
                storageRepository.saveLessonStepProgress(prev, lessonId, stepIdx)
              );
            }}
            onCompleteLesson={(lessonId, scorePct) => {
              const res = storageRepository.completeLesson(userState, lessonId, scorePct);
              const promotion = detectStudentTitlePromotion(userState.xp, res.state.xp);
              const boundary = getAcademyLevelBoundaryInfo(
                lessonId,
                activeLessonObj.stageNumber
              );
              const usesLessonSpecialVideo =
                boundary.isLastLessonOfLevel || boundary.levelId === 'AVANZADO';
              setUserState(res.state);

              if (promotion) {
                const promoModal = getTitlePromotionSpecialReward(
                  promotion.newTier.title,
                  promotion.newTier.rankLabel
                );
                if (usesLessonSpecialVideo) {
                  pendingLessonDismissSpecialVideosRef.current.push(promoModal);
                  return { suppressLessonGifOverlay: false };
                }
                enqueueOrShowSpecialVideo(promoModal);
                return { suppressLessonGifOverlay: true };
              }

              return { suppressLessonGifOverlay: false };
            }}
            onExit={() => setActiveLessonId(null)}
            onOpenPuzzle={(puzzleId) => {
              setActiveLessonId(null);
              setTargetPuzzleId(puzzleId);
              setActiveTab('PUZZLES');
            }}
            nextLesson={
              LESSONS_CATALOG[
                LESSONS_CATALOG.findIndex((l) => l.id === activeLessonObj.id) + 1
              ] ?? null
            }
            onSelectLesson={(nextId) => setActiveLessonId(nextId)}
            onDismissCompleteCelebration={() => {
              flushLessonDismissSpecialVideos();
            }}
            totalJade={userState.jade ?? 2}
          />
        ) : (
          <>
            {/* TAB 1: HOY (Primera pestaña y vista principal con el Hero interactivo de Roshi) */}
            {activeTab === 'HOME' && (
              <div className="space-y-6">
                <AcademyDojoHero
                  nextLesson={nextRecommendedLesson}
                  completedLessonsCount={completedLessonsCount}
                  totalLessonsCount={LESSONS_CATALOG.length}
                  solvedPuzzlesCount={solvedPuzzlesTotal}
                  totalPuzzlesCount={PUZZLES_CATALOG.length}
                  xp={userState.xp}
                  nextLevelXp={studentLevel.nextThreshold}
                  boardTheme={activeBoardTheme}
                  soundEnabled={userState.profile.soundEnabled}
                  lessonProgress={userState.lessonProgress}
                  awardedXpKeys={userState.awardedXpKeys}
                  visualLayers={userState.profile.defaultVisualLayers}
                  solvedHoyReviewIndices={todayActivity.solvedHoyReviewIndices ?? []}
                  hoyReviewsCompleted={Boolean(todayActivity.hoyReviewsCompleted)}
                  allowRepeatHoyReviews={Boolean(userState.profile.allowRepeatHoyReviews)}
                  onSolveHoyReview={(reviewIdx, totalReviews) => {
                    const res = storageRepository.recordHoyReviewSolved(
                      userState,
                      reviewIdx,
                      totalReviews
                    );
                    setUserState(res.state);
                    return res.justCompletedAll;
                  }}
                  onToggleLayer={handleToggleLayer}
                  onStartLesson={(lessonId) => {
                    resetViewportScrollToTop();
                    setActiveTab('LEARN');
                    setActiveLessonId(lessonId);
                  }}
                  onOpenPuzzles={() => {
                    resetViewportScrollToTop();
                    setTargetPuzzleId(dailyPuzzle.id);
                    setActiveTab('PUZZLES');
                  }}
                  onSelectLevelFilter={(filter) => {
                    resetViewportScrollToTop();
                    setAcademyStageFilter(filter);
                    setActiveTab('LEARN');
                  }}
                  onCompleteHoyReviews={() => {
                    notifySpecialRewardPriority();
                    setSpecialVideoRewardModal({
                      open: true,
                      videoUrl: ROSHI_ESPECIAL_2_VIDEO_URL,
                      congratsTitle: 'Terminaste tus Repasos de Hoy',
                      accomplishmentText: 'Terminaste tus Repasos de Hoy',
                    });
                  }}
                />

                {/* Compact Daily Summary & Quick Access Row */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-5 flex flex-col justify-between space-y-3 shadow-2xs">
                    <div className="flex items-center justify-between text-xs">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--app-text)]">
                        <Target className="w-4 h-4 text-[var(--app-primary)]" />
                        <span>Misión Diaria</span>
                      </span>
                      <div className="flex items-center gap-2">
                        {todayActivity.goalMet ? (
                          <button
                            type="button"
                            onClick={showDailyMissionSpecialVideo}
                            data-testid="daily-mission-reward-btn"
                            title="Reproducir recompensa de Misión Diaria"
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] font-semibold text-[11px] hover:opacity-90 transition-opacity cursor-pointer"
                          >
                            <CheckCircle2 className="w-3 h-3 shrink-0" />
                            <span>¡Cumplida!</span>
                          </button>
                        ) : (
                          <span className="text-[11px] text-[var(--app-muted)] font-medium">
                            {isAllCatalogCompleted
                              ? 'Meta: 2 puzzles infinitos'
                              : 'Meta: 1 clase y 2 puzzles nuevos'}
                          </span>
                        )}
                        <span
                          className="font-mono font-bold text-[var(--app-primary)]"
                          data-testid="user-xp-total"
                        >
                          {userState.xp} XP
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5 text-center">
                      {isAllCatalogCompleted ? (
                        <>
                          <div className="bg-[var(--app-subtle)] border border-[var(--app-border)] rounded-xl p-2.5">
                            <div className="text-sm font-bold text-[#059669] font-mono">
                              100%
                            </div>
                            <div className="text-[11px] text-[var(--app-muted)]">
                              Catálogo completado
                            </div>
                          </div>
                          <div className="bg-[var(--app-subtle)] border border-[var(--app-border)] rounded-xl p-2.5">
                            <div className="text-sm font-bold text-[var(--app-primary)] font-mono">
                              {todayActivity.infinitePuzzlesSolved ?? 0}/2
                            </div>
                            <div className="text-[11px] text-[var(--app-muted)]">
                              Puzzles infinitos hoy
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="bg-[var(--app-subtle)] border border-[var(--app-border)] rounded-xl p-2.5">
                            <div className="text-sm font-bold text-[var(--app-primary)] font-mono">
                              {completedLessonsCount >= LESSONS_CATALOG.length
                                ? '✓'
                                : `${todayActivity.lessonsCompleted}/1`}
                            </div>
                            <div className="text-[11px] text-[var(--app-muted)]">Clases hoy</div>
                          </div>
                          <div className="bg-[var(--app-subtle)] border border-[var(--app-border)] rounded-xl p-2.5">
                            <div className="text-sm font-bold text-[var(--app-primary)] font-mono">
                              {todayActivity.puzzlesSolved}/2
                            </div>
                            <div className="text-[11px] text-[var(--app-muted)]">
                              Puzzles nuevos hoy
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      resetViewportScrollToTop();
                      setTargetPuzzleId(dailyPuzzle.id);
                      setActiveTab('PUZZLES');
                    }}
                    className="text-left bg-[var(--app-surface)] border border-[var(--app-border)] hover:border-[var(--app-primary)] rounded-2xl p-5 flex flex-col justify-between space-y-3 transition-all cursor-pointer shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base font-display font-bold text-[var(--app-text)]">
                        Dojo de Puzzles
                      </span>
                      <Sparkles className="w-4 h-4 text-[var(--app-primary)]" />
                    </div>
                    <p className="text-xs text-[var(--app-muted)]">
                      Practica lectura táctica a tu ritmo.
                    </p>
                    <div className="pt-2 border-t border-[var(--app-border)] flex items-center justify-between text-xs font-semibold text-[var(--app-primary)]">
                      <span>{solvedPuzzlesTotal}/{PUZZLES_CATALOG.length} resueltos</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      resetViewportScrollToTop();
                      setActiveTab('PLAY');
                    }}
                    className="text-left bg-[var(--app-surface)] border border-[var(--app-border)] hover:border-[var(--app-primary)] rounded-2xl p-5 flex flex-col justify-between space-y-3 transition-all cursor-pointer shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base font-display font-bold text-[var(--app-text)]">
                        Sala de Práctica 9×9
                      </span>
                      <BookOpen className="w-4 h-4 text-[var(--app-primary)]" />
                    </div>
                    <p className="text-xs text-[var(--app-muted)]">
                      Juega contra la IA o revisa la partida comentada.
                    </p>
                    <div className="pt-2 border-t border-[var(--app-border)] flex items-center justify-between text-xs font-semibold text-[var(--app-primary)]">
                      <span>Ir al tablero</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                </section>
              </div>
            )}

            {/* TAB 2: ACADEMIA (Sin repetir el Hero de Hoy; solo saludo y guía del Maestro Roshi a la lección en turno) */}
            {activeTab === 'LEARN' && (
              <div className="space-y-6">
                {/* Concise Maestro Roshi Greeting & Guide to Current Lesson */}
                <section
                  className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-6 shadow-2xs"
                  data-testid="academy-roshi-welcome-section"
                >
                  <MaestroRoshiTeachingCard
                    title="Maestro Roshi"
                    hideContextTitle={true}
                    forcedFlavorNote={academyRoshiDialogue}
                    message={`¡Bienvenido a la Academia! Tu siguiente paso en el camino es la Clase ${nextRecommendedOrderNum}: «${nextRecommendedLesson.title}». Avanza con calma y consolida cada principio antes de pasar al siguiente.`}
                    interactionKey={`academy-welcome-${nextRecommendedLesson.id}-${
                      cameFromOnboardingStartLesson ? 'onboarding' : 'normal'
                    }`}
                    dismissLabel="Entendido"
                    avatarSize="md"
                    prioritizeActionOnRight={true}
                    testId="academy-roshi-welcome-card"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setCameFromOnboardingStartLesson(false);
                        setActiveLessonId(nextRecommendedLesson.id);
                      }}
                      data-testid="academy-continue-lesson-btn"
                      className="px-5 py-2.5 rounded-full bg-[var(--app-primary)] hover:bg-[var(--app-primary-hover)] text-white text-xs md:text-sm font-bold inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Continuar clase {nextRecommendedOrderNum}</span>
                    </button>
                  </MaestroRoshiTeachingCard>
                </section>

                {/* Compact Curriculum Header + Show/Hide Filter Buttons */}
                <div className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-5 space-y-4 shadow-2xs">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-display font-bold text-[var(--app-text)]">
                        Clases del Programa
                      </h2>
                      <span className="text-xs font-mono text-[var(--app-muted)]">
                        {completedLessonsCount}/{LESSONS_CATALOG.length} completadas
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAcademyLevelFilters((v) => !v)}
                        aria-expanded={showAcademyLevelFilters}
                        data-testid="toggle-academy-levels-btn"
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                          showAcademyLevelFilters || academyStageFilter !== 'ALL'
                            ? 'bg-[var(--app-primary)] text-white border-[var(--app-primary)]'
                            : 'bg-[var(--app-subtle)] text-[var(--app-text)] border-[var(--app-border)] hover:border-[var(--app-primary)]'
                        }`}
                      >
                        <Filter className="w-3.5 h-3.5" />
                        <span>Filtrar por nivel</span>
                        {showAcademyLevelFilters ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <button
                        type="button"
                        data-testid="toggle-detailed-syllabus-btn"
                        aria-expanded={showDetailedSyllabus}
                        onClick={() => setShowDetailedSyllabus((prev) => !prev)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                          showDetailedSyllabus
                            ? 'bg-[var(--app-primary)] text-white border-[var(--app-primary)]'
                            : 'bg-[var(--app-subtle)] text-[var(--app-text)] border-[var(--app-border)] hover:border-[var(--app-primary)]'
                        }`}
                      >
                        <span>{showDetailedSyllabus ? 'Ocultar temario' : 'Temario detallado'}</span>
                        {showDetailedSyllabus ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {showAcademyLevelFilters && (
                    <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[var(--app-border)]">
                      {(
                        [
                          { id: 'ALL', label: `Todas (${LESSONS_CATALOG.length})` },
                          { id: 'FUNDAMENTOS', label: 'Nivel Básico (Clases 1–15)' },
                          { id: 'TACTICA_VIDA', label: 'Nivel Intermedio (Clases 16–30)' },
                          { id: 'ESTRATEGIA_YOSE', label: 'Nivel Avanzado (Clases 31–45)' },
                        ] as const
                      ).map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setAcademyStageFilter(f.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${
                            academyStageFilter === f.id
                              ? 'bg-[var(--app-primary)] text-white border-[var(--app-primary)]'
                              : 'bg-[var(--app-subtle)] text-[var(--app-text)] border-[var(--app-border)] hover:border-[var(--app-primary)]'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {showDetailedSyllabus && (
                    <div
                      className="pt-4 border-t border-[var(--app-border)] divide-y divide-[var(--app-border)]"
                      data-testid="detailed-syllabus-panel"
                    >
                      {CURRICULUM_STAGES.map((stg) => {
                        const stageLessons = LESSONS_CATALOG.filter(
                          (l) => l.stageNumber === stg.stage
                        );
                        return (
                          <div key={stg.stage} className="py-4 space-y-2.5">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="font-bold text-sm text-[var(--app-text)]">
                                {stg.title} ({stageLessons.length} clases)
                              </div>
                              <span className="text-[11px] font-mono text-[var(--app-muted)]">
                                Meta: {stg.expectedMastery}
                              </span>
                            </div>
                            <div className="text-xs text-[var(--app-muted)]">{stg.topics}</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                              {(stg.units ?? []).map((u) => {
                                const targetLesson =
                                  LESSONS_CATALOG.find((l) => u.lessonIds?.includes(l.id)) ??
                                  LESSONS_CATALOG.find(
                                    (l) =>
                                      l.stageNumber === stg.stage && l.unitNumber === u.unitNumber
                                  );
                                const targetGlobalNum = targetLesson
                                  ? LESSONS_CATALOG.findIndex((l) => l.id === targetLesson.id) + 1
                                  : null;
                                const unitProg = targetLesson
                                  ? userState.lessonProgress[targetLesson.id]
                                  : undefined;
                                const isUnitLocked = unitProg?.status === 'LOCKED';
                                const isUnitCompleted =
                                  unitProg?.status === 'COMPLETED' ||
                                  unitProg?.status === 'MASTERED';

                                return (
                                  <button
                                    key={u.id}
                                    type="button"
                                    data-testid={`syllabus-unit-btn-${u.id}`}
                                    onClick={() => {
                                      if (!targetLesson || !targetGlobalNum) return;
                                      setAcademyStageFilter('ALL');
                                      setExpandedLessonCardId(targetLesson.id);
                                      setHighlightedLessonId(targetLesson.id);
                                      setTimeout(() => {
                                        const cardEl = document.querySelector<HTMLElement>(
                                          `[data-testid="lesson-card-${targetGlobalNum}"]`
                                        );
                                        if (cardEl) {
                                          animateScrollToElement(cardEl, 'center', 460);
                                        }
                                      }, 60);
                                    }}
                                    className="text-left p-2.5 rounded-xl bg-[var(--app-subtle)] border border-[var(--app-border)] hover:border-[var(--app-primary)] transition-all space-y-1 cursor-pointer group"
                                  >
                                    <div className="flex items-center justify-between gap-2">
                                      <div className="text-xs font-semibold text-[var(--app-text)] group-hover:text-[var(--app-primary)] transition-colors">
                                        {targetGlobalNum
                                          ? `Clase ${targetGlobalNum} · Unidad ${u.unitNumber}: ${u.title}`
                                          : `Unidad ${u.unitNumber}: ${u.title}`}
                                      </div>
                                      {targetLesson && (
                                        <span
                                          className={`shrink-0 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border inline-flex items-center gap-1 ${
                                            isUnitCompleted
                                              ? 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]'
                                              : isUnitLocked
                                              ? 'bg-[var(--app-surface)] text-[var(--app-muted)] border-[var(--app-border)]'
                                              : 'bg-[var(--app-surface)] text-[var(--app-primary)] border-[var(--app-primary)]/40'
                                          }`}
                                        >
                                          {isUnitCompleted ? (
                                            <>
                                              <CheckCircle2 className="w-2.5 h-2.5" />
                                              <span>Resuelta</span>
                                            </>
                                          ) : isUnitLocked ? (
                                            <>
                                              <Lock className="w-2.5 h-2.5" />
                                              <span>Bloqueada</span>
                                            </>
                                          ) : (
                                            <>
                                              <Sparkles className="w-2.5 h-2.5 text-[#D97706]" />
                                              <span>En turno</span>
                                            </>
                                          )}
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-[11px] text-[var(--app-muted)] leading-snug flex items-center justify-between gap-2">
                                      <span>{u.focus}</span>
                                      <ArrowRight className="w-3 h-3 shrink-0 text-[var(--app-primary)] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Clean, Uncluttered Interactive Lessons Catalog Grid with Difficulty Dividers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-testid="academy-lessons-grid">
                  {(() => {
                    const filteredLessons = LESSONS_CATALOG.filter((lesson) => {
                      if (academyStageFilter === 'ALL') return true;
                      if (academyStageFilter === 'FUNDAMENTOS') return lesson.stageNumber <= 2;
                      if (academyStageFilter === 'TACTICA_VIDA')
                        return lesson.stageNumber >= 3 && lesson.stageNumber <= 6;
                      return lesson.stageNumber >= 7;
                    });

                    const getDifficultyGroup = (stageNum: number) => {
                      if (stageNum <= 2) {
                        return {
                          id: 'BASICO',
                          badge: 'Nivel Básico · Clases 1–15',
                          title: 'Fundamentos del Tablero, Captura y Territorio',
                          description:
                            'Reglas esenciales, libertades, atari, jugadas ilegales (suicidio y Ko), vida inicial y conteo en 9×9.',
                        };
                      }
                      if (stageNum <= 6) {
                        return {
                          id: 'INTERMEDIO',
                          badge: 'Nivel Intermedio · Clases 16–30',
                          title: 'Táctica, Lectura, Formas y Vida y Muerte (Tsumego)',
                          description:
                            'Conexión y corte, escaleras (shicho), redes (geta), tesuji tácticos, dos ojos reales, ojos falsos y seki.',
                        };
                      }
                      return {
                        id: 'AVANZADO',
                        badge: 'Nivel Avanzado · Clases 31–45',
                        title: 'Apertura (Fuseki), Medio Juego, Ataque y Cierre (Yose)',
                        description:
                          'Principios de esquina-lado-centro, invasión vs reducción, iniciativa (sente/gote) y técnica de cierre final.',
                      };
                    };

                    return filteredLessons.map((lesson, idx) => {
                      const globalNumber =
                        LESSONS_CATALOG.findIndex((l) => l.id === lesson.id) + 1;
                      const prog = userState.lessonProgress[lesson.id];
                      const isLocked = prog?.status === 'LOCKED';
                      const isCompleted =
                        prog?.status === 'COMPLETED' || prog?.status === 'MASTERED';
                      const isExpanded =
                        expandedLessonCardId === lesson.id ||
                        lesson.id === nextRecommendedLesson.id;
                      const isHighlighted = highlightedLessonId === lesson.id;

                      const currentGroup = getDifficultyGroup(lesson.stageNumber);
                      const prevGroup =
                        idx > 0
                          ? getDifficultyGroup(filteredLessons[idx - 1].stageNumber)
                          : null;
                      const showDifficultyDivider =
                        !prevGroup || prevGroup.id !== currentGroup.id;

                      return (
                        <React.Fragment key={lesson.id}>
                          {showDifficultyDivider && (
                            <div
                              data-testid={`academy-difficulty-divider-${currentGroup.id}`}
                              className="md:col-span-3 pt-2 first:pt-0"
                            >
                              <div className="rounded-2xl bg-[var(--app-surface)] border border-[var(--app-border)] px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
                                <div className="space-y-0.5">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="px-2.5 py-0.5 rounded-full bg-[var(--app-primary)] text-white text-[11px] font-mono font-bold">
                                      {currentGroup.badge}
                                    </span>
                                    <h3 className="text-sm sm:text-base font-display font-bold text-[var(--app-text)]">
                                      {currentGroup.title}
                                    </h3>
                                  </div>
                                  <p className="text-xs text-[var(--app-muted)]">
                                    {currentGroup.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          <div
                            data-testid={`lesson-card-${globalNumber}`}
                            data-locked={isLocked ? 'true' : 'false'}
                            className={`rounded-2xl border p-5 flex flex-col justify-between space-y-3 transition-all ${
                              isHighlighted
                                ? 'bg-[var(--app-surface)] border-[var(--app-primary)] ring-2 ring-[var(--app-primary)] shadow-md'
                                : isLocked
                                ? 'bg-[var(--app-subtle)]/50 border-[var(--app-border)] opacity-75'
                                : 'bg-[var(--app-surface)] border-[var(--app-border)] hover:border-[var(--app-primary)]/60 shadow-2xs'
                            }`}
                          >
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between gap-2 text-xs">
                                <span className="font-mono font-bold text-[var(--app-primary)]">
                                  Clase {globalNumber}
                                </span>
                                <div className="flex items-center gap-1.5">
                                  {isCompleted ? (
                                    <span
                                      title={`Clase concluida (${prog.scorePct}%)`}
                                      aria-label={`Clase concluida (${prog.scorePct}%)`}
                                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] font-mono text-[11px] font-bold"
                                    >
                                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                      <span>{prog.scorePct}%</span>
                                    </span>
                                  ) : isLocked ? (
                                    <span
                                      title={`Bloqueada: concluye primero la Clase ${globalNumber - 1}`}
                                      aria-label="Clase bloqueada"
                                      className="inline-flex items-center justify-center p-1 rounded-lg bg-[var(--app-subtle)] border border-[var(--app-border)] text-[var(--app-muted)]"
                                    >
                                      <Lock className="w-3.5 h-3.5" />
                                    </span>
                                  ) : (
                                    <span
                                      title="Clase disponible en turno"
                                      aria-label="Clase en turno"
                                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--app-subtle)] border border-[var(--app-primary)]/40 text-[var(--app-primary)] text-[11px] font-bold"
                                    >
                                      <Sparkles className="w-3 h-3 text-[#D97706]" />
                                      <span>En turno</span>
                                    </span>
                                  )}
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  setExpandedLessonCardId((prev) =>
                                    prev === lesson.id ? null : lesson.id
                                  )
                                }
                                className="text-left w-full cursor-pointer group"
                              >
                                <h3 className="text-base font-display font-bold text-[var(--app-text)] group-hover:text-[var(--app-primary)] transition-colors">
                                  {lesson.title}
                                </h3>
                              </button>

                              {isExpanded && (
                                <div className="space-y-2 pt-1">
                                  <p className="text-xs text-[var(--app-muted)] leading-relaxed">
                                    {lesson.subtitle}
                                  </p>
                                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-[var(--app-muted)] pt-0.5">
                                    <span className="inline-flex items-center gap-1">
                                      <Clock className="w-3 h-3 text-[var(--app-primary)]" />
                                      <span>{lesson.estimatedMinutes} min</span>
                                    </span>
                                    <span className="inline-flex items-center gap-1">
                                      <Zap className="w-3 h-3 text-[#D97706]" />
                                      <span>+{lesson.xpReward} XP</span>
                                    </span>
                                    <span
                                      className="inline-flex items-center gap-1 text-[#059669] font-semibold"
                                      data-testid={`lesson-jade-reward-${globalNumber}`}
                                    >
                                      <Gem className="w-3 h-3 text-[#059669]" />
                                      <span>+1 Jade</span>
                                    </span>
                                  </div>

                                  {SHOW_REWARD_TEST_BUTTONS && currentGroup.id === 'AVANZADO' && (
                                    <div className="pt-1">
                                      <button
                                        type="button"
                                        disabled={preloadingTestKey !== null}
                                        data-testid={`test-advanced-lesson-reward-btn-${globalNumber}`}
                                        onClick={() =>
                                          triggerTestSpecialVideo(
                                            `adv-${globalNumber}`,
                                            globalNumber === 45
                                              ? {
                                                  videoUrl: getAdvancedLessonSpecialVideoUrl(globalNumber),
                                                  congratsTitle: ROSHI_GRADUACION_TITLE,
                                                  accomplishmentText: ROSHI_GRADUACION_TITLE,
                                                  specialLevelDialogue: ROSHI_GRADUACION_DIALOGUE,
                                                }
                                              : {
                                                  videoUrl: getAdvancedLessonSpecialVideoUrl(globalNumber),
                                                  congratsTitle: '¡Clase Completada!',
                                                  subtitle: lesson.title,
                                                  xpEarned: lesson.xpReward,
                                                  totalJade: userState.jade ?? 2,
                                                }
                                          )
                                        }
                                        className="px-2.5 py-1 rounded-lg bg-[var(--app-subtle)] border border-[var(--app-primary)]/40 text-[11px] font-semibold text-[var(--app-primary)] hover:bg-[var(--app-primary)] hover:text-white disabled:opacity-60 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                                      >
                                        <Play className="w-3 h-3 fill-current" />
                                        <span>
                                          {preloadingTestKey === `adv-${globalNumber}`
                                            ? 'Cargando...'
                                            : globalNumber === 45
                                            ? 'Probar recompensa Graduación (Clase 45)'
                                            : `Probar recompensa (Clase ${globalNumber})`}
                                        </span>
                                      </button>
                                    </div>
                                  )}

                                  {SHOW_REWARD_TEST_BUTTONS && globalNumber === 30 && (
                                    <div className="pt-1">
                                      <button
                                        type="button"
                                        disabled={preloadingTestKey !== null}
                                        data-testid="test-intermediate-level-reward-btn"
                                        onClick={() =>
                                          triggerTestSpecialVideo('inter-30', {
                                            videoUrl: INTERMEDIATE_LEVEL_COMPLETE_SPECIAL_VIDEO_URL,
                                            congratsTitle:
                                              'Completaste el Nivel Intermedio de la Academia',
                                            accomplishmentText:
                                              'Completaste el Nivel Intermedio de la Academia',
                                            specialLevelDialogue: ROSHI_LEVEL_COMPLETE_DIALOGUE,
                                          })
                                        }
                                        className="px-2.5 py-1 rounded-lg bg-[var(--app-subtle)] border border-[var(--app-primary)]/40 text-[11px] font-semibold text-[var(--app-primary)] hover:bg-[var(--app-primary)] hover:text-white disabled:opacity-60 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                                      >
                                        <Play className="w-3 h-3 fill-current" />
                                        <span>
                                          {preloadingTestKey === 'inter-30'
                                            ? 'Cargando...'
                                            : 'Probar recompensa Nivel Intermedio'}
                                        </span>
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>

                            <div className="pt-2 border-t border-[var(--app-border)] flex items-center justify-between gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  setExpandedLessonCardId((prev) =>
                                    prev === lesson.id ? null : lesson.id
                                  )
                                }
                                title={
                                  isExpanded
                                    ? 'Ocultar resumen de la clase'
                                    : 'Ver resumen y duración de la clase'
                                }
                                aria-label={isExpanded ? 'Ocultar detalle' : 'Ver detalle'}
                                className={`p-2 rounded-xl border transition-colors cursor-pointer inline-flex items-center gap-1 text-[11px] font-semibold ${
                                  isExpanded
                                    ? 'bg-[var(--app-subtle)] border-[var(--app-primary)] text-[var(--app-primary)]'
                                    : 'bg-[var(--app-subtle)]/60 border-[var(--app-border)] text-[var(--app-muted)] hover:text-[var(--app-text)]'
                                }`}
                              >
                                <Info className="w-3.5 h-3.5" />
                              </button>

                              <button
                                type="button"
                                disabled={isLocked}
                                title={
                                  isLocked
                                    ? `Bloqueada: concluye primero la Clase ${globalNumber - 1}`
                                    : undefined
                                }
                                onClick={() => {
                                  if (!isLocked) {
                                    resetViewportScrollToTop();
                                    setActiveLessonId(lesson.id);
                                  }
                                }}
                                className={`py-2 px-3.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-colors ${
                                  isLocked
                                    ? 'bg-[var(--app-subtle)] text-[var(--app-muted)] cursor-not-allowed border border-[var(--app-border)]'
                                    : 'bg-[var(--app-primary)] text-white hover:bg-[var(--app-primary-hover)] cursor-pointer'
                                }`}
                              >
                                {isLocked ? (
                                  <>
                                    <Lock className="w-3.5 h-3.5" />
                                    <span>Bloqueada</span>
                                  </>
                                ) : (
                                  <>
                                    <span>{isCompleted ? 'Repasar' : 'Iniciar'}</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    });
                  })()}
                </div>

                {/* Animated Top Return-to-Top Cue (Adapted aesthetically for top of viewport) */}
                {showAcademyScrollTopCue && (
                  <button
                    type="button"
                    data-testid="academy-scroll-top-cue"
                    onClick={() => {
                      const topSection = document.querySelector<HTMLElement>(
                        '[data-testid="academy-roshi-welcome-section"]'
                      );
                      if (topSection) {
                        animateScrollToElement(topSection, 'start', 520);
                      } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    aria-label="Regresar al inicio de la pestaña Academia"
                    title="Regresar al inicio de la pestaña Academia"
                    className="academy-top-cue fixed top-[106px] sm:top-[112px] left-1/2 z-[45] min-w-[210px] sm:min-w-[248px] py-2 px-5 rounded-2xl bg-gradient-to-b from-[var(--app-primary)]/92 via-[var(--app-primary)]/76 to-[var(--app-primary)]/50 hover:from-[var(--app-primary)] hover:via-[var(--app-primary)]/88 backdrop-blur-xs border border-white/35 shadow-lg flex items-center justify-center gap-3 cursor-pointer select-none transition-all group"
                  >
                    <div className="flex flex-col items-center -space-y-3 text-white drop-shadow-xs">
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 academy-chevron-up-wave-1" />
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 academy-chevron-up-wave-2" />
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 academy-chevron-up-wave-3" />
                    </div>
                    <div className="flex flex-col items-center leading-tight">
                      <span className="text-xs sm:text-sm font-sans font-bold tracking-tight text-white drop-shadow-xs">
                        Subir al inicio
                      </span>
                      <span className="text-[10px] font-mono font-semibold tracking-tight text-white/90 drop-shadow-xs">
                        Academia
                      </span>
                    </div>
                    <div className="flex flex-col items-center -space-y-3 text-white drop-shadow-xs">
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 academy-chevron-up-wave-1" />
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 academy-chevron-up-wave-2" />
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 academy-chevron-up-wave-3" />
                    </div>
                  </button>
                )}
              </div>
            )}

            {/* TAB 3: DOJO DE PUZZLES */}
            {activeTab === 'PUZZLES' && (
              <PuzzleArena
                puzzles={PUZZLES_CATALOG}
                initialPuzzleId={targetPuzzleId}
                puzzleRecords={userState.puzzleRecords}
                visualLayers={userState.profile.defaultVisualLayers}
                soundEnabled={userState.profile.soundEnabled}
                onToggleLayer={handleToggleLayer}
                onRecordAttempt={(params) => {
                  const wasGoalMet = Boolean(userState.dailyHistory[getLocalTodayString()]?.goalMet);
                  const res = storageRepository.recordPuzzleAttempt(userState, params);
                  const promotion = detectStudentTitlePromotion(userState.xp, res.state.xp);
                  const isNowGoalMet = Boolean(
                    res.state.dailyHistory[getLocalTodayString()]?.goalMet
                  );
                  if (promotion) {
                    const promoModal = getTitlePromotionSpecialReward(
                      promotion.newTier.title,
                      promotion.newTier.rankLabel
                    );
                    enqueueOrShowSpecialVideo(promoModal);
                  } else if (!wasGoalMet && isNowGoalMet) {
                    notifySpecialRewardPriority();
                  }
                  setUserState(res.state);
                  return {
                    xpAwarded: res.xpAwarded,
                    specialRewardTriggered: Boolean(promotion || (!wasGoalMet && isNowGoalMet)),
                  };
                }}
                onOpenLesson={(lessonId) => {
                  setActiveTab('LEARN');
                  setActiveLessonId(lessonId);
                }}
                totalJade={userState.jade ?? 2}
              />
            )}

            {/* TAB 4: PRÁCTICA */}
            {activeTab === 'PLAY' && (
              <PlayAndDemoView
                scoringRule={userState.profile.scoringRulePreference}
                visualLayers={userState.profile.defaultVisualLayers}
                soundEnabled={userState.profile.soundEnabled}
                onToggleLayer={handleToggleLayer}
                totalJade={userState.jade ?? 2}
              />
            )}

            {/* TAB 5: PERFIL (Unifica Perfil, Ajustes, Recompensas y Colección) */}
            {activeTab === 'PROFILE' && (
              <div className="max-w-6xl mx-auto space-y-6">
                <div className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-6 space-y-5 shadow-2xs">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--app-border)] pb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-2xl font-display font-bold text-[var(--app-text)]">
                          Perfil · {currentRank.rankLabel} ({studentLevel.title})
                        </h1>
                        <span className="px-2.5 py-0.5 rounded-full bg-[var(--app-subtle)] border border-[var(--app-primary)]/40 text-xs font-mono font-bold text-[var(--app-primary)]">
                          Rango Kyu Activo
                        </span>
                      </div>
                      <p className="text-xs text-[var(--app-muted)] mt-0.5">
                        {studentLevel.description} · Próximo rango a los {studentLevel.nextThreshold} XP ({studentLevel.progressPct}%)
                      </p>
                    </div>
                    <div className="text-2xl font-mono font-bold text-[var(--app-primary)]">
                      {userState.xp} XP
                    </div>
                  </div>

                  {/* Contexto del Nivel de Estudiante (Kyu) y Títulos del Dojo (Oculto por defecto hasta hacer clic) */}
                  <div
                    className="rounded-2xl bg-[var(--app-subtle)] border border-[var(--app-border)] p-4 sm:p-5 space-y-3"
                    data-testid="profile-rank-progression-section"
                  >
                    <button
                      type="button"
                      onClick={() => setShowRankProgressionInfo((prev) => !prev)}
                      aria-expanded={showRankProgressionInfo}
                      data-testid="toggle-rank-progression-btn"
                      className="w-full text-left flex items-center justify-between gap-3 cursor-pointer group"
                    >
                      <h2 className="text-sm font-display font-bold text-[var(--app-text)] group-hover:text-[var(--app-primary)] transition-colors flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-[var(--app-primary)] shrink-0" />
                        <span>
                          ¿Qué significa el grado «{currentRank.rankLabel}» y cómo asciendes de título?
                        </span>
                      </h2>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--app-primary)] shrink-0">
                        <span>{showRankProgressionInfo ? 'Ocultar' : 'Ver detalle'}</span>
                        {showRankProgressionInfo ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </span>
                    </button>

                    {showRankProgressionInfo && (
                      <div className="space-y-3 pt-2 border-t border-[var(--app-border)] animate-in fade-in duration-150">
                        <p className="text-xs text-[var(--app-muted)] leading-relaxed">
                          En la tradición del Go, los estudiantes en formación se clasifican en grados <strong>Kyu</strong>. El camino comienza en <strong>25 Kyu (Novato)</strong> y el número disminuye conforme tu lectura táctica y comprensión estratégica se fortalecen hasta acercarte a los grados avanzados. Ganas experiencia (<strong>XP</strong>) y <strong>+1 Jade</strong> al concluir cada clase o resolver cada puzzle.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
                          {STUDENT_LEVEL_TIERS.map((tier) => {
                            const isCurrentTier = tier.title === studentLevel.title;
                            const isReached = userState.xp >= tier.min;
                            return (
                              <div
                                key={tier.rankLabel}
                                data-testid={`rank-tier-${tier.rankLabel.replace(/\s+/g, '-')}`}
                                className={`p-3 rounded-xl border text-xs space-y-1 transition-all ${
                                  isCurrentTier
                                    ? 'bg-[var(--app-roshi-bg)] border-[var(--app-primary)] shadow-2xs'
                                    : isReached
                                    ? 'bg-[var(--app-surface)] border-[#059669]/40'
                                    : 'bg-[var(--app-surface)]/70 border-[var(--app-border)] opacity-85'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-1">
                                  <span className="font-mono font-bold text-[var(--app-primary)]">
                                    {tier.rankLabel}
                                  </span>
                                  <span className="text-[10px] font-mono text-[var(--app-muted)]">
                                    {tier.min}–{tier.max} XP
                                  </span>
                                </div>
                                <div className="font-display font-bold text-[var(--app-text)] flex items-center gap-1">
                                  <span>{tier.title}</span>
                                  {isCurrentTier && (
                                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[var(--app-primary)] text-white font-sans">
                                      Actual
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-[var(--app-muted)] leading-snug">
                                  {tier.description}
                                </p>
                                {SHOW_REWARD_TEST_BUTTONS && tier.title !== 'Novato' && (
                                  <div className="pt-1">
                                    <button
                                      type="button"
                                      disabled={preloadingTestKey !== null}
                                      data-testid={`test-title-promotion-btn-${tier.title}`}
                                      onClick={() =>
                                        triggerTestSpecialVideo(
                                          `promo-${tier.title}`,
                                          getTitlePromotionSpecialReward(tier.title, tier.rankLabel)
                                        )
                                      }
                                      className="px-2 py-1 rounded-lg bg-[var(--app-subtle)] border border-[var(--app-primary)]/40 text-[10px] font-semibold text-[var(--app-primary)] hover:bg-[var(--app-primary)] hover:text-white disabled:opacity-60 transition-colors inline-flex items-center gap-1 cursor-pointer"
                                    >
                                      <Play className="w-2.5 h-2.5 fill-current" />
                                      <span>
                                        {preloadingTestKey === `promo-${tier.title}`
                                          ? 'Cargando...'
                                          : `Probar ascenso (${tier.title})`}
                                      </span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <MaestroRoshiTeachingCard
                    title="Maestro Roshi · Evaluación del Discípulo"
                    message={`Llevas ${completedLessonsCount} clases completadas y ${solvedPuzzlesTotal} problemas tácticos resueltos con una racha de ${userState.streakDays} día(s). La maestría en el Go se forja con constancia serena día tras día.`}
                    subMessage={`Meta diaria actual: ${userState.profile.dailyGoalMinutes} minutos · Reglas preferidas: ${
                      userState.profile.scoringRulePreference === 'AREA_CHINESE'
                        ? 'Área (Chinas)'
                        : 'Territorio (Japonesas)'
                    }.`}
                    subMessageLabel="Disciplina de estudio:"
                    interactionKey={`profile-roshi-${completedLessonsCount}-${solvedPuzzlesTotal}`}
                    dismissLabel="Entendido"
                    avatarSize="sm"
                    testId="profile-roshi-card"
                    autoOpenSpotlight={!skipProfileRoshiSpotlight}
                    centerBoardOnDismiss={false}
                  />

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-xl bg-[var(--app-subtle)] border border-[var(--app-border)] space-y-1">
                      <div className="text-[11px] text-[var(--app-muted)]">Clases</div>
                      <div className="text-lg font-mono font-bold text-[var(--app-text)]">
                        {completedLessonsCount} / {LESSONS_CATALOG.length}
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[var(--app-subtle)] border border-[var(--app-border)] space-y-1">
                      <div className="text-[11px] text-[var(--app-muted)]">Puzzles</div>
                      <div className="text-lg font-mono font-bold text-[var(--app-text)]">
                        {solvedPuzzlesTotal} / {PUZZLES_CATALOG.length}
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[var(--app-subtle)] border border-[var(--app-border)] space-y-1">
                      <div className="text-[11px] text-[var(--app-muted)]">Racha</div>
                      <div className="text-lg font-mono font-bold text-[#D97706]">
                        {userState.streakDays} días
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[var(--app-subtle)] border border-[var(--app-border)] space-y-1">
                      <div className="text-[11px] text-[var(--app-muted)]">Jade</div>
                      <div className="text-lg font-mono font-bold text-[#059669]">
                        {userState.jade ?? 2}
                      </div>
                    </div>
                  </div>

                  {/* Settings Controls */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3 py-2">
                      <div className="text-sm font-semibold text-[var(--app-text)]">
                        Objetivo diario
                      </div>
                      <div className="flex items-center gap-1.5 bg-[var(--app-subtle)] p-1 rounded-xl border border-[var(--app-border)]">
                        {([5, 10, 15, 20] as const).map((mins) => (
                          <button
                            key={mins}
                            type="button"
                            onClick={() => {
                              const next: UserState = {
                                ...userState,
                                profile: { ...userState.profile, dailyGoalMinutes: mins },
                              };
                              storageRepository.saveUserState(next);
                              setUserState(next);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold cursor-pointer ${
                              userState.profile.dailyGoalMinutes === mins
                                ? 'bg-[var(--app-primary)] text-white'
                                : 'text-[var(--app-text)]/75'
                            }`}
                          >
                            {mins} min
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 py-2 border-t border-[var(--app-border)]">
                      <div className="text-sm font-semibold text-[var(--app-text)]">
                        Reglas de puntuación
                      </div>
                      <div className="flex items-center gap-1.5 bg-[var(--app-subtle)] p-1 rounded-xl border border-[var(--app-border)]">
                        <button
                          type="button"
                          onClick={() => {
                            const next: UserState = {
                              ...userState,
                              profile: {
                                ...userState.profile,
                                scoringRulePreference: 'AREA_CHINESE',
                              },
                            };
                            storageRepository.saveUserState(next);
                            setUserState(next);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                            userState.profile.scoringRulePreference === 'AREA_CHINESE'
                              ? 'bg-[var(--app-primary)] text-white'
                              : 'text-[var(--app-text)]/75'
                          }`}
                        >
                          Área (Chinas)
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const next: UserState = {
                              ...userState,
                              profile: {
                                ...userState.profile,
                                scoringRulePreference: 'TERRITORY_JAPANESE',
                              },
                            };
                            storageRepository.saveUserState(next);
                            setUserState(next);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                            userState.profile.scoringRulePreference === 'TERRITORY_JAPANESE'
                              ? 'bg-[var(--app-primary)] text-white'
                              : 'text-[var(--app-text)]/75'
                          }`}
                        >
                          Territorio (Japonesas)
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-2 border-t border-[var(--app-border)]">
                      <div className="text-sm font-semibold text-[var(--app-text)]">
                        Sonidos del tablero
                      </div>
                      <button
                        type="button"
                        aria-pressed={userState.profile.soundEnabled}
                        onClick={handleToggleSound}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                          userState.profile.soundEnabled
                            ? 'bg-[var(--app-primary)] text-white'
                            : 'bg-[var(--app-subtle)] text-[var(--app-text)]/75 border border-[var(--app-border)]'
                        }`}
                      >
                        {userState.profile.soundEnabled ? 'Activado' : 'Silenciado'}
                      </button>
                    </div>

                    <div
                      className="flex flex-wrap items-center justify-between gap-2 py-2 border-t border-[var(--app-border)]"
                      data-testid="profile-hoy-reviews-setting"
                    >
                      <div>
                        <div className="text-sm font-semibold text-[var(--app-text)]">
                          Repasos de la sección Hoy
                        </div>
                        <div className="text-xs text-[var(--app-muted)]">
                          Por defecto, una vez resueltos ya no pueden resolverse de nuevo por ese día
                        </div>
                      </div>
                      <button
                        type="button"
                        data-testid="toggle-allow-repeat-hoy-reviews-btn"
                        aria-pressed={Boolean(userState.profile.allowRepeatHoyReviews)}
                        onClick={() => {
                          const nextAllow = !userState.profile.allowRepeatHoyReviews;
                          setUserState((prev) =>
                            storageRepository.setAllowRepeatHoyReviews(prev, nextAllow)
                          );
                        }}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                          userState.profile.allowRepeatHoyReviews
                            ? 'bg-[var(--app-primary)] text-white'
                            : 'bg-[var(--app-subtle)] text-[var(--app-text)]/75 border border-[var(--app-border)]'
                        }`}
                      >
                        {userState.profile.allowRepeatHoyReviews
                          ? 'Desbloqueados'
                          : 'Desbloquear repasos'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* RECOMPENSAS Y PALETAS DE COLOR (Justo debajo de Sonidos del tablero) */}
                <PaletasYRecompensasView
                  activeAppTheme={activeAppTheme}
                  activeBoardTheme={activeBoardTheme}
                  previewAppTheme={previewAppTheme}
                  previewBoardTheme={previewBoardTheme}
                  lockedHeaderThemeId={lockedHeaderThemeId}
                  lockedThemeNoticeSeq={lockedThemeNoticeSeq}
                  unlockedAppThemes={unlockedAppThemes}
                  unlockedBoardThemes={unlockedBoardThemes}
                  studentRankTitle={currentRank.rankLabel}
                  streakDays={userState.streakDays}
                  jadeCount={userState.jade ?? 2}
                  soundEnabled={userState.profile.soundEnabled}
                  visualLayers={userState.profile.defaultVisualLayers}
                  onSelectAppTheme={handleSelectAppTheme}
                  onSelectBoardTheme={handleSelectBoardTheme}
                  onPreviewAppTheme={(nextTheme) => {
                    setLockedHeaderThemeId(null);
                    setPreviewAppTheme(nextTheme);
                  }}
                  onPreviewBoardTheme={(nextBoardTheme) => {
                    setLockedHeaderThemeId(null);
                    setPreviewBoardTheme(nextBoardTheme);
                  }}
                  onUnlockAppTheme={handleUnlockAppTheme}
                  onUnlockBoardTheme={handleUnlockBoardTheme}
                  onSwapTheme={handleSwapTheme}
                  onRefundTheme={handleRefundTheme}
                  onToggleLayer={handleToggleLayer}
                />

                {/* Toggle Buttons for Secondary Sections (Review, Badges, Glossary) */}
                <section
                  className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-5 space-y-4"
                  data-testid="student-collection-section"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-sm font-display font-bold text-[var(--app-text)]">
                      Colección del Estudiante
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {(
                        [
                          {
                            id: 'REVIEW',
                            label: `Cola de Repaso y Habilidades (${puzzlesNeedingReview.length})`,
                          },
                          {
                            id: 'BADGES',
                            label: `Insignias (${
                              userState.achievements.filter((a) => a.unlocked).length
                            }/${userState.achievements.length})`,
                          },
                          {
                            id: 'GLOSSARY',
                            label: `Glosario de Go (${GO_GLOSSARY.length})`,
                          },
                        ] as const
                      ).map((sec) => {
                        const isOpen = activeCollectionPanel === sec.id;
                        return (
                          <button
                            key={sec.id}
                            type="button"
                            onClick={() => {
                              const nextPanel = activeCollectionPanel === sec.id ? 'NONE' : sec.id;
                              setActiveCollectionPanel(nextPanel);
                              if (nextPanel !== 'NONE') {
                                setTimeout(() => {
                                  const el = document.querySelector<HTMLElement>(
                                    '[data-testid="student-collection-section"]'
                                  );
                                  if (el) {
                                    animateScrollToElement(el, 'start', 420);
                                  }
                                }, 60);
                              }
                            }}
                            aria-expanded={isOpen}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                              isOpen
                                ? 'bg-[var(--app-primary)] text-white border-[var(--app-primary)]'
                                : 'bg-[var(--app-subtle)] text-[var(--app-text)] border-[var(--app-border)] hover:border-[var(--app-primary)]'
                            }`}
                          >
                            <span>{sec.label}</span>
                            {isOpen ? (
                              <ChevronUp className="w-3.5 h-3.5" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {activeCollectionPanel === 'REVIEW' && (
                    <div className="pt-4 border-t border-[var(--app-border)] space-y-4">
                      <div
                        className="grid grid-cols-2 md:grid-cols-3 gap-3"
                        data-testid="profile-skills-mastery-grid"
                      >
                        {Object.values(userState.skillMastery).map((skill) => (
                          <div
                            key={skill.theme}
                            className="p-3 rounded-xl bg-[var(--app-subtle)] border border-[var(--app-border)] space-y-1"
                          >
                            <div className="flex items-center justify-between text-xs font-semibold">
                              <span>{skill.label}</span>
                              <span className="font-mono text-[var(--app-primary)]">
                                {skill.confidencePct}%
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-[var(--app-surface)] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[var(--app-primary)]"
                                style={{ width: `${skill.confidencePct}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {puzzlesNeedingReview.length === 0 ? (
                        <div
                          className="p-4 rounded-xl bg-[var(--app-subtle)] border border-[var(--app-border)] flex items-center justify-between"
                          data-testid="profile-review-cta-box"
                        >
                          <span className="text-xs text-[var(--app-text)]">
                            ¡Estás al día! No tienes ningún puzzle pendiente de repaso.
                          </span>
                          <button
                            type="button"
                            onClick={() => handleSelectNavTab('PUZZLES')}
                            className="px-3 py-1.5 rounded-lg bg-[var(--app-primary)] text-white text-xs font-semibold cursor-pointer"
                          >
                            Practicar puzzles
                          </button>
                        </div>
                      ) : (
                        <div
                          className="grid grid-cols-1 md:grid-cols-2 gap-3"
                          data-testid="profile-review-cta-box"
                        >
                          {puzzlesNeedingReview.map((p) => (
                            <div
                              key={p.id}
                              className="p-3.5 rounded-xl bg-[var(--app-subtle)] border border-[var(--app-border)] flex items-center justify-between gap-3"
                            >
                              <div className="text-xs">
                                <div className="font-mono font-bold text-[var(--app-primary)]">
                                  #{p.number} · {p.themeLabel}
                                </div>
                                <div className="font-bold text-[var(--app-text)]">{p.title}</div>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setTargetPuzzleId(p.id);
                                  handleSelectNavTab('PUZZLES');
                                }}
                                className="px-3 py-1.5 rounded-lg bg-[var(--app-primary)] text-white text-xs font-semibold cursor-pointer shrink-0"
                              >
                                Resolver
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {activeCollectionPanel === 'BADGES' && (
                    <div className="pt-4 border-t border-[var(--app-border)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {userState.achievements.map((badge) => {
                        const isBadgeExpanded = expandedBadgeId === badge.id;
                        return (
                          <div
                            key={badge.id}
                            data-testid={`badge-card-${badge.id}`}
                            data-unlocked={badge.unlocked ? 'true' : 'false'}
                            onClick={() =>
                              setExpandedBadgeId((prev) => (prev === badge.id ? null : badge.id))
                            }
                            className={`p-3.5 rounded-xl border space-y-1.5 cursor-pointer transition-all ${
                              badge.unlocked
                                ? 'bg-[var(--app-subtle)] border-[var(--app-primary)]'
                                : 'bg-[var(--app-subtle)]/50 border-[var(--app-border)] opacity-80 hover:opacity-100'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 text-xs">
                              <span className="font-display font-bold text-[var(--app-text)]">
                                {badge.title}
                              </span>
                              <div className="flex items-center gap-1.5 shrink-0">
                                <span
                                  title={`Recompensa: ${badge.jadeReward ?? 2} piedras de Jade`}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[var(--app-surface)] border border-[var(--app-border)] font-mono font-bold text-[11px] text-[#059669]"
                                >
                                  <Gem className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                                  <span>{badge.jadeReward ?? 2}</span>
                                </span>
                                <span
                                  data-testid={`badge-status-icon-${badge.id}`}
                                  title={
                                    badge.unlocked
                                      ? 'Insignia desbloqueada'
                                      : `Requisito para desbloquear: ${badge.conditionText}`
                                  }
                                  aria-label={badge.unlocked ? 'Insignia desbloqueada' : 'Insignia bloqueada'}
                                  className={`p-1 rounded-lg border inline-flex items-center justify-center ${
                                    badge.unlocked
                                      ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#059669]'
                                      : 'bg-[var(--app-surface)] border-[var(--app-border)] text-[var(--app-muted)]'
                                  }`}
                                >
                                  {badge.unlocked ? (
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                  ) : (
                                    <Lock className="w-3.5 h-3.5" />
                                  )}
                                </span>
                              </div>
                            </div>
                            <p className="text-xs text-[var(--app-muted)]">{badge.description}</p>
                            {isBadgeExpanded && (
                              <p className="text-[11px] font-mono text-[var(--app-primary)] pt-1 border-t border-[var(--app-border)]">
                                Requisito: {badge.conditionText}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {activeCollectionPanel === 'GLOSSARY' && (
                    <div className="pt-4 border-t border-[var(--app-border)] grid grid-cols-1 md:grid-cols-2 gap-3">
                      {GO_GLOSSARY.map((item) => (
                        <div
                          key={item.term}
                          className="p-3.5 rounded-xl bg-[var(--app-subtle)] border border-[var(--app-border)] space-y-1"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-[var(--app-primary)]">{item.term}</span>
                            {item.japanese && (
                              <span className="text-[var(--app-muted)]">{item.japanese}</span>
                            )}
                          </div>
                          <p className="text-xs text-[var(--app-text)]">{item.definition}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                {/* Collapsible Data & Reset Options placed at the very end of the Perfil tab */}
                <section
                  className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-5 space-y-3 shadow-2xs"
                  data-testid="profile-data-reset-section"
                >
                  <button
                    type="button"
                    onClick={() => {
                      const nextOpen = !showProfileDataOptions;
                      setShowProfileDataOptions(nextOpen);
                      if (nextOpen) {
                        setTimeout(() => {
                          const el = document.querySelector<HTMLElement>(
                            '[data-testid="profile-data-reset-section"]'
                          );
                          if (el) {
                            animateScrollToElement(el, 'center', 420);
                          }
                        }, 60);
                      }
                    }}
                    aria-expanded={showProfileDataOptions}
                    data-testid="toggle-profile-data-options-btn"
                    className="text-xs font-semibold text-[var(--app-muted)] hover:text-[var(--app-text)] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>
                      {showProfileDataOptions
                        ? 'Ocultar opciones de datos'
                        : 'Mostrar opciones de datos y reinicio'}
                    </span>
                    {showProfileDataOptions ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {showProfileDataOptions && (
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--app-border)]">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setShowOnboardingModal(true)}
                          className="px-3.5 py-2 rounded-xl border border-[var(--app-border)] text-xs font-medium text-[var(--app-text)] hover:bg-[var(--app-subtle)] cursor-pointer"
                        >
                          Repetir bienvenida
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const blob = new Blob([JSON.stringify(userState, null, 2)], {
                              type: 'application/json',
                            });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `camino-de-go-progreso-${todayStr}.json`;
                            a.click();
                            URL.revokeObjectURL(url);
                          }}
                          className="px-3.5 py-2 rounded-xl border border-[var(--app-border)] text-xs font-medium text-[var(--app-text)] hover:bg-[var(--app-subtle)] flex items-center gap-1.5 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Exportar JSON</span>
                        </button>
                      </div>

                      {!confirmResetProgress ? (
                        <button
                          type="button"
                          data-testid="reset-local-progress-btn"
                          onClick={() => {
                            setConfirmResetProgress(true);
                            notifySpecialRewardPriority();
                            setSpecialVideoRewardModal({
                              open: true,
                              videoUrl: ROSHI_RESET_PROGRESS_VIDEO_URL,
                              congratsTitle: ROSHI_RESET_PROGRESS_TITLE,
                              accomplishmentText: ROSHI_RESET_PROGRESS_TITLE,
                              specialLevelDialogue: ROSHI_RESET_PROGRESS_DIALOGUE,
                            });
                          }}
                          className="px-3.5 py-2 rounded-xl border border-red-300 text-red-800 hover:bg-red-50 text-xs font-medium cursor-pointer"
                        >
                          Borrar progreso local
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-lg border border-red-200">
                          <span className="text-xs text-red-900 font-semibold">
                            ¿Confirmas borrar todo?
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const reset = storageRepository.resetAllProgress();
                              setUserState(reset);
                              setConfirmResetProgress(false);
                              setShowOnboardingModal(true);
                            }}
                            className="px-2.5 py-1 bg-red-700 text-white text-xs font-semibold rounded cursor-pointer"
                          >
                            Sí, borrar
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmResetProgress(false)}
                            className="px-2 py-1 text-xs text-red-900 cursor-pointer"
                          >
                            Cancelar
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </section>
              </div>
            )}
          </>
        )}
      </main>

      {/* Special Video Reward Overlay (for Hoy Reviews or Daily Mission) */}
      {specialVideoRewardModal && (
        <CelebrationGifOverlay
          open={specialVideoRewardModal.open}
          videoUrl={specialVideoRewardModal.videoUrl}
          congratsTitle={specialVideoRewardModal.congratsTitle}
          subtitle={specialVideoRewardModal.subtitle}
          xpEarned={specialVideoRewardModal.xpEarned}
          totalJade={specialVideoRewardModal.totalJade}
          accomplishmentText={specialVideoRewardModal.accomplishmentText}
          specialLevelDialogue={specialVideoRewardModal.specialLevelDialogue}
          bottomScoreText={specialVideoRewardModal.bottomScoreText}
          onClose={() => {
            const nextQueued = pendingSpecialVideoQueueRef.current.shift();
            if (nextQueued) {
              notifySpecialRewardPriority();
              setSpecialVideoRewardModal({
                ...nextQueued,
                open: true,
              });
            } else {
              setSpecialVideoRewardModal((prev) => (prev ? { ...prev, open: false } : null));
              if (pendingDailyMissionVideoRef.current && activeLessonId === null) {
                pendingDailyMissionVideoRef.current = false;
                showDailyMissionSpecialVideo();
              }
            }
          }}
          actionLabel="Continuar"
          testId="special-video-reward-overlay"
        />
      )}
    </div>
  );
}
