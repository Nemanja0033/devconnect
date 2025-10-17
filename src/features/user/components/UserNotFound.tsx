'use client'
import { SearchX } from 'lucide-react'
import React from 'react'

 const UserNotFound = () => {
  return (
    <div className='w-full h-[60vh] flex justify-center items-center'>
        <div className='grid'>
          <h1 className='text-2xl flex gap-2'><SearchX size={30} className='text-primary' />User not found</h1>
        </div>
    </div>
  )
}

export default UserNotFound
