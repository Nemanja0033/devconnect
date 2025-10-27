import { create } from "zustand";

interface EditDraftStore {
    isCreateGroupModalOpen: boolean;
    setIsCreateModalOpen: (isOpen: boolean) => void;
}

export const useGroupStore = create<EditDraftStore>((set) => ({
    isCreateGroupModalOpen: false,
    setIsCreateModalOpen: (isOpen) => set({ isCreateGroupModalOpen: isOpen }),
}));
