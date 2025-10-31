import { db } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string}}){
    try{
        const savedPosts = await db.favourite.findMany({
            where: { authorId: params.id },
            select: {
                savedPost: {
                    select: {
                        author: true,
                        id: true,
                        title: true,
                        content: true,
                        Comment: true,
                        Like: true,
                        images: true,
                        createdAt: true
                    }
                }
            }
        });

        return NextResponse.json({ savedPosts }, { status: 200 });
    }
    catch(err){
        return NextResponse.json({ error: err }, { status: 500 });
    }
}