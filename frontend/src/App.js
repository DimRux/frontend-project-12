import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
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
    socketApi: {
      sendMessage: (socket, key, fn) => socket[key]('newMessage', fn),
      createChannel: (socket, key, fn) => socket[key]('newChannel', fn),
      renameChannel: (socket, key, fn) => socket[key]('renameChannel', fn),
      removeChannel: (socket, key, fn) => socket[key]('removeChannel', fn),
    },
  }), []);

  return (
    <AuthorizationContext.Provider value={contextValue}>
      {children}
    </AuthorizationContext.Provider>
  );
};

const rollbarConfig = {
  accessToken: process.env.REACT_APP_SECRET_TOKEN,
  environment: 'production',
};

const App = () => {
  initI18next();
  initLeoprofanity();
  io();

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
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
      </ErrorBoundary>
    </RollbarProvider>

  );
};

export default App;
