import { NotificationType } from "../types";

export function getNotificationMessage(notificationType: NotificationType, username: string){
    let message = '';

    if(!notificationType || !username) return;

    switch(notificationType){
        case "Like":
            message = `User ${username} liked your post.`;
            break;
        case "Comment":
            message = `User ${username} commented your post`;
            break;
        case "Follow":
            message = `User`;
            break;
        default:
            message = '';
    };

    return message;
}