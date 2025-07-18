import { authOptions } from "@/lib/authOptions";
import { db } from "@/lib/prismaClient";
import { error } from "console";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        const session: any = await getServerSession(authOptions);
        const { title, content, images } = await req.json();

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;
        console.log("User ID:", userId);

        const _savedDraft = await db.postDraft.create({
            data: {
              title: title ?? '',
              content: content ?? '',
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