import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authOperations from "../../redux/auth/auth-operatins";
import {
  Div,
  Ul,
  DivClose,
  Li,
  Error,
  LoadingBttn,
  SpanError,
  Form,
} from "./FormLogin.styled";
import { Field, Formik } from "formik";
import validationSchema from "../../validations/login";
import {
  getLoggedIn,
  getUser,
  getUserError,
  getUserLoading,
} from "../../redux/auth/auth-selectors";
import Input from "@mui/joy/Input";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";

const FormLogin = ({ toggleModal }) => {
  //   const [name, setName] = useState("");

  const logged = useSelector(getLoggedIn);
  const loading = useSelector(getUserLoading);
  const error = useSelector(getUserError);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Div>
      {" "}
      <DivClose>
        <h3>Вхід</h3>
      </DivClose>
      <Formik
        initialValues={{
          email: "",
          password: "",
          remember: false,
        }}
        validateOnBlur
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const { email, password, remember } = values;

          dispatch(authOperations.login({ email, password, remember }));
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
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Ul>
              {/* <GoogleAuthBtn /> */}
              <Li>
                <label>
                  Електронна адреса
                  {!values.email.length ||
                    (errors.email && <SpanError> *</SpanError>)}
                </label>

                <Input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />

                <SpanError>
                  {touched.email && errors.email ? errors.email : ""}
                </SpanError>
              </Li>
              <Li>
                <label htmlFor="password">
                  Пароль
                  {!values.password.length ||
                    (errors.password && <SpanError> *</SpanError>)}
                </label>

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

                <SpanError>
                  {touched.password && errors.password ? errors.password : ""}
                </SpanError>
              </Li>
              <Li>
                <label>
                  <Field type="checkbox" name="remember" />
                  Запам'ятати мене
                </label>
              </Li>
              {(error === "Request failed with status code 401" ||
                error === "Request failed with status code 400") && (
                <Error>Невірна почта або пароль </Error>
              )}
              <Stack style={{ width: "100%" }} spacing={2}>
                <LoadingBttn
                  variant="outlined"
                  loading={loading}
                  onClick={handleSubmit}
                >
                  <span>Увійти</span>
                </LoadingBttn>
                <Button onClick={() => navigate("/register")}>
                  Реєстрація
                </Button>
              </Stack>
            </Ul>
          </Form>
        )}
      </Formik>
      {logged && (
        <button onClick={() => dispatch(authOperations.logout())}>Exit</button>
      )}
    </Div>
  );
};

export default FormLogin;
