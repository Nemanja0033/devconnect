'use client'
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { savePostDraft, saveProjectDraft, getPostDrafts, getProjecftDrafts, deleteDraft } from "@/services/post-draft/draftService";
import { toast } from "sonner";
import { mapImagesToObject } from "@/features/post/lib/lib";
import { useEditDraftStore } from "@/store/useDraftStore";

export function useDraft(imagesUrl: string[], resetImages: () => void) {
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const { currentDraft, setCurrentDraft, setIsEditDraftModalOpen } = useEditDraftStore();

  const { data: drafts = [],isLoading, refetch: refetchDrafts} = useQuery({
    queryKey: ['drafts'],
    queryFn: async () => {
      const postDrafts = await getPostDrafts();
      const projectDrafts = await getProjecftDrafts();
      return [...postDrafts, ...projectDrafts];
    },
  });

  const handleSavePostDraft = async (postForm: any) => {
    setIsSavingDraft(true);
    const { title, content } = postForm.getValues();
    const imagesObj = mapImagesToObject(imagesUrl);
    try {
      await savePostDraft({ title, content }, imagesObj);
      toast.success("Draft saved successfully!");
      postForm.reset();
      resetImages();
      await refetchDrafts();
    } catch (err) {
      toast.error("Error while saving draft");
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handleSaveProjectDraft = async (projectForm: any) => {
    setIsSavingDraft(true);
    const {
      title,
      description,
      sourceCodeUrl,
      techStack,
      liveDemoUrl,
      issues,
    } = projectForm.getValues();

    const imagesObj = mapImagesToObject(imagesUrl);

    try {
      await saveProjectDraft({ title, description, sourceCodeUrl, techStack, liveDemoUrl, issues }, imagesObj);
      toast.success("Draft saved successfully!");
      projectForm.reset();
      resetImages();
      await refetchDrafts();
    } catch (err) {
      toast.error("Error while saving draft");
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handleDeleteDraft = async (draftType: 'post' | 'project', draftId: string | undefined) => {
    try {
      console.log('@deleting_draft', draftId);
      await deleteDraft(draftType, draftId);
      toast.success("Draft deleted");
      await refetchDrafts();
      setIsEditDraftModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Error while deleting draft");
    }
  };

  const openEditDraftModal = (draftId: string) => {
    const draft = drafts.find((x) => x.id === draftId);
    if (!draft) return;
    setCurrentDraft(draft);
    setIsEditDraftModalOpen(true);
    console.log(currentDraft);
  };

  return {
    isLoading,
    isSavingDraft,
    drafts,
    currentDraft,
    openEditDraftModal,
    handleDeleteDraft,
    handleSavePostDraft,
    handleSaveProjectDraft,
  };
}