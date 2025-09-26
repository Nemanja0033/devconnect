"use client"
import { uploadToCloud } from "@/lib/uploadImage";
import { useState } from "react";

export function useUploadImages(){
    const [imagesUrl, setImagesUrl] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const clearLoading = () => {
      setIsLoading(false);
    }

    const startLoading = () => {
      setIsLoading(true);
    }

    const uploadImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = event.target.files;
        if (!newFiles || newFiles.length === 0) return;
    
        const newFileArray = Array.from(newFiles);
        startLoading();
    
        try {
          const uploadedUrls = await Promise.all(
            newFileArray.map((img) => uploadToCloud(img))
          );
    
          setImagesUrl((prev) => [...prev, ...uploadedUrls]);
        } catch (error) {
          console.error("Image upload failed:", error);
        } finally {
          clearLoading();
        }
    };

    const handleRemoveUploadedImage = (url: string) => {
        setImagesUrl(imagesUrl.filter((img) => img !== url));
    };

    const resetImages = () => {
        setImagesUrl([]);
    }

    return {
        imagesUrl,
        isLoading,
        setIsLoading,
        resetImages,
        uploadImages,
        handleRemoveUploadedImage
    };

}