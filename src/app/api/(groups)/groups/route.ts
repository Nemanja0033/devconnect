import { getAuthOptions } from "@/lib/authOptions";
import { db } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session: any = await getServerSession(getAuthOptions());

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        const { name, description, ownerId } = await req.json();

        // Validate input
        if (!name || !description || !ownerId) {
            return NextResponse.json({ error: "All fields are required!" }, { status: 400 });
        }

        // Create the group
        const newGroup = await db.group.create({
            data: { name, description, ownerId },
        });

        // Add the creator as a member of the group
        if (newGroup) {
            await db.groupMember.create({
                data: { userId: ownerId, groupId: newGroup.id },
            });
        }

        return NextResponse.json({ message: "Group created successfully!" }, { status: 200 });
    } catch (err) {
        console.error("Error creating group:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}