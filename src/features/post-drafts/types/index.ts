import { Images } from "@/features/post/types";

export enum DraftType {
    PROJECT = "PROJECT",
    CLASSIC = "CLASSIC"
}

export type PostDraftType = {
    title: string,
    content: string,
    images: Images[],
    id: string
    type: DraftType.CLASSIC | undefined;
}
  
  export type ProjectDraftType = {
    title: string,
    description: string,
    images: Images[],
    sourceUrl?: string,
    liveUrl?: string,
    issues?: string,
    id: string
    type: DraftType.PROJECT | undefined;
}

export interface DraftEditModal {
    isUploadedPhotosLoading: boolean,
    currentDraft: PostDraftType | ProjectDraftType | null,
    createPostForm: any
    createProjectForm: any
    handleSubmitProjectPost: () => void, 
    isSavingDraft: boolean,
    handleSavePostDraft: (form: any) => void
    handleSubmitPost: () => void
    handleRemoveUploadedImage: (url: string) => void
    setImageToPreview: (imageId: string) => void
    setIsPreviewOpen: (isPreview: boolean) => void
}