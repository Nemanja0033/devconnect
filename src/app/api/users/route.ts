import { db } from "@/db/db";
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

