import { create } from "zustand";

interface CreateGroupStore {
    isCreateGroupModalOpen: boolean;
    setIsCreateModalOpen: (isOpen: boolean) => void;
}

interface GroupFeedStore {
    isNewPostModalOpen: boolean;
    setIsNewPostModalOpen: (isOpen: boolean) => void;
}

export const useGroupStore = create<CreateGroupStore>((set) => ({
    isCreateGroupModalOpen: false,
    setIsCreateModalOpen: (isOpen) => set({ isCreateGroupModalOpen: isOpen }),
}));

export const useGroupFeedStore = create<GroupFeedStore>((set) => ({
    isNewPostModalOpen: false,
    setIsNewPostModalOpen: (isOpen) => set({ isNewPostModalOpen: isOpen})
}));
