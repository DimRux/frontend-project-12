import { createContext } from 'react';

const AuthorizationContext = createContext({
  socket: null,
  getUsername: () => {},
  getToken: () => {},
});

export default AuthorizationContext;
