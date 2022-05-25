import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import App from "./App";
import UserProvider from "./context/user-context/user-provider";
import CardProvider from "./context/card-context/card-provider";
import ResizeObserverProvider from "./context/resize-context/resize-observer.provider";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CardProvider>
          <ResizeObserverProvider>
            <App />
          </ResizeObserverProvider>
        </CardProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
