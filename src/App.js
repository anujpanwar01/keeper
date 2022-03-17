import { Route, Routes } from "react-router-dom";
import SignInSignUp from "./routes/sign-in-sign-up/SignInSignUp";
import Header from "./routes/header/Header";
import "./App.scss";
// function note(detail) {
//   const { key, title, content } = detail;
//   return <Note key={key} title={title} content={content} />;
// }
function Homes() {
  return <h1>Hllo</h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index path="/" element={<Homes />} />
        <Route path="/user" element={<SignInSignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
