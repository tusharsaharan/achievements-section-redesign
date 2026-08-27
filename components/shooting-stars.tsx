"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

type Star = {
  id: number
  top: number
  left: number
  angle: number
  length: number
  duration: number
}

let seq = 0

function makeStar(): Star {
  return {
    id: ++seq,
    top: 4 + Math.random() * 55,
    left: 10 + Math.random() * 60,
    angle: 14 + Math.random() * 22,
    length: 140 + Math.random() * 220,
    duration: 0.9 + Math.random() * 0.7,
  }
}

/** Randomly fires streaks of light across the night sky. */
export function ShootingStars({ active }: { active: boolean }) {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    if (!active) {
      setStars([])
      return
    }
    let timer: ReturnType<typeof setTimeout>

    const fire = () => {
      const star = makeStar()
      setStars((prev) => [...prev.slice(-3), star])
      setTimeout(() => setStars((prev) => prev.filter((s) => s.id !== star.id)), star.duration * 1000 + 200)
      timer = setTimeout(fire, 1400 + Math.random() * 3200)
    }

    timer = setTimeout(fire, 700)
    return () => clearTimeout(timer)
  }, [active])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {stars.map((s) => (
          <motion.div
            key={s.id}
            className="absolute origin-left"
            style={{ top: `${s.top}%`, left: `${s.left}%`, rotate: `${s.angle}deg` }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: [0, 1, 1, 0], scaleX: 1, x: s.length * 1.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: s.duration, ease: "easeOut" }}
          >
            <div
              className="h-px rounded-full"
              style={{
                width: s.length,
                background:
                  "linear-gradient(90deg, transparent, color-mix(in oklab, var(--cream) 85%, transparent))",
              }}
            />
            <div className="absolute top-1/2 right-0 size-1.5 -translate-y-1/2 rounded-full bg-cream shadow-[0_0_10px_2px] shadow-cream/70" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
