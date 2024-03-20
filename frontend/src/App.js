import './App.css';
import { io } from 'socket.io-client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './slices/index.js';
import { AuthorizationContext } from './context/AuthorizationContext';
import { LogIn, Chat } from './Pages';

const AuthorizationProvider = ({ children }) => {
  const getToken = () => localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null;
  const getUsername = () => localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).username : null;
  const socket = io('http://localhost:3000');

  return (
    <AuthorizationContext.Provider value={{ socket, getUsername, getToken}}>
      {children}
    </AuthorizationContext.Provider>
  )
}

function App() {
  
  return (
    <Provider store={store}>
      <AuthorizationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/login" element={<LogIn />} />
          </Routes>
        </BrowserRouter>
      </AuthorizationProvider>
    </Provider>
  );
}

export default App;
