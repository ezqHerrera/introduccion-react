import '../style.css';
import { auth, googleProvider } from '../firebase.js';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const logIn = async() => {
        try{
            await createUserWithEmailAndPassword(auth, email, password);
        } catch(err) {
            console.error(err);
        }
    };
    const logInConGoogle = async() => {
        try{
            await signInWithPopup(auth, googleProvider);
        } catch(error) {
            console.error(error);
        }
    };
    const logOut = async() => {
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