import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Ul, Li, Div, Link } from './NavbarMobile.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedIn } from '../../redux/auth/auth-selectors';
import authOperations from '../../redux/auth/auth-operatins';
import MenuIcon from '@mui/icons-material/Menu';
import Modal from '../Modal/Modal';
import LogOut from '../LogOut/LogOut';
import { useState } from 'react';
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";

const pathNavbar = [
  {
    path: '/',
    text: 'Прийом',
    id: 1,
  },
  { path: '/repair', text: 'Ремонт', id: 2 },
  { path: '/diagnosis', text: 'Діагностика', id: 3 },
  { path: '/telephones', text: 'Телефони', id: 4 },
  { path: '/spareParts', text: 'Запчастини', id: 5 },
  // { path: "Accounting", text: "Бухгалтерія", id: 6 },
  // { path: "/history", text: "Історія", id: 7 },
  { path: '/user', text: 'User', id: 8 },
];

export default function NavbarMobile() {
  const [state, setState] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const logged = useSelector(getLoggedIn);

  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const list = () => (
    <Box
      sx={{ width: 'auto' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Ul>
        {pathNavbar.map(({ path, text, id }) => (
          <Li key={id}>
            {logged && path === '/user' ? (
              <Button color="error" type="submit" onClick={toggleModal}>
                Вихід
              </Button>
            ) : (
              <Link style={{ width: '100%' }} to={path}>
                {text}
              </Link>
            )}
          </Li>
        ))}
      </Ul>
      {showModal && (
        <Modal close={toggleModal}>
          <LogOut toggleModal={toggleModal} />
        </Modal>
      )}
      <Divider />
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <Div>
      <Button color="secondary" onClick={toggleDrawer(true)}>
        <MenuIcon fontSize="large" />
      </Button>
      <SwipeableDrawer
        anchor={'right'}
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </Div>
  );
}
