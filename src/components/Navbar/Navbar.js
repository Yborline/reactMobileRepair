import { Ul, Nav, Div } from "./Navbar.styled";
import { NavLink } from "react-router-dom";
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from "@react-hook/window-size";
import NavbarMobile from "./NavbarMobile";
import LinearProgress from "@mui/joy/LinearProgress";
import { useSelector } from "react-redux";
import { getLoading } from "../../redux/telephones/phones-selector";

const Navbar = () => {
  const loading = useSelector(getLoading);
  const [width, height] = useWindowSize();
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
            <li>User</li>
          </Ul>
        )}
        {loading && (
          <LinearProgress
            sx={{ position: "absolute", bottom: "-5px", left: 0, right: 0 }}
            size="sm"
          />
        )}
      </Nav>
    </Div>
  );
};

export default Navbar;
