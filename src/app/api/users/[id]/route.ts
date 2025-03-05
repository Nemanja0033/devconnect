import { db } from "@/db/db";
import { NextResponse } from "next/server";

// GET single user from db
export async function GET(req: Request, { params }: { params: {id: string}}) {
    try{
        const user = await db.user.findUnique({
            where: { id: params.id },
            include: {posts: true}
        });

        if(!user){
            return NextResponse.json({error: "User not found"}, { status: 404});
        }

        return NextResponse.json(user, {status: 200});
    }
    catch(err) {
        return NextResponse.json({error: err}, { status: 500});
    }
}

// Update user
export async function PUT(req: Request, { params }: { params: {id: string}}) {
    try{
        const body = await req.json();
        const { name, email } = body;
        const updatedUser = await db.user.update({
            where: {id: params.id },
            data: { name, email }
        });

        if(!name || !email){
            return NextResponse.json({error: "All fields are required"}, { status: 500});
        }

        return NextResponse.json({message: "User updated!"}, {status: 200});
    }
    catch(err){
        return NextResponse.json({error: err}, {status: 500});
    }
}

// DELETE single user
export async function DELETE(req: Request, { params }: { params: { id: string}}){
    try{
        const id = params.id;

        if(!id){
            return NextResponse.json({error: "User id is required"}, {status: 400});
        }

        await db.user.delete({where: {id}}) // delete user
        
        return NextResponse.json({message: "User deleted!"}, { status: 200});
    }
    catch(err){
        return NextResponse.json({error: err}, { status: 500})
    }
}