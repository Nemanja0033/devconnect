export enum NotificationType{
    LIKE = 'Like',
    COMMENT = 'Comment',
    FOLLOW = 'Follow'
}

export interface Notification{ 
    id: string,
    message: string,
    senderId: string,
    reciverid: string,
    url: string,
    viewed: boolean,
    createdAt: Date | any,
    type: NotificationType,
}