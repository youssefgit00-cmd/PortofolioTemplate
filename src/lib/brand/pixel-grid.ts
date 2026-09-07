/**
 * Pixel-grid brand primitives.
 *
 * The mark and the logotype are the same idea at two scales: a bitmap drawn on
 * a square grid, rasterised into an SVG path. Keeping the bitmaps here (rather
 * than as hand-authored path data) means the flat mark, the wordmark, and the
 * isometric mark cannot drift apart, and the logotype word can be changed
 * without redrawing anything.
 *
 * A `#` is a filled cell, anything else is empty.
 */

export type PixelGrid = readonly string[]

/**
 * The "YK" monogram: 8 columns wide, 5 rows tall.
 *
 * Five rows rather than four: at four the K's arms degrade into squares that
 * touch the stem only at a corner and read as detached.
 */
export const MARK_GRID: PixelGrid = [
  "#.#.#..#",
  "#.#.#.#.",
  ".#..##..",
  ".#..#.#.",
  ".#..#..#",
]

/** Every logotype glyph is 8 rows tall so baselines line up by construction. */
export const GLYPH_ROWS = 8

/** Empty columns inserted between adjacent glyphs. */
export const LETTER_SPACING = 1

/**
 * Capitals and ascenders fill all 8 rows; x-height letters start at row 2.
 * Corners step diagonally by one cell, which is what gives the family its
 * chamfered look.
 */
export const GLYPHS: Record<string, PixelGrid> = {
  Y: ["#...#", "#...#", "#...#", ".#.#.", "..#..", "..#..", "..#..", "..#.."],
  K: ["#...#", "#..#.", "#.#..", "##...", "##...", "#.#..", "#..#.", "#...#"],
  C: [".###.", "#...#", "#....", "#....", "#....", "#....", "#...#", ".###."],

  a: [".....", ".....", ".####", "#...#", "#...#", "#...#", "#..##", ".##.#"],
  c: [".###.", "#...#", "#....", "#....", "#....", "#....", "#...#", ".###."],
  d: ["###..", "#..#.", "#...#", "#...#", "#...#", "#...#", "#..#.", "###.."],
  e: [".....", ".....", ".###.", "#...#", "#####", "#....", "#...#", ".###."],
  f: ["..###", ".#...", ".#...", "####.", ".#...", ".#...", ".#...", ".#..."],
  h: ["#....", "#....", "####.", "#...#", "#...#", "#...#", "#...#", "#...#"],
  i: [".#", "..", "##", ".#", ".#", ".#", ".#", ".#"],
  k: ["#....", "#....", "#...#", "#..#.", "##...", "#.#..", "#..#.", "#...#"],
  l: ["##", ".#", ".#", ".#", ".#", ".#", ".#", ".#"],
  n: [".....", ".....", "####.", "#...#", "#...#", "#...#", "#...#", "#...#"],
  o: [".....", ".....", ".###.", "#...#", "#...#", "#...#", "#...#", ".###."],
  s: [".....", ".....", ".####", "#....", ".###.", "....#", "#...#", ".###."],
  u: [".....", ".....", "#...#", "#...#", "#...#", "#...#", "#...#", ".####"],
  y: ["#...#", "#...#", "#...#", "#...#", ".#.#.", "..#..", "..#..", "..#.."],
}

export function gridWidth(grid: PixelGrid): number {
  return grid.reduce((max, row) => Math.max(max, row.length), 0)
}

/** Width of `text` in grid cells, including inter-glyph spacing. */
export function textWidth(text: string): number {
  return [...text].reduce((width, char, index) => {
    const glyph = GLYPHS[char]
    if (!glyph) return width
    return width + (index > 0 ? LETTER_SPACING : 0) + gridWidth(glyph)
  }, 0)
}

type Cell = { x: number; y: number; w: number; h: number }

/**
 * Greedy rectangle cover: grow right while the row stays filled, then grow down
 * while the whole run stays filled. Emitting a handful of merged rectangles
 * instead of one per cell keeps the copyable SVG readable.
 */
function coverCells(grid: PixelGrid): Cell[] {
  const width = gridWidth(grid)
  const filled = grid.map((row) =>
    Array.from({ length: width }, (_, x) => row[x] === "#")
  )

  const cells: Cell[] = []

  for (let y = 0; y < filled.length; y++) {
    for (let x = 0; x < width; x++) {
      if (!filled[y][x]) continue

      let w = 0
      while (x + w < width && filled[y][x + w]) w++

      let h = 1
      while (
        y + h < filled.length &&
        Array.from({ length: w }, (_, i) => filled[y + h][x + i]).every(Boolean)
      ) {
        h++
      }

      for (let dy = 0; dy < h; dy++) {
        for (let dx = 0; dx < w; dx++) filled[y + dy][x + dx] = false
      }

      cells.push({ x, y, w, h })
    }
  }

  return cells
}

export function gridToPath(
  grid: PixelGrid,
  cell: number,
  offsetX = 0,
  offsetY = 0
): string {
  return coverCells(grid)
    .map(({ x, y, w, h }) => {
      const px = offsetX + x * cell
      const py = offsetY + y * cell
      return `M${px} ${py}h${w * cell}v${h * cell}h-${w * cell}Z`
    })
    .join("")
}

export function textToPath(
  text: string,
  cell: number,
  offsetX = 0,
  offsetY = 0
): string {
  let cursor = 0

  return [...text]
    .map((char) => {
      const glyph = GLYPHS[char]
      if (!glyph) return ""

      const path = gridToPath(glyph, cell, offsetX + cursor * cell, offsetY)
      cursor += gridWidth(glyph) + LETTER_SPACING
      return path
    })
    .join("")
}
