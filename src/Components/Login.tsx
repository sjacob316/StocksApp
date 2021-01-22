import { Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { AuthenticationService } from "../Services/AuthenticationService";
import { Authorize } from "./Authorize";

const StyledLoginPage = styled.div`
  background-color: white;
  height: 100vh;
  display: flex;
`;

const StyledLoginSide = styled.div`
  height: 100vh;
  width: 50%;
  background-color: black;
`;

const StyledLoginContainer = styled.div``;
export function Login() {
  const history = useHistory();

  const handleLoginClick = (values: any) => {
    AuthenticationService.loginUser(values.email, values.password).then(
      (res: any) => {
        console.log(res);
        history.push("/");
        if (res.data.status == "ok") {
          console.log(res);
          history.push("/");
        }
      }
    );
  };

  const handleRegisterClick = () => {
    history.push("/register");
  };

  return (
    <StyledLoginPage>
      <StyledLoginSide></StyledLoginSide>
      <StyledLoginContainer>
        <h1>Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, { setSubmitting }) => {
            handleLoginClick(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                name="email"
                placeholder="email"
                value={values.email}
                onChange={handleChange}
              />
              <input
                name="password"
                placeholder="password"
                type="password"
                value={values.password}
                onChange={handleChange}
              />
              <button type="submit">Login</button>
            </form>
          )}
        </Formik>
        <button onClick={handleRegisterClick}>Register</button>
        <button>Sign in With Google</button>
        <Authorize />
      </StyledLoginContainer>
    </StyledLoginPage>
  );
}
