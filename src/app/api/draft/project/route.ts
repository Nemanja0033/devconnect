import { authOptions } from "@/lib/authOptions";
import { db } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        const session: any = await getServerSession(authOptions);
        const { title, description, images, sourceUrl, liveUrl, issues } = await req.json();

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;

        const _savedDraft = await db.projectDraft.create({
            data: {
                title: title ?? '',
                description: description ?? '',
                sourceUrl: sourceUrl ?? '',
                liveUrl: liveUrl ?? '',
                issues: issues ?? '',
                author: {
                    connect: {
                    id: userId
                    }
                },
                images: {
                    create: images?.map((img: { url: string }) => ({
                    url: img.url
                    })) || []
                }
            }
        })

        return NextResponse.json({ message: "Post draft succesfully saved!"}, {status: 200});
    }
    catch(err){
        return NextResponse.json({ error: err});
    }
}