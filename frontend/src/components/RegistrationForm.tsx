import { Button, Form, Input, notification } from 'antd';
import React from 'react';
import { useAuth } from '../hooks/UseAuth.ts';
import type { ApiResponse } from "../models/response/ApiResponse.ts";

const RegistrationForm: React.FC = () => {
    const [form] = Form.useForm();
    const {registerMutation} = useAuth();

    const onFinish = (values: { email: string; password: string }) => {
        registerMutation.mutate(values, {
            onSuccess: () => {
                notification.success({
                    message: 'Registration successful!',
                    duration: 5,
                });
                //form.resetFields();
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
        console.log('Validation failed:', errorInfo);
    };

    return (
        <Form
            form={form}
            name="registration"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {required: true, message: 'Please input your email!'},
                    {required: true, type: 'email', message: 'Please enter a valid email!'}
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

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button
                    type="primary"
                    htmlType="submit"
                >
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegistrationForm;