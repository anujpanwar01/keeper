import React, { useContext } from "react";
import { createPortal } from "react-dom";
import TogglerContext from "../../context/toggler-context/toggler-context";
import { auth } from "../../firebase/firebase.util";
import { signOut } from "firebase/auth";
import CustomBtn from "../custom-btn/CustomBtn";
import logo from "../../assester/th.jpg";
import Spinner from "../spinner/spinner.component";
import "./user-profile-pop-up.styles.scss";
import UserContext from "../../context/user-context/user-context";
import CardContext from "../../context/card-context/card-context";

const UserProfilePopUp = ({ email, photoURL }) => {
  const { setUserDetail, setCurrentUser, setPhotoLink, setDeleteUserAcc } =
    useContext(UserContext);
  const { replaceItems } = useContext(CardContext);
  const { dropDown, setDropDown } = useContext(TogglerContext);

  const clearDelUserOverlay = () => setDeleteUserAcc(true);
  //sign out
  const userSignOut = async () => {
    try {
      await signOut(auth);
      setDropDown(false);
      setCurrentUser(null);
      setPhotoLink("");
      setUserDetail("");
      replaceItems([]);
    } catch (err) {
      alert(err.message);
    }
  };

  const closeDropDown = () => {
    setDropDown(false);
  };
  return (
    <React.Fragment>
      {dropDown && (
        <div
          className={`pop-up ${!dropDown && "pop-up-2"}`}
          // style={dropDown && currentUser && { display: "flex" }}
        >
          {!email ? (
            <Spinner />
          ) : (
            <>
              <div className="user-profile">
                <img
                  style={{ width: "100%" }}
                  src={!photoURL ? logo : photoURL}
                  alt="user"
                />
              </div>
              <div>
                {/* <h2>{displayName}</h2> */}
                <h3>{email}</h3>
              </div>

              <div className="sign-out-btn">
                <CustomBtn
                  className="sign-out btn"
                  handleChange={userSignOut}
                  type="button"
                >
                  sign out
                </CustomBtn>
              </div>
              <CustomBtn
                className="del-user-btn"
                onClick={() => {
                  closeDropDown();
                  clearDelUserOverlay();
                }}
              >
                Delete user
              </CustomBtn>
            </>
          )}

          {dropDown &&
            createPortal(
              <>
                <div
                  className={`user-overlay ${
                    !dropDown && "user-pop-up-overlay"
                  } ${dropDown && "remove-overlay"}`}
                  onClick={closeDropDown}
                />
                <CustomBtn
                  type="button"
                  className={`overlay-btn user-overlay-btn ${
                    dropDown && "close-user-overlay"
                  }`}
                  handleChange={closeDropDown}
                />
              </>,
              document.getElementById("user-overlay")
            )}
        </div>
      )}
    </React.Fragment>
  );
};

export default UserProfilePopUp;
