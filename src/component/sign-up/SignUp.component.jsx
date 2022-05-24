import React, { memo, useState } from "react";
import { auth, userCredentail } from "../../firebase/firebase.util";
import { createUserWithEmailAndPassword } from "firebase/auth";
import CustomBtn from "../custom-btn/CustomBtn";
import CustomForm from "../custom-form/CustomForm";
import CustomInput from "../custom-input/CustomInut.component";

import "./Sign-Up.styles.scss";

import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { displayName, email, password, confirmPassword } = state;

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setState(() => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password not match");
      return;
    }

    ///////////////////////////
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(displayName);
      await userCredentail(user, { displayName });
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert(
          "Email is Already exist try with different account or use new Email Address"
        );
        navigate("/sign-in");
      }
    }
  };

  return (
    <section className="sign-up-page">
      <div className="sign-up">
        <h1>Sign Up</h1>
        <h3>create new account</h3>
        <CustomForm onSubmit={submitHandler}>
          <CustomInput
            name="displayName"
            type="text"
            value={displayName}
            placeholder="name"
            onChange={inputChangeHandler}
            required
          />
          <CustomInput
            name="email"
            type="email"
            placeholder="email"
            value={email}
            onChange={inputChangeHandler}
            required
          />
          <CustomInput
            name="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={inputChangeHandler}
            required
          />
          <CustomInput
            name="confirmPassword"
            type="password"
            placeholder="confirm passwod"
            value={confirmPassword}
            onChange={inputChangeHandler}
            required
          />
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
