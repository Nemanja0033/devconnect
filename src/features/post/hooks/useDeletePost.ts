import { useState } from "react";
import { deletePost } from "../services/postService";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export function useDeletePost(){
    const queryClient = useQueryClient();
    const [isPending, setIsPending] = useState(false);

    async function handleDeletePost(id: string){
        try{
            setIsPending(true);
            await deletePost({ id });
            await queryClient.invalidateQueries({ queryKey: ["user"]});
            // Invalidate on feed too
            await queryClient.invalidateQueries({ queryKey: ["posts"]});
            toast.success("Post succesfully deleted");
        }
        catch(err){
            console.error(err);
            toast.error("Error while deleting post");
        }
        finally{
            setIsPending(false);
        }
    }

    return {
        isPending,
        handleDeletePost
    }
}