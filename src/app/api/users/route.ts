import { db } from "@/db/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

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

// POST method for users also register
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password } = body; 

        if (!name || !email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const userExists = await db.user.findUnique({ where: { email } });

        if (userExists) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }
        
        const hashedPassword = await hash(password, 10); // hash password

        const newUser = await db.user.create({
            data: { name, email, password: hashedPassword },
        });

        return NextResponse.json({ message: "User registered successfully!" }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

