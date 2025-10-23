import axios from "axios";

export async function likePost(postId: string){
    try{
        return axios.post('/api/likes', { postId });
    }
    catch(err){
        throw new Error('Error with like this post');
    }
}

export async function postComment(postId: string, content: string){
    try{
        return axios.post('/api/comments', { postId, content });
    }
    catch(err){
        throw new Error("Error while commenting");
    }
}

export async function fetchComments(postId: string){
    try{
        return axios.get(`/api/comments/${postId}`)
    }
    catch(err){
        throw new Error("Error while fetching coments");
    }
}