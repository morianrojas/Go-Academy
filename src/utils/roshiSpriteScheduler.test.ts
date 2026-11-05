import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createInitialRoshiScheduler,
  nextRoshiInteraction,
  nextCelebrationGif,
  nextAcademyRoshiDialogue,
  ROSHI_SPRITE_CATALOG,
  SURPRISE_ANIMATION_IDS,
  MISTAKE_ANIMATION_IDS,
  PERVERTED_ANIMATION_IDS,
  PERVERTED_ROSHI_DIALOGUES,
  PERVERTED_ROSHI_RAW_GIF_LINKS,
  PERVERTED_ROSHI_GIF_URLS,
  CELEBRATION_RAW_GIF_LINKS,
  CELEBRATION_GIF_URLS,
  ROSHI_ESPECIAL_1_VIDEO_URL,
  ROSHI_ESPECIAL_2_VIDEO_URL,
  ROSHI_MUSICA_1_VIDEO_URL,
  ROSHI_MUSICA_2_VIDEO_URL,
  ROSHI_MUSICA_3_VIDEO_URL,
  ROSHI_MUSICA_4_VIDEO_URL,
  ROSHI_MUSICA_5_VIDEO_URL,
  ROSHI_MUSICA_6_VIDEO_URL,
  ROSHI_MUSICA_7_VIDEO_URL,
  ROSHI_MUSICA_8_VIDEO_URL,
  ROSHI_MUSICA_9_VIDEO_URL,
  ROSHI_MUSICA_10_VIDEO_URL,
  ROSHI_MUSICA_11_PART_1_VIDEO_URL,
  ROSHI_MUSICA_11_PART_2_VIDEO_URL,
  ROSHI_MUSICA_11_VIDEO_PARTS,
  ROSHI_MUSICA_11_VIDEO_URL,
  ROSHI_MUSICA_12_VIDEO_URL,
  ROSHI_MUSICA_13_VIDEO_URL,
  ROSHI_MUSICA_14_VIDEO_URL,
  ROSHI_GOKU_NO_ME_PEGUES_VIDEO_URL,
  ROSHI_GOKU_NO_ME_PEGUES_DIALOGUE,
  ROSHI_GRADUACION_PART_1_VIDEO_URL,
  ROSHI_GRADUACION_PART_2_VIDEO_URL,
  ROSHI_GRADUACION_PART_3_VIDEO_URL,
  ROSHI_GRADUACION_PART_4_VIDEO_URL,
  ROSHI_GRADUACION_PART_5_VIDEO_URL,
  ROSHI_GRADUACION_PART_6_VIDEO_URL,
  ROSHI_GRADUACION_PART_7_VIDEO_URL,
  ROSHI_GRADUACION_PART_8_VIDEO_URL,
  ROSHI_GRADUACION_PART_9_VIDEO_URL,
  ROSHI_GRADUACION_PART_10_VIDEO_URL,
  ROSHI_GRADUACION_PART_11_VIDEO_URL,
  ROSHI_GRADUACION_PART_12_VIDEO_URL,
  ROSHI_GRADUACION_PART_13_VIDEO_URL,
  ROSHI_GRADUACION_PART_14_VIDEO_URL,
  ROSHI_GRADUACION_PART_15_VIDEO_URL,
  ROSHI_GRADUACION_PART_16_VIDEO_URL,
  ROSHI_GRADUACION_VIDEO_PARTS,
  ROSHI_GRADUACION_VIDEO_URL,
  GRADUATION_COMPLETE_SPECIAL_VIDEO_URL,
  ROSHI_GRADUACION_TITLE,
  ROSHI_GRADUACION_DIALOGUE,
  resolveSpecialVideoSequence,
  ADVANCED_LESSON_SPECIAL_VIDEOS,
  getAdvancedLessonSpecialVideoUrl,
  PRACTICE_WIN_SPECIAL_VIDEOS,
  PRACTICE_WIN_FIRST_DAILY_VIDEO_URL,
  PRACTICE_WIN_REMAINING_SPECIAL_VIDEOS,
  ROSHI_ESPECIAL_1_FIXED_DIALOGUE,
  CELEBRATION_REWARD_CHARACTER_DIALOGUES,
  PRACTICE_WIN_SHUFFLE_DIALOGUES,
  ROSHI_TWO_MISTAKES_FIRST_DAILY_DIALOGUE,
  MISTAKE_REWARD_CHARACTER_DIALOGUES,
  MISTAKE_REWARD_SHUFFLE_DIALOGUES,
  resolveCharacterRewardDialogueMeta,
  nextMistakeRewardDialogue,
  LEVEL_COMPLETE_SPECIAL_VIDEO_URL,
  INTERMEDIATE_LEVEL_COMPLETE_SPECIAL_VIDEO_URL,
  ROSHI_TITLE_PROMOTION_VIDEO_URL,
  getTitlePromotionSpecialReward,
  nextPracticeWinSpecialVideo,
  PUZZLE_CELEBRATION_MILESTONE_COUNT,
  ACADEMY_ROSHI_SHUFFLE_DIALOGUES,
  SURPRISE_RANDOM_PHRASES,
  ROSHI_LEVEL_START_DIALOGUE,
  ROSHI_LEVEL_COMPLETE_DIALOGUE,
  getAcademyLevelBoundaryInfo,
  cleanRoshiTitleText,
  getProgressiveTextSlice,
  getTypewriterProgressPct,
  shouldAutoOpenSpotlightForTrigger,
  ROSHI_TWO_MISTAKES_VIDEO_URL,
  ROSHI_TWO_MISTAKES_TITLE,
  ROSHI_PRACTICE_LOSS_TITLE,
  ROSHI_TWO_MISTAKES_DIALOGUE,
  ROSHI_RESET_PROGRESS_VIDEO_URL,
  ROSHI_RESET_PROGRESS_TITLE,
  ROSHI_RESET_PROGRESS_DIALOGUE,
} from './roshiSpriteScheduler';
import {
  STUDENT_LEVEL_TIERS,
  detectStudentTitlePromotion,
  getStudentLevelFromXp,
} from '../services/storageRepository';
import { LESSONS_CATALOG } from '../content/curriculumData';
import { PUZZLES_CATALOG } from '../content/puzzlesData';
import {
  APP_THEMES_CATALOG,
  DEFAULT_UNLOCKED_APP_THEMES,
  DRAGON_BALL_HOY_PROFILE_BASE_BG,
  DRAGON_BALL_HOY_PROFILE_PARALLAX_LAYERS,
  DRAGON_BALL_PARALLAX_BASE_BG,
  DRAGON_BALL_PARALLAX_LAYERS,
  isDragonBallHoyOrProfileTab,
} from '../content/themesData';
import {
  getRoshiMoodPitchOffset,
  playRoshiAnimationSound,
  playRoshiMessagePopSound,
  playRoshiTypingTickSound,
  playVoiceBlip,
  soundFX,
  isGlobalSoundEnabled,
} from './sound';

