import { fetchCurrentUser } from "@/features/user/services/userService";
import { useIsUserAuth } from "@/hooks/useSession";
import { useQuery } from "@tanstack/react-query";

export function useMeQuery(enabled: boolean = true){
    const { isAuth } = useIsUserAuth()
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: fetchCurrentUser,
        staleTime: 1000 * 60 * 5
    });
};