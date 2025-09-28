"use client"
import "./globals.css"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "sonner"
import Navbar from "@/components/shared/Navbar"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { usePathname } from "next/navigation"
import Providers from "./providers"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const path = usePathname()

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
              disableTransitionOnChange
            >
              {path === "/" ? null : <Navbar />}
              <Toaster />
              {children}
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  )
}
