import { createSlice } from "@reduxjs/toolkit";

//initial stage
const initialState = {
  theme: true,
};
const cardSlice = createSlice({
  name: "card-slice",
  initialState,
  reducers: {
    toggle(state) {
      state.theme = !state.theme;
      state.theme
        ? document.body.classList.remove("bg-black")
        : document.body.classList.add("bg-black");
      // if (state.theme) {
      //   document.body.classList.toggle("bg");
      // }
    },
  },
});
export const cardActions = cardSlice.actions;

export default cardSlice.reducer;
