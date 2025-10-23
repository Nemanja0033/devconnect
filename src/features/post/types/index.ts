export type CreatePostForm = {
    title: string,
    content: string,
}

export type PostType = {
    image: any, // need to be any type beacuse of conflict
    author: string,
    date: string,
    title: string,
    id: string,
    likes: number,
    comments: number
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