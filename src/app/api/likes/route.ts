import { db } from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "@/lib/authOptions";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const postId = searchParams.get("postId");

        if (!postId) {
            return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
        }

        const likes = await db.like.findMany({
            where: { postId },
        });

        return NextResponse.json({ likes }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session: any = await getServerSession(getAuthOptions());

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { postId } = await req.json();

        if (!postId) {
            return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
        }

        const existingLike = await db.like.findFirst({
            where: {
                postId,
                authorId: session.user.id,
            },
        });

        if (existingLike) {
            return NextResponse.json({ error: "You have already liked this post" }, { status: 400 });
        }

        const like = await db.like.create({
            data: {
                postId,
                authorId: session.user.id,
            },
        });

        return NextResponse.json({ like }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
