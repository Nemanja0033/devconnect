import { db } from "@/lib/prismaClient";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const sanitizedEmail = email.trim().toLowerCase();

    const existingUser = await db.user.findUnique({
      where: { email: sanitizedEmail },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username,
        email: sanitizedEmail,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
