import { getPostDrafts, getProjecftDrafts } from "@/services/post-draft/draftService";
import { useQuery } from "@tanstack/react-query";

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