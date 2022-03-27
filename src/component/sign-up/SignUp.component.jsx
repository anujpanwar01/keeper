import React, { useState } from "react";
import { auth, userCredentail } from "../../firebase/firebase.util";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { collection, addDoc } from "firebase/firestore";

import CustomBtn from "../custom-btn/CustomBtn";
import CustomForm from "../custom-form/CustomForm";
import CustomInput from "../custom-input/CustomInut.component";

import "./Sign-Up.styles.scss";
import { Link } from "react-router-dom";

const SignUp = () => {
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
      userCredentail(user, { displayName });
      console.log(user);
    } catch (err) {
      console.log(err.message);
    }
    setState({ displayName: "", email: "", password: "", confirmPassword: "" });
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
          <Link to={"/signin"}>have an account ? click me</Link>
          <CustomBtn className="form-btn btn" type="submit">
            Sign Up
          </CustomBtn>
        </CustomForm>
      </div>
    </section>
  );
};
export default SignUp;
