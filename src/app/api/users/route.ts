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
export async function POST(req: Request){
    try{
        const body = await req.json();
        const { name, email, password } = body; // destructuring from request body
        
        const userExist = await db.user.findUnique({ where: { email }}); // store boolean if user exists or not

        const user = await db.user.create({
            data: {name, email, password}
        });
        
        if(!name || !email || !password){ // if uset not pass a params
            return NextResponse.json({ error: 'All fields are requierd'}, { status: 400 });
        }

        if(userExist) { // check if user exists
            return NextResponse.json({error: 'User already exists!'}, { status: 409});
        }

        return user; // returning user if everything is ok
    }
    catch(err) {
        return NextResponse.json({error: err}, {status: 500});
    }
}

// PUT method for users
export async function PUT(req: Request) {
    try{
        const body = await req.json();
        const { id, name, email } = body;

        if(!id){ // checking if no ID
            return NextResponse.json({error: "User id is required"}, {status: 400});
        }

        const user = await db.user.update({ // updating user via prisma methods
            where: { id },
            data: {email, name}
        });
        
        return NextResponse.json(user, { status: 200});
    }
    catch(err){
        return NextResponse.json({error: err}, { status: 500});
    }
}