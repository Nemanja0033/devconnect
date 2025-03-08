"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

const page = () => {
  const { status, data: session } = useSession()
  return (
    <div>Hello {session?.user?.name}</div>
  )
}

export default page