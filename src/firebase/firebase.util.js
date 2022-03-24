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

export const auth = getAuth();
export const db = getFirestore();

const githubProvider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const githubSignIn = () => signInWithPopup(auth, githubProvider);
export const googleSignIn = () => signInWithPopup(auth, googleProvider);
export const facebookSignIn = () => signInWithPopup(auth, facebookProvider);

// new user auth
export const userCredentail = async function (userAuth, additonalData) {
  //user detial
  // console.log(userAuth);

  //if user is exist
  const uniqueUser = doc(db, "user", userAuth.uid);
  const getUser = await getDoc(uniqueUser);
  // console.log(getUser.data());

  //if user is not exist
  if (!getUser.exists()) {
    const { displayName, email, photoURL } = userAuth;
    const createAt = new Date();
    try {
      await setDoc(uniqueUser, {
        displayName,
        email,
        createAt,
        photoURL,
        ...additonalData,
      });
    } catch (err) {
      console.log(err);
    }
  } // if){}
  return uniqueUser;
};