test('ROSHI_SPRITE_CATALOG registers all 30 sprite sheets (1 conversational + 23 surprise + 6 mistake) and excludes removed animations', () => {
  const allSpecs = Object.values(ROSHI_SPRITE_CATALOG);
  assert.equal(allSpecs.length, 30);
  assert.equal(SURPRISE_ANIMATION_IDS.length, 23);
  assert.equal(MISTAKE_ANIMATION_IDS.length, 6);

  // Verify the deleted animations (including EMPERADOR_BARBABLANCA) are completely removed from the catalog and ID lists
  const allIds = Object.keys(ROSHI_SPRITE_CATALOG);
  assert.ok(!allIds.includes('KAMEHAMEHA'));
  assert.ok(!allIds.includes('EMPERADOR'));
  assert.ok(!allIds.includes('EMPERADOR_BARBABLANCA'));
  assert.ok(!allIds.includes('NEGATIVO_GORRA_ENOJO'));
  assert.ok(!allIds.includes('KAMEHAMEHA_RAYO_LATERAL'));
  for (const spec of allSpecs) {
    assert.ok(!spec.src.includes('negativo_3_87a1dcf9.png'));
    assert.ok(!spec.src.includes('emperador_ee2ae0c1.png'));
    assert.ok(!spec.src.includes('roshi_emperador_6f8cbe58.png'));
    assert.ok(!spec.src.includes('roshi_kameha_88596faa.png'));
    assert.ok(!spec.src.includes('Roshi_kameha_3_fbbe9751.png'));
  }

  assert.equal(ROSHI_SPRITE_CATALOG.HABLANDO.isConversational, true);
  assert.equal(ROSHI_SPRITE_CATALOG.HABLANDO.category, 'CONVERSATION');
  assert.equal(ROSHI_SPRITE_CATALOG.HABLANDO.src, '/assets/aistudio/roshi_hablando_4cc2ca18.png');
  assert.equal(ROSHI_SPRITE_CATALOG.HABLANDO.preAlignedCells, true);
  assert.equal(ROSHI_SPRITE_CATALOG.HABLANDO.cellInsetPx, 0);
  assert.equal(ROSHI_SPRITE_CATALOG.HABLANDO.hasPanelBorder, false);

  // Verify the Kamehameha animations
  assert.equal(ROSHI_SPRITE_CATALOG.KAMEHAMEHA_DESTELLO.src, '/assets/aistudio/kameha_2_b750a33b.png');
  assert.equal(ROSHI_SPRITE_CATALOG.KAMEHAMEHA_DESTELLO.preAlignedCells, true);
  assert.equal(ROSHI_SPRITE_CATALOG.KAMEHAMEHA_DESTELLO.cellInsetPx, 0);

  assert.equal(ROSHI_SPRITE_CATALOG.KAMEHAMEHA_ORBE.src, '/assets/aistudio/kameha_3_ed3b191d.png');
  assert.equal(ROSHI_SPRITE_CATALOG.KAMEHAMEHA_ORBE.preAlignedCells, true);
  assert.equal(ROSHI_SPRITE_CATALOG.KAMEHAMEHA_ORBE.cellInsetPx, 0);

  assert.equal(ROSHI_SPRITE_CATALOG.KAMEHAMEHA_RAYO_AZUL.src, '/assets/aistudio/Roshi_kameha_3.5_ba5ad23f.png');
  assert.equal(ROSHI_SPRITE_CATALOG.KAMEHAMEHA_RAYO_AZUL.cols, 5);
  assert.equal(ROSHI_SPRITE_CATALOG.KAMEHAMEHA_RAYO_AZUL.rows, 1);
  assert.equal(ROSHI_SPRITE_CATALOG.KAMEHAMEHA_RAYO_AZUL.totalFrames, 5);
  assert.equal(ROSHI_SPRITE_CATALOG.KAMEHAMEHA_RAYO_AZUL.cellInsetPx, 14);

  assert.equal(ROSHI_SPRITE_CATALOG.KAMEHAMEHA_MAXIMO_PODER.src, '/assets/aistudio/roshi_kameha_4.1_00bcc6f6.png');
  assert.equal(ROSHI_SPRITE_CATALOG.KAMEHAMEHA_MAXIMO_PODER.cols, 4);
  assert.equal(ROSHI_SPRITE_CATALOG.KAMEHAMEHA_MAXIMO_PODER.rows, 2);
  assert.equal(ROSHI_SPRITE_CATALOG.KAMEHAMEHA_MAXIMO_PODER.totalFrames, 8);
  assert.equal(ROSHI_SPRITE_CATALOG.KAMEHAMEHA_MAXIMO_PODER.cellInsetPx, 0);
  assert.equal(ROSHI_SPRITE_CATALOG.KAMEHAMEHA_MAXIMO_PODER.preAlignedCells, true);

  assert.equal(ROSHI_SPRITE_CATALOG.EMOCION_BASTON.src, '/assets/aistudio/roshi_emocion_2.1_9fa2daf3.png');
  assert.equal(ROSHI_SPRITE_CATALOG.EMOCION_BASTON.cols, 4);
  assert.equal(ROSHI_SPRITE_CATALOG.EMOCION_BASTON.rows, 2);
  assert.equal(ROSHI_SPRITE_CATALOG.EMOCION_BASTON.totalFrames, 8);
  assert.equal(ROSHI_SPRITE_CATALOG.EMOCION_BASTON.cellInsetPx, 0);
  assert.equal(ROSHI_SPRITE_CATALOG.EMOCION_BASTON.preAlignedCells, true);

  assert.equal(ROSHI_SPRITE_CATALOG.AMOR_Y_PAZ.src, '/assets/aistudio/roshi_amor_y_paz_515df3d5.png');
  assert.equal(ROSHI_SPRITE_CATALOG.AMOR_Y_PAZ.cols, 4);
  assert.equal(ROSHI_SPRITE_CATALOG.AMOR_Y_PAZ.rows, 2);
  assert.equal(ROSHI_SPRITE_CATALOG.AMOR_Y_PAZ.totalFrames, 8);
  assert.equal(ROSHI_SPRITE_CATALOG.AMOR_Y_PAZ.cellInsetPx, 0);
  assert.equal(ROSHI_SPRITE_CATALOG.AMOR_Y_PAZ.preAlignedCells, true);

  // Verify restored original flavorNotes on SALTO_BASTON_ALEGRIA and GRITO_BASTON_VICTORIA
  assert.equal(
    ROSHI_SPRITE_CATALOG.SALTO_BASTON_ALEGRIA.flavorNote,
    '¡Saltando de alegría con el bastón por esa jugada brillante!'
  );
  assert.equal(
    ROSHI_SPRITE_CATALOG.SALTO_BASTON_ALEGRIA.src,
    '/assets/aistudio/Roshi_salto_3.0_017eb35d.png'
  );
  assert.equal(ROSHI_SPRITE_CATALOG.SALTO_BASTON_ALEGRIA.preAlignedCells, true);
  assert.equal(ROSHI_SPRITE_CATALOG.SALTO_BASTON_ALEGRIA.cellInsetPx, 0);
  assert.equal(
    ROSHI_SPRITE_CATALOG.FUMANDO.src,
    '/assets/aistudio/roshi_fumando_2.0_950325ea.png'
  );
  assert.equal(ROSHI_SPRITE_CATALOG.FUMANDO.preAlignedCells, true);
  assert.equal(ROSHI_SPRITE_CATALOG.FUMANDO.cols, 4);
  assert.equal(ROSHI_SPRITE_CATALOG.FUMANDO.rows, 2);
  assert.equal(ROSHI_SPRITE_CATALOG.FUMANDO.totalFrames, 8);
  assert.equal(
    ROSHI_SPRITE_CATALOG.GRITO_BASTON_VICTORIA.flavorNote,
    '¡Eufórico por tu dominio táctico en el tablero!'
  );
  assert.equal(
    ROSHI_SPRITE_CATALOG.GRITO_BASTON_VICTORIA.src,
    '/assets/aistudio/baston_0d986c95.png'
  );
  assert.equal(
    ROSHI_SPRITE_CATALOG.ESTILO_CALLEJERO_CHOLO.src,
    '/assets/aistudio/cholo_e909b8e0.png'
  );

  const expected5x1SurpriseIds = [
    'KAMEHAMEHA_DESTELLO',
    'KAMEHAMEHA_ORBE',
    'KAMEHAMEHA_RAYO_AZUL',
    'POSE_TORBELLINO_JACKIE',
    'SALTO_BASTON_ALEGRIA',
    'GRITO_BASTON_VICTORIA',
    'ESTILO_CALLEJERO_CHOLO',
    'PICARO_REVISTA_SORPRESA',
    'POSE_MARCIAL_OSCURA',
    'POSE_BANDANA_ROJA',
    'POSE_MAESTRO_SERIO',
    'POSE_COMBATE_NARANJA',
    'POSE_KUNG_FU_CLASICO',
    'TRANSFORMACION_MAXIMO_PODER',
    'TRANSFORMACION_PIXEL_KI',
    'TRANSFORMACION_AURA_SUPREMA',
  ] as const;

  const preAligned5x1Ids = new Set<string>([
    'KAMEHAMEHA_DESTELLO',
    'KAMEHAMEHA_ORBE',
    'SALTO_BASTON_ALEGRIA',
    'GRITO_BASTON_VICTORIA',
    'ESTILO_CALLEJERO_CHOLO',
    'POSE_MARCIAL_OSCURA',
    'POSE_BANDANA_ROJA',
    'TRANSFORMACION_MAXIMO_PODER',
    'TRANSFORMACION_PIXEL_KI',
    'TRANSFORMACION_AURA_SUPREMA',
  ]);

  assert.equal(ROSHI_SPRITE_CATALOG.POSE_MARCIAL_OSCURA.src, '/assets/aistudio/roshi_pose_2_450ac339.png');
  assert.equal(ROSHI_SPRITE_CATALOG.POSE_BANDANA_ROJA.src, '/assets/aistudio/roshi_pose_3_6dad5b8c.png');
  assert.equal(ROSHI_SPRITE_CATALOG.TRANSFORMACION_MAXIMO_PODER.src, '/assets/aistudio/roshi_transformacion_1_c3d9b558.png');
  assert.equal(ROSHI_SPRITE_CATALOG.TRANSFORMACION_PIXEL_KI.src, '/assets/aistudio/roshi_transformacion_2_90a52853.png');
  assert.equal(ROSHI_SPRITE_CATALOG.TRANSFORMACION_AURA_SUPREMA.src, '/assets/aistudio/roshi_transformacion_3_5e66719c.png');

  for (const id of expected5x1SurpriseIds) {
    assert.ok(
      SURPRISE_ANIMATION_IDS.includes(id),
      `${id} must be registered in SURPRISE_ANIMATION_IDS`
    );
    assert.ok(
      !MISTAKE_ANIMATION_IDS.includes(id),
      `${id} must be exclusive to SURPRISE_ANIMATION_IDS`
    );
    assert.equal(ROSHI_SPRITE_CATALOG[id].category, 'SURPRISE');
    assert.equal(ROSHI_SPRITE_CATALOG[id].isSurprise, true);
    assert.equal(ROSHI_SPRITE_CATALOG[id].isMistake, false);
    assert.equal(ROSHI_SPRITE_CATALOG[id].cols, 5);
    assert.equal(ROSHI_SPRITE_CATALOG[id].rows, 1);
    assert.equal(ROSHI_SPRITE_CATALOG[id].totalFrames, 5);
    assert.equal(
      ROSHI_SPRITE_CATALOG[id].cellInsetPx,
      preAligned5x1Ids.has(id) ? 0 : 14
    );
    if (preAligned5x1Ids.has(id)) {
      assert.equal(ROSHI_SPRITE_CATALOG[id].preAlignedCells, true);
    }
  }

  for (const id of SURPRISE_ANIMATION_IDS) {
    assert.equal(ROSHI_SPRITE_CATALOG[id].isConversational, false);
    assert.equal(ROSHI_SPRITE_CATALOG[id].category, 'SURPRISE');
    assert.ok(ROSHI_SPRITE_CATALOG[id].src.startsWith('/assets/aistudio/'));
  }

  for (const id of MISTAKE_ANIMATION_IDS) {
    assert.equal(ROSHI_SPRITE_CATALOG[id].isConversational, false);
    assert.equal(ROSHI_SPRITE_CATALOG[id].category, 'MISTAKE');
    assert.ok(ROSHI_SPRITE_CATALOG[id].src.startsWith('/assets/aistudio/negativo_'));
    assert.equal(ROSHI_SPRITE_CATALOG[id].cols, 5);
    assert.equal(ROSHI_SPRITE_CATALOG[id].rows, 1);
    assert.equal(ROSHI_SPRITE_CATALOG[id].totalFrames, 5);
    assert.equal(ROSHI_SPRITE_CATALOG[id].cellInsetPx, 14);
  }
});

