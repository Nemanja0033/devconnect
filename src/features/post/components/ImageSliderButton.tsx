import { ArrowLeft, ArrowRight } from 'lucide-react'
import React from 'react'

const ImageSliderButton = ({ side, onClick }: { side: "left"  | "right", onClick: () => void }) => {

  if(side === 'right'){
    return(
        <button onClick={onClick} className="absolute bg-gray-600/50 hover:bg-gray-600/70 transition-all top-[50%] right-0 rounded-full cursor-pointer p-3"><ArrowRight size={25} className="text-white hover:text-primary" /></button>
    )
  }

  return (
    <button onClick={onClick} className="absolute bg-gray-600/50 hover:bg-gray-600/70 transition-all top-[50%] left-0 rounded-full cursor-pointer p-3"><ArrowLeft size={25} className="text-white hover:text-primary" /></button>
  )
}

export default ImageSliderButton