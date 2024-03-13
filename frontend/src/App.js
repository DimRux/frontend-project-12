import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthorizationContext } from './context/AuthorizationContext';
import { LogIn, Page404 } from './Pages';
import { useState } from 'react';

const AuthorizationProvider = ({ children }) => {
  const [user, setUser] = useState('');
  return (
    <AuthorizationContext.Provider value={{ user, setUser}}>
      {children}
    </AuthorizationContext.Provider>
  )
}

function App() {
  
  return (
    <AuthorizationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Page404 />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </BrowserRouter>
    </AuthorizationProvider>
  );
}

export default App;