test('Normal conversational interactions NEVER trigger periodic surprise animations on every 3rd/4th message', () => {
  let state = createInitialRoshiScheduler();
  assert.equal(state.interactionCount, 1);
  assert.equal(state.currentAnimationId, 'HABLANDO');

  for (let i = 2; i <= 25; i++) {
    state = nextRoshiInteraction(state);
    assert.equal(state.interactionCount, i);
    assert.equal(
      state.currentAnimationId,
      'HABLANDO',
      `Interaction ${i} without explicit SURPRISE/MISTAKE category must remain HABLANDO`
    );
  }
});

test('SURPRISE category pulls all 23 surprise animations without repetition in each cycle and reshuffles into a distinct order every new cycle', () => {
  let state = createInitialRoshiScheduler();
  const cycles: string[][] = [];

  for (let c = 0; c < 4; c++) {
    const cycle: string[] = [];
    for (let i = 0; i < 23; i++) {
      state = nextRoshiInteraction(state, { category: 'SURPRISE' });
      assert.ok(
        SURPRISE_ANIMATION_IDS.includes(state.currentAnimationId),
        `Expected a SURPRISE animation, got ${state.currentAnimationId}`
      );
      cycle.push(state.currentAnimationId);
    }
    assert.equal(new Set(cycle).size, 23, `Cycle ${c + 1} must contain all 23 unique surprise animations`);
    if (c > 0) {
      const prevCycle = cycles[c - 1];
      assert.notEqual(
        cycle[0],
        prevCycle[prevCycle.length - 1],
        'New cycle must not start with the last animation of the previous cycle'
      );
      assert.notEqual(
        cycle[0],
        prevCycle[0],
        'New cycle must not start with the same first animation as the previous cycle'
      );
      assert.notDeepEqual(
        cycle,
        prevCycle,
        'Reshuffled cycle must never repeat the same sequence order as the previous cycle'
      );
    }
    cycles.push(cycle);
  }
});

test('MISTAKE category pulls all 6 exclusive negative animations without repetition in each cycle and reshuffles into a distinct order every new cycle', () => {
  let state = createInitialRoshiScheduler();
  const cycles: string[][] = [];

  for (let c = 0; c < 5; c++) {
    const cycle: string[] = [];
    for (let i = 0; i < 6; i++) {
      state = nextRoshiInteraction(state, { category: 'MISTAKE' });
      assert.ok(
        MISTAKE_ANIMATION_IDS.includes(state.currentAnimationId),
        `Expected a MISTAKE animation, got ${state.currentAnimationId}`
      );
      cycle.push(state.currentAnimationId);
    }
    assert.equal(
      new Set(cycle).size,
      6,
      `Cycle ${c + 1} must show all 6 exclusive mistake animations once before any repeats`
    );
    if (c > 0) {
      const prevCycle = cycles[c - 1];
      assert.notEqual(
        cycle[0],
        prevCycle[prevCycle.length - 1],
        'Reshuffled mistake bag must not immediately repeat the last mistake animation of the previous cycle'
      );
      assert.notEqual(
        cycle[0],
        prevCycle[0],
        'Reshuffled mistake bag must not start with the same animation as the previous cycle'
      );
      assert.notDeepEqual(
        cycle,
        prevCycle,
        'Reshuffled mistake bag must produce a new order distinct from the previous cycle'
      );
    }
    cycles.push(cycle);
  }
});

test('Perverted animations use the 7 perverted dialogues in shuffle mode, and non-perverted surprise animations never swap each other’s flavorNotes while playing the 2 random phrases', () => {
  assert.deepEqual(PERVERTED_ANIMATION_IDS, ['PICARO', 'PICARO_REVISTA_SORPRESA']);
  assert.equal(PERVERTED_ROSHI_DIALOGUES.length, 7);

  let state = createInitialRoshiScheduler();
  const pervertedCycles: string[][] = [];
  let currentPervertedCycle: string[] = [];
  const seenRandomSurprisePhrases = new Set<string>();

  for (let step = 0; step < 320; step++) {
    state = nextRoshiInteraction(state, { category: 'SURPRISE' });
    const animId = state.currentAnimationId;
    const phrase = state.currentFlavorNote;

    if (animId === 'PICARO' || animId === 'PICARO_REVISTA_SORPRESA') {
      assert.ok(
        (PERVERTED_ROSHI_DIALOGUES as readonly string[]).includes(phrase),
        `Perverted animation ${animId} must use one of the 7 exclusive perverted dialogues, got: ${phrase}`
      );
      currentPervertedCycle.push(phrase);
      if (currentPervertedCycle.length === PERVERTED_ROSHI_DIALOGUES.length) {
        assert.equal(
          new Set(currentPervertedCycle).size,
          PERVERTED_ROSHI_DIALOGUES.length,
          'Each 7-dialogue perverted cycle must include all 7 dialogues without repeats'
        );
        if (pervertedCycles.length > 0) {
          const prev = pervertedCycles[pervertedCycles.length - 1];
          assert.notEqual(
            currentPervertedCycle[0],
            prev[prev.length - 1],
            'Reshuffled perverted dialogue cycle must not start with the last dialogue of the previous cycle'
          );
          assert.notDeepEqual(
            currentPervertedCycle,
            prev,
            'Reshuffled perverted dialogue cycle must not repeat the exact order of the previous cycle'
          );
        }
        pervertedCycles.push(currentPervertedCycle);
        currentPervertedCycle = [];
      }
    } else {
      // Non-perverted animation must ONLY ever show its own corresponding flavorNote OR one of the 2 SURPRISE_RANDOM_PHRASES
      const ownFlavorNote = ROSHI_SPRITE_CATALOG[animId].flavorNote;
      const isRandomPhrase = (SURPRISE_RANDOM_PHRASES as readonly string[]).includes(phrase);
      assert.ok(
        phrase === ownFlavorNote || isRandomPhrase,
        `Animation ${animId} showed "${phrase}", which is neither its own flavorNote ("${ownFlavorNote}") nor one of the 2 random surprise phrases`
      );
      if (isRandomPhrase) {
        seenRandomSurprisePhrases.add(phrase);
      }
    }
  }

  assert.ok(pervertedCycles.length >= 3, 'Should have completed at least 3 full cycles of 5 perverted dialogues');
  assert.equal(
    seenRandomSurprisePhrases.size,
    2,
    'Both random surprise phrases must appear during non-perverted surprise animations'
  );
});

