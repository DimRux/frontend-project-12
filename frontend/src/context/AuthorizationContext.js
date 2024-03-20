import { createContext } from 'react';

export const AuthorizationContext = createContext({ socket: null, getUsername: () => {}, getToken: () => {} });