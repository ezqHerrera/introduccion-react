import axios from "axios";
import { useState } from "react";
import usePosts from "../hooks/usePosts";
import { PostEditModalForm } from "./PostModalForm";
import { styled } from "@mui/material/styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CircularProgress, Button, ButtonGroup } from "@mui/material";
import Textarea from './Textarea';

// Estilo para celdas de tablas
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    // Afecta los headers de la tabla
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    // Afecta las celdas del cuepro de la  tabla
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    }
}));

// Estilo para filas de tablas
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // Afecta filas impares
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // Afecta al último hijo de cada celda y header
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    // Afecta todos los headers
    '& td, & th': {
        textAlign: 'center',
    }
}));

function PostTable() {
    const [open, setOpen] = useState(false); // Controla que el modal Editar esté abierto
    const lista = usePosts(); // Solicita los posts del hook usePosts
    const posts = lista.posts;

    const handleOpen = () => setOpen(true); // Abre el modal Editar

    // Elimina un post según su id
    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:3000/api/posts/${id}`)
            .then((response) => {
                console.log(`Se eliminó el post con id ${id}`);
            })
            .catch((error) => {
                console.error('Hubo un error:', error);
            });
    };
    if (lista.length === 0) {
        return (
            <CircularProgress/>
        )
    } else {
        return (
            <TableContainer component={Paper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <th>Título</th>
                            <th>Contenido</th>
                            <th>ID</th>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Muestra una fila port cada post en la base de datos */}
                        {posts.map(post => (
                            {/* Crea una fila por cada id de post único */},
                            <StyledTableRow key={post.id}>
                                <StyledTableCell>{post.title}</StyledTableCell>
                                <StyledTableCell>
                                    <Textarea>{post.content}</Textarea>
                                </StyledTableCell>
                                <StyledTableCell>{post.id}</StyledTableCell>

                                <StyledTableCell>
                                    <ButtonGroup variant="text">
                                        <PostEditModalForm postId={post.id} onClick={handleOpen} color="primary" showButton={true}>Editar</PostEditModalForm>
                                        <Button color="error" onClick={() => handleDelete(post.id)}>Eliminar</Button>
                                    </ButtonGroup>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default PostTable;