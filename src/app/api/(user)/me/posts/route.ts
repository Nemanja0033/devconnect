import { getAuthOptions } from "@/lib/authOptions";
import { db } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request){
    try{
        const session: any = await getServerSession(getAuthOptions());
        const currentUser = session?.user;
        
        if(!currentUser){
            return NextResponse.json({ currentUser }, { status: 401 });
        }

        const currentUserPosts = await db.user.findUnique({
            where: { id: currentUser.id },
            select: {
                posts: true,
            }
        });         

        if(!currentUserPosts){
            return NextResponse.json({ message: "No current user posts"}, { status: 404 });
        }

        return NextResponse.json({ currentUserPosts }, { status: 200 });
    }
    catch(err){
        return NextResponse.json({ err }, { status: 500 });
    }
}