// import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/context";
import SignInSignUp from "./routes/sign-in-sign-up/SignInSignUp";
import Header from "./routes/header/Header";
import Home from "./routes/home/Home";
import "./App.scss";
// import {ThemeProvider} from 'styled-components'
// function note(detail) {
//   const { key, title, content } = detail;
//   return <Note key={key} title={title} content={content} />;
// }

// const states = {
//   search: ""
// };

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index path="/" element={<Home />} />
          <Route path="/user" element={<SignInSignUp />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
