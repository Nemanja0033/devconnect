import axios from "axios";

export async function fetchFavouritePosts(){
    try{
        return await axios.get('/api/favourite');
    }
    catch(err){
        throw new Error("Error while fetching");
    }
}