import { PostDraftType } from "@/features/post-drafts/types";
import { db } from "@/lib/prismaClient";

export default async function FeedPage(){
    const posts: PostDraftType[] = await db.post.findMany();
    return (
        <div className="w-full h-screen grid place-items-center">
            {posts.map((p) => (
                <div className="w-96 h-auto bg-accent rounded-md p-3">
                    <span>{p.title}</span>
                    <p>{p.content}</p>
                </div>
            ))}
        </div>
    )
}