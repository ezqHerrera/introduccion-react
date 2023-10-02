import React from 'react';
import './style.css';
import { useState } from 'react';
import axios from 'axios';

export const Home = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

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

    function handleClick(event){
        console.log('你好，世界！');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/api/users', { username, password, email })
    }
    return (
        <>
            {/** No agregar paréntesis al llamar funciones */}
            <form style={formStyle} action='' onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" value={username} onChange={(Event) => setUsername(Event.target.value)}/>

                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={password} onChange={(Event) => setPassword(Event.target.value)}/>

                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={email} onChange={(Event) => setEmail(Event.target.value)}/>

                <button style={buttonStyle} onClick={handleSubmit}>Añadir</button>
            </form>
        </>
    );
}