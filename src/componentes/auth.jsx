import '../style.css';
import { useState } from 'react';
import { auth, googleProvider } from '../firebase.js';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    console.log(auth?.currentUser?.email); // Muestra por consola el email del usuario que inició sesión

    const logIn = async() => { // Inicia sesión con usuario y contraseña
        try{
            await createUserWithEmailAndPassword(auth, email, password);
        } catch(err) {
            console.error(err);
        }
    };

    const logInConGoogle = async() => { // Inicia sesión con Google
        try{
            await signInWithPopup(auth, googleProvider);
        } catch(error) {
            console.error(error);
        }
    };

    const logOut = async() => { // Cierra la sesión
        try {
            await signOut(auth);
            console.log('Se ha cerrado la sesión.');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container">
            <form>
                <input type="email" placeholder="E-Mail..."
                onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password" placeholder="Contraseña..."
                onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={logIn}>Iniciar Sesión</button>
                <button onClick={logOut}>Cerrar Sesión</button>
            </form>
            <button id="googleLogIn" onClick={logInConGoogle}>Iniciar Sesión con Google</button>
        </div>

    );
};