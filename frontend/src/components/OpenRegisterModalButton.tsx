import React from 'react';
import { Button } from 'antd';
import { useModalStore } from '../store/useRegisterModalStore.ts';

export const OpenRegisterModalButton: React.FC = () => {
    const openModal = useModalStore((state) => state.openRegistrationModal);

    return (
        <Button type="primary" onClick={openModal}>
            Registration
        </Button>
    );
};