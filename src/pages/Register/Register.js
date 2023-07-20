import { useLocation, useNavigate } from 'react-router-dom';
import FormSignUp from '../../components/FormSignUp/FormSignUp';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loginG } from '../../redux/auth/auth-operatins';
import queryString from 'query-string';
import GoogleAuthBtn from '../../components/GoogleAuth/GoogleAuth';
import { userSlice } from '../../redux/auth/auth-reducer';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  let {
    token = null,
    email = null,
    name = null,
  } = queryString.parse(location.search);

  useEffect(() => {
    if (token && email && name) {
      dispatch(userSlice.actions.loginG({ token, email, name }));
      navigate('/');
    }
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <FormSignUp />
      <GoogleAuthBtn text={'Реєстрація'} />
    </div>
  );
};

export default Register;
