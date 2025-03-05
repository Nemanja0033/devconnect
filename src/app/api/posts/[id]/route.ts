// dynamic API route for uniqe posts

import { db } from "@/db/db";
import { NextResponse } from "next/server";

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