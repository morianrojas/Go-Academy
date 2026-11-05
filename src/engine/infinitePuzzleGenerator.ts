import {
  BoardSize,
  Coord,
  PlayerColor,
  PuzzleContent,
  PuzzleDifficulty,
  PuzzleTheme,
} from '../types/go';
import { coordToLabel } from './goEngine';
import { PUZZLES_CATALOG, validateAllPuzzlesWithEngine } from '../content/puzzlesData';

const SYMMETRY_LABELS: Record<number, string> = {
  0: 'Orientación Norte',
  1: 'Rotación 90° Este',
  2: 'Rotación 180° Sur',
  3: 'Rotación 270° Oeste',
  4: 'Espejo Horizontal',
  5: 'Espejo Vertical',
  6: 'Simetría Diagonal A',
  7: 'Simetría Diagonal B',
};

/**
 * Applies one of the 8 dihedral group (D4) board symmetries on a board of size N.
 */
export function transformCoordSymmetry(
  c: Coord,
  size: BoardSize,
  symmetryIndex: number
): Coord {
  const max = size - 1;
  const sym = ((symmetryIndex % 8) + 8) % 8;
  switch (sym) {
    case 0:
      return { x: c.x, y: c.y };
    case 1: // Rotate 90° clockwise
      return { x: max - c.y, y: c.x };
    case 2: // Rotate 180°
      return { x: max - c.x, y: max - c.y };
    case 3: // Rotate 270° clockwise
      return { x: c.y, y: max - c.x };
    case 4: // Flip horizontal (left <-> right)
      return { x: max - c.x, y: c.y };
    case 5: // Flip vertical (top <-> bottom)
      return { x: c.x, y: max - c.y };
    case 6: // Main diagonal transpose (x <-> y)
      return { x: c.y, y: c.x };
    case 7: // Anti-diagonal transpose
      return { x: max - c.y, y: max - c.x };
    default:
      return { x: c.x, y: c.y };
  }
}

function invertColor(color: PlayerColor): PlayerColor {
  return color === 'BLACK' ? 'WHITE' : 'BLACK';
}

/**
 * Transforms all board coordinate references (e.g. "E5", "D6", "B9") and color names
 * inside a Spanish explanation or hint string so that the text matches the rotated/flipped
 * and color-inverted board position accurately.
 */
function transformSpanishGoText(
  text: string,
  size: BoardSize,
  symmetryIndex: number,
  invertColors: boolean
): string {
  const cols = 'ABCDEFGHJKLMNOPQRST';
  // Replace coordinate tokens like A1..J9 (word-bounded)
  let updated = text.replace(/\b([ABCDEFGHJ])([1-9])\b/g, (_match, colChar: string, rowStr: string) => {
    const x = cols.indexOf(colChar);
    const y = size - parseInt(rowStr, 10);
    if (x < 0 || x >= size || y < 0 || y >= size) return _match;
    const t = transformCoordSymmetry({ x, y }, size, symmetryIndex);
    return coordToLabel(t, size);
  });

  // Also replace explicit (x=..., y=...) hints if present
  updated = updated.replace(/\(x=(\d+),\s*y=(\d+)\)/g, (_m, xs: string, ys: string) => {
    const x = parseInt(xs, 10);
    const y = parseInt(ys, 10);
    const t = transformCoordSymmetry({ x, y }, size, symmetryIndex);
    return `(x=${t.x}, y=${t.y})`;
  });

  if (invertColors) {
    // Swap Negro <-> Blanco and negras <-> blancas safely via placeholders
    updated = updated
      .replace(/\bNegro\b/g, '__TMP_WHITE_CAP__')
      .replace(/\bBlanco\b/g, 'Negro')
      .replace(/__TMP_WHITE_CAP__/g, 'Blanco')
      .replace(/\bnegro\b/g, '__TMP_WHITE_LOW__')
      .replace(/\bblanco\b/g, 'negro')
      .replace(/__TMP_WHITE_LOW__/g, 'blanco')
      .replace(/\bnegras\b/g, '__TMP_WHITES_FEM__')
      .replace(/\bblancas\b/g, 'negras')
      .replace(/__TMP_WHITES_FEM__/g, 'blancas')
      .replace(/\bnegra\b/g, '__TMP_WHITE_FEM__')
      .replace(/\bblanca\b/g, 'negra')
      .replace(/__TMP_WHITE_FEM__/g, 'blanca');
  }

  return updated;
}

/**
 * Generates an engine-validated dynamic puzzle from the master catalog using
 * dihedral board symmetries (8 orientations) and color inversions (Black/White),
 * providing an unlimited stream of tactical and strategic problems.
 */