test('getAcademyLevelBoundaryInfo accurately detects the start and completion lessons of Nivel Básico, Nivel Intermedio, and Nivel Avanzado', () => {
  assert.equal(
    ROSHI_LEVEL_START_DIALOGUE,
    'Si quieren ser mis discípulos y aprender las técnicas secretas de la Escuela Tortuga, la primera lección no es física... ¡es traerme una chica linda y de buen corazón!'
  );
  assert.equal(
    ROSHI_LEVEL_COMPLETE_DIALOGUE,
    'Superó por completo mis enseñanzas hace mucho tiempo... Yo ya no tengo nada más que enseñarle como maestro, solo me queda observar hasta dónde es capaz de llegar.'
  );

  // Nivel Básico: Clase 1 (start) & Clase 15 (end) -> roshi_especial_8163dd40.webm
  const basicStart = getAcademyLevelBoundaryInfo('lesson-1-tablero-turnos', 1);
  assert.equal(basicStart.levelId, 'BASICO');
  assert.equal(basicStart.isFirstLessonOfLevel, true);
  assert.equal(basicStart.isLastLessonOfLevel, false);
  assert.equal(basicStart.completionVideoUrl, LEVEL_COMPLETE_SPECIAL_VIDEO_URL);

  const basicMid = getAcademyLevelBoundaryInfo('lesson-2-libertades-atari', 1);
  assert.equal(basicMid.isFirstLessonOfLevel, false);
  assert.equal(basicMid.isLastLessonOfLevel, false);

  const basicEnd = getAcademyLevelBoundaryInfo('lesson-39-kageyama-piedras-caminan-paso-atras', 2);
  assert.equal(basicEnd.levelId, 'BASICO');
  assert.equal(basicEnd.isFirstLessonOfLevel, false);
  assert.equal(basicEnd.isLastLessonOfLevel, true);
  assert.equal(basicEnd.completionVideoUrl, '/assets/aistudio/roshi_especial_8163dd40.webm');

  // Nivel Intermedio: Clase 16 (start) & Clase 30 (end) -> final_1_2c5006f5.mp4
  const interStart = getAcademyLevelBoundaryInfo('lesson-7-forma-eficiencia', 3);
  assert.equal(interStart.levelId, 'INTERMEDIO');
  assert.equal(interStart.isFirstLessonOfLevel, true);
  assert.equal(interStart.isLastLessonOfLevel, false);

  const interEnd = getAcademyLevelBoundaryInfo('lesson-42-kageyama-regla-fundamental-tsumego-cerco', 6);
  assert.equal(interEnd.levelId, 'INTERMEDIO');
  assert.equal(interEnd.isFirstLessonOfLevel, false);
  assert.equal(interEnd.isLastLessonOfLevel, true);
  assert.equal(interEnd.completionVideoUrl, INTERMEDIATE_LEVEL_COMPLETE_SPECIAL_VIDEO_URL);
  assert.equal(interEnd.completionVideoUrl, '/assets/aistudio/final_1_2c5006f5.mp4');

  // Nivel Avanzado: Clase 31 (start) & Clase 45 (end)
  const advStart = getAcademyLevelBoundaryInfo('lesson-11-sente-gote-fuseki-joseki', 7);
  assert.equal(advStart.levelId, 'AVANZADO');
  assert.equal(advStart.isFirstLessonOfLevel, true);
  assert.equal(advStart.isLastLessonOfLevel, false);

  const advEnd = getAcademyLevelBoundaryInfo('lesson-36-ko-indirecto-doble-amenaza-maestria', 9);
  assert.equal(advEnd.levelId, 'AVANZADO');
  assert.equal(advEnd.isFirstLessonOfLevel, false);
  assert.equal(advEnd.isLastLessonOfLevel, true);
  assert.equal(advEnd.completionVideoUrl, GRADUATION_COMPLETE_SPECIAL_VIDEO_URL);
  assert.equal(ROSHI_GRADUACION_TITLE, 'Graduacion de la Escuela Tortuga');
  assert.equal(
    ROSHI_GRADUACION_DIALOGUE,
    'Llegaste a Kame House dando tus primeros pasos como aquel pequeño Goku, y hoy concluyes tu estudio dominando cada secreto del tablero hasta alcanzar el nivel de los saiyajins. Ya no tienes nada más que aprender de este viejo maestro: sal al vasto universo, enfrenta a los guerreros más fuertes y nunca dejes de superar tus propios límites.'
  );
});

test('cleanRoshiTitleText removes "Enseñanza" filler and Maestro Roshi prefixes/suffixes cleanly', () => {
  assert.equal(
    cleanRoshiTitleText('¡Excelente intuición! · Enseñanza del Maestro Roshi'),
    '¡Excelente intuición!'
  );
  assert.equal(
    cleanRoshiTitleText('¡Excelente intuición! · Enseñanza'),
    '¡Excelente intuición!'
  );
  assert.equal(
    cleanRoshiTitleText('Enseñanza del Maestro Roshi · Concepto 1'),
    'Concepto 1'
  );
  assert.equal(
    cleanRoshiTitleText('Reflexión del Maestro Roshi · Analicemos juntos'),
    'Analicemos juntos'
  );
});

test('getProgressiveTextSlice and getTypewriterProgressPct compute accurate typewriter progression', () => {
  const msg = 'Las piedras respiran por sus libertades.';
  assert.equal(getProgressiveTextSlice(msg, 0), '');
  assert.equal(getProgressiveTextSlice(msg, 3), 'Las');
  assert.equal(getProgressiveTextSlice(msg, 500), msg);

  assert.equal(getTypewriterProgressPct(msg, 0), 0);
  assert.equal(getTypewriterProgressPct(msg, 20), 50);
  assert.equal(getTypewriterProgressPct(msg, 40), 100);
  assert.equal(getTypewriterProgressPct('', 0), 100);
});

test('shouldAutoOpenSpotlightForTrigger opens spotlight when trigger changes and respects autoOpenEnabled', () => {
  assert.equal(shouldAutoOpenSpotlightForTrigger(null, 'hero-roshi-0'), true);
  assert.equal(shouldAutoOpenSpotlightForTrigger('hero-roshi-0', 'hero-roshi-0'), false);
  assert.equal(shouldAutoOpenSpotlightForTrigger('hero-roshi-0', 'hero-roshi-1'), true);
  assert.equal(shouldAutoOpenSpotlightForTrigger('play-1', 'play-2', false), false);
});

test('Maestro Roshi retro RPG voice blip (soundFX.playVoiceBlip) and mood pitch offset execute cleanly across all 20 animations', () => {
  assert.equal(isGlobalSoundEnabled(true), true);
  assert.equal(isGlobalSoundEnabled(false), false);

  playRoshiMessagePopSound(true);
  for (const id of Object.keys(ROSHI_SPRITE_CATALOG) as Array<keyof typeof ROSHI_SPRITE_CATALOG>) {
    const pitchOffset = getRoshiMoodPitchOffset(id, 'DEFAULT');
    assert.equal(typeof pitchOffset, 'number');
    playRoshiAnimationSound(id, true);
    soundFX.playVoiceBlip(pitchOffset, true);
  }
  playVoiceBlip(0, true);
  playRoshiTypingTickSound('Las', 0, true);
});

test('Perverted Roshi animations (PICARO and PICARO_REVISTA_SORPRESA) use PERVERTED_ROSHI_GIF_URLS in shuffle mode and reshuffle each cycle', () => {
  assert.equal(PERVERTED_ROSHI_RAW_GIF_LINKS.length, 6);
  assert.equal(PERVERTED_ROSHI_GIF_URLS.length, 6);
  for (const url of PERVERTED_ROSHI_GIF_URLS) {
    assert.ok(url.startsWith('https://media'), `Expected valid Giphy URL, got ${url}`);
  }

  let state = createInitialRoshiScheduler();
  const gifCycles: string[][] = [];
  let currentGifCycle: string[] = [];

  for (let step = 0; step < 260; step++) {
    state = nextRoshiInteraction(state, { category: 'SURPRISE' });
    const animId = state.currentAnimationId;
    if (animId === 'PICARO' || animId === 'PICARO_REVISTA_SORPRESA') {
      assert.ok(
        state.currentGifUrl && PERVERTED_ROSHI_GIF_URLS.includes(state.currentGifUrl),
        `Perverted animation ${animId} must select a valid GIF from PERVERTED_ROSHI_GIF_URLS`
      );
      currentGifCycle.push(state.currentGifUrl!);
      if (currentGifCycle.length === PERVERTED_ROSHI_GIF_URLS.length) {
        assert.equal(
          new Set(currentGifCycle).size,
          PERVERTED_ROSHI_GIF_URLS.length,
          'Each perverted GIF cycle must display all playable GIFs without repeats'
        );
        if (gifCycles.length > 0) {
          const prev = gifCycles[gifCycles.length - 1];
          assert.notEqual(
            currentGifCycle[0],
            prev[prev.length - 1],
            'Reshuffled perverted GIF cycle must not immediately repeat the last GIF'
          );
          assert.notDeepEqual(
            currentGifCycle,
            prev,
            'Reshuffled perverted GIF cycle must produce a fresh order'
          );
        }
        gifCycles.push(currentGifCycle);
        currentGifCycle = [];
      }
    } else {
      assert.equal(
        state.currentGifUrl,
        undefined,
        `Non-perverted animation ${animId} must not attach a perverted GIF URL`
      );
    }
  }

  assert.ok(gifCycles.length >= 3, 'Should have completed at least 3 full cycles of perverted GIFs');
});

