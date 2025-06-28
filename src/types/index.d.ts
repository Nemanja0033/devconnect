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