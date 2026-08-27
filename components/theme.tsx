"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"

type Mode = "light" | "dark"

const ThemeCtx = createContext<{ mode: Mode; toggle: () => void }>({
  mode: "light",
  toggle: () => {},
})

export function useTheme() {
  return useContext(ThemeCtx)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>("light")

  useEffect(() => {
    const prefersDark =
      typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
    setMode(prefersDark ? "dark" : "light")
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark")
    document.documentElement.style.colorScheme = mode
  }, [mode])

  const toggle = useCallback(() => {
    setMode((m) => (m === "dark" ? "light" : "dark"))
  }, [])

  return <ThemeCtx.Provider value={{ mode, toggle }}>{children}</ThemeCtx.Provider>
}
