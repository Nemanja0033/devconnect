import { getAuthOptions } from "@/lib/authOptions";
import { db } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        const session: any = await getServerSession(getAuthOptions());
        const { title, description, images, sourceUrl, liveUrl, issues } = await req.json();
        const authorId = session.user.id;
        if(!title || !description){
            return NextResponse.json({ message: "Title and description are required!"});
        }

        const _newProject = await db.project.create({
            data: {
                authorId,
                title,
                description,
                sourceUrl: sourceUrl ?? "",
                liveUrl: liveUrl ?? "",
                issues: issues ?? "",
                images: {
                    create: images.map((url: string) => ({ url }))
                }
            }
        });

        return NextResponse.json({ message: "Project succesfully created!"}, { status: 200 });
    }
    catch(err){
        console.log(err);
        return NextResponse.json({ error: err }, { status: 500 });
    }
}

export async function DELETE(req: Request){
    try {
        const body = await req.json();
        const { id } = body
        await db.project.deleteMany({
            where: { id },
        });

        return NextResponse.json({ message: "Post deleted succesfully"}, { status: 200});
    }
    catch(err){
        return NextResponse.json({ error: err}, { status: 500});
    }
}