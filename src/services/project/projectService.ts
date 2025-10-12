import axios from "axios";

export async function deleteProject(data: { id: string }){
    return axios.delete('/api/project', { data }); 
}