import React, {
  Fragment,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { Outlet, Link } from "react-router-dom";
import Navigation from "../../component/navigation/Navigation.Component";
import { auth, userCredentail } from "../../firebase/firebase.util";
import SearchContainer from "../../component/search/SerachContainer.Component";
import UserProfilePopUp from "../../component/user-profile-popup/user-profile-pop-up";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase/firebase.util";
import { doc, getDoc } from "firebase/firestore";
import "./Header.styles.scss";
import UserContext from "../../context/user-context/user-context";
// import { async } from "@firebase/util";

const Header = () => {
  const { currentUser, setUserDetail, setCurrentUser } =
    useContext(UserContext);

  const isCancelled = useRef(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        userCredentail(currentUser);
      }
      setCurrentUser(currentUser);
    });

    return unsubscribe;
  }, []);

  ///////////////////////////////////////////////////////////////////////////////

  //get data from the firebase;

  const userProfileData = useCallback(async (currentUser) => {
    if (!currentUser) return;
    // console.log(!isCancelled.current.value);
    if (!isCancelled.current.value) {
      const user = doc(db, "user", currentUser.uid);
      const getUser = await getDoc(user);
      setUserDetail(getUser.data());
    }
  }, []);

  useEffect(() => {
    userProfileData(currentUser);
    return () => {
      isCancelled.current = true;
    };
  }, [currentUser, userProfileData]);

  return (
    <Fragment>
      <header>
        <Link className="logo" to={"/"}>
          Keeper
        </Link>
        <SearchContainer />
        <Navigation />
        <UserProfilePopUp {...currentUser} />
      </header>
      <Outlet />
    </Fragment>
  );
};
export default Header;
