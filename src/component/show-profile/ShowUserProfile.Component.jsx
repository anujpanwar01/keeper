import React, { useCallback, useContext, useEffect } from "react";

import { Link } from "react-router-dom";
import CustomBtn from "../custom-btn/CustomBtn";
import TogglerContext from "../../context/toggler-context/toggler-context";
import logo from "../../assester/th.jpg";
import "./ShowUserProfile.styles.scss";
import UserContext from "../../context/user-context/user-context";

const ShowUserProfileComponent = () => {
  const { dropDown, setDropDown } = useContext(TogglerContext);

  const { currentUser, photoLink, setPhotoLink } = useContext(UserContext);

  const photoHandler = useCallback(() => {
    const timer = setTimeout(() => {
      setPhotoLink(currentUser?.photoURL ? currentUser.photoURL : logo);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentUser]);

  useEffect(() => {
    photoHandler();
  }, [photoHandler]);

  const openUserProfilePopUp = () => {
    setDropDown(!dropDown);
  };

  const handleImgError = () => {
    console.log("Image did'nt load");
    setPhotoLink(logo);
  };

  const btns = (
    <div className="sign-in-up">
      <Link to={"/sign-in"}>sign in</Link>
      <Link to={"/sign-up"}>Sign Up</Link>
    </div>
  );

  const user = (
    <CustomBtn className="profile" handleChange={openUserProfilePopUp}>
      <img
        style={{ height: "100%", width: "100%", objectFit: "contain" }}
        src={photoLink}
        alt={"userImage"}
        onError={handleImgError}
      />
    </CustomBtn>
  );

  return (
    <React.Fragment>
      {!currentUser && btns}
      {currentUser && user}
    </React.Fragment>
  );
};
export default ShowUserProfileComponent;
