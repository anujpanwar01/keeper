import React, {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import LoadingSpinner from "./component/loadin-Spinner/loading-Spinner.component";
import { Route, Routes, Navigate } from "react-router-dom";
import TogglerProvider from "./context/toggler-context/toggler-provider";
import "./App.scss";
import UserContext from "./context/user-context/user-context";
import Overlay from "./component/overlay/overlay.component";
import Footer from "./routes/footer/footer";
import { database } from "./firebase/firebase.util";
import { onValue, ref } from "firebase/database";
import CardContext from "./context/card-context/card-context";
import { createPortal } from "react-dom";
import NotFound from "./routes/not-found/Not-Found";

const Header = React.lazy(() => import("./routes/header/Header"));
const Home = React.lazy(() => import("./routes/home/Home"));
const SignUp = React.lazy(() => import("./component/sign-up/SignUp.component"));
const SignIn = React.lazy(() => import("./component/sign-in/SignIn"));
const ReAuth = React.lazy(() => import("./routes/re-auth/re-auth.component"));

const App = () => {
  const { currentUser } = useContext(UserContext);
  const { setIsFetching, replaceItems } = useContext(CardContext);

  const notesRef = useMemo(
    () => ref(database, `notes/${currentUser?.uid}`),
    [currentUser]
  );

  const navigate = useCallback(
    (element) => {
      return currentUser ? <Navigate to={"/"} replace={true} /> : element;
    },
    [currentUser]
  );

  useEffect(() => {
    setIsFetching(true);
    onValue(notesRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setIsFetching(false);
        return;
      }
      let transformedData = [];

      for (const key in data) {
        transformedData.push({
          id: key,
          ...data[key],
        });
      }
      replaceItems(transformedData);
      setIsFetching(false);
    });
  }, [notesRef]);

  const spinner = createPortal(
    <div className="centered">
      <LoadingSpinner />
    </div>,
    document.getElementById("spinner")
  );

  return (
    <Suspense fallback={spinner}>
      <TogglerProvider>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            {<Route path="/sign-up" element={navigate(<SignUp />)} />}
            {<Route path="/sign-in" element={navigate(<SignIn />)} />}
            {currentUser && <Route path="/re-auth" element={<ReAuth />} />}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Footer />
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
      </TogglerProvider>
    </Suspense>
  );
};

export default App;
