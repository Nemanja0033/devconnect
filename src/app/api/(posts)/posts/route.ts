import { db } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getAuthOptions } from "@/lib/authOptions";

// geting all posts
export async function GET(req: Request){
    try{
        const posts = await db.post.findMany();

        return NextResponse.json(posts, { status: 200})
    }
    catch(err){
        return NextResponse.json({error: err}, {status: 500})
    }
}

// new post
export async function POST(req: Request) {
    try {
        const session: any = await getServerSession(getAuthOptions());

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { title, content, images } = await req.json();
        const authorId = session.user.id;

        
        if (!title || !content || !images) {
            return NextResponse.json({ error: "All fields are required!" }, { status: 400 });
        }

        const newPost = await db.post.create({
            data: { title, content, authorId,  images: {
                create: images.map((url: string) => ({ url })),
              },},
        });

        return NextResponse.json(newPost, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: "Something went wrong!", details: err }, { status: 500 });
    }
}

