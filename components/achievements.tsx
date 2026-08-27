"use client"

import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion"
import { useRef } from "react"

import { ShootingStars } from "@/components/shooting-stars"
import { useTheme } from "@/components/theme"

const ITEMS = [
  {
    title: "2nd Rank — Coding Premier League",
    context: "Aproksha Tech Fest",
    detail: "1-on-1 competitive programming contest, placed 2nd with a 5-member team.",
  },
  {
    title: "1st in batch — Cicada & CodeRed",
    context: "Aproksha Tech Fest",
    detail:
      "Topped the batch in both the cybersecurity contest (3rd overall) and the ICPC-style coding contest (4th overall).",
  },
  {
    title: "2nd in Gravity · 10th GDG · 11th Geekhaven",
    context: "CC Wing technical selections",
    detail: "Ranked across three college technical wing selection rounds in the same season.",
  },
  {
    title: "Top 300 of 70,000+",
    context: "Amazon HackOn",
    detail: "Selected among the top 300 participants nationwide.",
  },
  {
    title: "Agentic AI training",
    context: "Google Cloud workshop",
    detail: "Hands-on workshop on building and deploying agentic AI solutions on Google Cloud.",
  },
]

/** Static coordinates so server and client render identically. */
const STARS = [
  { top: 7, left: 6, size: 2, dur: 4.2, delay: 0 },
  { top: 14, left: 22, size: 3, dur: 5.6, delay: 0.9 },
  { top: 6, left: 41, size: 2, dur: 4.8, delay: 1.8 },
  { top: 19, left: 58, size: 2, dur: 6.1, delay: 0.4 },
  { top: 10, left: 74, size: 3, dur: 5.2, delay: 2.4 },
  { top: 22, left: 88, size: 2, dur: 4.4, delay: 1.2 },
  { top: 31, left: 12, size: 2, dur: 5.9, delay: 2.1 },
  { top: 27, left: 33, size: 2, dur: 4.6, delay: 3.1 },
  { top: 36, left: 66, size: 3, dur: 5.4, delay: 0.7 },
  { top: 30, left: 94, size: 2, dur: 6.3, delay: 1.6 },
  { top: 45, left: 4, size: 3, dur: 4.9, delay: 2.7 },
  { top: 48, left: 47, size: 2, dur: 5.7, delay: 0.2 },
  { top: 43, left: 81, size: 2, dur: 4.3, delay: 3.4 },
  { top: 56, left: 18, size: 2, dur: 6, delay: 1.1 },
  { top: 60, left: 71, size: 3, dur: 5.1, delay: 2.9 },
  { top: 53, left: 91, size: 2, dur: 4.7, delay: 0.6 },
  { top: 67, left: 9, size: 2, dur: 5.5, delay: 3.6 },
  { top: 64, left: 38, size: 2, dur: 4.1, delay: 1.9 },
  { top: 71, left: 84, size: 2, dur: 6.2, delay: 0.3 },
  { top: 76, left: 55, size: 3, dur: 5.3, delay: 2.2 },
]

/** Resting tilt per sign — small, so nothing reads as broken. */
const TILT = [-1.4, 1.2, -1, 1.5, -0.8]

