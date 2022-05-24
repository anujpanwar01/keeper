import React, { memo, useState, useCallback } from "react";
import { FaGithub, FaFacebook, FaGoogle } from "react-icons/fa";
import {
  githubSignIn,
  facebookSignIn,
  googleSignIn,
  auth,
  userCredentail,
} from "../../firebase/firebase.util";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import CustomForm from "../custom-form/CustomForm";
import CustomBtn from "../custom-btn/CustomBtn";
import CustomInput from "../custom-input/CustomInut.component";
import "./Sign-In.styles.scss";
import { Link } from "react-router-dom";

export let userProfile;
const initial = {
  email: "",
  password: "",
};

const SignIn = function (props) {
  const navigate = useNavigate();
  const [state, setState] = useState(initial);

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

  const emailAndPassword = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // setState(() => init);
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        alert("Password not match. Do forget password");
      } else if (err.code === "auth/account-exists-with-different-credential") {
        alert("You account is already exist with different credentials.");
      } else if (err.code === "auth/user-not-found") {
        alert("Your account is not exist please do first sign up.");
        navigate("/sign-up");
      }
    }
    console.log(props);
  };

  //sign in with social
  const social = useCallback(async (data) => {
    const { user } = await data();
    userCredentail(user);
  }, []);

  return (
    <section className="sign-in-page">
      <div className="sign-in">
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
