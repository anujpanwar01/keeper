import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    search: "",
  },
  reducers: {
    searchValue(state, action) {
        state.search=action.payload.search
    },
  },
});

export const {searchValue}=searchSlice.actions;
export default searchSlice.reducer;