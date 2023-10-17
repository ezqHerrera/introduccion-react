import React from 'react';
import { useState } from 'react';
import './style.css';
import Modal from './componentes/Modal';
import { ModalForm, EditModalForm } from './componentes/ModalForm';
import { PostModalForm } from './componentes/PostModalForm';

import UserContextProvider from './context/UserContext';
import PostContextProvider from './context/PostContext';
import UserTable from './componentes/UsersTable';
import PostTable from './componentes/PostsTable';

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
                <div className='tableContainer'>
                    <h1>Usuarios</h1>

                    <ModalForm/>
                    <EditModalForm/>
                    <UserContextProvider>
                        <UserTable/>
                    </UserContextProvider>
                </div>

                <div className='tableContainer'>
                    <h1>Posts</h1>

                    <PostModalForm/>
                    <PostContextProvider>
                        <PostTable/>
                    </PostContextProvider>
                </div>
            </Modal>
        </>
    );
}