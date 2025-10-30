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

export async function fetchSingleGroup(id: string) {
    try {
      const res = await axios.get(`/api/groups/${id}`);
      return res.data; 
    } catch (err) {
      throw new Error("Error while fetching group");
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

export async function createGroupPost(title: string, content: string, images: any[], groupId: string){
    try{
        return axios.post('/api/posts', { title, content, images, groupId });
    }
    catch(err){
        throw new Error("Error while creating group post");
    }
}