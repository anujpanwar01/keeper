import { initializeApp } from "firebase/app";
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getDatabase, ref, remove, update } from "firebase/database";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

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
let isLoading = false;
export const auth = getAuth(app);

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
      alert(err.code);
    }
  }
  return uniqueUser;
};
export const resetPassword = async (enteredEmail) => {
  console.log(auth);
  try {
    await sendPasswordResetEmail(auth, enteredEmail);
    alert(
      `Reset password link send to your email box. kindly check your email-box, if you don't found in "Important-box" then please check the "Spam-box"`
    );
  } catch (err) {
    if (err.code === "auth/user-not-found") {
      alert("Your account doesn't exist, make sure you sign up first...");
    } else {
      alert(err.code);
    }
  }
};
export const reAuthUser = async (email, password, user) => {
  const credential = EmailAuthProvider.credential(email, password);
  try {
    const result = await reauthenticateWithCredential(user, credential);
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const deleteUserCredential = async (uid) => {
  try {
    await deleteDoc(doc(db, "user", uid));
  } catch (err) {
    alert(err.message);
  }
};

//updata card
export const updateCard = async (cardId, data, loadingState) => {
  loadingState(true);
  const refCard = ref(database, `/notes/${auth?.currentUser?.uid}/${cardId}`);

  try {
    await update(refCard, data);
    loadingState(false);
  } catch (err) {
    loadingState(false);
    alert(err.message);
  }
  return isLoading;
};

//delete the card from firebase;
export const deleteCard = async (cardId, deletingState) => {
  deletingState(true);
  try {
    await remove(ref(database, `/notes/${auth?.currentUser?.uid}/${cardId}`));
    deletingState(false);
  } catch (err) {
    deletingState(false);
    alert(err.message);
  }
};

export const deleteAllCard = async (deletingState) => {
  deletingState(true);
  try {
    await remove(ref(database, `/notes/${auth?.currentUser?.uid}`));
    deletingState(false);
  } catch (err) {
    deletingState(false);
    alert(err.message);
  }
};

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
