import { db } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        const { title, description, images, sourceUrl, liveUrl, issues } = await req.json();

        if(!title || !description){
            return NextResponse.json({ message: "Title and description are required!"});
        }

        const _newProject = await db.project.create({
            data: {
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