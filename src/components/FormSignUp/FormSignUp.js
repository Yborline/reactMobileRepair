import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authOperations from '../../redux/auth/auth-operatins';

import { Formik } from 'formik';
import validationSchema from '../../validations/register';
import {
  Div,
  Ul,
  DivClose,
  Li,
  Error,
  H3,
  SpanError,
  Form,
} from './FormSignUp.styled';
import {
  getUser,
  getUserError,
  getUserLoading,
} from '../../redux/auth/auth-selectors';
import Input from '@mui/joy/Input';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import TransitionAlerts from '../Alert/AlertSuccess';
import LoadingButton from '@mui/lab/LoadingButton';
import { Stack } from '@mui/material';
import GoogleAuthBtn from '../GoogleAuth/GoogleAuth';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getUserLoading);
  const error = useSelector(getUserError);
  const user = useSelector(getUser);
  const [navigation, setNavigation] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.name && navigation) {
      setOpen(true);
      const timer = setTimeout(() => {
        setOpen(false);
        navigate('/user');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [navigation, navigate, open, user.name]);

  return (
    <Div>
      <TransitionAlerts
        open={open}
        setOpen={setOpen}
        text="Реєстрація пройшла успішно!"
        top={'-18px'}
      />
      <DivClose>
        <H3>Реєстрація</H3>
      </DivClose>
      <Formik
        initialValues={{
          name: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          user: false,
        }}
        validateOnBlur
        validationSchema={validationSchema}
        onSubmit={values => {
          const { name, lastName, email, password } = values;
          dispatch(
            authOperations.register({
              name: name.toLowerCase().trim(),
              lastName: lastName.toLowerCase().trim(),
              email: email.toLowerCase().trim(),
              password,
              user: 'master',
            }),
          );
          setNavigation(true);
        }}
      >
        {({
          values,
          errors,
          touched,
          isValid,
          dirty,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSubmit(values);
              }
            }}
          >
            <Ul>
              <Li>
                <label
                  htmlFor="name"
                  className="form__label"
                  style={{ marginTop: '28px' }}
                >
                  Ім'я
                  {!values.name.length || errors.name ? (
                    <SpanError> *</SpanError>
                  ) : (
                    <></>
                  )}
                </label>

                <br />
                <Input
                  type="text"
                  name="name"
                  placeholder="..."
                  maxLength="100"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />

                <SpanError className="input__error">
                  {touched.name && errors.name ? errors.name : ''}
                </SpanError>

                <br />
              </Li>
              <Li>
                <label
                  htmlFor="name"
                  className="form__label"
                  style={{ marginTop: '28px' }}
                >
                  Прізвище
                  {!values.name.length || errors.name ? (
                    <SpanError> *</SpanError>
                  ) : (
                    <></>
                  )}
                </label>

                <br />
                <Input
                  type="text"
                  name="lastName"
                  placeholder="..."
                  maxLength="100"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                />

                <SpanError>
                  {touched.lastName && errors.lastName ? errors.lastName : ''}
                </SpanError>

                <br />
              </Li>

              <Li>
                <label htmlFor="email" className="form__label">
                  Електронна адреса
                  {!values.email.length || errors.email ? (
                    <SpanError> *</SpanError>
                  ) : (
                    <></>
                  )}
                </label>
                <br />
                <Input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  maxLength="63"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <br />

                <SpanError className="input__error">
                  {touched.email && errors.email ? errors.email : ''}
                </SpanError>
              </Li>

              <Li>
                <label htmlFor="password" className="form__label">
                  Пароль
                  {!values.password.length || errors.password ? (
                    <SpanError> *</SpanError>
                  ) : (
                    <></>
                  )}
                </label>

                <br />
                <Input
                  type="password"
                  name="password"
                  placeholder="..."
                  maxLength="30"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <br />
                <SpanError className="input__error">
                  {touched.password && errors.password ? errors.password : ''}
                </SpanError>
              </Li>

              <Li>
                <label htmlFor="confirmPassword" className="form__label">
                  Підтвердіть пароль
                  {!values.confirmPassword.length || errors.confirmPassword ? (
                    <SpanError> *</SpanError>
                  ) : (
                    <></>
                  )}
                </label>
                <br />
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="..."
                  maxLength="30"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  onPaste={e => {
                    e.preventDefault();
                  }}
                />
                <br />

                <SpanError className="input__error">
                  {touched.confirmPassword && errors.confirmPassword
                    ? errors.confirmPassword
                    : ''}
                </SpanError>
              </Li>

              {error === 'Request failed with status code 409' && (
                <Error>Такий користувач вже існує!</Error>
              )}
              <Stack style={{ width: '100%' }} spacing={2}>
                <LoadingButton
                  variant="outlined"
                  loading={loading}
                  onClick={handleSubmit}
                >
                  Зареєструватися
                </LoadingButton>
                <Button onClick={() => navigate('/user')}>Вхід</Button>
              </Stack>
            </Ul>
          </Form>
        )}
      </Formik>
    </Div>
  );
};

export default SignUpForm;
