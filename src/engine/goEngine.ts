import {
  BoardSize,
  BoardSetupStone,
  CellState,
  Coord,
  GameSnapshot,
  GameState,
  GroupInfo,
  MoveRecord,
  MoveValidationResult,
  PlayerColor,
  ScoreBreakdown,
  ScoringRuleSet,
} from '../types/go';

const COL_LETTERS = 'ABCDEFGHJKLMNOPQRST'; // Standard Go skips 'I'

export function getOppositeColor(color: PlayerColor): PlayerColor {
  return color === 'BLACK' ? 'WHITE' : 'BLACK';
}

export function coordKey(c: Coord): string {
  return `${c.x},${c.y}`;
}

export function coordsEqual(a?: Coord | null, b?: Coord | null): boolean {
  if (!a || !b) return false;
  return a.x === b.x && a.y === b.y;
}

export function isValidCoord(c: Coord, size: number): boolean {
  return Number.isInteger(c.x) && Number.isInteger(c.y) && c.x >= 0 && c.x < size && c.y >= 0 && c.y < size;
}

export function coordToLabel(c: Coord, size: number = 9): string {
  const col = COL_LETTERS[c.x] || '?';
  const row = size - c.y;
  return `${col}${row}`;
}

export function labelToCoord(label: string, size: number = 9): Coord | null {
  const clean = label.trim().toUpperCase();
  if (clean.length < 2) return null;
  const colChar = clean[0];
  const rowNum = parseInt(clean.slice(1), 10);
  const x = COL_LETTERS.indexOf(colChar);
  const y = size - rowNum;
  if (x < 0 || x >= size || isNaN(rowNum) || y < 0 || y >= size) {
    return null;
  }
  return { x, y };
}

export function getStarPoints(size: BoardSize): Coord[] {
  if (size === 9) {
    return [
      { x: 2, y: 2 },
      { x: 6, y: 2 },
      { x: 4, y: 4 },
      { x: 2, y: 6 },
      { x: 6, y: 6 },
    ];
  }
  if (size === 13) {
    return [
      { x: 3, y: 3 },
      { x: 9, y: 3 },
      { x: 6, y: 6 },
      { x: 3, y: 9 },
      { x: 9, y: 9 },
    ];
  }
  // 19x19
  const pts = [3, 9, 15];
  const result: Coord[] = [];
  for (const y of pts) {
    for (const x of pts) {
      result.push({ x, y });
    }
  }
  return result;
}

export function createEmptyBoard(size: BoardSize = 9): CellState[][] {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => 'EMPTY' as CellState));
}

export function cloneBoard(board: CellState[][]): CellState[][] {
  return board.map((row) => [...row]);
}

export function serializeBoard(board: CellState[][]): string {
  return board
    .map((row) =>
      row
        .map((cell) => (cell === 'BLACK' ? 'B' : cell === 'WHITE' ? 'W' : '.'))
        .join('')
    )
    .join('/');
}

export function getOrthogonalNeighbors(c: Coord, size: number): Coord[] {
  const deltas = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
  ];
  const neighbors: Coord[] = [];
  for (const d of deltas) {
    const nx = c.x + d.x;
    const ny = c.y + d.y;
    if (nx >= 0 && nx < size && ny >= 0 && ny < size) {
      neighbors.push({ x: nx, y: ny });
    }
  }
  return neighbors;
}

export function getGroupAt(board: CellState[][], start: Coord): GroupInfo | null {
  const size = board.length;
  if (!isValidCoord(start, size)) return null;
  const color = board[start.y][start.x];
  if (color === 'EMPTY') return null;

  const visitedStones = new Set<string>();
  const libertySet = new Set<string>();
  const stones: Coord[] = [];
  const liberties: Coord[] = [];
  const queue: Coord[] = [start];
  visitedStones.add(coordKey(start));

  while (queue.length > 0) {
    const curr = queue.shift()!;
    stones.push(curr);

    const neighbors = getOrthogonalNeighbors(curr, size);
    for (const n of neighbors) {
      const nState = board[n.y][n.x];
      const nKey = coordKey(n);
      if (nState === 'EMPTY') {
        if (!libertySet.has(nKey)) {
          libertySet.add(nKey);
          liberties.push(n);
        }
      } else if (nState === color && !visitedStones.has(nKey)) {
        visitedStones.add(nKey);
        queue.push(n);
      }
    }
  }

  stones.sort((a, b) => (a.y !== b.y ? a.y - b.y : a.x - b.x));
  liberties.sort((a, b) => (a.y !== b.y ? a.y - b.y : a.x - b.x));

  const canonicalHead = stones[0];
  return {
    id: `${color}-${canonicalHead.x}-${canonicalHead.y}`,
    color,
    stones,
    liberties,
    inAtari: liberties.length === 1,
  };
}

