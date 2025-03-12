export type PostType = {
    image: any, // need to be any type beacuse of conflict
    author: string,
    date: string,
    title: string,
    id: string,
    likes: number,
    comments: number
}