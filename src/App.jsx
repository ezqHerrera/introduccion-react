import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import UserContextProvider from './context/userContext';
import UserTable from './componentes/UsersTable';

function App() {
  return (
    <>
      <UserContextProvider>
        <UserTable/>
      </UserContextProvider>
    </>
  )
}

export default App;