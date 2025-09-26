import React from 'react'

const ImagePreveiw = ({ isPreviewOpen, setIsPreviewOpen, imageToPreview} : any) => {
  return (
    <>
        {isPreviewOpen && (
            <div className="w-full p-10 bg-black/90 z-[9999] flex justify-center items-center h-[870px] absolute">
            <button onClick={() => setIsPreviewOpen(false)} className="absolute text-2xl text-gray-200 hover:text-gray-400 cursor-pointer left-20 top-20">X</button>
            <img className="mt-10" src={imageToPreview} alt="" />
            </div>
        )}
    </>
  )
}

export default ImagePreveiw