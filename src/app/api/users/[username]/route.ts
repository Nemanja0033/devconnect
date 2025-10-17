import { db } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

// GET single user from db
export async function GET(req: Request, { params }: { params: {username: string}}) {
    try{
        const rawUsername = params.username;
        const username = rawUsername.replace('-', ' ');

        const user = await db.user.findUnique({
        where: { username },
        select: {
          id: true,
          username: true,
          email: true,
          avatar: true,
          bio: true,
          title: true,
          posts: {
                    include: {
                        images: true,
                    }
                },
         Project: {
                    include: {
                        images: true
                    }
                }
        },
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
        const { username, avatar, bio, title } = body;

        if(!username ){
            return NextResponse.json({error: "All fields are required"}, { status: 500});
        }

        const updatedUser = await db.user.update({
            where: {id: params.id },
            data: {
                username: username,
                avatar: avatar,
                bio: bio,
                title: title
            }
        });

        return NextResponse.json({message: "User updated!"}, {status: 200});
    }
    catch(err){
        return NextResponse.json({error: err}, {status: 500});
    }
}

// DELETE single user
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const user = await db.user.findUnique({ where: { id: params.id } });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        await db.user.delete({ where: { id: params.id } });

        return NextResponse.json({ message: "User deleted!" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
