import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import AuthorizationContext from '../context/AuthorizationContext';
import routes from '../routes';

const Nav = ({ button }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { removeToken } = useContext(AuthorizationContext);

  const logOut = () => {
    removeToken();
    navigate(routes.loginPagePath);
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">{t('nav.logo')}</a>
        {button === 'yes' ? <Button type="button" onClick={logOut}>{t('nav.button')}</Button> : null}
      </div>
    </nav>
  );
};

export default Nav;
