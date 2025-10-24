import SinglePostPreview from "@/features/post/components/single-post-preview/SinglePostPreview";
import { db } from "@/lib/prismaClient";

export default async function PostPage({ params }: { params: Promise<{ id: string }>}){ 
    const { id } = await params;
    const post = await db.post.findUnique({
        where: { id },
        include: {
            // Comment: true,
            author: true,
            Like: true,
            images: true,
            _count: {
                select: {
                    Comment: true,
                }
            }
        }
    })

    console.log(post)

    return(
        <main className="w-full h-full flex justify-center gap-2 p-1">
            <SinglePostPreview  post={post} />
        </main>
    )
} 