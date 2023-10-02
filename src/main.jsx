import React from 'react';
import ReactDOM from 'react-dom/client';
// import { useState, useEffect } from 'react';
// import { db } from './firebase';
// import { getDocs, collection } from 'firebase/firestore';
// import { Auth } from './componentes/auth';
import { Home } from './homeApp';
import { Lista } from './viewData';

import UserContextProvider from './context/userContext';
import UserTable from './componentes/UsersTable';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>

        <Home/>
        <UserContextProvider>
            <UserTable/>
        </UserContextProvider>

    </React.StrictMode>
)