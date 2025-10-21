import { getNotificationMessage } from "@/features/notifications/lib/lib";
import { db } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        const { senderId, senderUsername, reciverId, type } = await req.json();

        if(!senderId || !reciverId || !type || !senderUsername){
            return NextResponse.json({ error: "SenderId, ReciverId and type is required!"}, { status: 400 });
        }

        const notification = db.notification.create({
            data: {
                message: getNotificationMessage(type, senderUsername),
                senderId,
                reciverId
            }
        });

        return NextResponse.json({ succes: true }, { status: 200 });
    }
    catch(err){
        return NextResponse.json({ error: err }, { status: 500 });
    }
}