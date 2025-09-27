import axios from "axios";

export const createPost = async (data: { title: string, content: string, images: string[] }) => {
  return axios.post('/api/posts', data);
};
  
export const createProject = async (data: {
    title: string,
    description: string,
    sourceUrl: string,
    liveUrl: string,
    issues: string,
    images: string[]
    }) => {
    return axios.post('/api/project', data);
};
  