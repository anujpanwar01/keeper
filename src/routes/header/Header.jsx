import React, { Fragment, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setCurrentUser } from "../../redux/currentUserSlice"; //get current user
import { searchValue } from "../../redux/searchSlice";
import { toggle, cardToggle, dropDownOpen } from "../../redux/togglerSlice";

import { auth, userCredentail } from "../../firebase/firebase.util";

import { FaSearch, FaMoon, FaSun } from "react-icons/fa";
import { HiViewGrid } from "react-icons/hi";
import { MdViewStream } from "react-icons/md";
import UserProfilePopUp from "../../component/user-profile-popup/user-profile-pop-up";
import CustomInput from "../../component/custom-input/CustomInut.component";
import logo from "../../assester/th.jpg";

import "./Header.styles.scss";
import CustomBtn from "../../component/custom-btn/CustomBtn";
import { onAuthStateChanged } from "firebase/auth";

function Header() {
  //////redux
  const dispatch = useDispatch();

  //theme changer dispatch
  const themeChanger = () => {
    dispatch(toggle());
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
  }, [dispatch]);
  ///////////////////////////////////////////////////////////////////////////////

  const { currentUser } = useSelector((state) => state.currentUser);
  const { grid } = useSelector((state) => state.theme);

  const [inputValue, setInputValue] = useState({
    search: "",
  });

  const { search } = inputValue;

  const inputChangeHandler = (e) => {
    const { value, name } = e.target;
    console.log(value, name);

    setInputValue(() => {
      return {
        ...inputValue,
        [name]: value,
      };
    });
  };

  // set search value into the reducers
  dispatch(
    searchValue({
      search,
    })
  );

  //openUserProfilePopUp the user profile popup
  const openUserProfilePopUp = () => {
    dispatch(dropDownOpen());
  };

  //add the class into card
  const gridChanger = () => {
    dispatch(cardToggle());
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
          <CustomBtn className="grid-btn" handleChange={gridChanger}>
            {!grid ? <HiViewGrid size={32} /> : <MdViewStream size={32} />}
            <span className="grid-btn-text">List view</span>
          </CustomBtn>

          <div className="theme">
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
              <span className="theme-btn-text">change Theme</span>
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
                  : { backgroundImage: `url(${currentUser.photoURL})` }
              }
              handleChange={openUserProfilePopUp}
            >
              {" "}
            </CustomBtn>
          )}
        </nav>

        <UserProfilePopUp {...currentUser} />
      </header>
      <Outlet />
    </Fragment>
  );
}

export default Header;
