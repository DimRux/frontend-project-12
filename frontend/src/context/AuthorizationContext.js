import { createContext } from 'react';

export const AuthorizationContext = createContext({ getUsername: () => {}, getToken: () => {} });