import { useQuery } from "@tanstack/react-query";
import { getPostDrafts, getProjecftDrafts } from "../services/draftService";

export function useDraftQuery(){
    return useQuery({
        queryKey: ['drafts'],
        queryFn: async () => {
          const postDrafts = await getPostDrafts();
          const projectDrafts = await getProjecftDrafts();
          return [...postDrafts, ...projectDrafts];
        },
      });
}