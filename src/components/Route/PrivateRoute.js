import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getLoggedIn } from '../../redux/auth/auth-selectors';

export default function PrivateRoute() {
  const isLoggedIn = useSelector(getLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/user" />;
}
