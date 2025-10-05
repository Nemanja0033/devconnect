import { PostDraftType, ProjectDraftType } from "@/features/post-drafts/types";
import { create } from "zustand";

interface EditDraftStore {
    isEditDraftModalOpen: boolean;
    currentDraft: PostDraftType | ProjectDraftType | null;
    setIsEditDraftModalOpen: (isOpen: boolean) => void;
    setCurrentDraft: (draft: PostDraftType | ProjectDraftType) => void;
}

interface DeleteDraftStore {
    isDeleteDraftModalOpen: boolean,
    setIsDeleteDraftModalOpen: (isOpen: boolean) => void
}

export const useEditDraftStore = create<EditDraftStore>((set) => ({
    isEditDraftModalOpen: false,
    currentDraft: null,
    setIsEditDraftModalOpen: (isOpen) => set({ isEditDraftModalOpen: isOpen }),
    setCurrentDraft: (draftId) => set({ currentDraft: draftId }),
}));

export const useDeleteDraftStore = create<DeleteDraftStore>((set) => ({
    isDeleteDraftModalOpen: false,
    setIsDeleteDraftModalOpen: (isOpen) => set({ isDeleteDraftModalOpen: isOpen})
}))
