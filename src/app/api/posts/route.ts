import { db } from "@/db/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
    try {
        const session: any = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { title, content, img } = await req.json();
        const authorId = session.user.id; // Postavljamo authorId iz sesije

        // Prvo proveravamo da li su sva polja popunjena
        if (!title || !content || !img) {
            return NextResponse.json({ error: "All fields are required!" }, { status: 400 });
        }

        const newPost = await db.post.create({
            data: { title, content, authorId, img },
        });

        return NextResponse.json(newPost, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: "Something went wrong!", details: err }, { status: 500 });
    }
}
