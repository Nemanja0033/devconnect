import { fetchCurrentUser, fetchUser } from "@/services/user/userService";
import { useQuery } from "@tanstack/react-query";

export function useFetchUserQuery(username: string) {
  return useQuery({
    queryKey: ["user", username],
    queryFn: () => fetchUser(username),
    enabled: !!username, 
    staleTime: 1000 * 60 * 5,
  });
}
