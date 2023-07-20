import { NavLink } from 'react-router-dom';
import FormLogin from '../../components/FormLogin/FormLogin';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loginG } from '../../redux/auth/auth-operatins';
import queryString from 'query-string';
import GoogleAuthBtn from '../../components/GoogleAuth/GoogleAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { userSlice } from '../../redux/auth/auth-reducer';

const User = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  let {
    token = null,
    email = null,
    name = null,
  } = queryString.parse(location.search);
  console.log(token);
  console.log(email);
  console.log(name);
  useEffect(() => {
    if (token && email && name) {
      dispatch(userSlice.actions.loginG({ token, email, name }));
      navigate('/');
    }
  }, []);

  return (
    <div>
      <FormLogin />
      <GoogleAuthBtn text={'Вхід'} />
    </div>
  );
};

export default User;
