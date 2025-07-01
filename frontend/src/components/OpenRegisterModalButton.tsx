import React from 'react';
import { Button } from 'antd';
import { useRegisterModalStore } from '../store/useRegisterModalStore';

export const OpenRegisterModalButton: React.FC = () => {
    const openModal = useRegisterModalStore((state) => state.openRegistrationModal);

    return (
        <Button type="primary" onClick={openModal}>
            Registration
        </Button>
    );
};