"use client"

import { useEffect, useId, useRef } from "react"
import type { Transition } from "motion/react"
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

import {
  buildIsometricMark,
  ISO_VIEW_BOX,
  ISO_VIEW_BOX_ATTR,
} from "@/lib/brand/isometric-mark"
import { metalClickSound } from "@/lib/soundcn/metal-click"
import { useSound } from "@/hooks/soundcn/use-sound"

const transition: Transition = {
  type: "spring",
  mass: 0.5,
  damping: 18,
  stiffness: 200,
}

/** How far the top face sinks into the plate while held. */
const PRESS_DEPTH = 16

const REST = buildIsometricMark(0)
const PRESSED = buildIsometricMark(PRESS_DEPTH)

/** Inspired by tailwindcss.com. */
export function YKMarkIsometric() {
  const id = useId()
  const ids = {
    facePattern: `yk-face-pattern-${id}`,
    faceFill: `yk-face-fill-${id}`,
    stroke: `yk-stroke-${id}`,
    radialGradient: `yk-radial-gradient-${id}`,
  }

  const ref = useRef<SVGSVGElement>(null)

  const [play] = useSound(metalClickSound)

  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(ref, { margin: "80px" })

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const cx = useSpring(
    useTransform(
      mouseX,
      [0, 1],
      [ISO_VIEW_BOX.minX, ISO_VIEW_BOX.minX + ISO_VIEW_BOX.width]
    ),
    { stiffness: 300, damping: 30, mass: 0.1 }
  )

  const cy = useSpring(
    useTransform(
      mouseY,
      [0, 1],
      [ISO_VIEW_BOX.minY, ISO_VIEW_BOX.minY + ISO_VIEW_BOX.height]
    ),
    { stiffness: 300, damping: 30, mass: 0.1 }
  )

  useEffect(() => {
    if (shouldReduceMotion || !isInView) {
      return
    }

    if (window.matchMedia("(hover: none)").matches) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth)
      mouseY.set(e.clientY / window.innerHeight)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [shouldReduceMotion, isInView, mouseX, mouseY])

  return (
    <motion.svg
      ref={ref}
      className="h-auto w-full touch-manipulation overflow-visible [--pattern:color-mix(in_oklab,var(--brand)_24%,var(--background))] [--stroke:color-mix(in_oklab,var(--brand)_32%,var(--background))]"
      viewBox={ISO_VIEW_BOX_ATTR}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      initial="normal"
      whileTap="pressed"
      onTap={() => play()}
    >
      <defs>
        <pattern
          id={ids.facePattern}
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M-1 1l2 -2M0 10l10 -10M9 11l2 -2"
            stroke="var(--pattern)"
            strokeWidth="1"
          />
        </pattern>

        <motion.radialGradient
          id={ids.radialGradient}
          cx={cx}
          cy={cy}
          r="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--brand)" />
          <stop offset="1" stopColor="var(--brand)" stopOpacity="0" />
        </motion.radialGradient>
      </defs>

      <g className="stroke-line" strokeWidth="1" strokeDasharray="4 2">
        <path d="M-477.55 756.57L1254.51 -243.41" />
        <path d="M977.37 788.58L-754.67 -211.42" />
        <path d="M1143.65 692.58L-588.39 -307.42" />
      </g>

      {/* Extrusion faces: opaque first so the hatch never shows what is behind. */}
      <motion.path
        className="fill-background"
        variants={{ normal: { d: REST.sides }, pressed: { d: PRESSED.sides } }}
        transition={transition}
      />
      <motion.path
        fill={`url(#${ids.facePattern})`}
        variants={{ normal: { d: REST.sides }, pressed: { d: PRESSED.sides } }}
        transition={transition}
      />

      <motion.path
        className="fill-background"
        variants={{ normal: { d: REST.top }, pressed: { d: PRESSED.top } }}
        transition={transition}
      />

      <motion.path
        stroke="var(--stroke)"
        variants={{
          normal: { d: REST.outline },
          pressed: { d: PRESSED.outline },
        }}
        transition={transition}
      />
      <motion.path
        stroke={`url(#${ids.radialGradient})`}
        variants={{
          normal: { d: REST.outline },
          pressed: { d: PRESSED.outline },
        }}
        transition={transition}
      />
    </motion.svg>
  )
}
