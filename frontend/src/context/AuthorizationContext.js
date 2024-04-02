import { createContext } from 'react';

const AuthorizationContext = createContext({
  socket: null,
  getUsername: () => {},
  getToken: () => {},
  socketApi: {},
});

export default AuthorizationContext;
