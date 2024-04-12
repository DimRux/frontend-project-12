import { createContext } from 'react';

const AuthorizationContext = createContext({
  getUsername: () => {},
  getToken: () => {},
  setToken: () => {},
  removeToken: () => {},
});

export default AuthorizationContext;
