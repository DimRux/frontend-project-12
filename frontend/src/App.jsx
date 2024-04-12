import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { useMemo, useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './slices/index.js';
import AuthorizationContext from './context/AuthorizationContext.js';
import LogIn from './components/LogIn.jsx';
import Chat from './components/Chat.jsx';
import SignUp from './components/SignUp.jsx';
import routes from './routes.js';

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

const PrivateOutlet = () => {
  const { getToken } = useContext(AuthorizationContext);
  return getToken() ? <Outlet /> : <Navigate to={routes.loginPagePath} />;
};

const App = () => (
  <Provider store={store}>
    <AuthorizationProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateOutlet />}>
            <Route path="/" element={<Chat />} />
          </Route>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </AuthorizationProvider>
  </Provider>
);

export default App;
