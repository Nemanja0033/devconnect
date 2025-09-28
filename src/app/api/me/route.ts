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
                avatar: true
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