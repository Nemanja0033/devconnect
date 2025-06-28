"use client"
import { SessionProvider } from "next-auth/react"
import "./globals.css"
import Navbar from "@/components/shared/Navbar"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <SessionProvider>
        <body>
          <Navbar />
          {children}
          </body>
      </SessionProvider>
    </html>
  )
}
