import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import currentUserSlice from "./currentUserSlice";
import cardSlice from "./cardSlice";
import themeSlice from "./togglerSlice";
import searchSlice from "./searchSlice";
////////////////////////////////////////////////
const store = configureStore({
  reducer: {
    card: cardSlice,
    theme: themeSlice,
    search: searchSlice,
    currentUser: currentUserSlice,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
export default store;
