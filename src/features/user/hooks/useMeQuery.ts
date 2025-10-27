import { fetchCurrentUser } from "@/features/user/services/userService";
import { useQuery } from "@tanstack/react-query";

export function useMeQuery(enabled: boolean = true){
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: fetchCurrentUser,
        enabled,
        staleTime: 1000 * 60 * 5
    });
};