import { db } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getAuthOptions } from "@/lib/authOptions";

// geting all posts

// THIS IS ONLY FOR DEMO PURPOSES THIS CODE NEEDS TO BE REFACTORED LATTER FOR STABLE RELASE
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(Number(searchParams.get('limit')) || 30, 50); // max 50
    const cursor = searchParams.get('cursor'); // postId
  
    try {
      const posts = await db.post.findMany({
        take: limit + 1, // fetch one extra to detect next page
        ...(cursor && {
          skip: 1,
          cursor: { id: cursor },
        }),
        orderBy: { createdAt: 'desc' },
        include: {
          Like: {
            select: {
              author: { select: { username: true, avatar: true } },
              authorId: true,
            },
          },
          images: { select: { id: true, url: true } },
          author: { select: { id: true, username: true, avatar: true } },
          favourite: {
            select: {
              id: true,
              postId: true,
              author: true,
              authorId: true,
            },
          },
          _count: { select: { Comment: true } },
          group: true
        },
      });
  
      const hasNextPage = posts.length > limit;
      const nextCursor = hasNextPage ? posts[limit - 1].id : null;
  
      return NextResponse.json(
        {
          posts: hasNextPage ? posts.slice(0, limit) : posts,
          nextCursor,
        },
        { status: 200 }
      );
    } catch (err) {
      console.error('Feed error:', err);
      return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
  }
  
// new post
export async function POST(req: Request) {
    try {
        const session: any = await getServerSession(getAuthOptions());

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { title, content, images, groupId } = await req.json();
        const authorId = session.user.id;

        
        if (!title || !content || !images) {
            return NextResponse.json({ error: "All fields are required!" }, { status: 400 });
        }

        const newPost = await db.post.create({
            data: { 
              title, 
              content, 
              authorId,  
              images: { create: images.map((url: string) => ({ url })),},
              groupid: groupId ?? null
            },
        });

        return NextResponse.json(newPost, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: "Something went wrong!", details: err }, { status: 500 });
    }
}

export async function DELETE(req: Request){
    try {
        const body = await req.json();
        const { id } = body
        await db.post.deleteMany({
            where: { id },
        });

        return NextResponse.json({ message: "Post deleted succesfully"}, { status: 200});
    }
    catch(err){
        return NextResponse.json({ error: err}, { status: 500});
    }
}
