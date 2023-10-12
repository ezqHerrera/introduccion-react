import axios from "axios";
import { useState } from "react";
import useUsers from "../hooks/useUsers";
import { EditModalForm } from "./ModalForm";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CircularProgress, Button, ButtonGroup } from "@mui/material";

// Estilo para celdas de tablas
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    // Afecta los headers de la tabla
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    // Afecta las celdas en el cuerpo de la tabla
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
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
    // Afecta todas las celdas y headers
    '& td, & th': {
      textAlign: 'center',
    }
  }));

function UserTable() {
    const [open, setOpen] = useState(false); // Controla que el modal esté abierto
    const lista = useUsers(); // Solicita los usuarios del hook useUsers
    const users = lista.users;

    const handleOpen = () => setOpen(true); // Abre el modal

    // Elimina un usuario según su id
    const handleDelete = (id) => {
      axios
        .delete(`http://localhost:3000/api/users/${id}`)
        .then((response) => {
          console.log(`Se eliminó el usuario con id ${id}`);
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
                            <th>Username</th>
                            <th>Password</th>
                            <th>E-mail</th>
                            <th>ID</th>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* Muestra una fila por cada usuario en la base de datos */}
                        {users.map(user => (
                           {/* Crea una fila por cada id de usuario único */},
                            <StyledTableRow key={user.id}>
                                <StyledTableCell>{user.username}</StyledTableCell>
                                <StyledTableCell>{user.password}</StyledTableCell>
                                <StyledTableCell>{user.email}</StyledTableCell>
                                <StyledTableCell>{user.id}</StyledTableCell>

                                <StyledTableCell>
                                  <ButtonGroup variant="text">
                                        <EditModalForm onClick={handleOpen} color="primary" showButton={true}>Editar</EditModalForm>
                                        <Button color="error" onClick={() => handleDelete(user.id)}>Eliminar</Button>
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

export default UserTable;