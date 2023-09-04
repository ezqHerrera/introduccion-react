import React from 'react';
import './style.css';

const name = 'Máximo Cozzetti';
const edad = parseInt(20);
const getSum = (a, b) => {
    return a + b
}

export const App = (props) => {
    return (
        <>
            <h1><b>Здравствуй, {props.name}!</b></h1>
            <h2>Тебе {props.edad} лет</h2>
            <h3>{props.resp}</h3>
        </>
    );
}