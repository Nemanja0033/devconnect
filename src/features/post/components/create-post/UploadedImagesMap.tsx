import { Loader2 } from 'lucide-react';
import React from 'react';
import { UploadedImagesMapProps } from '../types';

const UploadedImagesMap: React.FC<UploadedImagesMapProps> = ({
  isLoading,
  imagesUrl,
  removeImage,
  setImageToPreview,
  setIsPreviewOpen,
}) => {
  return (
    <>
      {isLoading ? (
        <span className="text-2xl w-full my-3 flex gap-2 justify-center items-center">
          <Loader2 className="animate-spin" />
        </span>
      ) : (
        <div className="md:flex grid grid-cols-3 gap-2 overflow-auto md:gap-4 mt-4">
          {imagesUrl.map((img, index) => (
            <div key={index} className="relative">
              <button
                onClick={() => removeImage(img.url)}
                aria-label="remove uploaded image"
                className="absolute ml-2 hover:scale-110 text-red-500 transition-all z-20 cursor-pointer"
              >
                X
              </button>
              <img
                onClick={() => {
                  setImageToPreview(img.url);
                  setIsPreviewOpen(true);
                }}
                src={img.url}
                alt={`Uploaded ${index}`}
                className="w-32 h-32 object-cover rounded-md border-2 cursor-pointer hover:opacity-90 z-10"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UploadedImagesMap;
