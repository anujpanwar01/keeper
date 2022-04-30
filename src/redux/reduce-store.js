import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import currentUserSlice from "./currentUserSlice";
import cardSlice from "./cardSlice";
import toggleSlice from "./togglerSlice";
import searchSlice from "./searchSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

////////////////////////////////////////////////
const reducers = combineReducers({
  card: cardSlice,
  theme: toggleSlice,
  search: searchSlice,
  currentUser: currentUserSlice,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["theme", "search", "currentUser"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);

export default store;
