"use client"
import { SessionProvider } from "next-auth/react"
import "./globals.css"
import Navbar from "@/components/shared/Navbar"
import { Toaster } from "sonner"
import { usePathname } from "next/navigation"
import { ThemeProvider } from "@/components/theme/theme-provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const path = usePathname();
  return (
    <html lang="en">
        <SessionProvider>
          <body>
           <ThemeProvider  
            attribute="class"
            disableTransitionOnChange>
              {path === '/' ? null : <Navbar />}
              <Toaster/>
              {children}
           </ThemeProvider>
          </body>
        </SessionProvider>
    </html>
  )
}
