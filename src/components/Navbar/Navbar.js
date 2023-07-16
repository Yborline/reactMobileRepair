import { Ul, Nav, Div, LiUser, Link } from './Navbar.styled';

import { useWindowSize } from '@react-hook/window-size';
import NavbarMobile from './NavbarMobile';
import LinearProgress from '@mui/joy/LinearProgress';
import { useSelector } from 'react-redux';
import { getLoading } from '../../redux/telephones/phones-selector';
import { getLoggedIn, getUserLoading } from '../../redux/auth/auth-selectors';
import Button from '@mui/material/Button';

import { useState } from 'react';
import Modal from '../Modal/Modal';
import LogOut from '../LogOut/LogOut';

const Navbar = () => {
  const logged = useSelector(getLoggedIn);
  const loading = useSelector(getLoading);
  const loadingUser = useSelector(getUserLoading);
  const [width] = useWindowSize();

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Div>
      <Nav>
        {width < 768 ? (
          <NavbarMobile />
        ) : (
          <Ul>
            <li>
              <Link to="/">Прийом</Link>
            </li>
            <li>
              <Link to="/repair">Ремонт</Link>
            </li>
            <li>
              <Link to="/diagnosis">Діагностика</Link>
            </li>
            <li>
              <Link to="/telephones">Телефони</Link>
            </li>
            {/* <li>
              <NavLink to="/spareParts">Запчастини</NavLink>
            </li>
            <li>
              <NavLink to="Accounting">Бухгалтерія</NavLink>
            </li>
            <li>
              <NavLink to="/history">Історія</NavLink>
            </li> */}
            {logged ? (
              <Button color="error" type="submit" onClick={toggleModal}>
                Вихід
              </Button>
            ) : (
              <LiUser>
                <Link to="/user">User</Link>
              </LiUser>
            )}
          </Ul>
        )}
        {loading ||
          (loadingUser && (
            <LinearProgress
              color="info"
              sx={{ position: 'absolute', bottom: '-5px', left: 0, right: 0 }}
              size="sm"
            />
          ))}
        {showModal && (
          <Modal close={toggleModal}>
            <LogOut toggleModal={toggleModal} />
          </Modal>
        )}
      </Nav>
    </Div>
  );
};

export default Navbar;
