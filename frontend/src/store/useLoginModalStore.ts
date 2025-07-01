import { create } from 'zustand';

interface ModalStore {
    isLoginModalOpen: boolean;
    openLoginModal: () => void;
    closeLoginModal: () => void;
}

export const useLoginModalStore = create<ModalStore>((set) => ({
    isLoginModalOpen: false,
    openLoginModal: () => set({ isLoginModalOpen: true }),
    closeLoginModal: () => set({ isLoginModalOpen: false }),
}));