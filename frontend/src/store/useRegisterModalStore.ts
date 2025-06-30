import { create } from 'zustand';

interface ModalStore {
    isRegistrationModalOpen: boolean;
    openRegistrationModal: () => void;
    closeRegistrationModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    isRegistrationModalOpen: false,
    openRegistrationModal: () => set({ isRegistrationModalOpen: true }),
    closeRegistrationModal: () => set({ isRegistrationModalOpen: false }),
}));