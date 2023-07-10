import { getLoggedIn } from "../../redux/auth/auth-selectors";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PablicRoute({ restricted = false, redirectTo = "/" }) {
  const isLoggedIn = useSelector(getLoggedIn);
  const shouldRedirect = isLoggedIn && restricted;
  return shouldRedirect ? <Navigate to={redirectTo} /> : <Outlet />;
}
