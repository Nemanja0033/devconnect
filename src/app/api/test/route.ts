import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(){
    const session: any = await getServerSession(authOptions);
    return NextResponse.json({message: session})
}