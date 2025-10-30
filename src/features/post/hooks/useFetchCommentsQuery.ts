import { fetchComments } from "@/features/post/services/post-interactions-service";
import { useQuery } from "@tanstack/react-query";

export function useFetchCommentsQuery(postId: string){
    return useQuery({
        queryKey: ['comments', postId],
        queryFn: () => fetchComments(postId)
    })
}