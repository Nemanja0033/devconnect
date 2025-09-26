import { motion } from 'framer-motion';
import React from 'react';

interface ImagePreviewProps {
  isPreviewOpen: boolean;
  setIsPreviewOpen: (open: boolean) => void;
  imageToPreview: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  isPreviewOpen,
  setIsPreviewOpen,
  imageToPreview,
}) => {
  return (
    <>
      {isPreviewOpen && (
        <motion.div
          initial={{scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="w-full p-10 bg-black/90 z-[9998] flex justify-center items-center h-[870px] absolute"
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