test('Celebration GIFs include all 11 reward GIFs (including the 3 newly added GIFs for lesson completion and 4-puzzle streaks) and special video rewards shuffle without repeating consecutively', () => {
  assert.equal(CELEBRATION_RAW_GIF_LINKS.length, 11);
  assert.equal(CELEBRATION_GIF_URLS.length, 11);
  assert.ok(
    CELEBRATION_GIF_URLS.includes(
      'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExem01MDRzNDE0c3QxaWtlMnY0cXQ4dmEwdHBlYWJxNTF1M3JjYTUzciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/uhL3OYavEMDQI/giphy.gif'
    )
  );
  assert.ok(
    CELEBRATION_GIF_URLS.includes(
      'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3Q4Y29rcm9kZzc4ZDE3bHRtNmZxdjBseHNpM2x4ank3dzBqcHByZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ICjp3vhRg4McDRBkzB/giphy.gif'
    )
  );
  assert.ok(
    CELEBRATION_GIF_URLS.includes(
      'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnF2eHd3dnRidmhuN2lqaWVyamQ0ejBoNDB5aWIxdHkxbmwzczE0YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/etruPt9Iby64I1sjHo/giphy.gif'
    )
  );
  assert.ok(
    CELEBRATION_GIF_URLS.includes(
      'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzU1M21maXNiMnJscHM1Yzk3ajVmdTRqN3BwMDMwbDlvYTVueWllOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/D0vrVbItSNFAlcTBgN/giphy.gif'
    )
  );
  for (const url of CELEBRATION_GIF_URLS) {
    assert.ok(url.startsWith('https://media'), `Expected valid Giphy URL, got ${url}`);
  }
  assert.equal(ROSHI_ESPECIAL_1_VIDEO_URL, '/assets/aistudio/roshi_especial_8163dd40.webm');
  assert.equal(ROSHI_ESPECIAL_2_VIDEO_URL, '/assets/aistudio/roshi_especial_2_1e72f9a6.mp4');
  assert.equal(ROSHI_MUSICA_1_VIDEO_URL, '/assets/aistudio/musica_1_457e4489.mp4');
  assert.equal(ROSHI_MUSICA_2_VIDEO_URL, '/assets/aistudio/musica_2_8699520d.mp4');
  assert.equal(ROSHI_MUSICA_3_VIDEO_URL, '/assets/aistudio/musica_3_5b87dda8.mp4');
  assert.equal(ROSHI_MUSICA_4_VIDEO_URL, '/assets/aistudio/musica_4_e2c8550a.mp4');
  assert.equal(ROSHI_MUSICA_5_VIDEO_URL, '/assets/aistudio/musica_5_43c3d3cd.mp4');
  assert.equal(ROSHI_MUSICA_6_VIDEO_URL, '/assets/aistudio/musica_6_f2e1a78c.mp4');
  assert.equal(ROSHI_MUSICA_7_VIDEO_URL, '/assets/aistudio/musica_7_4e243810.mp4');
  assert.equal(ROSHI_MUSICA_8_VIDEO_URL, '/assets/aistudio/musica_8_c36c5f38.mp4');
  assert.equal(ROSHI_MUSICA_9_VIDEO_URL, '/assets/aistudio/musica_9_ac96b8a5.mp4');
  assert.equal(ROSHI_MUSICA_10_VIDEO_URL, '/assets/aistudio/musica_10_0f760fce.mp4');
  assert.equal(ROSHI_MUSICA_11_PART_1_VIDEO_URL, '/assets/aistudio/musica_11_parte_1_61cf36f9.mp4');
  assert.equal(ROSHI_MUSICA_11_PART_2_VIDEO_URL, '/assets/aistudio/musica_11_parte_2_cbe972a1.mp4');
  assert.deepEqual(ROSHI_MUSICA_11_VIDEO_PARTS, [
    ROSHI_MUSICA_11_PART_1_VIDEO_URL,
    ROSHI_MUSICA_11_PART_2_VIDEO_URL,
  ]);
  assert.equal(ROSHI_MUSICA_12_VIDEO_URL, '/assets/aistudio/musica_12_382a1d72.mp4');
  assert.equal(ROSHI_MUSICA_13_VIDEO_URL, '/assets/aistudio/musica_13_1568e760.mp4');
  assert.equal(ROSHI_MUSICA_14_VIDEO_URL, '/assets/aistudio/musica_14_ac365cdd.mp4');
  assert.equal(
    ROSHI_GRADUACION_PART_1_VIDEO_URL,
    '/assets/aistudio/graduacion_parte_1_b703eafe.mp4'
  );
  assert.equal(
    ROSHI_GRADUACION_PART_2_VIDEO_URL,
    '/assets/aistudio/graduacion_parte_2_44de46af.mp4'
  );
  assert.equal(
    ROSHI_GRADUACION_PART_3_VIDEO_URL,
    '/assets/aistudio/graduacion_parte_3_96163d1f.mp4'
  );
  assert.equal(
    ROSHI_GRADUACION_PART_4_VIDEO_URL,
    '/assets/aistudio/graduacion_parte_4_21b4d90c.mp4'
  );
  assert.equal(
    ROSHI_GRADUACION_PART_5_VIDEO_URL,
    '/assets/aistudio/graduacion_parte_5_064e1506.mp4'
  );
  assert.equal(
    ROSHI_GRADUACION_PART_6_VIDEO_URL,
    '/assets/aistudio/graduacion_parte_6_5f10dc5b.mp4'
  );
  assert.equal(
    ROSHI_GRADUACION_PART_7_VIDEO_URL,
    '/assets/aistudio/graduacion_parte_7_383df78b.mp4'
  );
  assert.equal(
    ROSHI_GRADUACION_PART_8_VIDEO_URL,
    '/assets/aistudio/graduacion_parte_8_783f7c1c.mp4'
  );
  assert.equal(
    ROSHI_GRADUACION_PART_9_VIDEO_URL,
    '/assets/aistudio/graduacion_parte_9_617931bd.mp4'
  );
  assert.equal(
    ROSHI_GRADUACION_PART_10_VIDEO_URL,
    '/assets/aistudio/graduacion_parte_10_b1e96e8d.mp4'
  );
  assert.equal(
    ROSHI_GRADUACION_PART_11_VIDEO_URL,
    '/assets/aistudio/graduacion_parte_11_119ec8a3.mp4'
  );
  assert.equal(
    ROSHI_GRADUACION_PART_12_VIDEO_URL,
    '/assets/aistudio/graduacion_parte_12_77f12f23.mp4'
  );
  assert.equal(
    ROSHI_GRADUACION_PART_13_VIDEO_URL,
    '/assets/aistudio/graduacion_parte_13_d71f4197.mp4'
  );
  assert.equal(
    ROSHI_GRADUACION_PART_14_VIDEO_URL,
    '/assets/aistudio/graduacion_parte_14_23559dbc.mp4'
  );
  assert.equal(
    ROSHI_GRADUACION_PART_15_VIDEO_URL,
    '/assets/aistudio/graduacion_parte_15_93ba3104.mp4'
  );
  assert.equal(
    ROSHI_GRADUACION_PART_16_VIDEO_URL,
    '/assets/aistudio/graduacion_parte_16_52c0d894.mp4'
  );
  assert.deepEqual(ROSHI_GRADUACION_VIDEO_PARTS, [
    ROSHI_GRADUACION_PART_1_VIDEO_URL,
    ROSHI_GRADUACION_PART_2_VIDEO_URL,
    ROSHI_GRADUACION_PART_3_VIDEO_URL,
    ROSHI_GRADUACION_PART_4_VIDEO_URL,
    ROSHI_GRADUACION_PART_5_VIDEO_URL,
    ROSHI_GRADUACION_PART_6_VIDEO_URL,
    ROSHI_GRADUACION_PART_7_VIDEO_URL,
    ROSHI_GRADUACION_PART_8_VIDEO_URL,
    ROSHI_GRADUACION_PART_9_VIDEO_URL,
    ROSHI_GRADUACION_PART_10_VIDEO_URL,
    ROSHI_GRADUACION_PART_11_VIDEO_URL,
    ROSHI_GRADUACION_PART_12_VIDEO_URL,
    ROSHI_GRADUACION_PART_13_VIDEO_URL,
    ROSHI_GRADUACION_PART_14_VIDEO_URL,
    ROSHI_GRADUACION_PART_15_VIDEO_URL,
    ROSHI_GRADUACION_PART_16_VIDEO_URL,
  ]);
  assert.equal(LEVEL_COMPLETE_SPECIAL_VIDEO_URL, ROSHI_ESPECIAL_1_VIDEO_URL);
  assert.deepEqual(ADVANCED_LESSON_SPECIAL_VIDEOS, [
    ROSHI_MUSICA_1_VIDEO_URL,
    ROSHI_MUSICA_2_VIDEO_URL,
    ROSHI_MUSICA_3_VIDEO_URL,
    ROSHI_MUSICA_4_VIDEO_URL,
    ROSHI_MUSICA_5_VIDEO_URL,
    ROSHI_MUSICA_6_VIDEO_URL,
    ROSHI_MUSICA_7_VIDEO_URL,
    ROSHI_MUSICA_8_VIDEO_URL,
    ROSHI_MUSICA_9_VIDEO_URL,
    ROSHI_MUSICA_10_VIDEO_URL,
    ROSHI_MUSICA_11_VIDEO_URL,
    ROSHI_MUSICA_12_VIDEO_URL,
    ROSHI_MUSICA_13_VIDEO_URL,
    ROSHI_MUSICA_14_VIDEO_URL,
    ROSHI_GRADUACION_VIDEO_URL,
  ]);
  assert.equal(getAdvancedLessonSpecialVideoUrl(31), ROSHI_MUSICA_1_VIDEO_URL);
  assert.equal(getAdvancedLessonSpecialVideoUrl(32), ROSHI_MUSICA_2_VIDEO_URL);
  assert.equal(getAdvancedLessonSpecialVideoUrl(33), ROSHI_MUSICA_3_VIDEO_URL);
  assert.equal(getAdvancedLessonSpecialVideoUrl(34), ROSHI_MUSICA_4_VIDEO_URL);
  assert.equal(getAdvancedLessonSpecialVideoUrl(35), ROSHI_MUSICA_5_VIDEO_URL);
  assert.equal(getAdvancedLessonSpecialVideoUrl(36), ROSHI_MUSICA_6_VIDEO_URL);
  assert.equal(getAdvancedLessonSpecialVideoUrl(37), ROSHI_MUSICA_7_VIDEO_URL);
  assert.equal(getAdvancedLessonSpecialVideoUrl(38), ROSHI_MUSICA_8_VIDEO_URL);
  assert.equal(getAdvancedLessonSpecialVideoUrl(39), ROSHI_MUSICA_9_VIDEO_URL);
  assert.equal(getAdvancedLessonSpecialVideoUrl(40), ROSHI_MUSICA_10_VIDEO_URL);
  assert.equal(getAdvancedLessonSpecialVideoUrl(41), ROSHI_MUSICA_11_VIDEO_URL);
  assert.equal(getAdvancedLessonSpecialVideoUrl(42), ROSHI_MUSICA_12_VIDEO_URL);
  assert.equal(getAdvancedLessonSpecialVideoUrl(43), ROSHI_MUSICA_13_VIDEO_URL);
  assert.equal(getAdvancedLessonSpecialVideoUrl(44), ROSHI_MUSICA_14_VIDEO_URL);
  assert.equal(getAdvancedLessonSpecialVideoUrl(45), ROSHI_GRADUACION_VIDEO_URL);
  // Verify Clase 40 resolves to 1 video, Clase 41 resolves to 2 parts, and Clase 45 (Graduation) resolves to all graduation parts
  assert.deepEqual(resolveSpecialVideoSequence(getAdvancedLessonSpecialVideoUrl(40)), [
    ROSHI_MUSICA_10_VIDEO_URL,
  ]);
  assert.deepEqual(resolveSpecialVideoSequence(getAdvancedLessonSpecialVideoUrl(41)), [
    ROSHI_MUSICA_11_PART_1_VIDEO_URL,
    ROSHI_MUSICA_11_PART_2_VIDEO_URL,
  ]);
  assert.deepEqual(resolveSpecialVideoSequence(getAdvancedLessonSpecialVideoUrl(45)), [
    ROSHI_GRADUACION_PART_1_VIDEO_URL,
    ROSHI_GRADUACION_PART_2_VIDEO_URL,
    ROSHI_GRADUACION_PART_3_VIDEO_URL,
    ROSHI_GRADUACION_PART_4_VIDEO_URL,
    ROSHI_GRADUACION_PART_5_VIDEO_URL,
    ROSHI_GRADUACION_PART_6_VIDEO_URL,
    ROSHI_GRADUACION_PART_7_VIDEO_URL,
    ROSHI_GRADUACION_PART_8_VIDEO_URL,
    ROSHI_GRADUACION_PART_9_VIDEO_URL,
    ROSHI_GRADUACION_PART_10_VIDEO_URL,
    ROSHI_GRADUACION_PART_11_VIDEO_URL,
    ROSHI_GRADUACION_PART_12_VIDEO_URL,
    ROSHI_GRADUACION_PART_13_VIDEO_URL,
    ROSHI_GRADUACION_PART_14_VIDEO_URL,
    ROSHI_GRADUACION_PART_15_VIDEO_URL,
    ROSHI_GRADUACION_PART_16_VIDEO_URL,
  ]);
  // Graduation reward is exclusive to Graduation and never included in Practice win videos
  assert.ok(!PRACTICE_WIN_SPECIAL_VIDEOS.includes(ROSHI_GRADUACION_VIDEO_URL));
  assert.equal(
    ROSHI_GOKU_NO_ME_PEGUES_VIDEO_URL,
    '/assets/aistudio/goku_no_me_pegues_c39ac253.mp4'
  );
  assert.equal(
    ROSHI_GOKU_NO_ME_PEGUES_DIALOGUE,
    'Los saiyajins conquistan planetas; pero sus esposas conquistan su volunt... espera! que?'
  );
  assert.deepEqual(PRACTICE_WIN_SPECIAL_VIDEOS, [
    ROSHI_ESPECIAL_1_VIDEO_URL,
    ROSHI_ESPECIAL_2_VIDEO_URL,
    ROSHI_MUSICA_1_VIDEO_URL,
    ROSHI_MUSICA_2_VIDEO_URL,
    ROSHI_MUSICA_3_VIDEO_URL,
    ROSHI_MUSICA_4_VIDEO_URL,
    ROSHI_MUSICA_5_VIDEO_URL,
    ROSHI_MUSICA_6_VIDEO_URL,
    ROSHI_MUSICA_7_VIDEO_URL,
    ROSHI_MUSICA_8_VIDEO_URL,
    ROSHI_MUSICA_9_VIDEO_URL,
    ROSHI_MUSICA_10_VIDEO_URL,
    ROSHI_MUSICA_11_VIDEO_URL,
    ROSHI_MUSICA_12_VIDEO_URL,
    ROSHI_MUSICA_13_VIDEO_URL,
    ROSHI_MUSICA_14_VIDEO_URL,
    ROSHI_GOKU_NO_ME_PEGUES_VIDEO_URL,
  ]);
  assert.equal(PUZZLE_CELEBRATION_MILESTONE_COUNT, 4);

  let state = createInitialRoshiScheduler();
  const cycles: string[][] = [];

  for (let c = 0; c < 4; c++) {
    const cycle: string[] = [];
    for (let i = 0; i < CELEBRATION_GIF_URLS.length; i++) {
      const res = nextCelebrationGif(state);
      state = res.nextState;
      assert.ok(CELEBRATION_GIF_URLS.includes(res.gifUrl));
      cycle.push(res.gifUrl);
    }
    assert.equal(
      new Set(cycle).size,
      CELEBRATION_GIF_URLS.length,
      `Celebration cycle ${c + 1} must include all ${CELEBRATION_GIF_URLS.length} GIFs without repetition`
    );
    if (c > 0) {
      const prev = cycles[c - 1];
      assert.notEqual(
        cycle[0],
        prev[prev.length - 1],
        'New celebration GIF cycle must not start with the last GIF of the previous cycle'
      );
      assert.notDeepEqual(
        cycle,
        prev,
        'New celebration GIF cycle must reshuffle into a new order'
      );
    }
    cycles.push(cycle);
  }

  // Verify daily Practice win special video shuffle:
  // 1. Always starts each day with ROSHI_ESPECIAL_1_VIDEO_URL ("roshi especial.webm") and its fixed dialogue.
  // 2. Shuffles the remaining 16 videos (including "goku no me pegues.mp4") without repetition during the day.
  // 3. "goku no me pegues.mp4" always uses its exclusively assigned dialogue (`ROSHI_GOKU_NO_ME_PEGUES_DIALOGUE`).
  // 4. Reshuffles into a new distinct order on the next calendar day while starting again with ROSHI_ESPECIAL_1_VIDEO_URL.
  assert.equal(PRACTICE_WIN_FIRST_DAILY_VIDEO_URL, ROSHI_ESPECIAL_1_VIDEO_URL);
  assert.equal(PRACTICE_WIN_REMAINING_SPECIAL_VIDEOS.length, 16);
  assert.ok(!PRACTICE_WIN_REMAINING_SPECIAL_VIDEOS.includes(ROSHI_ESPECIAL_1_VIDEO_URL));
  assert.ok(PRACTICE_WIN_REMAINING_SPECIAL_VIDEOS.includes(ROSHI_GOKU_NO_ME_PEGUES_VIDEO_URL));
  assert.equal(CELEBRATION_REWARD_CHARACTER_DIALOGUES.length, 20);
  assert.equal(PRACTICE_WIN_SHUFFLE_DIALOGUES.length, 20);

  let dailyState = createInitialRoshiScheduler(undefined, '2026-11-03');
  const dayOrders: string[][] = [];
  for (let d = 0; d < 3; d++) {
    const dateKey = `2026-11-0${3 + d}`;
    const videoCycle: string[] = [];
    const shuffledCharacterDialogues: string[] = [];
    for (let i = 0; i < PRACTICE_WIN_SPECIAL_VIDEOS.length; i++) {
      const res = nextPracticeWinSpecialVideo(dailyState, undefined, dateKey);
      dailyState = res.nextState;
      assert.ok(PRACTICE_WIN_SPECIAL_VIDEOS.includes(res.videoUrl));
      if (i === 0) {
        assert.equal(
          res.videoUrl,
          ROSHI_ESPECIAL_1_VIDEO_URL,
          `Day ${dateKey} must always start with "roshi especial.webm"`
        );
        assert.equal(
          res.dialogue,
          ROSHI_ESPECIAL_1_FIXED_DIALOGUE,
          `"roshi especial.webm" must always use its fixed dialogue`
        );
      } else if (res.videoUrl === ROSHI_GOKU_NO_ME_PEGUES_VIDEO_URL) {
        assert.equal(
          res.dialogue,
          ROSHI_GOKU_NO_ME_PEGUES_DIALOGUE,
          '"goku no me pegues.mp4" must always use its exclusive fixed dialogue'
        );
      } else {
        assert.notEqual(
          res.dialogue,
          ROSHI_GOKU_NO_ME_PEGUES_DIALOGUE,
          'No other video may use the exclusive dialogue of "goku no me pegues.mp4"'
        );
        assert.ok(
          PRACTICE_WIN_SHUFFLE_DIALOGUES.includes(res.dialogue),
          'Remaining Practice Win rewards must use a shuffled dialogue from the 20 celebration dialogues'
        );
        const meta = resolveCharacterRewardDialogueMeta(res.dialogue);
        assert.ok(meta, 'Character metadata must resolve for every celebration dialogue');
        shuffledCharacterDialogues.push(res.dialogue);
      }
      videoCycle.push(res.videoUrl);
    }
    assert.equal(
      new Set(videoCycle).size,
      PRACTICE_WIN_SPECIAL_VIDEOS.length,
      `Day ${dateKey} must play all 17 special videos without repetition`
    );
    assert.equal(
      new Set(shuffledCharacterDialogues).size,
      15,
      `Day ${dateKey} must assign 15 distinct celebration dialogues to the 15 non-fixed remaining videos without repetition during the day`
    );
    if (d > 0) {
      assert.notDeepEqual(
        videoCycle.slice(1),
        dayOrders[d - 1].slice(1),
        'Next day must reshuffle the remaining 16 videos into a fresh order'
      );
    }
    dayOrders.push(videoCycle);
  }

  // Also verify mid-day rollover: if a player only wins 3 games on Day A, then plays on Day B,
  // Day B immediately resets and starts with ROSHI_ESPECIAL_1_VIDEO_URL and its fixed dialogue.
  let partialDayState = createInitialRoshiScheduler(undefined, '2026-11-10');
  const firstWinDayA = nextPracticeWinSpecialVideo(partialDayState, undefined, '2026-11-10');
  partialDayState = firstWinDayA.nextState;
  assert.equal(firstWinDayA.videoUrl, ROSHI_ESPECIAL_1_VIDEO_URL);
  const secondWinDayA = nextPracticeWinSpecialVideo(partialDayState, undefined, '2026-11-10');
  partialDayState = secondWinDayA.nextState;
  assert.notEqual(secondWinDayA.videoUrl, ROSHI_ESPECIAL_1_VIDEO_URL);

  // Next day ('2026-11-11') starts again with ROSHI_ESPECIAL_1_VIDEO_URL
  const firstWinDayB = nextPracticeWinSpecialVideo(partialDayState, undefined, '2026-11-11');
  assert.equal(firstWinDayB.videoUrl, ROSHI_ESPECIAL_1_VIDEO_URL);
  assert.equal(firstWinDayB.dialogue, ROSHI_ESPECIAL_1_FIXED_DIALOGUE);
});

