import { fetchCurrentUserPosts } from "@/features/user/services/userService";
import { useQuery } from "@tanstack/react-query";

export function useMePostsQuery (enabled: boolean = true) {
    return useQuery({
        queryKey: ["currentUserPosts"],
        queryFn: fetchCurrentUserPosts,
        enabled,
    })
}