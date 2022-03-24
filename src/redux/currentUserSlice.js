import { createSlice } from "@reduxjs/toolkit";

const CurrentUserSlice = createSlice({
  name: "currentUser",
  initialState: {
    currentUser: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});
export const { setCurrentUser } = CurrentUserSlice.actions;
export default CurrentUserSlice.reducer;
