import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import useUsers from '../hooks/useUsers';
import { ButtonGroup } from '@mui/material';

// Modal para agregar usuarios
const ModalForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    const formStyle = {
        display: 'flex',
        textAlign: 'center',
        flexDirection: 'column',
        padding: '3em'
    }

    const handleSubmit = (event) => {
        event.preventDefault(); // Impide que, al subir el formulario, se refresque la página
        axios
            .post('http://localhost:3000/api/users', { username, password, email })
            .then((response) => {
                setOpen(false);
                console.log('Se añadió un usuario');
            })
            .catch((error) => {
                console.error('Hubo un error:', error);
            });
    }
    return (
            <div>
                <Button color='primary' variant='text' onClick={handleOpen}>Agregar Usuario</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Box sx={modalStyle}>
                        <form method='dialog' style={formStyle} onSubmit={handleSubmit}>
                            <label htmlFor="username">Username</label>
                            <input id="username" type="text" value={username} onChange={(Event) => setUsername(Event.target.value)}/>

                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" value={password} onChange={(Event) => setPassword(Event.target.value)}/>

                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" value={email} onChange={(Event) => setEmail(Event.target.value)}/>

                            <ButtonGroup orientation='vertical' variant='text'>
                                <Button type='submit' onClick={handleSubmit}>Añadir</Button>
                                <Button type='reset' onClick={handleClose}>Cancelar</Button>
                            </ButtonGroup>
                        </form>
                    </Box>
                </Modal>
            </div>
        );
};

// Modal para editar usuarios
const EditModalForm = ({showButton}) => {
    // showButton controla que solo se vea el botón para llamar al modal donde se lo requiera
    const [open, setOpen] = useState(false); // Controla que el modal esté abierto
    const handleOpen = () => setOpen(true); // Abre el modal
    const handleClose = () => setOpen(false); // Cierra el modal

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    const formStyle = {
        display: 'flex',
        textAlign: 'center',
        flexDirection: 'column',
        padding: '3em'
    }

    const handleSave = (id) => {
        // event.preventDefault(); // Impide que, al subir el formulario, se refresque la página
        if (id) { // Realiza la operación si existe el id
            axios
            // Actualiza los datos del usuario según su id
                .put(`http://localhost:3000/api/users/${id}`, { username, password, email })
                .then((response) => {
                    handleClose();
                    console.log(`Se actualizó el usuario con id ${id}`);
                })
                .catch((error) => {
                    console.error('Hubo un error:', error);
                });
        } else {
            console.error('Esperando el ID');
        }
    }
    return (
        <div>
            {showButton && <Button onClick={handleOpen}>Editar</Button>}
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={modalStyle}>
                    <form method='dialog' style={formStyle} onSubmit={handleSave}>
                        <label htmlFor="username">Username</label>
                        <input id="username" type="text" value={username} onChange={(Event) => setUsername(Event.target.value)}/>

                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" value={password} onChange={(Event) => setPassword(Event.target.value)}/>

                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" value={email} onChange={(Event) => setEmail(Event.target.value)}/>

                        <ButtonGroup orientation='vertical' variant='text'>
                            <Button type='submit' onClick={() => handleSave(id)}>Guardar Cambios</Button>
                            <Button type='reset' onClick={handleClose}>Cancelar</Button>
                        </ButtonGroup>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export {ModalForm, EditModalForm};