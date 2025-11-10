import { fetchPosts } from "@/features/post/services/postService";
import { useQuery } from "@tanstack/react-query";

export function useFetchPostsQuery(){
    return useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
        retry: 1
    })
}