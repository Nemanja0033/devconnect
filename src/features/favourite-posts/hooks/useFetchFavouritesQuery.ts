import { useQuery } from "@tanstack/react-query";
import { fetchFavouritePosts } from "../services/favourites-service";

export function useFetchFavouritesQuery(userId: string){
    return useQuery({
        queryKey: ['favouritePosts', userId],
        queryFn: fetchFavouritePosts
    })
}