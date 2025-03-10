"use client"
import Navbar from "@/components/layout/Navbar"

export default function CreatePostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <>
            <Navbar />
            {children}
        </>
  )
}
