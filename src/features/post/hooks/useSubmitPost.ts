'use client';

import { createPost, createProject } from "@/services/post/postService";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CreatePostForm, CreateProjectForm } from "../types";
import { PostDraftType, ProjectDraftType } from "@/features/post-drafts/types";
import { useEditDraftStore } from "@/store/useDraftStore";

export function useSubmitPost(
  imagesUrl: string[],
  resetImages: () => void,
  handleDeleteDraft: (draftType: 'post' | 'project', draftId: string) => void,
  createPostForm: any,
  createProjectForm: any
) {
  const { currentDraft } = useEditDraftStore();

  const handleSubmitPost = async () => {
    const { title, content } = createPostForm.getValues();

    try {
      await createPost({ title, content, images: imagesUrl });
      toast.success("Posted successfully!");

      // Check if posted from saved post draft, and then delete current draft and close modal.
      if (currentDraft) {
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
        images: imagesUrl
      });

      toast.success("Posted successfully!");
      createPostForm.reset();
      resetImages();
    } catch (err) {
      toast.error("Error while posting");
    }
  };

  return {
    createPostForm,
    createProjectForm,
    handleSubmitPost,
    handleSubmitProjectPost
  };
}