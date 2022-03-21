import React, { Fragment } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.util";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { FaSearch, FaMoon, FaSun } from "react-icons/fa";

import CustomInput from "../../component/custom-input/CustomInut.component";
import logo from "../../assester/th.jpg";
import { userProfile } from "../../component/sign-in/SignIn";
import "./Header.styles.scss";
import CustomBtn from "../../component/custom-btn/CustomBtn";
import { onAuthStateChanged } from "firebase/auth";
// import { password } from "sudo-js";

onAuthStateChanged(auth, (user) => {
  if (!user) return;

  //   const uid = user.uid;
  // console.log(user.displayName);

  const { email, displayName, photoURL } = user;
  // console.log(email, displayName, photoURL);
  // console.log(email, displayName, user);
  // ...
});
// user profile
const user = auth.currentUser;
console.log(user);

function Header() {
  const [inputValue, setInputValue] = useState({
    theme: "false",
  });
  const { theme } = inputValue;
  // signOut
  const signOUt = async () => {
    try {
      const res = await signOut(auth);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Fragment>
      <header>
        <Link className="logo" to={"/"}>
          Keeper App
        </Link>
        {/* for search bar */}
        <div className="search-container">
          <label htmlFor="search">
            <FaSearch size={16} fill={"#555"} />
          </label>
          <CustomInput
            type="search"
            id="search"
            placeholder="search"
            className="search-box"
          />
        </div>
        {/* search bar */}
        <nav>
          <div className="theme">
            <input
              type="checkbox"
              id="check"
              value={inputValue.theme}
              className="checkbox"
              onChange={(e) => {
                setInputValue(() => {
                  return {
                    theme: "true",
                  };
                });
                if (theme) {
                  document.body.classList.toggle("bg");
                }
              }}
            />
            <label htmlFor="check" className="theme-btn">
              <div className="sun">
                {" "}
                <FaMoon color="#8f8f8f" />
              </div>
              <div className="moon">
                {" "}
                <FaSun color="#ff9e00" />
              </div>
              <div className="toggle-thumb"></div>
            </label>
          </div>

          <Link to={"/user"}>Log in</Link>
          <CustomBtn handleChange={signOUt}>Log out</CustomBtn>
          <CustomBtn className="profile"></CustomBtn>
        </nav>
      </header>
      <Outlet />
    </Fragment>
  );
}

export default Header;