export function getAllGroups(board: CellState[][]): GroupInfo[] {
  const size = board.length;
  const visited = new Set<string>();
  const groups: GroupInfo[] = [];

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const state = board[y][x];
      if (state === 'EMPTY') continue;
      const key = `${x},${y}`;
      if (visited.has(key)) continue;

      const group = getGroupAt(board, { x, y });
      if (group) {
        for (const s of group.stones) {
          visited.add(coordKey(s));
        }
        groups.push(group);
      }
    }
  }
  return groups;
}

export function createGameState(options?: {
  size?: BoardSize;
  initialStones?: BoardSetupStone[];
  startingTurn?: PlayerColor;
  scoringRule?: ScoringRuleSet;
  komi?: number;
  superkoPolicy?: 'POSITIONAL_SUPERKO' | 'SIMPLE_KO';
}): GameState {
  const size = options?.size ?? 9;
  const board = createEmptyBoard(size);
  if (options?.initialStones) {
    for (const s of options.initialStones) {
      if (isValidCoord({ x: s.x, y: s.y }, size)) {
        board[s.y][s.x] = s.color;
      }
    }
  }
  const initialHash = serializeBoard(board);
  return {
    size,
    board,
    currentTurn: options?.startingTurn ?? 'BLACK',
    captures: { BLACK: 0, WHITE: 0 },
    consecutivePasses: 0,
    lastMove: null,
    moveHistory: [],
    positionHashes: [initialHash],
    undoStack: [],
    koPoint: null,
    superkoPolicy: options?.superkoPolicy ?? 'POSITIONAL_SUPERKO',
    scoringRule: options?.scoringRule ?? 'AREA_CHINESE',
    komi: options?.komi ?? 5.5,
    status: 'PLAYING',
    markedDeadStones: [],
  };
}

