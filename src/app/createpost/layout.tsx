"use client"
import Navbar from "@/components/ui/Navbar"

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
