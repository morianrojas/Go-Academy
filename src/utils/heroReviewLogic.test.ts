import test from 'node:test';
import assert from 'node:assert/strict';
import { LESSONS_CATALOG } from '../content/curriculumData';
import { createDefaultUserState, storageRepository } from '../services/storageRepository';
import {
  buildHeroBottomLessonCards,
  buildHeroReviewScenarios,
  getCompletedLessonsChronological,
  getNextContinuingLesson,
} from './heroReviewLogic';
import { createGameState, validateAndPlayMove } from '../engine/goEngine';

test('buildHeroBottomLessonCards returns 2 concluded slots and 1 next available slot across user progression', () => {
  let state = createDefaultUserState(true);

  // 1. Complete Lesson 1 and Lesson 2
  state = storageRepository.completeLesson(state, LESSONS_CATALOG[0].id, 100).state;
  state = storageRepository.completeLesson(state, LESSONS_CATALOG[1].id, 95).state;

  const cardsAfter2 = buildHeroBottomLessonCards(
    LESSONS_CATALOG,
    state.lessonProgress,
    state.awardedXpKeys
  );
  assert.equal(cardsAfter2.length, 3);
  assert.equal(cardsAfter2[0].slotRole, 'CONCLUDED_1');
  assert.equal(cardsAfter2[0].isConcluded, true);
  assert.equal(cardsAfter2[0].lesson.id, LESSONS_CATALOG[0].id);

  assert.equal(cardsAfter2[1].slotRole, 'CONCLUDED_2');
  assert.equal(cardsAfter2[1].isConcluded, true);
  assert.equal(cardsAfter2[1].lesson.id, LESSONS_CATALOG[1].id);

  assert.equal(cardsAfter2[2].slotRole, 'NEXT_AVAILABLE');
  assert.equal(cardsAfter2[2].isConcluded, false);
  assert.equal(cardsAfter2[2].lesson.id, LESSONS_CATALOG[2].id);

  // 2. Complete Lesson 3 -> sliding window shifts to Lesson 2 & Lesson 3 concluded, Lesson 4 next available
  state = storageRepository.completeLesson(state, LESSONS_CATALOG[2].id, 90).state;
  const cardsAfter3 = buildHeroBottomLessonCards(
    LESSONS_CATALOG,
    state.lessonProgress,
    state.awardedXpKeys
  );
  assert.equal(cardsAfter3[0].lesson.id, LESSONS_CATALOG[1].id);
  assert.equal(cardsAfter3[0].isConcluded, true);
  assert.equal(cardsAfter3[1].lesson.id, LESSONS_CATALOG[2].id);
  assert.equal(cardsAfter3[1].isConcluded, true);
  assert.equal(cardsAfter3[2].lesson.id, LESSONS_CATALOG[3].id);
  assert.equal(cardsAfter3[2].slotRole, 'NEXT_AVAILABLE');
});

test('buildHeroReviewScenarios generates 6 engine-valid review practices from the last 2 completed lessons', () => {
  let state = createDefaultUserState(true);
  state = storageRepository.completeLesson(state, LESSONS_CATALOG[0].id, 100).state;
  state = storageRepository.completeLesson(state, LESSONS_CATALOG[1].id, 100).state;
  state = storageRepository.completeLesson(state, LESSONS_CATALOG[2].id, 100).state;

  const scenarios = buildHeroReviewScenarios(
    LESSONS_CATALOG,
    state.lessonProgress,
    state.awardedXpKeys
  );

  assert.equal(scenarios.length, 6);
  // First 3 scenarios come from penultimate completed lesson (Lesson 2, order #2)
  assert.equal(scenarios[0].lessonId, LESSONS_CATALOG[1].id);
  assert.equal(scenarios[1].lessonId, LESSONS_CATALOG[1].id);
  assert.equal(scenarios[2].lessonId, LESSONS_CATALOG[1].id);
  // Last 3 scenarios come from most recently completed lesson (Lesson 3, order #3)
  assert.equal(scenarios[3].lessonId, LESSONS_CATALOG[2].id);
  assert.equal(scenarios[4].lessonId, LESSONS_CATALOG[2].id);
  assert.equal(scenarios[5].lessonId, LESSONS_CATALOG[2].id);

  // Verify every scenario's target move is legal on the Go engine
  for (const sc of scenarios) {
    const game = createGameState({
      size: 9,
      initialStones: sc.initialStones,
      startingTurn: sc.turn,
    });
    const res = validateAndPlayMove(game, sc.targetCoord);
    assert.equal(res.legal, true, `Scenario ${sc.badge} target move must be legal`);
  }
});

test('getNextContinuingLesson and getCompletedLessonsChronological handle initial 1-lesson state cleanly', () => {
  let state = createDefaultUserState(true);
  state = storageRepository.completeLesson(state, LESSONS_CATALOG[0].id, 100).state;

  const completed = getCompletedLessonsChronological(
    LESSONS_CATALOG,
    state.lessonProgress,
    state.awardedXpKeys
  );
  assert.equal(completed.length, 1);
  assert.equal(completed[0].id, LESSONS_CATALOG[0].id);

  const next = getNextContinuingLesson(LESSONS_CATALOG, state.lessonProgress);
  assert.equal(next.id, LESSONS_CATALOG[1].id);
});