export function validateAndPlayMove(state: GameState, coord: Coord): MoveValidationResult {
  if (state.status === 'FINISHED') {
    return {
      legal: false,
      reason: 'GAME_ALREADY_FINISHED',
      messageEs: 'La partida ya ha finalizado.',
    };
  }

  if (!isValidCoord(coord, state.size)) {
    return {
      legal: false,
      reason: 'OUT_OF_BOUNDS',
      messageEs: 'La coordenada seleccionada está fuera de los límites del tablero.',
    };
  }

  if (state.board[coord.y][coord.x] !== 'EMPTY') {
    return {
      legal: false,
      reason: 'OCCUPIED',
      messageEs: `La intersección ${coordToLabel(coord, state.size)} ya está ocupada por otra piedra.`,
    };
  }

  const player = state.currentTurn;
  const opponent = getOppositeColor(player);

  // Simple Ko explicit check first for immediate clear feedback
  if (state.koPoint && coordsEqual(coord, state.koPoint)) {
    return {
      legal: false,
      reason: 'KO',
      messageEs: `Jugada ilegal por regla de Ko en ${coordToLabel(coord, state.size)}: no puedes recapturar inmediatamente y repetir la posición anterior. Juega una amenaza en otro lugar primero.`,
    };
  }

  const nextBoard = cloneBoard(state.board);
  nextBoard[coord.y][coord.x] = player;

  // Step 1: Identify adjacent opponent groups without liberties and remove them
  const neighbors = getOrthogonalNeighbors(coord, state.size);
  const capturedStones: Coord[] = [];
  const checkedOpponentGroupIds = new Set<string>();

  for (const n of neighbors) {
    if (nextBoard[n.y][n.x] === opponent) {
      const oppGroup = getGroupAt(nextBoard, n);
      if (oppGroup && !checkedOpponentGroupIds.has(oppGroup.id)) {
        checkedOpponentGroupIds.add(oppGroup.id);
        if (oppGroup.liberties.length === 0) {
          for (const stone of oppGroup.stones) {
            nextBoard[stone.y][stone.x] = 'EMPTY';
            capturedStones.push(stone);
          }
        }
      }
    }
  }

  // Step 2: Check own group liberties after resolving opponent captures
  const ownGroup = getGroupAt(nextBoard, coord);
  if (!ownGroup || ownGroup.liberties.length === 0) {
    return {
      legal: false,
      reason: 'SUICIDE',
      messageEs: `Jugada ilegal por suicidio en ${coordToLabel(coord, state.size)}: tu piedra o grupo quedaría con cero libertades y no captura ninguna piedra rival.`,
    };
  }

  // Step 3: Check Ko / Positional Superko
  const nextHash = serializeBoard(nextBoard);
  const previousBoardHash =
    state.positionHashes.length >= 2 ? state.positionHashes[state.positionHashes.length - 2] : null;

  if (previousBoardHash && nextHash === previousBoardHash) {
    return {
      legal: false,
      reason: 'KO',
      messageEs: `Jugada ilegal por regla de Ko: colocarse en ${coordToLabel(coord, state.size)} repite exactamente la posición anterior del tablero.`,
    };
  }

  if (state.superkoPolicy === 'POSITIONAL_SUPERKO' && state.positionHashes.includes(nextHash)) {
    return {
      legal: false,
      reason: 'SUPERKO',
      messageEs: `Jugada ilegal por Superko posicional: esta configuración exacta del tablero ya ocurrió antes en la partida.`,
    };
  }

  // Determine if this move creates a new simple Ko point for the next turn
  let newKoPoint: Coord | null = null;
  if (
    capturedStones.length === 1 &&
    ownGroup.stones.length === 1 &&
    ownGroup.liberties.length === 1 &&
    coordsEqual(ownGroup.liberties[0], capturedStones[0])
  ) {
    newKoPoint = { ...capturedStones[0] };
  }

  // Find groups currently in Atari
  const allGroupsAfter = getAllGroups(nextBoard);
  const atariGroups = allGroupsAfter.filter((g) => g.inAtari);

  // Snapshot for Undo
  const snapshot: GameSnapshot = {
    board: cloneBoard(state.board),
    currentTurn: state.currentTurn,
    captures: { ...state.captures },
    consecutivePasses: state.consecutivePasses,
    lastMove: state.lastMove ? { ...state.lastMove } : null,
    positionHashes: [...state.positionHashes],
    koPoint: state.koPoint ? { ...state.koPoint } : null,
  };

  const nextCaptures = {
    ...state.captures,
    [player]: state.captures[player] + capturedStones.length,
  };

  const moveRecord: MoveRecord = {
    moveNumber: state.moveHistory.length + 1,
    color: player,
    type: 'PLACE',
    coord: { ...coord },
    coordinateLabel: coordToLabel(coord, state.size),
    capturedStones,
    groupsInAtariAfter: atariGroups.map((g) => g.stones),
    boardHashAfter: nextHash,
  };

  const nextState: GameState = {
    ...state,
    board: nextBoard,
    currentTurn: opponent,
    captures: nextCaptures,
    consecutivePasses: 0,
    lastMove: moveRecord,
    moveHistory: [...state.moveHistory, moveRecord],
    positionHashes: [...state.positionHashes, nextHash],
    undoStack: [...state.undoStack, snapshot],
    koPoint: newKoPoint,
  };

  let msg = `Piedra colocada en ${moveRecord.coordinateLabel}.`;
  if (capturedStones.length > 0) {
    msg += ` ¡Capturaste ${capturedStones.length} ${capturedStones.length === 1 ? 'piedra' : 'piedras'}!`;
  } else if (atariGroups.some((g) => g.color === opponent)) {
    msg += ' ¡Pusiste un grupo rival en atari (1 sola libertad)!';
  }

  return {
    legal: true,
    messageEs: msg,
    nextState,
    capturedStones,
    selfGroupLiberties: ownGroup.liberties.length,
    atariGroups,
  };
}

