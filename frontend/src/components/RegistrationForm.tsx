import { Button, Form, Input, Modal, notification } from 'antd';
import React from 'react';
import { useAuth } from '../hooks/UseAuth.ts';
import type { ApiResponse } from "../models/response/ApiResponse";
import { useRegisterModalStore } from '../store/useRegisterModalStore';

const RegistrationForm: React.FC = () => {
    const [form] = Form.useForm();
    const { registerMutation } = useAuth();
    const { isRegistrationModalOpen, closeRegistrationModal } = useRegisterModalStore();

    const onFinish = (values: { email: string; password: string }) => {
        registerMutation.mutate(values, {
            onSuccess: () => {
                notification.success({
                    message: 'Registration successful!',
                    duration: 5,
                });
                form.resetFields();
                closeRegistrationModal();
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

    const onFinishFailed = (errorInfo: any) => {

    };

    return (
        <Modal
            title="Registration"
            open={isRegistrationModalOpen}
            onCancel={closeRegistrationModal}
            footer={null}
        >
            <Form
                form={form}
                name="registration"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: 'Please input your password!' },
                        { min: 6, message: 'Password must be at least 6 characters!' }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item style={{display: 'flex', margin: 0}}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={registerMutation.isPending}
                        style={{ margin: 0, width: '100%' }}
                    >
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default RegistrationForm;