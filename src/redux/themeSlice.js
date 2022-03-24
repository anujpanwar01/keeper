import { createSlice } from "@reduxjs/toolkit";

//initial stage
const initialState = {
  theme: true,
  grid: false,
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
    cardToggle(state) {
      state.grid = !state.grid;
    },
  },
});
export const { toggle, cardToggle } = cardSlice.actions;

export default cardSlice.reducer;
