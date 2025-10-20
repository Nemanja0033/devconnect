import { fetchPosts } from "@/services/post/postService";
import { useQuery } from "@tanstack/react-query";

export function useFetchPostsQuery(){
    return useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    })
}