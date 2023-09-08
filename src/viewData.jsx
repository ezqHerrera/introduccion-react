import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Lista = () => {
    const [lista, setLista] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/users')
        .then((resp) => {
            const datos = resp.data.users;
            setLista(datos);
        })
        .catch((error) => {
            alert('Error obteniendo los datos!!!!!!!!!!!!!!11');
            console.log(error);
        })
    }, []);
    return (
        <>
            <h1>Lista de usuarios</h1>
            <ul>
                {lista.map((usuario) => {
                    <li>{usuario.username}</li>
                })}
            </ul>
        </>
    )
}