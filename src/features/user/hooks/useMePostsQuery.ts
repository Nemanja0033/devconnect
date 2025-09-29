import { fetchCurrentUserPosts } from "@/services/user/userService";
import { useQuery } from "@tanstack/react-query";

export function useMePostsQuery (enabled: boolean = true) {
    return useQuery({
        queryKey: ["currentUserPosts"],
        queryFn: fetchCurrentUserPosts,
        enabled,
        staleTime: 1000 * 60 * 5
    })
}