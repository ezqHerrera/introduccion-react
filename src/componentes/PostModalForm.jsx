import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { ButtonGroup } from '@mui/material';

// Modal para agregar posts
const PostModalForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

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
            .post('http://localhost:3000/api/posts', { title, content })
            .then((response) => {
                setOpen(false);
                console.log('Se agregó un post');
            })
            .catch((error) => {
                console.log('Hubo un error:', error);
            });
    }
    return (
        <div>
            <Button color='primary' variant='text' onClick={handleOpen}>Agregar Post</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={modalStyle}>
                    <form method='dialog' style={formStyle} onSubmit={handleSubmit}>
                        <label htmlFor="title">Título</label>
                        <input id="title" type="text" value={title} onChange={(Event) => setTitle(Event.target.value)}/>

                        <label htmlFor="content">Contenido</label>
                        <input id="content" type="text" value={content} onChange={(Event) => setContent(Event.target.value)}/>

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

// Modal para editar posts
const PostEditModalForm = ({showButton, postId}) => {
    // showButton controla que solo se vea el botón para llamar al modal donde se lo requiera
    const [open, setOpen] = useState(false); // Controla que el modal esté abierto
    const handleOpen = () => setOpen(true); // Abre el modal
    const handleClose = () => setOpen(false); // Cierra el modal

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

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
        if (id) { // Realiza la operación si existe el id
            axios
            // Actualiza los datos del usuario según su id
                .put(`http://localhost:3000/api/posts/${id}`, { title, content })
                .then((response) => {
                    handleClose();
                    console.log(`Se actualizó el post con id ${id}`);
                })
                .catch((error) => {
                    console.error('Hubo un error:', error);
                });
        } else {
            console.error('Esperando el ID...');
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
                        <label htmlFor="title">Título</label>
                        <input id="title" type="text" value={title} onChange={(Event) => setTitle(Event.target.value)}/>

                        <label htmlFor="content">Contenido</label>
                        <input id="content" type="text" value={content} onChange={(Event) => setContent(Event.target.value)}/>

                        <ButtonGroup orientation='vertical' variant='text'>
                            <Button type='submit' onClick={() => handleSave(postId)}>Guardar Cambios</Button>
                            <Button type='reset' onClick={handleClose}>Cancelar</Button>
                        </ButtonGroup>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export {PostModalForm, PostEditModalForm};