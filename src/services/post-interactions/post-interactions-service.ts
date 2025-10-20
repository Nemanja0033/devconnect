import axios from "axios";

export async function likePost(postId: string){
    try{
        return axios.post('/api/likes', { postId });
    }
    catch(err){
        throw new Error('Error with like this post');
    }
}