export function playPass(state: GameState): GameState {
  if (state.status === 'FINISHED') return state;

  const player = state.currentTurn;
  const opponent = getOppositeColor(player);
  const nextPasses = state.consecutivePasses + 1;
  const isFinished = nextPasses >= 2;

  const snapshot: GameSnapshot = {
    board: cloneBoard(state.board),
    currentTurn: state.currentTurn,
    captures: { ...state.captures },
    consecutivePasses: state.consecutivePasses,
    lastMove: state.lastMove ? { ...state.lastMove } : null,
    positionHashes: [...state.positionHashes],
    koPoint: state.koPoint ? { ...state.koPoint } : null,
  };

  const moveRecord: MoveRecord = {
    moveNumber: state.moveHistory.length + 1,
    color: player,
    type: 'PASS',
    coordinateLabel: 'PASE',
    capturedStones: [],
    groupsInAtariAfter: [],
    boardHashAfter: serializeBoard(state.board),
  };

  let winner: PlayerColor | 'DRAW' | undefined = undefined;
  if (isFinished) {
    const score = calculateScore({
      ...state,
      consecutivePasses: nextPasses,
      status: 'FINISHED',
    });
    winner = score.winner;
  }

  return {
    ...state,
    currentTurn: opponent,
    consecutivePasses: nextPasses,
    lastMove: moveRecord,
    moveHistory: [...state.moveHistory, moveRecord],
    undoStack: [...state.undoStack, snapshot],
    koPoint: null,
    status: isFinished ? 'FINISHED' : 'PLAYING',
    endReason: isFinished ? 'TWO_PASSES' : undefined,
    winner,
  };
}

export function playResign(state: GameState): GameState {
  if (state.status === 'FINISHED') return state;
  const player = state.currentTurn;
  const winner = getOppositeColor(player);

  const moveRecord: MoveRecord = {
    moveNumber: state.moveHistory.length + 1,
    color: player,
    type: 'RESIGN',
    coordinateLabel: 'ABANDONO',
    capturedStones: [],
    groupsInAtariAfter: [],
    boardHashAfter: serializeBoard(state.board),
  };

  return {
    ...state,
    lastMove: moveRecord,
    moveHistory: [...state.moveHistory, moveRecord],
    status: 'FINISHED',
    endReason: 'RESIGNATION',
    winner,
  };
}

export function undoLastMove(state: GameState): GameState {
  if (state.undoStack.length === 0) return state;
  const lastSnapshot = state.undoStack[state.undoStack.length - 1];
  const nextUndoStack = state.undoStack.slice(0, -1);
  const nextMoveHistory = state.moveHistory.slice(0, -1);

  return {
    ...state,
    board: cloneBoard(lastSnapshot.board),
    currentTurn: lastSnapshot.currentTurn,
    captures: { ...lastSnapshot.captures },
    consecutivePasses: lastSnapshot.consecutivePasses,
    lastMove: lastSnapshot.lastMove ? { ...lastSnapshot.lastMove } : null,
    positionHashes: [...lastSnapshot.positionHashes],
    koPoint: lastSnapshot.koPoint ? { ...lastSnapshot.koPoint } : null,
    undoStack: nextUndoStack,
    moveHistory: nextMoveHistory,
    status: 'PLAYING',
    endReason: undefined,
    winner: undefined,
  };
}

export function toggleDeadStoneGroup(state: GameState, coord: Coord): GameState {
  const group = getGroupAt(state.board, coord);
  if (!group) return state;

  const isCurrentlyMarked = state.markedDeadStones.some((c) => coordsEqual(c, coord));
  let nextDead: Coord[];
  if (isCurrentlyMarked) {
    nextDead = state.markedDeadStones.filter(
      (dead) => !group.stones.some((s) => coordsEqual(s, dead))
    );
  } else {
    const existingKeys = new Set(state.markedDeadStones.map(coordKey));
    nextDead = [...state.markedDeadStones];
    for (const s of group.stones) {
      if (!existingKeys.has(coordKey(s))) {
        nextDead.push(s);
      }
    }
  }
  return {
    ...state,
    markedDeadStones: nextDead,
  };
}

