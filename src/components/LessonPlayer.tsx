import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  HelpCircle,
  Lightbulb,
  Pause,
  Play,
  RotateCcw,
  Gem,
} from 'lucide-react';
import {
  BoardMarker,
  BoardSetupStone,
  BoardSize,
  BoardVisualLayers,
  Coord,
  DemoStep,
  InteractiveExercise,
  LessonContent,
  PlayerColor,
} from '../types/go';
import {
  coordsEqual,
  coordToLabel,
  createGameState,
  validateAndPlayMove,
} from '../engine/goEngine';
import { GoBoard } from './GoBoard';
import { playStoneSound, playSuccessChime } from '../utils/sound';
import { LESSONS_CATALOG } from '../content/curriculumData';
import { PUZZLES_CATALOG } from '../content/puzzlesData';
import {
  CelebrationGifOverlay,
  centerTopInfoSectionInView,
  MaestroRoshiTeachingCard,
  notifySpecialRewardPriority,
  SHOW_REWARD_TEST_BUTTONS,
  triggerTestRewardWithPreloadDelay,
  useQuickBoardSectionScrollAssist,
  warmUpRewardVideoUrls,
} from './MaestroRoshiTeachingCard';
import {
  advanceGlobalCelebrationGif,
  getAcademyLevelBoundaryInfo,
  getAdvancedLessonSpecialVideoUrl,
  LEVEL_COMPLETE_SPECIAL_VIDEO_URL,
  ROSHI_GRADUACION_DIALOGUE,
  ROSHI_GRADUACION_TITLE,
  ROSHI_LEVEL_COMPLETE_DIALOGUE,
} from '../utils/roshiSpriteScheduler';

export interface AnimatedBoardFrame {
  label: string;
  stones: BoardSetupStone[];
  lastMove?: Coord | null;
  markers?: BoardMarker[];
  turn?: PlayerColor;
}

export function buildAnimatedConceptFrames(illustration: {
  size: BoardSize;
  stones: BoardSetupStone[];
  markers?: BoardMarker[];
  caption: string;
}): AnimatedBoardFrame[] {
  const { size, stones, markers = [] } = illustration;
  if (stones.length === 0 && markers.length === 0) {
    return [{ label: 'Tablero 9×9', stones: [], markers: [] }];
  }

  // 1. Check if markers define a numbered sequence ('1', '2', '3', ...)
  const numberedMarkers = markers
    .filter((m) => m.label && /^[1-9]$/.test(m.label.trim()))
    .sort((a, b) => Number(a.label) - Number(b.label));

  if (numberedMarkers.length >= 2) {
    const numberedCoords = new Set(numberedMarkers.map((m) => `${m.x},${m.y}`));
    const baseStones = stones.filter((s) => !numberedCoords.has(`${s.x},${s.y}`));
    const frames: AnimatedBoardFrame[] = [];

    if (baseStones.length > 0) {
      frames.push({
        label: 'Posición base',
        stones: baseStones,
        markers: [],
      });
    }

    let currentStones = [...baseStones];
    let currentMarkers: BoardMarker[] = [];

    for (const numMarker of numberedMarkers) {
      const matchingStone = stones.find((s) => s.x === numMarker.x && s.y === numMarker.y);
      if (matchingStone) {
        currentStones = [...currentStones, matchingStone];
      }
      currentMarkers = [...currentMarkers, numMarker];
      frames.push({
        label: `Jugada ${numMarker.label} (${coordToLabel({ x: numMarker.x, y: numMarker.y }, size)})`,
        stones: currentStones,
        lastMove: { x: numMarker.x, y: numMarker.y },
        markers: currentMarkers,
      });
    }

    // Add final frame if there are additional non-numbered markers
    if (markers.length > numberedMarkers.length) {
      frames.push({
        label: 'Posición completa',
        stones,
        markers,
      });
    }

    return frames;
  }

  // 2. General concept illustration: build a 3-to-4 step progressive visual sequence
  const frames: AnimatedBoardFrame[] = [];

  if (stones.length >= 2) {
    const splitIdx = Math.max(1, Math.floor(stones.length * 0.6));
    const initialSubset = stones.slice(0, splitIdx);
    const lastAddedStone = stones[stones.length - 1];

    frames.push({
      label: '1. Formación inicial',
      stones: initialSubset,
      lastMove: initialSubset[initialSubset.length - 1],
      markers: [],
    });

    frames.push({
      label: `2. Piedras en posición (${coordToLabel(lastAddedStone, size)})`,
      stones,
      lastMove: { x: lastAddedStone.x, y: lastAddedStone.y },
      markers: [],
    });
  } else if (stones.length === 1) {
    frames.push({
      label: '1. Tablero antes de colocar',
      stones: [],
      markers: [],
    });
    frames.push({
      label: `2. Piedra en ${coordToLabel(stones[0], size)}`,
      stones,
      lastMove: { x: stones[0].x, y: stones[0].y },
      markers: [],
    });
  }

  if (markers.length > 0) {
    frames.push({
      label: `${frames.length + 1}. Puntos clave destacados`,
      stones,
      markers,
    });

    // If there is a single tactical target marker on an empty intersection (not Territory 'T'),
    // simulate playing a stone on that key intersection to visually demonstrate the move!
    const occupiedSet = new Set(stones.map((s) => `${s.x},${s.y}`));
    const emptyTacticalMarkers = markers.filter(
      (m) => !occupiedSet.has(`${m.x},${m.y}`) && m.label !== 'T'
    );
    if (emptyTacticalMarkers.length === 1) {
      const target = emptyTacticalMarkers[0];
      const baseGame = createGameState({
        size,
        initialStones: stones,
        startingTurn: 'BLACK',
      });
      const tryBlack = validateAndPlayMove(baseGame, { x: target.x, y: target.y });
      if (tryBlack.legal && tryBlack.nextState) {
        const afterStones: BoardSetupStone[] = [];
        tryBlack.nextState.board.forEach((row, y) =>
          row.forEach((cell, x) => {
            if (cell === 'BLACK' || cell === 'WHITE') {
              afterStones.push({ x, y, color: cell });
            }
          })
        );
        frames.push({
          label: `${frames.length + 1}. Efecto al jugar en ${coordToLabel(target, size)}`,
          stones: afterStones,
          lastMove: { x: target.x, y: target.y },
          markers: [],
        });
      }
    }
  }

  return frames.length > 0 ? frames : [{ label: 'Posición en el tablero', stones, markers }];
}

export function buildAnimatedDemoFrames(
  steps: DemoStep[],
  activeStepIdx: number,
  size: BoardSize
): AnimatedBoardFrame[] {
  const currentStep = steps[activeStepIdx];
  if (!currentStep) return [];

  // When on Step 0 and the board is empty or has a single setup, animate through the first moves of the demo
  if (activeStepIdx === 0 && steps.length > 1) {
    const previewCount = Math.min(steps.length, 3);
    return steps.slice(0, previewCount).map((st, idx) => ({
      label: `Mov. ${idx + 1}: ${st.title}`,
      stones: st.stones,
      lastMove: st.lastMove,
      markers: st.markers,
      turn: st.turn ?? 'BLACK',
    }));
  }

  const prevStep = activeStepIdx > 0 ? steps[activeStepIdx - 1] : null;
  const frames: AnimatedBoardFrame[] = [];

  if (prevStep) {
    frames.push({
      label: '1. Posición previa',
      stones: prevStep.stones,
      lastMove: prevStep.lastMove,
      markers: [],
      turn: prevStep.turn ?? 'BLACK',
    });
  }

  frames.push({
    label: prevStep
      ? `2. ${
          currentStep.lastMove
            ? `Jugada en ${coordToLabel(currentStep.lastMove, size)}`
            : currentStep.title
        }`
      : `1. ${currentStep.title}`,
    stones: currentStep.stones,
    lastMove: currentStep.lastMove,
    markers: prevStep && currentStep.markers && currentStep.markers.length > 0 ? [] : currentStep.markers,
    turn: currentStep.turn ?? 'BLACK',
  });

  if (prevStep && currentStep.markers && currentStep.markers.length > 0) {
    frames.push({
      label: '3. Puntos clave resultantes',
      stones: currentStep.stones,
      lastMove: currentStep.lastMove,
      markers: currentStep.markers,
      turn: currentStep.turn ?? 'BLACK',
    });
  }

  return frames;
}

