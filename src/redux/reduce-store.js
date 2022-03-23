import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "./cardSlice";
import themeSlice from "./themeSlice";
import searchSlice from "./searchSlice";
const store = configureStore({
  reducer: {
    card: cardSlice,
    theme: themeSlice,
    search: searchSlice,
  },
});
export default store;
