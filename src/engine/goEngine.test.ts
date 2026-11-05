import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createGameState,
  getGroupAt,
  validateAndPlayMove,
  playPass,
  playResign,
  undoLastMove,
  calculateScore,
} from './goEngine';
import { PUZZLES_CATALOG, validateAllPuzzlesWithEngine } from '../content/puzzlesData';

test('1. Liberties of single stones: center (4), edge (3), corner (2)', () => {
  const state = createGameState({
    size: 9,
    initialStones: [
      { x: 4, y: 4, color: 'BLACK' }, // center E5
      { x: 4, y: 0, color: 'WHITE' }, // top edge E9
      { x: 0, y: 0, color: 'BLACK' }, // top-left corner A9
    ],
  });

  const centerGroup = getGroupAt(state.board, { x: 4, y: 4 });
  const edgeGroup = getGroupAt(state.board, { x: 4, y: 0 });
  const cornerGroup = getGroupAt(state.board, { x: 0, y: 0 });

  assert.equal(centerGroup?.liberties.length, 4);
  assert.equal(edgeGroup?.liberties.length, 3);
  assert.equal(cornerGroup?.liberties.length, 2);
});

test('2. Connected groups share liberties without duplicating; diagonals do not connect', () => {
  const state = createGameState({
    size: 9,
    initialStones: [
      { x: 4, y: 4, color: 'BLACK' },
      { x: 5, y: 4, color: 'BLACK' },
      { x: 6, y: 5, color: 'BLACK' }, // diagonal to (5,4)
    ],
  });

  const horizontalPair = getGroupAt(state.board, { x: 4, y: 4 });
  const diagonalStone = getGroupAt(state.board, { x: 6, y: 5 });

  assert.equal(horizontalPair?.stones.length, 2);
  assert.equal(horizontalPair?.liberties.length, 6);
  assert.equal(diagonalStone?.stones.length, 1);
  assert.equal(diagonalStone?.liberties.length, 4);
});

test('3. Capture a single stone and capture a group of multiple stones', () => {
  // Single stone capture
  const singleState = createGameState({
    size: 9,
    initialStones: [
      { x: 4, y: 4, color: 'WHITE' },
      { x: 4, y: 3, color: 'BLACK' },
      { x: 3, y: 4, color: 'BLACK' },
      { x: 5, y: 4, color: 'BLACK' },
    ],
    startingTurn: 'BLACK',
  });

  const singleRes = validateAndPlayMove(singleState, { x: 4, y: 5 });
  assert.equal(singleRes.legal, true);
  assert.equal(singleRes.capturedStones?.length, 1);
  assert.equal(singleRes.nextState?.board[4][4], 'EMPTY');
  assert.equal(singleRes.nextState?.captures.BLACK, 1);

  // Multi-stone group capture
  const multiState = createGameState({
    size: 9,
    initialStones: [
      { x: 3, y: 4, color: 'WHITE' },
      { x: 4, y: 4, color: 'WHITE' },
      { x: 3, y: 3, color: 'BLACK' },
      { x: 4, y: 3, color: 'BLACK' },
      { x: 2, y: 4, color: 'BLACK' },
      { x: 5, y: 4, color: 'BLACK' },
      { x: 3, y: 5, color: 'BLACK' },
    ],
    startingTurn: 'BLACK',
  });

  const multiRes = validateAndPlayMove(multiState, { x: 4, y: 5 });
  assert.equal(multiRes.legal, true);
  assert.equal(multiRes.capturedStones?.length, 2);
  assert.equal(multiRes.nextState?.board[4][3], 'EMPTY');
  assert.equal(multiRes.nextState?.board[4][4], 'EMPTY');
  assert.equal(multiRes.nextState?.captures.BLACK, 2);
});

