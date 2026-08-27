"use client"

import { Moon, Sun } from "lucide-react"

import { useTheme } from "@/components/theme"

export function ThemeToggle() {
  const { mode, toggle } = useTheme()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="fixed top-5 right-5 z-50 grid size-10 place-items-center rounded-full border bg-card text-foreground transition-colors duration-700"
    >
      {mode === "dark" ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </button>
  )
}
