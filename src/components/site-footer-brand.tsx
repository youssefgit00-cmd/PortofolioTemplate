"use client"

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

import { GLYPH_ROWS, textToPath, textWidth } from "@/lib/brand/pixel-grid"

/** The oversized word at the foot of every page. Change it here and the
 * geometry, viewBox, and gradient sweep all follow. */
const LOGOTYPE = "YK"

const CELL = 32

/** Half a stroke of padding so the outline is not clipped by the viewBox. */
const INSET = 1

const HEIGHT = GLYPH_ROWS * CELL + INSET * 2
const VIEWBOX_WIDTH = textWidth(LOGOTYPE) * CELL + INSET * 2

const LOGOTYPE_PATH = textToPath(LOGOTYPE, CELL, INSET, INSET)

export function SiteFooterInteractiveLogotype() {
  const shouldReduceMotion = useReducedMotion()

  const gradientX1Raw = useMotionValue(0.5)
  const gradientX1 = useSpring(
    useTransform(gradientX1Raw, [0, 1], [0, VIEWBOX_WIDTH]),
    {
      stiffness: 150,
      damping: 25,
    }
  )

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return

    const containerRect = event.currentTarget.getBoundingClientRect()
    gradientX1Raw.set(
      (event.clientX - containerRect.left) / containerRect.width
    )
  }

  const handleMouseLeave = () => {
    if (shouldReduceMotion) return
    gradientX1Raw.set(0.5)
  }

  return (
    <div className="screen-line-bottom after:z-1 after:bg-foreground/15">
      <div
        className="overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex w-full translate-y-[37.5%] items-center justify-center">
          <svg
            className="h-48 w-auto md:h-64"
            viewBox={`0 0 ${VIEWBOX_WIDTH} ${HEIGHT}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label={LOGOTYPE}
          >
            {/* Ghosted base so the word reads before the gradient sweeps it. */}
            <path className="fill-foreground/10" d={LOGOTYPE_PATH} />
            <path d={LOGOTYPE_PATH} fill="url(#site-footer-logotype-sweep)" />

            <defs>
              <motion.linearGradient
                id="site-footer-logotype-sweep"
                x1={gradientX1}
                y1={INSET}
                x2={VIEWBOX_WIDTH / 2}
                y2={HEIGHT - INSET}
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0.625"
                  stopColor="var(--foreground)"
                  stopOpacity="0"
                />
                <stop offset="1" stopColor="var(--foreground)" />
              </motion.linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-1/2 hidden h-px w-[50%] max-w-full -translate-x-1/2 dark:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0) 0%, rgba(228, 228, 231, 0.3) 50%, rgba(0, 0, 0, 0) 100%)",
        }}
        aria-hidden
      />
    </div>
  )
}
