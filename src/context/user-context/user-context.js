import { createContext } from "react";

const UserContext = createContext({
  currentUser: null,
  photoLink: "",
  userDetail: "",
  setPhotoLink: (url) => {},
  setCurrentUser: (auth) => {},
  setUserDetail: (auth) => {},
});
export default UserContext;
