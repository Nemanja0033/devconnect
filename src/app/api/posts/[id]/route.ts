// dynamic API route for uniqe posts

import { db } from "@/db/db";
import { NextResponse } from "next/server";

// GET uniqe post
export async function GET(req: Request, { params }: { params: { id: string}}){
    try{
        const post = await db.post.findUnique({
            where: { id: params.id },
            include: { author: true }
        });

        if(!post){
            return NextResponse.json({error: "Post not found"}, { status: 404});
        }

        return NextResponse.json(post, { status: 200});
    }
    catch(err){
        return NextResponse.json({ error: err}, { status: 500});
    }
}

// Update post endpoint
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const body = await req.json();
        const { title, content } = body;

        const updatedPost = await db.post.update({
            where: { id: params.id },
            data: { title, content },
        });

        return NextResponse.json(updatedPost, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Greška prilikom ažuriranja posta" }, { status: 500 });
    }
}

// DELETE uniqe post
export async function DELETE(req: Request, { params }: { params: { id: string}}){
    try {
        await db.post.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ message: "Post deleted succesfully"}, { status: 200});
    }
    catch(err){
        return NextResponse.json({ error: err}, { status: 500});
    }
}
