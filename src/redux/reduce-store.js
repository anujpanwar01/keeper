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
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

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

  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //       // Ignore these action types
  //       // ignoredActions: ["your/action/type"],
  //       // Ignore these field paths in all actions
  //       // ignoredActionPaths: ["meta.arg", "payload.timestamp"],
  //       // Ignore these paths in the state
  //       // ignoredPaths: ["items.dates"],
  //     },
  //   }),
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);

export default store;
