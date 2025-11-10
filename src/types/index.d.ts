export type CommentType = {
    date: string,
    // author: {
    //     id: string,
    //     name: string
    // },
    content: string
}

// export type PostType = {
//     image: any, // need to be any type beacuse of conflict
//     author: string,
//     date: string,
//     title: string,
//     id: string,
//     likes: number,
//     comments: number
// }

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

// export type User = {
//     username: string,
//     avatar: string,
//     email: email,
// }

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

export type Images = {
    id: string,
    url: string
}

export type ProjectDraft = {
    type: "PROJECT" | "POST",
    id: string,
    title: string,
    description: string,
    sourceUrl?: string,
    liveUrl?: string,
    issues?: string,
    authorId: string,
    createdAt: any,
    images: Images[]
}

export type PostDraft = {
    type: "PROJECT" | "POST",
    id: string,
    title: string,
    content: string,
    authorId: string,
    createdAt: any,
    author?: User,
    images?: Images[]
}

export type Project = {
    id: string,
    title: string,
    description: string,
    sourcleUrl?: string,
    liveUrl?: string,
    issues?: string,
    authorId: string,
    images: Images[],
    author: User
}

export type Comment = {
    id: string
    content: string,
    postId: string,
    authorId: string,
    cretedAt: any,
    post?: Post,
    author?: User,
}

export type Like = {
    id: string,
    postId: string,
    authorId: string,
    createdAt: any,
    post?: Post,
    author?: User
}

export type Saved = {
    id: string,
    postId: string,
    userId: string,
    user?: User,
    post?: Post
}

export type GroupMember = {
    id: string,
    userId: string,
    groupId: string,
    joineAt: any,
    user: User,
    group: Group,
}

export type Group = {
    id: string,
    name: string,
    description: string,
    createdAt: any,
    ownerId: string,
    owner: User,
    posts: Post[],
    members: GroupMember[]
}

export type Notification = {
    id: string,                                                                         
    message: string,
    senderId: string,
    reciverId: string,
    viewed: boolean,
    url: string,
    createdAt: any,
    type: "Like" | "Comment" | "Follow",
    sender: User,
    reciver: User
}

export type Favourite = {
    id: string,
    postId: string,
    authorId: string,
    author?: User,
    savedPost?: Post
}

export type User = {
    id: string,
    username: string,
    email: string,
    password: string,
    avatar: string,
    bio: string,
    title: string,
    createdAt: any,
    comment?: Comment[],
    Like?: Like[],
    ProjectDraft?: ProjectDraft[],
    PostDraft?: PostDraft[],
    Project?: Project[],
    posts?: Post[],
    saved?: Saved[],
    group?: Group[],
    memberships?: GroupMember[],
    sentNotifications?: Notification[],
    recivedNotifications?: Notification[],
    savedPosts?: Favourite[]
}

export type PostType = {
    id: string,
    title: string,
    content: string,
    authorId: string,
    createdAt: any // to prevent errors if diff date type 
    groupid: string, // typo in schem should be "groupId"
    author: User,
    Comment: Comment[],
    Like: Like[],
    images: Images[],
    saved: Saved[],
    group: Group,
    favourite: Favourite[]
}