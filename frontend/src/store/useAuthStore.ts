import { create } from 'zustand'

const useAuthStore = create((set) => ({
    isAuth: false,

    setAuth: (isAuth: boolean) => set({isAuth: isAuth})
}))

export default useAuthStore;