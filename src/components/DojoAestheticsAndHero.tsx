import React, { useEffect, useMemo, useState } from 'react';
import {
  Compass,
  Flame,
  Gem,
  Palette,
  Play,
  RotateCcw,
  Sparkles,
  Check,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Lock,
  Eye,
  ArrowLeftRight,
} from 'lucide-react';
import {
  AppThemeId,
  BoardThemeId,
  BoardVisualLayers,
  Coord,
  LessonContent,
  LessonProgress,
  PlayerColor,
} from '../types/go';
import {
  APP_THEMES_CATALOG,
  BOARD_THEMES_CATALOG,
  DEFAULT_UNLOCKED_APP_THEMES,
  DEFAULT_UNLOCKED_BOARD_THEMES,
  DRAGON_BALL_HOY_PROFILE_BASE_BG,
  DRAGON_BALL_HOY_PROFILE_PARALLAX_LAYERS,
  DRAGON_BALL_PARALLAX_BASE_BG,
  DRAGON_BALL_PARALLAX_LAYERS,
  getAppThemeById,
  getBoardThemeById,
  isDragonBallHoyOrProfileTab,
  MAESTRO_ROSHI_TEACHINGS,
} from '../content/themesData';
import { LESSONS_CATALOG } from '../content/curriculumData';
import { GoBoard } from './GoBoard';
import { coordsEqual, coordToLabel, validateAndPlayMove, createGameState } from '../engine/goEngine';
import { playStoneSound, playSuccessChime } from '../utils/sound';
import {
  animateScrollToElement,
  centerActiveGoBoardInView,
  MaestroRoshiSpriteAvatar,
  MaestroRoshiTeachingCard,
  notifySpecialRewardPriority,
} from './MaestroRoshiTeachingCard';
import {
  getCurrentGlobalRoshiSpec,
  resetGlobalConsecutiveMistakes,
} from '../utils/roshiSpriteScheduler';
import {
  buildHeroBottomLessonCards,
  buildHeroReviewScenarios,
} from '../utils/heroReviewLogic';

export const MaestroRoshiAvatar: React.FC<{ pulseKey?: number }> = ({ pulseKey = 0 }) => {
  return (
    <MaestroRoshiSpriteAvatar
      spec={getCurrentGlobalRoshiSpec()}
      isTalking={true}
      popKey={pulseKey}
      size="md"
    />
  );
};

export interface DragonBallParallaxBackgroundProps {
  active: boolean;
  activeTab?: 'HOME' | 'LEARN' | 'PUZZLES' | 'PLAY' | 'PROFILE';
  hasActiveLesson?: boolean;
}

/**
 * Multi-layer Dragon Ball Parallax background supporting 2 parallax groups:
 * - Group 2 (visible on HOY and PERFIL tabs):
 *   Sky & clouds base (`fondo_ca47cea4.webp`) synchronized as one single piece with the cloud cutouts (`3_bb43a599.webp`),
 *   Shenlong (`5_a7530eb6.webp`) moving vertically behind the clouds, and full-res Goku (`goku_5ec46cd4.png`),
 *   Bulma (`bulma_0745a655.png`), and Roshi (`roshi_1b1537ff.png`) flying diagonally across the sky.
 * - Group 1 (visible on ACADEMIA, PUZZLES, and PRÁCTICA tabs):
 *   Namek invocation of Shenlong (`fondo_oscuro` + Layers 6 -> 5 -> 4 -> 3 -> 2 -> 1).
 */
export const DragonBallParallaxBackground: React.FC<DragonBallParallaxBackgroundProps> = ({
  active,
  activeTab = 'HOME',
  hasActiveLesson = false,
}) => {
  const baseBgRef = React.useRef<HTMLDivElement | null>(null);
  const layerRefs = React.useRef<Record<string, HTMLDivElement | null>>({});

  const isHoyOrProfileGroup = isDragonBallHoyOrProfileTab(activeTab, hasActiveLesson);
  const activeBaseBg = isHoyOrProfileGroup
    ? DRAGON_BALL_HOY_PROFILE_BASE_BG
    : DRAGON_BALL_PARALLAX_BASE_BG;
  const activeLayers = isHoyOrProfileGroup
    ? DRAGON_BALL_HOY_PROFILE_PARALLAX_LAYERS
    : DRAGON_BALL_PARALLAX_LAYERS;

  useEffect(() => {
    if (!active || typeof window === 'undefined') return;

    let rafId: number | null = null;

    const applyParallaxTransforms = () => {
      rafId = null;
      const scrollY = Math.max(0, window.scrollY || window.pageYOffset || 0);

      // Compute shared base background vertical offset
      const baseSpeed = isHoyOrProfileGroup ? -0.04 : -0.015;
      const baseMaxPx = isHoyOrProfileGroup ? 42 : 18;
      const baseY = baseMaxPx * Math.tanh((scrollY * baseSpeed) / Math.max(1, baseMaxPx));

      if (baseBgRef.current) {
        baseBgRef.current.style.transform = `translate3d(0, ${baseY.toFixed(2)}px, 0)`;
      }

      for (const layer of activeLayers) {
        const el = layerRefs.current[layer.id];
        if (!el) continue;

        if (layer.syncWithBaseBg) {
          // Move identically with the base background as one single unified piece
          el.style.transform = `translate3d(0, ${baseY.toFixed(2)}px, 0)`;
          continue;
        }

        const rawDeltaY = scrollY * layer.scrollSpeed;
        const dampedDeltaY =
          layer.maxOffsetPx > 0
            ? layer.maxOffsetPx * Math.tanh(rawDeltaY / Math.max(1, layer.maxOffsetPx))
            : 0;
        const yPx = layer.initialOffsetY + dampedDeltaY;

        const speedX = layer.scrollSpeedX ?? 0;
        const maxX = layer.maxOffsetXPx ?? 0;
        const initX = layer.initialOffsetX ?? 0;
        const rawDeltaX = scrollY * speedX;
        const dampedDeltaX =
          maxX > 0 && speedX !== 0 ? maxX * Math.tanh(rawDeltaX / Math.max(1, maxX)) : 0;
        const xPx = initX + dampedDeltaX;

        el.style.transform = `translate3d(${xPx.toFixed(2)}px, ${yPx.toFixed(2)}px, 0)`;
      }
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(applyParallaxTransforms);
      }
    };

    applyParallaxTransforms();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [active, activeTab, isHoyOrProfileGroup, activeLayers]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      data-testid="dragon-ball-parallax-bg"
      data-parallax-tab={activeTab}
      data-parallax-group={isHoyOrProfileGroup ? 'HOY_PROFILE' : 'DEFAULT'}
      aria-hidden="true"
    >
      {/* Solid safety backdrop behind everything so no edge gap can ever appear */}
      <div
        className="absolute -inset-[15%] w-[130%] h-[130%]"
        style={{
          zIndex: 0,
          backgroundColor: isHoyOrProfileGroup ? '#3A7BB8' : '#06100E',
        }}
      />

      {!isHoyOrProfileGroup && (
        /* Group 1 Base opaque background (fondo_oscuro) */
        <div
          ref={baseBgRef}
          data-testid="parallax-base-fondo-oscuro"
          className="absolute -inset-[12%] w-[124%] h-[124%] will-change-transform"
          style={{ zIndex: 0 }}
        >
          <img
            src={activeBaseBg}
            alt=""
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}

      {/* Shared aligned coordinate stage for Parallax Layers */}
      <div className="absolute inset-x-0 -top-[5vh] h-[116vh]">
        {isHoyOrProfileGroup && (
          /* Group 2 Base sky & clouds (fondo_ca47cea4.webp) placed inside the exact same stage as the cloud cutout layer so they move together as a single piece */
          <div
            ref={baseBgRef}
            data-testid="parallax-base-fondo-hoy-profile"
            className="absolute inset-0 w-full h-full will-change-transform"
            style={{ zIndex: 0, transform: 'translate3d(0, 0px, 0)' }}
          >
            <img
              src={activeBaseBg}
              alt=""
              decoding="async"
              className="w-full h-full object-fill select-none"
            />
          </div>
        )}

        {activeLayers.map((layer) => {
          const isLandscapeBand = layer.fitMode === 'landscape-band';
          const isCustomCutout = layer.fitMode === 'custom-cutout' && layer.customBounds;
          const isShenlongMaskLayer =
            !isHoyOrProfileGroup && layer.layerNumber === 3 && layer.fitMode === 'focal-contain';

          return (
            <div
              key={layer.id}
              ref={(node) => {
                layerRefs.current[layer.id] = node;
              }}
              data-testid={`parallax-layer-${layer.layerNumber}`}
              data-layer-id={layer.id}
              data-layer-number={layer.layerNumber}
              data-sync-base={layer.syncWithBaseBg ? 'true' : 'false'}
              className={
                isCustomCutout
                  ? 'absolute will-change-transform'
                  : 'absolute inset-0 w-full h-full will-change-transform'
              }
              style={{
                zIndex: layer.zIndex,
                ...(isCustomCutout && layer.customBounds
                  ? {
                      top: `${layer.customBounds.topPct}%`,
                      left: `${layer.customBounds.leftPct}%`,
                      width: `${layer.customBounds.widthPct}%`,
                      ...(layer.customBounds.minWidthPx
                        ? { minWidth: `${layer.customBounds.minWidthPx}px` }
                        : {}),
                      ...(layer.customBounds.maxWidthPx
                        ? { maxWidth: `${layer.customBounds.maxWidthPx}px` }
                        : {}),
                    }
                  : {}),
                transform: `translate3d(${layer.initialOffsetX ?? 0}px, ${layer.initialOffsetY}px, 0)`,
              }}
            >
              <img
                src={layer.src}
                alt=""
                decoding="async"
                className={
                  isCustomCutout
                    ? 'w-full h-auto object-contain select-none drop-shadow-md'
                    : isLandscapeBand
                    ? 'w-full h-full object-fill select-none'
                    : 'w-full h-full object-contain object-center select-none'
                }
                style={
                  isShenlongMaskLayer
                    ? {
                        WebkitMaskImage:
                          'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
                        maskImage:
                          'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
                      }
                    : undefined
                }
              />
            </div>
          );
        })}
      </div>

      {/* Subtle atmospheric vignette to keep foreground cards and Go board crisp */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 10,
          background: isHoyOrProfileGroup
            ? 'radial-gradient(circle at 50% 45%, rgba(6, 20, 32, 0.14) 0%, rgba(5, 16, 24, 0.38) 100%)'
            : 'radial-gradient(circle at 50% 45%, rgba(6, 16, 14, 0.08) 0%, rgba(4, 12, 10, 0.36) 100%)',
        }}
      />
    </div>
  );
};

