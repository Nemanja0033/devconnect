import { toast } from "sonner";
import { createGroup } from "../services/groups-service";
import { useState } from "react";
import { GroupForm } from "../types";
import { useQueryClient } from "@tanstack/react-query";

export function useCreateGroup(){
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);

    async function handleCreateGroup(data?: GroupForm){
        if(!data) return;

        const { name, description } = data;

        try{
            setIsLoading(true);
            await createGroup(name, description);
            queryClient.invalidateQueries({ queryKey: ['groups']});
            toast.success("Group succesfully created!");
        }
        catch(err){
            console.error("Error while creating group",err);
            toast.error("Error while creating group");
        }
        finally{
            setIsLoading(false);
        }
    }

    return {
        handleCreateGroup,
        isLoading
    }
}