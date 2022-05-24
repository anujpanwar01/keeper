import { initializeApp } from "firebase/app";
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";
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
console.log(auth.currentUser);
// auth.currentUser.
export const db = getFirestore(app);
export const database = getDatabase(app);

const githubProvider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const githubSignIn = () => signInWithPopup(auth, githubProvider);
export const googleSignIn = () => signInWithPopup(auth, googleProvider);
export const facebookSignIn = () => signInWithPopup(auth, facebookProvider);

// new user auth
export const userCredentail = async function (userAuth, additonalData) {
  console.log(additonalData);
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
      console.log(err.code);
    }
  }

  // if){}
  return uniqueUser;
};

// export const addNotes = async (userAuth, note) => {
//   console.log(note, userAuth.uid);
//   const user = doc(db, "notes", userAuth.uid);
//   try {
//     const data = await setDoc(user, note);
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
//   // const data = await set(ref(db, "user/" + userAuth.uid), note);
//   // console.log(data);
// };

// export const userProfile = async (userAuth) => {
//   const ref = doc(db, "user", userAuth.uid);
//   const userDoc = await getDoc(ref);
//   console.log(userDoc.data());
//   return userDoc.data();
// };
// console.log(userProfile());
export const addUserGeneratedData = async (userAuth, obj) => {
  const user = doc(db, "user", userAuth.uid);
  // const newObj = { userAuth, obj };
  console.log(user, obj);
  try {
    // await setDoc(user, newObj);
  } catch (err) {
    console.log(err);
  }
};
