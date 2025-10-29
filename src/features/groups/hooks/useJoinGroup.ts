import { useState } from "react";
import { joinGroup } from "../services/groups-service";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export function useJoinGroup(){
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);

    async function handleJoinGroup(groupId: string){
        try{
            setIsLoading(true);
            await joinGroup(groupId);
            queryClient.invalidateQueries({ queryKey: ['groups']});
            toast.success(`You uccesfully joined group`);
        }
        catch(err){
            console.error("Error while joining group");
        }
        finally{
            setIsLoading(false);
        }
    }

    return {
        isLoading,
        handleJoinGroup
    }
}