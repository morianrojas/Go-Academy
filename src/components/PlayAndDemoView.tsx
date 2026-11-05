import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Flag,
  Play,
  RotateCcw,
  SkipForward,
  SlidersHorizontal,
  Undo2,
} from 'lucide-react';
import {
  BoardSize,
  BoardVisualLayers,
  Coord,
  ScoringRuleSet,
} from '../types/go';
import {
  calculateScore,
  chooseBasicAiMove,
  createGameState,
  playPass,
  playResign,
  toggleDeadStoneGroup,
  undoLastMove,
  validateAndPlayMove,
} from '../engine/goEngine';
import { DEMO_MINI_GAME_9X9 } from '../content/curriculumData';
import { GoBoard } from './GoBoard';
import { playStoneSound, playSuccessChime } from '../utils/sound';
import {
  CelebrationGifOverlay,
  centerActiveGoBoardInView,
  MaestroRoshiTeachingCard,
  notifySpecialRewardPriority,
  SHOW_REWARD_TEST_BUTTONS,
  triggerTestRewardWithPreloadDelay,
  warmUpRewardVideoUrls,
} from './MaestroRoshiTeachingCard';
import {
  advanceGlobalCelebrationGif,
  advanceGlobalMistakeRewardDialogue,
  advanceGlobalPracticeWinReward,
  peekNextGlobalPracticeWinVideo,
  resetGlobalConsecutiveMistakes,
  ROSHI_PRACTICE_LOSS_TITLE,
  ROSHI_TWO_MISTAKES_VIDEO_URL,
} from '../utils/roshiSpriteScheduler';

export interface PlayAndDemoViewProps {
  scoringRule: ScoringRuleSet;
  visualLayers: BoardVisualLayers;
  soundEnabled: boolean;
  onToggleLayer: (layer: keyof BoardVisualLayers) => void;
  totalJade?: number;
}

function buildGameWinnerAnnouncement(
  score: ReturnType<typeof calculateScore>,
  opponentType: 'BASIC_AI' | 'FREE_BOARD',
  endReason?: 'TWO_PASSES' | 'RESIGNATION',
  resignWinner?: 'BLACK' | 'WHITE' | 'DRAW'
): string {
  if (endReason === 'RESIGNATION') {
    if (resignWinner === 'BLACK') {
      return opponentType === 'BASIC_AI'
        ? '¡Partida finalizada! ¡Ganador: Tú (Negro ●) por abandono del bot!'
        : '¡Partida finalizada! ¡Ganador: Negro (●) por abandono!';
    }
    return opponentType === 'BASIC_AI'
      ? 'Partida finalizada. Ganador: Bot (Blanco ○) por abandono.'
      : '¡Partida finalizada! ¡Ganador: Blanco (○) por abandono!';
  }

  if (score.winner === 'BLACK') {
    return opponentType === 'BASIC_AI'
      ? `¡Partida terminada! ¡Ganador: Tú (Negro ●) por +${score.margin} puntos! (Negro ${score.blackTotal} pts vs. Bot Blanco ${score.whiteTotal} pts).`
      : `¡Partida terminada! ¡Ganador: Negro (●) por +${score.margin} puntos! (Negro ${score.blackTotal} pts vs. Blanco ${score.whiteTotal} pts).`;
  }

  if (score.winner === 'WHITE') {
    return opponentType === 'BASIC_AI'
      ? `¡Partida terminada! Ganador: Bot (Blanco ○) por +${score.margin} puntos (Bot Blanco ${score.whiteTotal} pts vs. Negro ${score.blackTotal} pts).`
      : `¡Partida terminada! ¡Ganador: Blanco (○) por +${score.margin} puntos! (Blanco ${score.whiteTotal} pts vs. Negro ${score.blackTotal} pts).`;
  }

  return `¡Partida terminada en empate exacto a ${score.blackTotal} puntos!`;
}

