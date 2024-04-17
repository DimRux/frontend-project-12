import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthorizationContext from './context/AuthorizationContext.js';
import LogIn from './components/LogIn.jsx';
import Chat from './components/Chat.jsx';
import SignUp from './components/SignUp.jsx';
import routes from './routes.js';
import Nav from './components/Nav.jsx';

const PrivateOutlet = () => {
  const { getToken } = useContext(AuthorizationContext);
  return getToken() ? <Outlet /> : <Navigate to={routes.loginPagePath} />;
};

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <Nav />
      <Routes>
        <Route element={<PrivateOutlet />}>
          <Route path="/" element={<Chat />} />
        </Route>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
    <ToastContainer />
  </BrowserRouter>
);

export default App;
