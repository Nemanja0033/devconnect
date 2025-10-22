import { db } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string}}){
    try{
        const notifications = await db.notification.findMany({
            where: { reciverId: params.id },
        });

        if(!notifications){
            return NextResponse.json({error: "Post not found"}, { status: 404});
        }

        return NextResponse.json({ notifications }, { status: 200});
    }
    catch(err){
        return NextResponse.json({ error: err}, { status: 500});
    }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const updated = await db.notification.updateMany({
      where: { reciverId: params.id },
      data: {
        viewed: true,
      },
    });

    return NextResponse.json(
      {
        message: "Notifications marked as viewed",
        updatedCount: updated.count,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating notifications:", err);
    return NextResponse.json(
      { error: "Failed to update notifications" },
      { status: 500 }
    );
  }
}
