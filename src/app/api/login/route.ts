import { db } from "@/lib/prismaClient";
import { compare } from "bcrypt";
import { NextResponse } from "next/server";

export async function PUT(req: Request) { 
    try{
        const body = await req.json();
        const { email, password } = body;

        if(!email || !password){
            return NextResponse.json({ error: "Email and password are required!"}, { status: 400})
        }

        const user = await db.user.findUnique({
            where: { email }
        });

        if(!user){
            return NextResponse.json({error: "User not found"}, { status: 404});
        }

        const isPasswordValid = await compare(password, user.password);

        if(!isPasswordValid){
            return NextResponse.json({ error: "Invalid Password"}, { status: 401});
        }


        return NextResponse.json({ message: "Login succcesfull "}, { status: 200});
    }
    catch(err){
        return NextResponse.json({ error: err}, { status: 500});
    }
}