import React from 'react';
import { Button } from 'antd';
import { useLoginModalStore } from '../store/useLoginModalStore';

export const OpenLoginModalButton: React.FC = () => {
    const openModal = useLoginModalStore((state) => state.openLoginModal);

    return (
        <Button onClick={openModal}>
            Login
        </Button>
    );
};