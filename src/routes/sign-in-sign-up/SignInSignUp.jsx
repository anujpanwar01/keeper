import React from "react";
import SignIn from "../../component/sign-in/SignIn";
import SignUp from "../../component/sign-up/SignUp.component";
// import SignIn from "../../components/sign-in/SignIn";
// import SignUp from "../../components/sign-up/SignUp.component";

import "./Sign-In-Sign-Up.styles.scss";
const SignInSignUp = () => {
  return (
    <section className="sign-in-sign-up">
      <SignIn />
      <SignUp />
    </section>
  );
};

export default SignInSignUp;
