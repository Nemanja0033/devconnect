import { useQuery } from "@tanstack/react-query";
import { fetchNotifications } from "../services/notification-service";

export function useFetchNofiticationsQuery(reciverId: string){
    return useQuery({
        queryKey: ["notifications"],
        queryFn: () => fetchNotifications(reciverId),
        refetchInterval: 5000,
    })
}