test('Academy Roshi dialogues shuffle through all 4 Turtle School quotes and reshuffle into a new order on each cycle', () => {
  assert.equal(ACADEMY_ROSHI_SHUFFLE_DIALOGUES.length, 4);
  let state = createInitialRoshiScheduler();
  const cycles: string[][] = [];

  for (let c = 0; c < 4; c++) {
    const cycle: string[] = [];
    for (let i = 0; i < ACADEMY_ROSHI_SHUFFLE_DIALOGUES.length; i++) {
      const res = nextAcademyRoshiDialogue(state);
      state = res.nextState;
      assert.ok(ACADEMY_ROSHI_SHUFFLE_DIALOGUES.includes(res.dialogue));
      cycle.push(res.dialogue);
    }
    assert.equal(
      new Set(cycle).size,
      ACADEMY_ROSHI_SHUFFLE_DIALOGUES.length,
      `Academy dialogue cycle ${c + 1} must include all 4 quotes without repetition`
    );
    if (c > 0) {
      const prev = cycles[c - 1];
      assert.notEqual(
        cycle[0],
        prev[prev.length - 1],
        'New Academy dialogue cycle must not start with the last quote of the previous cycle'
      );
    }
    cycles.push(cycle);
  }
});

test('Two consecutive mistakes trigger the special video reward every time, while a correct move resets the streak and conversational messages preserve it', () => {
  assert.equal(ROSHI_TWO_MISTAKES_VIDEO_URL, '/assets/aistudio/estupido_de0d2571.mp4');
  assert.equal(ROSHI_TWO_MISTAKES_TITLE, 'Jugada incorrecta');
  assert.equal(ROSHI_PRACTICE_LOSS_TITLE, 'Guerrero de Clase Baja');
  assert.equal(
    ROSHI_TWO_MISTAKES_DIALOGUE,
    'Eres una verguenza para los saiyajins! un insecto como tu no merece pertenecer a esta academia'
  );
  assert.ok(!ROSHI_TWO_MISTAKES_DIALOGUE.includes('sayajin'));

  let state = createInitialRoshiScheduler();
  assert.equal(state.consecutiveMistakes, 0);
  assert.equal(state.triggeredTwoMistakesVideo, false);

  // 1st mistake -> count = 1, does not trigger video yet
  state = nextRoshiInteraction(state, { category: 'MISTAKE' });
  assert.equal(state.consecutiveMistakes, 1);
  assert.equal(state.triggeredTwoMistakesVideo, false);

  // Conversational interaction (e.g., hint/reset) -> preserves consecutiveMistakes = 1
  state = nextRoshiInteraction(state, { category: 'CONVERSATION' });
  assert.equal(state.consecutiveMistakes, 1);
  assert.equal(state.triggeredTwoMistakesVideo, false);

  // 2nd consecutive mistake -> triggers video and resets consecutiveMistakes to 0 for the next pair
  state = nextRoshiInteraction(state, { category: 'MISTAKE' });
  assert.equal(state.triggeredTwoMistakesVideo, true);
  assert.equal(state.consecutiveMistakes, 0);

  // Next single mistake -> count = 1, video does not fire on 3rd mistake
  state = nextRoshiInteraction(state, { category: 'MISTAKE' });
  assert.equal(state.consecutiveMistakes, 1);
  assert.equal(state.triggeredTwoMistakesVideo, false);

  // Correct move (SURPRISE) -> resets consecutiveMistakes back to 0
  state = nextRoshiInteraction(state, { category: 'SURPRISE' });
  assert.equal(state.consecutiveMistakes, 0);
  assert.equal(state.triggeredTwoMistakesVideo, false);

  // Another pair of 2 consecutive mistakes -> triggers video again
  state = nextRoshiInteraction(state, { category: 'MISTAKE' });
  assert.equal(state.consecutiveMistakes, 1);
  assert.equal(state.triggeredTwoMistakesVideo, false);

  state = nextRoshiInteraction(state, { category: 'MISTAKE' });
  assert.equal(state.triggeredTwoMistakesVideo, true);
  assert.equal(state.consecutiveMistakes, 0);

  // Verify the "Borrar progreso local" special video reward constants
  assert.equal(ROSHI_RESET_PROGRESS_VIDEO_URL, '/assets/aistudio/rendirse_9bf215da.mp4');
  assert.equal(ROSHI_RESET_PROGRESS_TITLE, 'Intento de borrado');
  assert.equal(
    ROSHI_RESET_PROGRESS_DIALOGUE,
    'Asi que decidiste tomar el camino facil, ante la adversidad decidiste permanecer como un guerrero de clase baja'
  );
});

