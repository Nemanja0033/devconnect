"use client"
import Post from "@/features/components/Post";
import { useFetchPostsQuery } from "@/features/feed/hooks/useFetchPostsQuery";

// THIS IS ONLY FOR DEMO PURPOSES THIS CODE NEEDS TO BE REFACTORED LATTER FOR STABLE RELASE
export default function FeedPage(){
    const { data: posts, isLoading, isError} = useFetchPostsQuery();

    if(isLoading) return;

    return (
        <div className="w-full p-3 h-screen grid gap-2 place-items-center">
            {posts?.data?.map((p: any, i: number) => (
                <Post key={p.id ?? i} post={p} />
            ))}
        </div>
    )
}