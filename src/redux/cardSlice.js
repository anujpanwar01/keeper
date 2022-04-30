import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  store: [],
  edit: false,
};
const cardSlice = createSlice({
  name: "cardSlice",
  initialState,
  reducers: {
    addData: (state, action) => {
      const data = {
        id: action.payload.id,
        title: action.payload.title,
        subTitle: action.payload.subTitle,
        color: action.payload.color,
        file: action.payload.file,
        src: action.payload.src,
      };
      state.store.push(data);
    },
    delCard: (state, action) => {
      // 1) don't destructure state in arguments field
      // 2) it return new array or mutate  return state.store.filter((ele) => ele.id !== action.payload.id); // it's not working because it mutate the original array

      state.store = state.store.filter((ele) => ele.id !== action.payload.id);
    },
    resetAll: (state) => {
      state.store = [];
    },
    editCard(state, action) {
      state.edit = action.payload;
      // state.edit = state.store.find((ele) => ele.id === action.payload.id);
      // console.log(state.edit);
      // state.store = state.store.filter((ele) => ele.id === action.payload.id);
    },
  },
});

export const { addData, delCard, resetAll, editCard } = cardSlice.actions;
export default cardSlice.reducer;
