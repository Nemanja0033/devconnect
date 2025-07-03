import { db } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function PUT(req: Request){
    try{
        const { avatar, bio, title, email } = await req.json();

        if(!email){
            return NextResponse.json({ message: "User not found"}, {status: 404});
        }

        else{
            const _updatedUser = await db.user.update({
                where: { email },
                data: {
                    bio: bio,
                    title: title,
                    avatar: avatar
                }
            });
    
            return NextResponse.json({ message: "User updadted succesfullly"}, { status: 200});
        }
    }
    catch(err){
        return NextResponse.json({ error: err});
    }
}