import { createPost, createProject } from "@/features/post/services/postService";
import { toast } from "sonner";
import { useEditDraftStore } from "@/features/post-drafts/store/useDraftStore";
import { CreatePostForm, CreateProjectForm } from "../types";
import { deleteDraft } from "@/features/post-drafts/services/draftService";

export function useSubmitPost(
  imagesUrl: string[],
  resetImages: () => void,
  handleDeleteDraft: (draftType: 'post' | 'project', draftId: string) => void,
  createPostForm: any,
  createProjectForm: any,
  createPostFormDraft: any,
  createProjectFromDraft: any
) {
  const { currentDraft } = useEditDraftStore();

  const handleSubmitPost = async (data?: CreatePostForm) => {
    if(!data) return;
    // use this simpler logic to pass data coming from form whatever is from draft or post form.
    const { title, content} = data;

    try {
      await createPost({ title, content, images: imagesUrl });
      toast.success("Posted successfully!");

      // Check if posted from saved post draft, and then delete current draft and close modal.
      if (currentDraft) {
        handleDeleteDraft('post', currentDraft.id);
      }

      createPostForm.reset();
      createPostFormDraft.reset();
      resetImages();
    } catch (err) {
      toast.error("Error while posting");
    }
  };

  const handleSubmitProjectPost = async (data?: CreateProjectForm) => {
    if(!data) return;

    const {
      title,
      description,
      sourceCodeUrl,
      liveDemoUrl,
      issues
    } = data;

    try {
      await createProject({
        title,
        description,
        sourceCodeUrl,
        liveDemoUrl,
        issues,
        images: imagesUrl
      });
      toast.success("Posted successfully!");

      if(currentDraft){
        await deleteDraft('project', currentDraft.id)
      }

      createProjectForm.reset();
      createProjectForm.reset()
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