import { db } from "@/db/db";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// GET method for users
export async function GET(){ // get method for users
    try{
        const users = await db.user.findMany();
        return NextResponse.json(users, { status: 200});
    }
    catch(err) {    
        return NextResponse.json(err, { status: 500});
    }
};

// POST method for users
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const userExist = await db.user.findUnique({ where: { email } });

        if (userExist) {
            return NextResponse.json({ error: "User already exists!" }, { status: 409 });
        }

        const user = await db.user.create({
            data: { name, email, password }
        });

        return NextResponse.json(user, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
