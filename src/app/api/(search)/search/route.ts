import { db } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { searchTerm } = await req.json();

    if (!searchTerm || typeof searchTerm !== "string") {
      return NextResponse.json({ error: "Invalid search term" }, { status: 400 });
    }

    const posts = await db.post.findMany({
      where: {
        OR: [
          { title: { contains: searchTerm, mode: "insensitive" } },
          { content: { contains: searchTerm, mode: "insensitive" } },
        ],
      },
      orderBy: { createdAt: "desc" },
      take: 20,
      include: {
        author: { select: { id: true, username: true, avatar: true } },
        // images: { select: { id: true, url: true } },
        // _count: { select: { Comment: true } },
      },
    });

    return NextResponse.json({ posts }, { status: 200 });
  } catch (err) {
    console.error("Search error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
