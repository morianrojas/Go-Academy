import React, { useMemo, useState } from 'react';
import {
  BoardMarker,
  BoardSize,
  BoardThemeId,
  BoardVisualLayers,
  CellState,
  Coord,
  PlayerColor,
} from '../types/go';
import {
  coordKey,
  coordsEqual,
  coordToLabel,
  getAllGroups,
  getStarPoints,
} from '../engine/goEngine';
import { getBoardThemeById } from '../content/themesData';

const COL_LETTERS = 'ABCDEFGHJKLMNOPQRST';

export interface GoBoardProps {
  size: BoardSize;
  board: CellState[][];
  currentTurn: PlayerColor;
  lastMove?: Coord | null;
  koPoint?: Coord | null;
  markers?: BoardMarker[];
  visualLayers: BoardVisualLayers;
  boardTheme?: BoardThemeId;
  onToggleLayer?: (layer: keyof BoardVisualLayers) => void;
  onSelectIntersection?: (coord: Coord) => void;
  interactive?: boolean;
  territoryMap?: ('BLACK' | 'WHITE' | 'NEUTRAL')[][];
  markedDeadStones?: Coord[];
  caption?: string;
  maxWidthClass?: string;
}

export const GoBoard: React.FC<GoBoardProps> = ({
  size,
  board,
  currentTurn,
  lastMove,
  koPoint,
  markers = [],
  visualLayers,
  boardTheme,
  onToggleLayer,
  onSelectIntersection,
  interactive = true,
  territoryMap,
  markedDeadStones = [],
  caption,
  maxWidthClass = 'max-w-[490px]',
}) => {
  const [hoverCoord, setHoverCoord] = useState<Coord | null>(null);

  // Resolve active board theme from prop or global document attribute
  const resolvedBoardThemeId: BoardThemeId =
    boardTheme ??
    ((typeof document !== 'undefined'
      ? (document.documentElement.dataset.boardTheme as BoardThemeId)
      : undefined) ||
      'KAYA_TRADICIONAL');

  const themeSpec = useMemo(
    () => getBoardThemeById(resolvedBoardThemeId),
    [resolvedBoardThemeId]
  );

  const groups = useMemo(() => getAllGroups(board), [board]);
  const starPoints = useMemo(() => getStarPoints(size), [size]);

  const groupByCoord = useMemo(() => {
    const map = new Map<string, (typeof groups)[0]>();
    for (const g of groups) {
      for (const s of g.stones) {
        map.set(coordKey(s), g);
      }
    }
    return map;
  }, [groups]);

  const libertyCountByEmptyCoord = useMemo(() => {
    const map = new Map<string, { black: boolean; white: boolean }>();
    for (const g of groups) {
      for (const lib of g.liberties) {
        const key = coordKey(lib);
        const cur = map.get(key) ?? { black: false, white: false };
        if (g.color === 'BLACK') cur.black = true;
        if (g.color === 'WHITE') cur.white = true;
        map.set(key, cur);
      }
    }
    return map;
  }, [groups]);

  // SVG coordinate geometry
  const padding = visualLayers.showCoordinates ? 46 : 32;
  const cellSpan = size === 9 ? 52 : size === 13 ? 38 : 28;
  const gridSpan = (size - 1) * cellSpan;
  const svgSize = gridSpan + padding * 2;
  const stoneRadius = cellSpan * 0.44;

  const getSvgXY = (x: number, y: number) => ({
    cx: padding + x * cellSpan,
    cy: padding + y * cellSpan,
  });

  const gradSuffix = resolvedBoardThemeId.toLowerCase();

  return (
    <div className="flex flex-col items-center w-full select-none">
      {/* Board SVG + Accessible Intersection Buttons Container */}
      <div
        className={`relative w-full ${maxWidthClass} aspect-square rounded-2xl shadow-md border-2 overflow-hidden transition-colors`}
        style={{
          borderColor: themeSpec.boardBorder,
          backgroundColor: themeSpec.boardStops[1],
        }}
        data-testid="go-board-container"
        data-board-theme={resolvedBoardThemeId}
      >
        <svg
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className="w-full h-full block"
          aria-hidden="true"
        >
          <defs>
            {/* Dynamic Board Surface & Stone Gradients per BoardThemeId */}
            <linearGradient id={`woodSurface-${gradSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={themeSpec.boardStops[0]} />
              <stop offset="50%" stopColor={themeSpec.boardStops[1]} />
              <stop offset="100%" stopColor={themeSpec.boardStops[2]} />
            </linearGradient>
            <radialGradient id={`blackStoneGrad-${gradSuffix}`} cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor={themeSpec.blackStoneStops[0]} />
              <stop offset="40%" stopColor={themeSpec.blackStoneStops[1]} />
              <stop offset="100%" stopColor={themeSpec.blackStoneStops[2]} />
            </radialGradient>
            <radialGradient id={`whiteStoneGrad-${gradSuffix}`} cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor={themeSpec.whiteStoneStops[0]} />
              <stop offset="70%" stopColor={themeSpec.whiteStoneStops[1]} />
              <stop offset="100%" stopColor={themeSpec.whiteStoneStops[2]} />
            </radialGradient>
            <filter id="stoneShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#090806" floodOpacity="0.34" />
            </filter>
          </defs>

          {/* Wood/Stone board background */}
          <rect x="0" y="0" width={svgSize} height={svgSize} fill={`url(#woodSurface-${gradSuffix})`} />

          {/* Coordinate labels along top, bottom, left, right */}
          {visualLayers.showCoordinates &&
            Array.from({ length: size }).map((_, i) => {
              const colChar = COL_LETTERS[i];
              const rowNum = size - i;
              const pos = padding + i * cellSpan;
              return (
                <g
                  key={`coord-${i}`}
                  className="font-mono"
                  fill={themeSpec.coordColor}
                  fontSize={size === 19 ? 10 : 12}
                  fontWeight="600"
                >
                  {/* Top & Bottom column letters */}
                  <text x={pos} y={padding * 0.45} textAnchor="middle" dominantBaseline="central">
                    {colChar}
                  </text>
                  <text x={pos} y={svgSize - padding * 0.42} textAnchor="middle" dominantBaseline="central">
                    {colChar}
                  </text>
                  {/* Left & Right row numbers */}
                  <text x={padding * 0.42} y={pos} textAnchor="middle" dominantBaseline="central">
                    {rowNum}
                  </text>
                  <text x={svgSize - padding * 0.42} y={pos} textAnchor="middle" dominantBaseline="central">
                    {rowNum}
                  </text>
                </g>
              );
            })}

          {/* Grid lines (intersections) */}
          <g stroke={themeSpec.gridColor} strokeWidth={size === 19 ? 1.15 : 1.45}>
            {Array.from({ length: size }).map((_, i) => {
              const pos = padding + i * cellSpan;
              const isOuter = i === 0 || i === size - 1;
              return (
                <React.Fragment key={`line-${i}`}>
                  <line
                    x1={padding}
                    y1={pos}
                    x2={padding + gridSpan}
                    y2={pos}
                    strokeWidth={isOuter ? 2 : size === 19 ? 1.15 : 1.45}
                  />
                  <line
                    x1={pos}
                    y1={padding}
                    x2={pos}
                    y2={padding + gridSpan}
                    strokeWidth={isOuter ? 2 : size === 19 ? 1.15 : 1.45}
                  />
                </React.Fragment>
              );
            })}
          </g>

          {/* Star points (Hoshi) */}
          {starPoints.map((pt) => {
            const { cx, cy } = getSvgXY(pt.x, pt.y);
            return (
              <circle
                key={`hoshi-${pt.x}-${pt.y}`}
                cx={cx}
                cy={cy}
                r={size === 19 ? 3.2 : 4}
                fill={themeSpec.starColor}
              />
            );
          })}

          {/* Layer: Group connection lines */}
          {visualLayers.showGroups &&
            groups.map((group) =>
              group.stones.map((stone) => {
                const { cx, cy } = getSvgXY(stone.x, stone.y);
                const rightNeighbor = group.stones.find(
                  (s) => s.x === stone.x + 1 && s.y === stone.y
                );
                const downNeighbor = group.stones.find(
                  (s) => s.x === stone.x && s.y === stone.y + 1
                );
                const strokeColor = group.color === 'BLACK' ? '#08745C' : '#D97706';
                return (
                  <g
                    key={`grp-link-${stone.x}-${stone.y}`}
                    stroke={strokeColor}
                    strokeWidth={6}
                    strokeLinecap="round"
                    opacity={0.65}
                  >
                    {rightNeighbor && <line x1={cx} y1={cy} x2={cx + cellSpan} y2={cy} />}
                    {downNeighbor && <line x1={cx} y1={cy} x2={cx} y2={cy + cellSpan} />}
                  </g>
                );
              })
            )}

          {/* Layer: Liberties indicators on empty intersections */}
          {visualLayers.showLiberties &&
            Array.from(libertyCountByEmptyCoord.entries()).map(([key, owners]) => {
              const [xStr, yStr] = key.split(',');
              const x = Number(xStr);
              const y = Number(yStr);
              // Do not overlap with a pedagogical marker or Ko marker on the same empty intersection
              const hasMarkerHere = markers.some((m) => m.x === x && m.y === y);
              const hasKoHere = coordsEqual(koPoint, { x, y });
              if (hasMarkerHere || hasKoHere) return null;

              const { cx, cy } = getSvgXY(x, y);
              const fill =
                owners.black && owners.white
                  ? '#B66A3C'
                  : owners.black
                  ? '#173C35'
                  : '#F5F1E8';
              const stroke = owners.black && !owners.white ? '#F5F1E8' : '#173C35';
              return (
                <g key={`lib-${key}`}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={cellSpan * 0.16}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={1.5}
                  />
                </g>
              );
            })}

          {/* Layer: Ko point marker */}
          {koPoint && (
            <g>
              {(() => {
                const { cx, cy } = getSvgXY(koPoint.x, koPoint.y);
                return (
                  <>
                    <rect
                      x={cx - cellSpan * 0.22}
                      y={cy - cellSpan * 0.22}
                      width={cellSpan * 0.44}
                      height={cellSpan * 0.44}
                      fill="none"
                      stroke="#DC2626"
                      strokeWidth={2.2}
                    />
                    <text
                      x={cx}
                      y={cy + 0.5}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={9}
                      fontWeight="700"
                      fill="#DC2626"
                    >
                      KO
                    </text>
                  </>
                );
              })()}
            </g>
          )}

          {/* Placed Stones on Intersections */}
          {board.map((row, y) =>
            row.map((cell, x) => {
              if (cell === 'EMPTY') return null;
              const { cx, cy } = getSvgXY(x, y);
              const group = groupByCoord.get(`${x},${y}`);
              const isAtari = visualLayers.showAtari && group?.inAtari;
              const isDead = markedDeadStones.some((d) => coordsEqual(d, { x, y }));
              const showLibertyTextHere = Boolean(
                visualLayers.showLiberties &&
                  !isDead &&
                  group &&
                  coordsEqual(group.stones[0], { x, y })
              );
              const stoneMarker = !showLibertyTextHere && !isDead
                ? markers.find((m) => m.x === x && m.y === y)
                : undefined;
              const hasStoneSymbol =
                showLibertyTextHere ||
                isDead ||
                Boolean(stoneMarker?.label || stoneMarker?.type === 'TRIANGLE');
              const isLast =
                visualLayers.showLastMove &&
                !hasStoneSymbol &&
                coordsEqual(lastMove, { x, y });

              return (
                <g key={`stone-${x}-${y}`} opacity={isDead ? 0.42 : 1}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={stoneRadius}
                    fill={
                      cell === 'BLACK'
                        ? `url(#blackStoneGrad-${gradSuffix})`
                        : `url(#whiteStoneGrad-${gradSuffix})`
                    }
                    stroke={
                      cell === 'BLACK' ? themeSpec.blackStoneStroke : themeSpec.whiteStoneStroke
                    }
                    strokeWidth={1.2}
                    filter="url(#stoneShadow)"
                  />

                  {/* Last move marker (only when no text/symbol is shown on this stone) */}
                  {isLast && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={stoneRadius * 0.34}
                      fill="none"
                      stroke={cell === 'BLACK' ? '#F5F1E8' : '#173C35'}
                      strokeWidth={2.4}
                    />
                  )}

                  {/* Atari warning ring + accessible symbol */}
                  {isAtari && (
                    <g>
                      <circle
                        cx={cx}
                        cy={cy}
                        r={stoneRadius + 2.5}
                        fill="none"
                        stroke="#DC2626"
                        strokeWidth={2.5}
                        strokeDasharray="4 2"
                      />
                      <circle
                        cx={cx + stoneRadius * 0.68}
                        cy={cy - stoneRadius * 0.68}
                        r={7}
                        fill="#DC2626"
                        stroke="#F5F1E8"
                        strokeWidth={1.2}
                      />
                      <text
                        x={cx + stoneRadius * 0.68}
                        y={cy - stoneRadius * 0.68 + 0.5}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#FFFFFF"
                        fontSize={9}
                        fontWeight="800"
                      >
                        !
                      </text>
                    </g>
                  )}

                  {/* Exclusive central symbol on stone: either Dead X, Liberty Count, or Pedagogical Marker */}
                  {isDead ? (
                    <g stroke="#DC2626" strokeWidth={2.5}>
                      <line x1={cx - 8} y1={cy - 8} x2={cx + 8} y2={cy + 8} />
                      <line x1={cx + 8} y1={cy - 8} x2={cx - 8} y2={cy + 8} />
                    </g>
                  ) : showLibertyTextHere && group ? (
                    <text
                      x={cx}
                      y={cy}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill={cell === 'BLACK' ? '#F5F1E8' : '#173C35'}
                      fontSize={11}
                      fontWeight="700"
                      className="font-mono"
                    >
                      {group.liberties.length}L
                    </text>
                  ) : stoneMarker ? (
                    <g>
                      {stoneMarker.type === 'TRIANGLE' && !stoneMarker.label && (
                        <polygon
                          points={`${cx},${cy - stoneRadius * 0.48} ${cx - stoneRadius * 0.42},${cy + stoneRadius * 0.32} ${cx + stoneRadius * 0.42},${cy + stoneRadius * 0.32}`}
                          fill="none"
                          stroke={cell === 'BLACK' ? '#F5F1E8' : '#173C35'}
                          strokeWidth={2.2}
                        />
                      )}
                      {stoneMarker.label && (
                        <text
                          x={cx}
                          y={cy + 0.5}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill={cell === 'BLACK' ? '#F5F1E8' : '#173C35'}
                          fontSize={11}
                          fontWeight="700"
                          className="font-mono"
                        >
                          {stoneMarker.label}
                        </text>
                      )}
                    </g>
                  ) : null}
                </g>
              );
            })
          )}

          {/* Territory ownership markers when showTerritory / territoryMap is passed */}
          {territoryMap &&
            territoryMap.map((row, y) =>
              row.map((owner, x) => {
                if (owner === 'NEUTRAL') return null;
                const { cx, cy } = getSvgXY(x, y);
                return (
                  <rect
                    key={`terr-${x}-${y}`}
                    x={cx - cellSpan * 0.18}
                    y={cy - cellSpan * 0.18}
                    width={cellSpan * 0.36}
                    height={cellSpan * 0.36}
                    rx={2}
                    fill={owner === 'BLACK' ? '#101311' : '#FFFFFF'}
                    stroke={owner === 'BLACK' ? '#F5F1E8' : '#202622'}
                    strokeWidth={1.2}
                  />
                );
              })
            )}

          {/* Pedagogical Markers on EMPTY intersections only (stone markers are handled exclusively inside the stone group above) */}
          {markers.map((m, idx) => {
            if (m.x < 0 || m.x >= size || m.y < 0 || m.y >= size) return null;
            if (board[m.y][m.x] !== 'EMPTY') return null;
            const { cx, cy } = getSvgXY(m.x, m.y);
            const fgColor =
              m.type === 'DANGER'
                ? '#B91C1C'
                : m.type === 'SUCCESS'
                ? '#173C35'
                : '#173C35';

            return (
              <g key={`marker-${idx}-${m.x}-${m.y}`}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={stoneRadius * 0.56}
                  fill={
                    m.type === 'DANGER'
                      ? '#FEE2E2'
                      : m.type === 'SUCCESS'
                      ? '#D1FAE5'
                      : '#F5F1E8'
                  }
                  stroke={fgColor}
                  strokeWidth={2}
                />
                {m.label && (
                  <text
                    x={cx}
                    y={cy + 0.5}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={fgColor}
                    fontSize={11}
                    fontWeight="700"
                    className="font-mono"
                  >
                    {m.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Ghost hover preview stone on empty intersection */}
          {interactive &&
            hoverCoord &&
            board[hoverCoord.y]?.[hoverCoord.x] === 'EMPTY' && (
              <circle
                cx={getSvgXY(hoverCoord.x, hoverCoord.y).cx}
                cy={getSvgXY(hoverCoord.x, hoverCoord.y).cy}
                r={stoneRadius}
                fill={currentTurn === 'BLACK' ? '#101311' : '#FFFFFF'}
                stroke={currentTurn === 'BLACK' ? '#F5F1E8' : '#202622'}
                strokeWidth={1.5}
                opacity={0.45}
              />
            )}
        </svg>

        {/* Accessible HTML Button Grid exactly aligned with every SVG intersection */}
        {interactive && onSelectIntersection && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: size }).map((_, y) =>
              Array.from({ length: size }).map((__, x) => {
                const { cx, cy } = getSvgXY(x, y);
                const leftPct = (cx / svgSize) * 100;
                const topPct = (cy / svgSize) * 100;
                const sizePct = (cellSpan / svgSize) * 100;
                const label = coordToLabel({ x, y }, size);
                const cellState = board[y][x];
                const stateDesc =
                  cellState === 'BLACK'
                    ? 'ocupada por Negro'
                    : cellState === 'WHITE'
                    ? 'ocupada por Blanco'
                    : 'vacía';

                return (
                  <button
                    key={`btn-${x}-${y}`}
                    type="button"
                    aria-label={`Intersección ${label} (${stateDesc})`}
                    data-coord={label}
                    onClick={() => onSelectIntersection({ x, y })}
                    onMouseEnter={() => setHoverCoord({ x, y })}
                    onMouseLeave={() => setHoverCoord(null)}
                    style={{
                      left: `${leftPct}%`,
                      top: `${topPct}%`,
                      width: `${sizePct}%`,
                      height: `${sizePct}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className="absolute pointer-events-auto rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--app-primary)] cursor-pointer"
                  />
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Caption if provided */}
      {caption && (
        <p className="mt-2.5 text-xs text-[var(--app-muted)] text-center max-w-md leading-relaxed">
          {caption}
        </p>
      )}

      {/* Visual Layers Control Strip */}
      {onToggleLayer && (
        <div
          className="mt-3 flex flex-wrap items-center justify-center gap-1.5"
          role="group"
          aria-label="Capas visuales del tablero"
        >
          {(
            [
              { key: 'showCoordinates', label: 'Coordenadas' },
              { key: 'showAtari', label: 'Alerta Atari' },
              { key: 'showLiberties', label: 'Libertades' },
              { key: 'showGroups', label: 'Grupos' },
              { key: 'showLastMove', label: 'Última jugada' },
            ] as const
          ).map((item) => {
            const active = Boolean(visualLayers[item.key]);
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onToggleLayer(item.key)}
                aria-pressed={active}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer border ${
                  active
                    ? 'bg-[var(--app-primary)] text-white border-[var(--app-primary)]'
                    : 'bg-[var(--app-surface)] text-[var(--app-text)] border-[var(--app-border)] hover:opacity-90'
                }`}
              >
                {active ? '✓ ' : ''}
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
