import { create } from "zustand";

type LoadingStore = {
    isLoading: boolean,
    toggleLoading: () => void
}

export const useLoadingStore = create<LoadingStore>((set) => ({
    isLoading: false,
    toggleLoading: () => set((state: any) => ({isLoading: !state.isLoading})),
}))