import axios from "axios";

export async function fetchFavouritePosts(){
    try{
        return await axios.get('/api/favourite');
    }
    catch(err){
        throw new Error("Error while fetching");
    }
}

export async function fetchUserFavouritePosts(userId: string){
    try{
        const res = await axios.get(`/api/favourite/${userId}`);
        return res.data;
    }
    catch(err){
        throw new Error("Error while fetching");
    }
}