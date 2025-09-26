'use client'
import { PostDraftType, ProjectDraftType } from "@/types";
import { useState } from "react";
import { useUploadImages } from "./useUploadImages";
import { savePostDraft, saveProjectDraft, getPostDrafts, getProjecftDrafts, deleteDraft } from "@/services/draftService";
import { toast } from "sonner";
import { mapImagesToObject } from "../_lib/lib";

export function useDraft( imagesUrl: string[], resetImages: () => void){
    const [isSavingDraft, setIsSavingDraft] = useState(false);
    const [drafts, setDrafts] = useState<PostDraftType[] | ProjectDraftType[]>([]);
    const [currentDraft, setCurrentDraft] = useState<PostDraftType | ProjectDraftType>();
    const [isDeleteDraftModalOpen, setIsDeleteDraftModalOpen] = useState(false);
    const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSavePostDraft = async (postForm: any) => {
        setIsSavingDraft(true);
        const { title, content } = postForm.getValues();
        const imagesObj = mapImagesToObject(imagesUrl);
        try {
          await savePostDraft({ title, content }, imagesObj);
          toast.success("Draft saved successfully!");
          postForm.reset();
          resetImages();
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
          issues 
        } = projectForm.getValues();
    
        // assing images url into obj as backend expects
        const imagesObj = mapImagesToObject(imagesUrl);
          
        try {
          await saveProjectDraft({ title, description, sourceCodeUrl, techStack, liveDemoUrl, issues }, imagesObj);
          toast.success("Draft saved successfully!");
          projectForm.reset();
          resetImages();
        } catch (err) {
          toast.error("Error while saving draft");
        } finally {
          setIsSavingDraft(false);
        }
    };
    
    const handleGetDrafts = async () => {
        try {
          setIsLoading(true);
          const postDrafts = await getPostDrafts();
          const projectDrafts = await getProjecftDrafts();
    
          // merge drafts 
          setDrafts([...postDrafts, ...projectDrafts]);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
          setIsLoading(false);
        }
        finally{
          setIsLoading(false);
        }
    };

    const handleDeleteDraft = async (draftType: 'post' | 'project', draftId: string | undefined) => {
      try {
        await deleteDraft(draftType, draftId);
        setDrafts((prevDrafts: any[]) => (prevDrafts as any[]).filter((d: any) => d.id !== draftId));
        setCurrentDraft(undefined);
        setIsDraftModalOpen(false);
      } catch (err) {
        console.error(err);
        toast.error("Error while deleting draft");
      }
    };

    const openEditDraftModal = (draftId: string) => {
      const rawDraft = drafts.filter((x) => x.id === draftId);
      const draft = rawDraft[0];
      if(!draft) return;
      setCurrentDraft(draft)
      console.log(currentDraft)
      setIsDraftModalOpen(true);
    }

    return {
        isLoading,
        isSavingDraft,
        drafts,
        currentDraft,
        isDeleteDraftModalOpen,
        isDraftModalOpen,
        setIsDeleteDraftModalOpen,
        setIsDraftModalOpen,
        setCurrentDraft,
        openEditDraftModal,
        handleGetDrafts,
        handleDeleteDraft,
        handleSavePostDraft,
        handleSaveProjectDraft
    }
}