export interface AcademyDojoHeroProps {
  nextLesson: LessonContent;
  completedLessonsCount: number;
  totalLessonsCount: number;
  solvedPuzzlesCount: number;
  totalPuzzlesCount: number;
  xp: number;
  nextLevelXp: number;
  boardTheme?: BoardThemeId;
  soundEnabled?: boolean;
  recentSolvedLessons?: LessonContent[];
  lessonProgress?: Record<string, LessonProgress>;
  awardedXpKeys?: string[];
  visualLayers?: BoardVisualLayers;
  solvedHoyReviewIndices?: number[];
  hoyReviewsCompleted?: boolean;
  allowRepeatHoyReviews?: boolean;
  onSolveHoyReview?: (reviewIdx: number, totalReviews: number) => boolean;
  onToggleLayer?: (layer: keyof BoardVisualLayers) => void;
  onStartLesson: (lessonId: string) => void;
  onOpenPuzzles: () => void;
  onSelectLevelFilter?: (filter: 'FUNDAMENTOS' | 'TACTICA_VIDA' | 'ESTRATEGIA_YOSE') => void;
  onCompleteHoyReviews?: () => void;
}

export const AcademyDojoHero: React.FC<AcademyDojoHeroProps> = ({
  nextLesson,
  completedLessonsCount,
  totalLessonsCount,
  solvedPuzzlesCount,
  totalPuzzlesCount,
  xp,
  nextLevelXp,
  boardTheme = 'KAYA_TRADICIONAL',
  soundEnabled = true,
  lessonProgress = {},
  awardedXpKeys = [],
  visualLayers,
  solvedHoyReviewIndices = [],
  hoyReviewsCompleted = false,
  allowRepeatHoyReviews = false,
  onSolveHoyReview,
  onToggleLayer,
  onStartLesson,
  onOpenPuzzles,
  onCompleteHoyReviews,
}) => {
  const [roshiIdx, setRoshiIdx] = useState(0);
  const [animPulse, setAnimPulse] = useState(0);
  const [solvedReviewIndices, setSolvedReviewIndices] = useState<number[]>(solvedHoyReviewIndices);
  const [suppressRoshiSpotlight, setSuppressRoshiSpotlight] = useState<boolean>(false);
  const hasCompletedFirstLesson = completedLessonsCount >= 1;

  // Build 6 dynamic review scenarios from the user's last 2 completed lessons
  const reviewScenarios = useMemo(
    () => buildHeroReviewScenarios(LESSONS_CATALOG, lessonProgress, awardedXpKeys),
    [lessonProgress, awardedXpKeys]
  );

  // Build the 3 bottom lesson cards: 2 last concluded lessons + 1 next continuing lesson
  const threeBottomLessonCards = useMemo(
    () => buildHeroBottomLessonCards(LESSONS_CATALOG, lessonProgress, awardedXpKeys),
    [lessonProgress, awardedXpKeys]
  );

  const currentIdx = roshiIdx % reviewScenarios.length;
  const activeScenario = reviewScenarios[currentIdx];
  const isLastReviewScenario =
    reviewScenarios.length > 0 && currentIdx === reviewScenarios.length - 1;

  const effectiveSolvedIndices = useMemo(
    () => Array.from(new Set([...solvedHoyReviewIndices, ...solvedReviewIndices])),
    [solvedHoyReviewIndices, solvedReviewIndices]
  );

  const isAllHoyReviewsLockedToday =
    !allowRepeatHoyReviews &&
    (hoyReviewsCompleted || effectiveSolvedIndices.length >= reviewScenarios.length);

  const isCurrentScenarioLockedToday =
    !allowRepeatHoyReviews &&
    (isAllHoyReviewsLockedToday || effectiveSolvedIndices.includes(currentIdx));

  useEffect(() => {
    if (
      allowRepeatHoyReviews ||
      (solvedHoyReviewIndices.length === 0 && !hoyReviewsCompleted)
    ) {
      setSolvedReviewIndices([]);
    }
  }, [allowRepeatHoyReviews, solvedHoyReviewIndices.length, hoyReviewsCompleted]);

  const [heroBoardGame, setHeroBoardGame] = useState(() =>
    createGameState({
      size: 9,
      initialStones: activeScenario.initialStones,
      startingTurn: activeScenario.turn,
    })
  );
  const [heroBoardSolved, setHeroBoardSolved] = useState<boolean>(false);
  const [heroBoardFeedback, setHeroBoardFeedback] = useState<string | null>(null);

  // Sync the 2D interactive review board whenever the active review scenario changes
  useEffect(() => {
    setHeroBoardGame(
      createGameState({
        size: 9,
        initialStones: activeScenario.initialStones,
        startingTurn: activeScenario.turn,
      })
    );
    setHeroBoardSolved(false);
    setHeroBoardFeedback(null);
    setSuppressRoshiSpotlight(false);
  }, [roshiIdx, activeScenario]);

  const handleHeroBoardClick = (coord: Coord) => {
    if (isCurrentScenarioLockedToday || (heroBoardSolved && !allowRepeatHoyReviews)) {
      return;
    }

    const label = coordToLabel(coord, 9);
    const res = validateAndPlayMove(heroBoardGame, coord);
    if (!res.legal || !res.nextState) {
      setSuppressRoshiSpotlight(false);
      setHeroBoardFeedback(`Jugada ilegal en ${label}: ${res.messageEs}`);
      setAnimPulse((p) => p + 1);
      return;
    }

    const isTarget = activeScenario.validCoords.some((vc) => coordsEqual(vc, coord));
    setHeroBoardGame(res.nextState);

    if (isTarget) {
      resetGlobalConsecutiveMistakes();
      playSuccessChime(soundEnabled);
      const nextSolved = effectiveSolvedIndices.includes(currentIdx)
        ? effectiveSolvedIndices
        : [...effectiveSolvedIndices, currentIdx];
      setSolvedReviewIndices(nextSolved);
      const completedViaRepo = onSolveHoyReview
        ? onSolveHoyReview(currentIdx, reviewScenarios.length)
        : false;
      const isFinalReviewAnswer =
        currentIdx === reviewScenarios.length - 1 ||
        nextSolved.length >= reviewScenarios.length ||
        completedViaRepo;

      setHeroBoardSolved(true);

      if (isFinalReviewAnswer) {
        // On the final review answer, do NOT show Maestro Roshi's message/spotlight;
        // play the special video reward automatically right away.
        notifySpecialRewardPriority();
        setHeroBoardFeedback(null);
        setSuppressRoshiSpotlight(true);
        onCompleteHoyReviews?.();
        return;
      }

      setHeroBoardFeedback(activeScenario.successFeedback);
      setSuppressRoshiSpotlight(false);
    } else {
      setSuppressRoshiSpotlight(false);
      playStoneSound(soundEnabled, (res.capturedStones?.length ?? 0) > 0);
      setHeroBoardFeedback(
        `Jugaste en ${label}. ${activeScenario.exploreFeedbackPrefix}`
      );
    }
    setAnimPulse((p) => p + 1);
  };

  const handleResetHeroBoard = () => {
    if (isCurrentScenarioLockedToday || (heroBoardSolved && !allowRepeatHoyReviews)) {
      return;
    }
    setHeroBoardGame(
      createGameState({
        size: 9,
        initialStones: activeScenario.initialStones,
        startingTurn: activeScenario.turn,
      })
    );
    setHeroBoardSolved(false);
    setHeroBoardFeedback(null);
    setSuppressRoshiSpotlight(false);
    setAnimPulse((p) => p + 1);
  };

  const handleSelectReviewScenario = (targetIdx: number) => {
    const normalizedIdx =
      ((targetIdx % reviewScenarios.length) + reviewScenarios.length) %
      reviewScenarios.length;
    const nextScenario = reviewScenarios[normalizedIdx];
    setRoshiIdx(normalizedIdx);
    setHeroBoardGame(
      createGameState({
        size: 9,
        initialStones: nextScenario.initialStones,
        startingTurn: nextScenario.turn,
      })
    );
    setHeroBoardSolved(false);
    setHeroBoardFeedback(null);
    setSuppressRoshiSpotlight(false);
    setAnimPulse((p) => p + 1);
  };

  const handleAdvanceOrFinishReview = () => {
    if (isAllHoyReviewsLockedToday) {
      return;
    }
    if (!allowRepeatHoyReviews) {
      // Find next unsolved review index (strictly different from currentIdx) if any remain today
      for (let step = 1; step < reviewScenarios.length; step++) {
        const candidateIdx = (currentIdx + step) % reviewScenarios.length;
        if (!effectiveSolvedIndices.includes(candidateIdx)) {
          handleSelectReviewScenario(candidateIdx);
          return;
        }
      }
    }
    if (!isLastReviewScenario) {
      handleSelectReviewScenario(currentIdx + 1);
    }
  };

  const completionPct = Math.max(
    5,
    Math.min(100, Math.round((completedLessonsCount / Math.max(1, totalLessonsCount)) * 100))
  );

  // Format short lesson number e.g. "1.2"
  const lessonNumberTag = `${nextLesson.stageNumber + 1}.${nextLesson.unitNumber}`;

  const defaultHeroLayers: BoardVisualLayers = useMemo(
    () =>
      visualLayers ?? {
        showCoordinates: true,
        showLiberties: false,
        showGroups: false,
        showAtari: true,
        showLastMove: true,
        showTerritory: false,
      },
    [visualLayers]
  );

  const showSolvedRoshiFeedback =
    !isAllHoyReviewsLockedToday &&
    !suppressRoshiSpotlight &&
    heroBoardSolved &&
    Boolean(heroBoardFeedback);

  const canAdvanceToNextReview = !isAllHoyReviewsLockedToday && !isLastReviewScenario;

  return (
    <section
      className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-3xl p-4 sm:p-6 md:p-9 shadow-2xs transition-colors"
      data-testid="academy-dojo-hero"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
        {/* Child 1: Title of Teaching + Maestro Roshi Spotlight/Card (Left top on PC, Top on Mobile) */}
        <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1 space-y-3 sm:space-y-4">
          {/* Mobile Title: Shows the exact active teaching title so user sees Title -> Board immediately */}
          <h1 className="lg:hidden text-xl sm:text-2xl font-display font-bold text-[var(--app-text)] leading-snug">
            {!hasCompletedFirstLesson
              ? `Tu camino comienza hoy · Clase 1: ${nextLesson.title}`
              : isAllHoyReviewsLockedToday
              ? `Continúa tu camino en el Dojo · Clase ${lessonNumberTag}: ${nextLesson.title}`
              : activeScenario.roshiTitle}
          </h1>

          {/* Desktop Title: Preserves the full editorial headline loved on PC */}
          <h1 className="hidden lg:block text-3xl sm:text-4xl md:text-[42px] font-display font-bold text-[var(--app-text)] leading-[1.12] tracking-tight">
            Domina el juego estratégico más profundo de la humanidad paso a paso.
          </h1>

          {/* Maestro Roshi Interactive Review (ONLY available after completing Lesson 1) */}
          <div className="pt-0.5">
            {hasCompletedFirstLesson ? (
              <MaestroRoshiTeachingCard
                title={
                  isAllHoyReviewsLockedToday
                    ? 'Maestro Roshi · Camino del Dojo'
                    : showSolvedRoshiFeedback
                    ? 'Repaso completado!'
                    : heroBoardFeedback
                    ? `Repaso clase ${activeScenario.lessonOrderNumber}`
                    : activeScenario.roshiTitle
                }
                message={
                  isAllHoyReviewsLockedToday
                    ? `¡Excelente disciplina! Ya concluiste tu entrenamiento del día en esta sección. Tu siguiente paso recomendado es avanzar a la Clase ${lessonNumberTag}: «${nextLesson.title}» en la Academia, o poner a prueba tu lectura en el Dojo de Puzzles y la Sala de Práctica.`
                    : heroBoardFeedback ?? activeScenario.roshiTeaching
                }
                subMessage={
                  isAllHoyReviewsLockedToday ? undefined : activeScenario.boardPrompt
                }
                subMessageLabel="Práctica de repaso en el tablero:"
                tone={
                  isAllHoyReviewsLockedToday
                    ? 'DEFAULT'
                    : showSolvedRoshiFeedback
                    ? 'SUCCESS'
                    : heroBoardFeedback
                    ? 'WARNING'
                    : 'DEFAULT'
                }
                animationCategory={
                  isAllHoyReviewsLockedToday
                    ? 'CONVERSATION'
                    : showSolvedRoshiFeedback
                    ? 'SURPRISE'
                    : heroBoardFeedback
                    ? 'MISTAKE'
                    : 'CONVERSATION'
                }
                interactionKey={
                  isAllHoyReviewsLockedToday
                    ? 'hero-roshi-all-completed-today'
                    : `hero-roshi-${roshiIdx}-${animPulse}`
                }
                autoOpenSpotlight={!suppressRoshiSpotlight}
                spotlightDelayMs={heroBoardFeedback ? 650 : 0}
                avatarSize="md"
                prioritizeActionOnRight={showSolvedRoshiFeedback && canAdvanceToNextReview}
                alwaysCenterBoardOnDismiss={true}
                dismissLabel="Entendido"
                testId="hero-roshi-teaching-card"
              >
                {canAdvanceToNextReview && (
                  <button
                    type="button"
                    onClick={handleAdvanceOrFinishReview}
                    data-testid="hero-roshi-next-review-btn"
                    className={
                      showSolvedRoshiFeedback
                        ? 'px-4 py-2.5 rounded-xl bg-[var(--app-primary)] hover:bg-[var(--app-primary-hover)] text-white text-xs sm:text-sm font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs'
                        : 'px-3.5 py-2.5 rounded-xl bg-[var(--app-surface)] hover:border-[var(--app-primary)] border border-[var(--app-border)] text-[var(--app-text)] text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap'
                    }
                  >
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {`Siguiente repaso (${currentIdx + 2}/${reviewScenarios.length})`}
                    </span>
                  </button>
                )}
              </MaestroRoshiTeachingCard>
            ) : (
              <div
                className="rounded-2xl bg-[var(--app-subtle)] border border-[var(--app-border)] p-4 sm:p-5 space-y-2"
                data-testid="hero-first-lesson-Locked-review-banner"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--app-primary)]">
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  <span>Repaso del Maestro Roshi bloqueado temporalmente</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--app-text)] leading-relaxed">
                  Aún no has completado ninguna clase. Concluye primero la{' '}
                  <strong>Clase 1: «{nextLesson.title}»</strong> para desbloquear las sesiones de repaso interactivo con el Maestro Roshi en esta sección.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Child 2: Dynamic Review Goban + 2 Concluded & 1 Continuing Lesson Cards (Immediately below Title on Mobile; Right 5 cols on PC) */}
        <div
          className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-2 rounded-2xl bg-[var(--app-subtle)] border border-[var(--app-border)] p-4 sm:p-5 flex flex-col justify-between space-y-4"
          data-testid="hero-interactive-2d-panel"
        >
          {/* Interactive 2D Board Header & 6-Step Review Selector */}
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-[var(--app-primary)]">
                {hasCompletedFirstLesson
                  ? activeScenario.badge
                  : 'Tablero del Dojo · Concluye la Clase 1 para activar el repaso'}
              </span>
              {hasCompletedFirstLesson && (
                <div className="flex items-center gap-1.5">
                  {reviewScenarios.map((sc, idx) => {
                    const isScenarioDoneToday =
                      !allowRepeatHoyReviews &&
                      (isAllHoyReviewsLockedToday || effectiveSolvedIndices.includes(idx));
                    return (
                      <button
                        key={sc.index}
                        type="button"
                        onClick={() => {
                          handleSelectReviewScenario(idx);
                        }}
                        aria-label={`Ver práctica de repaso ${idx + 1} (Clase ${sc.lessonOrderNumber})`}
                        title={
                          isScenarioDoneToday
                            ? `Repaso ${idx + 1} resuelto hoy`
                            : `Repaso ${idx + 1}: Clase ${sc.lessonOrderNumber}`
                        }
                        className={`w-6 h-6 rounded-md text-[11px] font-mono font-bold transition-colors cursor-pointer border ${
                          currentIdx === idx
                            ? 'bg-[var(--app-primary)] text-white border-[var(--app-primary)]'
                            : isScenarioDoneToday
                            ? 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]'
                            : 'bg-[var(--app-surface)] text-[var(--app-muted)] border-[var(--app-border)] hover:text-[var(--app-text)]'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                  {(!isCurrentScenarioLockedToday && (!heroBoardSolved || allowRepeatHoyReviews)) && (
                    <button
                      type="button"
                      onClick={handleResetHeroBoard}
                      title="Reiniciar posición del tablero"
                      aria-label="Reiniciar posición del tablero"
                      className="p-1.5 rounded-md bg-[var(--app-surface)] border border-[var(--app-border)] text-[var(--app-muted)] hover:text-[var(--app-primary)] transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="rounded-2xl bg-[var(--app-surface)] border border-[var(--app-border)] p-3 flex flex-col items-center">
              <GoBoard
                size={9}
                board={heroBoardGame.board}
                currentTurn={heroBoardGame.currentTurn}
                lastMove={heroBoardGame.lastMove?.coord ?? null}
                markers={
                  !hasCompletedFirstLesson || heroBoardSolved || isCurrentScenarioLockedToday
                    ? []
                    : activeScenario.markers
                }
                visualLayers={defaultHeroLayers}
                boardTheme={boardTheme}
                onToggleLayer={onToggleLayer}
                onSelectIntersection={
                  hasCompletedFirstLesson && !isCurrentScenarioLockedToday && (!heroBoardSolved || allowRepeatHoyReviews)
                    ? handleHeroBoardClick
                    : undefined
                }
                interactive={
                  hasCompletedFirstLesson && !isCurrentScenarioLockedToday && (!heroBoardSolved || allowRepeatHoyReviews)
                }
                maxWidthClass="max-w-[360px] sm:max-w-[390px]"
              />
              {!isAllHoyReviewsLockedToday && (
                <p
                  className="mt-2 text-[11px] text-[var(--app-muted)] text-center leading-snug"
                  data-testid="hero-review-board-status"
                >
                  {!hasCompletedFirstLesson ? (
                    <span>
                      Completa la <strong>Clase 1</strong> para habilitar los ejercicios de repaso en este tablero.
                    </span>
                  ) : isCurrentScenarioLockedToday || heroBoardSolved ? (
                    <span className="font-semibold text-[#059669]">
                      ✓ ¡Práctica superada en {activeScenario.targetLabel}! Pasa al siguiente ejercicio de repaso.
                    </span>
                  ) : (
                    activeScenario.boardPrompt
                  )}
                </p>
              )}
            </div>
          </div>

          {/* 2 Last Concluded Lessons + 3rd Continuing Lesson */}
          <div className="space-y-2" data-testid="hero-recent-lessons-section">

            <div
              className="grid grid-cols-3 gap-2.5"
              data-testid="hero-recent-lessons-grid"
            >
              {threeBottomLessonCards.map((card) => {
                const isNextAvailable = card.slotRole === 'NEXT_AVAILABLE';
                return (
                  <button
                    key={`${card.slotRole}-${card.lesson.id}`}
                    type="button"
                    onClick={() => onStartLesson(card.lesson.id)}
                    data-testid={`hero-recent-lesson-${card.lesson.id}`}
                    data-slot-role={card.slotRole}
                    data-solved={card.isConcluded ? 'true' : 'false'}
                    className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-1 ${
                      card.isConcluded
                        ? 'bg-[var(--answer-correct-bg)] border-[var(--answer-correct-border)] text-[var(--answer-correct-text)]'
                        : isNextAvailable
                        ? 'bg-[var(--app-surface)] border-[var(--app-primary)] hover:bg-[var(--app-subtle)] shadow-2xs'
                        : 'bg-[var(--app-surface)] border-[var(--app-border)] hover:border-[var(--app-primary)]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 whitespace-nowrap">
                      <span className="text-[10px] font-mono font-bold text-[var(--app-primary)] shrink-0">
                        Clase {card.lessonOrderNumber}
                      </span>
                      {card.isConcluded ? (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-[#059669] shrink-0">
                          <CheckCircle2 className="w-2.5 h-2.5 shrink-0" />
                          <span>100%</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-[var(--app-primary)] shrink-0">
                          <span>Sigue</span>
                          <ArrowRight className="w-2.5 h-2.5 shrink-0" />
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-bold text-[var(--app-text)] line-clamp-2 leading-tight">
                      {card.lesson.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--app-muted)]">
              <span>Progreso hacia {nextLevelXp} XP</span>
              <span>
                {completedLessonsCount}/{totalLessonsCount} clases ({completionPct}%)
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-[var(--app-surface)] overflow-hidden border border-[var(--app-border)]">
              <div
                className="h-full bg-[var(--app-primary)] transition-all duration-300"
                style={{ width: `${completionPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Child 3: Roshi Pager Row + Primary CTA (Below Board on Mobile; Left bottom on PC) */}
        <div className="lg:col-span-7 lg:col-start-1 lg:row-start-2 flex flex-col justify-between space-y-4">
          {hasCompletedFirstLesson ? (
            (!isAllHoyReviewsLockedToday || canAdvanceToNextReview) && (
              <div className="flex flex-wrap items-center justify-between gap-2">
                {!isAllHoyReviewsLockedToday && (
                  <span className="text-xs text-[var(--app-muted)] font-medium">
                    {`Repaso ${currentIdx + 1} de ${reviewScenarios.length} (Clases realizadas)`}
                  </span>
                )}

                {canAdvanceToNextReview && (
                  <button
                    type="button"
                    onClick={() => {
                      handleAdvanceOrFinishReview();
                      centerActiveGoBoardInView();
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[var(--app-subtle)] border border-[var(--app-border)] text-xs font-semibold text-[var(--app-primary)] hover:opacity-90 transition-all inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                    data-testid="next-roshi-teaching-btn"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Siguiente Repaso de Roshi</span>
                  </button>
                )}
              </div>
            )
          ) : (
            <div className="text-xs text-[var(--app-muted)] font-medium">
              El repaso guiado con el Maestro Roshi se activará al concluir la Clase 1.
            </div>
          )}

          <div className="pt-1 flex flex-wrap sm:flex-nowrap items-center gap-3">
            <button
              type="button"
              onClick={() => onStartLesson(nextLesson.id)}
              className="px-5 py-3.5 rounded-2xl bg-[var(--app-primary)] hover:bg-[var(--app-primary-hover)] text-white text-xs md:text-sm font-bold transition-all inline-flex items-center gap-2 shadow-xs cursor-pointer truncate"
              data-testid="hero-start-lesson-btn"
            >
              <Play className="w-4 h-4 fill-current shrink-0" />
              <span className="truncate">
                Empezar Lección {lessonNumberTag}: {nextLesson.title}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export interface PaletasYRecompensasViewProps {
  activeAppTheme: AppThemeId;
  activeBoardTheme: BoardThemeId;
  previewAppTheme?: AppThemeId | null;
  previewBoardTheme?: BoardThemeId | null;
  lockedHeaderThemeId?: AppThemeId | null;
  lockedThemeNoticeSeq?: number;
  unlockedAppThemes?: AppThemeId[];
  unlockedBoardThemes?: BoardThemeId[];
  studentRankTitle: string;
  streakDays: number;
  jadeCount: number;
  soundEnabled: boolean;
  visualLayers: BoardVisualLayers;
  onSelectAppTheme: (themeId: AppThemeId) => void;
  onSelectBoardTheme: (boardThemeId: BoardThemeId) => void;
  onPreviewAppTheme?: (themeId: AppThemeId | null) => void;
  onPreviewBoardTheme?: (boardThemeId: BoardThemeId | null) => void;
  onUnlockAppTheme?: (themeId: AppThemeId) => void;
  onUnlockBoardTheme?: (boardThemeId: BoardThemeId) => void;
  onSwapTheme?: (
    target: { kind: 'APP'; id: AppThemeId } | { kind: 'BOARD'; id: BoardThemeId },
    source: { kind: 'APP'; id: AppThemeId } | { kind: 'BOARD'; id: BoardThemeId }
  ) => void;
  onRefundTheme?: (
    item: { kind: 'APP'; id: AppThemeId } | { kind: 'BOARD'; id: BoardThemeId }
  ) => void;
  onToggleLayer: (layer: keyof BoardVisualLayers) => void;
}

export const PaletasYRecompensasView: React.FC<PaletasYRecompensasViewProps> = ({
  activeAppTheme,
  activeBoardTheme,
  previewAppTheme = null,
  previewBoardTheme = null,
  lockedHeaderThemeId = null,
  lockedThemeNoticeSeq = 0,
  unlockedAppThemes = DEFAULT_UNLOCKED_APP_THEMES,
  unlockedBoardThemes = DEFAULT_UNLOCKED_BOARD_THEMES,
  studentRankTitle,
  streakDays,
  jadeCount,
  soundEnabled,
  visualLayers,
  onSelectAppTheme,
  onSelectBoardTheme,
  onPreviewAppTheme,
  onPreviewBoardTheme,
  onUnlockAppTheme,
  onUnlockBoardTheme,
  onSwapTheme,
  onRefundTheme,
  onToggleLayer,
}) => {
  const [roshiAnimKey, setRoshiAnimKey] = useState(0);
  const [unlockedCelebration, setUnlockedCelebration] = useState<{
    name: string;
    seq: number;
  } | null>(null);
  // Mostrar paletas remains open by default and across tab switches
  const [openCatalogSection, setOpenCatalogSection] = useState<'PALETTES' | 'BOARDS' | 'NONE'>(
    'PALETTES'
  );
  const showPalettesGrid = openCatalogSection === 'PALETTES';
  const showBoardsGrid = openCatalogSection === 'BOARDS';

  const scrollSelectedPaletteCardIntoView = (themeId: AppThemeId) => {
    setTimeout(() => {
      const paletteCard = document.querySelector<HTMLElement>(
        `[data-testid="palette-card-${themeId}"]`
      );
      const palettesSection = document.querySelector<HTMLElement>(
        '[data-testid="app-palettes-section"]'
      );
      const targetEl = paletteCard ?? palettesSection;
      if (targetEl) {
        animateScrollToElement(targetEl, 'center', 480);
      }
    }, 60);
  };

  useEffect(() => {
    if (previewAppTheme || lockedHeaderThemeId) {
      setOpenCatalogSection('PALETTES');
      const targetId = lockedHeaderThemeId ?? previewAppTheme;
      if (targetId && lockedThemeNoticeSeq > 0) {
        setUnlockedCelebration(null);
        scrollSelectedPaletteCardIntoView(targetId);
      }
    }
  }, [previewAppTheme, lockedHeaderThemeId, lockedThemeNoticeSeq]);

  useEffect(() => {
    if (previewBoardTheme) {
      setOpenCatalogSection('BOARDS');
    }
  }, [previewBoardTheme]);

  // Interactive 9x9 Live Preview Goban without overlapping static number markers
  const initialPreviewState = useMemo(() => {
    const preset: { x: number; y: number; color: PlayerColor }[] = [
      { x: 2, y: 2, color: 'BLACK' },
      { x: 6, y: 2, color: 'BLACK' },
      { x: 5, y: 3, color: 'WHITE' },
      { x: 4, y: 4, color: 'BLACK' },
      { x: 6, y: 5, color: 'WHITE' },
      { x: 2, y: 6, color: 'WHITE' },
      { x: 5, y: 6, color: 'BLACK' },
    ];
    return createGameState({ size: 9, initialStones: preset, startingTurn: 'BLACK' });
  }, []);

  const [previewGame, setPreviewGame] = useState(initialPreviewState);

  const handlePreviewIntersectionClick = (coord: Coord) => {
    const res = validateAndPlayMove(previewGame, coord);
    if (res.legal && res.nextState) {
      playStoneSound(soundEnabled, (res.capturedStones?.length ?? 0) > 0);
      setPreviewGame(res.nextState);
    }
  };

  const displayedAppTheme = previewAppTheme ?? activeAppTheme;
  const displayedBoardTheme = previewBoardTheme ?? activeBoardTheme;

  const currentPaletteObj = getAppThemeById(displayedAppTheme);
  const currentBoardObj = getBoardThemeById(displayedBoardTheme);

  // List of currently unlocked premium (Jade-purchased) items that the user can swap from
  const unlockedPremiumAppThemes = useMemo(
    () =>
      APP_THEMES_CATALOG.filter(
        (t) => t.requiresJadeUnlock && unlockedAppThemes.includes(t.id)
      ),
    [unlockedAppThemes]
  );

  const unlockedPremiumBoardThemes = useMemo(
    () =>
      BOARD_THEMES_CATALOG.filter(
        (b) => b.requiresJadeUnlock && unlockedBoardThemes.includes(b.id)
      ),
    [unlockedBoardThemes]
  );

  const getSwapCandidateForAppTheme = (targetId: AppThemeId) => {
    const targetCost = APP_THEMES_CATALOG.find((t) => t.id === targetId)?.jadeCost ?? 10;
    const otherApp = unlockedPremiumAppThemes.find(
      (t) => t.id !== targetId && jadeCount + (t.jadeCost ?? 0) >= targetCost
    );
    if (otherApp) {
      return { kind: 'APP' as const, id: otherApp.id, label: otherApp.shortLabel };
    }
    const anyBoard = unlockedPremiumBoardThemes.find(
      (b) => jadeCount + (b.jadeCost ?? 0) >= targetCost
    );
    if (anyBoard) {
      return { kind: 'BOARD' as const, id: anyBoard.id, label: anyBoard.name };
    }
    return null;
  };

  const getSwapCandidateForBoardTheme = (targetId: BoardThemeId) => {
    const targetCost = BOARD_THEMES_CATALOG.find((b) => b.id === targetId)?.jadeCost ?? 10;
    const otherBoard = unlockedPremiumBoardThemes.find(
      (b) => b.id !== targetId && jadeCount + (b.jadeCost ?? 0) >= targetCost
    );
    if (otherBoard) {
      return { kind: 'BOARD' as const, id: otherBoard.id, label: otherBoard.name };
    }
    const anyApp = unlockedPremiumAppThemes.find(
      (t) => jadeCount + (t.jadeCost ?? 0) >= targetCost
    );
    if (anyApp) {
      return { kind: 'APP' as const, id: anyApp.id, label: anyApp.shortLabel };
    }
    return null;
  };

  return (
    <div className="space-y-5" data-testid="paletas-recompensas-view">
      {/* Compact Header */}
      <section className="border-b border-[var(--app-border)] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-[var(--app-text)]">
            Recompensas y Estética del Dojo
          </h2>
          <p className="text-xs text-[var(--app-muted)] mt-0.5">
            Prueba cualquier color o tablero en vista previa y desbloquéalos o intercámbialos libremente con tus Jades
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-semibold">
          <span className="inline-flex items-center gap-1.5 text-[#D97706]">
            <Flame className="w-4 h-4 fill-[#D97706] text-[#D97706]" />
            <span>{streakDays} días</span>
          </span>
          <span className="text-[var(--app-border)]">·</span>
          <span
            className="inline-flex items-center gap-1.5 text-[#059669] px-2.5 py-1 rounded-lg bg-[#059669]/10 border border-[#059669]/30"
            data-testid="rewards-jade-balance"
          >
            <Gem className="w-4 h-4 text-[#059669]" />
            <span>{jadeCount} Jade disponible</span>
          </span>
        </div>
      </section>

      {/* Active Preview Notice Banner if user is previewing a locked palette or board */}
      {(previewAppTheme || previewBoardTheme) && (
        <div
          className="rounded-2xl bg-[var(--app-roshi-bg)] border-2 border-[var(--app-primary)] p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-2xs"
          data-testid="theme-preview-banner"
        >
          <div className="flex items-center gap-2 text-xs text-[var(--app-text)]">
            <Eye className="w-4 h-4 text-[var(--app-primary)] shrink-0" />
            <span>
              <strong>Modo Vista Previa activo:</strong> Estás observando cómo luce{' '}
              <strong>
                {[
                  previewAppTheme ? `Paleta ${getAppThemeById(previewAppTheme).shortLabel}` : null,
                  previewBoardTheme ? `Tablero ${getBoardThemeById(previewBoardTheme).name}` : null,
                ]
                  .filter(Boolean)
                  .join(' + ')}
              </strong>
              . Desbloquéalo o intercámbialo abajo para conservarlo en toda la aplicación.
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              onPreviewAppTheme?.(null);
              onPreviewBoardTheme?.(null);
            }}
            data-testid="exit-preview-btn"
            className="px-3 py-1.5 rounded-xl bg-[var(--app-surface)] border border-[var(--app-border)] text-xs font-semibold text-[var(--app-text)] hover:border-[var(--app-primary)] cursor-pointer shrink-0"
          >
            Restaurar mi tema activo
          </button>
        </div>
      )}

      {/* Maestro Roshi Locked-Color Notification, Unlock Celebration, OR Meditation Spotlight */}
      <div>
        {unlockedCelebration ? (
          <MaestroRoshiTeachingCard
            title={`¡Nuevo color desbloqueado! · ${unlockedCelebration.name}`}
            message={`¡Excelente elección! Has desbloqueado «${unlockedCelebration.name}» en el Dojo. Tu nuevo color ya está listo y equipado para acompañarte en tus lecciones y partidas.`}
            tone="SUCCESS"
            animationCategory="SURPRISE"
            interactionKey={`unlocked-theme-${unlockedCelebration.seq}`}
            autoOpenSpotlight={true}
            centerBoardOnDismiss={false}
            avatarSize="sm"
            dismissLabel="Entendido"
            testId="meditation-roshi-card"
          />
        ) : lockedHeaderThemeId && !unlockedAppThemes.includes(lockedHeaderThemeId) ? (
          <MaestroRoshiTeachingCard
            title={`Paleta «${getAppThemeById(lockedHeaderThemeId).shortLabel}» bloqueada`}
            message={`Aún no has desbloqueado la paleta «${getAppThemeById(lockedHeaderThemeId).name}». Necesitas ${
              getAppThemeById(lockedHeaderThemeId).jadeCost ?? 10
            } piedras de Jade para desbloquearla (actualmente tienes ${jadeCount} Jade). Consigue más Jade completando lecciones en la Academia, resolviendo ejercicios en Puzzles o desbloqueando logros e insignias.`}
            subMessage="He activado la vista previa para que observes cómo luce este color y consultes las opciones y precios disponibles."
            subMessageLabel="Vista previa de paleta:"
            tone="WARNING"
            animationCategory="CONVERSATION"
            interactionKey={`locked-header-palette-${lockedHeaderThemeId}-${lockedThemeNoticeSeq}`}
            autoOpenSpotlight={true}
            centerBoardOnDismiss={false}
            onDismissSpotlight={() => scrollSelectedPaletteCardIntoView(lockedHeaderThemeId)}
            prioritizeActionOnRight={
              jadeCount >= (getAppThemeById(lockedHeaderThemeId).jadeCost ?? 10)
            }
            avatarSize="sm"
            dismissLabel="Entendido"
            testId="meditation-roshi-card"
          >
            {jadeCount >= (getAppThemeById(lockedHeaderThemeId).jadeCost ?? 10) ? (
              <button
                type="button"
                onClick={() => {
                  const unlockedName = getAppThemeById(lockedHeaderThemeId).name;
                  playSuccessChime(soundEnabled);
                  onUnlockAppTheme?.(lockedHeaderThemeId);
                  onPreviewAppTheme?.(null);
                  setUnlockedCelebration({ name: unlockedName, seq: Date.now() });
                }}
                className="px-4 py-2 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs"
              >
                <Gem className="w-3.5 h-3.5 shrink-0" />
                <span>
                  Desbloquear ({getAppThemeById(lockedHeaderThemeId).jadeCost ?? 10} Jade)
                </span>
              </button>
            ) : undefined}
          </MaestroRoshiTeachingCard>
        ) : (
          <MaestroRoshiTeachingCard
            title="Meditación en el Dojo"
            message={`«${MAESTRO_ROSHI_TEACHINGS[roshiAnimKey % MAESTRO_ROSHI_TEACHINGS.length].meditationQuote}»`}
            animationCategory="CONVERSATION"
            interactionKey={`meditation-roshi-${roshiAnimKey}`}
            autoOpenSpotlight={roshiAnimKey > 0}
            prioritizeActionOnRight={false}
            avatarSize="sm"
            dismissLabel="Entendido"
            testId="meditation-roshi-card"
          >
            <div className="pt-1 flex justify-start">
              <button
                type="button"
                onClick={() => setRoshiAnimKey((k) => k + 1)}
                className="text-xs font-semibold text-[var(--app-primary)] hover:underline cursor-pointer"
              >
                Siguiente meditación →
              </button>
            </div>
          </MaestroRoshiTeachingCard>
        )}
      </div>

      {/* Main Split Grid: On Mobile, Live Goban Preview is first (order-1) right under the Title; on PC, Left 7 cols + Right 5 cols */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
        {/* Live Goban Preview (First on Mobile so Title -> Board is immediate; Right 5 cols on PC) */}
        <div className="order-1 lg:order-2 lg:col-span-5 lg:sticky lg:top-28">
          <div className="rounded-2xl bg-[var(--app-surface)] border border-[var(--app-border)] p-4 sm:p-5 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-display font-bold text-sm text-[var(--app-text)] truncate">
                  Vista Previa ({currentBoardObj.name})
                </span>
                {previewBoardTheme && !unlockedBoardThemes.includes(previewBoardTheme) && (
                  <span className="px-2 py-0.5 rounded-full bg-[#D97706]/15 text-[#D97706] text-[10px] font-bold shrink-0">
                    Vista previa
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setPreviewGame(initialPreviewState)}
                className="font-semibold text-[var(--app-primary)] hover:underline cursor-pointer shrink-0"
              >
                Restaurar piedras
              </button>
            </div>

            <GoBoard
              size={9}
              board={previewGame.board}
              currentTurn={previewGame.currentTurn}
              lastMove={previewGame.lastMove?.coord ?? null}
              visualLayers={visualLayers}
              boardTheme={displayedBoardTheme}
              onToggleLayer={onToggleLayer}
              onSelectIntersection={handlePreviewIntersectionClick}
              interactive={true}
            />
          </div>
        </div>

        {/* Collapsible Palettes & Goban Styles (Second on Mobile; Left 7 cols on PC) */}
        <div className="order-2 lg:order-1 lg:col-span-7 space-y-4">
          {/* Section 1: Paleta de Colores */}
          <section
            className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-5 space-y-4"
            data-testid="app-palettes-section"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-[var(--app-primary)]" />
                <h3 className="text-base font-display font-bold text-[var(--app-text)]">
                  Paletas de Color ({currentPaletteObj.name})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  const nextSec = openCatalogSection === 'PALETTES' ? 'NONE' : 'PALETTES';
                  setOpenCatalogSection(nextSec);
                  if (nextSec === 'PALETTES') {
                    setTimeout(() => {
                      const el = document.querySelector<HTMLElement>(
                        '[data-testid="app-palettes-section"]'
                      );
                      if (el) {
                        animateScrollToElement(el, 'start', 420);
                      }
                    }, 60);
                  }
                }}
                aria-expanded={showPalettesGrid}
                data-testid="toggle-app-palettes-btn"
                className="px-3 py-1.5 rounded-lg bg-[var(--app-subtle)] border border-[var(--app-border)] text-xs font-semibold text-[var(--app-text)] hover:border-[var(--app-primary)] inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>
                  {showPalettesGrid
                    ? 'Ocultar paletas'
                    : `Mostrar paletas (${APP_THEMES_CATALOG.length})`}
                </span>
                {showPalettesGrid ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {showPalettesGrid && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {APP_THEMES_CATALOG.map((palette) => {
                  const isUnlocked = unlockedAppThemes.includes(palette.id);
                  const isEquipped = activeAppTheme === palette.id && !previewAppTheme;
                  const isPreviewing = previewAppTheme === palette.id;
                  const isSelected = isEquipped || isPreviewing;
                  const cost = palette.jadeCost ?? 10;
                  const canAfford = jadeCount >= cost;
                  const swapCandidate = !isUnlocked
                    ? getSwapCandidateForAppTheme(palette.id)
                    : null;

                  return (
                    <div
                      key={palette.id}
                      data-testid={`palette-card-${palette.id}`}
                      data-unlocked={isUnlocked ? 'true' : 'false'}
                      className={`rounded-xl p-3.5 border transition-all flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? 'bg-[var(--app-roshi-bg)] border-[var(--app-primary)] shadow-2xs'
                          : 'bg-[var(--app-subtle)]/50 border-[var(--app-border)] hover:border-[var(--app-primary)]/50'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          if (isUnlocked) {
                            onPreviewAppTheme?.(null);
                            onSelectAppTheme(palette.id);
                          } else {
                            onPreviewAppTheme?.(palette.id);
                          }
                        }}
                        data-testid={`palette-select-btn-${palette.id}`}
                        className="text-left w-full space-y-2 cursor-pointer"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-display font-bold text-sm text-[var(--app-text)]">
                              {palette.shortLabel}
                            </span>
                            {isUnlocked ? (
                              isEquipped ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[var(--app-primary)]">
                                  <Check className="w-3.5 h-3.5 shrink-0" />
                                  <span>En uso</span>
                                </span>
                              ) : palette.isParallax ? (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#10B981]/15 border border-[#10B981]/40 text-[10px] font-mono font-bold text-[#10B981]">
                                  <Sparkles className="w-2.5 h-2.5 shrink-0" />
                                  <span>Parallax</span>
                                </span>
                              ) : null
                            ) : (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[var(--app-surface)] border border-[var(--app-border)] text-[10px] font-mono font-bold text-[#059669]">
                                <Lock className="w-2.5 h-2.5 text-[var(--app-muted)]" />
                                <span>{cost} Jade</span>
                              </span>
                            )}
                          </div>

                          <p className="text-[11px] text-[var(--app-muted)] leading-snug">
                            {palette.subtitle}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-0.5">
                          <div className="flex items-center gap-1.5">
                            {palette.swatches.map((hex, i) => (
                              <span
                                key={`${palette.id}-sw-${i}`}
                                className="w-5 h-5 rounded-md border border-black/15"
                                style={{ backgroundColor: hex }}
                              />
                            ))}
                          </div>

                          {!isUnlocked && (
                            <span className="text-[10px] font-semibold text-[var(--app-primary)] inline-flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>{isPreviewing ? 'Viendo' : 'Vista previa'}</span>
                            </span>
                          )}
                        </div>
                      </button>

                      {/* Unlock / Swap / Refund Controls for Jade-gated palettes ("Océano" & "Lavanda") */}
                      {palette.requiresJadeUnlock && (
                        <div className="pt-2 border-t border-[var(--app-border)] flex flex-col gap-1.5">
                          {!isUnlocked ? (
                            <>
                              <button
                                type="button"
                                disabled={!canAfford}
                                onClick={() => {
                                  playSuccessChime(soundEnabled);
                                  onUnlockAppTheme?.(palette.id);
                                  onPreviewAppTheme?.(null);
                                  setUnlockedCelebration({ name: palette.name, seq: Date.now() });
                                }}
                                data-testid={`unlock-palette-btn-${palette.id}`}
                                className={`w-full px-2.5 py-1.5 rounded-lg text-[11px] font-bold inline-flex items-center justify-center gap-1.5 transition-colors ${
                                  canAfford
                                    ? 'bg-[#059669] hover:bg-[#047857] text-white cursor-pointer'
                                    : 'bg-[var(--app-surface)] text-[var(--app-muted)] border border-[var(--app-border)] cursor-not-allowed'
                                }`}
                              >
                                <Gem className="w-3 h-3 shrink-0" />
                                <span>
                                  {canAfford
                                    ? `Desbloquear (${cost} Jade)`
                                    : `Requiere ${cost} Jade`}
                                </span>
                              </button>

                              {swapCandidate && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    playSuccessChime(soundEnabled);
                                    onSwapTheme?.(
                                      { kind: 'APP', id: palette.id },
                                      { kind: swapCandidate.kind, id: swapCandidate.id as any }
                                    );
                                    onPreviewAppTheme?.(null);
                                    setUnlockedCelebration({ name: palette.name, seq: Date.now() });
                                  }}
                                  data-testid={`swap-palette-btn-${palette.id}`}
                                  className="w-full px-2.5 py-1.5 rounded-lg bg-[var(--app-surface)] hover:border-[var(--app-primary)] border border-[var(--app-border)] text-[var(--app-primary)] text-[11px] font-semibold inline-flex items-center justify-center gap-1 transition-colors cursor-pointer"
                                >
                                  <ArrowLeftRight className="w-3 h-3 shrink-0" />
                                  <span className="truncate">
                                    Cambiar por {swapCandidate.label}
                                  </span>
                                </button>
                              )}
                            </>
                          ) : (
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] font-semibold text-[#059669]">
                                ✓ Desbloqueada
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  onRefundTheme?.({ kind: 'APP', id: palette.id });
                                  onPreviewAppTheme?.(null);
                                }}
                                data-testid={`refund-palette-btn-${palette.id}`}
                                title="Bloquear de nuevo y recuperar tus Jades para usarlos en otro color"
                                className="text-[10px] font-semibold text-[var(--app-muted)] hover:text-[var(--app-primary)] underline cursor-pointer"
                              >
                                Cambiar (+{cost} Jade)
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Section 2: Acabado del Tablero Goban */}
          <section
            className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-5 space-y-4"
            data-testid="board-themes-section"
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-display font-bold text-[var(--app-text)]">
                  Madera y Acabado del Goban ({currentBoardObj.name})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  const nextSec = openCatalogSection === 'BOARDS' ? 'NONE' : 'BOARDS';
                  setOpenCatalogSection(nextSec);
                  if (nextSec === 'BOARDS') {
                    setTimeout(() => {
                      const el = document.querySelector<HTMLElement>(
                        '[data-testid="board-themes-section"]'
                      );
                      if (el) {
                        animateScrollToElement(el, 'start', 420);
                      }
                    }, 60);
                  }
                }}
                aria-expanded={showBoardsGrid}
                data-testid="toggle-board-themes-btn"
                className="px-3 py-1.5 rounded-lg bg-[var(--app-subtle)] border border-[var(--app-border)] text-xs font-semibold text-[var(--app-text)] hover:border-[var(--app-primary)] inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>{showBoardsGrid ? 'Ocultar tableros' : 'Mostrar tableros (5)'}</span>
                {showBoardsGrid ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {showBoardsGrid && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BOARD_THEMES_CATALOG.map((bTheme) => {
                  const isUnlocked = unlockedBoardThemes.includes(bTheme.id);
                  const isEquipped = activeBoardTheme === bTheme.id && !previewBoardTheme;
                  const isPreviewing = previewBoardTheme === bTheme.id;
                  const isSelected = isEquipped || isPreviewing;
                  const cost = bTheme.jadeCost ?? 10;
                  const canAfford = jadeCount >= cost;
                  const swapCandidate = !isUnlocked
                    ? getSwapCandidateForBoardTheme(bTheme.id)
                    : null;

                  return (
                    <div
                      key={bTheme.id}
                      data-testid={`board-theme-card-${bTheme.id}`}
                      data-unlocked={isUnlocked ? 'true' : 'false'}
                      className={`rounded-xl p-3.5 border transition-all flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? 'bg-[var(--app-roshi-bg)] border-[var(--app-primary)] shadow-2xs'
                          : 'bg-[var(--app-subtle)]/50 border-[var(--app-border)] hover:border-[var(--app-primary)]/50'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          if (isUnlocked) {
                            onPreviewBoardTheme?.(null);
                            onSelectBoardTheme(bTheme.id);
                          } else {
                            onPreviewBoardTheme?.(bTheme.id);
                          }
                          centerActiveGoBoardInView();
                        }}
                        data-testid={`board-theme-select-btn-${bTheme.id}`}
                        className="text-left w-full flex items-center justify-between gap-3 cursor-pointer"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-display font-bold text-sm text-[var(--app-text)]">
                              {bTheme.name}
                            </span>
                            {isUnlocked ? (
                              isEquipped ? (
                                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-[var(--app-primary)]">
                                  <Check className="w-3 h-3 shrink-0" />
                                  <span>En uso</span>
                                </span>
                              ) : null
                            ) : (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[var(--app-surface)] border border-[var(--app-border)] text-[10px] font-mono font-bold text-[#059669]">
                                <Lock className="w-2.5 h-2.5 text-[var(--app-muted)]" />
                                <span>{cost} Jade</span>
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-[var(--app-muted)]">
                            {bTheme.subtitle}
                          </div>
                          {!isUnlocked && (
                            <div className="text-[10px] font-semibold text-[var(--app-primary)] inline-flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>
                                {isPreviewing
                                  ? 'Viendo en el tablero de muestra'
                                  : 'Clic para vista previa en el tablero'}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <span
                            className="w-6 h-6 rounded-md border border-black/20"
                            style={{ backgroundColor: bTheme.swatches[0] }}
                          />
                          <span
                            className="w-5 h-5 rounded-full border border-black/30"
                            style={{ backgroundColor: bTheme.swatches[1] }}
                          />
                          <span
                            className="w-5 h-5 rounded-full border border-black/25"
                            style={{ backgroundColor: bTheme.swatches[2] }}
                          />
                        </div>
                      </button>

                      {/* Unlock / Swap / Refund Controls for Jade-gated boards ("Ébano Nocturno Sumi-e" & "Sakura de Kioto") */}
                      {bTheme.requiresJadeUnlock && (
                        <div className="pt-2 border-t border-[var(--app-border)] flex flex-col gap-1.5">
                          {!isUnlocked ? (
                            <div className="flex flex-wrap items-center gap-1.5">
                              <button
                                type="button"
                                disabled={!canAfford}
                                onClick={() => {
                                  playSuccessChime(soundEnabled);
                                  onUnlockBoardTheme?.(bTheme.id);
                                  onPreviewBoardTheme?.(null);
                                  setUnlockedCelebration({ name: bTheme.name, seq: Date.now() });
                                  centerActiveGoBoardInView();
                                }}
                                data-testid={`unlock-board-btn-${bTheme.id}`}
                                className={`flex-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap ${
                                  canAfford
                                    ? 'bg-[#059669] hover:bg-[#047857] text-white cursor-pointer'
                                    : 'bg-[var(--app-surface)] text-[var(--app-muted)] border border-[var(--app-border)] cursor-not-allowed'
                                }`}
                              >
                                <Gem className="w-3 h-3 shrink-0" />
                                <span>
                                  {canAfford
                                    ? `Desbloquear (${cost} Jade)`
                                    : `Requiere ${cost} Jade`}
                                </span>
                              </button>

                              {swapCandidate && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    playSuccessChime(soundEnabled);
                                    onSwapTheme?.(
                                      { kind: 'BOARD', id: bTheme.id },
                                      { kind: swapCandidate.kind, id: swapCandidate.id as any }
                                    );
                                    onPreviewBoardTheme?.(null);
                                    setUnlockedCelebration({ name: bTheme.name, seq: Date.now() });
                                    centerActiveGoBoardInView();
                                  }}
                                  data-testid={`swap-board-btn-${bTheme.id}`}
                                  className="flex-1 px-2.5 py-1.5 rounded-lg bg-[var(--app-surface)] hover:border-[var(--app-primary)] border border-[var(--app-border)] text-[var(--app-primary)] text-[11px] font-semibold inline-flex items-center justify-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
                                >
                                  <ArrowLeftRight className="w-3 h-3 shrink-0" />
                                  <span className="truncate">
                                    Cambiar por {swapCandidate.label}
                                  </span>
                                </button>
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] font-semibold text-[#059669]">
                                ✓ Desbloqueado
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  onRefundTheme?.({ kind: 'BOARD', id: bTheme.id });
                                  onPreviewBoardTheme?.(null);
                                }}
                                data-testid={`refund-board-btn-${bTheme.id}`}
                                title="Bloquear de nuevo y recuperar tus Jades para elegir otro"
                                className="text-[10px] font-semibold text-[var(--app-muted)] hover:text-[var(--app-primary)] underline cursor-pointer"
                              >
                                Cambiar (+{cost} Jade)
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