test('4. Simultaneous capture of multiple rival groups', () => {
  const state = createGameState({
    size: 9,
    initialStones: [
      // White stone 1 at (3,4) with only liberty at (4,4)
      { x: 3, y: 4, color: 'WHITE' },
      { x: 3, y: 3, color: 'BLACK' },
      { x: 2, y: 4, color: 'BLACK' },
      { x: 3, y: 5, color: 'BLACK' },
      // White stone 2 at (5,4) with only liberty at (4,4)
      { x: 5, y: 4, color: 'WHITE' },
      { x: 5, y: 3, color: 'BLACK' },
      { x: 6, y: 4, color: 'BLACK' },
      { x: 5, y: 5, color: 'BLACK' },
    ],
    startingTurn: 'BLACK',
  });

  const res = validateAndPlayMove(state, { x: 4, y: 4 });
  assert.equal(res.legal, true);
  assert.equal(res.capturedStones?.length, 2);
  assert.equal(res.nextState?.board[4][3], 'EMPTY');
  assert.equal(res.nextState?.board[4][5], 'EMPTY');
  assert.equal(res.nextState?.captures.BLACK, 2);
});

test('5. Rejection of move on an occupied intersection', () => {
  const state = createGameState({
    size: 9,
    initialStones: [{ x: 4, y: 4, color: 'BLACK' }],
    startingTurn: 'WHITE',
  });

  const res = validateAndPlayMove(state, { x: 4, y: 4 });
  assert.equal(res.legal, false);
  assert.equal(res.reason, 'OCCUPIED');
});

test('6. Rejection of suicide and acceptance of apparent suicide when capturing', () => {
  // Pure suicide: White plays inside Black eye at (4,4) where Black has external liberties
  const suicideState = createGameState({
    size: 9,
    initialStones: [
      { x: 4, y: 3, color: 'BLACK' },
      { x: 3, y: 4, color: 'BLACK' },
      { x: 5, y: 4, color: 'BLACK' },
      { x: 4, y: 5, color: 'BLACK' },
    ],
    startingTurn: 'WHITE',
  });

  const badMove = validateAndPlayMove(suicideState, { x: 4, y: 4 });
  assert.equal(badMove.legal, false);
  assert.equal(badMove.reason, 'SUICIDE');

  // Apparent suicide that captures: Black stone at (4,3) is in atari with only liberty at (4,4)
  const captureState = createGameState({
    size: 9,
    initialStones: [
      { x: 4, y: 3, color: 'BLACK' },
      { x: 3, y: 4, color: 'BLACK' },
      { x: 5, y: 4, color: 'BLACK' },
      { x: 4, y: 5, color: 'BLACK' },
      // Surround the Black stone at (4,3) with White stones
      { x: 4, y: 2, color: 'WHITE' },
      { x: 3, y: 3, color: 'WHITE' },
      { x: 5, y: 3, color: 'WHITE' },
    ],
    startingTurn: 'WHITE',
  });

  const goodMove = validateAndPlayMove(captureState, { x: 4, y: 4 });
  assert.equal(goodMove.legal, true);
  assert.equal(goodMove.capturedStones?.length, 1);
  assert.equal(goodMove.nextState?.board[3][4], 'EMPTY');
});

test('7. Detection of atari without confusing it with automatic capture', () => {
  const state = createGameState({
    size: 9,
    initialStones: [
      { x: 4, y: 4, color: 'WHITE' },
      { x: 4, y: 3, color: 'BLACK' },
      { x: 3, y: 4, color: 'BLACK' },
    ],
    startingTurn: 'BLACK',
  });

  // Black plays at (5,4), putting White (4,4) into atari with 1 liberty at (4,5)
  const res = validateAndPlayMove(state, { x: 5, y: 4 });
  assert.equal(res.legal, true);
  assert.equal(res.capturedStones?.length, 0);
  assert.equal(res.nextState?.board[4][4], 'WHITE'); // Still on board!
  const whiteGroup = getGroupAt(res.nextState!.board, { x: 4, y: 4 });
  assert.equal(whiteGroup?.inAtari, true);
  assert.equal(whiteGroup?.liberties.length, 1);
});

