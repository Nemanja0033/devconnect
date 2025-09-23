import { UploadedImagesMapProps } from '@/types';
import { Loader2 } from 'lucide-react';
import React from 'react';

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
        <div className="flex overflow-auto gap-4 mt-4">
          {imagesUrl.map((url, index) => (
            <div key={index} className="relative">
              <button
                onClick={() => removeImage(url)}
                aria-label="remove uploaded image"
                className="absolute ml-2 hover:scale-110 text-red-500 transition-all z-20 cursor-pointer"
              >
                X
              </button>
              <img
                onClick={() => {
                  setImageToPreview(url);
                  setIsPreviewOpen(true);
                }}
                src={url}
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
