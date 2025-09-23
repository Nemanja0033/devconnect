import { getAuthOptions } from "@/lib/authOptions";
import { db } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        const session: any = await getServerSession(getAuthOptions());
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

export async function GET(req: Request){
    try{
      const session: any = await getServerSession(getAuthOptions());
      const _postDrafts = await db.projectDraft.findMany({
        where: {
          authorId: session.user.id
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
  
      const _deleteDraft = await db.projectDraft.delete({
        where: { id: draftId}
      });
  
      return NextResponse.json({ succes: true}, { status: 200})
    }
    catch(err){
  
    }
  }