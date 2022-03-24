import React, { Fragment, useEffect } from "react";
import { setCurrentUser } from "../../redux/currentUserSlice"; //get current user
import { searchValue } from "../../redux/searchSlice";
import { useSelector, useDispatch } from "react-redux";
import { cardActions } from "../../redux/themeSlice";
// import { signOut } from "firebase/auth";
import { auth, userCredentail } from "../../firebase/firebase.util";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { FaSearch, FaMoon, FaSun } from "react-icons/fa";
import UserProfilePopUp from "../../component/user-profile-popup/user-profile-pop-up";
import CustomInput from "../../component/custom-input/CustomInut.component";
import logo from "../../assester/th.jpg";
// import { userProfile } from "../../component/sign-in/SignIn";
import "./Header.styles.scss";
import CustomBtn from "../../component/custom-btn/CustomBtn";
import { onAuthStateChanged } from "firebase/auth";

function Header() {
  //////redux
  const dispatch = useDispatch();

  //theme changer dispatch
  const themeChanger = () => {
    dispatch(cardActions.toggle());
  };
  //get current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        userCredentail(currentUser);
      }
      dispatch(setCurrentUser(currentUser));
    });
    return unsubscribe;
  });
  ///////////////////////////////////////////////////////////////////////////////

  const { currentUser } = useSelector((state) => state.currentUser);

  const [inputValue, setInputValue] = useState({
    search: "",
  });

  const { search } = inputValue;

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

  //open the user profile popup
  const openUserProfilePopup = () => {
    const popup = document.querySelector(".pop-up");

    document.querySelector(".pop-up").classList.remove("close-pop-up");

    popup.classList.toggle("open-pop-up");
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
              className="checkbox"
              onClick={themeChanger}
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
          {!currentUser ? (
            <div className="sign-in-up">
              <Link to={"/sign-in"}>sign in</Link>
              <Link to={"/sign-up"}>Sign Up</Link>
            </div>
          ) : (
            <CustomBtn
              className="profile"
              style={
                !currentUser.photoURL
                  ? { backgroundImage: `url(${logo})` }
                  : { backgroundImage: `url(${currentUser})` }
              }
              handleChange={openUserProfilePopup}
            ></CustomBtn>
          )}
        </nav>
        <UserProfilePopUp {...currentUser} />
      </header>
      <Outlet />
    </Fragment>
  );
}

export default Header;
