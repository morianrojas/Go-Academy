import React, { useEffect, useMemo, useState } from 'react';
import {
  Compass,
  Eye,
  HelpCircle,
  Lightbulb,
  RotateCcw,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Filter,
  SlidersHorizontal,
} from 'lucide-react';
import {
  BoardVisualLayers,
  Coord,
  PuzzleAttemptRecord,
  PuzzleContent,
  PuzzleTheme,
} from '../types/go';
import {
  coordsEqual,
  coordToLabel,
  createGameState,
  getAllGroups,
  undoLastMove,
  validateAndPlayMove,
} from '../engine/goEngine';
import { GoBoard } from './GoBoard';
import { playStoneSound, playSuccessChime } from '../utils/sound';
import { DOJO_CATEGORIES_PLAN } from '../content/academyArchitecturePlan';
import { LESSONS_CATALOG } from '../content/curriculumData';
import { generateInfinitePuzzle } from '../engine/infinitePuzzleGenerator';
import {
  CelebrationGifOverlay,
  centerActiveGoBoardInView,
  MaestroRoshiTeachingCard,
  notifySpecialRewardPriority,
} from './MaestroRoshiTeachingCard';
import {
  advanceGlobalCelebrationGif,
  PUZZLE_CELEBRATION_MILESTONE_COUNT,
} from '../utils/roshiSpriteScheduler';

export interface PuzzleArenaProps {
  puzzles: PuzzleContent[];
  initialPuzzleId?: string | null;
  puzzleRecords: Record<string, PuzzleAttemptRecord>;
  visualLayers: BoardVisualLayers;
  soundEnabled: boolean;
  onToggleLayer: (layer: keyof BoardVisualLayers) => void;
  onRecordAttempt: (params: {
    puzzleId: string;
    theme: PuzzleTheme;
    solved: boolean;
    hintsUsed: number;
    isInfinite?: boolean;
  }) => { xpAwarded: number; specialRewardTriggered?: boolean };
  onOpenLesson?: (lessonId: string) => void;
  totalJade?: number;
  autoAdvanceToken?: number;
}

const THEME_FILTER_OPTIONS: { id: PuzzleTheme | 'ALL' | 'REVIEW'; label: string }[] = [
  { id: 'ALL', label: 'Todas las categorías' },
  { id: 'REVIEW', label: 'Pendientes de repaso' },
  { id: 'CAPTURA_SIMPLE', label: 'Captura simple' },
  { id: 'SALVAR_PIEDRA', label: 'Salvar piedra' },
  { id: 'LIBERTADES', label: 'Libertades y Atari' },
  { id: 'CONECTAR_Y_CORTAR', label: 'Conectar y cortar' },
  { id: 'EVITAR_SUICIDIO', label: 'Evitar suicidio' },
  { id: 'KO_BASICO', label: 'Regla de Ko' },
  { id: 'ESCALERAS', label: 'Escaleras (Shicho)' },
  { id: 'REDES', label: 'Redes (Geta)' },
  { id: 'SNAPBACK', label: 'Snapback' },
  { id: 'TESUJI', label: 'Tesuji' },
  { id: 'VIDA_Y_MUERTE', label: 'Vida y muerte' },
  { id: 'FORMA_Y_ATAQUE', label: 'Forma y Ataque' },
  { id: 'INVASION_Y_YOSE', label: 'Invasión y Yose' },
];

