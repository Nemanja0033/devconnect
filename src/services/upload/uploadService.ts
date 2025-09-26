import { uploadToCloud } from "@/lib/uploadImage";

export const uploadImages = async (files: FileList | null): Promise<string[]> => {
    if (!files || files.length === 0) return [];
  
    const newFileArray = Array.from(files);
    const uploadedUrls = await Promise.all(
      newFileArray.map((img) => uploadToCloud(img))
    );
  
    return uploadedUrls;
  };
  