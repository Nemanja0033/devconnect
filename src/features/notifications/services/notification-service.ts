import { NotificationType } from "@/features/notifications/types";
import axios from "axios";

const API_ENDPOINT = '/api/notification';

export async function sendNotification(senderId: string, senderUsername: string, reciverId: string, url: string, type: NotificationType){
    return await axios.post(`/api/notification`, {
        senderId,
        reciverId,
        senderUsername,
        url,
        type
    });
}

export async function fetchNotifications(reciverId: string){
    return await axios.get(`${API_ENDPOINT}/${reciverId}`);
}

export async function viewNotifications(reciverId: string){
    return await axios.patch(`${API_ENDPOINT}/${reciverId}`);
}

export async function deleteNotifications(reciverId: string){
    return await axios.delete(`${API_ENDPOINT}/${reciverId}`);
}