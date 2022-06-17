import React, { memo, useCallback, useContext } from "react";
import useInput from "../../hooks/use-input";
import { FaGithub, FaFacebook, FaGoogle } from "react-icons/fa";
import {
  githubSignIn,
  facebookSignIn,
  googleSignIn,
  auth,
  userCredentail,
  resetPassword,
} from "../../firebase/firebase.util";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import CustomForm from "../custom-form/CustomForm";
import CustomBtn from "../custom-btn/CustomBtn";
import CustomInput from "../custom-input/CustomInut.component";
import "./Sign-In.styles.scss";
import { Link } from "react-router-dom";

import TogglerContext from "../../context/toggler-context/toggler-context";
export let userProfile;

const SignIn = function () {
  const navigate = useNavigate();
  const { theme } = useContext(TogglerContext);

  const {
    value: enteredEmail,
    hasError: emailHasError,
    inputBlurHandler: emailBlurHanlder,
    vaildValue: emailIsValid,
    inputChangeHandler: emailChangeHandler,
    reset: resetEmailHandler,
  } = useInput((value) => value.trim().includes("@"));

  const {
    value: enteredPassword,
    hasError: passwordHasError,
    vaildValue: passwordIsValid,
    inputBlurHandler: passwordBlurHanlder,
    inputChangeHandler: passwordChangeHandler,
    reset: resetPasswordHandler,
  } = useInput((value) => value.trim().length >= 6);
  //destructure

  const emailAndPassword = async (e) => {
    e.preventDefault();

    if (!emailIsValid || !passwordIsValid) {
      passwordBlurHanlder();
      emailBlurHanlder();
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, enteredEmail, enteredPassword);
      // setState(() => init);
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        alert("Password not match. Do forget password");
        resetPasswordHandler();
      } else if (err.code === "auth/account-exists-with-different-credential") {
        alert("You account is already exist with different credentials.");
        resetEmailHandler();
        resetPasswordHandler();
      } else if (err.code === "auth/user-not-found") {
        alert("Your account is not exist please do first sign up.");
        navigate("/sign-up");
      } else {
        alert(err.code);
      }
    }
    // console.log(props);
  };

  ///////////////////////////////////////////////////////////////////////////
  //reset user password
  const resetCurrentUserPassword = !emailHasError && enteredEmail.includes("@");

  const resetUserPassword = async () => {
    if (!enteredEmail) {
      alert("Enter email first");
    }
    await resetPassword(enteredEmail);
  }; ///////////////////////////////////////////////////////
  //sign in with socialf
  const social = useCallback(async (data) => {
    const { user } = await data();
    userCredentail(user);
  }, []);

  return (
    <section className="sign-in-page">
      <div
        className="sign-in"
        style={
          theme
            ? { backgroundColor: "#dedcfc59" }
            : { backgroundColor: "#ffffffd4" }
        }
      >
        <h1>Sign In</h1>
        <div>
          <CustomBtn
            className="social-btn"
            handleChange={() => {
              social(googleSignIn);
            }}
            type="button"
          >
            <FaGoogle />
          </CustomBtn>
          <CustomBtn
            className="social-btn"
            handleChange={() => {
              social(githubSignIn);
            }}
            type="button"
          >
            <FaGithub />
          </CustomBtn>
          <CustomBtn
            className="social-btn"
            handleChange={() => {
              social(facebookSignIn);
            }}
            type="button"
          >
            <FaFacebook />
          </CustomBtn>
        </div>
        <h3>or use email and password</h3>

        <CustomForm className="sign-in-form" handleChange={emailAndPassword}>
          <div className={`form-valid ${!emailHasError ? "valid" : "invalid"}`}>
            <label htmlFor="email">E-mail</label>
            <CustomInput
              name="email"
              type="email"
              id="email"
              value={enteredEmail}
              handleChange={emailChangeHandler}
              onBlur={emailBlurHanlder}
            />

            {emailHasError && (
              <p className="error-text">Email must contain @ symbol</p>
            )}
          </div>

          <div
            className={`form-valid ${!passwordHasError ? "valid" : "invalid"}`}
          >
            <label htmlFor="password">Password</label>
            <CustomInput
              name="password"
              type="password"
              id="password"
              value={enteredPassword}
              handleChange={passwordChangeHandler}
              onBlur={passwordBlurHanlder}
            />
            {passwordHasError && (
              <p className="error-text">Password length must be 8 to 13.</p>
            )}
          </div>
          <CustomBtn
            className={`password ${
              resetCurrentUserPassword ? "rm-reset-pass" : "reset-pass"
            }`}
            type="button"
            disabled={!resetCurrentUserPassword}
            handleChange={resetUserPassword}
          >
            Forget password?
          </CustomBtn>
          <CustomBtn className="form-btn btn" type="submit">
            Sign in
          </CustomBtn>
          <Link to="/sign-up">Have no account? click me</Link>
        </CustomForm>
      </div>
    </section>
  );
};

export default memo(SignIn);
