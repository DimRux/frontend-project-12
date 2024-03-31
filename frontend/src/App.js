import { io } from 'socket.io-client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useMemo } from 'react';
import initI18next from './i18next.js';
import store from './slices/index.js';
import AuthorizationContext from './context/AuthorizationContext';
import LogIn from './Components/LogIn.js';
import Chat from './Components/Chat.js';
import SignUp from './Components/SignUp.js';
import initLeoprofanity from './leoProfanity.js';

const AuthorizationProvider = ({ children }) => {
  const contextValue = useMemo(() => ({
    socket: io(),
    getUsername: () => (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username : null),
    getToken: () => (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null),
  }), []);

  return (
    <AuthorizationContext.Provider value={contextValue}>
      {children}
    </AuthorizationContext.Provider>
  );
};

const App = () => {
  initI18next();
  initLeoprofanity();

  return (
    <Provider store={store}>
      <AuthorizationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </AuthorizationProvider>
    </Provider>
  );
};

export default App;
