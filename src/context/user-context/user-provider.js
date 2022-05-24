import { useReducer } from "react";
import UserContext from "./user-context";

export const init = {
  currentUser: null,
  photoLink: "",
  userDetail: "",
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: payload,
      };

    case "SET_IMG_LINK":
      return {
        ...state,
        photoLink: payload,
      };
    case "USER_DETAIL":
      return { ...state, userDetail: payload };
    default:
      return init;
  }
};

const UserProvider = ({ children }) => {
  const [user, dispatchUser] = useReducer(reducer, init);

  const auth = (userCredential) => {
    dispatchUser({ type: "SET_CURRENT_USER", payload: userCredential });
  };
  const authProfile = (imgLink) => {
    dispatchUser({ type: "SET_IMG_LINK", payload: imgLink });
  };

  const setUserDetail = (auth) => {
    dispatchUser({ type: "USER_DETAIL", payload: auth });
  };
  const value = {
    currentUser: user.currentUser,
    photoLink: user.photoLink,
    userDetail: user.userDetail,
    setCurrentUser: auth,
    setPhotoLink: authProfile,
    setUserDetail,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
