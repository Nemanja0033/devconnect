"use client"
import Navbar from "@/components/Navbar"

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
