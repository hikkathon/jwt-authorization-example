import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
    persist(
        (set) => ({
            isAuth: false,
            accessToken: "",
            email: "",
            setAuth: (isAuth: boolean) => set({isAuth}),
            setAccessToken: (accessToken: string) => set({accessToken}),
            setEmail: (email: string) => set({email}),
            clearAuth: () => set({isAuth: false, accessToken: "", email: ""}),
        }),
        {
            name: 'auth-storage',
        }
    )
)