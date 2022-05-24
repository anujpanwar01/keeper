import { useContext } from "react";
import { createPortal } from "react-dom";
import TogglerContext from "../../context/toggler-context/toggler-context";
import { auth } from "../../firebase/firebase.util";
import { signOut } from "firebase/auth";
import CustomBtn from "../custom-btn/CustomBtn";
import logo from "../../assester/th.jpg";
import Spinner from "../spinner/spinner.component";
import "./user-profile-pop-up.styles.scss";
import UserContext from "../../context/user-context/user-context";

const UserProfilePopUp = ({ displayName, email, photoURL }) => {
  const { setUserDetail, setCurrentUser, setPhotoLink } =
    useContext(UserContext);

  const { dropDown, setDropDown } = useContext(TogglerContext);

  //sign out
  const userSignOut = async () => {
    try {
      await signOut(auth);
      setDropDown(false);
      setCurrentUser(null);
      setPhotoLink("");
      setUserDetail("");
    } catch (err) {
      alert(err.message);
    }
  };

  const closeDropDown = () => {
    setDropDown(false);
  };
  return (
    <div
      className={`pop-up ${!dropDown && "pop-up-2"}`}
      // style={dropDown && currentUser && { display: "flex" }}
    >
      {/* {!displayName ? ( */}
      {/* <Spinner /> */}
      {/* ) : ( */}
      <>
        <div className="user-profile">
          <img
            style={{ width: "100%" }}
            src={!photoURL ? logo : photoURL}
            alt="user"
          />
        </div>
        <div>
          <h2>{displayName}</h2>
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
      </>
      {/* )} */}
      {createPortal(
        <>
          <div
            className={`user-overlay ${!dropDown && "user-pop-up-overlay"} ${
              dropDown && "remove-overlay"
            }`}
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
  );
};

export default UserProfilePopUp;
