import { Achievements } from '@/components/achievements'
import { ThemeProvider } from '@/components/theme'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Page() {
  return (
    <ThemeProvider>
      <ThemeToggle />
      <main>
        {/* stand-in for the section above (Coursework) */}
        <section className="flex min-h-[70svh] flex-col items-center justify-center gap-3 px-6 text-center">
          <p className="mono-label text-muted-foreground">Coursework</p>
          <h1 className="font-display text-3xl font-semibold text-balance sm:text-5xl">The section above</h1>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Scroll down — the achievements sky takes over and hands you one sign at a time.
          </p>
        </section>

        <Achievements />

        {/* stand-in for the section below (Toolbox) */}
        <section className="flex min-h-[70svh] flex-col items-center justify-center gap-3 px-6 text-center">
          <p className="mono-label text-muted-foreground">Toolbox</p>
          <h2 className="font-display text-3xl font-semibold text-balance sm:text-5xl">The section below</h2>
        </section>
      </main>
    </ThemeProvider>
  )
}