test('8. Ko rule: prevent immediate recapture, allow playing elsewhere then recapturing', () => {
  // Classic Ko shape around E5 (4,4) and F5 (5,4)
  const initialKoState = createGameState({
    size: 9,
    initialStones: [
      { x: 4, y: 4, color: 'WHITE' },
      { x: 3, y: 4, color: 'BLACK' },
      { x: 4, y: 3, color: 'BLACK' },
      { x: 4, y: 5, color: 'BLACK' },
      { x: 5, y: 3, color: 'WHITE' },
      { x: 5, y: 5, color: 'WHITE' },
      { x: 6, y: 4, color: 'WHITE' },
    ],
    startingTurn: 'BLACK',
  });

  // Black captures at (5,4), taking White at (4,4)
  const move1 = validateAndPlayMove(initialKoState, { x: 5, y: 4 });
  assert.equal(move1.legal, true);
  assert.equal(move1.capturedStones?.length, 1);
  assert.deepEqual(move1.nextState?.koPoint, { x: 4, y: 4 });

  // White tries to immediately recapture at (4,4) -> rejected by KO
  const immediateRecapture = validateAndPlayMove(move1.nextState!, { x: 4, y: 4 });
  assert.equal(immediateRecapture.legal, false);
  assert.equal(immediateRecapture.reason, 'KO');

  // White plays a ko threat elsewhere at (0,0)
  const move2 = validateAndPlayMove(move1.nextState!, { x: 0, y: 0 });
  assert.equal(move2.legal, true);

  // Black ignores and plays elsewhere at (0,8)
  const move3 = validateAndPlayMove(move2.nextState!, { x: 0, y: 8 });
  assert.equal(move3.legal, true);

  // Now White can legally recapture the ko at (4,4)!
  const legalRecapture = validateAndPlayMove(move3.nextState!, { x: 4, y: 4 });
  assert.equal(legalRecapture.legal, true);
  assert.equal(legalRecapture.capturedStones?.length, 1);
});

test('9. Two consecutive passes end the game; one pass followed by a move does not', () => {
  const s0 = createGameState({ size: 9 });
  const s1 = playPass(s0);
  assert.equal(s1.status, 'PLAYING');
  assert.equal(s1.consecutivePasses, 1);

  // White plays a stone instead of passing
  const moveRes = validateAndPlayMove(s1, { x: 4, y: 4 });
  assert.equal(moveRes.legal, true);
  assert.equal(moveRes.nextState?.status, 'PLAYING');
  assert.equal(moveRes.nextState?.consecutivePasses, 0);

  // Now two consecutive passes
  const p1 = playPass(moveRes.nextState!);
  assert.equal(p1.status, 'PLAYING');
  const p2 = playPass(p1);
  assert.equal(p2.status, 'FINISHED');
  assert.equal(p2.endReason, 'TWO_PASSES');
});

test('10. Scoring calculation for small verified positions (Area & Territory) and Resignation', () => {
  // 9x9 board divided cleanly: Black wall on column x=2 (C), White wall on column x=6 (G)
  // Left territory x=0,1 (2 cols * 9 rows = 18 points for Black, 9 Black stones)
  // Right territory x=7,8 (2 cols * 9 rows = 18 points for White, 9 White stones)
  // Middle x=3,4,5 is neutral (bordered by both Black and White)
  const stones = [];
  for (let y = 0; y < 9; y++) {
    stones.push({ x: 2, y, color: 'BLACK' as const });
    stones.push({ x: 6, y, color: 'WHITE' as const });
  }

  const areaState = createGameState({
    size: 9,
    initialStones: stones,
    scoringRule: 'AREA_CHINESE',
    komi: 5.5,
  });
  const areaScore = calculateScore(areaState);
  assert.equal(areaScore.blackTerritory, 18);
  assert.equal(areaScore.whiteTerritory, 18);
  assert.equal(areaScore.blackStonesOnBoard, 9);
  assert.equal(areaScore.whiteStonesOnBoard, 9);
  assert.equal(areaScore.blackTotal, 27);
  assert.equal(areaScore.whiteTotal, 32.5);
  assert.equal(areaScore.winner, 'WHITE');

  const territoryState = createGameState({
    size: 9,
    initialStones: stones,
    scoringRule: 'TERRITORY_JAPANESE',
    komi: 5.5,
  });
  const terrScore = calculateScore(territoryState);
  assert.equal(terrScore.blackTotal, 18);
  assert.equal(terrScore.whiteTotal, 23.5);
  assert.equal(terrScore.winner, 'WHITE');

  // Resignation test
  const resigned = playResign(areaState);
  assert.equal(resigned.status, 'FINISHED');
  assert.equal(resigned.endReason, 'RESIGNATION');
  assert.equal(resigned.winner, 'WHITE');
});

