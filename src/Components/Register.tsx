import { Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { AuthenticationService } from "../Services/AuthenticationService";

const StyledRegisterPage = styled.div`
  background-color: white;
  height: 100vh;
  display: flex;
`;

const StyledRegisterSide = styled.div`
  height: 100vh;
  width: 50%;
  background-color: black;
`;

const StyledRegisterContainer = styled.div``;
export function Register() {
  const history = useHistory();

  const handleRegisterClick = (values: any) => {
    AuthenticationService.registerUser(
      values.firstName,
      values.lastName,
      values.email,
      values.password
    ).then((res: any) => {
      console.log("succesfully registered user");
    });
  };

  return (
    <StyledRegisterPage>
      <StyledRegisterSide></StyledRegisterSide>
      <StyledRegisterContainer>
        <h1>Register</h1>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            handleRegisterClick(values);
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
                name="firstName"
                placeholder="first name"
                value={values.firstName}
                onChange={handleChange}
              />
              <input
                name="lastName"
                placeholder="last name"
                value={values.lastName}
                onChange={handleChange}
              />
              <input
                name="email"
                placeholder="email"
                value={values.email}
                type="email"
                onChange={handleChange}
              />
              <input
                name="password"
                placeholder="password"
                type="password"
                value={values.password}
                onChange={handleChange}
              />
              <button type="submit">Register</button>
            </form>
          )}
        </Formik>
      </StyledRegisterContainer>
    </StyledRegisterPage>
  );
}
