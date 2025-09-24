'use client'

import { createPost, createProject } from "@/services/postService";
import { CreatePostForm, CreateProjectForm } from "@/types";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUploadImages } from "./useUploadImages";
import { useDraft } from "./useDraft";

export function useSubmitPost(){
    const { imagesUrl, resetImages } = useUploadImages();
    const { currentDraft, handleDeleteDraft } = useDraft();

    const createPostForm = useForm<CreatePostForm>({ mode: "onSubmit" });
    const createProjectForm = useForm<CreateProjectForm>({ mode: "onSubmit" });
    
    const handleSubmitPost = async () => {
        const { title, content } = createPostForm.getValues();
        try {
          await createPost({ title, content, images: imagesUrl });
          toast.success("Posted successfully!");
    
          // check if posted from saved post draft, and then run this code to delete current draft and close modal.
          if(currentDraft){
            handleDeleteDraft('post', currentDraft.id);
          }
    
          createPostForm.reset();
          resetImages();
        } catch (err) {
          toast.error("Error while posting");
        }
    };
    
    const handleSubmitProjectPost = async () => {
        const { 
                title, 
                description, 
                sourceCodeUrl, 
                liveDemoUrl, 
                issues 
              } = createProjectForm.getValues();
        try {
          await createProject({ 
            title, 
            description, 
            sourceUrl: sourceCodeUrl, 
            liveUrl: liveDemoUrl, 
            issues, 
            images: imagesUrl });
            
          toast.success("Posted successfully!");
          createPostForm.reset();
          resetImages();
        } catch (err) {
          toast.error("Error while posting");
        }
    };

    return{
        createPostForm,
        createProjectForm,
        handleSubmitPost,
        handleSubmitProjectPost
    }
}