import React, { memo, useContext } from "react";
import { auth, userCredentail } from "../../firebase/firebase.util";
import { createUserWithEmailAndPassword } from "firebase/auth";
import CustomBtn from "../custom-btn/CustomBtn";
import CustomForm from "../custom-form/CustomForm";
import CustomInput from "../custom-input/CustomInut.component";
import useInput from "../../hooks/use-input";
import "./Sign-Up.styles.scss";

import { Link, useNavigate } from "react-router-dom";
import TogglerContext from "../../context/toggler-context/toggler-context";

let passwordErrorMsg = "Password must contain atleast one number [0-9]";

const passwordValidation = (str) => {
  let isNum = false;
  let isCap = false;
  let isSmal = false;
  let isLength = false;

  //1) check if str contain number
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) >= 48 && str.charCodeAt(i) <= 57) {
      isNum = true;
      //2) check if str contain small letter
    } else if (str.charCodeAt(i) >= 97 && str.charCodeAt(i) <= 122) {
      isSmal = true;
      // 3) check if contain one capital letter
    } else if (str.charCodeAt(i) >= 65 && str.charCodeAt() <= 90) {
      isCap = true;
    }
  }
  ///////////////////////////////////////////////////////////////////////////////////
  if (!isNum) {
    passwordErrorMsg = "Password must contain atleast one number [0-9]";
  } else if (!isCap)
    passwordErrorMsg = "Password must contain atleast one capital letter [A-Z]";
  else if (!isSmal)
    passwordErrorMsg = "Password must contain atleast one small letter [a-z]";
  else if (str.trim().length > 13)
    passwordErrorMsg = "Password length should be less then 13, [8-13].";
  else if (!isLength) passwordErrorMsg = "Password length must between 8-13";

  ///////////////////////////////////////////////////////////////////////////////////
  if (str.trim().length >= 8 && str.trim().length <= 13) {
    isLength = true;
  }

  return isCap && isNum && isSmal && isLength;
};

const SignUp = () => {
  const { theme } = useContext(TogglerContext);
  const navigate = useNavigate();
  const {
    value: enteredName,
    hasError: nameHasError,
    inputBlurHandler: nameInputBlurHanlder,
    inputChangeHandler: nameInputChangeHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    hasError: emailHasError,
    inputBlurHandler: emailInputBlurHanlder,
    inputChangeHandler: emailInputChangeHandler,
  } = useInput((value) => value.trim().includes("@"));
  //password
  const {
    value: enteredPassword,
    hasError: passwordHasError,
    inputBlurHandler: passwordBlurHanlder,
    inputChangeHandler: passwordChangeHandler,
  } = useInput(passwordValidation);

  const {
    value: enteredConfirmPassword,
    hasError: confirmPasswordHasError,
    inputBlurHandler: confirmPasswordBlurHandler,
    inputChangeHandler: confirmPasswordChangeHandler,
  } = useInput((value) => enteredPassword === value);

  const submitHandler = async (e) => {
    const displayName = enteredName;
    e.preventDefault();
    if (enteredPassword !== enteredConfirmPassword) {
      alert("Password not match");
      return;
    }

    ///////////////////////////
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        enteredEmail,
        enteredPassword
      );
      await userCredentail(user, { displayName });
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert(
          "Email is Already exist try with different account or do forget password"
        );
        navigate("/sign-in");
      }
    }
  };

  return (
    <section className="sign-up-page">
      <div
        className="sign-up"
        style={
          theme
            ? { backgroundColor: "#dedcfc59" }
            : { backgroundColor: "#ffffffd4" }
        }
      >
        <h1>Sign Up</h1>
        <h3>create new account</h3>
        <CustomForm onSubmit={submitHandler}>
          <div className={`form-valid ${!nameHasError ? "valid" : "invalid"}`}>
            <label htmlFor="name">Name</label>
            <CustomInput
              name="displayName"
              type="text"
              id="name"
              value={enteredName}
              onChange={nameInputChangeHandler}
              onBlur={nameInputBlurHanlder}
              required
            />
            {nameHasError && (
              <p className="error-text">Name must not be empty</p>
            )}
          </div>

          <div className={`form-valid ${!emailHasError ? "valid" : "invalid"}`}>
            <label htmlFor="email">E-mail</label>
            <CustomInput
              name="email"
              id="email"
              type="email"
              value={enteredEmail}
              onChange={emailInputChangeHandler}
              onBlur={emailInputBlurHanlder}
              required
            />
            {emailHasError && (
              <p className="error-text">Email Must contain @ symbol</p>
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
              // required
            />
            {passwordHasError && (
              <p className="error-text">{passwordErrorMsg}</p>
            )}
          </div>

          <div
            className={`form-valid ${
              !confirmPasswordHasError ? "valid" : "invalid"
            }`}
          >
            <label htmlFor="confirmpassword">Confirm-Password</label>
            <CustomInput
              name="confirmPassword"
              type="password"
              id="confirmpassword"
              value={enteredConfirmPassword}
              onChange={confirmPasswordChangeHandler}
              onBlur={confirmPasswordBlurHandler}
              required
            />
            {confirmPasswordHasError && (
              <p className="error-text">Password not match</p>
            )}
          </div>
          <Link to={"/sign-in"}>have an account ? click me</Link>
          <CustomBtn className="form-btn btn" type="submit">
            Sign Up
          </CustomBtn>
        </CustomForm>
      </div>
    </section>
  );
};
export default memo(SignUp);
