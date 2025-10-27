import axios from "axios";

export async function createGroup(name: string, description: string, ownerId: string){
    try{
        return axios.post('/api/groups', { name, description, ownerId });
    }
    catch(err){
        console.error("Error while creating group", err);
    }
}