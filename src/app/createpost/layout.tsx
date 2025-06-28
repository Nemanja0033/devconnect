"use client"
import Navbar from "@/components/shared/Navbar"

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
