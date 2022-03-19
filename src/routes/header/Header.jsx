import React, { Fragment } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.util";
import { Outlet, Link } from "react-router-dom";
import logo from "../../assester/th.jpg";
import { userProfile } from "../../component/sign-in/SignIn";
import "./Header.styles.scss";
import CustomBtn from "../../component/custom-btn/CustomBtn";
import { onAuthStateChanged } from "firebase/auth";
// import { password } from "sudo-js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    //   const uid = user.uid;
    // console.log(user.displayName);
    const { email, displayName, photoURL } = user;
    // console.log(email, displayName, photoURL);
    // console.log(email, displayName, user);
    // ...
  } else {
    // User is signed out
    // ...
  }
});
// user profile
const user = auth.currentUser;
console.log(user);

function Header() {
  // signOut
  const signOUt = async () => {
    try {
      const res = await signOut(auth);
    } catch (err) {
      console.log(err.message);
    }
  };
  // console.log(auth.currentUser);

  return (
    <Fragment>
      <header>
        <Link className="logo" to={"/"}>
          Keeper App
        </Link>
        <nav>
          <Link to={"/user"}>Log in</Link>
          <CustomBtn handleChange={signOUt}>Log out</CustomBtn>
        </nav>
      </header>
      <Outlet />
    </Fragment>
  );
}

export default Header;