export interface LessonPlayerProps {
  lesson: LessonContent;
  initialStepIndex?: number;
  visualLayers: BoardVisualLayers;
  soundEnabled: boolean;
  onToggleLayer: (layer: keyof BoardVisualLayers) => void;
  onSaveStepProgress: (lessonId: string, stepIndex: number) => void;
  onCompleteLesson: (
    lessonId: string,
    scorePct: number
  ) => { suppressLessonGifOverlay?: boolean } | void;
  onExit: () => void;
  onOpenPuzzle?: (puzzleId: string) => void;
  nextLesson?: LessonContent | null;
  onSelectLesson?: (lessonId: string) => void;
  onDismissCompleteCelebration?: () => void;
  totalJade?: number;
}

type LessonSectionType =
  | 'ACTIVATION'
  | 'CONCEPTS'
  | 'GUIDED'
  | 'PRACTICE'
  | 'SUMMARY'
  | 'TRANSFER'
  | 'COMPLETE';

const SECTIONS: { key: LessonSectionType; label: string }[] = [
  { key: 'ACTIVATION', label: '1. Activación' },
  { key: 'CONCEPTS', label: '2. Conceptos' },
  { key: 'GUIDED', label: '3. Prueba guiada' },
  { key: 'PRACTICE', label: '4. Práctica' },
  { key: 'SUMMARY', label: '5. Resumen' },
  { key: 'TRANSFER', label: '6. Transferencia' },
  { key: 'COMPLETE', label: '7. Dominio' },
];

