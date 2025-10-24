import { db } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        const { postId, authorId } = await req.json();

        if(!postId || !authorId){
            return NextResponse.json({ error: "Post id & author id is required "}, { status: 400 });
        }

        const postToSave = await db.post.findUnique({
            where: { id: postId }
        });

        if(!postToSave){
            return NextResponse.json({ error: "Post dont exist" }, { status: 404 });
        }

        const addToFavourite = await db.favourite.create({
            data:{
                postId,
                authorId
            }
        });

        return NextResponse.json({ succes: true }, { status: 200 });
    }
    catch(err){
        return NextResponse.json({ error: err }, { status: 500});
    }
}