export const PuzzleArena: React.FC<PuzzleArenaProps> = ({
  puzzles,
  initialPuzzleId,
  puzzleRecords,
  visualLayers,
  soundEnabled,
  onToggleLayer,
  onRecordAttempt,
  onOpenLesson,
  totalJade = 2,
  autoAdvanceToken = 0,
}) => {
  const [selectedTheme, setSelectedTheme] = useState<PuzzleTheme | 'ALL' | 'REVIEW'>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    'ALL' | 'PRINCIPIANTE' | 'FACIL' | 'INTERMEDIO' | 'AVANZADO'
  >('ALL');
  const [practiceMode, setPracticeMode] = useState<
    'LIBRE' | 'INFINITO' | 'RACHA' | 'SERIE_DIARIA'
  >('LIBRE');
  const [infiniteSeq, setInfiniteSeq] = useState<number>(1);
  const [infiniteSolvedSession, setInfiniteSolvedSession] = useState<number>(0);
  const [streakRun, setStreakRun] = useState<number>(0);
  const [bestStreakRun, setBestStreakRun] = useState<number>(0);
  const [sessionSolvedPuzzlesCount, setSessionSolvedPuzzlesCount] = useState<number>(0);
  const [puzzleCelebrationOverlay, setPuzzleCelebrationOverlay] = useState<{
    open: boolean;
    gifUrl: string;
    solvedCount: number;
    xpEarned: number;
  } | null>(null);

  // Collapsible filter panels (hidden by default to prevent visual saturation)
  const [showCategoriesPanel, setShowCategoriesPanel] = useState<boolean>(false);
  const [showModesPanel, setShowModesPanel] = useState<boolean>(false);
  const [showDojoRoadmap, setShowDojoRoadmap] = useState<boolean>(false);

  const [activePuzzleId, setActivePuzzleId] = useState<string>(
    initialPuzzleId || puzzles[0]?.id || 'puzzle-1-captura-centro'
  );

  useEffect(() => {
    if (initialPuzzleId) {
      setPracticeMode('LIBRE');
      setActivePuzzleId(initialPuzzleId);
    }
  }, [initialPuzzleId]);

  const filteredPuzzles = useMemo(() => {
    return puzzles.filter((p) => {
      const themeMatch =
        selectedTheme === 'ALL'
          ? true
          : selectedTheme === 'REVIEW'
          ? Boolean(puzzleRecords[p.id]?.needsReview)
          : p.theme === selectedTheme;
      const diffMatch = selectedDifficulty === 'ALL' ? true : p.difficulty === selectedDifficulty;
      return themeMatch && diffMatch;
    });
  }, [puzzles, selectedTheme, selectedDifficulty, puzzleRecords]);

  const activePuzzle = useMemo(() => {
    if (practiceMode === 'INFINITO') {
      return generateInfinitePuzzle({
        sequenceNumber: infiniteSeq,
        difficultyFilter: selectedDifficulty,
        themeFilter: selectedTheme === 'REVIEW' ? 'ALL' : selectedTheme,
        catalog: puzzles,
      });
    }
    return puzzles.find((p) => p.id === activePuzzleId) ?? puzzles[0];
  }, [practiceMode, infiniteSeq, selectedDifficulty, selectedTheme, puzzles, activePuzzleId]);

  const relatedLesson = useMemo(() => {
    if (!activePuzzle.relatedLessonId) return null;
    return LESSONS_CATALOG.find((l) => l.id === activePuzzle.relatedLessonId) ?? null;
  }, [activePuzzle.relatedLessonId]);

  const [gameState, setGameState] = useState(() =>
    createGameState({
      size: activePuzzle.boardSize,
      initialStones: activePuzzle.initialStones,
      startingTurn: activePuzzle.turn,
    })
  );

  const [status, setStatus] = useState<
    'SOLVING' | 'AWAITING_NEXT_MOVE' | 'SOLVED' | 'WRONG' | 'SOLUTION_SHOWN'
  >('SOLVING');
  const [pendingNextMoves, setPendingNextMoves] = useState<Coord[] | null>(null);
  const [pendingWinExplanation, setPendingWinExplanation] = useState<string>('');
  const [feedbackEs, setFeedbackEs] = useState<string>('');
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [explorationMode, setExplorationMode] = useState<boolean>(false);
  const [lastXpEarned, setLastXpEarned] = useState<number | null>(null);
  const [recentMistakes, setRecentMistakes] = useState<string[]>([]);
  const [wrongMoveCoord, setWrongMoveCoord] = useState<Coord | null>(null);
  const [puzzleInteractionSeq, setPuzzleInteractionSeq] = useState<number>(1);
  const [lastPuzzleActionWasBoardClick, setLastPuzzleActionWasBoardClick] = useState<boolean>(false);
  const isInitialPuzzleMountRef = React.useRef<boolean>(true);

  // Reset state whenever activePuzzle changes
  useEffect(() => {
    setGameState(
      createGameState({
        size: activePuzzle.boardSize,
        initialStones: activePuzzle.initialStones,
        startingTurn: activePuzzle.turn,
      })
    );
    setStatus('SOLVING');
    setPendingNextMoves(null);
    setPendingWinExplanation('');
    setFeedbackEs('');
    setHintsUsed(0);
    setExplorationMode(false);
    setLastXpEarned(null);
    setWrongMoveCoord(null);
    setLastPuzzleActionWasBoardClick(false);
    if (isInitialPuzzleMountRef.current) {
      isInitialPuzzleMountRef.current = false;
    } else {
      setPuzzleInteractionSeq((c) => c + 1);
      centerActiveGoBoardInView();
    }
  }, [activePuzzle]);

  const handleResetPuzzle = () => {
    setGameState(
      createGameState({
        size: activePuzzle.boardSize,
        initialStones: activePuzzle.initialStones,
        startingTurn: activePuzzle.turn,
      })
    );
    setStatus('SOLVING');
    setPendingNextMoves(null);
    setPendingWinExplanation('');
    setFeedbackEs('');
    setLastXpEarned(null);
    setWrongMoveCoord(null);
    setLastPuzzleActionWasBoardClick(false);
    setPuzzleInteractionSeq((c) => c + 1);
  };

  const handleBoardClick = (coord: Coord) => {
    setLastPuzzleActionWasBoardClick(true);
    setPuzzleInteractionSeq((c) => c + 1);
    const label = coordToLabel(coord, activePuzzle.boardSize);

    if (explorationMode) {
      const res = validateAndPlayMove(gameState, coord);
      if (!res.legal || !res.nextState) {
        setFeedbackEs(`Exploración: ${res.messageEs}`);
        return;
      }
      playStoneSound(soundEnabled, (res.capturedStones?.length ?? 0) > 0);
      setGameState(res.nextState);
      const groupsAfter = getAllGroups(res.nextState.board);
      const atariCount = groupsAfter.filter((g) => g.inAtari).length;
      setFeedbackEs(
        `Exploración libre: ${res.messageEs} (${
          atariCount > 0 ? `${atariCount} grupo(s) en atari` : 'Sin grupos en atari'
        }).`
      );
      return;
    }

    if (status === 'SOLVED') return;

    if (status === 'AWAITING_NEXT_MOVE' && pendingNextMoves && pendingNextMoves.length > 0) {
      const isSecondMoveValid = pendingNextMoves.some((m) => coordsEqual(m, coord));
      const secondRes = validateAndPlayMove(gameState, coord);

      if (isSecondMoveValid && secondRes.legal && secondRes.nextState) {
        playSuccessChime(soundEnabled);
        setWrongMoveCoord(null);
        setGameState(secondRes.nextState);
        setStatus('SOLVED');
        setPendingNextMoves(null);
        setFeedbackEs(pendingWinExplanation || activePuzzle.solutionExplanation);
        setStreakRun((s) => {
          const next = s + 1;
          setBestStreakRun((b) => Math.max(b, next));
          return next;
        });

        const { xpAwarded, specialRewardTriggered } = onRecordAttempt({
          puzzleId: activePuzzle.id,
          theme: activePuzzle.theme,
          solved: true,
          hintsUsed,
          isInfinite: practiceMode === 'INFINITO',
        });
        if (practiceMode === 'INFINITO') {
          setInfiniteSolvedSession((c) => c + 1);
        }
        setLastXpEarned(xpAwarded);
        const nextSolvedCount = sessionSolvedPuzzlesCount + 1;
        setSessionSolvedPuzzlesCount(nextSolvedCount);
        if (
          nextSolvedCount % PUZZLE_CELEBRATION_MILESTONE_COUNT === 0 &&
          !specialRewardTriggered
        ) {
          notifySpecialRewardPriority();
          setPuzzleCelebrationOverlay({
            open: true,
            gifUrl: advanceGlobalCelebrationGif(),
            solvedCount: nextSolvedCount,
            xpEarned: xpAwarded > 0 ? xpAwarded : activePuzzle.xpBase,
          });
        }
        centerActiveGoBoardInView();
      } else {
        playStoneSound(soundEnabled, false);
        setWrongMoveCoord(coord);
        setStreakRun(0);
        setFeedbackEs(
          `Esa segunda jugada (${label}) no completa la secuencia táctica. Observa la respuesta del rival y juega el punto clave de continuación.`
        );
      }
      return;
    }

    const baseState = createGameState({
      size: activePuzzle.boardSize,
      initialStones: activePuzzle.initialStones,
      startingTurn: activePuzzle.turn,
    });

    const isAcceptedSolution = activePuzzle.acceptedFirstMoves.some((m) => coordsEqual(m, coord));
    const moveRes = validateAndPlayMove(baseState, coord);

    if (!moveRes.legal) {
      setStatus('WRONG');
      setWrongMoveCoord(coord);
      setStreakRun(0);
      const specificNote = activePuzzle.wrongMoveExplanations[`${coord.x},${coord.y}`];
      const msg = specificNote ? `${specificNote} (${moveRes.messageEs})` : moveRes.messageEs;
      setFeedbackEs(msg);
      setRecentMistakes((prev) => [`Intento ilegal en ${label}: ${moveRes.reason}`, ...prev.slice(0, 3)]);
      onRecordAttempt({
        puzzleId: activePuzzle.id,
        theme: activePuzzle.theme,
        solved: false,
        hintsUsed,
        isInfinite: practiceMode === 'INFINITO',
      });
      return;
    }

    if (isAcceptedSolution && moveRes.nextState) {
      let finalState = moveRes.nextState;
      const matchedVar = activePuzzle.variations.find((v) => coordsEqual(v.playerMove, coord));
      if (matchedVar?.opponentReply) {
        const replyRes = validateAndPlayMove(finalState, matchedVar.opponentReply);
        if (replyRes.legal && replyRes.nextState) {
          finalState = replyRes.nextState;
        }
        if (matchedVar.nextValidMoves && matchedVar.nextValidMoves.length > 0) {
          playStoneSound(soundEnabled, (replyRes.capturedStones?.length ?? 0) > 0);
          setWrongMoveCoord(null);
          setGameState(finalState);
          setStatus('AWAITING_NEXT_MOVE');
          setPendingNextMoves(matchedVar.nextValidMoves);
          setPendingWinExplanation(matchedVar.explanationEs || activePuzzle.solutionExplanation);
          const replyLabel = coordToLabel(matchedVar.opponentReply, activePuzzle.boardSize);
          setFeedbackEs(
            `¡Primera jugada correcta (${label})! El rival responde en ${replyLabel}. Ahora coloca tu siguiente piedra en el tablero para completar la secuencia.`
          );
          return;
        }
      }

      playSuccessChime(soundEnabled);
      setWrongMoveCoord(null);
      setGameState(finalState);
      setStatus('SOLVED');
      setFeedbackEs(matchedVar?.explanationEs || activePuzzle.solutionExplanation);
      setStreakRun((s) => {
        const next = s + 1;
        setBestStreakRun((b) => Math.max(b, next));
        return next;
      });

      const { xpAwarded, specialRewardTriggered } = onRecordAttempt({
        puzzleId: activePuzzle.id,
        theme: activePuzzle.theme,
        solved: true,
        hintsUsed,
        isInfinite: practiceMode === 'INFINITO',
      });
      if (practiceMode === 'INFINITO') {
        setInfiniteSolvedSession((c) => c + 1);
      }
      setLastXpEarned(xpAwarded);
      const nextSolvedCount = sessionSolvedPuzzlesCount + 1;
      setSessionSolvedPuzzlesCount(nextSolvedCount);
      if (
        nextSolvedCount % PUZZLE_CELEBRATION_MILESTONE_COUNT === 0 &&
        !specialRewardTriggered
      ) {
        notifySpecialRewardPriority();
        setPuzzleCelebrationOverlay({
          open: true,
          gifUrl: advanceGlobalCelebrationGif(),
          solvedCount: nextSolvedCount,
          xpEarned: xpAwarded > 0 ? xpAwarded : activePuzzle.xpBase,
        });
      }
    } else {
      playStoneSound(soundEnabled, false);
      if (moveRes.legal && moveRes.nextState) {
        setGameState(moveRes.nextState);
      } else {
        setGameState(baseState);
      }
      setWrongMoveCoord(coord);
      setStatus('WRONG');
      setStreakRun(0);
      const specificWrong = activePuzzle.wrongMoveExplanations[`${coord.x},${coord.y}`];
      const explanation =
        specificWrong || `${activePuzzle.defaultWrongExplanation} (Intentaste ${label}).`;
      setFeedbackEs(explanation);
      setRecentMistakes((prev) => [
        `Error en puzzle "${activePuzzle.title}" al jugar ${label}`,
        ...prev.slice(0, 3),
      ]);
      onRecordAttempt({
        puzzleId: activePuzzle.id,
        theme: activePuzzle.theme,
        solved: false,
        hintsUsed,
        isInfinite: practiceMode === 'INFINITO',
      });
    }
  };

  const handleRequestHint = () => {
    setLastPuzzleActionWasBoardClick(false);
    setHintsUsed((h) => Math.min(3, h + 1));
    setPuzzleInteractionSeq((c) => c + 1);
  };

  const handleRevealSolution = () => {
    setLastPuzzleActionWasBoardClick(false);
    const firstSol = activePuzzle.acceptedFirstMoves[0];
    const baseState = createGameState({
      size: activePuzzle.boardSize,
      initialStones: activePuzzle.initialStones,
      startingTurn: activePuzzle.turn,
    });
    const res = validateAndPlayMove(baseState, firstSol);
    if (res.legal && res.nextState) {
      setGameState(res.nextState);
    }
    setHintsUsed(3);
    setStatus('SOLUTION_SHOWN');
    setFeedbackEs(
      `Solución explicada (${coordToLabel(firstSol, activePuzzle.boardSize)}): ${
        activePuzzle.solutionExplanation
      }`
    );
    setPuzzleInteractionSeq((c) => c + 1);
    centerActiveGoBoardInView();
  };

  const handleNextPuzzle = () => {
    setLastPuzzleActionWasBoardClick(false);
    setStatus('SOLVING');
    setWrongMoveCoord(null);
    setFeedbackEs('');
    setLastXpEarned(null);
    setPuzzleInteractionSeq((c) => c + 1);
    if (practiceMode === 'INFINITO') {
      setInfiniteSeq((s) => s + 1);
      return;
    }
    const idx = puzzles.findIndex((p) => p.id === activePuzzle.id);
    const next = puzzles[(idx + 1) % puzzles.length];
    if (next) {
      setActivePuzzleId(next.id);
    }
  };

  const prevAutoAdvanceTokenRef = React.useRef<number>(autoAdvanceToken);
  useEffect(() => {
    if (autoAdvanceToken > prevAutoAdvanceTokenRef.current) {
      prevAutoAdvanceTokenRef.current = autoAdvanceToken;
      if (status === 'SOLVED' || status === 'SOLUTION_SHOWN') {
        handleNextPuzzle();
      }
    }
  }, [autoAdvanceToken, status]);

  const solvedCount = Object.values(puzzleRecords).filter((r) => r.solved).length;
  const reviewCount = Object.values(puzzleRecords).filter((r) => r.needsReview).length;

  const handlePickRandomPuzzle = () => {
    const pool = filteredPuzzles.length > 0 ? filteredPuzzles : puzzles;
    const candidates = pool.filter((p) => p.id !== activePuzzle.id);
    const chosen =
      candidates.length > 0
        ? candidates[Math.floor(Math.random() * candidates.length)]
        : pool[0];
    if (chosen) setActivePuzzleId(chosen.id);
  };

  const activeThemeLabel =
    THEME_FILTER_OPTIONS.find((t) => t.id === selectedTheme)?.label ?? 'Todas las categorías';

  const displayedSelectorPuzzles =
    practiceMode === 'SERIE_DIARIA'
      ? puzzles.filter((p) =>
          ['puzzle-1-captura-centro', 'puzzle-14-snapback', 'puzzle-18-matar-punto-vital'].includes(
            p.id
          )
        )
      : filteredPuzzles.length > 0
      ? filteredPuzzles
      : puzzles;

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      {puzzleCelebrationOverlay && (
        <CelebrationGifOverlay
          open={puzzleCelebrationOverlay.open}
          gifUrl={puzzleCelebrationOverlay.gifUrl}
          congratsTitle={`¡${puzzleCelebrationOverlay.solvedCount} Puzzles Dominados!`}
          subtitle={activePuzzle.title}
          xpEarned={puzzleCelebrationOverlay.xpEarned}
          totalJade={totalJade}
          onClose={() => {
            setPuzzleCelebrationOverlay(null);
            handleNextPuzzle();
          }}
          actionLabel="Siguiente puzzle"
          onAction={() => {
            setPuzzleCelebrationOverlay(null);
            handleNextPuzzle();
          }}
          testId="puzzle-milestone-celebration-overlay"
        />
      )}

      {/* Clean Header Bar with Show/Hide Toggle Buttons for Filters */}
      <div className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-5 space-y-4 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1
              className="text-xl md:text-2xl font-display font-bold text-[var(--app-text)]"
              data-testid="puzzle-dojo-title"
            >
              Dojo de Puzzles
            </h1>
            <span className="text-xs font-mono text-[var(--app-muted)]">
              {solvedCount}/{puzzles.length} resueltos
            </span>
            {reviewCount > 0 && (
              <span className="text-xs font-mono text-[#A86036]">
                · {reviewCount} por repasar
              </span>
            )}
          </div>

          {/* Toggle Buttons to Show/Hide Multiple Filter Options */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setShowCategoriesPanel((v) => !v)}
              aria-expanded={showCategoriesPanel}
              data-testid="toggle-puzzle-categories-btn"
              className={`px-3 py-1.5 rounded-xl border transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                showCategoriesPanel || selectedTheme !== 'ALL'
                  ? 'bg-[var(--app-primary)] text-white border-[var(--app-primary)]'
                  : 'bg-[var(--app-subtle)] text-[var(--app-text)] border-[var(--app-border)] hover:border-[var(--app-primary)]'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>
                Categorías{selectedTheme !== 'ALL' ? `: ${activeThemeLabel}` : ''}
              </span>
              {showCategoriesPanel ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowModesPanel((v) => !v)}
              aria-expanded={showModesPanel}
              data-testid="toggle-puzzle-modes-btn"
              className={`px-3 py-1.5 rounded-xl border transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                showModesPanel || practiceMode !== 'LIBRE' || selectedDifficulty !== 'ALL'
                  ? 'bg-[var(--app-primary)] text-white border-[var(--app-primary)]'
                  : 'bg-[var(--app-subtle)] text-[var(--app-text)] border-[var(--app-border)] hover:border-[var(--app-primary)]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Modos y Dificultad</span>
              {showModesPanel ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Panel 1: Categories of the Dojo */}
        {showCategoriesPanel && (
          <div
            className="pt-3 border-t border-[var(--app-border)] space-y-3"
            data-testid="puzzle-categories-panel"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[var(--app-muted)]">
                Selecciona una categoría táctica:
              </span>
              <button
                type="button"
                onClick={() => setShowDojoRoadmap((v) => !v)}
                className="text-xs font-semibold text-[var(--app-primary)] hover:underline cursor-pointer"
              >
                {showDojoRoadmap ? 'Ocultar detalle de 17 categorías' : 'Ver detalle de 17 categorías'}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {THEME_FILTER_OPTIONS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setSelectedTheme(tab.id);
                    const matching = puzzles.filter((p) => {
                      if (tab.id === 'ALL') return true;
                      if (tab.id === 'REVIEW') return Boolean(puzzleRecords[p.id]?.needsReview);
                      return p.theme === tab.id;
                    });
                    if (matching.length > 0 && !matching.some((m) => m.id === activePuzzleId)) {
                      setActivePuzzleId(matching[0].id);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer border ${
                    selectedTheme === tab.id
                      ? 'bg-[var(--app-primary)] text-white border-[var(--app-primary)]'
                      : 'bg-[var(--app-subtle)] text-[var(--app-text)] border-[var(--app-border)] hover:border-[var(--app-primary)]'
                  }`}
                >
                  {tab.id === 'ALL'
                    ? `Todas (${puzzles.length})`
                    : tab.id === 'REVIEW'
                    ? `Repaso (${reviewCount})`
                    : tab.label}
                </button>
              ))}
            </div>

            {showDojoRoadmap && (
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {DOJO_CATEGORIES_PLAN.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      if (cat.mappedTheme) {
                        const themeId = cat.mappedTheme as PuzzleTheme;
                        setSelectedTheme(themeId);
                        const firstMatch = puzzles.find((p) => p.theme === themeId);
                        if (firstMatch) setActivePuzzleId(firstMatch.id);
                      }
                    }}
                    className="text-left p-2.5 rounded-xl bg-[var(--app-subtle)] border border-[var(--app-border)] hover:border-[var(--app-primary)] text-xs transition-colors cursor-pointer"
                  >
                    <div className="font-semibold text-[var(--app-text)]">{cat.label}</div>
                    <p className="text-[11px] text-[var(--app-muted)] line-clamp-1">
                      {cat.description}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Collapsible Panel 2: Practice Modes & Difficulty */}
        {showModesPanel && (
          <div
            className="pt-3 border-t border-[var(--app-border)] flex flex-wrap items-center justify-between gap-3"
            data-testid="puzzle-modes-panel"
          >
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-[var(--app-muted)] mr-1">Modo:</span>
              {(
                [
                  { id: 'LIBRE', label: 'Catálogo' },
                  { id: 'INFINITO', label: 'Modo Infinito ∞' },
                ] as const
              ).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setPracticeMode(m.id);
                    if (m.id === 'INFINITO') {
                      setInfiniteSeq((s) => s + 1);
                    }
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                    practiceMode === m.id
                      ? 'bg-[var(--app-primary)] text-white border-[var(--app-primary)]'
                      : 'bg-[var(--app-subtle)] text-[var(--app-text)] border-[var(--app-border)]'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-[var(--app-muted)] mr-1">Dificultad:</span>
              {(
                [
                  { id: 'ALL', label: 'Todas' },
                  { id: 'PRINCIPIANTE', label: 'Principiante' },
                  { id: 'FACIL', label: 'Fácil' },
                  { id: 'INTERMEDIO', label: 'Intermedio' },
                  { id: 'AVANZADO', label: 'Avanzado' },
                ] as const
              ).map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedDifficulty(d.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
                    selectedDifficulty === d.id
                      ? 'bg-[var(--app-primary)] text-white border-[var(--app-primary)]'
                      : 'bg-[var(--app-subtle)] text-[var(--app-text)] border-[var(--app-border)]'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Puzzle Selector Strip: ONLY shows #number by default; reveals full title ONLY on the clicked/selected puzzle */}
        <div
          className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1"
          data-testid="puzzle-number-selector-strip"
        >
          {displayedSelectorPuzzles.map((p) => {
            const rec = puzzleRecords[p.id];
            const isCurrent = p.id === activePuzzle.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePuzzleId(p.id)}
                data-testid={`puzzle-selector-btn-${p.number}`}
                aria-label={isCurrent ? `Puzzle #${p.number}: ${p.title}` : `Puzzle #${p.number}`}
                title={`#${p.number} · ${p.title}`}
                className={`px-2.5 py-1.5 rounded-xl border text-left transition-all shrink-0 cursor-pointer ${
                  isCurrent
                    ? 'bg-[var(--app-primary)] text-white border-[var(--app-primary)] shadow-2xs'
                    : rec?.solved
                    ? 'bg-[#EAF7F0] text-[#0F3D29] border-[#55B685]'
                    : rec?.needsReview
                    ? 'bg-[#FDF2F2] text-[#6E1E1E] border-[#E08787]'
                    : 'bg-[var(--app-subtle)] text-[var(--app-text)] border-[var(--app-border)] hover:border-[var(--app-primary)]'
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold whitespace-nowrap">
                  <span>#{p.number}</span>
                  {isCurrent && <span className="font-sans font-bold">· {p.title}</span>}
                  {rec?.solved && <span>✓</span>}
                  {!rec?.solved && rec?.needsReview && <span>!</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Responsive Puzzle Workspace:
          Mobile (< lg): 1. Puzzle Title + Maestro Roshi Spotlight/Pill -> 2. GoBoard -> 3. Controls & Hints
          Desktop (lg): Left Column = GoBoard (rows 1-2), Right Column = Title/Roshi (row 1) + Controls (row 2)
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Child 1: Puzzle Title & Maestro Roshi Dynamic Teaching/Feedback */}
        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1 bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-5 space-y-4 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--app-muted)]">
            <span>
              Problema #{activePuzzle.number} · {activePuzzle.themeLabel} · {activePuzzle.difficulty}
            </span>
            <button
              type="button"
              onClick={() => {
                setExplorationMode((v) => !v);
                setFeedbackEs('');
                setPuzzleInteractionSeq((c) => c + 1);
              }}
              aria-pressed={explorationMode}
              className={`px-2.5 py-1 rounded-lg font-medium border transition-colors cursor-pointer ${
                explorationMode
                  ? 'bg-[#A86036] text-white border-[#A86036]'
                  : 'bg-[var(--app-subtle)] text-[var(--app-text)] border-[var(--app-border)]'
              }`}
            >
              <span className="inline-flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" />
                {explorationMode ? 'Salir de Exploración' : 'Modo Exploración'}
              </span>
            </button>
          </div>

          <div>
            <h2
              className="text-xl md:text-2xl font-display font-bold text-[var(--app-text)]"
              data-testid="active-puzzle-title"
            >
              #{activePuzzle.number}. {activePuzzle.title}
            </h2>
          </div>

          {/* Maestro Roshi Dynamic Instruction / Feedback / Hint Box */}
          <div
            role="status"
            data-testid={feedbackEs ? 'puzzle-feedback-box' : 'puzzle-roshi-objective-box'}
          >
            <MaestroRoshiTeachingCard
              title={
                status === 'SOLVED'
                  ? `Puzzle #${activePuzzle.number} resuelto!`
                  : status === 'WRONG' || wrongMoveCoord !== null
                  ? 'Jugada incorrecta'
                  : status === 'AWAITING_NEXT_MOVE'
                  ? '¡Primera jugada correcta!'
                  : feedbackEs
                  ? `Puzzle #${activePuzzle.number}`
                  : `Puzzle #${activePuzzle.number}: ${activePuzzle.title}`
              }
              message={feedbackEs || activePuzzle.objective}
              subMessage={
                hintsUsed > 0
                  ? activePuzzle.hints.slice(0, hintsUsed).join(' · ')
                  : undefined
              }
              subMessageLabel={
                hintsUsed > 0 ? `Pistas desbloqueadas (${hintsUsed}/3):` : undefined
              }
              tone={
                status === 'SOLVED' || (status === 'AWAITING_NEXT_MOVE' && wrongMoveCoord === null)
                  ? 'SUCCESS'
                  : status === 'WRONG' || wrongMoveCoord !== null
                  ? 'WARNING'
                  : 'DEFAULT'
              }
              animationCategory={
                !explorationMode &&
                lastPuzzleActionWasBoardClick &&
                (status === 'SOLVED' ||
                  (status === 'AWAITING_NEXT_MOVE' && wrongMoveCoord === null))
                  ? 'SURPRISE'
                  : !explorationMode &&
                    lastPuzzleActionWasBoardClick &&
                    (status === 'WRONG' || wrongMoveCoord !== null)
                  ? 'MISTAKE'
                  : 'CONVERSATION'
              }
              interactionKey={`puz-${activePuzzle.id}-seq-${puzzleInteractionSeq}`}
              autoOpenSpotlight={!puzzleCelebrationOverlay?.open}
              deferInitialSpotlightUntilScroll={true}
              spotlightDelayMs={lastPuzzleActionWasBoardClick ? 650 : 0}
              alwaysCenterBoardOnDismiss={true}
              prioritizeActionOnRight={status === 'SOLVED' || status === 'SOLUTION_SHOWN'}
              dismissLabel="Entendido"
              testId="puzzle-roshi-card"
            >
              {(status === 'SOLVED' || status === 'SOLUTION_SHOWN') && (
                <button
                  type="button"
                  onClick={handleNextPuzzle}
                  className="px-4 py-2.5 rounded-xl bg-[var(--app-primary)] text-white text-xs sm:text-sm font-bold hover:bg-[var(--app-primary-hover)] inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
                >
                  <span>Siguiente puzzle</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </MaestroRoshiTeachingCard>
          </div>
        </div>

        {/* Child 2: Interactive GoBoard (Immediately below Puzzle Title on Mobile; Left Column on Desktop) */}
        <div
          className="lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:row-span-2 bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-4 sm:p-5 flex flex-col items-center"
          data-testid="puzzle-board-panel"
        >
          <div className="w-full max-w-[490px] flex items-center justify-between mb-2.5 text-xs">
            <span className="font-medium text-[var(--app-text)]">
              Turno: <strong>{gameState.currentTurn === 'BLACK' ? 'Negro ●' : 'Blanco ○'}</strong>
            </span>
            <span className="text-[var(--app-muted)] font-mono">
              {explorationMode
                ? 'Modo Exploración'
                : `+${hintsUsed === 0 ? activePuzzle.xpNoHints : activePuzzle.xpBase} XP · +1 Jade`}
            </span>
          </div>

          <GoBoard
            size={activePuzzle.boardSize}
            board={gameState.board}
            currentTurn={gameState.currentTurn}
            lastMove={gameState.lastMove?.coord}
            koPoint={gameState.koPoint}
            markers={
              wrongMoveCoord
                ? [
                    ...(activePuzzle.markers ?? []),
                    { x: wrongMoveCoord.x, y: wrongMoveCoord.y, type: 'DANGER', label: '×' },
                  ]
                : activePuzzle.markers
            }
            visualLayers={visualLayers}
            onToggleLayer={onToggleLayer}
            onSelectIntersection={handleBoardClick}
            interactive={true}
          />
        </div>

        {/* Child 3: Hint/Reset/Solution Controls & Maestro IA Footer */}
        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-2 bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-5 space-y-3.5 shadow-2xs">
          {/* Renglón 1: Izquierda = Pedir pista, Derecha = Reiniciar */}
          <div
            className="flex flex-wrap items-center justify-between gap-2.5"
            data-testid="puzzle-controls-row-1"
          >
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled={hintsUsed >= 3 || status === 'SOLVED'}
                onClick={handleRequestHint}
                className="px-3.5 py-2 rounded-xl bg-[#FDF3EB] border border-[#DFBC9F] text-[#A86036] hover:bg-[#F9E7D8] text-xs font-semibold disabled:opacity-40 flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Pedir pista ({hintsUsed}/3)</span>
              </button>

              {hintsUsed >= 2 && status !== 'SOLVED' && (
                <button
                  type="button"
                  onClick={handleRevealSolution}
                  className="px-3.5 py-2 rounded-xl border border-[var(--app-border)] text-xs font-medium text-[var(--app-text)] hover:bg-[var(--app-subtle)] flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Ver solución</span>
                </button>
              )}

              {explorationMode && gameState.undoStack.length > 0 && (
                <button
                  type="button"
                  onClick={() => setGameState((s) => undoLastMove(s))}
                  className="px-3 py-2 rounded-xl border border-[var(--app-border)] text-xs font-medium text-[var(--app-text)] hover:bg-[var(--app-subtle)] cursor-pointer whitespace-nowrap shrink-0"
                >
                  Deshacer
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleResetPuzzle}
              className="ml-auto px-3.5 py-2 rounded-xl border border-[var(--app-border)] text-xs font-medium text-[var(--app-text)] hover:bg-[var(--app-subtle)] flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar</span>
            </button>
          </div>

          {/* Renglón 2: Izquierda = Ver lección asociada, Derecha = Siguiente puzzle */}
          <div
            className="pt-3 border-t border-[var(--app-border)] flex flex-wrap items-center justify-between gap-2.5"
            data-testid="puzzle-controls-row-2"
          >
            <div>
              {relatedLesson && onOpenLesson && (
                <button
                  type="button"
                  onClick={() => onOpenLesson(relatedLesson.id)}
                  className="px-3.5 py-2 rounded-xl bg-[var(--app-subtle)] border border-[var(--app-border)] hover:border-[var(--app-primary)] text-xs text-[var(--app-primary)] font-semibold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 transition-colors"
                >
                  <span>Ver lección asociada →</span>
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleNextPuzzle}
              className="ml-auto px-4 py-2 rounded-full bg-[var(--app-primary)] text-white text-xs font-semibold hover:bg-[var(--app-primary-hover)] flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Siguiente puzzle</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
