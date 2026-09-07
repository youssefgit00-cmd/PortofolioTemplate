import {
  GLYPH_ROWS,
  gridToPath,
  gridWidth,
  MARK_GRID,
  textToPath,
  textWidth,
} from "@/lib/brand/pixel-grid"

/** The logotype word set beside the mark. Change it here and everything follows. */
const LOGOTYPE = "Youssef"

const MARK_CELL = 64

const HEIGHT = MARK_GRID.length * MARK_CELL

/** Letters are finer than the mark, sized so both fill the same cap height. */
const TEXT_CELL = HEIGHT / GLYPH_ROWS

/** Two mark cells of air between the monogram and the first letter. */
const GAP = MARK_CELL * 2

const TEXT_X = gridWidth(MARK_GRID) * MARK_CELL + GAP
const WIDTH = TEXT_X + textWidth(LOGOTYPE) * TEXT_CELL

const WORDMARK_PATH =
  gridToPath(MARK_GRID, MARK_CELL) + textToPath(LOGOTYPE, TEXT_CELL, TEXT_X)

export function YKWordmark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      {...props}
    >
      <path fill="currentColor" d={WORDMARK_PATH} />
    </svg>
  )
}

export function getWordmarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 ${WIDTH} ${HEIGHT}"><path fill="currentColor" d="${WORDMARK_PATH}"/></svg>`
}
