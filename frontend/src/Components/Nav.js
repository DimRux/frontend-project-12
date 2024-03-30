import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Nav = ({ button }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('user');
    navigate('/login');
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