export function Achievements() {
  const ref = useRef<HTMLElement>(null)
  const { mode } = useTheme()
  const reduced = useReducedMotion()
  const isDark = mode === "dark"

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  // One continuous cursor: which sign is currently being handed over.
  const cursorRaw = useTransform(scrollYProgress, [0, 1], [-0.12, ITEMS.length - 0.62])
  const cursor = useSpring(cursorRaw, { stiffness: 150, damping: 34, mass: 0.5 })

  const skyY = useTransform(scrollYProgress, [0, 1], [0, -28])
  const cloudY = useTransform(scrollYProgress, [0, 1], [16, -20])
  const headY = useTransform(scrollYProgress, [0, 1], [0, -16])

  return (
    <section
      ref={ref}
      id="achievements"
      className="relative bg-background"
      style={{ height: reduced ? "auto" : `${ITEMS.length * 76 + 100}svh` }}
    >
      <div
        className={
          reduced
            ? "relative overflow-hidden px-6 py-24 sm:px-12"
            : "sticky top-0 flex h-[100svh] flex-col overflow-hidden px-4 sm:px-8"
        }
      >
        {/* sky wash — dissolves into the sections above and below */}
        <motion.div
          aria-hidden="true"
          style={reduced ? undefined : { y: skyY }}
          className="pointer-events-none absolute inset-x-0 -inset-y-12 [mask-image:linear-gradient(to_bottom,transparent_0%,#000_16%,#000_84%,transparent_100%)]"
        >
          <div
            className="h-full w-full"
            style={{
              background: isDark
                ? "linear-gradient(to bottom, color-mix(in oklab, var(--night) 86%, black) 0%, var(--night) 60%, color-mix(in oklab, var(--night) 93%, var(--cream)) 100%)"
                : "linear-gradient(to bottom, color-mix(in oklab, var(--scene-base) 70%, var(--cream)) 0%, var(--cream) 55%, color-mix(in oklab, var(--sun) 20%, var(--cream)) 100%)",
              transition: "background 0.7s ease",
            }}
          />
        </motion.div>

        {/* stars */}
        <motion.div
          aria-hidden="true"
          style={reduced ? undefined : { y: skyY }}
          className="pointer-events-none absolute inset-0"
        >
          {STARS.map((s, i) => (
            <span
              key={i}
              className="ach-twinkle absolute rounded-full"
              style={{
                top: `${s.top}%`,
                left: `${s.left}%`,
                width: s.size,
                height: s.size,
                background: isDark ? "var(--cream)" : "var(--foreground)",
                ["--twinkle-lo" as string]: isDark ? 0.22 : 0.05,
                ["--twinkle-hi" as string]: isDark ? 0.85 : 0.16,
                animationDuration: `${s.dur}s`,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}
        </motion.div>

        <ShootingStars active={isDark && !reduced} />

        {/* heading */}
        <motion.div
          style={reduced ? undefined : { y: headY }}
          className="relative z-20 flex shrink-0 flex-col items-center gap-1.5 pt-20 text-center sm:pt-24"
        >
          <p className="mono-label text-muted-foreground">Achievements</p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-[clamp(1.85rem,4.4vw,3rem)] font-semibold text-balance"
          >
            Where it showed up
          </motion.h2>
        </motion.div>

        {/* the signs */}
        {reduced ? (
          <div className="relative z-10 mx-auto mt-12 flex w-full max-w-[46rem] flex-col gap-5">
            {ITEMS.map((it, i) => (
              <Plank key={it.title} item={it} index={i} />
            ))}
          </div>
        ) : (
          <div className="relative z-10 flex-1">
            {ITEMS.map((it, i) => (
              <div
                key={it.title}
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                style={{ zIndex: i + 1 }}
              >
                <Sign item={it} index={i} cursor={cursor} />
              </div>
            ))}
          </div>
        )}

        {/* progress rail */}
        {!reduced && (
          <div className="relative z-20 mx-auto flex shrink-0 items-center gap-2 pb-9">
            {ITEMS.map((it, i) => (
              <Tick key={it.title} index={i} cursor={cursor} />
            ))}
          </div>
        )}

        {/* the cloud bank the signs rise out of */}
        <motion.div
          aria-hidden="true"
          style={reduced ? undefined : { y: cloudY }}
          className="pointer-events-none absolute inset-x-[-8%] bottom-0 z-[15] h-20 sm:h-24"
        >
          <div className="ach-drift h-full w-full">
            <svg viewBox="0 0 1440 150" preserveAspectRatio="none" className="h-full w-full">
              <path
                d="M0,150 L0,104 Q140,58 300,88 Q430,26 600,72 Q762,28 900,82 Q1074,42 1230,94 Q1348,72 1440,102 L1440,150 Z"
                fill={
                  isDark
                    ? "color-mix(in oklab, var(--cream) 13%, var(--night))"
                    : "color-mix(in oklab, var(--cream) 86%, var(--sun))"
                }
                stroke="color-mix(in oklab, var(--foreground) 20%, transparent)"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Sign({
  item,
  index,
  cursor,
}: {
  item: (typeof ITEMS)[number]
  index: number
  cursor: MotionValue<number>
}) {
  const i = index
  const tilt = TILT[i % TILT.length]

  // rises out of the cloud, settles in the reading zone, drifts up and away as the next arrives
  const y = useTransform(cursor, [i - 1, i, i + 0.85], [230, 0, -150])
  const scale = useTransform(cursor, [i - 1, i, i + 0.85], [0.88, 1, 0.86])
  const rotate = useTransform(cursor, [i - 1, i, i + 0.85], [tilt + 4, tilt, tilt - 3.5])
  // only one sign is dominant at a time: fully gone before the next one lands
  const opacity = useTransform(cursor, [i - 0.72, i - 0.32, i, i + 0.34, i + 0.72], [0, 1, 1, 1, 0])
  const filter = useTransform(cursor, [i - 0.7, i, i + 0.7], ["blur(4px)", "blur(0px)", "blur(4px)"])

  return (
    <motion.div style={{ y, scale, rotate, opacity, filter }} className="flex w-[min(92vw,40rem)] flex-col items-center">
      <Rope />
      <div className="ach-bob w-full" style={{ animationDuration: `${5.6 + i * 0.4}s` }}>
        <Plank item={item} index={i} />
      </div>
    </motion.div>
  )
}

function Rope() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 40"
      className="h-8 w-40 shrink-0"
      style={{ color: "color-mix(in oklab, var(--foreground) 32%, transparent)" }}
    >
      <path d="M100 8 L48 38 M100 8 L152 38" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="100" cy="7" r="5" fill="currentColor" />
    </svg>
  )
}

function Plank({ item, index }: { item: (typeof ITEMS)[number]; index: number }) {
  return (
    <article
      className="relative overflow-hidden rounded-lg border-2 px-5 py-4 transition-colors duration-700 sm:px-7 sm:py-5"
      style={{
        background: "color-mix(in oklab, var(--sun) 13%, var(--card))",
        borderColor: "color-mix(in oklab, var(--foreground) 28%, transparent)",
        boxShadow: "5px 7px 0 color-mix(in oklab, var(--foreground) 15%, transparent)",
      }}
    >
      {/* wood grain */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          background: "repeating-linear-gradient(90deg, var(--foreground) 0 1px, transparent 1px 14px)",
        }}
      />
      {/* nail heads */}
      <span
        aria-hidden="true"
        className="absolute top-2.5 left-2.5 size-1.5 rounded-full"
        style={{ background: "color-mix(in oklab, var(--foreground) 40%, transparent)" }}
      />
      <span
        aria-hidden="true"
        className="absolute top-2.5 right-2.5 size-1.5 rounded-full"
        style={{ background: "color-mix(in oklab, var(--foreground) 40%, transparent)" }}
      />

      <div className="relative flex flex-col gap-1.5 pr-8">
        <p className="mono-label text-[0.66rem] text-accent">{item.context}</p>
        <h3 className="font-display text-lg leading-tight font-semibold text-balance sm:text-2xl">{item.title}</h3>
        <p className="text-sm leading-snug text-muted-foreground text-pretty">{item.detail}</p>
      </div>

      <span
        aria-hidden="true"
        className="mono-label absolute right-4 bottom-3 text-[0.6rem] text-muted-foreground opacity-60"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </article>
  )
}

function Tick({ index, cursor }: { index: number; cursor: MotionValue<number> }) {
  const width = useTransform(cursor, [index - 1, index, index + 1], [10, 30, 10])
  const opacity = useTransform(cursor, [index - 1, index, index + 1], [0.28, 1, 0.28])

  return <motion.span aria-hidden="true" style={{ width, opacity }} className="h-[3px] rounded-full bg-accent" />
}