test('11. Undo restores board, captures, turn, and history accurately', () => {
  const s0 = createGameState({
    size: 9,
    initialStones: [
      { x: 4, y: 4, color: 'WHITE' },
      { x: 4, y: 3, color: 'BLACK' },
      { x: 3, y: 4, color: 'BLACK' },
      { x: 5, y: 4, color: 'BLACK' },
    ],
    startingTurn: 'BLACK',
  });

  const afterCapture = validateAndPlayMove(s0, { x: 4, y: 5 }).nextState!;
  assert.equal(afterCapture.board[4][4], 'EMPTY');
  assert.equal(afterCapture.captures.BLACK, 1);
  assert.equal(afterCapture.currentTurn, 'WHITE');

  const restored = undoLastMove(afterCapture);
  assert.equal(restored.board[4][4], 'WHITE');
  assert.equal(restored.board[5][4], 'EMPTY');
  assert.equal(restored.captures.BLACK, 0);
  assert.equal(restored.currentTurn, 'BLACK');
  assert.equal(restored.moveHistory.length, 0);
});

test('12. All 76 curated puzzles (10 initial + 15 expanded + 23 Attack & Defense + 16 Tesuji + 12 Kageyama Fundamentals) pass automatic engine validation', () => {
  assert.equal(PUZZLES_CATALOG.length, 76);
  const validation = validateAllPuzzlesWithEngine(PUZZLES_CATALOG);
  assert.deepEqual(validation.errors, []);
  assert.equal(validation.valid, true);
});

test('13. XP anti-farming: repeating the same lesson or puzzle does not duplicate XP', async () => {
  const { createDefaultUserState, storageRepository } = await import('../services/storageRepository');
  let user = createDefaultUserState(true);

  const firstCompletion = storageRepository.completeLesson(user, 'lesson-1-tablero-turnos', 100);
  assert.equal(firstCompletion.xpAwarded, 20);
  assert.equal(firstCompletion.state.xp, 20);

  // Repeating the same lesson gives 0 extra XP
  const repeatCompletion = storageRepository.completeLesson(firstCompletion.state, 'lesson-1-tablero-turnos', 100);
  assert.equal(repeatCompletion.xpAwarded, 0);
  assert.equal(repeatCompletion.state.xp, 20);

  // Solving a puzzle with hints gives 5 XP
  const pWithHint = storageRepository.recordPuzzleAttempt(repeatCompletion.state, {
    puzzleId: 'puzzle-1-captura-centro',
    theme: 'CAPTURA_SIMPLE',
    solved: true,
    hintsUsed: 1,
  });
  assert.equal(pWithHint.xpAwarded, 5);
  assert.equal(pWithHint.state.xp, 25);

  // Repeating with hints gives 0 XP
  const pRepeatHint = storageRepository.recordPuzzleAttempt(pWithHint.state, {
    puzzleId: 'puzzle-1-captura-centro',
    theme: 'CAPTURA_SIMPLE',
    solved: true,
    hintsUsed: 1,
  });
  assert.equal(pRepeatHint.xpAwarded, 0);
  assert.equal(pRepeatHint.state.xp, 25);

  // Upgrading to no-hints awards only the +2 XP difference once
  const pUpgradeNoHint = storageRepository.recordPuzzleAttempt(pRepeatHint.state, {
    puzzleId: 'puzzle-1-captura-centro',
    theme: 'CAPTURA_SIMPLE',
    solved: true,
    hintsUsed: 0,
  });
  assert.equal(pUpgradeNoHint.xpAwarded, 2);
  assert.equal(pUpgradeNoHint.state.xp, 27);

  // Further repeats award 0 XP
  const pFinalRepeat = storageRepository.recordPuzzleAttempt(pUpgradeNoHint.state, {
    puzzleId: 'puzzle-1-captura-centro',
    theme: 'CAPTURA_SIMPLE',
    solved: true,
    hintsUsed: 0,
  });
  assert.equal(pFinalRepeat.xpAwarded, 0);
  assert.equal(pFinalRepeat.state.xp, 27);
});

