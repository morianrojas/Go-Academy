import {
  BoardMarker,
  BoardSetupStone,
  Coord,
  InteractiveExercise,
  LessonContent,
  LessonProgress,
  PlayerColor,
} from '../types/go';
import { coordToLabel } from '../engine/goEngine';

export interface HeroDynamicReviewScenario {
  index: number; // 0..5
  lessonId: string;
  lessonOrderNumber: number;
  lessonTitle: string;
  badge: string;
  roshiTitle: string;
  roshiTeaching: string;
  boardPrompt: string;
  initialStones: BoardSetupStone[];
  turn: PlayerColor;
  targetCoord: Coord;
  targetLabel: string;
  validCoords: Coord[];
  markers: BoardMarker[];
  successFeedback: string;
  exploreFeedbackPrefix: string;
}

export interface HeroBottomLessonCardItem {
  slotIndex: 0 | 1 | 2;
  slotRole: 'CONCLUDED_1' | 'CONCLUDED_2' | 'NEXT_AVAILABLE';
  roleLabel: string;
  lesson: LessonContent;
  lessonOrderNumber: number;
  isConcluded: boolean;
  scorePct: number;
}

/**
 * Returns all completed/mastered lessons ordered chronologically from oldest completed to most recently completed.
 */
export function getCompletedLessonsChronological(
  lessonsCatalog: LessonContent[],
  lessonProgress: Record<string, LessonProgress>,
  awardedXpKeys: string[] = []
): LessonContent[] {
  const solved = lessonsCatalog.filter((l) => {
    const st = lessonProgress[l.id]?.status;
    return st === 'COMPLETED' || st === 'MASTERED';
  });

  return solved.slice().sort((a, b) => {
    const progA = lessonProgress[a.id];
    const progB = lessonProgress[b.id];
    const timeA = progA?.completedAtMs ?? 0;
    const timeB = progB?.completedAtMs ?? 0;
    if (timeA !== timeB) return timeA - timeB;

    const keyOrderA = awardedXpKeys.indexOf(`lesson:${a.id}`);
    const keyOrderB = awardedXpKeys.indexOf(`lesson:${b.id}`);
    if (keyOrderA !== -1 && keyOrderB !== -1 && keyOrderA !== keyOrderB) {
      return keyOrderA - keyOrderB;
    }

    return lessonsCatalog.indexOf(a) - lessonsCatalog.indexOf(b);
  });
}

/**
 * Returns the next lesson in the curriculum that is available/in-progress to continue.
 */
export function getNextContinuingLesson(
  lessonsCatalog: LessonContent[],
  lessonProgress: Record<string, LessonProgress>
): LessonContent {
  for (const l of lessonsCatalog) {
    const st = lessonProgress[l.id]?.status;
    if (!st || st === 'AVAILABLE' || st === 'IN_PROGRESS') {
      return l;
    }
  }
  for (const l of lessonsCatalog) {
    const st = lessonProgress[l.id]?.status;
    if (st !== 'COMPLETED' && st !== 'MASTERED') {
      return l;
    }
  }
  return lessonsCatalog[lessonsCatalog.length - 1] ?? lessonsCatalog[0];
}

/**
 * Builds the 3 bottom cards below the Hero 2D board:
 * - Slot 1 & Slot 2: The last 2 concluded lessons (chronologically: penultimate & most recent).
 *   If fewer than 2 lessons are concluded so far, shows the concluded lesson(s) and marks the remaining concluded slot as pending review.
 * - Slot 3: Always the next lesson that continues in the user's study program (Available / Next).
 */
export function buildHeroBottomLessonCards(
  lessonsCatalog: LessonContent[],
  lessonProgress: Record<string, LessonProgress>,
  awardedXpKeys: string[] = []
): HeroBottomLessonCardItem[] {
  const completedChrono = getCompletedLessonsChronological(
    lessonsCatalog,
    lessonProgress,
    awardedXpKeys
  );
  const lastTwoCompleted = completedChrono.slice(-2);
  const nextLesson = getNextContinuingLesson(lessonsCatalog, lessonProgress);
  const nextOrderNum = Math.max(1, lessonsCatalog.findIndex((l) => l.id === nextLesson.id) + 1);

  let slot1Lesson: LessonContent;
  let slot1Concluded: boolean;
  let slot2Lesson: LessonContent;
  let slot2Concluded: boolean;

  if (lastTwoCompleted.length >= 2) {
    slot1Lesson = lastTwoCompleted[0];
    slot1Concluded = true;
    slot2Lesson = lastTwoCompleted[1];
    slot2Concluded = true;
  } else if (lastTwoCompleted.length === 1) {
    slot1Lesson = lastTwoCompleted[0];
    slot1Concluded = true;
    // Second concluded slot previews the lesson that will become the 2nd concluded review once completed
    const fallbackSecond =
      lessonsCatalog.find((l) => l.id !== slot1Lesson.id && l.id !== nextLesson.id) ??
      nextLesson;
    slot2Lesson = fallbackSecond;
    slot2Concluded = false;
  } else {
    slot1Lesson = lessonsCatalog[0];
    slot1Concluded = false;
    slot2Lesson = lessonsCatalog[1] ?? lessonsCatalog[0];
    slot2Concluded = false;
  }

  const slot1Order = Math.max(1, lessonsCatalog.findIndex((l) => l.id === slot1Lesson.id) + 1);
  const slot2Order = Math.max(1, lessonsCatalog.findIndex((l) => l.id === slot2Lesson.id) + 1);

  return [
    {
      slotIndex: 0,
      slotRole: 'CONCLUDED_1',
      roleLabel: slot1Concluded ? 'Concluida' : '1ª por concluir',
      lesson: slot1Lesson,
      lessonOrderNumber: slot1Order,
      isConcluded: slot1Concluded,
      scorePct: slot1Concluded ? lessonProgress[slot1Lesson.id]?.scorePct ?? 100 : 0,
    },
    {
      slotIndex: 1,
      slotRole: 'CONCLUDED_2',
      roleLabel: slot2Concluded ? 'Concluida' : '2ª por concluir',
      lesson: slot2Lesson,
      lessonOrderNumber: slot2Order,
      isConcluded: slot2Concluded,
      scorePct: slot2Concluded ? lessonProgress[slot2Lesson.id]?.scorePct ?? 100 : 0,
    },
    {
      slotIndex: 2,
      slotRole: 'NEXT_AVAILABLE',
      roleLabel: 'Continúa',
      lesson: nextLesson,
      lessonOrderNumber: nextOrderNum,
      isConcluded: false,
      scorePct: lessonProgress[nextLesson.id]?.scorePct ?? 0,
    },
  ];
}

