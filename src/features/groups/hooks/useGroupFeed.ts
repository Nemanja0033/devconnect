import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { GroupPostForm } from "../types";
import { createGroupPost } from "../services/groups-service";

export function useGroupFeed(groupId: string){
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateGroupPost = async (data?: GroupPostForm) => {
        if(!data) return;

        const { title, content } = data;

        try{
            setIsLoading(true);
            await createGroupPost(title, content, [], groupId);
            queryClient.invalidateQueries({ queryKey: ['group', groupId]});
        }
        catch(err){
            console.error("Error while creating post",err);
        }
        finally{
            setIsLoading(false);
        }
    };

    return{
        isLoading,
        handleCreateGroupPost
    }
}