test('Daily Mistake/Loss reward dialogue shuffle always starts each day with ROSHI_TWO_MISTAKES_DIALOGUE followed by the 16 character mistake dialogues in shuffle mode', () => {
  assert.equal(MISTAKE_REWARD_CHARACTER_DIALOGUES.length, 16);
  assert.equal(MISTAKE_REWARD_SHUFFLE_DIALOGUES.length, 16);
  assert.equal(ROSHI_TWO_MISTAKES_FIRST_DAILY_DIALOGUE, ROSHI_TWO_MISTAKES_DIALOGUE);

  let mistakeDayState = createInitialRoshiScheduler(undefined, '2026-11-03');
  const mistakeDayOrders: string[][] = [];
  const totalInDay: number = 1 + MISTAKE_REWARD_SHUFFLE_DIALOGUES.length;

  for (let d = 0; d < 3; d++) {
    const dateKey = `2026-11-0${3 + d}`;
    const dayDialogues: string[] = [];
    for (let i = 0; i < totalInDay; i++) {
      const res = nextMistakeRewardDialogue(mistakeDayState, undefined, dateKey);
      mistakeDayState = res.nextState;
      if (i === 0) {
        assert.equal(
          res.dialogue,
          ROSHI_TWO_MISTAKES_FIRST_DAILY_DIALOGUE,
          `Day ${dateKey} must always start its Mistake reward dialogues with ROSHI_TWO_MISTAKES_DIALOGUE`
        );
      } else {
        assert.ok(
          MISTAKE_REWARD_SHUFFLE_DIALOGUES.includes(res.dialogue),
          'Subsequent Mistake rewards must pull from the 16 character mistake dialogues'
        );
        const meta = resolveCharacterRewardDialogueMeta(res.dialogue);
        assert.ok(meta, 'Character metadata must resolve for every mistake dialogue');
      }
      dayDialogues.push(res.dialogue);
    }
    assert.equal(
      new Set(dayDialogues).size,
      totalInDay,
      `Day ${dateKey} must play the initial dialogue plus all 16 character mistake dialogues without repetition`
    );
    if (d > 0) {
      assert.notDeepEqual(
        dayDialogues.slice(1),
        mistakeDayOrders[d - 1].slice(1),
        'Next day must reshuffle the 16 character mistake dialogues into a fresh order'
      );
    }
    mistakeDayOrders.push(dayDialogues);
  }
});

