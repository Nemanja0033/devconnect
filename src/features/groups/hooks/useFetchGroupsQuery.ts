import { useQuery } from "@tanstack/react-query";
import { fetchGroups } from "../services/groups-service";

export function useFetchGroupsQuery(){
    return useQuery({
        queryKey: ['groups'],
        queryFn: fetchGroups,
    })
}