test('14. Complete Academy & Dojo integrity: 45 interactive lessons (15 Básico, 15 Intermedio, 15 Avanzado), 76 puzzles, clean titles, bidirectional links, and engine-valid lesson exercises', async () => {
  const { CURRICULUM_STAGES, LESSONS_CATALOG } = await import('../content/curriculumData');
  const { DOJO_CATEGORIES_PLAN, EXPANSION_PHASES_ROADMAP } = await import('../content/academyArchitecturePlan');
  const { createDefaultUserState, storageRepository } = await import('../services/storageRepository');
  const { formatCleanRoshiContextTitle } = await import('../components/MaestroRoshiTeachingCard');

  // Verify 45 total lessons (15 Básico, 15 Intermedio, 15 Avanzado)
  assert.equal(LESSONS_CATALOG.length, 45);
  const basicCount = LESSONS_CATALOG.filter((l) => l.stageNumber <= 2).length;
  const intermediateCount = LESSONS_CATALOG.filter((l) => l.stageNumber >= 3 && l.stageNumber <= 6).length;
  const advancedCount = LESSONS_CATALOG.filter((l) => l.stageNumber >= 7).length;
  assert.equal(basicCount, 15);
  assert.equal(intermediateCount, 15);
  assert.equal(advancedCount, 15);

  const lessonIds = new Set(LESSONS_CATALOG.map((l) => l.id));
  assert.equal(lessonIds.has('lesson-1-tablero-turnos'), true);
  assert.equal(lessonIds.has('lesson-24-reduccion-invasion-grandes-marcos'), true);
  assert.equal(lessonIds.has('lesson-25-lectura-tactica-arbol'), true);
  assert.equal(lessonIds.has('lesson-36-ko-indirecto-doble-amenaza-maestria'), true);
  assert.equal(lessonIds.has('lesson-37-kageyama-redes-firmes-romper-escaleras'), true);
  assert.equal(lessonIds.has('lesson-45-kageyama-jugadas-propias-espiral-bajo-piedras'), true);

  // Verify lesson titles and unitTitles do NOT contain parenthetical book/chapter references (e.g. "(Davies Cap. 1)")
  for (const lesson of LESSONS_CATALOG) {
    assert.equal(
      /\((?:Davies|Ishida|Kageyama|Cap\.|Vol\.)/i.test(lesson.title),
      false,
      `Lesson title "${lesson.title}" should not contain book/chapter parentheses`
    );
    assert.equal(
      /\((?:Davies|Ishida|Kageyama|Cap\.|Vol\.)/i.test(lesson.unitTitle ?? ''),
      false,
      `Lesson unitTitle "${lesson.unitTitle}" should not contain book/chapter parentheses`
    );
  }

  // Verify formatCleanRoshiContextTitle strips repeated Maestro Roshi / Roshi prefixes
  assert.equal(formatCleanRoshiContextTitle('Consejo del Maestro Roshi'), 'Consejo del Dojo');
  assert.equal(formatCleanRoshiContextTitle('Maestro Roshi · Academia'), 'Academia');
  assert.equal(formatCleanRoshiContextTitle('Maestro Roshi'), 'Consejo del Dojo');
  assert.equal(formatCleanRoshiContextTitle('Sabiduría de la Academia'), 'Sabiduría de la Academia');

  // Verify every lesson's relatedPuzzleIds exist in PUZZLES_CATALOG and all PLACE_STONE exercises are engine-legal
  const puzzleIds = new Set(PUZZLES_CATALOG.map((p) => p.id));
  for (const lesson of LESSONS_CATALOG) {
    assert.ok(lesson.relatedPuzzleIds && lesson.relatedPuzzleIds.length > 0, `Lesson ${lesson.id} should have relatedPuzzleIds`);
    for (const pid of lesson.relatedPuzzleIds) {
      assert.equal(puzzleIds.has(pid), true, `Referenced puzzle ${pid} in lesson ${lesson.id} must exist in PUZZLES_CATALOG`);
    }

    const exercises = [
      ...lesson.guidedDecisions,
      ...lesson.independentPractice,
      lesson.transferQuestion,
    ];
    for (const ex of exercises) {
      if (ex.exerciseType === 'PLACE_STONE' && ex.initialStones && ex.validCoords) {
        const state = createGameState({
          size: ex.boardSize,
          initialStones: ex.initialStones,
          startingTurn: ex.turn,
        });
        for (const coord of ex.validCoords) {
          const moveRes = validateAndPlayMove(state, coord);
          assert.equal(moveRes.legal, true, `Lesson ${lesson.id} exercise ${ex.id} move (${coord.x},${coord.y}) invalid: ${moveRes.reason}`);
        }
      }
    }
  }

  // Verify all 76 puzzles have PUBLICADO status, clean titles without book/chapter parentheses, and valid relatedLessonId
  for (const puzzle of PUZZLES_CATALOG) {
    assert.equal(puzzle.validationStatus, 'PUBLICADO');
    assert.ok(puzzle.relatedLessonId && lessonIds.has(puzzle.relatedLessonId), `Puzzle ${puzzle.id} must link to a valid lesson`);
    assert.equal(
      /\((?:Davies|Ishida|Kageyama|Cap\.|Vol\.)/i.test(puzzle.title),
      false,
      `Puzzle title "${puzzle.title}" should not contain book/chapter parentheses`
    );
  }

  // Verify unlockAllLessons unlocks all 45 lessons
  const baseUser = createDefaultUserState(true);
  const unlockedUser = storageRepository.unlockAllLessons(baseUser);
  const unlockedCount = Object.values(unlockedUser.lessonProgress).filter((lp) => lp.status !== 'LOCKED').length;
  assert.equal(unlockedCount, 45);

  // Verify all 13 curriculum stages are active and have units matching the 45 active lessons
  assert.equal(CURRICULUM_STAGES.length, 13);
  const totalStageLessons = CURRICULUM_STAGES.reduce((acc, s) => acc + (s.plannedLessonsTarget ?? 0), 0);
  assert.equal(totalStageLessons, 45);
  for (const stage of CURRICULUM_STAGES) {
    assert.equal(stage.unlockedInMvp, true, `Stage ${stage.stage} should be unlocked`);
    assert.ok(stage.units && stage.units.length >= 1, `Stage ${stage.stage} must define at least 1 unit`);
  }

  assert.equal(DOJO_CATEGORIES_PLAN.length, 17);
  assert.equal(EXPANSION_PHASES_ROADMAP.length, 4);
});

test('15. Infinite Puzzle Generator (Modo Infinito ∞) produces 100% engine-validated puzzles across symmetries, colors, and difficulties', async () => {
  const { generateInfinitePuzzle } = await import('./infinitePuzzleGenerator');
  const generatedBatch = [];
  for (let seq = 1; seq <= 32; seq++) {
    const p = generateInfinitePuzzle({
      sequenceNumber: seq,
      difficultyFilter: seq % 4 === 0 ? 'AVANZADO' : seq % 3 === 0 ? 'INTERMEDIO' : 'ALL',
    });
    generatedBatch.push(p);
  }
  const validation = validateAllPuzzlesWithEngine(generatedBatch);
  assert.deepEqual(validation.errors, []);
  assert.equal(validation.valid, true);
});

test('16. App Color Palettes (APP_THEMES_CATALOG) and Goban Board Styles (BOARD_THEMES_CATALOG) switch and persist cleanly', async () => {
  const { APP_THEMES_CATALOG, BOARD_THEMES_CATALOG, MAESTRO_ROSHI_TEACHINGS, getAppThemeById, getBoardThemeById } =
    await import('../content/themesData');
  const { createDefaultUserState, storageRepository } = await import('../services/storageRepository');

  assert.equal(APP_THEMES_CATALOG.length, 6);
  assert.equal(BOARD_THEMES_CATALOG.length, 5);
  assert.ok(MAESTRO_ROSHI_TEACHINGS.length >= 4);

  // Verify the 4 reference themes exist and have 4 swatches each
  for (const requiredId of ['KAYA', 'BOSQUE', 'TINTA', 'CEREZOS'] as const) {
    const found = getAppThemeById(requiredId);
    assert.equal(found.id, requiredId);
    assert.equal(found.swatches.length, 4);
  }

  // Verify board styles and persistence in UserState
  const initialUser = createDefaultUserState(true);
  assert.equal(initialUser.jade, 2);
  assert.equal(initialUser.profile.appTheme, 'KAYA');
  assert.equal(initialUser.profile.boardTheme, 'KAYA_TRADICIONAL');
  assert.deepEqual(initialUser.profile.unlockedAppThemes, ['KAYA']);
  assert.deepEqual(initialUser.profile.unlockedBoardThemes, ['KAYA_TRADICIONAL']);

  // Verify Jade costs and ordering by price
  assert.deepEqual(
    APP_THEMES_CATALOG.map((t) => [t.id, t.jadeCost]),
    [
      ['KAYA', 0],
      ['BOSQUE', 3],
      ['TINTA', 5],
      ['OCEANO', 7],
      ['CEREZOS', 15],
      ['LAVANDA', 20],
    ]
  );
  assert.deepEqual(
    BOARD_THEMES_CATALOG.map((b) => [b.id, b.jadeCost]),
    [
      ['KAYA_TRADICIONAL', 0],
      ['CEDRO_JADE', 3],
      ['PIZARRA_ZEN', 5],
      ['EBANO_NOCTURNO', 10],
      ['SAKURA_KIOTO', 15],
    ]
  );

  // Verify achievement badges have Jade rewards between 1 and 3 depending on difficulty
  for (const badge of initialUser.achievements) {
    assert.ok(
      badge.jadeReward >= 1 && badge.jadeReward <= 3,
      `Badge ${badge.id} should have jadeReward between 1 and 3`
    );
  }

  // Locked themes cannot be applied before unlocking with Jade
  const blockedCerezos = storageRepository.setAppTheme(initialUser, 'CEREZOS');
  assert.equal(blockedCerezos.profile.appTheme, 'KAYA');

  // Grant Jade and unlock CEREZOS (15 Jade), TINTA (5 Jade), and CEDRO_JADE (3 Jade)
  const userWithJade = { ...initialUser, jade: 30 };
  const afterCerezos = storageRepository.unlockAppThemeWithJade(userWithJade, 'CEREZOS');
  assert.equal(afterCerezos.profile.appTheme, 'CEREZOS');
  assert.equal(afterCerezos.jade, 15);

  const afterTinta = storageRepository.unlockAppThemeWithJade(afterCerezos, 'TINTA');
  assert.equal(afterTinta.profile.appTheme, 'TINTA');
  assert.equal(afterTinta.jade, 10);

  const afterCedroBoard = storageRepository.unlockBoardThemeWithJade(afterTinta, 'CEDRO_JADE');
  assert.equal(afterCedroBoard.profile.boardTheme, 'CEDRO_JADE');
  assert.equal(afterCedroBoard.jade, 7);
  assert.equal(getBoardThemeById(afterCedroBoard.profile.boardTheme).name, 'Cedro y Jade');
});

test('17. Academy lessons are ordered strictly by difficulty (Básico -> Intermedio -> Avanzado) and unlock strictly one by one sequentially', async () => {
  const { LESSONS_CATALOG } = await import('../content/curriculumData');
  const { createDefaultUserState, storageRepository } = await import('../services/storageRepository');
  assert.equal(LESSONS_CATALOG.length, 45);

  // First 15 must be BASICO (stages 0-2), next 15 INTERMEDIO (stages 3-6), last 15 AVANZADO (stages 7-12)
  for (let i = 0; i < 45; i++) {
    const lesson = LESSONS_CATALOG[i];
    const actualDiff = lesson.stageNumber <= 2 ? 'BASICO' : lesson.stageNumber <= 6 ? 'INTERMEDIO' : 'AVANZADO';
    const expectedDiff = i < 15 ? 'BASICO' : i < 30 ? 'INTERMEDIO' : 'AVANZADO';
    assert.equal(
      actualDiff,
      expectedDiff,
      `Lesson at index ${i} (${lesson.id}) should have difficulty ${expectedDiff} but got ${actualDiff}`
    );
    if (i > 0) {
      const prev = LESSONS_CATALOG[i - 1];
      assert.ok(
        lesson.stageNumber > prev.stageNumber ||
          (lesson.stageNumber === prev.stageNumber && lesson.unitNumber >= prev.unitNumber),
        `Lesson ${lesson.id} (stage ${lesson.stageNumber}.${lesson.unitNumber}) must not precede ${prev.id} (stage ${prev.stageNumber}.${prev.unitNumber})`
      );
      assert.deepEqual(lesson.prerequisites, [prev.id], `Lesson ${lesson.id} must require ${prev.id}`);
    } else {
      assert.deepEqual(lesson.prerequisites, [], 'First lesson must have no prerequisites');
    }
  }

  // Verify initial state has ONLY Lesson 0 unlocked
  let state = createDefaultUserState(false);
  state = storageRepository.completeOnboarding(state, {
    startingPath: 'HAS_BASICS',
    dailyGoalMinutes: 10,
    scoringRulePreference: 'AREA_CHINESE',
  });

  const initialUnlocked = LESSONS_CATALOG.filter((l) => state.lessonProgress[l.id]?.status !== 'LOCKED');
  assert.equal(initialUnlocked.length, 1, 'Only Clase 1 should be unlocked initially');
  assert.equal(initialUnlocked[0].id, LESSONS_CATALOG[0].id);

  // Completing Lesson 0 unlocks Lesson 1 (and leaves Lessons 2..23 locked)
  const res1 = storageRepository.completeLesson(state, LESSONS_CATALOG[0].id, 100);
  state = res1.state;
  assert.equal(state.lessonProgress[LESSONS_CATALOG[0].id].status, 'MASTERED');
  assert.equal(state.lessonProgress[LESSONS_CATALOG[1].id].status, 'AVAILABLE');
  assert.equal(state.lessonProgress[LESSONS_CATALOG[2].id].status, 'LOCKED');

  // Completing Lesson 1 unlocks Lesson 2
  const res2 = storageRepository.completeLesson(state, LESSONS_CATALOG[1].id, 100);
  state = res2.state;
  assert.equal(state.lessonProgress[LESSONS_CATALOG[1].id].status, 'MASTERED');
  assert.equal(state.lessonProgress[LESSONS_CATALOG[2].id].status, 'AVAILABLE');
  assert.equal(state.lessonProgress[LESSONS_CATALOG[3].id].status, 'LOCKED');
});