export function calculateScore(state: GameState): ScoreBreakdown {
  const size = state.size;
  const effectiveBoard = cloneBoard(state.board);

  let deadBlackStones = 0;
  let deadWhiteStones = 0;

  for (const dead of state.markedDeadStones) {
    if (isValidCoord(dead, size)) {
      if (effectiveBoard[dead.y][dead.x] === 'BLACK') {
        deadBlackStones++;
        effectiveBoard[dead.y][dead.x] = 'EMPTY';
      } else if (effectiveBoard[dead.y][dead.x] === 'WHITE') {
        deadWhiteStones++;
        effectiveBoard[dead.y][dead.x] = 'EMPTY';
      }
    }
  }

  let blackStonesOnBoard = 0;
  let whiteStonesOnBoard = 0;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (effectiveBoard[y][x] === 'BLACK') blackStonesOnBoard++;
      else if (effectiveBoard[y][x] === 'WHITE') whiteStonesOnBoard++;
    }
  }

  const territoryMap: ('BLACK' | 'WHITE' | 'NEUTRAL')[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => 'NEUTRAL')
  );

  const visitedEmpty = new Set<string>();
  let blackTerritory = 0;
  let whiteTerritory = 0;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (effectiveBoard[y][x] !== 'EMPTY') continue;
      const key = `${x},${y}`;
      if (visitedEmpty.has(key)) continue;

      // Flood-fill contiguous empty region
      const region: Coord[] = [];
      const borderingColors = new Set<PlayerColor>();
      const queue: Coord[] = [{ x, y }];
      visitedEmpty.add(key);

      while (queue.length > 0) {
        const curr = queue.shift()!;
        region.push(curr);

        const neighbors = getOrthogonalNeighbors(curr, size);
        for (const n of neighbors) {
          const nState = effectiveBoard[n.y][n.x];
          if (nState === 'EMPTY') {
            const nKey = coordKey(n);
            if (!visitedEmpty.has(nKey)) {
              visitedEmpty.add(nKey);
              queue.push(n);
            }
          } else {
            borderingColors.add(nState);
          }
        }
      }

      if (borderingColors.size === 1) {
        const owner = Array.from(borderingColors)[0];
        for (const pt of region) {
          territoryMap[pt.y][pt.x] = owner;
        }
        if (owner === 'BLACK') {
          blackTerritory += region.length;
        } else {
          whiteTerritory += region.length;
        }
      }
    }
  }

  let blackTotal = 0;
  let whiteTotal = 0;
  let explanationEs = '';

  if (state.scoringRule === 'AREA_CHINESE') {
    blackTotal = blackStonesOnBoard + blackTerritory;
    whiteTotal = whiteStonesOnBoard + whiteTerritory + state.komi;
    explanationEs = `Puntuación por Área (Reglas Chinas): Negro suma ${blackStonesOnBoard} piedras vivas + ${blackTerritory} puntos de territorio = ${blackTotal}. Blanco suma ${whiteStonesOnBoard} piedras vivas + ${whiteTerritory} puntos de territorio + ${state.komi} komi = ${whiteTotal}.`;
  } else {
    // TERRITORY_JAPANESE
    const totalBlackCaptures = state.captures.BLACK + deadWhiteStones;
    const totalWhiteCaptures = state.captures.WHITE + deadBlackStones;
    blackTotal = blackTerritory + totalBlackCaptures;
    whiteTotal = whiteTerritory + totalWhiteCaptures + state.komi;
    explanationEs = `Puntuación por Territorio (Reglas Japonesas): Negro suma ${blackTerritory} de territorio + ${totalBlackCaptures} prisioneros = ${blackTotal}. Blanco suma ${whiteTerritory} de territorio + ${totalWhiteCaptures} prisioneros + ${state.komi} komi = ${whiteTotal}.`;
  }

  const diff = blackTotal - whiteTotal;
  const winner: PlayerColor | 'DRAW' = diff > 0 ? 'BLACK' : diff < 0 ? 'WHITE' : 'DRAW';
  const margin = Math.abs(diff);

  return {
    ruleSet: state.scoringRule,
    komi: state.komi,
    blackTerritory,
    whiteTerritory,
    blackStonesOnBoard,
    whiteStonesOnBoard,
    blackCaptures: state.captures.BLACK,
    whiteCaptures: state.captures.WHITE,
    deadBlackStones,
    deadWhiteStones,
    blackTotal,
    whiteTotal,
    winner,
    margin,
    territoryMap,
    explanationEs,
  };
}

/**
 * Simple, honest heuristic opponent for practice games (Section 13).
 * Every candidate move is validated deterministically by `validateAndPlayMove`.
 */
