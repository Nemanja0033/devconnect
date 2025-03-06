import { db } from "@/db/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

// GET method for posts
export async function GET() {
    try{
        const posts = await db.post.findMany({
            include: { author: true},
            orderBy: { createdAt: "desc"},
        });
        return NextResponse.json(posts, { status: 200})
    }
    catch(err) {    
        return NextResponse.json(err, { status: 500});
    }
}
// POST method for posts
export async function POST(req: Request){
    try{
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401});
        }
        
        const body = await req.json();
        const { title, content, authorId } = body;
        const newPost = await db.post.create({
            data: { title, content, authorId },
        });

        if(!title || !content || !authorId){
            return NextResponse.json({error: "All fields are required!"}, {status: 400});
        }

        return NextResponse.json(newPost, {status: 201});
    }
    catch(err){
        return NextResponse.json({error: err}, { status: 500});
    }
}
