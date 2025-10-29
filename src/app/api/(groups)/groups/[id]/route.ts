import { getAuthOptions } from "@/lib/authOptions";
import { db } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: {id: string }}){
    try{
        const session: any = await getServerSession(getAuthOptions());

        if(!session){
            return NextResponse.json({ error: "Unauthorized"}, { status: 401 });
        }

        const isMember = await db.groupMember.findUnique({
            where: {
              userId_groupId: {
                userId: session.user.id,
                groupId: params.id,
              },
            },
        });

        if(isMember){
            await db.groupMember.delete({
                where: {
                  userId_groupId: {
                    userId: session.user.id,
                    groupId: params.id,
                  },
                },
            });

            return NextResponse.json({ message: "Membership removed!"}, { status: 201 })
        }

        const _newMember = await db.groupMember.create({
            data: {
                userId: session.user.id,
                groupId: params.id
            }
        })

        return NextResponse.json({ message: "User entered a group" }, { status: 201 });
    }
    catch(err){
        return NextResponse.json({ error: err }, { status: 500 });
    }
}