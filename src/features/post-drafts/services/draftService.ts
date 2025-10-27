import { CreatePostForm, CreateProjectForm } from "@/features/post/types";
import axios from "axios";

export const savePostDraft = async (data: CreatePostForm, images: unknown[]) => {
  try {
    const response = await axios.post('/api/draft/post', {
      title: data.title,
      content: data.content,
      images: images
    });
    return response.data;
  } catch (error) {
    console.error("Error saving post draft:", error);
    throw error;
  }
}

export const saveProjectDraft = async (data: CreateProjectForm, images: unknown[]) => {
  try {
    const response = await axios.post('/api/draft/project', {
      title: data.title,
      description: data.description,
      sourceUrl: data.sourceCodeUrl,
      liveUrl: data.liveDemoUrl,
      issues: data.issues,
      images: images
    });
    return response.data;
  } catch (error) {
    console.error("Error saving project draft:", error);
    throw error;
  }
}

export const getPostDrafts = async () => {
  try{
    const drafts = await axios.get('/api/draft/post');
    
    return drafts.data;
  }
  catch(err){
    console.log(err);
  }
}


export const getProjecftDrafts = async () => {
  try{
    const drafts = await axios.get('/api/draft/project');
    
    return drafts.data;
  }
  catch(err){
    console.log(err);
  }
}

export const deleteDraft = async (draftType: "post" | "project", draftId: unknown) => {
  try{
      await axios.delete(`/api/draft/${draftType}`, { data: { draftId: draftId } })
  }
  catch(err){
    console.log(err)
  }
}