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
import {
  ref,
  set,
  onValue,
  push,
  child,
  query,
  orderByKey,
} from "firebase/database";
import { database } from "../../firebase/firebase.util";
// import { async } from "@firebase/util";

const Header = () => {
  const { currentUser, setUserDetail, setCurrentUser } =
    useContext(UserContext);
  // const [a, setA] = useState([]);
  const isCancelled = useRef(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        userCredentail(currentUser);
      }
      setCurrentUser(currentUser);
    });
    const notesRef = ref(database, `notes/ ${currentUser?.uid}`);
    console.log(query(notesRef), orderByKey(currentUser?.uid));
    // console.log(notesRef);
    // let self = this;
    // notesRef.on("value", function (snap) {
    //   let value = snap.val();
    //   self.$store.dispatch("setUserData", value);
    // });
    // onValue(notesRef, (snapshot) => {
    //   setA([]);
    //   console.log(snapshot.exists());
    //   const { notes } = snapshot.val();

    //   if (!notes) return;
    //   let transformData = {};
    //   Object.values(notes).map((key) => {
    //     console.log(key);
    //     for (const note in key) {
    //       console.log(note, key);
    //       // console.log(key[note].subTitle, note);
    //       transformData.id = note;
    //       transformData.title = key[note].title;
    //       transformData.color = key[note].color;
    //       transformData.file = key[note].file;
    //       transformData.src = key[note].src;
    //       transformData.subTitle = key[note].subTitle;

    //       //   // const transformData = {
    //       //   //   id: note,
    //       //   //   title: key[note].data.title,
    //       //   //   color: key[note].data.color,
    //       //   //   file: key[note].data.file,
    //       //   //   src: key[note].data.src,
    //       //   //   subTitle: key[note].data.subTitle,
    //       //   // };
    //       //   // d.push(transformData);
    //     }
    //     return setA((prev) => [...prev, transformData]);
    //     // return d;
    //     // console.log(Object.values(key).map((ele) => ele));
    //   });
    // });

    return unsubscribe;
  }, []);
  // console.log(a);
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
