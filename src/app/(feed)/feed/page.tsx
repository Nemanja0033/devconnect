"use client"
import Post from "@/features/feed/components/Post";
import PostSkeleton from "@/features/feed/components/PostSkeleton";
import { useFetchPostsQuery } from "@/features/feed/hooks/useFetchPostsQuery";

// THIS IS ONLY FOR DEMO PURPOSES THIS CODE NEEDS TO BE REFACTORED LATTER FOR STABLE RELASE
export default function FeedPage(){
    const { data: posts, isLoading } = useFetchPostsQuery();

    return (
        <div className="w-full p-3 h-screen grid gap-2 place-items-center">
            {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => <PostSkeleton key={i} />)
            ) : (
                posts?.data?.map((p: any, i: number) => (
                    <Post key={p.id ?? i} post={p} />
                ))
            )}
        </div>
    )
}