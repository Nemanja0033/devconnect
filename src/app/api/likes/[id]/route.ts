import { db } from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session: any = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const likeId = params.id;

        const existingLike = await db.like.findUnique({
            where: { id: likeId },
        });

        if (!existingLike) {
            return NextResponse.json({ error: "Like not found" }, { status: 404 });
        }

        // Proveravamo da li lajk pripada trenutnom korisniku
        if (existingLike.authorId !== session.user.id) {
            return NextResponse.json({ error: "You can only remove your own likes" }, { status: 403 });
        }

        await db.like.delete({
            where: { id: likeId },
        });

        return NextResponse.json({ message: "Like removed successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
