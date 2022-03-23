import React, { Fragment, useContext } from "react";
import { searchValue } from "../../redux/searchSlice";
import { useSelector, useDispatch } from "react-redux";
import { cardActions } from "../../redux/themeSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.util";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { FaSearch, FaMoon, FaSun } from "react-icons/fa";
import { SearchContext, ThemeContext } from "../../context/context";

import CustomInput from "../../component/custom-input/CustomInut.component";
// import logo from "../../assester/th.jpg";
// import { userProfile } from "../../component/sign-in/SignIn";
import "./Header.styles.scss";
import CustomBtn from "../../component/custom-btn/CustomBtn";
import { onAuthStateChanged } from "firebase/auth";
// import { password } from "sudo-js";

onAuthStateChanged(auth, (user) => {
  if (!user) return;

  //   const uid = user.uid;
  // console.log(user.displayName);

  // const { email, displayName, photoURL } = user;
  // console.log(email, displayName, photoURL);
  // console.log(email, displayName, user);
  // ...
});

// user profile
const user = auth.currentUser;

function Header() {
  //////redux
  const dispatch = useDispatch();
  const { searches } = useSelector((state) => state.search);
  // console.log(search);
  // const themes = useSelector((state) => state.search);
  // console.log(themes);

  const themeChanger = () => {
    dispatch(cardActions.toggle());
    // if (!themes) {
    // document.body.classList.toggle("bg");
    // }
  };

  ///////////////////////////////////////////////////////////////////////////////
  // const { theme, setTheme } = useContext(ThemeContext);

  //////
  /////////
  //////////

  // const [theme, setTheme] = useState(true);

  // const themeChange = () => {
  //   setTheme((th) => !th);
  //   if (theme === false) document.body.classList.toggle("bg");
  //   console.log(theme);
  //   // if (!theme) document.body.backgroundColor = "black";
  // };
  const [inputValue, setInputValue] = useState({
    search: "",
  });
  const { search } = inputValue;

  // const { setSearchValue } = useContext(SearchContext);/
  // setSearchValue(search);
  // signOut
  const signOUt = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err.message);
    }
  };

  const inputChangeHandler = (e) => {
    const { value, name } = e.target;
    console.log(value, name);

    dispatch(
      searchValue({
        search,
      })
    );

    setInputValue(() => {
      return {
        ...inputValue,
        [name]: value,
      };
    });
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
            name="search"
            id="search"
            value={search}
            handleChange={inputChangeHandler}
            placeholder="search"
            className="search-box"
          />
        </div>
        {/* search bar */}
        <nav>
          <div className="theme">
            {/* <button onClick={themeChanger}>toggle</button> */}
            <input
              type="checkbox"
              id="check"
              // value={inputValue.theme}/
              className="checkbox"
              onClick={themeChanger}
              // onChange={themeChanger}
              // onChange={(e) => {
              //   setInputValue(() => {
              //     return {
              //       theme: "true",
              //     };
              //   });
              //   if (theme) {
              //     document.body.classList.toggle("bg");
              //   }

              //   // document.querySelector(".card").classList.toggle("black");
              // }}
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
