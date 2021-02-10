import { Snackbar } from "@material-ui/core";
import axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import GoogleLogin from "react-google-login";
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
  const [error, setError] = useState("");
  const [errorState, setErrorState] = useState({open: false, message: ""});

  const handleLoginClick = (values: any) => {
    AuthenticationService.loginUser(values.email, values.password).then(
      (res: any) => {
        if(res.data.token) {
          history.push("/");
        }
        else {
          setError(res.data.error)
        }
        console.log(res);
      }
    );
  };

  const handleRegisterClick = () => {
    history.push("/register");
  };

  const handleLogin = async (googleData: any) => {
    if(googleData.error) {
      const errorObj = {open: true, message: googleData.details}
      setErrorState(errorObj);
    }
    
    // const res = await fetch("/api/v1/auth/google", {
    //     method: "POST",
    //     body: JSON.stringify({
    //     token: googleData.tokenId
    //   }),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
console.log(googleData)
    // const res = await axios.post("/api/v1/auth/google", {
    //   token: googleData.tokenId
    // }).then((data) => console.log(data))

    // const data = await res.json()
    // console.log(data)

    // store returned user somehow
  }

  const CLIENT_ID = "445355911190-15pti9bl81t1qb08d876m0vn72qsls3m.apps.googleusercontent.com";

  const loginWithGoogle = () => {
    window.open("http://localhost:4000/auth/google", "_self")
    // AuthenticationService.loginWithGoogle().then((data: any) => console.log(data))
  }

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
              {error}
              <button type="submit">Login</button>
            </form>
          )}
        </Formik>
        <button onClick={handleRegisterClick}>Register</button>
        <button>Sign in With Google</button>
        <Authorize />
        <Snackbar open={errorState.open}
      onClose={() => setErrorState({open:false, message: ""})}
      message={errorState.message}
      />
        {/* <GoogleLogin
        disabled={errorState.open}
    clientId={CLIENT_ID}
    buttonText="Log in with Google"
    onSuccess={handleLogin}
    onFailure={handleLogin}
    cookiePolicy={'single_host_origin'}
/> */}
<button onClick={() => loginWithGoogle()}>Login with Google</button>
      </StyledLoginContainer>
    </StyledLoginPage>
  );
}
