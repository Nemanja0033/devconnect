import { NotificationType } from "@/features/notifications/types";
import axios from "axios";

export async function sendNotification(senderId: string, senderUsername: string, reciverId: string, type: NotificationType){
    return await axios.post(`/api/notification`, {
        senderId,
        reciverId,
        senderUsername,
        type
    });
}

export async function fetchNotifications(reciverId: string){
    return await axios.get(`/api/notification/${reciverId}`);
}

export async function viewNotifications(reciverId: string){
    return await axios.patch(`/api/notification/${reciverId}`);
}