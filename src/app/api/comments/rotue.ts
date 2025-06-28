import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/prismaClient";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session: any = await getServerSession(authOptions);

  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const { postId, content } = await req.json();

    if (!postId || !content) {
      return NextResponse.json({ message: "Post ID and content are required" }, { status: 400 });
    }

    const comment = await db.comment.create({
      data: {
        content,
        postId,
        authorId: session?.user.id,
      },
    });

    return NextResponse.json(comment, { status: 201 });
    
  } catch (error) {
    return NextResponse.json({ message: "Error creating comment", error }, { status: 500 });
  }
}
