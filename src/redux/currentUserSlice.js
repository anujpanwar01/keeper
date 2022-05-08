import { createSlice } from "@reduxjs/toolkit";

const CurrentUserSlice = createSlice({
  name: "currentUser",
  initialState: {
    currentUser: null,
    userDetail: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setUserDetail: (state, action) => {
      state.userDetail = action.payload;
    },
  },
});
export const { setCurrentUser, setUserDetail } = CurrentUserSlice.actions;
export default CurrentUserSlice.reducer;
