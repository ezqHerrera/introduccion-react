import React from 'react';
import { useState } from 'react';
import './style.css';
import Modal from './componentes/Modal';
import { ModalForm } from './componentes/ModalForm';

export const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <ModalForm/>
            </Modal>
        </>
    );
}