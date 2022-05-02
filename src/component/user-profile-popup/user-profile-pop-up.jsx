import { auth } from "../../firebase/firebase.util";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import CustomBtn from "../custom-btn/CustomBtn";
import logo from "../../assester/th.jpg";
import "./user-profile-pop-up.styles.scss";

const UserProfilePopUp = ({ displayName, photoURL, email }) => {
  const { isDropDownOpen } = useSelector((state) => state.theme);

  const { currentUser } = useSelector((state) => state.currentUser);

  //sign out
  const userSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      className="pop-up"
      style={
        isDropDownOpen && currentUser
          ? { display: "flex" }
          : { display: "none" }
      }
    >
      <>
        <div className="user-profile">
          <img
            style={{ width: "100%" }}
            src={!photoURL ? logo : photoURL}
            alt="user"
          />
        </div>
        <div>
          <h2>{displayName ? displayName : "user" + Math.random() * 90231}</h2>
          <h3>{email}</h3>
        </div>
      </>
      <div className="sign-out-btn">
        <CustomBtn
          className="sign-out btn"
          handleChange={userSignOut}
          type="button"
        >
          sign out
        </CustomBtn>
      </div>
    </div>
  );
};

export default UserProfilePopUp;
