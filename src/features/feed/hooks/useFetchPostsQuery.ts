import { fetchPosts } from "@/services/post/postService";
import { useQuery } from "@tanstack/react-query";

// THIS IS ONLY FOR DEMO
export function useFetchPostsQuery(){
    return useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
        retry: 1
    })
}