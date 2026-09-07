import { gridToPath, gridWidth, MARK_GRID } from "@/lib/brand/pixel-grid"

const CELL = 64

const WIDTH = gridWidth(MARK_GRID) * CELL
const HEIGHT = MARK_GRID.length * CELL

const MARK_PATH = gridToPath(MARK_GRID, CELL)

export function YKMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      aria-hidden
      {...props}
    >
      <path fill="currentColor" d={MARK_PATH} />
    </svg>
  )
}

/** Half-scale copy of the mark, for the "copy as SVG" brand actions. */
export function getMarkSVG() {
  const cell = CELL / 2
  const width = gridWidth(MARK_GRID) * cell
  const height = MARK_GRID.length * cell

  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 ${width} ${height}"><path fill="currentColor" d="${gridToPath(MARK_GRID, cell)}"/></svg>`
}