export const LessonPlayer: React.FC<LessonPlayerProps> = ({
  lesson,
  initialStepIndex = 0,
  visualLayers,
  soundEnabled,
  onToggleLayer,
  onSaveStepProgress,
  onCompleteLesson,
  onExit,
  onOpenPuzzle,
  nextLesson,
  onSelectLesson,
  onDismissCompleteCelebration,
  totalJade = 2,
}) => {
  const [sectionIdx, setSectionIdx] = useState<number>(
    Math.min(Math.max(0, initialStepIndex), SECTIONS.length - 1)
  );
  const currentSection = SECTIONS[sectionIdx].key;
  const levelBoundary = useMemo(
    () => getAcademyLevelBoundaryInfo(lesson.id, lesson.stageNumber),
    [lesson.id, lesson.stageNumber]
  );
  const resolvedGlobalLessonNumber = useMemo(() => {
    const idx = LESSONS_CATALOG.findIndex((l) => l.id === lesson.id);
    return idx >= 0 ? idx + 1 : 1;
  }, [lesson.id]);
  const isAdvancedLesson = levelBoundary.levelId === 'AVANZADO';
  const isGraduationLesson = isAdvancedLesson && levelBoundary.isLastLessonOfLevel;
  const usesVideoRewardForLesson = isAdvancedLesson || levelBoundary.isLastLessonOfLevel;
  const resolvedLessonVideoUrl = isAdvancedLesson
    ? getAdvancedLessonSpecialVideoUrl(resolvedGlobalLessonNumber)
    : levelBoundary.isLastLessonOfLevel
    ? levelBoundary.completionVideoUrl
    : undefined;
  const [showCompleteCelebrationOverlay, setShowCompleteCelebrationOverlay] = useState<boolean>(
    () => SECTIONS[Math.min(Math.max(0, initialStepIndex), SECTIONS.length - 1)].key === 'COMPLETE'
  );
  const [showTestLessonRewardOverlay, setShowTestLessonRewardOverlay] = useState<boolean>(false);
  const [isPreloadingTestReward, setIsPreloadingTestReward] = useState<boolean>(false);
  const [activeCelebrationGifUrl, setActiveCelebrationGifUrl] = useState<string>(() =>
    advanceGlobalCelebrationGif()
  );

  useEffect(() => {
    if (resolvedLessonVideoUrl) {
      warmUpRewardVideoUrls(resolvedLessonVideoUrl, undefined, true);
    }
  }, [resolvedLessonVideoUrl]);

  // Activation state: track all clicked options so wrong (rose) and correct (mint) states remain visible together
  const [selectedActivationOpt, setSelectedActivationOpt] = useState<string | null>(null);
  const [triedActivationOpts, setTriedActivationOpts] = useState<string[]>([]);
  const [activationAttemptSeq, setActivationAttemptSeq] = useState<number>(0);
  const [triedMcOpts, setTriedMcOpts] = useState<string[]>([]);

  // Concept step state
  const [conceptIdx, setConceptIdx] = useState<number>(0);
  const [showDeepDive, setShowDeepDive] = useState<boolean>(false);

  // Demo step state
  const [demoStepIdx, setDemoStepIdx] = useState<number>(0);

  // Practice index state (for INDEPENDENT PRACTICE)
  const [practiceIdx, setPracticeIdx] = useState<number>(0);

  // Looping animation state for static board illustrations (CONCEPTS & DEMO)
  const [animFrameIdx, setAnimFrameIdx] = useState<number>(0);
  const [isBoardLoopPlaying, setIsBoardLoopPlaying] = useState<boolean>(true);
  const [hasObservedConceptBoard, setHasObservedConceptBoard] = useState<boolean>(false);

  // Refs to auto-center the active lesson phase in the top horizontal stepper menu
  const stepperBarRef = useRef<HTMLDivElement | null>(null);
  const stepButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Reset lesson player when lesson.id changes
  useEffect(() => {
    setSectionIdx(0);
    setSelectedActivationOpt(null);
    setTriedActivationOpts([]);
    setActivationAttemptSeq(0);
    setTriedMcOpts([]);
    setConceptIdx(0);
    setShowDeepDive(false);
    setDemoStepIdx(0);
    setPracticeIdx(0);
    setAnimFrameIdx(0);
    setIsBoardLoopPlaying(true);
    setHasObservedConceptBoard(false);
    setShowCompleteCelebrationOverlay(false);
  }, [lesson.id]);

  // Center the active phase button inside the top horizontal stepper bar whenever sectionIdx changes
  useEffect(() => {
    const centerActivePhaseInStepper = () => {
      const container = stepperBarRef.current;
      const activeBtn = stepButtonRefs.current[sectionIdx];
      if (!container || !activeBtn) return;

      const containerRect = container.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      const targetScrollLeft =
        container.scrollLeft +
        (btnRect.left - containerRect.left) -
        containerRect.width / 2 +
        btnRect.width / 2;

      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: 'smooth',
      });
    };

    const rafId = requestAnimationFrame(centerActivePhaseInStepper);
    const timerId = setTimeout(centerActivePhaseInStepper, 90);
    window.addEventListener('resize', centerActivePhaseInStepper);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
      window.removeEventListener('resize', centerActivePhaseInStepper);
    };
  }, [sectionIdx, lesson.id]);

  const relatedPuzzles = useMemo(() => {
    if (!lesson.relatedPuzzleIds || lesson.relatedPuzzleIds.length === 0) return [];
    return PUZZLES_CATALOG.filter((p) => lesson.relatedPuzzleIds?.includes(p.id));
  }, [lesson.relatedPuzzleIds]);

  const activeStepTopInfoKey = `${lesson.id}-sec-${sectionIdx}-c-${conceptIdx}-d-${demoStepIdx}-p-${practiceIdx}`;

  // Enable quick scroll-assist between top text section and Go board
  useQuickBoardSectionScrollAssist(activeStepTopInfoKey);

  // When advancing to a new step where new text appears above the board, center on the top text section
  useEffect(() => {
    setAnimFrameIdx(0);
    setIsBoardLoopPlaying(true);
    setHasObservedConceptBoard(false);
    centerTopInfoSectionInView({ fallbackScrollTop: true });
  }, [lesson.id, sectionIdx, conceptIdx, demoStepIdx, practiceIdx]);

  // Animated frames for CONCEPTS static board illustration
  const conceptAnimatedFrames = useMemo(() => {
    if (currentSection !== 'CONCEPTS') return [];
    const illus = lesson.conceptSteps[conceptIdx]?.boardIllustration;
    if (!illus) return [];
    return buildAnimatedConceptFrames(illus);
  }, [currentSection, lesson.conceptSteps, conceptIdx]);

  const activeLoopFrames = currentSection === 'CONCEPTS' ? conceptAnimatedFrames : [];

  useEffect(() => {
    if (!isBoardLoopPlaying || activeLoopFrames.length <= 1) return;
    const isLastFrame = animFrameIdx % activeLoopFrames.length === activeLoopFrames.length - 1;
    const delayMs = isLastFrame ? 1850 : 1250;
    const timer = setTimeout(() => {
      setAnimFrameIdx((prev) => (prev + 1) % activeLoopFrames.length);
    }, delayMs);
    return () => clearTimeout(timer);
  }, [isBoardLoopPlaying, activeLoopFrames, animFrameIdx]);

  // Reveal the progressive right-side advance cue once the user finishes observing the concept board animation
  useEffect(() => {
    if (currentSection !== 'CONCEPTS') {
      setHasObservedConceptBoard(false);
      return;
    }
    if (hasObservedConceptBoard) return;

    if (activeLoopFrames.length <= 1) {
      const singleFrameTimer = setTimeout(() => {
        setHasObservedConceptBoard(true);
      }, 1800);
      return () => clearTimeout(singleFrameTimer);
    }

    const currentFrameIndex = animFrameIdx % activeLoopFrames.length;
    if (currentFrameIndex === activeLoopFrames.length - 1) {
      const finalFrameDigestTimer = setTimeout(() => {
        setHasObservedConceptBoard(true);
      }, 450);
      return () => clearTimeout(finalFrameDigestTimer);
    }
  }, [currentSection, activeLoopFrames.length, animFrameIdx, hasObservedConceptBoard]);

  // Interactive Exercise state (shared by GUIDED, PRACTICE, TRANSFER)
  const activeExercise: InteractiveExercise | null = useMemo(() => {
    if (currentSection === 'GUIDED') return lesson.guidedDecisions[0] ?? null;
    if (currentSection === 'PRACTICE')
      return lesson.independentPractice[practiceIdx] ?? lesson.independentPractice[0] ?? null;
    if (currentSection === 'TRANSFER') return lesson.transferQuestion;
    return null;
  }, [currentSection, lesson, practiceIdx]);

  const [exerciseGame, setExerciseGame] = useState(() =>
    createGameState({
      size: activeExercise?.boardSize ?? 9,
      initialStones: activeExercise?.initialStones ?? [],
      startingTurn: activeExercise?.turn ?? 'BLACK',
    })
  );
  const [exerciseStatus, setExerciseStatus] = useState<'PENDING' | 'CORRECT' | 'WRONG'>('PENDING');
  const [exerciseFeedback, setExerciseFeedback] = useState<string>('');
  const [exerciseHintLevel, setExerciseHintLevel] = useState<number>(0);
  const [selectedMcOption, setSelectedMcOption] = useState<string | null>(null);
  const [firstTrySuccessCount, setFirstTrySuccessCount] = useState<number>(0);
  const [hadWrongAttemptCurrent, setHadWrongAttemptCurrent] = useState<boolean>(false);
  const [lastExerciseActionWasBoardClick, setLastExerciseActionWasBoardClick] =
    useState<boolean>(false);
  const [exerciseAttemptSeq, setExerciseAttemptSeq] = useState<number>(0);
  const [lastExerciseActionType, setLastExerciseActionType] = useState<'ATTEMPT' | 'HINT' | null>(
    null
  );

  // Reset exercise board when activeExercise changes
  useEffect(() => {
    if (activeExercise) {
      setExerciseGame(
        createGameState({
          size: activeExercise.boardSize,
          initialStones: activeExercise.initialStones,
          startingTurn: activeExercise.turn,
        })
      );
      setExerciseStatus('PENDING');
      setExerciseFeedback('');
      setExerciseHintLevel(0);
      setSelectedMcOption(null);
      setTriedMcOpts([]);
      setHadWrongAttemptCurrent(false);
      setLastExerciseActionWasBoardClick(false);
      setExerciseAttemptSeq(0);
      setLastExerciseActionType(null);
    }
  }, [activeExercise]);

  const goToSection = (nextIdx: number) => {
    const clamped = Math.min(Math.max(0, nextIdx), SECTIONS.length - 1);
    setSectionIdx(clamped);
    onSaveStepProgress(lesson.id, clamped);
    if (SECTIONS[clamped].key === 'COMPLETE') {
      notifySpecialRewardPriority();
      const totalExercises = 1 + lesson.independentPractice.length + 1;
      const pct = Math.max(80, Math.min(100, Math.round((firstTrySuccessCount / totalExercises) * 100)));
      playSuccessChime(soundEnabled);
      const completeRes = onCompleteLesson(lesson.id, pct);
      if (!usesVideoRewardForLesson && completeRes?.suppressLessonGifOverlay) {
        setShowCompleteCelebrationOverlay(false);
      } else {
        if (!usesVideoRewardForLesson) {
          setActiveCelebrationGifUrl(advanceGlobalCelebrationGif());
        }
        setShowCompleteCelebrationOverlay(true);
      }
    }
  };

  const handleExerciseBoardClick = (coord: Coord) => {
    if (!activeExercise || activeExercise.exerciseType === 'MULTIPLE_CHOICE') return;
    if (exerciseStatus === 'CORRECT') return;

    const baseState = createGameState({
      size: activeExercise.boardSize,
      initialStones: activeExercise.initialStones,
      startingTurn: activeExercise.turn,
    });

    const isExpectedSolution = (activeExercise.validCoords ?? []).some((vc) =>
      coordsEqual(vc, coord)
    );

    setLastExerciseActionWasBoardClick(true);
    setLastExerciseActionType('ATTEMPT');
    setExerciseAttemptSeq((s) => s + 1);

    const res = validateAndPlayMove(baseState, coord);
    if (!res.legal) {
      setExerciseGame(baseState);
      setExerciseStatus('WRONG');
      setHadWrongAttemptCurrent(true);
      setExerciseFeedback(res.messageEs);
      return;
    }

    if (isExpectedSolution && res.nextState) {
      playStoneSound(soundEnabled, (res.capturedStones?.length ?? 0) > 0);
      setExerciseGame(res.nextState);
      setExerciseStatus('CORRECT');
      setExerciseFeedback(activeExercise.correctFeedback);
      if (!hadWrongAttemptCurrent) {
        setFirstTrySuccessCount((c) => c + 1);
      }
    } else {
      if (res.nextState) {
        playStoneSound(soundEnabled, (res.capturedStones?.length ?? 0) > 0);
        setExerciseGame(res.nextState);
      }
      setExerciseStatus('WRONG');
      setHadWrongAttemptCurrent(true);
      const specificWrong = activeExercise.wrongFeedback[`${coord.x},${coord.y}`];
      setExerciseFeedback(
        specificWrong ||
          `${activeExercise.defaultWrongFeedback} (Intentaste ${coordToLabel(coord, activeExercise.boardSize)}).`
      );
    }
  };

  const handleExerciseMcSelect = (optId: string) => {
    if (!activeExercise || !activeExercise.options) return;
    setLastExerciseActionWasBoardClick(false);
    setLastExerciseActionType('ATTEMPT');
    setExerciseAttemptSeq((s) => s + 1);
    setSelectedMcOption(optId);
    setTriedMcOpts((prev) => (prev.includes(optId) ? prev : [...prev, optId]));
    const opt = activeExercise.options.find((o) => o.id === optId);
    if (!opt) return;
    if (opt.isCorrect) {
      playSuccessChime(soundEnabled);
      setExerciseStatus('CORRECT');
      setExerciseFeedback(opt.feedback || activeExercise.correctFeedback);
      if (!hadWrongAttemptCurrent) {
        setFirstTrySuccessCount((c) => c + 1);
      }
    } else {
      setExerciseStatus('WRONG');
      setHadWrongAttemptCurrent(true);
      setExerciseFeedback(opt.feedback || activeExercise.defaultWrongFeedback);
    }
  };

  const handleResetExercise = () => {
    if (!activeExercise) return;
    setLastExerciseActionWasBoardClick(false);
    setLastExerciseActionType(null);
    setExerciseGame(
      createGameState({
        size: activeExercise.boardSize,
        initialStones: activeExercise.initialStones,
        startingTurn: activeExercise.turn,
      })
    );
    setExerciseStatus('PENDING');
    setExerciseFeedback('');
    setSelectedMcOption(null);
    setTriedMcOpts([]);
  };

  const selectedActivationOptionObj = useMemo(
    () =>
      selectedActivationOpt
        ? lesson.activationQuestion.options.find((o) => o.id === selectedActivationOpt) ?? null
        : null,
    [lesson.activationQuestion.options, selectedActivationOpt]
  );

  const activeConceptFrame =
    conceptAnimatedFrames[animFrameIdx % Math.max(1, conceptAnimatedFrames.length)] ?? null;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-40 md:pb-52">
      {showTestLessonRewardOverlay && resolvedLessonVideoUrl && (
        <CelebrationGifOverlay
          open={showTestLessonRewardOverlay}
          videoUrl={resolvedLessonVideoUrl}
          congratsTitle={
            isGraduationLesson
              ? ROSHI_GRADUACION_TITLE
              : levelBoundary.isLastLessonOfLevel && !isAdvancedLesson
              ? `Completaste el ${levelBoundary.levelLabel} de la Academia`
              : '¡Clase Completada!'
          }
          subtitle={
            levelBoundary.isLastLessonOfLevel
              ? undefined
              : lesson.title
          }
          xpEarned={lesson.xpReward}
          totalJade={totalJade}
          accomplishmentText={
            isGraduationLesson
              ? ROSHI_GRADUACION_TITLE
              : levelBoundary.isLastLessonOfLevel && !isAdvancedLesson
              ? `Completaste el ${levelBoundary.levelLabel} de la Academia`
              : undefined
          }
          specialLevelDialogue={
            isGraduationLesson
              ? ROSHI_GRADUACION_DIALOGUE
              : levelBoundary.isLastLessonOfLevel && !isAdvancedLesson
              ? ROSHI_LEVEL_COMPLETE_DIALOGUE
              : undefined
          }
          onClose={() => setShowTestLessonRewardOverlay(false)}
          actionLabel="Continuar"
          testId="lesson-info-test-reward-overlay"
        />
      )}

      {/* Top Lesson Header & Progress Stepper (Title prioritized on left, compact "Volver" button flush on right) */}
      <div className="bg-white/90 border border-[#202622]/10 rounded-2xl p-3.5 md:p-6 shadow-xs space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] sm:text-xs text-[#202622]/65">
              Clase {resolvedGlobalLessonNumber} · {lesson.stageTitle} · Unidad {lesson.unitNumber} · {lesson.estimatedMinutes} min
            </p>
            <h1 className="text-base md:text-2xl font-display font-semibold text-[#202622]">
              {lesson.title}
            </h1>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {SHOW_REWARD_TEST_BUTTONS && usesVideoRewardForLesson && (
              <button
                type="button"
                disabled={isPreloadingTestReward}
                onClick={() => {
                  triggerTestRewardWithPreloadDelay(
                    resolvedLessonVideoUrl,
                    () => setShowTestLessonRewardOverlay(true),
                    setIsPreloadingTestReward
                  );
                }}
                data-testid="lesson-info-test-reward-btn"
                className="px-2.5 py-1.5 rounded-lg bg-[#F5F1E8] border border-[#173C35]/25 text-[11px] font-semibold text-[#173C35] hover:bg-[#173C35] hover:text-white disabled:opacity-60 transition-colors inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{isPreloadingTestReward ? 'Cargando...' : 'Probar recompensa'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={onExit}
              data-testid="lesson-back-btn"
              className="px-3 py-1.5 rounded-lg border border-[#202622]/15 text-xs font-medium text-[#202622] hover:bg-[#F5F1E8] transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver</span>
            </button>
          </div>
        </div>

        {/* Observable Objective Banner (hidden on small screens so the active title + board stay at the top) */}
        <div className="hidden sm:block px-3.5 py-2 rounded-xl bg-[#F5F1E8] border border-[#202622]/10 text-xs text-[#202622]/90">
          <strong className="text-[#173C35]">Objetivo observable:</strong> {lesson.observableObjective}
        </div>

        {/* Interactive Stepper Bar (Auto-centers the currently active phase horizontally) */}
        <div
          ref={stepperBarRef}
          data-testid="lesson-stepper-bar"
          className="relative flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 scroll-smooth"
        >
          <div aria-hidden="true" className="shrink-0 w-[30%] sm:w-[22%]" />
          {SECTIONS.map((sec, idx) => {
            const isCurrent = idx === sectionIdx;
            const isDone = idx < sectionIdx;
            return (
              <button
                key={sec.key}
                ref={(el) => {
                  stepButtonRefs.current[idx] = el;
                }}
                type="button"
                data-testid={`lesson-phase-tab-${sec.key}`}
                data-active={isCurrent ? 'true' : 'false'}
                onClick={() => goToSection(idx)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isCurrent
                    ? 'bg-[#173C35] text-[#F5F1E8] font-bold shadow-xs scale-[1.03]'
                    : isDone
                    ? 'bg-[#173C35]/12 text-[#173C35]'
                    : 'bg-[#F5F1E8] text-[#202622]/65 hover:text-[#202622]'
                }`}
              >
                {sec.label}
              </button>
            );
          })}
          <div aria-hidden="true" className="shrink-0 w-[30%] sm:w-[22%]" />
        </div>
      </div>

      {/* SECTION 1: ACTIVATION QUESTION */}
      {currentSection === 'ACTIVATION' && (
        <div
          className="bg-[#FAF9F5] border border-[#E6E1D6] rounded-2xl p-5 md:p-8 space-y-5 shadow-xs"
          data-testid="board-top-info-section"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#A86036] uppercase">
              <HelpCircle className="w-4 h-4 text-[#A86036]" />
              <span>RETO DE ACTIVACIÓN</span>
            </div>
            <h2 className="text-xl md:text-2xl font-sans font-bold text-[#143026]">
              {lesson.activationQuestion.question}
            </h2>
          </div>

          {/* Maestro Roshi Spotlight Overlay & Docked Bar right below the title */}
          {selectedActivationOptionObj ? (
            <MaestroRoshiTeachingCard
              title={
                selectedActivationOptionObj.isCorrect
                  ? '¡Excelente intuición!'
                  : 'Analicemos juntos'
              }
              message={selectedActivationOptionObj.explanation}
              tone={selectedActivationOptionObj.isCorrect ? 'SUCCESS' : 'WARNING'}
              animationCategory={selectedActivationOptionObj.isCorrect ? 'SURPRISE' : 'MISTAKE'}
              interactionKey={`act-${lesson.id}-${selectedActivationOptionObj.id}-${activationAttemptSeq}`}
              topInfoKey={`${activeStepTopInfoKey}-${selectedActivationOptionObj.id}-${activationAttemptSeq}`}
              centerBoardOnDismiss={false}
              onDismissSpotlight={() => centerTopInfoSectionInView()}
              prioritizeActionOnRight={true}
              dismissLabel="Entendido"
              testId="lesson-roshi-activation-card"
            >
              <button
                type="button"
                onClick={() => goToSection(1)}
                data-testid="activation-continue-btn"
                className="px-5 py-2.5 bg-[#133F32] text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-[#0F3328] transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
              >
                <span>Continuar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </MaestroRoshiTeachingCard>
          ) : (
            <MaestroRoshiTeachingCard
              title="Pregunta de Activación"
              message={lesson.activationQuestion.question}
              animationCategory="CONVERSATION"
              interactionKey={`act-intro-${lesson.id}`}
              topInfoKey={activeStepTopInfoKey}
              centerBoardOnDismiss={false}
              onDismissSpotlight={() => centerTopInfoSectionInView()}
              dismissLabel="Entendido"
              testId="lesson-roshi-activation-card"
            />
          )}

          <div className="space-y-3">
            {lesson.activationQuestion.options.map((opt) => {
              const isTried = triedActivationOpts.includes(opt.id) || selectedActivationOpt === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setSelectedActivationOpt(opt.id);
                    setActivationAttemptSeq((s) => s + 1);
                    setTriedActivationOpts((prev) =>
                      prev.includes(opt.id) ? prev : [...prev, opt.id]
                    );
                    if (opt.isCorrect) {
                      playSuccessChime(soundEnabled);
                    }
                  }}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isTried
                      ? opt.isCorrect
                        ? 'bg-[#EAF7F0] border-[#55B685] text-[#0F3D29] font-semibold shadow-2xs'
                        : 'bg-[#FDF2F2] border-[#E08787] text-[#6E1E1E] font-medium'
                      : 'bg-[#FAF9F5] border-[#E2DDD2] text-[#1C2823] hover:border-[#133F32]/45 hover:bg-white'
                  }`}
                >
                  <span className="text-sm md:text-base">{opt.text}</span>
                  {isTried && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-[#279663] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex justify-end pt-2 border-t border-[#E6E1D6]">
            <button
              type="button"
              onClick={() => goToSection(1)}
              className="px-5 py-2.5 bg-[#133F32] text-white text-sm font-semibold rounded-full hover:bg-[#0F3328] transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Continuar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* SECTION 2: BRIEF CONCEPT STEPS + ANIMATED LOOPING BOARD */}
      {currentSection === 'CONCEPTS' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Child 1: Concept Title + Maestro Roshi Spotlight/Pill */}
          <div
            className="lg:col-span-7 lg:row-start-1 bg-white/90 border border-[#202622]/10 rounded-2xl p-5 md:p-6 space-y-4"
            data-testid="board-top-info-section"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider text-[#B66A3C]">
                PASO 2 · CONCEPTO {conceptIdx + 1} DE {lesson.conceptSteps.length}
              </span>
              <div className="flex items-center gap-1">
                {lesson.conceptSteps.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setConceptIdx(idx);
                      setShowDeepDive(false);
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-mono cursor-pointer ${
                      idx === conceptIdx
                        ? 'bg-[#173C35] text-[#F5F1E8]'
                        : 'bg-[#F5F1E8] text-[#202622]/70'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <h2 className="text-xl md:text-2xl font-display font-semibold text-[#202622]">
              {lesson.conceptSteps[conceptIdx].title}
            </h2>

            {/* Maestro Roshi Animated Concept Teaching */}
            <MaestroRoshiTeachingCard
              title={`Concepto ${conceptIdx + 1}`}
              message={lesson.conceptSteps[conceptIdx].body}
              subMessage={
                showDeepDive ? lesson.conceptSteps[conceptIdx].deepDive : undefined
              }
              subMessageLabel="Profundización teórica:"
              animationCategory="CONVERSATION"
              interactionKey={`concept-${lesson.id}-${conceptIdx}-${showDeepDive ? 'deep' : 'base'}`}
              dismissLabel="Entendido"
              alwaysCenterBoardOnDismiss={true}
              onDismissSpotlight={() => {
                setAnimFrameIdx(0);
                setIsBoardLoopPlaying(true);
                setHasObservedConceptBoard(false);
              }}
              testId="lesson-roshi-concept-card"
            />
          </div>

          {/* Child 2: GoBoard Illustration with Automatic Looping Sequence Animation */}
          <div className="relative lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-2 bg-white/90 border border-[#202622]/10 rounded-2xl p-5 flex flex-col items-center space-y-3">
            {lesson.conceptSteps[conceptIdx].boardIllustration && activeConceptFrame && (
              <>
                <GoBoard
                  size={lesson.conceptSteps[conceptIdx].boardIllustration!.size}
                  board={
                    createGameState({
                      size: lesson.conceptSteps[conceptIdx].boardIllustration!.size,
                      initialStones: activeConceptFrame.stones,
                    }).board
                  }
                  currentTurn={activeConceptFrame.turn ?? 'BLACK'}
                  lastMove={activeConceptFrame.lastMove ?? null}
                  markers={activeConceptFrame.markers}
                  visualLayers={visualLayers}
                  onToggleLayer={onToggleLayer}
                  interactive={false}
                  caption={lesson.conceptSteps[conceptIdx].boardIllustration!.caption}
                />

                {conceptAnimatedFrames.length > 1 && (
                  <div
                    className="w-full max-w-[490px] px-3 py-2 rounded-xl bg-[#F5F1E8] border border-[#202622]/10 flex flex-wrap items-center justify-between gap-2 text-xs"
                    data-testid="lesson-board-loop-controls"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <button
                        type="button"
                        onClick={() => setIsBoardLoopPlaying((p) => !p)}
                        aria-label={isBoardLoopPlaying ? 'Pausar animación' : 'Reproducir animación'}
                        className="p-1.5 rounded-lg bg-[#173C35] text-white hover:bg-[#173C35]/90 transition-colors cursor-pointer shrink-0"
                      >
                        {isBoardLoopPlaying ? (
                          <Pause className="w-3 h-3" />
                        ) : (
                          <Play className="w-3 h-3 fill-current" />
                        )}
                      </button>
                      <span className="font-semibold text-[#173C35] truncate">
                        {activeConceptFrame.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {conceptAnimatedFrames.map((fr, fIdx) => {
                        const isActiveFrame =
                          animFrameIdx % conceptAnimatedFrames.length === fIdx;
                        return (
                          <button
                            key={fIdx}
                            type="button"
                            onClick={() => {
                              setIsBoardLoopPlaying(false);
                              setAnimFrameIdx(fIdx);
                            }}
                            title={fr.label}
                            className={`w-5 h-5 rounded text-[10px] font-mono font-bold transition-colors cursor-pointer ${
                              isActiveFrame
                                ? 'bg-[#173C35] text-white'
                                : 'bg-white text-[#202622]/70 border border-[#202622]/15'
                            }`}
                          >
                            {fIdx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Child 3: Deep Dive & Concept Step Navigation */}
          <div className="lg:col-span-7 lg:row-start-2 bg-white/90 border border-[#202622]/10 rounded-2xl p-5 space-y-4">
            <div className="border border-[#202622]/12 rounded-xl overflow-hidden bg-[#F5F1E8]/60">
              <button
                type="button"
                onClick={() => setShowDeepDive((v) => !v)}
                aria-expanded={showDeepDive}
                className="w-full px-4 py-3 flex items-center justify-between text-xs font-semibold text-[#173C35] hover:bg-[#F5F1E8] transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Explícamelo con más profundidad (Teoría adicional)</span>
                </span>
                {showDeepDive ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showDeepDive && (
                <div className="px-4 pb-4 pt-1 text-xs text-[#202622]/85 leading-relaxed border-t border-[#202622]/10">
                  {lesson.conceptSteps[conceptIdx].deepDive}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#202622]/10">
              <button
                type="button"
                onClick={() => {
                  if (conceptIdx > 0) {
                    setConceptIdx(conceptIdx - 1);
                  } else {
                    goToSection(0);
                  }
                }}
                className="px-4 py-2 text-xs font-medium text-[#202622]/80 hover:text-[#202622] flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (conceptIdx < lesson.conceptSteps.length - 1) {
                    setConceptIdx(conceptIdx + 1);
                    setShowDeepDive(false);
                  } else {
                    goToSection(2);
                  }
                }}
                className="px-5 py-2.5 bg-[#173C35] text-[#F5F1E8] text-sm font-semibold rounded-lg hover:bg-[#173C35]/90 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>
                  {conceptIdx < lesson.conceptSteps.length - 1
                    ? 'Siguiente concepto'
                    : 'Ir a la prueba guiada'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progressive, Translucent Right-Edge Advance Animation (Appears after observing the board sequence) */}
          {hasObservedConceptBoard && (
            <button
              type="button"
              data-testid="concept-right-edge-advance-cue"
              onClick={() => {
                if (conceptIdx < lesson.conceptSteps.length - 1) {
                  setConceptIdx(conceptIdx + 1);
                  setShowDeepDive(false);
                } else {
                  goToSection(2);
                }
              }}
              aria-label={
                conceptIdx < lesson.conceptSteps.length - 1
                  ? `Avanzar al siguiente concepto (${conceptIdx + 2} de ${lesson.conceptSteps.length})`
                  : 'Avanzar a la prueba guiada'
              }
              title={
                conceptIdx < lesson.conceptSteps.length - 1
                  ? `Siguiente concepto (${conceptIdx + 2}/${lesson.conceptSteps.length})`
                  : 'Ir a la prueba guiada'
              }
              className="concept-edge-cue fixed right-2 sm:right-4 top-1/2 z-30 w-16 sm:w-20 min-h-[112px] sm:min-h-[128px] py-5 px-2.5 rounded-2xl bg-gradient-to-l from-[var(--app-primary)]/68 via-[var(--app-primary)]/40 to-[var(--app-primary)]/14 hover:from-[var(--app-primary)]/82 hover:via-[var(--app-primary)]/52 border border-white/25 shadow-md flex flex-col items-center justify-center gap-2 cursor-pointer select-none transition-colors group"
            >
              <div className="flex items-center -space-x-2.5 text-white drop-shadow-xs">
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 concept-chevron-wave-1" />
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 concept-chevron-wave-2" />
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 concept-chevron-wave-3" />
              </div>
              <span className="text-[11px] sm:text-xs font-sans font-bold tracking-tight text-white drop-shadow-xs leading-tight text-center">
                {conceptIdx < lesson.conceptSteps.length - 1 ? 'Siguiente' : 'Guiada'}
              </span>
              <span className="text-[10px] font-mono font-bold tracking-tight text-white/90 drop-shadow-xs leading-none">
                {conceptIdx < lesson.conceptSteps.length - 1
                  ? `${conceptIdx + 2}/${lesson.conceptSteps.length}`
                  : 'Paso 3'}
              </span>
            </button>
          )}
        </div>
      )}

      {/* SECTIONS 3, 4, 6: INTERACTIVE EXERCISES (Question + Options above Board) */}
      {(currentSection === 'GUIDED' ||
        currentSection === 'PRACTICE' ||
        currentSection === 'TRANSFER') &&
        activeExercise && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Child 1: Exercise Prompt Title + Maestro Roshi + Multiple Choice Options (Above Board) */}
            <div
              className="lg:col-span-6 lg:row-start-1 bg-white/90 border border-[#202622]/10 rounded-2xl p-5 space-y-4"
              data-testid="board-top-info-section"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider text-[#B66A3C]">
                  {currentSection === 'GUIDED'
                    ? 'PASO 3 · PRUEBA GUIADA EN TABLERO'
                    : currentSection === 'PRACTICE'
                    ? `PASO 4 · PRÁCTICA INDEPENDIENTE (${practiceIdx + 1} DE ${lesson.independentPractice.length})`
                    : 'PASO 6 · PREGUNTA DE TRANSFERENCIA'}
                </span>

                {currentSection === 'PRACTICE' && (
                  <div className="flex items-center gap-1">
                    {lesson.independentPractice.map((ex, idx) => (
                      <button
                        key={ex.id}
                        type="button"
                        onClick={() => setPracticeIdx(idx)}
                        className={`px-2.5 py-1 rounded text-xs font-mono cursor-pointer ${
                          idx === practiceIdx
                            ? 'bg-[#173C35] text-[#F5F1E8]'
                            : 'bg-[#F5F1E8] text-[#202622]/70'
                        }`}
                      >
                        Ej. {idx + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <h2 className="text-lg md:text-xl font-display font-semibold text-[#202622] leading-snug">
                {activeExercise.prompt}
              </h2>

              {/* Maestro Roshi Interactive Instruction / Feedback / Hint Box:
                  Uses activeExercise.prompt directly when PENDING so no redundant filler text is added! */}
              <div role="status">
                <MaestroRoshiTeachingCard
                  title={
                    exerciseStatus === 'CORRECT'
                      ? '¡Jugada correcta!'
                      : exerciseStatus === 'WRONG'
                      ? 'Aún no es la jugada óptima'
                      : 'Indicación del Maestro Roshi'
                  }
                  message={
                    exerciseStatus !== 'PENDING'
                      ? exerciseFeedback
                      : exerciseHintLevel > 0
                      ? activeExercise.hints.slice(0, exerciseHintLevel).join(' · ')
                      : activeExercise.prompt
                  }
                  subMessage={
                    exerciseStatus !== 'PENDING' && exerciseHintLevel > 0
                      ? activeExercise.hints.slice(0, exerciseHintLevel).join(' · ')
                      : undefined
                  }
                  subMessageLabel="Pista activa:"
                  tone={
                    exerciseStatus === 'CORRECT'
                      ? 'SUCCESS'
                      : exerciseStatus === 'WRONG'
                      ? 'WARNING'
                      : 'DEFAULT'
                  }
                  animationCategory={
                    exerciseStatus === 'CORRECT'
                      ? 'SURPRISE'
                      : exerciseStatus === 'WRONG' && lastExerciseActionType === 'ATTEMPT'
                      ? 'MISTAKE'
                      : 'CONVERSATION'
                  }
                  interactionKey={`ex-${activeExercise.id}-${exerciseStatus}-${exerciseAttemptSeq}-${exerciseHintLevel}`}
                  topInfoKey={
                    activeExercise.exerciseType === 'MULTIPLE_CHOICE'
                      ? `${activeStepTopInfoKey}-${exerciseStatus}-${selectedMcOption ?? 'init'}-${exerciseAttemptSeq}`
                      : undefined
                  }
                  spotlightDelayMs={lastExerciseActionWasBoardClick ? 650 : 0}
                  prioritizeActionOnRight={exerciseStatus === 'CORRECT'}
                  dismissLabel="Entendido"
                  centerBoardOnDismiss={activeExercise.exerciseType === 'PLACE_STONE'}
                  alwaysCenterBoardOnDismiss={activeExercise.exerciseType === 'PLACE_STONE'}
                  onDismissSpotlight={
                    activeExercise.exerciseType === 'MULTIPLE_CHOICE'
                      ? () => centerTopInfoSectionInView()
                      : undefined
                  }
                  testId="lesson-roshi-exercise-card"
                >
                  {exerciseStatus === 'CORRECT' && (
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          currentSection === 'PRACTICE' &&
                          practiceIdx < lesson.independentPractice.length - 1
                        ) {
                          setPracticeIdx(practiceIdx + 1);
                        } else {
                          goToSection(sectionIdx + 1);
                        }
                      }}
                      className="px-4 py-2.5 bg-[#173C35] text-[#F5F1E8] text-xs sm:text-sm font-bold rounded-xl hover:bg-[#173C35]/90 transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
                    >
                      <span>Continuar</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </MaestroRoshiTeachingCard>
              </div>

              {/* Multiple Choice Answer Options placed directly below the question and ABOVE the GoBoard */}
              {activeExercise.exerciseType === 'MULTIPLE_CHOICE' && activeExercise.options && (
                <div className="space-y-2.5 pt-1" data-testid="lesson-mc-options-above-board">
                  {activeExercise.options.map((opt) => {
                    const isTried = triedMcOpts.includes(opt.id) || selectedMcOption === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleExerciseMcSelect(opt.id)}
                        className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm transition-all cursor-pointer flex items-center justify-between gap-2 ${
                          isTried
                            ? opt.isCorrect
                              ? 'bg-[#EAF7F0] border-[#55B685] text-[#0F3D29] font-semibold'
                              : 'bg-[#FDF2F2] border-[#E08787] text-[#6E1E1E] font-medium'
                            : 'bg-[#FAF9F5] border-[#E2DDD2] text-[#1C2823] hover:border-[#133F32]/50 hover:bg-white'
                        }`}
                      >
                        <span>{opt.text}</span>
                        {isTried && opt.isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-[#279663] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Child 2: Interactive GoBoard (Immediately below Question/Options on Mobile; Right Column on Desktop) */}
            <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:row-span-2 bg-white/90 border border-[#202622]/10 rounded-2xl p-5 flex flex-col items-center">
              <div className="mb-2 flex items-center justify-between w-full max-w-[490px] text-xs font-medium text-[#202622]/75">
                <span>
                  Turno de: <strong>{activeExercise.turn === 'BLACK' ? 'Negro ●' : 'Blanco ○'}</strong>
                </span>
                <span>
                  {activeExercise.exerciseType === 'PLACE_STONE'
                    ? 'Haz clic en la intersección correcta'
                    : 'Observa el tablero y elige la respuesta'}
                </span>
              </div>
              <GoBoard
                size={activeExercise.boardSize}
                board={exerciseGame.board}
                currentTurn={exerciseGame.currentTurn}
                lastMove={exerciseGame.lastMove?.coord}
                markers={activeExercise.markers}
                visualLayers={visualLayers}
                onToggleLayer={onToggleLayer}
                onSelectIntersection={handleExerciseBoardClick}
                interactive={activeExercise.exerciseType === 'PLACE_STONE'}
              />
            </div>

            {/* Child 3: Hints and Action Controls */}
            <div className="lg:col-span-6 lg:row-start-2 bg-white/90 border border-[#202622]/10 rounded-2xl p-5 space-y-4">
              {/* Graduated Hints List when unlocked */}
              {exerciseHintLevel > 0 && (
                <div className="p-3.5 rounded-xl bg-[#B66A3C]/10 border border-[#B66A3C]/30 space-y-1.5 text-xs text-[#202622]">
                  {activeExercise.hints.slice(0, exerciseHintLevel).map((h, i) => (
                    <p key={i} className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-[#B66A3C] shrink-0 mt-0.5" />
                      <span>
                        <strong>Pista {i + 1}:</strong> {h}
                      </span>
                    </p>
                  ))}
                </div>
              )}

              {/* Action Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={exerciseHintLevel >= activeExercise.hints.length}
                    onClick={() => {
                      setLastExerciseActionWasBoardClick(false);
                      setLastExerciseActionType('HINT');
                      setExerciseHintLevel((l) => Math.min(activeExercise.hints.length, l + 1));
                    }}
                    className="px-3 py-2 rounded-lg border border-[#B66A3C]/40 text-[#B66A3C] hover:bg-[#B66A3C]/10 text-xs font-semibold disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>
                      Pedir pista ({exerciseHintLevel}/{activeExercise.hints.length})
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetExercise}
                    className="px-3 py-2 rounded-lg border border-[#202622]/15 text-xs font-medium text-[#202622]/80 hover:bg-[#F5F1E8] flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reiniciar posición</span>
                  </button>
                </div>

                {exerciseStatus === 'CORRECT' && (
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        currentSection === 'PRACTICE' &&
                        practiceIdx < lesson.independentPractice.length - 1
                      ) {
                        setPracticeIdx(practiceIdx + 1);
                      } else {
                        goToSection(sectionIdx + 1);
                      }
                    }}
                    className="px-5 py-2.5 bg-[#173C35] text-[#F5F1E8] text-sm font-semibold rounded-lg hover:bg-[#173C35]/90 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Continuar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

      {/* SECTION 5: SUMMARY OF 3 KEY IDEAS & NEW VOCABULARY */}
      {currentSection === 'SUMMARY' && (
        <div className="bg-white/90 border border-[#202622]/10 rounded-2xl p-6 md:p-8 space-y-6">
          <div>
            <span className="text-xs font-semibold tracking-wider text-[#B66A3C]">
              PASO 5 · RESUMEN Y VOCABULARIO NUEVO
            </span>
            <h2 className="mt-1 text-2xl font-display font-semibold text-[#202622]">
              Tres ideas esenciales para recordar
            </h2>
          </div>

          <MaestroRoshiTeachingCard
            title="Síntesis del Maestro Roshi"
            message={lesson.summary.keyIdeas.join(' · ')}
            subMessage={`Has incorporado ${lesson.summary.vocabulary.length} términos clave a tu colección del Dojo.`}
            subMessageLabel="Vocabulario dominado:"
            interactionKey={`summary-${lesson.id}`}
            dismissLabel="Entendido"
            testId="lesson-roshi-summary-card"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {lesson.summary.keyIdeas.map((idea, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#F5F1E8] border border-[#202622]/10 space-y-2"
              >
                <span className="font-mono text-xs font-bold text-[#173C35]">
                  IDEA 0{idx + 1}
                </span>
                <p className="text-sm text-[#202622]/90 leading-relaxed">{idea}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="text-base font-display font-semibold text-[#202622]">
              Términos incorporados a tu Colección
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {lesson.summary.vocabulary.map((v) => (
                <div
                  key={v.term}
                  className="p-4 rounded-xl bg-white border border-[#202622]/12 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-[#173C35]">{v.term}</span>
                    {v.japanese && (
                      <span className="text-xs text-[#202622]/60">{v.japanese}</span>
                    )}
                  </div>
                  <p className="text-xs text-[#202622]/80 leading-relaxed">{v.definition}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => goToSection(5)}
              className="px-5 py-2.5 bg-[#173C35] text-[#F5F1E8] text-sm font-semibold rounded-lg hover:bg-[#173C35]/90 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Ir a la pregunta de transferencia</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* SECTION 8: MASTERY EVALUATION & COMPLETION */}
      {currentSection === 'COMPLETE' && (
        <div className="bg-white/90 border border-[#202622]/10 rounded-2xl p-8 text-center max-w-3xl mx-auto space-y-6">
          <CelebrationGifOverlay
            open={showCompleteCelebrationOverlay}
            gifUrl={usesVideoRewardForLesson ? undefined : activeCelebrationGifUrl}
            videoUrl={usesVideoRewardForLesson ? resolvedLessonVideoUrl : undefined}
            congratsTitle={
              isGraduationLesson
                ? ROSHI_GRADUACION_TITLE
                : levelBoundary.isLastLessonOfLevel && !isAdvancedLesson
                ? `Completaste el ${levelBoundary.levelLabel} de la Academia`
                : '¡Clase Completada!'
            }
            subtitle={
              levelBoundary.isLastLessonOfLevel
                ? undefined
                : lesson.title
            }
            xpEarned={lesson.xpReward}
            totalJade={totalJade}
            accomplishmentText={
              isGraduationLesson
                ? ROSHI_GRADUACION_TITLE
                : levelBoundary.isLastLessonOfLevel && !isAdvancedLesson
                ? `Completaste el ${levelBoundary.levelLabel} de la Academia`
                : undefined
            }
            specialLevelDialogue={
              isGraduationLesson
                ? ROSHI_GRADUACION_DIALOGUE
                : levelBoundary.isLastLessonOfLevel && !isAdvancedLesson
                ? ROSHI_LEVEL_COMPLETE_DIALOGUE
                : undefined
            }
            onClose={() => {
              setShowCompleteCelebrationOverlay(false);
              onDismissCompleteCelebration?.();
            }}
            actionLabel={nextLesson ? `Siguiente: ${nextLesson.title}` : 'Continuar'}
            onAction={
              nextLesson && onSelectLesson
                ? () => {
                    setShowCompleteCelebrationOverlay(false);
                    onDismissCompleteCelebration?.();
                    onSelectLesson(nextLesson.id);
                  }
                : undefined
            }
            testId={
              levelBoundary.isLastLessonOfLevel
                ? 'level-complete-celebration-overlay'
                : 'lesson-complete-celebration-overlay'
            }
          />

          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-wider text-[#B66A3C]">
              {isGraduationLesson
                ? 'GRADUACIÓN DE LA ACADEMIA'
                : levelBoundary.isLastLessonOfLevel
                ? `${levelBoundary.levelLabel.toUpperCase()} DOMINADO`
                : 'LECCIÓN DOMINADA'}
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-[#202622]">
              {isGraduationLesson
                ? ROSHI_GRADUACION_TITLE
                : `¡Has completado «${lesson.title}»!`}
            </h2>
            {levelBoundary.isLastLessonOfLevel && (
              <p
                className="max-w-xl mx-auto text-sm italic text-[#173C35] bg-[#F5F1E8] border border-[#173C35]/20 rounded-xl px-4 py-3"
                data-testid="level-complete-special-quote-inline"
              >
                «{isGraduationLesson ? ROSHI_GRADUACION_DIALOGUE : ROSHI_LEVEL_COMPLETE_DIALOGUE}»
              </p>
            )}
          </div>

          <div className="inline-flex flex-wrap items-center justify-center gap-6 px-6 py-3 rounded-xl bg-[#F5F1E8] border border-[#202622]/10 text-sm">
            <div>
              <div className="text-xs text-[#202622]/65">XP obtenido</div>
              <div className="font-mono font-bold text-[#B66A3C] text-lg">+{lesson.xpReward} XP</div>
            </div>
            <div className="h-8 w-px bg-[#202622]/15" />
            <div>
              <div className="text-xs text-[#202622]/65">Jade acumulado</div>
              <div className="font-mono font-bold text-[#059669] text-lg inline-flex items-center gap-1">
                <Gem className="w-4 h-4 text-[#059669]" />
                <span>{totalJade} Jade (+1)</span>
              </div>
            </div>
            <div className="h-8 w-px bg-[#202622]/15" />
            <div>
              <div className="text-xs text-[#202622]/65">Estado</div>
              <div className="font-semibold text-[#173C35]">Dominado ✓</div>
            </div>
          </div>

          {/* Associated Puzzles for this Lesson */}
          {relatedPuzzles.length > 0 && (
            <div className="pt-3 border-t border-[#E6E1D6] text-left space-y-2.5">
              <div className="text-xs font-semibold text-[#A86036] uppercase tracking-wider">
                Puzzles asociados para practicar esta lección ({relatedPuzzles.length})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {relatedPuzzles.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onOpenPuzzle?.(p.id)}
                    className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E2DDD2] hover:border-[#133F32] text-left flex items-center justify-between gap-2 transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-semibold text-[#133F32]">
                        #{p.number}. {p.title}
                      </div>
                      <div className="text-[11px] text-[#1C2823]/70">{p.themeLabel}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#133F32] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => goToSection(0)}
              className="px-4 py-2.5 rounded-full border border-[#202622]/20 text-xs font-semibold text-[#202622] hover:bg-[#F5F1E8] cursor-pointer"
            >
              Repetir lección
            </button>
            <button
              type="button"
              onClick={onExit}
              className="px-4 py-2.5 rounded-full border border-[#133F32]/30 text-xs font-semibold text-[#133F32] hover:bg-[#EFF6F3] cursor-pointer"
            >
              Volver a la Academia
            </button>
            {nextLesson && onSelectLesson && (
              <button
                type="button"
                onClick={() => onSelectLesson(nextLesson.id)}
                className="px-5 py-2.5 rounded-full bg-[#133F32] text-white text-sm font-semibold hover:bg-[#0F3328] inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Siguiente lección: {nextLesson.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

