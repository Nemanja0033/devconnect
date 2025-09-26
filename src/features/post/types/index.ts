export type CreatePostForm = {
    title: string,
    content: string,
}

export type CreateProjectForm = {
    title: string,
    description: string,
    sourceCodeUrl: string,
    liveDemoUrl: string,
    issues: string,
    techStack: string
}

export type Images = {
    id: string,
    url: string
}

export interface UploadedImagesMapProps {
    isLoading: boolean;
    imagesUrl: { url: string }[];
    removeImage: (url: string) => void;
    setImageToPreview: (url: string) => void;
    setIsPreviewOpen: (open: boolean) => void;
}