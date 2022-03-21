import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import SignInSignUp from "./routes/sign-in-sign-up/SignInSignUp";
import Header from "./routes/header/Header";
import Home from "./routes/home/Home";
import "./App.scss";
// function note(detail) {
//   const { key, title, content } = detail;
//   return <Note key={key} title={title} content={content} />;
// }

// const states = {
//   search: ""
// };

function App() {
  const [state, setState] = useState({});

  const h1 = document.querySelectorAll("h1");
  console.log(h1);
  h1.forEach((ele) => console.log(ele.innerText));
  // const arr = Array.from(h1);
  // arr.filter((ele) => ele.includes(state.search));
  // console.log(h1);
  // console.log(Array.from(h1));
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index path="/" element={<Home />} />
        <Route path="/user" element={<SignInSignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
