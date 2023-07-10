import { Ul, Nav, Div } from "./Navbar.styled";
import { NavLink } from "react-router-dom";
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from "@react-hook/window-size";
import NavbarMobile from "./NavbarMobile";
import LinearProgress from "@mui/joy/LinearProgress";
import { useDispatch, useSelector } from "react-redux";
import { getLoading } from "../../redux/telephones/phones-selector";
import { getLoggedIn } from "../../redux/auth/auth-selectors";
import Button from "@mui/material/Button";
import authOperations from "../../redux/auth/auth-operatins";
import { useState } from "react";
import Modal from "../Modal/Modal";
import LogOut from "../LogOut/LogOut";

const Navbar = () => {
  const logged = useSelector(getLoggedIn);
  const loading = useSelector(getLoading);
  const [width, height] = useWindowSize();

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
              <NavLink to="/">Прийом</NavLink>
            </li>
            <li>
              <NavLink to="/repair">Ремонт</NavLink>
            </li>
            <li>
              <NavLink to="/diagnosis">Діагностика</NavLink>
            </li>
            <li>
              <NavLink to="/telephones">Телефони</NavLink>
            </li>
            <li>
              <NavLink to="/spareParts">Запчастини</NavLink>
            </li>
            <li>
              <NavLink to="Accounting">Бухгалтерія</NavLink>
            </li>
            <li>
              <NavLink to="/history">Історія</NavLink>
            </li>
            {logged ? (
              <Button color="error" type="submit" onClick={toggleModal}>
                Вихід
              </Button>
            ) : (
              <li>
                <NavLink to="/user">User</NavLink>
              </li>
            )}
          </Ul>
        )}
        {loading && (
          <LinearProgress
            sx={{ position: "absolute", bottom: "-5px", left: 0, right: 0 }}
            size="sm"
          />
        )}
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
