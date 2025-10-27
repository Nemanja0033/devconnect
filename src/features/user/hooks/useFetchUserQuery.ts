import { fetchCurrentUser, fetchUser } from "@/features/user/services/userService";
import { useQuery } from "@tanstack/react-query";

export function useFetchUserQuery(username: string) {
  return useQuery({
    queryKey: ["user", username],
    queryFn: () => fetchUser(username),
    enabled: !!username, 
    retry: false,
    refetchOnWindowFocus: false
  });
}
