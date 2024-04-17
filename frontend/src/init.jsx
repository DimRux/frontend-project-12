import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider } from 'react-redux';
import { useMemo } from 'react';
import AuthorizationContext from './context/AuthorizationContext.js';
import initI18next from './i18next.js';
import initLeoprofanity from './leoProfanity.js';
import store from './slices/index.js';
import initSocket from './socket';
import App from './App.jsx';

initSocket();

const AuthorizationProvider = ({ children }) => {
  const contextValue = useMemo(() => ({
    getUsername: () => (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username : null),
    getToken: () => (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null),
    setToken: (data) => localStorage.setItem('user', JSON.stringify(data)),
    removeToken: () => localStorage.removeItem('user'),
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

const Init = () => {
  initI18next();
  initLeoprofanity();

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <AuthorizationProvider>
            <App />
          </AuthorizationProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>

  );
};

export default Init;
