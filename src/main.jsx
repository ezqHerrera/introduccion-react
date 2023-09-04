import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth } from './componentes/auth';
import { App } from './homeApp';

// export default function Epp(){
//     return (<h1>Здравствуй, мир!</h1>)
// }

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App name="Max Power" edad='45' resp="Казахстан официально является демократической, светской, унитарной, конституционной республикой с разнообразным культурным наследием" />
        <Auth/>
    </React.StrictMode>
)