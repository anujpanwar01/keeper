import React, { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import logo from "../../assester/th.jpg";
import { userProfile } from "../../component/sign-in/SignIn";
import "./Header.styles.scss";

function Header() {
  // const { name, email, photo } = userProfile;
  console.log(userProfile.name);
  return (
    <Fragment>
      <header>
        <Link className="logo" to={"/"}>
          Keeper App
        </Link>
        <nav>
          <Link to={"/user"}>Log in</Link>
          <div
            className="img-container"
            style={{
              backgroundImage: `url(${
                userProfile.name ? userProfile.photo : logo
              })`,
            }}
          ></div>
        </nav>
      </header>
      <Outlet />
    </Fragment>
  );
}

export default Header;
