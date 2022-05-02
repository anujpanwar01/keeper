import { initializeApp } from "firebase/app";
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAuokBWXfdt6ZmU8idehBNqIjhvTFyElhU",
  authDomain: "keeper-app-7a3fe.firebaseapp.com",
  projectId: "keeper-app-7a3fe",
  storageBucket: "keeper-app-7a3fe.appspot.com",
  messagingSenderId: "890278818825",
  appId: "1:890278818825:web:35099ff337a436902434d8",
  measurementId: "G-GX02FC56LN",
};

// Initialize Firebaseconst app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
// auth.currentUser.
export const db = getFirestore(app);

const githubProvider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const githubSignIn = () => signInWithPopup(auth, githubProvider);
export const googleSignIn = () => signInWithPopup(auth, googleProvider);
export const facebookSignIn = () => signInWithPopup(auth, facebookProvider);

// new user auth
export const userCredentail = async function (userAuth, additonalData = {}) {
  if (!userAuth) return;
  //user detial

  //if user is exist
  const uniqueUser = doc(db, "user", userAuth.uid);
  const getUser = await getDoc(uniqueUser);

  // userDataIntoFirebase(getUser.data());

  // const data2 = additonalData.displayName;
  //if user is not exist
  if (!getUser.exists()) {
    const { displayName, email, photoURL } = userAuth;

    const createAt = new Date();

    const userData = {
      displayName,
      email,
      createAt,
      photoURL,
      ...additonalData,
    };
    try {
      await setDoc(uniqueUser, userData);
    } catch (err) {
      console.log(err.message);
    }
  }

  // if){}
  return uniqueUser;
};

export const addUserGeneratedData = async (userAuth, obj) => {
  const user = doc(db, "user", userAuth.uid);
  try {
    await setDoc(user, obj);
  } catch (err) {
    console.log(err);
  }
};
