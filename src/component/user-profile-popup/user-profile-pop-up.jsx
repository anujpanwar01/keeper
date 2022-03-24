import { auth } from "../../firebase/firebase.util";
import { signOut } from "firebase/auth";

import CustomBtn from "../custom-btn/CustomBtn";
import logo from "../../assester/th.jpg";
import "./user-profile-pop-up.styles.scss";

const UserProfilePopUp = ({ displayName, photoURL, email }) => {
  //   console.log(displayName, photoURL, email);
  //sign out
  const userSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err.message);
    }
    document.querySelector(".pop-up").classList.add("close-pop-up");
  };

  return (
    <div className="pop-up">
      <>
        <div
          className="user-profile"
          //   style={
          //     !photoURL
          //       ? { backgroundImage: `url(${logo})` }
          //       : { backgroundImage: `url(${photoURL})` }
          //   }
        >
          <img
            style={{ width: "100%" }}
            src={!photoURL ? logo : photoURL}
            alt="user"
          />
        </div>
        <div>
          <h2>{displayName ? displayName : "user"}</h2>
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
