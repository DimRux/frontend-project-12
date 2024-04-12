import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import initI18next from './i18next.js';
import initLeoprofanity from './leoProfanity.js';
import initSocket from './socket';
import App from './App.jsx';

initSocket();

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
        <App />
      </ErrorBoundary>
    </RollbarProvider>

  );
};

export default Init;
