import { useImagePreviewStore } from '@/store/useImagePreviewStore';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

const ImagePreview = () => {
  const { isPreviewOpen, setIsPreviewOpen, imageToPreview } = useImagePreviewStore();
  return (
    <>
      {isPreviewOpen && (
        <motion.div
          initial={{scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="fixed inset-0 z-[99999] bg-black/90 flex justify-center items-center p-10"
        >
          <button
            onClick={() => setIsPreviewOpen(false)}
            className="absolute z-[9999] text-2xl text-gray-200 hover:text-gray-400 cursor-pointer md:left-20 md:top-20 top-32 left-10"
            aria-label="Close preview"
          >
            X
          </button>
          <img className="mt-10" src={imageToPreview} alt="Preview" />
        </motion.div>
      )}
    </>
  );
};

export default ImagePreview;