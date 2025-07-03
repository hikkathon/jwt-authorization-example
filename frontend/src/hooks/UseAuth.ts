import { useMutation, useQuery } from '@tanstack/react-query';
import AuthService from '../services/AuthService';
// @ts-ignore
import type { AxiosResponse } from 'axios';

export type TokensType = {
    accessToken: string;
    refreshToken: string;
};

export type DataType = {
    id: number;
    email: string;
    isActivate: boolean;
    tokens: TokensType;
};

export type AuthResponseType = {
    success: boolean;
    data: DataType;
};

export const useAuth = () => {
    const registerMutation = useMutation<AxiosResponse<AuthResponseType>, Error, { email: string; password: string }>({
        mutationFn: (data) => AuthService.registration(data.email, data.password),
    });

    const loginMutation = useMutation<AxiosResponse<AuthResponseType>, Error, { email: string; password: string }>({
        mutationFn: (data) => AuthService.login(data.email, data.password),
    });

    const logoutMutation = useMutation({
        mutationFn: () => AuthService.logout(),
    });

    const checkAuth = useQuery<AuthResponseType>({
        queryKey: ['auth-data'],
        queryFn: AuthService.checkAuth,
        enabled: false
    });

    return { registerMutation, loginMutation, logoutMutation, checkAuth };
};
