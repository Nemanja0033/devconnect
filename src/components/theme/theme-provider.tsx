"use client"
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // ili <div className="opacity-0">{children}</div> ako želiš preload bez flicker-a
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
