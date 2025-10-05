import { create } from "zustand";

interface ImagePreviewStore {
    isPreviewOpen: boolean,
    imageToPreview: string | undefined
    setIsPreviewOpen: (isOpen: boolean) => void,
    setImageToPreview: (imageId: string) => void 
}

export const useImagePreviewStore = create<ImagePreviewStore>((set) => ({
    isPreviewOpen: false,
    imageToPreview: undefined,
    setIsPreviewOpen: (isOpen) => set({ isPreviewOpen: isOpen}),
    setImageToPreview: (imageId) => set({ imageToPreview: imageId})
}))