export function chooseBasicAiMove(
  state: GameState,
  difficulty: 'PRINCIPIANTE' | 'FACIL' | 'INTERMEDIO' = 'FACIL'
): { type: 'PLACE'; coord: Coord } | { type: 'PASS' } {
  const aiColor = state.currentTurn;
  const oppColor = getOppositeColor(aiColor);
  const size = state.size;
  const starPts = getStarPoints(size);

  const candidates: { coord: Coord; score: number }[] = [];

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (state.board[y][x] !== 'EMPTY') continue;
      const coord = { x, y };
      const res = validateAndPlayMove(state, coord);
      if (!res.legal || !res.nextState) continue;

      // Avoid filling own true eye (all orthogonal neighbors are friendly stones of a group with >=2 liberties)
      const neighbors = getOrthogonalNeighbors(coord, size);
      const allFriendlyNeighbors = neighbors.every((n) => state.board[n.y][n.x] === aiColor);
      if (allFriendlyNeighbors && (res.capturedStones?.length ?? 0) === 0) {
        continue;
      }

      let score = 10;

      // 1. Capturing stones is high priority
      const capturedCount = res.capturedStones?.length ?? 0;
      if (capturedCount > 0) {
        score += capturedCount * 45;
      }

      // 2. Saving own groups currently in atari
      const groupsBefore = getAllGroups(state.board);
      const ownAtariBefore = groupsBefore.filter((g) => g.color === aiColor && g.inAtari);
      for (const g of ownAtariBefore) {
        if (coordsEqual(g.liberties[0], coord) && (res.selfGroupLiberties ?? 0) >= 2) {
          score += 40 * g.stones.length;
        }
      }

      // 3. Putting opponent groups in atari
      const oppAtariAfter = (res.atariGroups ?? []).filter((g) => g.color === oppColor);
      score += oppAtariAfter.length * 18;

      // 4. Penalize self-atari unless it captures
      if ((res.selfGroupLiberties ?? 0) === 1 && capturedCount === 0) {
        score -= 60;
      } else if ((res.selfGroupLiberties ?? 0) >= 3) {
        score += 8;
      }

      // 5. Star points & third/fourth line preference in opening
      if (starPts.some((sp) => coordsEqual(sp, coord))) {
        score += 12;
      }
      const distFromEdge = Math.min(x, y, size - 1 - x, size - 1 - y);
      if (distFromEdge >= 2) {
        score += 6;
      } else if (distFromEdge === 0) {
        score -= 5;
      }

      // Add slight variation for beginner/easy levels
      if (difficulty === 'PRINCIPIANTE') {
        score += ( (x * 7 + y * 13 + state.moveHistory.length) % 15 );
      } else if (difficulty === 'FACIL') {
        score += ( (x * 3 + y * 5 + state.moveHistory.length) % 6 );
      }

      if (score > 0) {
        candidates.push({ coord, score });
      }
    }
  }

  if (candidates.length === 0) {
    return { type: 'PASS' };
  }

  candidates.sort((a, b) => b.score - a.score);
  return { type: 'PLACE', coord: candidates[0].coord };
}

export interface EngineBoardFacts {
  totalBlackStones: number;
  totalWhiteStones: number;
  groupsSummary: Array<{
    color: PlayerColor;
    stoneCount: number;
    libertiesCount: number;
    inAtari: boolean;
    sampleCoord: string;
  }>;
  koPointLabel: string | null;
}

export function buildBoardAsciiAndFacts(
  board: CellState[][],
  koPoint: Coord | null
): {
  boardAscii: string;
  engineFacts: EngineBoardFacts;
} {
  const size = board.length;
  const headerCols = COL_LETTERS.slice(0, size).split('').join(' ');
  const rows: string[] = [`   ${headerCols}`];

  let totalBlackStones = 0;
  let totalWhiteStones = 0;

  for (let y = 0; y < size; y++) {
    const rowNum = String(size - y).padStart(2, ' ');
    const cells: string[] = [];
    for (let x = 0; x < size; x++) {
      const c = board[y][x];
      if (c === 'BLACK') {
        totalBlackStones++;
        cells.push('X');
      } else if (c === 'WHITE') {
        totalWhiteStones++;
        cells.push('O');
      } else {
        cells.push('.');
      }
    }
    rows.push(`${rowNum} ${cells.join(' ')}`);
  }

  const groups = getAllGroups(board);
  const groupsSummary = groups.map((g) => ({
    color: g.color,
    stoneCount: g.stones.length,
    libertiesCount: g.liberties.length,
    inAtari: g.inAtari,
    sampleCoord: coordToLabel(g.stones[0], size),
  }));

  return {
    boardAscii: rows.join('\n'),
    engineFacts: {
      totalBlackStones,
      totalWhiteStones,
      groupsSummary,
      koPointLabel: koPoint ? coordToLabel(koPoint, size) : null,
    },
  };
}
