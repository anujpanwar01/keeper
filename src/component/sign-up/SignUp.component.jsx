import React, { useState } from "react";
import { auth, db } from "../../firebase/firebase.util";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { collection, addDoc } from "firebase/firestore";

import CustomBtn from "../custom-btn/CustomBtn";
import CustomForm from "../custom-form/CustomForm";
import CustomInput from "../custom-input/CustomInut.component";

import "./Sign-Up.styles.scss";

const SignUp = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = state;

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
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
    setState({
      email: "",
      password: "",
    });
  };

  //   const setData = async () => {
  //     try {
  //       const docRef = await addDoc(collection(db, "user"), {
  //         name: name,
  //         email: email,
  //         data: new Date(),
  //       });
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };
  //   setData();
  return (
    <div className="sign-up">
      <h1>Sign Up</h1>
      <h3>create new account</h3>
      <CustomForm onSubmit={submitHandler}>
        <CustomInput
          name="name"
          type="text"
          value={name}
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
        <CustomBtn className="form-btn" type="submit">
          Sign Up
        </CustomBtn>
      </CustomForm>
    </div>
  );
};
export default SignUp;
