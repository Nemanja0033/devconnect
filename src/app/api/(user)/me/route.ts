import { getAuthOptions } from "@/lib/authOptions";
import { db } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try{
        const session = await getServerSession(getAuthOptions());
        const user: any = session?.user;
        
        if(!user){
            return NextResponse.json({ user: null }, { status: 401 });
        }

        const currentUser = await db.user.findUnique({
            where: { id: user.id },
            select: {
                id: true,
                username: true,
                email: true,
                avatar: true,
                bio: true,
                title: true
            }
        });

        if(!currentUser){
            return NextResponse.json({ user: null }, { status: 401 });
        }

        return NextResponse.json({ user: currentUser }, { status: 200 });
    }
    catch(err){
        return NextResponse.json({ error: err}, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try{
        const session = await getServerSession(getAuthOptions());
        const user: any = session?.user;

        if(!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const body = await req.json();
        const updateData: Record<string, any> = {};

        const allowedFields = ["username", "avatar", "bio", "title"];

        for(const key of allowedFields){
            if(body[key] !== undefined){
                updateData[key] = body[key];
            }
        };

        if(Object.keys(updateData).length === 0){
            return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
        };

        // Check if username is already taken
        if(body["username"] !== undefined){
            const isUsernameTaken = await db.user.findUnique({
                where: { username: body.username}
            });

            if(isUsernameTaken){
                return NextResponse.json({ message: `${body.username} is already taken.`}, { status: 400 });
            }
        }

        const updatedUser = await db.user.update({
            where: { id: user.id },
            data: updateData
        });
        
        return NextResponse.json(updatedUser); 
    }
    catch (err) {
        console.error("@PATCH /api/me error:", err);
        return NextResponse.json({ error: (err as Error).message }, { status: 500 });
    }
}