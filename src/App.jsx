import './App.css'
import UserContextProvider from './context/UserContext';
import PostContextProvider from './context/PostContext';
import UserTable from './componentes/UsersTable';
import PostTable from './componentes/PostsTable';

function App() {
  return (
    <>
      <UserContextProvider>
        <UserTable/>
      </UserContextProvider>
      <PostContextProvider>
        <PostTable/>
      </PostContextProvider>
    </>
  )
}

export default App;