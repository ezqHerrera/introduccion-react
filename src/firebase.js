import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB4nFl0bfm0ZUhwCEjp6nbB-iC7Qu5nBpM",
  authDomain: "react-firebase-testing-6bf07.firebaseapp.com",
  projectId: "react-firebase-testing-6bf07",
  storageBucket: "react-firebase-testing-6bf07.appspot.com",
  messagingSenderId: "359787717415",
  appId: "1:359787717415:web:33348512929543e859bf02",
  measurementId: "G-ZES6LKNJZ5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // Provee la funcionalidad para la autenticación de usuarios
export const googleProvider = new GoogleAuthProvider(); // Permite la autenticación con una cuenta de Google
export const db = getFirestore(app); // Obtiene la base de datos de Firestore de la app