test('Progressive XP curve requires strictly increasing XP spans per level, triggers Gohan title promotion video starting from Aprendiz, and allows reaching the final level by completing lessons and advancing in catalog puzzles', () => {
  assert.equal(ROSHI_TITLE_PROMOTION_VIDEO_URL, '/assets/aistudio/gohan_grito_2f2eb500.mp4');
  assert.equal(STUDENT_LEVEL_TIERS.length, 7);

  // Verify each tier requires progressively more XP than the previous tier
  let prevDelta = 0;
  for (let i = 0; i < STUDENT_LEVEL_TIERS.length; i++) {
    const tier = STUDENT_LEVEL_TIERS[i];
    const delta = tier.max - tier.min;
    assert.ok(
      delta > prevDelta,
      `Tier ${tier.title} (${tier.min}-${tier.max}, delta=${delta}) must require more XP than previous tier (prevDelta=${prevDelta})`
    );
    prevDelta = delta;
  }

  // Verify that completing all 45 lessons + advancing through ~50% of catalog puzzles (with hints) reaches the final tier (Maestro en formación)
  const totalLessonsXp = LESSONS_CATALOG.reduce((sum, l) => sum + (l.xpReward ?? 20), 0);
  const halfCatalogPuzzlesXpWithHints = Math.floor(PUZZLES_CATALOG.length * 0.5) * 5;
  const combinedXp = totalLessonsXp + halfCatalogPuzzlesXpWithHints;
  const finalTier = STUDENT_LEVEL_TIERS[STUDENT_LEVEL_TIERS.length - 1];
  assert.ok(
    combinedXp >= finalTier.min,
    `Completing all 45 lessons (${totalLessonsXp} XP) + half of catalog puzzles (${halfCatalogPuzzlesXpWithHints} XP) = ${combinedXp} XP must be >= final tier threshold (${finalTier.min} XP)`
  );
  assert.equal(getStudentLevelFromXp(combinedXp).title, 'Maestro en formación');

  // Starting in Novato (0 to 49 XP) does not trigger promotion
  assert.equal(getStudentLevelFromXp(0).title, 'Novato');
  assert.equal(detectStudentTitlePromotion(0, 40), null);

  // Ascending from Novato to Aprendiz (at 50 XP) triggers promotion with gohan_grito_2f2eb500.mp4 and mentions Aprendiz
  const promoAprendiz = detectStudentTitlePromotion(40, 50);
  assert.ok(promoAprendiz);
  assert.equal(promoAprendiz.previousTier.title, 'Novato');
  assert.equal(promoAprendiz.newTier.title, 'Aprendiz');
  const rewardAprendiz = getTitlePromotionSpecialReward(
    promoAprendiz.newTier.title,
    promoAprendiz.newTier.rankLabel
  );
  assert.equal(rewardAprendiz.videoUrl, '/assets/aistudio/gohan_grito_2f2eb500.mp4');
  assert.ok(rewardAprendiz.congratsTitle.includes('Aprendiz'));
  assert.ok(rewardAprendiz.specialLevelDialogue.includes('Aprendiz'));

  // Subsequent ascensions (Explorador, Estratega, Táctico, Jugador avanzado, Maestro en formación) all trigger cleanly
  const expectedPromotions: Array<[number, number, string]> = [
    [130, 145, 'Explorador'],
    [270, 290, 'Estratega'],
    [460, 480, 'Táctico'],
    [710, 730, 'Jugador avanzado'],
    [1030, 1050, 'Maestro en formación'],
  ];

  for (const [fromXp, toXp, expectedTitle] of expectedPromotions) {
    const promo = detectStudentTitlePromotion(fromXp, toXp);
    assert.ok(promo, `Expected promotion when XP moves from ${fromXp} to ${toXp}`);
    assert.equal(promo.newTier.title, expectedTitle);
    const reward = getTitlePromotionSpecialReward(promo.newTier.title, promo.newTier.rankLabel);
    assert.equal(reward.videoUrl, '/assets/aistudio/gohan_grito_2f2eb500.mp4');
    assert.ok(reward.congratsTitle.includes(expectedTitle));
    assert.ok(reward.specialLevelDialogue.includes(expectedTitle));
  }
});

test('DRAGON_BALL parallax theme is locked by default (60 Jade) and stacks layers in exact front-to-back order over fondo_oscuro', () => {
  assert.ok(!DEFAULT_UNLOCKED_APP_THEMES.includes('DRAGON_BALL'));
  const dbTheme = APP_THEMES_CATALOG.find((t) => t.id === 'DRAGON_BALL');
  assert.ok(dbTheme);
  assert.equal(dbTheme.jadeCost, 60);
  assert.equal(dbTheme.requiresJadeUnlock, true);
  assert.equal(dbTheme.isParallax, true);
  assert.equal(DRAGON_BALL_PARALLAX_BASE_BG, '/assets/aistudio/fondo_oscuro_19de2dc7.png');
  assert.equal(DRAGON_BALL_PARALLAX_LAYERS.length, 9);

  // Verify strict back-to-front layer order for Parallax 1: 6 -> 5 -> 4 -> f3 -> f2 -> 3 -> 2 -> f1 -> 1
  const expectedLayers: Array<{ num: number; z: number; src: string }> = [
    { num: 6, z: 1, src: '/assets/aistudio/6_02206d1a.webp' },
    { num: 5, z: 2, src: '/assets/aistudio/5_42f26437.png' },
    { num: 4, z: 3, src: '/assets/aistudio/4_4e3d3323.webp' },
    { num: 33, z: 4, src: '/assets/aistudio/f3_292b71d1.png' },
    { num: 32, z: 5, src: '/assets/aistudio/f2_4ed39e55.png' },
    { num: 3, z: 6, src: '/assets/aistudio/3_d2074f42.webp' },
    { num: 2, z: 7, src: '/assets/aistudio/2_6f49d42c.png' },
    { num: 31, z: 8, src: '/assets/aistudio/f1_df724884.png' },
    { num: 1, z: 9, src: '/assets/aistudio/1_74c824e2.png' },
  ];

  DRAGON_BALL_PARALLAX_LAYERS.forEach((layer, idx) => {
    const exp = expectedLayers[idx];
    assert.equal(layer.layerNumber, exp.num);
    assert.equal(layer.zIndex, exp.z);
    assert.equal(layer.src, exp.src);
  });

  // Verify Group 2 (HOY & PERFIL) visibility rule and layers
  assert.equal(isDragonBallHoyOrProfileTab('HOME', false), true);
  assert.equal(isDragonBallHoyOrProfileTab('PROFILE', false), true);
  assert.equal(isDragonBallHoyOrProfileTab('LEARN', false), false);
  assert.equal(isDragonBallHoyOrProfileTab('PUZZLES', false), false);
  assert.equal(isDragonBallHoyOrProfileTab('PLAY', false), false);
  assert.equal(isDragonBallHoyOrProfileTab('HOME', true), false);

  assert.equal(DRAGON_BALL_HOY_PROFILE_BASE_BG, '/assets/aistudio/fondo_ca47cea4.webp');
  assert.equal(DRAGON_BALL_HOY_PROFILE_PARALLAX_LAYERS.length, 8);

  const shenlongLayer = DRAGON_BALL_HOY_PROFILE_PARALLAX_LAYERS.find((l) => l.layerNumber === 5);
  assert.ok(shenlongLayer);
  assert.equal(shenlongLayer.src, '/assets/aistudio/5_a7530eb6.webp');
  assert.equal(shenlongLayer.scrollSpeedX ?? 0, 0); // Shenlong moves strictly up-and-down

  const cloudsSyncLayer = DRAGON_BALL_HOY_PROFILE_PARALLAX_LAYERS.find((l) => l.layerNumber === 3);
  assert.ok(cloudsSyncLayer);
  assert.equal(cloudsSyncLayer.src, '/assets/aistudio/3_bb43a599.webp');
  assert.equal(cloudsSyncLayer.syncWithBaseBg, true); // Synchronized with base background

  const roshiLayer = DRAGON_BALL_HOY_PROFILE_PARALLAX_LAYERS.find((l) => l.layerNumber === 4);
  const bulmaLayer = DRAGON_BALL_HOY_PROFILE_PARALLAX_LAYERS.find((l) => l.layerNumber === 2);
  const gokuLayer = DRAGON_BALL_HOY_PROFILE_PARALLAX_LAYERS.find((l) => l.layerNumber === 1);
  assert.ok(roshiLayer && bulmaLayer && gokuLayer);
  assert.equal(roshiLayer.src, '/assets/aistudio/roshi_1b1537ff.png');
  assert.equal(bulmaLayer.src, '/assets/aistudio/bulma_0745a655.png');
  assert.equal(gokuLayer.src, '/assets/aistudio/goku_5ec46cd4.png');
  // Verify diagonal flight (both X and Y speed non-zero) for Goku, Bulma, and Roshi
  assert.ok(Math.abs(roshiLayer.scrollSpeedX ?? 0) > 0 && Math.abs(roshiLayer.scrollSpeed) > 0);
  assert.ok(Math.abs(bulmaLayer.scrollSpeedX ?? 0) > 0 && Math.abs(bulmaLayer.scrollSpeed) > 0);
  assert.ok(Math.abs(gokuLayer.scrollSpeedX ?? 0) > 0 && Math.abs(gokuLayer.scrollSpeed) > 0);
  // Verify relative size hierarchy from numbered references: Goku < Bulma < Roshi
  assert.ok(
    (gokuLayer.customBounds?.widthPct ?? 0) < (bulmaLayer.customBounds?.widthPct ?? 0) &&
      (bulmaLayer.customBounds?.widthPct ?? 0) < (roshiLayer.customBounds?.widthPct ?? 0)
  );
});




