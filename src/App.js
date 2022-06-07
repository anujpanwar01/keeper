import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import TogglerProvider from "./context/toggler-context/toggler-provider";
import SignUp from "./component/sign-up/SignUp.component";
import SignIn from "./component/sign-in/SignIn";
import Header from "./routes/header/Header";
import Home from "./routes/home/Home";
import "./App.scss";
import UserContext from "./context/user-context/user-context";
import Overlay from "./component/overlay/overlay.component";
import Footer from "./routes/footer/footer";
import { database } from "./firebase/firebase.util";
import { onValue, ref } from "firebase/database";
import CardContext from "./context/card-context/card-context";

const App = () => {
  const { currentUser } = useContext(UserContext);
  const { replaceItems } = useContext(CardContext);

  const notesRef = useMemo(
    () => ref(database, `notes/${currentUser?.uid}`),
    [currentUser]
  );

  const navigate = useCallback(
    (element) => {
      return currentUser ? <Navigate to={"/"} /> : element;
    },
    [currentUser]
  );

  useEffect(() => {
    onValue(notesRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;
      let transformedData = [];

      for (const key in data) {
        transformedData.push({
          id: key,
          ...data[key],
        });
      }
      replaceItems(transformedData);
    });
  }, [notesRef]);

  return (
    <TogglerProvider>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index path="/" element={<Home />} />
          <Route path="/sign-up" element={navigate(<SignUp />)} />
          <Route path="/sign-in" element={navigate(<SignIn />)} />
        </Route>
      </Routes>
      {
        <Overlay
          target={"overlay"}
          onClick={(e) => {
            document
              .querySelector(".search-container")
              .classList.toggle("open-search");
            e.target.classList.toggle("visi-checkbox-overlay");
          }}
          className="checkbox-overlay"
        />
      }
      <Footer />
    </TogglerProvider>
  );
};

export default App;
