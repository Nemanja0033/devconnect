import React from 'react'
import Loader from './Loader'

const GlobalLoader = () => {
  return (
    <div className='w-full h-screen z-[99999] overscroll-none fixed top-0 left-0 bg-black/50 flex justify-center items-center'>
        <Loader />
    </div>
  )
}

export default GlobalLoader