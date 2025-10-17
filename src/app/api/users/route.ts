  import { db } from "@/lib/prismaClient";
  import { NextResponse } from "next/server";
  import { URL } from "url";

  // GET method for users
  export async function GET(req: Request) {
    try {
      const { searchParams } = new URL(req.url);
      const username = searchParams.get("username");

      if (!username) {
        return NextResponse.json({ error: "Username is required" }, { status: 400 });
      }

      const user = await db.user.findUnique({
        where: { username },
        select: {
          id: true,
          username: true,
          email: true,
          avatar: true,
          bio: true,
          title: true,
        },
      });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json(user, { status: 200 });
    } catch (err) {
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
