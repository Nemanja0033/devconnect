import { getAuthOptions } from "@/lib/authOptions";
import { db } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        const session: any = await getServerSession(getAuthOptions());
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

export async function GET(req: Request){
  try{
    const session: any = await getServerSession(getAuthOptions());
    const _postDrafts = await db.postDraft.findMany({
      where: {
        authorId: session.user.id
      },
      include: {
        images: true
      }
    });

    if(!_postDrafts){
      return NextResponse.json({ error: "User has no saved drafts"}, { status: 404});
    };

    return NextResponse.json(_postDrafts, { status: 202});
  }
  catch(err){
    return NextResponse.json({ error: err}, { status: 500});
  }
}

export async function DELETE(req: Request){
  try{
    const body = await req.json();

    const { draftId } = body;

    if(!draftId){
      return NextResponse.json({ error: "Draft ID is required!"}, { status: 400 });
    }

    const _deleteDraft = await db.postDraft.delete({
      where: { id: draftId}
    });

    return NextResponse.json({ succes: true}, { status: 200})
  }
  catch(err){

  }
}