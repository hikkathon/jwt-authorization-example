import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthService from '../services/AuthService';
// @ts-ignore
import type { AxiosResponse } from 'axios';

type TokensType = {
    accessToken: string;
    refreshToken: string;
}

type DataType = {
    id: number;
    email: string;
    isActivate: boolean;
    tokens: TokensType;
}

type AuthResponseType = {
    success: boolean;
    data: DataType;
}

export const useAuth = () => {
    const queryClient = useQueryClient();

    const registerMutation = useMutation<AxiosResponse<AuthResponseType>, Error, { email: string; password: string }>({
        mutationFn: (data: { email: string; password: string }) =>
            AuthService.registration(data.email, data.password),
    });

    const loginMutation = useMutation<AxiosResponse<AuthResponseType>, Error, { email: string; password: string }>({
        mutationKey: ['token'],
        mutationFn: (data: { email: string; password: string }) =>
            AuthService.login(data.email, data.password)
    });

    const logoutMutation = useMutation({
        mutationFn: () => AuthService.logout(),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["token"]})
    });

    return {registerMutation, loginMutation, logoutMutation};
}