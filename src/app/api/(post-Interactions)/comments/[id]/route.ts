import { db } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getAuthOptions } from "@/lib/authOptions";


export async function GET(req: Request, { params }: { params: { id: string}}){
    try{
        const { id } = params;

        if(!id){
            return NextResponse.json({ message: "Post ID is required"}, { status: 400});
        }

        const comments = await db.comment.findMany({
            where: { id },
            include: { author: { select: { id: true, name: true}}},
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(comments, { status: 200});
    }
    catch(err){
        return NextResponse.json({ message: "Error fetching comments", err}, { status: 500});
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string}}){
    try{ 
        const session: any = await getServerSession(getAuthOptions());

        if(!session?.user){
            return NextResponse.json({error: "Unauthorized"}, { status: 401});
        }

        const comment = await db.comment.findUnique({
            where: { id: params.id }
        });

        if(!comment){
            return NextResponse.json({error: "Comment not found"});
        }

        if(comment.authorId !== session?.user.id){ // checking if user is author of comment
            return NextResponse.json({error: "Can only delete your own comments"}, { status: 403});
        }

        await db.comment.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ message: "Comment Deleted Succesfully!"});
    }
    catch(err){
        return NextResponse.json({error: err}, {status: 500});
    }
}
