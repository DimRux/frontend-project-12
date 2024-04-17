import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Navbar, Container } from 'react-bootstrap';
import AuthorizationContext from '../context/AuthorizationContext';
import routes from '../routes';

const Nav = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { getToken, removeToken } = useContext(AuthorizationContext);

  const logOut = () => {
    removeToken();
    navigate(routes.loginPagePath);
  };

  return (
    <Navbar className="shadow-sm bg-white navbar-expand-lg">
      <Container>
        <Navbar.Brand href="/">{t('nav.logo')}</Navbar.Brand>
        {getToken() ? <Button type="button" onClick={logOut}>{t('nav.button')}</Button> : null}
      </Container>
    </Navbar>
  );
};

export default Nav;