export function generateInfinitePuzzle(options: {
  sequenceNumber: number;
  difficultyFilter?: PuzzleDifficulty | 'ALL';
  themeFilter?: PuzzleTheme | 'ALL';
  catalog?: PuzzleContent[];
}): PuzzleContent {
  const sourceCatalog = options.catalog ?? PUZZLES_CATALOG;
  const filtered = sourceCatalog.filter((p) => {
    if (options.difficultyFilter && options.difficultyFilter !== 'ALL' && p.difficulty !== options.difficultyFilter) {
      return false;
    }
    if (options.themeFilter && options.themeFilter !== 'ALL' && p.theme !== options.themeFilter) {
      return false;
    }
    return true;
  });

  const pool = filtered.length > 0 ? filtered : sourceCatalog;
  const seq = Math.max(1, options.sequenceNumber);

  // Deterministic but well-distributed selection of base puzzle, symmetry (1..7 first so it differs visually), and color inversion
  const baseIdx = (seq * 7 + 3) % pool.length;
  const basePuzzle = pool[baseIdx];
  const symmetryIndex = (seq % 7) + 1; // 1..7 non-identity symmetries cycled, or 0 every 8th
  const actualSym = seq % 8 === 0 ? 0 : symmetryIndex;
  const shouldInvertColor = seq % 2 === 0;
  const size = basePuzzle.boardSize;

  const transformedInitialStones = basePuzzle.initialStones.map((s) => {
    const tc = transformCoordSymmetry({ x: s.x, y: s.y }, size, actualSym);
    return {
      x: tc.x,
      y: tc.y,
      color: shouldInvertColor ? invertColor(s.color) : s.color,
    };
  });

  const transformedAccepted = basePuzzle.acceptedFirstMoves.map((m) =>
    transformCoordSymmetry(m, size, actualSym)
  );

  const transformedVariations = basePuzzle.variations.map((v) => ({
    playerMove: transformCoordSymmetry(v.playerMove, size, actualSym),
    opponentReply: v.opponentReply
      ? transformCoordSymmetry(v.opponentReply, size, actualSym)
      : undefined,
    nextValidMoves: v.nextValidMoves
      ? v.nextValidMoves.map((nm) => transformCoordSymmetry(nm, size, actualSym))
      : undefined,
    explanationEs: transformSpanishGoText(v.explanationEs, size, actualSym, shouldInvertColor),
  }));

  const transformedWrongExplanations: Record<string, string> = {};
  for (const [key, msg] of Object.entries(basePuzzle.wrongMoveExplanations)) {
    const parts = key.split(',').map((n) => parseInt(n, 10));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      const tc = transformCoordSymmetry({ x: parts[0], y: parts[1] }, size, actualSym);
      transformedWrongExplanations[`${tc.x},${tc.y}`] = transformSpanishGoText(
        msg,
        size,
        actualSym,
        shouldInvertColor
      );
    }
  }

  const transformedMarkers = basePuzzle.markers
    ? basePuzzle.markers.map((mk) => {
        const tc = transformCoordSymmetry({ x: mk.x, y: mk.y }, size, actualSym);
        return {
          ...mk,
          x: tc.x,
          y: tc.y,
        };
      })
    : undefined;

  const firstSolLabel =
    transformedAccepted.length > 0 ? coordToLabel(transformedAccepted[0], size) : '';

  const generated: PuzzleContent = {
    ...basePuzzle,
    id: `infinite-puzzle-${seq}-base-${basePuzzle.number}-sym-${actualSym}-${shouldInvertColor ? 'W' : 'B'}`,
    number: 1000 + seq,
    title: `${basePuzzle.title} · Variante ∞ #${seq} (${SYMMETRY_LABELS[actualSym]})`,
    initialStones: transformedInitialStones,
    turn: shouldInvertColor ? invertColor(basePuzzle.turn) : basePuzzle.turn,
    objective: transformSpanishGoText(basePuzzle.objective, size, actualSym, shouldInvertColor),
    acceptedFirstMoves: transformedAccepted,
    variations: transformedVariations,
    wrongMoveExplanations: transformedWrongExplanations,
    defaultWrongExplanation: transformSpanishGoText(
      basePuzzle.defaultWrongExplanation,
      size,
      actualSym,
      shouldInvertColor
    ),
    hints: [
      transformSpanishGoText(basePuzzle.hints[0], size, actualSym, shouldInvertColor),
      transformSpanishGoText(basePuzzle.hints[1], size, actualSym, shouldInvertColor),
      `Pista 3: La jugada clave en esta orientación del tablero está en ${firstSolLabel}.`,
    ],
    solutionExplanation: transformSpanishGoText(
      basePuzzle.solutionExplanation,
      size,
      actualSym,
      shouldInvertColor
    ),
    commonMistake: transformSpanishGoText(
      basePuzzle.commonMistake,
      size,
      actualSym,
      shouldInvertColor
    ),
    markers: transformedMarkers,
  };

  // Verify with engine before returning; if any edge case occurs, fall back to basePuzzle
  const check = validateAllPuzzlesWithEngine([generated]);
  if (!check.valid) {
    return {
      ...basePuzzle,
      id: `infinite-puzzle-${seq}-fallback`,
      number: 1000 + seq,
      title: `${basePuzzle.title} · Serie ∞ #${seq}`,
    };
  }

  return generated;
}
