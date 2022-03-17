import React, { useState } from "react";
import { FaGithub, FaFacebook, FaGoogle } from "react-icons/fa";
import {
  githubSignIn,
  facebookSignIn,
  googleSignIn,
  auth,
} from "../../firebase/firebase.util";

import {
  // createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import CustomForm from "../custom-form/CustomForm";
import CustomBtn from "../custom-btn/CustomBtn";
import CustomInput from "../custom-input/CustomInut.component";
import "./Sign-In.styles.scss";

export let userProfile;

const SignIn = function () {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  //destructure
  const { email, password } = state;

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setState(() => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      //   const uid = user.uid;
      const { email, displayName, photoURL } = user;
      userProfile = {
        name: displayName,
        photo: photoURL,
        email,
      };
      console.log(email, displayName, user);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  const eamilAndPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
    setState({
      email: "",
      password: "",
    });
  };

  const github = async () => {
    const res = await githubSignIn();
    console.log(res);
  };

  const facebook = async () => {
    const res = await facebookSignIn();
    console.log(res);
  };
  const google = async () => {
    const res = await googleSignIn();
    console.log(res);
  };

  return (
    <div className="sign-in">
      <h1>Sign In</h1>
      <div>
        <CustomBtn className="social-btn" handleChange={google} type="button">
          <FaGoogle />
        </CustomBtn>
        <CustomBtn className="social-btn" handleChange={github} type="button">
          <FaGithub />
        </CustomBtn>
        <CustomBtn className="social-btn" handleChange={facebook} type="button">
          <FaFacebook />
        </CustomBtn>
      </div>
      <h3>or use email and password</h3>
      <CustomForm className="sign-in-form" handleChange={eamilAndPassword}>
        <CustomInput
          name="email"
          type="email"
          placeholder="email"
          value={email}
          handleChange={inputChangeHandler}
          required
        />
        <CustomInput
          type="password"
          name="password"
          placeholder="password"
          value={password}
          handleChange={inputChangeHandler}
          required
        />
        <h3>forget your password?</h3>
        <CustomBtn className="form-btn" type="submit">
          Sign in
        </CustomBtn>
      </CustomForm>
    </div>
  );
};

export default SignIn;
