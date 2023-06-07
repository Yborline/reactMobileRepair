import { Ul } from "./Navbar.styled";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Ul>
        <li>
          <NavLink to="/">Прийом</NavLink>
        </li>
        <li>
          <NavLink to="/repair">Ремонт</NavLink>
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
    </nav>
  );
};

export default Navbar;
