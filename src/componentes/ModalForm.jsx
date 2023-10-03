import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const ModalForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const buttonStyle = {
        backgroundColor: 'purple',
        color: 'gold',
        fontSize:' larger',
        padding: '2%',
        boxShadow: '4px 4px 0 0'
    }

    const formStyle = {
        display: 'flex',
        textAlign: 'center',
        border: '2px solid black',
        flexDirection: 'column',
        padding: '4em'
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/api/users', { username, password, email })
    }
    return (
        <>
            <Button color='primary' variant='contained' onClick={handleOpenModal}>Agregar Usuario</Button>
            {isModalOpen && (
                <div>
                    <form method='dialog' style={formStyle} onSubmit={handleSubmit}>
                        <label htmlFor="username">Username</label>
                        <input id="username" type="text" value={username} onChange={(Event) => setUsername(Event.target.value)}/>

                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" value={password} onChange={(Event) => setPassword(Event.target.value)}/>

                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" value={email} onChange={(Event) => setEmail(Event.target.value)}/>

                        <button style={buttonStyle} onClick={handleSubmit}>Añadir</button>
                        <button type="reset" onClick={handleCloseModal}>Cancelar</button>
                    </form>
                </div>
            )}
        </>
    );
};

export {ModalForm};