import { getNotificationMessage } from "@/features/notifications/lib/lib";
import { db } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        const { senderId, senderUsername, reciverId, url, type } = await req.json();

        if(!senderId || !reciverId || !type || !senderUsername || !url){
            return NextResponse.json({ error: "SenderId, ReciverId and type is required!"}, { status: 400 });
        }

        const notification = await db.notification.create({
            data: {
                message: getNotificationMessage(type, senderUsername) || '',
                senderId,
                reciverId,
                url
            }
        });

        return NextResponse.json({ succes: true }, { status: 200 });
    }
    catch(err){
        return NextResponse.json({ error: err }, { status: 500 });
    }
}