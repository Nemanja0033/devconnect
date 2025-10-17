import { updateUser } from "@/services/user/userService";
import { useQueryClient } from "@tanstack/react-query";
import { EditHeadingForm, EditAboutForm } from "../types";
import { useMeQuery } from "./useMeQuery";

export function useUpdateUser(imagesUrl: string[], rawUsername: string){
    const queryClient = useQueryClient();
    const { data: user } = useMeQuery();

    const handleUpdateUser = async (data?: EditHeadingForm | EditAboutForm) => {
        try {
          // If we pass data - we are updating Heading or About then run this block.   
          if(data){
            if ('username' in data && (data.username === user?.user.username)) {
                console.log('No username were changed.');
                delete data.username;
            }
    
            if('title' in data && (data.title === user?.user.title)){
                console.log('No title were changed');
                delete data.title;
            }
        
            if('bio' in data && (data.bio === user?.user.bio)){
                console.log('About not changed');
                delete data.bio;
            }
    
            if(Object.keys(data).length === 0){
                console.log("Nothing were changed");
                return;
            }
            const updatedUser = await updateUser(data);
            queryClient.invalidateQueries({ queryKey: ['currentUser']});
          }
          
          // If we are updaing avatar
          if(imagesUrl !== undefined && imagesUrl.length > 0){
            const updateData: any = {};
            updateData.avatar = imagesUrl[0];
            await updateUser(updateData);
            queryClient.invalidateQueries({ queryKey: ['user', rawUsername]});
          }
        } catch (error) {
          console.error("Update failed:", error);
        }
    };
    
    return {
        handleUpdateUser
    }
}