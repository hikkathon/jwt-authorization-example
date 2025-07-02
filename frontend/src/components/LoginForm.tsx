import { Button, Form, Input, Modal, notification } from 'antd';
import React from 'react';
import { type AuthResponseType, useAuth } from '../hooks/UseAuth.ts';
import type { ApiResponse } from "../models/response/ApiResponse";
import { useLoginModalStore } from '../store/useLoginModalStore';
import { useAuthStore } from "../store/useAuthStore.ts";
import { useQueryClient } from "@tanstack/react-query";

const LoginForm: React.FC = () => {
    const [form] = Form.useForm();
    const {loginMutation} = useAuth();
    const {isLoginModalOpen, closeLoginModal} = useLoginModalStore();
    // @ts-ignore
    const {setAuth, setAccessToken, setEmail} = useAuthStore();
    const queryClient = useQueryClient();

    const onFinish = (values: { email: string; password: string }) => {
        loginMutation.mutate(values, {
            onSuccess: (data) => {
                const response = data as AuthResponseType;
                notification.success({
                    message: 'Login successful!',
                    duration: 5,
                });
                form.resetFields();
                closeLoginModal();
                setAuth(true);
                setAccessToken(response.data.tokens.accessToken);
                setEmail(response.data.email);
                queryClient.setQueryData(['auth-data'], response);
            },
            onError: (error) => {
                // @ts-ignore
                const myError = error.response.data as ApiResponse;
                notification.error({
                    // @ts-ignore
                    message: myError.error.message,
                    description: myError.error?.details,
                    duration: 5,
                });
            }
        });
    };

    return (
        <Modal
            title="Login"
            open={isLoginModalOpen}
            onCancel={closeLoginModal}
            footer={null}
        >
            <Form
                form={form}
                name="login"
                initialValues={{remember: true}}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {required: true, message: 'Please input your email!'},
                        {type: 'email', message: 'Please enter a valid email!'}
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {required: true, message: 'Please input your password!'},
                        {min: 6, message: 'Password must be at least 6 characters!'}
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item style={{display: 'flex', margin: 0}}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loginMutation.isPending}
                        style={{margin: 0, width: '100%'}}
                    >
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default LoginForm;