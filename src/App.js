import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

import SignUp from "./component/sign-up/SignUp.component";
import SignIn from "./component/sign-in/SignIn";

import Header from "./routes/header/Header";
import Home from "./routes/home/Home";
import "./App.scss";

function App() {
  const { currentUser } = useSelector((state) => state.currentUser);

  const navigate = (element) => {
    return currentUser ? <Navigate to={"/"} /> : element;
  };

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index path="/" element={<Home />} />
        <Route path="/sign-up" element={navigate(<SignUp />)} />
        <Route path="/sign-in" element={navigate(<SignIn />)} />
      </Route>
    </Routes>
  );
}

export default App;