export const PlayAndDemoView: React.FC<PlayAndDemoViewProps> = ({
  scoringRule,
  visualLayers,
  soundEnabled,
  onToggleLayer,
  totalJade = 2,
}) => {
  const [activeTab, setActiveTab] = useState<'PLAY' | 'DEMO_GAME'>('PLAY');
  const [boardSize, setBoardSize] = useState<BoardSize>(9);
  const [opponentType, setOpponentType] = useState<'BASIC_AI' | 'FREE_BOARD'>('BASIC_AI');
  const [aiDifficulty, setAiDifficulty] = useState<'PRINCIPIANTE' | 'FACIL' | 'INTERMEDIO'>('FACIL');
  const [showGameSettings, setShowGameSettings] = useState<boolean>(false);
  const [showMoveHistory, setShowMoveHistory] = useState<boolean>(false);

  const [game, setGame] = useState(() =>
    createGameState({ size: 9, scoringRule })
  );
  const [statusMessage, setStatusMessage] = useState<string>(
    '¡Bienvenido a la Sala de Práctica! Aquí puedes poner a prueba tus habilidades enfrentándote al Bot o practicando con otro jugador en tablero libre. Cuando estés listo, coloca tu primera piedra negra en cualquier intersección.'
  );
  const [showScoreOverlay, setShowScoreOverlay] = useState<boolean>(false);
  const [confirmRestart, setConfirmRestart] = useState<boolean>(false);
  const [lastPlayActionWasBoardMove, setLastPlayActionWasBoardMove] = useState<boolean>(false);
  const [lastPlayOutcome, setLastPlayOutcome] = useState<
    'NONE' | 'NORMAL_MOVE' | 'CAPTURE' | 'ILLEGAL'
  >('NONE');
  const [playEventSeq, setPlayEventSeq] = useState<number>(0);
  const [practiceWinCelebration, setPracticeWinCelebration] = useState<{
    open: boolean;
    gifUrl?: string;
    videoUrl?: string;
    congratsTitle: string;
    subtitle?: string;
    accomplishmentText?: string;
    specialLevelDialogue?: string;
    bottomScoreText?: string;
  } | null>(null);
  const lastCaptureBannerRef = React.useRef<string | null>(null);
  const hasShownWinForCurrentGameRef = React.useRef<boolean>(false);

  const [isPreloadingPracticeTest, setIsPreloadingPracticeTest] = useState<'WIN' | 'LOSS' | null>(
    null
  );

  const triggerPracticeWinReward = (
    scoreSummary: string,
    rewardOverride?: { videoUrl: string; dialogue: string }
  ) => {
    hasShownWinForCurrentGameRef.current = true;
    notifySpecialRewardPriority();
    playSuccessChime(soundEnabled);
    // Daily shuffle: starts every day with "roshi especial.webm" and its fixed dialogue,
    // followed by the remaining 15 videos shuffled without repetition during the day.
    const reward = rewardOverride ?? advanceGlobalPracticeWinReward();
    setPracticeWinCelebration({
      open: true,
      videoUrl: reward.videoUrl,
      congratsTitle: 'Ganaste la Partida',
      accomplishmentText: 'Ganaste la Partida',
      specialLevelDialogue: reward.dialogue,
      bottomScoreText: `Puntuación: ${scoreSummary}`,
    });
  };

  const triggerPracticeLossReward = (scoreSummary: string, dialogueOverride?: string) => {
    hasShownWinForCurrentGameRef.current = true;
    notifySpecialRewardPriority();
    const chosenDialogue = dialogueOverride ?? advanceGlobalMistakeRewardDialogue();
    setPracticeWinCelebration({
      open: true,
      videoUrl: ROSHI_TWO_MISTAKES_VIDEO_URL,
      congratsTitle: ROSHI_PRACTICE_LOSS_TITLE,
      accomplishmentText: ROSHI_PRACTICE_LOSS_TITLE,
      specialLevelDialogue: chosenDialogue,
      bottomScoreText: `Resultado: ${scoreSummary}`,
    });
  };

  // Pre-buffer into RAM the exact next Practice Win video from the daily shuffle queue
  // and the Practice Loss video while the player is playing on the board.
  useEffect(() => {
    const nextWinVideo = peekNextGlobalPracticeWinVideo();
    warmUpRewardVideoUrls(nextWinVideo, undefined, true);
    warmUpRewardVideoUrls(ROSHI_TWO_MISTAKES_VIDEO_URL);
  }, [game.status, practiceWinCelebration?.open]);

  // Commented Mini-Game Demo state
  const [demoIdx, setDemoIdx] = useState<number>(0);
  const [hasDismissedDemoSpotlight, setHasDismissedDemoSpotlight] = useState<boolean>(false);
  const [visibleDemoStoneCount, setVisibleDemoStoneCount] = useState<number>(0);
  const demoMoveTimersRef = React.useRef<number[]>([]);
  const isInitialDemoMountRef = React.useRef<boolean>(true);

  const clearDemoMoveTimers = () => {
    demoMoveTimersRef.current.forEach((id) => window.clearTimeout(id));
    demoMoveTimersRef.current = [];
  };

  useEffect(() => {
    clearDemoMoveTimers();
    setHasDismissedDemoSpotlight(false);
    const prevStonesCount = demoIdx === 0 ? 0 : DEMO_MINI_GAME_9X9[demoIdx - 1].stones.length;
    setVisibleDemoStoneCount(prevStonesCount);
    return () => clearDemoMoveTimers();
  }, [demoIdx, activeTab]);

  const handleDemoSpotlightDismiss = () => {
    clearDemoMoveTimers();
    setHasDismissedDemoSpotlight(true);
    const currentStep = DEMO_MINI_GAME_9X9[demoIdx];
    const prevCount = demoIdx === 0 ? 0 : DEMO_MINI_GAME_9X9[demoIdx - 1].stones.length;
    const totalCount = currentStep.stones.length;

    if (totalCount <= prevCount) {
      setVisibleDemoStoneCount(totalCount);
      playStoneSound(soundEnabled, false);
      return;
    }

    // Play the first new stone immediately on dismissing Maestro Roshi ("Entendido")
    setVisibleDemoStoneCount(prevCount + 1);
    playStoneSound(soundEnabled, false);

    // If the commented step includes a response stone, play it smoothly right after
    for (let count = prevCount + 2; count <= totalCount; count++) {
      const stepOffset = count - (prevCount + 1);
      const timerId = window.setTimeout(() => {
        setVisibleDemoStoneCount(count);
        playStoneSound(soundEnabled, false);
      }, stepOffset * 220);
      demoMoveTimersRef.current.push(timerId);
    }
  };

  useEffect(() => {
    if (isInitialDemoMountRef.current) {
      isInitialDemoMountRef.current = false;
      return;
    }
    centerActiveGoBoardInView();
  }, [demoIdx]);

  useEffect(() => {
    setGame((prev) => ({ ...prev, scoringRule }));
  }, [scoringRule]);

  useEffect(() => {
    if (
      activeTab === 'PLAY' &&
      opponentType === 'BASIC_AI' &&
      game.status === 'PLAYING' &&
      game.currentTurn === 'WHITE'
    ) {
      const timer = setTimeout(() => {
        const aiDecision = chooseBasicAiMove(game, aiDifficulty);
        if (aiDecision.type === 'PASS') {
          const passed = playPass(game);
          setLastPlayActionWasBoardMove(false);
          setGame(passed);
          if (passed.status === 'FINISHED') {
            const finalScore = calculateScore(passed);
            setShowScoreOverlay(true);
            const announcement = buildGameWinnerAnnouncement(
              finalScore,
              opponentType,
              passed.endReason,
              passed.winner
            );
            setStatusMessage(announcement);
            if (finalScore.winner === 'BLACK') {
              triggerPracticeWinReward(`Negro ● gana por +${finalScore.margin} pts`);
            } else if (finalScore.winner === 'WHITE') {
              triggerPracticeLossReward(`Bot Blanco ○ gana por +${finalScore.margin} pts`);
            }
          } else {
            if (lastCaptureBannerRef.current) {
              setStatusMessage(
                `${lastCaptureBannerRef.current} El oponente básico pasó turno. Es tu turno (Negro).`
              );
              lastCaptureBannerRef.current = null;
            } else {
              setStatusMessage(
                'El oponente básico ha pasado turno. Es tu turno (Negro).'
              );
            }
          }
        } else {
          const res = validateAndPlayMove(game, aiDecision.coord);
          if (res.legal && res.nextState) {
            playStoneSound(soundEnabled, (res.capturedStones?.length ?? 0) > 0);
            setLastPlayActionWasBoardMove(false);
            setGame(res.nextState);
            if (lastCaptureBannerRef.current) {
              setStatusMessage(
                `${lastCaptureBannerRef.current} El Bot (Blanco) respondió en ${res.nextState.lastMove?.coordinateLabel}. Tu turno (Negro).`
              );
              lastCaptureBannerRef.current = null;
            } else {
              setStatusMessage(
                `Oponente básico (Blanco) jugó en ${res.nextState.lastMove?.coordinateLabel}. Tu turno (Negro).`
              );
            }
          }
        }
      }, 320);

      return () => clearTimeout(timer);
    }
  }, [activeTab, opponentType, game, aiDifficulty, soundEnabled]);

  const scoreBreakdown = useMemo(() => {
    if (!showScoreOverlay && game.status !== 'FINISHED') return null;
    return calculateScore(game);
  }, [game, showScoreOverlay]);

  const handleIntersectionClick = (coord: Coord) => {
    if (showScoreOverlay || game.status === 'FINISHED') {
      if (game.board[coord.y][coord.x] !== 'EMPTY') {
        const updatedGame = toggleDeadStoneGroup(game, coord);
        setLastPlayActionWasBoardMove(true);
        setGame(updatedGame);
        const updatedScore = calculateScore(updatedGame);
        if (updatedGame.status === 'FINISHED') {
          setStatusMessage(
            `${buildGameWinnerAnnouncement(
              updatedScore,
              opponentType,
              updatedGame.endReason,
              updatedGame.winner
            )} (Piedras muertas actualizadas).`
          );
          const isPlayerVictoryAfterDeadStones =
            opponentType === 'BASIC_AI'
              ? updatedScore.winner === 'BLACK'
              : updatedScore.winner === 'BLACK' || updatedScore.winner === 'WHITE';
          if (isPlayerVictoryAfterDeadStones && !hasShownWinForCurrentGameRef.current) {
            triggerPracticeWinReward(
              updatedScore.winner === 'BLACK'
                ? `Negro ● gana por +${updatedScore.margin} pts`
                : `Blanco ○ gana por +${updatedScore.margin} pts`
            );
          } else if (
            opponentType === 'BASIC_AI' &&
            updatedScore.winner === 'WHITE' &&
            !hasShownWinForCurrentGameRef.current
          ) {
            triggerPracticeLossReward(`Bot Blanco ○ gana por +${updatedScore.margin} pts`);
          }
        } else {
          setStatusMessage('Grupo marcado/desmarcado como muerto para el conteo territorial.');
        }
      }
      return;
    }

    if (opponentType === 'BASIC_AI' && game.currentTurn === 'WHITE') {
      return;
    }

    const res = validateAndPlayMove(game, coord);
    setLastPlayActionWasBoardMove(true);
    if (!res.legal || !res.nextState) {
      lastCaptureBannerRef.current = null;
      setLastPlayOutcome('ILLEGAL');
      setPlayEventSeq((s) => s + 1);
      setStatusMessage(res.messageEs);
      return;
    }

    resetGlobalConsecutiveMistakes();
    const capturedCount = res.capturedStones?.length ?? 0;
    playStoneSound(soundEnabled, capturedCount > 0);
    setGame(res.nextState);
    if (capturedCount > 0) {
      const captureMsg = `¡Excelente captura! Capturaste ${capturedCount} ${
        capturedCount === 1 ? 'piedra contraria' : 'piedras contrarias'
      }. ${res.messageEs}`;
      lastCaptureBannerRef.current = captureMsg;
      setLastPlayOutcome('CAPTURE');
      setPlayEventSeq((s) => s + 1);
      setStatusMessage(captureMsg);
    } else {
      lastCaptureBannerRef.current = null;
      setLastPlayOutcome('NORMAL_MOVE');
      setStatusMessage(res.messageEs);
    }
    setConfirmRestart(false);
  };

  const handlePass = () => {
    if (game.status === 'FINISHED') return;
    lastCaptureBannerRef.current = null;
    setLastPlayActionWasBoardMove(false);
    setLastPlayOutcome('NONE');
    const next = playPass(game);
    setGame(next);
    if (next.status === 'FINISHED') {
      const finalScore = calculateScore(next);
      setShowScoreOverlay(true);
      setPlayEventSeq((s) => s + 1);
      const announcement = buildGameWinnerAnnouncement(
        finalScore,
        opponentType,
        next.endReason,
        next.winner
      );
      setStatusMessage(announcement);
      const isPlayerVictory =
        opponentType === 'BASIC_AI'
          ? finalScore.winner === 'BLACK'
          : finalScore.winner === 'BLACK' || finalScore.winner === 'WHITE';
      if (isPlayerVictory) {
        triggerPracticeWinReward(
          finalScore.winner === 'BLACK'
            ? `Negro ● gana por +${finalScore.margin} pts`
            : `Blanco ○ gana por +${finalScore.margin} pts`
        );
      } else if (opponentType === 'BASIC_AI' && finalScore.winner === 'WHITE') {
        triggerPracticeLossReward(`Bot Blanco ○ gana por +${finalScore.margin} pts`);
      }
    } else {
      setStatusMessage('Has pasado turno. Dos pases seguidos finalizarán la partida.');
    }
  };

  const handleResign = () => {
    if (game.status === 'FINISHED') return;
    lastCaptureBannerRef.current = null;
    setLastPlayActionWasBoardMove(false);
    setLastPlayOutcome('NONE');
    const next = playResign(game);
    setGame(next);
    const finalScore = calculateScore(next);
    setPlayEventSeq((s) => s + 1);
    setStatusMessage(
      buildGameWinnerAnnouncement(
        finalScore,
        opponentType,
        next.endReason,
        next.winner
      )
    );
    if (opponentType === 'BASIC_AI') {
      triggerPracticeLossReward('Derrota por abandono ante el Bot');
    } else if (opponentType === 'FREE_BOARD' && (next.winner === 'BLACK' || next.winner === 'WHITE')) {
      triggerPracticeWinReward(
        next.winner === 'BLACK'
          ? 'Victoria de Negro ● por abandono'
          : 'Victoria de Blanco ○ por abandono'
      );
    }
  };

  const handleUndo = () => {
    if (game.undoStack.length === 0) return;
    lastCaptureBannerRef.current = null;
    hasShownWinForCurrentGameRef.current = false;
    setLastPlayActionWasBoardMove(false);
    setLastPlayOutcome('NONE');
    let next = undoLastMove(game);
    if (opponentType === 'BASIC_AI' && next.currentTurn === 'WHITE' && next.undoStack.length > 0) {
      next = undoLastMove(next);
    }
    setGame(next);
    setShowScoreOverlay(false);
    setStatusMessage('Jugada deshecha.');
  };

  const handleStartNewGame = (newSize: BoardSize = boardSize) => {
    lastCaptureBannerRef.current = null;
    hasShownWinForCurrentGameRef.current = false;
    setLastPlayActionWasBoardMove(false);
    setLastPlayOutcome('NONE');
    setBoardSize(newSize);
    setGame(createGameState({ size: newSize, scoringRule }));
    setShowScoreOverlay(false);
    setConfirmRestart(false);
    setPracticeWinCelebration(null);
    setStatusMessage(
      `¡Bienvenido a una nueva partida en tablero ${newSize}×${newSize}! Pon a prueba tus habilidades contra el Bot o con otro jugador colocando tu primera piedra negra.`
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      {practiceWinCelebration && (
        <CelebrationGifOverlay
          open={practiceWinCelebration.open}
          gifUrl={practiceWinCelebration.gifUrl}
          videoUrl={practiceWinCelebration.videoUrl}
          congratsTitle={practiceWinCelebration.congratsTitle}
          subtitle={practiceWinCelebration.subtitle}
          xpEarned={15}
          totalJade={totalJade}
          accomplishmentText={practiceWinCelebration.accomplishmentText}
          specialLevelDialogue={practiceWinCelebration.specialLevelDialogue}
          bottomScoreText={practiceWinCelebration.bottomScoreText}
          onClose={() =>
            setPracticeWinCelebration((prev) => (prev ? { ...prev, open: false } : null))
          }
          actionLabel="Continuar en Sala"
          testId="practice-win-celebration-overlay"
        />
      )}

      {/* Compact Header Bar */}
      <div className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-3">
          <h1 className="text-xl md:text-2xl font-display font-bold text-[var(--app-text)]">
            Sala de Práctica
          </h1>
          <span className="text-xs font-mono text-[var(--app-muted)]">
            {boardSize}×{boardSize} · {opponentType === 'BASIC_AI' ? 'Vs. IA' : 'Tablero libre'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {activeTab === 'PLAY' && (
            <button
              type="button"
              onClick={() => setShowGameSettings((v) => !v)}
              aria-expanded={showGameSettings}
              data-testid="toggle-game-settings-btn"
              className="px-3 py-2 rounded-xl bg-[var(--app-subtle)] border border-[var(--app-border)] text-xs font-semibold text-[var(--app-text)] hover:border-[var(--app-primary)] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Opciones de partida</span>
              {showGameSettings ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}

          <div className="flex items-center gap-1 bg-[var(--app-subtle)] p-1 rounded-xl border border-[var(--app-border)]">
            <button
              type="button"
              onClick={() => setActiveTab('PLAY')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'PLAY'
                  ? 'bg-[var(--app-primary)] text-white'
                  : 'text-[var(--app-text)]/75 hover:text-[var(--app-text)]'
              }`}
            >
              Tablero de Práctica
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('DEMO_GAME')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'DEMO_GAME'
                  ? 'bg-[var(--app-primary)] text-white'
                  : 'text-[var(--app-text)]/75 hover:text-[var(--app-text)]'
              }`}
            >
              Partida Comentada
            </button>
          </div>
        </div>
      </div>

      {/* Collapsible Game Configuration Bar */}
      {activeTab === 'PLAY' && showGameSettings && (
        <div className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--app-muted)] mb-1">
              Tamaño de tablero
            </label>
            <div className="flex items-center gap-1 bg-[var(--app-subtle)] p-1 rounded-lg">
              {([9, 13, 19] as BoardSize[]).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => handleStartNewGame(sz)}
                  className={`flex-1 py-1 text-xs font-mono font-semibold rounded cursor-pointer ${
                    boardSize === sz
                      ? 'bg-[var(--app-primary)] text-white'
                      : 'text-[var(--app-text)]/75'
                  }`}
                >
                  {sz}×{sz}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--app-muted)] mb-1">
              Modo de juego
            </label>
            <div className="flex items-center gap-1 bg-[var(--app-subtle)] p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setOpponentType('BASIC_AI')}
                className={`flex-1 py-1 text-xs font-medium rounded cursor-pointer ${
                  opponentType === 'BASIC_AI'
                    ? 'bg-[var(--app-primary)] text-white'
                    : 'text-[var(--app-text)]/75'
                }`}
              >
                Vs. IA Básica
              </button>
              <button
                type="button"
                onClick={() => setOpponentType('FREE_BOARD')}
                className={`flex-1 py-1 text-xs font-medium rounded cursor-pointer ${
                  opponentType === 'FREE_BOARD'
                    ? 'bg-[var(--app-primary)] text-white'
                    : 'text-[var(--app-text)]/75'
                }`}
              >
                Libre (2J)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--app-muted)] mb-1">
              Nivel Oponente
            </label>
            <select
              aria-label="Nivel del oponente básico"
              value={aiDifficulty}
              onChange={(e) => setAiDifficulty(e.target.value as any)}
              disabled={opponentType !== 'BASIC_AI'}
              className="w-full px-2.5 py-1.5 text-xs font-medium rounded-lg bg-[var(--app-subtle)] border border-[var(--app-border)] text-[var(--app-text)]"
            >
              <option value="PRINCIPIANTE">Principiante</option>
              <option value="FACIL">Fácil</option>
              <option value="INTERMEDIO">Táctico</option>
            </select>
          </div>
        </div>
      )}

      {activeTab === 'PLAY' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Child 1: Maestro Roshi Status Card / Pill (Right Column Row 1 on Desktop; Top on Mobile) */}
          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1 bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-4 sm:p-5">
            <div role="status">
              <MaestroRoshiTeachingCard
                title={
                  game.status === 'FINISHED' && scoreBreakdown
                    ? game.endReason === 'RESIGNATION'
                      ? game.winner === 'BLACK'
                        ? opponentType === 'BASIC_AI'
                          ? '¡Victoria para ti (Negro ●) por abandono!'
                          : '¡Victoria de Negro (●) por abandono!'
                        : opponentType === 'BASIC_AI'
                        ? 'Ganador: Bot (Blanco ○) por abandono'
                        : '¡Victoria de Blanco (○) por abandono!'
                      : scoreBreakdown.winner === 'BLACK'
                      ? opponentType === 'BASIC_AI'
                        ? `¡Ganaste la partida! · Negro ● +${scoreBreakdown.margin} pts`
                        : `¡Ganador: Negro ● (+${scoreBreakdown.margin} pts)!`
                      : scoreBreakdown.winner === 'WHITE'
                      ? opponentType === 'BASIC_AI'
                        ? `Ganador: Bot (Blanco ○) por +${scoreBreakdown.margin} pts`
                        : `¡Ganador: Blanco ○ (+${scoreBreakdown.margin} pts)!`
                      : '¡Partida terminada en Empate!'
                    : lastPlayOutcome === 'CAPTURE'
                    ? '¡Captura en el tablero!'
                    : lastPlayOutcome === 'ILLEGAL'
                    ? 'Jugada ilegal · Observación del Maestro Roshi'
                    : 'Consejero de Partida'
                }
                message={statusMessage}
                subMessage={scoreBreakdown?.explanationEs}
                subMessageLabel="Detalle del conteo:"
                tone={
                  game.status === 'FINISHED' && scoreBreakdown
                    ? (opponentType === 'BASIC_AI'
                        ? (game.endReason === 'RESIGNATION' ? game.winner : scoreBreakdown.winner) ===
                          'BLACK'
                        : (game.endReason === 'RESIGNATION' ? game.winner : scoreBreakdown.winner) ===
                            'BLACK' ||
                          (game.endReason === 'RESIGNATION' ? game.winner : scoreBreakdown.winner) ===
                            'WHITE')
                      ? 'SUCCESS'
                      : 'DEFAULT'
                    : lastPlayOutcome === 'CAPTURE'
                    ? 'SUCCESS'
                    : lastPlayOutcome === 'ILLEGAL'
                    ? 'WARNING'
                    : 'DEFAULT'
                }
                animationCategory={
                  game.status === 'FINISHED' && scoreBreakdown
                    ? (opponentType === 'BASIC_AI'
                        ? (game.endReason === 'RESIGNATION' ? game.winner : scoreBreakdown.winner) ===
                          'BLACK'
                        : (game.endReason === 'RESIGNATION' ? game.winner : scoreBreakdown.winner) ===
                            'BLACK' ||
                          (game.endReason === 'RESIGNATION' ? game.winner : scoreBreakdown.winner) ===
                            'WHITE')
                      ? 'SURPRISE'
                      : 'CONVERSATION'
                    : lastPlayOutcome === 'CAPTURE'
                    ? 'SURPRISE'
                    : lastPlayOutcome === 'ILLEGAL'
                    ? 'MISTAKE'
                    : 'CONVERSATION'
                }
                interactionKey={
                  game.status === 'FINISHED'
                    ? `play-finished-${playEventSeq}-${statusMessage}`
                    : lastPlayOutcome === 'CAPTURE'
                    ? `play-capture-${playEventSeq}`
                    : lastPlayOutcome === 'ILLEGAL'
                    ? `play-illegal-${playEventSeq}`
                    : game.moveHistory.length === 0
                    ? 'play-welcome'
                    : 'play-active-board'
                }
                autoOpenSpotlight={
                  !practiceWinCelebration?.open &&
                  (game.moveHistory.length === 0 ||
                    (game.status === 'FINISHED' && !practiceWinCelebration) ||
                    lastPlayOutcome === 'CAPTURE' ||
                    lastPlayOutcome === 'ILLEGAL')
                }
                deferInitialSpotlightUntilScroll={true}
                centerBoardOnDismiss={game.moveHistory.length === 0}
                alwaysCenterBoardOnDismiss={game.moveHistory.length === 0}
                spotlightDelayMs={
                  (lastPlayOutcome === 'CAPTURE' || lastPlayOutcome === 'ILLEGAL')
                    ? 650
                    : 0
                }
                dismissLabel="Entendido"
                avatarSize="sm"
                testId="play-roshi-status-card"
              />
            </div>
          </div>

          {/* Child 2: Interactive GoBoard (Immediately below Title/Pill on Mobile; Left Column on Desktop) */}
          <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:row-span-2 bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-4 sm:p-5 flex flex-col items-center">
            <div className="w-full max-w-[490px] flex items-center justify-between mb-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-[var(--app-text)]">
                  Turno: {game.currentTurn === 'BLACK' ? 'Negro ●' : 'Blanco ○'}
                </span>
                <span className="font-mono text-[var(--app-muted)]">
                  Capturas: ● {game.captures.BLACK} · ○ {game.captures.WHITE}
                </span>
              </div>
              <span className="font-mono text-[var(--app-primary)]">
                Jugada #{game.moveHistory.length}
              </span>
            </div>

            <GoBoard
              size={game.size}
              board={game.board}
              currentTurn={game.currentTurn}
              lastMove={game.lastMove?.coord}
              koPoint={game.koPoint}
              visualLayers={visualLayers}
              onToggleLayer={onToggleLayer}
              onSelectIntersection={handleIntersectionClick}
              territoryMap={scoreBreakdown?.territoryMap}
              markedDeadStones={game.markedDeadStones}
            />

            {/* Designated Practice Reward Test Buttons placed directly below the Go board (hidden in public release) */}
            {SHOW_REWARD_TEST_BUTTONS && (
              <div
                data-testid="practice-board-reward-test-bar"
                className="w-full max-w-[490px] mt-3 pt-2.5 border-t border-[var(--app-border)] flex flex-wrap items-center justify-center gap-2"
              >
                <button
                  type="button"
                  disabled={isPreloadingPracticeTest !== null}
                  data-testid="test-practice-win-reward-btn"
                  onClick={() => {
                    const reward = advanceGlobalPracticeWinReward();
                    triggerTestRewardWithPreloadDelay(
                      reward.videoUrl,
                      () => triggerPracticeWinReward('Negro ● gana por +6.5 pts', reward),
                      (loading) => setIsPreloadingPracticeTest(loading ? 'WIN' : null)
                    );
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[var(--app-subtle)] border border-[var(--app-primary)]/40 text-[11px] font-semibold text-[var(--app-primary)] hover:bg-[var(--app-primary)] hover:text-white disabled:opacity-60 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>
                    {isPreloadingPracticeTest === 'WIN'
                      ? 'Cargando recompensa...'
                      : 'Probar Recompensa Victoria (Shuffle)'}
                  </span>
                </button>

                <button
                  type="button"
                  disabled={isPreloadingPracticeTest !== null}
                  data-testid="test-practice-loss-reward-btn"
                  onClick={() => {
                    const chosenDialogue = advanceGlobalMistakeRewardDialogue();
                    triggerTestRewardWithPreloadDelay(
                      ROSHI_TWO_MISTAKES_VIDEO_URL,
                      () => triggerPracticeLossReward('Bot Blanco ○ gana por +4.5 pts', chosenDialogue),
                      (loading) => setIsPreloadingPracticeTest(loading ? 'LOSS' : null)
                    );
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[var(--app-subtle)] border border-red-300 text-[11px] font-semibold text-red-800 hover:bg-red-700 hover:text-white disabled:opacity-60 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>
                    {isPreloadingPracticeTest === 'LOSS'
                      ? 'Cargando recompensa...'
                      : 'Probar Recompensa Derrota (Guerrero de Clase Baja)'}
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Child 3: Game Action Controls, Score Breakdown & Move History */}
          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-2 bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-5 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled={game.status === 'FINISHED'}
                onClick={handlePass}
                className="px-3.5 py-2 rounded-xl bg-[var(--app-primary)] text-white hover:bg-[var(--app-primary-hover)] disabled:opacity-40 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <SkipForward className="w-3.5 h-3.5" />
                <span>Pasar turno</span>
              </button>

              <button
                type="button"
                disabled={game.undoStack.length === 0}
                onClick={handleUndo}
                className="px-3.5 py-2 rounded-xl border border-[var(--app-border)] text-xs font-medium text-[var(--app-text)] hover:bg-[var(--app-subtle)] disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
              >
                <Undo2 className="w-3.5 h-3.5" />
                <span>Deshacer</span>
              </button>

              <button
                type="button"
                onClick={() => setShowScoreOverlay((v) => !v)}
                className={`px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                  showScoreOverlay
                    ? 'bg-[#B66A3C] text-white border-[#B66A3C]'
                    : 'border-[var(--app-border)] text-[var(--app-text)] hover:bg-[var(--app-subtle)]'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>{showScoreOverlay ? 'Ocultar conteo' : 'Puntuación'}</span>
              </button>

              <button
                type="button"
                disabled={game.status === 'FINISHED'}
                onClick={handleResign}
                className="px-3 py-2 rounded-xl border border-red-300 text-red-800 hover:bg-red-50 disabled:opacity-40 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <Flag className="w-3.5 h-3.5" />
                <span>Abandonar</span>
              </button>

              {!confirmRestart ? (
                <button
                  type="button"
                  onClick={() => {
                    if (game.moveHistory.length > 0 && game.status === 'PLAYING') {
                      setConfirmRestart(true);
                    } else {
                      handleStartNewGame();
                    }
                  }}
                  className="px-3 py-2 rounded-xl border border-[var(--app-border)] text-xs font-medium text-[var(--app-text)] hover:bg-[var(--app-subtle)] flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reiniciar</span>
                </button>
              ) : (
                <div className="flex items-center gap-1.5 bg-red-50 px-2.5 py-1 rounded-lg border border-red-200">
                  <span className="text-xs text-red-900 font-medium">¿Reiniciar?</span>
                  <button
                    type="button"
                    onClick={() => handleStartNewGame()}
                    className="px-2 py-0.5 bg-red-700 text-white text-xs rounded font-semibold cursor-pointer"
                  >
                    Sí
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmRestart(false)}
                    className="px-2 py-0.5 text-xs text-red-900 cursor-pointer"
                  >
                    No
                  </button>
                </div>
              )}
            </div>

            {scoreBreakdown && (
              <div
                className="p-4 rounded-xl bg-[var(--app-subtle)] border border-[var(--app-border)] space-y-2 text-xs"
                data-testid="practice-score-summary"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 font-bold text-[var(--app-primary)]">
                  <span>
                    {scoreBreakdown.ruleSet === 'AREA_CHINESE'
                      ? 'Reglas Chinas (Área)'
                      : 'Reglas Japonesas (Territorio)'}
                  </span>
                  <span className="font-mono px-2.5 py-0.5 rounded-md bg-[var(--app-surface)] border border-[var(--app-border)]">
                    {scoreBreakdown.winner === 'BLACK'
                      ? opponentType === 'BASIC_AI'
                        ? `Ganador: Tú (Negro ●) +${scoreBreakdown.margin} pts`
                        : `Ganador: Negro (●) +${scoreBreakdown.margin} pts`
                      : scoreBreakdown.winner === 'WHITE'
                      ? opponentType === 'BASIC_AI'
                        ? `Ganador: Bot (Blanco ○) +${scoreBreakdown.margin} pts`
                        : `Ganador: Blanco (○) +${scoreBreakdown.margin} pts`
                      : 'Empate'}
                  </span>
                </div>
                <p className="text-[var(--app-text)]">{scoreBreakdown.explanationEs}</p>
              </div>
            )}

            {/* Collapsible History */}
            <div className="pt-3 border-t border-[var(--app-border)] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setShowMoveHistory((v) => !v)}
                  className="text-xs font-semibold text-[var(--app-muted)] hover:text-[var(--app-text)] inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>
                    {showMoveHistory ? 'Ocultar historial' : `Ver historial (${game.moveHistory.length})`}
                  </span>
                  {showMoveHistory ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {showMoveHistory && (
                <div className="max-h-28 overflow-y-auto flex flex-wrap gap-1.5 p-2.5 rounded-xl bg-[var(--app-subtle)] border border-[var(--app-border)]">
                  {game.moveHistory.length === 0 ? (
                    <span className="text-xs text-[var(--app-muted)]">Sin jugadas aún.</span>
                  ) : (
                    game.moveHistory.map((m) => (
                      <span
                        key={m.moveNumber}
                        className="text-xs font-mono text-[var(--app-text)] px-2 py-0.5 rounded bg-[var(--app-surface)] border border-[var(--app-border)]"
                      >
                        {m.moveNumber}. {m.color === 'BLACK' ? '●' : '○'} {m.coordinateLabel}
                      </span>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Child 1: Commented Game Step Title + Maestro Roshi Spotlight/Pill */}
          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1 bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-5 space-y-4">
            <span className="text-xs font-semibold tracking-wider text-[var(--app-primary)]">
              PASO {demoIdx + 1} DE {DEMO_MINI_GAME_9X9.length}
            </span>
            <h2 className="text-xl md:text-2xl font-display font-bold text-[var(--app-text)]">
              {DEMO_MINI_GAME_9X9[demoIdx].title}
            </h2>

            <MaestroRoshiTeachingCard
              title={
                demoIdx === DEMO_MINI_GAME_9X9.length - 1
                  ? '¡Partida Comentada Finalizada!'
                  : `Jugada ${demoIdx + 1}`
              }
              message={DEMO_MINI_GAME_9X9[demoIdx].narration}
              tone={demoIdx === DEMO_MINI_GAME_9X9.length - 1 ? 'SUCCESS' : 'DEFAULT'}
              animationCategory={
                demoIdx === DEMO_MINI_GAME_9X9.length - 1 ? 'SURPRISE' : 'CONVERSATION'
              }
              interactionKey={`demo-9x9-${demoIdx}`}
              deferInitialSpotlightUntilScroll={true}
              alwaysCenterBoardOnDismiss={true}
              onDismissSpotlight={handleDemoSpotlightDismiss}
              dismissLabel="Entendido"
              testId="demo-game-roshi-card"
            />
          </div>

          {/* Child 2: GoBoard (Immediately below Title on Mobile; Left Column on Desktop) */}
          <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:row-span-2 bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-4 sm:p-5 flex flex-col items-center">
            {(() => {
              const currentStep = DEMO_MINI_GAME_9X9[demoIdx];
              const isFinalDemoStep = demoIdx === DEMO_MINI_GAME_9X9.length - 1;
              const displayedStones = hasDismissedDemoSpotlight
                ? currentStep.stones.slice(0, Math.max(1, visibleDemoStoneCount))
                : demoIdx === 0
                ? []
                : DEMO_MINI_GAME_9X9[demoIdx - 1].stones;
              const lastStone =
                displayedStones.length > 0
                  ? displayedStones[displayedStones.length - 1]
                  : undefined;
              const effectiveLastMove = isFinalDemoStep
                ? null
                : hasDismissedDemoSpotlight
                ? visibleDemoStoneCount >= currentStep.stones.length
                  ? currentStep.lastMove ?? (lastStone ? { x: lastStone.x, y: lastStone.y } : null)
                  : lastStone
                  ? { x: lastStone.x, y: lastStone.y }
                  : null
                : demoIdx > 0
                ? DEMO_MINI_GAME_9X9[demoIdx - 1].lastMove ?? null
                : null;

              const demoBoardState = createGameState({
                size: 9,
                initialStones: displayedStones,
                scoringRule,
              });
              const demoFinalScore = isFinalDemoStep ? calculateScore(demoBoardState) : undefined;

              return (
                <GoBoard
                  size={9}
                  board={demoBoardState.board}
                  currentTurn={currentStep.turn ?? 'BLACK'}
                  lastMove={effectiveLastMove}
                  territoryMap={demoFinalScore?.territoryMap}
                  visualLayers={visualLayers}
                  onToggleLayer={onToggleLayer}
                  interactive={false}
                />
              );
            })()}
          </div>

          {/* Child 3: Stepper Controls + Final Game Outcome, Score Breakdown & Game Notes */}
          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-2 bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-5 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled={demoIdx === 0}
                onClick={() => setDemoIdx(0)}
                className="px-3 py-2 rounded-xl border border-[var(--app-border)] text-xs font-medium disabled:opacity-40 hover:bg-[var(--app-subtle)] cursor-pointer"
              >
                Inicio
              </button>
              <button
                type="button"
                disabled={demoIdx === 0}
                onClick={() => setDemoIdx((i) => Math.max(0, i - 1))}
                className="px-3.5 py-2 rounded-xl border border-[var(--app-border)] text-xs font-medium disabled:opacity-40 hover:bg-[var(--app-subtle)] flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Anterior</span>
              </button>
              <button
                type="button"
                disabled={demoIdx === DEMO_MINI_GAME_9X9.length - 1}
                onClick={() => setDemoIdx((i) => Math.min(DEMO_MINI_GAME_9X9.length - 1, i + 1))}
                className="px-4 py-2 rounded-xl bg-[var(--app-primary)] text-white text-xs font-semibold disabled:opacity-40 hover:bg-[var(--app-primary-hover)] flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Siguiente jugada</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {demoIdx === DEMO_MINI_GAME_9X9.length - 1 && (
              <div
                data-testid="demo-game-final-summary"
                className="p-4 rounded-xl bg-[var(--app-subtle)] border border-[var(--app-primary)]/40 space-y-3 text-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--app-border)] pb-2.5">
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--app-primary)]">
                      Partida Finalizada · Doble Pase
                    </span>
                    <h3 className="text-sm font-display font-bold text-[var(--app-text)]">
                      Ganador: Negro (●) por +2.5 puntos
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-[var(--app-primary)] text-white font-mono font-bold text-xs">
                    Negro ● 44.0 — 41.5 ○ Blanco
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-2.5 rounded-lg bg-[var(--app-surface)] border border-[var(--app-border)] space-y-1">
                    <div className="font-bold text-[var(--app-text)]">Negro (●) · Territorio Norte</div>
                    <div className="text-[11px] text-[var(--app-muted)] font-mono">
                      32 pts territorio + 12 piedras = <strong>44.0 pts</strong> (Área) /{' '}
                      <strong>32.0 pts</strong> (Territorio)
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[var(--app-surface)] border border-[var(--app-border)] space-y-1">
                    <div className="font-bold text-[var(--app-text)]">Blanco (○) · Territorio Sur</div>
                    <div className="text-[11px] text-[var(--app-muted)] font-mono">
                      24 pts territorio + 12 piedras + 5.5 Komi = <strong>41.5 pts</strong> (Área) /{' '}
                      <strong>29.5 pts</strong> (Territorio)
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="font-bold text-[var(--app-text)]">
                    Notas de la Partida (Lecciones Clave):
                  </div>
                  <ul className="space-y-1 text-[var(--app-text)]/90 list-disc pl-4 leading-relaxed">
                    <li>
                      <strong>Apertura (Fuseki):</strong> Negro construyó influencia alta en la sexta fila (F6 y D6) mientras Blanco aseguró la cuarta fila en el sur (D4 y F4).
                    </li>
                    <li>
                      <strong>Conexión sólida (Honte):</strong> En B5, D5 y F5 Negro defendió a tiempo sus puntos de corte para evitar que Blanco dividiera el muro central.
                    </li>
                    <li>
                      <strong>Final de partida (Yose):</strong> El cierre oportuno de ambos bordes en primera línea (A5/A4 y J6/J5) selló los 32 puntos de territorio que le dieron la victoria a Negro por +2.5 puntos.
                    </li>
                  </ul>
                </div>

                <div className="pt-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setDemoIdx(0)}
                    className="px-3.5 py-1.5 rounded-lg bg-[var(--app-surface)] border border-[var(--app-primary)] text-[var(--app-primary)] font-semibold hover:bg-[var(--app-primary)] hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Volver a reproducir partida</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Progressive, Translucent Right-Edge Advance Animation ("Siguiente") so user doesn't have to scroll down */}
          {hasDismissedDemoSpotlight && demoIdx < DEMO_MINI_GAME_9X9.length - 1 && (
            <button
              type="button"
              data-testid="demo-game-right-edge-next-cue"
              onClick={() => setDemoIdx((i) => Math.min(DEMO_MINI_GAME_9X9.length - 1, i + 1))}
              aria-label={`Avanzar a la siguiente jugada comentada (${demoIdx + 2} de ${DEMO_MINI_GAME_9X9.length})`}
              title={`Siguiente jugada (${demoIdx + 2}/${DEMO_MINI_GAME_9X9.length})`}
              className="concept-edge-cue fixed right-2 sm:right-4 top-1/2 z-30 w-16 sm:w-20 min-h-[112px] sm:min-h-[128px] py-5 px-2.5 rounded-2xl bg-gradient-to-l from-[var(--app-primary)]/68 via-[var(--app-primary)]/40 to-[var(--app-primary)]/14 hover:from-[var(--app-primary)]/82 hover:via-[var(--app-primary)]/52 border border-white/25 shadow-md flex flex-col items-center justify-center gap-2 cursor-pointer select-none transition-colors group"
            >
              <div className="flex items-center -space-x-2.5 text-white drop-shadow-xs">
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 concept-chevron-wave-1" />
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 concept-chevron-wave-2" />
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 concept-chevron-wave-3" />
              </div>
              <span className="text-[11px] sm:text-xs font-sans font-bold tracking-tight text-white drop-shadow-xs leading-tight text-center">
                {demoIdx === DEMO_MINI_GAME_9X9.length - 2 ? 'Resultado' : 'Siguiente'}
              </span>
              <span className="text-[10px] font-mono font-bold tracking-tight text-white/90 drop-shadow-xs leading-none">
                {`${demoIdx + 2}/${DEMO_MINI_GAME_9X9.length}`}
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
