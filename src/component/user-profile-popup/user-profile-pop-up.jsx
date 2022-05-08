import { auth } from "../../firebase/firebase.util";
import { dropDownOpen } from "../../redux/togglerSlice";
import { setUserDetail } from "../../redux/currentUserSlice";
import { signOut } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import CustomBtn from "../custom-btn/CustomBtn";
import logo from "../../assester/th.jpg";
import Spinner from "../spinner/spinner.component";
import "./user-profile-pop-up.styles.scss";

const UserProfilePopUp = ({ displayName, email, photoURL }) => {
  const dispatch = useDispatch();

  // const { displayName, email, photoURL } = providerData;

  const { isDropDownOpen } = useSelector((state) => state.theme);
  console.log(isDropDownOpen);
  const { currentUser } = useSelector((state) => state.currentUser);

  //sign out
  const userSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(dropDownOpen(!isDropDownOpen));
      dispatch(setUserDetail(null));
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
      {!displayName ? (
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
      )}
    </div>
  );
};

export default UserProfilePopUp;
