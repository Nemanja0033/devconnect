"use client"
import "./globals.css"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "sonner"
import Navbar from "@/components/layout-ui/Navbar"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { usePathname } from "next/navigation"
import Providers from "./providers"
import { AppSidebar } from "@/features/sidebar/components/Sidebar"

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
              defaultTheme="dark"
              enableSystem={false}
              disableTransitionOnChange
            >
              {path === "/" ? null : <Navbar />}
              {path === "/" ? null : <AppSidebar />}
              <Toaster position="top-center" theme="dark"/>
                <div className={`${path === '/' ? 'py-0' : 'py-20'}`}>
                {children}
                </div>
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  )
}
