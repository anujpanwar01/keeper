import React, { useCallback, useContext } from "react";
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

const App = () => {
  const { currentUser } = useContext(UserContext);

  const navigate = useCallback(
    (element) => {
      // console.log("nav");
      return currentUser ? <Navigate to={"/"} /> : element;
    },
    [currentUser]
  );

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
