import { db } from "@/lib/prismaClient";
import { rateLimiter } from "@/lib/rateLimiter";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        const ip = req.headers.get('x-forwarded-for') ?? 'unknown';

        const { success } = await rateLimiter.limit(ip);

        if(!success){
            return NextResponse.json({ error: "To many requests!"}, { status: 429 });
        }

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

        const isPostAddedToFavourites = await db.favourite.findFirst({
            where: { 
                postId,
                authorId
            }
        });

        if (isPostAddedToFavourites) {
            await db.favourite.delete({
                where: {
                    id: isPostAddedToFavourites.id
                }
            });
            return NextResponse.json({ message: "Removed from favourites" }, { status: 200 });
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