function extractPlaceStoneExercisesFromLesson(lesson: LessonContent): InteractiveExercise[] {
  const allCandidates: InteractiveExercise[] = [
    ...lesson.guidedDecisions,
    ...lesson.independentPractice,
    lesson.transferQuestion,
  ];
  return allCandidates.filter(
    (ex) =>
      ex &&
      ex.exerciseType === 'PLACE_STONE' &&
      Array.isArray(ex.validCoords) &&
      ex.validCoords.length > 0
  );
}

/**
 * Builds 6 interactive review scenarios (3 per lesson) from the user's last 2 completed lessons
 * (falling back to the first 2 curriculum lessons when fewer than 2 lessons have been completed).
 */
export function buildHeroReviewScenarios(
  lessonsCatalog: LessonContent[],
  lessonProgress: Record<string, LessonProgress>,
  awardedXpKeys: string[] = []
): HeroDynamicReviewScenario[] {
  const completedChrono = getCompletedLessonsChronological(
    lessonsCatalog,
    lessonProgress,
    awardedXpKeys
  );
  const lastTwo = completedChrono.slice(-2);

  let reviewLessons: [LessonContent, LessonContent];
  if (lastTwo.length >= 2) {
    reviewLessons = [lastTwo[0], lastTwo[1]];
  } else if (lastTwo.length === 1) {
    const first = lastTwo[0];
    const second = lessonsCatalog.find((l) => l.id !== first.id) ?? first;
    reviewLessons = [first, second];
  } else {
    reviewLessons = [lessonsCatalog[0], lessonsCatalog[1] ?? lessonsCatalog[0]];
  }

  const scenarios: HeroDynamicReviewScenario[] = [];

  reviewLessons.forEach((lesson) => {
    const lessonOrderNumber = Math.max(
      1,
      lessonsCatalog.findIndex((l) => l.id === lesson.id) + 1
    );
    const placeExercises = extractPlaceStoneExercisesFromLesson(lesson);

    for (let i = 0; i < 3; i++) {
      const ex = placeExercises[i % placeExercises.length];
      const concept = lesson.conceptSteps[i % lesson.conceptSteps.length];
      const keyIdea = lesson.summary.keyIdeas[i % lesson.summary.keyIdeas.length];
      const targetCoord = ex?.validCoords?.[0] ?? { x: 4, y: 4 };
      const targetLabel = coordToLabel(targetCoord, 9);
      const scenarioIndex = scenarios.length;

      const baseMarkers: BoardMarker[] = (ex?.markers ?? []).filter(
        (m) => !(m.x === targetCoord.x && m.y === targetCoord.y)
      );
      const markers: BoardMarker[] = [
        ...baseMarkers,
        { x: targetCoord.x, y: targetCoord.y, type: 'SUCCESS', label: '★' },
      ];

      scenarios.push({
        index: scenarioIndex,
        lessonId: lesson.id,
        lessonOrderNumber,
        lessonTitle: lesson.title,
        badge: `Repaso ${scenarioIndex + 1}/6 · Clase ${lessonOrderNumber}`,
        roshiTitle: `Repaso Clase ${lessonOrderNumber} · ${concept?.title.replace(/^\d+\.\s*/, '') || lesson.title}`,
        roshiTeaching: keyIdea || concept?.body || lesson.observableObjective,
        boardPrompt:
          ex?.prompt ||
          `Practica la enseñanza de la Clase ${lessonOrderNumber} jugando en ${targetLabel} (★).`,
        initialStones: ex?.initialStones ?? [],
        turn: ex?.turn ?? 'BLACK',
        targetCoord,
        targetLabel,
        validCoords: ex?.validCoords ?? [targetCoord],
        markers,
        successFeedback:
          ex?.correctFeedback ||
          `¡Excelente jugada en ${targetLabel}! Has consolidado este concepto de la Clase ${lessonOrderNumber}.`,
        exploreFeedbackPrefix:
          ex?.hints?.[0] ||
          `Para resolver esta práctica de la Clase ${lessonOrderNumber}, observa el punto clave ${targetLabel} (★).`,
      });
    }
  });

  return scenarios;
}
