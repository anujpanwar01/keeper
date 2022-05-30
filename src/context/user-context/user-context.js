import { createContext } from "react";

const UserContext = createContext({
  currentUser: null,
  photoLink: "",
  userDetail: "",
  deleteUserAcc: false,
  didUserDelete: false,
  setPhotoLink: (url) => {},
  setCurrentUser: (auth) => {},
  setUserDetail: (auth) => {},
  setDeleteUserAcc: (bool) => {},
  setDidUserDelete: (bool) => {},
});
export default UserContext;
