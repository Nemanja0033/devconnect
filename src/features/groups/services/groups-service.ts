import axios from "axios";

export async function createGroup(name: string, description: string){
    try{
        return axios.post('/api/groups', { name, description });
    }
    catch(err){
        throw new Error("Error while creating group");
    }
}

export async function fetchGroups(){
    try{
        return axios.get('/api/groups');
    }
    catch(err){
        throw new Error("Error while fetching groups");
    }
}

export async function joinGroup(groupId: string){
    try{
        return axios.post(`/api/groups/${groupId}`);
    }
    catch(err){
        throw new Error("Error while joining group");
    }
}