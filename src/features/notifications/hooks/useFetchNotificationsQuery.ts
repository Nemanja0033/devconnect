import { fetchNotifications } from "@/services/notifications/notification-service";
import { useQuery } from "@tanstack/react-query";

export function useFetchNofiticationsQuery(reciverId: string){
    return useQuery({
        queryKey: ["notifications"],
        queryFn: () => fetchNotifications(reciverId),
        refetchInterval: 10000,
    })
}