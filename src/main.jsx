import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from 'react';
import { db } from './firebase';
import { getDocs, collection } from 'firebase/firestore';
import { Auth } from './componentes/auth';
import { Home } from './homeApp';
import { Lista } from './viewData';

export default function App(){
    const [listaPreguntas, setListaPreguntas] = useState([]);
    const listaPreguntasRef = collection(db, "preguntas");

    useEffect(() => {
        const getListaPreguntas = async() => {
            try {
                const data = await getDocs(listaPreguntasRef);
                const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
                console.log(filteredData);
            } catch(err) {
                console.error(err);
            }
        };
        getListaPreguntas();
    }, []);
    return (
        <div className="App">
            {listaPreguntas.map((pregunta) => (
                <div className='questionCard'>
                    <h3><i>{pregunta.question}</i></h3>
                    <h4>{pregunta.answer}</h4>
                </div>
            ))}
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Home/>
        {/* <Auth/> */}
        <Lista/>
    </React.StrictMode>
)