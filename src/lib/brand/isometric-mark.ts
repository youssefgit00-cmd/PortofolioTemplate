import { MARK_GRID } from "./pixel-grid"

/**
 * Projects the flat mark bitmap into an isometric plate of extruded cubes.
 *
 * The hero mark used to be hand-drawn path data exported from Figma, which made
 * it impossible to keep in sync with the flat mark. Deriving it from the same
 * bitmap means the monogram only has to be authored once.
 */

/** Half the width and height of a projected cell, giving a 2:1 isometric tile. */
const HALF_W = 55.43
const HALF_H = 32

/** Plate thickness at rest. Pressing the mark sinks the top face into it. */
export const THICKNESS = 32

type Point = [number, number]

const CELLS = MARK_GRID.flatMap((row, v) =>
  [...row].flatMap((char, u) => (char === "#" ? [{ u, v }] : []))
)

const isFilled = (u: number, v: number) => MARK_GRID[v]?.[u] === "#"

const polygon = (points: Point[]) =>
  `M${points.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join("L")}Z`

type Faces = { top: string; sides: string; outline: string }

/**
 * @param sink How far the top face has sunk into the plate, 0 at rest.
 */
export function buildIsometricMark(sink = 0): Faces {
  const tops: string[] = []
  const sides: string[] = []

  // Painter's order: cells further from the camera have a smaller u + v, so
  // drawing them first lets nearer cells overlap their extrusion faces.
  const ordered = [...CELLS].sort((a, b) => a.u + a.v - (b.u + b.v))

  for (const { u, v } of ordered) {
    const x = (u - v) * HALF_W
    const y = (u + v) * HALF_H + sink

    const n: Point = [x, y]
    const e: Point = [x + HALF_W, y + HALF_H]
    const s: Point = [x, y + 2 * HALF_H]
    const w: Point = [x - HALF_W, y + HALF_H]

    // The bottom of the plate stays put while the top sinks, so the visible
    // extrusion shortens by exactly the sink amount.
    const drop = THICKNESS - sink
    const lower = ([px, py]: Point): Point => [px, py + drop]

    // A face is only cut where no neighbour hides it: +u shares the E-S edge,
    // +v shares the W-S edge.
    if (!isFilled(u + 1, v)) sides.push(polygon([e, s, lower(s), lower(e)]))
    if (!isFilled(u, v + 1)) sides.push(polygon([w, s, lower(s), lower(w)]))

    tops.push(polygon([n, e, s, w]))
  }

  return {
    top: tops.join(""),
    sides: sides.join(""),
    outline: [...sides, ...tops].join(""),
  }
}

export type ViewBox = {
  minX: number
  minY: number
  width: number
  height: number
}

export const ISO_VIEW_BOX: ViewBox = (() => {
  const xs: number[] = []
  const ys: number[] = []

  for (const { u, v } of CELLS) {
    const x = (u - v) * HALF_W
    const y = (u + v) * HALF_H

    xs.push(x - HALF_W, x + HALF_W)
    ys.push(y, y + 2 * HALF_H + THICKNESS)
  }

  // Half a stroke width of padding so the outline is not clipped.
  const pad = 1
  const minX = Math.min(...xs) - pad
  const minY = Math.min(...ys) - pad

  return {
    minX,
    minY,
    width: Math.max(...xs) - minX + pad,
    height: Math.max(...ys) - minY + pad,
  }
})()

export const ISO_VIEW_BOX_ATTR = [
  ISO_VIEW_BOX.minX,
  ISO_VIEW_BOX.minY,
  ISO_VIEW_BOX.width,
  ISO_VIEW_BOX.height,
]
  .map((value) => value.toFixed(2))
  .join(" ")
