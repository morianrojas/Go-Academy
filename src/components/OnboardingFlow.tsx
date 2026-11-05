import React, { useEffect, useState } from 'react';
import { BookOpen, CheckCircle2, Compass, ShieldCheck, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { ScoringRuleSet } from '../types/go';
import { createGameState, validateAndPlayMove } from '../engine/goEngine';
import { GoBoard } from './GoBoard';
import { MaestroRoshiTeachingCard } from './MaestroRoshiTeachingCard';
import { playStoneSound, playSuccessChime } from '../utils/sound';

export interface OnboardingFlowProps {
  onComplete: (options: {
    startingPath: 'FROM_ZERO' | 'HAS_BASICS';
    dailyGoalMinutes: 5 | 10 | 15 | 20;
    scoringRulePreference: ScoringRuleSet;
    startFirstLessonImmediately: boolean;
  }) => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [startingPath, setStartingPath] = useState<'FROM_ZERO' | 'HAS_BASICS'>('FROM_ZERO');
  const [dailyGoal, setDailyGoal] = useState<5 | 10 | 15 | 20>(10);
  const [scoringRule, setScoringRule] = useState<ScoringRuleSet>('AREA_CHINESE');

  // Always start at the very top of the screen when changing onboarding steps (1, 2, or 3)
  const handleSelectStep = (nextStep: 1 | 2 | 3) => {
    setStep(nextStep);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [step]);

  // Interactive mini-board on Screen 1 so user experiences placing a stone on an intersection immediately
  const [demoGame, setDemoGame] = useState(() =>
    createGameState({
      size: 9,
      initialStones: [
        { x: 2, y: 2, color: 'BLACK' },
        { x: 6, y: 6, color: 'WHITE' },
        { x: 6, y: 2, color: 'BLACK' },
      ],
      startingTurn: 'WHITE',
    })
  );
  const [demoFeedback, setDemoFeedback] = useState<string>(
    'Prueba tocar cualquier intersección libre (por ejemplo C3) para colocar una piedra.'
  );
  const [hasPlacedDemoStone, setHasPlacedDemoStone] = useState<boolean>(false);
  const [lastDemoMoveWasLegal, setLastDemoMoveWasLegal] = useState<boolean | null>(null);
  const [demoBoardInteractionSeq, setDemoBoardInteractionSeq] = useState<number>(0);

  const handleDemoBoardClick = (coord: { x: number; y: number }) => {
    const res = validateAndPlayMove(demoGame, coord);
    setDemoBoardInteractionSeq((c) => c + 1);
    if (res.legal && res.nextState) {
      playStoneSound(true, (res.capturedStones?.length ?? 0) > 0);
      playSuccessChime(true);
      setDemoGame(res.nextState);
      setHasPlacedDemoStone(true);
      setLastDemoMoveWasLegal(true);
      setDemoFeedback(
        `${res.messageEs} ¡Excelente primera jugada! Ya comprobaste cómo se coloca una piedra en una intersección y cómo respira por sus libertades. Puedes seguir probando en el tablero o avanzar al Paso 2 de la introducción.`
      );
    } else {
      playStoneSound(true, false);
      setLastDemoMoveWasLegal(false);
      setDemoFeedback(res.messageEs);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#202622] flex flex-col justify-between p-4 md:p-8">
      {/* Top header */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between border-b border-[#202622]/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#173C35] text-[#F5F1E8] flex items-center justify-center font-display font-bold text-lg">
            碁
          </div>
          <span className="font-display font-semibold text-xl tracking-tight text-[#202622]">
            Go Academy
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-[#202622]/70">
          <span>Paso {step} de 3</span>
          <span>·</span>
          <button
            type="button"
            data-start="true"
            onClick={() =>
              onComplete({
                startingPath: 'FROM_ZERO',
                dailyGoalMinutes: 10,
                scoringRulePreference: 'AREA_CHINESE',
                startFirstLessonImmediately: false,
              })
            }
            className="text-[#173C35] underline hover:text-[#173C35]/80 cursor-pointer whitespace-nowrap shrink-0"
          >
            Saltar introducción
          </button>
        </div>
      </div>

      {/* Main Onboarding Card */}
      <main className="max-w-4xl w-full mx-auto my-6 bg-white/85 border border-[#202622]/10 rounded-2xl p-6 md:p-10 shadow-sm">
        {step === 1 && (
          <div className="flex flex-col space-y-8">
            <div className="space-y-5" data-testid="board-top-info-section">
              <p className="text-xs font-semibold tracking-wider text-[#B66A3C]">
                01. BIENVENIDO AL DOJO CONTEMPORÁNEO
              </p>
              <h1 className="text-2xl md:text-4xl font-display font-semibold text-[#202622] leading-tight">
                El arte milenario de rodear territorio, explicado paso a paso.
              </h1>

              <ul className="space-y-2.5 text-sm text-[#202622]/85">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#173C35] shrink-0 mt-0.5" />
                  <span>
                    <strong>Intersecciones, no casillas:</strong> Las piedras negras y blancas se colocan donde se cruzan las líneas, incluyendo bordes y esquinas.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#173C35] shrink-0 mt-0.5" />
                  <span>
                    <strong>Libertades y conexión:</strong> Las piedras respiran a través de las intersecciones vacías vecinas y se unen para formar grupos sólidos.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#173C35] shrink-0 mt-0.5" />
                  <span>
                    <strong>Más territorio gana:</strong> No necesitas destruir todo el ejército rival; gana quien proteja más puntos vacíos al final.
                  </span>
                </li>
              </ul>

              <MaestroRoshiTeachingCard
                title={
                  lastDemoMoveWasLegal === false
                    ? 'Jugada incorrecta'
                    : hasPlacedDemoStone
                    ? '¡Primera piedra colocada!'
                    : 'Bienvenida del Maestro Roshi'
                }
                message={demoFeedback}
                subMessage="Las piedras se colocan donde se cruzan las líneas, respiran por sus libertades vacías y sobreviven conectadas."
                subMessageLabel="Primera enseñanza:"
                tone={
                  lastDemoMoveWasLegal === false
                    ? 'WARNING'
                    : hasPlacedDemoStone
                    ? 'SUCCESS'
                    : 'DEFAULT'
                }
                animationCategory={
                  lastDemoMoveWasLegal === false
                    ? 'MISTAKE'
                    : lastDemoMoveWasLegal === true
                    ? 'SURPRISE'
                    : 'CONVERSATION'
                }
                forcedAnimationId={lastDemoMoveWasLegal === true ? 'FUMANDO' : undefined}
                forcedFlavorNote={
                  lastDemoMoveWasLegal === true
                    ? 'Ven a este viejito... Puede que tenga canas en la barba, ¡pero en la cintura sigo teniendo 20 años!'
                    : undefined
                }
                interactionKey={`onb-step1-${demoBoardInteractionSeq}-${demoFeedback}`}
                deferInitialSpotlightUntilScroll={true}
                spotlightDelayMs={demoBoardInteractionSeq > 0 ? 650 : 0}
                alwaysCenterBoardOnDismiss={true}
                prioritizeActionOnRight={hasPlacedDemoStone}
                avatarSize="sm"
                testId="onboarding-roshi-card"
              >
                {hasPlacedDemoStone && (
                  <button
                    type="button"
                    onClick={() => handleSelectStep(2)}
                    data-testid="onboarding-roshi-next-step-btn"
                    className="px-4 py-2.5 bg-[#173C35] text-[#F5F1E8] text-xs sm:text-sm font-bold rounded-xl hover:bg-[#173C35]/90 transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
                  >
                    <span>Continuar al Paso 2</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </MaestroRoshiTeachingCard>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="w-full max-w-md flex flex-col items-center bg-[#F5F1E8]/70 p-4 sm:p-5 rounded-xl border border-[#202622]/10">
                <span className="text-xs font-medium text-[#202622]/75 mb-2">
                  Tablero interactivo 9×9 — Toca una intersección
                </span>
                <div className="w-full max-w-[300px]">
                  <GoBoard
                    size={9}
                    board={demoGame.board}
                    currentTurn={demoGame.currentTurn}
                    lastMove={demoGame.lastMove?.coord}
                    visualLayers={{
                      showCoordinates: true,
                      showLiberties: true,
                      showGroups: false,
                      showAtari: true,
                      showLastMove: true,
                    }}
                    onSelectIntersection={handleDemoBoardClick}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleSelectStep(2)}
                data-testid="onboarding-step1-continue-below-board-btn"
                className="w-full sm:w-auto px-5 py-2.5 bg-[#173C35] text-[#F5F1E8] text-sm font-semibold rounded-lg hover:bg-[#173C35]/90 transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Continuar: Cómo aprenderás</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#B66A3C]">
                02. MÉTODO Y PUNTO DE PARTIDA
              </p>
              <h2 className="mt-1 text-2xl md:text-3xl font-display font-semibold text-[#202622]">
                ¿Cuál es tu experiencia actual con el Go?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setStartingPath('FROM_ZERO')}
                className={`text-left p-5 rounded-xl border transition-all cursor-pointer ${
                  startingPath === 'FROM_ZERO'
                    ? 'bg-[#173C35]/8 border-[#173C35] ring-2 ring-[#173C35]'
                    : 'bg-white border-[#202622]/15 hover:border-[#173C35]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 font-display font-semibold text-lg text-[#202622]">
                    <Compass className="w-5 h-5 text-[#173C35]" />
                    Empiezo desde cero
                  </span>
                  <span className="text-xs font-semibold text-[#173C35]">Recomendado</span>
                </div>
                <p className="mt-2 text-sm text-[#202622]/80 leading-relaxed">
                  No conozco las reglas ni el vocabulario. Quiero empezar paso a paso con el tablero 9×9, colocar mis primeras piedras y aprender libertades y capturas desde la Lección 1.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setStartingPath('HAS_BASICS')}
                className={`text-left p-5 rounded-xl border transition-all cursor-pointer ${
                  startingPath === 'HAS_BASICS'
                    ? 'bg-[#173C35]/8 border-[#173C35] ring-2 ring-[#173C35]'
                    : 'bg-white border-[#202622]/15 hover:border-[#173C35]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 font-display font-semibold text-lg text-[#202622]">
                    <BookOpen className="w-5 h-5 text-[#B66A3C]" />
                    Ya conozco las reglas básicas
                  </span>
                </div>
                <p className="mt-2 text-sm text-[#202622]/80 leading-relaxed">
                  Sé qué es una libertad y cómo capturar, pero quiero desbloquear todas las lecciones iniciales desde el primer momento y practicar con los 10 puzzles tácticos.
                </p>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#F5F1E8] border border-[#202622]/10 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#173C35] shrink-0 mt-0.5" />
              <p className="text-xs text-[#202622]/80 leading-relaxed">
                <strong>Compromiso pedagógico:</strong> El progreso se guarda automáticamente en tu dispositivo sin obligarte a crear cuenta. Todas las jugadas y soluciones de puzzles son verificadas por nuestro motor determinista de Go.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => handleSelectStep(1)}
                className="px-4 py-2 text-sm font-medium text-[#202622]/80 hover:text-[#202622] flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectStep(3)}
                className="px-5 py-2.5 bg-[#173C35] text-[#F5F1E8] text-sm font-semibold rounded-lg hover:bg-[#173C35]/90 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Continuar: Objetivo diario</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#B66A3C]">
                03. RITMO DE ESTUDIO Y REGLAS
              </p>
              <h2 className="mt-1 text-2xl md:text-3xl font-display font-semibold text-[#202622]">
                Elige tu meta diaria de práctica
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(
                [
                  { mins: 5, label: '5 min / día', desc: '1 puzzle o repaso breve' },
                  { mins: 10, label: '10 min / día', desc: '1 lección o 2 puzzles' },
                  { mins: 15, label: '15 min / día', desc: 'Lección + práctica guiada' },
                  { mins: 20, label: '20 min / día', desc: 'Estudio profundo y partida' },
                ] as const
              ).map((item) => (
                <button
                  key={item.mins}
                  type="button"
                  onClick={() => setDailyGoal(item.mins)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    dailyGoal === item.mins
                      ? 'bg-[#173C35] text-[#F5F1E8] border-[#173C35]'
                      : 'bg-white text-[#202622] border-[#202622]/15 hover:border-[#173C35]/50'
                  }`}
                >
                  <div className="font-mono font-semibold text-base">{item.label}</div>
                  <div
                    className={`mt-1 text-xs ${
                      dailyGoal === item.mins ? 'text-[#F5F1E8]/85' : 'text-[#202622]/70'
                    }`}
                  >
                    {item.desc}
                  </div>
                </button>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[#F5F1E8] border border-[#202622]/10 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[#202622]">
                  Convención de puntuación declarada (configurable en Ajustes):
                </span>
                <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-[#202622]/10">
                  <button
                    type="button"
                    onClick={() => setScoringRule('AREA_CHINESE')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      scoringRule === 'AREA_CHINESE'
                        ? 'bg-[#173C35] text-[#F5F1E8]'
                        : 'text-[#202622]/75 hover:text-[#202622]'
                    }`}
                  >
                    Área (Chinas)
                  </button>
                  <button
                    type="button"
                    onClick={() => setScoringRule('TERRITORY_JAPANESE')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      scoringRule === 'TERRITORY_JAPANESE'
                        ? 'bg-[#173C35] text-[#F5F1E8]'
                        : 'text-[#202622]/75 hover:text-[#202622]'
                    }`}
                  >
                    Territorio (Japonesas)
                  </button>
                </div>
              </div>
              <p className="text-xs text-[#202622]/75 leading-relaxed">
                {scoringRule === 'AREA_CHINESE'
                  ? 'Puntuación por Área (recomendada para principiantes): cuenta tus piedras vivas en el tablero más las intersecciones vacías rodeadas (Komi 5.5). Es muy intuitiva porque rellenar neutrales no resta puntos.'
                  : 'Puntuación por Territorio (tradición japonesa): cuenta las intersecciones vacías rodeadas más los prisioneros capturados (Komi 5.5).'}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleSelectStep(2)}
                className="px-4 py-2 text-sm font-medium text-[#202622]/80 hover:text-[#202622] flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  data-start="true"
                  onClick={() =>
                    onComplete({
                      startingPath,
                      dailyGoalMinutes: dailyGoal,
                      scoringRulePreference: scoringRule,
                      startFirstLessonImmediately: true,
                    })
                  }
                  className="px-5 py-2.5 bg-[#173C35] text-[#F5F1E8] text-sm font-semibold rounded-lg hover:bg-[#173C35]/90 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Comenzar primera lección</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer note */}
      <footer className="max-w-4xl w-full mx-auto text-center text-xs text-[#202622]/60 py-2">
        Go Academy · Academia interactiva con motor determinista · Español neutro
      </footer>
    </div>
  );
};
