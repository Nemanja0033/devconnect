export type CommentType = {
    date: string,
    // author: {
    //     id: string,
    //     name: string
    // },
    content: string
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

export type RegisterFormType = {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

export enum RegistrationSteps {
    CREDENTIALS,
    AVATAR,
    BIOGRAPHY
}

export type Steps = {
    step: string
}

export type User = {
    username: string,
    avatar: string | null,
    email: email
}

export type UserStore = {
    user: User | null,
    setUser: (user: User) => void
}

export type AvatarForm = {
    avatarUrl: string
}

export type AvatarFormProps = {
    onUpload: (event: React.ChangeEvent<HTMLInputElement> ) => void,
    onSubmit: () => void;
    avatarPreviewUrl: string,
    isUploading: boolean,
}

export type StepIndicatorProps = {
    viewStep: (step: RegistrationSteps) => void,
    step: RegistrationSteps,
    steps: Steps[]
}

export type BiographyFormType = {
    title: string,
    bio: string
}

export type AvatarProps = {
    avatarUrl: string,
    size: "lg" | "sm"
}

export type LoginFormType = {
    email: string,
    password: string
}

export type CreatePostForm = {
    title: string,
    content: string,
}