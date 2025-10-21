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